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
#執行後,會分別出現3次新的commit message修改對話框

reword 807884e 新增f4.html
reword d0a9f5a 新增f5.html
reword 0c8d81f 新增f6.html

# Rebase 0abe09e..ac95c93 onto 0abe09e (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
```

```
$ git log   #3個commit,都被修改過了

commit b86cfdfa92386f571318b412a5e4a9e374a6349b (HEAD -> main)
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Fri Sep 8 20:07:06 2023 +0800

    新增f6.html修改

commit 949e35b93abb01c79d3a6d832a4b51554f8edd94
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Fri Sep 8 20:06:34 2023 +0800

    新增f5.html修改

commit 144a0e88afea3d218b38ee9e019c739afbb1a4e0
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Fri Sep 8 20:05:59 2023 +0800

    新增f4.html修改

commit 0abe09ecfe64196e6ad43b764b2077e963cfaca3
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Fri Sep 8 19:57:25 2023 +0800

    新增f1.html, f2.html
    新增f3.thml

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

#### 修改隔合後的message

```

新增f4.html修改
新增f5.html修改
新增f6.html修改

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Fri Sep 8 20:05:59 2023 +0800
#
# interactive rebase in progress; onto 0abe09e
# Last commands done (3 commands done):
#    squash 949e35b 新增f5.html修改
#    squash b86cfdf 新增f6.html修改
# No commands remaining.
# You are currently rebasing branch 'main' on '0abe09e'.
#
# Changes to be committed:
#       new file:   f4.html
#       new file:   f5.html
#       new file:   f6.html
#

```

#### 3個commit 變一個

```
$ git log
---------------------------------------
commit 94c8275759f686feafcf64643d6cd9264491e76a (HEAD -> main)
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Fri Sep 8 20:05:59 2023 +0800

    新增f4.html修改
    新增f5.html修改
    新增f6.html修改

commit 0abe09ecfe64196e6ad43b764b2077e963cfaca3
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Fri Sep 8 19:57:25 2023 +0800

    新增f1.html, f2.html
    新增f3.thml

```