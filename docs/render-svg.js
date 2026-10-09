/* Shared vector renderer: full static diagrams, compact classroom and stacked mobile view. */
(function (scope) {
  const esc=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
  function wrap(value,limit){const lines=[];let line='',width=0;for(const ch of String(value)){const size=ch.charCodeAt(0)>255?1:.56;if(width+size>limit){lines.push(line);line='';width=0;}line+=ch;width+=size;}if(line)lines.push(line);return lines;}
  function textLines(lines,x,y,css,spacing=27){return `<text x="${x}" y="${y}" class="${css}">${lines.map((line,i)=>`<tspan x="${x}" dy="${i?spacing:0}">${esc(line)}</tspan>`).join('')}</text>`;}
  function render(frame,topicTitle,options={}){
    const compact=Boolean(options.compact),mobile=compact&&Boolean(options.mobile);
    const width=mobile?440:960,margin=mobile?16:36,inner=width-margin*2;
    const cards=frame.cards||[],gap=18,cardW=mobile?inner:(inner-gap*(cards.length-1))/cards.length;
    const bodySize=compact?21:19,tagSize=compact?18:17;
    const graphH=mobile&&frame.nodes?frame.nodes.length*94+12:0;
    const panelsY=compact?(frame.nodes?(mobile?graphH:240):18):315;
    const actualPanelsY=compact?panelsY:(frame.nodes?315:144);
    const prepared=cards.map(card=>{const tag=wrap(card.tag,(cardW-40)/tagSize),body=card.lines.flatMap(line=>wrap(line,(cardW-40)/bodySize));return {...card,tag,body,bodyY:80+tag.length*25,h:Math.max(168,96+tag.length*25+body.length*27)};});
    const maxH=Math.max(...prepared.map(card=>card.h));
    let cursor=actualPanelsY;
    prepared.forEach(card=>{card.y=mobile?cursor:actualPanelsY;cursor+=card.h+14;});
    const panelsEnd=mobile?cursor-14:actualPanelsY+maxH;
    const command=wrap(frame.command,47),note=wrap(frame.note,45);
    const commandY=panelsEnd+24,commandH=36+command.length*26,noteY=commandY+commandH+36;
    const height=compact?panelsEnd+18:noteY+note.length*27+28;
    const parts=[`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="diagram-title diagram-desc">`,
      `<title id="diagram-title">${esc(frame.title)}</title><desc id="diagram-desc">${esc(frame.note)} ${esc(cards.map(c=>`${c.title}：${c.tag}；${c.lines.join('；')}`).join('。'))}</desc>`,
      `<style>text{font-family:system-ui,-apple-system,"Noto Sans TC","Microsoft JhengHei",sans-serif;fill:#263c32}.eyebrow{font-size:16px;fill:#71826b}.heading{font-size:28px;font-weight:650}.card-title{font-size:24px;font-weight:650}.tag{font-size:${tagSize}px;fill:#5e7653}.body{font-size:${bodySize}px}.command{font-size:18px;fill:#e7eee2;font-family:ui-monospace,SFMono-Regular,Consolas,monospace}.note{font-size:19px;fill:#61765a}.ref{font-size:${mobile?18:16}px;fill:#526c47}.commit{font-size:17px;font-weight:650}</style>`,
      `<rect width="${width}" height="${height}" rx="16" fill="${compact?'#fafbf7':'#f5f7f0'}"/>`];
    if(!compact)parts.push(textLines([topicTitle],margin,34,'eyebrow'),textLines([frame.title],margin,82,'heading'));
    if(frame.nodes){
      if(mobile){
        frame.nodes.forEach((node,i)=>{
          const y=46+i*94,parents=(frame.edges||[]).filter(edge=>edge[1]===node.id).map(edge=>edge[0]);
          parts.push(`<circle cx="48" cy="${y}" r="20" fill="#fff" stroke="#748f61" stroke-width="2"/><text x="48" y="${y+6}" text-anchor="middle" class="commit">${esc(node.id)}</text>`,textLines(wrap(node.ref,17),84,y-8,'ref',23),textLines([parents.length?'父 commit：'+parents.join('、'):'起點／圖中未列出父 commit'],84,y+43,'eyebrow'));
        });
      }else{
        const offset=compact?-75:0;
        for(const [from,to] of frame.edges||[]){const a=frame.nodes.find(n=>n.id===from),b=frame.nodes.find(n=>n.id===to);parts.push(`<path d="M ${a.x} ${a.y+offset} L ${b.x} ${b.y+offset}" stroke="#a4b39a" stroke-width="2.5" fill="none"/>`);}
        for(const n of frame.nodes)parts.push(`<circle cx="${n.x}" cy="${n.y+offset}" r="21" fill="#fff" stroke="#748f61" stroke-width="2.5"/><text x="${n.x}" y="${n.y+offset+6}" text-anchor="middle" class="commit">${esc(n.id)}</text><text x="${n.x}" y="${n.y+offset-34}" text-anchor="middle" class="ref">${esc(n.ref)}</text>`);
        parts.push(textLines(['圓點是 commit；線表示父子關係；名稱標示分支指向的位置。'],margin,294+offset,'eyebrow'));
      }
    }
    prepared.forEach((card,i)=>{
      const x=mobile?margin:margin+i*(cardW+gap),h=mobile?card.h:maxH;
      parts.push(`<rect x="${x}" y="${card.y}" width="${cardW}" height="${h}" rx="10" fill="#ffffff" stroke="#dce3d4"/><path d="M ${x+12} ${card.y+2} H ${x+cardW-12}" stroke="${['#728d60','#b57e4d','#628c87'][i%3]}" stroke-width="3" stroke-linecap="round"/>`,textLines([card.title],x+20,card.y+38,'card-title'),textLines(card.tag,x+20,card.y+68,'tag',25),textLines(card.body,x+20,card.y+card.bodyY,'body'));
    });
    if(!compact)parts.push(`<rect x="${margin}" y="${commandY}" width="${inner}" height="${commandH}" rx="10" fill="#21362d"/>`,textLines(command,margin+18,commandY+31,'command',26),textLines(note,margin,noteY,'note'));
    parts.push('</svg>');return parts.join('\n');
  }
  scope.GitLessonSVG={render,wrap};if(typeof module!=='undefined')module.exports=scope.GitLessonSVG;
})(globalThis);
