(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();var Z,y,Ae,U,Ne,De,le,ve,ce,_e,K={},Fe=[],Xe=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,fe=Array.isArray;function M(t,e){for(var n in e)t[n]=e[n];return t}function Ue(t){var e=t.parentNode;e&&e.removeChild(t)}function B(t,e,n){var o,r,i,a={};for(i in e)i=="key"?o=e[i]:i=="ref"?r=e[i]:a[i]=e[i];if(arguments.length>2&&(a.children=arguments.length>3?Z.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(i in t.defaultProps)a[i]===void 0&&(a[i]=t.defaultProps[i]);return G(t,a,o,r,null)}function G(t,e,n,o,r){var i={type:t,props:e,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:r??++Ae,__i:-1,__u:0};return r==null&&y.vnode!=null&&y.vnode(i),i}function Q(t){return t.children}function ne(t,e){this.props=t,this.context=e}function q(t,e){if(e==null)return t.__?q(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?q(t):null}function qe(t){var e,n;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null){t.__e=t.__c.base=n.__e;break}return qe(t)}}function Ce(t){(!t.__d&&(t.__d=!0)&&U.push(t)&&!oe.__r++||Ne!==y.debounceRendering)&&((Ne=y.debounceRendering)||De)(oe)}function oe(){var t,e,n,o,r,i,a,l;for(U.sort(le);t=U.shift();)t.__d&&(e=U.length,o=void 0,i=(r=(n=t).__v).__e,a=[],l=[],n.__P&&((o=M({},r)).__v=r.__v+1,y.vnode&&y.vnode(o),pe(n.__P,o,r,n.__n,n.__P.namespaceURI,32&r.__u?[i]:null,a,i??q(r),!!(32&r.__u),l),o.__v=r.__v,o.__.__k[o.__i]=o,Be(a,o,l),o.__e!=i&&qe(o)),U.length>e&&U.sort(le));oe.__r=0}function We(t,e,n,o,r,i,a,l,_,c,f){var s,p,v,C,E,x=o&&o.__k||Fe,k=e.length;for(n.__d=_,et(n,e,x),_=n.__d,s=0;s<k;s++)(v=n.__k[s])!=null&&typeof v!="boolean"&&typeof v!="function"&&(p=v.__i===-1?K:x[v.__i]||K,v.__i=s,pe(t,v,p,r,i,a,l,_,c,f),C=v.__e,v.ref&&p.ref!=v.ref&&(p.ref&&he(p.ref,null,v),f.push(v.ref,v.__c||C,v)),E==null&&C!=null&&(E=C),65536&v.__u||p.__k===v.__k?_=Re(v,_,t):typeof v.type=="function"&&v.__d!==void 0?_=v.__d:C&&(_=C.nextSibling),v.__d=void 0,v.__u&=-196609);n.__d=_,n.__e=E}function et(t,e,n){var o,r,i,a,l,_=e.length,c=n.length,f=c,s=0;for(t.__k=[],o=0;o<_;o++)a=o+s,(r=t.__k[o]=(r=e[o])==null||typeof r=="boolean"||typeof r=="function"?null:typeof r=="string"||typeof r=="number"||typeof r=="bigint"||r.constructor==String?G(null,r,null,null,null):fe(r)?G(Q,{children:r},null,null,null):r.constructor===void 0&&r.__b>0?G(r.type,r.props,r.key,r.ref?r.ref:null,r.__v):r)!=null?(r.__=t,r.__b=t.__b+1,l=tt(r,n,a,f),r.__i=l,i=null,l!==-1&&(f--,(i=n[l])&&(i.__u|=131072)),i==null||i.__v===null?(l==-1&&s--,typeof r.type!="function"&&(r.__u|=65536)):l!==a&&(l==a-1?s--:l==a+1?s++:l>a?f>_-a?s+=l-a:s--:l<a&&(l==a-s?s-=l-a:s++),l!==o+s&&(r.__u|=65536))):(i=n[a])&&i.key==null&&i.__e&&!(131072&i.__u)&&(i.__e==t.__d&&(t.__d=q(i)),de(i,i,!1),n[a]=null,f--);if(f)for(o=0;o<c;o++)(i=n[o])!=null&&!(131072&i.__u)&&(i.__e==t.__d&&(t.__d=q(i)),de(i,i))}function Re(t,e,n){var o,r;if(typeof t.type=="function"){for(o=t.__k,r=0;o&&r<o.length;r++)o[r]&&(o[r].__=t,e=Re(o[r],e,n));return e}t.__e!=e&&(e&&t.type&&!n.contains(e)&&(e=q(t)),n.insertBefore(t.__e,e||null),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType===8);return e}function tt(t,e,n,o){var r=t.key,i=t.type,a=n-1,l=n+1,_=e[n];if(_===null||_&&r==_.key&&i===_.type&&!(131072&_.__u))return n;if(o>(_!=null&&!(131072&_.__u)?1:0))for(;a>=0||l<e.length;){if(a>=0){if((_=e[a])&&!(131072&_.__u)&&r==_.key&&i===_.type)return a;a--}if(l<e.length){if((_=e[l])&&!(131072&_.__u)&&r==_.key&&i===_.type)return l;l++}}return-1}function Pe(t,e,n){e[0]==="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||Xe.test(e)?n:n+"px"}function te(t,e,n,o,r){var i;e:if(e==="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof o=="string"&&(t.style.cssText=o=""),o)for(e in o)n&&e in n||Pe(t.style,e,"");if(n)for(e in n)o&&n[e]===o[e]||Pe(t.style,e,n[e])}else if(e[0]==="o"&&e[1]==="n")i=e!==(e=e.replace(/(PointerCapture)$|Capture$/i,"$1")),e=e.toLowerCase()in t||e==="onFocusOut"||e==="onFocusIn"?e.toLowerCase().slice(2):e.slice(2),t.l||(t.l={}),t.l[e+i]=n,n?o?n.u=o.u:(n.u=ve,t.addEventListener(e,i?_e:ce,i)):t.removeEventListener(e,i?_e:ce,i);else{if(r=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!=="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&n==1?"":n))}}function Se(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e.t==null)e.t=ve++;else if(e.t<n.u)return;return n(y.event?y.event(e):e)}}}function pe(t,e,n,o,r,i,a,l,_,c){var f,s,p,v,C,E,x,k,m,O,S,W,H,X,I,V,$=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(_=!!(32&n.__u),i=[l=e.__e=n.__e]),(f=y.__b)&&f(e);e:if(typeof $=="function")try{if(k=e.props,m="prototype"in $&&$.prototype.render,O=(f=$.contextType)&&o[f.__c],S=f?O?O.props.value:f.__:o,n.__c?x=(s=e.__c=n.__c).__=s.__E:(m?e.__c=s=new $(k,S):(e.__c=s=new ne(k,S),s.constructor=$,s.render=rt),O&&O.sub(s),s.props=k,s.state||(s.state={}),s.context=S,s.__n=o,p=s.__d=!0,s.__h=[],s._sb=[]),m&&s.__s==null&&(s.__s=s.state),m&&$.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=M({},s.__s)),M(s.__s,$.getDerivedStateFromProps(k,s.__s))),v=s.props,C=s.state,s.__v=e,p)m&&$.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),m&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(m&&$.getDerivedStateFromProps==null&&k!==v&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(k,S),!s.__e&&(s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(k,s.__s,S)===!1||e.__v===n.__v)){for(e.__v!==n.__v&&(s.props=k,s.state=s.__s,s.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.forEach(function(R){R&&(R.__=e)}),W=0;W<s._sb.length;W++)s.__h.push(s._sb[W]);s._sb=[],s.__h.length&&a.push(s);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(k,s.__s,S),m&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(v,C,E)})}if(s.context=S,s.props=k,s.__P=t,s.__e=!1,H=y.__r,X=0,m){for(s.state=s.__s,s.__d=!1,H&&H(e),f=s.render(s.props,s.state,s.context),I=0;I<s._sb.length;I++)s.__h.push(s._sb[I]);s._sb=[]}else do s.__d=!1,H&&H(e),f=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++X<25);s.state=s.__s,s.getChildContext!=null&&(o=M(M({},o),s.getChildContext())),m&&!p&&s.getSnapshotBeforeUpdate!=null&&(E=s.getSnapshotBeforeUpdate(v,C)),We(t,fe(V=f!=null&&f.type===Q&&f.key==null?f.props.children:f)?V:[V],e,n,o,r,i,a,l,_,c),s.base=e.__e,e.__u&=-161,s.__h.length&&a.push(s),x&&(s.__E=s.__=null)}catch(R){if(e.__v=null,_||i!=null){for(e.__u|=_?160:32;l&&l.nodeType===8&&l.nextSibling;)l=l.nextSibling;i[i.indexOf(l)]=null,e.__e=l}else e.__e=n.__e,e.__k=n.__k;y.__e(R,e,n)}else i==null&&e.__v===n.__v?(e.__k=n.__k,e.__e=n.__e):e.__e=nt(n.__e,e,n,o,r,i,a,_,c);(f=y.diffed)&&f(e)}function Be(t,e,n){e.__d=void 0;for(var o=0;o<n.length;o++)he(n[o],n[++o],n[++o]);y.__c&&y.__c(e,t),t.some(function(r){try{t=r.__h,r.__h=[],t.some(function(i){i.call(r)})}catch(i){y.__e(i,r.__v)}})}function nt(t,e,n,o,r,i,a,l,_){var c,f,s,p,v,C,E,x=n.props,k=e.props,m=e.type;if(m==="svg"?r="http://www.w3.org/2000/svg":m==="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),i!=null){for(c=0;c<i.length;c++)if((v=i[c])&&"setAttribute"in v==!!m&&(m?v.localName===m:v.nodeType===3)){t=v,i[c]=null;break}}if(t==null){if(m===null)return document.createTextNode(k);t=document.createElementNS(r,m,k.is&&k),i=null,l=!1}if(m===null)x===k||l&&t.data===k||(t.data=k);else{if(i=i&&Z.call(t.childNodes),x=n.props||K,!l&&i!=null)for(x={},c=0;c<t.attributes.length;c++)x[(v=t.attributes[c]).name]=v.value;for(c in x)if(v=x[c],c!="children"){if(c=="dangerouslySetInnerHTML")s=v;else if(c!=="key"&&!(c in k)){if(c=="value"&&"defaultValue"in k||c=="checked"&&"defaultChecked"in k)continue;te(t,c,null,v,r)}}for(c in k)v=k[c],c=="children"?p=v:c=="dangerouslySetInnerHTML"?f=v:c=="value"?C=v:c=="checked"?E=v:c==="key"||l&&typeof v!="function"||x[c]===v||te(t,c,v,x[c],r);if(f)l||s&&(f.__html===s.__html||f.__html===t.innerHTML)||(t.innerHTML=f.__html),e.__k=[];else if(s&&(t.innerHTML=""),We(t,fe(p)?p:[p],e,n,o,m==="foreignObject"?"http://www.w3.org/1999/xhtml":r,i,a,i?i[0]:n.__k&&q(n,0),l,_),i!=null)for(c=i.length;c--;)i[c]!=null&&Ue(i[c]);l||(c="value",C!==void 0&&(C!==t[c]||m==="progress"&&!C||m==="option"&&C!==x[c])&&te(t,c,C,x[c],r),c="checked",E!==void 0&&E!==t[c]&&te(t,c,E,x[c],r))}return t}function he(t,e,n){try{if(typeof t=="function"){var o=typeof t.__u=="function";o&&t.__u(),o&&e==null||(t.__u=t(e))}else t.current=e}catch(r){y.__e(r,n)}}function de(t,e,n){var o,r;if(y.unmount&&y.unmount(t),(o=t.ref)&&(o.current&&o.current!==t.__e||he(o,null,e)),(o=t.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(i){y.__e(i,e)}o.base=o.__P=null}if(o=t.__k)for(r=0;r<o.length;r++)o[r]&&de(o[r],e,n||typeof t.type!="function");n||t.__e==null||Ue(t.__e),t.__c=t.__=t.__e=t.__d=void 0}function rt(t,e,n){return this.constructor(t,n)}function se(t,e,n){var o,r,i,a;y.__&&y.__(t,e),r=(o=typeof n=="function")?null:n&&n.__k||e.__k,i=[],a=[],pe(e,t=(!o&&n||e).__k=B(Q,null,[t]),r||K,K,e.namespaceURI,!o&&n?[n]:r?null:e.firstChild?Z.call(e.childNodes):null,i,!o&&n?n:r?r.__e:e.firstChild,o,a),Be(i,t,a)}function Ve(t,e){se(t,e,Ve)}function ze(t,e,n){var o,r,i,a,l=M({},t.props);for(i in t.type&&t.type.defaultProps&&(a=t.type.defaultProps),e)i=="key"?o=e[i]:i=="ref"?r=e[i]:l[i]=e[i]===void 0&&a!==void 0?a[i]:e[i];return arguments.length>2&&(l.children=arguments.length>3?Z.call(arguments,2):n),G(t.type,l,o||t.key,r||t.ref,null)}Z=Fe.slice,y={__e:function(t,e,n,o){for(var r,i,a;e=e.__;)if((r=e.__c)&&!r.__)try{if((i=r.constructor)&&i.getDerivedStateFromError!=null&&(r.setState(i.getDerivedStateFromError(t)),a=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(t,o||{}),a=r.__d),a)return r.__E=r}catch(l){t=l}throw t}},Ae=0,ne.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=M({},this.state),typeof t=="function"&&(t=t(M({},n),this.props)),t&&M(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),Ce(this))},ne.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ce(this))},ne.prototype.render=Q,U=[],De=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,le=function(t,e){return t.__v.__b-e.__v.__b},oe.__r=0,ve=0,ce=Se(!1),_e=Se(!0);var ot=0;function d(t,e,n,o,r,i){e||(e={});var a,l,_=e;if("ref"in _)for(l in _={},e)l=="ref"?a=e[l]:_[l]=e[l];var c={type:t,props:_,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:--ot,__i:-1,__u:0,__source:r,__self:i};if(typeof t=="function"&&(a=t.defaultProps))for(l in a)_[l]===void 0&&(_[l]=a[l]);return y.vnode&&y.vnode(c),c}var Y,w,ae,Ee,ie=0,Je=[],N=y,Le=N.__b,$e=N.__r,Te=N.diffed,Me=N.__c,He=N.unmount,je=N.__;function ke(t,e){N.__h&&N.__h(w,t,ie||e),ie=0;var n=w.__H||(w.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function L(t){return ie=1,it(Ke,t)}function it(t,e,n){var o=ke(Y++,2);if(o.t=t,!o.__c&&(o.__=[Ke(void 0,e),function(l){var _=o.__N?o.__N[0]:o.__[0],c=o.t(_,l);_!==c&&(o.__N=[c,o.__[1]],o.__c.setState({}))}],o.__c=w,!w.u)){var r=function(l,_,c){if(!o.__c.__H)return!0;var f=o.__c.__H.__.filter(function(p){return!!p.__c});if(f.every(function(p){return!p.__N}))return!i||i.call(this,l,_,c);var s=!1;return f.forEach(function(p){if(p.__N){var v=p.__[0];p.__=p.__N,p.__N=void 0,v!==p.__[0]&&(s=!0)}}),!(!s&&o.__c.props===l)&&(!i||i.call(this,l,_,c))};w.u=!0;var i=w.shouldComponentUpdate,a=w.componentWillUpdate;w.componentWillUpdate=function(l,_,c){if(this.__e){var f=i;i=void 0,r(l,_,c),i=f}a&&a.call(this,l,_,c)},w.shouldComponentUpdate=r}return o.__N||o.__}function j(t,e){var n=ke(Y++,3);!N.__s&&Ge(n.__H,e)&&(n.__=t,n.i=e,w.__H.__h.push(n))}function me(t){return ie=5,st(function(){return{current:t}},[])}function st(t,e){var n=ke(Y++,7);return Ge(n.__H,e)&&(n.__=t(),n.__H=e,n.__h=t),n.__}function at(){for(var t;t=Je.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(re),t.__H.__h.forEach(ue),t.__H.__h=[]}catch(e){t.__H.__h=[],N.__e(e,t.__v)}}N.__b=function(t){w=null,Le&&Le(t)},N.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),je&&je(t,e)},N.__r=function(t){$e&&$e(t),Y=0;var e=(w=t.__c).__H;e&&(ae===w?(e.__h=[],w.__h=[],e.__.forEach(function(n){n.__N&&(n.__=n.__N),n.i=n.__N=void 0})):(e.__h.forEach(re),e.__h.forEach(ue),e.__h=[],Y=0)),ae=w},N.diffed=function(t){Te&&Te(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(Je.push(e)!==1&&Ee===N.requestAnimationFrame||((Ee=N.requestAnimationFrame)||lt)(at)),e.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.i=void 0})),ae=w=null},N.__c=function(t,e){e.some(function(n){try{n.__h.forEach(re),n.__h=n.__h.filter(function(o){return!o.__||ue(o)})}catch(o){e.some(function(r){r.__h&&(r.__h=[])}),e=[],N.__e(o,n.__v)}}),Me&&Me(t,e)},N.unmount=function(t){He&&He(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.forEach(function(o){try{re(o)}catch(r){e=r}}),n.__H=void 0,e&&N.__e(e,n.__v))};var Oe=typeof requestAnimationFrame=="function";function lt(t){var e,n=function(){clearTimeout(o),Oe&&cancelAnimationFrame(e),setTimeout(t)},o=setTimeout(n,100);Oe&&(e=requestAnimationFrame(n))}function re(t){var e=w,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),w=e}function ue(t){var e=w;t.__c=t.__(),w=e}function Ge(t,e){return!t||t.length!==e.length||e.some(function(n,o){return n!==t[o]})}function Ke(t,e){return typeof e=="function"?e(t):e}function ge(){return(ge=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}var ct=["context","children"];function _t(t){this.getChildContext=function(){return t.context};var e=t.children,n=function(o,r){if(o==null)return{};var i,a,l={},_=Object.keys(o);for(a=0;a<_.length;a++)r.indexOf(i=_[a])>=0||(l[i]=o[i]);return l}(t,ct);return ze(e,n)}function dt(){var t=new CustomEvent("_preact",{detail:{},bubbles:!0,cancelable:!0});this.dispatchEvent(t),this._vdom=B(_t,ge({},this._props,{context:t.detail.context}),function e(n,o){if(n.nodeType===3)return n.data;if(n.nodeType!==1)return null;var r=[],i={},a=0,l=n.attributes,_=n.childNodes;for(a=l.length;a--;)l[a].name!=="slot"&&(i[l[a].name]=l[a].value,i[Ye(l[a].name)]=l[a].value);for(a=_.length;a--;){var c=e(_[a],null),f=_[a].slot;f?i[f]=B(Ie,{name:f},c):r[a]=c}var s=o?B(Ie,null,r):r;return B(o||n.nodeName.toLowerCase(),i,s)}(this,this._vdomComponent)),(this.hasAttribute("hydrate")?Ve:se)(this._vdom,this._root)}function Ye(t){return t.replace(/-(\w)/g,function(e,n){return n?n.toUpperCase():""})}function ut(t,e,n){if(this._vdom){var o={};o[t]=n=n??void 0,o[Ye(t)]=n,this._vdom=ze(this._vdom,o),se(this._vdom,this._root)}}function vt(){se(this._vdom=null,this._root)}function Ie(t,e){var n=this;return B("slot",ge({},t,{ref:function(o){o?(n.ref=o,n._listener||(n._listener=function(r){r.stopPropagation(),r.detail.context=e},o.addEventListener("_preact",n._listener))):n.ref.removeEventListener("_preact",n._listener)}}))}function Ze(t,e,n,o){function r(){var i=Reflect.construct(HTMLElement,[],r);return i._vdomComponent=t,i._root=i,i}return(r.prototype=Object.create(HTMLElement.prototype)).constructor=r,r.prototype.connectedCallback=dt,r.prototype.attributeChangedCallback=ut,r.prototype.disconnectedCallback=vt,n=n||t.observedAttributes||Object.keys(t.propTypes||{}),r.observedAttributes=n,n.forEach(function(i){Object.defineProperty(r.prototype,i,{get:function(){return this._vdom.props[i]},set:function(a){this._vdom?this.attributeChangedCallback(i,null,a):(this._props||(this._props={}),this._props[i]=a,this.connectedCallback());var l=typeof a;a!=null&&l!=="string"&&l!=="boolean"&&l!=="number"||this.setAttribute(i,a)}})}),customElements.define(e||t.tagName||t.displayName||t.name,r)}function ft({isVisible:t,onClose:e,children:n,giftData:o}){var _,c,f,s;const r=me(null),[i,a]=L(t);j(()=>{if(t)a(!0);else{const p=setTimeout(()=>a(!1),310);return()=>clearTimeout(p)}},[t]),j(()=>{document.body.style.overflow=i?"hidden":""},[i]);const l=p=>{r.current&&!r.current.contains(p.target)&&e()};return j(()=>{if(i)return document.addEventListener("mousedown",l),()=>{document.removeEventListener("mousedown",l)}},[i]),!i&&!t?null:d("div",{className:"kv-fixed kv-inset-0 kv-z-50 kv-flex kv-items-center kv-justify-center kv-p-4 kv-bg-black kv-bg-opacity-50",children:d("div",{ref:r,className:`kv-relative kv-w-full kv-max-w-2xl kv-bg-white kv-rounded-lg kv-shadow-lg 
          ${t?"kv-modal-enter":"kv-modal-exit"}`,children:[d("div",{className:"free-gift-popup--header kv-p-6",children:[d("div",{className:"kv-flex kv-items-center kv-justify-between",children:[d("h3",{className:"kv-popup-title kv-text-2xl kv-font-bold",children:(c=(_=o==null?void 0:o.content)==null?void 0:_.popup)==null?void 0:c.title}),d("button",{type:"button",className:"kv-text-gray-400 kv-hover:text-gray-900",onClick:p=>{p.stopPropagation(),e()},children:d("svg",{className:"kv-w-6 kv-h-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:d("use",{href:"#icon-close"})})})]}),d("p",{className:"kv-text-xl kv-popup-subtitle",children:(s=(f=o==null?void 0:o.content)==null?void 0:f.popup)==null?void 0:s.subtitle})]}),d("div",{className:"kv-p-6 kv-pt-0",children:n})]})})}function pt(){var be,we,xe;const[t,e]=L(!1),[n,o]=L(null),[r,i]=L(null),[a,l]=L([]),[_,c]=L(!1),[f,s]=L(null),[p,v]=L(""),[C,E]=L("0%"),[x,k]=L(!1),[m,O]=L(null),S=me(null);j(()=>{const u=document.getElementById("giftItemData");if(u){const g=JSON.parse(u.textContent).find(b=>b.isActive);o(g)}},[]);const W=async function(u){if(console.log("remove items from cart"),u.length===0||x)return;const h={};if(u.forEach(P=>{P.isInCart&&(h[P.added_variant]=0)}),!u.find(P=>P.isInCart)){k(!0);return}const b=await fetch("/cart/update.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({updates:h,sections:["gift-item-data","mini-cart","cart-icon-bubble","mobile-cart-icon-bubble"],sections_url:window.location.pathname})});if(b.ok){const P=await b.json(),A=P.sections["gift-item-data"],T=new DOMParser().parseFromString(A,"text/html").querySelector("#giftItemData");if(T){const z=JSON.parse(T.textContent);console.log("Parsed giftItemData:",z);const F=z.find(Qe=>Qe.isActive);F?(o(F),console.log("Active gift data:",F)):console.log("No active gift found");const J=document.querySelector("mini-cart");J&&(console.log(P),J&&J.renderContents(P)),document.dispatchEvent(new CustomEvent("ajaxProduct:added",{detail:{product:P}}))}k(!0),console.log("Locked items removed from cart.")}else console.error("Failed to remove locked items from cart")};j(()=>{var u;if(n){const h=n.products.filter(b=>b.is_unlocked);i(h);const g=n.products.filter(b=>!b.is_unlocked);if(console.log("LockedItems: ",g),l(g),v((u=g[0])==null?void 0:u.message_to_unlock),g.length>0&&!x&&W(g),g[0]){let b=0;g[0].amount_to_reach>0?n.amount_to_reach>0?b=(n.price_threshold-n.amount_to_reach)/n.price_threshold*100:b=(g[0].price_threshold-g[0].amount_to_reach)/g[0].price_threshold*100:n.amount_to_reach>0?b=(n.price_threshold-n.amount_to_reach)/n.price_threshold*100:b=100,E(`${b}%`)}}},[n]),j(()=>{const u=h=>{if(h.detail){const g=h.detail.find(b=>b.isActive);o(g)}};return document.addEventListener("cart-update",u),()=>{document.removeEventListener("cart-update",u)}},[]);const H=()=>{e(!0)},X=()=>{if(e(!1),m){const u=document.querySelector("mini-cart");u&&u&&u.renderContents(m),document.dispatchEvent(new CustomEvent("ajaxProduct:added",{detail:{product:m}}))}},I=async(u,h,g)=>{u&&(u.preventDefault(),u.stopPropagation());try{if(g&&g.added_variant){if(h===g.added_variant)return;const A=await(await fetch("/cart/change.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:g.added_variant.toString(),quantity:0})})).json()}const b=await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:[{id:h,quantity:1,properties:{isGiftItem:!0}}],sections:["gift-item-data","mini-cart","cart-icon-bubble","mobile-cart-icon-bubble"],sections_url:window.location.pathname})});if(b.ok){const P=await b.json();console.log("Response data:",P);const A=P.sections["gift-item-data"],T=new DOMParser().parseFromString(A,"text/html").querySelector("#giftItemData");if(T){const z=JSON.parse(T.textContent);console.log("Parsed giftItemData:",z);const F=z.find(J=>J.isActive);F?(o(F),console.log("Active gift data:",F)):console.log("No active gift found")}O(P),console.log("Item added to cart")}else console.error("Failed to add item to cart")}catch(b){console.error("Error adding item to cart",b)}},V=(u,h)=>{u.preventDefault(),h.variants&&h.variants.length>1?(console.log(h.variants),s(h),R()):I(u,h.variants[0].id)};function $(u){const h=document.createElement("textarea");return h.innerHTML=u,h.value}j(()=>{var u,h,g,b;if(n){let P=(h=(u=n==null?void 0:n.content)==null?void 0:u.cart_drawer)==null?void 0:h.unlock_message;n.amount_to_reach==0&&(P=(b=(g=n==null?void 0:n.content)==null?void 0:g.cart_drawer)==null?void 0:b.goal_reached_message);const A=document.querySelector(".free-gift__text"),ee=document.querySelector(".free-gift__progress");if(A&&P&&n.cart_total>0){const D=$(P);A.innerHTML=D;const T=document.querySelector(".gwp_popup_trigger");T&&(T.style.cursor="pointer",T.addEventListener("click",H))}if(ee){let D=0;n.price_threshold>0&&n.amount_to_reach>0?D=(n.price_threshold-n.amount_to_reach)/n.price_threshold*100:D=100,ee.style.setProperty("--progress",`${D}%`)}}},[n]);const R=()=>{c(!0),setTimeout(()=>{S.current&&(S.current.classList.remove("kv-hidden"),setTimeout(()=>{S.current.classList.add("kv-visible")},20))},10)},ye=u=>{u.preventDefault(),u.stopPropagation(),S.current&&(S.current.classList.remove("kv-visible"),S.current.classList.add("kv-hidden")),c(!1)};return d(Q,{children:[n&&n.cart_total>0&&d("div",{className:"free-gift typeset0",children:[d("span",{className:"free-gift__text free-gift__text--success",children:["Spend $141.00 more to reach Gift With Purchase.",d("span",{className:"see-gift-link",onClick:H,style:{cursor:"pointer",textDecoration:"underline"},children:"SEE GIFT"}),"."]}),d("span",{className:"free-gift__progress",style:{"--progress":"0%"}})]}),d(ft,{isVisible:t,onClose:X,giftData:n,children:[(r==null?void 0:r.length)>0&&d("div",{class:"kv-items-available kv-overflow-hidden kv-relative kv-block kv-p-6 kv-bg-white kv-border kv-border-green-500 kv-rounded-lg kv-dark:bg-gray-800 kv-dark:border-gray-700",children:[d("h5",{class:"kv-mb-2 kv-text-xl kv-font-bold kv-tracking-tight kv-text-gray-900 kv-dark:text-white",children:"You got this"}),d("p",{class:"kv-mb-4 kv-text-lg kv-font-normal kv-text-gray-700 kv-dark:text-gray-400",children:"Enjoy your free gift."}),r==null?void 0:r.map((u,h)=>d("div",{className:`kv-unlocked-product kv-flex kv-items-center kv-py-5 kv-border-t kv-border-gray-200 ${h===r.length-1?"kv-pb-0":""}`,children:[d("div",{className:"",children:d("div",{className:"kv-w-24",children:d("div",{class:"kv-unlocked-product-image kv-w-24 kv-h-24 kv-relative kv-rounded-md kv-bg-gray-300",children:[d("img",{src:u.featured_image,alt:u.title,className:"kv-w-full kv-h-full kv-object-cover kv-rounded-md"}),u.isInCart&&d("div",{className:"kv-unlocked-product-cart-status kv-absolute -kv-right-3 -kv-top-3",children:d("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"kv-size-8 kv-fill-green-500 kv-stroke-white",children:d("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})})})]})})}),d("div",{className:"kv-flex kv-flex-col kv-justify-between kv-pl-4 kv-leading-normal kv-flex-grow",children:d("h5",{class:"kv-unlocked-product-title kv-text-lg kv-font-medium kv-tracking-tight kv-text-gray-900 kv-dark:text-white",children:u.title})}),d("div",{className:"kv-flex kv-atc-btn--wrapper kv-w-auto",children:d("button",{className:"kv-atc-btn kv-relative kv-inline-flex kv-items-center kv-justify-center kv-p-0.5 kv-mb-2 kv-me-2 kv-overflow-hidden kv-text-sm kv-font-medium kv-text-gray-900 kv-rounded-lg kv-group kv-bg-gradient-to-br kv-from-pink-500 kv-to-orange-400 group-hover:kv-from-pink-500 group-hover:kv-to-orange-400 hover:kv-text-white kv-focus:kv-ring-4 focus:kv-outline-none focus:kv-ring-pink-200",onClick:g=>V(g,u),disabled:u.isInCart&&u.variants.length===1,children:d("span",{className:"kv-relative kv-px-2.5 kv-py-2.5 kv-transition-all kv-ease-in kv-duration-75 kv-bg-white kv-dark:bg-gray-900 kv-rounded-md group-hover:kv-bg-opacity-0",children:d("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2.5,stroke:"currentColor",className:"kv-size-6 kv-transition-colors kv-duration-300 group-hover:kv-stroke-white",children:d("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})})})})})]},u.id)),_&&d("div",{ref:S,className:"kv-variant-information kv-hidden kv-p-6 kv-pt-10 kv-border-t kv-flex kv-gap-2",style:{left:"0",width:"100%"},children:[d("button",{className:"kv-absolute kv-top-3 kv-right-6",onClick:u=>ye(u),children:d("svg",{class:"kv-w-6 kv-h-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:d("use",{href:"#icon-close"})})}),f.variants.map(u=>d("button",{className:`kv-text-xl kv-inline-flex kv-items-center kv-justify-center kv-p-0.5
                    disabled:kv-line-through disabled:kv-bg-gradient-to-br disabled:kv-from-pink-500 disabled:kv-to-orange-400
                    kv-me-2 kv-font-medium kv-text-gray-900 kv-rounded-lg kv-group
                    kv-bg-gradient-to-br kv-from-pink-500 kv-to-orange-400
                    group-hover:kv-from-pink-500 group-hover:kv-to-orange-400
                    hover:kv-text-white kv-focus:kv-ring-4 focus:kv-outline-none focus:kv-ring-pink-200
                    disabled:hover:kv-bg-gradient-to-br disabled:hover:kv-from-pink-500 disabled:hover:kv-to-orange-400`,onClick:h=>{I(h,u.id,f),ye(h),s(null)},disabled:!u.available,children:d("span",{className:`kv-relative kv-px-2.5 kv-py-2.5 kv-transition-all kv-ease-in kv-duration-75 kv-bg-white kv-dark:bg-gray-900 kv-rounded-md
                    group-hover:kv-bg-opacity-0
                    disabled:group-hover:kv-bg-opacity-100 disabled:hover:kv-bg-white`,children:u.title})},u.id))]})]}),(a==null?void 0:a.length)>0&&d("div",{class:"kv-block kv-items-to-unlock kv-mt-6 kv-p-6 kv-bg-white kv-border kv-border-gray-200 kv-rounded-lg kv-dark:bg-gray-800 kv-dark:border-gray-700",children:[d("h5",{class:"kv-mb-2 kv-text-xl kv-font-bold kv-tracking-tight kv-text-gray-900 kv-dark:text-white",children:p}),d("p",{class:"kv-mb-4 kv-text-lg kv-font-normal kv-text-gray-700 kv-dark:text-gray-400",children:(xe=(we=(be=n==null?void 0:n.content)==null?void 0:be.popup)==null?void 0:we.next_unlock_section)==null?void 0:xe.subtitle}),d("div",{className:"kv-flex",children:d("span",{className:"free-gift__progress free-gift__progress--popup",style:{"--progress":C}})}),a==null?void 0:a.map((u,h)=>d("div",{className:`kv-flex kv-items-center kv-py-5 ${h!==0?"kv-border-t kv-border-gray-200":""} ${h!=a.length-1?"kv-pb-5":"kv-pb-0"}`,children:[d("div",{className:"kv-w-24",children:d("div",{className:"kv-w-24 kv-h-24 kv-rounded-md kv-bg-gray-300",children:d("img",{src:u.featured_image,alt:u.title,className:"kv-w-full kv-h-full kv-object-cover kv-rounded-md"})})}),d("div",{className:"kv-flex kv-flex-col kv-justify-between kv-pl-4 kv-leading-normal kv-flex-grow",children:d("h5",{className:"kv-text-lg kv-font-medium kv-tracking-tight kv-text-gray-900 kv-dark:text-white",children:u==null?void 0:u.title})})]}))]})]})]})}Ze(pt,"gift-with-purchase-bar");function ht(){const[t,e]=L(null),[n,o]=L(!1),r=me(null);return j(()=>{const i=l=>{e(l.detail),console.log(l.detail),o(!0)},a=l=>{r.current&&!r.current.contains(l.target)&&(o(!1),e(null))};return document.addEventListener("product-data:load",i),document.addEventListener("click",a),()=>{document.removeEventListener("click",a),document.removeEventListener("product-data:load",i)}},[]),d("div",{ref:r,className:`cart-recommendation-product-data ${n?"show":""}`,children:t?d("div",{className:"kv-flex kv-flex-col kv-gap-4",children:[d("div",{className:"kv-product-info kv-flex kv-gap-4",children:[d("div",{className:"kv-product--image kv-w-24",children:d("img",{src:t.featured_image,alt:t.title,className:"kv-w-full kv-h-full kv-object-cover"})}),d("div",{className:"kv-product--info",children:d("div",{className:"kv-product--title",children:[d("h5",{className:"kv-text-lg kv-font-medium kv-tracking-tight kv-text-gray-900 kv-dark:text-white",children:t==null?void 0:t.title}),d("p",{class:"kv-mb-4 kv-text-lg kv-font-normal kv-text-gray-700 kv-dark:text-gray-400",children:t.price_text})]})})]}),d("div",{className:"kv-flex kv-size-options-wrapper",children:t.options_with_values.map((i,a)=>i.name==="Size"?i.values.map((l,_)=>{const c=t.variants.find(f=>f.options.includes(l));return d("add-to-cart",{class:`button button--small button--cta button-secondary ${c.available?"":"disabled"}`,"data-variant-id":c.id,children:d("span",{class:"label",children:l})})}):null)})]}):d("p",{children:"No product recommendation available"})})}Ze(ht,"cart-recommendation-product-add");
