import React from 'react';
import {
    Container,
    Content,
    List,
    ListItem,
    Text,
    Button,
    Icon,
    Spinner,
    Card,
    CardItem,
    Header,
    Footer,
    Body,
    Left,
    Right
} from 'native-base';
import {inject, observer} from 'mobx-react/native';
import {ActivityIndicator, RefreshControl, Platform, BackHandler, ImageBackground} from 'react-native';
import SearchBar from 'react-native-searchbar'
import HTMLView from 'react-native-htmlview';

import {StackNavigator} from 'react-navigation';
import TopicDetailScreen from './TopicDetailScreen';
import TopicCommentsScreen from './TopicCommentsScreen';

/**
 * 帖子列表页面，顶层是stack导航类，下面包括了三个可以导航的子页面，按导航顺序：1。帖子列表页面；2。帖子详情页面；3。帖子评论页面
 * 其中搜索功能由状态：searching判断，在load more时选择搜索或者主题两个不同的方法
 */
@inject('store') @observer
class TopicListScreen extends React.Component {
    static navigationOptions = ({navigation, props}) => {
        const params = navigation.state.params || {};

        return {
            title: params ? params.title : '',
            headerLeft: (<Button
                transparent
                onPress={() => {
                    navigation.navigate('DrawerToggle');
                }
                }><Icon name='menu' style={{color: '#fff'}}/></Button>),
            headerRight: (params.showbtn && <Button
                transparent
                onPress={params.showSearchBtn}
            ><Icon name='search' style={{color: '#fff'}}/></Button>)
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            waiting: false,
            searching: false,
            tid: null,
            curPage: 1,
            topics: []
        }
    }

    _showSearchBtn = () => {
        this.searchBar.show();
    }

    componentWillMount() {
        this.props.navigation.setParams({showSearchBtn: this._showSearchBtn});
        this.loadTopics();
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.navigation.state.params.forum === 'recommend') {
        //     this.loadTopics();
        // }
    }

    refreshTopics() {

        this.setState({curPage: 1});
        this.setState({tid: null});
        this.loadTopics();
    }

    loadTopics() {
        this.setState({loading: true});
        this.props.store.fetchTopicList(this.props.store.selectedSubForum, this.state.tid)
            .then((results) => {
                this.setState({loading: false});
                this.setState({waiting: false});
                this.setState({topics: this.state.topics.concat(results.result.data || [])});
                if (this.state.topics.length > 0) {
                    this.setState({tid: this.state.topics[this.state.topics.length - 1].tid});
                }
                if (this.props.store.selectedSubForum) {
                    this.props.navigation.setParams({showbtn: true});
                    this.props.navigation.setParams({title: (this.props.store.selectedSubForum.name || '')});
                } else {
                    this.props.navigation.setParams({showbtn: false});
                    this.props.navigation.setParams({title: '帖子推荐'});
                }
            })
            .catch((error) => {
                console.log("Error fetchTopicList ", error);
                this.setState({loading: false});
                this.setState({waiting: false});
            });
    }

    _handleEntryPress(topic) {
        this.props.store.selectTopic(topic);
        this.props.navigation.navigate('Details');
    }

    _hideSearch = () => {
        this.setState({searching: false});
        this.searchBar.hide();
    }

    _handleSearch = () => {
        var key = this.searchBar.getValue();
        if (!key || key.length == 0) {
            this.setState({searching: false});

            return;
        }
        this.setState({curPage: 1});
        this.searchBar.hide();
        this.setState({loading: true});
        this.setState({searching: true});
        this.props.store.searchTopicList(this.props.store.selectedSubForum, key, this.state.curPage)
            .then((results) => {
                this.setState({loading: false});
                this.setState({waiting: false});
                if (this.state.curPage > 1) {
                    this.setState({topics: this.state.topics.concat(results.result.data)});
                } else {
                    this.setState({topics: (results.result.data || [])});
                }
            })
            .catch((error) => {
                console.log("Error _handleSearch ", error);
                this.setState({loading: false});
                this.setState({waiting: false});
            });
    }

    onEndReached = () => {
        if (!this.state.waiting && !this.state.loading && this.state.topics.length >= 25) {
            this.setState({waiting: true});
            this.setState({curPage: this.state.curPage + 1});
            if (this.state.searching) {
                this._handleSearch(true);
            } else {
                this.loadTopics(); // fetching new data, ended with this.setState({waiting: false});
            }
        }
    }

    renderHeader = () => {
        if (this.props.store.selectedSubForum) {
            return (<Card>
                <CardItem cardBody>
                    <ImageBackground source={{uri: this.props.store.selectedSubForum.backImg}} style={{
                        height: 200,
                        width: null,
                        flex: 1,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{color: '#fff', fontSize: 22}}>{this.props.store.selectedSubForum.name}</Text>
                        <Text style={{color: '#fff'}}>{this.props.store.selectedSubForum.description}</Text>
                    </ImageBackground>
                </CardItem>
            </Card>);
        }
    }

    renderFooter = () => {
        if (this.state.waiting) {
            return <ActivityIndicator/>;
        } else {
            return <Text>~</Text>;
        }
    }

    render() {
        const {topics} = this.state;

        return (
            <Container>
                <SearchBar
                    ref={(c) => this.searchBar = c}
                    onSubmitEditing={this._handleSearch}
                    onBack={this._hideSearch}
                />
                <List
                    noBorder
                    ref="listview"
                    dataArray={topics}
                    renderHeader={this.renderHeader}
                    renderFooter={this.renderFooter}
                    onEndReached={this.onEndReached}
                    refreshControl={
                        <RefreshControl refreshing={this.state.loading}
                                        onRefresh={this.refreshTopics.bind(this)}/>}
                    renderRow={(e) =>
                        <ListItem onPress={this._handleEntryPress.bind(this, e)} noBorder
                                  style={{borderWidth: 0, margin: 0, padding: 0}}>
                            <Card noBorder style={{borderWidth: 0}}>
                                <CardItem noBorder>
                                    <Body style={{borderWidth: 0}}>
                                    <HTMLView value={e.title}/>
                                    </Body>
                                </CardItem>
                                <CardItem footer noBorder style={{borderWidth: 0}}>
                                    <Left>
                                        <Text>{e.time}</Text>
                                    </Left>
                                    <Right>
                                        <Text>评论{e.replies}个</Text>
                                    </Right>
                                </CardItem>
                            </Card>


                        </ListItem>
                    }>
                </List>
            </Container>
        )
    }
}

//这里是另一个版本的listitem，间隔可以调，但是比较难看
{/*<ListItem onPress={this._handleEntryPress.bind(this, e)} noBorder style={{ borderWidth: 0, margin: 5, padding: 0, backgroundColor:'#fff' }}>*/
}
{/*<Body noBorder style={{ borderWidth: 0 }}>*/
}
{/*<Header noBorder style={{ borderWidth: 0 }}>*/
}
{/*<HTMLView value={e.title} />*/
}
{/*</Header>*/
}
{/*<Footer noBorder style={{ borderWidth: 0 }}>*/
}
{/*<Left>*/
}
{/*<Text>{e.time}</Text>*/
}
{/*</Left>*/
}
{/*<Right>*/
}
{/*<Text>评论{e.replies}个</Text>*/
}
{/*</Right>*/
}
{/*</Footer>*/
}
{/*</Body>*/
}
{/*</ListItem>*/
}

const TopicListStack = StackNavigator({
        List: {screen: TopicListScreen},
        Details: {screen: TopicDetailScreen},
        Comments: {screen: TopicCommentsScreen},
    },
    {
        initialRouteName: 'List',
        /* The header config from HomeScreen is now here */
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#32CD32',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            drawerLockMode: Platform.OS === 'ios' ? 'locked-closed' : 'unlocked'
        },
    }
);

module.exports = TopicListStack;