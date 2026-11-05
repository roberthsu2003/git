// Run from anywhere: node scripts/build-diagrams.cjs
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
require(path.join(root,'docs/lessons.js'));
require(path.join(root,'docs/course.js'));
const {render} = require(path.join(root,'docs/render-svg.js'));
const output = path.join(root,'docs/diagrams');
fs.mkdirSync(output,{recursive:true});
const mobileOutput=path.join(root,'docs/diagrams-mobile');
fs.mkdirSync(mobileOutput,{recursive:true});
let count=0;
for (const lesson of globalThis.GIT_LESSONS) {
  lesson.frames.forEach((frame,index) => {
    fs.writeFileSync(path.join(output, `${lesson.id}-${index+1}.svg`),render(frame,lesson.title)+'\n');
    fs.writeFileSync(path.join(mobileOutput, `${lesson.id}-${index+1}.svg`),render(frame,lesson.title,{compact:true,mobile:true})+'\n');
    count++;
  });
}
const comparisons=[
 {id:'ff',frame:{title:'Fast-forward：直接移到功能末端',command:'git merge --ff-only feature-login',nodes:[{id:'C0',x:120,y:175,ref:'共同起點'},{id:'A',x:450,y:175,ref:'登入表單'},{id:'B',x:780,y:175,ref:'compare-ff、feature-login'}],edges:[['C0','A'],['A','B']],cards:[{title:'目標分支',tag:'沒有新的 commit',lines:['compare-ff 從 C0 移到 B','A、B 都保留']}],note:'目標沒有分岔時，fast-forward 只移動指標。'}},
 {id:'merge',frame:{title:'Merge commit：保留合併點',command:'git merge --no-ff --no-edit feature-login',nodes:[{id:'C0',x:120,y:150,ref:'共同起點'},{id:'A',x:360,y:220,ref:'登入表單'},{id:'B',x:600,y:220,ref:'feature-login'},{id:'M',x:830,y:150,ref:'compare-merge'}],edges:[['C0','A'],['A','B'],['C0','M'],['B','M']],cards:[{title:'M 有兩個父提交',tag:'C0 與 B',lines:['保留 A、B 的歷史','新增明確的合併點']}],note:'本例用 --no-ff，即使可以快轉也建立合併提交。'}},
 {id:'squash',frame:{title:'Squash：目標只新增一筆',command:'git merge --squash feature-login；git commit',nodes:[{id:'C0',x:150,y:175,ref:'共同起點'},{id:'S',x:750,y:175,ref:'compare-squash'}],edges:[['C0','S']],cards:[{title:'目標分支',tag:'C0 → S',lines:['S 包含 A、B 的整合內容','A、B 不是 S 的父提交']},{title:'功能分支',tag:'仍指向原本的 B',lines:['A、B 還在 feature-login','圖中只畫出目標歷史']}],note:'squash 先準備變更；本機需要另行 commit。'}},
 {id:'rebase',frame:{title:'Rebase：接到更新後的起點',command:'git rebase compare-rebase；再快轉合併',nodes:[{id:'C0',x:110,y:175,ref:'共同起點'},{id:'D',x:335,y:175,ref:'新增版本說明'},{id:'A′',x:560,y:175,ref:'重套登入表單'},{id:'B′',x:785,y:175,ref:'compare-rebase'}],edges:[['C0','D'],['D','A′'],['A′','B′']],cards:[{title:'目標歷史',tag:'沒有 merge commit',lines:['A′、B′ 接在 D 後面','識別碼與原本 A、B 不同']},{title:'原功能分支',tag:'本例保留 feature-login',lines:['仍指向原來的 A、B','圖中只畫出目標歷史']}],note:'本例另建 feature-rebase，沒有改寫原 feature-login。'}}
];
for(const {id,frame} of comparisons){
 fs.writeFileSync(path.join(output,`merge-compare-${id}.svg`),render(frame,'延伸｜比較合併方式')+'\n');
 fs.writeFileSync(path.join(mobileOutput,`merge-compare-${id}.svg`),render(frame,'延伸｜比較合併方式',{compact:true,mobile:true})+'\n');
 count++;
}
const editorFrame={title:'nano：編輯、儲存與離開',command:'touch my_file.txt；nano my_file.txt',cards:[{title:'1. 輸入內容',tag:'鍵盤編輯文字',lines:['touch 建立空檔案','nano 開啟文字編輯器']},{title:'2. 儲存檔案',tag:'Ctrl + O → Enter',lines:['按 Ctrl + O','確認檔名後按 Enter']},{title:'3. 離開編輯器',tag:'Ctrl + X',lines:['儲存後按 Ctrl + X','回到終端機','用 cat 檢查內容']}],note:'nano 的 ^ 表示 Ctrl；編輯檔案還不是 Git commit，要另外 add 與 commit。'};
fs.writeFileSync(path.join(output,'editor.svg'),render(editorFrame,'補充｜終端機文字編輯')+'\n');
fs.writeFileSync(path.join(mobileOutput,'editor.svg'),render(editorFrame,'補充｜終端機文字編輯',{compact:true,mobile:true})+'\n');
count++;
console.log(`Built ${count} SVG diagram pairs (desktop + mobile) from ${globalThis.GIT_LESSONS.length} lessons.`);
