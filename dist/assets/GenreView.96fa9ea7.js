import{b as r,u as a,q as i,e,o,c as m,g as c,t as l,f as u,w as d,T as p,i as _,l as f,m as g,L as y}from"./index.a6dbf243.js";const V=r({__name:"GenreView",setup(k){const t=a().params.id,n=a().params.type,s=i();return s.getItemsByGenre(t,n),console.log("123"),(B,h)=>e(f)().isLoading?_("",!0):(o(),m("div",{key:e(t)},[c("h2",null,l(this.$route.params.name),1),u(p,{name:"fade",mode:"out-in"},{default:d(()=>[(o(),g(y,{items:e(s).genresList,key:e(t)},null,8,["items"]))]),_:1})]))}});export{V as default};