## git rebase

### 重新修改多個commit 

```
#修改目前的前3個commit

$ git rebase -i HEAD~3
```

### 重新修改多個commit的message

- #### 增加3個commit

```
$ echo 'f4.html' >> f4.html
$ git add f4.html
$ git commit -m "add f4.html"
[main (root-commit) ef76d6a] add f4.html
 1 file changed, 1 insertion(+)
 create mode 100644 f4.html
 
$ echo 'ht.html' > f5.html
$ git add f5.html
$ git commit -m "add f5.html"
[main c75f677] add f5.html
 1 file changed, 1 insertion(+)
 create mode 100644 f5.html
 
$ echo 'h6.html' > f6.html
$ git add f6.html
$ git commit -m "ad h6.html"
[main 560225d] ad h6.html
 1 file changed, 1 insertion(+)
 create mode 100644 f6.html
 $ git log --oneline
560225d (HEAD -> main) ad h6.html
c75f677 add f5.html
ef76d6a add f4.html
```

### 一次修改3個commit message

```
$ git rebase -i HEAD~3   #修改前3個
----------------------------------------												 
#將pick改為reword改為reword(修改commit message)
#執行後,會分別出現2次新的commit message修改對話框

reword 807884e 新增f4.html
reword d0a9f5a 新增f5.html
reword 0c8d81f 新增f6.html

# Rebase 0abe09e..ac95c93 onto 0abe09e (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
```


### 將3個commit,擠壓成為1個

```
$ git rebase -i HEAD~3   #修改前3個
------------------------------------
#將第2個和第3個改為squash(向前擠壓)
#第1個保持pick
#會開啟一個對話框,可以修改新的commit message

pick 144a0e8 新增f4.html修改
squash 949e35b 新增f5.html修改
squash b86cfdf 新增f6.html修改
```

### 將1個commit,拆解為2個

```
$ git log --oneline
e341558 (HEAD -> main) add h7.html
b92cb0f add f5.html-modify add h6.html modify #將要拆解中間這個
ef76d6a add f4.html
```

- #### 開始拆解

```
$ git rebase -i HEAD~2

#將要拆解的改為edit
pick b92cb0f add f5.html-modify add h6.html modify
pick e341558 add h7.html
```

- #### 拆解說明
	- git commit --amend 
	- git rebase --continue # 拆解完成要執行這個指令

```
Stopped at b92cb0f...  add f5.html-modify add h6.html modify
You can amend the commit now, with

  git commit --amend 

Once you are satisfied with your changes, run

  git rebase --continue

```

- #### 先使用git status開查stage 和 working directory內的狀態
	- 無任何東西
```
$ git status
interactive rebase in progress; onto ef76d6a #現在正在rebase中
Last command done (1 command done):
   edit b92cb0f add f5.html-modify add h6.html modify
Next command to do (1 remaining command):
   pick e341558 add h7.html
  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'main' on 'ef76d6a'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

nothing to commit, working tree clean

```

- #### 將目前的commit內容,分解至working directory

```
$ git reset HEAD^
$ git status
interactive rebase in progress; onto ef76d6a
Last command done (1 command done):
   edit b92cb0f add f5.html-modify add h6.html modify
Next command to do (1 remaining command):
   pick e341558 add h7.html
  (use "git rebase --edit-todo" to view and edit)
You are currently editing a commit while rebasing branch 'main' on 'ef76d6a'.
  (use "git commit --amend" to amend the current commit)
  (use "git rebase --continue" once you are satisfied with your changes)

Untracked files:  # 已經被拆解至working directory
  (use "git add <file>..." to include in what will be committed)
	f5.html
	f6.html

nothing added to commit but untracked files present (use "git add" to track)
```

- #### 建立2個新增的commit

```
 $ git add f5.html
 $ git commit -m "add f5.html"
 $ git add f6.html\
 $ git commit -m "add f6.html"
```

- #### 結束rebase,和檢查commit

```
$ git rebase --continue
$ git log --oneline

#已經被拆解為2個了
cfb65c5 (HEAD -> main) add h7.html
859de98 add f6.html
09b96cf add f5.html
ef76d6a add f4.html
```

### rebase的fixup 和 squash是相似的,也是向前組合commit,但不會要求更改commit的message

```
$ git rebase -i HEAD~3

#將後面2個組合至第1個
pick 09b96cf add f5.html
fixup 859de98 add f6.html
fixup cfb65c5 add h7.html
``` 

- #### 檢查commit內容

```
$ git log --oneline
b500edb (HEAD -> main) add f5.html
ef76d6a add f4.html
```

