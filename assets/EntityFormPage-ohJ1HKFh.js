import{u as X,b as Z,a as U,c as ee,j as t,d as l}from"./index-Ds4hQBUW.js";import{a9 as s,r as j,q as O,f as q,aO as V,aP as B,p as N,e as E,aI as y,ai as v,J as S,B as u,K as te,j as D,ae as A,aQ as ie,d as z,C as r,af as $,l as x,a6 as ae,aR as se,y as ne,t as re,aS as oe,ac as le,T as ce,i as de,aT as fe,a7 as me}from"./antd-Beg1odhe.js";const{Title:pe}=ce,{Option:o}=x,{TextArea:xe}=$,he=l.div`
  min-height: 100vh;
  background-color: ${e=>e.$isDark?"#000000":"#f5f5f5"};
  padding: 24px;
`,ue=l.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`,g=l(de)`
  margin-bottom: 24px;
  border-radius: 12px;
  background-color: ${e=>e.$isDark?"#1e1e1e":"#ffffff"};
  border: ${e=>e.$isDark?"1px solid #2a2a2a":"1px solid #e8e8e8"};
  overflow: hidden;
  
  &:hover {
    box-shadow: ${e=>e.$isDark?"0 2px 12px rgba(0, 0, 0, 0.3)":"0 2px 12px rgba(0, 0, 0, 0.06)"};
  }
  
  .ant-card-head {
    background-color: ${e=>e.$isDark?"#232323":"#fafafa"};
    border-bottom: ${e=>e.$isDark?"1px solid #2a2a2a":"1px solid #f0f0f0"};
    padding: 16px 24px;
  }
  
  .ant-card-head-title {
    color: ${e=>e.$isDark?"#ffffff":"#1a1a1a"};
    font-weight: 600;
    font-size: 16px;
  }
  
  .ant-card-extra {
    color: ${e=>e.$isDark?"#4a9eff":"#1890ff"};
  }
  
  .ant-card-body {
    background-color: ${e=>e.$isDark?"#1e1e1e":"#ffffff"};
    padding: 24px;
  }
`,ge=l(S)`
  margin-bottom: 24px;
  
  /* 强制所有面包屑项目垂直居中对齐 */
  .ant-breadcrumb {
    display: flex;
    align-items: center;
    line-height: 1;
  }
  
  .ant-breadcrumb ol {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  .ant-breadcrumb li {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
  }
  
  .ant-breadcrumb-link {
    color: ${e=>e.$isDark?"#e0e0e0":"#666666"};
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
    
    &:hover {
      color: ${e=>e.$isDark?"#4a9eff":"#1890ff"};
    }
  }
  
  .ant-breadcrumb-separator {
    color: ${e=>e.$isDark?"#a0a0a0":"#999999"};
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
    margin: 0 8px;
  }
  
  /* Button组件样式 - 确保与其他元素高度一致 */
  .ant-btn {
    color: ${e=>e.$isDark?"#e0e0e0":"#666666"};
    border: none;
    background: transparent;
    padding: 0 8px;
    height: 32px;
    min-height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &:hover, &:focus {
      color: ${e=>e.$isDark?"#4a9eff":"#1890ff"};
      background-color: ${e=>e.$isDark?"rgba(74, 158, 255, 0.1)":"rgba(24, 144, 255, 0.06)"};
      border-color: transparent;
      box-shadow: none;
    }
    
    /* Button内部元素对齐 */
    .anticon {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 1;
    }
    
    span {
      display: flex;
      align-items: center;
      line-height: 1;
    }
  }
  
  /* Space组件样式 - 确保与Button高度一致 */
  .ant-space {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    line-height: 32px;
  }
  
  .ant-space-item {
    display: flex;
    align-items: center;
    height: 32px;
    line-height: 32px;
  }
  
  /* 图标统一样式 */
  .anticon {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 1;
    height: 14px;
  }
  
  /* 文字统一样式 */
  span:not(.anticon) {
    display: flex;
    align-items: center;
    line-height: 1;
    height: auto;
  }
`,be=l(pe)`
  &.ant-typography {
    color: ${e=>e.$isDark?"#ffffff":"#1a1a1a"} !important;
    margin-bottom: 32px !important;
    font-weight: 700 !important;
    font-size: 28px !important;
    line-height: 1.2 !important;
  }
  
  .anticon {
    color: ${e=>e.$isDark?"#4a9eff":"#1890ff"};
    margin-right: 12px;
  }
`,je=l(fe)`
  .ant-steps-item-title {
    color: ${e=>e.$isDark?"#ffffff":"#1a1a1a"} !important;
    font-weight: 600 !important;
  }
  
  .ant-steps-item-description {
    color: ${e=>e.$isDark?"#a0a0a0":"#666666"} !important;
  }
  
  .ant-steps-item-wait {
    .ant-steps-item-icon {
      background-color: ${e=>e.$isDark?"#2a2a2a":"#f5f5f5"};
      border-color: ${e=>e.$isDark?"#3a3a3a":"#d9d9d9"};
    }
    
    .ant-steps-icon {
      color: ${e=>e.$isDark?"#6a6a6a":"#999999"};
    }
  }
  
  .ant-steps-item-process {
    .ant-steps-item-icon {
      background-color: #4a9eff;
      border-color: #4a9eff;
    }
  }
  
  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background-color: ${e=>e.$isDark?"#1e4d3a":"#f6ffed"};
      border-color: #52c41a;
    }
    
    .ant-steps-icon {
      color: #52c41a;
    }
  }
`,$e=l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  
  .left-buttons {
    display: flex;
    gap: 12px;
  }
  
  .right-buttons {
    display: flex;
    gap: 12px;
  }
`,ke=l.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 12px;
  margin-top: 16px;
  
  .icon-option {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 2px solid ${e=>e.$isDark?"#2a2a2a":"#e8e8e8"};
    border-radius: 12px;
    cursor: pointer;
    background-color: ${e=>e.$isDark?"#232323":"#fafafa"};
    position: relative;
    
    &:hover {
      border-color: ${e=>e.$isDark?"#4a9eff":"#1890ff"};
      background-color: ${e=>e.$isDark?"rgba(74, 158, 255, 0.1)":"rgba(24, 144, 255, 0.06)"};
      transform: translateY(-2px);
      box-shadow: ${e=>e.$isDark?"0 4px 12px rgba(74, 158, 255, 0.2)":"0 4px 12px rgba(24, 144, 255, 0.15)"};
    }
    
    &.selected {
      border-color: #4a9eff;
      background-color: ${e=>e.$isDark?"rgba(74, 158, 255, 0.15)":"rgba(24, 144, 255, 0.08)"};
      box-shadow: ${e=>e.$isDark?"0 0 0 3px rgba(74, 158, 255, 0.2)":"0 0 0 3px rgba(24, 144, 255, 0.1)"};
    }
    
    .anticon {
      font-size: 28px;
      color: ${e=>e.$isDark?"#ffffff":"#1a1a1a"};
    }
  }
`,ye=l.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  
  .ant-tag {
    background-color: ${e=>e.$isDark?"#232323":"#f5f5f5"};
    border: ${e=>e.$isDark?"1px solid #3a3a3a":"1px solid #d9d9d9"};
    color: ${e=>e.$isDark?"#e0e0e0":"#333333"};
    border-radius: 6px;
    padding: 4px 12px;
    font-size: 13px;
    
    &:hover {
      background-color: ${e=>e.$isDark?"#2a2a2a":"#e6f7ff"};
      border-color: ${e=>e.$isDark?"#4a9eff":"#1890ff"};
    }
  }
`,ve=l(me)`
  &.ant-alert {
    background-color: ${e=>e.$isDark?"rgba(74, 158, 255, 0.1)":"#e6f7ff"};
    border: ${e=>e.$isDark?"1px solid rgba(74, 158, 255, 0.3)":"1px solid #91d5ff"};
    border-radius: 8px;
    margin-bottom: 24px;
  }
  
  .ant-alert-message {
    color: ${e=>e.$isDark?"#ffffff":"#1a1a1a"};
    font-weight: 500;
  }
  
  .ant-alert-description {
    color: ${e=>e.$isDark?"#e0e0e0":"#666666"};
  }
  
  .ant-alert-icon {
    color: ${e=>e.$isDark?"#4a9eff":"#1890ff"};
  }
`,M=l.div`
  .ant-form-item-label > label {
    color: ${e=>e.$isDark?"#ffffff":"#1a1a1a"};
    font-weight: 500;
    font-size: 14px;
  }
  
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    color: #ff4d4f;
  }
  
  .ant-input,
  .ant-input-number,
  .ant-select-selector,
  .ant-input-affix-wrapper {
    background-color: ${e=>e.$isDark?"#232323":"#ffffff"};
    border-color: ${e=>e.$isDark?"#3a3a3a":"#d9d9d9"};
    color: ${e=>e.$isDark?"#ffffff":"#1a1a1a"};
    
    &:hover {
      border-color: ${e=>e.$isDark?"#4a9eff":"#40a9ff"};
    }
    
    &:focus,
    &.ant-input-focused,
    &.ant-select-focused .ant-select-selector {
      border-color: #4a9eff;
      box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
    }
  }
  
  .ant-input::placeholder,
  .ant-input-number-input::placeholder {
    color: ${e=>e.$isDark?"#6a6a6a":"#bfbfbf"};
  }
  
  .ant-select-arrow {
    color: ${e=>e.$isDark?"#a0a0a0":"#999999"};
  }
  
  .ant-form-item-explain-error {
    color: #ff7875;
  }
`,De=()=>{const{t:e}=X(["entities","common"]),h=Z(),{id:k}=U(),{currentTheme:L}=ee(i=>i.theme),a=L==="dark",[n]=s.useForm(),[Q,b]=j.useState(!1),[d,I]=j.useState(0),[w,T]=j.useState("ApiOutlined"),f=k?"edit":"create",_=[{key:"ApiOutlined",icon:t.jsx(O,{})},{key:"DatabaseOutlined",icon:t.jsx(q,{})},{key:"TableOutlined",icon:t.jsx(V,{})},{key:"AppstoreOutlined",icon:t.jsx(E,{})},{key:"CloudServerOutlined",icon:t.jsx(B,{})},{key:"DeploymentUnitOutlined",icon:t.jsx(N,{})},{key:"SettingOutlined",icon:t.jsx(y,{})},{key:"TagsOutlined",icon:t.jsx(le,{})}],C=[{value:"microservice",label:e("entities:types.microservice"),icon:t.jsx(O,{})},{value:"database",label:e("entities:types.database"),icon:t.jsx(q,{})},{value:"table",label:e("entities:types.table"),icon:t.jsx(V,{})},{value:"api",label:e("entities:types.api"),icon:t.jsx(B,{})},{value:"middleware",label:e("entities:types.middleware"),icon:t.jsx(N,{})},{value:"businessSystem",label:e("entities:types.businessSystem"),icon:t.jsx(E,{})},{value:"configuration",label:e("entities:types.configuration"),icon:t.jsx(y,{})}],P=[{value:"user-plane",label:e("planes:userPlane")},{value:"order-plane",label:e("planes:orderPlane")},{value:"payment-plane",label:e("planes:paymentPlane")},{value:"product-plane",label:e("planes:productPlane")},{value:"inventory-plane",label:e("planes:inventoryPlane")}];j.useEffect(()=>{f==="edit"&&k&&J()},[k,f]);const J=async i=>{b(!0);try{await new Promise(m=>setTimeout(m,1e3));const c={name:e("entities:form.entityName"),type:"microservice",plane:"user-plane",description:e("entities:form.descriptionPlaceholder"),icon:"ApiOutlined",tags:[e("common:coreService"),e("common:userManagement")],status:"active",version:"1.2.0",port:8080,healthCheckUrl:"/health",dependencies:[e("common:database"),e("common:redisCache")],attributes:{language:"Java",framework:"Spring Boot",database:"MySQL"}};n.setFieldsValue(c),T(c.icon)}catch{v.error(e("entities:form.loadFailed"))}finally{b(!1)}},K=async i=>{b(!0);try{const c={...i,icon:w};console.log("提交数据:",c),await new Promise(m=>setTimeout(m,1500)),v.success(e(f==="create"?"entities:form.createSuccess":"entities:form.updateSuccess")),h("/entities")}catch{v.error(e(f==="create"?"entities:form.createFailed":"entities:form.updateFailed"))}finally{b(!1)}},W=()=>{h("/entities")},R=[{title:e("entities:form.basicInfo"),description:e("entities:form.basicInfoDesc")},{title:e("entities:form.configInfo"),description:e("entities:form.configInfoDesc")},{title:e("entities:form.confirmSubmit"),description:e("entities:form.confirmSubmitDesc")}],Y=()=>t.jsx(g,{$isDark:a,title:e("entities:form.basicInfo"),extra:t.jsx(ae,{}),children:t.jsx(M,{$isDark:a,children:t.jsxs(z,{gutter:24,children:[t.jsx(r,{xs:24,md:12,children:t.jsx(s.Item,{name:"name",label:e("entities:form.entityName"),rules:[{required:!0,message:e("entities:form.entityNameRequired")},{max:50,message:e("entities:form.entityNameMaxLength")}],children:t.jsx($,{placeholder:e("entities:form.entityNamePlaceholder")})})}),t.jsx(r,{xs:24,md:12,children:t.jsx(s.Item,{name:"type",label:e("entities:form.entityType"),rules:[{required:!0,message:e("entities:form.entityTypeRequired")}],children:t.jsx(x,{placeholder:e("entities:form.entityTypeRequired"),children:C.map(i=>t.jsx(o,{value:i.value,children:t.jsxs(D,{children:[i.icon,i.label]})},i.value))})})}),t.jsx(r,{xs:24,md:12,children:t.jsx(s.Item,{name:"plane",label:e("entities:form.belongsToPlane"),rules:[{required:!0,message:e("entities:form.planeRequired")}],children:t.jsx(x,{placeholder:e("entities:form.planeRequired"),children:P.map(i=>t.jsx(o,{value:i.value,children:i.label},i.value))})})}),t.jsx(r,{xs:24,md:12,children:t.jsx(s.Item,{name:"status",label:e("common:status"),initialValue:"active",children:t.jsxs(x,{children:[t.jsx(o,{value:"active",children:e("common:active")}),t.jsx(o,{value:"inactive",children:e("common:inactive")}),t.jsx(o,{value:"deprecated",children:e("common:deprecated")})]})})}),t.jsx(r,{xs:24,children:t.jsx(s.Item,{name:"description",label:e("common:description"),rules:[{required:!0,message:e("entities:form.descriptionRequired")},{max:500,message:e("entities:form.descriptionMaxLength")}],children:t.jsx(xe,{rows:4,placeholder:e("entities:form.descriptionPlaceholder")})})}),t.jsx(r,{xs:24,children:t.jsx(s.Item,{label:e("entities:form.iconSelection"),children:t.jsx(ke,{$isDark:a,children:_.map(i=>t.jsx("div",{className:`icon-option ${w===i.key?"selected":""}`,onClick:()=>T(i.key),children:i.icon},i.key))})})})]})})}),G=()=>t.jsx(g,{$isDark:a,title:e("entities:form.configInfo"),extra:t.jsx(y,{}),children:t.jsx(M,{$isDark:a,children:t.jsxs(z,{gutter:24,children:[t.jsx(r,{xs:24,md:12,children:t.jsx(s.Item,{name:"version",label:e("entities:form.version"),children:t.jsx($,{placeholder:e("entities:form.versionPlaceholder")})})}),t.jsx(r,{xs:24,md:12,children:t.jsx(s.Item,{name:"port",label:e("entities:form.port"),children:t.jsx(se,{placeholder:e("entities:form.portPlaceholder"),min:1,max:65535,style:{width:"100%"}})})}),t.jsx(r,{xs:24,md:12,children:t.jsx(s.Item,{name:"healthCheckUrl",label:e("entities:form.healthCheckUrl"),children:t.jsx($,{placeholder:e("entities:form.healthCheckUrlPlaceholder")})})}),t.jsx(r,{xs:24,md:12,children:t.jsx(s.Item,{name:"tags",label:e("entities:form.tags"),children:t.jsxs(x,{mode:"tags",placeholder:e("entities:form.tagsPlaceholder"),style:{width:"100%"},children:[t.jsx(o,{value:e("common:coreService"),children:e("common:coreService")}),t.jsx(o,{value:e("common:basicService"),children:e("common:basicService")}),t.jsx(o,{value:e("common:businessService"),children:e("common:businessService")})]})})}),t.jsx(r,{xs:24,children:t.jsx(s.Item,{name:"dependencies",label:e("entities:form.dependencies"),children:t.jsxs(x,{mode:"tags",placeholder:e("entities:form.dependenciesPlaceholder"),style:{width:"100%"},children:[t.jsx(o,{value:e("common:database"),children:e("common:database")}),t.jsx(o,{value:e("common:redisCache"),children:e("common:redisCache")}),t.jsx(o,{value:e("common:messageQueue"),children:e("common:messageQueue")})]})})})]})})}),H=()=>{var i,c,m,F;return t.jsxs(g,{$isDark:a,title:e("entities:form.confirmSubmit"),extra:t.jsx(oe,{}),children:[t.jsx(ve,{$isDark:a,message:e("entities:form.confirmInfoMessage"),type:"info",showIcon:!0}),t.jsx(ne,{items:[{key:"basic",label:e("entities:form.basicInfo"),children:t.jsxs("div",{style:{padding:"16px 0"},children:[t.jsxs("p",{children:[t.jsxs("strong",{children:[e("entities:form.entityName"),"："]}),n.getFieldValue("name")]}),t.jsxs("p",{children:[t.jsxs("strong",{children:[e("entities:form.entityType"),"："]}),(i=C.find(p=>p.value===n.getFieldValue("type")))==null?void 0:i.label]}),t.jsxs("p",{children:[t.jsxs("strong",{children:[e("entities:form.belongsToPlane"),"："]}),(c=P.find(p=>p.value===n.getFieldValue("plane")))==null?void 0:c.label]}),t.jsxs("p",{children:[t.jsxs("strong",{children:[e("common:status"),"："]}),n.getFieldValue("status")]}),t.jsxs("p",{children:[t.jsxs("strong",{children:[e("common:description"),"："]}),n.getFieldValue("description")]})]})},{key:"config",label:e("entities:form.configInfo"),children:t.jsxs("div",{style:{padding:"16px 0"},children:[t.jsxs("p",{children:[t.jsxs("strong",{children:[e("entities:form.version"),"："]}),n.getFieldValue("version")||e("entities:form.notSet")]}),t.jsxs("p",{children:[t.jsxs("strong",{children:[e("entities:form.port"),"："]}),n.getFieldValue("port")||e("entities:form.notSet")]}),t.jsxs("p",{children:[t.jsxs("strong",{children:[e("entities:form.healthCheckUrl"),"："]}),n.getFieldValue("healthCheckUrl")||e("entities:form.notSet")]}),t.jsxs("p",{children:[t.jsxs("strong",{children:[e("entities:form.tags"),"："]}),t.jsx(ye,{$isDark:a,children:((m=n.getFieldValue("tags"))==null?void 0:m.map(p=>t.jsx(re,{children:p},p)))||e("entities:form.none")})]}),t.jsxs("p",{children:[t.jsxs("strong",{children:[e("entities:form.dependencies"),"："]}),((F=n.getFieldValue("dependencies"))==null?void 0:F.join(", "))||e("entities:form.none")]})]})}]})]})};return t.jsx(he,{$isDark:a,children:t.jsxs(ue,{$isDark:a,children:[t.jsxs(ge,{$isDark:a,children:[t.jsx(S.Item,{children:t.jsx(u,{type:"text",icon:t.jsx(te,{}),onClick:()=>h("/entities"),children:e("menu:entities")})}),t.jsx(S.Item,{children:t.jsxs(D,{children:[t.jsx(A,{}),e(f==="create"?"entities:createTitle":"entities:editTitle")]})})]}),t.jsx(be,{$isDark:a,level:2,children:t.jsxs(D,{children:[t.jsx(A,{}),e(f==="create"?"entities:createTitle":"entities:editTitle")]})}),t.jsx(g,{$isDark:a,children:t.jsx(je,{$isDark:a,current:d,items:R})}),t.jsxs(s,{form:n,layout:"vertical",onFinish:K,initialValues:{status:"active"},children:[d===0&&Y(),d===1&&G(),d===2&&H(),t.jsx(g,{$isDark:a,children:t.jsxs($e,{children:[t.jsx("div",{className:"left-buttons",children:d>0&&t.jsx(u,{onClick:()=>I(d-1),children:e("entities:form.previousStep")})}),t.jsxs("div",{className:"right-buttons",children:[t.jsx(u,{onClick:W,children:e("common:cancel")}),d<R.length-1?t.jsx(u,{type:"primary",onClick:()=>I(d+1),children:e("entities:form.nextStep")}):t.jsx(u,{type:"primary",htmlType:"submit",loading:Q,icon:t.jsx(ie,{}),children:e(f==="create"?"entities:form.createEntity":"entities:form.updateEntity")})]})]})})]})]})})},Se=()=>{const{id:e}=U(),h=e?"edit":"create";return t.jsx(De,{mode:h})},Te=Object.freeze(Object.defineProperty({__proto__:null,default:Se},Symbol.toStringTag,{value:"Module"}));export{De as E,Se as a,Te as b};
