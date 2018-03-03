import React from 'react';
import { Container, Content, List, ListItem, Text, Button, Icon, Spinner } from 'native-base';
import {inject, observer} from 'mobx-react/native';
import {View, WebView, ActivityIndicator, StyleSheet, BackHandler} from 'react-native';

/**
 * 帖子详情页面
 */
@inject('store') @observer
class TopicDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.title : '',
        }
    };

    constructor (props) {
        super(props);
        this.state = {
            refurl: "http://bbs.mobileapi.hupu.com/1/7.0.8/threads/getThreadDetailInfoH5",
            loading: false,
            curPage: 1,
            totalPage: 1,
            topic: {}
        }
    }

    componentWillMount() {
        this.setState({ loading: true });
        this._loadTopic();
    }

    _loadTopic(){
        this.props.store.fetchTopicDetails(this.props.store.selectedTopic, this.state.curPage)
            .then((results) => {
                this.setState({ loading: false });
                this.setState({ totalPage: (results.pageSize || 1) });
                this.setState({ topic: (results || {})});
                this.props.navigation.setParams({title: (results.title || '')});
            });
    }

    _loadNextPage(flag){
        if(flag){
            this.setState({ curPage: this.state.curPage+1 });
        }else{
            this.setState({ curPage: this.state.curPage-1 });
        }
        this._loadTopic();
    }

    _loadComments(){
        this.props.navigation.navigate('Comments');
    }

    onShouldStartLoadWithRequest(event) {
        // Implement any custom loading logic here, don't forget to return!
        return true;

    }

    render() {
        return (
            <View style={{flex: 1}}>
                { this.state.loading && <ActivityIndicator style={{margin: 20}}/> }
                <WebView source={{uri: (this.state.topic.url), headers: {"Referer": this.state.refurl}}}
                         scalesPageToFit={false}
                         onLoadStart={(navState) => this.setState({url: navState.nativeEvent.url})}
                         onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                         javaScriptEnabled={true}
                         thirdPartyCookiesEnabled={true}
                         domStorageEnabled={true}
                         allowsInlineMediaPlayback={true}
                         mixedContentMode={'always'}
                />
                { (this.state.topic.replies > 0) &&  (
                    <View style={styles.rowContainer}>
                    <View style={{flex: 1}}>
                        <Text style={{color: 'white',textAlign: 'center',fontSize: 22}} onPress={() => this._loadComments()}>点击查看{this.state.topic.replies}条评论</Text>
                    </View>
                    </View>) }
            </View>
        );
    }
}

    const styles = StyleSheet.create({
        rowContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 44,
        backgroundColor: '#00000066',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
            marginBottom:20
    },
    });
module.exports = TopicDetailScreen;