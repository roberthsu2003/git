/* Shared lesson states: browser player and static SVG generator use the same content. */
globalThis.GIT_LESSONS = [
  {
    id: 'staging', title: '01｜工作區、暫存區與 commit', intro: 'add 保存要提交的版本；commit 記錄暫存區，而不是直接記錄所有檔案。',
    frames: [
      { title: '剛建立專案：還沒有 commit', command: 'git init -b main', cards: [
        { title: '工作區', tag: '實際編輯的檔案', lines: ['目前沒有檔案'] },
        { title: '暫存區', tag: '準備提交的版本', lines: ['目前沒有檔案'] },
        { title: 'commit 紀錄', tag: '已保存的版本', lines: ['還沒有 commit'] }
      ], note: '先在工作區建立檔案，再決定要把哪個版本加入暫存區。' },
      { title: '建立檔案：Git 尚未追蹤', command: 'touch index.txt', cards: [
        { title: '工作區', tag: '未追蹤 ??', lines: ['index.txt：空檔案'] },
        { title: '暫存區', tag: '尚未 add', lines: ['沒有 index.txt'] },
        { title: 'commit 紀錄', tag: '尚未 commit', lines: ['還沒有 commit'] }
      ], note: '建立檔案不等於 Git 已保存它；新檔案要先 git add。' },
      { title: '第一次 add：保存空檔案版本', command: 'git add index.txt', cards: [
        { title: '工作區', tag: '版本 V1', lines: ['index.txt：空檔案'] },
        { title: '暫存區', tag: '已暫存 A', lines: ['index.txt：空檔案 V1'] },
        { title: 'commit 紀錄', tag: '尚未 commit', lines: ['還沒有 commit'] }
      ], note: 'add 把當下的檔案版本放入暫存區；檔案仍留在工作區。' },
      { title: 'add 後又編輯：兩區版本不同', command: '編輯 index.txt，寫入「markdown 語法介紹」', cards: [
        { title: '工作區', tag: '版本 V2', lines: ['index.txt：有文字', 'markdown 語法介紹'] },
        { title: '暫存區', tag: '仍是 V1', lines: ['index.txt：仍是空檔案'] },
        { title: 'commit 紀錄', tag: '尚未 commit', lines: ['還沒有 commit'] }
      ], note: '暫存區不會隨編輯自動更新。status 可能同時列出已暫存與未暫存變更。', question: '現在直接 commit，會記錄文字還是空檔案？', answer: '空檔案。commit 使用暫存區的 V1，必須再次 add 才能提交 V2。' },
      { title: '再次 add：暫存區更新到 V2', command: 'git add index.txt', cards: [
        { title: '工作區', tag: '版本 V2', lines: ['index.txt：有文字', 'markdown 語法介紹'] },
        { title: '暫存區', tag: '版本 V2', lines: ['index.txt：有文字', 'markdown 語法介紹'] },
        { title: 'commit 紀錄', tag: '尚未 commit', lines: ['還沒有 commit'] }
      ], note: '現在工作區與暫存區一致，這次 commit 才會保存文字版本。' },
      { title: 'commit：記錄暫存區的版本', command: 'git commit -m "新增語法介紹"', cards: [
        { title: '工作區', tag: '沒有未暫存變更', lines: ['index.txt：V2'] },
        { title: '暫存區', tag: '與 HEAD 相同', lines: ['index.txt：V2', '暫存區不是空的', '只是沒有待提交差異'] },
        { title: 'commit C1', tag: '已記錄 V2', lines: ['index.txt：V2', 'main 指向 C1', 'HEAD 指向 main'] }
      ], note: '工作區乾淨表示沒有待處理差異，不代表檔案或暫存區被清空。' }
    ]
  },
  {
    id: 'branch', title: '02｜建立分支、切換與合併', intro: '同一個資料夾，切換分支後看到的受追蹤檔案可能不同。',
    frames: [
      { title: '起點：main 有首頁', command: 'git init -b main；建立首頁並 commit', nodes: [{id:'C1',x:180,y:175,ref:'HEAD → main'}], edges: [], cards: [{title:'branch-demo/',tag:'目前分支 main',lines:['index.txt：Home page','沒有 login.txt']}], note:'分支名稱指向 commit；HEAD 表示目前使用的分支。' },
      { title: '新分支：先指向同一個 commit', command: 'git switch -c feature-login', nodes:[{id:'C1',x:180,y:175,ref:'main、HEAD → feature-login'}],edges:[],cards:[{title:'branch-demo/',tag:'目前分支 feature-login',lines:['index.txt：Home page','檔案暫時和 main 一樣']}],note:'建立分支不會立刻讓檔案變不同；要修改與 commit，路線才會往前。'},
      { title:'提交功能：只有功能分支往前',command:'新增 login.txt；git add；git commit',nodes:[{id:'C1',x:180,y:175,ref:'main'},{id:'C2',x:590,y:175,ref:'HEAD → feature-login'}],edges:[['C1','C2']],cards:[{title:'branch-demo/',tag:'目前分支 feature-login',lines:['index.txt：Home page','login.txt：Login form']}],note:'main 還停在 C1，feature-login 指向新的 C2。'},
      { title:'切回 main：會員檔案暫時看不到',command:'git switch main',nodes:[{id:'C1',x:180,y:175,ref:'HEAD → main'},{id:'C2',x:590,y:175,ref:'feature-login'}],edges:[['C1','C2']],cards:[{title:'branch-demo/',tag:'目前分支 main',lines:['index.txt：Home page','沒有 login.txt']}],note:'login.txt 還在 C2；切換分支不是刪除功能。',question:'要在哪個分支執行 merge，才能讓 main 收到功能？',answer:'先切到 main，再 merge feature-login。來源是功能分支，目標是目前分支。'},
      { title:'fast-forward：main 移到 C2',command:'git merge --ff-only feature-login',nodes:[{id:'C1',x:180,y:175,ref:'起點'},{id:'C2',x:590,y:175,ref:'HEAD → main、feature-login'}],edges:[['C1','C2']],cards:[{title:'branch-demo/',tag:'目前分支 main',lines:['index.txt：Home page','login.txt：Login form']}],note:'main 沒有分岔，因此只移動指標，不新增 merge commit。'},
      {title:'清理：只刪除已完成的分支名稱',command:'git branch -d feature-login',nodes:[{id:'C1',x:180,y:175,ref:'起點'},{id:'C2',x:590,y:175,ref:'HEAD → main'}],edges:[['C1','C2']],cards:[{title:'branch-demo/',tag:'main 保留成果',lines:['index.txt：Home page','login.txt：Login form']}],note:'分支名稱刪掉了，已合併到 main 的功能和 commit 仍保留。'}
    ]
  },
  {
    id:'worktree',title:'03｜功能寫到一半，先修 bug',intro:'一個儲存庫，兩個資料夾，各自保留檔案與暫存狀態。',
    frames:[
      {title:'原資料夾有未提交的會員修改',command:'在 feature-login 編輯 login.txt',cards:[{title:'worktree-demo/',tag:'feature-login',lines:['index.txt：Home titel','login.txt：會員草稿','密碼欄位：尚未 commit']}],note:'不要急著丟掉或提交未完成的內容；我們從 main 另開修正工作。'},
      {title:'新增旁邊的 worktree，起點指定 main',command:'git worktree add -b hotfix-title ../worktree-hotfix main',cards:[{title:'worktree-demo/',tag:'feature-login',lines:['index.txt：Home titel','login.txt：會員草稿','密碼欄位：尚未 commit']},{title:'worktree-hotfix/',tag:'hotfix-title',lines:['index.txt：Home titel','沒有 login.txt','從 main 的 commit 開始']}],note:'資料夾共用 Git 歷史，但工作區、HEAD 與暫存區各自管理。'},
      {title:'在修正資料夾改好並 commit',command:'cd ../worktree-hotfix；修正 titel → title；commit',cards:[{title:'worktree-demo/',tag:'feature-login',lines:['index.txt：Home titel','會員未提交修改仍在']},{title:'worktree-hotfix/',tag:'hotfix-title',lines:['index.txt：Home title','修正已 commit','沒有 login.txt']}],note:'另一邊 commit 不會自動更新原資料夾；原工作也不會被一起提交。',question:'修好後，原資料夾的首頁會立刻變成 title 嗎？',answer:'不會。原分支還沒合併修正，仍看到 titel；未提交的會員修改也保留。'},
      {title:'提交會員進度，切回 main 合併修正',command:'會員修改 commit；git switch main；git merge --ff-only hotfix-title',cards:[{title:'worktree-demo/',tag:'main',lines:['index.txt：Home title','沒有 login.txt','首頁修正已合併']},{title:'worktree-hotfix/',tag:'hotfix-title',lines:['index.txt：Home title','修正工作區乾淨']}],note:'原資料夾現在切到 main，會員功能先保留在 feature-login 的 commit。'},
      {title:'main 再合併會員功能',command:'git merge --no-edit feature-login',cards:[{title:'worktree-demo/',tag:'main',lines:['index.txt：Home title','login.txt：含密碼欄位','兩項成果都已整合']},{title:'worktree-hotfix/',tag:'hotfix-title',lines:['index.txt：Home title','這個分支仍沒有 login.txt']}],note:'本例修改不同檔案，可直接合併；worktree 不保證其他情況沒有衝突。'},
      {title:'移除資料夾，再刪除已合併分支',command:'git worktree remove ../worktree-hotfix；git branch -d hotfix-title feature-login',cards:[{title:'worktree-demo/',tag:'只剩 main',lines:['index.txt：Home title','login.txt：含密碼欄位','git worktree list 只剩一筆']},{title:'worktree-hotfix/',tag:'已移除',lines:['工作資料夾已移除','remove 本身不刪分支','branch -d 才刪分支名稱']}],note:'先確認 worktree 沒有待保留內容，並站在原資料夾執行清理。'}
    ]
  },
  {
    id:'collaboration',title:'04｜兩人合作：push、PR、merge、pull',intro:'本地提交、遠端上傳、提出合併與更新電腦，是四個不同動作。',
    frames:[
      {title:'兩人各自 clone，再開任務分支',command:'A：docs-course；B：docs-members',cards:[{title:'A 的電腦',tag:'docs-course',lines:['準備新增 course.md']},{title:'GitHub',tag:'main',lines:['README.md','還沒有兩人的新檔案']},{title:'B 的電腦',tag:'docs-members',lines:['準備新增 members.md']}],note:'每人一個任務分支，第一輪先修改不同檔案。'},
      {title:'各自 commit：目前只保存在自己電腦',command:'git add 檔名；git commit -m "說明"',cards:[{title:'A 的電腦',tag:'本地 commit',lines:['course.md 已提交']},{title:'GitHub',tag:'main 尚未改變',lines:['README.md','尚未收到新 commit']},{title:'B 的電腦',tag:'本地 commit',lines:['members.md 已提交']}],note:'commit 不是上傳；同學還看不到你電腦裡的新 commit。'},
      {title:'push：上傳的是各自任務分支',command:'git push -u origin docs-course／docs-members',cards:[{title:'A 的電腦',tag:'已 push',lines:['docs-course → GitHub']},{title:'GitHub',tag:'兩條分支已上傳',lines:['main：仍只有 README.md','docs-course：course.md','docs-members：members.md']},{title:'B 的電腦',tag:'已 push',lines:['docs-members → GitHub']}],note:'上傳功能分支，不等於把它合併到 main。'},
      {title:'PR：提出合併並互相檢查',command:'GitHub：base main ← compare 任務分支',cards:[{title:'A 的 PR',tag:'等待檢查',lines:['新增 course.md','B 閱讀 Files changed']},{title:'GitHub main',tag:'尚未合併',lines:['main 暫時沒有新檔','PR 只是合併請求']},{title:'B 的 PR',tag:'等待檢查',lines:['新增 members.md','A 閱讀 Files changed']}],note:'有問題就回原任務分支修改、commit、push，同一份 PR 會更新。',question:'建立 PR 後，本地 main 會自動更新嗎？',answer:'不會。PR 要先合併到 GitHub 的 main，之後各自 pull 才能更新本地 main。'},
      {title:'merge：兩份 PR 都合併到 GitHub main',command:'GitHub：逐一確認並 Merge pull request',cards:[{title:'A 的電腦',tag:'本地 main 還沒更新',lines:['仍需切回 main、pull']},{title:'GitHub main',tag:'已整合',lines:['README.md','course.md','members.md']},{title:'B 的電腦',tag:'本地 main 還沒更新',lines:['仍需切回 main、pull']}],note:'線上合併不會遠端修改兩人的電腦。'},
      {title:'pull：兩人的 main 都收到成果',command:'git switch main；git pull --ff-only origin main',cards:[{title:'A 的本地 main',tag:'已更新',lines:['README.md','course.md','members.md']},{title:'GitHub main',tag:'共同版本',lines:['README.md','course.md','members.md']},{title:'B 的本地 main',tag:'已更新',lines:['README.md','course.md','members.md']}],note:'確認後清理已完成的任務分支，再從更新過的 main 開下一個任務。'}
    ]
  },
  {
    id:'fork',title:'05｜Fork：向老師交作業',intro:'origin 指向自己的 Fork，upstream 指向老師的原專案。',
    frames:[
      {title:'Fork 和 clone 是不同動作',command:'GitHub 按 Fork → clone 自己的副本',cards:[{title:'老師的 GitHub',tag:'upstream',lines:['class-homework / main','原始專案']},{title:'自己的 GitHub',tag:'origin',lines:['class-homework / main','Fork 副本']},{title:'自己的電腦',tag:'本地 clone',lines:['origin → 自己的 Fork','upstream → 老師專案']}],note:'Fork 建立線上副本；clone 把副本下載到自己的電腦。'},
      {title:'開分支、commit、push 到自己的 Fork',command:'git push -u origin homework-intro',cards:[{title:'老師的 GitHub',tag:'main 尚未改變',lines:['還沒收到作業成果']},{title:'自己的 GitHub',tag:'homework-intro',lines:['introduction.md 已上傳']},{title:'自己的電腦',tag:'homework-intro',lines:['作業已提交','只 push 自己的 origin']}],note:'沒有老師專案的寫入權限，也能先在自己 Fork 的分支工作。'},
      {title:'跨 Fork PR：來源與目標要選對',command:'base 老師/main ← compare 自己/homework-intro',cards:[{title:'老師的 GitHub',tag:'PR 目標',lines:['base repository：老師','base branch：main']},{title:'自己的 GitHub',tag:'PR 來源',lines:['head repository：自己','compare：homework-intro']},{title:'老師審查',tag:'先讀差異再合併',lines:['需要修改就繼續 push','同一份 PR 會更新']}],note:'送 PR 不等於交上去的內容已合併。'},
      {title:'老師合併後，同步自己的 main',command:'git fetch upstream；git merge --ff-only upstream/main；git push origin main',cards:[{title:'老師的 GitHub',tag:'main 已合併',lines:['包含 introduction.md']},{title:'自己的 GitHub',tag:'origin/main 已同步',lines:['包含 introduction.md']},{title:'自己的電腦',tag:'本地 main 已同步',lines:['包含 introduction.md','之後從 main 開新任務']}],note:'從老師拿更新，再把自己的 main 上傳到 Fork；不是 push 到老師的 upstream。'}
    ]
  },
  {
    id:'ai',title:'06｜AI 開發：小步修改與復原',intro:'AI 改完不等於驗證完成；先讀差異，再用專案的檢查方式確認。',
    frames:[
      {title:'先保留起點，開一個任務分支',command:'git status；git switch -c ai/search-hint',cards:[{title:'main',tag:'已確認的起點',lines:['Search: ready']},{title:'ai/search-hint',tag:'本輪任務',lines:['只新增輸入提示','不改登入或資料庫']}],note:'先處理既有修改；一次只交給 AI 一項能清楚驗收的任務。'},
      {title:'AI 修改後，自己檢查差異',command:'git status --short；git diff',cards:[{title:'工作區',tag:'尚未 commit',lines:['Search: broken','這一輪修改不符合需求']},{title:'暫存區與 HEAD',tag:'仍保留起點',lines:['Search: ready','沒有把錯誤修改提交']}],note:'本例發現 ready 被改壞；要先處理，不要直接 commit。',question:'未提交的錯誤修改，也需要 git revert 嗎？',answer:'不需要。確認檔案的未暫存修改全部可丟棄時，可 restore；revert 用來反轉已提交變更。'},
      {title:'捨棄確認不要的未暫存修改',command:'git restore search.txt',cards:[{title:'工作區',tag:'恢復到暫存區版本',lines:['Search: ready']},{title:'暫存區與 HEAD',tag:'未改動',lines:['Search: ready']}],note:'這個練習的暫存區與 HEAD 相同。restore 會丟掉指定檔案的未暫存修改，先確認沒有要保留的內容。'},
      {title:'正確修改：驗證後才 commit',command:'git diff；執行檢查；git add；git diff --staged；git commit',cards:[{title:'工作區與暫存區',tag:'檢查過的版本',lines:['Search: ready','Hint: enter a keyword']},{title:'任務分支 commit',tag:'小段完整變更',lines:['新增搜尋輸入提示','未混入其他功能']}],note:'程式專案要實際測試或操作功能；格式檢查不能取代功能驗證。'},
      {title:'已提交的錯誤：追加 revert commit',command:'錯誤修改 commit 後：git revert --no-edit HEAD',nodes:[{id:'C1',x:150,y:175,ref:'可用起點'},{id:'C2',x:460,y:175,ref:'錯誤修改'},{id:'C3',x:770,y:175,ref:'HEAD → 任務分支'}],edges:[['C1','C2'],['C2','C3']],cards:[{title:'現在的檔案',tag:'C3 反轉 C2 的修改',lines:['Search: ready','Hint: enter a keyword']},{title:'歷史紀錄',tag:'追加修正',lines:['C2 仍在歷史裡','C3 是新的 revert commit']}],note:'共享分支保留歷史；revert 不是刪掉舊 commit，也可能需要解決衝突。'},
      {title:'送 PR、審查後整合，再更新 main',command:'push 任務分支 → PR → 審查與 merge → pull',cards:[{title:'任務分支',tag:'完成本輪需求',lines:['差異已閱讀','檢查結果已記錄']},{title:'GitHub PR',tag:'同學審查',lines:['說明改了什麼','說明如何驗證']},{title:'main',tag:'已整合可用版本',lines:['Search: ready','Hint: enter a keyword']}],note:'多項任務可各開分支與 worktree，但仍需處理整合衝突。'}
    ]
  },
  {
    id:'reset',title:'07｜reset：三種模式的差別',intro:'假設受追蹤檔案已提交到 V3，且工作區乾淨；目標是較早的 C1（V1）。',
    frames:[
      {title:'reset --soft：保留工作區與暫存區',command:'git reset --soft C1',cards:[{title:'工作區',tag:'仍是 V3',lines:['保留最新檔案內容']},{title:'暫存區',tag:'仍是 V3',lines:['與 C1 比較有待提交差異']},{title:'main 與 HEAD',tag:'回到 C1（V1）',lines:['只移動分支指標','舊 commit 不會立即刪除']}],note:'soft 適合重新組織自己的提交；不要把共享分支當作本地實驗。'},
      {title:'reset --mixed：保留工作區，重設暫存區',command:'git reset --mixed C1',cards:[{title:'工作區',tag:'仍是 V3',lines:['最新修改仍在','與暫存區有差異']},{title:'暫存區',tag:'回到 V1',lines:['與 C1 一致','修改需重新 add']},{title:'main 與 HEAD',tag:'回到 C1（V1）',lines:['reset 預設是 mixed']}],note:'這裡示範既有受追蹤檔案；若晚期 commit 新增檔案，mixed 後可能變成未追蹤。'},
      {title:'reset --hard：工作區也改成目標版本',command:'git reset --hard C1',cards:[{title:'工作區',tag:'改成 V1',lines:['受追蹤檔案的修改被覆蓋']},{title:'暫存區',tag:'回到 V1',lines:['與 C1 一致']},{title:'main 與 HEAD',tag:'回到 C1（V1）',lines:['三者都對齊目標版本']}],note:'先保留需要的內容再操作。hard 不是「刪除所有未追蹤檔案」，但阻擋檔案寫入的未追蹤內容可能被移除。'},
      {title:'備份分支不會跟著 reset 移動',command:'git branch lesson-start；git reset --hard HEAD~2；git reflog',nodes:[{id:'C1',x:120,y:175,ref:'HEAD → main（已移回）'},{id:'C2',x:350,y:175,ref:'V2'},{id:'C3',x:580,y:175,ref:'lesson-start（仍在 V3）'}],edges:[['C1','C2'],['C2','C3']],cards:[{title:'lesson-start',tag:'備份仍指向 V3',lines:['reset 只移動目前分支','備份分支不會跟著移','可比較也可移回去']},{title:'reflog',tag:'找移走的 commit',lines:['記錄分支 recent 位置','V3 識別碼查得到','未提交修改救不回']}],note:'能找回是因為 V3 已提交且仍有名稱指向它；hard 丟棄的未提交修改不能用 reflog 找回。'}
    ]
  },
  {
    id:'restore',title:'08｜restore：取消暫存與丟棄修改',intro:'先分清楚改的是哪一區；取消暫存不等於把工作檔案改回去。',
    frames:[
      {title:'未暫存：從暫存區恢復工作檔案',command:'git restore file.txt',cards:[{title:'工作區',tag:'修改版 → 暫存區版本',lines:['指定檔案未暫存修改被丟棄']},{title:'暫存區',tag:'不改動',lines:['作為 restore 的來源']},{title:'HEAD',tag:'不移動',lines:['不新增 commit']}],note:'來源預設是暫存區，不一定是 HEAD。確認指定修改可丟棄再操作。'},
      {title:'已暫存：先取消暫存，再決定是否還原',command:'git restore --staged file.txt',cards:[{title:'工作區',tag:'修改仍保留',lines:['檔案內容沒有回到舊版']},{title:'暫存區',tag:'回到 HEAD 版本',lines:['取消待提交差異']},{title:'HEAD',tag:'不移動',lines:['已提交版本未改動']}],note:'若確定也要丟棄工作區修改，再執行 git restore file.txt。'},
      {title:'已 commit：共享歷史可用 revert 追加修正',command:'git revert --no-edit 實際commit編號',cards:[{title:'原本的 commit',tag:'保留歷史',lines:['記錄刪除或錯誤修改']},{title:'新的 revert commit',tag:'反向修改',lines:['恢復原本內容','可能需要解決衝突']},{title:'目前分支',tag:'往新 commit 移動',lines:['不是把指標往回移動']}],note:'若使用 reset --hard 則是移動分支並覆蓋檔案，屬於另一種操作；不要把兩者混在一起。'}
    ]
  },
  {
    id:'amend',title:'09｜amend：建立新的替代 commit',intro:'amend 不是原地改寫同一個 commit 的內容。',
    frames:[
      {title:'只改訊息：檔案不變，識別碼仍改變',command:'git commit --amend -m "新訊息"',nodes:[{id:'P',x:150,y:175,ref:'共同父 commit'},{id:'C1',x:480,y:150,ref:'原本訊息'},{id:'C2',x:480,y:245,ref:'HEAD → main'}],edges:[['P','C1'],['P','C2']],cards:[{title:'C1：舊訊息版本',tag:'原本 commit',lines:['檔案相同','訊息有錯字','main 不再指向它']},{title:'C2：新訊息版本',tag:'新的識別碼',lines:['檔案與 C1 相同','訊息已修正','相同的父 commit P']}],note:'即使只改一個字，amend 仍建立全新的 commit；識別碼一定改變。'},
      {title:'把暫存變更加入最後一筆提交',command:'git add f2.html；git commit --amend',nodes:[{id:'P',x:150,y:175,ref:'共同父 commit'},{id:'C1',x:480,y:150,ref:'原本 commit'},{id:'C2',x:480,y:245,ref:'HEAD → main'}],edges:[['P','C1'],['P','C2']],cards:[{title:'C1：原本版本',tag:'識別碼原樣保留',lines:['只有 f1.html','main 不再指向它']},{title:'C2：替代版本',tag:'新的識別碼',lines:['f1.html 與 f2.html','相同的父 commit P']}],note:'舊 commit 不是立即消失；amend 建立新 commit，分支改指向新版本。先用尚未分享的提交練習。'},
      {title:'已分享的提交不要 amend',command:'已 push 的 C2：改用新增修正 commit',nodes:[{id:'P',x:120,y:175,ref:'共同起點'},{id:'C2',x:350,y:175,ref:'你已分享的版本'},{id:'C2’',x:580,y:150,ref:'你改寫的版本'},{id:'C3',x:580,y:245,ref:'同學接續的版本'}],edges:[['P','C2'],['P','C2’'],['C2','C3']],cards:[{title:'你的改寫',tag:'C2’ 識別碼不同',lines:['同學的 C3 接在 C2 後','C2’ 與 C3 已分岔']},{title:'正確做法',tag:'新增修正',lines:['保留 C2','再提交修正 commit','不用改寫歷史']}],note:'改寫已分享歷史會讓同學的接續提交分岔；最後一筆已分享時，優先新增修正 commit。'}
    ]
  },
  {
    id:'history',title:'10｜main、HEAD 與歷史',intro:'每個 commit 都記錄當時的專案版本；main 指向最新的提交。',
    frames:[
      {title:'第一筆 commit：建立三個 a 檔案',command:'git add a1.html a2.html a3.html；git commit',nodes:[{id:'C1',x:180,y:175,ref:'HEAD → main'}],edges:[],cards:[{title:'專案資料夾',tag:'C1 的版本',lines:['a1.html、a2.html、a3.html']}],note:'HEAD 指向 main，main 指向 C1。提交記錄版本，不是只有一段訊息。'},
      {title:'三次新增 b 檔案：分支跟著新提交往前',command:'依序新增 b1.html、b2.html、b3.html，每次 add 與 commit',nodes:[{id:'C1',x:120,y:175,ref:'建立三個 a 檔案'},{id:'C2',x:350,y:175,ref:'新增 b1.html'},{id:'C3',x:580,y:175,ref:'新增 b2.html'},{id:'C4',x:810,y:175,ref:'HEAD → main'}],edges:[['C1','C2'],['C2','C3'],['C3','C4']],cards:[{title:'專案資料夾',tag:'C4 的版本',lines:['a1.html、a2.html、a3.html','b1.html、b2.html、b3.html']}],note:'C4 提交 b3.html；舊 commit 仍保留各自當時的版本。main 是可移動的分支名稱。'},
      {title:'查詢歷史不會移動分支',command:'git show HEAD；git ls-tree --name-only HEAD~3；git diff --name-status HEAD~3 HEAD',cards:[{title:'show 與 ls-tree',tag:'只讀取不切換',lines:['show 看某筆內容','ls-tree 列該筆檔名','工作區不受影響']},{title:'diff 比較兩筆',tag:'--name-status 列清單',lines:['第一筆只有三個 a','差異列出新增的 b','HEAD~3 沿第一父回溯']}],note:'這些查詢不會切換分支或改動工作區；真的要在舊版本操作才用 switch --detach。'}]
  },
  {
    id:'ignore',title:'11｜.gitignore：忽略未追蹤檔案',intro:'忽略清單不是清除歷史，也不會自動停止追蹤既有檔案。',
    frames:[
      {title:'新檔案與既有檔案，結果不同',command:'.gitignore 加入 .env；已追蹤時另需 git rm --cached .env',cards:[{title:'新的 .env',tag:'尚未追蹤',lines:['符合忽略規則','一般 add 不會加入','仍存在於電腦']},{title:'已追蹤的 .env',tag:'仍被追蹤',lines:['只改 .gitignore 不夠','rm --cached 取消追蹤','再 commit 記錄變更']},{title:'舊 commit',tag:'歷史仍有內容',lines:['ignore 不清除舊版本','已洩漏秘密需另行處理']}],note:'把不含秘密的 .env.example 加入教材，真實金鑰不要提交。'},
      {title:'規則：萬用字元、目錄與例外',command:'*.log；cache/；/build/；!keep.log',cards:[{title:'*.log',tag:'各層符合的檔案',lines:['debug.log 被忽略','子目錄的 log 也忽略']},{title:'cache/ 與 /build/',tag:'目錄規則',lines:['cache/ 忽略各層同名目錄','/build/ 只忽略同層目錄']},{title:'!keep.log',tag:'例外放後面',lines:['取消前面的忽略','順序有影響','父目錄被排除要同時處理']}],note:'父目錄整個被排除時，不能只用一條檔案例外把裡面救回，要同時處理父目錄規則。'},
      {title:'查原因與提交清單本身',command:'git check-ignore -v 路徑；git status --short --ignored',cards:[{title:'check-ignore',tag:'查命中哪條規則',lines:['顯示檔名與行號','只對未追蹤檔有效','已追蹤路徑無輸出']},{title:'status --ignored',tag:'列出被忽略',lines:['!! .env','!! cache/','已追蹤檔不列為忽略']},{title:'.gitignore 本身',tag:'也要提交',lines:['同學才有一致規則','改規則也是一次提交']}],note:'已追蹤路徑在 status --ignored 預設不會列為被忽略；真實秘密已提交要先更換秘密。'}
    ]
  },
  {
    id:'sync',title:'12｜同步三角：push、fetch、pull',intro:'本地 main、origin/main、GitHub main 是三個不同位置；push 上傳，fetch 下載，pull 下載再整合。',
    frames:[
      {title:'三個位置，先分清楚',command:'git remote -v；git branch --show-current',cards:[{title:'本地 main',tag:'你電腦的分支',lines:['commit 保存在這裡','push 的來源']},{title:'origin/main',tag:'本機記錄的遠端位置',lines:['fetch 後才更新','不是即時雲端狀態']},{title:'GitHub 的 main',tag:'真正的遠端分支',lines:['別人 push 會改變它','你要 fetch 才看得到']}],note:'origin 是本機給遠端網址取的名稱；origin/main 是本機的追蹤紀錄，不是雲端本身。'},
      {title:'push：上傳指定分支',command:'git push -u origin main',cards:[{title:'本地 main',tag:'已有新 commit',lines:['C2 已提交','只上傳提交']},{title:'GitHub main',tag:'收到 C2',lines:['網頁看得到新提交','-u 設定上游追蹤']},{title:'origin/main',tag:'同步到新位置',lines:['push 後自動更新','未提交檔案不會上傳']}],note:'push 只上傳提交，不含未提交檔案，也不會自動合併功能分支與 main。'},
      {title:'fetch：只下載，不整合工作區',command:'git fetch origin',cards:[{title:'GitHub main',tag:'別人已 push C3',lines:['遠端已有新版本']},{title:'origin/main',tag:'更新到 C3',lines:['本機紀錄已更新','工作區還沒變']},{title:'本地 main',tag:'仍在 C2',lines:['檔案不受影響','要整合再選 merge 或 rebase']}],note:'fetch 不會動你的檔案；想看差異再用 log 或 diff 比較本地與 origin/main。'},
      {title:'pull 被拒絕：先看歷史再選邊',command:'git pull --ff-only origin main（分岔時拒絕）',cards:[{title:'non-fast-forward',tag:'遠端拒絕更新',lines:['不是檔案衝突','是歷史已分岔','先 fetch 看圖']},{title:'沒分岔',tag:'快轉即可',lines:['本地是祖先','--ff-only 直接成功']},{title:'已分岔',tag:'不要硬推',lines:['不要 force 覆蓋','選 merge 或 rebase','先看懂再整合']}],note:'push 出現 non-fast-forward 不等於已發生衝突；不要用 force 覆蓋遠端。',question:'pull 把遠端整合到哪個分支？',answer:'目前分支。寫 origin main 不會自動切到本地 main，開始前先確認分支與工作區。'},
      {title:'CLI：一鍵建庫並直接 push',command:'gh repo create 名稱 --private --source=. --remote=origin --push',cards:[{title:'執行前',tag:'本地已有提交',lines:['status 乾淨','還沒有 origin','確認可見性']},{title:'執行中',tag:'三件事一次完成',lines:['建立遠端儲存庫','命名為 origin','把 main 推上去']},{title:'執行後',tag:'用一般 push',lines:['remote -v 看得到','repo view --web 開頁面','之後不用再 create']}],note:'網站建庫與 CLI 建庫三選一就好，不要重複執行；origin 已存在時先 remote -v 確認。'}
    ]
  },
  {
    id:'tag',title:'13｜tag：固定指向版本',intro:'分支會隨提交移動；tag 通常固定指向一個版本，適合發布與交作業。',
    frames:[
      {title:'分支會動，標籤不動',command:'git tag v1.0；再提交 C3',nodes:[{id:'C1',x:120,y:175,ref:'v1.0 相關版本'},{id:'C2',x:350,y:175,ref:'打標籤的位置'},{id:'C3',x:580,y:175,ref:'HEAD → main（已往前）'}],edges:[['C1','C2'],['C2','C3']],cards:[{title:'main',tag:'可移動的分支',lines:['新提交就往前','指向 C3']},{title:'v1.0',tag:'固定的標籤',lines:['仍指向 C2','不會跟著往前']}],note:'v1.0 永遠代表當時的版本；main 繼續往前，兩者指向不同 commit。'},
      {title:'兩種標籤：正式用 annotated',command:'git tag -a v2.0 -m 版本說明；git tag 輕量名',cards:[{title:'annotated tag',tag:'-a 加 -m',lines:['另有標記者與日期','正式版本用它','可寫版本說明']},{title:'lightweight tag',tag:'只有名稱',lines:['直接指向提交','不另建標籤物件','臨時記號可用']}],note:'需要正式版本資訊時用 annotated；本章不是簽章或自動發布教學。'},
      {title:'查看標籤：先看再回 main',command:'git switch --detach v1.0；cat version.txt；git switch main',nodes:[{id:'C2',x:350,y:175,ref:'v1.0、HEAD（暫時）'},{id:'C3',x:580,y:175,ref:'main'}],edges:[['C2','C3']],cards:[{title:'detached HEAD',tag:'暫時指向標籤',lines:['看到 Release 1','新提交要用分支保留']},{title:'回 main',tag:'switch main',lines:['回到最新版本','標籤仍在原位置']}],note:'detached 的新提交沒有分支會迷路；只是查看就好，看完切回 main。'},
      {title:'分享標籤：只推指定的',command:'git push origin v1.0；遠端刪除用 push 刪標籤',cards:[{title:'上傳',tag:'指定名稱',lines:['一般 push 不推標籤','全推前先確認每一個','只分享需要的版本']},{title:'刪除',tag:'本地與遠端分開',lines:['tag -d 只刪本地','遠端要用 push 刪','共享標籤不要亂動']}],note:'修正發布通常建立新名稱；共享標籤可能被別人使用，不能隨意刪除或強制移動。'}
    ]
  },
  {
    id:'checkout',title:'14｜查看過去版本與 detached',intro:'先用 log、show 查詢；只有真的要在整個舊版本操作時才切換。',
    frames:[
      {title:'切到舊版本：HEAD 暫時離開分支',command:'git switch --detach HEAD~2',nodes:[{id:'C1',x:120,y:175,ref:'HEAD（暫時在這）'},{id:'C2',x:350,y:175,ref:'經過的版本'},{id:'C3',x:580,y:175,ref:'main（沒有移動）'}],edges:[['C1','C2'],['C2','C3']],cards:[{title:'HEAD',tag:'直接指向舊 commit',lines:['檔案回到當時版本','main 仍在新版本']},{title:'工作區',tag:'顯示舊內容',lines:['可以查看與測試','不要直接開工']}],note:'detached 只是把 HEAD 暫時指向舊 commit；分支本身沒有移動。'},
      {title:'要在舊版本開工：先開分支留住',command:'git switch -c experiment 實際識別碼',nodes:[{id:'C1',x:120,y:175,ref:'HEAD → experiment'},{id:'C2',x:350,y:175,ref:'經過的版本'},{id:'C3',x:580,y:175,ref:'main'}],edges:[['C1','C2'],['C2','C3']],cards:[{title:'experiment',tag:'新的分支名稱',lines:['指向舊版本','新提交接在後面']},{title:'main',tag:'不受影響',lines:['仍在最新版本','兩條線各自發展']}],note:'分支名在前、起點在後；在 detached 直接提交會迷路，先用分支保留。'},
      {title:'看完就回 main',command:'git switch main；確認後清理實驗分支',nodes:[{id:'C1',x:120,y:175,ref:'舊版本'},{id:'C2',x:350,y:175,ref:'經過的版本'},{id:'C3',x:580,y:175,ref:'HEAD → main'}],edges:[['C1','C2'],['C2','C3']],cards:[{title:'回到 main',tag:'switch main',lines:['檔案回到最新版','HEAD 重新指向分支']},{title:'清理',tag:'確認後再刪',lines:['有用的先合併','不需要才刪除']}],note:'切換前先確認工作區乾淨；有未提交修改要先處理再切換。'}
    ]
  },
  {
    id:'rebase',title:'15｜rebase：整理尚未分享的歷史',intro:'reword 改訊息、squash 合併、edit 拆分；只整理尚未分享的提交。',
    frames:[
      {title:'reword：三筆訊息逐一重寫',command:'git rebase -i HEAD~3（pick 改 reword）',nodes:[{id:'C1',x:120,y:175,ref:'起點（不動）'},{id:'C2',x:350,y:175,ref:'f4（改訊息）'},{id:'C3',x:580,y:175,ref:'f5（改訊息）'},{id:'C4',x:810,y:175,ref:'HEAD → 功能分支'}],edges:[['C1','C2'],['C2','C3'],['C3','C4']],cards:[{title:'編輯器',tag:'最舊到最新',lines:['三行都改 reword','保留識別碼與順序']},{title:'儲存後',tag:'依序編輯三次',lines:['檔案內容不變','三筆識別碼都改變']}],note:'本練習共四筆，HEAD~3 存在可照用；整理含根提交才用 rebase 相關的 root 選項。'},
      {title:'squash：三筆合成一筆',command:'第一行 pick，後兩行改 squash',nodes:[{id:'C1',x:120,y:175,ref:'起點'},{id:'C234',x:460,y:175,ref:'HEAD → 功能分支（三合一）'}],edges:[['C1','C234']],cards:[{title:'合併',tag:'內容相加',lines:['三個頁面都在','整理訊息為一句']},{title:'fixup 的差別',tag:'丟棄該筆訊息',lines:['沿用前面的訊息','與 squash 訊息處理不同']}],note:'不要 squash 第一行，範圍內沒有前一筆可合；before-rebase 分支留著比較成果。'},
      {title:'edit：把一筆拆成兩筆',command:'改成 edit；reset 到父提交；分批提交；繼續整理',cards:[{title:'停在該提交',tag:'edit 暫停',lines:['reset 拆回工作區','三個新檔未追蹤']},{title:'分批提交',tag:'兩次 commit',lines:['不用重寫檔案','原變更分兩筆記錄']},{title:'繼續',tag:'continue 回流程',lines:['回到整理流程','總數與內容可比較']}],note:'拆分不用把檔案重新寫一遍；是把原變更分成不同提交。'},
      {title:'卡關：中止、繼續與不改共享歷史',command:'衝突時修正後繼續；整理中用 abort 取消',cards:[{title:'abort',tag:'取消本次操作',lines:['仍在整理中可用','不要直接 reset 猜狀態']},{title:'skip',tag:'略過一筆提交',lines:['不能當解衝突方法','先讀 status 再決定']},{title:'共享分支',tag:'用 merge 不改寫',lines:['初學協作先 merge','改寫需團隊約定']}],note:'已共享的分支改寫需團隊約定；before-rebase 保留用來比較，刪除被拒絕是正常的。'}
    ]
  }
];

