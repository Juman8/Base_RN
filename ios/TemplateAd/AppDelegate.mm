#import "AppDelegate.h"

#import <CodePush/CodePush.h>
#import <React/RCTBundleURLProvider.h>
#import "RNBootSplash.h"
#import <Firebase.h>
#import "LaunchScreenManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
  }

  self.moduleName = @"TemplateAd";
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (UIView *)createRootViewWithBridge:(RCTBridge *)bridge
                          moduleName:(NSString *)moduleName
                           initProps:(NSDictionary *)initProps {
  UIView *rootView = [super createRootViewWithBridge:bridge
                                          moduleName:moduleName
                                           initProps:initProps];

//  [[LaunchScreenManager instance] animateAfterLaunch:rootView];
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // ⬅️ initialize the splash screen


  return rootView;
}



- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  // return [self getBundleURL];
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

@end
