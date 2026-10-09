# HTTPS 憑證與 personal access token

本章是設定查詢，不是要把每一種 helper 全部設定一次。SSH 使用者可先閱讀 [SSH 章節](../ssh/README.md)。提交作者設定與 GitHub 登入是兩回事。

## 1. 優先使用登入與安全儲存工具

HTTPS 可搭配 GitHub CLI 或 Git Credential Manager（GCM），使用瀏覽器登入，並依環境管理憑證。在 Windows 上，Git for Windows 安裝時通常提供 GCM 選項；macOS／Linux 的安裝方式依發行版本不同，請查 [GitHub 官方憑證指南](https://docs.github.com/en/get-started/git-basics/caching-your-github-credentials-in-git)。不要用猜測的 helper 名稱覆蓋已有設定。

```bash
git config --show-origin --get-all credential.helper
```

這只顯示 helper 設定，不顯示 token。若未設定，指令可能沒有輸出並回傳非零狀態，不代表 Git 壞掉。

| helper | 特性 |
| --- | --- |
| GCM | 需安裝；支援登入流程與依平台的安全儲存方式 |
| osxkeychain | macOS Keychain；需對應 helper 已安裝 |
| cache | 短時間保留記憶體憑證，使用 Unix domain socket，不適用所有系統 |
| store | 明文存到磁碟，不適合保存課堂帳密或 token |

`git credential-osxkeychain` 是呼叫 helper，不是安裝指令。wincred 與 GCM 也不是同一工具。請依實際安裝文件操作。

若 Unix 環境確定要使用短時間 cache，查詢用設定是 `git config --global credential.helper 'cache --timeout=3600'`；預設 cache 時間是 900 秒。`git credential-cache exit` 清除的是這個 cache 的記憶體，不會登出 Keychain、GCM 或 SSH。

## 2. 必要時建立 PAT

GitHub 不接受帳號密碼作為 HTTPS Git 密碼。若環境需要手動 token，從帳號 Settings → Developer settings → Personal access tokens 建立；介面位置可能調整，參考 [官方 PAT 指南](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)。

優先考慮 fine-grained token，選對資源擁有者、需要的儲存庫與有效期限；推送一般內容需相應的 Contents 寫入權限，修改 workflow 等操作可能需要額外權限。組織也可能要求批准或 SSO，不能只看 token 是否成功產生。classic token 的 scope 與 fine-grained 權限不同，不要直接照抄 repo、workflow 等舊教學組合。

只有 Git 在 HTTPS 驗證時要求 username/password，才在 password 欄輸入 token；有登入工具時不一定出現這個提示。終端機密碼欄通常不回顯，這是正常現象。

不要把 token 放進遠端 URL、shell 指令、截圖或教材；不要 commit。遺失或洩漏時到 GitHub 撤銷並重新建立，不只是刪掉本機檔案。

## 3. 驗證失敗怎麼查？

1. `git remote -v` 確認是 HTTPS、帳號與專案路徑正確。
2. 確認登入工具使用的帳號具有該專案權限。
3. token 是否到期、撤銷、選錯儲存庫，或欠缺組織批准／SSO。
4. 依實際 helper 的方法移除錯誤憑證，再重新登入；不要刪除所有帳號的資料。

GitHub CLI 已安裝時，可用 `gh auth status` 查該工具的登入狀態；這不代表其他 helper 或 SSH 一定使用同一帳號。設定成功後在自己的練習儲存庫推送一條任務分支，不需要為了測試改動共享 main。
