# 教師課程安排

課程主線為 **VS Code 入門與日常練習 → 深入建立版本 → 分享與協作 → 復原及延伸**。先讓學生用 Source Control 累積 Commit 經驗，再以 VS Code Terminal 理解指令，之後才增加遠端、多人合作與歷史操作。互動圖解用於解釋狀態，不必依圖解編號當作上課順序。

## 建議教學安排

以下為可調整的單元，不限定每單元一堂課。入門安排在第一個程式範例完成後；後續 Commit 練習穿插在原有課程，無須等 Git 專門章節才開始。

| 單元 | 章節與重點 | 課堂任務 | 驗收方式 |
| --- | --- | --- | --- |
| 準備 | 安裝 Git、VS Code，設定提交身分及 Terminal | 開啟練習資料夾，確認 Git 版本 | 能說出目前操作的資料夾 |
| 入門 | [VS Code Source Control](../VSCode入門/README.md)：Repository、Changes、Stage、Commit | 完成第一個範例並建立 Commit | 能解釋 Commit 的用途並跟著操作 |
| 日常練習 | 每個範例後查看差異、Stage、Commit | 前 1～2 次完整示範，第 3～4 次口頭提示，之後由學生獨立操作 | 能選對檔案並寫出描述修改的訊息 |
| 深入版本 | 熟悉幾次 Commit 後，學 01 工作區與暫存區、02 分支與歷史 | 在 Terminal 操作，對照 Source Control；再練習 Stage 後修改 | 能說明 Commit 保存哪一版；HEAD 細節可稍後深入 |
| 分支 | 03 分支與合併、04 `.gitignore` | 建立分支新增功能，提交並合併；排除不需追蹤的檔案 | 能獨立完成基本流程；需要時提早教 `.gitignore` |
| 分享與合作 | GitHub 基本操作、Remote、Push、Pull，接著 05 PR | 推送練習專案，兩人分工並互相檢查 PR | 能說明本機與遠端、Push、Pull、PR 的差別 |
| 依需求 | 06 Fork、09 取消暫存與未提交修改的處理 | 依交作業情境使用 Fork；在練習專案處理修改 | 能說出操作目的與可能影響 |
| 進階選讀 | 07 worktree、08 AI 節奏、10 reset、11 amend，以及 tag、rebase | 依需求在獨立練習專案實作 | 先預測影響，操作後檢查並解釋結果 |

日常每個範例預留約 2～5 分鐘：執行範例、查看 Changes、Stage、輸入訊息、Commit。第一次完整入門可預留約 20～30 分鐘。若學生尚未熟悉 Terminal，先練習路徑、建檔及讀檔；需要忽略虛擬環境等檔案時，不必等到分支單元才教 `.gitignore`。

## 每一個概念的帶課方式

1. **先看情境：** 說明目前要解決的問題，例如功能未完成但臨時要修 bug。
2. **停在圖解操作前：** 讓學生預測哪個檔案、分支或區域會改變。
3. **逐步看圖：** 按下一步，請學生用自己的話解釋差異。
4. **實際操作：** 入門先用 Source Control；深入章節在 VS Code Terminal 輸入指令並對照圖形介面，每次確認位置、分支與結果。
5. **自己完成任務：** 不提供全部指令，讓學生依完成標準選擇操作。

圖解用來理解狀態，Source Control 與終端機用來操作和驗證。學生需要練習自己閱讀差異與輸出，不能只複製指令或 AI 的完成報告。

## 評量建議

請學生交「成果檔案、相關 commit／PR、實際檢查結果、自己對差異的解釋」。以能否完整完成任務與解釋操作為主，不只考指令名稱。

簡易評量：

- 能確認資料夾、分支與修改狀態。
- 每筆提交有清楚用途，沒有混入無關檔案。
- 合作時選對 PR 來源與目標，能更新本地 main。
- 會選擇適當的復原方法，能說出哪些內容將被改變。

其他 AI、文案與跨領域備課素材已整理到 [延伸主題](./延伸主題.md)，不列入 Git 主線。


## 課堂案例核對表

以下是老師帶做時的核對基準，不包含章末自主練習。獨立專案一律從未使用、且不在其他 Repository 內的練習位置開始；接續案例須沿用上一個案例的結果。每到表中的停點，先等學生核對，再往下操作。

| 案例 | 開始條件 | 示範完成時核對 |
| --- | --- | --- |
| VS Code 入門 | 開啟專用資料夾，確認是否已有 Repository | hello.py 顯示最新問候語，已有兩筆 Commit，預期修改都已提交 |
| 01 暫存區 | 新建 git-first | 三筆提交；index.txt 有首頁、團隊、聯絡三行；乾淨 |
| 02 歷史 | 新建 history-demo | main，三筆提交；index.txt、about.txt、contact.txt；乾淨 |
| 03 分支 | 新建 branch-demo | main 有 login.txt；feature-login 已刪除；乾淨 |
| 分支延伸案例一 | 新建 merge-demo | main 有 about.txt、contact.txt；歷史有 merge commit；乾淨 |
| 分支延伸案例二 | 接續案例一 | merge 時先確認 UU 與衝突標記；解決後 main 的 index.txt 是 Hello and welcome；乾淨 |
| 04 忽略 | 新建 ignore-demo | local.config 仍在磁碟，但不再追蹤且已被忽略；乾淨 |
| 05 共同開發 | A 建立含 README 的遠端，B 接受邀請；每人 clone | 兩份 PR 合併後，兩人本地 main 都有 course.md、members.md；乾淨 |
| 06 Fork | 老師提供可 Fork 且主要分支為 main 的專案 | PR 只改個人路徑；合併並同步後本地 main、origin/main、upstream/main 一致；乾淨 |
| 07 worktree 案例一 | 新建 worktree-demo；旁邊 hotfix 路徑未使用 | main 有正確首頁與兩行 login.txt；只剩原 worktree；乾淨 |
| 07 worktree 案例二 | 接續案例一；review 路徑未使用 | main 有 about.txt；審查 worktree 已移除；乾淨 |
| 07 worktree 案例三 | 接續案例二；old 路徑未使用 | 舊版看不到 about.txt；清理後回到原 main、只剩原 worktree |
| 08 AI 模擬 | 第 4 節新建 ai-git-demo；前面查詢範例不必照貼 | main 的 search.txt 有 ready 與 Hint；保留 Revert 紀錄；乾淨 |
| 09 復原 | 新建 restore-demo | note.txt 是 Version 1；保留 Revert 紀錄；scratch.txt 已清除；乾淨 |
| 10 reset | 新建 reset-demo | 每種模式先核對 HEAD、暫存區與工作區；最後 main 回 V3、三筆提交、乾淨 |
| 11 amend | 新建 amend-demo | 最新是補充聯絡方式；前一筆包含 about.txt、contact.txt；共四筆提交、乾淨 |
| 13 tag | 新建 tag-demo | 本機第 2 節完成後回 main；v1.0 仍對應 Release 1；乾淨；分享標籤另行帶做 |
| 14 舊版本 | 新建 history-view-demo | 查看第一版時只見 a.txt；第 3 節回 main 後 a、b、c 都在；乾淨 |
| 15 rebase | 新建 rebase-demo，先確認編輯器能儲存離開 | reword 後四筆、squash 後兩筆、拆分後三筆；與 before-rebase 無檔案差異；乾淨 |

每一章開始時都重複確認資料夾、分支與 status；尚未建立 Repository 時，Git 指令顯示 not a git repository 是正常的。看到非預期錯誤先停下，依[首頁卡關流程](../README.md#課堂跟做與卡關)處理。

## 進階示範的拆分

- worktree 三個案例分次帶，每次先核對前一案例的完成狀態；第一次只做緊急修復即可。
- rebase 分為改訊息、合併提交、拆分提交三次示範，每次核對提交數及檔案差異後才繼續。編輯器中的操作要由學生親手完成。
- 合併方式比較先示範 fast-forward 與 merge commit，再另一次比較 squash 與 rebase；每次先預測歷史，再核對結果。
- SSH 與 HTTPS 由老師依教室環境先選一條路線，課前測試登入與自己的任務分支 push；多帳號、其他 helper 與 CLI 建庫留作選讀。
- Fork 收作業前，老師用兩個不同帳號路徑演練，確認 PR 各自只新增自己的檔案。兩人 PR 練習則每組使用自己的共用儲存庫，避免全班共用相同任務分支。
