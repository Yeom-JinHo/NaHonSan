(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[285],{20601:function(e,t,n){"use strict";n(72791);t.Z=n.p+"static/media/noimg.2c17e3ab129feea1ae1b9707c7fb1580.svg"},11093:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var i=n(72791),r=n(80184);function a(e){var t=e.imgfile,n=e.newImgfile,a=e.imgW,c=e.imgH,s=(0,i.useRef)(null),o=new Image,l=URL.createObjectURL(t);return o.src=l,o.onload=function(){var e=s.current,t=null===e||void 0===e?void 0:e.getContext("2d");if(t&&e){e.width=a,e.height=c,t.fillStyle="white",t.fillRect(0,0,a,c),t.drawImage(o,0,0,a,c);var i=e.toDataURL("image/jpeg");n(i),URL.revokeObjectURL(l)}},(0,r.jsx)("div",{id:"resizer",children:(0,r.jsx)("canvas",{ref:s,children:" "})})}var c=i.memo(a)},52619:function(e,t,n){"use strict";n.d(t,{Z:function(){return x}});var i=n(88214),r=n(42982),a=n(15861),c=n(70885),s=n(72791),o=n(66770),l=n.n(o),u=(n(86009),function(e){for(var t=atob(e.split(",")[1]),n=e.split(",")[0].split(":")[1].split(";")[0],i=new ArrayBuffer(t.length),r=new Uint8Array(i),a=0;a<t.length;a+=1)r[a]=t.charCodeAt(a);return new Blob([i],{type:n})}),d=n(62902),f=n(74912),p=n.n(f);p().config.update({region:"ap-northeast-2",accessKeyId:{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_AWS_ACCESS_KEY,secretAccessKey:{NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_AWS_SECRET_KEY});var g=function(e){return new(p().S3.ManagedUpload)({params:{Bucket:"gwangjubob",Key:"".concat((0,d.Z)(),".png"),Body:e}}).promise().then((function(e){return e.Location}))},m=function(e){var t=e.split("amazonaws.com/").pop();(new(p().S3)).deleteObject({Bucket:"gwangjubob",Key:t})},v=n(80184);function h(e){var t=e.editorValue,n=e.getValue,o=e.update,f=(0,s.useState)(""),p=(0,c.Z)(f,2),h=p[0],x=p[1],j=(0,s.useState)([""]),b=(0,c.Z)(j,2),w=b[0],S=b[1],Z=(0,s.useRef)(null),R={toolbar:{container:[["image"],[{color:[]},{background:[]}]]}};(0,s.useEffect)((function(){Z.current&&Z.current.getEditor().getModule("toolbar").addHandler("image",(function(){var e=document.createElement("input");e.setAttribute("type","file"),e.setAttribute("accept","image/*"),e.click(),e.onchange=(0,a.Z)((0,i.Z)().mark((function t(){var n,c,s,o,l,f;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.files&&(n=Z.current,c=n.getEditor().getSelection(!0),s=e.files[0],o=new Image,l=URL.createObjectURL(s),o.src=l,f=document.createElement("canvas"),o.onload=(0,a.Z)((0,i.Z)().mark((function e(){var t,a,s,p;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=f.getContext("2d"),f.width=400,f.height=400,null===t||void 0===t||t.drawImage(o,0,0,400,400),a=f.toDataURL("image/jpeg"),URL.revokeObjectURL(l),s=new File([u(a)],(0,d.Z)()),e.next=9,g(s);case 9:p=e.sent,S((function(e){return[].concat((0,r.Z)(e),[p])})),n.getEditor().insertEmbed(c.index,"image",p),n.getEditor().setSelection(c.index+1);case 13:case"end":return e.stop()}}),e)}))));case 1:case"end":return t.stop()}}),t)})))}))}),[]),(0,s.useEffect)((function(){if(o){x(o);var e=Z.current,t=e.getEditor().clipboard.convert(o);e.getEditor().setContents(t,"silent")}}),[o]);n&&(w.shift(),w.forEach(function(){var e=(0,a.Z)((0,i.Z)().mark((function e(t){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h.includes(t)){e.next=3;break}return e.next=3,m(t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t(h));return(0,v.jsx)("div",{id:"editor",children:(0,v.jsx)("div",{className:"editor",onPaste:function(e){return function(e){e.preventDefault(),alert("\ubcf5\uc0ac \ubd99\uc5ec\ub123\uae30\ub294 \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.")}(e)},children:(0,v.jsx)(l(),{theme:"snow",defaultValue:h,modules:R,formats:["header","background","color","image","width"],ref:Z,onChange:x})})})}var x=s.memo(h)},25490:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var i=n(88214),r=n(15861),a=n(70885),c=n(72791),s=n(16871),o=n(52619),l=n(20601),u=n(73414),d=n(63748),f=n(4377),p=n(11093),g=n(97198),m=n(29586),v=n(34108),h=n(6183),x=n(80184);var j=function(){var e=(0,c.useState)(null),t=(0,a.Z)(e,2),n=t[0],j=t[1],b=(0,c.useState)(""),w=(0,a.Z)(b,2),S=w[0],Z=w[1],R=(0,c.useState)("tip"),E=(0,a.Z)(R,2),C=E[0],N=E[1],_=(0,c.useState)(""),y=(0,a.Z)(_,2),k=y[0],A=y[1],O=(0,c.useState)(!1),T=(0,a.Z)(O,2),L=T[0],U=T[1],K=(0,c.useState)(!1),D=(0,a.Z)(K,2),I=D[0],P=D[1],W=(0,c.useRef)(null),H=(0,c.useRef)(null),B=(0,s.s0)(),V=(0,c.useCallback)((function(e){Z(e)}),[]),F=function(e){N(e)},M=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(t){var n,r,a;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={category:C,title:null===(n=H.current)||void 0===n?void 0:n.value,content:t,bannerImg:S.replace("data:image/jpeg;base64,","")},e.next=3,(0,m.AA)(r);case 3:500===(a=e.sent).status&&(alert("\uae00\uc774 \ub108\ubb34 \uae38\uc5b4\uc694 \u3160\u3160"),P(!1),B("/tip")),B("/tip/detail/".concat(a));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,x.jsxs)("div",{id:"tip-edit",children:[(0,x.jsx)("input",{type:"file",accept:"image/*",ref:W,onChange:function(){var e;if(null!==(e=W.current)&&void 0!==e&&e.files){var t=W.current.files[0];t&&(0,g.Z)(t)&&j(t)}}}),n?(0,x.jsx)(p.Z,{imgfile:n,newImgfile:V,imgW:400,imgH:400}):null,(0,x.jsxs)("div",{className:"tip-header ",children:[(0,x.jsx)("div",{className:"tip-header-title notoBold flex",children:(0,x.jsxs)("p",{children:[(0,x.jsx)("span",{children:"\uafc0"}),"\ud301",(0,x.jsx)("span",{children:" \uc4f0"}),"\uae30"]})}),(0,x.jsxs)("div",{className:"tip-header-category flex",children:[(0,x.jsx)("p",{className:"category-label notoMid",children:"Category"}),(0,x.jsxs)("button",{type:"button",onClick:function(){return F("recipe")},className:"notoReg ".concat("recipe"===C?"active":null),children:[(0,x.jsx)("img",{src:u.Z,alt:"\uafc0\uc2dc\ud53c",title:"\uafc0\uc2dc\ud53c"}),(0,x.jsx)("p",{className:"notoReg",children:"\uafc0\uc2dc\ud53c"})]}),(0,x.jsxs)("button",{type:"button",onClick:function(){return F("tip")},className:"notoReg ".concat("tip"===C?"active":null),children:[(0,x.jsx)("img",{src:f.Z,alt:"\uafc0\uc0dd",title:"\uafc0\uc0dd"}),(0,x.jsx)("p",{className:"notoReg",children:"\uafc0\uc0dd"})]}),(0,x.jsxs)("button",{type:"button",onClick:function(){return F("item")},className:"notoReg ".concat("item"===C?"active":null),children:[(0,x.jsx)("img",{src:d.Z,alt:"\uafc0\ud15c",title:"\uafc0\ud15c"}),(0,x.jsx)("p",{className:"notoReg",children:"\uafc0\ud15c"})]})]}),(0,x.jsxs)("div",{className:"tip-header-preview flex justify-center",children:[(0,x.jsx)("button",{onClick:function(){Z("")},type:"button",className:"tip-close ".concat(!S&&"hide"),children:(0,x.jsx)("img",{src:h.Z,alt:"close"})}),(0,x.jsxs)("button",{onClick:function(){var e;null===(e=W.current)||void 0===e||e.click()},type:"button",className:"tip-header-preview_container flex column justify-center align-center",children:[(0,x.jsx)("p",{className:"tip-header-preview_container-title notoMid",children:"Thumnail"}),(0,x.jsx)("div",{className:"tip-header-preview_img flex justify-center align-center",children:S?(0,x.jsx)("img",{className:"tip-header-preview_img-img",src:S,alt:"preview"}):(0,x.jsx)("img",{className:"tip-header-preview_img-img",src:l.Z,alt:"no-img",title:"preview"})}),(0,x.jsx)("span",{className:"notoReg",children:"jpg, png, gif, jpeg \ud30c\uc77c\ub9cc \uc9c0\uc6d0\ud574\uc694."})]})]})]}),(0,x.jsxs)("div",{className:"tip-content flex column align-center",children:[(0,x.jsx)("p",{className:"notoMid",children:"Content"}),(0,x.jsx)("input",{ref:H,className:"tip-title",type:"text",placeholder:"\uc81c\ubaa9\uc740 30\uc790\uae4c\uc9c0 \uc785\ub825\ud560 \uc218 \uc788\uc5b4\uc694."}),k?(0,x.jsx)("span",{className:"notoReg fs-16",children:k}):null,(0,x.jsx)(o.Z,{editorValue:M,getValue:L,update:""})]}),I?(0,x.jsx)("div",{className:"send flex",children:(0,x.jsx)("img",{src:v.Z,className:"loading-spinner",alt:"\ub85c\ub529\uc2a4\ud53c\ub108"})}):(0,x.jsxs)("div",{className:"send flex notoReg",children:[(0,x.jsx)("button",{type:"button",onClick:function(){var e,t,n;return null!==(e=H.current)&&void 0!==e&&e.value?H.current.value.length>30?(A("\uc81c\ubaa9\uc740 30\uc790\uae4c\uc9c0\uc5d0\uc694."),void(null===(n=H.current)||void 0===n||n.focus())):(P(!0),void U(!0)):(A("\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694."),void(null===(t=H.current)||void 0===t||t.focus()))},children:"\uc791\uc131"}),(0,x.jsx)("button",{className:"cancle",type:"button",onClick:function(){B("/tip")},children:"\ucde8\uc18c"})]})]})}},97198:function(e,t){"use strict";t.Z=function(e){var t=e.name.substring(e.name.lastIndexOf(".")+1,e.name.length).toLowerCase();return"jpg"===t||"png"===t||"gif"===t||"jpeg"===t||(alert("\uc9c0\uc6d0\ud558\uc9c0 \uc54a\ub294 \ud655\uc7a5\uc790\uc5d0\uc694!"),!1)}},28022:function(){}}]);
//# sourceMappingURL=285.ae2a296f.chunk.js.map