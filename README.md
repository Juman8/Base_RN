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
+ add in app/build.gradle [defaultConfig]
  
    ```
      resValue 'string', "CODE_PUSH_APK_BUILD_TIME", String.format("\"%d\"", System.currentTimeMillis())
      resValue 'string', "CODE_PUSH_APK_BUILD_TIME", String.format("\"%d\"", System.currentTimeMillis())
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
