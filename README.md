# 使用 Git 一起工作

本儲存庫為 Git／GitHub 學習筆記與練習的目錄索引。

第一次學 Git，建議依序閱讀：**環境安裝與設定 → 開始使用 Git → 分支 → worktree → GitHub 基本操作 → 共同開發與 PR → AI 開發時的 Git 策略**。先練習 `add`、`commit`、`status`，再練習建立與合併分支，最後學同時在不同資料夾工作與合作。

操作時，每一步先確認三件事：**我在哪個資料夾？我在哪個分支？這一步完成後應該看到什麼？** 可以用 `pwd`、`git branch --show-current`、`git status` 檢查。

## 基本設定

- [環境安裝與設定](./環境安裝與設定)
- [開始使用 Git](./開始使用Git)
- [使用 master 或 main 主要分支](./使用master主要分支)
- [回復被刪除的檔案或被編輯的內容](./回復被刪除的檔案或被編輯的內容)
- [不想被追蹤的檔案（.gitignore）](./不想被追蹤的檔案)

## `git checkout`

- [檢查先前修改的檔案](./檢查先前修改的檔案)

## Commit 與歷史紀錄

- [修改目前 commit（`--amend`）](./修改目前commit)
- [`git reset`（`--hard`、`--soft`、`--mixed`）](./git_reset/)
- [`git rebase`](./git_rebase)（修改 commit 訊息、刪除／合併／切割 commit 等互動式操作）

## 分支與標籤

- [分支](./分支)
- [worktree：同時在不同資料夾處理不同分支（含完整實作）](./worktree)
- [標籤（tag）](./tag)

## GitHub

1. [GitHub 基本操作](./github)
2. 使用 GitHub CLI 建立遠端 repo（見 [`github/README.md`](./github) 第 9 節）
3. 使用 GitHub 網站建立 repo（見同頁第 10 節）
   - 本地端資料夾（已有檔案）
   - 本地端資料夾（空資料夾）
4. [建立 GitHub 專用的憑證](./credential)
5. [建立 GitHub 專用的 SSH](./ssh/)

## 疑難排解

- [整合 GitHub 常遇的錯誤訊息](./github常遇的錯誤訊息)

## 共同開發與 Pull Request

- [GitHub 簡單共同開發](./協作與PullRequest)：網頁編輯、同組分支與 PR、Fork 交作業，含兩人實作。

## 日常工作與 AI 開發

- [使用 AI 開發時的 Git 策略](./日常工作流程)：任務分支、小步提交、差異檢查、失敗復原與 worktree，含不用 AI 也能操作的練習。

## 課程與測驗

- [課程](./課程)
- [測驗](./測驗)
