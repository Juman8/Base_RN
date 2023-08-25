#import "AppDelegate.h"

#import <CodePush/CodePush.h>
#import <React/RCTBundleURLProvider.h>
#import "RNBootSplash.h"
#import <Firebase.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  if ([FIRApp defaultApp] == nil) {
      [FIRApp configure];
  }
  
  [RNBootSplash initWithStoryboard:@"LaunchScreen" rootView:self.window.rootViewController.view];
  self.moduleName = @"TemplateAd";
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];
#endif
}

@end
