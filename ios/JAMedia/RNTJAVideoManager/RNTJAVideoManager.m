//
//  RNTMujiVideoManager.m
//  muji_rn
//
//  Created by Jater on 2023/4/11.
//

#import "RNTJAVideoManager.h"
#import "RNTJAVideoView.h"

@implementation RNTJAVideoManager

RCT_EXPORT_MODULE(RNTJAVideo)

- (UIView *)view {
  return [[RNTJAVideoView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(onVideoSeek, RCTDirectEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onEnd, RCTDirectEventBlock);

@end
