const op=()=>{};var Dc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ap=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],u=n[t++],h=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},Tl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,u=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,p=i>>2,y=(i&3)<<4|u>>4;let R=(u&15)<<2|d>>6,b=d&63;h||(b=64,a||(R=64)),r.push(t[p],t[y],t[R],t[b])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Il(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ap(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const y=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||u==null||d==null||y==null)throw new cp;const R=i<<2|u>>4;if(r.push(R),d!==64){const b=u<<4&240|d>>2;if(r.push(b),y!==64){const D=d<<6&192|y;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class cp extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const up=function(n){const e=Il(n);return Tl.encodeByteArray(e,!0)},ys=function(n){return up(n).replace(/\./g,"")},wl=function(n){try{return Tl.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp=()=>lp().__FIREBASE_DEFAULTS__,dp=()=>{if(typeof process>"u"||typeof Dc>"u")return;const n=Dc.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},fp=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&wl(n[1]);return e&&JSON.parse(e)},Ms=()=>{try{return op()||hp()||dp()||fp()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},vl=n=>Ms()?.emulatorHosts?.[n],pp=n=>{const e=vl(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Al=()=>Ms()?.config,Rl=n=>Ms()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gp(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ys(JSON.stringify(t)),ys(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _p(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Re())}function yp(){const n=Ms()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Ep(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ip(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Tp(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function wp(){const n=Re();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function vp(){return!yp()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Sl(){try{return typeof indexedDB=="object"}catch{return!1}}function Pl(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}function Ap(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rp="FirebaseError";class et extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Rp,Object.setPrototypeOf(this,et.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,tn.prototype.create)}}class tn{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Sp(i,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new et(s,u,r)}}function Sp(n,e){return n.replace(Pp,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Pp=/\{\$([^}]+)}/g;function bp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Kt(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Oc(i)&&Oc(a)){if(!Kt(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Oc(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function nr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function rr(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Cp(n,e){const t=new kp(n,e);return t.subscribe.bind(t)}class kp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Np(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Mi),s.error===void 0&&(s.error=Mi),s.complete===void 0&&(s.complete=Mi);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Np(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Mi(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vp=1e3,Dp=2,Op=14400*1e3,Lp=.5;function yv(n,e=Vp,t=Dp){const r=e*Math.pow(t,n),s=Math.round(Lp*r*(Math.random()-.5)*2);return Math.min(Op,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function bl(n){return(await fetch(n,{credentials:"include"})).ok}class je{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new mp;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fp(e))try{this.getOrInitializeService({instanceIdentifier:$t})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=$t){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$t){return this.instances.has(e)}getOptions(e=$t){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);r===u&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:xp(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$t){return this.component?this.component.multipleInstances?e:$t:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xp(n){return n===$t?void 0:n}function Fp(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Mp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(j||(j={}));const Bp={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},qp=j.INFO,jp={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},$p=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=jp[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Co{constructor(e){this.name=e,this._logLevel=qp,this._logHandler=$p,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Bp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}const Wp=(n,e)=>e.some(t=>n instanceof t);let Lc,Mc;function Hp(){return Lc||(Lc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function zp(){return Mc||(Mc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Cl=new WeakMap,no=new WeakMap,kl=new WeakMap,xi=new WeakMap,ko=new WeakMap;function Kp(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t(st(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Cl.set(t,n)}).catch(()=>{}),ko.set(e,n),e}function Gp(n){if(no.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});no.set(n,e)}let ro={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return no.get(n);if(e==="objectStoreNames")return n.objectStoreNames||kl.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return st(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Qp(n){ro=n(ro)}function Yp(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Fi(this),e,...t);return kl.set(r,e.sort?e.sort():[e]),st(r)}:zp().includes(n)?function(...e){return n.apply(Fi(this),e),st(Cl.get(this))}:function(...e){return st(n.apply(Fi(this),e))}}function Jp(n){return typeof n=="function"?Yp(n):(n instanceof IDBTransaction&&Gp(n),Wp(n,Hp())?new Proxy(n,ro):n)}function st(n){if(n instanceof IDBRequest)return Kp(n);if(xi.has(n))return xi.get(n);const e=Jp(n);return e!==n&&(xi.set(n,e),ko.set(e,n)),e}const Fi=n=>ko.get(n);function xs(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),u=st(a);return r&&a.addEventListener("upgradeneeded",h=>{r(st(a.result),h.oldVersion,h.newVersion,st(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{i&&h.addEventListener("close",()=>i()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}function Ui(n,{blocked:e}={}){const t=indexedDB.deleteDatabase(n);return e&&t.addEventListener("blocked",r=>e(r.oldVersion,r)),st(t).then(()=>{})}const Xp=["get","getKey","getAll","getAllKeys","count"],Zp=["put","add","delete","clear"],Bi=new Map;function xc(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Bi.get(e))return Bi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Zp.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Xp.includes(t)))return;const i=async function(a,...u){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),s&&h.done]))[0]};return Bi.set(e,i),i}Qp(n=>({...n,get:(e,t,r)=>xc(e,t)||n.get(e,t,r),has:(e,t)=>!!xc(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(tm(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function tm(n){return n.getComponent()?.type==="VERSION"}const so="@firebase/app",Fc="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot=new Co("@firebase/app"),nm="@firebase/app-compat",rm="@firebase/analytics-compat",sm="@firebase/analytics",im="@firebase/app-check-compat",om="@firebase/app-check",am="@firebase/auth",cm="@firebase/auth-compat",um="@firebase/database",lm="@firebase/data-connect",hm="@firebase/database-compat",dm="@firebase/functions",fm="@firebase/functions-compat",pm="@firebase/installations",mm="@firebase/installations-compat",gm="@firebase/messaging",_m="@firebase/messaging-compat",ym="@firebase/performance",Em="@firebase/performance-compat",Im="@firebase/remote-config",Tm="@firebase/remote-config-compat",wm="@firebase/storage",vm="@firebase/storage-compat",Am="@firebase/firestore",Rm="@firebase/ai",Sm="@firebase/firestore-compat",Pm="firebase",bm="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="[DEFAULT]",Cm={[so]:"fire-core",[nm]:"fire-core-compat",[sm]:"fire-analytics",[rm]:"fire-analytics-compat",[om]:"fire-app-check",[im]:"fire-app-check-compat",[am]:"fire-auth",[cm]:"fire-auth-compat",[um]:"fire-rtdb",[lm]:"fire-data-connect",[hm]:"fire-rtdb-compat",[dm]:"fire-fn",[fm]:"fire-fn-compat",[pm]:"fire-iid",[mm]:"fire-iid-compat",[gm]:"fire-fcm",[_m]:"fire-fcm-compat",[ym]:"fire-perf",[Em]:"fire-perf-compat",[Im]:"fire-rc",[Tm]:"fire-rc-compat",[wm]:"fire-gcs",[vm]:"fire-gcs-compat",[Am]:"fire-fst",[Sm]:"fire-fst-compat",[Rm]:"fire-vertex","fire-js":"fire-js",[Pm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es=new Map,km=new Map,oo=new Map;function Uc(n,e){try{n.container.addComponent(e)}catch(t){ot.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Je(n){const e=n.name;if(oo.has(e))return ot.debug(`There were multiple attempts to register component ${e}.`),!1;oo.set(e,n);for(const t of Es.values())Uc(t,n);for(const t of km.values())Uc(t,n);return!0}function Cn(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ue(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rt=new tn("app","Firebase",Nm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new je("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn=bm;function Dm(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:io,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw Rt.create("bad-app-name",{appName:String(s)});if(t||(t=Al()),!t)throw Rt.create("no-options");const i=Es.get(s);if(i){if(Kt(t,i.options)&&Kt(r,i.config))return i;throw Rt.create("duplicate-app",{appName:s})}const a=new Up(s);for(const h of oo.values())a.addComponent(h);const u=new Vm(t,r,a);return Es.set(s,u),u}function No(n=io){const e=Es.get(n);if(!e&&n===io&&Al())return Dm();if(!e)throw Rt.create("no-app",{appName:n});return e}function Me(n,e,t){let r=Cm[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ot.warn(a.join(" "));return}Je(new je(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Om="firebase-heartbeat-database",Lm=1,_r="firebase-heartbeat-store";let qi=null;function Nl(){return qi||(qi=xs(Om,Lm,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(_r)}catch(t){console.warn(t)}}}}).catch(n=>{throw Rt.create("idb-open",{originalErrorMessage:n.message})})),qi}async function Mm(n){try{const t=(await Nl()).transaction(_r),r=await t.objectStore(_r).get(Vl(n));return await t.done,r}catch(e){if(e instanceof et)ot.warn(e.message);else{const t=Rt.create("idb-get",{originalErrorMessage:e?.message});ot.warn(t.message)}}}async function Bc(n,e){try{const r=(await Nl()).transaction(_r,"readwrite");await r.objectStore(_r).put(e,Vl(n)),await r.done}catch(t){if(t instanceof et)ot.warn(t.message);else{const r=Rt.create("idb-set",{originalErrorMessage:t?.message});ot.warn(r.message)}}}function Vl(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xm=1024,Fm=30;class Um{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new qm(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=qc();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Fm){const s=jm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ot.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=qc(),{heartbeatsToSend:t,unsentEntries:r}=Bm(this._heartbeatsCache.heartbeats),s=ys(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ot.warn(e),""}}}function qc(){return new Date().toISOString().substring(0,10)}function Bm(n,e=xm){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),jc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),jc(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class qm{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Sl()?Pl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Mm(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bc(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function jc(n){return ys(JSON.stringify({version:2,heartbeats:n})).length}function jm(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $m(n){Je(new je("platform-logger",e=>new em(e),"PRIVATE")),Je(new je("heartbeat",e=>new Um(e),"PRIVATE")),Me(so,Fc,n),Me(so,Fc,"esm2020"),Me("fire-js","")}$m("");var Wm="firebase",Hm="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me(Wm,Hm,"app");function Dl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zm=Dl,Ol=new tn("auth","Firebase",Dl());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=new Co("@firebase/auth");function Km(n,...e){Is.logLevel<=j.WARN&&Is.warn(`Auth (${kn}): ${n}`,...e)}function as(n,...e){Is.logLevel<=j.ERROR&&Is.error(`Auth (${kn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xe(n,...e){throw Do(n,...e)}function Ve(n,...e){return Do(n,...e)}function Vo(n,e,t){const r={...zm(),[e]:t};return new tn("auth","Firebase",r).create(e,{appName:n.name})}function be(n){return Vo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Fs(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&xe(n,"argument-error"),Vo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Do(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ol.create(n,...e)}function k(n,e,...t){if(!n)throw Do(e,...t)}function nt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw as(e),new Error(e)}function at(n,e){n||nt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yr(){return typeof self<"u"&&self.location?.href||""}function Oo(){return $c()==="http:"||$c()==="https:"}function $c(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Oo()||Ip()||"connection"in navigator)?navigator.onLine:!0}function Qm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t){this.shortDelay=e,this.longDelay=t,at(t>e,"Short delay should be less than long delay!"),this.isMobile=_p()||Tp()}get(){return Gm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(n,e){at(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;nt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;nt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;nt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ym={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Xm=new Nr(3e4,6e4);function he(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function de(n,e,t,r,s={}){return Ml(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const u=bn({key:n.config.apiKey,...a}).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:h,...i};return Ep()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&kr(n.emulatorConfig.host)&&(d.credentials="include"),Ll.fetch()(await xl(n,n.config.apiHost,t,u),d)})}async function Ml(n,e,t){n._canInitEmulator=!1;const r={...Ym,...e};try{const s=new eg(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw sr(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const u=i.ok?a.errorMessage:a.error.message,[h,d]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw sr(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw sr(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw sr(n,"user-disabled",a);const p=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Vo(n,p,d);xe(n,p)}}catch(s){if(s instanceof et)throw s;xe(n,"network-request-failed",{message:String(s)})}}async function ht(n,e,t,r,s={}){const i=await de(n,e,t,r,s);return"mfaPendingCredential"in i&&xe(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function xl(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Lo(n.config,s):`${n.config.apiScheme}://${s}`;return Jm.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function Zm(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class eg{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Ve(this.auth,"network-request-failed")),Xm.get())})}}function sr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Ve(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wc(n){return n!==void 0&&n.getResponse!==void 0}function Hc(n){return n!==void 0&&n.enterprise!==void 0}class Fl{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Zm(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tg(n){return(await de(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Ul(n,e){return de(n,"GET","/v2/recaptchaConfig",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ng(n,e){return de(n,"POST","/v1/accounts:delete",e)}async function rg(n,e){return de(n,"POST","/v1/accounts:update",e)}async function Ts(n,e){return de(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function sg(n,e=!1){const t=q(n),r=await t.getIdToken(e),s=Us(r);k(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:r,authTime:ur(ji(s.auth_time)),issuedAtTime:ur(ji(s.iat)),expirationTime:ur(ji(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function ji(n){return Number(n)*1e3}function Us(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return as("JWT malformed, contained fewer than 3 sections"),null;try{const s=wl(t);return s?JSON.parse(s):(as("Failed to decode base64 JWT payload"),null)}catch(s){return as("Caught error parsing JWT payload as JSON",s?.toString()),null}}function zc(n){const e=Us(n);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gt(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof et&&ig(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ig({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ur(this.lastLoginAt),this.creationTime=ur(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Er(n){const e=n.auth,t=await n.getIdToken(),r=await Gt(n,Ts(e,{idToken:t}));k(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?Bl(s.providerUserInfo):[],a=cg(n.providerData,i),u=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!a?.length,d=u?h:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ao(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function ag(n){const e=q(n);await Er(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function cg(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Bl(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ug(n,e){const t=await Ml(n,{},async()=>{const r=bn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await xl(n,s,"/v1/token",`key=${i}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const h={method:"POST",headers:u,body:r};return n.emulatorConfig&&kr(n.emulatorConfig.host)&&(h.credentials="include"),Ll.fetch()(a,h)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lg(n,e){return de(n,"POST","/v2/accounts:revokeToken",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){k(e.length!==0,"internal-error");const t=zc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await ug(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new mn;return r&&(k(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(k(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(k(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new mn,this.toJSON())}_performRefresh(){return nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yt(n,e){k(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ue{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new og(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ao(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Gt(this,this.stsTokenManager.getToken(this.auth,e));return k(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return sg(this,e)}reload(){return ag(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ue({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Er(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ue(this.auth.app))return Promise.reject(be(this.auth));const e=await this.getIdToken();return await Gt(this,ng(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,h=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:y,emailVerified:R,isAnonymous:b,providerData:D,stsTokenManager:M}=t;k(y&&M,e,"internal-error");const O=mn.fromJSON(this.name,M);k(typeof y=="string",e,"internal-error"),yt(r,e.name),yt(s,e.name),k(typeof R=="boolean",e,"internal-error"),k(typeof b=="boolean",e,"internal-error"),yt(i,e.name),yt(a,e.name),yt(u,e.name),yt(h,e.name),yt(d,e.name),yt(p,e.name);const z=new Ue({uid:y,auth:e,email:s,emailVerified:R,displayName:r,isAnonymous:b,photoURL:a,phoneNumber:i,tenantId:u,stsTokenManager:O,createdAt:d,lastLoginAt:p});return D&&Array.isArray(D)&&(z.providerData=D.map(G=>({...G}))),h&&(z._redirectEventId=h),z}static async _fromIdTokenResponse(e,t,r=!1){const s=new mn;s.updateFromServerResponse(t);const i=new Ue({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Er(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];k(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Bl(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,u=new mn;u.updateFromIdToken(r);const h=new Ue({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new ao(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(h,d),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kc=new Map;function rt(n){at(n instanceof Function,"Expected a class definition");let e=Kc.get(n);return e?(at(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Kc.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ql.type="NONE";const Gc=ql;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cs(n,e,t){return`firebase:${n}:${e}:${t}`}class gn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=cs(this.userKey,s.apiKey,i),this.fullPersistenceKey=cs("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ts(this.auth,{idToken:e}).catch(()=>{});return t?Ue._fromGetAccountInfoResponse(this.auth,t,e):null}return Ue._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new gn(rt(Gc),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let i=s[0]||rt(Gc);const a=cs(r,e.config.apiKey,e.name);let u=null;for(const d of t)try{const p=await d._get(a);if(p){let y;if(typeof p=="string"){const R=await Ts(e,{idToken:p}).catch(()=>{});if(!R)break;y=await Ue._fromGetAccountInfoResponse(e,R,p)}else y=Ue._fromJSON(e,p);d!==i&&(u=y),i=d;break}}catch{}const h=s.filter(d=>d._shouldAllowMigration);return!i._shouldAllowMigration||!h.length?new gn(i,e,r):(i=h[0],u&&await i._set(a,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==i)try{await d._remove(a)}catch{}})),new gn(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Hl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(jl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Kl(e))return"Blackberry";if(Gl(e))return"Webos";if($l(e))return"Safari";if((e.includes("chrome/")||Wl(e))&&!e.includes("edge/"))return"Chrome";if(zl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function jl(n=Re()){return/firefox\//i.test(n)}function $l(n=Re()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Wl(n=Re()){return/crios\//i.test(n)}function Hl(n=Re()){return/iemobile/i.test(n)}function zl(n=Re()){return/android/i.test(n)}function Kl(n=Re()){return/blackberry/i.test(n)}function Gl(n=Re()){return/webos/i.test(n)}function Mo(n=Re()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function hg(n=Re()){return Mo(n)&&!!window.navigator?.standalone}function dg(){return wp()&&document.documentMode===10}function Ql(n=Re()){return Mo(n)||zl(n)||Gl(n)||Kl(n)||/windows phone/i.test(n)||Hl(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yl(n,e=[]){let t;switch(n){case"Browser":t=Qc(Re());break;case"Worker":t=`${Qc(Re())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${kn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,u)=>{try{const h=e(i);a(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pg(n,e={}){return de(n,"GET","/v2/passwordPolicy",he(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mg=6;class gg{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??mg,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Yc(this),this.idTokenSubscription=new Yc(this),this.beforeStateQueue=new fg(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ol,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=rt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await gn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ts(this,{idToken:e}),r=await Ue._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ue(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=r?._redirectEventId,u=await this.tryRedirectSignIn(e);(!i||i===a)&&u?.user&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Er(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Qm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ue(this.app))return Promise.reject(be(this));const t=e?q(e):null;return t&&k(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ue(this.app)?Promise.reject(be(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ue(this.app)?Promise.reject(be(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(rt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await pg(this),t=new gg(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new tn("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await lg(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&rt(e)||this._popupRedirectResolver;k(t,this,"argument-error"),this.redirectPersistenceManager=await gn.create(this,[rt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(u,this,"internal-error"),u.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,s);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Yl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(ue(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Km(`Error while retrieving App Check token: ${e.error}`),e?.token}}function me(n){return q(n)}class Yc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Cp(t=>this.observer=t)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function yg(n){Vr=n}function xo(n){return Vr.loadJS(n)}function Eg(){return Vr.recaptchaV2Script}function Ig(){return Vr.recaptchaEnterpriseScript}function Tg(){return Vr.gapiScript}function Jl(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg=500,vg=6e4,ts=1e12;class Ag{constructor(e){this.auth=e,this.counter=ts,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new Pg(e,this.auth.name,t||{})),this.counter++,r}reset(e){const t=e||ts;this._widgets.get(t)?.delete(),this._widgets.delete(t)}getResponse(e){const t=e||ts;return this._widgets.get(t)?.getResponse()||""}async execute(e){const t=e||ts;return this._widgets.get(t)?.execute(),""}}class Rg{constructor(){this.enterprise=new Sg}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Sg{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Pg{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;k(s,"argument-error",{appName:t}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=bg(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},vg)},wg))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function bg(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const Cg="recaptcha-enterprise",lr="NO_RECAPTCHA";class Xl{constructor(e){this.type=Cg,this.auth=me(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,u)=>{Ul(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(h=>{if(h.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const d=new Fl(h);return i.tenantId==null?i._agentRecaptchaConfig=d:i._tenantRecaptchaConfigs[i.tenantId]=d,a(d.siteKey)}}).catch(h=>{u(h)})})}function s(i,a,u){const h=window.grecaptcha;Hc(h)?h.enterprise.ready(()=>{h.enterprise.execute(i,{action:e}).then(d=>{a(d)}).catch(()=>{a(lr)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Rg().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(u=>{if(!t&&Hc(window.grecaptcha))s(u,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let h=Ig();h.length!==0&&(h+=u),xo(h).then(()=>{s(u,i,a)}).catch(d=>{a(d)})}}).catch(u=>{a(u)})})}}async function er(n,e,t,r=!1,s=!1){const i=new Xl(n);let a;if(s)a=lr;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const u={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const h=u.phoneEnrollmentInfo.phoneNumber,d=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:h,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const h=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function St(n,e,t,r,s){if(s==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await er(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await er(n,e,t,t==="getOobCode");return r(n,a)}else return Promise.reject(i)});else if(s==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){const i=await er(n,e,t);return r(n,i).catch(async a=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(a.code==="auth/missing-recaptcha-token"||a.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const u=await er(n,e,t,!1,!0);return r(n,u)}return Promise.reject(a)})}else{const i=await er(n,e,t,!1,!0);return r(n,i)}else return Promise.reject(s+" provider is not supported.")}async function kg(n){const e=me(n),t=await Ul(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Fl(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Xl(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ng(n,e){const t=Cn(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Kt(i,e??{}))return s;xe(s,"already-initialized")}return t.initialize({options:e})}function Vg(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(rt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Dg(n,e,t){const r=me(n);k(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Zl(e),{host:a,port:u}=Og(e),h=u===null?"":`:${u}`,d={url:`${i}//${a}${h}/`},p=Object.freeze({host:a,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){k(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),k(Kt(d,r.config.emulator)&&Kt(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,kr(a)?bl(`${i}//${a}${h}`):Lg()}function Zl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Og(n){const e=Zl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Jc(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Jc(a)}}}function Jc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Lg(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return nt("not implemented")}_getIdTokenResponse(e){return nt("not implemented")}_linkToIdToken(e,t){return nt("not implemented")}_getReauthenticationResolver(e){return nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mg(n,e){return de(n,"POST","/v1/accounts:resetPassword",he(n,e))}async function xg(n,e){return de(n,"POST","/v1/accounts:update",e)}async function Fg(n,e){return de(n,"POST","/v1/accounts:signUp",e)}async function Ug(n,e){return de(n,"POST","/v1/accounts:update",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bg(n,e){return ht(n,"POST","/v1/accounts:signInWithPassword",he(n,e))}async function qs(n,e){return de(n,"POST","/v1/accounts:sendOobCode",he(n,e))}async function qg(n,e){return qs(n,e)}async function jg(n,e){return qs(n,e)}async function $g(n,e){return qs(n,e)}async function Wg(n,e){return qs(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hg(n,e){return ht(n,"POST","/v1/accounts:signInWithEmailLink",he(n,e))}async function zg(n,e){return ht(n,"POST","/v1/accounts:signInWithEmailLink",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir extends Bs{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Ir(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Ir(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return St(e,t,"signInWithPassword",Bg,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Hg(e,{email:this._email,oobCode:this._password});default:xe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return St(e,r,"signUpPassword",Fg,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return zg(e,{idToken:t,email:this._email,oobCode:this._password});default:xe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _n(n,e){return ht(n,"POST","/v1/accounts:signInWithIdp",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg="http://localhost";class ct extends Bs{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ct(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):xe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new ct(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return _n(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,_n(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,_n(e,t)}buildRequest(){const e={requestUri:Kg,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=bn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xc(n,e){return de(n,"POST","/v1/accounts:sendVerificationCode",he(n,e))}async function Gg(n,e){return ht(n,"POST","/v1/accounts:signInWithPhoneNumber",he(n,e))}async function Qg(n,e){const t=await ht(n,"POST","/v1/accounts:signInWithPhoneNumber",he(n,e));if(t.temporaryProof)throw sr(n,"account-exists-with-different-credential",t);return t}const Yg={USER_NOT_FOUND:"user-not-found"};async function Jg(n,e){const t={...e,operation:"REAUTH"};return ht(n,"POST","/v1/accounts:signInWithPhoneNumber",he(n,t),Yg)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr extends Bs{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new hr({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new hr({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Gg(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Qg(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Jg(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i}=e;return!r&&!t&&!s&&!i?null:new hr({verificationId:t,verificationCode:r,phoneNumber:s,temporaryProof:i})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xg(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Zg(n){const e=nr(rr(n)).link,t=e?nr(rr(e)).deep_link_id:null,r=nr(rr(n)).deep_link_id;return(r?nr(rr(r)).link:null)||r||t||e||n}class js{constructor(e){const t=nr(rr(e)),r=t.apiKey??null,s=t.oobCode??null,i=Xg(t.mode??null);k(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Zg(e);try{return new js(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(){this.providerId=nn.PROVIDER_ID}static credential(e,t){return Ir._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=js.parseLink(t);return k(r,"argument-error"),Ir._fromEmailAndCode(e,r.code,r.tenantId)}}nn.PROVIDER_ID="password";nn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";nn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn extends Nn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class us extends Vn{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return k("providerId"in t&&"signInMethod"in t,"argument-error"),ct._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return k(e.idToken||e.accessToken,"argument-error"),ct._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return us.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return us.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:s,pendingToken:i,nonce:a,providerId:u}=e;if(!r&&!s&&!t&&!i||!u)return null;try{return new us(u)._credential({idToken:t,accessToken:r,nonce:a,pendingToken:i})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et extends Vn{constructor(){super("facebook.com")}static credential(e){return ct._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Et.credential(e.oauthAccessToken)}catch{return null}}}Et.FACEBOOK_SIGN_IN_METHOD="facebook.com";Et.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends Vn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ct._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return It.credential(t,r)}catch{return null}}}It.GOOGLE_SIGN_IN_METHOD="google.com";It.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends Vn{constructor(){super("github.com")}static credential(e){return ct._fromParams({providerId:Tt.PROVIDER_ID,signInMethod:Tt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Tt.credentialFromTaggedObject(e)}static credentialFromError(e){return Tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Tt.credential(e.oauthAccessToken)}catch{return null}}}Tt.GITHUB_SIGN_IN_METHOD="github.com";Tt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt extends Vn{constructor(){super("twitter.com")}static credential(e,t){return ct._fromParams({providerId:wt.PROVIDER_ID,signInMethod:wt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return wt.credentialFromTaggedObject(e)}static credentialFromError(e){return wt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return wt.credential(t,r)}catch{return null}}}wt.TWITTER_SIGN_IN_METHOD="twitter.com";wt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eh(n,e){return ht(n,"POST","/v1/accounts:signUp",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await Ue._fromIdTokenResponse(e,r,s),a=Zc(r);return new Xe({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Zc(r);return new Xe({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Zc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ev(n){if(ue(n.app))return Promise.reject(be(n));const e=me(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new Xe({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await eh(e,{returnSecureToken:!0}),r=await Xe._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws extends et{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ws.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new ws(e,t,r,s)}}function th(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ws._fromErrorAndOperation(n,i,e,r):i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nh(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iv(n,e){const t=q(n);await $s(!0,t,e);const{providerUserInfo:r}=await rg(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),s=nh(r||[]);return t.providerData=t.providerData.filter(i=>s.has(i.providerId)),s.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function rh(n,e,t=!1){const r=await Gt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Xe._forOperation(n,"link",r)}async function $s(n,e,t){await Er(e);const r=nh(e.providerData),s=n===!1?"provider-already-linked":"no-such-provider";k(r.has(t)===n,e.auth,s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e_(n,e,t=!1){const{auth:r}=n;if(ue(r.app))return Promise.reject(be(r));const s="reauthenticate";try{const i=await Gt(n,th(r,s,e,n),t);k(i.idToken,r,"internal-error");const a=Us(i.idToken);k(a,r,"internal-error");const{sub:u}=a;return k(n.uid===u,r,"user-mismatch"),Xe._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&xe(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sh(n,e,t=!1){if(ue(n.app))return Promise.reject(be(n));const r="signIn",s=await th(n,r,e),i=await Xe._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Fo(n,e){return sh(me(n),e)}async function t_(n,e){const t=q(n);return await $s(!1,t,e.providerId),rh(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function n_(n,e){return ht(n,"POST","/v1/accounts:signInWithCustomToken",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tv(n,e){if(ue(n.app))return Promise.reject(be(n));const t=me(n),r=await n_(t,{token:e,returnSecureToken:!0}),s=await Xe._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(n,e,t){k(t.url?.length>0,n,"invalid-continue-uri"),k(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),k(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(k(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(k(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uo(n){const e=me(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function wv(n,e,t){const r=me(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Ws(r,s,t),await St(r,s,"getOobCode",jg,"EMAIL_PASSWORD_PROVIDER")}async function vv(n,e,t){await Mg(q(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Uo(n),r})}async function Av(n,e){await Ug(q(n),{oobCode:e})}async function Rv(n,e,t){if(ue(n.app))return Promise.reject(be(n));const r=me(n),a=await St(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",eh,"EMAIL_PASSWORD_PROVIDER").catch(h=>{throw h.code==="auth/password-does-not-meet-requirements"&&Uo(n),h}),u=await Xe._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(u.user),u}function Sv(n,e,t){return ue(n.app)?Promise.reject(be(n)):Fo(q(n),nn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Uo(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pv(n,e,t){const r=me(n),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function i(a,u){k(u.handleCodeInApp,r,"argument-error"),u&&Ws(r,a,u)}i(s,t),await St(r,s,"getOobCode",$g,"EMAIL_PASSWORD_PROVIDER")}function bv(n,e){return js.parseLink(e)?.operation==="EMAIL_SIGNIN"}async function Cv(n,e,t){if(ue(n.app))return Promise.reject(be(n));const r=q(n),s=nn.credentialWithLink(e,t||yr());return k(s._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),Fo(r,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r_(n,e){return de(n,"POST","/v1/accounts:createAuthUri",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kv(n,e){const t=Oo()?yr():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:s}=await r_(q(n),r);return s||[]}async function Nv(n,e){const t=q(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&Ws(t.auth,s,e);const{email:i}=await qg(t.auth,s);i!==n.email&&await n.reload()}async function Vv(n,e,t){const r=q(n),i={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&Ws(r.auth,i,t);const{email:a}=await Wg(r.auth,i);a!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function s_(n,e){return de(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dv(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=q(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Gt(r,s_(r.auth,i));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const u=r.providerData.find(({providerId:h})=>h==="password");u&&(u.displayName=r.displayName,u.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function Ov(n,e){const t=q(n);return ue(t.auth.app)?Promise.reject(be(t.auth)):ih(t,e,null)}function Lv(n,e){return ih(q(n),null,e)}async function ih(n,e,t){const{auth:r}=n,i={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(i.email=e),t&&(i.password=t);const a=await Gt(n,xg(r,i));await n._updateTokensIfNecessary(a,!0)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function i_(n){if(!n)return null;const{providerId:e}=n,t=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},r=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&n?.idToken){const s=Us(n.idToken)?.firebase?.sign_in_provider;if(s){const i=s!=="anonymous"&&s!=="custom"?s:null;return new yn(r,i)}}if(!e)return null;switch(e){case"facebook.com":return new o_(r,t);case"github.com":return new a_(r,t);case"google.com":return new c_(r,t);case"twitter.com":return new u_(r,t,n.screenName||null);case"custom":case"anonymous":return new yn(r,null);default:return new yn(r,e,t)}}class yn{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class oh extends yn{constructor(e,t,r,s){super(e,t,r),this.username=s}}class o_ extends yn{constructor(e,t){super(e,"facebook.com",t)}}class a_ extends oh{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class c_ extends yn{constructor(e,t){super(e,"google.com",t)}}class u_ extends oh{constructor(e,t,r){super(e,"twitter.com",t,r)}}function Mv(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:i_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xv(n,e){return q(n).setPersistence(e)}function l_(n,e,t,r){return q(n).onIdTokenChanged(e,t,r)}function h_(n,e,t){return q(n).beforeAuthStateChanged(e,t)}function Fv(n,e,t,r){return q(n).onAuthStateChanged(e,t,r)}function Uv(n){return q(n).signOut()}function Bv(n,e){return me(n).revokeAccessToken(e)}async function qv(n){return q(n).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(n,e){return de(n,"POST","/v2/accounts/mfaEnrollment:start",he(n,e))}const vs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(vs,"1"),this.storage.removeItem(vs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=1e3,f_=10;class ch extends ah{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ql(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,h)=>{this.notifyListeners(a,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);dg()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,f_):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},d_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ch.type="LOCAL";const p_=ch;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh extends ah{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}uh.type="SESSION";const lh=uh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Hs(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(a).map(async d=>d(t.origin,i)),h=await m_(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Hs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((u,h)=>{const d=zs("",20);s.port1.start();const p=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(y){const R=y;if(R.data.eventId===d)switch(R.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(R.data.response);break;default:clearTimeout(p),clearTimeout(i),h(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(){return window}function __(n){ie().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(){return typeof ie().WorkerGlobalScope<"u"&&typeof ie().importScripts=="function"}async function y_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function E_(){return navigator?.serviceWorker?.controller||null}function I_(){return Bo()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh="firebaseLocalStorageDb",T_=1,As="firebaseLocalStorage",dh="fbase_key";class Dr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ks(n,e){return n.transaction([As],e?"readwrite":"readonly").objectStore(As)}function w_(){const n=indexedDB.deleteDatabase(hh);return new Dr(n).toPromise()}function co(){const n=indexedDB.open(hh,T_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(As,{keyPath:dh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(As)?e(r):(r.close(),await w_(),e(await co()))})})}async function tu(n,e,t){const r=Ks(n,!0).put({[dh]:e,value:t});return new Dr(r).toPromise()}async function v_(n,e){const t=Ks(n,!1).get(e),r=await new Dr(t).toPromise();return r===void 0?null:r.value}function nu(n,e){const t=Ks(n,!0).delete(e);return new Dr(t).toPromise()}const A_=800,R_=3;class fh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await co(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>R_)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bo()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hs._getInstance(I_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await y_(),!this.activeServiceWorker)return;this.sender=new g_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||E_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await co();return await tu(e,vs,"1"),await nu(e,vs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>tu(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>v_(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>nu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ks(s,!1).getAll();return new Dr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),A_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}fh.type="LOCAL";const S_=fh;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ru(n,e){return de(n,"POST","/v2/accounts/mfaSignIn:start",he(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $i=Jl("rcb"),P_=new Nr(3e4,6e4);class b_{constructor(){this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!ie().grecaptcha?.render}load(e,t=""){return k(C_(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Wc(ie().grecaptcha)?Promise.resolve(ie().grecaptcha):new Promise((r,s)=>{const i=ie().setTimeout(()=>{s(Ve(e,"network-request-failed"))},P_.get());ie()[$i]=()=>{ie().clearTimeout(i),delete ie()[$i];const u=ie().grecaptcha;if(!u||!Wc(u)){s(Ve(e,"internal-error"));return}const h=u.render;u.render=(d,p)=>{const y=h(d,p);return this.counter++,y},this.hostLanguage=t,r(u)};const a=`${Eg()}?${bn({onload:$i,render:"explicit",hl:t})}`;xo(a).catch(()=>{clearTimeout(i),s(Ve(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!ie().grecaptcha?.render&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function C_(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class k_{async load(e){return new Ag(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr="recaptcha",N_={theme:"light",type:"image"};class jv{constructor(e,t,r={...N_}){this.parameters=r,this.type=dr,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=me(e),this.isInvisible=this.parameters.size==="invisible",k(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof t=="string"?document.getElementById(t):t;k(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new k_:new b_,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(s=>{const i=a=>{a&&(this.tokenChangeListeners.delete(i),s(a))};this.tokenChangeListeners.add(i),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){k(!this.parameters.sitekey,this.auth,"argument-error"),k(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),k(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=ie()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){k(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){k(Oo()&&!Bo(),this.auth,"internal-error"),await V_(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await tg(this.auth);k(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return k(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function V_(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=hr._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function $v(n,e,t){if(ue(n.app))return Promise.reject(be(n));const r=me(n),s=await mh(r,e,q(t));return new ph(s,i=>Fo(r,i))}async function Wv(n,e,t){const r=q(n);await $s(!1,r,"phone");const s=await mh(r.auth,e,q(t));return new ph(s,i=>t_(r,i))}async function mh(n,e,t){if(!n._getRecaptchaConfig())try{await kg(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){const s=r.session;if("phoneNumber"in r){k(s.type==="enroll",n,"internal-error");const i={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await St(n,i,"mfaSmsEnrollment",async(d,p)=>{if(p.phoneEnrollmentInfo.captchaResponse===lr){k(t?.type===dr,d,"argument-error");const y=await Wi(d,p,t);return eu(d,y)}return eu(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneSessionInfo.sessionInfo}else{k(s.type==="signin",n,"internal-error");const i=r.multiFactorHint?.uid||r.multiFactorUid;k(i,n,"missing-multi-factor-info");const a={mfaPendingCredential:s.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await St(n,a,"mfaSmsSignIn",async(p,y)=>{if(y.phoneSignInInfo.captchaResponse===lr){k(t?.type===dr,p,"argument-error");const R=await Wi(p,y,t);return ru(p,R)}return ru(p,y)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await St(n,s,"sendVerificationCode",async(h,d)=>{if(d.captchaResponse===lr){k(t?.type===dr,h,"argument-error");const p=await Wi(h,d,t);return Xc(h,p)}return Xc(h,d)},"PHONE_PROVIDER").catch(h=>Promise.reject(h))).sessionInfo}}finally{t?._reset()}}async function Wi(n,e,t){k(t.type===dr,n,"argument-error");const r=await t.verify();k(typeof r=="string",n,"argument-error");const s={...e};if("phoneEnrollmentInfo"in s){const i=s.phoneEnrollmentInfo.phoneNumber,a=s.phoneEnrollmentInfo.captchaResponse,u=s.phoneEnrollmentInfo.clientType,h=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:i,recaptchaToken:r,captchaResponse:a,clientType:u,recaptchaVersion:h}}),s}else if("phoneSignInInfo"in s){const i=s.phoneSignInInfo.captchaResponse,a=s.phoneSignInInfo.clientType,u=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:i,clientType:a,recaptchaVersion:u}}),s}else return Object.assign(s,{recaptchaToken:r}),s}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(n,e){return e?rt(e):(k(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo extends Bs{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return _n(e,this._buildIdpRequest())}_linkToIdToken(e,t){return _n(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return _n(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function D_(n){return sh(n.auth,new qo(n),n.bypassAuthState)}function O_(n){const{auth:e,user:t}=n;return k(t,e,"internal-error"),e_(t,new qo(n),n.bypassAuthState)}async function L_(n){const{auth:e,user:t}=n;return k(t,e,"internal-error"),rh(t,new qo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:u}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return D_;case"linkViaPopup":case"linkViaRedirect":return L_;case"reauthViaPopup":case"reauthViaRedirect":return O_;default:xe(this.auth,"internal-error")}}resolve(e){at(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){at(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_=new Nr(2e3,1e4);async function Hv(n,e,t){if(ue(n.app))return Promise.reject(Ve(n,"operation-not-supported-in-this-environment"));const r=me(n);Fs(n,e,Nn);const s=Or(r,t);return new vt(r,"signInViaPopup",e,s).executeNotNull()}async function zv(n,e,t){const r=q(n);Fs(r.auth,e,Nn);const s=Or(r.auth,t);return new vt(r.auth,"linkViaPopup",e,s,r).executeNotNull()}class vt extends gh{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,vt.currentPopupAction&&vt.currentPopupAction.cancel(),vt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){at(this.filter.length===1,"Popup operations only handle one event");const e=zs();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ve(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ve(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,vt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ve(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,M_.get())};e()}}vt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_="pendingRedirect",ls=new Map;class F_ extends gh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ls.get(this.auth._key());if(!e){try{const r=await U_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ls.set(this.auth._key(),e)}return this.bypassAuthState||ls.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function U_(n,e){const t=Eh(e),r=yh(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}async function _h(n,e){return yh(n)._set(Eh(e),"true")}function B_(n,e){ls.set(n._key(),e)}function yh(n){return rt(n._redirectPersistence)}function Eh(n){return cs(x_,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kv(n,e,t){return q_(n,e,t)}async function q_(n,e,t){if(ue(n.app))return Promise.reject(be(n));const r=me(n);Fs(n,e,Nn),await r._initializationPromise;const s=Or(r,t);return await _h(s,r),s._openRedirect(r,e,"signInViaRedirect")}function Gv(n,e,t){return j_(n,e,t)}async function j_(n,e,t){const r=q(n);Fs(r.auth,e,Nn),await r.auth._initializationPromise;const s=Or(r.auth,t);await $s(!1,r,e.providerId),await _h(s,r.auth);const i=await $_(r);return s._openRedirect(r.auth,e,"linkViaRedirect",i)}async function Qv(n,e){return await me(n)._initializationPromise,Ih(n,e,!1)}async function Ih(n,e,t=!1){if(ue(n.app))return Promise.reject(be(n));const r=me(n),s=Or(r,e),a=await new F_(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}async function $_(n){const e=zs(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_=600*1e3;class H_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!z_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Th(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Ve(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=W_&&this.cachedEventUids.clear(),this.cachedEventUids.has(su(e))}saveEventToCache(e){this.cachedEventUids.add(su(e)),this.lastProcessedEventTime=Date.now()}}function su(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Th({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function z_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Th(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K_(n,e={}){return de(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Q_=/^https?/;async function Y_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await K_(n);for(const t of e)try{if(J_(t))return}catch{}xe(n,"unauthorized-domain")}function J_(n){const e=yr(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Q_.test(t))return!1;if(G_.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X_=new Nr(3e4,6e4);function iu(){const n=ie().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Z_(n){return new Promise((e,t)=>{function r(){iu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{iu(),t(Ve(n,"network-request-failed"))},timeout:X_.get()})}if(ie().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ie().gapi?.load)r();else{const s=Jl("iframefcb");return ie()[s]=()=>{gapi.load?r():t(Ve(n,"network-request-failed"))},xo(`${Tg()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw hs=null,e})}let hs=null;function ey(n){return hs=hs||Z_(n),hs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ty=new Nr(5e3,15e3),ny="__/auth/iframe",ry="emulator/auth/iframe",sy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},iy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function oy(n){const e=n.config;k(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Lo(e,ry):`https://${n.config.authDomain}/${ny}`,r={apiKey:e.apiKey,appName:n.name,v:kn},s=iy.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${bn(r).slice(1)}`}async function ay(n){const e=await ey(n),t=ie().gapi;return k(t,n,"internal-error"),e.open({where:document.body,url:oy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:sy,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Ve(n,"network-request-failed"),u=ie().setTimeout(()=>{i(a)},ty.get());function h(){ie().clearTimeout(u),s(r)}r.ping(h).then(h,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},uy=500,ly=600,hy="_blank",dy="http://localhost";class ou{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function fy(n,e,t,r=uy,s=ly){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h={...cy,width:r.toString(),height:s.toString(),top:i,left:a},d=Re().toLowerCase();t&&(u=Wl(d)?hy:t),jl(d)&&(e=e||dy,h.scrollbars="yes");const p=Object.entries(h).reduce((R,[b,D])=>`${R}${b}=${D},`,"");if(hg(d)&&u!=="_self")return py(e||"",u),new ou(null);const y=window.open(e||"",u,p);k(y,n,"popup-blocked");try{y.focus()}catch{}return new ou(y)}function py(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my="__/auth/handler",gy="emulator/auth/handler",_y=encodeURIComponent("fac");async function au(n,e,t,r,s,i){k(n.config.authDomain,n,"auth-domain-config-required"),k(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:kn,eventId:s};if(e instanceof Nn){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",bp(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,y]of Object.entries({}))a[p]=y}if(e instanceof Vn){const p=e.getScopes().filter(y=>y!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const u=a;for(const p of Object.keys(u))u[p]===void 0&&delete u[p];const h=await n._getAppCheckToken(),d=h?`#${_y}=${encodeURIComponent(h)}`:"";return`${yy(n)}?${bn(u).slice(1)}${d}`}function yy({config:n}){return n.emulator?Lo(n,gy):`https://${n.authDomain}/${my}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hi="webStorageSupport";class Ey{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=lh,this._completeRedirectFn=Ih,this._overrideRedirectResult=B_}async _openPopup(e,t,r,s){at(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await au(e,t,r,yr(),s);return fy(e,i,zs())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await au(e,t,r,yr(),s);return __(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(at(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await ay(e),r=new H_(e);return t.register("authEvent",s=>(k(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Hi,{type:Hi},s=>{const i=s?.[0]?.[Hi];i!==void 0&&t(!!i),xe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Y_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ql()||$l()||Mo()}}const Iy=Ey;var cu="@firebase/auth",uu="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wy(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function vy(n){Je(new je("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;k(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Yl(n)},d=new _g(r,s,i,h);return Vg(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Je(new je("auth-internal",e=>{const t=me(e.getProvider("auth").getImmediate());return(r=>new Ty(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Me(cu,uu,wy(n)),Me(cu,uu,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay=300,Ry=Rl("authIdTokenMaxAge")||Ay;let lu=null;const Sy=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Ry)return;const s=t?.token;lu!==s&&(lu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Yv(n=No()){const e=Cn(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ng(n,{popupRedirectResolver:Iy,persistence:[S_,p_,lh]}),r=Rl("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=Sy(i.toString());h_(t,a,()=>a(t.currentUser)),l_(t,u=>a(u))}}const s=vl("auth");return s&&Dg(t,`http://${s}`),t}function Py(){return document.getElementsByTagName("head")?.[0]??document}yg({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Ve("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",Py().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});vy("Browser");var hu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pt,wh;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,m){function _(){}_.prototype=m.prototype,I.F=m.prototype,I.prototype=new _,I.prototype.constructor=I,I.D=function(T,E,v){for(var g=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)g[ke-2]=arguments[ke];return m.prototype[E].apply(T,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,m,_){_||(_=0);const T=Array(16);if(typeof m=="string")for(var E=0;E<16;++E)T[E]=m.charCodeAt(_++)|m.charCodeAt(_++)<<8|m.charCodeAt(_++)<<16|m.charCodeAt(_++)<<24;else for(E=0;E<16;++E)T[E]=m[_++]|m[_++]<<8|m[_++]<<16|m[_++]<<24;m=I.g[0],_=I.g[1],E=I.g[2];let v=I.g[3],g;g=m+(v^_&(E^v))+T[0]+3614090360&4294967295,m=_+(g<<7&4294967295|g>>>25),g=v+(E^m&(_^E))+T[1]+3905402710&4294967295,v=m+(g<<12&4294967295|g>>>20),g=E+(_^v&(m^_))+T[2]+606105819&4294967295,E=v+(g<<17&4294967295|g>>>15),g=_+(m^E&(v^m))+T[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(v^_&(E^v))+T[4]+4118548399&4294967295,m=_+(g<<7&4294967295|g>>>25),g=v+(E^m&(_^E))+T[5]+1200080426&4294967295,v=m+(g<<12&4294967295|g>>>20),g=E+(_^v&(m^_))+T[6]+2821735955&4294967295,E=v+(g<<17&4294967295|g>>>15),g=_+(m^E&(v^m))+T[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(v^_&(E^v))+T[8]+1770035416&4294967295,m=_+(g<<7&4294967295|g>>>25),g=v+(E^m&(_^E))+T[9]+2336552879&4294967295,v=m+(g<<12&4294967295|g>>>20),g=E+(_^v&(m^_))+T[10]+4294925233&4294967295,E=v+(g<<17&4294967295|g>>>15),g=_+(m^E&(v^m))+T[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(v^_&(E^v))+T[12]+1804603682&4294967295,m=_+(g<<7&4294967295|g>>>25),g=v+(E^m&(_^E))+T[13]+4254626195&4294967295,v=m+(g<<12&4294967295|g>>>20),g=E+(_^v&(m^_))+T[14]+2792965006&4294967295,E=v+(g<<17&4294967295|g>>>15),g=_+(m^E&(v^m))+T[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=m+(E^v&(_^E))+T[1]+4129170786&4294967295,m=_+(g<<5&4294967295|g>>>27),g=v+(_^E&(m^_))+T[6]+3225465664&4294967295,v=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(v^m))+T[11]+643717713&4294967295,E=v+(g<<14&4294967295|g>>>18),g=_+(v^m&(E^v))+T[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^v&(_^E))+T[5]+3593408605&4294967295,m=_+(g<<5&4294967295|g>>>27),g=v+(_^E&(m^_))+T[10]+38016083&4294967295,v=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(v^m))+T[15]+3634488961&4294967295,E=v+(g<<14&4294967295|g>>>18),g=_+(v^m&(E^v))+T[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^v&(_^E))+T[9]+568446438&4294967295,m=_+(g<<5&4294967295|g>>>27),g=v+(_^E&(m^_))+T[14]+3275163606&4294967295,v=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(v^m))+T[3]+4107603335&4294967295,E=v+(g<<14&4294967295|g>>>18),g=_+(v^m&(E^v))+T[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(E^v&(_^E))+T[13]+2850285829&4294967295,m=_+(g<<5&4294967295|g>>>27),g=v+(_^E&(m^_))+T[2]+4243563512&4294967295,v=m+(g<<9&4294967295|g>>>23),g=E+(m^_&(v^m))+T[7]+1735328473&4294967295,E=v+(g<<14&4294967295|g>>>18),g=_+(v^m&(E^v))+T[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=m+(_^E^v)+T[5]+4294588738&4294967295,m=_+(g<<4&4294967295|g>>>28),g=v+(m^_^E)+T[8]+2272392833&4294967295,v=m+(g<<11&4294967295|g>>>21),g=E+(v^m^_)+T[11]+1839030562&4294967295,E=v+(g<<16&4294967295|g>>>16),g=_+(E^v^m)+T[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^v)+T[1]+2763975236&4294967295,m=_+(g<<4&4294967295|g>>>28),g=v+(m^_^E)+T[4]+1272893353&4294967295,v=m+(g<<11&4294967295|g>>>21),g=E+(v^m^_)+T[7]+4139469664&4294967295,E=v+(g<<16&4294967295|g>>>16),g=_+(E^v^m)+T[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^v)+T[13]+681279174&4294967295,m=_+(g<<4&4294967295|g>>>28),g=v+(m^_^E)+T[0]+3936430074&4294967295,v=m+(g<<11&4294967295|g>>>21),g=E+(v^m^_)+T[3]+3572445317&4294967295,E=v+(g<<16&4294967295|g>>>16),g=_+(E^v^m)+T[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(_^E^v)+T[9]+3654602809&4294967295,m=_+(g<<4&4294967295|g>>>28),g=v+(m^_^E)+T[12]+3873151461&4294967295,v=m+(g<<11&4294967295|g>>>21),g=E+(v^m^_)+T[15]+530742520&4294967295,E=v+(g<<16&4294967295|g>>>16),g=_+(E^v^m)+T[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=m+(E^(_|~v))+T[0]+4096336452&4294967295,m=_+(g<<6&4294967295|g>>>26),g=v+(_^(m|~E))+T[7]+1126891415&4294967295,v=m+(g<<10&4294967295|g>>>22),g=E+(m^(v|~_))+T[14]+2878612391&4294967295,E=v+(g<<15&4294967295|g>>>17),g=_+(v^(E|~m))+T[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~v))+T[12]+1700485571&4294967295,m=_+(g<<6&4294967295|g>>>26),g=v+(_^(m|~E))+T[3]+2399980690&4294967295,v=m+(g<<10&4294967295|g>>>22),g=E+(m^(v|~_))+T[10]+4293915773&4294967295,E=v+(g<<15&4294967295|g>>>17),g=_+(v^(E|~m))+T[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~v))+T[8]+1873313359&4294967295,m=_+(g<<6&4294967295|g>>>26),g=v+(_^(m|~E))+T[15]+4264355552&4294967295,v=m+(g<<10&4294967295|g>>>22),g=E+(m^(v|~_))+T[6]+2734768916&4294967295,E=v+(g<<15&4294967295|g>>>17),g=_+(v^(E|~m))+T[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=m+(E^(_|~v))+T[4]+4149444226&4294967295,m=_+(g<<6&4294967295|g>>>26),g=v+(_^(m|~E))+T[11]+3174756917&4294967295,v=m+(g<<10&4294967295|g>>>22),g=E+(m^(v|~_))+T[2]+718787259&4294967295,E=v+(g<<15&4294967295|g>>>17),g=_+(v^(E|~m))+T[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+v&4294967295}r.prototype.v=function(I,m){m===void 0&&(m=I.length);const _=m-this.blockSize,T=this.C;let E=this.h,v=0;for(;v<m;){if(E==0)for(;v<=_;)s(this,I,v),v+=this.blockSize;if(typeof I=="string"){for(;v<m;)if(T[E++]=I.charCodeAt(v++),E==this.blockSize){s(this,T),E=0;break}}else for(;v<m;)if(T[E++]=I[v++],E==this.blockSize){s(this,T),E=0;break}}this.h=E,this.o+=m},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;m=this.o*8;for(var _=I.length-8;_<I.length;++_)I[_]=m&255,m/=256;for(this.v(I),I=Array(16),m=0,_=0;_<4;++_)for(let T=0;T<32;T+=8)I[m++]=this.g[_]>>>T&255;return I};function i(I,m){var _=u;return Object.prototype.hasOwnProperty.call(_,I)?_[I]:_[I]=m(I)}function a(I,m){this.h=m;const _=[];let T=!0;for(let E=I.length-1;E>=0;E--){const v=I[E]|0;T&&v==m||(_[E]=v,T=!1)}this.g=_}var u={};function h(I){return-128<=I&&I<128?i(I,function(m){return new a([m|0],m<0?-1:0)}):new a([I|0],I<0?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return y;if(I<0)return O(d(-I));const m=[];let _=1;for(let T=0;I>=_;T++)m[T]=I/_|0,_*=4294967296;return new a(m,0)}function p(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return O(p(I.substring(1),m));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=d(Math.pow(m,8));let T=y;for(let v=0;v<I.length;v+=8){var E=Math.min(8,I.length-v);const g=parseInt(I.substring(v,v+E),m);E<8?(E=d(Math.pow(m,E)),T=T.j(E).add(d(g))):(T=T.j(_),T=T.add(d(g)))}return T}var y=h(0),R=h(1),b=h(16777216);n=a.prototype,n.m=function(){if(M(this))return-O(this).m();let I=0,m=1;for(let _=0;_<this.g.length;_++){const T=this.i(_);I+=(T>=0?T:4294967296+T)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(M(this))return"-"+O(this).toString(I);const m=d(Math.pow(I,6));var _=this;let T="";for(;;){const E=Ce(_,m).g;_=z(_,E.j(m));let v=((_.g.length>0?_.g[0]:_.h)>>>0).toString(I);if(_=E,D(_))return v+T;for(;v.length<6;)v="0"+v;T=v+T}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(let m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function M(I){return I.h==-1}n.l=function(I){return I=z(this,I),M(I)?-1:D(I)?0:1};function O(I){const m=I.g.length,_=[];for(let T=0;T<m;T++)_[T]=~I.g[T];return new a(_,~I.h).add(R)}n.abs=function(){return M(this)?O(this):this},n.add=function(I){const m=Math.max(this.g.length,I.g.length),_=[];let T=0;for(let E=0;E<=m;E++){let v=T+(this.i(E)&65535)+(I.i(E)&65535),g=(v>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);T=g>>>16,v&=65535,g&=65535,_[E]=g<<16|v}return new a(_,_[_.length-1]&-2147483648?-1:0)};function z(I,m){return I.add(O(m))}n.j=function(I){if(D(this)||D(I))return y;if(M(this))return M(I)?O(this).j(O(I)):O(O(this).j(I));if(M(I))return O(this.j(O(I)));if(this.l(b)<0&&I.l(b)<0)return d(this.m()*I.m());const m=this.g.length+I.g.length,_=[];for(var T=0;T<2*m;T++)_[T]=0;for(T=0;T<this.g.length;T++)for(let E=0;E<I.g.length;E++){const v=this.i(T)>>>16,g=this.i(T)&65535,ke=I.i(E)>>>16,xt=I.i(E)&65535;_[2*T+2*E]+=g*xt,G(_,2*T+2*E),_[2*T+2*E+1]+=v*xt,G(_,2*T+2*E+1),_[2*T+2*E+1]+=g*ke,G(_,2*T+2*E+1),_[2*T+2*E+2]+=v*ke,G(_,2*T+2*E+2)}for(I=0;I<m;I++)_[I]=_[2*I+1]<<16|_[2*I];for(I=m;I<2*m;I++)_[I]=0;return new a(_,0)};function G(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function ee(I,m){this.g=I,this.h=m}function Ce(I,m){if(D(m))throw Error("division by zero");if(D(I))return new ee(y,y);if(M(I))return m=Ce(O(I),m),new ee(O(m.g),O(m.h));if(M(m))return m=Ce(I,O(m)),new ee(O(m.g),m.h);if(I.g.length>30){if(M(I)||M(m))throw Error("slowDivide_ only works with positive integers.");for(var _=R,T=m;T.l(I)<=0;)_=Fe(_),T=Fe(T);var E=ge(_,1),v=ge(T,1);for(T=ge(T,2),_=ge(_,2);!D(T);){var g=v.add(T);g.l(I)<=0&&(E=E.add(_),v=g),T=ge(T,1),_=ge(_,1)}return m=z(I,E.j(m)),new ee(E,m)}for(E=y;I.l(m)>=0;){for(_=Math.max(1,Math.floor(I.m()/m.m())),T=Math.ceil(Math.log(_)/Math.LN2),T=T<=48?1:Math.pow(2,T-48),v=d(_),g=v.j(m);M(g)||g.l(I)>0;)_-=T,v=d(_),g=v.j(m);D(v)&&(v=R),E=E.add(v),I=z(I,g)}return new ee(E,I)}n.B=function(I){return Ce(this,I).h},n.and=function(I){const m=Math.max(this.g.length,I.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)&I.i(T);return new a(_,this.h&I.h)},n.or=function(I){const m=Math.max(this.g.length,I.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)|I.i(T);return new a(_,this.h|I.h)},n.xor=function(I){const m=Math.max(this.g.length,I.g.length),_=[];for(let T=0;T<m;T++)_[T]=this.i(T)^I.i(T);return new a(_,this.h^I.h)};function Fe(I){const m=I.g.length+1,_=[];for(let T=0;T<m;T++)_[T]=I.i(T)<<1|I.i(T-1)>>>31;return new a(_,I.h)}function ge(I,m){const _=m>>5;m%=32;const T=I.g.length-_,E=[];for(let v=0;v<T;v++)E[v]=m>0?I.i(v+_)>>>m|I.i(v+_+1)<<32-m:I.i(v+_);return new a(E,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,wh=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,Pt=a}).apply(typeof hu<"u"?hu:typeof self<"u"?self:typeof window<"u"?window:{});var ns=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vh,ir,Ah,ds,uo,Rh,Sh,Ph;(function(){var n,e=Object.defineProperty;function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ns=="object"&&ns];for(var c=0;c<o.length;++c){var l=o[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=t(this);function s(o,c){if(c)e:{var l=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var w=o[f];if(!(w in l))break e;l=l[w]}o=o[o.length-1],f=l[o],c=c(f),c!=f&&c!=null&&e(l,o,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(o){return o||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(o){return o||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(o){return o||function(c){var l=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&l.push([f,c[f]]);return l}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},a=this||self;function u(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function h(o,c,l){return o.call.apply(o.bind,arguments)}function d(o,c,l){return d=h,d.apply(null,arguments)}function p(o,c){var l=Array.prototype.slice.call(arguments,1);return function(){var f=l.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function y(o,c){function l(){}l.prototype=c.prototype,o.Z=c.prototype,o.prototype=new l,o.prototype.constructor=o,o.Ob=function(f,w,A){for(var C=Array(arguments.length-2),B=2;B<arguments.length;B++)C[B-2]=arguments[B];return c.prototype[w].apply(f,C)}}var R=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?o=>o&&AsyncContext.Snapshot.wrap(o):o=>o;function b(o){const c=o.length;if(c>0){const l=Array(c);for(let f=0;f<c;f++)l[f]=o[f];return l}return[]}function D(o,c){for(let f=1;f<arguments.length;f++){const w=arguments[f];var l=typeof w;if(l=l!="object"?l:w?Array.isArray(w)?"array":l:"null",l=="array"||l=="object"&&typeof w.length=="number"){l=o.length||0;const A=w.length||0;o.length=l+A;for(let C=0;C<A;C++)o[l+C]=w[C]}else o.push(w)}}class M{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function O(o){a.setTimeout(()=>{throw o},0)}function z(){var o=I;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class G{constructor(){this.h=this.g=null}add(c,l){const f=ee.get();f.set(c,l),this.h?this.h.next=f:this.g=f,this.h=f}}var ee=new M(()=>new Ce,o=>o.reset());class Ce{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Fe,ge=!1,I=new G,m=()=>{const o=Promise.resolve(void 0);Fe=()=>{o.then(_)}};function _(){for(var o;o=z();){try{o.h.call(o.g)}catch(l){O(l)}var c=ee;c.j(o),c.h<100&&(c.h++,o.next=c.g,c.g=o)}ge=!1}function T(){this.u=this.u,this.C=this.C}T.prototype.u=!1,T.prototype.dispose=function(){this.u||(this.u=!0,this.N())},T.prototype[Symbol.dispose]=function(){this.dispose()},T.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var v=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const l=()=>{};a.addEventListener("test",l,c),a.removeEventListener("test",l,c)}catch{}return o})();function g(o){return/^[\s\xa0]*$/.test(o)}function ke(o,c){E.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o&&this.init(o,c)}y(ke,E),ke.prototype.init=function(o,c){const l=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget,c||(l=="mouseover"?c=o.fromElement:l=="mouseout"&&(c=o.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=o.pointerType,this.state=o.state,this.i=o,o.defaultPrevented&&ke.Z.h.call(this)},ke.prototype.h=function(){ke.Z.h.call(this);const o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var xt="closure_listenable_"+(Math.random()*1e6|0),bf=0;function Cf(o,c,l,f,w){this.listener=o,this.proxy=null,this.src=c,this.type=l,this.capture=!!f,this.ha=w,this.key=++bf,this.da=this.fa=!1}function Br(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function qr(o,c,l){for(const f in o)c.call(l,o[f],f,o)}function kf(o,c){for(const l in o)c.call(void 0,o[l],l,o)}function Va(o){const c={};for(const l in o)c[l]=o[l];return c}const Da="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Oa(o,c){let l,f;for(let w=1;w<arguments.length;w++){f=arguments[w];for(l in f)o[l]=f[l];for(let A=0;A<Da.length;A++)l=Da[A],Object.prototype.hasOwnProperty.call(f,l)&&(o[l]=f[l])}}function jr(o){this.src=o,this.g={},this.h=0}jr.prototype.add=function(o,c,l,f,w){const A=o.toString();o=this.g[A],o||(o=this.g[A]=[],this.h++);const C=fi(o,c,f,w);return C>-1?(c=o[C],l||(c.fa=!1)):(c=new Cf(c,this.src,A,!!f,w),c.fa=l,o.push(c)),c};function di(o,c){const l=c.type;if(l in o.g){var f=o.g[l],w=Array.prototype.indexOf.call(f,c,void 0),A;(A=w>=0)&&Array.prototype.splice.call(f,w,1),A&&(Br(c),o.g[l].length==0&&(delete o.g[l],o.h--))}}function fi(o,c,l,f){for(let w=0;w<o.length;++w){const A=o[w];if(!A.da&&A.listener==c&&A.capture==!!l&&A.ha==f)return w}return-1}var pi="closure_lm_"+(Math.random()*1e6|0),mi={};function La(o,c,l,f,w){if(Array.isArray(c)){for(let A=0;A<c.length;A++)La(o,c[A],l,f,w);return null}return l=Fa(l),o&&o[xt]?o.J(c,l,u(f)?!!f.capture:!1,w):Nf(o,c,l,!1,f,w)}function Nf(o,c,l,f,w,A){if(!c)throw Error("Invalid event type");const C=u(w)?!!w.capture:!!w;let B=_i(o);if(B||(o[pi]=B=new jr(o)),l=B.add(c,l,f,C,A),l.proxy)return l;if(f=Vf(),l.proxy=f,f.src=o,f.listener=l,o.addEventListener)v||(w=C),w===void 0&&(w=!1),o.addEventListener(c.toString(),f,w);else if(o.attachEvent)o.attachEvent(xa(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return l}function Vf(){function o(l){return c.call(o.src,o.listener,l)}const c=Df;return o}function Ma(o,c,l,f,w){if(Array.isArray(c))for(var A=0;A<c.length;A++)Ma(o,c[A],l,f,w);else f=u(f)?!!f.capture:!!f,l=Fa(l),o&&o[xt]?(o=o.i,A=String(c).toString(),A in o.g&&(c=o.g[A],l=fi(c,l,f,w),l>-1&&(Br(c[l]),Array.prototype.splice.call(c,l,1),c.length==0&&(delete o.g[A],o.h--)))):o&&(o=_i(o))&&(c=o.g[c.toString()],o=-1,c&&(o=fi(c,l,f,w)),(l=o>-1?c[o]:null)&&gi(l))}function gi(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[xt])di(c.i,o);else{var l=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(l,f,o.capture):c.detachEvent?c.detachEvent(xa(l),f):c.addListener&&c.removeListener&&c.removeListener(f),(l=_i(c))?(di(l,o),l.h==0&&(l.src=null,c[pi]=null)):Br(o)}}}function xa(o){return o in mi?mi[o]:mi[o]="on"+o}function Df(o,c){if(o.da)o=!0;else{c=new ke(c,this);const l=o.listener,f=o.ha||o.src;o.fa&&gi(o),o=l.call(f,c)}return o}function _i(o){return o=o[pi],o instanceof jr?o:null}var yi="__closure_events_fn_"+(Math.random()*1e9>>>0);function Fa(o){return typeof o=="function"?o:(o[yi]||(o[yi]=function(c){return o.handleEvent(c)}),o[yi])}function Te(){T.call(this),this.i=new jr(this),this.M=this,this.G=null}y(Te,T),Te.prototype[xt]=!0,Te.prototype.removeEventListener=function(o,c,l,f){Ma(this,o,c,l,f)};function Se(o,c){var l,f=o.G;if(f)for(l=[];f;f=f.G)l.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new E(c,o);else if(c instanceof E)c.target=c.target||o;else{var w=c;c=new E(f,o),Oa(c,w)}w=!0;let A,C;if(l)for(C=l.length-1;C>=0;C--)A=c.g=l[C],w=$r(A,f,!0,c)&&w;if(A=c.g=o,w=$r(A,f,!0,c)&&w,w=$r(A,f,!1,c)&&w,l)for(C=0;C<l.length;C++)A=c.g=l[C],w=$r(A,f,!1,c)&&w}Te.prototype.N=function(){if(Te.Z.N.call(this),this.i){var o=this.i;for(const c in o.g){const l=o.g[c];for(let f=0;f<l.length;f++)Br(l[f]);delete o.g[c],o.h--}}this.G=null},Te.prototype.J=function(o,c,l,f){return this.i.add(String(o),c,!1,l,f)},Te.prototype.K=function(o,c,l,f){return this.i.add(String(o),c,!0,l,f)};function $r(o,c,l,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();let w=!0;for(let A=0;A<c.length;++A){const C=c[A];if(C&&!C.da&&C.capture==l){const B=C.listener,ce=C.ha||C.src;C.fa&&di(o.i,C),w=B.call(ce,f)!==!1&&w}}return w&&!f.defaultPrevented}function Of(o,c){if(typeof o!="function")if(o&&typeof o.handleEvent=="function")o=d(o.handleEvent,o);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(o,c||0)}function Ua(o){o.g=Of(()=>{o.g=null,o.i&&(o.i=!1,Ua(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class Lf extends T{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Ua(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fn(o){T.call(this),this.h=o,this.g={}}y(Fn,T);var Ba=[];function qa(o){qr(o.g,function(c,l){this.g.hasOwnProperty(l)&&gi(c)},o),o.g={}}Fn.prototype.N=function(){Fn.Z.N.call(this),qa(this)},Fn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ei=a.JSON.stringify,Mf=a.JSON.parse,xf=class{stringify(o){return a.JSON.stringify(o,void 0)}parse(o){return a.JSON.parse(o,void 0)}};function ja(){}function $a(){}var Un={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ii(){E.call(this,"d")}y(Ii,E);function Ti(){E.call(this,"c")}y(Ti,E);var Ft={},Wa=null;function Wr(){return Wa=Wa||new Te}Ft.Ia="serverreachability";function Ha(o){E.call(this,Ft.Ia,o)}y(Ha,E);function Bn(o){const c=Wr();Se(c,new Ha(c))}Ft.STAT_EVENT="statevent";function za(o,c){E.call(this,Ft.STAT_EVENT,o),this.stat=c}y(za,E);function Pe(o){const c=Wr();Se(c,new za(c,o))}Ft.Ja="timingevent";function Ka(o,c){E.call(this,Ft.Ja,o),this.size=c}y(Ka,E);function qn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){o()},c)}function jn(){this.g=!0}jn.prototype.ua=function(){this.g=!1};function Ff(o,c,l,f,w,A){o.info(function(){if(o.g)if(A){var C="",B=A.split("&");for(let Q=0;Q<B.length;Q++){var ce=B[Q].split("=");if(ce.length>1){const fe=ce[0];ce=ce[1];const He=fe.split("_");C=He.length>=2&&He[1]=="type"?C+(fe+"="+ce+"&"):C+(fe+"=redacted&")}}}else C=null;else C=A;return"XMLHTTP REQ ("+f+") [attempt "+w+"]: "+c+`
`+l+`
`+C})}function Uf(o,c,l,f,w,A,C){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+w+"]: "+c+`
`+l+`
`+A+" "+C})}function cn(o,c,l,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+qf(o,l)+(f?" "+f:"")})}function Bf(o,c){o.info(function(){return"TIMEOUT: "+c})}jn.prototype.info=function(){};function qf(o,c){if(!o.g)return c;if(!c)return null;try{const A=JSON.parse(c);if(A){for(o=0;o<A.length;o++)if(Array.isArray(A[o])){var l=A[o];if(!(l.length<2)){var f=l[1];if(Array.isArray(f)&&!(f.length<1)){var w=f[0];if(w!="noop"&&w!="stop"&&w!="close")for(let C=1;C<f.length;C++)f[C]=""}}}}return Ei(A)}catch{return c}}var Hr={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Ga={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Qa;function wi(){}y(wi,ja),wi.prototype.g=function(){return new XMLHttpRequest},Qa=new wi;function $n(o){return encodeURIComponent(String(o))}function jf(o){var c=1;o=o.split(":");const l=[];for(;c>0&&o.length;)l.push(o.shift()),c--;return o.length&&l.push(o.join(":")),l}function dt(o,c,l,f){this.j=o,this.i=c,this.l=l,this.S=f||1,this.V=new Fn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Ya}function Ya(){this.i=null,this.g="",this.h=!1}var Ja={},vi={};function Ai(o,c,l){o.M=1,o.A=Kr(We(c)),o.u=l,o.R=!0,Xa(o,null)}function Xa(o,c){o.F=Date.now(),zr(o),o.B=We(o.A);var l=o.B,f=o.S;Array.isArray(f)||(f=[String(f)]),hc(l.i,"t",f),o.C=0,l=o.j.L,o.h=new Ya,o.g=Cc(o.j,l?c:null,!o.u),o.P>0&&(o.O=new Lf(d(o.Y,o,o.g),o.P)),c=o.V,l=o.g,f=o.ba;var w="readystatechange";Array.isArray(w)||(w&&(Ba[0]=w.toString()),w=Ba);for(let A=0;A<w.length;A++){const C=La(l,w[A],f||c.handleEvent,!1,c.h||c);if(!C)break;c.g[C.key]=C}c=o.J?Va(o.J):{},o.u?(o.v||(o.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.B,o.v,o.u,c)):(o.v="GET",o.g.ea(o.B,o.v,null,c)),Bn(),Ff(o.i,o.v,o.B,o.l,o.S,o.u)}dt.prototype.ba=function(o){o=o.target;const c=this.O;c&&mt(o)==3?c.j():this.Y(o)},dt.prototype.Y=function(o){try{if(o==this.g)e:{const B=mt(this.g),ce=this.g.ya(),Q=this.g.ca();if(!(B<3)&&(B!=3||this.g&&(this.h.h||this.g.la()||yc(this.g)))){this.K||B!=4||ce==7||(ce==8||Q<=0?Bn(3):Bn(2)),Ri(this);var c=this.g.ca();this.X=c;var l=$f(this);if(this.o=c==200,Uf(this.i,this.v,this.B,this.l,this.S,B,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,w=this.g;if((f=w.g?w.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(f)){var A=f;break t}}A=null}if(o=A)cn(this.i,this.l,o,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Si(this,o);else{this.o=!1,this.m=3,Pe(12),Ut(this),Wn(this);break e}}if(this.R){o=!0;let fe;for(;!this.K&&this.C<l.length;)if(fe=Wf(this,l),fe==vi){B==4&&(this.m=4,Pe(14),o=!1),cn(this.i,this.l,null,"[Incomplete Response]");break}else if(fe==Ja){this.m=4,Pe(15),cn(this.i,this.l,l,"[Invalid Chunk]"),o=!1;break}else cn(this.i,this.l,fe,null),Si(this,fe);if(Za(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),B!=4||l.length!=0||this.h.h||(this.m=1,Pe(16),o=!1),this.o=this.o&&o,!o)cn(this.i,this.l,l,"[Invalid Chunked Response]"),Ut(this),Wn(this);else if(l.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),Oi(C),C.P=!0,Pe(11))}}else cn(this.i,this.l,l,null),Si(this,l);B==4&&Ut(this),this.o&&!this.K&&(B==4?Rc(this.j,this):(this.o=!1,zr(this)))}else sp(this.g),c==400&&l.indexOf("Unknown SID")>0?(this.m=3,Pe(12)):(this.m=0,Pe(13)),Ut(this),Wn(this)}}}catch{}finally{}};function $f(o){if(!Za(o))return o.g.la();const c=yc(o.g);if(c==="")return"";let l="";const f=c.length,w=mt(o.g)==4;if(!o.h.i){if(typeof TextDecoder>"u")return Ut(o),Wn(o),"";o.h.i=new a.TextDecoder}for(let A=0;A<f;A++)o.h.h=!0,l+=o.h.i.decode(c[A],{stream:!(w&&A==f-1)});return c.length=0,o.h.g+=l,o.C=0,o.h.g}function Za(o){return o.g?o.v=="GET"&&o.M!=2&&o.j.Aa:!1}function Wf(o,c){var l=o.C,f=c.indexOf(`
`,l);return f==-1?vi:(l=Number(c.substring(l,f)),isNaN(l)?Ja:(f+=1,f+l>c.length?vi:(c=c.slice(f,f+l),o.C=f+l,c)))}dt.prototype.cancel=function(){this.K=!0,Ut(this)};function zr(o){o.T=Date.now()+o.H,ec(o,o.H)}function ec(o,c){if(o.D!=null)throw Error("WatchDog timer not null");o.D=qn(d(o.aa,o),c)}function Ri(o){o.D&&(a.clearTimeout(o.D),o.D=null)}dt.prototype.aa=function(){this.D=null;const o=Date.now();o-this.T>=0?(Bf(this.i,this.B),this.M!=2&&(Bn(),Pe(17)),Ut(this),this.m=2,Wn(this)):ec(this,this.T-o)};function Wn(o){o.j.I==0||o.K||Rc(o.j,o)}function Ut(o){Ri(o);var c=o.O;c&&typeof c.dispose=="function"&&c.dispose(),o.O=null,qa(o.V),o.g&&(c=o.g,o.g=null,c.abort(),c.dispose())}function Si(o,c){try{var l=o.j;if(l.I!=0&&(l.g==o||Pi(l.h,o))){if(!o.L&&Pi(l.h,o)&&l.I==3){try{var f=l.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var w=f;if(w[0]==0){e:if(!l.v){if(l.g)if(l.g.F+3e3<o.F)Xr(l),Yr(l);else break e;Di(l),Pe(18)}}else l.xa=w[1],0<l.xa-l.K&&w[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=qn(d(l.Va,l),6e3));rc(l.h)<=1&&l.ta&&(l.ta=void 0)}else qt(l,11)}else if((o.L||l.g==o)&&Xr(l),!g(c))for(w=l.Ba.g.parse(c),c=0;c<w.length;c++){let Q=w[c];const fe=Q[0];if(!(fe<=l.K))if(l.K=fe,Q=Q[1],l.I==2)if(Q[0]=="c"){l.M=Q[1],l.ba=Q[2];const He=Q[3];He!=null&&(l.ka=He,l.j.info("VER="+l.ka));const jt=Q[4];jt!=null&&(l.za=jt,l.j.info("SVER="+l.za));const gt=Q[5];gt!=null&&typeof gt=="number"&&gt>0&&(f=1.5*gt,l.O=f,l.j.info("backChannelRequestTimeoutMs_="+f)),f=l;const _t=o.g;if(_t){const es=_t.g?_t.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(es){var A=f.h;A.g||es.indexOf("spdy")==-1&&es.indexOf("quic")==-1&&es.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(bi(A,A.h),A.h=null))}if(f.G){const Li=_t.g?_t.g.getResponseHeader("X-HTTP-Session-Id"):null;Li&&(f.wa=Li,J(f.J,f.G,Li))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-o.F,l.j.info("Handshake RTT: "+l.T+"ms")),f=l;var C=o;if(f.na=bc(f,f.L?f.ba:null,f.W),C.L){sc(f.h,C);var B=C,ce=f.O;ce&&(B.H=ce),B.D&&(Ri(B),zr(B)),f.g=C}else vc(f);l.i.length>0&&Jr(l)}else Q[0]!="stop"&&Q[0]!="close"||qt(l,7);else l.I==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?qt(l,7):Vi(l):Q[0]!="noop"&&l.l&&l.l.qa(Q),l.A=0)}}Bn(4)}catch{}}var Hf=class{constructor(o,c){this.g=o,this.map=c}};function tc(o){this.l=o||10,a.PerformanceNavigationTiming?(o=a.performance.getEntriesByType("navigation"),o=o.length>0&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function nc(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function rc(o){return o.h?1:o.g?o.g.size:0}function Pi(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function bi(o,c){o.g?o.g.add(c):o.h=c}function sc(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}tc.prototype.cancel=function(){if(this.i=ic(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ic(o){if(o.h!=null)return o.i.concat(o.h.G);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const l of o.g.values())c=c.concat(l.G);return c}return b(o.i)}var oc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zf(o,c){if(o){o=o.split("&");for(let l=0;l<o.length;l++){const f=o[l].indexOf("=");let w,A=null;f>=0?(w=o[l].substring(0,f),A=o[l].substring(f+1)):w=o[l],c(w,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function ft(o){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;o instanceof ft?(this.l=o.l,Hn(this,o.j),this.o=o.o,this.g=o.g,zn(this,o.u),this.h=o.h,Ci(this,dc(o.i)),this.m=o.m):o&&(c=String(o).match(oc))?(this.l=!1,Hn(this,c[1]||"",!0),this.o=Kn(c[2]||""),this.g=Kn(c[3]||"",!0),zn(this,c[4]),this.h=Kn(c[5]||"",!0),Ci(this,c[6]||"",!0),this.m=Kn(c[7]||"")):(this.l=!1,this.i=new Qn(null,this.l))}ft.prototype.toString=function(){const o=[];var c=this.j;c&&o.push(Gn(c,ac,!0),":");var l=this.g;return(l||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Gn(c,ac,!0),"@"),o.push($n(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&o.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&o.push("/"),o.push(Gn(l,l.charAt(0)=="/"?Qf:Gf,!0))),(l=this.i.toString())&&o.push("?",l),(l=this.m)&&o.push("#",Gn(l,Jf)),o.join("")},ft.prototype.resolve=function(o){const c=We(this);let l=!!o.j;l?Hn(c,o.j):l=!!o.o,l?c.o=o.o:l=!!o.g,l?c.g=o.g:l=o.u!=null;var f=o.h;if(l)zn(c,o.u);else if(l=!!o.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var w=c.h.lastIndexOf("/");w!=-1&&(f=c.h.slice(0,w+1)+f)}if(w=f,w==".."||w==".")f="";else if(w.indexOf("./")!=-1||w.indexOf("/.")!=-1){f=w.lastIndexOf("/",0)==0,w=w.split("/");const A=[];for(let C=0;C<w.length;){const B=w[C++];B=="."?f&&C==w.length&&A.push(""):B==".."?((A.length>1||A.length==1&&A[0]!="")&&A.pop(),f&&C==w.length&&A.push("")):(A.push(B),f=!0)}f=A.join("/")}else f=w}return l?c.h=f:l=o.i.toString()!=="",l?Ci(c,dc(o.i)):l=!!o.m,l&&(c.m=o.m),c};function We(o){return new ft(o)}function Hn(o,c,l){o.j=l?Kn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function zn(o,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);o.u=c}else o.u=null}function Ci(o,c,l){c instanceof Qn?(o.i=c,Xf(o.i,o.l)):(l||(c=Gn(c,Yf)),o.i=new Qn(c,o.l))}function J(o,c,l){o.i.set(c,l)}function Kr(o){return J(o,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),o}function Kn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Gn(o,c,l){return typeof o=="string"?(o=encodeURI(o).replace(c,Kf),l&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Kf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var ac=/[#\/\?@]/g,Gf=/[#\?:]/g,Qf=/[#\?]/g,Yf=/[#\?@]/g,Jf=/#/g;function Qn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function Bt(o){o.g||(o.g=new Map,o.h=0,o.i&&zf(o.i,function(c,l){o.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}n=Qn.prototype,n.add=function(o,c){Bt(this),this.i=null,o=un(this,o);let l=this.g.get(o);return l||this.g.set(o,l=[]),l.push(c),this.h+=1,this};function cc(o,c){Bt(o),c=un(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function uc(o,c){return Bt(o),c=un(o,c),o.g.has(c)}n.forEach=function(o,c){Bt(this),this.g.forEach(function(l,f){l.forEach(function(w){o.call(c,w,f,this)},this)},this)};function lc(o,c){Bt(o);let l=[];if(typeof c=="string")uc(o,c)&&(l=l.concat(o.g.get(un(o,c))));else for(o=Array.from(o.g.values()),c=0;c<o.length;c++)l=l.concat(o[c]);return l}n.set=function(o,c){return Bt(this),this.i=null,o=un(this,o),uc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=lc(this,o),o.length>0?String(o[0]):c):c};function hc(o,c,l){cc(o,c),l.length>0&&(o.i=null,o.g.set(un(o,c),b(l)),o.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var l=c[f];const w=$n(l);l=lc(this,l);for(let A=0;A<l.length;A++){let C=w;l[A]!==""&&(C+="="+$n(l[A])),o.push(C)}}return this.i=o.join("&")};function dc(o){const c=new Qn;return c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),c}function un(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Xf(o,c){c&&!o.j&&(Bt(o),o.i=null,o.g.forEach(function(l,f){const w=f.toLowerCase();f!=w&&(cc(this,f),hc(this,w,l))},o)),o.j=c}function Zf(o,c){const l=new jn;if(a.Image){const f=new Image;f.onload=p(pt,l,"TestLoadImage: loaded",!0,c,f),f.onerror=p(pt,l,"TestLoadImage: error",!1,c,f),f.onabort=p(pt,l,"TestLoadImage: abort",!1,c,f),f.ontimeout=p(pt,l,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function ep(o,c){const l=new jn,f=new AbortController,w=setTimeout(()=>{f.abort(),pt(l,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(A=>{clearTimeout(w),A.ok?pt(l,"TestPingServer: ok",!0,c):pt(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(w),pt(l,"TestPingServer: error",!1,c)})}function pt(o,c,l,f,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),f(l)}catch{}}function tp(){this.g=new xf}function ki(o){this.i=o.Sb||null,this.h=o.ab||!1}y(ki,ja),ki.prototype.g=function(){return new Gr(this.i,this.h)};function Gr(o,c){Te.call(this),this.H=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}y(Gr,Te),n=Gr.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=o,this.D=c,this.readyState=1,Jn(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};o&&(c.body=o),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Yn(this)),this.readyState=0},n.Pa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Jn(this)),this.g&&(this.readyState=3,Jn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;fc(this)}else o.text().then(this.Oa.bind(this),this.ga.bind(this))};function fc(o){o.j.read().then(o.Ma.bind(o)).catch(o.ga.bind(o))}n.Ma=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Yn(this):Jn(this),this.readyState==3&&fc(this)}},n.Oa=function(o){this.g&&(this.response=this.responseText=o,Yn(this))},n.Na=function(o){this.g&&(this.response=o,Yn(this))},n.ga=function(){this.g&&Yn(this)};function Yn(o){o.readyState=4,o.l=null,o.j=null,o.B=null,Jn(o)}n.setRequestHeader=function(o,c){this.A.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,o.push(l[0]+": "+l[1]),l=c.next();return o.join(`\r
`)};function Jn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Gr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function pc(o){let c="";return qr(o,function(l,f){c+=f,c+=":",c+=l,c+=`\r
`}),c}function Ni(o,c,l){e:{for(f in l){var f=!1;break e}f=!0}f||(l=pc(l),typeof o=="string"?l!=null&&$n(l):J(o,c,l))}function te(o){Te.call(this),this.headers=new Map,this.L=o||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}y(te,Te);var np=/^https?$/i,rp=["POST","PUT"];n=te.prototype,n.Fa=function(o){this.H=o},n.ea=function(o,c,l,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Qa.g(),this.g.onreadystatechange=R(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(A){mc(this,A);return}if(o=l||"",l=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var w in f)l.set(w,f[w]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const A of f.keys())l.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(l.keys()).find(A=>A.toLowerCase()=="content-type"),w=a.FormData&&o instanceof a.FormData,!(Array.prototype.indexOf.call(rp,c,void 0)>=0)||f||w||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,C]of l)this.g.setRequestHeader(A,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(o),this.v=!1}catch(A){mc(this,A)}};function mc(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.o=5,gc(o),Qr(o)}function gc(o){o.A||(o.A=!0,Se(o,"complete"),Se(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=o||7,Se(this,"complete"),Se(this,"abort"),Qr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qr(this,!0)),te.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?_c(this):this.Xa())},n.Xa=function(){_c(this)};function _c(o){if(o.h&&typeof i<"u"){if(o.v&&mt(o)==4)setTimeout(o.Ca.bind(o),0);else if(Se(o,"readystatechange"),mt(o)==4){o.h=!1;try{const A=o.ca();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var l;if(!(l=c)){var f;if(f=A===0){let C=String(o.D).match(oc)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),f=!np.test(C?C.toLowerCase():"")}l=f}if(l)Se(o,"complete"),Se(o,"success");else{o.o=6;try{var w=mt(o)>2?o.g.statusText:""}catch{w=""}o.l=w+" ["+o.ca()+"]",gc(o)}}finally{Qr(o)}}}}function Qr(o,c){if(o.g){o.m&&(clearTimeout(o.m),o.m=null);const l=o.g;o.g=null,c||Se(o,"ready");try{l.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function mt(o){return o.g?o.g.readyState:0}n.ca=function(){try{return mt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),Mf(c)}};function yc(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.F){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function sp(o){const c={};o=(o.g&&mt(o)>=2&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(g(o[f]))continue;var l=jf(o[f]);const w=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const A=c[w]||[];c[w]=A,A.push(l)}kf(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xn(o,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[o]||c}function Ec(o){this.za=0,this.i=[],this.j=new jn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Xn("failFast",!1,o),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Xn("baseRetryDelayMs",5e3,o),this.Za=Xn("retryDelaySeedMs",1e4,o),this.Ta=Xn("forwardChannelMaxRetries",2,o),this.va=Xn("forwardChannelRequestTimeoutMs",2e4,o),this.ma=o&&o.xmlHttpFactory||void 0,this.Ua=o&&o.Rb||void 0,this.Aa=o&&o.useFetchStreams||!1,this.O=void 0,this.L=o&&o.supportsCrossDomainXhr||!1,this.M="",this.h=new tc(o&&o.concurrentRequestLimit),this.Ba=new tp,this.S=o&&o.fastHandshake||!1,this.R=o&&o.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=o&&o.Pb||!1,o&&o.ua&&this.j.ua(),o&&o.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&o&&o.detectBufferingProxy||!1,this.ia=void 0,o&&o.longPollingTimeout&&o.longPollingTimeout>0&&(this.ia=o.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Ec.prototype,n.ka=8,n.I=1,n.connect=function(o,c,l,f){Pe(0),this.W=o,this.H=c||{},l&&f!==void 0&&(this.H.OSID=l,this.H.OAID=f),this.F=this.X,this.J=bc(this,null,this.W),Jr(this)};function Vi(o){if(Ic(o),o.I==3){var c=o.V++,l=We(o.J);if(J(l,"SID",o.M),J(l,"RID",c),J(l,"TYPE","terminate"),Zn(o,l),c=new dt(o,o.j,c),c.M=2,c.A=Kr(We(l)),l=!1,a.navigator&&a.navigator.sendBeacon)try{l=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!l&&a.Image&&(new Image().src=c.A,l=!0),l||(c.g=Cc(c.j,null),c.g.ea(c.A)),c.F=Date.now(),zr(c)}Pc(o)}function Yr(o){o.g&&(Oi(o),o.g.cancel(),o.g=null)}function Ic(o){Yr(o),o.v&&(a.clearTimeout(o.v),o.v=null),Xr(o),o.h.cancel(),o.m&&(typeof o.m=="number"&&a.clearTimeout(o.m),o.m=null)}function Jr(o){if(!nc(o.h)&&!o.m){o.m=!0;var c=o.Ea;Fe||m(),ge||(Fe(),ge=!0),I.add(c,o),o.D=0}}function ip(o,c){return rc(o.h)>=o.h.j-(o.m?1:0)?!1:o.m?(o.i=c.G.concat(o.i),!0):o.I==1||o.I==2||o.D>=(o.Sa?0:o.Ta)?!1:(o.m=qn(d(o.Ea,o,c),Sc(o,o.D)),o.D++,!0)}n.Ea=function(o){if(this.m)if(this.m=null,this.I==1){if(!o){this.V=Math.floor(Math.random()*1e5),o=this.V++;const w=new dt(this,this.j,o);let A=this.o;if(this.U&&(A?(A=Va(A),Oa(A,this.U)):A=this.U),this.u!==null||this.R||(w.J=A,A=null),this.S)e:{for(var c=0,l=0;l<this.i.length;l++){t:{var f=this.i[l];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=l;break e}if(c===4096||l===this.i.length-1){c=l+1;break e}}c=1e3}else c=1e3;c=wc(this,w,c),l=We(this.J),J(l,"RID",o),J(l,"CVER",22),this.G&&J(l,"X-HTTP-Session-Id",this.G),Zn(this,l),A&&(this.R?c="headers="+$n(pc(A))+"&"+c:this.u&&Ni(l,this.u,A)),bi(this.h,w),this.Ra&&J(l,"TYPE","init"),this.S?(J(l,"$req",c),J(l,"SID","null"),w.U=!0,Ai(w,l,null)):Ai(w,l,c),this.I=2}}else this.I==3&&(o?Tc(this,o):this.i.length==0||nc(this.h)||Tc(this))};function Tc(o,c){var l;c?l=c.l:l=o.V++;const f=We(o.J);J(f,"SID",o.M),J(f,"RID",l),J(f,"AID",o.K),Zn(o,f),o.u&&o.o&&Ni(f,o.u,o.o),l=new dt(o,o.j,l,o.D+1),o.u===null&&(l.J=o.o),c&&(o.i=c.G.concat(o.i)),c=wc(o,l,1e3),l.H=Math.round(o.va*.5)+Math.round(o.va*.5*Math.random()),bi(o.h,l),Ai(l,f,c)}function Zn(o,c){o.H&&qr(o.H,function(l,f){J(c,f,l)}),o.l&&qr({},function(l,f){J(c,f,l)})}function wc(o,c,l){l=Math.min(o.i.length,l);const f=o.l?d(o.l.Ka,o.l,o):null;e:{var w=o.i;let B=-1;for(;;){const ce=["count="+l];B==-1?l>0?(B=w[0].g,ce.push("ofs="+B)):B=0:ce.push("ofs="+B);let Q=!0;for(let fe=0;fe<l;fe++){var A=w[fe].g;const He=w[fe].map;if(A-=B,A<0)B=Math.max(0,w[fe].g-100),Q=!1;else try{A="req"+A+"_"||"";try{var C=He instanceof Map?He:Object.entries(He);for(const[jt,gt]of C){let _t=gt;u(gt)&&(_t=Ei(gt)),ce.push(A+jt+"="+encodeURIComponent(_t))}}catch(jt){throw ce.push(A+"type="+encodeURIComponent("_badmap")),jt}}catch{f&&f(He)}}if(Q){C=ce.join("&");break e}}C=void 0}return o=o.i.splice(0,l),c.G=o,C}function vc(o){if(!o.g&&!o.v){o.Y=1;var c=o.Da;Fe||m(),ge||(Fe(),ge=!0),I.add(c,o),o.A=0}}function Di(o){return o.g||o.v||o.A>=3?!1:(o.Y++,o.v=qn(d(o.Da,o),Sc(o,o.A)),o.A++,!0)}n.Da=function(){if(this.v=null,Ac(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var o=4*this.T;this.j.info("BP detection timer enabled: "+o),this.B=qn(d(this.Wa,this),o)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Pe(10),Yr(this),Ac(this))};function Oi(o){o.B!=null&&(a.clearTimeout(o.B),o.B=null)}function Ac(o){o.g=new dt(o,o.j,"rpc",o.Y),o.u===null&&(o.g.J=o.o),o.g.P=0;var c=We(o.na);J(c,"RID","rpc"),J(c,"SID",o.M),J(c,"AID",o.K),J(c,"CI",o.F?"0":"1"),!o.F&&o.ia&&J(c,"TO",o.ia),J(c,"TYPE","xmlhttp"),Zn(o,c),o.u&&o.o&&Ni(c,o.u,o.o),o.O&&(o.g.H=o.O);var l=o.g;o=o.ba,l.M=1,l.A=Kr(We(c)),l.u=null,l.R=!0,Xa(l,o)}n.Va=function(){this.C!=null&&(this.C=null,Yr(this),Di(this),Pe(19))};function Xr(o){o.C!=null&&(a.clearTimeout(o.C),o.C=null)}function Rc(o,c){var l=null;if(o.g==c){Xr(o),Oi(o),o.g=null;var f=2}else if(Pi(o.h,c))l=c.G,sc(o.h,c),f=1;else return;if(o.I!=0){if(c.o)if(f==1){l=c.u?c.u.length:0,c=Date.now()-c.F;var w=o.D;f=Wr(),Se(f,new Ka(f,l)),Jr(o)}else vc(o);else if(w=c.m,w==3||w==0&&c.X>0||!(f==1&&ip(o,c)||f==2&&Di(o)))switch(l&&l.length>0&&(c=o.h,c.i=c.i.concat(l)),w){case 1:qt(o,5);break;case 4:qt(o,10);break;case 3:qt(o,6);break;default:qt(o,2)}}}function Sc(o,c){let l=o.Qa+Math.floor(Math.random()*o.Za);return o.isActive()||(l*=2),l*c}function qt(o,c){if(o.j.info("Error code "+c),c==2){var l=d(o.bb,o),f=o.Ua;const w=!f;f=new ft(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Hn(f,"https"),Kr(f),w?Zf(f.toString(),l):ep(f.toString(),l)}else Pe(2);o.I=0,o.l&&o.l.pa(c),Pc(o),Ic(o)}n.bb=function(o){o?(this.j.info("Successfully pinged google.com"),Pe(2)):(this.j.info("Failed to ping google.com"),Pe(1))};function Pc(o){if(o.I=0,o.ja=[],o.l){const c=ic(o.h);(c.length!=0||o.i.length!=0)&&(D(o.ja,c),D(o.ja,o.i),o.h.i.length=0,b(o.i),o.i.length=0),o.l.oa()}}function bc(o,c,l){var f=l instanceof ft?We(l):new ft(l);if(f.g!="")c&&(f.g=c+"."+f.g),zn(f,f.u);else{var w=a.location;f=w.protocol,c=c?c+"."+w.hostname:w.hostname,w=+w.port;const A=new ft(null);f&&Hn(A,f),c&&(A.g=c),w&&zn(A,w),l&&(A.h=l),f=A}return l=o.G,c=o.wa,l&&c&&J(f,l,c),J(f,"VER",o.ka),Zn(o,f),f}function Cc(o,c,l){if(c&&!o.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Aa&&!o.ma?new te(new ki({ab:l})):new te(o.ma),c.Fa(o.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function kc(){}n=kc.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Zr(){}Zr.prototype.g=function(o,c){return new De(o,c)};function De(o,c){Te.call(this),this.g=new Ec(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(o?o["X-WebChannel-Client-Profile"]=c.sa:o={"X-WebChannel-Client-Profile":c.sa}),this.g.U=o,(o=c&&c.Qb)&&!g(o)&&(this.g.u=o),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new ln(this)}y(De,Te),De.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},De.prototype.close=function(){Vi(this.g)},De.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var l={};l.__data__=o,o=l}else this.v&&(l={},l.__data__=Ei(o),o=l);c.i.push(new Hf(c.Ya++,o)),c.I==3&&Jr(c)},De.prototype.N=function(){this.g.l=null,delete this.j,Vi(this.g),delete this.g,De.Z.N.call(this)};function Nc(o){Ii.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(const l in c){o=l;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}y(Nc,Ii);function Vc(){Ti.call(this),this.status=1}y(Vc,Ti);function ln(o){this.g=o}y(ln,kc),ln.prototype.ra=function(){Se(this.g,"a")},ln.prototype.qa=function(o){Se(this.g,new Nc(o))},ln.prototype.pa=function(o){Se(this.g,new Vc)},ln.prototype.oa=function(){Se(this.g,"b")},Zr.prototype.createWebChannel=Zr.prototype.g,De.prototype.send=De.prototype.o,De.prototype.open=De.prototype.m,De.prototype.close=De.prototype.close,Ph=function(){return new Zr},Sh=function(){return Wr()},Rh=Ft,uo={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Hr.NO_ERROR=0,Hr.TIMEOUT=8,Hr.HTTP_ERROR=6,ds=Hr,Ga.COMPLETE="complete",Ah=Ga,$a.EventType=Un,Un.OPEN="a",Un.CLOSE="b",Un.ERROR="c",Un.MESSAGE="d",Te.prototype.listen=Te.prototype.J,ir=$a,te.prototype.listenOnce=te.prototype.K,te.prototype.getLastError=te.prototype.Ha,te.prototype.getLastErrorCode=te.prototype.ya,te.prototype.getStatus=te.prototype.ca,te.prototype.getResponseJson=te.prototype.La,te.prototype.getResponseText=te.prototype.la,te.prototype.send=te.prototype.ea,te.prototype.setWithCredentials=te.prototype.Fa,vh=te}).apply(typeof ns<"u"?ns:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ve.UNAUTHENTICATED=new ve(null),ve.GOOGLE_CREDENTIALS=new ve("google-credentials-uid"),ve.FIRST_PARTY=new ve("first-party-uid"),ve.MOCK_USER=new ve("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dn="12.11.0";function by(n){Dn=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt=new Co("@firebase/firestore");function hn(){return Qt.logLevel}function V(n,...e){if(Qt.logLevel<=j.DEBUG){const t=e.map(jo);Qt.debug(`Firestore (${Dn}): ${n}`,...t)}}function ut(n,...e){if(Qt.logLevel<=j.ERROR){const t=e.map(jo);Qt.error(`Firestore (${Dn}): ${n}`,...t)}}function Yt(n,...e){if(Qt.logLevel<=j.WARN){const t=e.map(jo);Qt.warn(`Firestore (${Dn}): ${n}`,...t)}}function jo(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,bh(n,r,t)}function bh(n,e,t){let r=`FIRESTORE (${Dn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw ut(r),new Error(r)}function K(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||bh(e,s,r)}function U(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends et{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Cy{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(ve.UNAUTHENTICATED)))}shutdown(){}}class ky{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Ny{constructor(e){this.t=e,this.currentUser=ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){K(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let i=new bt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new bt,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const h=i;e.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},u=h=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>u(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new bt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(K(typeof r.accessToken=="string",31837,{l:r}),new Ch(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return K(e===null||typeof e=="string",2055,{h:e}),new ve(e)}}class Vy{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ve.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Dy{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Vy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(ve.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class du{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Oy{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ue(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){K(this.o===void 0,3512);const r=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new du(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(K(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new du(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ly(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Ly(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function $(n,e){return n<e?-1:n>e?1:0}function lo(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return zi(s)===zi(i)?$(s,i):zi(s)?1:-1}return $(n.length,e.length)}const My=55296,xy=57343;function zi(n){const e=n.charCodeAt(0);return e>=My&&e<=xy}function wn(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fu="__name__";class ze{constructor(e,t,r){t===void 0?t=0:t>e.length&&x(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&x(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return ze.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ze?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=ze.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return $(e.length,t.length)}static compareSegments(e,t){const r=ze.isNumericId(e),s=ze.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?ze.extractNumericId(e).compare(ze.extractNumericId(t)):lo(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Pt.fromString(e.substring(4,e.length-2))}}class Y extends ze{construct(e,t,r){return new Y(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new N(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new Y(t)}static emptyPath(){return new Y([])}}const Fy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ye extends ze{construct(e,t,r){return new ye(e,t,r)}static isValidIdentifier(e){return Fy.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ye.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===fu}static keyField(){return new ye([fu])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new N(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new N(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new N(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(i(),s++)}if(i(),a)throw new N(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ye(t)}static emptyPath(){return new ye([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(Y.fromString(e))}static fromName(e){return new L(Y.fromString(e).popFirst(5))}static empty(){return new L(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Y.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Y.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new Y(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(n,e,t){if(!t)throw new N(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Uy(n,e,t,r){if(e===!0&&r===!0)throw new N(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function pu(n){if(!L.isDocumentKey(n))throw new N(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function mu(n){if(L.isDocumentKey(n))throw new N(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Nh(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Gs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":x(12329,{type:typeof n})}function Ke(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new N(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Gs(n);throw new N(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(n,e){const t={typeString:n};return e&&(t.value=e),t}function Lr(n,e){if(!Nh(n))throw new N(S.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new N(S.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu=-62135596800,_u=1e6;class X{static now(){return X.fromMillis(Date.now())}static fromDate(e){return X.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*_u);return new X(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<gu)throw new N(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/_u}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:X._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Lr(e,X._jsonSchema))return new X(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-gu;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}X._jsonSchemaVersion="firestore/timestamp/1.0",X._jsonSchema={type:ae("string",X._jsonSchemaVersion),seconds:ae("number"),nanoseconds:ae("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static fromTimestamp(e){return new F(e)}static min(){return new F(new X(0,0))}static max(){return new F(new X(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr=-1;function By(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=F.fromTimestamp(r===1e9?new X(t+1,0):new X(t,r));return new kt(s,L.empty(),e)}function qy(n){return new kt(n.readTime,n.key,Tr)}class kt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new kt(F.min(),L.empty(),Tr)}static max(){return new kt(F.max(),L.empty(),Tr)}}function jy(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:$(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Wy{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function On(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==$y)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):P.reject(t)}static resolve(e){return new P(((t,r)=>{t(e)}))}static reject(e){return new P(((t,r)=>{r(e)}))}static waitFor(e){return new P(((t,r)=>{let s=0,i=0,a=!1;e.forEach((u=>{++s,u.next((()=>{++i,a&&i===s&&t()}),(h=>r(h)))})),a=!0,i===s&&t()}))}static or(e){let t=P.resolve(!1);for(const r of e)t=t.next((s=>s?P.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new P(((r,s)=>{const i=e.length,a=new Array(i);let u=0;for(let h=0;h<i;h++){const d=h;t(e[d]).next((p=>{a[d]=p,++u,u===i&&r(a)}),(p=>s(p)))}}))}static doWhile(e,t){return new P(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function Hy(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Ln(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Qs.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wo=-1;function Ys(n){return n==null}function Rs(n){return n===0&&1/n==-1/0}function zy(n){return typeof n=="number"&&Number.isInteger(n)&&!Rs(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh="";function Ky(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=yu(e)),e=Gy(n.get(t),e);return yu(e)}function Gy(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case Vh:t+="";break;default:t+=i}}return t}function yu(n){return n+Vh+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function rn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Dh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t){this.comparator=e,this.root=t||_e.EMPTY}insert(e,t){return new Z(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_e.BLACK,null,null))}remove(e){return new Z(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_e.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new rs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new rs(this.root,e,this.comparator,!1)}getReverseIterator(){return new rs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new rs(this.root,e,this.comparator,!0)}}class rs{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class _e{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??_e.RED,this.left=s??_e.EMPTY,this.right=i??_e.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new _e(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return _e.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return _e.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_e.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw x(27949);return e+(this.isRed()?0:1)}}_e.EMPTY=null,_e.RED=!0,_e.BLACK=!1;_e.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new _e(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.comparator=e,this.data=new Z(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Iu(this.data.getIterator())}getIteratorFrom(e){return new Iu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new le(this.comparator);return t.data=e,t}}class Iu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.fields=e,e.sort(ye.comparator)}static empty(){return new Be([])}unionWith(e){let t=new le(ye.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Be(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return wn(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Oh("Invalid base64 string: "+i):i}})(e);return new Ie(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new Ie(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ie.EMPTY_BYTE_STRING=new Ie("");const Qy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nt(n){if(K(!!n,39018),typeof n=="string"){let e=0;const t=Qy.exec(n);if(K(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:re(n.seconds),nanos:re(n.nanos)}}function re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Vt(n){return typeof n=="string"?Ie.fromBase64String(n):Ie.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh="server_timestamp",Mh="__type__",xh="__previous_value__",Fh="__local_write_time__";function Ho(n){return(n?.mapValue?.fields||{})[Mh]?.stringValue===Lh}function Js(n){const e=n.mapValue.fields[xh];return Ho(e)?Js(e):e}function wr(n){const e=Nt(n.mapValue.fields[Fh].timestampValue);return new X(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e,t,r,s,i,a,u,h,d,p,y){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=p,this.apiKey=y}}const ho="(default)";class vr{constructor(e,t){this.projectId=e,this.database=t||ho}static empty(){return new vr("","")}get isDefaultDatabase(){return this.database===ho}isEqual(e){return e instanceof vr&&e.projectId===this.projectId&&e.database===this.database}}function Jy(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new N(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vr(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh="__type__",Xy="__max__",ss={mapValue:{}},Bh="__vector__",Ss="value";function Dt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ho(n)?4:eE(n)?9007199254740991:Zy(n)?10:11:x(28295,{value:n})}function Ze(n,e){if(n===e)return!0;const t=Dt(n);if(t!==Dt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return wr(n).isEqual(wr(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=Nt(s.timestampValue),u=Nt(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Vt(s.bytesValue).isEqual(Vt(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return re(s.geoPointValue.latitude)===re(i.geoPointValue.latitude)&&re(s.geoPointValue.longitude)===re(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return re(s.integerValue)===re(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=re(s.doubleValue),u=re(i.doubleValue);return a===u?Rs(a)===Rs(u):isNaN(a)&&isNaN(u)}return!1})(n,e);case 9:return wn(n.arrayValue.values||[],e.arrayValue.values||[],Ze);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(Eu(a)!==Eu(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!Ze(a[h],u[h])))return!1;return!0})(n,e);default:return x(52216,{left:n})}}function Ar(n,e){return(n.values||[]).find((t=>Ze(t,e)))!==void 0}function vn(n,e){if(n===e)return 0;const t=Dt(n),r=Dt(e);if(t!==r)return $(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const u=re(i.integerValue||i.doubleValue),h=re(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(n,e);case 3:return Tu(n.timestampValue,e.timestampValue);case 4:return Tu(wr(n),wr(e));case 5:return lo(n.stringValue,e.stringValue);case 6:return(function(i,a){const u=Vt(i),h=Vt(a);return u.compareTo(h)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const u=i.split("/"),h=a.split("/");for(let d=0;d<u.length&&d<h.length;d++){const p=$(u[d],h[d]);if(p!==0)return p}return $(u.length,h.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const u=$(re(i.latitude),re(a.latitude));return u!==0?u:$(re(i.longitude),re(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return wu(n.arrayValue,e.arrayValue);case 10:return(function(i,a){const u=i.fields||{},h=a.fields||{},d=u[Ss]?.arrayValue,p=h[Ss]?.arrayValue,y=$(d?.values?.length||0,p?.values?.length||0);return y!==0?y:wu(d,p)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===ss.mapValue&&a===ss.mapValue)return 0;if(i===ss.mapValue)return 1;if(a===ss.mapValue)return-1;const u=i.fields||{},h=Object.keys(u),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let y=0;y<h.length&&y<p.length;++y){const R=lo(h[y],p[y]);if(R!==0)return R;const b=vn(u[h[y]],d[p[y]]);if(b!==0)return b}return $(h.length,p.length)})(n.mapValue,e.mapValue);default:throw x(23264,{he:t})}}function Tu(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return $(n,e);const t=Nt(n),r=Nt(e),s=$(t.seconds,r.seconds);return s!==0?s:$(t.nanos,r.nanos)}function wu(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=vn(t[s],r[s]);if(i)return i}return $(t.length,r.length)}function An(n){return fo(n)}function fo(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Nt(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Vt(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return L.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=fo(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${fo(t.fields[a])}`;return s+"}"})(n.mapValue):x(61005,{value:n})}function fs(n){switch(Dt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Js(n);return e?16+fs(e):16;case 5:return 2*n.stringValue.length;case 6:return Vt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+fs(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return rn(r.fields,((i,a)=>{s+=i.length+fs(a)})),s})(n.mapValue);default:throw x(13486,{value:n})}}function vu(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function po(n){return!!n&&"integerValue"in n}function zo(n){return!!n&&"arrayValue"in n}function Au(n){return!!n&&"nullValue"in n}function Ru(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ps(n){return!!n&&"mapValue"in n}function Zy(n){return(n?.mapValue?.fields||{})[Uh]?.stringValue===Bh}function fr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return rn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=fr(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=fr(n.arrayValue.values[t]);return e}return{...n}}function eE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Xy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.value=e}static empty(){return new Oe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ps(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=fr(t)}setAll(e){let t=ye.emptyPath(),r={},s=[];e.forEach(((a,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=fr(a):s.push(u.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());ps(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ze(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];ps(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){rn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Oe(fr(this.value))}}function qh(n){const e=[];return rn(n.fields,((t,r)=>{const s=new ye([t]);if(ps(r)){const i=qh(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new Be(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e,t,r,s,i,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(e){return new Ae(e,0,F.min(),F.min(),F.min(),Oe.empty(),0)}static newFoundDocument(e,t,r,s){return new Ae(e,1,t,F.min(),r,s,0)}static newNoDocument(e,t){return new Ae(e,2,t,F.min(),F.min(),Oe.empty(),0)}static newUnknownDocument(e,t){return new Ae(e,3,t,F.min(),F.min(),Oe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Oe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Oe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ae&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ae(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e,t){this.position=e,this.inclusive=t}}function Su(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=vn(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Pu(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ze(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t="asc"){this.field=e,this.dir=t}}function tE(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{}class oe extends jh{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new rE(e,t,r):t==="array-contains"?new oE(e,r):t==="in"?new aE(e,r):t==="not-in"?new cE(e,r):t==="array-contains-any"?new uE(e,r):new oe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new sE(e,r):new iE(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(vn(t,this.value)):t!==null&&Dt(this.value)===Dt(t)&&this.matchesComparison(vn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class $e extends jh{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new $e(e,t)}matches(e){return $h(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function $h(n){return n.op==="and"}function Wh(n){return nE(n)&&$h(n)}function nE(n){for(const e of n.filters)if(e instanceof $e)return!1;return!0}function mo(n){if(n instanceof oe)return n.field.canonicalString()+n.op.toString()+An(n.value);if(Wh(n))return n.filters.map((e=>mo(e))).join(",");{const e=n.filters.map((t=>mo(t))).join(",");return`${n.op}(${e})`}}function Hh(n,e){return n instanceof oe?(function(r,s){return s instanceof oe&&r.op===s.op&&r.field.isEqual(s.field)&&Ze(r.value,s.value)})(n,e):n instanceof $e?(function(r,s){return s instanceof $e&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,u)=>i&&Hh(a,s.filters[u])),!0):!1})(n,e):void x(19439)}function zh(n){return n instanceof oe?(function(t){return`${t.field.canonicalString()} ${t.op} ${An(t.value)}`})(n):n instanceof $e?(function(t){return t.op.toString()+" {"+t.getFilters().map(zh).join(" ,")+"}"})(n):"Filter"}class rE extends oe{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class sE extends oe{constructor(e,t){super(e,"in",t),this.keys=Kh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class iE extends oe{constructor(e,t){super(e,"not-in",t),this.keys=Kh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Kh(n,e){return(e.arrayValue?.values||[]).map((t=>L.fromName(t.referenceValue)))}class oE extends oe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return zo(t)&&Ar(t.arrayValue,this.value)}}class aE extends oe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ar(this.value.arrayValue,t)}}class cE extends oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ar(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ar(this.value.arrayValue,t)}}class uE extends oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!zo(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Ar(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lE{constructor(e,t=null,r=[],s=[],i=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Te=null}}function bu(n,e=null,t=[],r=[],s=null,i=null,a=null){return new lE(n,e,t,r,s,i,a)}function Ko(n){const e=U(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>mo(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Ys(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>An(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>An(r))).join(",")),e.Te=t}return e.Te}function Go(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!tE(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Hh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Pu(n.startAt,e.startAt)&&Pu(n.endAt,e.endAt)}function go(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e,t=null,r=[],s=[],i=null,a="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=h,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function hE(n,e,t,r,s,i,a,u){return new Mn(n,e,t,r,s,i,a,u)}function Xs(n){return new Mn(n)}function Cu(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function dE(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Gh(n){return n.collectionGroup!==null}function pr(n){const e=U(n);if(e.Ee===null){e.Ee=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ee.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new le(ye.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((d=>{d.isInequality()&&(u=u.add(d.field))}))})),u})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ee.push(new Rr(i,r))})),t.has(ye.keyField().canonicalString())||e.Ee.push(new Rr(ye.keyField(),r))}return e.Ee}function Ge(n){const e=U(n);return e.Ie||(e.Ie=fE(e,pr(n))),e.Ie}function fE(n,e){if(n.limitType==="F")return bu(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Rr(s.field,i)}));const t=n.endAt?new Ps(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ps(n.startAt.position,n.startAt.inclusive):null;return bu(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function _o(n,e){const t=n.filters.concat([e]);return new Mn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function pE(n,e){const t=n.explicitOrderBy.concat([e]);return new Mn(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function bs(n,e,t){return new Mn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Zs(n,e){return Go(Ge(n),Ge(e))&&n.limitType===e.limitType}function Qh(n){return`${Ko(Ge(n))}|lt:${n.limitType}`}function dn(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>zh(s))).join(", ")}]`),Ys(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>An(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>An(s))).join(",")),`Target(${r})`})(Ge(n))}; limitType=${n.limitType})`}function ei(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):L.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of pr(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,u,h){const d=Su(a,u,h);return a.inclusive?d<=0:d<0})(r.startAt,pr(r),s)||r.endAt&&!(function(a,u,h){const d=Su(a,u,h);return a.inclusive?d>=0:d>0})(r.endAt,pr(r),s))})(n,e)}function mE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Yh(n){return(e,t)=>{let r=!1;for(const s of pr(n)){const i=gE(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function gE(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):(function(i,a,u){const h=a.data.field(i),d=u.data.field(i);return h!==null&&d!==null?vn(h,d):x(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){rn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return Dh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E=new Z(L.comparator);function lt(){return _E}const Jh=new Z(L.comparator);function or(...n){let e=Jh;for(const t of n)e=e.insert(t.key,t);return e}function Xh(n){let e=Jh;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function Wt(){return mr()}function Zh(){return mr()}function mr(){return new sn((n=>n.toString()),((n,e)=>n.isEqual(e)))}const yE=new Z(L.comparator),EE=new le(L.comparator);function W(...n){let e=EE;for(const t of n)e=e.add(t);return e}const IE=new le($);function TE(){return IE}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Rs(e)?"-0":e}}function ed(n){return{integerValue:""+n}}function wE(n,e){return zy(e)?ed(e):Qo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(){this._=void 0}}function vE(n,e,t){return n instanceof Sr?(function(s,i){const a={fields:{[Mh]:{stringValue:Lh},[Fh]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ho(i)&&(i=Js(i)),i&&(a.fields[xh]=i),{mapValue:a}})(t,e):n instanceof Pr?nd(n,e):n instanceof br?rd(n,e):(function(s,i){const a=td(s,i),u=ku(a)+ku(s.Ae);return po(a)&&po(s.Ae)?ed(u):Qo(s.serializer,u)})(n,e)}function AE(n,e,t){return n instanceof Pr?nd(n,e):n instanceof br?rd(n,e):t}function td(n,e){return n instanceof Cs?(function(r){return po(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class Sr extends ti{}class Pr extends ti{constructor(e){super(),this.elements=e}}function nd(n,e){const t=sd(e);for(const r of n.elements)t.some((s=>Ze(s,r)))||t.push(r);return{arrayValue:{values:t}}}class br extends ti{constructor(e){super(),this.elements=e}}function rd(n,e){let t=sd(e);for(const r of n.elements)t=t.filter((s=>!Ze(s,r)));return{arrayValue:{values:t}}}class Cs extends ti{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function ku(n){return re(n.integerValue||n.doubleValue)}function sd(n){return zo(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RE{constructor(e,t){this.field=e,this.transform=t}}function SE(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Pr&&s instanceof Pr||r instanceof br&&s instanceof br?wn(r.elements,s.elements,Ze):r instanceof Cs&&s instanceof Cs?Ze(r.Ae,s.Ae):r instanceof Sr&&s instanceof Sr})(n.transform,e.transform)}class PE{constructor(e,t){this.version=e,this.transformResults=t}}class it{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new it}static exists(e){return new it(void 0,e)}static updateTime(e){return new it(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ms(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ni{}function id(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ad(n.key,it.none()):new Mr(n.key,n.data,it.none());{const t=n.data,r=Oe.empty();let s=new le(ye.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new on(n.key,r,new Be(s.toArray()),it.none())}}function bE(n,e,t){n instanceof Mr?(function(s,i,a){const u=s.value.clone(),h=Vu(s.fieldTransforms,i,a.transformResults);u.setAll(h),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):n instanceof on?(function(s,i,a){if(!ms(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=Vu(s.fieldTransforms,i,a.transformResults),h=i.data;h.setAll(od(s)),h.setAll(u),i.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function gr(n,e,t,r){return n instanceof Mr?(function(i,a,u,h){if(!ms(i.precondition,a))return u;const d=i.value.clone(),p=Du(i.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(n,e,t,r):n instanceof on?(function(i,a,u,h){if(!ms(i.precondition,a))return u;const d=Du(i.fieldTransforms,h,a),p=a.data;return p.setAll(od(i)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((y=>y.field)))})(n,e,t,r):(function(i,a,u){return ms(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(n,e,t)}function CE(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=td(r.transform,s||null);i!=null&&(t===null&&(t=Oe.empty()),t.set(r.field,i))}return t||null}function Nu(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&wn(r,s,((i,a)=>SE(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Mr extends ni{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class on extends ni{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function od(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Vu(n,e,t){const r=new Map;K(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,u=e.data.field(i.field);r.set(i.field,AE(a,u,t[s]))}return r}function Du(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,vE(i,a,e))}return r}class ad extends ni{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class kE extends ni{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&bE(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=gr(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=gr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Zh();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=t.has(s.key)?null:u;const h=id(a,u);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(F.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),W())}isEqual(e){return this.batchId===e.batchId&&wn(this.mutations,e.mutations,((t,r)=>Nu(t,r)))&&wn(this.baseMutations,e.baseMutations,((t,r)=>Nu(t,r)))}}class Yo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){K(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return yE})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Yo(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VE{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se,H;function OE(n){switch(n){case S.OK:return x(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return x(15467,{code:n})}}function cd(n){if(n===void 0)return ut("GRPC error has no .code"),S.UNKNOWN;switch(n){case se.OK:return S.OK;case se.CANCELLED:return S.CANCELLED;case se.UNKNOWN:return S.UNKNOWN;case se.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case se.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case se.INTERNAL:return S.INTERNAL;case se.UNAVAILABLE:return S.UNAVAILABLE;case se.UNAUTHENTICATED:return S.UNAUTHENTICATED;case se.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case se.NOT_FOUND:return S.NOT_FOUND;case se.ALREADY_EXISTS:return S.ALREADY_EXISTS;case se.PERMISSION_DENIED:return S.PERMISSION_DENIED;case se.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case se.ABORTED:return S.ABORTED;case se.OUT_OF_RANGE:return S.OUT_OF_RANGE;case se.UNIMPLEMENTED:return S.UNIMPLEMENTED;case se.DATA_LOSS:return S.DATA_LOSS;default:return x(39323,{code:n})}}(H=se||(se={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LE(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ME=new Pt([4294967295,4294967295],0);function Ou(n){const e=LE().encode(n),t=new wh;return t.update(e),new Uint8Array(t.digest())}function Lu(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Pt([t,r],0),new Pt([s,i],0)]}class Jo{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ar(`Invalid padding: ${t}`);if(r<0)throw new ar(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ar(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ar(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Pt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Pt.fromNumber(r)));return s.compare(ME)===1&&(s=new Pt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Ou(e),[r,s]=Lu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Jo(i,s,t);return r.forEach((u=>a.insert(u))),a}insert(e){if(this.ge===0)return;const t=Ou(e),[r,s]=Lu(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ar extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,xr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new ri(F.min(),s,new Z($),lt(),W())}}class xr{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new xr(r,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class ud{constructor(e,t){this.targetId=e,this.Ce=t}}class ld{constructor(e,t,r=Ie.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Mu{constructor(){this.ve=0,this.Fe=xu(),this.Me=Ie.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=W(),t=W(),r=W();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:x(38017,{changeType:i})}})),new xr(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=xu()}Ke(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,K(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class xE{constructor(e){this.Ge=e,this.ze=new Map,this.je=lt(),this.Je=is(),this.He=is(),this.Ze=new Z($)}Xe(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:x(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(go(i))if(r===0){const a=new L(i.path);this.et(t,a,Ae.newNoDocument(a,F.min()))}else K(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const u=this.ut(e),h=u?this.ct(u,e,a):1;if(h!==0){this.it(t);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,u;try{a=Vt(r).toUint8Array()}catch(h){if(h instanceof Oh)return Yt("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new Jo(a,s,i)}catch(h){return Yt(h instanceof ar?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.ge===0?null:u}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,a)=>{const u=this.ot(a);if(u){if(i.current&&go(u.target)){const h=new L(u.target.path);this.Et(h).has(a)||this.It(a,h)||this.et(a,h,Ae.newNoDocument(h,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=W();this.He.forEach(((i,a)=>{let u=!0;a.forEachWhile((h=>{const d=this.ot(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new ri(e,t,this.Ze,this.je,r);return this.je=lt(),this.Je=is(),this.He=is(),this.Ze=new Z($),s}Ye(e,t){if(!this.rt(e))return;const r=this.It(e,t.key)?2:0;this.nt(e).Ke(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.Et(t.key).add(e)),this.He=this.He.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.It(e,t)?s.Ke(t,1):s.Ue(t),this.He=this.He.insert(t,this.Rt(t).delete(e)),this.He=this.He.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Mu,this.ze.set(e,t)),t}Rt(e){let t=this.He.get(e);return t||(t=new le($),this.He=this.He.insert(e,t)),t}Et(e){let t=this.Je.get(e);return t||(t=new le($),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Mu),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}It(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function is(){return new Z(L.comparator)}function xu(){return new Z(L.comparator)}const FE={asc:"ASCENDING",desc:"DESCENDING"},UE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},BE={and:"AND",or:"OR"};class qE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function yo(n,e){return n.useProto3Json||Ys(e)?e:{value:e}}function ks(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function hd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function jE(n,e){return ks(n,e.toTimestamp())}function Qe(n){return K(!!n,49232),F.fromTimestamp((function(t){const r=Nt(t);return new X(r.seconds,r.nanos)})(n))}function Xo(n,e){return Eo(n,e).canonicalString()}function Eo(n,e){const t=(function(s){return new Y(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function dd(n){const e=Y.fromString(n);return K(_d(e),10190,{key:e.toString()}),e}function Io(n,e){return Xo(n.databaseId,e.path)}function Ki(n,e){const t=dd(e);if(t.get(1)!==n.databaseId.projectId)throw new N(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new N(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(pd(t))}function fd(n,e){return Xo(n.databaseId,e)}function $E(n){const e=dd(n);return e.length===4?Y.emptyPath():pd(e)}function To(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function pd(n){return K(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Fu(n,e,t){return{name:Io(n,e),fields:t.value.mapValue.fields}}function WE(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:x(39313,{state:d})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(d,p){return d.useProto3Json?(K(p===void 0||typeof p=="string",58123),Ie.fromBase64String(p||"")):(K(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),Ie.fromUint8Array(p||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&(function(d){const p=d.code===void 0?S.UNKNOWN:cd(d.code);return new N(p,d.message||"")})(a);t=new ld(r,s,i,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Ki(n,r.document.name),i=Qe(r.document.updateTime),a=r.document.createTime?Qe(r.document.createTime):F.min(),u=new Oe({mapValue:{fields:r.document.fields}}),h=Ae.newFoundDocument(s,i,a,u),d=r.targetIds||[],p=r.removedTargetIds||[];t=new gs(d,p,h.key,h)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Ki(n,r.document),i=r.readTime?Qe(r.readTime):F.min(),a=Ae.newNoDocument(s,i),u=r.removedTargetIds||[];t=new gs([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Ki(n,r.document),i=r.removedTargetIds||[];t=new gs([],i,s,null)}else{if(!("filter"in e))return x(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new DE(s,i),u=r.targetId;t=new ud(u,a)}}return t}function HE(n,e){let t;if(e instanceof Mr)t={update:Fu(n,e.key,e.value)};else if(e instanceof ad)t={delete:Io(n,e.key)};else if(e instanceof on)t={update:Fu(n,e.key,e.data),updateMask:eI(e.fieldMask)};else{if(!(e instanceof kE))return x(16599,{dt:e.type});t={verify:Io(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const u=a.transform;if(u instanceof Sr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Pr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof br)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Cs)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw x(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:jE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:x(27497)})(n,e.precondition)),t}function zE(n,e){return n&&n.length>0?(K(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?Qe(s.updateTime):Qe(i);return a.isEqual(F.min())&&(a=Qe(i)),new PE(a,s.transformResults||[])})(t,e)))):[]}function KE(n,e){return{documents:[fd(n,e.path)]}}function GE(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=fd(n,s);const i=(function(d){if(d.length!==0)return gd($e.create(d,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(d){if(d.length!==0)return d.map((p=>(function(R){return{field:fn(R.field),direction:JE(R.dir)}})(p)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const u=yo(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{ft:t,parent:s}}function QE(n){let e=$E(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){K(r===1,65062);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];t.where&&(i=(function(y){const R=md(y);return R instanceof $e&&Wh(R)?R.getFilters():[R]})(t.where));let a=[];t.orderBy&&(a=(function(y){return y.map((R=>(function(D){return new Rr(pn(D.field),(function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(R)))})(t.orderBy));let u=null;t.limit&&(u=(function(y){let R;return R=typeof y=="object"?y.value:y,Ys(R)?null:R})(t.limit));let h=null;t.startAt&&(h=(function(y){const R=!!y.before,b=y.values||[];return new Ps(b,R)})(t.startAt));let d=null;return t.endAt&&(d=(function(y){const R=!y.before,b=y.values||[];return new Ps(b,R)})(t.endAt)),hE(e,s,a,i,u,"F",h,d)}function YE(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function md(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=pn(t.unaryFilter.field);return oe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=pn(t.unaryFilter.field);return oe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=pn(t.unaryFilter.field);return oe.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=pn(t.unaryFilter.field);return oe.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}})(n):n.fieldFilter!==void 0?(function(t){return oe.create(pn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return $e.create(t.compositeFilter.filters.map((r=>md(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return x(1026)}})(t.compositeFilter.op))})(n):x(30097,{filter:n})}function JE(n){return FE[n]}function XE(n){return UE[n]}function ZE(n){return BE[n]}function fn(n){return{fieldPath:n.canonicalString()}}function pn(n){return ye.fromServerFormat(n.fieldPath)}function gd(n){return n instanceof oe?(function(t){if(t.op==="=="){if(Ru(t.value))return{unaryFilter:{field:fn(t.field),op:"IS_NAN"}};if(Au(t.value))return{unaryFilter:{field:fn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ru(t.value))return{unaryFilter:{field:fn(t.field),op:"IS_NOT_NAN"}};if(Au(t.value))return{unaryFilter:{field:fn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:fn(t.field),op:XE(t.op),value:t.value}}})(n):n instanceof $e?(function(t){const r=t.getFilters().map((s=>gd(s)));return r.length===1?r[0]:{compositeFilter:{op:ZE(t.op),filters:r}}})(n):x(54877,{filter:n})}function eI(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function _d(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function yd(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,t,r,s,i=F.min(),a=F.min(),u=Ie.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(e){return new At(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new At(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new At(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new At(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e){this.yt=e}}function nI(n){const e=QE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?bs(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(){this.bn=new sI}addToCollectionParentIndex(e,t){return this.bn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.bn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(kt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(kt.min())}updateCollectionGroup(e,t,r){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class sI{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new le(Y.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new le(Y.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ed=41943040;class Ne{static withCacheSize(e){return new Ne(e,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ne.DEFAULT_COLLECTION_PERCENTILE=10,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ne.DEFAULT=new Ne(Ed,Ne.DEFAULT_COLLECTION_PERCENTILE,Ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ne.DISABLED=new Ne(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Rn(0)}static ar(){return new Rn(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu="LruGarbageCollector",iI=1048576;function qu([n,e],[t,r]){const s=$(n,t);return s===0?$(e,r):s}class oI{constructor(e){this.Pr=e,this.buffer=new le(qu),this.Tr=0}Er(){return++this.Tr}Ir(e){const t=[e,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();qu(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class aI{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){V(Bu,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ln(t)?V(Bu,"Ignoring IndexedDB error during garbage collection: ",t):await On(t)}await this.Ar(3e5)}))}}class cI{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return P.resolve(Qs.ce);const r=new oI(t);return this.Vr.forEachTarget(e,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(e,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(Uu)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Uu):this.gr(e,t)))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,s,i,a,u,h,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((y=>(y>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${y}`),s=this.params.maximumSequenceNumbersToCollect):s=y,a=Date.now(),this.nthSequenceNumber(e,s)))).next((y=>(r=y,u=Date.now(),this.removeTargets(e,r,t)))).next((y=>(i=y,h=Date.now(),this.removeOrphanedDocuments(e,r)))).next((y=>(d=Date.now(),hn()<=j.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(h-u)+`ms
	Removed ${y} documents in `+(d-h)+`ms
Total Duration: ${d-p}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:y}))))}}function uI(n,e){return new cI(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(){this.changes=new sn((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ae.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?P.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&gr(r.mutation,s,Be.empty(),X.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,W()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=W()){const s=Wt();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=or();return i.forEach(((u,h)=>{a=a.insert(u,h.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=Wt();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,W())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,u)=>{t.set(a,u)}))}))}computeViews(e,t,r,s){let i=lt();const a=mr(),u=(function(){return mr()})();return t.forEach(((h,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof on)?i=i.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),gr(p.mutation,d,p.mutation.getFieldMask(),X.now())):a.set(d.key,Be.empty())})),this.recalculateAndSaveOverlays(e,i).next((h=>(h.forEach(((d,p)=>a.set(d,p))),t.forEach(((d,p)=>u.set(d,new hI(p,a.get(d)??null)))),u)))}recalculateAndSaveOverlays(e,t){const r=mr();let s=new Z(((a,u)=>a-u)),i=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const u of a)u.keys().forEach((h=>{const d=t.get(h);if(d===null)return;let p=r.get(h)||Be.empty();p=u.applyToLocalView(d,p),r.set(h,p);const y=(s.get(u.batchId)||W()).add(h);s=s.insert(u.batchId,y)}))})).next((()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),d=h.key,p=h.value,y=Zh();p.forEach((R=>{if(!i.has(R)){const b=id(t.get(R),r.get(R));b!==null&&y.set(R,b),i=i.add(R)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,y))}return P.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return dE(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Gh(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):P.resolve(Wt());let u=Tr,h=i;return a.next((d=>P.forEach(d,((p,y)=>(u<y.largestBatchId&&(u=y.largestBatchId),i.get(p)?P.resolve():this.remoteDocumentCache.getEntry(e,p).next((R=>{h=h.insert(p,R)}))))).next((()=>this.populateOverlays(e,d,i))).next((()=>this.computeViews(e,h,d,W()))).next((p=>({batchId:u,changes:Xh(p)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next((r=>{let s=or();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=or();return this.indexManager.getCollectionParents(e,i).next((u=>P.forEach(u,(h=>{const d=(function(y,R){return new Mn(R,null,y.explicitOrderBy.slice(),y.filters.slice(),y.limit,y.limitType,y.startAt,y.endAt)})(t,h.child(i));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next((p=>{p.forEach(((y,R)=>{a=a.insert(y,R)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((h,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,Ae.newInvalidDocument(p)))}));let u=or();return a.forEach(((h,d)=>{const p=i.get(h);p!==void 0&&gr(p.mutation,d,Be.empty(),X.now()),ei(t,d)&&(u=u.insert(h,d))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return P.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Qe(s.createTime)}})(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,(function(s){return{name:s.name,query:nI(s.bundledQuery),readTime:Qe(s.readTime)}})(t)),P.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(){this.overlays=new Z(L.comparator),this.Lr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Wt();return P.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),P.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Lr.delete(r)),P.resolve()}getOverlaysForCollection(e,t,r){const s=Wt(),i=t.length+1,a=new L(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,d=h.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===i&&h.largestBatchId>r&&s.set(h.getKey(),h)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new Z(((d,p)=>d-p));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=i.get(d.largestBatchId);p===null&&(p=Wt(),i=i.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const u=Wt(),h=i.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((d,p)=>u.set(d,p))),!(u.size()>=s)););return P.resolve(u)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new VE(t,r));let i=this.Lr.get(t);i===void 0&&(i=W(),this.Lr.set(t,i)),this.Lr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(){this.sessionToken=Ie.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(){this.kr=new le(pe.qr),this.Kr=new le(pe.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new pe(e,t);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Wr(new pe(e,t))}Qr(e,t){e.forEach((r=>this.removeReference(r,t)))}Gr(e){const t=new L(new Y([])),r=new pe(t,e),s=new pe(t,e+1),i=[];return this.Kr.forEachInRange([r,s],(a=>{this.Wr(a),i.push(a.key)})),i}zr(){this.kr.forEach((e=>this.Wr(e)))}Wr(e){this.kr=this.kr.delete(e),this.Kr=this.Kr.delete(e)}jr(e){const t=new L(new Y([])),r=new pe(t,e),s=new pe(t,e+1);let i=W();return this.Kr.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new pe(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class pe{constructor(e,t){this.key=e,this.Jr=t}static qr(e,t){return L.comparator(e.key,t.key)||$(e.Jr,t.Jr)}static Ur(e,t){return $(e.Jr,t.Jr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Hr=new le(pe.qr)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new NE(i,t,r,s);this.mutationQueue.push(a);for(const u of s)this.Hr=this.Hr.add(new pe(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return P.resolve(a)}lookupMutationBatch(e,t){return P.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.Xr(r),i=s<0?0:s;return P.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Wo:this.Yn-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new pe(t,0),s=new pe(t,Number.POSITIVE_INFINITY),i=[];return this.Hr.forEachInRange([r,s],(a=>{const u=this.Zr(a.Jr);i.push(u)})),P.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new le($);return t.forEach((s=>{const i=new pe(s,0),a=new pe(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([i,a],(u=>{r=r.add(u.Jr)}))})),P.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;L.isDocumentKey(i)||(i=i.child(""));const a=new pe(new L(i),0);let u=new le($);return this.Hr.forEachWhile((h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(u=u.add(h.Jr)),!0)}),a),P.resolve(this.Yr(u))}Yr(e){const t=[];return e.forEach((r=>{const s=this.Zr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){K(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return P.forEach(t.mutations,(s=>{const i=new pe(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Hr=r}))}nr(e){}containsKey(e,t){const r=new pe(t,0),s=this.Hr.firstAfterOrEqual(r);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{constructor(e){this.ti=e,this.docs=(function(){return new Z(L.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return P.resolve(r?r.document.mutableCopy():Ae.newInvalidDocument(t))}getEntries(e,t){let r=lt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ae.newInvalidDocument(s))})),P.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=lt();const a=t.path,u=new L(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:d,value:{document:p}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||jy(qy(p),r)<=0||(s.has(p.key)||ei(t,p))&&(i=i.insert(p.key,p.mutableCopy()))}return P.resolve(i)}getAllFromCollectionGroup(e,t,r,s){x(9500)}ni(e,t){return P.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new yI(this)}getSize(e){return P.resolve(this.size)}}class yI extends lI{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Mr.addEntry(e,s)):this.Mr.removeEntry(r)})),P.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(e){this.persistence=e,this.ri=new sn((t=>Ko(t)),Go),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.ii=0,this.si=new Zo,this.targetCount=0,this.oi=Rn._r()}forEachTarget(e,t){return this.ri.forEach(((r,s)=>t(s))),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),P.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Rn(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.lr(t),P.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.ri.forEach(((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.ri.delete(a),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)})),P.waitFor(i).next((()=>s))}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return P.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),P.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),P.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),P.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return P.resolve(r)}containsKey(e,t){return P.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e,t){this._i={},this.overlays={},this.ai=new Qs(0),this.ui=!1,this.ui=!0,this.ci=new mI,this.referenceDelegate=e(this),this.li=new EI(this),this.indexManager=new rI,this.remoteDocumentCache=(function(s){return new _I(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new tI(t),this.Pi=new fI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new pI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new gI(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){V("MemoryPersistence","Starting transaction:",e);const s=new II(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((i=>this.referenceDelegate.Ei(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ii(e,t){return P.or(Object.values(this._i).map((r=>()=>r.containsKey(e,t))))}}class II extends Wy{constructor(e){super(),this.currentSequenceNumber=e}}class ea{constructor(e){this.persistence=e,this.Ri=new Zo,this.Ai=null}static Vi(e){return new ea(e)}get di(){if(this.Ai)return this.Ai;throw x(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),P.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),P.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.di.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ti(){this.Ai=new Set}Ei(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.di,(r=>{const s=L.fromPath(r);return this.mi(e,s).next((i=>{i||t.removeEntry(s,F.min())}))})).next((()=>(this.Ai=null,t.apply(e))))}updateLimboDocument(e,t){return this.mi(e,t).next((r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())}))}hi(e){return 0}mi(e,t){return P.or([()=>P.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ii(e,t)])}}class Ns{constructor(e,t){this.persistence=e,this.fi=new sn((r=>Ky(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=uI(this,t)}static Vi(e,t){return new Ns(e,t)}Ti(){}Ei(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}pr(e){let t=0;return this.mr(e,(r=>{t++})).next((()=>t))}mr(e,t){return P.forEach(this.fi,((r,s)=>this.wr(e,r,s).next((i=>i?P.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ni(e,(a=>this.wr(e,a,t).next((u=>{u||(r++,i.removeEntry(a,F.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),P.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),P.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=fs(e.data.value)),t}wr(e,t,r){return P.or([()=>this.persistence.Ii(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.fi.get(t);return P.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Ts=r,this.Es=s}static Is(e,t){let r=W(),s=W();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ta(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wI{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return vp()?8:Hy(Re())>0?6:4})()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.gs(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ps(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new TI;return this.ys(e,t,a).next((u=>{if(i.result=u,this.As)return this.ws(e,t,a,u.size)}))})).next((()=>i.result))}ws(e,t,r,s){return r.documentReadCount<this.Vs?(hn()<=j.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",dn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),P.resolve()):(hn()<=j.DEBUG&&V("QueryEngine","Query:",dn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(hn()<=j.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",dn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ge(t))):P.resolve())}gs(e,t){if(Cu(t))return P.resolve(null);let r=Ge(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=bs(t,null,"F"),r=Ge(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=W(...i);return this.fs.getDocuments(e,a).next((u=>this.indexManager.getMinOffset(e,r).next((h=>{const d=this.Ss(t,u);return this.bs(t,d,a,h.readTime)?this.gs(e,bs(t,null,"F")):this.Ds(e,d,t,h)}))))})))))}ps(e,t,r,s){return Cu(t)||s.isEqual(F.min())?P.resolve(null):this.fs.getDocuments(e,r).next((i=>{const a=this.Ss(t,i);return this.bs(t,a,r,s)?P.resolve(null):(hn()<=j.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),dn(t)),this.Ds(e,a,t,By(s,Tr)).next((u=>u)))}))}Ss(e,t){let r=new le(Yh(e));return t.forEach(((s,i)=>{ei(e,i)&&(r=r.add(i))})),r}bs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ys(e,t,r){return hn()<=j.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",dn(t)),this.fs.getDocumentsMatchingQuery(e,t,kt.min(),r)}Ds(e,t,r,s){return this.fs.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const na="LocalStore",vI=3e8;class AI{constructor(e,t,r,s){this.persistence=e,this.Cs=t,this.serializer=s,this.vs=new Z($),this.Fs=new sn((i=>Ko(i)),Go),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new dI(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.vs)))}}function RI(n,e,t,r){return new AI(n,e,t,r)}async function Td(n,e){const t=U(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Os(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],u=[];let h=W();for(const d of s){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of i){u.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return t.localDocuments.getDocuments(r,h).next((d=>({Ns:d,removedBatchIds:a,addedBatchIds:u})))}))}))}function SI(n,e){const t=U(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.xs.newChangeBuffer({trackRemovals:!0});return(function(u,h,d,p){const y=d.batch,R=y.keys();let b=P.resolve();return R.forEach((D=>{b=b.next((()=>p.getEntry(h,D))).next((M=>{const O=d.docVersions.get(D);K(O!==null,48541),M.version.compareTo(O)<0&&(y.applyToRemoteDocument(M,d),M.isValidDocument()&&(M.setReadTime(d.commitVersion),p.addEntry(M)))}))})),b.next((()=>u.mutationQueue.removeMutationBatch(h,y)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(u){let h=W();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(h=h.add(u.batch.mutations[d].key));return h})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function wd(n){const e=U(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.li.getLastRemoteSnapshotVersion(t)))}function PI(n,e){const t=U(n),r=e.snapshotVersion;let s=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.xs.newChangeBuffer({trackRemovals:!0});s=t.vs;const u=[];e.targetChanges.forEach(((p,y)=>{const R=s.get(y);if(!R)return;u.push(t.li.removeMatchingKeys(i,p.removedDocuments,y).next((()=>t.li.addMatchingKeys(i,p.addedDocuments,y))));let b=R.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(y)!==null?b=b.withResumeToken(Ie.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):p.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(p.resumeToken,r)),s=s.insert(y,b),(function(M,O,z){return M.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=vI?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0})(R,b,p)&&u.push(t.li.updateTargetData(i,b))}));let h=lt(),d=W();if(e.documentUpdates.forEach((p=>{e.resolvedLimboDocuments.has(p)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,p))})),u.push(bI(i,a,e.documentUpdates).next((p=>{h=p.Bs,d=p.Ls}))),!r.isEqual(F.min())){const p=t.li.getLastRemoteSnapshotVersion(i).next((y=>t.li.setTargetsMetadata(i,i.currentSequenceNumber,r)));u.push(p)}return P.waitFor(u).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,h,d))).next((()=>h))})).then((i=>(t.vs=s,i)))}function bI(n,e,t){let r=W(),s=W();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=lt();return t.forEach(((u,h)=>{const d=i.get(u);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),h.isNoDocument()&&h.version.isEqual(F.min())?(e.removeEntry(u,h.readTime),a=a.insert(u,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(h),a=a.insert(u,h)):V(na,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",h.version)})),{Bs:a,Ls:s}}))}function CI(n,e){const t=U(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Wo),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function kI(n,e){const t=U(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.li.getTargetData(r,e).next((i=>i?(s=i,P.resolve(s)):t.li.allocateTargetId(r).next((a=>(s=new At(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r}))}async function wo(n,e,t){const r=U(n),s=r.vs.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Ln(a))throw a;V(na,`Failed to update sequence numbers for target ${e}: ${a}`)}r.vs=r.vs.remove(e),r.Fs.delete(s.target)}function ju(n,e,t){const r=U(n);let s=F.min(),i=W();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,d,p){const y=U(h),R=y.Fs.get(p);return R!==void 0?P.resolve(y.vs.get(R)):y.li.getTargetData(d,p)})(r,a,Ge(e)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,u.targetId).next((h=>{i=h}))})).next((()=>r.Cs.getDocumentsMatchingQuery(a,e,t?s:F.min(),t?i:W()))).next((u=>(NI(r,mE(e),u),{documents:u,ks:i})))))}function NI(n,e,t){let r=n.Ms.get(e)||F.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Ms.set(e,r)}class $u{constructor(){this.activeTargetIds=TE()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class VI{constructor(){this.vo=new $u,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new $u,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu="ConnectivityMonitor";class Hu{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){V(Wu,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){V(Wu,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let os=null;function vo(){return os===null?os=(function(){return 268435456+Math.round(2147483648*Math.random())})():os++,"0x"+os.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi="RestConnection",OI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class LI{get qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=t+"://"+e.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===ho?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(e,t,r,s,i){const a=vo(),u=this.Qo(e,t.toUriEncodedString());V(Gi,`Sending RPC '${e}' ${a}:`,u,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(h,s,i);const{host:d}=new URL(u),p=kr(d);return this.zo(e,u,h,r,p).then((y=>(V(Gi,`Received RPC '${e}' ${a}: `,y),y)),(y=>{throw Yt(Gi,`RPC '${e}' ${a} failed with error: `,y,"url: ",u,"request:",r),y}))}jo(e,t,r,s,i,a){return this.Wo(e,t,r,s,i)}Go(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Dn})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}Qo(e,t){const r=OI[e];let s=`${this.Ko}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MI{constructor(e){this.Jo=e.Jo,this.Ho=e.Ho}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Ho()}send(e){this.Jo(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we="WebChannelConnection",tr=(n,e,t)=>{n.listen(e,(r=>{try{t(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class En extends LI{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!En.c_){const e=Sh();tr(e,Rh.STAT_EVENT,(t=>{t.stat===uo.PROXY?V(we,"STAT_EVENT: detected buffering proxy"):t.stat===uo.NOPROXY&&V(we,"STAT_EVENT: detected no buffering proxy")})),En.c_=!0}}zo(e,t,r,s,i){const a=vo();return new Promise(((u,h)=>{const d=new vh;d.setWithCredentials(!0),d.listenOnce(Ah.COMPLETE,(()=>{try{switch(d.getLastErrorCode()){case ds.NO_ERROR:const y=d.getResponseJson();V(we,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(y)),u(y);break;case ds.TIMEOUT:V(we,`RPC '${e}' ${a} timed out`),h(new N(S.DEADLINE_EXCEEDED,"Request time out"));break;case ds.HTTP_ERROR:const R=d.getStatus();if(V(we,`RPC '${e}' ${a} failed with status:`,R,"response text:",d.getResponseText()),R>0){let b=d.getResponseJson();Array.isArray(b)&&(b=b[0]);const D=b?.error;if(D&&D.status&&D.message){const M=(function(z){const G=z.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(G)>=0?G:S.UNKNOWN})(D.status);h(new N(M,D.message))}else h(new N(S.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new N(S.UNAVAILABLE,"Connection failed."));break;default:x(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{V(we,`RPC '${e}' ${a} completed.`)}}));const p=JSON.stringify(s);V(we,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",p,r,15)}))}T_(e,t,r){const s=vo(),i=[this.Ko,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Go(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const d=i.join("");V(we,`Creating RPC '${e}' stream ${s}: ${d}`,u);const p=a.createWebChannel(d,u);this.E_(p);let y=!1,R=!1;const b=new MI({Jo:D=>{R?V(we,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(y||(V(we,`Opening RPC '${e}' stream ${s} transport.`),p.open(),y=!0),V(we,`RPC '${e}' stream ${s} sending:`,D),p.send(D))},Ho:()=>p.close()});return tr(p,ir.EventType.OPEN,(()=>{R||(V(we,`RPC '${e}' stream ${s} transport opened.`),b.i_())})),tr(p,ir.EventType.CLOSE,(()=>{R||(R=!0,V(we,`RPC '${e}' stream ${s} transport closed`),b.o_(),this.I_(p))})),tr(p,ir.EventType.ERROR,(D=>{R||(R=!0,Yt(we,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),b.o_(new N(S.UNAVAILABLE,"The operation could not be completed")))})),tr(p,ir.EventType.MESSAGE,(D=>{if(!R){const M=D.data[0];K(!!M,16349);const O=M,z=O?.error||O[0]?.error;if(z){V(we,`RPC '${e}' stream ${s} received error:`,z);const G=z.status;let ee=(function(ge){const I=se[ge];if(I!==void 0)return cd(I)})(G),Ce=z.message;G==="NOT_FOUND"&&Ce.includes("database")&&Ce.includes("does not exist")&&Ce.includes(this.databaseId.database)&&Yt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ee===void 0&&(ee=S.INTERNAL,Ce="Unknown error status: "+G+" with message "+z.message),R=!0,b.o_(new N(ee,Ce)),p.close()}else V(we,`RPC '${e}' stream ${s} received:`,M),b.__(M)}})),En.u_(),setTimeout((()=>{b.s_()}),0),b}terminate(){this.a_.forEach((e=>e.close())),this.a_=[]}E_(e){this.a_.push(e)}I_(e){this.a_=this.a_.filter((t=>t===e))}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Ph()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xI(n){return new En(n)}function Qi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(n){return new qE(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */En.c_=!1;class vd{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=s,this.V_=i,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zu="PersistentStream";class Ad{constructor(e,t,r,s,i,a,u,h){this.Ci=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new vd(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.K_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.K_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(ut(t.toString()),ut("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new N(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return V(zu,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget((()=>this.D_===e?t():(V(zu,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class FI extends Ad{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=WE(this.serializer,e),r=(function(i){if(!("targetChange"in i))return F.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?Qe(a.readTime):F.min()})(e);return this.listener.H_(t,r)}Z_(e){const t={};t.database=To(this.serializer),t.addTarget=(function(i,a){let u;const h=a.target;if(u=go(h)?{documents:KE(i,h)}:{query:GE(i,h).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=hd(i,a.resumeToken);const d=yo(i,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(F.min())>0){u.readTime=ks(i,a.snapshotVersion.toTimestamp());const d=yo(i,a.expectedCount);d!==null&&(u.expectedCount=d)}return u})(this.serializer,e);const r=YE(this.serializer,e);r&&(t.labels=r),this.q_(t)}X_(e){const t={};t.database=To(this.serializer),t.removeTarget=e,this.q_(t)}}class UI extends Ad{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return K(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,K(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){K(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=zE(e.writeResults,e.commitTime),r=Qe(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=To(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>HE(this.serializer,r)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BI{}class qI extends BI{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new N(S.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Wo(e,Eo(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(S.UNKNOWN,i.toString())}))}jo(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.jo(e,Eo(t,r),s,a,u,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new N(S.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function jI(n,e,t,r){return new qI(n,e,t,r)}class $I{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(ut(t),this.aa=!1):V("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="RemoteStore";class WI{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=i,this.Aa.Mo((a=>{r.enqueueAndForget((async()=>{an(this)&&(V(Jt,"Restarting streams for network reachability change."),await(async function(h){const d=U(h);d.Ia.add(4),await Fr(d),d.Va.set("Unknown"),d.Ia.delete(4),await ii(d)})(this))}))})),this.Va=new $I(r,s)}}async function ii(n){if(an(n))for(const e of n.Ra)await e(!0)}async function Fr(n){for(const e of n.Ra)await e(!1)}function Rd(n,e){const t=U(n);t.Ea.has(e.targetId)||(t.Ea.set(e.targetId,e),oa(t)?ia(t):xn(t).O_()&&sa(t,e))}function ra(n,e){const t=U(n),r=xn(t);t.Ea.delete(e),r.O_()&&Sd(t,e),t.Ea.size===0&&(r.O_()?r.L_():an(t)&&t.Va.set("Unknown"))}function sa(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(F.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}xn(n).Z_(e)}function Sd(n,e){n.da.$e(e),xn(n).X_(e)}function ia(n){n.da=new xE({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ea.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),xn(n).start(),n.Va.ua()}function oa(n){return an(n)&&!xn(n).x_()&&n.Ea.size>0}function an(n){return U(n).Ia.size===0}function Pd(n){n.da=void 0}async function HI(n){n.Va.set("Online")}async function zI(n){n.Ea.forEach(((e,t)=>{sa(n,e)}))}async function KI(n,e){Pd(n),oa(n)?(n.Va.ha(e),ia(n)):n.Va.set("Unknown")}async function GI(n,e,t){if(n.Va.set("Online"),e instanceof ld&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const u of i.targetIds)s.Ea.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ea.delete(u),s.da.removeTarget(u))})(n,e)}catch(r){V(Jt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Vs(n,r)}else if(e instanceof gs?n.da.Xe(e):e instanceof ud?n.da.st(e):n.da.tt(e),!t.isEqual(F.min()))try{const r=await wd(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const u=i.da.Tt(a);return u.targetChanges.forEach(((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const p=i.Ea.get(d);p&&i.Ea.set(d,p.withResumeToken(h.resumeToken,a))}})),u.targetMismatches.forEach(((h,d)=>{const p=i.Ea.get(h);if(!p)return;i.Ea.set(h,p.withResumeToken(Ie.EMPTY_BYTE_STRING,p.snapshotVersion)),Sd(i,h);const y=new At(p.target,h,d,p.sequenceNumber);sa(i,y)})),i.remoteSyncer.applyRemoteEvent(u)})(n,t)}catch(r){V(Jt,"Failed to raise snapshot:",r),await Vs(n,r)}}async function Vs(n,e,t){if(!Ln(e))throw e;n.Ia.add(1),await Fr(n),n.Va.set("Offline"),t||(t=()=>wd(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{V(Jt,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await ii(n)}))}function bd(n,e){return e().catch((t=>Vs(n,t,e)))}async function oi(n){const e=U(n),t=Ot(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Wo;for(;QI(e);)try{const s=await CI(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,YI(e,s)}catch(s){await Vs(e,s)}Cd(e)&&kd(e)}function QI(n){return an(n)&&n.Ta.length<10}function YI(n,e){n.Ta.push(e);const t=Ot(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function Cd(n){return an(n)&&!Ot(n).x_()&&n.Ta.length>0}function kd(n){Ot(n).start()}async function JI(n){Ot(n).ra()}async function XI(n){const e=Ot(n);for(const t of n.Ta)e.ea(t.mutations)}async function ZI(n,e,t){const r=n.Ta.shift(),s=Yo.from(r,e,t);await bd(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await oi(n)}async function eT(n,e){e&&Ot(n).Y_&&await(async function(r,s){if((function(a){return OE(a)&&a!==S.ABORTED})(s.code)){const i=r.Ta.shift();Ot(r).B_(),await bd(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await oi(r)}})(n,e),Cd(n)&&kd(n)}async function Ku(n,e){const t=U(n);t.asyncQueue.verifyOperationInProgress(),V(Jt,"RemoteStore received new credentials");const r=an(t);t.Ia.add(3),await Fr(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await ii(t)}async function tT(n,e){const t=U(n);e?(t.Ia.delete(2),await ii(t)):e||(t.Ia.add(2),await Fr(t),t.Va.set("Unknown"))}function xn(n){return n.ma||(n.ma=(function(t,r,s){const i=U(t);return i.sa(),new FI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:HI.bind(null,n),Yo:zI.bind(null,n),t_:KI.bind(null,n),H_:GI.bind(null,n)}),n.Ra.push((async e=>{e?(n.ma.B_(),oa(n)?ia(n):n.Va.set("Unknown")):(await n.ma.stop(),Pd(n))}))),n.ma}function Ot(n){return n.fa||(n.fa=(function(t,r,s){const i=U(t);return i.sa(),new UI(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:JI.bind(null,n),t_:eT.bind(null,n),ta:XI.bind(null,n),na:ZI.bind(null,n)}),n.Ra.push((async e=>{e?(n.fa.B_(),await oi(n)):(await n.fa.stop(),n.Ta.length>0&&(V(Jt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new bt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,u=new aa(e,t,a,s,i);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ca(n,e){if(ut("AsyncQueue",`${e}: ${n}`),Ln(n))return new N(S.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{static emptySet(e){return new In(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=or(),this.sortedSet=new Z(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof In)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new In;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu{constructor(){this.ga=new Z(L.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):x(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Sn{constructor(e,t,r,s,i,a,u,h,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((u=>{a.push({type:0,doc:u})})),new Sn(e,t,In.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Zs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class rT{constructor(){this.queries=Qu(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=U(t),i=s.queries;s.queries=Qu(),i.forEach(((a,u)=>{for(const h of u.Sa)h.onError(r)}))})(this,new N(S.ABORTED,"Firestore shutting down"))}}function Qu(){return new sn((n=>Qh(n)),Zs)}async function Nd(n,e){const t=U(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new nT,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const u=ca(a,`Initialization of query '${dn(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&ua(t)}async function Vd(n,e){const t=U(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function sT(n,e){const t=U(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const u of a.Sa)u.Fa(s)&&(r=!0);a.wa=s}}r&&ua(t)}function iT(n,e,t){const r=U(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function ua(n){n.Ca.forEach((e=>{e.next()}))}var Ao,Yu;(Yu=Ao||(Ao={})).Ma="default",Yu.Cache="cache";class Dd{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Sn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Sn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ao.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(e){this.key=e}}class Ld{constructor(e){this.key=e}}class oT{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=W(),this.mutatedKeys=W(),this.eu=Yh(e),this.tu=new In(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Gu,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,u=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((p,y)=>{const R=s.get(p),b=ei(this.query,y)?y:null,D=!!R&&this.mutatedKeys.has(R.key),M=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let O=!1;R&&b?R.data.isEqual(b.data)?D!==M&&(r.track({type:3,doc:b}),O=!0):this.su(R,b)||(r.track({type:2,doc:b}),O=!0,(h&&this.eu(b,h)>0||d&&this.eu(b,d)<0)&&(u=!0)):!R&&b?(r.track({type:0,doc:b}),O=!0):R&&!b&&(r.track({type:1,doc:R}),O=!0,(h||d)&&(u=!0)),O&&(b?(a=a.add(b),i=M?i.add(p):i.delete(p)):(a=a.delete(p),i=i.delete(p)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{tu:a,iu:r,bs:u,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((p,y)=>(function(b,D){const M=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{Vt:O})}};return M(b)-M(D)})(p.type,y.type)||this.eu(p.doc,y.doc))),this.ou(r),s=s??!1;const u=t&&!s?this._u():[],h=this.Ya.size===0&&this.current&&!s?1:0,d=h!==this.Xa;return this.Xa=h,a.length!==0||d?{snapshot:new Sn(this.query,e.tu,i,a,e.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Gu,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Za=this.Za.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Za=this.Za.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=W(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const t=[];return e.forEach((r=>{this.Ya.has(r)||t.push(new Ld(r))})),this.Ya.forEach((r=>{e.has(r)||t.push(new Od(r))})),t}cu(e){this.Za=e.ks,this.Ya=W();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Sn.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const la="SyncEngine";class aT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class cT{constructor(e){this.key=e,this.hu=!1}}class uT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new sn((u=>Qh(u)),Zs),this.Eu=new Map,this.Iu=new Set,this.Ru=new Z(L.comparator),this.Au=new Map,this.Vu=new Zo,this.du={},this.mu=new Map,this.fu=Rn.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function lT(n,e,t=!0){const r=qd(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await Md(r,e,t,!0),s}async function hT(n,e){const t=qd(n);await Md(t,e,!0,!1)}async function Md(n,e,t,r){const s=await kI(n.localStore,Ge(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let u;return r&&(u=await dT(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Rd(n.remoteStore,s),u}async function dT(n,e,t,r,s){n.pu=(y,R,b)=>(async function(M,O,z,G){let ee=O.view.ru(z);ee.bs&&(ee=await ju(M.localStore,O.query,!1).then((({documents:I})=>O.view.ru(I,ee))));const Ce=G&&G.targetChanges.get(O.targetId),Fe=G&&G.targetMismatches.get(O.targetId)!=null,ge=O.view.applyChanges(ee,M.isPrimaryClient,Ce,Fe);return Xu(M,O.targetId,ge.au),ge.snapshot})(n,y,R,b);const i=await ju(n.localStore,e,!0),a=new oT(e,i.ks),u=a.ru(i.documents),h=xr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(u,n.isPrimaryClient,h);Xu(n,t,d.au);const p=new aT(e,t,a);return n.Tu.set(e,p),n.Eu.has(t)?n.Eu.get(t).push(e):n.Eu.set(t,[e]),d.snapshot}async function fT(n,e,t){const r=U(n),s=r.Tu.get(e),i=r.Eu.get(s.targetId);if(i.length>1)return r.Eu.set(s.targetId,i.filter((a=>!Zs(a,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await wo(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ra(r.remoteStore,s.targetId),Ro(r,s.targetId)})).catch(On)):(Ro(r,s.targetId),await wo(r.localStore,s.targetId,!0))}async function pT(n,e){const t=U(n),r=t.Tu.get(e),s=t.Eu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ra(t.remoteStore,r.targetId))}async function mT(n,e,t){const r=wT(n);try{const s=await(function(a,u){const h=U(a),d=X.now(),p=u.reduce(((b,D)=>b.add(D.key)),W());let y,R;return h.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let D=lt(),M=W();return h.xs.getEntries(b,p).next((O=>{D=O,D.forEach(((z,G)=>{G.isValidDocument()||(M=M.add(z))}))})).next((()=>h.localDocuments.getOverlayedDocuments(b,D))).next((O=>{y=O;const z=[];for(const G of u){const ee=CE(G,y.get(G.key).overlayedDocument);ee!=null&&z.push(new on(G.key,ee,qh(ee.value.mapValue),it.exists(!0)))}return h.mutationQueue.addMutationBatch(b,d,z,u)})).next((O=>{R=O;const z=O.applyToLocalDocumentSet(y,M);return h.documentOverlayCache.saveOverlays(b,O.batchId,z)}))})).then((()=>({batchId:R.batchId,changes:Xh(y)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,u,h){let d=a.du[a.currentUser.toKey()];d||(d=new Z($)),d=d.insert(u,h),a.du[a.currentUser.toKey()]=d})(r,s.batchId,t),await Ur(r,s.changes),await oi(r.remoteStore)}catch(s){const i=ca(s,"Failed to persist write");t.reject(i)}}async function xd(n,e){const t=U(n);try{const r=await PI(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.Au.get(i);a&&(K(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?K(a.hu,14607):s.removedDocuments.size>0&&(K(a.hu,42227),a.hu=!1))})),await Ur(t,r,e)}catch(r){await On(r)}}function Ju(n,e,t){const r=U(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,a)=>{const u=a.view.va(e);u.snapshot&&s.push(u.snapshot)})),(function(a,u){const h=U(a);h.onlineState=u;let d=!1;h.queries.forEach(((p,y)=>{for(const R of y.Sa)R.va(u)&&(d=!0)})),d&&ua(h)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function gT(n,e,t){const r=U(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new Z(L.comparator);a=a.insert(i,Ae.newNoDocument(i,F.min()));const u=W().add(i),h=new ri(F.min(),new Map,new Z($),a,u);await xd(r,h),r.Ru=r.Ru.remove(i),r.Au.delete(e),ha(r)}else await wo(r.localStore,e,!1).then((()=>Ro(r,e,t))).catch(On)}async function _T(n,e){const t=U(n),r=e.batch.batchId;try{const s=await SI(t.localStore,e);Ud(t,r,null),Fd(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Ur(t,s)}catch(s){await On(s)}}async function yT(n,e,t){const r=U(n);try{const s=await(function(a,u){const h=U(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let p;return h.mutationQueue.lookupMutationBatch(d,u).next((y=>(K(y!==null,37113),p=y.keys(),h.mutationQueue.removeMutationBatch(d,y)))).next((()=>h.mutationQueue.performConsistencyCheck(d))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(d,p,u))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p))).next((()=>h.localDocuments.getDocuments(d,p)))}))})(r.localStore,e);Ud(r,e,t),Fd(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Ur(r,s)}catch(s){await On(s)}}function Fd(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function Ud(n,e,t){const r=U(n);let s=r.du[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.du[r.currentUser.toKey()]=s}}function Ro(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Eu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Eu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach((r=>{n.Vu.containsKey(r)||Bd(n,r)}))}function Bd(n,e){n.Iu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(ra(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),ha(n))}function Xu(n,e,t){for(const r of t)r instanceof Od?(n.Vu.addReference(r.key,e),ET(n,r)):r instanceof Ld?(V(la,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||Bd(n,r.key)):x(19791,{wu:r})}function ET(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Iu.has(r)||(V(la,"New document in limbo: "+t),n.Iu.add(r),ha(n))}function ha(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new L(Y.fromString(e)),r=n.fu.next();n.Au.set(r,new cT(t)),n.Ru=n.Ru.insert(t,r),Rd(n.remoteStore,new At(Ge(Xs(t.path)),r,"TargetPurposeLimboResolution",Qs.ce))}}async function Ur(n,e,t){const r=U(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((u,h)=>{a.push(r.pu(h,e,t).then((d=>{if((d||t)&&r.isPrimaryClient){const p=d?!d.fromCache:t?.targetChanges.get(h.targetId)?.current;r.sharedClientState.updateQueryState(h.targetId,p?"current":"not-current")}if(d){s.push(d);const p=ta.Is(h.targetId,d);i.push(p)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(h,d){const p=U(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",(y=>P.forEach(d,(R=>P.forEach(R.Ts,(b=>p.persistence.referenceDelegate.addReference(y,R.targetId,b))).next((()=>P.forEach(R.Es,(b=>p.persistence.referenceDelegate.removeReference(y,R.targetId,b)))))))))}catch(y){if(!Ln(y))throw y;V(na,"Failed to update sequence numbers: "+y)}for(const y of d){const R=y.targetId;if(!y.fromCache){const b=p.vs.get(R),D=b.snapshotVersion,M=b.withLastLimboFreeSnapshotVersion(D);p.vs=p.vs.insert(R,M)}}})(r.localStore,i))}async function IT(n,e){const t=U(n);if(!t.currentUser.isEqual(e)){V(la,"User change. New user:",e.toKey());const r=await Td(t.localStore,e);t.currentUser=e,(function(i,a){i.mu.forEach((u=>{u.forEach((h=>{h.reject(new N(S.CANCELLED,a))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ur(t,r.Ns)}}function TT(n,e){const t=U(n),r=t.Au.get(e);if(r&&r.hu)return W().add(r.key);{let s=W();const i=t.Eu.get(e);if(!i)return s;for(const a of i){const u=t.Tu.get(a);s=s.unionWith(u.view.nu)}return s}}function qd(n){const e=U(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=xd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=TT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=gT.bind(null,e),e.Pu.H_=sT.bind(null,e.eventManager),e.Pu.yu=iT.bind(null,e.eventManager),e}function wT(n){const e=U(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=_T.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=yT.bind(null,e),e}class Ds{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=si(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return RI(this.persistence,new wI,e.initialUser,this.serializer)}Cu(e){return new Id(ea.Vi,this.serializer)}Du(e){return new VI}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ds.provider={build:()=>new Ds};class vT extends Ds{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){K(this.persistence.referenceDelegate instanceof Ns,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new aI(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ne.withCacheSize(this.cacheSizeBytes):Ne.DEFAULT;return new Id((r=>Ns.Vi(r,t)),this.serializer)}}class So{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ju(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=IT.bind(null,this.syncEngine),await tT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new rT})()}createDatastore(e){const t=si(e.databaseInfo.databaseId),r=xI(e.databaseInfo);return jI(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,u){return new WI(r,s,i,a,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>Ju(this.syncEngine,t,0)),(function(){return Hu.v()?new Hu:new DI})())}createSyncEngine(e,t){return(function(s,i,a,u,h,d,p){const y=new uT(s,i,a,u,h,d);return p&&(y.gu=!0),y})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=U(t);V(Jt,"RemoteStore shutting down."),r.Ia.add(5),await Fr(r),r.Aa.shutdown(),r.Va.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}So.provider={build:()=>new So};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):ut("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt="FirestoreClient";class AT{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=s,this.user=ve.UNAUTHENTICATED,this.clientId=$o.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{V(Lt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(V(Lt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new bt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=ca(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Yi(n,e){n.asyncQueue.verifyOperationInProgress(),V(Lt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Td(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Zu(n,e){n.asyncQueue.verifyOperationInProgress();const t=await RT(n);V(Lt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Ku(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Ku(e.remoteStore,s))),n._onlineComponents=e}async function RT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(Lt,"Using user provided OfflineComponentProvider");try{await Yi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;Yt("Error using user provided cache. Falling back to memory cache: "+t),await Yi(n,new Ds)}}else V(Lt,"Using default OfflineComponentProvider"),await Yi(n,new vT(void 0));return n._offlineComponents}async function $d(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(Lt,"Using user provided OnlineComponentProvider"),await Zu(n,n._uninitializedComponentsProvider._online)):(V(Lt,"Using default OnlineComponentProvider"),await Zu(n,new So))),n._onlineComponents}function ST(n){return $d(n).then((e=>e.syncEngine))}async function Po(n){const e=await $d(n),t=e.eventManager;return t.onListen=lT.bind(null,e.syncEngine),t.onUnlisten=fT.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=hT.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=pT.bind(null,e.syncEngine),t}function PT(n,e,t,r){const s=new jd(r),i=new Dd(e,s,t);return n.asyncQueue.enqueueAndForget((async()=>Nd(await Po(n),i))),()=>{s.Nu(),n.asyncQueue.enqueueAndForget((async()=>Vd(await Po(n),i)))}}function Wd(n,e,t={}){const r=new bt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,u,h,d){const p=new jd({next:R=>{p.Nu(),a.enqueueAndForget((()=>Vd(i,y)));const b=R.docs.has(u);!b&&R.fromCache?d.reject(new N(S.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&R.fromCache&&h&&h.source==="server"?d.reject(new N(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(R)},error:R=>d.reject(R)}),y=new Dd(Xs(u.path),p,{includeMetadataChanges:!0,qa:!0});return Nd(i,y)})(await Po(n),n.asyncQueue,e,t,r))),r.promise}function bT(n,e){const t=new bt;return n.asyncQueue.enqueueAndForget((async()=>mT(await ST(n),e,t))),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT="ComponentProvider",el=new Map;function kT(n,e,t,r,s){return new Yy(n,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Hd(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zd="firestore.googleapis.com",tl=!0;class nl{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new N(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=zd,this.ssl=tl}else this.host=e.host,this.ssl=e.ssl??tl;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ed;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<iI)throw new N(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Uy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hd(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new N(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ai{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nl({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nl(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Cy;switch(r.type){case"firstParty":return new Dy(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new N(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=el.get(t);r&&(V(CT,"Removing Datastore"),el.delete(t),r.terminate())})(this),Promise.resolve()}}function NT(n,e,t,r={}){n=Ke(n,ai);const s=kr(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&bl(`https://${u}`),i.host!==zd&&i.host!==u&&Yt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...i,host:u,ssl:s,emulatorOptions:r};if(!Kt(h,a)&&(n._setSettings(h),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=ve.MOCK_USER;else{d=gp(r.mockUserToken,n._app?.options.projectId);const y=r.mockUserToken.sub||r.mockUserToken.user_id;if(!y)throw new N(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new ve(y)}n._authCredentials=new ky(new Ch(d,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Mt(this.firestore,e,this._query)}}class ne{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ct(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ne(this.firestore,e,this._key)}toJSON(){return{type:ne._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Lr(t,ne._jsonSchema))return new ne(e,r||null,new L(Y.fromString(t.referencePath)))}}ne._jsonSchemaVersion="firestore/documentReference/1.0",ne._jsonSchema={type:ae("string",ne._jsonSchemaVersion),referencePath:ae("string")};class Ct extends Mt{constructor(e,t,r){super(e,t,Xs(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ne(this.firestore,null,new L(e))}withConverter(e){return new Ct(this.firestore,e,this._path)}}function Xv(n,e,...t){if(n=q(n),kh("collection","path",e),n instanceof ai){const r=Y.fromString(e,...t);return mu(r),new Ct(n,null,r)}{if(!(n instanceof ne||n instanceof Ct))throw new N(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return mu(r),new Ct(n.firestore,null,r)}}function Zv(n,e,...t){if(n=q(n),arguments.length===1&&(e=$o.newId()),kh("doc","path",e),n instanceof ai){const r=Y.fromString(e,...t);return pu(r),new ne(n,null,new L(r))}{if(!(n instanceof ne||n instanceof Ct))throw new N(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(e,...t));return pu(r),new ne(n.firestore,n instanceof Ct?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rl="AsyncQueue";class sl{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new vd(this,"async_queue_retry"),this._c=()=>{const r=Qi();r&&V(rl,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Qi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Qi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new bt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Yu.push(e),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Ln(e))throw e;V(rl,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,ut("INTERNAL UNHANDLED ERROR: ",il(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=aa.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&x(47125,{Pc:il(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ec(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ic(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function il(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Pn extends ai{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new sl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new sl(e),this._firestoreClient=void 0,await e}}}function eA(n,e){const t=typeof n=="object"?n:No(),r=typeof n=="string"?n:e,s=Cn(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=pp("firestore");i&&NT(s,...i)}return s}function ci(n){if(n._terminated)throw new N(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||VT(n),n._firestoreClient}function VT(n){const e=n._freezeSettings(),t=kT(n._databaseId,n._app?.options.appId||"",n._persistenceKey,n._app?.options.apiKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new AT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Le(Ie.fromBase64String(e))}catch(t){throw new N(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Le(Ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Le._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Lr(e,Le._jsonSchema))return Le.fromBase64String(e.bytes)}}Le._jsonSchemaVersion="firestore/bytes/1.0",Le._jsonSchema={type:ae("string",Le._jsonSchemaVersion),bytes:ae("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ye(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Ye._jsonSchemaVersion}}static fromJSON(e){if(Lr(e,Ye._jsonSchema))return new Ye(e.latitude,e.longitude)}}Ye._jsonSchemaVersion="firestore/geoPoint/1.0",Ye._jsonSchema={type:ae("string",Ye._jsonSchemaVersion),latitude:ae("number"),longitude:ae("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:qe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Lr(e,qe._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new qe(e.vectorValues);throw new N(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}qe._jsonSchemaVersion="firestore/vectorValue/1.0",qe._jsonSchema={type:ae("string",qe._jsonSchemaVersion),vectorValues:ae("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DT=/^__.*__$/;class OT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new on(e,this.data,this.fieldMask,t,this.fieldTransforms):new Mr(e,this.data,t,this.fieldTransforms)}}function Gd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{dataSource:n})}}class fa{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new fa({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.mc(e),r}fc(e){const t=this.path?.child(e),r=this.i({path:t,arrayElement:!1});return r.Ac(),r}gc(e){return this.i({path:void 0,arrayElement:!0})}yc(e){return Os(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.mc(this.path.get(e))}mc(e){if(e.length===0)throw this.yc("Document fields must not be empty");if(Gd(this.dataSource)&&DT.test(e))throw this.yc('Document fields cannot begin and end with "__"')}}class LT{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||si(e)}A(e,t,r,s=!1){return new fa({dataSource:e,methodName:t,targetDoc:r,path:ye.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Qd(n){const e=n._freezeSettings(),t=si(n._databaseId);return new LT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function MT(n,e,t,r,s,i={}){const a=n.A(i.merge||i.mergeFields?2:0,e,t,s);Xd("Data must be an object, but it was:",a,r);const u=Yd(r,a);let h,d;if(i.merge)h=new Be(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const p=[];for(const y of i.mergeFields){const R=ui(e,y,t);if(!a.contains(R))throw new N(S.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);BT(p,R)||p.push(R)}h=new Be(p),d=a.fieldTransforms.filter((y=>h.covers(y.field)))}else h=null,d=a.fieldTransforms;return new OT(new Oe(u),h,d)}class pa extends da{_toFieldTransform(e){return new RE(e.path,new Sr)}isEqual(e){return e instanceof pa}}function xT(n,e,t,r=!1){return ma(t,n.A(r?4:3,e))}function ma(n,e){if(Jd(n=q(n)))return Xd("Unsupported field value:",e,n),Yd(n,e);if(n instanceof da)return(function(r,s){if(!Gd(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.yc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const u of r){let h=ma(u,s.gc(a));h==null&&(h={nullValue:"NULL_VALUE"}),i.push(h),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=q(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return wE(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=X.fromDate(r);return{timestampValue:ks(s.serializer,i)}}if(r instanceof X){const i=new X(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ks(s.serializer,i)}}if(r instanceof Ye)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Le)return{bytesValue:hd(s.serializer,r._byteString)};if(r instanceof ne){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Xo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof qe)return(function(a,u){const h=a instanceof qe?a.toArray():a;return{mapValue:{fields:{[Uh]:{stringValue:Bh},[Ss]:{arrayValue:{values:h.map((p=>{if(typeof p!="number")throw u.yc("VectorValues must only contain numeric values.");return Qo(u.serializer,p)}))}}}}}})(r,s);if(yd(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Gs(r)}`)})(n,e)}function Yd(n,e){const t={};return Dh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):rn(n,((r,s)=>{const i=ma(s,e.dc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function Jd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof X||n instanceof Ye||n instanceof Le||n instanceof ne||n instanceof da||n instanceof qe||yd(n))}function Xd(n,e,t){if(!Jd(t)||!Nh(t)){const r=Gs(t);throw r==="an object"?e.yc(n+" a custom object"):e.yc(n+" "+r)}}function ui(n,e,t){if((e=q(e))instanceof Kd)return e._internalPath;if(typeof e=="string")return UT(n,e);throw Os("Field path arguments must be of type string or ",n,!1,void 0,t)}const FT=new RegExp("[~\\*/\\[\\]]");function UT(n,e,t){if(e.search(FT)>=0)throw Os(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Kd(...e.split("."))._internalPath}catch{throw Os(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Os(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(i||a)&&(h+=" (found",i&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new N(S.INVALID_ARGUMENT,u+n+h)}function BT(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qT{convertValue(e,t="none"){switch(Dt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return re(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Vt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw x(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return rn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[Ss].arrayValue?.values?.map((r=>re(r.doubleValue)));return new qe(t)}convertGeoPoint(e){return new Ye(re(e.latitude),re(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Js(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(wr(e));default:return null}}convertTimestamp(e){const t=Nt(e);return new X(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Y.fromString(e);K(_d(r),9688,{name:e});const s=new vr(r.get(1),r.get(3)),i=new L(r.popFirst(5));return s.isEqual(t)||ut(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd extends qT{constructor(e){super(),this.firestore=e}convertBytes(e){return new Le(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ne(this.firestore,null,t)}}function tA(){return new pa("serverTimestamp")}const ol="@firebase/firestore",al="4.13.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cl(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new ne(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new jT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){const t=this._document.data.field(ui("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class jT extends ef{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $T(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new N(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ga{}class _a extends ga{}function nA(n,e,...t){let r=[];e instanceof ga&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((h=>h instanceof Ea)).length,u=i.filter((h=>h instanceof ya)).length;if(a>1||a>0&&u>0)throw new N(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ya extends _a{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ya(e,t,r)}_apply(e){const t=this._parse(e);return tf(e._query,t),new Mt(e.firestore,e.converter,_o(e._query,t))}_parse(e){const t=Qd(e.firestore);return(function(i,a,u,h,d,p,y){let R;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new N(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){ll(y,p);const D=[];for(const M of y)D.push(ul(h,i,M));R={arrayValue:{values:D}}}else R=ul(h,i,y)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||ll(y,p),R=xT(u,a,y,p==="in"||p==="not-in");return oe.create(d,p,R)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Ea extends ga{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ea(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:$e.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const u=i.getFlattenedFilters();for(const h of u)tf(a,h),a=_o(a,h)})(e._query,t),new Mt(e.firestore,e.converter,_o(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Ia extends _a{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ia(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new N(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Rr(i,a)})(e._query,this._field,this._direction);return new Mt(e.firestore,e.converter,pE(e._query,t))}}function rA(n,e="asc"){const t=e,r=ui("orderBy",n);return Ia._create(r,t)}class Ta extends _a{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Ta(e,t,r)}_apply(e){return new Mt(e.firestore,e.converter,bs(e._query,this._limit,this._limitType))}}function sA(n){return Ta._create("limit",n,"F")}function ul(n,e,t){if(typeof(t=q(t))=="string"){if(t==="")throw new N(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Gh(e)&&t.indexOf("/")!==-1)throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Y.fromString(t));if(!L.isDocumentKey(r))throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return vu(n,new L(r))}if(t instanceof ne)return vu(n,t._key);throw new N(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Gs(t)}.`)}function ll(n,e){if(!Array.isArray(n)||n.length===0)throw new N(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function tf(n,e){const t=(function(s,i){for(const a of s)for(const u of a.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new N(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function WT(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class cr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class zt extends ef{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new _s(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(ui("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new N(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=zt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}zt._jsonSchemaVersion="firestore/documentSnapshot/1.0",zt._jsonSchema={type:ae("string",zt._jsonSchemaVersion),bundleSource:ae("string","DocumentSnapshot"),bundleName:ae("string"),bundle:ae("string")};class _s extends zt{data(e={}){return super.data(e)}}class Tn{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new cr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new _s(this._firestore,this._userDataWriter,r.key,r,new cr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((u=>{const h=new _s(s._firestore,s._userDataWriter,u.doc.key,u.doc,new cr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{const h=new _s(s._firestore,s._userDataWriter,u.doc.key,u.doc,new cr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,p=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:HT(u.type),doc:h,oldIndex:d,newIndex:p}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new N(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Tn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=$o.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function HT(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Tn._jsonSchemaVersion="firestore/querySnapshot/1.0",Tn._jsonSchema={type:ae("string",Tn._jsonSchemaVersion),bundleSource:ae("string","QuerySnapshot"),bundleName:ae("string"),bundle:ae("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iA(n){n=Ke(n,ne);const e=Ke(n.firestore,Pn),t=ci(e);return Wd(t,n._key).then((r=>wa(e,n,r)))}function oA(n){n=Ke(n,ne);const e=Ke(n.firestore,Pn),t=ci(e);return Wd(t,n._key,{source:"server"}).then((r=>wa(e,n,r)))}function aA(n,e,t){n=Ke(n,ne);const r=Ke(n.firestore,Pn),s=WT(n.converter,e,t),i=Qd(r);return zT(r,[MT(i,"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,it.none())])}function cA(n,...e){n=q(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||cl(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(cl(e[r])){const d=e[r];e[r]=d.next?.bind(d),e[r+1]=d.error?.bind(d),e[r+2]=d.complete?.bind(d)}let i,a,u;if(n instanceof ne)a=Ke(n.firestore,Pn),u=Xs(n._key.path),i={next:d=>{e[r]&&e[r](wa(a,n,d))},error:e[r+1],complete:e[r+2]};else{const d=Ke(n,Mt);a=Ke(d.firestore,Pn),u=d._query;const p=new Zd(a);i={next:y=>{e[r]&&e[r](new Tn(a,p,d,y))},error:e[r+1],complete:e[r+2]},$T(n._query)}const h=ci(a);return PT(h,u,s,i)}function zT(n,e){const t=ci(n);return bT(t,e)}function wa(n,e,t){const r=t.docs.get(e._key),s=new Zd(n);return new zt(n,s,e._key,r,new cr(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){by(kn),Je(new je("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),u=new Pn(new Ny(r.getProvider("auth-internal")),new Oy(a,r.getProvider("app-check-internal")),Jy(a,s),a);return i={useFetchStreams:t,...i},u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),Me(ol,al,e),Me(ol,al,"esm2020")})();const nf="@firebase/installations",va="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf=1e4,sf=`w:${va}`,of="FIS_v2",KT="https://firebaseinstallations.googleapis.com/v1",GT=3600*1e3,QT="installations",YT="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JT={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Xt=new tn(QT,YT,JT);function af(n){return n instanceof et&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cf({projectId:n}){return`${KT}/projects/${n}/installations`}function uf(n){return{token:n.token,requestStatus:2,expiresIn:ZT(n.expiresIn),creationTime:Date.now()}}async function lf(n,e){const r=(await e.json()).error;return Xt.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function hf({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function XT(n,{refreshToken:e}){const t=hf(n);return t.append("Authorization",ew(e)),t}async function df(n){const e=await n();return e.status>=500&&e.status<600?n():e}function ZT(n){return Number(n.replace("s","000"))}function ew(n){return`${of} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tw({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=cf(n),s=hf(n),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={fid:t,authVersion:of,appId:n.appId,sdkVersion:sf},u={method:"POST",headers:s,body:JSON.stringify(a)},h=await df(()=>fetch(r,u));if(h.ok){const d=await h.json();return{fid:d.fid||t,registrationStatus:2,refreshToken:d.refreshToken,authToken:uf(d.authToken)}}else throw await lf("Create Installation",h)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ff(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nw(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rw=/^[cdef][\w-]{21}$/,bo="";function sw(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=iw(n);return rw.test(t)?t:bo}catch{return bo}}function iw(n){return nw(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf=new Map;function mf(n,e){const t=li(n);gf(t,e),ow(t,e)}function gf(n,e){const t=pf.get(n);if(t)for(const r of t)r(e)}function ow(n,e){const t=aw();t&&t.postMessage({key:n,fid:e}),cw()}let Ht=null;function aw(){return!Ht&&"BroadcastChannel"in self&&(Ht=new BroadcastChannel("[Firebase] FID Change"),Ht.onmessage=n=>{gf(n.data.key,n.data.fid)}),Ht}function cw(){pf.size===0&&Ht&&(Ht.close(),Ht=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uw="firebase-installations-database",lw=1,Zt="firebase-installations-store";let Ji=null;function Aa(){return Ji||(Ji=xs(uw,lw,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Zt)}}})),Ji}async function Ls(n,e){const t=li(n),s=(await Aa()).transaction(Zt,"readwrite"),i=s.objectStore(Zt),a=await i.get(t);return await i.put(e,t),await s.done,(!a||a.fid!==e.fid)&&mf(n,e.fid),e}async function _f(n){const e=li(n),r=(await Aa()).transaction(Zt,"readwrite");await r.objectStore(Zt).delete(e),await r.done}async function hi(n,e){const t=li(n),s=(await Aa()).transaction(Zt,"readwrite"),i=s.objectStore(Zt),a=await i.get(t),u=e(a);return u===void 0?await i.delete(t):await i.put(u,t),await s.done,u&&(!a||a.fid!==u.fid)&&mf(n,u.fid),u}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ra(n){let e;const t=await hi(n.appConfig,r=>{const s=hw(r),i=dw(n,s);return e=i.registrationPromise,i.installationEntry});return t.fid===bo?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function hw(n){const e=n||{fid:sw(),registrationStatus:0};return yf(e)}function dw(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Xt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=fw(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:pw(n)}:{installationEntry:e}}async function fw(n,e){try{const t=await tw(n,e);return Ls(n.appConfig,t)}catch(t){throw af(t)&&t.customData.serverCode===409?await _f(n.appConfig):await Ls(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function pw(n){let e=await hl(n.appConfig);for(;e.registrationStatus===1;)await ff(100),e=await hl(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await Ra(n);return r||t}return e}function hl(n){return hi(n,e=>{if(!e)throw Xt.create("installation-not-found");return yf(e)})}function yf(n){return mw(n)?{fid:n.fid,registrationStatus:0}:n}function mw(n){return n.registrationStatus===1&&n.registrationTime+rf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gw({appConfig:n,heartbeatServiceProvider:e},t){const r=_w(n,t),s=XT(n,t),i=e.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&s.append("x-firebase-client",d)}const a={installation:{sdkVersion:sf,appId:n.appId}},u={method:"POST",headers:s,body:JSON.stringify(a)},h=await df(()=>fetch(r,u));if(h.ok){const d=await h.json();return uf(d)}else throw await lf("Generate Auth Token",h)}function _w(n,{fid:e}){return`${cf(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sa(n,e=!1){let t;const r=await hi(n.appConfig,i=>{if(!Ef(i))throw Xt.create("not-registered");const a=i.authToken;if(!e&&Iw(a))return i;if(a.requestStatus===1)return t=yw(n,e),i;{if(!navigator.onLine)throw Xt.create("app-offline");const u=ww(i);return t=Ew(n,u),u}});return t?await t:r.authToken}async function yw(n,e){let t=await dl(n.appConfig);for(;t.authToken.requestStatus===1;)await ff(100),t=await dl(n.appConfig);const r=t.authToken;return r.requestStatus===0?Sa(n,e):r}function dl(n){return hi(n,e=>{if(!Ef(e))throw Xt.create("not-registered");const t=e.authToken;return vw(t)?{...e,authToken:{requestStatus:0}}:e})}async function Ew(n,e){try{const t=await gw(n,e),r={...e,authToken:t};return await Ls(n.appConfig,r),t}catch(t){if(af(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await _f(n.appConfig);else{const r={...e,authToken:{requestStatus:0}};await Ls(n.appConfig,r)}throw t}}function Ef(n){return n!==void 0&&n.registrationStatus===2}function Iw(n){return n.requestStatus===2&&!Tw(n)}function Tw(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+GT}function ww(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function vw(n){return n.requestStatus===1&&n.requestTime+rf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Aw(n){const e=n,{installationEntry:t,registrationPromise:r}=await Ra(e);return r?r.catch(console.error):Sa(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rw(n,e=!1){const t=n;return await Sw(t),(await Sa(t,e)).token}async function Sw(n){const{registrationPromise:e}=await Ra(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pw(n){if(!n||!n.options)throw Xi("App Configuration");if(!n.name)throw Xi("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Xi(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Xi(n){return Xt.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If="installations",bw="installations-internal",Cw=n=>{const e=n.getProvider("app").getImmediate(),t=Pw(e),r=Cn(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},kw=n=>{const e=n.getProvider("app").getImmediate(),t=Cn(e,If).getImmediate();return{getId:()=>Aw(t),getToken:s=>Rw(t,s)}};function Nw(){Je(new je(If,Cw,"PUBLIC")),Je(new je(bw,kw,"PRIVATE"))}Nw();Me(nf,va);Me(nf,va,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vw="/firebase-messaging-sw.js",Dw="/firebase-cloud-messaging-push-scope",Tf="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Ow="https://fcmregistrations.googleapis.com/v1",wf="google.c.a.c_id",Lw="google.c.a.c_l",Mw="google.c.a.ts",xw="google.c.a.e",fl=1e4;var pl;(function(n){n[n.DATA_MESSAGE=1]="DATA_MESSAGE",n[n.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(pl||(pl={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var Cr;(function(n){n.PUSH_RECEIVED="push-received",n.NOTIFICATION_CLICKED="notification-clicked"})(Cr||(Cr={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(n){const e=new Uint8Array(n);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Fw(n){const e="=".repeat((4-n.length%4)%4),t=(n+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(t),s=new Uint8Array(r.length);for(let i=0;i<r.length;++i)s[i]=r.charCodeAt(i);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zi="fcm_token_details_db",Uw=5,ml="fcm_token_object_Store";async function Bw(n){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(Zi))return null;let e=null;return(await xs(Zi,Uw,{upgrade:async(r,s,i,a)=>{if(s<2||!r.objectStoreNames.contains(ml))return;const u=a.objectStore(ml),h=await u.index("fcmSenderId").get(n);if(await u.clear(),!!h){if(s===2){const d=h;if(!d.auth||!d.p256dh||!d.endpoint)return;e={token:d.fcmToken,createTime:d.createTime??Date.now(),subscriptionOptions:{auth:d.auth,p256dh:d.p256dh,endpoint:d.endpoint,swScope:d.swScope,vapidKey:typeof d.vapidKey=="string"?d.vapidKey:tt(d.vapidKey)}}}else if(s===3){const d=h;e={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:tt(d.auth),p256dh:tt(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:tt(d.vapidKey)}}}else if(s===4){const d=h;e={token:d.fcmToken,createTime:d.createTime,subscriptionOptions:{auth:tt(d.auth),p256dh:tt(d.p256dh),endpoint:d.endpoint,swScope:d.swScope,vapidKey:tt(d.vapidKey)}}}}}})).close(),await Ui(Zi),await Ui("fcm_vapid_details_db"),await Ui("undefined"),qw(e)?e:null}function qw(n){if(!n||!n.subscriptionOptions)return!1;const{subscriptionOptions:e}=n;return typeof n.createTime=="number"&&n.createTime>0&&typeof n.token=="string"&&n.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jw="firebase-messaging-database",$w=1,en="firebase-messaging-store";let eo=null;function Pa(){return eo||(eo=xs(jw,$w,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(en)}}})),eo}async function vf(n){const e=Ca(n),r=await(await Pa()).transaction(en).objectStore(en).get(e);if(r)return r;{const s=await Bw(n.appConfig.senderId);if(s)return await ba(n,s),s}}async function ba(n,e){const t=Ca(n),s=(await Pa()).transaction(en,"readwrite");return await s.objectStore(en).put(e,t),await s.done,e}async function Ww(n){const e=Ca(n),r=(await Pa()).transaction(en,"readwrite");await r.objectStore(en).delete(e),await r.done}function Ca({appConfig:n}){return n.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hw={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Ee=new tn("messaging","Messaging",Hw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zw(n,e){const t=await Na(n),r=Rf(e),s={method:"POST",headers:t,body:JSON.stringify(r)};let i;try{i=await(await fetch(ka(n.appConfig),s)).json()}catch(a){throw Ee.create("token-subscribe-failed",{errorInfo:a?.toString()})}if(i.error){const a=i.error.message;throw Ee.create("token-subscribe-failed",{errorInfo:a})}if(!i.token)throw Ee.create("token-subscribe-no-token");return i.token}async function Kw(n,e){const t=await Na(n),r=Rf(e.subscriptionOptions),s={method:"PATCH",headers:t,body:JSON.stringify(r)};let i;try{i=await(await fetch(`${ka(n.appConfig)}/${e.token}`,s)).json()}catch(a){throw Ee.create("token-update-failed",{errorInfo:a?.toString()})}if(i.error){const a=i.error.message;throw Ee.create("token-update-failed",{errorInfo:a})}if(!i.token)throw Ee.create("token-update-no-token");return i.token}async function Af(n,e){const r={method:"DELETE",headers:await Na(n)};try{const i=await(await fetch(`${ka(n.appConfig)}/${e}`,r)).json();if(i.error){const a=i.error.message;throw Ee.create("token-unsubscribe-failed",{errorInfo:a})}}catch(s){throw Ee.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function ka({projectId:n}){return`${Ow}/projects/${n}/registrations`}async function Na({appConfig:n,installations:e}){const t=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n.apiKey,"x-goog-firebase-installations-auth":`FIS ${t}`})}function Rf({p256dh:n,auth:e,endpoint:t,vapidKey:r}){const s={web:{endpoint:t,auth:e,p256dh:n}};return r!==Tf&&(s.web.applicationPubKey=r),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gw=10080*60*1e3;async function Qw(n){const e=await Xw(n.swRegistration,n.vapidKey),t={vapidKey:n.vapidKey,swScope:n.swRegistration.scope,endpoint:e.endpoint,auth:tt(e.getKey("auth")),p256dh:tt(e.getKey("p256dh"))},r=await vf(n.firebaseDependencies);if(r){if(Zw(r.subscriptionOptions,t))return Date.now()>=r.createTime+Gw?Jw(n,{token:r.token,createTime:Date.now(),subscriptionOptions:t}):r.token;try{await Af(n.firebaseDependencies,r.token)}catch(s){console.warn(s)}return gl(n.firebaseDependencies,t)}else return gl(n.firebaseDependencies,t)}async function Yw(n){const e=await vf(n.firebaseDependencies);e&&(await Af(n.firebaseDependencies,e.token),await Ww(n.firebaseDependencies));const t=await n.swRegistration.pushManager.getSubscription();return t?t.unsubscribe():!0}async function Jw(n,e){try{const t=await Kw(n.firebaseDependencies,e),r={...e,token:t,createTime:Date.now()};return await ba(n.firebaseDependencies,r),t}catch(t){throw t}}async function gl(n,e){const r={token:await zw(n,e),createTime:Date.now(),subscriptionOptions:e};return await ba(n,r),r.token}async function Xw(n,e){const t=await n.pushManager.getSubscription();return t||n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Fw(e)})}function Zw(n,e){const t=e.vapidKey===n.vapidKey,r=e.endpoint===n.endpoint,s=e.auth===n.auth,i=e.p256dh===n.p256dh;return t&&r&&s&&i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _l(n){const e={from:n.from,collapseKey:n.collapse_key,messageId:n.fcmMessageId};return ev(e,n),tv(e,n),nv(e,n),e}function ev(n,e){if(!e.notification)return;n.notification={};const t=e.notification.title;t&&(n.notification.title=t);const r=e.notification.body;r&&(n.notification.body=r);const s=e.notification.image;s&&(n.notification.image=s);const i=e.notification.icon;i&&(n.notification.icon=i)}function tv(n,e){e.data&&(n.data=e.data)}function nv(n,e){if(!e.fcmOptions&&!e.notification?.click_action)return;n.fcmOptions={};const t=e.fcmOptions?.link??e.notification?.click_action;t&&(n.fcmOptions.link=t);const r=e.fcmOptions?.analytics_label;r&&(n.fcmOptions.analyticsLabel=r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rv(n){return typeof n=="object"&&!!n&&wf in n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sv(n){if(!n||!n.options)throw to("App Configuration Object");if(!n.name)throw to("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:t}=n;for(const r of e)if(!t[r])throw to(r);return{appName:n.name,projectId:t.projectId,apiKey:t.apiKey,appId:t.appId,senderId:t.messagingSenderId}}function to(n){return Ee.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iv{constructor(e,t,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=sv(e);this.firebaseDependencies={app:e,appConfig:s,installations:t,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sf(n){try{n.swRegistration=await navigator.serviceWorker.register(Vw,{scope:Dw}),n.swRegistration.update().catch(()=>{}),await ov(n.swRegistration)}catch(e){throw Ee.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function ov(n){return new Promise((e,t)=>{const r=setTimeout(()=>t(new Error(`Service worker not registered after ${fl} ms`)),fl),s=n.installing||n.waiting;n.active?(clearTimeout(r),e()):s?s.onstatechange=i=>{i.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(r),e())}:(clearTimeout(r),t(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function av(n,e){if(!e&&!n.swRegistration&&await Sf(n),!(!e&&n.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Ee.create("invalid-sw-registration");n.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cv(n,e){e?n.vapidKey=e:n.vapidKey||(n.vapidKey=Tf)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pf(n,e){if(!navigator)throw Ee.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Ee.create("permission-blocked");return await cv(n,e?.vapidKey),await av(n,e?.serviceWorkerRegistration),Qw(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uv(n,e,t){const r=lv(e);(await n.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:t[wf],message_name:t[Lw],message_time:t[Mw],message_device_time:Math.floor(Date.now()/1e3)})}function lv(n){switch(n){case Cr.NOTIFICATION_CLICKED:return"notification_open";case Cr.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hv(n,e){const t=e.data;if(!t.isFirebaseMessaging)return;n.onMessageHandler&&t.messageType===Cr.PUSH_RECEIVED&&(typeof n.onMessageHandler=="function"?n.onMessageHandler(_l(t)):n.onMessageHandler.next(_l(t)));const r=t.data;rv(r)&&r[xw]==="1"&&await uv(n,t.messageType,r)}const yl="@firebase/messaging",El="0.12.25";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dv=n=>{const e=new iv(n.getProvider("app").getImmediate(),n.getProvider("installations-internal").getImmediate(),n.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",t=>hv(e,t)),e},fv=n=>{const e=n.getProvider("messaging").getImmediate();return{getToken:r=>Pf(e,r)}};function pv(){Je(new je("messaging",dv,"PUBLIC")),Je(new je("messaging-internal",fv,"PRIVATE")),Me(yl,El),Me(yl,El,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mv(){try{await Pl()}catch{return!1}return typeof window<"u"&&Sl()&&Ap()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gv(n){if(!navigator)throw Ee.create("only-available-in-window");return n.swRegistration||await Sf(n),Yw(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _v(n,e){if(!navigator)throw Ee.create("only-available-in-window");return n.onMessageHandler=e,()=>{n.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uA(n=No()){return mv().then(e=>{if(!e)throw Ee.create("unsupported-browser")},e=>{throw Ee.create("indexed-db-unsupported")}),Cn(q(n),"messaging").getImmediate()}async function lA(n,e){return n=q(n),Pf(n,e)}function hA(n){return n=q(n),gv(n)}function dA(n,e){return n=q(n),_v(n,e)}pv();export{Tt as $,tA as A,aA as B,je as C,cA as D,tn as E,et as F,It as G,Xv as H,nA as I,sA as J,rA as K,Co as L,oA as M,mv as N,hA as O,Av as P,Rv as Q,vv as R,qv as S,X as T,kv as U,Qv as V,us as W,bv as X,nn as Y,Et as Z,Je as _,ue as a,jv as a0,Wv as a1,wt as a2,ag as a3,Bv as a4,Nv as a5,wv as a6,Pv as a7,xv as a8,Ev as a9,Tv as aa,Sv as ab,Cv as ac,$v as ad,Iv as ae,Ov as af,Lv as ag,Dv as ah,Dg as ai,Vv as aj,Kv as ak,Gv as al,zv as am,t_ as an,ct as ao,Mv as ap,Gc as aq,S_ as ar,lh as as,p_ as at,Cn as b,pp as c,No as d,Ip as e,Sl as f,q as g,yv as h,kr as i,Kt as j,Ap as k,Dm as l,Yv as m,eA as n,uA as o,bl as p,dA as q,Me as r,Fo as s,Hv as t,Uv as u,Pl as v,lA as w,iA as x,Zv as y,Fv as z};
