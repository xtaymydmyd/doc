# 问题清单

### iOS APP 中H5视频默认全屏播放问题解决 
#### 问题来源：2021-02-19：DP打开培训页面，视频自动播放

问题描述：在Android中，视频可以正常在H5页面局部播放，`iOS中则自动切换至全屏模式，即小窗口播放`

#### 第一步：H5页面标签设置
```H5
    <video id="chkfdsqumutgfsvgwb"
        width="100%" height="100%" 
        muted autoplay loop
        :poster="item.poster" 
        preload='auto'
        class="video_block" 
        src="XXXXX"
        x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline webkit-playsinline></video>
```
主要设置：`x5-video-player-type='h5' x5-video-player-fullscreen='true' playsinline `

说明： 
1、iOS10以上H5视频不自动全屏播放识别 playsinline这个属性；
2、iOS10以下H5视频不自动全屏播放识别 webkit-playsinline这个属性

#### 第二步：IOS端代码实现
```back
_myWebView.allowsInlineMediaPlayback = YES;
```
如果是Cordova项目的话，在config.xml中 platform=ios下加上一行代码：
```config
<preference name="AllowInlineMediaPlayback" value="true" />
<preference name="MediaPlaybackRequiresUserAction" value="false" />
```
