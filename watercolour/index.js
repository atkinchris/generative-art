!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./",n(n.s=38)}({38:function(e,t){const n=document.querySelector(".container");new p5(e=>{const t=(t,n)=>t.map(t=>((t,n)=>({x:e.randomGaussian(t.x,t.z*n),y:e.randomGaussian(t.y,t.z*n),z:t.z}))(t,n)),n=(t,n=1)=>{const r=[];for(let o=0;o<n;o+=1)for(let n=0;n<t.length;n+=1){const o=t[n],a=t[(n+1)%t.length],u={x:(o.x+a.x)/2,y:(o.y+a.y)/2,z:(o.z+a.z)/2*.55*e.random(.5,2.5)};r.push(o),r.push(u)}return r},r=t=>{e.beginShape(),t.forEach(t=>e.vertex(t.x,t.y)),e.endShape(e.CLOSE)},o=(o,a,u)=>{let l=((t,n,r,o)=>{const a=[],u=e.TWO_PI/o;for(let o=0;o<e.TWO_PI;o+=u)a.push({x:t+Math.cos(o)*r,y:n+Math.sin(o)*r,z:e.random(-1,1)});return a})(0,0,e.randomGaussian(o,o/10),10);const c=e.color(u);c.setAlpha(.04),e.fill(c),e.translate(e.width/2,e.height/2),e.translate(a.x,a.y);for(let e=0;e<3;e+=1)l=n(l),l=t(l,5);for(let e=0;e<30;e+=1){let e=l;for(let n=0;n<5;n+=1)e=t(e,8);r(e)}e.resetMatrix()};e.setup=()=>{e.createCanvas(400,400),e.noStroke(),e.colorMode(e.HSB),e.blendMode(e.MULTIPLY),e.noLoop()},e.draw=()=>{o(100,{x:-40,y:0},"#E0F9B5"),o(100,{x:40,y:0},"#A5DEE5")}},n)}});