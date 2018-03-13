
[![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![platform](https://img.shields.io/badge/platform-Android-yellow.svg)](https://www.android.com)
[![API](https://img.shields.io/badge/API-14%2B-brightgreen.svg?style=flat)](https://android-arsenal.com/api?level=16)
[![PRs Welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Thanks](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/ResolveWang)
[![GitHub issues](https://img.shields.io/github/issues/MelonRice/ReactNative-HupuJRS.svg?style=plastic)](https://github.com/MelonRice/ReactNative-HupuJRS/issues)

# React-Native-HupuJRS  

[中文文档点此](https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/README-zh.md)

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/ic_launcher.png">

This is a third-party client for the  `React Native` version of Hupu Forum, which is compatible with Android/iOS platform and shares almost all of the code.

Currently only basic browsing functions are provided. Later this applicationwill include login and reply function (Previously referenced open source project login API is not valid anymore) and will be continuously updated.

This application is my beginning React Native practice, which might be rough and buggy. Welcome to pull requests and submit Issues.

This application is for learning React Native only, please do not use it for commercial purposes. Welcome to Star and Fork!

__Disclaimer__  

『Hupu』 is a registered trademark of *Hupu.Inc*. Neither this application nor its code is created or maintained by Hupu. This is a free application. All of the contents can be obtained at [Hupu](http://bbs.hupu.com).

All APIs of this project are provided by Hupu（HuPu.Inc）and [Hupu Third Party Android Open Source Project Tlint](https://github.com/gzsll/TLint). The acquisition and sharing of content may be suspected of infringement of the rights of the Hupu. Please follow the Hupu forum agreement.

## Download

[fir download Android beta1](https://fir.im/jrsapp)

Scan QR code to download(Android beta1)：
<center><img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/下载.png"></center>

iOS version is not available, [Runing](#1) the project locally if you have mac development environment.

## Application interface

* Homepage

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/1.jpeg" width="300">

* Sidebar

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/2.jpeg" width="300">

* Sub-forum

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/3.jpeg" width="300">

* Sub-forum posts list

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/4.jpeg" width="300">

* Post details

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/5.jpeg" width="300">

* Replies

<img src="https://github.com/MelonRice/ReactNative-HupuJRS/blob/master/screenshot/6.jpeg" width="300">

## <h2 id="1">Running</h2>

### Environmental configuration steps:
1.Install nvm.

2.Install nodejs > 9.0
> If you installed a different version of node before, please do the following before installing 9.0:

> rm -rf node_modules

> nvm use 9.0.0

> npm install

3.npm install -g react-native-cli

4.npm install -g yarn react-native-cli

5.Root directory: yarn install

6.Root directory: yarn add babel-plugin-transform-decorators-legacy

7.Root directory: react-native link

### Multi-platform running
> Note: If Android device reports Gradle installation failure or Gradle certificate error, and iOS device reports certificate error when running, this is because default gradle version of React Native doesn't match your local gradle version, or because the Apple certificate on my computer does not match your local environment.
> 
> If error is reported when you run the application for the first time, you can try to install and open the Android studio (Android platform) or Xcode (iOS platform) compiler, open the Android / iOS folder in the project directory, configure the compiler according to the error message or let the compiler download dependencies, which can repair most of the initial installation error.

#### Simulator running (do not open multiple simulators at the same time):
* Android: in the root directory: react-native run-android
* iOS: in the root directory: react-native run-ios

#### Runing on device:

Android:

1.in the root directory: adb reverse tcp:8081 tcp:8081 (This step allows the newly modified bundle file could be transferred to device)

2.Open the project's android directory in Android Studio, and run (or use the command line to run, by the same way the simulator runs)

iOS:

Your device need a valid developer certificate to run in debug mode with Xcode.

## Open source components

Some of official or community components of React Native used in the application:

[babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy): Used to support decorators

[mobx](https://github.com/mobxjs/mobx): a powerful, easy-to-use state management tools.

[mobx-react](https://github.com/mobxjs/mobx-react): Cooperate with mobx to make react components recognize mobx.

[native-base](): Cross-platform UI components defined for React Native.

[react-native-htmlview](): A component that uses an HTML directory as a local view, the style can be customized.

[react-native-searchbar](): A component with a common search box.

[react-navigation](): The currently recommended navigation management tool.

## TODO

1. ~~Optimize sub-forum posts list style~~ (done)
2. Optimize posts list's UI style and sidebar's style.
3. Login
4. My posts (need to login)
5. Reply function
6. Sharing RN project documentation 

## Acknowledgements:heart:
- Thanks to Hupu's Android third-party application developer gzsll's TLint project for providing a wealth of references and warm-hearted help during e-mail communication.
- Thank you for supporting and giving valuable suggestions. Your support is the driving force for me to continue to develop in my spare time.

## License

This project is available under the MIT license.
