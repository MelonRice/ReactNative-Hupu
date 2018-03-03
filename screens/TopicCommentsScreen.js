import React from 'react';
import { Container, Content, List, ListItem, Text, Button, Icon, Spinner, Header, Card, CardItem, Body, Left, Right, Thumbnail } from 'native-base';
import {inject, observer} from 'mobx-react/native';
import { ActivityIndicator, RefreshControl } from 'react-native';
import HTMLView from 'react-native-htmlview';

/**
 * 帖子的评论页面
 */
@inject('store') @observer
class TopicCommentsScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const params = navigation.state.params || {};

        return {
            title: params ? params.title : '',
        }
    };

    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            waiting: false,
            curPage: 1,
            totalPage: 1,
            comments: []
        }
    }

    onBackButtonPressAndroid = () => {
        return false;
    };

    componentWillMount() {
        this.setState({ loading: true });
        this._loadComments();
    }

    _loadComments(){
        this.props.store.fetchTopicComments(this.props.store.selectedTopic, this.state.curPage)
            .then((results) => {
                // results = results.result;
                this.setState({ loading: false });
                this.setState({ totalPage: (results.all_page || 1) });
                if(this.state.curPage == 1) {
                    this.setState({comments: (results.list || {})});
                }else if(this.state.curPage <= results.all_page){
                    this.setState({comments: this.state.comments.concat(results.list || {})});
                }
            });
    }

    refreshComments = () => {
        this.setState({ curPage: 1 });
        this._loadComments();
    }

    onEndReached = () => {
        if (!this.state.waiting && !this.state.loading && this.state.comments.length >= 15) {
            this.setState({waiting: true});
            this.setState({ curPage: this.state.curPage + 1 });
            if(this.state.curPage <= this.state.totalPage) {
                this._loadComments();
            }else{
                //TODO: toast no more comments
            }
        }
    }

    renderFooter = () => {
        if (this.state.waiting) {
            return <ActivityIndicator />;
        } else {
            return <Text>~</Text>;
        }
    }

    render() {
        const { comments } = this.state;

        return (
            <Container>
                <List
                    ref="listview"
                    dataArray={comments}
                    renderFooter={this.renderFooter}
                    onEndReached={this.onEndReached}
                    refreshControl={
                        <RefreshControl refreshing={this.state.loading}
                                        onRefresh={this.refreshComments}/>}
                    renderRow={(e) =>
                        <ListItem >
                            <Card style={{padding: 5}}>
                                <CardItem header>
                                    <Left>
                                        <Thumbnail source={{uri: e.userImg}} />
                                        <Body>
                                        <Text>{e.userName}</Text>
                                        <Text note>{e.floor} {e.time}</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <Text>亮了{e.light_count}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody style={{padding: 10}}>
                                    <Body>
                                    { e.quote && (e.quote.length > 0) && <Left style={{ backgroundColor: '#D3D3D3', width: '100%', padding: 10 }}>
                                        <HTMLView value={e.quote[0].header} />
                                        <HTMLView value={e.quote[0].content} />
                                    </Left>
                                    }
                                    <HTMLView value={e.content}/>
                                    </Body>
                                </CardItem>
                            </Card>


                        </ListItem>
                    }>
                </List>
            </Container>
        )
    }
}


module.exports = TopicCommentsScreen;