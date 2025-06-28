import{u as G,b as H,a as U,c as ee,j as i,d as l}from"./index-CxXKn8Du.js";import{ac as s,r as $,q as O,f as q,aJ as V,aI as N,p as B,e as E,aR as y,al as v,K as I,B as u,N as ie,j as D,ah as A,aZ as te,d as z,C as r,ai as j,l as x,ab as ae,aX as se,y as ne,t as re,a_ as oe,af as le,T as ce,i as de,a$ as fe,_ as pe}from"./antd-mjhx-L7S.js";const{Title:me}=ce,{Option:o}=x,{TextArea:xe}=j,he=l.div`
  min-height: 100vh;
  background-color: ${e=>e.$isDark?"#0f0f0f":"#f5f5f5"};
  padding: 24px;
  transition: background-color 0.2s ease;
`,ue=l.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${e=>e.$isDark?"#1a1a1a":"#ffffff"};
  border-radius: 12px;
  padding: 32px;
  box-shadow: ${e=>e.$isDark?"0 4px 20px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.2)":"0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)"};
  border: ${e=>e.$isDark?"1px solid #2a2a2a":"1px solid #e8e8e8"};
  transition: all 0.2s ease;
`,g=l(de)`
  margin-bottom: 24px;
  border-radius: 12px;
  background-color: ${e=>e.$isDark?"#1e1e1e":"#ffffff"};
  border: ${e=>e.$isDark?"1px solid #2a2a2a":"1px solid #e8e8e8"};
  overflow: hidden;
  transition: all 0.2s ease;
  
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
`,ge=l(I)`
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
    transition: color 0.2s ease;
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
`,be=l(me)`
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
`,$e=l(fe)`
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
`,je=l.div`
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
    transition: all 0.2s ease;
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
      transition: color 0.2s ease;
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
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${e=>e.$isDark?"#2a2a2a":"#e6f7ff"};
      border-color: ${e=>e.$isDark?"#4a9eff":"#1890ff"};
    }
  }
`,ve=l(pe)`
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
`,De=()=>{const{t:e}=G(["entities","common"]),h=H(),{id:k}=U(),{currentTheme:_}=ee(t=>t.theme),a=_==="dark",[n]=s.useForm(),[L,b]=$.useState(!1),[d,S]=$.useState(0),[w,T]=$.useState("ApiOutlined"),f=k?"edit":"create",Q=[{key:"ApiOutlined",icon:i.jsx(O,{})},{key:"DatabaseOutlined",icon:i.jsx(q,{})},{key:"TableOutlined",icon:i.jsx(V,{})},{key:"AppstoreOutlined",icon:i.jsx(E,{})},{key:"CloudServerOutlined",icon:i.jsx(N,{})},{key:"DeploymentUnitOutlined",icon:i.jsx(B,{})},{key:"SettingOutlined",icon:i.jsx(y,{})},{key:"TagsOutlined",icon:i.jsx(le,{})}],C=[{value:"microservice",label:e("entities:types.microservice"),icon:i.jsx(O,{})},{value:"database",label:e("entities:types.database"),icon:i.jsx(q,{})},{value:"table",label:e("entities:types.table"),icon:i.jsx(V,{})},{value:"api",label:e("entities:types.api"),icon:i.jsx(N,{})},{value:"middleware",label:e("entities:types.middleware"),icon:i.jsx(B,{})},{value:"businessSystem",label:e("entities:types.businessSystem"),icon:i.jsx(E,{})},{value:"configuration",label:e("entities:types.configuration"),icon:i.jsx(y,{})}],P=[{value:"user-plane",label:e("planes:userPlane")},{value:"order-plane",label:e("planes:orderPlane")},{value:"payment-plane",label:e("planes:paymentPlane")},{value:"product-plane",label:e("planes:productPlane")},{value:"inventory-plane",label:e("planes:inventoryPlane")}];$.useEffect(()=>{f==="edit"&&k&&J()},[k,f]);const J=async t=>{b(!0);try{await new Promise(p=>setTimeout(p,1e3));const c={name:e("entities:form.entityName"),type:"microservice",plane:"user-plane",description:e("entities:form.descriptionPlaceholder"),icon:"ApiOutlined",tags:[e("common:coreService"),e("common:userManagement")],status:"active",version:"1.2.0",port:8080,healthCheckUrl:"/health",dependencies:[e("common:database"),e("common:redisCache")],attributes:{language:"Java",framework:"Spring Boot",database:"MySQL"}};n.setFieldsValue(c),T(c.icon)}catch{v.error(e("entities:form.loadFailed"))}finally{b(!1)}},K=async t=>{b(!0);try{const c={...t,icon:w};console.log("提交数据:",c),await new Promise(p=>setTimeout(p,1500)),v.success(e(f==="create"?"entities:form.createSuccess":"entities:form.updateSuccess")),h("/entities")}catch{v.error(e(f==="create"?"entities:form.createFailed":"entities:form.updateFailed"))}finally{b(!1)}},W=()=>{h("/entities")},R=[{title:e("entities:form.basicInfo"),description:e("entities:form.basicInfoDesc")},{title:e("entities:form.configInfo"),description:e("entities:form.configInfoDesc")},{title:e("entities:form.confirmSubmit"),description:e("entities:form.confirmSubmitDesc")}],X=()=>i.jsx(g,{$isDark:a,title:e("entities:form.basicInfo"),extra:i.jsx(ae,{}),children:i.jsx(M,{$isDark:a,children:i.jsxs(z,{gutter:24,children:[i.jsx(r,{xs:24,md:12,children:i.jsx(s.Item,{name:"name",label:e("entities:form.entityName"),rules:[{required:!0,message:e("entities:form.entityNameRequired")},{max:50,message:e("entities:form.entityNameMaxLength")}],children:i.jsx(j,{placeholder:e("entities:form.entityNamePlaceholder")})})}),i.jsx(r,{xs:24,md:12,children:i.jsx(s.Item,{name:"type",label:e("entities:form.entityType"),rules:[{required:!0,message:e("entities:form.entityTypeRequired")}],children:i.jsx(x,{placeholder:e("entities:form.entityTypeRequired"),children:C.map(t=>i.jsx(o,{value:t.value,children:i.jsxs(D,{children:[t.icon,t.label]})},t.value))})})}),i.jsx(r,{xs:24,md:12,children:i.jsx(s.Item,{name:"plane",label:e("entities:form.belongsToPlane"),rules:[{required:!0,message:e("entities:form.planeRequired")}],children:i.jsx(x,{placeholder:e("entities:form.planeRequired"),children:P.map(t=>i.jsx(o,{value:t.value,children:t.label},t.value))})})}),i.jsx(r,{xs:24,md:12,children:i.jsx(s.Item,{name:"status",label:e("common:status"),initialValue:"active",children:i.jsxs(x,{children:[i.jsx(o,{value:"active",children:e("common:active")}),i.jsx(o,{value:"inactive",children:e("common:inactive")}),i.jsx(o,{value:"deprecated",children:e("common:deprecated")})]})})}),i.jsx(r,{xs:24,children:i.jsx(s.Item,{name:"description",label:e("common:description"),rules:[{required:!0,message:e("entities:form.descriptionRequired")},{max:500,message:e("entities:form.descriptionMaxLength")}],children:i.jsx(xe,{rows:4,placeholder:e("entities:form.descriptionPlaceholder")})})}),i.jsx(r,{xs:24,children:i.jsx(s.Item,{label:e("entities:form.iconSelection"),children:i.jsx(ke,{$isDark:a,children:Q.map(t=>i.jsx("div",{className:`icon-option ${w===t.key?"selected":""}`,onClick:()=>T(t.key),children:t.icon},t.key))})})})]})})}),Y=()=>i.jsx(g,{$isDark:a,title:e("entities:form.configInfo"),extra:i.jsx(y,{}),children:i.jsx(M,{$isDark:a,children:i.jsxs(z,{gutter:24,children:[i.jsx(r,{xs:24,md:12,children:i.jsx(s.Item,{name:"version",label:e("entities:form.version"),children:i.jsx(j,{placeholder:e("entities:form.versionPlaceholder")})})}),i.jsx(r,{xs:24,md:12,children:i.jsx(s.Item,{name:"port",label:e("entities:form.port"),children:i.jsx(se,{placeholder:e("entities:form.portPlaceholder"),min:1,max:65535,style:{width:"100%"}})})}),i.jsx(r,{xs:24,md:12,children:i.jsx(s.Item,{name:"healthCheckUrl",label:e("entities:form.healthCheckUrl"),children:i.jsx(j,{placeholder:e("entities:form.healthCheckUrlPlaceholder")})})}),i.jsx(r,{xs:24,md:12,children:i.jsx(s.Item,{name:"tags",label:e("entities:form.tags"),children:i.jsxs(x,{mode:"tags",placeholder:e("entities:form.tagsPlaceholder"),style:{width:"100%"},children:[i.jsx(o,{value:e("common:coreService"),children:e("common:coreService")}),i.jsx(o,{value:e("common:basicService"),children:e("common:basicService")}),i.jsx(o,{value:e("common:businessService"),children:e("common:businessService")})]})})}),i.jsx(r,{xs:24,children:i.jsx(s.Item,{name:"dependencies",label:e("entities:form.dependencies"),children:i.jsxs(x,{mode:"tags",placeholder:e("entities:form.dependenciesPlaceholder"),style:{width:"100%"},children:[i.jsx(o,{value:e("common:database"),children:e("common:database")}),i.jsx(o,{value:e("common:redisCache"),children:e("common:redisCache")}),i.jsx(o,{value:e("common:messageQueue"),children:e("common:messageQueue")})]})})})]})})}),Z=()=>{var t,c,p,F;return i.jsxs(g,{$isDark:a,title:e("entities:form.confirmSubmit"),extra:i.jsx(oe,{}),children:[i.jsx(ve,{$isDark:a,message:e("entities:form.confirmInfoMessage"),type:"info",showIcon:!0}),i.jsx(ne,{items:[{key:"basic",label:e("entities:form.basicInfo"),children:i.jsxs("div",{style:{padding:"16px 0"},children:[i.jsxs("p",{children:[i.jsxs("strong",{children:[e("entities:form.entityName"),"："]}),n.getFieldValue("name")]}),i.jsxs("p",{children:[i.jsxs("strong",{children:[e("entities:form.entityType"),"："]}),(t=C.find(m=>m.value===n.getFieldValue("type")))==null?void 0:t.label]}),i.jsxs("p",{children:[i.jsxs("strong",{children:[e("entities:form.belongsToPlane"),"："]}),(c=P.find(m=>m.value===n.getFieldValue("plane")))==null?void 0:c.label]}),i.jsxs("p",{children:[i.jsxs("strong",{children:[e("common:status"),"："]}),n.getFieldValue("status")]}),i.jsxs("p",{children:[i.jsxs("strong",{children:[e("common:description"),"："]}),n.getFieldValue("description")]})]})},{key:"config",label:e("entities:form.configInfo"),children:i.jsxs("div",{style:{padding:"16px 0"},children:[i.jsxs("p",{children:[i.jsxs("strong",{children:[e("entities:form.version"),"："]}),n.getFieldValue("version")||e("entities:form.notSet")]}),i.jsxs("p",{children:[i.jsxs("strong",{children:[e("entities:form.port"),"："]}),n.getFieldValue("port")||e("entities:form.notSet")]}),i.jsxs("p",{children:[i.jsxs("strong",{children:[e("entities:form.healthCheckUrl"),"："]}),n.getFieldValue("healthCheckUrl")||e("entities:form.notSet")]}),i.jsxs("p",{children:[i.jsxs("strong",{children:[e("entities:form.tags"),"："]}),i.jsx(ye,{$isDark:a,children:((p=n.getFieldValue("tags"))==null?void 0:p.map(m=>i.jsx(re,{children:m},m)))||e("entities:form.none")})]}),i.jsxs("p",{children:[i.jsxs("strong",{children:[e("entities:form.dependencies"),"："]}),((F=n.getFieldValue("dependencies"))==null?void 0:F.join(", "))||e("entities:form.none")]})]})}]})]})};return i.jsx(he,{$isDark:a,children:i.jsxs(ue,{$isDark:a,children:[i.jsxs(ge,{$isDark:a,children:[i.jsx(I.Item,{children:i.jsx(u,{type:"text",icon:i.jsx(ie,{}),onClick:()=>h("/entities"),children:e("menu:entities")})}),i.jsx(I.Item,{children:i.jsxs(D,{children:[i.jsx(A,{}),e(f==="create"?"entities:createTitle":"entities:editTitle")]})})]}),i.jsx(be,{$isDark:a,level:2,children:i.jsxs(D,{children:[i.jsx(A,{}),e(f==="create"?"entities:createTitle":"entities:editTitle")]})}),i.jsx(g,{$isDark:a,children:i.jsx($e,{$isDark:a,current:d,items:R})}),i.jsxs(s,{form:n,layout:"vertical",onFinish:K,initialValues:{status:"active"},children:[d===0&&X(),d===1&&Y(),d===2&&Z(),i.jsx(g,{$isDark:a,children:i.jsxs(je,{children:[i.jsx("div",{className:"left-buttons",children:d>0&&i.jsx(u,{onClick:()=>S(d-1),children:e("entities:form.previousStep")})}),i.jsxs("div",{className:"right-buttons",children:[i.jsx(u,{onClick:W,children:e("common:cancel")}),d<R.length-1?i.jsx(u,{type:"primary",onClick:()=>S(d+1),children:e("entities:form.nextStep")}):i.jsx(u,{type:"primary",htmlType:"submit",loading:L,icon:i.jsx(te,{}),children:e(f==="create"?"entities:form.createEntity":"entities:form.updateEntity")})]})]})})]})]})})},Ie=()=>{const{id:e}=U(),h=e?"edit":"create";return i.jsx(De,{mode:h})},Te=Object.freeze(Object.defineProperty({__proto__:null,default:Ie},Symbol.toStringTag,{value:"Module"}));export{De as E,Ie as a,Te as b};
