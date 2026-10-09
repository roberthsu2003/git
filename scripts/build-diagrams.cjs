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
const editorFrame={title:'nano：編輯、儲存與離開',command:'touch my_file.txt；nano my_file.txt',cards:[{title:'1. 輸入內容',tag:'鍵盤編輯文字',lines:['touch 建立空檔案','nano 開啟文字編輯器']},{title:'2. 儲存檔案',tag:'Ctrl + O → Enter',lines:['按 Ctrl + O','確認檔名後按 Enter']},{title:'3. 離開編輯器',tag:'Ctrl + X',lines:['儲存後按 Ctrl + X','回到終端機','用 cat 檢查內容']}],note:'nano 的 ^ 表示 Ctrl；編輯檔案還不是 Git commit，要另外 add 與 commit。'};
fs.writeFileSync(path.join(output,'editor.svg'),render(editorFrame,'補充｜終端機文字編輯')+'\n');
fs.writeFileSync(path.join(mobileOutput,'editor.svg'),render(editorFrame,'補充｜終端機文字編輯',{compact:true,mobile:true})+'\n');
count++;
console.log(`Built ${count} SVG diagram pairs (desktop + mobile) from ${globalThis.GIT_LESSONS.length} lessons.`);
