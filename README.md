[Template ts]()

Mình cần các thông tin:
1. App name
2. App Bundle ID: (com.theassemblyplace.TAPmarketplace)
3. Subtitle (eg: Meet new people, do fun stuff!) (IOS: max 30 character, ANDROID: Max 80 character)
4. Picture preview (*)
5. Full description of the app
6. Support URL
7. Marketing URL
8. Copyright: (eg: © 2023 ADAMO. All Rights Reserved.) 
9. Contact information (**)
10. Target age rating
11. Primary Language
12. Category: Primary and secondary (optional) (eg: Primary: Business, Secondary: Education)
13. Privacy Policy URL

> (*) Picture preview includes information: Note that if using an image of the actual device, the image of the corresponding device must be used.

[ANDROID]()
+ logo: 512x512
+ Feature graphic: 1024*512
+ Screenshots: 16:9 or 9:16 Screenshots must be PNG or JPEG, up to 8 MB each, 16:9 or 9:16 aspect ratio, with each side between 320 px and 3,840 px
+ Video preview: link youtube (optional) 

[IOS]()
+ 1242x2688 ~ iiPhone 11 Pro Max
+ 1242x2208 : ~ ip 8plus
+ 1290x2796 or 2796x1290: ~Iphone 14
+ 2048x2732 (Optional If your app includes an iPad app design) ~ IPad 6th & 2nd Gen

+ video preview: (Optional)
+ 886x1920 or 1920x886

> (**) Contact information
+ First name
+ Last name
+ Phone number
+ Email

## Template ts

[Role]
using esling + prittier
disable hermes
using tranform remove console to remove console.log before build
or using LogApp() || reactoron to log.

[Code push](https://github.com/microsoft/appcenter-cli)

+ npm install -g appcenter-cli
+ npm install -g code-push-cli
+ code-push login 
+ run: appcenter profile list to check login app
+ run: appcenter apps list to check list app
+ install: react-native-code-push,  "appcenter": "4.4.5", "appcenter-analytics": "4.4.5", "appcenter-crashes": "4.4.5",
  | React Native version(s) | Supporting CodePush version(s)                        |
  |-------------------------|-------------------------------------------------------|
  | <0.14                   | **Unsupported**                                       |
  | v0.14                   | v1.3 *(introduced Android support)*                   |
  | v0.15-v0.18             | v1.4-v1.6 *(introduced iOS asset support)*            |
  | v0.19-v0.28             | v1.7-v1.17 *(introduced Android asset support)*       |
  | v0.29-v0.30             | v1.13-v1.17 *(RN refactored native hosting code)*     |
  | v0.31-v0.33             | v1.14.6-v1.17 *(RN refactored native hosting code)*   |
  | v0.34-v0.35             | v1.15-v1.17 *(RN refactored native hosting code)*     |
  | v0.36-v0.39             | v1.16-v1.17 *(RN refactored resume handler)*          |
  | v0.40-v0.42             | v1.17 *(RN refactored iOS header files)*              |
  | v0.43-v0.44             | v2.0+ *(RN refactored uimanager dependencies)*        |
  | v0.45                   | v3.0+ *(RN refactored instance manager code)*         |
  | v0.46                   | v4.0+ *(RN refactored js bundle loader code)*         |
  | v0.46-v0.53             | v5.1+ *(RN removed unused registration of JS modules)*|
  | v0.54-v0.55             | v5.3+ *(Android Gradle Plugin 3.x integration)*       |
  | v0.56-v0.58             | v5.4+ *(RN upgraded versions for Android tools)*      |
  | v0.59                   | v5.6+ *(RN refactored js bundle loader code)*         |
  | v0.60-v0.61             | v6.0+ *(RN migrated to Autolinking)*                  |
  | v0.62-v0.64             | v6.2+ *(RN removed LiveReload)*                       |
  | v0.65-v0.70             | v7.0+ *(RN updated iPhone-target-version)*            |
  | v0.71                   | v7.2+ *(RN moved to react-native-gradle-plugin)*      |
+ NOTE: ANDROID You have to add file: `appcenter-config.json || android>app>src>main>assets>appcenter-config.json: {"app_secret": "bbf6a755-bd82-4db8-b9d7-27360a575001"}`
+ add in app/build.gradle [defaultConfig]
  
    ```
      resValue 'string', "CODE_PUSH_APK_BUILD_TIME", String.format("\"%d\"", System.currentTimeMillis())
      resValue 'string', "CODE_PUSH_APK_BUILD_TIME", String.format("\"%d\"", System.currentTimeMillis())
    ```
+ Add more string[android] ->
  ```
    <string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
    <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>   
  ```
+ [Android settup guildline](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-android.md)
+ [IOS settup guildline](https://github.com/microsoft/react-native-code-push/blob/master/docs/setup-ios.md)
+ Add to Infolist: `<key>CodePushDeploymentKey</key><string>KEY_VALUE</string>`
+ edit name app trong script (package.json) trung vơi Xcode name
+ run: createAppCenterAndroid
+ run: createAppCenterIOS
+ change CodePushDeploymentKey: android/values.xml
+ edit CodePushDeploymentKey: ios/info.plit
+ BUILD: appcenter codepush release-react -a name_owner/app_name -d Staging

![Uploading image.png…]()


## [fastlane match](https://docs.fastlane.tools/actions/match/)

This repository contains all your certificates and provisioning profiles needed to build and sign your applications. They are encrypted using OpenSSL via a passphrase.

**Important:** Make sure this repository is set to private and only your team members have access to this repo.

Do not modify this file, as it gets overwritten every time you run _match_.

### Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using

```
[sudo] gem install fastlane -NV
```

or alternatively using `brew install fastlane`

### Usage

Navigate to your project folder and run

```
fastlane match appstore
```

```
fastlane match adhoc
```

```
fastlane match development
```

```
fastlane match enterprise
```

For more information open [fastlane match git repo](https://docs.fastlane.tools/actions/match/)

### Content

#### certs

This directory contains all your certificates with their private keys

#### profiles

This directory contains all provisioning profiles

---

For more information open [fastlane match git repo](https://docs.fastlane.tools/actions/match/)
