(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[619],{234:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/upload",function(){return a(6397)}])},6397:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r});var u=a(4848),n=a(6540);function r(){let[e,t]=(0,n.useState)(""),[a,r]=(0,n.useState)(null),[l,s]=(0,n.useState)(""),[p,i]=(0,n.useState)(""),o=async t=>{t.preventDefault(),(await fetch("/api/recipes/upload",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e,ingredients:l,steps:p})})).ok&&alert("Recipe uploaded!")};return(0,u.jsxs)("form",{onSubmit:o,className:"p-4 space-y-4",children:[(0,u.jsx)("input",{type:"text",placeholder:"Recipe Title",value:e,onChange:e=>t(e.target.value),required:!0}),(0,u.jsx)("textarea",{placeholder:"Ingredients",value:l,onChange:e=>s(e.target.value),required:!0}),(0,u.jsx)("textarea",{placeholder:"Steps",value:p,onChange:e=>i(e.target.value),required:!0}),(0,u.jsx)("button",{type:"submit",children:"Upload Recipe"})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[636,593,792],()=>t(234)),_N_E=e.O()}]);