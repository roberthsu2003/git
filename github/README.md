
# GitHub基本使用方法
## 0. 申請一個Github個人帳號

## 1. 編輯git的config

### 1.1 配置使用者名稱和電子郵件
Git需要知道你的身份。使用以下命令配置你的名稱和電子郵件：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的電子郵件"
```

### 1.2 查看配置
檢查你的配置設定是否正確：

```bash
git config --list
```

## 2. git的credential.name

### 2.1 設置憑證幫助程序
Git可以使用憑證幫助程序來管理你的密碼。設置憑證幫助程序：

```bash
git config --global credential.helper cache
```

### 2.2 查看已保存的憑證
檢查Git已保存的憑證：

```bash
git credential-cache exit
```

## 3. git remote的使用

### 3.1 添加遠端倉庫
添加遠端倉庫URL：

```bash
git remote add origin <遠端倉庫URL>
```

### 3.2 查看遠端倉庫
查看已添加的遠端倉庫：

```bash
git remote -v
```

### 3.3 刪除遠端倉庫
刪除遠端倉庫：

```bash
git remote remove origin
```

## 4. git fetch

### 4.1 拉取最新改動
從遠端倉庫獲取最新的改動：

```bash
git fetch origin
```

## 5. git pull

### 5.1 拉取並合併
從遠端倉庫拉取最新改動並合併：

```bash
git pull origin main
```

## 6. merge 和 rebase 的區別
### Merge（合併）
當你執行 git pull 時，如果使用的是合併策略（默認行為），Git 會創建一個新的合併提交，這個提交包含了本地和遠端分支的所有變更歷史。

```bash
git pull origin main
# 等同於：
git fetch origin
git merge origin/main
```

#### 優點：
- 保留了完整的歷史記錄，包括所有分支和合併點。
- 更容易理解每個變更是如何進行的。

#### 缺點:
- 歷史記錄可能會變得複雜，特別是在有很多分支和合併的情況下。

### Rebase（重排）
當你執行 git pull --rebase 時，Git 會將本地的提交暫存，然後將遠端的提交應用到本地分支，最後重新應用本地的提交。

```bash
git pull --rebase origin main
# 等同於：
git fetch origin
git rebase origin/main
```

#### 優點：
- 生成更線性的提交歷史，便於閱讀和理解。
- 沒有合併提交，歷史記錄更簡潔。



#### 缺點:
- 需要小心處理衝突，因為重排可能會改變提交的順序和內容。
- 可能會覆蓋他人的工作歷史，導致協作困難。



## 7. git push
git push 是 Git 的一個命令，用來將本地的提交（變更）推送到遠端倉庫。這個操作會將本地的分支更新同步到遠端分支，使得其他協作者可以看到和合併這些變更。以下是有關 git push 的詳細說明以及如何執行它的步驟。

### 7.1 git push 基本概念
- **推送（Push）**：將本地倉庫中的變更上傳到遠端倉庫。
- **遠端倉庫（Remote Repository）**：GitHub、GitLab、Bitbucket 等托管服務上的倉庫。
- **本地分支（Local Branch）**：你的電腦上的 Git 分支。
- **遠端分支（Remote Branch）**：遠端倉庫中的 Git 分支。
- 
### 7.2 基本用法
#### 7.2.1 配置遠端倉庫
在推送之前，需要確保你的本地倉庫已經配置了遠端倉庫。通常在git clone倉庫時會自動設置遠端倉庫，如果沒有，可以手動添加：

```bash
git remote add origin <遠端倉庫URL>
```

#### 7.2.2 推送到遠端倉庫

將本地的 main 分支推送到遠端的 main 分支：

```bash
git push origin main
```

這個命令中的 origin 是遠端倉庫的預設名稱，main 是你要推送的分支名稱。

#### 7.2.3 推送所有分支

如果你想推送所有本地分支，可以使用以下命令：

```bash
git push --all origin
```

#### 7.2.4 強制推送

有時候你可能需要強制推送（注意：這可能會覆蓋遠端分支上的變更，應謹慎使用）：

```bash
git push --force origin main
```

#### 7.2.5 推送標籤
如果你創建了標籤，也可以推送它們到遠端倉庫：

```bash
git push origin --tags
```

### 7.3 步驟示例
#### 7.3.1 假設情景
你在本地倉庫進行了一些變更，並且想要將這些變更推送到 GitHub 上的遠端倉庫。

#### 7.3.2 詳細步驟

##### 1. 初始化本地倉庫（如果還沒有）
```bash
git init
```

##### 2. 添加遠端倉庫

```bash
git remote add origin https://github.com/yourusername/your-repo.git
```

##### 3. 添加文件到暫存區

```bash
git add .
```

##### 4. 提交變更

```bash
git commit -m "描述你的變更"
```

##### 5. 推送到遠端倉庫

```bash
git push origin main
```

這樣，你的變更就會被推送到 GitHub 上的 main 分支，其他協作者就可以看到這些變更了。

#### 7.3.3 推送過程中的常見問題
##### 1. 認證問題

在推送過程中，你可能會被要求輸入 GitHub 的用戶名和密碼。為了避免每次都輸入，可以配置 SSH 密鑰或者使用憑證幫助程序。

##### 2. 分支衝突
如果遠端分支有其他人的變更，你在推送時可能會遇到衝突。在這種情況下，你需要先拉取遠端的變更並解決衝突：

```bash
git pull origin main
```

然後再次推送：

```bash
git push origin main
```

##### 3. 未跟踪分支
如果你創建了一個新的分支，並且該分支還沒有與遠端分支建立跟踪關係，你可以使用以下命令推送並設置跟踪：

```bash
git push -u origin new-branch
```

這樣，下次你只需使用 git push 即可。

## 8. git clone


### 8.1 複製遠端倉庫
從遠端倉庫複製到本地：

```bash
git clone <遠端倉庫URL>
```

## 9. 使用GitHub CLI建立GitHub repo

### 9.1 安裝GitHub CLI
首先，安裝GitHub CLI。參考官方文件進行安裝。

### 9.2 登錄GitHub
使用GitHub CLI登錄：

```bash
gh auth login
```

### 9.3 創建新倉庫
創建新的GitHub倉庫：

```bash
gh repo create <倉庫名稱> --public
```

## 10. 使用GitHub網站手動建立repo

### 10.1 登錄GitHub
打開[GitHub](https://github.com)，並登錄你的賬號。

### 10.2 創建新倉庫
點擊右上角的 "+" 號，選擇 "New repository"。填寫倉庫名稱和描述，選擇可見性，然後點擊 "Create repository"。

---

這是GitHub基本使用方法的詳細講義，希望這能幫助你理解和使用GitHub進行版本控制和協作開發。如果需要進一步的詳細解說或示範，可以參考官方文檔或教程。
