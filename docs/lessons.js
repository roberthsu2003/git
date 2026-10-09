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
      {title:'reset --hard：工作區也改成目標版本',command:'git reset --hard C1',cards:[{title:'工作區',tag:'改成 V1',lines:['受追蹤檔案的修改被覆蓋']},{title:'暫存區',tag:'回到 V1',lines:['與 C1 一致']},{title:'main 與 HEAD',tag:'回到 C1（V1）',lines:['三者都對齊目標版本']}],note:'先保留需要的內容再操作。hard 不是「刪除所有未追蹤檔案」，但阻擋檔案寫入的未追蹤內容可能被移除。'}
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
      {title:'把暫存變更加入最後一筆提交',command:'git add f2.html；git commit --amend',nodes:[{id:'P',x:150,y:175,ref:'共同父 commit'},{id:'C1',x:480,y:150,ref:'原本 commit'},{id:'C2',x:480,y:245,ref:'HEAD → main'}],edges:[['P','C1'],['P','C2']],cards:[{title:'C1：原本版本',tag:'識別碼原樣保留',lines:['只有 f1.html','main 不再指向它']},{title:'C2：替代版本',tag:'新的識別碼',lines:['f1.html 與 f2.html','相同的父 commit P']}],note:'舊 commit 不是立即消失；amend 建立新 commit，分支改指向新版本。先用尚未分享的提交練習。'}
    ]
  },
  {
    id:'history',title:'10｜main、HEAD 與歷史',intro:'每個 commit 都記錄當時的專案版本；main 指向最新的提交。',
    frames:[
      {title:'第一筆 commit：建立三個 a 檔案',command:'git add a1.html a2.html a3.html；git commit',nodes:[{id:'C1',x:180,y:175,ref:'HEAD → main'}],edges:[],cards:[{title:'專案資料夾',tag:'C1 的版本',lines:['a1.html、a2.html、a3.html']}],note:'HEAD 指向 main，main 指向 C1。提交記錄版本，不是只有一段訊息。'},
      {title:'三次新增 b 檔案：分支跟著新提交往前',command:'依序新增 b1.html、b2.html、b3.html，每次 add 與 commit',nodes:[{id:'C1',x:120,y:175,ref:'建立三個 a 檔案'},{id:'C2',x:350,y:175,ref:'新增 b1.html'},{id:'C3',x:580,y:175,ref:'新增 b2.html'},{id:'C4',x:810,y:175,ref:'HEAD → main'}],edges:[['C1','C2'],['C2','C3'],['C3','C4']],cards:[{title:'專案資料夾',tag:'C4 的版本',lines:['a1.html、a2.html、a3.html','b1.html、b2.html、b3.html']}],note:'C4 提交 b3.html；舊 commit 仍保留各自當時的版本。main 是可移動的分支名稱。'}
    ]
  },
  {
    id:'ignore',title:'11｜.gitignore：忽略未追蹤檔案',intro:'忽略清單不是清除歷史，也不會自動停止追蹤既有檔案。',
    frames:[
      {title:'新檔案與既有檔案，結果不同',command:'.gitignore 加入 .env；已追蹤時另需 git rm --cached .env',cards:[{title:'新的 .env',tag:'尚未追蹤',lines:['符合忽略規則','一般 add 不會加入','仍存在於電腦']},{title:'已追蹤的 .env',tag:'仍被追蹤',lines:['只改 .gitignore 不夠','rm --cached 取消追蹤','再 commit 記錄變更']},{title:'舊 commit',tag:'歷史仍有內容',lines:['ignore 不清除舊版本','已洩漏秘密需另行處理']}],note:'把不含秘密的 .env.example 加入教材，真實金鑰不要提交。'}
    ]
  }
];
