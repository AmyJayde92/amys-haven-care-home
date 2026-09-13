
const app=document.getElementById("app");
const S={screen:"start",time:"7:00 AM",xp:320,coins:1250,safety:80,dignity:80,wellbeing:80,teamwork:80,reputation:80};

const R=[
 ["Mrs Thompson","Room 1","Dementia","Increased confusion overnight"],
 ["Mr Harris","Room 4","Parkinson’s","Settled well overnight"],
 ["Mrs Patel","Room 6","Type 2 diabetes","Blood glucose slightly raised"],
 ["Mr Wilson","Room 8","Post-stroke","Good night"],
 ["Mrs Carter","Room 10","Mobility support","1:1 for transfers"],
 ["Mr Lewis","Room 12","Dementia · high falls risk","Unsettled between 1–3am"],
 ["Mrs Green","Room 14","Pain / comfort","Increased pain overnight"],
 ["Mr Baker","Room 16","High falls risk","Near fall overnight"]
];

function svg(name,cls="icon"){
 const paths={
 home:'<path d="M3 11.5 12 4l9 7.5v8a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 19.5z"/>',
 people:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2.5 20c.4-4 2.4-6 5.5-6s5.1 2 5.5 6M10.5 20c.4-4 2.4-6 5.5-6s5.1 2 5.5 6"/>',
 tasks:'<path d="M7 4h10v3H7zM5 7h14v14H5z"/><path d="m8 13 2 2 4-5"/>',
 med:'<path d="M8 3h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8zm0 10h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z"/><path d="M12 3v8M12 13v8"/>',
 care:'<path d="M7 3h10v4H7zM5 7h14v14H5z"/><path d="M8 11h8M8 15h8"/>',
 chart:'<path d="M5 20V10h3v10zm6 0V4h3v16zm6 0v-7h3v7z"/>',
 shop:'<path d="M5 7h15l-2 9H8L5 7zM9 20h.01M17 20h.01M3 4h2l2 10"/>',
 heart:'<path d="M12 21s-7-4.7-9.2-9A5.2 5.2 0 0 1 12 6.4 5.2 5.2 0 0 1 21.2 12C19 16.3 12 21 12 21z"/>',
 shield:'<path d="M12 3 20 6v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6z"/>',
 bell:'<path d="M6 17h12l-1.5-2v-5a4.5 4.5 0 0 0-9 0v5L6 17z"/><path d="M10 20h4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
 };
 return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.home}</svg>`;
}
function logo(){
 return `<svg class="logo-mark" viewBox="0 0 120 90">
 <path d="M18 43 60 10l42 33" fill="none" stroke="#59306f" stroke-width="8" stroke-linecap="round"/>
 <path d="M83 16v22" stroke="#59306f" stroke-width="8" stroke-linecap="round"/>
 <path d="M60 33c-9-13-26-4-21 9 3 9 21 22 21 22s18-13 21-22c5-13-12-22-21-9z" fill="#d16a9e"/>
 <path d="M20 76c8-17 17-26 29-28-3 19 1 28 11 34" fill="none" stroke="#738a68" stroke-width="8" stroke-linecap="round"/>
 <path d="M100 76c-8-17-17-26-29-28 3 19-1 28-11 34" fill="none" stroke="#738a68" stroke-width="8" stroke-linecap="round"/>
 </svg>`;
}
function top(note="Same people. Different days. A brighter tomorrow."){
 return `<div class="top">
   <div class="profile"><div class="profile-name">Amy</div><div class="profile-role">Senior Carer</div><div class="profile-level">Level 5</div><div class="xp"><i style="width:${Math.min(100,S.xp/5)}%"></i></div><div class="xptext">${S.xp}/500 XP</div></div>
   <div class="brand">${logo()}<div class="brand-title">AMY'S HAVEN</div><div class="brand-sub">CARE HOME</div><div class="brand-motto">To care for those who once cared for us<br>is a high honor.</div></div>
   <div class="currency"><span class="pillcoin"><span class="dotcoin">★</span>${S.coins}</span><span class="pillcoin"><span class="heartcoin">♥</span>5</span></div>
   <div class="timebox"><div class="time-line">▣ Mon 14 Apr 2026</div><div class="time-main">${S.time}</div><div class="shift-mini">Day Shift · 7:00 AM–7:00 PM</div></div>
   <div class="header-note">${note}</div>
 </div>`;
}
function nav(active="Home"){
 const items=[["Home","home"],["Residents","people"],["Tasks","tasks"],["Medication","med"],["Care Plans","care"],["Progress","chart"],["Shop","shop"]];
 return `<div class="bottom">${items.map(([n,i])=>`<button class="navbtn ${n===active?"active":""}" onclick="go('${n}')">${svg(i,"navicon")}<span>${n}</span></button>`).join("")}</div>`;
}
function mount(body,active="Home",note){
 app.innerHTML=`<div class="app">${top(note)}<main class="content">${body}</main>${nav(active)}</div>`;
 window.scrollTo({top:0,behavior:"instant"});
}
function residentList(){
 return `<div class="gridlist">${R.map((r)=>`<div class="resident"><div class="avatar"></div><div><b>${r[0]} · ${r[1]}</b><small>${r[2]}<br>${r[3]}</small></div><div class="chev">›</div></div>`).join("")}</div>`;
}
function values(){
 return `<div class="values">
 <div class="value"><div class="i">${svg("heart")}</div><b>Care</b></div>
 <div class="value"><div class="i">${svg("people")}</div><b>Support</b></div>
 <div class="value"><div class="i">✦</div><b>Respect</b></div>
 <div class="value"><div class="i">⌁</div><b>Dignity</b></div>
 <div class="value"><div class="i">${svg("home")}</div><b>Community</b></div>
 </div>`;
}
function scorebar(){
 const x=[["Safety",S.safety,"shield"],["Dignity",S.dignity,"heart"],["Wellbeing",S.wellbeing,"people"],["Teamwork",S.teamwork,"people"],["Reputation",S.reputation,"chart"]];
 return `<div class="meterrow">${x.map(([n,v,i])=>`<div class="meter">${svg(i)}<b>${v}</b><span>${n}</span></div>`).join("")}</div>`;
}
function start(){
 S.screen="start";S.time="7:00 AM";
 mount(`
 <div class="screen-head"><div class="titlebar"><h2>Start Your Shift</h2></div><div class="subtle">Ready to make a difference today?</div>${values()}</div>
 <div class="two">
   <div class="kpi"><b>Today's Shift</b><p>7:00 AM – 7:00 PM<br>12 hour day shift</p></div>
   <div class="kpi"><b>Staff On Duty</b><p>6/7<br><span class="subtle">Amy · Senior Carer<br>Sarah · Manager<br>Lisa · Deputy</span></p></div>
 </div>
 <div class="card compact"><div class="section-title">Overnight Handover Notes</div><div class="note"><ul><li>Mrs Green had increased pain overnight.</li><li>Mr Lewis was unsettled between 1–3am.</li><li>Mr Baker had a near fall getting up to the toilet.</li></ul></div></div>
 <div class="card compact"><div class="section-title">Key Tasks This Morning</div><div class="subtle">□ Morning medication &nbsp; □ Personal care<br>□ Breakfast/fluid round &nbsp; □ Care notes</div></div>
 <button class="bigbtn" onclick="handover()">▶ Begin Handover</button>
 <div class="footer-quote">You've got this ♥</div>
 `,"Home","Care • Kindness • Respect • Dignity • Community");
}
function handover(){
 S.screen="handover";
 mount(`
 <div class="screen-head"><div class="tabs"><button class="tab on">Resident Handover</button><button class="tab">General Notes</button><button class="tab">Incidents</button><button class="tab">Night Tasks</button></div></div>
 <div class="card compact"><div class="titlebar"><h2>Your Residents Today (8)</h2><span class="badge">Sort by Room</span></div>${residentList()}</div>
 <div class="card compact"><div class="section-title">Key Concerns</div><div class="two"><div class="alert"><b>Mrs Thompson</b><div class="subtle">Increased confusion · poor sleep · reduced fluids</div></div><div class="success"><b>Actions Today</b><div class="subtle">Monitor mood · encourage fluids · reassure · report deterioration</div></div></div></div>
 <button class="bigbtn" onclick="dashboard()">Complete Handover → Start Your Shift</button>
 <div class="footer-quote">“Every resident has a story.”</div>
 `,"Residents","Good handover, safer care.");
}
function dashboard(){
 S.screen="dashboard";S.time="7:00 AM";
 mount(`
 <div class="screen-head"><div class="tabs"><button class="tab on">Dashboard</button><button class="tab">Residents</button><button class="tab">Tasks</button><button class="tab">Medication</button><button class="tab">Care Plans</button></div></div>
 <div class="two">
   <div class="card compact"><div class="section-title">Today's Priorities</div><div class="subtle">□ Morning medication round<br>□ Personal care (AM)<br>□ Breakfast service<br>□ Pain assessment – Mrs Green<br>□ Blood glucose – Mrs Patel</div></div>
   <div class="card compact"><div class="section-title">Live Notifications</div><div class="alert"><b>7:00 AM</b><br>Call bell – Room 12</div><div class="alert" style="margin-top:5px"><b>6:58 AM</b><br>Call bell – Room 6</div></div>
 </div>
 <div class="card compact"><div class="titlebar"><h3>Shift Time</h3><b>12:00:00 remaining</b></div><div class="progress"><i style="width:3%"></i></div></div>
 <div class="card compact"><div class="titlebar"><h3>Your Residents Today</h3><span class="badge">8 Residents</span></div>${residentList()}</div>
 <button class="bigbtn red" onclick="callbells()">Respond to Call Bells</button>
 `,"Home","Brighter days together ♥");
}
function callbells(){
 S.screen="callbells";
 mount(`
 <div class="screen-head alert"><div class="titlebar"><h2>${svg("bell")} Call Bells Ringing</h2></div><div class="subtle">Two residents are calling at the same time. Who would you like to respond to first?</div></div>
 <div class="call-grid">
  <div class="call-card"><div class="call-head">CALL BELL · 7:00 AM</div><div class="resident" style="border:0;padding:7px 0"><div class="avatar"></div><div><b>Mr Lewis · Room 12</b><small>High falls risk · Confusion</small></div></div><div class="quote">“I need some help…”</div><button class="bigbtn" onclick="lewis()">Respond to Mr Lewis</button><button class="choice" style="min-height:0;margin-top:6px;width:100%">Ask Another Carer</button></div>
  <div class="call-card"><div class="call-head">CALL BELL · 7:00 AM</div><div class="resident" style="border:0;padding:7px 0"><div class="avatar"></div><div><b>Mrs Patel · Room 6</b><small>Diabetes · Mobility support</small></div></div><div class="quote">“Can someone come please?”</div><button class="bigbtn" onclick="patel()">Respond to Mrs Patel</button><button class="choice" style="min-height:0;margin-top:6px;width:100%">Ask Another Carer</button></div>
 </div>
 <div class="card compact"><div class="section-title">Consider Before You Decide</div><div class="subtle">Who might be at greater risk? Can you safely delegate? How will your choice affect the rest of the morning?</div></div>
 ${scorebar()}
 `,"Home","Good care is about being there when it matters.");
}
function lewis(){
 S.time="7:04 AM";S.screen="lewis";
 mount(`
 <div class="screen-head"><div class="titlebar"><h2>Room 12 · Mr Lewis</h2><span class="badge">High Falls Risk</span></div>
 <div class="subtle"><b>Age:</b> 83 · Dementia, hypertension<br><b>Mobility:</b> walking frame (1:1 support)<br><b>Likes:</b> football, radio, tea<br><b>Communication:</b> calm, simple reassurance</div></div>
 <div class="card alert"><div class="quote" style="font-size:17px">“I need to get to work… I’m late. My boss will be cross!”</div></div>
 <div class="card compact"><div class="section-title">How would you like to respond?</div><div class="btn-row">
  <button class="choice good" onclick="lewisResult(true)"><strong>Reassure and Redirect</strong><small>Use a calm approach and familiar football conversation.</small></button>
  <button class="choice" onclick="lewisResult(false)"><strong>Tell Him the Truth</strong><small>Explain that he lives here and is retired.</small></button>
  <button class="choice warn" onclick="lewisResult(false)"><strong>Prevent Him Getting Up</strong><small>Physically stop him from leaving.</small></button>
  <button class="choice" onclick="lewisResult(true)"><strong>Call for Assistance</strong><small>Ask another staff member to support.</small></button>
 </div></div>
 ${scorebar()}
 `,"Residents","Familiar things bring comfort ♥");
}
function lewisResult(good){
 if(good){S.xp+=25;S.safety+=4;S.dignity+=3;S.wellbeing+=5;S.time="7:18 AM"}
 mount(`
 <div class="screen-head ${good?'success':'alert'}"><div class="titlebar"><h2>${good?'Great job!':'Try a calmer approach'}</h2></div><div class="subtle">${good?'You used a calm, person-centred approach. Mr Lewis feels safe and settled with a cup of tea and football conversation.':'Mr Lewis becomes more distressed. Reassurance and redirection would better meet his emotional needs.'}</div>${good?'<div style="font-size:20px;font-weight:800;margin-top:6px">+25 XP</div>':''}</div>
 <div class="card compact"><div class="section-title">Care Note – Mr Lewis</div><div class="note"><div class="subtle">7:00am — Mr Lewis was confused and believed he needed to go to work. Calm reassurance and familiar conversation used. Supported safely and settled well. Continue monitoring.</div></div></div>
 <div class="card alert"><div class="titlebar"><h3>URGENT · Room 6 – Mrs Patel</h3></div><div class="quote">“I need some help please…”</div><button class="bigbtn" onclick="patel()">Go to Mrs Patel Now</button></div>
 ${scorebar()}
 `,"Residents","A good cuppa and a bit of football… ♥");
}
function patel(){
 S.time="7:24 AM";S.screen="patel";
 mount(`
 <div class="screen-head"><div class="titlebar"><h2>Room 6 · Mrs Patel</h2><span class="badge">Mobility Support</span></div><div class="subtle"><b>Age:</b> 78 · Type 2 diabetes, osteoarthritis, hypertension<br><b>Mobility:</b> walking frame (1:1 support)<br><b>Communication:</b> English and Gujarati<br><b>Likes:</b> tea, traditional music, family</div></div>
 <div class="card alert"><div class="quote" style="font-size:16px">“I’m sorry to bother you… I really need the toilet. I don’t think I can wait much longer.”</div></div>
 <div class="card compact"><div class="section-title">What would you like to do?</div><div class="btn-row">
  <button class="choice good" onclick="patelResult()"><strong>Support to Toilet Now</strong><small>Use safe moving and handling and maintain dignity.</small></button>
  <button class="choice"><strong>Assess First</strong><small>Ask questions and check immediate concerns.</small></button>
  <button class="choice" onclick="patelResult()"><strong>Get Additional Support</strong><small>Ask another carer to assist safely.</small></button>
  <button class="choice warn"><strong>Encourage to Wait</strong><small>Ask her to wait while finishing another task.</small></button>
 </div></div>${scorebar()}
 `,"Residents","Dignity is giving people choice ♥");
}
function patelResult(){S.xp+=25;S.safety+=4;S.dignity+=5;S.time="7:35 AM";meds()}
function meds(){
 S.screen="meds";
 const rows=R.map((r,i)=>`<div class="med-row ${i<2?'done':'due'}"><div class="avatar"></div><div><b>${r[0]} · ${r[1]}</b><small>${i<2?'Recorded at '+(i===0?'7:32':'7:34')+' AM':'Medication due — check fictional MAR'}</small></div><button class="med-action" onclick="${i===2?'medRefusal()':'this.textContent=\'Recorded\';this.disabled=true'}">${i<2?'Given':'Give'}</button></div>`).join("");
 mount(`
 <div class="screen-head"><div class="titlebar"><h2>Morning Medication Round</h2><b>2/8</b></div><div class="progress"><i style="width:25%"></i></div><div class="subtle" style="margin-top:6px">Administer, record and monitor safely.</div></div>
 <div class="card compact"><div class="section-title">Medication Checks</div><div class="subtle">Check MAR · allergies · recent changes · right person · medication · dose · time · route/reason · record immediately.</div></div>
 ${rows}
 <div class="info"><div class="subtle"><b>Simulation safety:</b> this game does not prescribe real medication regimens. Follow the fictional MAR and workplace policy in each scenario.</div></div>
 `,"Medication","Safe medication supports wellbeing ♥");
}
function medRefusal(){
 mount(`<div class="screen-head alert"><div class="titlebar"><h2>Mrs Green refuses medication</h2></div><div class="subtle">She says she does not want to take it this morning.</div></div>
 <div class="card compact"><div class="btn-row"><button class="choice good" onclick="personal()"><strong>Ask why, assess, explain, respect refusal, document and escalate</strong></button><button class="choice warn"><strong>Hide it in breakfast</strong></button></div></div>
 <div class="info"><div class="subtle">Simulation only: medication decisions must follow the MAR, prescription, capacity/consent process and local policy.</div></div>`,"Medication","When in doubt, check.");
}
function personal(){
 S.time="7:50 AM";S.screen="personal";
 mount(`
 <div class="screen-head"><div class="titlebar"><h2>Personal Care</h2><b>2/8</b></div><div class="progress"><i style="width:25%"></i></div><div class="subtle" style="margin-top:6px">Support residents to feel clean, comfortable and confident.</div></div>
 ${R.map((r,i)=>`<div class="task ${i<2?'done':''}"><time>${i<2?(i===0?'7:15':'7:32'):'Later'}</time><div><b>${r[0]} · ${r[1]}</b><small>${i===0?'Shower · minimal assistance':i===1?'Toileting support · 1:1 assistance':'Personal care planned · respect preferences'}</small></div><span class="badge">${i<2?'Completed':'Start'}</span></div>`).join("")}
 <button class="bigbtn purple" style="margin-top:10px" onclick="careplan()">View Mrs Patel Care Plan</button>
 `,"Tasks","It's not just personal care… it's personal respect.");
}
function careplan(){
 S.time="8:00 AM";S.screen="careplan";
 mount(`
 <div class="screen-head"><div class="titlebar"><h2>Care Plan – Mrs Patel</h2></div><div class="tabs"><button class="tab on">Overview</button><button class="tab">Needs & Support</button><button class="tab">Health & Medical</button><button class="tab">Preferences</button><button class="tab">Risk Assessments</button></div></div>
 <div class="card compact"><div class="section-title">Key Information</div><div class="subtle">Age 78 · Room 6 · Type 2 diabetes · hypertension · osteoarthritis · walking frame (1:1 support) · at risk of falls · mild anxiety when rushed.</div></div>
 <div class="card success"><b>Main Goals</b><div class="subtle">Maintain independence and dignity · support blood glucose monitoring per care plan · reduce falls risk · feel safe, valued and involved.</div></div>
 <div class="two"><div class="card compact"><b>Daily Care Needs</b><div class="subtle">Personal care · toileting · meals/fluids · monitoring · pain management · emotional reassurance.</div></div><div class="card compact"><b>Communication</b><div class="subtle">English and Gujarati · calm reassuring approach · simple clear language · check understanding.</div></div></div>
 <button class="bigbtn" onclick="schedule()">Continue Shift</button>
 `,"Care Plans","Know the person, not just the condition ♥");
}
function schedule(){
 S.time="9:15 AM";S.screen="schedule";
 const tasks=[
 ["7:00 AM","Start Shift","Completed","done"],["7:15 AM","Personal Care – Mr Lewis","Completed","done"],
 ["7:30 AM","Personal Care – Mrs Patel","Completed","done"],["8:00 AM","Morning Medication Round","In Progress","live"],
 ["8:30 AM","Breakfast Service","Pending",""],["9:30 AM","Activities","Pending",""],["10:30 AM","Observations","Pending",""],
 ["12:00 PM","Lunch Service","Pending",""],["1:00 PM","Afternoon Medication Round","Pending",""],["2:00 PM","Group Activity","Pending",""],
 ["4:00 PM","Care Plan Reviews","Pending",""],["6:30 PM","Prepare Handover","Pending",""],["7:00 PM","End of Shift","Pending",""]
 ];
 mount(`<div class="screen-head"><div class="titlebar"><h2>Today's Schedule</h2><b>28%</b></div><div class="progress"><i style="width:28%"></i></div></div>
 <div class="schedule">${tasks.map(t=>`<div class="task ${t[3]}"><time>${t[0]}</time><div><b>${t[1]}</b><small>${t[2]}</small></div><span class="badge">${t[2]}</span></div>`).join("")}</div>
 <div class="footer-quote">It's not just a job… it's a privilege. ♥</div>`,"Tasks","Good care is a team effort.");
}
function residents(){
 mount(`<div class="screen-head"><div class="titlebar"><h2>Residents Overview</h2><span class="badge">8 Residents</span></div><div class="tabs"><button class="tab on">All Residents</button><button class="tab">Care Needs</button><button class="tab">Health Conditions</button><button class="tab">Room Order</button></div></div>
 <div class="card compact">${residentList()}</div>
 <div class="footer-quote">Small acts of care make a big difference ♥</div>`,"Residents","Every resident has a story.");
}
function go(x){
 if(x==="Home")dashboard();
 else if(x==="Residents")residents();
 else if(x==="Tasks")schedule();
 else if(x==="Medication")meds();
 else if(x==="Care Plans")careplan();
 else mount(`<div class="screen-head"><h2>${x}</h2><div class="subtle">This section is ready for the next game expansion.</div></div>`,x,"Amy's Haven Care Home");
}
start();
