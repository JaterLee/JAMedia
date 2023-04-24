//
//  RNTMujiVideoView.m
//  muji_rn
//
//  Created by Jater on 2023/4/11.
//

#import "RNTJAVideoView.h"
#import "JAMedia-Swift.h"

@interface RNTJAVideoView ()<MJVideoPlayerProtocol>

@property (nonatomic, strong) MJVideoPlayer *videoPlayer;

@end

@implementation RNTJAVideoView

- (void)layoutSubviews {
  [super layoutSubviews];
  self.videoPlayer.frame = self.bounds;
}

#pragma mark - Propertys

- (void)setSource:(NSDictionary *)source {
  NSString *uri = source[@"uri"];
  if (!uri || [uri isEqualToString:@""]) {
    NSLog(@"Could not find video URL in source %@", source);
    return;
  }
  [self.videoPlayer playVideoWith:[NSURL URLWithString:uri]];
}

- (void)setPaused:(BOOL)paused {
}

#pragma mark - MJVideoPlayerProtocol
- (void)onVideoEnd {
  if (self.onEnd) {
    self.onEnd(@{});
  }
}

#pragma mark - Setter and Getter

- (MJVideoPlayer *)videoPlayer {
  if (!_videoPlayer) {
    _videoPlayer = [[MJVideoPlayer alloc] init];
    _videoPlayer.delegate = self;
    [self addSubview:_videoPlayer];
  }
  return _videoPlayer;
}

@end
