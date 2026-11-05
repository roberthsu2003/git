# main、HEAD 與歷史

**建立版本 · 第 02 章**　[學習路線](../README.md) · [互動圖解](../docs/README.md)

上一章用 commit 保存了檔案。這一章要看懂這些記錄如何排列，以及 `main` 和 `HEAD` 表示什麼。請先完成[工作區與暫存區](../開始使用Git/README.md)。

## 1. 三個名詞

- **commit** 是一筆版本記錄，有識別碼、訊息和前後關係。
- **main** 是分支名稱；在這個練習中，它指向最新的 commit。名稱可以不同，但本教材使用 `main`。
- **HEAD** 表示目前所在的位置。一般在分支上工作時，HEAD 指向目前分支；提交後，分支指向新 commit。

例如：`C1 → C2 → C3（HEAD → main）`。C1、C2、C3 只是方便說明的代號；Git 實際顯示的是識別碼。

## 2. 跟著做：查看歷史

這個練習獨立建立，不依賴上一章的資料夾。在 macOS／Linux 終端機或 Windows Git Bash 選一個練習位置，確認 `history-demo` 尚不存在：

```bash
mkdir history-demo
cd history-demo
git init -b main
printf 'Home page\n' > index.txt
git add index.txt
git commit -m "新增首頁"
printf 'About our team\n' > about.txt
git add about.txt
git commit -m "新增團隊介紹"
printf 'Contact us\n' > contact.txt
git add contact.txt
git commit -m "新增聯絡資訊"
```

現在檢查目前位置與歷史：

```bash
git branch --show-current
git log --oneline --decorate
```

第一個指令顯示 `main`。歷史由新到舊列出三筆，最上方顯示類似 `HEAD -> main` 的標記；識別碼依實際操作而不同。

```text
<識別碼> (HEAD -> main) 新增聯絡資訊
<識別碼> 新增團隊介紹
<識別碼> 新增首頁
```

## 3. 查詢某個版本

操作位置仍在 `history-demo`。以下指令只讀取紀錄，不會切換目前分支或修改檔案：

```bash
git show HEAD
git show HEAD~1
git diff HEAD~1 HEAD
```

`HEAD` 是目前位置，`HEAD~1` 是它的第一個父提交：這裡是「新增團隊介紹」。`git show` 顯示該筆提交的內容與變更；`git diff HEAD~1 HEAD` 比較兩個版本，因此會看到新增的聯絡資訊。若歷史中沒有前一筆提交，`HEAD~1` 就不能使用。

## 4. 換你做

在 `history-demo` 建立 `news.txt` 並提交，再回答：

1. `main` 現在指向哪一筆 commit？
2. `git show HEAD~1` 顯示哪一筆提交？
3. 使用 `git show` 查看舊紀錄，會讓工作區切換到舊版本嗎？

答案：main 指向新提交；前一筆是「新增聯絡資訊」；`show` 只查詢，不切換工作區。

下一章會建立另一個分支，觀察不同分支如何指向不同的 commit。需要在舊版本中操作時，再看[查看過去版本](../檢查先前修改的檔案/README.md)。

更多歷史查詢方式，參考[延伸範例](./延伸範例.md)。

---

[← 工作區與暫存區](../開始使用Git/README.md)　｜　[分支與合併 →](../分支/README.md)
