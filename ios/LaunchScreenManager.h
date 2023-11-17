//
//  LaunchScreenManager.h
//  TemplateAd
//
//  Created by Andrew Tran on 11/17/23.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface LaunchScreenManager : NSObject

@property (nonatomic, strong) UIView *view;
@property (nonatomic, strong) UIView *parentView;

+ (instancetype)instance;
- (instancetype)initWithAnimationDurationBase:(double)animationDurationBase;

- (void)animateAfterLaunch:(UIView *)parentViewPassedIn;

@end
