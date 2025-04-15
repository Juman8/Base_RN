Change Theme:
Thay đỏi các theme tương ứng
Xóa liên kết theme trong các thư mục android và trên ios (Xcode)
chạy lại lệnh: npx react-native-asset


[Template ts]()

Mình cần các thông tin để submit app:
1. Tên app
2. Subtitle (ví dụ: Meet new people, do fun stuff!) (IOS: max 30 character, ANDROID: Max 80 character)
2. Ảnh preview (Khá Bảnh cung cấp)
3. Mô tả đầy đủ về app (Description)
4. Support URL
5. Marketing URL
6. Copyright: (Thông tin: ví dụ: © 2022 ADAMO. All Rights Reserved.)
7. xin contact infomation của khách hàng

project for Template ts

[Role]
using esling + prittier
disable hermes
using tranform remove console to remove console.log before build
or using LogApp() || reactoron to log.

[ANDROID]()
+ logo: 512x512
+ Feature graphic: 1024*512
+ screenshot: 16:9 or 9:16
+ video preview: link youtube

[IOS](3 app previews and 10 screenshots)
+ iPhone 6.7" or 6.9" Displays.
```
  (1320 × 2868px, 2868 × 1320px, 1290 × 2796px or 2796 × 1290px)
  - 1320 × 2868 px: Tương ứng với iPhone 14 Pro Max và iPhone 15 Pro Max.
  - 2868 × 1320 px: Cũng tương ứng với iPhone 14 Pro Max và iPhone 15 Pro Max (định hướng ngang).
  - 1290 × 2796 px: Tương ứng với iPhone 14 Plus và iPhone 15 Plus.
  - 2796 × 1290 px: Cũng tương ứng với iPhone 14 Plus và iPhone 15 Plus (định hướng ngang).
```
+ Iphone 6.5"
```
  (1242 × 2688px, 2688 × 1242px, 1284 × 2778px or 2778 × 1284px)
  - 1242 × 2688 px: Tương ứng với iPhone XS Max và iPhone 11 Pro Max.
  - 2688 × 1242 px: Cũng tương ứng với iPhone XS Max và iPhone 11 Pro Max (định hướng ngang).
  - 1284 × 2778 px: Tương ứng với iPhone 12 Pro Max, iPhone 13 Pro Max và iPhone 14 Pro Max.
  - 2778 × 1284 px: Cũng tương ứng với iPhone 12 Pro Max, iPhone 13 Pro Max và iPhone 14 Pro Max (định hướng ngang).
```

+ video preview:
+

[Code push](https://github.com/microsoft/appcenter-cli)

+ npm install -g appcenter-cli
+ npm install -g code-push-cli
+ code-push login
+ run: appcenter profile list to check login app
+ run: appcenter apps list to check list app
+ edit name app trong script (package.json) trung vơi Xcode name
+ run: createAppCenterAndroid
+ run: createAppCenterIOS
+ change CodePushDeploymentKey: android/values.xml
+ edit CodePushDeploymentKey: ios/info.plit

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
