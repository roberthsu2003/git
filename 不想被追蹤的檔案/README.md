# 不想被追蹤的檔案
> 在專案中有一些檔案是不想被git管理的.例如一些編輯軟體的暫存檔或是一些token(密鎖)

> 不想被管理的檔案,可以加人至.gitignore檔案清單中

![](./images/pic1.png)

## 情境1:一開使就確認檔案不被管理

### 增加g.cer檔,gfolder目錄,目錄內加入g1.html,g2.html

```
$ touch g.cer
$ mkdir gfloder
$ cd gfloder
$ touch g1.html g2.html
$ cd ..
$ git status
_________________________________

On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        g.cer
        gfloder/

nothing added to commit but untracked files present (use "git add" to track)

```

- 以上提醒我們尚未追蹤g.cer和gfloder目錄

### 建立.gitignore清單

```
$ vim .gitignore
______________________
g.cer
gfloder/*
~
~
~
~
~
______________________

$ git status
_______________________

On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore

nothing added to commit but untracked files present (use "git add" to track)
```

- 剛才的檔案,已經沒有被追蹤！

### 將.gitignore加入管理

```
$ git add .
$ git commit -m “加入.gitignore”
```


___

## 情境2:已經被追蹤的檔案更改為不再被追蹤

### 增加h.cer檔,hfolder目錄,目錄內加入h1.html,h2.html

```
$ touch h.cer
$ mkdir hfloder
$ cd hfloder
$ touch h1.html h2.html
$ cd ..
$ git status
_________________________________

On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        h.cer
        hfloder/

nothing added to commit but untracked files present (use "git add" to track)

```

- 以上提醒我們尚未追蹤g.cer和gfloder目錄

### h.cer檔,hfolder目錄,目錄內加入h1.html,h2.html加入commit

```
$ git add .
$ git commit -m "增加h.cer檔案和hfloder目錄"
_________________________________
[master cca5666] 增加h.cer檔案和hfloder目錄
 3 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 h.cer
 create mode 100644 hfloder/h1.html
 create mode 100644 hfloder/h2.html
 
 $ git log -p
 ________________________________
 commit cca5666f6fe56537a4b2e3e89096ba8527bfaa32 (HEAD -> master)
Author: Robert Hsu <roberthsu2003@gmail.com>
Date:   Wed Dec 8 08:47:43 2021 +0800

    增加h.cer檔案和hfloder目錄

diff --git a/h.cer b/h.cer
new file mode 100644
index 0000000..e69de29
diff --git a/hfloder/h1.html b/hfloder/h1.html
new file mode 100644
index 0000000..e69de29
diff --git a/hfloder/h2.html b/hfloder/h2.html
new file mode 100644
index 0000000..e69de29
```

- 已經將新加入的檔案和目錄成為commit記錄狀態

### 將h.cer檔,hfolder目錄內h1.html,h2.html,成為未追蹤狀態

```
$ git rm —cached h.cer hfloder/h1.html hfloder/h2.html
_______________________________________
rm 'h.cer'
rm 'hfloder/h1.html'
rm 'hfloder/h2.html'

$ git status
________________________________________
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    h.cer
        deleted:    hfloder/h1.html
        deleted:    hfloder/h2.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        h.cer
        hfloder/
        


```

- 表示檔案和目錄沒有被

### 將檔案和目錄加入至清單.gitignore

```
$ vim .gitignore
__________________________
g.cer
gfloder/*
h.cer
hfloder/*
~
~
~
~
~
~

$ git status
_________________________
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    h.cer
        deleted:    hfloder/h1.html
        deleted:    hfloder/h2.html

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore


```

- h.cer和hfolder目錄將不再被追蹤





