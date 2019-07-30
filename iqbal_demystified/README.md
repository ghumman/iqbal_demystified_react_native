# Running on Android simulator with Ubuntu 18.04
`echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_user_watches && echo 999999 | sudo tee -a /proc/sys/fs/inotify/max_queued_events && echo 999999 | sudo tee -a
/proc/sys/fs/inotify/max_user_instances && watchman shutdown-server && sudo sysctl -p`

# Install app on actual phone. 
`react-native run-android`

# Run
`sudo npm start`

# To reload on actual phone
'''Shake the device'''
or 
```https://facebook.github.io/react-native/docs/running-on-device.html ```
``` adb shell input keyevent 82 ```



