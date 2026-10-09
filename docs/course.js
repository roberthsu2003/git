/* One learning order for the player, chapter navigation and generated diagrams. */
globalThis.GIT_COURSE = {
  groups: [
    {id:'foundation',label:'建立版本',subtitle:'先學會記錄，再試做功能',ids:['staging','history','branch','ignore']},
    {id:'collaborate',label:'一起開發',subtitle:'分享成果，處理不同任務',ids:['collaboration','fork','worktree','ai']},
    {id:'recover',label:'復原與整理',subtitle:'主線完成後，再學歷史操作',ids:['restore','reset','amend']},
    {id:'extend',label:'延伸圖解',subtitle:'需要時再查，先會基礎流程',ids:['sync','tag','checkout','rebase']}
  ],
  chapters: {
    staging:{name:'工作區與暫存區',goal:'分清楚正在編輯、準備提交與已提交的版本。',practice:'建立 index.txt，練習 add 後再修改，確認提交的是哪一版。',href:'../開始使用Git/README.md',level:'入門'},
    history:{name:'main、HEAD 與歷史',goal:'看懂分支名稱與目前位置如何跟著 commit 移動。',practice:'建立三筆 commit，用 git log 找到每一個記錄點。',href:'../使用main主要分支/README.md',level:'入門'},
    branch:{name:'分支與合併',goal:'在功能分支試做，再把完成的成果整合回 main。',practice:'完成會員功能與關於我們頁面，觀察切換前後的檔案。',href:'../分支/README.md',level:'入門'},
    ignore:{name:'忽略不需要追蹤的檔案',goal:'了解忽略規則對新檔案與既有檔案的不同效果。',practice:'新增一個測試用暫存檔，設定忽略規則並檢查 status。',href:'../不想被追蹤的檔案/README.md',level:'入門'},
    collaboration:{name:'GitHub 共同開發',goal:'分清楚 commit、push、PR、merge 與 pull。',practice:'兩人各開任務分支，互相檢查 PR，再更新自己的 main。',href:'../協作與PullRequest/README.md',level:'合作'},
    fork:{name:'用 Fork 交作業',goal:'選對自己的 origin 與老師的 upstream，以及 PR 方向。',practice:'Fork 練習專案，提交自我介紹，向原專案送出 PR。',href:'../Fork交作業/README.md',level:'合作'},
    worktree:{name:'worktree：多任務工作',goal:'保留未完成的功能，在另一個資料夾修正問題。',practice:'建立修正用 worktree，整合兩項成果，再清理工作資料夾。',href:'../worktree/README.md',level:'合作'},
    ai:{name:'AI 開發的 Git 節奏',goal:'把 AI 修改拆成可閱讀、可驗證、可復原的小段成果。',practice:'模擬一次失敗修改，檢查差異，再提交與復原。',href:'../日常工作流程/README.md',level:'應用'},
    restore:{name:'還原檔案與取消暫存',goal:'分清楚取消暫存、丟棄修改與反轉已提交變更。',practice:'在練習專案中分別操作未暫存、已暫存與已提交的修改。',href:'../回復被刪除的檔案或被編輯的內容/README.md',level:'進階'},
    reset:{name:'reset 的三種模式',goal:'比較 soft、mixed、hard 對不同區域的影響。',practice:'各從相同的乾淨起點，觀察三種模式的結果。',href:'../git_reset/README.md',level:'進階'},
    amend:{name:'整理最後一筆提交',goal:'理解 amend 建立替代 commit，並改變分支指向。',practice:'用尚未分享的提交練習補檔案與修改訊息。',href:'../修改目前commit/README.md',level:'進階'},
    sync:{name:'同步三角：push、fetch、pull',goal:'分清楚本地 main、origin/main 與 GitHub main，並用 CLI 建庫上傳。',practice:'用 gh repo create 建庫並 push，再用 fetch 觀察遠端更新。',href:'../github/README.md',level:'延伸'},
    tag:{name:'tag：固定指向版本',goal:'理解分支會動、標籤不動，並只分享指定的標籤。',practice:'建立 annotated 標籤， detached 查看後回 main，再 push 指定標籤。',href:'../tag/README.md',level:'延伸'},
    checkout:{name:'查看過去版本與 detached',goal:'用查詢讀歷史，只在需要操作舊版本時才切換。',practice:'用 show 與 diff 查詢，再 detach 查看並開分支保留。',href:'../檢查先前修改的檔案/README.md',level:'延伸'},
    rebase:{name:'rebase：整理尚未分享的歷史',goal:'用 reword、squash、edit 整理自己尚未分享的提交。',practice:'改訊息、合併三筆、拆分一筆，全程保留 before-rebase 比較。',href:'../git_rebase/README.md',level:'延伸'}
  }
};
const courseOrder = globalThis.GIT_COURSE.groups.flatMap(group=>group.ids);
globalThis.GIT_LESSONS = courseOrder.map((id,index)=>{
  const lesson=globalThis.GIT_LESSONS.find(item=>item.id===id);
  const chapter=globalThis.GIT_COURSE.chapters[id];
  return {...lesson,...chapter,readingHref:`chapters/${id}.html`,number:String(index+1).padStart(2,'0'),title:`${String(index+1).padStart(2,'0')}｜${chapter.name}`,group:globalThis.GIT_COURSE.groups.find(group=>group.ids.includes(id))};
});
