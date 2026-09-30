importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js","https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");
firebase.initializeApp({apiKey:"AIzaSyDV9KJhYmEjHYt6aNkA1daJEPQieADmSY0",authDomain:"go-to-noakhali.firebaseapp.com",projectId:"go-to-noakhali",storageBucket:"go-to-noakhali.firebasestorage.app",messagingSenderId:"1006423475898",appId:"1:1006423475898:web:b716dccb01605615bde483"});
const messaging=firebase.messaging();
messaging.onBackgroundMessage(p=>{
  const d=p.data||{};
  const o={body:d.body||"নোটিশটি দেখতে ট্যাপ করুন",icon:"logo.png",badge:"logo.png",tag:"go-notice-"+(d.ts||""),data:{url:d.url||"./"}};
  if(d.image)o.image=d.image;
  return self.registration.showNotification(d.title||"Go-নোয়াখালী",o);
});

const C="go-noakhali-v2",A=["./","index.html","logo.png","manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!="GET"||new URL(r.url).origin!=location.origin)return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{for(const c of l)if("focus" in c)return c.focus();return clients.openWindow("./")}));
});
