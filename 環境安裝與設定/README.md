# git環境安裝與設定
## 安裝git
[git官網git-scm.com](https://git-scm.com)

## 查詢目前git版本
- windows使用git bash軟體
- mac 做用terminal
- linux 使用terminal

```
$ git --version
git version 2.31.1
```

## 查詢git安裝的位置

```
$ which git
/mingw64/bin/git

```

## 安裝視窗軟體gitHub Desktop(mac,window)
[github desktop 官網](https://desktop.github.com/)

## 安裝視窗軟體SourceTree(mac,window)

[sourceTree](https://www.sourcetreeapp.com)

## 安裝視窗軟體gitk(linux)

```
$ sudo apt-get install gitk
```

## 安裝 vscode 
[vscode 官網](https://code.visualstudio.com/)

## 使用者設定

- ### 建立使用者姓名和使用者email

```
$ git config --global user.name "Robert"
$ git config --global user.name "roberthsu2003@gmail.com"
```

- ### 查看使用者

```
$ git config --list

diff.astextplain.textconv=astextplain
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
http.sslbackend=openssl
http.sslcainfo=C:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
core.autocrlf=true
core.fscache=true
core.symlinks=false
pull.rebase=false
credential.helper=manager-core
credential.https://dev.azure.com.usehttppath=true
init.defaultbranch=master
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
user.name=roberthsu2003@gmail.com
user.email=roberthsu2003@gmail.com
```



