import{_ as q}from"../chunks/preload-helper.a4192956.js";import{S as A,i as L,s as g,a as E,e as p,J as B,h as r,c as P,b as m,H as c,o as C,k as _,q as u,l as d,m as h,r as b,G as w,u as y}from"../chunks/index.ab206ff1.js";const D=""+new URL("../assets/demo.318703a3.wasm",import.meta.url).href;function v(i){let o,s,e,t,l;return{c(){o=_("h1"),s=u(i[0]),e=E(),t=_("span"),l=u(i[1])},l(a){o=d(a,"H1",{});var n=h(o);s=b(n,i[0]),n.forEach(r),e=P(a),t=d(a,"SPAN",{});var f=h(t);l=b(f,i[1]),f.forEach(r)},m(a,n){m(a,o,n),w(o,s),m(a,e,n),m(a,t,n),w(t,l)},p(a,n){n&1&&y(s,a[0]),n&2&&y(l,a[1])},d(a){a&&r(o),a&&r(e),a&&r(t)}}}function H(i){let o,s,e=i[0]&&v(i);return{c(){o=E(),e&&e.c(),s=p(),this.h()},l(t){B("svelte-1e4eiqo",document.head).forEach(r),o=P(t),e&&e.l(t),s=p(),this.h()},h(){document.title="Rollup Plugin WIT Demo"},m(t,l){m(t,o,l),e&&e.m(t,l),m(t,s,l)},p(t,[l]){t[0]?e?e.p(t,l):(e=v(t),e.c(),e.m(s.parentNode,s)):e&&(e.d(1),e=null)},i:c,o:c,d(t){t&&r(o),e&&e.d(t),t&&r(s)}}}function I(i,o,s){let e="Standby, generating your bundle...",t="Also...";return C(async()=>{let l=`export function prnt(string) {
      console.log('from importables func: ', string);
    };`;const{load:a}=await q(()=>import("../chunks/index.b826fb93.js"),["../chunks/index.b826fb93.js","../chunks/preload-helper.a4192956.js"],import.meta.url);let n=await fetch(D).then(R=>R.arrayBuffer()),f=[{"component:cargo-comp/imports":l}],{hello:S,named:k}=await a(n,f);s(0,e=S("World")),console.log({whatSayYou:e}),s(1,t=k.name())}),[e,t]}class U extends A{constructor(o){super(),L(this,o,I,H,g,{})}}export{U as component};