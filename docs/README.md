# Git 圖解教室：靜態 SVG 與 JavaScript 互動版

目前有 **11 章、44 個互動步驟**，另有一張 nano 操作補充圖，共 **45 組 SVG（各附桌面與手機版本）**，以及 **24 份離線閱讀頁面**。每張都是可編輯的向量圖，文字與線條可放大；互動版使用同一份資料，讓學生逐步觀察檔案、暫存區與分支的位置。

## 學生怎麼開？

1. 下載或 clone 這份教材。
2. 用檔案管理員找到本資料夾的 **index.html**，拖進 Chrome、Edge、Firefox 或 Safari；也可用瀏覽器「開啟檔案」。不用安裝套件、啟動伺服器或連網。
3. 依「建立版本 → 一起開發 → 復原與整理」選章節，按「下一步」。遇到思考題先猜答案，再點開解答。
4. 可按「重播」、點步驟數字跳轉、用左右方向鍵切換，或下載目前步驟的 SVG。每章最後有實作入口與下一章導覽。
5. 手機請按右上角「課程目錄」選章節；圖解改為直向卡片，commit 的父子關係以文字列出，方便閱讀。

GitHub 的檔案預覽不會執行這份 HTML。若透過 GitHub 閱讀，先看各章靜態 SVG，下載後再開互動版。互動版是教學模擬，不會執行 Git 或動到自己的專案。

## 主題與靜態圖

| 主題 | 第一張圖 | 主要問題 |
| --- | --- | --- |
| 01 工作區與暫存區 | [staging-1.svg](diagrams/staging-1.svg) | add 後又編輯，commit 保存哪版？ |
| 02 main 與 HEAD | [history-1.svg](diagrams/history-1.svg) | 分支怎麼跟著 commit 移動？ |
| 03 分支與合併 | [branch-1.svg](diagrams/branch-1.svg) | 切回 main，功能檔案為什麼不見？ |
| 04 忽略檔案 | [ignore-1.svg](diagrams/ignore-1.svg) | 為什麼已追蹤檔案仍被記錄？ |
| 05 GitHub 共同開發 | [collaboration-1.svg](diagrams/collaboration-1.svg) | commit、push、PR、merge、pull 差在哪裡？ |
| 06 Fork 交作業 | [fork-1.svg](diagrams/fork-1.svg) | origin 與 upstream 指向誰？ |
| 07 worktree | [worktree-1.svg](diagrams/worktree-1.svg) | 另一個資料夾 commit，原本進度會變嗎？ |
| 08 AI 開發 | [ai-1.svg](diagrams/ai-1.svg) | 哪時候提交？改壞了怎麼處理？ |
| 09 restore | [restore-1.svg](diagrams/restore-1.svg) | 取消暫存是否也會還原檔案？ |
| 10 reset | [reset-1.svg](diagrams/reset-1.svg) | soft、mixed、hard 各改哪一區？ |
| 11 amend | [amend-1.svg](diagrams/amend-1.svg) | 修改提交後，為什麼識別碼變了？ |

## 老師怎麼帶？

先停在操作前，請學生預測哪一區會改變，再按下一步。請學生用自己的話說出「目前資料夾、目前分支、是否已提交」，最後回各章完成真正的終端機操作。圖解不能取代實作。

核心概念圖已改為 SVG，原 PNG 與 Illustrator 原檔仍保留作為歷史素材；實際軟體與登入畫面截圖保留原格式。舊分支章的 PNG 不再被新版教材引用，沒有把點陣圖包進 SVG 冒充向量圖。

## 維護圖片

- `lessons.js`：主題、每步檔案狀態、指令與思考題。
- `chapters/`：可離線閱讀的 HTML 講義，與圖解版面一致。
- `course.js`：章節順序、階段、學習目標與講義連結。
- `render-svg.js`：共用向量圖 renderer，含手機直向顯示。
- `player.js`：步驟切換、鍵盤操作、下載。
- `diagrams/`：產生後直接供 Markdown 使用的靜態 SVG。
- `diagrams-mobile/`：離線講義在手機自動選用的直向 SVG。

修改資料或 renderer 後，在儲存庫根目錄執行（只需要 Node.js，沒有 npm 依賴）：

```bash
node scripts/build-diagrams.cjs
node scripts/build-readers.cjs
```

SVG 圖片嵌入時 JavaScript 不會執行，所以採用「Markdown 靜態 SVG＋HTML 內嵌 SVG 互動」方式，而非把 script 塞進圖片。參考：[MDN：SVG 作為圖片的限制](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_as_an_image)。
