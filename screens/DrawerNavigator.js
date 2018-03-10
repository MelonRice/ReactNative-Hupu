import React, {Component} from 'react';
import {DrawerNavigator} from 'react-navigation';
import SideMenu from './ForumListScreen';

import ForumDetailStack from './ForumDetailScreen';
import TopicListStack from './TopicListScreen';

/**
 * 顶层导航类，使用drawer导航，子页面包括：论坛详情页面（子论坛列表）、主题列表
 */
export default DrawerNavigator({
    ForumDetail: {
        screen: ForumDetailStack
    },
    TopicList: {
        screen: TopicListStack
    },
}, {
    initialRouteName: 'TopicList',
    contentComponent: SideMenu,
    drawerWidth: 300
});