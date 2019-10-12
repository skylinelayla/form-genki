!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.FormGen=e():t.FormGen=e()}(this,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";var r,a,s,i=n(11),o="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function u(){s=!1}function l(t){if(t){if(t!==r){if(t.length!==o.length)throw new Error("Custom alphabet for shortid must be "+o.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter(function(t,e,n){return e!==n.lastIndexOf(t)});if(e.length)throw new Error("Custom alphabet for shortid must be "+o.length+" unique characters. These characters were not unique: "+e.join(", "));r=t,u()}}else r!==o&&(r=o,u())}function c(){return s||(s=function(){r||l(o);for(var t,e=r.split(""),n=[],a=i.nextValue();e.length>0;)a=i.nextValue(),t=Math.floor(a*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}t.exports={get:function(){return r||o},characters:function(t){return l(t),r},seed:function(t){i.seed(t),a!==t&&(u(),a=t)},lookup:function(t){return c()[t]},shuffled:c}},function(t,e){},function(t,e){},function(t,e,n){"use strict";t.exports=n(12)},function(t,e,n){"use strict";n.r(e);var r=n(3),a=n.n(r);function s(){return a.a.generate()}function i(t,e){if("string"!=typeof t)return;let n=document.createElement(t);return"object"==typeof e&&Object.keys(e).map(t=>{n.setAttribute(t,e[t])}),n}var o=class{constructor(t){this.uuid=s(),this.metaData=t,this.locale=t.localeKey}checkValue(){}getName(){return this.metaData.name}getValue(){}setValue(){}getHtml(){}setStyle(){}setLocaleText(t){return t[this.locale]||!1}setWrapper(){return i("div",{class:"form-group",id:s()})}};var u=class extends o{constructor(t){super(t)}getHtml(){if(this.metaData.labelText&&this.setLocaleText(this.metaData.labelText))return`<label\n            for="${this.metaData.name}"\n            id="${this.uuid}" \n            class="form-genki-label">${this.setLocaleText(this.metaData.labelText)||""}${this.metaData.labelHtml||""}</label> `}};class l extends o{constructor(t){super(t),this.type=this.metaData.type.toLowerCase()}getHtml(){let t=new u(this.metaData),e=this.setWrapper();return e.innerHTML=`${t.getHtml()} ${this.handleTpl()}`,e.outerHTML}getValue(){let t="value";return"CHECKBOX"===this.type&&(t="checked"),document.getElementById(this.uuid)[t]}setValue(t){document.getElementById(this.uuid).value=t}setStyle(){return(this.metaData.styleClass||"form-control")+` col-${this.metaData.columnSize||12}`}handleTpl(){let t=this.metaData.defaultValue;return`<input type="${this.type}" \n        id="${this.uuid}"\n        name="${this.metaData.name}"\n        value="${t||""}"\n        class="form-genki-input ${this.setStyle()}"\n        ${this.metaData.required?"required":""}\n        placeholder="${this.setLocaleText(this.metaData.hintText)}"\n        ${"checkbox"===this.type&&t?"checked":""}>`}checkValue(){this.metaData&&!this.getValue()&&document.getElementById(this.uuid).setAttribute("class","was-validated")}}var c=n(2),h=n.n(c),d=n(1),f=n.n(d);class m extends o{constructor(t){super(t),this.type=this.metaData.type.toLowerCase()}getHtml(){let t=new u(this.metaData),e=this.setWrapper();return e.innerHTML=`${t.getHtml()} ${this.handleTpl()}`,e.outerHTML}getValue(){let t="value";return"CHECKBOX"===this.type&&(t="checked"),document.getElementById(this.uuid)[t]}setValue(t){document.getElementById(this.uuid).value=t}setStyle(){return(this.metaData.styleClass||"form-control")+` col-${this.metaData.columnSize||12}`}handleTpl(){let t=this.metaData.defaultValue;return`<input type="${this.type}" \n        id="${this.uuid}"\n        name="${this.metaData.name}"\n        value="${t||""}"\n        class="form-genki-input ${this.setStyle()}"\n        ${this.metaData.required?"required":""}\n        placeholder="${this.setLocaleText(this.metaData.hintText)}"\n        ${"checkbox"===this.type&&t?"checked":""}>`}checkValue(){this.metaData&&!this.getValue()&&document.getElementById(this.uuid).setAttribute("class","was-validated")}}class p extends m{constructor(t){super(t)}handleItemTpl(t){return`<input\n            type="radio" value="${this.setLocaleText(t.text)}" name="${this.metaData.name}"\n            id="${s()}" class="form-genki-input ${this.setStyle()}"\n            ${t.value?"checked":""}>`}handleTpl(){return this.metaData.items.reduce((t,e)=>t+=this.handleItemTpl(e),"")}getValue(){let t="";return document.getElementById(this.uuid).children.forEach(e=>{e.checked&&(t=e.value)}),t}}function g(t){return t||(window.localStorage.getItem("LANG")||"zh-CN")}var y=class{constructor(t){var e;e=localStorage.setItem,localStorage.setItem=function(t,n){e.apply(this,arguments);var r=new Event("storageChanged");document.dispatchEvent(r)},this.data=t,this.locale=g(),this.itemInstance=[],this.$container=null,this.resultValue={},this.formId=s(),this.containerId=t.containerId||"form-container";var n,r=this;n=function(){r.locale=g(),r.refresh()},document.addEventListener("storageChanged",()=>{n()}),this.$formWrapper=this.getFormWrapper()}render(){if(this.$container=document.getElementById(this.containerId),!this.$container)throw new Error("please check form container is provided");this.mount()}mount(){this.$formWrapper.innerHTML=this.getRawHtml(this.data),this.$container.innerHTML=this.$formWrapper.outerHTML}getFormData(){return this.itemInstance.forEach(t=>{this.resultValue[t.getName()]=t.getValue()}),this.resultValue}setFormValue(t){this.itemInstance.forEach((e,n)=>{t&&t[n]&&e.setValue(t[n].defaultValue||"")})}validateForm(){document.getElementById(this.formId).classList.add("was-validated")}destroy(){this.$container.innerHTML=""}refresh(){this.$container&&(this.destroy(),this.mount())}getFormWrapper(){return i("form",{class:"form-genki-block",id:this.formId})}getRawHtml(t){let e=null,n="";return this.itemInstance=[],t.properties.forEach(t=>{let r={...t,localeKey:this.locale};switch(t.type){case"TEXT":e=new l(r);break;case"SELECT":e=new h.a(r);break;case"BUTTON":e=new f.a(r);break;case"RADIO":e=new p(r);break;default:e=new l(r)}n+=e.getHtml(),this.itemInstance.push(e)}),n}};n.d(e,"Render",function(){return y})},function(t,e,n){"use strict";t.exports=0},function(t,e,n){"use strict";var r=n(0);t.exports=function(t){return!(!t||"string"!=typeof t||t.length<6||new RegExp("[^"+r.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t))}},function(t,e){t.exports=function(t,e,n){var r=(2<<Math.log(e.length-1)/Math.LN2)-1,a=Math.ceil(1.6*r*n/e.length);n=+n;for(var s="";;)for(var i=t(a),o=0;o<a;o++){var u=i[o]&r;if(e[u]&&(s+=e[u]).length===n)return s}}},function(t,e,n){"use strict";var r,a="object"==typeof window&&(window.crypto||window.msCrypto);r=a&&a.getRandomValues?function(t){return a.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},t.exports=r},function(t,e,n){"use strict";var r=n(0),a=n(8),s=n(7);t.exports=function(t){for(var e,n=0,i="";!e;)i+=s(a,r.get(),1),e=t<Math.pow(16,n+1),n++;return i}},function(t,e,n){"use strict";var r,a,s=n(9),i=(n(0),1567752802062),o=7;t.exports=function(t){var e="",n=Math.floor(.001*(Date.now()-i));return n===a?r++:(r=0,a=n),e+=s(o),e+=s(t),r>0&&(e+=s(r)),e+=s(n)}},function(t,e,n){"use strict";var r=1;t.exports={nextValue:function(){return(r=(9301*r+49297)%233280)/233280},seed:function(t){r=t}}},function(t,e,n){"use strict";var r=n(0),a=n(10),s=n(6),i=n(5)||0;function o(){return a(i)}t.exports=o,t.exports.generate=o,t.exports.seed=function(e){return r.seed(e),t.exports},t.exports.worker=function(e){return i=e,t.exports},t.exports.characters=function(t){return void 0!==t&&r.characters(t),r.shuffled()},t.exports.isValid=s}])});
//# sourceMappingURL=FormGen.js.map