'use strict';
const $ = (q,root=document) => root.querySelector(q);
const ICONS = {
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  chart:'<path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-8"/>',
  camera:'<path d="M14 4H9l-2 3H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
  settings:'<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.9l.06.06-1.85 1.84-.06-.06A1.7 1.7 0 0 0 16 18.4a1.7 1.7 0 0 0-1 1.58V21h-2.7v-1.02a1.7 1.7 0 0 0-1.06-1.58 1.7 1.7 0 0 0-1.9.34l-.06.06-1.84-1.85.06-.06A1.7 1.7 0 0 0 7.8 15a1.7 1.7 0 0 0-1.58-1H5.2v-2.7h1.02a1.7 1.7 0 0 0 1.58-1.06 1.7 1.7 0 0 0-.34-1.9L7.4 8.3l1.85-1.84.06.06a1.7 1.7 0 0 0 1.9.34 1.7 1.7 0 0 0 1-1.58V4.2h2.7v1.02a1.7 1.7 0 0 0 1.06 1.58 1.7 1.7 0 0 0 1.9-.34l.06-.06 1.84 1.85-.06.06a1.7 1.7 0 0 0-.34 1.9 1.7 1.7 0 0 0 1.58 1h1.02v2.7h-1.02A1.7 1.7 0 0 0 19.4 15z" transform="translate(-.6 -.6) scale(.97)"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  chevron:'<path d="m9 18 6-6-6-6"/>',
  left:'<path d="m15 18-6-6 6-6"/>',
  weight:'<rect x="3" y="4" width="18" height="17" rx="4"/><path d="M9 9a3 3 0 0 1 6 0M12 9v3"/>',
  fire:'<path d="M12 22c-5 0-8-3-8-8 0-4 3-8 4-10 0 5 3 6 3 6s3-3 4-7c3 4 5 7 5 11 0 5-3 8-8 8z"/>',
  moon:'<path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14z"/>',
  walk:'<circle cx="13" cy="4" r="2"/><path d="m8 22 3-7-3-4 4-5 3 2 2 5h3M12 13l4 4 1 5M6 16l-3 5"/>',
  bed:'<path d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 16h18M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M7 19v2M17 19v2"/>',
  desk:'<rect x="3" y="4" width="18" height="11" rx="2"/><path d="M8 21h8M12 15v6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wine:'<path d="M7 3h10l-1 8a4 4 0 0 1-8 0L7 3zM12 15v6m-4 0h8M3 3l18 18"/>',
  food:'<path d="M5 3v7m3-7v7m-3-3h3m-1.5 3v11M18 3c-3 3-3 7-3 10h4v8"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  upload:'<path d="M12 16V3m-5 5 5-5 5 5M4 17v4h16v-4"/>',
  download:'<path d="M12 3v13m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  trash:'<path d="M3 6h18m-2 0-1 15H6L5 6m4-3h6l1 3M10 10v7m4-7v7"/>',
  leaf:'<path d="M21 3C10 3 4 7 4 15a6 6 0 0 0 6 6c8 0 12-7 11-18zM4 21c3-6 7-9 12-12"/>',
  spark:'<path d="m12 2 1.7 7.3L21 11l-7.3 1.7L12 20l-1.7-7.3L3 11l7.3-1.7L12 2z"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 16-5-5L5 21"/>',
  info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  refresh:'<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.8 9A7 7 0 0 1 18.5 7l1.5 5M4 12l1.5 5A7 7 0 0 0 18 15"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>'
};
const svg = (name)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.spark}</svg>`;
const esc = value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));
const number = v=>Number.isFinite(Number(v))?Number(v):0;
const nf = (v,d=1)=>Number(v).toLocaleString('ru-RU',{maximumFractionDigits:d});
const iso = (date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const fromIso = s=>new Date(`${s}T12:00:00`);
const prettyDate = (s,opts={day:'numeric',month:'long'})=>fromIso(s).toLocaleDateString('ru-RU',opts);
const weekday = s=>fromIso(s).toLocaleDateString('ru-RU',{weekday:'long'});
const defaultState=()=>({version:1,start:{date:'2026-11-02',weight:89.1},settings:{name:'Данил',targetWeight:80,calorieGoal:1800,treadmillGoal:60,autoLaunch:false,notifications:true,sound:true,reminderTime:'20:30',weeklyReminderDay:0,weeklyReminderTime:'18:00'},daily:{},weekly:[{date:'2026-11-02',weight:89.1,waist:null,notes:'',photos:[]}]});
let state=defaultState();
let view='home';
let selectedDate=iso();
let editWeekDate=iso();
let compareA='',compareB='';
let saveTimer=null,toastTimer=null;
let appReady=false;
let dataLocation='';
let updateStatus={ phase:'unsupported', currentVersion:'1.1.1', message:'Обновления доступны после установки FOCUS на Windows.', percent:0 }; 
const isDesktop=Boolean(window.focusDesktop);
document.documentElement.classList.toggle('desktop-window', isDesktop);
function syncWindowState(maximized) {
  document.documentElement.classList.toggle('window-maximized', Boolean(maximized));
  const control=document.querySelector('[data-action="window-maximize"]');
  if(control){
    control.title=maximized?'Восстановить':'Развернуть';
    control.setAttribute('aria-label',control.title);
  }
}
const browserAPI={
  async load(){try{const j=localStorage.getItem('focus-local-preview-v1');return j?JSON.parse(j):defaultState();}catch{return defaultState()}},
  async save(s){localStorage.setItem('focus-local-preview-v1',JSON.stringify(s));return s},
  async addPhoto(){return new Promise(resolve=>{const f=document.createElement('input');f.type='file';f.accept='image/png,image/jpeg,image/webp';f.onchange=()=>{const file=f.files?.[0];if(!file)return resolve(null);const reader=new FileReader();reader.onload=()=>resolve({id:Math.random().toString(36).slice(2),filename:'browser',data:reader.result,dateAdded:new Date().toISOString()});reader.readAsDataURL(file)};f.click()})},
  async deletePhoto(){return true},
  async exportBackup(){const blob=new Blob([JSON.stringify({format:'FOCUS-backup-1',state},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`FOCUS-backup-${iso()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return true},
  async importBackup(){return new Promise(resolve=>{const f=document.createElement('input');f.type='file';f.accept='.json';f.onchange=async()=>{try{const backup=JSON.parse(await f.files[0].text());if(backup.format!=='FOCUS-backup-1')throw new Error('Неверный формат');state={...defaultState(),...backup.state};await api.save(state);render();resolve(true)}catch(e){toast(e.message);resolve(false)}};f.click()})},
  async dataLocation(){return 'localStorage браузера'},
  async resetData(){const d=defaultState();await this.save(d);return d},
  async updateStatus(){return { ...updateStatus }},
  async checkUpdate(){toast('Обновления через GitHub работают в установленном приложении Windows.');return updateStatus},
  async downloadUpdate(){return updateStatus},
  async installUpdate(){return { ok:false }},
  onUpdateStatus(){},
};
const api=window.focusDesktop||browserAPI;
function scheduleSave(){clearTimeout(saveTimer);saveTimer=setTimeout(()=>api.save(state).catch(e=>toast(`Не удалось сохранить: ${e.message}`)),180)}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3500)}
const daysBetween=(a,b)=>Math.floor((fromIso(b)-fromIso(a))/(24*60*60*1000));
function getDaily(s=selectedDate){if(!state.daily[s])state.daily[s]={};return state.daily[s]}
function weeks(){return [...state.weekly].sort((a,b)=>a.date.localeCompare(b.date))}
function measuredWeeks(){return weeks().filter(x=>x.weight!=null&&Number.isFinite(Number(x.weight))&&Number(x.weight)>0)}
function latestWeight(){const arr=measuredWeeks();return arr.length?Number(arr[arr.length-1].weight):Number(state.start.weight)}
function weightDone(){const start=number(state.start.weight),cur=latestWeight(),goal=number(state.settings.targetWeight);if(start===goal)return 100;return clamp(((start-cur)/(start-goal))*100,0,100)}
function weightRemaining(){return Math.max(0,latestWeight()-Number(state.settings.targetWeight))}
function daysWithEntries(){const keys=Object.keys(state.daily).sort();let streak=0;let ptr=fromIso(iso());if(!state.daily[iso()]||!Object.keys(state.daily[iso()]).length)ptr.setDate(ptr.getDate()-1);for(let i=0;i<365;i++){let key=iso(ptr);if(!state.daily[key]||!Object.values(state.daily[key]).some(v=>v!==null&&v!==undefined&&v!==''))break;streak++;ptr.setDate(ptr.getDate()-1)}return streak}
function checks(d){const g=state.settings;return [
  d.calories!=null&&number(d.calories)>0&&number(d.calories)<=number(g.calorieGoal),
  d.treadmill!=null&&number(d.treadmill)>=number(g.treadmillGoal),
  d.alcoholFree===true,
  d.sleep!=null&&number(d.sleep)>=7&&number(d.sleep)<=9,
  d.bedMade===true,d.deskClean===true,
  !!d.wakeTime&&d.wakeTime<='09:00',
  d.noLateFood===true
]}
function topBar(){const pageNames={home:'Главная',daily:'Мои привычки',progress:'Мой прогресс',photos:'Фотографии',settings:'Настройки'};
 return `<div class="topbar"><div><div class="eyebrow">ТВОЁ ПРОСТРАНСТВО / FOCUS</div><h1 class="page-title">${pageNames[view]}</h1></div><div class="top-meta"><span class="online-indicator"></span><span>Все данные локально</span><div class="top-date">${svg('calendar')}${prettyDate(iso(),{day:'numeric',month:'long',year:'numeric'})}</div></div></div>`}
function side(){const menu=[['home','home','Обзор'],['daily','check','Привычки'],['progress','chart','Прогресс'],['photos','camera','Фотографии'],['settings','settings','Настройки']];const name=state.settings.name||'Данил';return `<aside class="sidebar">
 <div class="brand"><div class="brand-icon">F</div><div><div class="brand-main">FOCUS<span style="color:#a2d4b2">.</span></div><div class="brand-sub">stay intentional</div></div></div>
 <div class="nav-head">ПРОСТРАНСТВО</div><nav class="nav">${menu.map(([id,icon,label])=>`<button class="nav-item ${view===id?'active':''}" data-action="navigate" data-view="${id}" title="${label}">${svg(icon)}<span class="nav-label">${label}</span></button>`).join('')}</nav>
 <div class="sidebar-spacer"></div><div class="side-quote"><div class="quote-icon">“</div><div class="quote-text">Consistency over intensity.</div><div class="quote-cap">Маленькие шаги. Каждый день.</div></div>
 <div class="profile"><div class="profile-avatar">${esc(name.trim().charAt(0).toUpperCase()||'Д')}</div><div><strong>${esc(name)}</strong><span>Твой ритм. Твои правила.</span></div></div></aside>`}
function hero(){const h=new Date().getHours();const greeting=h<11?'Доброе утро':h<17?'Хорошего дня':'Добрый вечер';const n=state.settings.name||'Данил';return `<div class="hero"><div class="hero-text"><div class="date-label">${svg('spark')} НОВЫЙ ДЕНЬ · НОВЫЙ ШАГ</div><h2>${greeting},<br>${esc(n)}.</h2><p>Не нужно быть идеальным. Достаточно двигаться в своём темпе и замечать, как ты меняешься.</p></div><div class="hero-focus">Stay Focused.</div></div>`}
function metricCards(){const cur=latestWeight(),goal=number(state.settings.targetWeight),lost=number(state.start.weight)-cur,wd=weightDone(),streak=daysWithEntries();return `<div class="metrics">
 <div class="tile"><div class="metric-bubble">${svg('weight')}</div><div class="panel-heading">Текущий вес</div><div class="metric-value">${nf(cur)} <small>кг</small></div><div class="metric-detail">Старт ${nf(state.start.weight)} кг · цель ${nf(goal)} кг</div></div>
 <div class="tile"><div class="metric-bubble">${svg('target')}</div><div class="panel-heading">Путь к цели</div><div class="metric-value">${nf(wd,0)}<small> %</small></div><div class="meter"><span style="width:${wd}%"></span></div><div class="metric-note"><span>${wd?`Уже ${nf(lost)} кг в сторону цели`:'Начало пути'}</span><span>До ${nf(goal)} кг</span></div></div>
 <div class="tile"><div class="metric-bubble">${svg('leaf')}</div><div class="panel-heading">Дни с записями подряд</div><div class="metric-value">${streak} <small>${streak===1?'день':'дней'}</small></div><div class="metric-detail">Даже один отмеченный день — уже шаг.</div></div></div>`}
function checkButton(key,d){return `<button class="habit-check ${d[key]===true?'checked':''}" data-action="toggle" data-key="${key}" title="${d[key]===true?'Снять отметку':'Отметить выполненным'}" aria-label="Отметить выполненным">${svg('check')}</button>`}
function habitCard(icon,title,desc,control){return `<div class="habit"><div class="habit-icon">${svg(icon)}</div><div class="habit-content"><div class="habit-name">${title}</div><div class="habit-meta">${desc}</div></div>${control}</div>`}
function habitTiles(d){const goal=state.settings;return `<div class="habit-grid">
 ${habitCard('food','Питание',`Цель: ${nf(goal.calorieGoal,0)} ккал`,`<input class="habit-input" type="number" inputmode="numeric" min="0" max="20000" step="1" placeholder="ккал" aria-label="Фактически калории" data-field="daily.calories" value="${d.calories??''}">`)}
 ${habitCard('walk','Беговая дорожка',`Цель: ${nf(goal.treadmillGoal,0)} минут`,`<input class="habit-input" type="number" min="0" max="1440" step="1" placeholder="мин" aria-label="Минут на дорожке" data-field="daily.treadmill" value="${d.treadmill??''}">`)}
 ${habitCard('wine','Без алкоголя','Сегодня без алкоголя',checkButton('alcoholFree',d))}
 ${habitCard('moon','Здоровый сон','От 7 до 9 часов',`<input class="habit-input" type="number" min="0" max="24" step="0.5" placeholder="часы" aria-label="Часы сна" data-field="daily.sleep" value="${d.sleep??''}">`)}
 ${habitCard('bed','Заправить постель','Начало с маленького',checkButton('bedMade',d))}
 ${habitCard('desk','Порядок на столе','Чистое рабочее место',checkButton('deskClean',d))}
 ${habitCard('clock','Подъём к 09:00','Время пробуждения',`<input type="time" class="habit-input time" aria-label="Время подъёма" data-field="daily.wakeTime" value="${esc(d.wakeTime||'')}">`)}
 ${habitCard('food','Не есть после 21:00','Твоя вечерняя привычка',checkButton('noLateFood',d))}
 </div>`}
function dateControl(){return `<div style="display:flex;align-items:center;gap:8px"><button class="small-arrow" style="width:28px;height:28px;flex-basis:28px" data-action="date-prev" title="Предыдущий день">${svg('left')}</button><span style="font-size:11px;color:#c6dfcb">${selectedDate===iso()?'Сегодня':prettyDate(selectedDate)}</span><button class="small-arrow" style="width:28px;height:28px;flex-basis:28px" data-action="date-next" title="Следующий день" ${selectedDate>=iso()?'disabled':''}>${svg('chevron')}</button></div>`}
function dayOverview(){const d=getDaily(),done=checks(d),count=done.filter(Boolean).length;return `<section class="panel"><div class="panel-label"><strong>Твои привычки</strong>${dateControl()}</div>${habitTiles(d)}<div class="daily-footer"><div class="track-dots">${done.map(b=>`<span class="${b?'done':''}"></span>`).join('')}</div><p>${count} из 8 целей</p></div></section>`}
function ringPreview(){const d=getDaily(),goal=number(state.settings.calorieGoal),cal=d.calories==null?0:number(d.calories),pct=goal?clamp(cal/goal*100,0,100):0;const dash=2*Math.PI*53;return `<div class="panel progress-panel"><div class="panel-label"><strong>Калории</strong><span>${selectedDate===iso()?'Сегодня':prettyDate(selectedDate)}</span></div><div class="ring-row"><div class="ring"><svg viewBox="0 0 128 128"><circle class="ring-base" cx="64" cy="64" r="53"/><circle class="ring-value" cx="64" cy="64" r="53" stroke-dasharray="${dash}" stroke-dashoffset="${dash*(1-pct/100)}"/></svg><div class="ring-center">${nf(cal,0)}<small>ккал</small></div></div><div class="ring-copy"><strong>${cal?nf(Math.max(goal-cal,0),0):nf(goal,0)} ккал</strong><span>${cal>goal?`Выше ориентира на ${nf(cal-goal,0)} ккал. Это просто данные.`:'До выбранного ориентира на день'}<br>Без жёсткости к себе.</span></div></div></div>`}
function weeklyPreview(){return `<div class="panel weekly-preview"><div><div class="eyebrow" style="margin-bottom:10px">ЕЖЕНЕДЕЛЬНЫЙ ОБЗОР</div><h3>Видеть прогресс.</h3><p>Вес, заметки и фотографии. Не для критики, а чтобы замечать изменения.</p></div><button class="small-arrow" data-action="navigate" data-view="progress" aria-label="Перейти к прогрессу">${svg('arrow')}</button></div>`}
function homeView(){return `${hero()}<div class="section-bar"><div><h2 class="section-title">Твой путь к 80 кг</h2><div class="section-sub">Двигайся устойчиво, в собственном ритме.</div></div><button data-action="navigate" data-view="progress" class="inline-link">Вся история ${svg('arrow')}</button></div>${metricCards()}
 <div class="section-bar"><div><h2 class="section-title">Сегодня — это важно</h2><div class="section-sub">Отмечай сделанное. Без наказаний за пропуски.</div></div><button data-action="navigate" data-view="daily" class="inline-link">Все записи ${svg('arrow')}</button></div><div class="today-layout">${dayOverview()}<div class="right-stack">${ringPreview()}${weeklyPreview()}</div></div>`}
function dailyView(){const d=getDaily();const done=checks(d),count=done.filter(Boolean).length;const all=Object.entries(state.daily).filter(([k,v])=>Object.values(v).some(x=>x!==null&&x!==undefined&&x!=='')),last14=[];for(let n=13;n>=0;n--){const day=fromIso(iso());day.setDate(day.getDate()-n);const k=iso(day),rec=state.daily[k]||{};last14.push({date:k,done:checks(rec).filter(Boolean).length,filled:Object.values(rec).some(x=>x!==null&&x!==undefined&&x!=='')})}return `<div class="page-head"><div><div class="eyebrow">РИТМ НА КАЖДЫЙ ДЕНЬ</div><p class="page-desc">Восемь привычек, которые ты выбрал сам. Можно выполнять в удобном темпе — и возвращаться к ним после любого перерыва.</p></div>${dateControl()}</div><div class="view-grid"><section class="panel wide"><div class="panel-label"><strong>Отметки за ${prettyDate(selectedDate)}</strong><span>${count} / 8</span></div>${habitTiles(d)}<div class="daily-footer"><div class="track-dots">${done.map(b=>`<span class="${b?'done':''}"></span>`).join('')}</div><p>${count} из 8 целей</p></div></section><section class="panel wide"><div class="panel-label"><strong>Последние 14 дней</strong><span>${all.length} дней с записями всего</span></div><div style="display:grid;grid-template-columns:repeat(14,minmax(0,1fr));gap:7px;margin-top:18px">${last14.map(x=>`<button title="${prettyDate(x.date)}: ${x.done}/8" data-action="go-date" data-date="${x.date}" style="border:1px solid rgba(168,223,185,.14);border-radius:9px;min-height:62px;display:flex;flex-direction:column;justify-content:end;align-items:center;gap:8px;background:${x.filled?'rgba(121,200,150,.12)':'rgba(120,180,144,.035)'};color:#b7d4c1;padding:8px 3px"><span style="font-size:10px">${x.done}</span><span style="height:${Math.max(4,x.done/8*26)}px;width:8px;border-radius:3px;background:${x.filled?'#a8d8b3':'rgba(139,187,149,.24)'}"></span><span style="font-size:9px">${fromIso(x.date).getDate()}</span></button>`).join('')}</div><p class="section-caption" style="margin:17px 0 0">Число в колонке — количество достигнутых ориентиров. Пустые дни не обнуляют твой прогресс.</p></section></div>`}
function chartSvg(items){if(!items.length)return `<div class="empty">${svg('chart')}<strong>Записей пока нет</strong><p>Добавь первый замер — здесь появится история изменения веса.</p></div>`;
 const width=900,height=225,padX=54,padTop=20,padBottom=37;
 const values=items.map(x=>number(x.weight));const goal=number(state.settings.targetWeight);
 const low=Math.min(...values,goal)-1.5,high=Math.max(...values,number(state.start.weight))+1.5;
 const y=v=>padTop+(high-v)/(high-low)*(height-padTop-padBottom);
 const x=i=>padX+(items.length===1?0:i/(items.length-1))*(width-padX-22);
 const pts=items.map((it,i)=>[x(i),y(number(it.weight))]);
 const line=pts.map(([cx,cy],i)=>`${i?'L':'M'} ${cx.toFixed(1)} ${cy.toFixed(1)}`).join(' ');
 const area=`${line} L ${pts[pts.length-1][0]} ${height-padBottom} L ${pts[0][0]} ${height-padBottom} Z`;
 const ticks=Array.from({length:5},(_,i)=>high-(high-low)*(i/4));
 return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="График веса">
 <defs><linearGradient id="chartArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#b4eac3" stop-opacity=".22"/><stop offset="100%" stop-color="#b4eac3" stop-opacity="0"/></linearGradient></defs>
 ${ticks.map(t=>`<line class="chart-grid" x1="${padX}" x2="${width-22}" y1="${y(t)}" y2="${y(t)}"/><text class="chart-label" x="4" y="${y(t)+4}">${nf(t)} кг</text>`).join('')}
 ${items.length>=2?`<path d="${area}" fill="url(#chartArea)"/>`:''}<line x1="${padX}" x2="${width-22}" y1="${y(goal)}" y2="${y(goal)}" stroke="#8bca9a" stroke-dasharray="5 8" opacity=".55"/><text class="chart-label" x="${width-105}" y="${y(goal)-7}">Цель ${nf(goal,0)} кг</text>
 ${items.length>1?`<path class="chart-line" d="${line}"/>`:''}
 ${pts.map(([cx,cy],i)=>`<circle class="chart-point" cx="${cx}" cy="${cy}" r="5"><title>${prettyDate(items[i].date)} · ${nf(items[i].weight)} кг</title></circle>`).join('')}
 ${[0,items.length-1].filter((v,i,a)=>a.indexOf(v)===i).map(i=>`<text class="chart-label" x="${pts[i][0]}" y="${height-8}" text-anchor="${i===0?'start':'end'}">${prettyDate(items[i].date)}</text>`).join('')}
 </svg>`}
function progressView(){const entries=measuredWeeks(),last=entries[entries.length-1],first=Number(state.start.weight),cur=latestWeight(),diff=first-cur,pct=weightDone(),week=state.weekly.find(x=>x.date===editWeekDate)||{};return `<div class="page-head"><div><div class="eyebrow">ТВОЯ ДИНАМИКА</div><p class="page-desc">Раз в неделю запиши замеры, добавь заметку или фотографию. Сравнивай по одинаковому освещению, но не оценивай себя по одному кадру.</p></div><button class="button primary" data-action="new-measure">${svg('plus')} Новая запись</button></div>
 ${metricCards()}
 <div class="section-bar"><h2 class="section-title">История веса</h2><span class="section-sub">${entries.length} ${entries.length===1?'замер':'замеров'}</span></div>
 <section class="panel"><div class="panel-label"><strong>${nf(first)} кг → ${nf(cur)} кг</strong><span>${diff>0?`−${nf(diff)} кг`:'Отслеживание начинается'}</span></div><div class="chart-frame">${chartSvg(entries)}</div><div class="info-note">Цель — ${nf(state.settings.targetWeight)} кг. Прогресс: ${nf(pct,0)}%. Вес может колебаться из-за воды, питания и сна — лучше смотреть на тренд за несколько недель.</div></section>
 <div class="section-bar"><h2 class="section-title">Еженедельная запись</h2><span class="section-sub">Нужны только те данные, которыми комфортно делиться с приложением.</span></div>
 <section class="panel"><form id="weekly-form"><div class="form-grid">
 <div><label class="form-label" for="w-date">Дата замера</label><input class="field" id="w-date" type="date" required max="${iso()}" value="${esc(editWeekDate)}"></div>
 <div><label class="form-label" for="w-weight">Вес, кг</label><input class="field" id="w-weight" type="number" min="20" max="400" step="0.1" placeholder="Например, 88.5" value="${week.weight??''}"></div>
 <div><label class="form-label" for="w-waist">Талия, см (необязательно)</label><input class="field" id="w-waist" type="number" min="30" max="250" step="0.5" placeholder="Например, 90" value="${week.waist??''}"></div>
 <div><label class="form-label" for="w-face">Фото (необязательно)</label><button type="button" class="button" id="w-face" data-action="photo-add-week">${svg('camera')} Добавить фото к записи</button></div>
 <div class="wide"><label class="form-label" for="w-notes">Заметка — как ты себя чувствуешь</label><textarea class="field" id="w-notes" placeholder="Энергия, сон, настроение, что замечаешь...">${esc(week.notes||'')}</textarea></div></div>
 <div class="form-row"><button class="button primary" type="submit">${svg('check')} Сохранить запись</button><button type="button" class="button" data-action="navigate" data-view="photos">${svg('image')} Фотографии</button></div></form></section>
 <div class="section-bar"><h2 class="section-title">Все замеры</h2></div>
 <section class="panel">${weeks().length?`<table class="history-list"><thead><tr><th>Дата</th><th>Вес</th><th>Талия</th><th>Фото</th><th></th></tr></thead><tbody>${weeks().slice().reverse().map(x=>`<tr><td>${prettyDate(x.date,{day:'numeric',month:'long',year:'numeric'})}</td><td><strong>${x.weight!=null?`${nf(x.weight)} кг`:'—'}</strong></td><td>${x.waist!=null?`${nf(x.waist)} см`:'—'}</td><td>${(x.photos||[]).length}</td><td><button class="small-action" data-action="edit-measure" data-date="${esc(x.date)}">Открыть ${svg('chevron')}</button></td></tr>`).join('')}</tbody></table>`:'<p class="section-caption">Записей пока нет.</p>'}</section>`}
const photoSrc=p=>p.data||`focus-photo://local/${encodeURIComponent(p.filename)}`;
function allPhotos(){return weeks().flatMap(w=>(w.photos||[]).map(p=>({...p,date:w.date}))).sort((a,b)=>b.date.localeCompare(a.date))}
function photoView(){const photos=allPhotos(),face=photos.filter(p=>p.type==='face');const photoDates=[...new Set(face.map(p=>p.date))].sort();if(!compareA||!photoDates.includes(compareA))compareA=photoDates[0]||'';if(!compareB||!photoDates.includes(compareB))compareB=photoDates[photoDates.length-1]||'';
 const options=photoDates.map(d=>`<option value="${d}">${prettyDate(d,{day:'numeric',month:'long',year:'numeric'})}</option>`).join('');
 const selectPhoto=d=>face.find(p=>p.date===d);
 return `<div class="page-head"><div><div class="eyebrow">ЛИЧНЫЙ АРХИВ</div><p class="page-desc">Фотографии остаются на твоём компьютере. Снимать необязательно: используй архив только если он помогает замечать изменения без лишней самокритики.</p></div></div>
 <section class="panel"><div class="panel-label"><strong>Добавить фотографию</strong><span>JPG · PNG · WEBP, до 30 МБ</span></div><div class="form-grid">
 <div><label class="form-label" for="photo-date">Дата фотографии</label><input class="field" type="date" id="photo-date" max="${iso()}" value="${iso()}"></div>
 <div><label class="form-label" for="photo-kind">Тип</label><select class="field" id="photo-kind"><option value="face">Лицо</option><option value="body">Фигура</option><option value="other">Другое</option></select></div></div>
 <div class="form-row"><button class="button primary" data-action="photo-add">${svg('plus')} Загрузить фото</button></div></section>
 <div class="section-bar"><h2 class="section-title">Сравнение по датам</h2><span class="section-sub">Два кадра рядом</span></div>
 <section class="panel"><div class="form-grid"><div><label class="form-label">Первая дата</label><select class="field" data-field="compareA">${options.replace(`value="${compareA}"`,`value="${compareA}" selected`)}</select></div><div><label class="form-label">Вторая дата</label><select class="field" data-field="compareB">${options.replace(`value="${compareB}"`,`value="${compareB}" selected`)}</select></div></div>
 <div class="compare">${[compareA,compareB].map(d=>`<div><div class="compare-photo">${selectPhoto(d)?`<img alt="Фото лица за ${prettyDate(d)}" src="${esc(photoSrc(selectPhoto(d)))}">`:`<div class="empty">${svg('camera')}<strong>Нет фотографии</strong><p>Добавь фото лица к этой дате.</p></div>`}</div><div class="compare-label">${d?prettyDate(d,{day:'numeric',month:'long',year:'numeric'}):'Нет даты'}</div></div>`).join('')}</div></section>
 <div class="section-bar"><h2 class="section-title">Твой фотоархив</h2><span class="section-sub">${photos.length} фото</span></div>
 ${photos.length?`<div class="photos-grid">${photos.map(p=>`<div class="photo"><img loading="lazy" src="${esc(photoSrc(p))}" alt="Фото от ${prettyDate(p.date)}"><div class="photo-meta"><div><strong>${p.type==='face'?'Лицо':p.type==='body'?'Фигура':'Другое'}</strong><span>${prettyDate(p.date,{day:'numeric',month:'long',year:'numeric'})}</span></div><button class="photo-delete" title="Удалить фото" data-action="delete-photo" data-date="${p.date}" data-id="${esc(p.id)}">${svg('trash')}</button></div></div>`).join('')}</div>`:`<section class="panel empty">${svg('camera')}<strong>Здесь появятся твои фотографии</strong><p>Можно начать с одного кадра сегодня и вернуться к сравнению через несколько недель.</p></section>`}`}
function toggleSetting(name,label,description,enabled){return `<div class="setting"><div><strong>${label}</strong><p>${description}</p></div><button type="button" role="switch" aria-checked="${!!enabled}" aria-label="${label}" class="switch ${enabled?'on':''}" data-action="setting-toggle" data-key="${name}"></button></div>`}
function updateControls(){
 const u=updateStatus,phase=u.phase;
 const nextAction=phase==='available'?'update-download':phase==='ready'?'update-install':'update-check';
 const label=phase==='available'?'Скачать обновление':phase==='ready'?'Установить и перезапустить':phase==='checking'?'Проверяем…':phase==='downloading'?`Загрузка ${Math.round(u.percent||0)}%`:'Проверить обновления';
 const disabled=['checking','downloading'].includes(phase);
 const message=esc(u.message||'Проверка обновлений через GitHub Releases.');
 return `<div class="section-bar"><h2 class="section-title">Обновления FOCUS</h2></div>
 <section class="panel">
  <div class="setting"><div><strong>Версия ${esc(u.currentVersion||'1.1.0')} · GitHub Releases</strong><p id="focus-update-message" role="status" aria-live="polite">${message}</p></div>
  <button class="button ${phase==='ready'?'primary':''}" data-action="${nextAction}" ${disabled?'disabled':''}>${svg(phase==='ready'?'check':'refresh')}${label}</button></div>
  ${phase==='downloading'?`<div class="update-track" aria-label="Скачивание обновления"><div style="width:${clamp(Number(u.percent)||0,0,100)}%"></div></div>`:''}
  <p class="section-caption" style="margin-top:12px">Проверка выполняется по нажатию кнопки. Новые версии устанавливаются из официальных релизов твоего GitHub-репозитория. Записи, замеры и фотографии не входят в обновление.</p>
 </section>`;
}
function settingsView(){const s=state.settings;return `<div class="page-head"><div><div class="eyebrow">НАСТРОЙ ПОД СЕБЯ</div><p class="page-desc">Это твоё личное пространство. Все цели можно менять, а данные — сохранить в резервной копии.</p></div></div>
 <div class="section-bar"><h2 class="section-title">Личные цели</h2></div>
 <section class="panel"><div class="form-grid">
 <div><label class="form-label">Как к тебе обращаться</label><input class="field" data-field="settings.name" maxlength="50" value="${esc(s.name)}"></div>
 <div><label class="form-label">Целевой вес, кг</label><input type="number" class="field" data-field="settings.targetWeight" min="30" max="250" step="0.1" value="${esc(s.targetWeight)}"></div>
 <div><label class="form-label">Ориентир калорий в день</label><input type="number" class="field" data-field="settings.calorieGoal" min="1000" max="7000" step="50" value="${esc(s.calorieGoal)}"></div>
 <div><label class="form-label">Дорожка, минут в день</label><input type="number" class="field" data-field="settings.treadmillGoal" min="0" max="300" step="5" value="${esc(s.treadmillGoal)}"></div></div>
 <div class="info-note">Твои текущие ориентиры: ${nf(s.calorieGoal,0)} ккал и ${nf(s.treadmillGoal,0)} минут. Оценка самочувствия важнее формального выполнения. При повышенном давлении или плохом самочувствии нагрузку лучше согласовать с врачом.</div></section>
 <div class="section-bar"><h2 class="section-title">Приложение и уведомления</h2></div>
 <section class="panel">
 ${toggleSetting('autoLaunch','Запускать вместе с Windows','FOCUS откроется при входе в Windows (в установленной версии).',s.autoLaunch)}
 ${toggleSetting('notifications','Системные напоминания','Утром, вечером и для еженедельных записей.',s.notifications)}
 ${toggleSetting('sound','Звук уведомлений','Мягкий фирменный трёхнотный сигнал.',s.sound)}
 <div class="setting"><div><strong>Вечернее напоминание</strong><p>Один ненавязчивый сигнал с просьбой отметить день.</p></div><div class="setting-control"><input class="field" data-field="settings.reminderTime" type="time" value="${esc(s.reminderTime)}"></div></div>
 <div class="setting"><div><strong>Еженедельный обзор</strong><p>Выбери день для замера и фото.</p></div><div class="setting-control"><select class="field" data-field="settings.weeklyReminderDay">${[['0','Воскресенье'],['1','Понедельник'],['2','Вторник'],['3','Среда'],['4','Четверг'],['5','Пятница'],['6','Суббота']].map(([n,label])=>`<option value="${n}" ${Number(s.weeklyReminderDay)===Number(n)?'selected':''}>${label}</option>`).join('')}</select><input class="field" style="margin-top:8px" data-field="settings.weeklyReminderTime" type="time" value="${esc(s.weeklyReminderTime)}"></div></div>
 <div class="setting"><div><strong>Проверка звука</strong><p>Послушать мелодию без отправки уведомления.</p></div><button class="button" data-action="test-chime">${svg('bell')} Воспроизвести</button></div>
 </section>
 ${updateControls()}
 <div class="section-bar"><h2 class="section-title">Данные и приватность</h2></div>
 <section class="panel"><div class="setting"><div><strong>Резервная копия</strong><p>Экспорт включает все записи и фотографии. Сохраняй копию в надёжном месте.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="button" data-action="backup-export">${svg('download')} Экспорт</button><button class="button" data-action="backup-import">${svg('upload')} Импорт</button></div></div><div class="setting"><div><strong>Где лежат твои данные</strong><p>${esc(dataLocation||'Локальное хранилище приложения Windows')}</p></div></div><div class="setting"><div><strong>Очистить данные</strong><p>Удалить записи и историю из приложения. Начальные цели будут восстановлены.</p></div><button class="button danger" data-action="reset-data">${svg('trash')} Сбросить</button></div></section>
 ${!isDesktop?`<div class="info-note">Ты открыл веб-предпросмотр. Для реального автозапуска Windows, системных уведомлений и отдельного хранения фотографий запускай версию Electron из проекта.</div>`:''}`}
function render(){document.title=`FOCUS — ${state.settings.name||'Stay Focused'}`;const contents={home:homeView,daily:dailyView,progress:progressView,photos:photoView,settings:settingsView};$('#app').innerHTML=`<div class="shell">${side()}<main class="main">${topBar()}${(contents[view]||homeView)()}<div class="footer-credit">FOCUS © 2026 · progress is personal</div></main></div>`}
function updateField(field,value){if(field.startsWith('daily.')){
 const prop=field.slice(6),data=getDaily();
 if(['calories','treadmill','sleep'].includes(prop))data[prop]=value===''?null:clamp(number(value),0,prop==='sleep'?24:20000);
 else data[prop]=value||null;
 }else if(field.startsWith('settings.')){
 const prop=field.slice(9);if(['calorieGoal','targetWeight','treadmillGoal','weeklyReminderDay'].includes(prop)){
  const valueNumber=Number(value);if(!Number.isFinite(valueNumber))return;
  const limits={calorieGoal:[1000,7000],targetWeight:[30,250],treadmillGoal:[0,300],weeklyReminderDay:[0,6]};state.settings[prop]=clamp(valueNumber,...limits[prop]);
 }else state.settings[prop]=String(value).slice(0,70);
 }else if(field==='compareA')compareA=value;else if(field==='compareB')compareB=value;
 scheduleSave();render()}
async function addPhoto(date,type){try{
 const result=await api.addPhoto();if(!result)return;
 let wk=state.weekly.find(x=>x.date===date);
 if(!wk){wk={date,weight:null,waist:null,notes:'',photos:[]};state.weekly.push(wk)}
 wk.photos=wk.photos||[];wk.photos.push({...result,type});
 await api.save(state);render();toast('Фотография добавлена в твой архив.');
}catch(e){toast(`Не удалось добавить фото: ${e.message}`)}}
async function handleAction(btn){const action=btn.dataset.action;
 if(action==='window-minimize'){await window.focusDesktop?.minimizeWindow();return}
 if(action==='window-maximize'){if(isDesktop)syncWindowState(await api.toggleMaximizeWindow());return}
 if(action==='window-close'){await window.focusDesktop?.closeWindow();return}
 if(action==='navigate'){view=btn.dataset.view||'home';render();window.scrollTo({top:0});return}
 if(action==='toggle'){const d=getDaily(),k=btn.dataset.key;d[k]=d[k]!==true;scheduleSave();render();return}
 if(action==='setting-toggle'){const k=btn.dataset.key;state.settings[k]=!state.settings[k];scheduleSave();render();toast(k==='autoLaunch'&&!isDesktop?'Автозапуск работает в версии Windows.':'Настройка сохранена.');return}
 if(action==='date-prev'||action==='date-next'){const d=fromIso(selectedDate);d.setDate(d.getDate()+(action==='date-prev'?-1:1));const s=iso(d);if(s<=iso()){selectedDate=s;render()}return}
 if(action==='go-date'){selectedDate=btn.dataset.date;render();window.scrollTo({top:0});return}
 if(action==='new-measure'){editWeekDate=iso();render();$('#w-date')?.focus();return}
 if(action==='edit-measure'){editWeekDate=btn.dataset.date;render();$('#w-date')?.focus();return}
 if(action==='photo-add'){const date=$('#photo-date')?.value||iso(),type=$('#photo-kind')?.value||'face';await addPhoto(date,type);return}
 if(action==='photo-add-week'){const date=$('#w-date')?.value||iso();await addPhoto(date,'face');return}
 if(action==='delete-photo'){
  if(!confirm('Удалить эту фотографию из архива?'))return;
  const wk=state.weekly.find(x=>x.date===btn.dataset.date),photo=wk?.photos?.find(p=>p.id===btn.dataset.id);
  if(!photo)return;wk.photos=wk.photos.filter(p=>p.id!==photo.id);
  if(isDesktop)await api.deletePhoto(photo.filename);
  await api.save(state);render();toast('Фотография удалена.');return
 }
 if(action==='update-check'||action==='update-download'||action==='update-install'){
  if(!isDesktop||updateStatus.phase==='unsupported'){toast('Обновления доступны в установленном FOCUS на Windows.');return}
  if(action==='update-install')await api.save(state);
  const actionCall={ 'update-check':()=>api.checkUpdate(), 'update-download':()=>api.downloadUpdate(), 'update-install':()=>api.installUpdate() };
  updateStatus=await actionCall[action]();
  if(view==='settings')render();
  return;
 }
 if(action==='test-chime'){playChime();return}
 if(action==='backup-export'){try{if(await api.exportBackup())toast('Резервная копия сохранена.')}catch(e){toast(e.message)}return}
 if(action==='backup-import'){
  if(!confirm('Импорт заменит текущие записи данными из резервной копии. Продолжить?'))return;
  try{if(await api.importBackup()){state=await api.load();render();toast('Резервная копия восстановлена.')}}catch(e){toast(e.message)}return;
 }
 if(action==='reset-data'){
  if(!confirm('Удалить все привычки, замеры и фотографии из приложения? Это действие нельзя отменить.'))return;
  state=await api.resetData();view='home';render();toast('Записи сброшены.');return;
 }
}
function playChime(){try{const audio=new Audio(window.__focusChimeDataUri||'assets/chime.ogg');audio.volume=0.45;audio.play().catch(()=>{});}catch{}}
document.addEventListener('click',async e=>{const btn=e.target.closest('[data-action]');if(!btn)return;if(btn.disabled)return;try{await handleAction(btn)}catch(err){toast(err?.message||'Что-то пошло не так')}});
document.addEventListener('change',e=>{const field=e.target.dataset.field;if(!field)return;updateField(field,e.target.value)});
document.addEventListener('submit',async e=>{
 if(e.target.id!=='weekly-form')return;e.preventDefault();
 const date=$('#w-date').value,weightInput=$('#w-weight').value,waistInput=$('#w-waist').value,notes=$('#w-notes').value;
 if(!date||date>iso()){toast('Укажи корректную дату.');return}
 const weight=weightInput===''?null:Number(weightInput),waist=waistInput===''?null:Number(waistInput);
 if(weight!==null&&(weight<20||weight>400)){toast('Проверь значение веса.');return}
 if(waist!==null&&(waist<30||waist>250)){toast('Проверь значение талии.');return}
 let wk=state.weekly.find(x=>x.date===date);
 if(!wk){wk={date,photos:[]};state.weekly.push(wk)}
 Object.assign(wk,{weight,waist,notes:notes.slice(0,3000)});
 editWeekDate=date;
 try{await api.save(state);render();toast('Замер сохранён. Спасибо, что уделил себе время.')}catch(err){toast(err.message)}
});
(async()=>{
 try{
  const loaded=await api.load();state={...defaultState(),...loaded,settings:{...defaultState().settings,...loaded.settings}};
  dataLocation=await api.dataLocation();
  updateStatus=await api.updateStatus();
  appReady=true;render();
  if(window.focusDesktop){
   api.onWindowState(({maximized})=>syncWindowState(maximized));
   syncWindowState(await api.isWindowMaximized());
   api.onChime(playChime);api.onImport(next=>{state=next;render()});
   api.onUpdateStatus(next=>{updateStatus=next;if(view==='settings')render()});
  }
 }catch(err){document.querySelector('#app').textContent=`Не удалось запустить FOCUS: ${err.message}`}
})();
