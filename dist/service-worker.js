!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=6)}([function(e,t,s){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:cacheable-response:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";s.r(t);s(0);const n=[],a={get:()=>n,add(e){n.push(...e)}};s(1);const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[i.prefix,e,i.suffix].filter(e=>e&&e.length>0).join("-"),c=e=>e||r(i.precache),o=e=>e||r(i.runtime),h=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),l=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class u extends Error{constructor(e,t){super(l(e,t)),this.name=e,this.details=t}}const d=new Set;const p=(e,t)=>e.filter(e=>t in e),f=async({request:e,mode:t,plugins:s=[]})=>{const n=p(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},g=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const i=await self.caches.open(e),r=await f({plugins:a,request:t,mode:"read"});let c=await i.match(r,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;c=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},m=async({cacheName:e,request:t,response:s,event:n,plugins:a=[],matchOptions:i})=>{const r=await f({plugins:a,request:t,mode:"write"});if(!s)throw new u("cache-put-with-no-response",{url:h(r.url)});const c=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,i=!1;for(const t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return i||(a=a&&200===a.status?a:void 0),a||null})({event:n,plugins:a,response:s,request:r});if(!c)return void 0;const o=await self.caches.open(e),l=p(a,"cacheDidUpdate"),m=l.length>0?await g({cacheName:e,matchOptions:i,request:r}):null;try{await o.put(r,c)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:m,newResponse:c,request:r})},w=g,_=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=p(n,"fetchDidFail"),i=a.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const n=t.requestWillFetch,a=e.clone();e=await n.call(t,{request:a,event:s})}}catch(e){throw new u("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let a;a="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(a=await e.fetchDidSucceed.call(e,{event:s,request:r,response:a}));return a}catch(e){0;for(const t of a)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:i.clone(),request:r.clone()});throw e}};let y;async function v(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,i=function(){if(void 0===y){const e=new Response("");if("body"in e)try{new Response(e.body),y=!0}catch(e){y=!1}y=!1}return y}()?s.body:await s.blob();return new Response(i,a)}function x(e){if(!e)throw new u("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new u("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),a=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:a.href}}class R{constructor(e){this._cacheName=c(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=x(s),a="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new u("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new u("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,a),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this._cacheName),i=await a.keys(),r=new Set(i.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const a=this._cacheKeysToIntegrities.get(s),i=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:i,event:e,integrity:a,plugins:t,url:n})});await Promise.all(c);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:a,integrity:i}){const r=new Request(t,{integrity:i,cache:s,credentials:"same-origin"});let c,o=await _({event:n,plugins:a,request:r});for(const e of a||[])"cacheWillUpdate"in e&&(c=e);if(!(c?await c.cacheWillUpdate({event:n,request:r,response:o}):o.status<400))throw new u("bad-precaching-response",{url:t,status:o.status});o.redirected&&(o=await v(o)),await m({event:n,plugins:a,response:o,request:e===t?r:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new u("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new u("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let b;const q=()=>(b||(b=new R),b);const U=(e,t)=>{const s=q().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let N=!1;function T(e){N||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=c();self.addEventListener("fetch",i=>{const r=U(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return void 0;let c=self.caches.open(a).then(e=>e.match(r)).then(e=>e||fetch(r));i.respondWith(c)})})(e),N=!0)}const L=e=>{const t=q(),s=a.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},E=e=>{const t=q();e.waitUntil(t.activate())};function O(e,t){!function(e){q().addToCacheList(e),e.length>0&&(self.addEventListener("install",L),self.addEventListener("activate",E))}(e),T(t)}s(2);const M=e=>e&&"object"==typeof e?e:{handle:e};class C{constructor(e,t,s="GET"){this.handler=M(t),this.match=e,this.method=s}}class K extends C{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class S{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let i=a&&a.handler;if(!i&&this._defaultHandler&&(i=this._defaultHandler),!i)return void 0;let r;try{r=i.handle({url:s,request:e,event:t,params:n})}catch(e){r=Promise.reject(e)}return r instanceof Promise&&this._catchHandler&&(r=r.catch(n=>this._catchHandler.handle({url:s,request:e,event:t}))),r}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n;const i=a.match({url:e,request:t,event:s});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=M(e)}setCatchHandler(e){this._catchHandler=M(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new u("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new u("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let A;const k=()=>(A||(A=new S,A.addFetchListener(),A.addCacheListener()),A);function P(e,t,s){let n;if("string"==typeof e){const a=new URL(e,location.href);0;n=new C(({url:e})=>e.href===a.href,t,s)}else if(e instanceof RegExp)n=new K(e,t,s);else if("function"==typeof e)n=new C(e,t,s);else{if(!(e instanceof C))throw new u("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return k().registerRoute(n),n}s(3);const j={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class D{constructor(e={}){if(this._cacheName=o(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[j,...e.plugins]}else this._plugins=[j];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=this._getFromNetwork({request:t,event:e});let n,a=await w({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(a){if(e)try{e.waitUntil(s)}catch(n){0}}else{0;try{a=await s}catch(e){n=e}}if(!a)throw new u("no-response",{url:t.url,error:n});return a}async _getFromNetwork({request:e,event:t}){const s=await _({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=m({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){0}return s}}function W(e){e.then(()=>{})}class I{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(s,n);u.onsuccess=()=>{const e=u.result;e?(l.push(i?e:e.value),a&&l.length>=a?c(l):e.continue()):c(l)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const i=this._db.transaction(e,t);i.onabort=()=>a(i.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const i=s.objectStore(t),r=i[e].apply(i,n);r.onsuccess=()=>a(r.result)})}close(){this._db&&(this._db.close(),this._db=null)}}I.prototype.OPEN_TIMEOUT=2e3;const F={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(F))for(const s of t)s in IDBObjectStore.prototype&&(I.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});s(4);const H=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class B{constructor(e){this._cacheName=e,this._db=new I("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this._cacheName)}async setTimestamp(e,t){const s={url:e=H(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",s)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let r=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&r>=t?i.push(s.value):r++),s.continue()}else n(i)}}),n=[];for(const e of s)await this._db.delete("cache-entries",e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+H(e)}}class Q{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new B(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,W(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}s(5);class ${constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(t=>e.headers.get(t)===this._headers[t])),t}}O([{'revision':'2951c50741615753484ea193b2ac0762','url':'./pages/favorite.html'},{'revision':'16f73ee73253abde617680445e0c17fb','url':'./pages/home.html'},{'revision':'4051a82bc0adeb343ac22212c71db9df','url':'./pages/teams.html'},{'revision':'dd5118b85d14faf463330b7337e37fed','url':'bundle.js'},{'revision':'c06f8d74747619697631d2f875d934ac','url':'images/default-player.png'},{'revision':'0878eb7c07bfcf21e2f6795b53568467','url':'images/default-teams.png'},{'revision':'f3a76e989bcaa6db7069d0df3eeb38a0','url':'images/logo-dark-mode.png'},{'revision':'97780d021e7dc13f371a9bb0764565c1','url':'images/logo.png'},{'revision':'00e520b70d531d38e251af672cd5c29c','url':'index.html'},{'revision':'9e62163381083fc47a241b4cbce2b766','url':'match.html'},{'revision':'19c9e711e58096f63dc3546c92a7a329','url':'nav-mobile.html'},{'revision':'b4403738c573ed9dcf92a77a9a32f706','url':'team.html'},{'revision':'5844bd1a23c50751730aed7dca627295','url':'top-nav.html'}]||[{url:"/index.html",revision:"1"},{url:"/index.html",revision:"1"},{url:"/team.html",revision:"1"},{url:"/match.html",revision:"1"},{url:"/top-nav.html",revision:"1"},{url:"/nav-mobile.html",revision:"1"}],{ignoreURLParametersMatching:[/.*/]}),O(self.__precacheManifest||[{url:"/manifest.json",revision:1},{url:"/images/icon_72x72.png",revision:null},{url:"/images/icon_96x96.png",revision:null},{url:"/images/icon_128x128.png",revision:null},{url:"/images/icon_144x144.png",revision:null},{url:"/images/icon_256x256.png",revision:null},{url:"/images/icon_192x192.png",revision:null},{url:"/images/icon_384x384.png",revision:null},{url:"/images/icon_512x512.png",revision:null}]),P(/^https:\/\/api\.football-data\.org/,new D({cacheName:"cache-api"})),P(/\.(?:css|js|png|jpg|svg|gif)$/,new class{constructor(e={}){this._cacheName=o(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await w({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new u("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await _({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),a=m({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(a)}catch(e){0}return s}}({cacheName:"cache-assets"})),P(/^https:\/\/fonts\.googleapis\.com/,new D({cacheName:"cache-assets"})),P(/^https:\/\/fonts\.gstatic\.com/,new D({cacheName:"cache-assets",plugins:[new class{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new $(e)}}({statuses:[0,200]}),new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),i=this._getCacheExpiration(s);W(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),d.add(t))}_getCacheExpiration(e){if(e===o())throw new u("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new Q(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxAgeSeconds:31536e3,maxEntries:30})]})),self.addEventListener("push",e=>{let t;t=e.data?e.data.text():"Push message no payload";let s={body:t,icon:"images/logo.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1}};e.waitUntil(self.registration.showNotification("Push Notification",s))})}]);