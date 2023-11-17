//
//  LaunchScreenManager.swift
//  TemplateAd
//
//  Created by Andrew Tran on 11/17/23.
//

import UIKit

@objc public class LaunchScreenManager: NSObject {

    // ... Các phương thức và thuộc tính khác ...

    fun animateImage() {
        UIImageView *imageView = [self.view viewWithTag:0];
        if (imageView) {
            [UIView animateWithDuration:self.animationDurationBase animations:^{
                // Thực hiện các thay đổi bạn muốn áp dụng cho animation
                imageView.transform = CGAffineTransformMakeScale(1.2, 1.2);
            }];
        }
    }
}
