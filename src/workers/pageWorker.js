!function(e){function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=188)}({188:function(e,n,t){"use strict";function o(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}var a=t(33),r=o(a),i=t(32),u=o(i),d=t(83);!function(){function e(e){var n=s(e).className.substr(0,10),t=l(N,e),o=!1,a=["wall_audio","post_media","search_res"];a.indexOf(n)>=0&&(o=!0);var r=o?2:1,i=f(t,r);e.addEventListener("mouseleave",function(){g(e)&&(v(t),_(i))})}function n(){w.forEach(function(n){for(var t=document.querySelectorAll(n),o=0;o<t.length;o++){var a=t[o],r=l(b,a);if(!r){var i=l(k,a);h(i,(0,d.markButton)(y)),h(i,(0,d.downloadButton)(y)),e(a)}}})}function t(){var e=document.querySelectorAll(".audio_albums_wrap .audio_album_btns");e.forEach(function(e){e.appendChild((0,d.albumDownloadButton)(y))})}function o(){if(o.prevCheckTimestamp<Date.now()-1e3){if(i()&&n(),"audio"===window.location.pathname.substr(1,5)){var e=document.getElementById("ui_rmenu_audio_albums");m(e,"proceeded")||(t(),a(e,"proceeded"))}o.prevCheckTimestamp=Date.now()}}var a=r.addClassName,i=r.audioListChanged,l=r.findNodeWithClass,c=r.getLocale,s=r.getNthParentNode,f=r.getNthSiblingNode,m=r.hasClass,v=r.hide,p=r.log,h=r.prepend,_=r.show,g=r.thisNotCurrent,w=u.AUDIO_ROWS_CLASSNAMES,b=u.DOWNLOAD_BUTTON_CLASSNAME,N=u.MARK_BUTTON_CLASSNAME,k=u.VK_AUDIO_ACTS_CLASSNAME,C=u.bgWorkerExtensionId,y=void 0;!function(){c(C).then(function(e){y=e}).then(function(){n(),o.prevCheckTimestamp=0,o(),document.addEventListener("scroll",o),document.addEventListener("keypress",o),document.addEventListener("mousemove",o),p("Greetings :) Now you can download music")}).catch(function(e){p("Init error: "+e,"error")})}()}()},32:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=n.DOWNLOAD_BUTTON_CLASSNAME="vkdw-download-button";n.MARK_BUTTON_CLASSNAME="vkdw-mark-button",n.ALBUM_DOWNLOAD_BUTTON_CLASSNAME=o+" album-download-btn",n.VK_AUDIO_ACTS_CLASSNAME="audio_acts",n.AUDIO_ROWS_CLASSNAMES=[".audio_playlist_wrap .audio_row",".wall_audio_rows .audio_row",".post_media .audio_row",".search_results .audio_row",".audio_feed_rows .audio_row"],n.bgWorkerExtensionId="jmeoclngnginpnolpkbepdjgcfjbiclc"},33:function(e,n,t){"use strict";function o(e){e.style.display="block"}function a(e){e.style.display="none"}function r(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=e,o=0;o<n;o++)t=t.parentNode;return t}function i(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=e,o=0;o<n;o++)t=t.nextElementSibling;return t}function u(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;return n.getElementsByClassName(e)[0]}function d(e,n){return[].indexOf.call(e.classList,n)>=0}function l(e,n){e.insertBefore(n,e.firstChild)}function c(e,n){var t=e.className.split(" "),o=t.indexOf(n);o<0&&t.push(n),e.className=t.join(" ")}function s(e,n){var t=e.className.split(" "),o=t.indexOf(n);o>=0&&t.splice(o,1),e.className=t.join(" ")}function f(e,n){var t=e.className.split(" "),o=t.indexOf(n);o<0?c(e,n):s(e,n)}function m(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"log";console[n](e)}function v(e,n,t){var o=document.createElement("div");if(o.className=e,o.dataset.nodrag=1,n&&(o.dataset.tooltip=n),t)for(var a in t)({}).hasOwnProperty.call(t,a)&&o.addEventListener(a,t[a](o));return o}function p(e,n){var t=void 0,o=void 0,a=void 0;if(e>9)if(e<21)t=n.tracksTitle[2];else if(e<99){var r=e%10;t=p(r,n)}else o=String(e),a=Number(o.slice(o.length-2,o.length)),t=p(a,n);else switch(e){case 0:case 5:case 6:case 7:case 8:case 9:t=n.tracksTitle[2];break;case 1:t=n.tracksTitle[0];break;case 2:case 3:case 4:t=n.tracksTitle[1];break;default:t=n.tracksTitle[0]}return t}function h(e){var n=e;if(void 0!==e)for(var t=[":","~","?","*","/","\\","|","<",">"],o=0;o<t.length;o++)n=n.split(t[o]).join("");return n}function _(e){var n=r(e,4);return!d(n,"audio_row_current")}function g(){var e=document.querySelectorAll(".vkdw-marked");e.forEach(function(e){s(e,"animated"),s(e,"clicked"),s(e,"vkdw-marked")})}function w(e){var n=document.getElementById("audio_"+e);s(n,"animated"),s(n,"clicked"),s(n,"vkdw-marked")}function b(e){return new Promise(function(n,t){var o=window.vk.lang;chrome.runtime.sendMessage(e,{type:"getLocale",langId:o},function(e){e?n(e):t("Cannot fetch localisation from bgWorker",e)})})}function N(){var e=document.getElementsByClassName("audio_row").length,n=document.getElementsByClassName("vkdw-download-button").length,t=N.prevAudioListLength;return N.prevAudioListLength=e,e!==n||e!==t}Object.defineProperty(n,"__esModule",{value:!0}),n.show=o,n.hide=a,n.getNthParentNode=r,n.getNthSiblingNode=i,n.findNodeWithClass=u,n.hasClass=d,n.prepend=l,n.addClassName=c,n.removeClassName=s,n.toggleClassName=f,n.log=m,n.createNode=v,n.trackEndingsGenerator=p,n.removeRestrictedChars=h,n.thisNotCurrent=_,n.uncheckMarked=g,n.uncheckItemById=w,n.getLocale=b,n.audioListChanged=N},83:function(e,n,t){"use strict";function o(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}function a(e){var n=!1,t=w(e,5).className.substr(0,10);return"wall_audio"===t?n=!0:"post_media"===t?n=!0:"search_res"===t&&(n=!0),n}function r(e){return g(B,e.downloadTitle,{click:function(e){return function(){var n=w(e,4);_(n,"vkdw-marked"),_(e,"clicked"),setTimeout(function(){_(n,"animated")},100),(0,h.downloadMarked)()}},mouseenter:function(e){return function(){var n=a(e),t=b(e),o=n?3:2,r=b(e,o);window.clearTimeout(I),_(e,"tooltipped"),setTimeout(function(){_(e,"animated")},100),A(e)&&(k(r),T(t))}},mouseleave:function(e){return function(){var n=b(e),t=a(e)?3:2,o=b(e,t);C(e,"animated"),C(e,"clicked"),setTimeout(function(){C(e,"tooltipped")},100),I=setTimeout(function(){A(e)&&(k(n),T(o))},600)}}})}function i(e){return g(M,e.markButtonTitle,{click:function(e){return function(){var n=w(e,4);y(n,"vkdw-marked"),setTimeout(function(){y(n,"animated")},100)}},mouseenter:function(e){return function(){window.clearTimeout(I),_(e,"tooltipped"),setTimeout(function(){_(e,"animated")},100)}},mouseleave:function(e){return function(){var n=a(e),t=n?2:1,o=b(e,t);C(e,"animated"),C(e,"clicked"),setTimeout(function(){C(e,"tooltipped")},100),I=setTimeout(function(){A(e)&&(T(o),k(e))},600)}}})}function u(e,n,t){var o=function(){D(),S()},a=j("div","vkdw-modal"),r=j("div","bg-overlay",null,o),i=j("div","dialog-overlay"),u=j("header","bg-overlay-header"),d=j("header","bg-overlay-header-logo"),l=j("div","bg-overlay-header-title",n.downloadAlbumButtonCaption),c="\n      "+n.youAboutToDownload+' \n      <span class="vkdw-tracks-number">'+(e||n.aLotOfTracks)+"</span>, \n      "+n.thisCanTakeSomeTime+".<br>\n      "+n.areYouShure+"\n    ",s=j("p","",c),f=j("p","vkdw-submit-wrap"),m=j("button","vkdw-submit flat_button",n.submitButtonLabel,function(){D(),t.length&&(0,h.downloadItemsById)(t)}),v=j("button","vkdw-submit flat_button",n.cancelButtonLabel,o);return a.appendChild(r),u.appendChild(d),u.appendChild(l),i.appendChild(u),i.appendChild(s),f.appendChild(m),f.appendChild(v),i.appendChild(f),a.appendChild(i),a}function d(e,n){if(!N("vkdw-modal")){var t=e.length+" "+L(e.length,n),o=u(t,n,e),a=N("audio_rows_header");O(a,o)}T(N("bg-overlay")),T(N("dialog-overlay"))}function l(e,n,t,o){(0,h.getAlbumById)(e,n).then(function(e){var n=[];e.list.forEach(function(e){n.push(e[1]+"_"+e[0])}),n.length>15?d(n,o):(0,h.downloadItemsById)(n,t)}).catch(function(e){console.error("Cannot fetch album data",e)})}function c(e){return g(E,e.downloadAlbumButtonCaption,{mouseover:function(n){return function(){showTooltip(n,{text:e.downloadAlbumButtonCaption,black:1,shift:[10,6,0],needLeft:1,appendParentCls:"_ui_rmenu_sublist"})}},click:function(n){return function(){var t=w(n,3).href.match(/.+audios(\d+).+album_id=(\d+)/),o=N("audio_album_title",w(n,2)).innerHTML,a=s(t,3),r=a[1],i=a[2];l(r,i,o,e)}}})}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,n){var t=[],o=!0,a=!1,r=void 0;try{for(var i,u=e[Symbol.iterator]();!(o=(i=u.next()).done)&&(t.push(i.value),!n||t.length!==n);o=!0);}catch(e){a=!0,r=e}finally{try{!o&&u.return&&u.return()}finally{if(a)throw r}}return t}return function(n,t){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return e(n,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();n.downloadButton=r,n.markButton=i,n.confirmModal=u,n.albumDownloadButton=c;var f=t(33),m=o(f),v=t(32),p=o(v),h=t(86),_=m.addClassName,g=m.createNode,w=m.getNthParentNode,b=m.getNthSiblingNode,N=m.findNodeWithClass,k=m.hide,C=m.removeClassName,y=m.toggleClassName,A=m.thisNotCurrent,T=m.show,S=m.uncheckMarked,O=m.prepend,L=m.trackEndingsGenerator,E=p.ALBUM_DOWNLOAD_BUTTON_CLASSNAME,B=p.DOWNLOAD_BUTTON_CLASSNAME,M=p.MARK_BUTTON_CLASSNAME,I=void 0,D=function(){k(N("dialog-overlay")),k(N("bg-overlay"))},j=function(e,n,t,o){var a=document.createElement(e);return a.className=n,t&&(a.innerHTML=t),o&&(a.onclick=o),a}},86:function(e,n,t){"use strict";function o(){var e=[],n=document.querySelectorAll(".vkdw-marked");return n.forEach(function(n){e.push(n.dataset.fullId)}),e}function a(e){return new Promise(function(n,t){ajax.post("al_audio.php",{act:"reload_audio",ids:e.join(",")},{onDone:n,onFail:t})})}function r(e,n){return new Promise(function(t,o){ajax.post("al_audio.php",{act:"load_silent",album_id:n,owner_id:e},{onDone:t,onFail:o})})}function i(e,n){for(var t={rawSongUrl:"",songFileName:"",artist:"",trackName:"",albumName:""},o=[];e.length>0;)o.push(e.splice(0,10));n&&(t.albumName=n||""),o.forEach(function(e){a(e).then(function(e){e.forEach(function(e){var n=e[1]+"_"+e[0],o=e[2],a=(0,d.removeRestrictedChars)(e[4].replace(" ","")),r=(0,d.removeRestrictedChars)(e[3]),i=".mp3";t.type="download",t.rawSongUrl=o,t.songFileName=a+" - "+r+i,t.artist=a,t.trackName=r,chrome.runtime.sendMessage(l.bgWorkerExtensionId,t,function(e){"OK"===e.status&&(0,d.uncheckItemById)(n)})})}).catch(function(e){console.error(e)})})}function u(){var e=o();i(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.getAlbumById=r,n.downloadItemsById=i,n.downloadMarked=u;var d=t(33),l=t(32)}});