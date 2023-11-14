package com.myapp.splash_screen

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SplashScreenModule(reactContext: ReactApplicationContext?) :
    ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "SplashScreen"
    }

    @ReactMethod
    fun show() {
        SplashScreen.show(currentActivity)
    }

    @ReactMethod
    fun hide() {
        SplashScreen.hide(currentActivity)
    }
}