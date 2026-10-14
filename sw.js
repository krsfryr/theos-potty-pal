const VERSION='2.13.0';
const CACHE='theos-potty-pal-v'+VERSION;
const ASSETS=['./','./index.html','./colors.css?v='+VERSION,'./styles.css?v='+VERSION,'./app.js?v='+VERSION,'./manifest.webmanifest?v='+VERSION,'./icons/icon.svg?v='+VERSION,'./icons/icon-dark.svg?v='+VERSION,'./icons/icon-192.png?v='+VERSION,'./icons/icon-512.png?v='+VERSION];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('theos-potty-pal-v')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    // Fresh HTML points to matching versioned assets; offline visits retain the cached app.
    if(request.mode==='navigate'){
      try{
        const response=await fetch(new Request(request,{cache:'no-store'}));
        if(response.ok){await cache.put(request,response.clone());return response}
      }catch{}
      const saved=await cache.match(request)||await cache.match('./index.html');
      return saved||Response.error();
    }
    const saved=await cache.match(request);
    if(saved)return saved;
    const response=await fetch(new Request(request,{cache:'reload'}));
    if(response.ok)await cache.put(request,response.clone());
    return response;
  })());
});
