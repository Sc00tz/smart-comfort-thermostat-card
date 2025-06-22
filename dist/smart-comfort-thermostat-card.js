function t(t,e,i,r){var o,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n}function e(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=window,r=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(i,t,o)},l=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var c;const d=window,h=d.trustedTypes,u=h?h.emptyScript:"",p=d.reactiveElementPolyfillSupport,f={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},g="finalized";let $=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const r=this._$Ep(i,e);void 0!==r&&(this._$Ev.set(r,i),t.push(r))}),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const o=this[t];this[e]=r,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{r?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const r=document.createElement("style"),o=i.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=e.cssText,t.appendChild(r)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=m){var r;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:f).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(t,e){var i;const r=this.constructor,o=r._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=r.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:f;this._$El=o,this[o]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let r=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;$[g]=!0,$.elementProperties=new Map,$.elementStyles=[],$.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:$}),(null!==(c=d.reactiveElementVersions)&&void 0!==c?c:d.reactiveElementVersions=[]).push("1.6.3");const _=window,b=_.trustedTypes,A=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,E="?"+w,S=`<${E}>`,C=document,k=()=>C.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,P="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,O=/>/g,R=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,N=/"/g,z=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),V=new WeakMap,B=C.createTreeWalker(C,129,null,!1);function F(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const W=(t,e)=>{const i=t.length-1,r=[];let o,s=2===e?"<svg>":"",n=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===U?"!--"===l[1]?n=H:void 0!==l[1]?n=O:void 0!==l[2]?(z.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=R):void 0!==l[3]&&(n=R):n===R?">"===l[0]?(n=null!=o?o:U,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?R:'"'===l[3]?N:j):n===N||n===j?n=R:n===H||n===O?n=U:(n=R,o=void 0);const h=n===R&&t[e+1].startsWith("/>")?" ":"";s+=n===U?i+S:c>=0?(r.push(a),i.slice(0,c)+x+i.slice(c)+w+h):i+w+(-2===c?(r.push(void 0),e):h)}return[F(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),r]};class Y{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,s=0;const n=t.length-1,a=this.parts,[l,c]=W(t,e);if(this.el=Y.createElement(l,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=B.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith(x)||e.startsWith(w)){const i=c[s++];if(t.push(e),void 0!==i){const t=r.getAttribute(i.toLowerCase()+x).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?Q:"@"===e[1]?tt:J})}else a.push({type:6,index:o})}for(const e of t)r.removeAttribute(e)}if(z.test(r.tagName)){const t=r.textContent.split(w),e=t.length-1;if(e>0){r.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],k()),B.nextNode(),a.push({type:2,index:++o});r.append(t[e],k())}}}else if(8===r.nodeType)if(r.data===E)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(w,t+1));)a.push({type:7,index:o}),t+=w.length-1}o++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,r){var o,s,n,a;if(e===D)return e;let l=void 0!==r?null===(o=i._$Co)||void 0===o?void 0:o[r]:i._$Cl;const c=M(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,r)),void 0!==r?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(e=q(t,l._$AS(t,e.values),l,r)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:r}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);B.currentNode=o;let s=B.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new K(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new et(s,this,t)),this._$AV.push(e),l=r[++a]}n!==(null==l?void 0:l.index)&&(s=B.nextNode(),n++)}return B.currentNode=C,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,r){var o;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cp=null===(o=null==r?void 0:r.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),M(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==L&&M(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:r}=t,o="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=Y.createElement(F(r.h,r.h[0]),this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new G(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Y(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new K(this.k(k()),this.k(k()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,i,r,o){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const o=this.strings;let s=!1;if(void 0===o)t=q(this,t,e,0),s=!M(t)||t!==this._$AH&&t!==D,s&&(this._$AH=t);else{const r=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=q(this,r[i+n],e,n),a===D&&(a=this._$AH[n]),s||(s=!M(a)||a!==this._$AH[n]),a===L?t=L:t!==L&&(t+=(null!=a?a:"")+o[n+1]),this._$AH[n]=a}s&&!r&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}const X=b?b.emptyScript:"";class Q extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==L?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class tt extends J{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:L)===D)return;const r=this._$AH,o=t===L&&r!==L||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==L&&(r===L||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const it=_.litHtmlPolyfillSupport;null==it||it(Y,K),(null!==(y=_.litHtmlVersions)&&void 0!==y?y:_.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt,ot;class st extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var r,o;const s=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:e;let n=s._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=n=new K(e.insertBefore(k(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return D}}st.finalized=!0,st._$litElement$=!0,null===(rt=globalThis.litElementHydrateSupport)||void 0===rt||rt.call(globalThis,{LitElement:st});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:st}),(null!==(ot=globalThis.litElementVersions)&&void 0!==ot?ot:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ct(t){return lt({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var dt;null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;let ht=class extends st{constructor(){super(...arguments),this.dragging=!1,this.dragValue=0}static async getConfigElement(){return document.createElement("smart-comfort-thermostat-card-editor")}static getStubConfig(){return{type:"custom:smart-comfort-thermostat-card",entity:"",show_current_temperature:!0,show_dew_point:!0,show_comfort_status:!0,show_humidity:!0}}getCardSize(){return 4}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config=t}render(){if(!this.hass||!this.config)return I``;const t=this.hass.states[this.config.entity];if(!t)return I`
        <ha-card>
          <div class="warning">Entity not found: ${this.config.entity}</div>
        </ha-card>
      `;const e="off"!==t.state,i=t.attributes.current_temperature??0,r=t.attributes.target_temperature??72,o=t.attributes.actual_temperature,s=t.attributes.humidity,n=t.attributes.dew_point,a=t.attributes.comfort_status??"Unknown",l=t.attributes.feels_like_difference??0,c=t.attributes.underlying_hvac_mode??"off",d=t.attributes.humidity_priority??!1,h=this.dragging?this.dragValue:r,u=Math.abs(i-r),p=this.getComfortColor(a),f=this.getModeText(c,d);return I`
      <ha-card class="comfort-card ${e?"on":"off"}">
        <div class="card-content">
          <!-- Header -->
          <div class="header">
            <div class="entity-name">
              ${this.config.name||t.attributes.friendly_name||"Smart Climate"}
            </div>
            <div class="power-button" @click=${this.togglePower}>
              <ha-icon icon=${e?"mdi:power":"mdi:power-off"}></ha-icon>
            </div>
          </div>

          <!-- Main Thermostat Circle -->
          <div class="thermostat-container">
            <div class="thermostat-circle" style="--comfort-color: ${p}">
              <!-- Outer ring showing comfort status -->
              <div class="comfort-ring"></div>
              
              <!-- Temperature display -->
              <div class="temperature-display">
                <div class="current-temp">${Math.round(i)}°</div>
                <div class="feels-like-label">feels like</div>
                <div class="target-temp-container">
                  <div class="target-temp" @click=${this.openMoreInfo}>
                    ${Math.round(h)}°
                  </div>
                  <div class="temp-diff ${u<.5?"satisfied":"adjusting"}">
                    ${l>0?"+":""}${l.toFixed(1)}°
                  </div>
                </div>
              </div>

              <!-- Touch area for temperature adjustment -->
              <div class="touch-area" 
                   @touchstart=${this.handleTouchStart}
                   @touchmove=${this.handleTouchMove}
                   @touchend=${this.handleTouchEnd}
                   @mousedown=${this.handleMouseDown}
                   @mousemove=${this.handleMouseMove}
                   @mouseup=${this.handleMouseUp}
                   @mouseleave=${this.handleMouseUp}>
              </div>
            </div>

            <!-- Temperature adjustment indicators -->
            ${this.renderTempMarkers(h)}
          </div>

          <!-- Status and Info -->
          <div class="status-section">
            <div class="comfort-status" style="color: ${p}">
              <ha-icon icon="mdi:weather-partly-cloudy"></ha-icon>
              ${a}
            </div>
            <div class="mode-status">
              <ha-icon icon=${this.getModeIcon(c)}></ha-icon>
              ${f}
            </div>
          </div>

          <!-- Additional Info Grid -->
          ${this.renderInfoGrid(o,s,n)}
        </div>
      </ha-card>
    `}renderTempMarkers(t){const e=[];for(let i=65;i<=85;i+=1){const r=(i-65)/20*270-135,o=Math.abs(i-t)<.5,s=o?1:Math.abs(i-t)<3?.3:.1;e.push(I`
        <div class="temp-marker ${o?"active":""}" 
             style="transform: rotate(${r}deg); opacity: ${s}">
          <div class="marker-dot"></div>
          ${i%5==0?I`<div class="marker-label">${i}</div>`:""}
        </div>
      `)}return I`<div class="temp-markers">${e}</div>`}renderInfoGrid(t,e,i){const r=[];return this.config.show_current_temperature&&void 0!==t&&r.push(I`
        <div class="info-item">
          <ha-icon icon="mdi:thermometer"></ha-icon>
          <div class="info-value">${Math.round(t)}°F</div>
          <div class="info-label">actual temp</div>
        </div>
      `),this.config.show_humidity&&void 0!==e&&r.push(I`
        <div class="info-item">
          <ha-icon icon="mdi:water-percent"></ha-icon>
          <div class="info-value">${Math.round(e)}%</div>
          <div class="info-label">humidity</div>
        </div>
      `),this.config.show_dew_point&&void 0!==i&&r.push(I`
        <div class="info-item">
          <ha-icon icon="mdi:water-thermometer"></ha-icon>
          <div class="info-value">${Math.round(i)}°F</div>
          <div class="info-label">dew point</div>
        </div>
      `),r.length>0?I`
      <div class="info-grid">
        ${r}
      </div>
    `:I``}getComfortColor(t){switch(t.toLowerCase()){case"oppressive":return"#e74c3c";case"muggy":return"#f39c12";case"slightly humid":return"#f1c40f";case"comfortable":return"#2ecc71";case"very comfortable":return"#27ae60";case"dry":return"#3498db";case"very dry":return"#9b59b6";default:return"#95a5a6"}}getModeIcon(t){switch(t){case"cool":return"mdi:snowflake";case"dry":return"mdi:water-minus";case"fan_only":return"mdi:fan";case"heat":return"mdi:fire";case"off":return"mdi:power-off";default:return"mdi:help-circle"}}getModeText(t,e){switch(t){case"cool":return e?"Cooling & Dehumidifying":"Cooling";case"dry":return"Dehumidifying";case"fan_only":return"Circulating Air";case"heat":return"Heating";case"off":return"Off";default:return"Unknown"}}togglePower(){const t="off"===this.hass.states[this.config.entity].state?"auto":"off";this.hass.callService("climate","set_hvac_mode",{entity_id:this.config.entity,hvac_mode:t})}openMoreInfo(){const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:this.config.entity},this.dispatchEvent(t)}handleTouchStart(t){this.dragging=!0,this.updateTempFromEvent(t.touches[0]),t.preventDefault()}handleTouchMove(t){this.dragging&&(this.updateTempFromEvent(t.touches[0]),t.preventDefault())}handleTouchEnd(){this.dragging&&(this.commitTemperature(),this.dragging=!1)}handleMouseDown(t){this.dragging=!0,this.updateTempFromEvent(t),t.preventDefault()}handleMouseMove(t){this.dragging&&this.updateTempFromEvent(t)}handleMouseUp(){this.dragging&&(this.commitTemperature(),this.dragging=!1)}updateTempFromEvent(t){const e=this.shadowRoot?.querySelector(".thermostat-circle");if(!e)return;const i=e.getBoundingClientRect(),r=i.left+i.width/2,o=i.top+i.height/2,s=t.clientX-r,n=t.clientY-o;let a,l=Math.atan2(n,s)*(180/Math.PI);if(l=(l+360)%360,l>=225)a=l-225;else{if(!(l<=135))return;a=l+135}const c=a/270;this.dragValue=Math.round(2*(65+20*c))/2,this.dragValue=Math.max(65,Math.min(85,this.dragValue))}commitTemperature(){this.hass.callService("climate","set_temperature",{entity_id:this.config.entity,temperature:this.dragValue})}static get styles(){return a`
      .comfort-card {
        padding: 24px;
        background: linear-gradient(135deg, var(--ha-card-background, #fff) 0%, var(--secondary-background-color, #f8f9fa) 100%);
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .comfort-card.off {
        opacity: 0.6;
        filter: grayscale(0.3);
      }

      .comfort-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--comfort-color, #95a5a6);
        opacity: 0.7;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }

      .entity-name {
        font-size: 20px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .power-button {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--comfort-color, #95a5a6);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        color: white;
      }

      .power-button:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      }

      .thermostat-container {
        position: relative;
        display: flex;
        justify-content: center;
        margin: 32px 0;
      }

      .thermostat-circle {
        width: 280px;
        height: 280px;
        border-radius: 50%;
        position: relative;
        background: radial-gradient(circle, var(--ha-card-background, #fff) 60%, var(--secondary-background-color, #f8f9fa) 100%);
        box-shadow: 
          inset 0 0 40px rgba(0, 0, 0, 0.1),
          0 8px 32px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
      }

      .comfort-ring {
        position: absolute;
        top: 8px;
        left: 8px;
        right: 8px;
        bottom: 8px;
        border-radius: 50%;
        border: 3px solid var(--comfort-color, #95a5a6);
        opacity: 0.3;
        animation: pulse 2s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.02); }
      }

      .temperature-display {
        text-align: center;
        z-index: 2;
      }

      .current-temp {
        font-size: 48px;
        font-weight: 300;
        color: var(--primary-text-color);
        line-height: 1;
        margin-bottom: 4px;
      }

      .feels-like-label {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-bottom: 8px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .target-temp-container {
        position: relative;
      }

      .target-temp {
        font-size: 28px;
        font-weight: 600;
        color: var(--comfort-color, #95a5a6);
        cursor: pointer;
        padding: 8px 16px;
        border-radius: 16px;
        transition: all 0.2s ease;
      }

      .target-temp:hover {
        background: rgba(0, 0, 0, 0.05);
        transform: scale(1.05);
      }

      .temp-diff {
        font-size: 12px;
        margin-top: 4px;
        font-weight: 500;
      }

      .temp-diff.satisfied {
        color: var(--success-color, #4CAF50);
      }

      .temp-diff.adjusting {
        color: var(--warning-color, #FF9800);
      }

      .touch-area {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        z-index: 1;
      }

      .temp-markers {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }

      .temp-marker {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 140px;
        height: 2px;
        transform-origin: 0 50%;
        transition: opacity 0.2s ease;
      }

      .marker-dot {
        position: absolute;
        right: 0;
        top: 50%;
        width: 4px;
        height: 4px;
        background: var(--comfort-color, #95a5a6);
        border-radius: 50%;
        transform: translateY(-50%);
      }

      .temp-marker.active .marker-dot {
        width: 8px;
        height: 8px;
        background: var(--comfort-color, #95a5a6);
        box-shadow: 0 0 8px var(--comfort-color, #95a5a6);
      }

      .marker-label {
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .status-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 24px 0;
        padding: 16px;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 16px;
      }

      .comfort-status, .mode-status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
      }

      .comfort-status {
        font-size: 16px;
      }

      .mode-status {
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 16px;
        margin-top: 24px;
      }

      .info-item {
        text-align: center;
        padding: 16px 8px;
        background: rgba(0, 0, 0, 0.03);
        border-radius: 12px;
        transition: all 0.2s ease;
      }

      .info-item:hover {
        background: rgba(0, 0, 0, 0.06);
        transform: translateY(-2px);
      }

      .info-item ha-icon {
        color: var(--comfort-color, #95a5a6);
        margin-bottom: 8px;
        --mdc-icon-size: 20px;
      }

      .info-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .info-label {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .warning {
        padding: 16px;
        text-align: center;
        color: var(--error-color);
        font-weight: 500;
      }

      /* Dark mode adjustments */
      @media (prefers-color-scheme: dark) {
        .comfort-card {
          background: linear-gradient(135deg, var(--ha-card-background, #1c1c1e) 0%, var(--secondary-background-color, #2c2c2e) 100%);
        }
        
        .status-section, .info-item {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .info-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    `}};t([lt({attribute:!1}),e("design:type",Object)],ht.prototype,"hass",void 0),t([ct(),e("design:type",Object)],ht.prototype,"config",void 0),t([ct(),e("design:type",Object)],ht.prototype,"dragging",void 0),t([ct(),e("design:type",Object)],ht.prototype,"dragValue",void 0),ht=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:r}=e;return{kind:i,elements:r,finisher(e){customElements.define(t,e)}}})(t,e))("smart-comfort-thermostat-card")],ht);export{ht as SmartComfortThermostatCard};
//# sourceMappingURL=smart-comfort-thermostat-card.js.map
