//
//  RNTMujiVideoView.h
//  muji_rn
//
//  Created by Jater on 2023/4/11.
//

#import <UIKit/UIKit.h>
#import <React/UIView+React.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNTJAVideoView : UIView

@property (nonatomic, copy) RCTDirectEventBlock onVideoSeek;
@property (nonatomic, copy) RCTDirectEventBlock onEnd;


@end

NS_ASSUME_NONNULL_END
