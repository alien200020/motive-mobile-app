# Motive Mobile App

## To Run This Application Locally

1. Make sure `react-native` is installed. If it is not, install it with `npm install -g react-native-cli`. See details [here](https://facebook.github.io/react-native/docs/getting-started.html).
2. For Android. As on an Android device `localhost` is mapped to the device itself, first of all you have to change `API_URL` in `.env.development` to point it to an IP address of your back-end. If you run the back-end locally, you can find the IP address using `ifconfig | grep inet`. It should look something like `192.168.0.15`. Then run `npm run android-dev` in the project root directory. Note: before running the above command make sure you either have an Android device connected to your computer or you have a simulator running. 
3. For iOS:
    * Open the project in Xcode. Note: use namely `MotiveMobileApp.xcworkspace` to open the project.
    * Go to Product. Then Clean. Then Build.
    * Go to Product > Scheme and select 'Development'
    * Press "Build and then run the current schema"

## Other steps

1. npm i
2. Make sure the dependencies are installed:
-  `react-native`
-  `react-native-fbsdk`
3. Optional: may have to run `react-native upgrade`
4. Link: `react-native link react-native-fbsdk`
5. Make sure you have Xcode installed.
6. Download Facebook SDK.
7. Open ios project in Xcode:
- Click on project root: make sure FBSDKCoreKit.framework, FBSDKLoginKit.framework, FBSDKShareKit.framework are in the `Build phases`
- Check `Build Settings`: Link to `~/Documents/FacebookSDK/` must be added in search paths.
- Now find in the project a file: `info.plist`. Make sure it has `FacebookAppID` mentioned.
8. react-native link
9. react-native link react-native-config
