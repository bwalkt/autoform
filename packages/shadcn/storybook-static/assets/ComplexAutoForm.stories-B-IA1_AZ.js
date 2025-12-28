import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as l}from"./iframe-CfnUtPH_.js";import"./preload-helper-PPVm8Dsz.js";const p=({children:t,onSubmit:r,...d})=>e.jsxs("div",{className:"p-4 border-2 border-dashed border-gray-300 rounded-lg",children:[e.jsx("p",{className:"text-sm text-gray-500 mb-4",children:"📋 This would be the AutoForm component with AJV provider"}),e.jsxs("div",{className:"bg-yellow-50 p-4 rounded border border-yellow-200",children:[e.jsx("h3",{className:"font-semibold text-yellow-800 mb-2",children:"AutoForm Placeholder"}),e.jsxs("p",{className:"text-yellow-700 text-sm",children:["The actual AutoForm would render here with:",e.jsx("br",{}),"• Dynamic fields based on JSON Schema",e.jsx("br",{}),"• Real-time validation",e.jsx("br",{}),"• Complex nested objects and arrays"]}),e.jsx("button",{className:"mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",onClick:()=>r&&r({mockData:"This would be real form data"}),children:"Simulate Submit"})]})]}),b={type:"object",properties:{personalInfo:{type:"object",title:"Personal Information",description:"Basic information about yourself",properties:{firstName:{type:"string",minLength:2,maxLength:50,description:"Your first name",title:"First Name"},lastName:{type:"string",minLength:2,maxLength:50,description:"Your last name",title:"Last Name"},email:{type:"string",format:"email",description:"Your email address",title:"Email Address"},phone:{type:"string",pattern:"^[\\+]?[1-9][\\d]{0,15}$",description:"Your phone number (optional)",title:"Phone Number"},birthDate:{type:"string",format:"date",description:"Your date of birth",title:"Date of Birth"}},required:["firstName","lastName","email","birthDate"]},address:{type:"object",title:"Address",description:"Your current address",properties:{street:{type:"string",minLength:5,description:"Street address",title:"Street Address"},city:{type:"string",minLength:2,description:"City name",title:"City"},state:{type:"string",minLength:2,description:"State or province",title:"State/Province"},zipCode:{type:"string",pattern:"^[\\d]{5}(-[\\d]{4})?$",description:"ZIP or postal code",title:"ZIP Code"},country:{type:"string",enum:["US","CA","UK","DE","FR","AU","JP"],default:"US",description:"Country",title:"Country"}},required:["street","city","state","zipCode","country"]},preferences:{type:"object",title:"Preferences",description:"Your app preferences",properties:{newsletter:{type:"boolean",default:!1,description:"Subscribe to newsletter",title:"Newsletter Subscription"},notifications:{type:"boolean",default:!0,description:"Enable notifications",title:"Enable Notifications"},theme:{type:"string",enum:["light","dark","auto"],default:"auto",description:"UI theme preference",title:"Theme"},language:{type:"string",enum:["en","es","fr","de","zh","ja"],default:"en",description:"Preferred language",title:"Language"}},required:["newsletter","notifications","theme","language"]},skills:{type:"array",title:"Skills",description:"List your technical skills",items:{type:"string",minLength:2},minItems:1,maxItems:10,uniqueItems:!0,default:[]},experience:{type:"object",title:"Professional Experience",description:"Your work experience",properties:{yearsOfExperience:{type:"number",minimum:0,maximum:50,default:0,description:"Years of professional experience",title:"Years of Experience"},currentRole:{type:"string",minLength:2,description:"Your current job title",title:"Current Role"},company:{type:"string",description:"Current company (optional)",title:"Company"},salary:{type:"number",minimum:0,maximum:1e6,description:"Annual salary (optional)",title:"Salary"}},required:["yearsOfExperience","currentRole"]},projects:{type:"array",title:"Projects",description:"Notable projects you've worked on",items:{type:"object",properties:{name:{type:"string",minLength:2,description:"Project name",title:"Project Name"},description:{type:"string",minLength:10,description:"Project description",title:"Description"},technologies:{type:"array",items:{type:"string"},minItems:1,description:"Technologies used",title:"Technologies"},completed:{type:"boolean",default:!1,description:"Is the project completed?",title:"Completed"}},required:["name","description","technologies","completed"]},default:[]}},required:["personalInfo","address","preferences","skills","experience"]},u=()=>{const[t,r]=l.useState(null),[d,m]=l.useState(!1),[c,h]=l.useState([]),x=async n=>{m(!0),h([]),await new Promise(o=>setTimeout(o,2e3)),r(n),m(!1),alert("Form submitted successfully!")},g={};return e.jsxs("div",{className:"max-w-4xl mx-auto p-6 space-y-6",children:[e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"User Profile Form"}),e.jsx("p",{className:"text-gray-600 mb-6",children:"Complete your profile with personal information, preferences, and experience."}),c.length>0&&e.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-md p-4 mb-6",children:[e.jsx("h3",{className:"font-semibold text-red-900 mb-2",children:"Validation Errors:"}),e.jsx("ul",{className:"list-disc list-inside text-red-800 text-sm space-y-1",children:c.map((n,o)=>e.jsx("li",{children:n},o))})]}),e.jsx(p,{onSubmit:x,defaultValues:g,withSubmit:!0,formProps:{className:"space-y-8"}}),d&&e.jsx("div",{className:"mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md",children:e.jsx("p",{className:"text-blue-800 font-medium",children:"🔄 Submitting form..."})}),t&&e.jsxs("div",{className:"mt-8 p-6 bg-green-50 border border-green-200 rounded-md",children:[e.jsx("h3",{className:"font-semibold text-green-900 mb-3",children:"✅ Form Submitted Successfully!"}),e.jsx("pre",{className:"text-sm text-green-800 overflow-auto max-h-64",children:JSON.stringify(t,null,2)})]})]}),e.jsxs("div",{className:"bg-gray-50 rounded-lg p-6",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Form Features"}),e.jsxs("ul",{className:"space-y-2 text-gray-700",children:[e.jsx("li",{children:"✅ Nested object validation (personalInfo, address, experience)"}),e.jsx("li",{children:"✅ Array validation with dynamic items (skills, projects)"}),e.jsx("li",{children:"✅ Email and phone format validation"}),e.jsx("li",{children:"✅ Date validation for birthDate"}),e.jsx("li",{children:"✅ Enum validation for dropdowns (country, theme, language)"}),e.jsx("li",{children:"✅ Number range validation (salary, experience years)"}),e.jsx("li",{children:"✅ String length and pattern validation"}),e.jsx("li",{children:"✅ Complex nested array objects (projects)"}),e.jsx("li",{children:"✅ Boolean toggles with defaults"}),e.jsx("li",{children:"✅ Required field validation"})]})]})]})},N={title:"AJV/Complex AutoForm",component:u,parameters:{layout:"fullscreen",docs:{description:{component:"A comprehensive example showing complex forms with nested objects, arrays, validation, and the AJV provider."}}}},s={render:()=>e.jsx(u,{})},i={render:()=>e.jsx("div",{className:"max-w-4xl mx-auto p-6 space-y-6",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-lg p-6",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:"JSON Schema Documentation"}),e.jsx("p",{className:"text-gray-600 mb-6",children:"This shows the complete JSON Schema structure for a complex user profile form."}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-gray-900 mb-2",children:"Schema Structure"}),e.jsx("pre",{className:"text-xs text-gray-600 overflow-auto max-h-64",children:JSON.stringify(b,null,2)})]}),e.jsxs("div",{className:"bg-blue-50 p-4 rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-blue-900 mb-3",children:"Form Features"}),e.jsxs("ul",{className:"space-y-1 text-sm text-blue-800",children:[e.jsx("li",{children:"✅ Nested objects (personalInfo, address)"}),e.jsx("li",{children:"✅ Arrays with validation (skills)"}),e.jsx("li",{children:"✅ Complex nested arrays (projects)"}),e.jsx("li",{children:"✅ Email & phone format validation"}),e.jsx("li",{children:"✅ Date validation"}),e.jsx("li",{children:"✅ Enum dropdowns"}),e.jsx("li",{children:"✅ Number range validation"}),e.jsx("li",{children:"✅ String length validation"}),e.jsx("li",{children:"✅ Boolean toggles"}),e.jsx("li",{children:"✅ Required field validation"})]})]})]}),e.jsxs("div",{className:"mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg",children:[e.jsx("h3",{className:"font-semibold text-gray-700 mb-2",children:"🎯 AutoForm Integration"}),e.jsxs("p",{className:"text-gray-600 text-sm",children:["This schema would be used with: ",e.jsx("code",{className:"bg-gray-100 px-2 py-1 rounded",children:"new AjvProvider(userProfileSchema)"}),e.jsx("br",{}),"The AutoForm component would automatically generate form fields, validation, and UI based on this schema."]})]})]})})},a={render:()=>e.jsxs("div",{className:"max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Simple Form Example"}),e.jsx(p,{onSubmit:t=>{console.log("Simple form submitted:",t),alert("Form submitted! Check console.")},withSubmit:!0,formProps:{className:"space-y-4"}}),e.jsxs("div",{className:"mt-4 text-sm text-gray-600",children:[e.jsx("strong",{children:"Schema would include:"}),e.jsx("pre",{className:"mt-2 p-2 bg-gray-50 rounded text-xs",children:`{
  name: string (min 2 chars)
  email: string (email format)  
  age: number (18-120)
  skills: string[] (default: ["JavaScript", "React"])
}`})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <ComplexAutoFormDemo />
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">JSON Schema Documentation</h1>
        <p className="text-gray-600 mb-6">
          This shows the complete JSON Schema structure for a complex user profile form.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Schema Structure</h3>
            <pre className="text-xs text-gray-600 overflow-auto max-h-64">
              {JSON.stringify(userProfileSchema, null, 2)}
            </pre>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">Form Features</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>✅ Nested objects (personalInfo, address)</li>
              <li>✅ Arrays with validation (skills)</li>
              <li>✅ Complex nested arrays (projects)</li>
              <li>✅ Email & phone format validation</li>
              <li>✅ Date validation</li>
              <li>✅ Enum dropdowns</li>
              <li>✅ Number range validation</li>
              <li>✅ String length validation</li>
              <li>✅ Boolean toggles</li>
              <li>✅ Required field validation</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">🎯 AutoForm Integration</h3>
          <p className="text-gray-600 text-sm">
            This schema would be used with: <code className="bg-gray-100 px-2 py-1 rounded">new AjvProvider(userProfileSchema)</code>
            <br />
            The AutoForm component would automatically generate form fields, validation, and UI based on this schema.
          </p>
        </div>
      </div>
    </div>
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // const provider = new AjvProvider(simpleSchema);

    return <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Simple Form Example</h2>
        <MockAutoForm onSubmit={values => {
        console.log("Simple form submitted:", values);
        alert("Form submitted! Check console.");
      }} withSubmit={true} formProps={{
        className: "space-y-4"
      }} />
        <div className="mt-4 text-sm text-gray-600">
          <strong>Schema would include:</strong>
          <pre className="mt-2 p-2 bg-gray-50 rounded text-xs">
          {\`{
  name: string (min 2 chars)
  email: string (email format)  
  age: number (18-120)
  skills: string[] (default: ["JavaScript", "React"])
}\`}
          </pre>
        </div>
      </div>;
  }
}`,...a.parameters?.docs?.source}}};const v=["FullUserProfile","SchemaDemo","SimpleForm"];export{s as FullUserProfile,i as SchemaDemo,a as SimpleForm,v as __namedExportsOrder,N as default};
