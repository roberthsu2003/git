# 共同開發的好幫手-分支
## master和commit的關係

![](./images/pic1_1.png)

## master,commit和專案檔案關係

![](./images/pic2.png)



## 主要分支（master)
> 一個專案至少要有一個分支
> 
> 預設分支的名稱是master
> 
> master分支是一個指向單一commit的指標,可以想像是一張貼在commit上的貼紙
> 
> master是可以移動的貼紙

## HEAD是什麼？

> HEAD代表目前在哪一個commit上
> 
> HEAD也是可以移動的標籤
> 
> HEAD一般都貼在分支上,當分支移動時,HEAD也會跟著移動
>
> HEAD可以切換到不同分支,HEAD一次只可以貼在一個分支上

## 分支是什麼？
> 分支就是在主要分支建立另一條支線,而每一條分支都有特定的任務！

比方說開發一個購物網頁有會員功能,購物功能,最新訊息,產品上架….,每一個功能都可以建立一個分支,完成後可以合併至主分支

修改一個bug也可以建立一個分支

測試一個功能也可以建立一個分支


## 建立分支和切換分支和合併分支

### 新增分支

```
$ git branch 新的分支名稱
```

### 檢視目前分支

```
$ git branch
```


### 切換分支

```
$ git checkout 分支名稱
```

### 合併分支

```
$ git merge 分支名稱
```

### 刪除分支

```
$ git branch -d 分支名稱
```

### 實作流程(fast-forward)

#### 新增專案

```
$ mkdir worktogether1
$ cd worktogether1
$ git init

$ touch a.html
$ git add a.html
$ git commit -m “新增a.html”

$ touch b.html
$ git add b.html
$ git commit -m “新增b.html”

$ touch c.html
$ git add c.html
$ git commit -m “新增c.html”
```

#### 新增分支sub1

```

$ git branch sub1
$ git branch

________________________
* master
  sub1

```

![](./images/pic3_1.png)


#### 切換分支至sub1

```
#切換分支

$ git checkout sub1
$ git branch
___________________________
  master
* sub1
```

![](./images/pic4.png)

___

#### 在sub1分支增加commit

```
$ touch d.html
$ git add d.html
$ git commit -m “新增d.html”
```

![](./images/pic5.png)

___

#### 在sub1分支增加commit

```
$ touch e.html
$ git add e.html
$ git commit -m “新增e.html”
$ ls 
_________________________
a.html	b.html	c.html	d.html	e.html
```

![](./images/pic6.png)

___

#### 切換回分支master

```
$ git checkout master
$ ls
___________________________
a.html	b.html	c.html
```

![](./images/pic7.png)

___

#### master合併分支sub1(使用fast-forward)

```
$ git merge sub1
_____________________
Updating 40351bf..af5116d
Fast-forward

 d.html | 0

 e.html | 0

 2 files changed, 0 insertions(+), 0 deletions(-)

 create mode 100644 d.html
 create mode 100644 e.html

$ ls
_____________________________
a.html	b.html	c.html	d.html	e.html
```



![](./images/pic8.png)

___

#### master新增commit

```
$ touch f.html
$ git add f.html
$ git commit -m “新增f.html”
____________________________
a.html	b.html	c.html	d.html	e.html

```

![](./images/pic9.png)

___

#### 刪除分支sub1

```
$ git branch -d sub1
```

![](./images/pic10.png)

___

### 實作流程(recursive)

#### 新增sub2分支

```
$ touch g1.html
$ git add g1.html
$ git commit -m “新增g1.html”

$ touch g2.html
$ git add g2.html
$ git commit -m “新增g2.html”

$ touch g3.html
$ git add g3.html
$ git commit -m “新增g3.html”

$ git branch sub2
```

![](./images/pic11.png)

___

#### 切換至sub2分支

```
$ git checkout sub2
```

![](./images/pic12.png)

___

#### sub2分支增加一個commit

```
$ touch h1.html
$ git add h1.html
$ git commit -m “新增h1.html”
```

![](./images/pic13.png)

___

#### sub2分支增加一個commit

```
$ touch h2.html
$ git add h2.html
$ git commit -m “新增h2.html”
```

![](./images/pic14.png)

___

#### 切換至master分支

```
$ git checkout master
```

![](./images/pic15.png)

___

#### master分支增加一個commit

```
$ touch i1.html
$ git add i1.html
$ git commit -m “新增i1.html”
```

![](./images/pic16.png)

___

#### master 合併 sub2分支(recursive)
- 合併後的commit有2個來源commit

```
$ git merge sub2
```

![](./images/pic17.png)










