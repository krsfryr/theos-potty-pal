const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');

function app(){
  const context=vm.createContext({
    matchMedia:()=>({matches:false}),
    localStorage:{getItem:()=>null},
    console
  });
  const source=readFileSync(join(__dirname,'../app.js'),'utf8').replace(/\nstart\(\);\s*$/,'');
  vm.runInContext(source,context);
  return expression=>vm.runInContext(expression,context);
}

test('all phrase collections retain 30 stable positions',()=>{
  const run=app();
  assert.equal(run('STRATEGIES.every(st=>phraseOptions(st).length===30)'),true);
  assert.equal(run("phraseOptions(STRATEGIES[0])[16]"),"Let's find the bathroom before we start playing here.");
  assert.equal(run("validFavorites(['bathroom:29','neutral:0'])"),true);
  assert.equal(run("validFavorites(['bathroom:30'])"),false);
});

test('phrases hold their original index for two hours and loop both ways',()=>{
  const run=app();
  assert.equal(run('phraseSelection(16,1000,30,2000).index'),16);
  assert.notEqual(run('phraseSelection(16,1000,30,1000+PHRASE_HOLD_MS,()=>0).index'),16);
  assert.equal(run('phraseIndexAt(0,30)'),29);
  assert.equal(run('phraseIndexAt(31,30)'),0);
});

test('favorites from different strategies appear in Today without changing focus',()=>{
  const run=app();
  run("favoritePhrases=['bathroom:16','neutral:2'];todayPhraseMode='favorites'");
  assert.equal(run("todayPhraseArea().includes('After an accident')"),true);
  assert.equal(run("todayPhraseArea().includes('1 / 2')"),true);
  assert.equal(run('state.strategy'),'bathroom');
});

test('favorites empty state is usable',()=>{
  const run=app();
  run("favoritePhrases=[];todayPhraseMode='favorites'");
  assert.equal(run("todayPhraseArea().includes('browseFavoriteCoach')"),true);
});

test('seven-day summaries include today, exclude older and future records',()=>{
  const run=app();
  assert.equal(run(`recentWeek([
    {created:new Date(2026,9,8,0).toISOString()},
    {created:new Date(2026,9,7,23).toISOString()},
    {created:new Date(2026,9,14,11).toISOString()},
    {created:new Date(2026,9,14,13).toISOString()}
  ],new Date(2026,9,14,12)).length`),2);
});

test('quick entries do not invent comfort and escape note content',()=>{
  const run=app();
  run("state.logs=[{id:'test',type:'attempt',mood:'unrecorded',note:'<script>bad</script>'}];quickSavedId='test'");
  assert.equal(run("quickFeedback().includes('value=\"unrecorded\" selected')"),true);
  assert.equal(run("quickFeedback().includes('<script>bad</script>')"),false);
  assert.equal(run("quickFeedback().includes('&lt;script&gt;')"),true);
});

test('progress reports recorded facts rather than inferred milestones',()=>{
  const run=app();
  run("state.logs=[{id:'test',created:new Date().toISOString(),type:'attempt',mood:'unrecorded',note:''}]");
  assert.equal(run("insightsView().includes('Comfort was not recorded for 1 moment.')"),true);
  assert.equal(run("insightsView().includes('0 moments recorded as comfortable.')"),true);
});

test('log saving waits for transaction completion and reports failures',async()=>{
  const run=app();
  run("let savedTransaction;db={transaction:()=>savedTransaction={objectStore:()=>({put:()=>{}})}}");
  const promise=run("writeLog({id:'test'})");
  let saved=false;promise.then(()=>{saved=true});
  await Promise.resolve();
  assert.equal(saved,false);
  run('savedTransaction.oncomplete()');
  await promise;
  assert.equal(saved,true);
  const failure=run("writeLog({id:'test'})");
  run("savedTransaction.error=new Error('storage full');savedTransaction.onabort()");
  await assert.rejects(failure,/storage full/);
});
