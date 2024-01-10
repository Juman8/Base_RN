package com.myapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader

import com.microsoft.codepush.react.CodePush
import com.myapp.splash_screen.SplashScreenReactPackage

class MainApplication : Application(), ReactApplication {
    override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
          val packages: MutableList<ReactPackage> = PackageList(this).packages

          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(SplashScreenReactPackage())
          CodePush("qhkiv9WbY9MFYOd3Lu4zvFn5m4tSmSTk743ws", applicationContext, false)
          return packages
        }
        override fun getJSMainModuleName(): String = "index"
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        override fun getJSBundleFile(): String? {
            return CodePush.getJSBundleFile()
        }
      }
    override val reactHost: ReactHost
        get() = getDefaultReactHost(this.applicationContext, reactNativeHost)
    // override fun getReactNativeHost(): ReactNativeHost {
    //     return mReactNativeHost
    // }

    override fun onCreate() {
        super.onCreate()
        // CodePush.setReactInstanceHolder(mReactNativeHost);
        // If you opted-in for the New Architecture, we enable the TurboModule system
        SoLoader.init(this,  /* native exopackage */false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            load()
        }
        ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }
}