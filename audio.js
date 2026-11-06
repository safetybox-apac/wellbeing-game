// Local sound effects only. No background music or repeating audio scheduler.
const audio={
 ctx:null,effectBus:null,
 open(){try{if(!this.ctx){this.ctx=new(window.AudioContext||window.webkitAudioContext)();this.effectBus=this.ctx.createGain();this.effectBus.gain.value=.65;this.effectBus.connect(this.ctx.destination)}this.ctx.resume().catch(()=>{})}catch{}},
 note(midi,time,length,volume,type='triangle',bus=this.effectBus){
  if(!this.ctx||this.ctx.state!=='running')return;
  const osc=this.ctx.createOscillator(),env=this.ctx.createGain();osc.type=type;osc.frequency.value=440*Math.pow(2,(midi-69)/12);
  env.gain.setValueAtTime(0,time);env.gain.linearRampToValueAtTime(volume,time+.008);env.gain.exponentialRampToValueAtTime(.0001,time+length);
  osc.connect(env).connect(bus);osc.start(time);osc.stop(time+length+.02);osc.onended=()=>{osc.disconnect();env.disconnect()};
 },
 effect(type){
  if(!prefs.effects)return;this.open();if(!this.ctx||this.ctx.state!=='running')return;const t=this.ctx.currentTime;
  if(type==='finish'){[72,76,79,84].forEach((n,i)=>this.note(n,t+i*.1,.25,.07,'sine',this.effectBus));return}
  if(type==='trash'){this.note(48,t,.1,.065,'triangle',this.effectBus);this.note(40,t+.07,.12,.05,'triangle',this.effectBus);return}
  this.note(type==='tick'?76:79,t,.1,.055,'sine',this.effectBus);
 }
};
