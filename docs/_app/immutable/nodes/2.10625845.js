import{_ as u}from"../chunks/preload-helper.a4192956.js";import{S as h,i as b,s as y,a as w,e as r,J as g,h as l,c as v,b as i,H as m,o as k,k as E,q as P,l as R,m as S,r as $,G as q,u as L}from"../chunks/index.ab206ff1.js";const B=""+new URL("../assets/demo.8f5808a3.wasm",import.meta.url).href;function c(n){let o,a;return{c(){o=E("h1"),a=P(n[0])},l(e){o=R(e,"H1",{});var t=S(o);a=$(t,n[0]),t.forEach(l)},m(e,t){i(e,o,t),q(o,a)},p(e,t){t&1&&L(a,e[0])},d(e){e&&l(o)}}}function C(n){let o,a,e=n[0]&&c(n);return{c(){o=w(),e&&e.c(),a=r(),this.h()},l(t){g("svelte-1e4eiqo",document.head).forEach(l),o=v(t),e&&e.l(t),a=r(),this.h()},h(){document.title="Rollup Plugin WIT Demo"},m(t,s){i(t,o,s),e&&e.m(t,s),i(t,a,s)},p(t,[s]){t[0]?e?e.p(t,s):(e=c(t),e.c(),e.m(a.parentNode,a)):e&&(e.d(1),e=null)},i:m,o:m,d(t){t&&l(o),e&&e.d(t),t&&l(a)}}}function D(n,o,a){let e="Standby, generating your bundle...";return k(async()=>{let t=`export const prnt = function (string) {
      console.log('from importables func: ', string);
    };`;const{load:s}=await u(()=>import("../chunks/index.a50a6ba8.js"),["../chunks/index.a50a6ba8.js","../chunks/preload-helper.a4192956.js"],import.meta.url);let f=await fetch(B).then(_=>_.arrayBuffer()),p=[{"component:cargo-comp/imports":t}],{hello:d}=await s(f,p);a(0,e=d("World")),console.log({whatSayYou:e})}),[e]}class T extends h{constructor(o){super(),b(this,o,D,C,y,{})}}export{T as component};
