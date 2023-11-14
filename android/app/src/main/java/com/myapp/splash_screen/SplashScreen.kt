package com.myapp.splash_screen

import android.animation.ObjectAnimator
import android.app.Activity
import android.app.Dialog
import android.os.Build
import android.view.WindowManager
import android.widget.ImageView
import com.myapp.R
import java.lang.ref.WeakReference


public class SplashScreen {
    companion object {
        private var mSplashDialog: Dialog? = null
        private var mActivity: WeakReference<Activity>? = null

        @JvmStatic
        fun init(activity: Activity?, themeResId: Int, fullScreen: Boolean) {
            if (activity == null) return
            mActivity = WeakReference(activity)
            activity.runOnUiThread {
                if (!activity.isFinishing) {
                    mSplashDialog = Dialog(activity, themeResId)
                    mSplashDialog?.window?.attributes?.windowAnimations = R.style.PauseDialogAnimation
                    mSplashDialog?.setContentView(R.layout.launch_screen)
                    val imgAppIcon = mSplashDialog?.findViewById<ImageView>(R.id.img_app_icon)
                    val animator = ObjectAnimator.ofFloat(imgAppIcon, "rotation", 0f, 360f)
                    animator.duration = 2000
                    animator.start()
                    mSplashDialog?.setCancelable(false)
                    setActivityAndroidP(mSplashDialog)
                    if (!mSplashDialog?.isShowing!!) {
                        mSplashDialog?.show()
                    }
                }
            }
        }

        @JvmStatic
        fun show(activity: Activity?, fullScreen: Boolean) {
            val resourceId = R.style.BootTheme
            init(activity, resourceId, fullScreen)
        }

        @JvmStatic
        fun show(activity: Activity?) {
            show(activity, false)
        }

        @JvmStatic
        fun hide(activity: Activity?) {
            var activityTemp = activity
            if (activity == null) {
                if (mActivity == null) {
                    return
                }
                activityTemp = mActivity?.get()
            }

            if (activity == null) return


            activityTemp?.runOnUiThread {
                if (mSplashDialog != null && mSplashDialog?.isShowing!!) {
                    var isDestroyed = false

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                        isDestroyed = activityTemp.isDestroyed
                    }

                    if (!activityTemp.isFinishing && !isDestroyed) {
                        mSplashDialog?.dismiss()
                    }
                    mSplashDialog = null
                }
            }
        }

        private fun setActivityAndroidP(dialog: Dialog?) {
            // Thiết lập full screen
            if (Build.VERSION.SDK_INT >= 28) {
                if (dialog != null && dialog.window != null) {
                    dialog.window?.addFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS)
                    val lp = dialog.window?.attributes
                    lp?.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
                    dialog.window?.attributes = lp
                }
            }
        }
    }
}