import{d as S,l as h,a as b,k as B,b as I,u as f,e as t,o as i,c as a,f as $,w as v,g as e,t as o,h as r,i as m,F as c,r as d,j as k,m as x,p as C,n as R,_ as V}from"./index.6f5bbb8f.js";const L=S({id:"inner",state:()=>({item:{}}),actions:{async setInfo(_,p){try{h().getStatus(!0);const u=await b.get(`https://api.themoviedb.org/3/${p}/${_}?api_key=${B}&language=en-US`);this.item=u.data}catch(u){console.log(u)}finally{h().getStatus(!1)}}}}),l=_=>(C("data-v-7f3b032c"),_=_(),R(),_),N={key:0},F=r("Back"),G={class:"wrap"},O={class:"img"},j=["src"],D={class:"info"},E=["href"],H=l(()=>e("span",null,"Status:",-1)),T={key:0},U=l(()=>e("span",null,"Budget:",-1)),q=l(()=>e("span",null,"Rating:",-1)),z={class:"genres"},A=l(()=>e("li",null,"Genres:",-1)),J=l(()=>e("li",null,"Countries:",-1)),K=l(()=>e("li",null,"Companies:",-1)),M={key:1},P=l(()=>e("span",null,"Revenue:",-1)),Q=l(()=>e("span",null,"Running time:",-1)),W=l(()=>e("li",null,"Original language:",-1)),X=l(()=>e("span",null,"Release date:",-1)),Y=l(()=>e("h3",null,"Overview",-1)),Z=I({__name:"InnerView",setup(_){const p=String(f().params.id),u=String(f().params.type),n=L();return n.setInfo(p,u),(ee,g)=>{const y=k("ButtonBordered"),w=k("RouterLink");return t(h)().isLoading?m("",!0):(i(),a("div",N,[$(y,{class:"btn-back",onClick:g[0]||(g[0]=s=>this.$router.back())},{default:v(()=>[F]),_:1}),e("div",G,[e("div",O,[e("img",{src:"https://www.themoviedb.org/t/p/w300_and_h450_face"+t(n).item.poster_path,alt:""},null,8,j)]),e("div",D,[e("h2",null,o(t(n).item.original_title||t(n).item.original_name),1),e("p",null,o(t(n).item.tagline),1),e("a",{href:t(n).item.homepage,target:"_blank"},"Go to Homepage",8,E),e("p",null,[H,r(" "+o(t(n).item.status),1)]),t(n).item.budget?(i(),a("p",T,[U,r(" "+o(t(n).item.budget),1)])):m("",!0),e("p",null,[q,r(" "+o(t(n).item.vote_average),1)]),e("ul",z,[A,(i(!0),a(c,null,d(t(n).item.genres,s=>(i(),a("li",null,[(i(),x(w,{to:{path:`/genre/${s.id}-${s.name}/${t(u)}`},key:s.id},{default:v(()=>[r(o(s.name),1)]),_:2},1032,["to"]))]))),256))]),e("ul",null,[J,(i(!0),a(c,null,d(t(n).item.production_countries,s=>(i(),a("li",{key:s.id},o(s.name),1))),128))]),e("ul",null,[K,(i(!0),a(c,null,d(t(n).item.production_companies,s=>(i(),a("li",{key:s.id},o(s.name),1))),128))]),t(n).item.revenue?(i(),a("p",M,[P,r(" "+o(t(n).item.revenue),1)])):m("",!0),e("p",null,[Q,r(" ~ "+o(t(n).item.runtime||t(n).item.episode_run_time[0])+" min.",1)]),e("ul",null,[W,(i(!0),a(c,null,d(t(n).item.spoken_languages,s=>(i(),a("li",{key:s.iso_639_1},o(s.name),1))),128))]),e("p",null,[X,r(" "+o(t(n).item.release_date||t(n).item.first_air_date),1)])]),e("div",null,[Y,e("p",null,o(t(n).item.overview),1)])])]))}}});const ne=V(Z,[["__scopeId","data-v-7f3b032c"]]);export{ne as default};