import{j as e}from"./jsx-runtime-u17CrQMm.js";const l=()=>{const r={type:"object",title:"User Profile",properties:{personalInfo:{type:"object",title:"Personal Information",description:"Basic information about yourself",properties:{firstName:{type:"string",minLength:2,maxLength:50,title:"First Name"},lastName:{type:"string",minLength:2,maxLength:50,title:"Last Name"},email:{type:"string",format:"email",title:"Email Address"},phone:{type:"string",pattern:"^[\\+]?[1-9][\\d]{0,15}$",title:"Phone Number"},birthDate:{type:"string",format:"date",title:"Date of Birth"}},required:["firstName","lastName","email","birthDate"]},address:{type:"object",title:"Address",properties:{street:{type:"string",minLength:5,title:"Street Address"},city:{type:"string",minLength:2,title:"City"},zipCode:{type:"string",pattern:"^[\\d]{5}(-[\\d]{4})?$",title:"ZIP Code"},country:{type:"string",enum:["US","CA","UK","DE","FR"],default:"US",title:"Country"}},required:["street","city","zipCode","country"]},preferences:{type:"object",title:"Preferences",properties:{newsletter:{type:"boolean",default:!1,title:"Newsletter Subscription"},theme:{type:"string",enum:["light","dark","auto"],default:"auto",title:"Theme"}},required:["newsletter","theme"]},skills:{type:"array",title:"Skills",items:{type:"string",minLength:2},minItems:1,maxItems:10,default:[]}},required:["personalInfo","address","preferences","skills"]};return e.jsx("div",{className:"max-w-6xl mx-auto p-6 space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"AJV AutoForm Schema Demo"}),e.jsx("p",{className:"text-gray-600 mb-6",children:"This demonstrates the JSON Schema structure that would be used with the AJV provider for AutoForm."}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsx("div",{className:"space-y-4",children:e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-gray-900 mb-3",children:"📋 Complete JSON Schema"}),e.jsx("pre",{className:"text-xs text-gray-600 overflow-auto max-h-96 bg-white p-3 rounded border",children:JSON.stringify(r,null,2)})]})}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"bg-blue-50 p-4 rounded-lg border border-blue-200",children:[e.jsx("h3",{className:"font-semibold text-blue-900 mb-3",children:"✨ Form Features"}),e.jsxs("ul",{className:"space-y-2 text-sm text-blue-800",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"🔍 Nested Objects:"})," personalInfo, address, preferences"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"📝 String Validation:"})," minLength, maxLength, pattern"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"📧 Format Validation:"})," email, date, phone patterns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"🔢 Array Management:"})," skills with min/max items"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"📋 Enums:"})," country, theme dropdowns"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"✅ Boolean Toggles:"})," newsletter subscription"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"🔒 Required Fields:"})," automatic validation"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"🎯 Default Values:"})," pre-populated fields"]})]})]}),e.jsxs("div",{className:"bg-green-50 p-4 rounded-lg border border-green-200",children:[e.jsx("h3",{className:"font-semibold text-green-900 mb-3",children:"🚀 AJV Integration"}),e.jsxs("div",{className:"text-sm text-green-800 space-y-2",children:[e.jsx("p",{children:e.jsx("strong",{children:"Provider Setup:"})}),e.jsx("code",{className:"block bg-white p-2 rounded text-xs",children:"const provider = new AjvProvider(userProfileSchema);"}),e.jsx("p",{children:e.jsx("strong",{children:"AutoForm Usage:"})}),e.jsxs("code",{className:"block bg-white p-2 rounded text-xs",children:["<AutoForm provider=","{provider}"," onSubmit=","{handleSubmit}"," />"]})]})]}),e.jsxs("div",{className:"bg-purple-50 p-4 rounded-lg border border-purple-200",children:[e.jsx("h3",{className:"font-semibold text-purple-900 mb-3",children:"🎨 Generated Form Fields"}),e.jsxs("ul",{className:"space-y-1 text-sm text-purple-800",children:[e.jsx("li",{children:"• Text inputs with validation"}),e.jsx("li",{children:"• Email input with format checking"}),e.jsx("li",{children:"• Date picker for birthDate"}),e.jsx("li",{children:"• Phone input with pattern validation"}),e.jsx("li",{children:"• Country dropdown from enum"}),e.jsx("li",{children:"• Theme selector (light/dark/auto)"}),e.jsx("li",{children:"• Skills array with add/remove"}),e.jsx("li",{children:"• Checkbox for newsletter"})]})]})]})]}),e.jsxs("div",{className:"mt-8 p-6 bg-yellow-50 border-2 border-yellow-200 border-dashed rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-yellow-800 mb-3",children:"🎯 AutoForm Would Render Here"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"border border-gray-300 rounded p-2 bg-white",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700",children:"First Name *"}),e.jsx("input",{type:"text",placeholder:"Enter first name",className:"w-full mt-1 p-1 text-sm",disabled:!0})]}),e.jsxs("div",{className:"border border-gray-300 rounded p-2 bg-white",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700",children:"Email *"}),e.jsx("input",{type:"email",placeholder:"user@example.com",className:"w-full mt-1 p-1 text-sm",disabled:!0})]}),e.jsxs("div",{className:"border border-gray-300 rounded p-2 bg-white",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700",children:"Country *"}),e.jsx("select",{className:"w-full mt-1 p-1 text-sm",disabled:!0,children:e.jsx("option",{children:"US"})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"border border-gray-300 rounded p-2 bg-white",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700",children:"Last Name *"}),e.jsx("input",{type:"text",placeholder:"Enter last name",className:"w-full mt-1 p-1 text-sm",disabled:!0})]}),e.jsxs("div",{className:"border border-gray-300 rounded p-2 bg-white",children:[e.jsx("label",{className:"text-sm font-medium text-gray-700",children:"Birth Date *"}),e.jsx("input",{type:"date",className:"w-full mt-1 p-1 text-sm",disabled:!0})]}),e.jsx("div",{className:"border border-gray-300 rounded p-2 bg-white",children:e.jsxs("label",{className:"flex items-center text-sm font-medium text-gray-700",children:[e.jsx("input",{type:"checkbox",className:"mr-2",disabled:!0}),"Subscribe to newsletter"]})})]})]}),e.jsx("p",{className:"text-yellow-700 text-sm mt-4 italic",children:"This is a mock preview. The actual AutoForm component would generate all these fields automatically from the JSON schema above."})]}),e.jsxs("div",{className:"mt-8 p-6 bg-gray-800 text-green-400 rounded-lg",children:[e.jsx("h3",{className:"font-semibold mb-3",children:"💻 Code Example"}),e.jsx("pre",{className:"text-sm overflow-auto",children:`import { AutoForm } from "@bwalk/react";
import { AjvProvider } from "@bwalk/ajv";

const provider = new AjvProvider(userProfileSchema);

function MyForm() {
  return (
    <AutoForm 
      provider={provider}
      onSubmit={(data) => console.log(data)}
      withSubmit={true}
    />
  );
}`})]})]})})},i={title:"AJV/Static Schema Demo",component:l,parameters:{layout:"fullscreen"}},t={},s={render:()=>e.jsx("div",{className:"max-w-2xl mx-auto p-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6",children:[e.jsx("h2",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Simple AJV Schema Example"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"JSON Schema"}),e.jsx("pre",{className:"text-xs bg-gray-50 p-3 rounded border overflow-auto",children:`{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "title": "Full Name"
    },
    "email": {
      "type": "string",
      "format": "email",
      "title": "Email"
    },
    "age": {
      "type": "number",
      "minimum": 18,
      "maximum": 120
    }
  },
  "required": ["name", "email", "age"]
}`})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Generated Form"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Full Name *"}),e.jsx("input",{type:"text",className:"w-full border rounded p-2 text-sm",disabled:!0,placeholder:"Enter your name"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Email *"}),e.jsx("input",{type:"email",className:"w-full border rounded p-2 text-sm",disabled:!0,placeholder:"user@example.com"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700",children:"Age *"}),e.jsx("input",{type:"number",className:"w-full border rounded p-2 text-sm",disabled:!0,placeholder:"25"})]}),e.jsx("button",{className:"w-full bg-blue-600 text-white py-2 rounded",disabled:!0,children:"Submit"})]})]})]})]})})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Simple AJV Schema Example</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">JSON Schema</h3>
            <pre className="text-xs bg-gray-50 p-3 rounded border overflow-auto">
            {\`{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 2,
      "title": "Full Name"
    },
    "email": {
      "type": "string",
      "format": "email",
      "title": "Email"
    },
    "age": {
      "type": "number",
      "minimum": 18,
      "maximum": 120
    }
  },
  "required": ["name", "email", "age"]
}\`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Generated Form</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input type="text" className="w-full border rounded p-2 text-sm" disabled placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input type="email" className="w-full border rounded p-2 text-sm" disabled placeholder="user@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age *</label>
                <input type="number" className="w-full border rounded p-2 text-sm" disabled placeholder="25" />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded" disabled>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
}`,...s.parameters?.docs?.source}}};const d=["CompleteSchema","SimpleExample"];export{t as CompleteSchema,s as SimpleExample,d as __namedExportsOrder,i as default};
