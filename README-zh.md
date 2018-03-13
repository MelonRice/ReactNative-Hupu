
[![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![platform](https://img.shields.io/badge/platform-Android-yellow.svg)](https://www.android.com)
[![API](https://img.shields.io/badge/API-14%2B-brightgreen.svg?style=flat)](https://android-arsenal.com/api?level=16)
[![PRs Welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Thanks](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/ResolveWang)
[![GitHub issues](https://img.shields.io/github/issues/MelonRice/ReactNative-HupuJRS.svg?style=plastic)](https://github.com/MelonRice/ReactNative-HupuJRS/issues)

# React-Native-HupuJRS

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/ic_launcher.png">

这是一个 `React Native` 版虎扑论坛第三方客户端，可同时兼容Android/iOS平台，共用几乎所有的代码

目前仅提供基本的浏览论坛与帖子功能，后续计划增加登录与回帖功能(之前参考的开源项目登录api无效了)，会持续更新

该应用系本人初学React Native练手之作，比较粗糙，存在诸多bug请多包涵和指正，欢迎提交PR和Issues

本App仅供学习交流React Native技术使用，请勿用于商业用途，欢迎Star和Fork

__免责声明__  

『虎扑』是 *Hupu.Inc* 的注册商标。本软件与其代码 均非 由虎扑创作或维护。它是一个免费软件，使用它不收取您任何费用。其中的所有内容均可在[虎扑论坛](http://bbs.hupu.com)获取。

本项目所有 API 均由 虎扑（HuPu.Inc）以及[虎扑第三方Android开源项目Tlint](https://github.com/gzsll/TLint)提供。获取与共享之行为或有侵犯虎扑权益之嫌。请您暸解相关情况，并遵守虎扑协议。

## 下载

[fir下载Android beta1](https://fir.im/jrsapp)

二维码扫描下载(Android beta1)：
<center><img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/下载.png"></center>

iOS版未上架，有mac开发环境即可在本地运行本项目直接[运行](#1)

## 界面

* 主页

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/1.jpeg" width="300">

* 侧边栏

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/2.jpeg" width="300">

* 选择子论坛

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/3.jpeg" width="300">

* 子论坛帖子列表

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/4.jpeg" width="300">

* 帖子详情

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/5.jpeg" width="300">

* 回复

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/6.jpeg" width="300">

## <h2 id="1">运行</h2>

### 环境配置步骤:
1.安装 nvm

2.安装 nodejs > 9.0
> 如果之前安装的是其他版本node，请在安装9.0前进行一下以下操作：

> rm -rf node_modules

> nvm use 9.0.0

> npm install

3.npm install -g react-native-cli

4.npm install -g yarn react-native-cli

5.项目根目录: yarn install

6.项目根目录: yarn add babel-plugin-transform-decorators-legacy

7.项目根目录: react-native link

### 多平台运行
> 注意: 如果运行过程中,Android端报Gradle安装失败或Gradle证书错误，以及iOS端报证书错误，是由于React Native版本默认的gradle与你本地gradle版本不符，或由于我的电脑上的苹果相关证书与你本地环境不匹配造成
> 
> 首次运行报错时，可以尝试安装并打开Android studio(Android平台)或Xcode(iOS平台)编译器，在编译器中打开项目目录下的 Android / iOS文件夹，根据错误提示在编译器中进行配置或让编译器自行选择下载依赖，可修复大部分初始化安装时的运行报错

#### 模拟器运行(不可同时开多个模拟器):
* Android: 项目根目录下 react-native run-android
* iOS: 项目根目录下 react-native run-ios

#### 真机运行:

Android:

1.项目根目录下 adb reverse tcp:8081 tcp:8081 (这步操作使最新修改的bundle文件打到真机)

2.在Android studio中打开项目的android目录，然后运行(或使用命令行运行，同模拟器运行方式一致)

iOS:

需要本机具有有效的开发者证书，才能在Xcode中用真机使用debug模式运行。

## 开源组件

在项目中使用的一些React Native官方或社区组件介绍:

[babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy): 用于支持decorators

[mobx](https://github.com/mobxjs/mobx): 功能强大,上手容易的状态管理工具

[mobx-react](https://github.com/mobxjs/mobx-react): 配合mobx，使react的组件能够识别mobx状态管理

[native-base](https://github.com/GeekyAnts/NativeBase): 为react native定义的一系列跨平台UI组件

[react-native-htmlview](https://github.com/jsdf/react-native-htmlview): 将 HTML 目录作为本地视图的控件，风格可定制

[react-native-searchbar](https://github.com/localz/react-native-searchbar): 一款带有常用搜索框的组件

[react-navigation](https://github.com/react-navigation/react-navigation): 官方目前推荐使用的导航管理工具

## TODO

1. ~~优化子论坛列表样式~~ (done)
2. 帖子列表UI样式优化，侧边栏样式优化
3. 登录功能
4. 我的帖子(需要登录)
5. 回帖
6. RN项目踩坑过程文档分享

## 致谢:heart:
- 感谢Hupu Android版第三方应用开发者[gzsll](https://github.com/gzsll)的[TLint](https://github.com/gzsll/TLint)项目提供的大量参考，以及在邮件交流过程中提供的热心帮助
- 感谢`star`支持的网友和在使用过程中提issue或者给出宝贵建议的朋友，你们的支持是我在业余时间继续开发的动力

## License

This project is available under the MIT license.
