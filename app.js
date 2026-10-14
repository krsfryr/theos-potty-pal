const DB='theo-potty-pal-v1', VERSION=2;
const TASKS=[['Offer calm potty opportunities','After waking, before outings, and before bed.'],['Give Theo a choice','Let him choose privacy, company, or how to get there.'],['Follow today’s poop stage','Offer practice without pressure or forcing.'],['Support comfortable sitting','Use a footstool and keep sits short.'],['Respond neutrally','No punishment, shame, or battles over accidents.'],['Notice the effort','Praise cooperation and listening to his body.']];
const STAGES=[['Feel comfortable in the bathroom','Visit together in daytime underwear. Explore the potty without requiring a sit.'],['Practice a comfortable sit','Offer a brief sit with underwear on if helpful. Use a stable seat and support his feet.'],['Try a ready-to-go sit','Invite a short sit with underwear down when he shows signs or after a meal. Stop if he is distressed.'],['Build a familiar routine','Support comfortable potty use, wiping, and handwashing. Accidents are still learning moments.']];
const OUTCOMES={pee:'Potty pee',poop:'Potty poop',diaper:'Diaper poop',accident:'Accident',attempt:'Potty practice',withholding:'Possible withholding'};
const STRATEGIES=[
{id:'bathroom',group:'Poop learning',title:'Bathroom first',why:'Build bathroom confidence within your daytime underwear routine.',say:'The potty is ready when you feel pee or poop coming. I can help.',do:'Keep daytime underwear on between potty visits. Invite him to explore the bathroom with you; help him lower underwear for a ready-to-go sit.',avoid:'Avoid chasing, forced sitting, or telling him to hold poop until his bedtime diaper.'},
{id:'diaperSit',group:'Poop learning',title:'Get comfortable sitting',why:'Small, manageable practice steps can make the potty feel more familiar.',say:'Would you like to practice sitting with your underwear on first?',do:'Offer a stable potty or seat reducer and footstool. Underwear-on practice is just for comfort; lower underwear when he is ready to pee or poop. End the practice if he is upset.',avoid:'Do not restrain him, insist on finishing, or promise that a bowel movement will not hurt.'},
{id:'relaxed',group:'Poop learning',title:'Relaxed after-meal sit',why:'A short opportunity after meals can coincide with the natural urge to poop.',say:'We can try a little potty sit after eating. Nothing has to come out.',do:'Invite a sit after a meal for a few minutes at most, with feet supported. Let him finish sooner if he wants to get up.',avoid:'Avoid timers used as threats, straining, or pressure.'},
{id:'choices',group:'Refusal',title:'Offer two choices',why:'Small choices support autonomy while keeping routines predictable.',say:'Would you like to walk to the bathroom or hop there?',do:'Offer one choice and pause. If he refuses, calmly try at the next natural opportunity.',avoid:'Avoid arguing or forcing him onto the toilet.'},
{id:'warning',group:'Refusal',title:'Transition warning',why:'Preparing for a break may reduce resistance when play is interrupted.',say:'In two minutes we can pause to try the potty, then come back to play.',do:'Give a brief warning before a natural transition.',avoid:'Avoid repeated countdowns and threats.'},
{id:'lessPrompt',group:'Refusal',title:'Reduce reminders',why:'Fewer prompts can lower conflict for children who already know how to pee.',say:'The potty is here when your body needs it.',do:'Offer breaks at waking, outings, and bedtime rather than constant checking.',avoid:'Avoid asking every few minutes.'},
{id:'neutral',group:'Accidents',title:'Neutral cleanup',why:'A calm response protects confidence and avoids shame.',say:'Your clothes got wet. Let’s get comfortable and try again next time.',do:'Help clean up matter-of-factly.',avoid:'Avoid blame or punishment.'},
{id:'stamps',group:'Motivation',title:'Stamp collector',why:'Visible progress can make a routine feel achievable without rewarding bodily output.',say:'You practiced our plan. Want to add a stamp to your delivery?',do:'Offer one stamp for a planned, comfortable participation opportunity, even if no pee or poop happens.',avoid:'Never remove stamps or reward withholding or repeated forced attempts.'}
];

// Phrase wording is authored for this family; the linked guidance supports the principles.
const PHRASES={
  "bathroom": [
    "Let's check in with your body. Does it feel like pee or poop is coming?",
    "You can tell me when you feel that potty feeling.",
    "I can come with you to the bathroom.",
    "Would you like to look at the potty together?",
    "Your underwear comes down when you're ready to use the potty.",
    "If you feel poop coming, let's head to the bathroom.",
    "We can pause playing, and your toys will be here when we come back.",
    "If your body says it's time, I'll help you get there.",
    "Let's make room for a bathroom break.",
    "You can ask for help with your clothes.",
    "Would you like to show me where your potty is?",
    "We can leave the door open while we're together.",
    "You can bring your book to the bathroom.",
    "We wear underwear during the day, and the potty is here for pee and poop.",
    "You don't have to wait for bedtime if you need to poop.",
    "Let's find the bathroom before we start playing here.",
    "You can come get me when you notice that feeling.",
    "I'll help with wiping when you're finished.",
    "Let's wash our hands together after your bathroom visit.",
    "Pee and poop are things everyone's body makes.",
    "You can say 'potty' or point, and I'll help.",
    "Let's make sure you can reach the potty easily.",
    "You don't have to do all the bathroom steps by yourself.",
    "We can visit this bathroom together before you use it.",
    "If you need the potty during our story, we can pause.",
    "Let's put your book somewhere you can reach it.",
    "I can show you how I wash my hands.",
    "You can tell me what would help you feel comfortable here.",
    "When you feel ready to go, we'll help your underwear out of the way."
  ],
  "diaperSit": [
    "Would you like the little potty or the toilet seat?",
    "Let's find a place for your feet to rest.",
    "You can hold my hand while you try.",
    "Would you like me beside you or a little farther away?",
    "We can look at one page together while you sit.",
    "You can get up when you're finished trying.",
    "When you're ready to go, I can help you pull your underwear down.",
    "Let's check that your seat feels steady.",
    "Would a hand to hold help you feel comfortable?",
    "Your feet can rest right here.",
    "You can tell me if the seat feels wobbly.",
    "We can try a little sit and then get up.",
    "You get to tell me when you've had enough practice.",
    "Would you like to sit down yourself or have a hand?",
    "I'll stay nearby while you get comfortable.",
    "It's okay to feel unsure about something new.",
    "We can leave flushing until you're off the seat.",
    "You can practice getting on and off with me.",
    "We can try again when you feel ready.",
    "We can start by standing beside the potty.",
    "Would you like to touch the seat before trying it?",
    "Let's make sure the footstool isn't sliding.",
    "You can put both feet on the stool while I stay here.",
    "The flush can wait until you're ready to hear it.",
    "That sound surprised you. I'm right here.",
    "We can practice just getting onto the seat today.",
    "You can say 'stop' if you want help getting down.",
    "Tell me where you'd like me to stand while I help.",
    "If sitting hurts, tell me. We'll stop and get help."
  ],
  "relaxed": [
    "We've finished eating. Would you like a short potty try?",
    "Let's rest your feet and get comfortable.",
    "You can let your tummy relax. No need to push hard.",
    "Would you like a quiet sit or a short story?",
    "If nothing comes out, we can try another time.",
    "Tell me when you're finished sitting.",
    "You tried listening to your body. Now let's wash our hands.",
    "After lunch, we can give the potty a short try.",
    "Would you like me to sit nearby while you try?",
    "Let's get your feet settled before we start.",
    "We can look at a picture while you relax.",
    "There's no hurry to make pee or poop come out.",
    "You can stop if you're uncomfortable.",
    "Your body's signals help us know when to try.",
    "We can try after breakfast and then get on with our day.",
    "You can tell me if something hurts.",
    "Let's take our time getting comfortable.",
    "When you're done trying, we can get dressed again.",
    "Nothing came out this time. Our short try is finished.",
    "Our meal is finished. The potty is ready for a short try.",
    "You can rest your hands on your knees while you sit.",
    "I'll read a few lines while you get settled.",
    "You don't have to squeeze or make poop happen.",
    "We can stop our short try and wash our hands now.",
    "Does your seat feel comfortable, or do you need help?",
    "Your feet have a place to rest, and I'm nearby.",
    "You can tell me 'all done' when you're finished trying.",
    "A little try is enough for now.",
    "If your tummy hurts, I want to know."
  ],
  "choices": [
    "Would you like the little potty or the toilet?",
    "Would you like to pull your underwear down yourself, or have my help?",
    "Do you want me close by or by the door?",
    "Would you like to carry a book or leave it here?",
    "Shall we go before this story or right after it?",
    "Would you like to hold my hand or walk beside me?",
    "Would you like to flush, or shall I do it after you get down?",
    "Would you like this book or that book while you try?",
    "Shall I help with your waistband, or would you like to start?",
    "Would you like to go with me or with your other grown-up?",
    "Would you like to open the bathroom door or shall I?",
    "Do you want to put your book on the stool or hold it?",
    "Would you like me to sing softly or be quiet?",
    "Would you like to try before we put on shoes or just after?",
    "Shall we walk slowly or take little steps?",
    "Would you like to choose the clean underwear?",
    "Do you want help getting on the seat or a hand to hold?",
    "Would you like to wash your hands with me beside you or watching?",
    "You can tell me which of those feels better.",
    "Would you like to turn on the bathroom light, or should I?",
    "Would you like the door open or partly closed while I'm here?",
    "Would you like to carry your book or have me carry it?",
    "Shall I hold your hand or help steady your seat?",
    "Would you like help with your trousers first or your underwear?",
    "Would you like to choose the soap or have me choose?",
    "Should I read this page or tell you a short story?",
    "Would you like to get down yourself with me nearby, or have help?",
    "Would you like to tell me with words or point to the potty?",
    "Neither choice feels right? Tell me what's bothering you."
  ],
  "warning": [
    "When this page is finished, we'll take a potty break.",
    "After we put these blocks down, let's check in with your body.",
    "We'll pause before going outside for a potty try.",
    "Your game can wait here while we take a bathroom break.",
    "One more turn, then it's time for our bathroom check.",
    "Before pajamas, we'll offer your body a potty try.",
    "We'll take a short break, then come back to what you were doing.",
    "When we finish this puzzle piece, let's take our break.",
    "After this song, we can visit the bathroom.",
    "We'll check in with your body before our car ride.",
    "Your blocks can stay just as they are.",
    "Let's save your place in the story for after our break.",
    "We're nearly ready to leave. A potty try comes before shoes.",
    "We can finish putting this toy away, then visit the bathroom.",
    "I'll help you pause and come back to your game.",
    "Before bath time, let's give the potty a try.",
    "After our snack, we'll have a little bathroom break.",
    "We'll check where the bathroom is when we arrive.",
    "Let's mark your page so we can come right back.",
    "I'll keep your drawing here while we take a short break.",
    "When we put this last piece away, we can visit the bathroom.",
    "A bathroom break can be part of getting ready for the park.",
    "We can pause the music while we visit the potty.",
    "Before we start our next game, let's offer a potty try.",
    "We'll visit the bathroom, wash hands, and come back together.",
    "The potty is available sooner if you feel the urge now.",
    "You don't need to wait until our planned break if you need to go.",
    "Stopping play feels hard. I'll help you save your place.",
    "We can tell your other grown-up where you paused."
  ],
  "lessPrompt": [
    "You can let me know when you need help with the potty.",
    "I'll be nearby when your body tells you it's time.",
    "You don't need to make anything come out.",
    "If that potty feeling comes, you can stop playing.",
    "I heard you say you don't need to go. Tell me if that changes.",
    "Let's check in before we leave the house.",
    "You noticed a feeling in your tummy. We can go check.",
    "You can get my attention when you need the bathroom.",
    "I trust you to tell me what you notice.",
    "I'll help when you ask.",
    "The bathroom is ready if you need it.",
    "You can take a break from your game when you feel the urge.",
    "You said you're finished trying. Let's get up.",
    "You can tell me even if some pee has already come out.",
    "If you notice a new feeling, we can figure it out together.",
    "We'll have our usual bathroom check before bed.",
    "You don't have to keep sitting to make something happen.",
    "I'm listening when you tell me about your body.",
    "You can ask for help, even in the middle of a game.",
    "You don't need an answer right now. I'm here if you need help.",
    "I heard you. We can leave it there for now.",
    "You can change your mind and ask for the potty.",
    "A body feeling can be hard to name. You can tell me about it.",
    "You can interrupt me when you need bathroom help.",
    "I'll come with you, even if we've just tried.",
    "You can ask for help before or after pee comes out.",
    "You don't have to show me a result.",
    "Our potty try is finished. Let's get back to playing.",
    "I'm here to help you learn, one step at a time."
  ],
  "neutral": [
    "Pee came out in your underwear. Let's get you dry.",
    "Poop came out in your underwear. I'll help you clean up.",
    "Accidents happen while you're learning.",
    "Thanks for telling me. Let's get some fresh clothes.",
    "You can help pick clean underwear while I get the wipes.",
    "You're not in trouble. We'll take care of this together.",
    "Next time you notice that feeling, you can tell me.",
    "Let's change those clothes so you feel comfortable.",
    "I'll help you wipe, then we'll wash our hands.",
    "We can put the wet clothes in the laundry together.",
    "You told me what happened. Thank you.",
    "It's okay to ask for help with cleanup.",
    "We have clean clothes ready.",
    "Pee goes in the potty. This time it came out here; let's clean up.",
    "You can stand here while I help with your clothes.",
    "We can clean up and then get back to your day.",
    "You don't have to hide an accident from me.",
    "Your body is still learning those signals.",
    "We'll take this one step at a time.",
    "This is something we can take care of.",
    "Let's find a comfortable place to get changed.",
    "You can feel disappointed. I'm here to help.",
    "An accident doesn't change how much I love you.",
    "We don't need to hurry or be upset with your body.",
    "I'll take care of the mess while you get comfortable.",
    "You can tell me about wet clothes anytime.",
    "If your skin feels sore, tell me so I can help.",
    "Your clean underwear is ready when you are.",
    "We can have a cuddle after you're clean, if you'd like."
  ],
  "stamps": [
    "You told me you needed help. That helped us get to the bathroom.",
    "You tried sitting with your feet supported.",
    "You noticed your body's signal and told me.",
    "You practiced pulling your underwear down.",
    "You washed your hands after your potty try.",
    "You stopped playing to check in with your body.",
    "Your practice is on the board. Shall we look at it together?",
    "You asked for help with your underwear.",
    "You told me you were finished trying.",
    "You helped find a comfortable place for your feet.",
    "You came to the bathroom when you noticed the feeling.",
    "You practiced a step that was new to you.",
    "You told me you felt unsure, and we worked together.",
    "You helped with washing your hands.",
    "You gave the potty a comfortable try.",
    "You let me know your clothes needed changing.",
    "You took a break and then went back to your game.",
    "That was our practice step for today.",
    "Would you like a high-five, or shall we just head back to play?",
    "You pointed to the potty so I knew you needed help.",
    "You told me the seat didn't feel steady. That helped me fix it.",
    "You helped pull your trousers back up.",
    "You reached for the soap and washed your hands.",
    "You let me know you needed some space.",
    "You told me something hurt. I'm glad you told me.",
    "You asked me to stay beside you while you tried.",
    "You learned where the bathroom is in a new place.",
    "You practiced our step. The stamp is yours even though nothing came out.",
    "Would you like to notice that step together, or go back to your game?"
  ]
};

// Daily examples vary; task positions retain their meaning for saved checklists.
const DAILY_GUIDANCE={
  "bathroom": [
    [
      "Visit the bathroom together at a natural break. Let Theo explore in his daytime underwear; help lower it if he is ready to use the potty.",
      "Keep the invitation brief. Do not chase, force a sit, or ask him to wait until his bedtime diaper to poop."
    ],
    [
      "Before an outing, find the bathroom together. Offer company and help with his waistband while keeping daytime underwear between visits.",
      "Bathroom confidence can grow without a successful sit. If he is holding stool or pooping hurts, ask his pediatrician for a plan."
    ]
  ],
  "diaperSit": [
    [
      "Check the seat is stable and his feet are supported. Offer underwear-on practice for comfort, then lower underwear for actual potty use.",
      "Keep the sit voluntary and end it if he is distressed. Do not promise that pooping cannot hurt."
    ],
    [
      "Let Theo practice getting on and off the potty with help. Offer a short sit with supported feet, lowering underwear when he is ready to go.",
      "Getting comfortable counts. Never hold him on the seat or turn staying seated into the goal."
    ]
  ],
  "relaxed": [
    [
      "After breakfast, offer one short potty sit with feet supported. A page of a book can keep you company; finish sooner if he wants to get up.",
      "A sit is an opportunity, not a requirement to produce poop. Avoid straining, threats, or extending it until something happens."
    ],
    [
      "Choose a calm moment after a meal. Help him settle his feet and let the sit last only a few comfortable minutes.",
      "Let him finish when he needs to. Pain or stool holding needs a conversation with his pediatrician, not longer or more frequent sits."
    ]
  ],
  "choices": [
    [
      "Offer two options you can accept, such as which potty or whether he wants a hand. Give him time to answer; try later if he refuses.",
      "Avoid adding more choices or repeating the question until he gives in. Do not force him onto the seat."
    ],
    [
      "Choose one small part Theo can lead, like carrying the book or lowering his underwear. Offer help without taking over.",
      "The choice is about how to practice, not a promise that he must pee or poop. Keep his option to stop a sit."
    ]
  ],
  "warning": [
    [
      "Choose a natural stopping point in play. Give one brief heads-up about a potty break and leave his activity ready to return to.",
      "Avoid repeated countdowns, bargaining, or threats to take the activity away."
    ],
    [
      "Before an outing or bedtime, name the next step calmly. Help save his place in play, then offer the bathroom break.",
      "A warning helps prepare for a transition; it is not a deadline to produce pee or poop. Avoid forcing a sit."
    ]
  ],
  "lessPrompt": [
    [
      "Use your usual bathroom opportunities at waking, outings, and bedtime. Between them, stay available when he signals or asks for help.",
      "Avoid constant checking or asking him to prove he needs to go. Respond promptly when he does ask."
    ],
    [
      "Make the potty easy to reach and clothes easy to lower. Offer help at familiar transitions, then give him room to notice his body.",
      "Fewer reminders does not mean ignoring discomfort. Pain or stool holding needs attention from his pediatrician."
    ]
  ],
  "neutral": [
    [
      "Help Theo get clean, dry, and back to his day. Offer one manageable cleanup step if he wants to help, such as choosing fresh underwear.",
      "Cleanup is care, not punishment. Avoid blame, disgust, comparisons, or making him earn clean clothes."
    ],
    [
      "Use a short, factual description of what happened. Help with wiping, fresh underwear, and handwashing without a lecture.",
      "Skip repeated questions about why it happened. If soiling is frequent or poop hurts, speak with his pediatrician."
    ]
  ],
  "stamps": [
    [
      "Choose one comfortable practice step to notice today. Name that effort specifically, and offer a stamp if he enjoys the board.",
      "Stamps are optional. Never remove them, require bodily output, or reward staying dry overnight."
    ],
    [
      "Notice a concrete effort such as asking for help or trying a relaxed sit. Offer warm praise; use the stamp board only if it feels fun.",
      "Do not turn the board into a bargain for staying seated, withholding, or repeated attempts. No lost stamps after an accident."
    ]
  ]
};
const RHYTHM_EXAMPLES=[
  [
    "Offer a bathroom check before leaving home.",
    "Try a calm opportunity after waking.",
    "Offer a short bathroom break before bedtime."
  ],
  [
    "Offer a choice of company or a little space.",
    "Let Theo choose which book to bring.",
    "Let Theo choose a hand to hold or help with clothes."
  ],
  [
    "",
    "",
    ""
  ],
  [
    "Check that his seat is steady and his feet have support.",
    "Have the footstool ready before inviting a sit.",
    "Let a short, comfortable try be enough."
  ],
  [
    "Keep fresh underwear nearby for a calm change.",
    "Use a simple, factual description during cleanup.",
    "Help with cleanup, then move on without a lecture."
  ],
  [
    "Notice him telling you about a body signal.",
    "Name one step he practiced, without asking for results.",
    "Notice an effort such as asking for help or washing hands."
  ]
];
function dailyIndex(date,count){
  const day=Math.floor(Date.parse(date+'T12:00:00Z')/86400000);
  return ((day%count)+count)%count;
}
function dailyGuidance(st,date=today){
  const options=[[st.do,st.avoid],...DAILY_GUIDANCE[st.id]];
  const [action,caution]=options[dailyIndex(date,options.length)];
  return {action,caution};
}
function dailyRhythm(date=today,stage=state.stage){
  return TASKS.map(([title],i)=>[title,i===2?STAGES[stage][1]:RHYTHM_EXAMPLES[i][dailyIndex(date,RHYTHM_EXAMPLES[i].length)]]);
}

function phraseOptions(st){return [st.say,...PHRASES[st.id]]}
const PHRASE_HOLD_MS=2*60*60*1000;
let favoritePhrases=[], favoritesBusy=false, updateCoachFavorites=null;
let selectedPhrases={}, phraseTimes={}, phraseControllers=new Map(), phraseRefreshTimer;
function phraseSelection(index,selectedAt,count,now=Date.now(),random=Math.random){
  const valid=Number.isInteger(index)&&index>=0&&index<count;
  if(valid&&Number.isFinite(selectedAt)&&selectedAt>0&&now-selectedAt<PHRASE_HOLD_MS)return {index,at:Math.min(selectedAt,now)};
  // Keep pre-existing saved positions when migrating to timed selections.
  if(valid&&!(Number.isFinite(selectedAt)&&selectedAt>0))return {index,at:now};
  const chosen=valid&&count>1?(index+1+Math.floor(random()*(count-1)))%count:Math.floor(random()*count);
  return {index:chosen,at:now};
}
function savePhraseState(){
  return new Promise((resolve,reject)=>{
    const transaction=db.transaction('settings','readwrite'),store=transaction.objectStore('settings');
    store.put({...selectedPhrases},'phrases');store.put({...phraseTimes},'phraseTimes');
    transaction.oncomplete=()=>resolve();
    transaction.onerror=()=>reject(transaction.error);
    transaction.onabort=()=>reject(transaction.error);
  });
}
function schedulePhraseRefresh(){
  clearTimeout(phraseRefreshTimer);
  if(document.hidden)return;
  const expires=Math.min(...STRATEGIES.map(st=>(phraseTimes[st.id]??Date.now())+PHRASE_HOLD_MS));
  phraseRefreshTimer=setTimeout(()=>refreshPhraseSelections().catch(()=>toast('Could not refresh phrase choices')),Math.max(1000,expires-Date.now()));
}
async function refreshPhraseSelections(now=Date.now()){
  let changed=false;
  STRATEGIES.forEach(st=>{
    const choice=phraseSelection(selectedPhrases[st.id],phraseTimes[st.id],phraseOptions(st).length,now);
    if(selectedPhrases[st.id]!==choice.index||phraseTimes[st.id]!==choice.at){
      selectedPhrases[st.id]=choice.index;phraseTimes[st.id]=choice.at;changed=true;
      phraseControllers.get(st.id)?.forEach(show=>show(choice.index));
    }
  });
  if(changed)await savePhraseState();
  schedulePhraseRefresh();
}
function phraseIndexAt(position,count){return (Math.max(0,Math.min(count+1,position))+count-1)%count}
function phraseKey(id,index){return id+':'+index}
function validFavorites(value){
  return Array.isArray(value)&&value.length<=STRATEGIES.reduce((total,st)=>total+phraseOptions(st).length,0)&&new Set(value).size===value.length&&value.every(key=>
    STRATEGIES.some(st=>phraseOptions(st).some((_,index)=>phraseKey(st.id,index)===key)));
}
function favoriteButton(id,index){
  const key=phraseKey(id,index), saved=favoritePhrases.includes(key), label=saved?'Remove favorite phrase':'Favorite this phrase';
  return `<button type="button" class="phrase-favorite" data-favorite="${key}" aria-pressed="${saved}" aria-label="${label}" title="${label}">${icon('heart')}</button>`;
}
function syncFavoriteButtons(){
  document.querySelectorAll('[data-favorite]').forEach(button=>{
    const saved=favoritePhrases.includes(button.dataset.favorite),label=saved?'Remove favorite phrase':'Favorite this phrase';
    button.setAttribute('aria-pressed',String(saved));button.setAttribute('aria-label',label);button.title=label;button.disabled=favoritesBusy;
  });
}
function bindFavoriteButtons(){
  document.querySelectorAll('[data-favorite]').forEach(button=>button.onclick=async()=>{
    if(favoritesBusy)return;
    const key=button.dataset.favorite, previous=[...favoritePhrases], adding=!previous.includes(key);
    favoritePhrases=adding?[...previous,key]:previous.filter(item=>item!==key);
    favoritesBusy=true;syncFavoriteButtons();
    try{
      await new Promise((resolve,reject)=>{
        const transaction=db.transaction('settings','readwrite');
        transaction.objectStore('settings').put([...favoritePhrases],'favoritePhrases');
        transaction.oncomplete=resolve;transaction.onerror=()=>reject(transaction.error);transaction.onabort=()=>reject(transaction.error);
      });
      if(adding)microAnimate(button,[{transform:'scale(.8)'},{transform:'scale(1.18)',offset:.6},{transform:'scale(1)'}],{duration:300});
      toast(adding?'Saved to Coach favorites':'Favorite removed');
    }catch{favoritePhrases=previous;toast('Could not save favorites. Please try again.')}
    finally{
      const restoreFocus=button===document.activeElement&&button.closest('#coachFavorites');
      const restoreTodayFocus=button===document.activeElement&&button.closest('#favoriteCarousel');
      favoritesBusy=false;syncFavoriteButtons();updateCoachFavorites?.();
      if(tab==='today'){if(todayPhraseMode==='favorites')refreshTodayPhrases();else document.querySelector('[data-phrase-mode="favorites"] span').textContent=favoritePhrases.length}
      if(restoreTodayFocus)($('#favoriteCarousel [data-favorite]')||$('[data-phrase-mode="favorites"]'))?.focus();
      if(restoreFocus)($('#coachFavorites [data-favorite]')||$('[data-coach-view="favorites"]'))?.focus();
    }
  });
}
const PHRASE_CONTEXT={bathroom:'Body signals',diaperSit:'Feeling unsure',relaxed:'After a meal',choices:'Making a choice',warning:'Pausing play',lessPrompt:'A little space',neutral:'After an accident',stamps:'Noticing effort'};
let todayPhraseMode='all', favoriteCursor=0;
function todayPhraseArea(){
  const st=STRATEGIES.find(s=>s.id===state.strategy)||STRATEGIES[0];
  return `<div class="phrase-mode" role="group" aria-label="Phrase collection"><button type="button" data-phrase-mode="all" aria-pressed="${todayPhraseMode==='all'}">Today's focus</button><button type="button" data-phrase-mode="favorites" aria-pressed="${todayPhraseMode==='favorites'}">${icon('heart')} Favorites <span>${favoritePhrases.length}</span></button></div>${todayPhraseMode==='all'?phrasePicker(st):favoriteCarousel()}`;
}
function favoriteCarousel(){
  const items=searchFavoritePhrases();
  if(!items.length)return '<div class="phrase-empty"><h3>No favorite phrases yet.</h3><button class="text-button" id="browseFavoriteCoach">Browse Coach phrases &#8594;</button></div>';
  favoriteCursor=Math.min(favoriteCursor,items.length-1);
  const selected=items[favoriteCursor],loop=[items.at(-1),...items,items[0]];
  return `<div class="script phrase-carousel" id="favoriteCarousel"><div class="phrase-label"><span class="mini">Words for this moment</span>${favoriteButton(selected.st.id,selected.index)}</div><div class="phrase-slides" tabindex="0" role="group" aria-label="Favorite coaching phrases" aria-live="polite">${loop.map((item,i)=>`<p class="phrase-slide ${i===favoriteCursor+1?'is-current':''}" aria-hidden="${i!==favoriteCursor+1}">“${esc(item.text)}”</p>`).join('')}</div><div class="phrase-context">${esc(PHRASE_CONTEXT[selected.st.id])} · ${esc(selected.st.title)}</div><div class="phrase-controls"><button class="phrase-arrow" data-step="-1" aria-label="Previous favorite phrase" title="Previous favorite phrase">&#8592;</button><span class="mini phrase-count">${favoriteCursor+1} / ${items.length}</span><button class="phrase-arrow" data-step="1" aria-label="Next favorite phrase" title="Next favorite phrase">&#8594;</button></div></div>`;
}
function refreshTodayPhrases(){
  const area=$('#todayPhrases');if(!area)return;
  area.innerHTML=todayPhraseArea();bindFavoriteButtons();bindPhraseCarousel();bindTodayPhrases();
}
function bindTodayPhrases(){
  document.querySelectorAll('[data-phrase-mode]').forEach(button=>button.onclick=()=>{
    todayPhraseMode=button.dataset.phraseMode;refreshTodayPhrases();
    document.querySelector('[data-phrase-mode="'+todayPhraseMode+'"]')?.focus();
  });
  $('#browseFavoriteCoach')?.addEventListener('click',()=>{coachFilters.view='strategies';tab='coach';render();scrollTo(0,0)});
  const carousel=$('#favoriteCarousel');if(!carousel)return;
  const items=searchFavoritePhrases(),surface=carousel.querySelector('.phrase-slides'),slides=[...surface.children],count=items.length;
  let settle, width=surface.clientWidth;
  function show(index,behavior='instant',position=index+1){
    clearTimeout(settle);favoriteCursor=index;
    const item=items[index];
    slides.forEach((slide,i)=>{slide.classList.toggle('is-current',i===index+1);slide.setAttribute('aria-hidden',String(i!==index+1))});
    carousel.querySelector('.phrase-count').textContent=(index+1)+' / '+count;
    carousel.querySelector('.phrase-context').textContent=PHRASE_CONTEXT[item.st.id]+' · '+item.st.title;
    carousel.querySelector('[data-favorite]').dataset.favorite=item.key;syncFavoriteButtons();
    if(surface.clientWidth)surface.scrollTo({left:position*surface.clientWidth,behavior});
  }
  function step(direction){
    const position=favoriteCursor===0&&direction<0?0:favoriteCursor===count-1&&direction>0?count+1:undefined;
    show((favoriteCursor+direction+count)%count,matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',position);
  }
  carousel.querySelectorAll('[data-step]').forEach(button=>{button.disabled=count===1;button.onclick=()=>step(Number(button.dataset.step))});
  surface.onkeydown=e=>{
    if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();if(e.key==='Home'||e.key==='End')show(e.key==='Home'?0:count-1);else step(e.key==='ArrowLeft'?-1:1)}
  };
  show(favoriteCursor);
  surface.onscroll=()=>{clearTimeout(settle);settle=setTimeout(()=>{if(surface.isConnected&&surface.clientWidth)show(phraseIndexAt(Math.round(surface.scrollLeft/surface.clientWidth),count))},120)};
  const resize=new ResizeObserver(()=>{if(!surface.isConnected){resize.disconnect();return}if(width!==surface.clientWidth){width=surface.clientWidth;show(favoriteCursor)}});resize.observe(surface);
}
function phrasePicker(st){
  const phrases=phraseOptions(st), selected=selectedPhrases[st.id]??0;
  const loop=[phrases[phrases.length-1],...phrases,phrases[0]];
  return `<div class="script phrase-carousel" data-carousel="${st.id}"><div class="phrase-label"><span class="mini">Words for this moment</span>${favoriteButton(st.id,selected)}</div><div class="phrase-slides" tabindex="0" role="group" aria-label="Coaching phrases" aria-live="polite">${loop.map((phrase,position)=>`<p class="phrase-slide ${position===selected+1?'is-current':''}" aria-hidden="${position!==selected+1}">“${esc(phrase)}”</p>`).join('')}</div><div class="phrase-context">${esc(PHRASE_CONTEXT[st.id])}</div><div class="phrase-controls"><button class="phrase-arrow" data-step="-1" aria-label="Previous phrase" title="Previous phrase">&#8592;</button><span class="mini phrase-count">${selected+1} / ${phrases.length}</span><button class="phrase-arrow" data-step="1" aria-label="Next phrase" title="Next phrase">&#8594;</button></div></div>`;
}
function bindPhraseCarousel(){
  const controllers=phraseControllers=new Map();
  document.querySelectorAll('[data-carousel]').forEach(carousel=>{
    const id=carousel.dataset.carousel, slides=[...carousel.querySelectorAll('.phrase-slide')], count=slides.length-2, surface=carousel.querySelector('.phrase-slides');
    let settle;
    function show(index,behavior='instant',position=index+1){
      if(!surface.isConnected)return;
      clearTimeout(settle);
      slides.forEach((slide,i)=>{slide.classList.toggle('is-current',i===index+1);slide.setAttribute('aria-hidden',String(i!==index+1))});
      carousel.querySelector('.phrase-count').textContent=(index+1)+' / '+count;
      carousel.querySelector('[data-favorite]').dataset.favorite=phraseKey(id,index);syncFavoriteButtons();
      if(surface.clientWidth)surface.scrollTo({left:position*surface.clientWidth,behavior});
    }
    if(!controllers.has(id))controllers.set(id,[]);
    controllers.get(id).push(show);
    function choose(index,behavior='instant',position){
      const changed=selectedPhrases[id]!==index;
      selectedPhrases[id]=index;
      controllers.get(id).forEach(update=>update(index,update===show?behavior:'instant',update===show?position:undefined));
      if(changed){
        phraseTimes[id]=Date.now();
        savePhraseState().catch(()=>toast('Could not save phrase choice'));
        schedulePhraseRefresh();
      }
    }
    function step(direction){
      const current=selectedPhrases[id]??0, index=(current+direction+count)%count;
      const position=current===0&&direction<0?0:current===count-1&&direction>0?count+1:undefined;
      choose(index,matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',position);
    }
    carousel.querySelectorAll('[data-step]').forEach(button=>button.onclick=()=>step(Number(button.dataset.step)));
    surface.onkeydown=e=>{
      if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowLeft'?-1:1)}
      else if(e.key==='Home'||e.key==='End'){e.preventDefault();choose(e.key==='Home'?0:count-1)}
    };
    // Duplicate end slides allow native touch scrolling to loop without a visible jump.
    show(selectedPhrases[id]??0);
    surface.onscroll=()=>{
      clearTimeout(settle);
      settle=setTimeout(()=>{
        if(!surface.isConnected||!surface.clientWidth)return;
        choose(phraseIndexAt(Math.round(surface.scrollLeft/surface.clientWidth),count));
      },120);
    };
    let width=surface.clientWidth;
    const resize=new ResizeObserver(()=>{
      if(!surface.isConnected){resize.disconnect();return}
      if(width===surface.clientWidth)return;
      width=surface.clientWidth;show(selectedPhrases[id]??0);
    });
    resize.observe(surface);
  });
}
function coachingNotes(){return `<details class="coaching-notes"><summary>Why this approach?</summary><p>Small choices give Theo a say. Predictable routines and supported feet make practice more comfortable. Notice specific efforts and respond to accidents calmly.</p><p>Choose one phrase that fits the moment, then pause and listen. These are suggested words, not tested scripts or a guarantee. Stamps are optional; warm, specific praise can be enough. Do not make a reward depend on producing pee or poop or staying dry overnight.</p><p>Daytime underwear and a bedtime diaper fit your family's routine. If Theo is holding stool or pooping hurts, contact his pediatrician for a plan rather than pressing on with training.</p><p>Parent guidance: <a href="https://www.healthychildren.org/English/ages-stages/toddler/toilet-training/Pages/Praise-and-Reward-Your-Childs-Success.aspx" target="_blank" rel="noopener noreferrer">American Academy of Pediatrics</a> · <a href="https://caringforkids.cps.ca/handouts/behavior-and-development/toilet_learning" target="_blank" rel="noopener noreferrer">Canadian Paediatric Society</a>. Reviewed October 14, 2026.</p></details>`}
function validPhrases(value){return value&&typeof value==='object'&&!Array.isArray(value)&&Object.entries(value).every(([id,index])=>STRATEGIES.some(s=>s.id===id&&Number.isInteger(index)&&index>=0&&index<phraseOptions(s).length))}

const REWARDS=[['stamps','Mail delivery','Collect five stamps to deliver a letter.'],['builder','Little builder','Add five pieces to a pretend machine.'],['garden','Growing garden','Add five leaves or flowers to a garden.'],['trail','Adventure trail','Take five steps toward a destination.']];
let db, tab='today', today=new Date().toLocaleDateString('en-CA'), state={stage:0,checks:[],logs:[],strategy:'bathroom',custom:['bathroom'],reward:'stamps',stamps:[],reviews:[]};
const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function openDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,VERSION);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('settings'))d.createObjectStore('settings');if(!d.objectStoreNames.contains('logs'))d.createObjectStore('logs',{keyPath:'id'});if(!d.objectStoreNames.contains('checklists'))d.createObjectStore('checklists',{keyPath:'date'});if(!d.objectStoreNames.contains('stamps'))d.createObjectStore('stamps',{keyPath:'id'});if(!d.objectStoreNames.contains('reviews'))d.createObjectStore('reviews',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function op(store,mode,fn){return new Promise((resolve,reject)=>{const t=db.transaction(store,mode),s=t.objectStore(store);let req=fn(s);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
const get=(s,k)=>op(s,'readonly',x=>x.get(k)), all=s=>op(s,'readonly',x=>x.getAll()), put=(s,v,k)=>op(s,'readwrite',x=>k===undefined?x.put(v):x.put(v,k)), del=(s,k)=>op(s,'readwrite',x=>x.delete(k));
async function load(){await loadAppearance();const favorites=await get('settings','favoritePhrases');favoritePhrases=validFavorites(favorites)?favorites:[];const savedPhrases=await get('settings','phrases');selectedPhrases=validPhrases(savedPhrases)?savedPhrases:{};const savedTimes=await get('settings','phraseTimes');phraseTimes=savedTimes&&typeof savedTimes==='object'&&!Array.isArray(savedTimes)?savedTimes:{};await refreshPhraseSelections();state.stage=(await get('settings','stage'))??0;state.checks=(await get('checklists',today))?.checks??[];state.logs=(await all('logs')).sort((a,b)=>b.created.localeCompare(a.created));state.strategy=(await get('settings','strategy'))??'bathroom';state.custom=(await get('settings','custom'))??['bathroom'];state.reward=(await get('settings','reward'))??'stamps';state.stamps=await all('stamps');state.reviews=(await all('reviews')).sort((a,b)=>b.created.localeCompare(a.created));render()}


function validAppearance(value){return ['system','light','dark'].includes(value)}
async function loadAppearance(){
  let cached;
  try{cached=localStorage.getItem('potty-pal-appearance')}catch{}
  const stored=await get('settings','appearance');
  const preference=validAppearance(cached)?cached:validAppearance(stored)?stored:themePreference;
  applyAppearance(preference,false);
  try{localStorage.setItem('potty-pal-appearance',preference)}catch{}
  if(stored!==preference)await put('settings',preference,'appearance');
}

const appearanceQuery=matchMedia('(prefers-color-scheme: dark)');
let themePreference='system';
try{const saved=localStorage.getItem('potty-pal-appearance');if(['system','light','dark'].includes(saved))themePreference=saved}catch{}
function applyAppearance(preference,persist=true){
  themePreference=['system','light','dark'].includes(preference)?preference:'system';
  const dark=themePreference==='dark'||(themePreference==='system'&&appearanceQuery.matches);
  document.documentElement.dataset.theme=dark?'dark':'light';
  document.documentElement.style.colorScheme=dark?'dark':'light';
  document.querySelector('link[rel="icon"]')?.setAttribute('href',dark?'./icons/icon-dark.svg?v=2.13.0':'./icons/icon.svg?v=2.13.0');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',getComputedStyle(document.documentElement).getPropertyValue('--browser-theme').trim());
  if(persist){
    try{localStorage.setItem('potty-pal-appearance',themePreference)}catch{}
    if(db)put('settings',themePreference,'appearance').catch(()=>toast('Could not save appearance preference'));
  }
  document.querySelectorAll('[name="appearance"]').forEach(input=>{input.checked=input.value===themePreference});
  const toggle=$('#themeToggle');
  if(toggle){toggle.innerHTML=icon(dark?'sun':'moon');toggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');toggle.title=dark?'Switch to light mode':'Switch to dark mode'}
}
function appearanceSettings(){
  return `${section('Appearance')}<fieldset class="appearance-options"><legend class="sr-only">Color theme</legend>${[['system','System'],['light','Light'],['dark','Dark']].map(([id,label])=>`<label><input type="radio" name="appearance" value="${id}" ${themePreference===id?'checked':''}/><span>${label}</span></label>`).join('')}</fieldset>`;
}
function bindAppearance(){
  $('#themeToggle')?.addEventListener('click',()=>applyAppearance(document.documentElement.dataset.theme==='dark'?'light':'dark'));
  document.querySelectorAll('[name="appearance"]').forEach(input=>input.onchange=()=>applyAppearance(input.value));
  applyAppearance(themePreference,false);
}
let stampSaving=false;
async function addRewardStamp(){
  if(stampSaving)return;
  stampSaving=true;
  document.querySelectorAll('#addStamp,#stampTool').forEach(button=>button.disabled=true);
  try{
    const created=new Date().toISOString();
    await put('stamps',{id:crypto.randomUUID(),created,updatedAt:created,syncStatus:'pending'});
    await load();celebrateStamp();
    toast(state.stamps.length%5===0?'Five stamps! Time to celebrate together.':'Stamp added');
  }catch{toast('Could not save this stamp. Please try again.')}
  finally{stampSaving=false;document.querySelectorAll('#addStamp,#stampTool').forEach(button=>button.disabled=false)}
}
function bindStampTool(){
  const tool=$('#stampTool'), track=document.querySelector('.reward-preview .stamp-track');
  if(!tool||!track)return;
  let drag=null, ghost=null, target=null, ignoreClickUntil=0;
  function clearDrag(){
    ghost?.remove();ghost=null;target?.classList.remove('stamp-drop-target');target=null;
    tool.classList.remove('is-dragging');track.classList.remove('is-drop-ready');drag=null;
  }
  tool.onclick=e=>{if(Date.now()<ignoreClickUntil){e.preventDefault();return}addRewardStamp()};
  tool.ondragstart=e=>e.preventDefault();
  tool.onpointerdown=e=>{
    if(!e.isPrimary||e.button!==0||stampSaving)return;
    drag={x:e.clientX,y:e.clientY,id:e.pointerId,moved:false};tool.setPointerCapture(e.pointerId);
  };
  tool.onpointermove=e=>{
    if(!drag||drag.id!==e.pointerId)return;
    if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<6)return;
    if(!drag.moved){
      drag.moved=true;tool.classList.add('is-dragging');track.classList.add('is-drop-ready');
      ghost=tool.cloneNode(true);ghost.removeAttribute('id');ghost.className='reward-seal stamp-ghost';ghost.setAttribute('aria-hidden','true');ghost.tabIndex=-1;document.body.appendChild(ghost);
    }
    ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';target?.classList.remove('stamp-drop-target');
    const hit=document.elementFromPoint(e.clientX,e.clientY)?.closest('.stamp:not(.filled)');
    target=hit&&track.contains(hit)?hit:null;target?.classList.add('stamp-drop-target');
  };
  tool.onpointerup=e=>{
    if(!drag||drag.id!==e.pointerId)return;
    const moved=drag.moved, valid=Boolean(target);
    if(moved)ignoreClickUntil=Date.now()+400;
    clearDrag();
    if(tool.hasPointerCapture(e.pointerId))tool.releasePointerCapture(e.pointerId);
    if(moved&&valid)addRewardStamp();
  };
  tool.onpointercancel=()=>{ignoreClickUntil=Date.now()+400;clearDrag()};
  tool.onlostpointercapture=()=>{if(drag)clearDrag()};
}

function icon(name){const paths={heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',moon:'<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',today:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 12 3 3 5-6"/>',coach:'<path d="M4 5h16v12H8l-4 4V5z"/><path d="M8 10h8M8 14h5"/>',rewards:'<path d="M5 4h14v16H5zM9 9h6M9 13h6"/>',training:'<path d="M5 20h14M7 16h10M9 12h6M11 8h2"/>',history:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',insights:'<path d="M4 20V12M10 20V4M16 20v-9M22 20V7"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`}
const viewPositions=new Map();
let quickDraft=null, reflectionDraft='';
function rememberDrafts(){
  if($('#quickNoteForm')&&!$('#quickNoteForm').hidden)quickDraft={id:quickSavedId,note:$('#quickNote').value,mood:$('#quickMood').value};
  if($('#weeklyNote'))reflectionDraft=$('#weeklyNote').value;
}
function restoreDrafts(){
  if($('#weeklyNote'))$('#weeklyNote').value=reflectionDraft;
  if(quickDraft?.id===quickSavedId&&$('#quickNoteForm')){
    $('#quickNoteForm').hidden=false;$('#quickNote').value=quickDraft.note;$('#quickMood').value=quickDraft.mood;
  }
}
function navigateView(next){
  if(next===tab){scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return}
  rememberDrafts();viewPositions.set(tab,scrollY);tab=next;render();
  scrollTo(0,viewPositions.get(next)||0);
}
function brandMark(){return '<svg class="brand-mark" viewBox="0 0 512 512" width="44" height="44" aria-hidden="true"><rect class="brand-tile" width="512" height="512" rx="115"/><circle class="brand-face" cx="256" cy="248" r="147"/><path class="brand-smile" d="M164 265q92 110 184 0" fill="none" stroke-width="23" stroke-linecap="round"/><circle class="brand-feature" cx="201" cy="218" r="14"/><circle class="brand-feature" cx="311" cy="218" r="14"/><path class="brand-spark" d="M175 95l17-44 17 44 44 17-44 17-17 44-17-44-44-17z"/></svg>'}
function shell(content){
  const activeTab=tab==='entry'?(entryContext.returnTab==='history'?'insights':'today'):['history','training'].includes(tab)?'insights':tab;
  $('#app').innerHTML=`<header class="top"><a class="brand" href="./" aria-label="Theo's Potty Pal home">${brandMark()}<div><span class="eyebrow">Little steps, together</span><h1>Theo's Potty Pal</h1></div></a><div class="header-actions"><span class="profile-label">Theo's space</span><button type="button" class="theme-toggle" id="themeToggle" aria-label="Switch color theme" title="Switch color theme">${icon(document.documentElement.dataset.theme==='dark'?'sun':'moon')}</button></div></header><nav class="nav" aria-label="Main navigation">${[['today','Today'],['coach','Coach'],['rewards','Rewards'],['insights','Progress'],['settings','Settings']].map(([id,label])=>`<button data-tab="${id}" class="${activeTab===id?'active':''}" aria-current="${activeTab===id?'page':'false'}">${icon(id)}<span>${label}</span></button>`).join('')}</nav><main data-view="${tab}">${content}</main>`;
  document.querySelector('.brand').onclick=e=>{e.preventDefault();navigateView('today')};
  document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>navigateView(b.dataset.tab))
}
function section(t,r=''){return `<div class="section-title"><h2>${t}</h2><span>${r}</span></div>`}
function strategyCard(st){const guidance=dailyGuidance(st);return `<div class="card focus"><span class="pill">TODAY'S RECOMMENDED STRATEGY</span><h2>${esc(st.title)}</h2><p>${esc(st.why)}</p>${phrasePicker(st)}<strong>What to do</strong><p class="muted">${esc(guidance.action)}</p><strong>What to avoid</strong><p class="muted">${esc(guidance.caution)}</p><div class="row"><button class="button" id="useStrategy">Use this plan</button><button class="button outline" id="changeStrategy">Customize</button></div></div>`}
function todayView(){
  const st=STRATEGIES.find(s=>s.id===state.strategy)||STRATEGIES[0], n=state.checks.length, filled=state.stamps.length%5;
  const guidance=dailyGuidance(st), rhythm=dailyRhythm();
  const dateLabel=new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'});
  return `<div class="today-heading"><div><span class="eyebrow">${esc(dateLabel)}</span><h2>Today, one little step.</h2></div><p>Underwear by day.<br> A diaper at bedtime.</p></div>
  <div class="today-layout">
    <section class="today-focus" aria-labelledby="focus-title">
      <div class="focus-heading"><span class="section-kicker"><span class="status-dot"></span>Today's focus</span><button class="text-button" id="changeStrategy">Change strategy <span aria-hidden="true">&#8599;</span></button></div>
      <h3 id="focus-title">${esc(st.title)}</h3><p class="focus-reason">${esc(st.why)}</p>
      <div id="todayPhrases">${todayPhraseArea()}</div>
    </section><section class="guidance guidance-section" aria-label="Today’s guidance"><div><h4><span class="guidance-mark" aria-hidden="true">+</span> What to do</h4><p>${esc(guidance.action)}</p></div><div><h4><span class="guidance-mark avoid" aria-hidden="true">&#8722;</span> Keep in mind</h4><p>${esc(guidance.caution)}</p></div></section>
    <aside class="today-sidebar">
      <section class="log-section" aria-labelledby="log-title"><div class="section-title"><h2 id="log-title">Log a moment</h2><span id="todayLogCount">${todayLogs().length} today</span></div>
        <div class="actions">${[['attempt','Practiced','Every try counts','today'],['pee','Potty pee','A little victory','history'],['poop','Potty poop','A little victory','training'],['accident','Accident','Fresh start','coach']].map(([id,title,subtitle,mark])=>`<button class="action action-${id}" data-quick="${id}"><span class="action-icon" aria-hidden="true">${icon(mark)}</span><strong>${title}</strong><small>${subtitle}</small></button>`).join('')}</div>
        <div id="quickFeedback" aria-live="polite">${quickFeedback()}</div><button class="text-button more-log" id="detailLog">More outcomes &amp; notes <span aria-hidden="true">+</span></button><button class="text-button more-log" id="goNotes">Notes &amp; history <span aria-hidden="true">&#8599;</span></button>
      </section>
      <section class="reward-section" aria-labelledby="reward-title"><div class="section-title"><h2 id="reward-title">Little victories</h2><span>${filled} of 5 stamps</span></div>
        <div class="reward-preview"><div class="reward-caption"><span class="eyebrow">${esc(REWARDS.find(r=>r[0]===state.reward)?.[1]||'Mail delivery')}</span><button type="button" class="reward-seal" id="stampTool" aria-label="Add a stamp" title="Add a stamp">&#9733;</button></div><div class="stamp-track">${Array.from({length:5},(_,i)=>`<span class="stamp ${i<filled?'filled':''}">${i<filled?'&#9733;':i+1}</span>`).join('')}</div><p>A stamp for comfortable practice.<br>Nothing has to come out.</p><button class="text-button" id="goRewards">Visit the reward board <span aria-hidden="true">&#8594;</span></button></div>
      </section>
    </aside>
    <section class="rhythm-section" aria-labelledby="rhythm-title"><div class="section-title"><h2 id="rhythm-title">Your daily rhythm</h2><span>${n} of ${TASKS.length}</span></div><div class="progress" role="progressbar" aria-label="Daily rhythm" aria-valuemin="0" aria-valuemax="${TASKS.length}" aria-valuenow="${n}"><div style="width:${n/TASKS.length*100}%"></div></div><div class="rhythm-list">${rhythm.map(([t,d],i)=>`<label class="task"><input type="checkbox" data-check="${i}" ${state.checks.includes(i)?'checked':''}/><span><strong>${esc(t)}</strong><small>${esc(d)}</small></span></label>`).join('')}</div></section>
  </div>`
}
let coachFilters={query:'',category:'all',view:'strategies'};
function searchStrategies(query='',category='all'){
  const normalize=text=>text.toLowerCase().replace(/[’']/g,'');
  const terms=normalize(query.trim()).split(/\s+/).filter(Boolean);
  return STRATEGIES.filter(st=>{
    if(category!=='all'&&st.group!==category)return false;
    const text=normalize([st.title,st.group,st.why,st.do,st.avoid,...DAILY_GUIDANCE[st.id].flat(),...phraseOptions(st)].join(' '));
    return terms.every(term=>text.includes(term));
  });
}
function searchFavoritePhrases(query='',category='all'){
  const normalize=text=>text.toLowerCase().replace(/[’']/g,'');
  const terms=normalize(query.trim()).split(/\s+/).filter(Boolean);
  return favoritePhrases.map(key=>{
    const [id,index]=key.split(':'),st=STRATEGIES.find(s=>s.id===id);
    return {key,st,index:Number(index),text:phraseOptions(st)[Number(index)]};
  }).filter(item=>(category==='all'||item.st.group===category)&&terms.every(term=>normalize(item.text+' '+item.st.title+' '+item.st.group).includes(term))).reverse();
}
function favoritePhraseList(items){
  return items.map(item=>`<article class="favorite-phrase"><div class="favorite-context"><span class="mini">${esc(item.st.group)} · ${esc(item.st.title)}</span>${favoriteButton(item.st.id,item.index)}</div><blockquote>“${esc(item.text)}”</blockquote></article>`).join('');
}
function coachView(){
  const groups=[...new Set(STRATEGIES.map(s=>s.group))];
  return `<div class="intro"><span class="pill">PARENT COACH</span><h2>What should I say?</h2><p>Choose a strategy that fits the moment. One main focus is enough.</p></div>
    <div class="category-filters coach-views" role="group" aria-label="Coach view"><button type="button" data-coach-view="strategies" aria-pressed="${coachFilters.view==='strategies'}">Strategies</button><button type="button" data-coach-view="favorites" aria-pressed="${coachFilters.view==='favorites'}">Favorite phrases <span id="favoriteTotal" class="category-count">${favoritePhrases.length}</span></button></div>
    <div class="coach-filters"><label class="search-label" for="coachSearch">Find a strategy or phrase</label><input id="coachSearch" type="search" placeholder="Search words or situations" value="${esc(coachFilters.query)}" autocomplete="off" aria-controls="coachLibrary coachFavorites"/>
    <div class="category-filters" role="group" aria-label="Strategy categories">${['all',...groups].map(g=>`<button type="button" data-category="${esc(g)}" aria-pressed="${coachFilters.category===g}">${g==='all'?'All':esc(g)} <span class="category-count">${searchStrategies(coachFilters.query,g).length}</span></button>`).join('')}</div></div>
    <div id="coachActive">${section('Your active plan')}${strategyCard(STRATEGIES.find(s=>s.id===state.strategy)||STRATEGIES[0])}${coachingNotes()}</div>
    <div class="section-title"><h2 id="coachLibraryTitle">Strategy library</h2><span id="coachResultCount" role="status" aria-live="polite"></span></div>
    <div id="coachLibrary">${groups.map(g=>`<section class="coach-group" data-group="${esc(g)}"><h3 class="group-title">${esc(g)}</h3><div class="strategy-list">${STRATEGIES.filter(s=>s.group===g).map(s=>`<div class="card strategy" data-strategy="${s.id}"><div><strong>${esc(s.title)}</strong><p class="muted">${esc(s.why)}</p><p class="search-excerpt" hidden></p><details><summary>What to say and do</summary>${phrasePicker(s)}<p class="muted">${esc(s.do)}</p><p class="muted">${esc(s.avoid)}</p></details></div><div class="strategy-actions"><button class="button outline small" data-choose="${s.id}">Make focus</button><label class="mini"><input type="checkbox" data-custom="${s.id}" ${state.custom.includes(s.id)?'checked':''}/> My plan</label></div></div>`).join('')}</div></section>`).join('')}</div>
    <div id="coachFavorites" class="favorite-list" hidden></div>
    <div class="empty" id="coachEmpty" hidden><h3 id="coachEmptyTitle">No matching strategies</h3><p id="coachEmptyHint" class="muted" hidden>No favorite phrases yet.</p><button class="button outline" id="clearCoachFilters">Clear filters</button></div>
    <div id="coachCustom">${section('My custom plan',`${state.custom.length} strategies`)}<div class="card">${state.custom.map(id=>{const s=STRATEGIES.find(x=>x.id===id);return s?`<p>✓ ${esc(s.title)}</p>`:''}).join('')||'<p class="muted">Choose strategies from the library.</p>'}<p class="muted">Your custom list is optional. Keep one strategy as your daily focus.</p></div></div>`
}

const microAnimations=new WeakMap();
function microAnimate(element,keyframes,options={}){
  if(!element?.animate||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  microAnimations.get(element)?.cancel();
  const animation=element.animate(keyframes,{duration:260,easing:'cubic-bezier(.2,.7,.3,1)',...options});
  microAnimations.set(element,animation);
  animation.onfinish=()=>microAnimations.delete(element);
}
function bindDailyChecks(){
  document.querySelectorAll('[data-check]').forEach(input=>input.onchange=async()=>{
    const index=Number(input.dataset.check);
    state.checks=input.checked?[...new Set([...state.checks,index])]:state.checks.filter(i=>i!==index);
    const count=state.checks.length, section=document.querySelector('.rhythm-section'), progress=section.querySelector('[role="progressbar"]');
    section.querySelector('.section-title span').textContent=count+' of '+TASKS.length;
    progress.setAttribute('aria-valuenow',String(count));
    progress.firstElementChild.style.width=count/TASKS.length*100+'%';
    if(input.checked)microAnimate(input,[{transform:'scale(.8)'},{transform:'scale(1.18)',offset:.6},{transform:'scale(1)'}],{duration:300});
    try{
      await put('checklists',{date:today,checks:[...state.checks],updatedAt:new Date().toISOString()});
      if(input.checked&&count===TASKS.length)toast('Daily rhythm complete. One little step at a time.');
    }catch{toast('Could not save checklist. Please try again.')}
  });
}
function celebrateStamp(){
  const track=document.querySelector('.stamp-track');
  if(!track)return;
  const filled=track.querySelectorAll('.filled'), latest=filled[filled.length-1];
  if(latest)microAnimate(latest,[{opacity:.4,transform:'scale(.65) rotate(-14deg)'},{opacity:1,transform:'scale(1.12) rotate(5deg)',offset:.65},{opacity:1,transform:'scale(1) rotate(0)'}],{duration:440});
  else microAnimate(track,[{transform:'scale(1)'},{transform:'scale(1.04)',backgroundColor:getComputedStyle(track).getPropertyValue('--seal-bg').trim(),offset:.5},{transform:'scale(1)',backgroundColor:'transparent'}],{duration:480});
}

function bindCoachFilters(){
  const input=$('#coachSearch');
  if(!input)return;
  let previousResults='';
  function update(animate=false){
    const matches=searchStrategies(coachFilters.query,coachFilters.category), ids=new Set(matches.map(st=>st.id));
    const favorites=coachFilters.view==='favorites', items=searchFavoritePhrases(coachFilters.query,coachFilters.category);
    const filtering=Boolean(coachFilters.query.trim())||coachFilters.category!=='all'||favorites;
    $('#coachLibrary').hidden=favorites;$('#coachFavorites').hidden=!favorites;$('#coachCustom').hidden=favorites;
    $('#coachLibraryTitle').textContent=favorites?'Favorite phrases':'Strategy library';
    $('#favoriteTotal').textContent=favoritePhrases.length;
    document.querySelectorAll('[data-coach-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.coachView===coachFilters.view)));
    if(favorites){$('#coachFavorites').innerHTML=favoritePhraseList(items);bindFavoriteButtons()}
    $('#coachEmptyTitle').textContent=favorites?(favoritePhrases.length?'No matching favorites':'No favorite phrases yet'):'No matching strategies';
    $('#coachEmptyHint').hidden=!favorites||favoritePhrases.length>0;
    $('#coachEmptyHint').textContent='Heart a phrase in Today or Coach to save it here.';
    $('#clearCoachFilters').hidden=favorites&&!coachFilters.query.trim()&&coachFilters.category==='all';
    $('#coachActive').hidden=filtering;
    $('#coachResultCount').textContent=favorites?items.length+' '+(items.length===1?'phrase':'phrases'):matches.length+' '+(matches.length===1?'strategy':'strategies');
    $('#coachEmpty').hidden=favorites?items.length>0:matches.length>0;
    document.querySelectorAll('[data-category]').forEach(button=>{
      button.setAttribute('aria-pressed',String(button.dataset.category===coachFilters.category));
      button.querySelector('.category-count').textContent=(favorites?searchFavoritePhrases(coachFilters.query,button.dataset.category):searchStrategies(coachFilters.query,button.dataset.category)).length;
    });
    document.querySelectorAll('[data-strategy]').forEach(card=>{
      const st=STRATEGIES.find(s=>s.id===card.dataset.strategy);
      card.hidden=!ids.has(st.id);
      const phrase=coachFilters.query.trim()?phraseOptions(st).find(text=>text.toLowerCase().includes(coachFilters.query.trim().toLowerCase())):null;
      const excerpt=card.querySelector('.search-excerpt');
      excerpt.hidden=!phrase;
      excerpt.textContent=phrase?'“'+phrase+'”':'';
    });
    document.querySelectorAll('[data-group]').forEach(group=>{group.hidden=!matches.some(st=>st.group===group.dataset.group)});
    const signature=favorites?'favorites:'+items.map(item=>item.key).join(','):matches.map(st=>st.id).join(',');
    if(animate&&signature!==previousResults){
      document.querySelectorAll('[data-strategy]:not([hidden])').forEach((card,i)=>microAnimate(card,[{opacity:.35,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{delay:i*30}));
      microAnimate($('#coachResultCount'),[{opacity:.3},{opacity:1}],{duration:180});
      if(!matches.length)microAnimate($('#coachEmpty'),[{opacity:.3,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}]);
    }
    previousResults=signature;
  }
  input.oninput=()=>{coachFilters.query=input.value;update(true)};
  document.querySelectorAll('[data-category]').forEach(button=>button.onclick=()=>{coachFilters.category=button.dataset.category;update(true)});
  $('#clearCoachFilters').onclick=()=>{coachFilters={...coachFilters,query:'',category:'all'};input.value='';update(true);input.focus()};
  document.querySelectorAll('[data-coach-view]').forEach(button=>button.onclick=()=>{coachFilters.view=button.dataset.coachView;update(true)});
  updateCoachFavorites=()=>update();
  update();
}
function rewardsView(){const total=state.stamps.length,filled=total%5;return `<div class="intro"><span class="pill">PARENT-MANAGED REWARDS</span><h2>Every try counts.</h2><p>Let Theo add a physical sticker or stamp to a printed board. No phone needed.</p></div>${section('Choose a reward theme')}<div class="card"><div class="field"><label for="rewardTheme">Reward board</label><select id="rewardTheme">${REWARDS.map(([id,t])=>`<option value="${id}" ${state.reward===id?'selected':''}>${t}</option>`).join('')}</select></div><p class="muted">${esc(REWARDS.find(r=>r[0]===state.reward)?.[2]||'')}</p></div>${section('Five-step goal',`${total} stamps earned`)}<div class="card"><div class="stamp-track large">${Array.from({length:5},(_,i)=>`<span class="stamp ${i<filled?'filled':''}">${i<filled?'★':i+1}</span>`).join('')}</div><p class="muted">Completed sets of five: ${Math.floor(total/5)}. Earn a stamp for one planned, comfortable participation opportunity, not for producing pee or poop. No penalties or lost stamps.</p><div class="row wrap"><button class="button" id="addStamp">+ Add a stamp</button><button class="button outline" id="undoStamp" ${!total?'disabled':''}>Undo last</button></div></div>${section('Offline reward ideas')}<div class="card"><p><strong>Mail delivery:</strong> Put a real sticker on a paper envelope. After five, deliver pretend mail together.</p><p><strong>Little builder:</strong> Add one block to a toy structure after practice.</p><p><strong>Garden:</strong> Add a paper flower to a wall chart.</p><p><strong>Adventure:</strong> Move a magnet one space along a path.</p><p class="muted">Keep rewards small and optional. Never delay a needed bathroom trip to earn one.</p></div><button class="button light full" id="printBoard">Print a five-stamp board</button>`}
function trainingView(){return `<div class="intro"><span class="pill">POOP TRAINING LADDER</span><h2>At Theo's pace.</h2><p>Stages are flexible, not deadlines. Move backward whenever he needs comfort.</p></div>${section('Choose the current stage')}<div class="stage-list">${STAGES.map(([t,d],i)=>`<button class="stage ${state.stage===i?'active':''}" data-stage="${i}"><span class="number">${i+1}</span><span><strong>${esc(t)} ${state.stage===i?'• Current':''}</strong><small>${esc(d)}</small></span></button>`).join('')}</div>${section('Keep in mind')}<div class="tip">Daytime underwear, a diaper at bedtime. Nighttime dryness develops separately; a wet night is not misbehavior. Never ask Theo to save poop for bedtime or force a sit. If he holds stool, has hard or painful poops, or frequent soiling, contact his pediatrician for an individual plan; avoid turning clothing into a battle.</div>`}
const MOODS={unrecorded:'Not recorded',comfortable:'Comfortable',hesitant:'Hesitant',upset:'Upset or refused',pain:'Pain or discomfort'};
let entryContext={type:'attempt',returnTab:'today'};
const LOG_MARKS={attempt:'today',pee:'history',poop:'training',accident:'coach',diaper:'history',withholding:'insights'};
function outcomeChoice(type,selected){
  return `<label class="outcome-choice"><input type="radio" name="type" value="${type}" ${selected===type?'checked':''} required/><span class="choice-content"><span class="choice-icon outcome-${type}" aria-hidden="true">${icon(LOG_MARKS[type])}</span><span>${esc(OUTCOMES[type])}</span></span></label>`;
}
function logForm(type='attempt'){
  const other=['diaper','withholding'].includes(type);
  return `<form id="logForm" class="entry-form">
    <div class="entry-fields">
      <fieldset class="entry-fieldset"><legend>What happened?</legend><div class="outcome-options">${['attempt','pee','poop','accident'].map(id=>outcomeChoice(id,type)).join('')}</div><details class="other-outcomes" ${other?'open':''}><summary>Other outcomes</summary><div class="outcome-options">${['diaper','withholding'].map(id=>outcomeChoice(id,type)).join('')}</div></details></fieldset>
      <fieldset class="entry-fieldset"><legend>How did Theo feel?</legend><div class="mood-options">${Object.entries(MOODS).map(([id,label])=>`<label class="mood-choice"><input type="radio" name="mood" value="${id}" ${id==='unrecorded'?'checked':''} required/><span>${esc(label)}</span></label>`).join('')}</div></fieldset>
    </div>
    <div class="entry-notes"><div class="notes-label"><label for="note">A little context <span>Optional</span></label><span id="noteCount">0 / 1,000</span></div><textarea id="note" maxlength="1000" placeholder="What helped? Anything you'd like to remember?" rows="3"></textarea></div>
    <p class="entry-error" id="entryError" role="alert" hidden></p>
    <div class="entry-footer"><button type="button" class="text-button" id="cancelEntry">Cancel</button><button type="submit" class="button" id="saveEntry">${icon('today')} Save entry</button></div>
  </form>`
}
function entryView(){
  return `<button class="text-button entry-back" id="cancelLog"><span aria-hidden="true">&#8592;</span> ${entryContext.returnTab==='history'?'Potty journal':'Today'}</button>
    <div class="entry-heading"><span class="eyebrow">Theo's journal</span><h2>Record a moment.</h2><p>Every experience is part of learning.</p></div>${logForm(entryContext.type)}`
}
function journalDayLabel(value){
  const date=new Date(value), current=new Date(), yesterday=new Date();
  yesterday.setDate(current.getDate()-1);
  if(!Number.isFinite(date.getTime()))return 'Date unavailable';
  if(date.toDateString()===current.toDateString())return 'Today';
  if(date.toDateString()===yesterday.toDateString())return 'Yesterday';
  return date.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric',...(date.getFullYear()!==current.getFullYear()?{year:'numeric'}:{})});
}
function records(logs){
  if(!logs.length)return `<div class="journal-empty"><span class="empty-journal-icon" aria-hidden="true">${icon('history')}</span><h3>A fresh page.</h3><p>Every comfortable try counts.</p></div>`;
  const days=new Map();
  logs.forEach(log=>{const key=new Date(log.created).toDateString();if(!days.has(key))days.set(key,[]);days.get(key).push(log)});
  return [...days.values()].map(entries=>`<section class="journal-day"><div class="journal-day-heading"><h3>${esc(journalDayLabel(entries[0].created))}</h3><span>${entries.length} ${entries.length===1?'moment':'moments'}</span></div><div class="journal-timeline">${entries.map(log=>`<article class="journal-record"><span class="record-mark outcome-${esc(log.type)}" aria-hidden="true">${icon(LOG_MARKS[log.type]||'history')}</span><div class="journal-record-content"><div class="record-heading"><h4>${esc(OUTCOMES[log.type]||log.type)}</h4><time datetime="${esc(log.created)}">${esc(new Date(log.created).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'}))}</time></div><span class="mood-badge" data-mood="${esc(log.mood)}">${esc(MOODS[log.mood]||log.mood)}</span>${log.note?`<p class="record-note">${esc(log.note)}</p>`:''}</div><button class="text-button record-delete" data-delete="${esc(log.id)}" aria-label="Delete ${esc(OUTCOMES[log.type]||'potty')} entry">Delete</button></article>`).join('')}</div></section>`).join('')
}
let journalFilters={mode:'all',query:'',outcome:'all'};
function journalEntries(logs=state.logs,filters=journalFilters){
  const words=filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return logs.filter(log=>{
    if(filters.mode==='notes'&&!log.note?.trim())return false;
    if(filters.outcome!=='all'&&log.type!==filters.outcome)return false;
    const text=[OUTCOMES[log.type],MOODS[log.mood],log.note].join(' ').toLowerCase();
    return words.every(word=>text.includes(word));
  });
}
function historyView(){
  return `<button class="text-button entry-back" id="backProgress"><span aria-hidden="true">&#8592;</span> Progress</button><div class="journal-heading"><div><span class="eyebrow">Theo's journal</span><h2>Notes &amp; moments.</h2><p>Little steps, over time.</p></div><button class="button" id="newLog"><span aria-hidden="true">+</span> Add an entry</button></div>
    <div class="journal-summary"><div class="journal-tabs" role="tablist" aria-label="Journal view">${[['all','All entries'],['notes','With notes']].map(([mode,label])=>`<button type="button" role="tab" id="journal-tab-${mode}" data-journal-mode="${mode}" aria-selected="${journalFilters.mode===mode}" tabindex="${journalFilters.mode===mode?'0':'-1'}" aria-controls="journalResults">${label}</button>`).join('')}</div><span id="journalCount" role="status" aria-live="polite"></span></div>
    <div class="journal-filters"><div><label for="journalSearch">Search notes &amp; outcomes</label><input type="search" id="journalSearch" placeholder="Search your journal" value="${esc(journalFilters.query)}" autocomplete="off"/></div><div><label for="journalOutcome">Outcome</label><select id="journalOutcome"><option value="all">All outcomes</option>${Object.entries(OUTCOMES).map(([id,label])=>`<option value="${id}" ${journalFilters.outcome===id?'selected':''}>${esc(label)}</option>`).join('')}</select></div></div>
    <div id="journalResults" role="tabpanel" aria-labelledby="journal-tab-${journalFilters.mode}"></div>`
}
function showJournal(mode='all'){journalFilters={mode,query:'',outcome:'all'};tab='history';render();scrollTo(0,0)}
function bindLogDeletes(root=document){
  root.querySelectorAll('[data-delete]').forEach(button=>button.onclick=async()=>{
    if(confirm('Delete this entry?')){await del('logs',button.dataset.delete);await load()}
  });
}
function bindJournal(){
  const input=$('#journalSearch'),select=$('#journalOutcome'),results=$('#journalResults');
  if(!input)return;
  function update(){
    const entries=journalEntries();
    $('#journalCount').textContent=entries.length+' '+(entries.length===1?'moment':'moments');
    document.querySelectorAll('[data-journal-mode]').forEach(button=>{
      const active=button.dataset.journalMode===journalFilters.mode;
      button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
    });
    results.setAttribute('aria-labelledby','journal-tab-'+journalFilters.mode);
    if(entries.length)results.innerHTML=records(entries);
    else if(journalFilters.query.trim()||journalFilters.outcome!=='all')results.innerHTML='<div class="journal-empty"><h3>No matching entries.</h3><button class="button outline" id="clearJournalFilters">Clear filters</button></div>';
    else if(journalFilters.mode==='notes')results.innerHTML='<div class="journal-empty"><span class="empty-journal-icon" aria-hidden="true">'+icon('coach')+'</span><h3>No notes yet.</h3><p>A little context can make a small moment memorable.</p></div>';
    else results.innerHTML=records([]);
    bindLogDeletes(results);
    $('#clearJournalFilters')?.addEventListener('click',()=>{journalFilters.query='';journalFilters.outcome='all';input.value='';select.value='all';update();input.focus()});
  }
  input.oninput=()=>{journalFilters.query=input.value;update()};
  select.onchange=()=>{journalFilters.outcome=select.value;update()};
  document.querySelectorAll('[data-journal-mode]').forEach(button=>{
    button.onclick=()=>{journalFilters.mode=button.dataset.journalMode;update()};
    button.onkeydown=e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();
      journalFilters.mode=e.key==='Home'?'all':e.key==='End'?'notes':journalFilters.mode==='all'?'notes':'all';
      update();$('#journal-tab-'+journalFilters.mode).focus();
    };
  });
  update();
}
function bindLogForm(){
  const form=$('#logForm');
  if(!form)return;
  const cancel=()=>{tab=entryContext.returnTab;render();scrollTo(0,0)};
  $('#cancelLog').onclick=cancel;
  $('#cancelEntry').onclick=cancel;
  $('#note').oninput=e=>{$('#noteCount').textContent=e.target.value.length.toLocaleString()+' / 1,000'};
  form.onsubmit=async e=>{
    e.preventDefault();
    const submit=$('#saveEntry'),error=$('#entryError');
    submit.disabled=true;
    error.hidden=true;
    try{await saveLog(form.querySelector('[name="type"]:checked').value,form.querySelector('[name="mood"]:checked').value,$('#note').value.trim())}
    catch{submit.disabled=false;error.textContent='Could not save this entry. Please try again.';error.hidden=false}
  };
}
function recentWeek(logs=state.logs,now=new Date()){
  const start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-6);
  return logs.filter(log=>new Date(log.created)>=start&&new Date(log.created)<=now);
}
function insightsView(){
  const logs=state.logs,week=recentWeek(),count=type=>week.filter(log=>log.type===type).length;
  const comfortable=week.filter(log=>log.mood==='comfortable').length, unspecified=week.filter(log=>log.mood==='unrecorded').length;
  const notes=logs.filter(log=>log.note?.trim()).slice(0,3);
  return `<div class="intro"><span class="pill">PROGRESS, NOT PERFECTION</span><h2>Little steps, over time.</h2><p>A record of Theo's experiences, at his own pace.</p></div>
    <div class="row wrap progress-actions"><button class="button outline" id="goHistory">${icon('history')} All moments</button><button class="button outline" id="goNotes2">${icon('coach')} Notes</button><button class="button outline" id="goTraining2">${icon('training')} Training ladder</button></div>
    ${section('The last seven days',week.length+' moments')}
    <div class="statgrid"><div class="stat"><b>${count('attempt')}</b><span>Potty practices</span></div><div class="stat"><b>${count('pee')}</b><span>Potty pees</span></div><div class="stat"><b>${count('poop')}</b><span>Potty poops</span></div></div>
    <ul class="observations">${week.length?`<li>${comfortable} ${comfortable===1?'moment recorded':'moments recorded'} as comfortable.</li><li>${count('accident')} ${count('accident')===1?'accident recorded':'accidents recorded'}.</li><li>${week.filter(log=>log.note?.trim()).length} moments have a note.</li>${unspecified?`<li>Comfort was not recorded for ${unspecified} ${unspecified===1?'moment':'moments'}.</li>`:''}`:'<li>No moments recorded this week.</li>'}</ul>
    ${section('Recent notes')}<div class="progress-notes">${notes.length?notes.map(log=>`<article class="progress-note"><div><strong>${esc(OUTCOMES[log.type])}</strong><time datetime="${esc(log.created)}">${esc(journalDayLabel(log.created))}</time></div><p>${esc(log.note)}</p></article>`).join(''):'<div class="journal-empty"><h3>A little space for the details.</h3><p>No notes recorded yet.</p></div>'}</div>
    ${section('Comfort & concerns')}<dl class="concern-list"><div><dt>Hesitant or upset</dt><dd>${week.filter(log=>['hesitant','upset'].includes(log.mood)).length}</dd></div><div><dt>Pain or discomfort</dt><dd>${week.filter(log=>log.mood==='pain').length}</dd></div><div><dt>Possible withholding</dt><dd>${count('withholding')}</dd></div></dl><p class="mini">Last seven days. Pain or withholding is a reason to check in with Theo's pediatrician.</p>
    ${section('Weekly reflection')}<div class="reflection-area"><label for="weeklyNote">What helped Theo feel more comfortable this week?</label><textarea id="weeklyNote" maxlength="1000" placeholder="A choice, a familiar routine, a small step..." rows="3"></textarea><button class="button" id="saveReview">Save reflection</button></div>
    ${state.reviews.slice(0,4).map(review=>`<article class="progress-note"><time datetime="${esc(review.created)}">${esc(journalDayLabel(review.created))}</time><p>${esc(review.note)}</p></article>`).join('')}
    <p class="mini progress-footnote">${logs.length} moments recorded in total. Counts reflect your entries, not a medical assessment.</p>`;
}
function settingsView(){return `${appearanceSettings()}${section('Your data')}<div class="card"><h3>Stored on this device</h3><p class="muted">IndexedDB saves your entries and daily checklist in this browser. Clearing website data or removing the app may delete them. Export backups regularly.</p><div class="row wrap"><button class="button" id="export">Export JSON backup</button><button class="button light" id="importBtn">Import backup</button></div><input type="file" id="importFile" accept="application/json,.json" class="hidden"/></div>${section('Future sync')}<div class="card"><h3>Supabase sync <span class="chip">Coming later</span></h3><p class="muted">V2 is fully local. Records already use unique IDs and timestamps so a future Supabase sync adapter can be added without changing the UI. No data is uploaded today.</p></div>${section('App details')}<div class="card"><p class="muted">Version 2.13 · Offline-ready PWA · Private local storage</p><p class="muted">Refresh app files without removing saved progress, favorites, or preferences.</p><button class="button light" id="refreshApp">Refresh app</button><button class="button outline" id="resetChecks">Clear today's checkboxes</button></div>`}
function render(){rememberDrafts();shell(({today:todayView,coach:coachView,rewards:rewardsView,training:trainingView,history:historyView,entry:entryView,insights:insightsView,settings:settingsView})[tab]());bind();restoreDrafts()}
let quickSavedId=null, quickBusy=false;
function todayLogs(){return state.logs.filter(log=>new Date(log.created).toLocaleDateString('en-CA')===today)}
function quickFeedback(){
  const log=state.logs.find(item=>item.id===quickSavedId);
  if(!log)return '';
  return `<div class="quick-saved"><span class="quick-saved-label">${icon('today')} ${esc(OUTCOMES[log.type])} saved</span><div class="row"><button type="button" class="text-button" id="quickUndo">Undo</button><button type="button" class="text-button" id="quickNoteToggle">${log.note?'Edit note':'Add note'}</button></div><form id="quickNoteForm" hidden><label for="quickNote">A little context</label><textarea id="quickNote" maxlength="1000" rows="3">${esc(log.note)}</textarea><label for="quickMood">Comfort</label><select id="quickMood">${Object.entries(MOODS).map(([id,label])=>`<option value="${id}" ${log.mood===id?'selected':''}>${esc(label)}</option>`).join('')}</select><div class="row"><button class="button small" type="submit">Save details</button><button class="text-button" type="button" id="quickNoteCancel">Cancel</button></div></form></div>`;
}
function updateQuickFeedback(){
  if(!$('#quickFeedback'))return;
  $('#quickFeedback').innerHTML=quickFeedback();$('#todayLogCount').textContent=todayLogs().length+' today';bindQuickLog();
}
function writeLog(log){
  return new Promise((resolve,reject)=>{const transaction=db.transaction('logs','readwrite');transaction.objectStore('logs').put(log);transaction.oncomplete=resolve;transaction.onerror=()=>reject(transaction.error);transaction.onabort=()=>reject(transaction.error)});
}
function bindQuickLog(){
  document.querySelectorAll('[data-quick]').forEach(button=>button.onclick=async()=>{
    if(quickBusy)return;
    if($('#quickNoteForm')&&!$('#quickNoteForm').hidden){toast('Save or cancel your note first');$('#quickNote').focus();return}
    quickBusy=true;document.querySelectorAll('[data-quick]').forEach(item=>item.disabled=true);
    const created=new Date().toISOString(),log={id:crypto.randomUUID(),type:button.dataset.quick,mood:'unrecorded',note:'',created,updatedAt:created,syncStatus:'pending'};
    try{await writeLog(log);state.logs.unshift(log);quickSavedId=log.id;updateQuickFeedback();microAnimate(button,[{transform:'scale(.96)'},{transform:'scale(1)'}]);toast('Saved on this device')}
    catch{toast('Could not save. Please try again.')}
    finally{quickBusy=false;document.querySelectorAll('[data-quick]').forEach(item=>item.disabled=false)}
  });
  $('#quickUndo')?.addEventListener('click',async()=>{
    if(quickBusy)return;quickBusy=true;const id=quickSavedId;
    try{await new Promise((resolve,reject)=>{const transaction=db.transaction('logs','readwrite');transaction.objectStore('logs').delete(id);transaction.oncomplete=resolve;transaction.onerror=()=>reject(transaction.error);transaction.onabort=()=>reject(transaction.error)});state.logs=state.logs.filter(log=>log.id!==id);quickSavedId=null;quickDraft=null;updateQuickFeedback();document.querySelector('[data-quick]')?.focus();toast('Entry undone')}
    catch{toast('Could not undo. Please try again.')}finally{quickBusy=false}
  });
  $('#quickNoteToggle')?.addEventListener('click',()=>{$('#quickNoteForm').hidden=false;$('#quickNote').focus()});
  $('#quickNoteCancel')?.addEventListener('click',()=>{quickDraft=null;updateQuickFeedback();$('#quickNoteToggle')?.focus()});
  const form=$('#quickNoteForm');
  if(form)form.onsubmit=async event=>{
    event.preventDefault();if(quickBusy)return;quickBusy=true;
    const existing=state.logs.find(log=>log.id===quickSavedId),updated={...existing,note:$('#quickNote').value.trim(),mood:$('#quickMood').value,updatedAt:new Date().toISOString(),syncStatus:'pending'};
    form.querySelector('[type="submit"]').disabled=true;
    try{await writeLog(updated);quickDraft=null;state.logs=state.logs.map(log=>log.id===updated.id?updated:log);updateQuickFeedback();$('#quickNoteToggle')?.focus();toast('Details saved')}
    catch{form.querySelector('[type="submit"]').disabled=false;toast('Could not save details. Your note is still here.')}finally{quickBusy=false}
  };
}
function toast(t){const e=document.createElement('div');document.querySelectorAll('.toast').forEach(item=>item.remove());e.className='toast';e.setAttribute('role','status');e.textContent=t;document.body.append(e);setTimeout(()=>{e.classList.add('leaving');setTimeout(()=>e.remove(),220)},2180)}
async function saveLog(type,mood='unrecorded',note=''){const created=new Date().toISOString();await writeLog({id:crypto.randomUUID(),type,mood,note,created,updatedAt:created,syncStatus:'pending'});journalFilters={mode:'all',query:'',outcome:'all'};tab='history';await load();scrollTo(0,0);toast('Entry saved on this device')}
function showForm(type='attempt'){entryContext={type:OUTCOMES[type]?type:'attempt',returnTab:tab==='history'?'history':'today'};tab='entry';render();scrollTo(0,0)}
function bind(){$('#refreshApp')?.addEventListener('click',refreshApp);updateCoachFavorites=null;bindFavoriteButtons();bindJournal();$('#goNotes')?.addEventListener('click',()=>showJournal('notes'));$('#goNotes2')?.addEventListener('click',()=>showJournal('notes'));bindAppearance();bindStampTool();bindLogForm();$('#backProgress')?.addEventListener('click',()=>{tab='insights';render();scrollTo(0,0)});bindPhraseCarousel();bindCoachFilters();bindDailyChecks();bindQuickLog();bindTodayPhrases();$('#detailLog')?.addEventListener('click',()=>showForm());$('#goTraining')?.addEventListener('click',()=>{tab='training';render()});document.querySelectorAll('[data-stage]').forEach(x=>x.onclick=async()=>{state.stage=Number(x.dataset.stage);await put('settings',state.stage,'stage');render();toast('Training stage updated')});$('#newLog')?.addEventListener('click',()=>showForm());bindLogDeletes();$('#export')?.addEventListener('click',exportData);$('#importBtn')?.addEventListener('click',()=>$('#importFile').click());$('#importFile')?.addEventListener('change',importData);$('#useStrategy')?.addEventListener('click',()=>toast('Today’s focus is ready'));$('#changeStrategy')?.addEventListener('click',()=>{tab='coach';render();scrollTo(0,0)});$('#goHistory')?.addEventListener('click',()=>showJournal());$('#goTraining2')?.addEventListener('click',()=>{tab='training';render()});$('#goRewards')?.addEventListener('click',()=>{tab='rewards';render()});document.querySelectorAll('[data-choose]').forEach(b=>b.onclick=async()=>{state.strategy=b.dataset.choose;await put('settings',state.strategy,'strategy');render();toast('Daily focus updated')});document.querySelectorAll('[data-custom]').forEach(b=>b.onchange=async()=>{state.custom=b.checked?[...new Set([...state.custom,b.dataset.custom])]:state.custom.filter(id=>id!==b.dataset.custom);await put('settings',state.custom,'custom');render()});$('#rewardTheme')?.addEventListener('change',async e=>{state.reward=e.target.value;await put('settings',state.reward,'reward');render()});$('#addStamp')?.addEventListener('click',addRewardStamp);$('#undoStamp')?.addEventListener('click',async()=>{const last=[...state.stamps].sort((a,b)=>b.created.localeCompare(a.created))[0];if(last){await del('stamps',last.id);await load()}});$('#printBoard')?.addEventListener('click',()=>{const w=window.open('','_blank');if(!w){toast('Allow popups to print');return}w.document.write('<!doctype html><title>Potty Pal reward board</title><link rel="stylesheet" href="'+new URL('./colors.css',location.href).href+'"><style>body{font-family:system-ui;text-align:center;padding:50px;color:var(--color-sky-800)}h1{font-size:36px}.marks{display:flex;justify-content:center;gap:20px;margin:55px 0}.marks span{border:4px dashed var(--color-sky-500);border-radius:20px;width:85px;height:85px;display:grid;place-items:center;font-size:30px}p{font-size:20px}</style><h1>My little victories</h1><p>Every comfortable practice counts!</p><div class="marks"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div><p>Fill a space with a stamp or sticker. Then celebrate together!</p>');w.document.close();w.print()});$('#saveReview')?.addEventListener('click',async()=>{
  const button=$('#saveReview'),note=$('#weeklyNote').value.trim();if(!note)return toast('Write a short reflection first');
  button.disabled=true;const created=new Date().toISOString();
  try{await put('reviews',{id:crypto.randomUUID(),note,created,updatedAt:created,syncStatus:'pending'});reflectionDraft='';$('#weeklyNote').value='';await load();toast('Reflection saved')}
  catch{button.disabled=false;toast('Could not save. Your reflection is still here.')}
});$('#resetChecks')?.addEventListener('click',async()=>{state.checks=[];await put('checklists',{date:today,checks:[],updatedAt:new Date().toISOString()});render();toast('Today’s checklist cleared')})}
let appRefreshBusy=false;
function hasUnsavedAppWork(){
  rememberDrafts();
  return Boolean($('#logForm')||quickBusy||stampSaving||quickDraft?.note?.trim()||reflectionDraft.trim());
}
async function refreshApp(){
  if(appRefreshBusy)return;
  if(hasUnsavedAppWork()){toast('Save or discard your draft before refreshing.');return}
  const button=$('#refreshApp');
  appRefreshBusy=true;
  if(button){button.disabled=true;button.textContent='Refreshing...'}
  try{
    const url=new URL('./',location.href);
    url.searchParams.set('_refresh',Date.now());
    const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw Error('App unavailable');
    const registration=await navigator.serviceWorker?.getRegistration();
    if(registration)await registration.update();
    // Only replace static app caches. IndexedDB and preferences remain untouched.
    if('caches' in window){
      const keys=await caches.keys();
      await Promise.all(keys.filter(key=>key.startsWith('theos-potty-pal-v')).map(key=>caches.delete(key)));
    }
    location.replace(url.href);
  }catch{
    appRefreshBusy=false;
    if(button){button.disabled=false;button.textContent='Refresh app'}
    toast('Could not refresh. Check your connection and try again.');
  }
}
async function exportData(){const backup={app:'theos-potty-pal',version:2,exportedAt:new Date().toISOString(),settings:{stage:state.stage,strategy:state.strategy,custom:state.custom,reward:state.reward,phrases:selectedPhrases,favoritePhrases:[...favoritePhrases],appearance:themePreference},logs:await all('logs'),checklists:await all('checklists'),stamps:await all('stamps'),reviews:await all('reviews')};const blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`theo-potty-pal-backup-${today}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Backup exported')}
async function importData(e){const f=e.target.files?.[0];if(!f)return;try{const b=JSON.parse(await f.text());if(b.app!=='theos-potty-pal'||![1,2].includes(b.version)||!Array.isArray(b.logs)||!Array.isArray(b.checklists)||!Number.isInteger(b.settings?.stage)||b.settings.stage<0||b.settings.stage>3||b.logs.length>50000||b.checklists.length>50000)throw Error('Invalid backup');if(b.settings?.phrases!==undefined&&!validPhrases(b.settings.phrases))throw Error('Invalid phrase choices');if(b.settings?.favoritePhrases!==undefined&&!validFavorites(b.settings.favoritePhrases))throw Error('Invalid favorite phrases');if(b.settings?.appearance!==undefined&&!validAppearance(b.settings.appearance))throw Error('Invalid appearance preference');if(!confirm('Import backup? Entries with matching IDs will be replaced, other existing entries will remain.'))return;for(const l of b.logs){if(typeof l.id!=='string'||typeof l.created!=='string'||!OUTCOMES[l.type]||!Object.hasOwn(MOODS,l.mood)||typeof l.note!=='string')throw Error('Invalid log data')}for(const c of b.checklists){if(typeof c.date!=='string'||!Array.isArray(c.checks)||!c.checks.every(i=>Number.isInteger(i)&&i>=0&&i<TASKS.length))throw Error('Invalid checklist data')}for(const l of b.logs)await put('logs',l);for(const c of b.checklists)await put('checklists',c);await put('settings',b.settings.stage,'stage');if(b.version===2){if(!Array.isArray(b.stamps)||!Array.isArray(b.reviews)||b.stamps.length>50000||b.reviews.length>50000||!STRATEGIES.some(s=>s.id===b.settings.strategy)||!REWARDS.some(r=>r[0]===b.settings.reward)||!Array.isArray(b.settings.custom)||!b.settings.custom.every(id=>STRATEGIES.some(s=>s.id===id)))throw Error('Invalid V2 data');for(const item of b.stamps){if(typeof item.id!=='string'||typeof item.created!=='string')throw Error('Invalid stamp')}for(const item of b.reviews){if(typeof item.id!=='string'||typeof item.created!=='string'||typeof item.note!=='string')throw Error('Invalid review')}for(const item of b.stamps)await put('stamps',item);for(const item of b.reviews)await put('reviews',item);for(const k of ['strategy','custom','reward'])await put('settings',b.settings[k],k);if(b.settings.phrases!==undefined){await put('settings',b.settings.phrases,'phrases');await put('settings',Object.fromEntries(Object.keys(b.settings.phrases).map(id=>[id,Date.now()])),'phraseTimes');}if(b.settings.favoritePhrases!==undefined)await put('settings',b.settings.favoritePhrases,'favoritePhrases');if(b.settings.appearance!==undefined){await put('settings',b.settings.appearance,'appearance');applyAppearance(b.settings.appearance,false);try{localStorage.setItem('potty-pal-appearance',b.settings.appearance)}catch{}}}await load();toast('Backup imported')}catch(err){alert('Could not import backup: '+err.message)}finally{e.target.value=''}}
async function start(){applyAppearance(themePreference,false);appearanceQuery.addEventListener('change',()=>{if(themePreference==='system')applyAppearance('system',false)});window.addEventListener('storage',e=>{if(e.key==='potty-pal-appearance'&&validAppearance(e.newValue))applyAppearance(e.newValue,false)});try{db=await openDB();await load();if('serviceWorker'in navigator){
  let reloading=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(reloading||appRefreshBusy)return;
    const draft=hasUnsavedAppWork();
    if(draft||quickBusy||stampSaving){toast('Update ready. Refresh after saving your work.');return}
    reloading=true;location.reload();
  });
  navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(registration=>registration.update()).catch(()=>{});
}document.addEventListener('visibilitychange',async()=>{if(document.hidden){clearTimeout(phraseRefreshTimer);return}try{const d=new Date().toLocaleDateString('en-CA');if(d!==today){today=d;await load()}else await refreshPhraseSelections()}catch{toast('Could not refresh the daily plan')}})}catch(e){$('#app').innerHTML=`<div class="card" style="margin:40px 20px"><h2>Storage unavailable</h2><p>This app needs IndexedDB enabled in your browser to save progress.</p><p>${esc(e.message)}</p></div>`}}
start();
