"use strict";(()=>{var e={};e.id=853,e.ids=[853],e.modules={5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6762:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},6503:(e,t,r)=>{r.r(t),r.d(t,{config:()=>d,default:()=>u,routeModule:()=>p});var n={};r.r(n),r.d(n,{default:()=>a});var o=r(9947),i=r(2706),s=r(6762);async function a(e,t){if("POST"!==e.method)return t.status(405).json({message:"Method Not Allowed"});let{items:r,service:n}=e.body;if(!r||0===r.length)return t.status(400).json({message:"Shopping list is empty"});try{let e;if("instacart"===n)e=await fetch("https://api.instacart.com/v2/orders",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.INSTACART_API_KEY}`},body:JSON.stringify({items:r})});else{if("amazon"!==n)return t.status(400).json({message:"Invalid service provider"});e=await fetch("https://api.amazon.com/fresh/orders",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.AMAZON_FRESH_API_KEY}`},body:JSON.stringify({items:r})})}let o=await e.json();t.status(200).json({orderUrl:o.checkout_url})}catch(e){t.status(500).json({error:"Failed to process order"})}}let u=(0,s.M)(n,"default"),d=(0,s.M)(n,"config"),p=new o.PagesAPIRouteModule({definition:{kind:i.A.PAGES_API,page:"/api/shopping-list/order",pathname:"/api/shopping-list/order",bundlePath:"",filename:""},userland:n})},2706:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},9947:(e,t,r)=>{e.exports=r(5600)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=6503);module.exports=r})();