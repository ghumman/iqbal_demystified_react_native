# Open Source Iqbal Demystifed React Native Application for iOS and Android

This application is built using React Native CLI. This project was enhancement of our Web Application: [Iqbal Demystified React Web Client](http://iqbal-demystified-react.herokuapp.com)

![First Set of Screenshots](/iqbal_demystified/assets/screenshots1.png)
![Second Set of Screenshots](/iqbal_demystified/assets/screenshots2.png)
![Third Set of Screenshots](/iqbal_demystified/assets/screenshots3.png)
![Forth Set of Screenshots](/iqbal_demystified/assets/screenshots4.png)

## Features

- Navigation using MaterialTopTabNavigator, DrawerNavigator and StackNavigator
- Complete Authentication Processing including
  - Register Account
  - Sign In
  - Sign Out
  - Change Password
  - Forgot Password
  - My Profile
  - My Downloads
- Reading and Writing to YAML data files
- Downloading, Playing and Keeping Record of Audio files
- Zoom In and Out while reading the poems
- Select from different fonts types and font sizes
- Bookmarking poems and stanzas
- Ability to do discussion on stanzas or words inside stanzas
- Voting system including
  - Like
  - Dislike
  - Unregister your vote
- Sharing text of stanzas
- Complete Search Engine with the ability to:
  - Search from titles of poems
  - Search from words in stanzas
- Contribute by getting involved in discussions, providing poems introductions and sending emails to give feedback or inform about bugs

## Setup instructions

Install the required packages for macOS, Windows or Linux following the below guide

```
https://facebook.github.io/react-native/docs/getting-started.html
```

After following the above guide you should have Node, Watchman, JDK, Android Studio for Android and XCode for iOS development installed on your system. Use the following code to run the app on simulators or actual connected devices

```
git clone https://github.com/ghumman/iqbal_demystified_react_native
cd iqbal_demystified_react_native/iqbal_demystified
npm install
# For Android
react-native run-android
# For iOS
react-native run-ios
```
