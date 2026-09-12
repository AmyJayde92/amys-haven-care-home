const residents = [
  {name:"Mr Lewis", room:"12", note:"Dementia · walking frame", detail:"Likes Newcastle United, tea and football"},
  {name:"Mrs Patel", room:"6", note:"Type 2 diabetes · osteoarthritis", detail:"Values independence and calm support"},
  {name:"Mrs Green", room:"14", note:"Pain and comfort monitoring", detail:"Requires attentive observation"},
  {name:"Mr Harris", room:"4", note:"Parkinson's disease · diabetes", detail:"Likes animals and conversation"},
  {name:"Mrs Carter", room:"10", note:"Mobility support", detail:"Needs safe moving & handling"},
  {name:"Mr Wilson", room:"8", note:"Post-stroke support", detail:"Needs patient communication"},
  {name:"Mrs Thompson", room:"1", note:"Dementia support", detail:"Benefits from reassurance"},
  {name:"Mr Baker", room:"16", note:"High falls risk", detail:"Requires prompt risk-aware support"}
];

const initialStats = {xp:0,safety:80,dignity:80,wellbeing:80,teamwork:80,reputation:80};

const events = [
  {
    time:"07:05",
    title:"Two call bells at once",
    tag:"Prioritise",
    text:"Mr Lewis and Mrs Patel both ring their call bells. Mrs Patel says she urgently needs the toilet. Mr Lewis sounds confused and says he needs to get ready for work.",
    choices:[
      {text:"Attend Mrs Patel and ask a colleague to respond to Mr Lewis", score:{safety:3,dignity:3,teamwork:4,xp:20}, tone:"good", feedback:"Good prioritisation. You respond to the urgent toileting need while delegating Mr Lewis's call so neither resident is left unsupported.", residents:["Mrs Patel","Mr Lewis"]},
      {text:"Attend Mr Lewis first and leave Mrs Patel waiting", score:{dignity:-5,wellbeing:-3,safety:-1,xp:5}, tone:"warn", feedback:"Mrs Patel is left uncomfortable and distressed. Her need was more urgent.", residents:["Mr Lewis"]},
      {text:"Tell both residents to wait until the handover is finished", score:{safety:-7,dignity:-5,reputation:-3}, tone:"bad", feedback:"Unsafe delay. Call bells should be triaged and responded to promptly."}
    ]
  },
  {
    time:"07:15",
    title:"Mr Lewis believes he is late for work",
    tag:"Dementia care",
    text:"Mr Lewis is trying to stand without his frame. He says, “I’m late for work — I need to go.”",
    choices:[
      {text:"Reassure him, offer his frame, redirect to tea and Newcastle United football", score:{safety:4,wellbeing:5,dignity:3,xp:25}, tone:"good", feedback:"Mr Lewis settles with tea and football conversation. You support safety without arguing with him.", residents:["Mr Lewis"]},
      {text:"Tell him firmly that he is retired and must sit down", score:{wellbeing:-4,dignity:-2,xp:5}, tone:"warn", feedback:"He becomes more distressed. Correcting him directly did not meet his emotional need."},
      {text:"Physically stop him from standing without explaining", score:{dignity:-7,wellbeing:-5,reputation:-3}, tone:"bad", feedback:"This risks distress and loss of dignity. Use the least restrictive, person-centred response."}
    ]
  },
  {
    time:"07:30",
    title:"Mrs Patel needs urgent toileting support",
    tag:"Moving & handling",
    text:"Mrs Patel wants to remain as independent as possible but is unsteady with her frame this morning.",
    choices:[
      {text:"Get a colleague, explain each step and support her safely with the frame", score:{safety:5,dignity:5,teamwork:3,xp:25}, tone:"good", feedback:"Safe, dignified and person-centred. Mrs Patel is involved throughout.", residents:["Mrs Patel"]},
      {text:"Rush her because the medication round is due", score:{safety:-3,dignity:-5,wellbeing:-3}, tone:"bad", feedback:"Rushing increases falls risk and reduces dignity."},
      {text:"Tell her to wait until after medication round", score:{dignity:-4,wellbeing:-4,reputation:-2}, tone:"warn", feedback:"Her immediate toileting need should be prioritised."}
    ]
  },
  {
    time:"08:10",
    title:"Morning medication round",
    tag:"MAR",
    text:"Mrs Green refuses her tablets. You have checked the MAR and the prescription, but she says she does not want them.",
    choices:[
      {text:"Ask why, assess, explain, respect refusal, document and escalate according to policy", score:{safety:5,dignity:4,reputation:4,xp:30}, tone:"good", feedback:"Correct. Refusal is explored and respected, with documentation and appropriate escalation.", residents:["Mrs Green"]},
      {text:"Hide the medication in her breakfast so she takes it", score:{safety:-10,dignity:-10,reputation:-8}, tone:"bad", feedback:"Unsafe and inappropriate. Covert administration requires proper legal and clinical processes."},
      {text:"Leave it undocumented and try again later", score:{safety:-6,reputation:-5}, tone:"bad", feedback:"Medication refusal must be documented and managed according to policy."}
    ]
  },
  {
    time:"10:45",
    title:"Mr Baker has fallen",
    tag:"Emergency",
    text:"You find Mr Baker on the floor beside his chair. He is awake and speaking, but says his hip hurts.",
    choices:[
      {text:"Do not move him unnecessarily; assess, call for clinical help and follow falls procedure", score:{safety:7,teamwork:3,reputation:4,xp:35}, tone:"good", feedback:"Good response. You minimise further injury risk and escalate appropriately.", residents:["Mr Baker"]},
      {text:"Lift him straight back into the chair", score:{safety:-10,reputation:-6}, tone:"bad", feedback:"Moving him before assessment could worsen an injury."},
      {text:"Leave him there while you finish another task", score:{safety:-12,dignity:-6,reputation:-8}, tone:"bad", feedback:"A fall requires immediate attention and escalation."}
    ]
  },
  {
    time:"14:20",
    title:"Confidentiality challenge",
    tag:"Family",
    text:"A visitor asks you what medication another resident takes and why they have been seeing the nurse.",
    choices:[
      {text:"Politely explain you cannot share another resident's confidential information", score:{dignity:3,reputation:5,xp:20}, tone:"good", feedback:"Correct. You protect confidentiality while remaining professional."},
      {text:"Give a brief summary because they seem genuinely concerned", score:{reputation:-8,dignity:-5}, tone:"bad", feedback:"Confidential information must not be shared without proper authority."}
    ]
  },
  {
    time:"18:35",
    title:"End-of-shift handover",
    tag:"Documentation",
    text:"The evening team is arriving. There have been several significant events during the shift.",
    choices:[
      {text:"Complete records, update care notes and give a structured verbal handover", score:{safety:4,teamwork:5,reputation:5,xp:30}, tone:"good", feedback:"Excellent handover. Key risks, refusals, falls and follow-up actions are clearly communicated."},
      {text:"Leave quickly and assume the notes are enough", score:{teamwork:-5,safety:-3,reputation:-4}, tone:"warn", feedback:"Important context may be missed without a clear handover."}
    ]
  }
];

let state = {};
let eventIndex = 0;
let currentChoice = null;

const el = id => document.getElementById(id);

function clamp(v){ return Math.max(0, Math.min(100, v)); }

function resetGame(){
  state = {...initialStats};
  eventIndex = 0;
  currentChoice = null;
  el("log").innerHTML = "";
  renderResidents([]);
  updateStats();
  renderEvent();
}

function renderResidents(doneNames=[]){
  const grid = el("residentGrid");
  grid.innerHTML = "";
  residents.forEach(r=>{
    const card = document.createElement("div");
    card.className = "resident-card" + (doneNames.includes(r.name) ? " done" : "");
    card.dataset.name = r.name;
    card.innerHTML = `<h3>${r.name} · Room ${r.room}</h3>
      <p>${r.note}</p><p>${r.detail}</p>
      <div class="status">${doneNames.includes(r.name) ? "✓ Supported this shift" : "Awaiting care"}</div>`;
    grid.appendChild(card);
  });
}

function markResidents(names=[]){
  names.forEach(name=>{
    const card = [...document.querySelectorAll(".resident-card")].find(c=>c.dataset.name===name);
    if(card){
      card.classList.add("done");
      const s = card.querySelector(".status");
      if(s) s.textContent = "✓ Supported this shift";
    }
  });
}

function updateStats(){
  Object.keys(initialStats).forEach(k=>el(k).textContent = state[k]);
}

function renderEvent(){
  const ev = events[eventIndex];
  if(!ev){
    finishShift();
    return;
  }
  el("clock").textContent = ev.time;
  el("eventTitle").textContent = ev.title;
  el("eventTag").textContent = ev.tag;
  el("eventText").textContent = ev.text;
  el("feedback").className = "feedback hidden";
  const choices = el("choices");
  choices.innerHTML = "";
  ev.choices.forEach((c,i)=>{
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = c.text;
    btn.onclick = ()=>choose(i);
    choices.appendChild(btn);
  });
}

function choose(i){
  const ev = events[eventIndex];
  const c = ev.choices[i];
  currentChoice = c;

  document.querySelectorAll(".choice-btn").forEach(b=>b.disabled=true);
  Object.entries(c.score || {}).forEach(([k,v])=>{
    if(k==="xp") state[k] += v;
    else state[k] = clamp(state[k] + v);
  });
  updateStats();
  markResidents(c.residents || []);
  addLog(ev.time, `${ev.title}: ${c.feedback}`);

  el("feedbackTitle").textContent = c.tone==="good" ? "Good decision" : c.tone==="bad" ? "Risk identified" : "Could be improved";
  el("feedbackText").textContent = c.feedback;
  el("feedback").className = `feedback ${c.tone}`;
}

function addLog(time, text){
  const item = document.createElement("div");
  item.className = "log-entry";
  item.innerHTML = `<time>${time}</time>${text}`;
  el("log").prepend(item);
}

function finishShift(){
  el("clock").textContent = "19:00";
  el("eventTitle").textContent = "Shift complete";
  el("eventTag").textContent = "Finished";
  el("eventText").textContent = `You completed the 12-hour shift with ${state.xp} XP. Your final scores are shown above. Restart the shift to try different decisions and improve your care-home rating.`;
  el("choices").innerHTML = "";
  el("feedback").className = "feedback good";
  el("feedbackTitle").textContent = "End of shift";
  el("feedbackText").textContent = "Records completed. Evening team received handover. Well done, Senior Carer Amy.";
  el("continueBtn").style.display = "none";
  addLog("19:00", "Shift complete and handover finished.");
}

el("continueBtn").onclick = ()=>{
  eventIndex++;
  el("continueBtn").style.display = "inline-block";
  renderEvent();
};
el("restartBtn").onclick = ()=>{
  el("continueBtn").style.display = "inline-block";
  resetGame();
};

resetGame();
