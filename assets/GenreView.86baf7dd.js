import{b as d,z as _,r as y,g as t,o,c as i,i as c,t as f,f as l,L as k,n as v,u as L,l as B,A as S,B as h}from"./index.08614031.js";const G={key:0},C=d({__name:"GenreView",setup(N){const m=S(),a=L(),s=Number(a.params.id),u=String(a.params.type),p=String(a.params.name),r=Number(a.query.page),e=_();r||(e.page=1,e.getItemsByGenre(s,u)),r&&s!==e.currentGenre&&e.pageLoad(r,s,u);const n=y(!1),g=()=>{n.value=!0,setTimeout(()=>{e.getMore(),m.push({query:{page:e.page}})},200),setTimeout(()=>{n.value=!1},600)};return(V,b)=>t(B)().isLoading?v("",!0):(o(),i("div",{key:t(s)},[c("h2",null,f(t(p)),1),(o(),l(k,{items:t(e).genresList,key:t(s)},null,8,["items"])),c("div",{class:"load-more",onClick:g},[n.value?(o(),l(h,{key:1})):(o(),i("span",G,"Load more"))])]))}});export{C as default};
