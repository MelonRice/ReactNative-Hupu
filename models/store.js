import {observable, action} from 'mobx';
import {AsyncStorage} from 'react-native';
import MD5 from "./MD5";

/**
 * 数据处理类
 * 负责获取远程数据，并缓存论坛列表的数据到本地
 * 访问远程API，通过fetch进行，并且使用了promise和aync await两种方法，功能完全一样，实际调用方法也完全相同
 */

const base_url = 'http://bbs.mobileapi.hupu.com/1/7.0.8/';
const forums_url = base_url + 'forums/getForums?sign=ccfedf219f54485b74781da19bb22e43&client=000000000000000&night=0';
const recommend_url = base_url + 'recommend/getThreadsList?';
const topics_url = base_url + 'forums/getForumsInfoList?';
const search_topics_url = 'http://games.mobileapi.hupu.com/1/7.0.8/search/list?';
const topic_url = base_url + 'threads/getThreadsSchemaInfo?';
const topic_comments_url = base_url + 'threads/getsThreadPostList?';
const referer_url = 'http://bbs.mobileapi.hupu.com/1/7.0.8/threads/getThreadDetailInfoH5';

class Store {
    @observable forums = [];
    @observable selectedTopic;
    @observable selectedForum;
    @observable selectedSubForum;

    constructor() {
        AsyncStorage.getItem('@forums')
            .then((results) => {
                this.forums = JSON.parse(results) || [];
            });
    }

    _persistTopics() {
        AsyncStorage.setItem('@forums', JSON.stringify(this.forums));
    }

    //获取全部论坛列表（包括自论坛）
    @action
    async fetchForums() {
        const response = await fetch(forums_url);
        if (response) {
            const json = await response.json();
            if (json.data) {
                this.forums = json.data;
                this._persistTopics();
            }
        }

        return this.forums;
    }

    //根据论坛获取主题列表，分页方式通过传人上一页的最后一个帖子的id：tid
    @action fetchTopicList(forum, tid) {

        var url = '';
        if (forum && forum.fid) {
            url = this.generateTopicsUrl(forum, tid);
        } else {
            url = this.generateRecommendTopicsUrl(tid);
        }

        return fetch(url).then((response) => response.json());
    }

    //搜索某论坛下的全部主题，分页方式是传入页数
    @action searchTopicList(forum, keyword, page) {

        var url = this.generateSearchTopicsUrl(forum, keyword, page);

        return fetch(url).then((response) => response.json());
    }

    //获取某个帖子的详情内容，页数实际没有用途，默认1
    @action
    async fetchTopicDetails(topic, page) {
        var url = this.generateTopicUrl(topic, page);

        const response = await fetch(url);
        const json = await response.json();

        return json;
    }

    //获取某个帖子的评论，分页方式为传入页数
    @action
    async fetchTopicComments(topic, page) {
        var url = this.generateTopicCommentsUrl(topic, page);

        const response = await fetch(url, {headers: {Referer: referer_url}});
        const json = await response.json();

        return json.result;
    }

    //拼推荐贴的URL
    generateRecommendTopicsUrl(tid) {
        var timeStamp = Math.floor(Date.now() / 1000);
        var queryString = 'client=000000000000000&isHome=1&lastTid=' + (tid || '') + '&night=0&stamp=' + timeStamp;
        return recommend_url + 'sign=' + this.generateSign(queryString) + '&' + queryString;
    }

    //拼帖子列表的URL
    generateTopicsUrl(forum, tid) {
        var queryString = 'client=000000000000000&fid=' + forum.fid + '&isHome=1&lastTid=' + (tid || '') + '&night=0&password=0&special=0&stamp=&type=1';
        return topics_url + 'sign=' + this.generateSign(queryString) + '&' + queryString;
    }

    //拼搜索贴子的URL
    generateSearchTopicsUrl(forum, keyword, page) {
        var queryString = 'client=000000000000000&fid=' + forum.fid + '&keyword=' + keyword + '&night=0&page=' + page + '&type=posts';
        return search_topics_url + 'sign=' + this.generateSign(queryString) + '&' + queryString;
    }

    //拼贴子详情的URL
    generateTopicUrl(topic, page) {
        var queryString = 'client=000000000000000&fid=' + topic.fid + '&night=0&nopic=0&page=' + page + '&tid=' + (topic.tid || topic.id);
        return topic_url + 'sign=' + this.generateSign(queryString) + '&' + queryString;
    }

    //拼贴子评论的URL
    generateTopicCommentsUrl(topic, page) {
        var queryString = 'client=000000000000000&fid=' + topic.fid + '&night=0&page=' + page + '&tid=' + topic.tid;
        return topic_comments_url + queryString;
    }

    //生产MD5签名
    generateSign(query) {
        return MD5(query + 'HUPU_SALT_AKJfoiwer394Jeiow4u309');
    }

    //设置当前论坛
    selectForum(forum) {
        this.selectedForum = forum;
    }

    //设置当前子论坛
    selectSubForum(subforum) {
        this.selectedSubForum = subforum;
    }

    //设置当前主题
    selectTopic(topic) {
        this.selectedTopic = topic;
    }

}


const store = new Store();
export default store;