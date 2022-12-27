# Template ts

project for Template ts

# Role 
using esling + prittier
disable hermes
using tranform remove console to remove console.log before build
or using LogApp() || reactoron to log.

#ANDROID
+ logo: 512x512
+ Feature graphic: 1024*512
+ screenshot: 16:9 or 9:16
+ video preview: link youtube

#IOS
+ 1242x2688   ~ iiPhone 11 Pro Max
+ 1242x2208 :  ~ ip 8plus
+ video preview: 
+ 
#Code push
+ npm install -g appcenter-cli
+ npm install -g code-push-cli
+ code-push login 
+ edit name app trong script (package.json)
+ run: createAppCenterAndroid
+ run: createAppCenterIOS
+ change CodePushDeploymentKey: android/values.xml
+ edit CodePushDeploymentKey: ios/info.plit