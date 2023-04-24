//
//  MJVideoPlayer.swift
//  muji_rn
//
//  Created by Jater on 2023/4/10.
//

import Foundation
import UIKit

@objc protocol MJVideoPlayerProtocol {
  func onVideoEnd()
}

typealias OnEndBlockHandler = () -> Void

class JAControlView: ZFPlayerControlView {
  var onEndBlock: OnEndBlockHandler?
  override func videoPlayerPlayEnd(_ videoPlayer: ZFPlayerController) {
    self.onEndBlock?()
  }
}

@objcMembers class MJVideoPlayer: UIView {
  private var player: ZFPlayerController?

  weak var delegate: MJVideoPlayerProtocol?

  lazy var controlView: JAControlView = {
    let controlView = JAControlView()
    controlView.fastViewAnimated = true
    controlView.autoHiddenTimeInterval = 5
    controlView.autoFadeTimeInterval = 0.5
    controlView.prepareShowLoading = true
    controlView.prepareShowControlView = false
    controlView.showCustomStatusBar = true
    controlView.fullScreenMode = .landscape
    return controlView
  }()

  override init(frame: CGRect) {
    super.init(frame: frame)

    self.setupPlayer()
  }

  @available(*, unavailable)
  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  override func layoutSubviews() {
    super.layoutSubviews()
  }

  // MARK: - Public

  func playVideo(with Url: URL) {
    self.player?.assetURL = Url
  }

  func paused(_ paused: Bool) {}

  // MARK: - Private

  private func setupPlayer() {
    let playerManager = ZFAVPlayerManager()
    playerManager.shouldAutoPlay = true

    self.controlView.onEndBlock = { [weak self] in
      self?.delegate?.onVideoEnd()
    }

    self.player = ZFPlayerController(playerManager: playerManager, containerView: self)
    self.player?.controlView = self.controlView
    self.player?.pauseWhenAppResignActive = false
  }
}
