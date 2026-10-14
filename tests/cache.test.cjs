const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const read=file=>readFileSync(join(__dirname,'..',file),'utf8');

function worker(fetcher,saved){
  const listeners={},requests=[];
  class Request{
    constructor(input,options={}){Object.assign(this,typeof input==='string'?{url:input}:input,options)}
  }
  const context=vm.createContext({
    self:{location:{origin:'https://example.com'},addEventListener:(name,handler)=>{listeners[name]=handler}},
    Request,Response,URL,
    caches:{open:async()=>({match:async key=>saved?.(key),put:async()=>{}})},
    fetch:async request=>{requests.push(request);return fetcher(request)}
  });
  vm.runInContext(read('sw.js')+';globalThis.assets=ASSETS;globalThis.version=VERSION;',context);
  return {listeners,requests,context};
}

test('HTML references assets included in the same versioned offline cache',()=>{
  const {context}=worker(()=>{});
  const assets=[...read('index.html').matchAll(/(?:href|src)="([^"]+\?v=[^"]+)"/g)].map(match=>'./'+match[1]);
  assert.ok(assets.length>=6);
  for(const asset of assets)assert.ok(context.assets.includes(asset),asset+' is missing from precache');
  assert.ok(read('app.js').includes("updateViaCache:'none'"));
  assert.ok(read('app.js').includes("registration.update()"));
});

test('page navigation fetches fresh HTML instead of serving a stale cached page',async()=>{
  const {listeners,requests}=worker(async()=>new Response('fresh'),async()=>new Response('stale'));
  let result;
  listeners.fetch({request:{url:'https://example.com/',method:'GET',mode:'navigate'},respondWith:value=>{result=value}});
  assert.equal(await (await result).text(),'fresh');
  assert.equal(requests[0].cache,'no-store');
});

test('offline navigation falls back without touching IndexedDB or user records',async()=>{
  const {listeners}=worker(async()=>{throw Error('offline')},async()=>new Response('offline app'));
  let result;
  listeners.fetch({request:{url:'https://example.com/',method:'GET',mode:'navigate'},respondWith:value=>{result=value}});
  assert.equal(await (await result).text(),'offline app');
  assert.doesNotMatch(read('sw.js'),/indexedDB|localStorage/);
});

test('the header logo is theme-aware and no longer uses the green PNG',()=>{
  assert.ok(read('app.js').includes('${brandMark()}'));
  assert.ok(read('styles.css').includes('.brand-feature{fill:var(--primary)}'));
  assert.ok(read('styles.css').includes(':root[data-theme="dark"] .brand-tile'));
  for(const file of ['icons/icon.svg','icons/icon-dark.svg'])assert.doesNotMatch(read(file),/#dcebe0|#47785f/);
});
