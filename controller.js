// Player-controlled movement layer for Amy's Haven Care Home
(function(){
  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function setMessage(text){const el=document.getElementById('move-status');if(el)el.textContent=text;}
  function updatePlayer(){const p=document.getElementById('player');if(!p||!state.player)return;p.style.left=state.player.x+'%';p.style.bottom=state.player.y+'%';}
  function controls(label='Move Amy'){return `<section class="move-panel"><div class="move-title">${label}</div><div class="dpad"><span></span><button type="button" aria-label="Move up" onclick="movePlayer(0,8)">▲</button><span></span><button type="button" aria-label="Move left" onclick="movePlayer(-10,0)">◀</button><button type="button" class="interact" onclick="interactPlayer()">Interact</button><button type="button" aria-label="Move right" onclick="movePlayer(10,0)">▶</button><span></span><button type="button" aria-label="Move down" onclick="movePlayer(0,-8)">▼</button><span></span></div><p id="move-status" class="move-status">Use the controls to move Amy.</p><small class="move-help">You can also use the arrow keys and Enter.</small></section>`}

  window.movePlayer=function(dx,dy){
    if(!state.player)return;
    state.player.x=clamp(state.player.x+dx,7,88);
    state.player.y=clamp(state.player.y+dy,2,state.player.mode==='room'?58:52);
    updatePlayer();
    if(state.player.mode==='corridor'){
      if(state.player.y>36) setMessage('You are close to the bedroom doors. Choose a door and press Interact.');
      else setMessage('Walk up the corridor towards the bedroom doors.');
    }else{
      if(state.player.y>38&&state.player.x>28&&state.player.x<72) setMessage('You are close enough to speak with the resident. Press Interact.');
      else setMessage('Walk closer to the resident, then press Interact.');
    }
  };

  window.interactPlayer=function(){
    if(!state.player)return;
    if(state.player.mode==='corridor'){
      if(state.player.y<35){setMessage('Move closer to the doors first.');return;}
      const doors=state.player.doors||[];
      const idx=state.player.x<34?0:(state.player.x>67?2:1);
      const room=doors[idx];
      if(room!==state.player.targetRoom){setMessage(`This is Room ${room}. Your call bell is Room ${state.player.targetRoom}.`);return;}
      setMessage(`Room ${room} — ${state.activeBell}. Pressing the call bell interaction...`);
      const door=document.querySelectorAll('.door')[idx];
      if(door){door.classList.add('knock');setTimeout(()=>door.classList.remove('knock'),650);}
      setTimeout(()=>enterResidentRoom(),500);
    }else if(state.player.mode==='room'){
      if(!(state.player.y>38&&state.player.x>28&&state.player.x<72)){setMessage('Move closer to the resident first.');return;}
      showResidentActions();
    }
  };

  window.respondBell=function(name){
    const r=residents.find(x=>x.name===name);if(!r)return;
    state.activeBell=name;
    const left=r.room===1?2:r.room-1;
    const right=r.room===1?3:r.room+1;
    state.player={mode:'corridor',x:48,y:3,targetRoom:r.room,doors:[left,r.room,right]};
    shell(`<section class="card resident-brief">${portrait(r)}<div><h2>Call bell: ${r.name}</h2><p>Room ${r.room} · ${r.condition}</p></div></section>
    <section class="corridor game-corridor">
      <div class="hall-sign">Walk to Room ${r.room}</div>
      <div class="doors">${doorFor(left)}${doorFor(r.room,true)}${doorFor(right)}</div>
      <div class="walker player-controlled" id="player" style="left:${state.player.x}%;bottom:${state.player.y}%">${carerFigure()}</div>
      <div class="floor"></div>
    </section>
    ${controls('Control Amy')}`,'Home');
  };

  window.enterResidentRoom=function(){
    const r=residents.find(x=>x.name===state.activeBell);if(!r)return;
    state.player={mode:'room',x:14,y:3,targetRoom:r.room};
    shell(`<section class="room-scene lifelike-room playable-room">
      <img class="room-resident-photo" src="${r.photo}" alt="${r.name} in their room">
      <div class="room-shade"></div>
      <div class="room-label">Room ${r.room} · ${r.name}</div>
      <div class="speech">“Hello, can you help me please?”</div>
      <div class="walker player-controlled room-player" id="player" style="left:${state.player.x}%;bottom:${state.player.y}%">${carerFigure()}</div>
    </section>
    ${controls(`Walk over to ${r.name}`)}`,'Residents');
  };

  window.knockDoor=function(){enterResidentRoom();};

  window.showResidentActions=function(){
    const r=residents.find(x=>x.name===state.activeBell);if(!r)return;
    state.player=null;
    shell(`<section class="room-scene lifelike-room"><img class="room-resident-photo" src="${r.photo}" alt="${r.name} in their room"><div class="room-shade"></div><div class="room-label">Room ${r.room} · ${r.name}</div><div class="speech">“Thank you for coming over.”</div></section>
    <section class="card"><div class="resident-detail-head">${portrait(r)}<div><h2>${r.name}</h2><p>Age ${r.age} · Room ${r.room}</p></div></div><p>${r.condition}<br>${r.note}</p><div class="choice-grid"><button onclick="finishBell('reassure')">Reassure and ask what they need</button><button onclick="finishBell('assist')">Provide practical assistance</button><button onclick="finishBell('delegate')">Call another carer for support</button></div></section>`,'Residents');
  };

  document.addEventListener('keydown',function(e){
    if(!state.player)return;
    const tag=(e.target&&e.target.tagName)||'';if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT')return;
    if(e.key==='ArrowUp'){e.preventDefault();movePlayer(0,8);}
    else if(e.key==='ArrowDown'){e.preventDefault();movePlayer(0,-8);}
    else if(e.key==='ArrowLeft'){e.preventDefault();movePlayer(-10,0);}
    else if(e.key==='ArrowRight'){e.preventDefault();movePlayer(10,0);}
    else if(e.key==='Enter'){e.preventDefault();interactPlayer();}
  });
})();