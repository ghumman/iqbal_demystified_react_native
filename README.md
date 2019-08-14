# Open Source Iqbal Demystifed React Native Application for iOS and Android

This application is built using React Native CLI. This project was enhancement of our Web Application: [Iqbal Demystified React Web Client](http://iqbal-demystified-react.herokuapp.com)

![screenshots of example app](/iqbal_demystified/assets/screenshots1.png)
![screenshots of example app](/iqbal_demystified/assets/screenshots2.png)

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

```
git clone https://github.com/ghumman/iqbal_demystified_react_native
cd iqbal_demystified_react_native/iqbal_demystified
npm install
react-native run-android
```

# Running on Android simulator with Ubuntu 18.04

`echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches && echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events && echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_instances && watchman shutdown-server && sudo sysctl -p`
or just run following command.
`bash fix_watchman_error_for_android.sh`

# Install app on actual phone.

`react-native run-android`

# Run

`sudo npm start`

# To reload on actual phone

'''Shake the device'''
or
`https://facebook.github.io/react-native/docs/running-on-device.html`
`adb shell input keyevent 82`
