import{j as u}from"./jsx-runtime-u17CrQMm.js";const p=({primary:s=!1,size:o="medium",label:n,...l})=>{const c=s?"bg-blue-600 text-white border-blue-600":"bg-transparent text-gray-700 border-gray-300",m={small:"px-3 py-1 text-sm",medium:"px-4 py-2 text-base",large:"px-6 py-3 text-lg"}[o];return u.jsx("button",{type:"button",className:`border-2 rounded cursor-pointer ${c} ${m}`,...l,children:n})},i={title:"Example/Button",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{onClick:{action:"clicked"}}},e={args:{primary:!0,label:"Button"}},r={args:{label:"Button"}},a={args:{size:"large",label:"Button"}},t={args:{size:"small",label:"Button"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    primary: true,
    label: "Button"
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Button"
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    size: "large",
    label: "Button"
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    size: "small",
    label: "Button"
  }
}`,...t.parameters?.docs?.source}}};const g=["Primary","Secondary","Large","Small"];export{a as Large,e as Primary,r as Secondary,t as Small,g as __namedExportsOrder,i as default};
