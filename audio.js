// Original, locally synthesized music. No external audio files or requests.
const audio={
 ctx:null,timer:null,step:0,next:0,theme:null,musicBus:null,effectBus:null,noise:null,
 open(){try{
  if(!this.ctx){
   this.ctx=new(window.AudioContext||window.webkitAudioContext)();
   const master=this.ctx.createGain(),compressor=this.ctx.createDynamicsCompressor();master.gain.value=.65;
   this.musicBus=this.ctx.createGain();this.effectBus=this.ctx.createGain();
   this.musicBus.connect(compressor);this.effectBus.connect(compressor);compressor.connect(master).connect(this.ctx.destination);
   this.noise=this.ctx.createBuffer(1,this.ctx.sampleRate*.15,this.ctx.sampleRate);
   const values=this.noise.getChannelData(0);for(let i=0;i<values.length;i++)values[i]=Math.random()*2-1;
  }
  this.ctx.resume().then(()=>this.music()).catch(()=>{});
 }catch{}},
 note(midi,time,length,volume,type='triangle',bus=this.musicBus){
  if(!this.ctx||this.ctx.state!=='running')return;
  const osc=this.ctx.createOscillator(),env=this.ctx.createGain();osc.type=type;osc.frequency.value=440*Math.pow(2,(midi-69)/12);
  env.gain.setValueAtTime(0,time);env.gain.linearRampToValueAtTime(volume,time+.008);env.gain.exponentialRampToValueAtTime(.0001,time+length);
  osc.connect(env).connect(bus);osc.start(time);osc.stop(time+length+.02);osc.onended=()=>{osc.disconnect();env.disconnect()};
 },
 percussion(time,accent){
  const source=this.ctx.createBufferSource(),filter=this.ctx.createBiquadFilter(),env=this.ctx.createGain();source.buffer=this.noise;filter.type='highpass';filter.frequency.value=accent?1800:6500;
  env.gain.setValueAtTime(accent?.025:.009,time);env.gain.exponentialRampToValueAtTime(.0001,time+(accent?.09:.035));
  source.connect(filter).connect(env).connect(this.musicBus);source.start(time);source.stop(time+.12);source.onended=()=>{source.disconnect();filter.disconnect();env.disconnect()};
 },
 beat(i,t){
  const lively=this.theme==='game',bar=Math.floor(i/8)%4,beat=i%8;
  const chords=[[60,64,67],[57,60,64],[53,57,60],[55,59,62]],roots=[36,33,29,31];
  const melody=lively?[72,76,79,76,81,79,76,74,72,76,81,79,76,null,74,72,77,81,84,81,79,77,76,null,74,79,83,79,77,76,74,71]:[72,null,76,79,76,null,74,null,72,null,76,81,79,null,76,null,77,null,81,79,77,null,76,null,74,null,79,77,74,null,71,null];
  const pitch=melody[i%32];if(pitch!==null)this.note(pitch,t,.21,lively?.035:.026);
  if(beat%2===0)this.note(roots[bar]+(beat===6?12:0),t,.22,.065,'sine');
  if(beat===0||beat===4)chords[bar].forEach((n,k)=>this.note(n,t+k*.012,.4,.014));
  this.percussion(t,beat===2||beat===6);
 },
 music(){
  if(!this.ctx)return;
  const enabled=prefs.music&&!document.hidden&&this.ctx.state==='running';
  this.musicBus.gain.setValueAtTime(enabled?1:0,this.ctx.currentTime);
  if(!enabled){clearInterval(this.timer);this.timer=null;return}
  const nextTheme=screen==='game'?'game':'lobby';
  if(this.timer&&this.theme===nextTheme)return;
  clearInterval(this.timer);this.theme=nextTheme;this.step=0;this.next=this.ctx.currentTime+.04;
  const schedule=()=>{if(!prefs.music||document.hidden){this.music();return}const now=this.ctx.currentTime;if(this.next<now-.1)this.next=now+.02;while(this.next<now+.12){this.beat(this.step++,this.next);this.next+=60/(this.theme==='game'?116:104)/2}};
  schedule();this.timer=setInterval(schedule,40);
 },
 effect(type){
  if(!prefs.effects)return;this.open();if(!this.ctx||this.ctx.state!=='running')return;const t=this.ctx.currentTime;
  if(type==='finish'){[72,76,79,84].forEach((n,i)=>this.note(n,t+i*.1,.25,.07,'sine',this.effectBus));return}
  if(type==='trash'){this.note(48,t,.1,.065,'triangle',this.effectBus);this.note(40,t+.07,.12,.05,'triangle',this.effectBus);return}
  this.note(type==='tick'?76:79,t,.1,.055,'sine',this.effectBus);
 }
};
// Browsers require interaction before audible playback.
document.addEventListener('pointerdown',()=>audio.open(),{once:true});
document.addEventListener('keydown',()=>audio.open(),{once:true});
