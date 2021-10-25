# Open Source Iqbal Demystifed React Native Application for iOS and Android

This application is built using React Native CLI. This project was enhancement of our Web Application: [Iqbal Demystified React Web Client](https://ghumman.github.io/iqbal-demystified-web/)

![First Set of Screenshots](/src/assets/screenshots1.png)
![Second Set of Screenshots](/src/assets/screenshots2.png)
![Third Set of Screenshots](/src/assets/screenshots3.png)
![Forth Set of Screenshots](/src/assets/screenshots4.png)

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

## To submit a PR

When naming the branch if you are working on a new feature or addition, prefix the branch name with feature otherwise if it is fixing a bug call it bug-fix. If you are working on existing issues, please include the issue name in your branch, otherwise create an issue first and then include that issue name in your branch name. Also adding a short description for that branch will be great. Following are the examples of branch names. ID-1/ID-2 in following examples are issues' names. Also ID stands for Iqbal Demystified.
```
feature/ID-1-fix-structure-of-project
bug-fix/ID-2-change-password-not-working
```

## ES-Lint

Please fix all formatting and linting errors before creating PR. Currently project has babel-eslint installed which will be replaced with typescript-eslint once we convert the project to typescript. You can run 
```
npm run lint
or 
npm run lint-fix
``` 
and please use a eslint plugin with your IDE.

## Coding Standard

```
Use long and explanatory variable names.
Divide your code in smaller functions.
Declare all constants inside constants file.
Please include name of issue you are working on in your commit message like 'ID-3: Updated Readme'
```