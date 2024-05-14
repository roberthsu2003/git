## 檢查先前修改的檔案
- 建立3個commit
- 每個commit增加一個檔案

```
$ touch a.txt
$ git add a.txt
$ git commit -m "增加a.txt"

$ touch b.txt
$ git add b.txt
$ git commit -m "增加b.txt"

$ touch c.txt
$ git add c.txt
$ git commit -m "增加c.txt"

$ ls
a.txt  b.txt  c.txt
```

### 1. 使用git log檢查目前的log
- #### git log -> 完整的comit說明

```
$ git log
commit 3e0a0bc2a0d21de36143410463b7f5f11f9f57d8 (HEAD -> main)
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Tue May 14 13:11:32 2024 +0800

    增加c.txt

commit 17ce0507430c6e02b38a133d414ae316447c493a
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Tue May 14 13:10:24 2024 +0800

    增加b.txt

commit 674017c76513fce78f1a64b2e8c398ecafdac878
Author: roberthsu2003 <roberthsu2003@gmail.com>
Date:   Tue May 14 13:08:34 2024 +0800

    增加a.txt

```

- #### git log --oneline -> 簡易的commit說明

```
$ git log --oneline
3e0a0bc (HEAD -> main) 增加c.txt
17ce050 增加b.txt
674017c 增加a.txt
```