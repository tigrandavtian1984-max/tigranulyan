/* Russian / English switch for both pages.
   Russian text lives in the HTML itself; elements marked data-i18n="key" get the English text below.
   data-i18n-aria="key" does the same for aria-label, data-count="N" writes "N фото" / "N photos". */
(function(){
const EN={
  'nav.about':'About','nav.works':'Work','nav.all':'All photos','nav.contacts':'Contact',
  'hero.eyebrow':'Photographer','hero.who':'Tigran',
  'hero.lead':'I’ve been taking pictures for as long as I can remember. Right now I’m looking for interesting projects and shoots, and I’m open to collaboration.',
  'hero.btn':'Get in touch','me.alt':'Tigran, portrait',
  'about.h':'About me',
  'about.p1':'I’ve been taking pictures for as long as I can remember: as a kid, my dad gave me the home cameras that were lying around unused, and until I was six I ran around with them shooting everything.',
  'about.p2':'Everything changed in London in the summer of 2025. Out of nowhere I became the photographer for two groups, and one day I asked why they always asked me. I still remember the answer:',
  'about.q':'“You just sense how to make the shot, and it always turns out beautiful.”',
  'about.p3':'Two months later I had a camera of my own.',
  'about.p4':'Now I’m looking for interesting projects and shoots, and I’m open to collaboration.',
  'works.h':'Work','more.h':'More work','more.sun':'See<br>all work','more.hint':'Tap to open all photos','more.aria':'Open all work',
  'collab.h':'Collaboration',
  'collab.p':'I’m open to working with interesting projects. We’ll discuss terms, dates and details personally: just message me on any of the contacts below.',
  'collab.btn':'To contacts',
  'contacts.h':'Contact','c.tg':'Message →','c.ig':'Open profile →','c.tt':'Watch videos →','c.mail.k':'Email','c.mail':'Send an email →','c.copied':'Address copied',
  'foot.copy':'© 2026 Tigran · tigranulyan','foot.photo':'Photos: Tigran','foot.write':'Get in touch →',
  'open':'Open photo',
  'gal.h':'All work','gal.back':'← Home',
  'type:Портрет':'Portrait','type:Спортивные мероприятия':'Sports events','type:Предметная съёмка':'Product photography',
  'type:Концертная съёмка':'Concert photography','type:Автомобильная съёмка':'Automotive photography',
  'type:Съёмка животных':'Animals','type:Съёмка помещений':'Interiors'
};
const RU={'c.copied':'Адрес скопирован','c.mail':'Написать письмо →','open':'Открыть фото'};
const RUS=/^(ru|uk|be|kk)/i;
function pick(){
  const q=new URLSearchParams(location.search).get('lang');if(q==='en'||q==='ru')return q;
  try{const s=localStorage.getItem('lang');if(s==='en'||s==='ru')return s}catch(_){}
  return RUS.test(navigator.language||'ru')?'ru':'en';
}
let lang=pick();
const T=k=>lang==='en'?(EN[k]??k):(RU[k]??(k.startsWith('type:')?k.slice(5):k));
function words(n){if(lang==='en')return n+(n===1?' photo':' photos');return n+' фото'}
function apply(root){
  root=root||document;
  document.documentElement.lang=lang;
  root.querySelectorAll('[data-i18n]').forEach(el=>{if(el.dataset.ru===undefined)el.dataset.ru=el.innerHTML;el.innerHTML=lang==='en'?(EN[el.dataset.i18n]??el.dataset.ru):el.dataset.ru});
  root.querySelectorAll('[data-i18n-aria]').forEach(el=>{if(el.dataset.ruAria===undefined)el.dataset.ruAria=el.getAttribute('aria-label')||'';el.setAttribute('aria-label',lang==='en'?(EN[el.dataset.i18nAria]??el.dataset.ruAria):el.dataset.ruAria)});
  root.querySelectorAll('[data-i18n-alt]').forEach(el=>{if(el.dataset.ruAlt===undefined)el.dataset.ruAlt=el.alt;el.alt=lang==='en'?(EN[el.dataset.i18nAlt]??el.dataset.ruAlt):el.dataset.ruAlt});
  root.querySelectorAll('[data-count]').forEach(el=>{el.textContent=words(+el.dataset.count)});
  document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===lang));
  document.querySelectorAll('.lang').forEach(g=>g.dataset.on=lang);
  if(document.body.dataset.titleRu===undefined)document.body.dataset.titleRu=document.title;
  document.title=lang==='en'?(document.body.dataset.titleEn||document.title):document.body.dataset.titleRu;
}
function set(l){lang=l;try{localStorage.setItem('lang',l)}catch(_){}apply();document.dispatchEvent(new CustomEvent('langchange',{detail:l}))}
document.addEventListener('click',e=>{const b=e.target.closest('.lang button');if(b)set(b.dataset.l)});
window.I18N={T,apply,set,words,get lang(){return lang}};
})();
