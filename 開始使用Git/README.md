# 工作區與暫存區

**建立版本 · 第 01 章**　[學習路線](../README.md) · [互動圖解](../docs/README.md)

Git 記錄專案版本，讓你比較修改、回看已提交內容。它不會自動保存所有檔案；整個資料夾連同 `.git` 都刪掉時，本地歷史也會消失。重要專案還需要遠端儲存庫或備份。

---

## 1. 三個區域先分清楚

在 Git 中，檔案會在三個核心區域之間流轉：

```text
┌─────────────────────────┐       git add        ┌─────────────────────────┐      git commit      ┌─────────────────────────┐
│         工作區           │  ─────────────────>  │         暫存區           │  ─────────────────>  │       本地儲存庫         │
│  (Workspace / Worktree) │                      │     (Staged / Index)    │                      │  (Repository / commit)  │
│      實際編輯的檔案       │  <─────────────────  │       準備提交的快照     │                      │       歷史版本記錄       │
└─────────────────────────┘   git restore        └─────────────────────────┘                      └─────────────────────────┘
                              git restore --staged (移出暫存區)
```

| 區域 | 保存什麼？ | 用途說明與比喻 | 怎麼更新？ |
| :--- | :--- | :--- | :--- |
| **工作區 (Workspace)** | 現在磁碟上實際編輯的檔案 | **「你的書桌」**：你用編輯器打開、撰寫筆記或程式碼的地方。只要存檔，變動就在這裡。 | 編輯器存檔、新增或刪除檔案 |
| **暫存區 (Staged / Index)** | 下一次提交要使用的檔案快照 | **「購物車 / 封箱清單」**：暫時挑選要結帳的商品。讓你能精準挑選要提交的改動，分批存檔。 | `git add <檔案>` |
| **本地庫 (commit / HEAD)** | 已記錄的專案永久快照與訊息 | **「倉庫貨架」**：正式將包裹封箱入庫，永久保存為一筆歷史紀錄。 | `git commit -m "說明"` |

> [!IMPORTANT]
> **commit 只會記錄「暫存區」裡的版本**。  
> 執行 `git add` 後如果你又修改了檔案，新的修改**不會**自動進入暫存區！此時若直接 commit，只會保存執行 `add` 那個當下的版本。

---

## 2. 如何回復工作區？如何回復暫存區？

在開發過程中，常常會遇到寫壞想反悔、或是手滑太早 `add` 的情況。請務必牢記以下兩種回復方式：

### (1) 如何回復工作區（放棄工作區修改）
* **先決條件（重要觀念）**：**該檔案必須是「已被追蹤（Tracked）」的檔案**（即至少曾經 commit 過或至少被 add 過）。如果是全新建立、從未被 Git 追蹤的新檔案（`??`），Git 沒有歷史快照可以還原，執行 `git restore` 會出現 `pathspec did not match any file(s) known to git` 錯誤（未追蹤新檔欲清除請手動刪除或使用 `git clean -f`）。
* **情境**：已追蹤的檔案在編輯器裡改爛了、格式全毀，但**尚未執行 `git add`**。你想放棄這次的修改，還原回「暫存區」或「最後一次 commit」的乾淨狀態。
* **指令**：
  ```bash
  git restore <檔案名稱>        # 放棄單一檔案的工作區修改（限已追蹤檔案）
  git restore .                 # 放棄當前目錄下所有已追蹤檔案的工作區修改
  ```
  *(舊版 Git 指令為 `git checkout -- <檔案名稱>`)*

### (2) 如何回復暫存區（將檔案移出暫存區，退回工作區）
* **情境**：不小心太早執行了 `git add`，但檔案還沒改完整，想把檔案**從暫存區抽出來（拿出購物車）**，但**要保留剛寫好的程式碼與文字**在工作區繼續改。
* **指令**：
  ```bash
  git restore --staged <檔案名稱>    # 將單一檔案移出暫存區（保留內容）
  git restore --staged .             # 將所有已暫存檔案移出暫存區
  ```
  *(舊版 Git 指令為 `git reset HEAD <檔案名稱>`)*

### (3) 指令快速對照表

| 操作需求 | 作用目標 | 現代推薦指令 (Git 2.23+) | 歷史內容是否會遺失？ |
| :--- | :--- | :--- | :--- |
| **放棄工作區改動** | 工作區 → 還原 | `git restore <file>` | ⚠️ **會遺失**未暫存的修改（**限已追蹤檔案**） |
| **撤回暫存狀態** | 暫存區 → 工作區 | `git restore --staged <file>` | ✅ **不會遺失**，檔案仍在工作區 |
| **徹底還原雙區** | 同時放棄暫存與工作區 | `git restore --source=HEAD --staged --worktree <file>` | ⚠️ **會遺失**所有未提交改動 |
| **清理未追蹤新檔** | 刪除未追蹤的檔案 | `git clean -fd` | ⚠️ **會刪除**新建且未追蹤的檔案 |

---

## 3. 實戰演練：Git Add 與 Markdown 語法教學（5 個完整範例）

我們透過邊寫 **Markdown 筆記** 邊練習 **Git 指令**，一步步熟悉工作區、暫存區與回復操作！

請先在終端機建立一個獨立的練習目錄：
```bash
mkdir staging-demo
cd staging-demo
git init -b main
```

---

### 範例一：初探暫存區 —— 建立標題與清單（`git add` 基本用法）

#### 📝 Markdown 語法教室：標題與清單
* `#` 代表一級標題、`##` 二級標題、`###` 三級標題（`#` 後面必須加一個空格）。
* `-` 或 `*` 代表無序清單。
* `1.`、`2.` 代表有序編號清單。

#### 💻 Git 實作步驟：
1. **建立 Markdown 檔案並寫入內容**：
   ```bash
   cat << 'EOF' > notes.md
   # Markdown 學習筆記

   ## 今日學習目標
   - 認識 Git 工作區與暫存區
   - 熟悉 Markdown 常用語法

   ## 推薦步驟
   1. 建立標題與清單
   2. 粗體、斜體與超連結
   3. 程式碼區塊與引言
   EOF
   ```
2. **觀察狀態**：
   ```bash
   git status --short
   ```
   ```text
   ?? notes.md
   ```
   `??` 表示檔案僅存在於**工作區**，屬於**未追蹤（Untracked）** 檔案。
3. **加入暫存區並提交**：
   ```bash
   git add notes.md
   git status --short
   ```
   ```text
   A  notes.md
   ```
   `A ` 代表已經加入**暫存區**（準備好提交新增）。接著進行首次提交：
   ```bash
   git commit -m "docs: 建立筆記並新增標題與清單"
   ```

---

### 範例二：暫存區是「快照」而非檔案指標 —— 粗體、斜體與超連結（理解 `AM` 狀態）

#### 📝 Markdown 語法教室：強調文字與連結
* 粗體：`**粗體文字**`
* 斜體：`*斜體文字*`
* 粗斜體：`***粗斜體文字***`
* 刪除線：`~~劃掉文字~~`
* 超連結：`[連結顯示文字](網址)`

#### 💻 Git 實作步驟：
1. **修改工作區的 `notes.md`**：
   ```bash
   cat << 'EOF' >> notes.md

   ## 重點觀念
   - **重要**：Git add 保存的是**當下快照（Snapshot）**。
   - *提示*：善用 `git status` 觀察檔案所處區域。
   - 參考文件：[Git 官方網站](https://git-scm.com/)
   EOF
   ```
2. **加入暫存區**：
   ```bash
   git add notes.md
   git status --short
   ```
   ```text
   M  notes.md
   ```
   綠色 `M ` 代表修改已經**進入暫存區**。
3. **關鍵體驗：暫存後又在工作區修改**：
   ```bash
   echo "- ~~這是過時的訊息~~" >> notes.md
   git status --short
   ```
   ```text
   AM notes.md
   ```
   > 💡 **解讀 `AM`**：
   > * 左邊的 `A/M`：暫存區裡有一份待提交的版本（剛才加了粗體與連結的狀態）。
   > * 右邊的 `M`：工作區在 add 之後又有新改動（追加了刪除線）。
   > * **如果現在執行 `git commit`，只會保存暫存區的版本，刪除線那行不會被存進去！**
4. **重新 add 並提交**：
   ```bash
   git add notes.md
   git commit -m "docs: 補充強調語法、連結與刪除線"
   ```

---

### 範例三：回復工作區的修改 —— 程式碼區塊與引言（`git restore`）

#### 📝 Markdown 語法教室：程式碼與引用區塊
* 行內程式碼：使用一對反引號 \`code\`。
* 多行程式碼區塊：使用三個反引號包裹，並可指定語言（例如 \`\`\`bash）。
* 引言（區塊引用）：在行首加上 `>`。

#### 💻 Git 實作步驟：
1. **正常新增程式碼範例並提交**：
   ```bash
   cat << 'EOF' >> notes.md

   ## 常用終端機指令
   > 以下為常用的 Git 查詢指令：

   ```bash
   git status -s
   git log --oneline
   ```
   EOF
   git add notes.md
   git commit -m "docs: 新增程式碼區塊與引言"
   ```
2. **模擬情境：學生不小心在工作區改壞了格式**：
   ```bash
   echo "哎呀！不小心打錯字、把整份筆記覆蓋弄壞了！" > notes.md
   ```
3. **檢視工作區差異**：
   ```bash
   git diff
   ```
   會看到滿江紅的刪除標記，顯示工作區已被破壞。
4. **【核心操作：回復工作區】**：
   ```bash
   git restore notes.md
   ```
5. **確認結果**：
   ```bash
   git status
   tail -n 8 notes.md
   ```
   工作區立刻恢復原狀，剛才寫爛的修改已被安全丟棄！

---

### 範例四：回復暫存區的狀態 —— 表格與任務清單（`git restore --staged`）

#### 📝 Markdown 語法教室：表格與核取清單
* 表格：以 `|` 分隔欄位，第二行使用 `| :--- | :---: | ---: |` 設定靠左、置中或靠右。
* 任務核取清單：`- [ ] 未完成`、`- [x] 已完成`。

#### 💻 Git 實作步驟：
1. **在 `notes.md` 追加表格與待辦清單**：
   ```bash
   cat << 'EOF' >> notes.md

   ## 指令速查表
   | 指令 | 作用區域 | 說明 |
   | :--- | :--- | :--- |
   | `git add` | 工作區 → 暫存區 | 放入購物車 |
   | `git restore --staged` | 暫存區 → 工作區 | 移出購物車 |

   ## 練習清單
   - [x] 完成表格語法學習
   - [ ] 練習回復暫存區
   EOF
   ```
2. **手滑太快加進暫存區**：
   ```bash
   git add notes.md
   git status --short
   ```
   ```text
   M  notes.md
   ```
   檔案已經被放進暫存區，但你突然想起清單第二項還沒勾選，想退回工作區繼續編輯。
3. **【核心操作：回復暫存區】**：
   ```bash
   git restore --staged notes.md
   git status --short
   ```
   ```text
    M notes.md
   ```
   綠色 `M ` 變成了紅色 ` M`！檔案成功**移出暫存區**回到工作區，而且**剛打好的文字完全保留**。
4. **繼續修改、重新暫存並提交**：
   在工作區中將 `[ ]` 改為 `[x]` 後提交：
   ```bash
   # 將未完成改為已完成
   sed -i '' 's/- \[ \] 練習回復暫存區/- \[x\] 練習回復暫存區/' notes.md 2>/dev/null || sed -i 's/- \[ \] 練習回復暫存區/- \[x\] 練習回復暫存區/' notes.md
   git add notes.md
   git commit -m "docs: 完成表格與任務清單練習"
   ```

---

### 範例五：多檔案綜合實戰 —— 圖片語法與分隔線（雙區檢視與選擇性回復）

#### 📝 Markdown 語法教室：圖片與水平分隔線
* 圖片語法：`![圖片說明 (Alt)](圖片網址或路徑)`
* 水平分隔線：獨立一行的三個減號 `---`（前後保持空行）。

#### 💻 Git 實作步驟：
1. **建立第二個檔案 `REFERENCE.md` 並提交**：
   ```bash
   cat << 'EOF' > REFERENCE.md
   # 常用 Markdown 資源

   ---

   ![Markdown Logo](https://markdown-here.com/img/icon256.png)

   * 支援標準：CommonMark 與 GitHub Flavored Markdown (GFM)
   EOF
   git add REFERENCE.md
   git commit -m "docs: 建立參考資料檔案"
   ```
2. **同時修改兩個檔案**：
   - 在 `REFERENCE.md` 新增有價值的筆記：
     ```bash
     echo "- [GFM 規格手冊](https://github.github.com/gfm/)" >> REFERENCE.md
     ```
   - 在 `notes.md` 隨手打了一行測試廢話：
     ```bash
     echo "這是一段測試文字，稍後要丟棄" >> notes.md
     ```
3. **只把 `REFERENCE.md` 加入暫存區**：
   ```bash
   git add REFERENCE.md
   git status --short
   ```
   ```text
   M  REFERENCE.md
    M notes.md
   ```
4. **使用 `git diff` 與 `git diff --staged` 進行兩區比對**：
   ```bash
   # 查看工作區尚未暫存的修改（只會列出 notes.md 的廢話）
   git diff

   # 查看暫存區準備提交的修改（只會列出 REFERENCE.md 的連結）
   git diff --staged
   ```
5. **精準選擇：回復工作區的廢話，順利提交暫存區的檔案**：
   ```bash
   # 放棄 notes.md 的測試廢話
   git restore notes.md

   # 提交暫存區中正常的 REFERENCE.md
   git commit -m "docs: 更新 GFM 參考手冊連結"
   ```
6. **確認狀態與歷史**：
   ```bash
   git status
   git log --oneline -n 3
   ```
   狀態回到乾淨的 `working tree clean`，每個版本修改明確且獨立！

---

## 4. 指令速查總整理

| 指令 | 比較 / 作用區域 | 說明 |
| :--- | :--- | :--- |
| `git status` | 全域檢視 | 查看哪些檔案已暫存、未暫存、未追蹤 |
| `git status -s` | 全域簡明檢視 | 以兩欄代號（`??`, `A `, ` M`, `AM`）快速顯示狀態 |
| `git add <file>` | 工作區 → 暫存區 | 將檔案的當前修改保存為暫存快照（放入購物車） |
| `git restore <file>` | 暫存區/HEAD → 工作區 | **放棄工作區的修改**，還原成乾淨狀態（**限已追蹤檔案**） |
| `git restore --staged <file>` | 暫存區 → 工作區 | **撤銷暫存**，將檔案移出暫存區，但保留已編輯內容 |
| `git diff` | 工作區 vs 暫存區 | 查看工作區還沒 `add` 的具體行級差異 |
| `git diff --staged` | 暫存區 vs 本地庫(HEAD) | 查看已經 `add` 但還沒 `commit` 的具體內容差異 |
| `git commit -m "訊息"` | 暫存區 → 本地庫 | 將暫存區內容封裝為永久歷史快照 |

---

## 5. 圖形介面工具（GUI）輔助對照

GUI 工具（如 SourceTree、VS Code 原始檔控制面板）在介面上的操作本質與指令完全一致：
- **Unstaged changes（未暫存變更）**：對應**工作區**（在此處點擊 Discard 等同於 `git restore`）。
- **Staged changes（已暫存變更）**：對應**暫存區**（在此處點擊 Unstage 等同於 `git restore --staged`；點擊 Stage 等同於 `git add`）。

![SourceTree 歷史與狀態畫面（舊版介面）](./images/pic10.png)

---

[← 開始前的準備](../環境安裝與設定/README.md)　｜　[main、HEAD 與歷史 →](../使用main主要分支/README.md)
