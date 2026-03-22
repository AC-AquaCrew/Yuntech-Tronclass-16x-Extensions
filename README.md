# Yuntech Tronclass 16x Extensions

#### 一個專為了yuntech tronclass做的chrome插件，如果你修的課程有達成影片觀看率的需求，並且擔心老師會真的去查你的觀看時數的話，那或許這個插件能夠幫助到你。₍^. .^₎⟆

## 特性
- 影片真的有播放，插件實際做的只有加速。
- 由於影片是真的被播放，而不是略過播放過程假裝完成，因此觀看時數會被記錄。
- 超絕好看互動界面（很可愛欸）。
- 兼容內嵌的youtube影片，同樣能計觀看時數。
- 可自動播放完整門課的所有影片（beta）。
- 支援背景播放，你甚至能邊玩電腦邊掛網_(-ω-＿)＿。

## 原理

> Tronclass在播放影片的時候就算是用快轉播放同樣能被正確計時。假設今天有一部1小時的影片，用2倍速快轉能達成只看30分鐘並且在"學習分析"界面卻**實際顯示1小時**的效果。

> 透過這個機制，我們如果盡可能的快轉影片就能夠做到只花少量時間卻能夠讓系統正確計時。

> 而每過一定秒數則會重置播放規避系統校對時間。

> 理論效率能達到實際時間1小時內就看完16小時的影片，請自行斟酌使用。

## 如何安裝
### 確保你正在使用Google Chrome瀏覽器
 1. 下載專案，手動下載zip或者git clone都可。
 2. 解壓縮把專案資料夾放到你喜歡的位置。
 3. 打開 Chrome，然後到這個頁面：`chrome://extensions/`。
 4. 把右上"開發人員模式"打開。
 5. 點左上"載入未封裝項目"。
 6. 選這個專案的資料夾。
  > (或許可以試著使用不同瀏覽器，但那我就不會用ㄌ)。

## 使用方式
### 先決定你想快速完成單一個影片還是想掛網刷完整門課所有影片
> 單一影片模式

 1. 到你要看的那個**影片**頁面，這時候你的網址應該長得像這樣`.../course/<一串數字>/learning-activity/full-screen#/<一串數字>`
 2. 點開右上角的chrome擴充功能按鈕。
 3. 選擇`single video`。
 4. 按`start`。
 5. 這時候如果一切正常，影片會開始加速播放，並且在播完後跳出一個小視窗提醒你。
 6. 補充：當你按下`start`後，如果在不點這個分頁任何東西的情況下，可以點其它任何你電腦在跑的應用程式，就可以一邊掛網一邊做其他的事情ㄌ。

> 全部影片模式（beta）

 1. 到你要看的課程的**章節**頁面，這時候你的網址應該長得像這樣`.../course/<一串數字>/content#/`
 2. 點開右上角的chrome擴充功能按鈕。
 3. 選擇`all video`。
 4. 如果需要的話，可以填入想播放第幾部到第幾部影片（此功能目前未實作）。
 5. 按`start`。
 6. 這時候如果一切正常，頁面會自動重新導向至第一部影片，且影片會開始加速播放，並且在播完後自動重新導向到下一個影片，以此往復直到所有都播完。
 7. 補充：當你按下`start`後，如果在不點這個分頁任何東西的情況下，可以點其它任何你電腦在跑的應用程式，就可以一邊掛網一邊做其他的事情ㄌ。
 
 > 自適應模式

用這個模式的話，會自動偵測所在頁面要執行單一還是全部，但是你仍然要把頁面調整到正確的地方，否則無法辨識。（舉例：假設你今天在刷單一影片的頁面用auto模式，那他會自動執行單一影片模式，但如果位置不是單一模式也不是全部模式的頁面，則無法執行）。

## 已知問題
> 這些問題可能會發生...

| 問題 | 狀態 |
|--|--|
| 全部模式切換下一步時卡死 | 正在嘗試修復，解決方案就是先不要用全部模式，單一模式將就用捏。 |
| 影片一直轉圈圈 | 這...這不是我的問題吧或許是你網路不好，但我會試著修。 |
| 整個瀏覽器很卡 | 我也不知道為什麼捏，換電腦啦><。 |
| 明明看完系統卻顯示未達標 | 未知原因，未知觸發方式，嘗試修復。 |
| 多影片模式無法判定結束播放 | 我盡力了真的很忙🥹，給點時間。 |
| 按某些按鍵沒作用 | 看看下面未實作的部分₍ ^.  ̫ .^ ₎。 |

## 未實作
> 這裡的東西我不一定會做，但是有想法所以先提出。

 - [ ] 調整每個動作的緩衝時間
 - [ ] 停止按鍵
 - [ ] 進度條
 - [ ] 調整預設畫質
 - [ ] 誤暫停後重新開始
 - [ ] 調整自動播放多影片的範圍
 - [ ] 其它有趣的整活項目

## 支援性
| \ | 功能 |
|--|--|
| ✅ | 使系統記錄觀看時間 |
| ✅ | 原生影片 |
| ✅ | youtube影片 |
| ❓ | vimeo影片 |
| ✅ | 背景執行 |
| ❌ | 暫停後重開 |

✅：可以 | ❌：不行 | ❓：不知道/未測試。

---
### 簡易的故障排除
 > 理論上大部分的故障都可以透過重新整理整個網頁來排除。

 > 影片播到卡住就直接重新整理，重新點插件就可以解決。
 
 > 播單一影片播不了的話可以試著手動介入去先幫影片點開始。
---
#### 手把手圖示教學請見專案根目錄下`tutorial`資料夾。
#### 有想法可以直接發pr，命名請遵循大致規則，並且說明文字使用英文。
```
          へ ♡ ╱|、
        ૮ > <) (•˕ • 7
        / ⁻ ៸|  |、⁻〵)
    乀(ˍ, ل ل   じしˍ,)ノ
```

---

#### EN version, translated by ChatGPT5.3

---

#### A Chrome extension made specifically for Yuntech Tronclass. If your course requires a video watch rate and you're worried the teacher might actually check your watch time, then maybe this extension can help you. ₍^. .^₎⟆

## Features
- The video is actually playing; the extension only speeds it up.
- Since the video is truly played (not skipped), the watch time will be recorded.
- Super cute interactive UI (it's really adorable).
- Compatible with embedded YouTube videos, watch time is also counted.
- Can automatically play all videos in a course (beta).
- Supports background playback, you can AFK while doing other things _(-ω-＿)＿.

## Principle

> Tronclass still counts time correctly even when videos are played at accelerated speed. For example, if there's a 1-hour video, playing it at 2x speed lets you finish it in 30 minutes, but the "learning analysis" page will **actually show 1 hour**.

> Using this mechanism, if we fast-forward as much as possible, we can spend less time while still letting the system count it correctly.

> The playback is reset every certain number of seconds to avoid system time verification.

> The theoretical efficiency allows watching 16 hours of videos within 1 hour of real time. Use at your own discretion.

## Installation
### Make sure you are using Google Chrome
 1. Download the project (either download zip or git clone).
 2. Extract it and place the folder wherever you like.
 3. Open Chrome and go to: `chrome://extensions/`.
 4. Turn on "Developer mode" at the top right.
 5. Click "Load unpacked" at the top left.
 6. Select this project folder.
  > (You can try other browsers, but I won't know how to use them).

## Usage
### First decide whether you want to quickly finish a single video or AFK through all videos in a course

> Single video mode

 1. Go to the **video** page you want to watch. The URL should look like this:  
    `.../course/<numbers>/learning-activity/full-screen#/<numbers>`
 2. Click the Chrome extension button at the top right.
 3. Select `single video`.
 4. Press `start`.
 5. If everything works, the video will start playing at accelerated speed, and a small popup will notify you when it finishes.
 6. Note: After pressing `start`, as long as you don't click anything in this tab, you can switch to other applications and AFK while doing other things.

> All video mode (beta)

 1. Go to the **course chapter** page. The URL should look like this:  
    `.../course/<numbers>/content#/`
 2. Click the Chrome extension button at the top right.
 3. Select `all video`.
 4. You can input the range of videos to play (this feature is not implemented yet).
 5. Press `start`.
 6. If everything works, the page will automatically redirect to the first video, play it at accelerated speed, and then automatically move to the next video after finishing, repeating until all are done.
 7. Note: After pressing `start`, as long as you don't click anything in this tab, you can switch to other applications and AFK while doing other things.

> Adaptive mode

In this mode, it will automatically detect whether to run single or all video mode based on the current page. However, you still need to be on the correct page, otherwise it cannot recognize it.  
(Example: If you're on a single video page and use auto mode, it will run single video mode. But if you're not on either a single or all video page, it won't work.)

## Known Issues
> The following problems may occur...

| Issue | Status |
|--|--|
| Freezes when switching to next video in all mode | Trying to fix, for now just don't use all mode, stick with single mode for now, sorry! (｡•́︿•̀｡) |
| Video keeps buffering | Uh... maybe it's your internet, but I'll try to fix it. |
| Browser becomes laggy | I don't know why either, maybe get a better computer >< |
| Finished but system says not completed | Unknown cause, unknown trigger, trying to fix. |
| Cannot detect end of playback in multi-video mode | I'm really trying but busy 🥹, give me some time. |
| Some buttons don't work | Check the unimplemented section below ₍ ^.  ̫ .^ ₎. |

## Not Implemented
> I might not implement these, but listing ideas first.

 - [ ] Adjust buffer time for each action.
 - [ ] Stop button.
 - [ ] Progress bar.
 - [ ] Adjust default video quality.
 - [ ] Resume after accidental pause.
 - [ ] Adjust range for auto-playing multiple videos.
 - [ ] Other fun.

## Compatibility
| \ | Function |
|--|--|
| ✅ | Record watch time |
| ✅ | Native videos |
| ✅ | YouTube videos |
| ❓ | Vimeo videos |
| ✅ | Background running |
| ❌ | Resume after pause |

✅: Yes | ❌: No | ❓: Unknown / Not tested

---
### Simple Troubleshooting
 > Most issues can be fixed by refreshing the page.

 > If the video gets stuck, just refresh and click the extension again.

 > If a single video won't play, try manually pressing play first.
---
#### Step-by-step illustrated tutorial is in the `tutorial` folder under the project root.
#### Feel free to submit a PR if you have ideas. Follow naming conventions and use English for descriptions.
```
          へ ♡ ╱|、
        ૮ > <) (•˕ • 7
        / ⁻ ៸|  |、⁻〵)
    乀(ˍ, ل ل   じしˍ,)ノ
```
