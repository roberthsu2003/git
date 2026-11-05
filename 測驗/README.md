# 練習與測驗

本測驗涵蓋第 01～11 章，其中第 06～11 章可依需求選讀。只完成入門主線的學生可先做概念題 1～6 與實作第 1、2、5 項，學完其他主題再回來挑戰。先獨立作答，再看參考答案；實作請用新的練習儲存庫，不修改共享 main。

## 第一次 Commit 入門檢核

完成 [VS Code 入門](../VSCode入門/README.md)後，在自己的練習 Repository：

1. 修改並儲存一個範例，在 **Source Control → Changes** 找出該檔案，點開說明修改了什麼。
2. Stage 這個檔案，確認它出現在 **Staged Changes**，再用能描述內容的訊息建立 Commit。
3. 再修改一次並儲存，說明為什麼檔案重新出現在 Changes；這次修改是否已包含在前一筆 Commit？

完成標準：能找到並解釋差異、只提交指定內容、說出新修改尚未包含於前一筆 Commit。學過 GitHub 後，再問自己：Commit 記錄在哪裡？Push 做了什麼？

以下綜合測驗留到學過對應主題後再做；尚未學協作的學生不必先回答 PR 題目。

## 1. 概念題（每題 5 分，共 50 分）

1. 新檔案寫入 V1 後 add，再改成 V2，直接 commit 保存哪版？如何保存 V2？
2. commit 後工作區乾淨，是否代表暫存區與資料夾都空了？
3. main 與 HEAD 分別代表什麼？（選讀第 14 章後，再說明 detached HEAD 有什麼不同。）
4. 想把 feature-about 合併到 main，應在哪個分支執行 merge？
5. 已追蹤的 local.config 加入 .gitignore，是否立即停止追蹤？
6. commit、push、PR、merge、pull 各自完成什麼工作？
7. Fork 作業中 origin 與 upstream 分別指向誰？PR base 應選誰？
8. worktree 共用哪些資料，各自保留哪些狀態？
9. restore --staged 與 restore 的來源與影響有何不同？
10. soft、mixed、hard 的差異？已分享的錯誤提交為什麼優先修正或 revert？

## 2. 綜合實作（共 50 分）

建立一個包含 README.md 的儲存庫，主要分支 main：

1. **版本與差異（10 分）：** 新增 notes.txt，展示 add 後再修改的兩種版本，確認 staged 差異後提交。
2. **分支與忽略（10 分）：** 在 feature-about 新增 about.txt，合併回 main；讓 cache/ 被忽略，提交 .gitignore。
3. **worktree（10 分）：** 在任務分支保留未暫存修改，另開 hotfix worktree 修改 README，提交並整合，確認原修改保留。
4. **復原（10 分）：** 示範取消暫存但保留內容，再製造一筆一般錯誤提交，用 revert 新增反向提交。
5. **合作與說明（10 分）：** 有 GitHub 時交一份同學審查的 PR，合併後更新本地；離線時畫出五個動作與箭頭，並附 diff 與實際驗證結果。

每項開始前先確認所在資料夾與分支。第 3 項完成後，先在任務分支提交或另行保留未完成修改，再回 main 整合與清理；第 4 項以工作區乾淨的練習分支開始。

驗收不是只看截圖：學生要指出目前路徑與分支、解釋一筆差異、說出每個操作是否改動工作區或歷史。沒有 GitHub 時不因缺少線上權限扣分，改以離線說明驗收。

## 3. 概念題參考答案

1. V1；再次 add 更新暫存區，再 commit。
2. 不是；乾淨表示區域之間沒有待處理差異。
3. main 是分支參照，通常 HEAD 指向目前分支；detached 時 HEAD 直接指向 commit。
4. 先切 main，再 merge feature-about，目標是目前分支。
5. 不會；rm --cached 後提交才記錄停止追蹤，工作區檔案與舊歷史仍在。
6. commit 本地記錄；push 上傳分支；PR 提出整合請求；merge 整合；pull 下載並依策略整合到目前分支。
7. origin 是自己的 Fork，upstream 是老師；PR base 是老師指定的目標分支。
8. 共用 Git 物件與一般分支參照；各有工作區、HEAD、暫存區。彼此提交不會自動整合工作區。
9. --staged 預設從 HEAD 更新暫存區，保留工作區；一般 restore 從暫存區更新工作區，丟棄指定未暫存修改。
10. soft 只移分支；mixed 另更新暫存區；hard 再更新工作區。共享歷史追加修正，能減少對同學已使用提交的改寫。

## 4. 延伸挑戰

完成 amend、tag 與 rebase 練習，用實際 log 說明「新提交」、「替代提交」與「固定標記」的差別。AI 可協助查詢，但請列出自己實際執行的指令與結果，不把 AI 的回答當作測試證據。
