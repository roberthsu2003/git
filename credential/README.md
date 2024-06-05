設置 Git 的憑證幫助程序可以簡化身份驗證過程，特別是在使用 GitHub 時。這樣你不必每次推送或拉取時都輸入用戶名和密碼。以下是手動設置 Git 憑證幫助程序的步驟：

## 1. 設置憑證幫助程序


Git 提供了幾種不同的憑證幫助程序，你可以根據操作系統選擇最合適的。

### 1.1 `credential.helper cache`


這種方式適用於所有操作系統，但只會在短時間內緩存憑證（默認15分鐘）。

```other
git config --global credential.helper cache
```


你可以設置緩存的時間（單位是秒），例如緩存1小時：

```other
git config --global credential.helper 'cache --timeout=3600'
```


### 1.2 `credential.helper store`


這種方式會將憑證以純文本形式存儲在磁盤上，適用於所有操作系統。它比 `cache` 更加持久，但安全性較低。

```other
git config --global credential.helper store
```


第一次輸入憑證後，它們會被保存到 `~/.git-credentials` 文件中。

### 1.3 `credential.helper osxkeychain`（適用於 macOS）


這種方式會將憑證存儲在 macOS 的鑰匙串中，安全性較高。

```other
git config --global credential.helper osxkeychain
```


如果你還沒有安裝 `osxkeychain` 助手，可以使用以下命令安裝：

```other
git credential-osxkeychain
```


### 1.4 `credential.helper wincred`（適用於 Windows）


這種方式會將憑證存儲在 Windows 憑證存儲區中。

```other
git config --global credential.helper wincred
```


如果你還沒有安裝 `wincred` 助手，可以下載安裝 Git for Windows，這個助理工具會自動包含在內。

## 2. 配置 GitHub 憑證


設置好憑證幫助程序後，你需要配置 GitHub 憑證。

### 2.1 使用 Personal Access Token (PAT)


從2021年8月13日開始，GitHub 停止接受帳戶密碼進行身份驗證，推薦使用 Personal Access Token (PAT)。

### 2.2 創建 Personal Access Token

1. 登錄你的 GitHub 賬戶。
2. 前往 [Settings](https://github.com/settings/profile)。
3. 在左側欄中選擇 [Developer settings](https://github.com/settings/developers)。
4. 選擇 [Personal access tokens](https://github.com/settings/tokens)。
5. 點擊 `Generate new token` 按鈕。
6. 設置名稱和過期時間，並選擇所需的權限（例如，repo, workflow 等）。
7. 生成並複製 token。

### 2.3 使用 Personal Access Token


首次推送或拉取時，Git 會提示輸入用戶名和密碼：


- 用戶名：你的 GitHub 用戶名。
- 密碼：剛剛生成的 Personal Access Token。

這樣，憑證會被憑證幫助程序存儲，未來不需要再次輸入。

## 3. 檢查配置


你可以檢查你的憑證幫助程序配置是否正確：

```other
git config --global credential.helper
```


## 總結


通過設置憑證幫助程序，你可以簡化使用 GitHub 的身份驗證過程。根據你的操作系統選擇合適的憑證幫助程序，並使用 Personal Access Token 進行身份驗證，確保你的工作流程更加順暢和安全。
