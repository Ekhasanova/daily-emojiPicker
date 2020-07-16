!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.dailyEmojiPicker=e():t.dailyEmojiPicker=e()}(window,(function(){return function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=1)}([function(t,e,o){var i,n,r;n=[],void 0===(r="function"==typeof(i=function(){function t(t,e,o){function i(){return window.innerWidth||s.documentElement.clientWidth||document.body.clientWidth}function n(t){return t.getBoundingClientRect().top+l-s.documentElement.clientTop}function r(t){return t.getBoundingClientRect().left+a-s.documentElement.clientLeft}var s,l,a;return s=t.ownerDocument,l=window.pageYOffset||s.body.scrollTop,a=window.pageXOffset||s.body.scrollLeft,!((e===window?(window.innerHeight||s.documentElement.clientHeight||document.body.clientHeight)+l:n(e)+e.offsetHeight)<=n(t)-o||(e===window?l:n(e))>=n(t)+o+t.offsetHeight||(e===window?i()+window.pageXOffset:r(e)+i())<=r(t)-o||(e===window?a:r(e))>=r(t)+o+t.offsetWidth)}function e(){return(new Date).getTime()}function o(t,e){return function(){return t.apply(e,arguments)}}function i(t){r||(n={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},r=!0),this._settings=function(t,e){var o,i={};for(o in t)t.hasOwnProperty(o)&&(i[o]=t[o]);for(o in e)e.hasOwnProperty(o)&&(i[o]=e[o]);return i}(n,t),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._handleScrollFn=o(this.handleScroll,this),window.addEventListener("resize",this._handleScrollFn),this.update()}var n,r=!1;return i.prototype._showOnAppear=function(t){function e(){t.removeEventListener("load",o),t.classList.remove(i.class_loading),i.callback_error&&i.callback_error(t)}function o(){null!==i&&(i.callback_load&&i.callback_load(t),t.classList.remove(i.class_loading),t.classList.add(i.class_loaded),t.removeEventListener("load",o),t.removeEventListener("error",e))}var i=this._settings;"IMG"!==t.tagName&&"IFRAME"!==t.tagName||(t.addEventListener("load",o),t.addEventListener("error",e),t.classList.add(i.class_loading)),function(t,e,o){var i=t.tagName,n=t.getAttribute("data-"+o);if("IMG"===i){!function(t,e){var o=t.parentElement;if("PICTURE"===o.tagName)for(var i=0;i<o.children.length;i++){var n=o.children[i];if("SOURCE"===n.tagName){var r=n.getAttribute("data-"+e);r&&n.setAttribute("srcset",r)}}}(t,e);var r=t.getAttribute("data-"+e);return r&&t.setAttribute("srcset",r),void(n&&t.setAttribute("src",n))}"IFRAME"===i?n&&t.setAttribute("src",n):n&&(t.style.backgroundImage="url("+n+")")}(t,i.data_srcset,i.data_src),i.callback_set&&i.callback_set(t)},i.prototype._loopThroughElements=function(){var e,o,i=this._settings,n=this._elements,r=n?n.length:0,s=[];for(e=0;e<r;e++)o=n[e],i.skip_invisible&&null===o.offsetParent||t(o,i.container,i.threshold)&&(this._showOnAppear(o),s.push(e),o.wasProcessed=!0);for(;s.length>0;)n.splice(s.pop(),1),i.callback_processed&&i.callback_processed(n.length);0===r&&this._stopScrollHandler()},i.prototype._purgeElements=function(){var t,e=this._elements,o=e.length,i=[];for(t=0;t<o;t++)e[t].wasProcessed&&i.push(t);for(;i.length>0;)e.splice(i.pop(),1)},i.prototype._startScrollHandler=function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._handleScrollFn))},i.prototype._stopScrollHandler=function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._handleScrollFn))},i.prototype.handleScroll=function(){var t,i,n;this._settings&&(i=e(),0!==(n=this._settings.throttle)?(t=n-(i-this._previousLoopTime))<=0||t>n?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=i,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(o((function(){this._previousLoopTime=e(),this._loopTimeout=null,this._loopThroughElements()}),this),t)):this._loopThroughElements())},i.prototype.update=function(){this._elements=function(t){return Array.prototype.slice.call(t)}(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},i.prototype.destroy=function(){window.removeEventListener("resize",this._handleScrollFn),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null},i})?i.apply(e,n):i)||(t.exports=r)},function(t,e,o){"use strict";o.r(e),o.d(e,"EmojiPicker",(function(){return u}));var i=o(0),n=o.n(i),r=function(t){var e;e={container:t,elements_selector:".lazy",threshold:50,load_delay:100},new n.a(e)},s=function(){function t(){}return t.getElement=function(t){var e=t.name,o=t.relative_path,i=document.createElement("div");i.classList.add("emoji-block__item","js-emoji"),i.setAttribute("data-emoji",e),i.setAttribute("data-src",o);var n=document.createElement("div");return n.classList.add("emoji-block__item-image","lazy"),n.setAttribute("data-original",o),i.append(n),i},t.getContent=function(t,e,o){var i=document.createElement("div");i.classList.add("emoji-block__wrap","js-emoji-group"),i.setAttribute("data-group",t);for(var n=0;n<e.length;n++)i.append(this.getElement(e[n]));return r(i),t===o&&i.classList.add("is-active"),i},t}(),l=function(){function t(){}return t.getElement=function(t){var e=document.createElement("div");e.classList.add("emoji-block__groups-item","js-emoji-panel-item"),e.setAttribute("data-tab",t),t===this.activeGroup&&e.classList.add("is-active");var o=document.createElement("span");return o.classList.add("sprite-"+t),e.append(o),e},t.getContent=function(t,e){this.activeGroup=e;var o=document.createElement("div");o.classList.add("emoji-block__groups","js-emoji-panel");for(var i=0;i<t.length;i++)o.append(this.getElement(t[i]));return o},t}(),a=function(){function t(t,e,o){this.container=t,this.data=e,this.activeGroup=o}return Object.defineProperty(t.prototype,"template",{get:function(){var t=this,e=document.createElement("div");e.classList.add("emoji-block","js-emoji-block");var o=Object.keys(this.data);return o.forEach((function(o){var i=t.data[o];e.append(s.getContent(o,i,t.activeGroup))})),e.append(l.getContent(o,this.activeGroup)),e},enumerable:!1,configurable:!0}),t.prototype.render=function(){this.container.append(this.template)},t}(),c=function(){function t(){}return t.subscribe=function(t){this.handler=t},t.emit=function(t){this.handler(t)},t}(),u=(o(2),function(){function t(t,e){this.container=t,this.getEmojiList=e.source,this.onEmojiSelected=e.onSelect,this.defaultActiveGroup=e.defaultActiveGroup||"smiles"}return Object.defineProperty(t.prototype,"activeGroup",{get:function(){return this.container.querySelector(".js-emoji-group.is-active")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"activeGroupIcon",{get:function(){return this.container.querySelector(".js-emoji-panel-item.is-active")},enumerable:!1,configurable:!0}),t.prototype.showEmoji=function(){this.activeGroup&&this.activeGroup.dispatchEvent(new Event("scroll"))},t.prototype.render=function(t){new a(this.container,t,this.defaultActiveGroup).render()},t.prototype.onEmojiClick=function(t){var e=t.getAttribute("data-emoji")||"",o=t.getAttribute("data-src")||"";c.emit({emoji:e,emoji_src:o}),this.emojiBlock&&this.emojiBlock.classList.remove("is-show")},t.prototype.showGroup=function(t){var e=t.getAttribute("data-tab");this.activeGroupIcon&&this.activeGroupIcon.classList.remove("is-active"),t.classList.add("is-active"),this.activeGroup&&this.activeGroup.classList.remove("is-active");var o=this.container.querySelector("[data-group="+e+"]");o&&o.classList.add("is-active"),this.showEmoji()},t.prototype.setElements=function(){this.emojiBlock=this.container.querySelector(".js-emoji-block")},t.prototype.addListeners=function(){var t=this;this.emojiBlock&&this.emojiBlock.addEventListener("click",(function(e){var o=e.target;o.closest(".js-emoji-panel")?t.showGroup(o):o.classList.contains("js-emoji")&&t.onEmojiClick(o)})),c.subscribe(this.onEmojiSelected)},t.prototype.init=function(){var t=this;this.getEmojiList().then((function(e){t.render(e),t.showEmoji(),t.setElements(),t.addListeners()}))},t}())},function(t,e){}])}));