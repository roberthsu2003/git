(() => {
  const lessons=globalThis.GIT_LESSONS,course=globalThis.GIT_COURSE,$=id=>document.getElementById(id);
  const mobileDiagram=matchMedia('(max-width:640px)'),mobileMenu=matchMedia('(max-width:760px)');
  let topic=0,step=0,currentNarrow;
  function applyHash(){const [id,raw]=location.hash.slice(1).split('/');const found=lessons.findIndex(lesson=>lesson.id===id);topic=found>=0?found:0;const requested=Number(raw);step=Number.isInteger(requested)&&requested>0?Math.min(requested-1,lessons[topic].frames.length-1):0;}
  function closeMenu(){const wasOpen=$('sidebar').classList.contains('is-open');$('sidebar').classList.remove('is-open');$('menu-toggle').setAttribute('aria-expanded','false');if(mobileMenu.matches)$('sidebar').inert=true;return wasOpen;}
  function choose(t,s,focusTitle=false){topic=t;step=s;const closed=closeMenu();render();const hash=`#${lessons[topic].id}/${step+1}`;history.replaceState(null,'',hash);if(focusTitle||closed)$('lesson-title').focus({preventScroll:true});if(focusTitle)document.querySelector('.lesson').scrollIntoView({block:'start'});}
  function drawDiagram(){const lesson=lessons[topic];currentNarrow=$('diagram').clientWidth<600;$('diagram').innerHTML=globalThis.GitLessonSVG.render(lesson.frames[step],lesson.title,{compact:true,mobile:currentNarrow});}
  function render(){
    const lesson=lessons[topic],frame=lesson.frames[step];
    $('lesson-title').textContent=lesson.name;$('intro').textContent=lesson.intro;$('chapter-number').textContent=lesson.number;
    $('breadcrumb-stage').textContent=lesson.group.label;$('stage-label').textContent=lesson.group.label;$('level-label').textContent=lesson.level;
    $('goal').textContent=lesson.goal;$('chapter-link').href=lesson.readingHref;$('practice-link').href=lesson.readingHref;$('practice').textContent=lesson.practice;
    $('step-label').textContent=`觀察步驟 ${String(step+1).padStart(2,'0')} / ${String(lesson.frames.length).padStart(2,'0')}`;
    $('frame-title').textContent=frame.title;$('command').textContent=frame.command;$('observation').textContent=frame.note;
    $('progress').textContent=`${step+1} / ${lesson.frames.length}`;$('prev').disabled=step===0;$('next').disabled=step===lesson.frames.length-1;
    drawDiagram();$('state-description').textContent=frame.title+'。'+frame.note;
    $('question').hidden=!frame.question;$('question').open=false;$('question-label').textContent=frame.question||'';$('answer').textContent=frame.answer||'';
    [...$('topics').querySelectorAll('button[data-topic]')].forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.topic)===topic)));
    const focusedStep=document.activeElement?.dataset.step;
    $('steps').replaceChildren(...lesson.frames.map((f,i)=>{const b=document.createElement('button');b.type='button';b.textContent=String(i+1);b.title=f.title;b.setAttribute('aria-label',`步驟 ${i+1}：${f.title}`);b.setAttribute('aria-current',i===step?'step':'false');b.dataset.step=String(i);b.dataset.visited=String(i<step);b.addEventListener('click',()=>choose(topic,i));return b;}));
    if(focusedStep!==undefined)$('steps').children[step].focus({preventScroll:true});
    $('previous-chapter').disabled=topic===0;$('next-chapter').disabled=topic===lessons.length-1;
    $('previous-chapter-label').textContent=topic>0?`← ${lessons[topic-1].number} ${lessons[topic-1].name}`:'已是第一章';
    $('next-chapter-label').textContent=topic<lessons.length-1?`${lessons[topic+1].number} ${lessons[topic+1].name} →`:'主線與進階圖解已讀完';
    document.title=`${lesson.number} ${lesson.name}｜Git 學習筆記`;
  }
  course.groups.forEach((group,i)=>{const section=document.createElement('section');section.className='topic-group';const heading=document.createElement('h2');heading.className='group-heading';const number=document.createElement('span');number.textContent=String(i+1).padStart(2,'0');heading.append(number,document.createTextNode(group.label));section.append(heading);group.ids.forEach(id=>{const index=lessons.findIndex(l=>l.id===id),lesson=lessons[index],b=document.createElement('button');b.type='button';b.dataset.topic=String(index);b.setAttribute('aria-label',lesson.title);for(const [className,text] of [['topic-index',lesson.number],['topic-name',lesson.name],['topic-tail','↗']]){const span=document.createElement('span');span.className=className;span.textContent=text;b.append(span);}b.addEventListener('click',()=>choose(index,0,true));section.append(b);});$('topics').append(section);});
  $('prev').addEventListener('click',()=>choose(topic,Math.max(0,step-1)));$('next').addEventListener('click',()=>choose(topic,Math.min(lessons[topic].frames.length-1,step+1)));$('restart').addEventListener('click',()=>choose(topic,0));
  $('previous-chapter').addEventListener('click',()=>choose(Math.max(0,topic-1),0,true));$('next-chapter').addEventListener('click',()=>choose(Math.min(lessons.length-1,topic+1),0,true));
  $('download').addEventListener('click',()=>{const lesson=lessons[topic],svg=globalThis.GitLessonSVG.render(lesson.frames[step],lesson.title);const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=`${lesson.id}-${step+1}.svg`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  $('menu-toggle').addEventListener('click',()=>{const open=$('sidebar').classList.toggle('is-open');$('sidebar').inert=!open;$('menu-toggle').setAttribute('aria-expanded',String(open));if(open)$('topics').querySelector('[aria-current=true]').focus();});
  document.addEventListener('click',event=>{if(!$('sidebar').contains(event.target)&&!$('menu-toggle').contains(event.target))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&closeMenu()){$('menu-toggle').focus();return;}if(event.altKey||event.ctrlKey||event.metaKey||['INPUT','TEXTAREA','SELECT'].includes(event.target.tagName))return;if(event.key==='ArrowRight'){event.preventDefault();choose(topic,Math.min(step+1,lessons[topic].frames.length-1));}if(event.key==='ArrowLeft'){event.preventDefault();choose(topic,Math.max(0,step-1));}});
  window.addEventListener('hashchange',()=>{if(lessons.some(lesson=>lesson.id===location.hash.slice(1).split('/')[0])){applyHash();render();}});mobileDiagram.addEventListener('change',drawDiagram);mobileMenu.addEventListener('change',()=>{closeMenu();$('sidebar').inert=mobileMenu.matches;});
  applyHash();$('sidebar').inert=mobileMenu.matches;render();new ResizeObserver(()=>{if(($('diagram').clientWidth<600)!==currentNarrow)drawDiagram();}).observe($('diagram'));
})();
