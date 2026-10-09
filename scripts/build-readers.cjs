// Offline reading pages. Supports the headings, lists, tables, code and images used by this repository.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
require(path.join(root,'docs/lessons.js'));require(path.join(root,'docs/course.js'));
const entries=[
 ['overview','README.md','教材總覽'],['setup','環境安裝與設定/README.md','開始前的準備'],
 ...globalThis.GIT_LESSONS.map(l=>[l.id,l.href.replace(/^\.\.\//,'').split('#')[0],l.name]),
 ['github','github/README.md','GitHub 基本操作'],['ssh','ssh/README.md','SSH 設定'],['credentials','credential/README.md','憑證設定'],['rebase','git_rebase/README.md','rebase'],['tag','tag/README.md','標記版本'],['checkout','檢查先前修改的檔案/README.md','查看過去版本'],['errors','github常見的錯誤訊息/README.md','GitHub 常見錯誤'],['course','課程/README.md','教師課程安排'],['extras','課程/延伸主題.md','延伸主題'],['quiz','測驗/README.md','練習與測驗'],['guide','docs/README.md','圖解使用說明']
];
const routes=new Map(entries.map(([id,file])=>[path.resolve(root,file),id+'.html']));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function target(url,file){
 if(/^(https?:|mailto:|#)/.test(url))return url;
 const [location,hash]=url.split('#');let resolved=path.resolve(path.dirname(path.resolve(root,file)),location);
 if(fs.existsSync(resolved)&&fs.statSync(resolved).isDirectory())resolved=path.join(resolved,'README.md');
 return (routes.get(resolved)||path.relative(path.join(root,'docs/chapters'),resolved).split(path.sep).join('/'))+(hash?'#'+hash:'');
}
function inline(value,file){
 const tokens=[];const stash=s=>{tokens.push(s);return `\u0000${tokens.length-1}\u0000`;};
 let s=value.replace(/`([^`]+)`/g,(_,code)=>stash(`<code>${esc(code)}</code>`));
 s=s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(_,alt,url)=>{
  const desktop=target(url,file),mobile=desktop.replace('/diagrams/','/diagrams-mobile/');
  const alternate=desktop.includes('/diagrams/')&&desktop.endsWith('.svg')?`<source media="(max-width:760px)" srcset="${esc(mobile)}"/>`:'';
  return stash(`<figure><picture>${alternate}<img src="${esc(desktop)}" alt="${esc(alt||'教材操作圖')}" loading="lazy"/></picture>${alt?`<figcaption>${esc(alt)}</figcaption>`:''}</figure>`);
 });
 s=s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,label,url)=>stash(`<a href="${esc(target(url,file))}">${esc(label)}</a>`));
 s=esc(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
 return s.replace(/\u0000(\d+)\u0000/g,(_,index)=>tokens[Number(index)]);
}
function markdown(input,file){
 const lines=input.replace(/\r/g,'').split('\n'),out=[],anchors=new Map();let i=0;
 const slug=label=>{const base=label.replace(/`/g,'').toLowerCase().replace(/[^\p{L}\p{N}_ -]/gu,'').replace(/ +/g,'-');const n=anchors.get(base)||0;anchors.set(base,n+1);return base+(n?'-'+n:'');};
 while(i<lines.length){const line=lines[i];if(!line.trim()){i++;continue;}
  if(/^```/.test(line)){const language=line.slice(3).trim()||'操作與輸出';let code=[];i++;while(i<lines.length&&!/^```/.test(lines[i]))code.push(lines[i++]);i++;out.push(`<div class="reading-code"><span>${esc(language)}</span><pre><code>${esc(code.join('\n'))}</code></pre></div>`);continue;}
  const namedAnchor=line.match(/^\s*<a name="([^"]+)"><\/a>\s*$/);if(namedAnchor){out.push(`<span id="${esc(namedAnchor[1])}"></span>`);i++;continue;}
  const heading=line.match(/^(#{1,6})\s+(.+)$/);if(heading){out.push(`<h${heading[1].length} id="${esc(slug(heading[2]))}">${inline(heading[2],file)}</h${heading[1].length}>`);i++;continue;}
  if(/^\s*(?:---+|___+)\s*$/.test(line)){out.push('<hr>');i++;continue;}
  if(line.includes('|')&&/^\s*\|?\s*:?-{3,}/.test(lines[i+1]||'')){
   const cells=s=>s.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map(c=>c.trim());
   const header=cells(line);i+=2;const rows=[];while(i<lines.length&&lines[i].includes('|')&&lines[i].trim())rows.push(cells(lines[i++]));
   out.push(`<div class="table-scroll"><table><thead><tr>${header.map(c=>'<th scope="col">'+inline(c,file)+'</th>').join('')}</tr></thead><tbody>${rows.map(row=>'<tr>'+row.map(c=>'<td>'+inline(c,file)+'</td>').join('')+'</tr>').join('')}</tbody></table></div>`);continue;
  }
  if(/^\s*>/.test(line)){let quote=[];while(i<lines.length&&/^\s*>/.test(lines[i]))quote.push(lines[i++].replace(/^\s*>\s?/,''));out.push('<blockquote>'+quote.map(q=>inline(q,file)).join('<br>')+'</blockquote>');continue;}
  if(/^\s*(?:[-*]|\d+\.)\s+/.test(line)){const ordered=/^\s*\d+\./.test(line),tag=ordered?'ol':'ul',items=[];while(i<lines.length&&/^\s*(?:[-*]|\d+\.)\s+/.test(lines[i]))items.push(lines[i++].replace(/^\s*(?:[-*]|\d+\.)\s+/,''));out.push(`<${tag}>${items.map(x=>'<li>'+inline(x,file)+'</li>').join('')}</${tag}>`);continue;}
  if(/^!\[/.test(line.trim())){out.push(inline(line,file));i++;continue;}
  const paragraph=[line];i++;while(i<lines.length&&lines[i].trim()&&!/^(?:#{1,6}\s|```|\s*[-*>]\s|!\[|\d+\.\s)/.test(lines[i])&&!lines[i].includes('|'))paragraph.push(lines[i++]);out.push('<p>'+paragraph.map(x=>inline(x,file)).join(' ')+'</p>');
 }
 return out.join('\n');
}
const output=path.join(root,'docs/chapters');fs.mkdirSync(output,{recursive:true});
for(const [id,file,title] of entries){
 const lesson=globalThis.GIT_LESSONS.find(l=>l.id===id);
 const nav=globalThis.GIT_COURSE.groups.map((group,index)=>`<section class="topic-group"><h2 class="group-heading"><span>${String(index+1).padStart(2,'0')}</span>${esc(group.label)}</h2>${group.ids.map(topic=>{const l=globalThis.GIT_LESSONS.find(x=>x.id===topic);const url=topic+'.html';return `<a class="reading-topic ${id===topic?'is-current':''}" href="${esc(url)}"><span class="topic-index">${l.number}</span><span>${esc(l.name)}</span></a>`;}).join('')}</section>`).join('');
 const html=`<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}｜Git 學習筆記</title><link rel="icon" href="data:,"><link rel="stylesheet" href="../styles.css"></head><body><div class="app-shell reading-shell"><aside class="sidebar"><a class="brand" href="overview.html"><span class="brand-mark" aria-hidden="true">g.</span><span>Git 學習筆記<small>CLASSROOM HANDBOOK</small></span></a><div class="sidebar-intro"><span class="overline">實作講義</span><p>看懂圖解之後，<br>用自己的操作確認。</p></div><nav aria-label="講義章節">${nav}</nav><div class="sidebar-footer"><a href="overview.html">教材總覽 ↗</a><a href="course.html">教師課程安排 ↗</a></div></aside><div class="workspace"><header class="topbar"><a class="reading-home" href="overview.html">← 教材總覽</a><a class="text-link" href="../index.html#${lesson?lesson.id:'staging'}/1">互動圖解教室 ↗</a></header><main class="reading-main"><div class="reading-eyebrow">${esc(lesson?lesson.group.label+' · 第 '+lesson.number+' 章':'GIT CLASSROOM · 課程講義')}</div><article class="reading-content">${markdown(fs.readFileSync(path.join(root,file),'utf8'),file)}</article><footer><span>Git 學習筆記 · 先理解，再實作。</span><a href="overview.html">回學習路線 ↗</a></footer></main></div></div></body></html>`;
 fs.writeFileSync(path.join(output,id+'.html'),html+'\n');
}
console.log(`Built ${entries.length} offline reading pages.`);
