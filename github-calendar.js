(() => {
  const zone = 'America/Los_Angeles';
  const username = 'ArunimaAnand';
  const key = () => { const parts = new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()); const pick=t=>parts.find(p=>p.type===t).value; return `${pick('year')}-${pick('month')}-${pick('day')}`; };
  const api = year => `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`;
  const ns = 'http://www.w3.org/2000/svg';
  function node(tag, attrs, text) { const el=document.createElementNS(ns,tag); Object.entries(attrs||{}).forEach(([k,v])=>el.setAttribute(k,String(v))); if(text!==undefined)el.textContent=text;return el; }
  let lastDay='', lastFetch=0, running=false;
  function render(data,year,stamp,snapshot=false) {
    if(!Array.isArray(data.contributions)||!Number.isFinite(data.total?.[year]))throw new Error('Invalid contribution data');
    const today=key(); const entries = new Map(data.contributions.filter(d=>typeof d.date==='string'&&d.date.startsWith(year+'-')&&Number.isFinite(d.count)&&d.count>=0).map(d=>[d.date,d]));
    const start=Date.UTC(year,0,1), end=Date.UTC(year+1,0,1), days=Math.round((end-start)/86400000), offset=new Date(start).getUTCDay(), weeks=Math.ceil((days+offset)/7), step=14, left=33, top=28, width=left+weeks*step+12;
    const svg=node('svg',{viewBox:`0 0 ${width} 132`,role:'img','aria-label':`${data.total[year]} GitHub contributions in ${year}; January through December. Future dates are empty.`});
    svg.append(node('title',{},`${username}'s ${year} contribution calendar`));
    const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    months.forEach((month,m)=>{const day=Math.round((Date.UTC(year,m,1)-start)/86400000);svg.append(node('text',{x:left+Math.floor((day+offset)/7)*step,y:14,class:'calendar-label'},month));});
    ['Mon','Wed','Fri'].forEach((d,i)=>svg.append(node('text',{x:0,y:top+(i*2+1)*step+8,class:'calendar-label'},d)));
    for(let i=0;i<days;i++) {
      const date=new Date(start+i*86400000).toISOString().slice(0,10), future=date>today, record=entries.get(date);
      if(!future&&!record)throw new Error('Incomplete calendar');
      const level=future?0:Math.max(0,Math.min(4,Number(record.level)||0));
      const rect=node('rect',{x:left+Math.floor((i+offset)/7)*step,y:top+((i+offset)%7)*step,width:10.5,height:10.5,rx:2,class:future?'contribution-cell future':`contribution-cell level-${level}`});
      rect.append(node('title',{},future?`${date}: future date`:`${date}: ${record.count} contribution${record.count===1?'':'s'}`));svg.append(rect);
    }
    document.querySelector('#github-year-chart').replaceChildren(svg);
    document.querySelector('#github-total').textContent=`${new Intl.NumberFormat('en-US').format(data.total[year])} contributions in ${year}`;
    const dateLabel=new Intl.DateTimeFormat('en-US',{timeZone:zone,month:'short',day:'numeric',year:'numeric'}).format(new Date(stamp));
    document.querySelector('#github-updated').textContent=(snapshot?'Last verified ':'Updated ')+dateLabel;
    document.querySelector('#github-calendar-fallback').hidden=true;
    lastDay=today;lastFetch=Date.now();
  }
  async function load() {
    if(running)return;running=true;const year=Number(key().slice(0,4));
    try { const response=await fetch(api(year));if(!response.ok)throw new Error('Calendar unavailable');render(await response.json(),year,new Date().toISOString()); }
    catch { try {const r=await fetch('github-initial.json');if(!r.ok)throw new Error();const snap=await r.json();if(snap.year!==year)throw new Error();render(snap.data,year,snap.updatedAt,true);}catch{document.querySelector('#github-total').textContent='GitHub contributions';document.querySelector('#github-calendar-fallback').hidden=false;} }
    finally{running=false;}
  }
  load();
  setInterval(()=>{if(key()!==lastDay)load();},30000);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&(key()!==lastDay||Date.now()-lastFetch>3600000))load();});
})();
