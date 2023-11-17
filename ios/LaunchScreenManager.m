// LaunchScreenManager.m
#import "LaunchScreenManager.h"

@implementation LaunchScreenManager {
    double _animationDurationBase;
}

static LaunchScreenManager *_instance = nil;

+ (instancetype)instance {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[LaunchScreenManager alloc] initWithAnimationDurationBase:1.3];
    });
    return _instance;
}

- (instancetype)initWithAnimationDurationBase:(double)animationDurationBase {
    self = [super init];
    if (self) {
        _animationDurationBase = animationDurationBase;
    }
    return self;
}

- (void)animateAfterLaunch:(UIView *)parentViewPassedIn {
    self.parentView = parentViewPassedIn;
    self.view = [self loadView];

    if (self.parentView && self.view) {
        [self.parentView addSubview:self.view];
        self.view.frame = self.parentView.bounds;
        self.view.center = self.parentView.center;
        [self animateImage];
    }
}

- (void)animateImage {
    UIImageView *imageView = [self.view viewWithTag:1];
    if (imageView) {
        [UIView animateWithDuration:_animationDurationBase animations:^{
            imageView.transform = CGAffineTransformMakeScale(1.2, 1.2);
        }];
    }
}

- (UIView *)loadView {
    NSArray *nibContents = [[NSBundle mainBundle] loadNibNamed:@"BootSplash" owner:nil options:nil];
    UIView *launchScreenView = [nibContents firstObject];
    return launchScreenView;
}

@end
