const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const source=readFileSync(join(__dirname,'..','app.js'),'utf8');
function setup({offline=false,draft=false}={}){
  const deleted=[],messages=[],button={},visits=[];
  const context=vm.createContext({URL,Date,AbortSignal,
    quickBusy:false,stampSaving:false,quickDraft:draft?{note:'unsaved'}:null,reflectionDraft:'',
    rememberDrafts(){},$:()=>button,toast:text=>messages.push(text),
    window:{caches:{}},caches:{keys:async()=>['theos-potty-pal-v2.12.4','other-app'],delete:async key=>deleted.push(key)},
    navigator:{serviceWorker:{getRegistration:async()=>({update:async()=>{}})}},
    location:{href:'https://example.com/theos-potty-pal/?v=old',replace:url=>visits.push(url)},
    fetch:async()=>{if(offline)throw Error('offline');return {ok:true}}
  });
  // Only the app update helpers are exercised; no storage APIs are provided.
  vm.runInContext(source.slice(source.indexOf('let appRefreshBusy='),source.indexOf('async function exportData()')).replace("$('#logForm')","false"),context);
  return {context,deleted,messages,visits,button};
}
test('refresh replaces only app caches, preserving origin and Pages scope',async()=>{
  const run=setup();await vm.runInContext('refreshApp()',run.context);
  assert.deepEqual(run.deleted,['theos-potty-pal-v2.12.4']);
  const url=new URL(run.visits[0]);
  assert.equal(url.origin,'https://example.com');assert.equal(url.pathname,'/theos-potty-pal/');
  assert.ok(url.searchParams.has('_refresh'));assert.equal(url.searchParams.has('v'),false);
});
test('offline refresh retains caches and allows retry',async()=>{
  const run=setup({offline:true});await vm.runInContext('refreshApp()',run.context);
  assert.deepEqual(run.deleted,[]);assert.deepEqual(run.visits,[]);assert.equal(run.button.disabled,false);
});
test('remembered unsaved notes prevent a refresh',async()=>{
  const run=setup({draft:true});await vm.runInContext('refreshApp()',run.context);
  assert.deepEqual(run.deleted,[]);assert.deepEqual(run.visits,[]);assert.match(run.messages[0],/draft/);
});
