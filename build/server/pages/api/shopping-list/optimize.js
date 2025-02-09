"use strict";(()=>{var e={};e.id=2,e.ids=[2],e.modules={5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7984:e=>{e.exports=import("openai")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,i){return i in t?t[i]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,i)):"function"==typeof t&&"default"===i?t:void 0}}})},4901:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.r(t),i.d(t,{config:()=>d,default:()=>p,routeModule:()=>c});var r=i(9947),o=i(2706),s=i(6762),a=i(2137),u=e([a]);a=(u.then?(await u)():u)[0];let p=(0,s.M)(a,"default"),d=(0,s.M)(a,"config"),c=new r.PagesAPIRouteModule({definition:{kind:o.A.PAGES_API,page:"/api/shopping-list/optimize",pathname:"/api/shopping-list/optimize",bundlePath:"",filename:""},userland:a});n()}catch(e){n(e)}})},2137:(e,t,i)=>{i.a(e,async(e,n)=>{try{i.r(t),i.d(t,{default:()=>s});var r=i(7984),o=e([r]);let a=new(r=(o.then?(await o)():o)[0]).default({apiKey:process.env.OPENAI_API_KEY});async function s(e,t){if("POST"!==e.method)return t.status(405).json({message:"Method Not Allowed"});let{items:i}=e.body,n=`You are an AI assistant helping users with grocery shopping. Optimize this list by merging duplicate ingredients and suggesting substitutions when needed: ${JSON.stringify(i)}`;try{let e=await a.completions.create({model:"text-davinci-003",prompt:n,max_tokens:150});t.status(200).json({optimizedList:e.choices[0].text})}catch(e){console.error("OpenAI API error:",e),t.status(500).json({error:"Failed to optimize shopping list"})}}n()}catch(e){n(e)}})},2706:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return i}});var i=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,t,i)=>{e.exports=i(5600)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var i=t(t.s=4901);module.exports=i})();