const DB="leadloop",VER=1,STORES=["customers","orders","followups"];
function openDB(){return new Promise((ok,no)=>{let r=indexedDB.open(DB,VER);r.onupgradeneeded=()=>STORES.forEach(s=>{if(!r.result.objectStoreNames.contains(s))r.result.createObjectStore(s,{keyPath:"id"})});r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
async function getAll(s){let d=await openDB();return new Promise((ok,no)=>{let r=d.transaction(s,"readonly").objectStore(s).getAll();r.onsuccess=()=>ok(r.result||[]);r.onerror=()=>no(r.error)})}
async function put(s,o){let d=await openDB();return new Promise((ok,no)=>{let t=d.transaction(s,"readwrite");t.objectStore(s).put(o);t.oncomplete=()=>ok();t.onerror=()=>no(t.error)})}
async function del(s,id){let d=await openDB();return new Promise((ok,no)=>{let t=d.transaction(s,"readwrite");t.objectStore(s).delete(id);t.oncomplete=ok;t.onerror=()=>no(t.error)})}
async function clearStore(s){let d=await openDB();return new Promise((ok,no)=>{let t=d.transaction(s,"readwrite");t.objectStore(s).clear();t.oncomplete=ok;t.onerror=()=>no(t.error)})}
async function replaceStore(s,a){await clearStore(s);for(const x of a)await put(s,x)}
