import{u as K,b as W,a as X,j as e,d as x}from"./index-BoaK5Cbd.js";import{ab as s,r as f,s as $,f as V,aD as q,aE as B,q as D,e as E,aF as v,ak as I,N as S,B as h,O as Y,ag as N,T as Z,k,aG as _,aH as ee,d as U,C as r,ah as j,m,aa as te,aI as ie,Q as se,z as ne,aJ as re,ae,j as le}from"./antd-CAFIM9ev.js";const{Title:oe}=Z,{Option:a}=m,{TextArea:ce}=j,de=x.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  .ant-breadcrumb {
    display: flex;
    align-items: center;
    line-height: 1;
    
    .ant-breadcrumb-link {
      display: flex;
      align-items: center;
      line-height: 1;
    }
    
    .ant-breadcrumb-separator {
      display: flex;
      align-items: center;
      line-height: 1;
      margin: 0 8px;
    }
  }
`,me=x.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`,xe=x.div`
  max-width: 1200px;
  margin: 0 auto;
`,u=x(le)`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`,he=x.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,ue=x.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid ${t=>t.selected?"#1890ff":"#d9d9d9"};
  border-radius: 6px;
  cursor: pointer;
  background: ${t=>t.selected?"#e6f7ff":"#fff"};
  transition: all 0.3s;

  &:hover {
    border-color: #1890ff;
    background: #e6f7ff;
  }

  .anticon {
    font-size: 18px;
    color: ${t=>t.selected?"#1890ff":"#666"};
  }
`,je=()=>{const{t}=K(["entities","common"]),g=W(),{id:y}=X(),[n]=s.useForm(),[A,p]=f.useState(!1),[o,C]=f.useState(0),[T,R]=f.useState("ApiOutlined"),c=y?"edit":"create",M=[{key:"ApiOutlined",icon:e.jsx($,{})},{key:"DatabaseOutlined",icon:e.jsx(V,{})},{key:"TableOutlined",icon:e.jsx(q,{})},{key:"AppstoreOutlined",icon:e.jsx(E,{})},{key:"CloudServerOutlined",icon:e.jsx(B,{})},{key:"DeploymentUnitOutlined",icon:e.jsx(D,{})},{key:"SettingOutlined",icon:e.jsx(v,{})},{key:"TagsOutlined",icon:e.jsx(ae,{})}],F=[{value:"microservice",label:t("entities:types.microservice"),icon:e.jsx($,{})},{value:"database",label:t("entities:types.database"),icon:e.jsx(V,{})},{value:"table",label:t("entities:types.table"),icon:e.jsx(q,{})},{value:"api",label:t("entities:types.api"),icon:e.jsx(B,{})},{value:"middleware",label:t("entities:types.middleware"),icon:e.jsx(D,{})},{value:"businessSystem",label:t("entities:types.businessSystem"),icon:e.jsx(E,{})},{value:"configuration",label:t("entities:types.configuration"),icon:e.jsx(v,{})}],w=[{value:"user-plane",label:t("planes:userPlane")},{value:"order-plane",label:t("planes:orderPlane")},{value:"payment-plane",label:t("planes:paymentPlane")},{value:"product-plane",label:t("planes:productPlane")},{value:"inventory-plane",label:t("planes:inventoryPlane")}];f.useEffect(()=>{c==="edit"&&y&&L()},[y,c]);const L=async i=>{p(!0);try{await new Promise(d=>setTimeout(d,1e3));const l={name:t("entities:form.entityName"),type:"microservice",plane:"user-plane",description:t("entities:form.descriptionPlaceholder"),icon:"ApiOutlined",tags:[t("common:coreService"),t("common:userManagement")],status:"active",version:"1.2.0",port:8080,healthCheckUrl:"/health",dependencies:[t("common:database"),t("common:redisCache")],attributes:{language:"Java",framework:"Spring Boot",database:"MySQL"}};n.setFieldsValue(l),R(l.icon)}catch{I.error(t("entities:form.loadFailed"))}finally{p(!1)}},Q=async i=>{p(!0);try{const l={...i,icon:T};console.log("提交数据:",l),await new Promise(d=>setTimeout(d,1500)),I.success(t(c==="create"?"entities:form.createSuccess":"entities:form.updateSuccess")),g("/entities")}catch{I.error(t(c==="create"?"entities:form.createFailed":"entities:form.updateFailed"))}finally{p(!1)}},z=()=>{g("/entities")},P=[{title:t("entities:form.basicInfo"),description:t("entities:form.basicInfoDesc")},{title:t("entities:form.configInfo"),description:t("entities:form.configInfoDesc")},{title:t("entities:form.confirmSubmit"),description:t("entities:form.confirmSubmitDesc")}],J=()=>e.jsx(u,{title:t("entities:form.basicInfo"),extra:e.jsx(te,{}),children:e.jsxs(U,{gutter:24,children:[e.jsx(r,{xs:24,md:12,children:e.jsx(s.Item,{name:"name",label:t("entities:form.entityName"),rules:[{required:!0,message:t("entities:form.entityNameRequired")},{max:50,message:t("entities:form.entityNameMaxLength")}],children:e.jsx(j,{placeholder:t("entities:form.entityNamePlaceholder")})})}),e.jsx(r,{xs:24,md:12,children:e.jsx(s.Item,{name:"type",label:t("entities:form.entityType"),rules:[{required:!0,message:t("entities:form.entityTypeRequired")}],children:e.jsx(m,{placeholder:t("entities:form.entityTypeRequired"),children:F.map(i=>e.jsx(a,{value:i.value,children:e.jsxs(k,{children:[i.icon,i.label]})},i.value))})})}),e.jsx(r,{xs:24,md:12,children:e.jsx(s.Item,{name:"plane",label:t("entities:form.belongsToPlane"),rules:[{required:!0,message:t("entities:form.planeRequired")}],children:e.jsx(m,{placeholder:t("entities:form.planeRequired"),children:w.map(i=>e.jsx(a,{value:i.value,children:i.label},i.value))})})}),e.jsx(r,{xs:24,md:12,children:e.jsx(s.Item,{name:"status",label:t("common:status"),initialValue:"active",children:e.jsxs(m,{children:[e.jsx(a,{value:"active",children:t("common:active")}),e.jsx(a,{value:"inactive",children:t("common:inactive")}),e.jsx(a,{value:"deprecated",children:t("common:deprecated")})]})})}),e.jsx(r,{xs:24,children:e.jsx(s.Item,{name:"description",label:t("common:description"),rules:[{required:!0,message:t("entities:form.descriptionRequired")},{max:500,message:t("entities:form.descriptionMaxLength")}],children:e.jsx(ce,{rows:4,placeholder:t("entities:form.descriptionPlaceholder")})})}),e.jsx(r,{xs:24,children:e.jsx(s.Item,{label:t("entities:form.iconSelection"),children:e.jsx(he,{children:M.map(i=>e.jsx(ue,{selected:T===i.key,onClick:()=>R(i.key),children:i.icon},i.key))})})})]})}),G=()=>e.jsx(u,{title:t("entities:form.configInfo"),extra:e.jsx(v,{}),children:e.jsxs(U,{gutter:24,children:[e.jsx(r,{xs:24,md:12,children:e.jsx(s.Item,{name:"version",label:t("entities:form.version"),children:e.jsx(j,{placeholder:t("entities:form.versionPlaceholder")})})}),e.jsx(r,{xs:24,md:12,children:e.jsx(s.Item,{name:"port",label:t("entities:form.port"),children:e.jsx(ie,{placeholder:t("entities:form.portPlaceholder"),min:1,max:65535,style:{width:"100%"}})})}),e.jsx(r,{xs:24,md:12,children:e.jsx(s.Item,{name:"healthCheckUrl",label:t("entities:form.healthCheckUrl"),children:e.jsx(j,{placeholder:t("entities:form.healthCheckUrlPlaceholder")})})}),e.jsx(r,{xs:24,md:12,children:e.jsx(s.Item,{name:"tags",label:t("entities:form.tags"),children:e.jsxs(m,{mode:"tags",placeholder:t("entities:form.tagsPlaceholder"),style:{width:"100%"},children:[e.jsx(a,{value:t("common:coreService"),children:t("common:coreService")}),e.jsx(a,{value:t("common:basicService"),children:t("common:basicService")}),e.jsx(a,{value:t("common:businessService"),children:t("common:businessService")})]})})}),e.jsx(r,{xs:24,children:e.jsx(s.Item,{name:"dependencies",label:t("entities:form.dependencies"),children:e.jsxs(m,{mode:"tags",placeholder:t("entities:form.dependenciesPlaceholder"),style:{width:"100%"},children:[e.jsx(a,{value:t("common:database"),children:t("common:database")}),e.jsx(a,{value:t("common:redisCache"),children:t("common:redisCache")}),e.jsx(a,{value:t("common:messageQueue"),children:t("common:messageQueue")})]})})})]})}),H=()=>{var i,l,d,O;return e.jsxs(u,{title:t("entities:form.confirmSubmit"),extra:e.jsx(re,{}),children:[e.jsx(se,{message:t("entities:form.confirmInfoMessage"),type:"info",showIcon:!0,style:{marginBottom:24}}),e.jsx(ne,{items:[{key:"basic",label:t("entities:form.basicInfo"),children:e.jsxs("div",{children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[t("entities:form.entityName"),"："]}),n.getFieldValue("name")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[t("entities:form.entityType"),"："]}),(i=F.find(b=>b.value===n.getFieldValue("type")))==null?void 0:i.label]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[t("entities:form.belongsToPlane"),"："]}),(l=w.find(b=>b.value===n.getFieldValue("plane")))==null?void 0:l.label]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[t("common:status"),"："]}),n.getFieldValue("status")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[t("common:description"),"："]}),n.getFieldValue("description")]})]})},{key:"config",label:t("entities:form.configInfo"),children:e.jsxs("div",{children:[e.jsxs("p",{children:[e.jsxs("strong",{children:[t("entities:form.version"),"："]}),n.getFieldValue("version")||t("entities:form.notSet")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[t("entities:form.port"),"："]}),n.getFieldValue("port")||t("entities:form.notSet")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[t("entities:form.healthCheckUrl"),"："]}),n.getFieldValue("healthCheckUrl")||t("entities:form.notSet")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[t("entities:form.tags"),"："]}),((d=n.getFieldValue("tags"))==null?void 0:d.join(", "))||t("entities:form.none")]}),e.jsxs("p",{children:[e.jsxs("strong",{children:[t("entities:form.dependencies"),"："]}),((O=n.getFieldValue("dependencies"))==null?void 0:O.join(", "))||t("entities:form.none")]})]})}]})]})};return e.jsx(me,{children:e.jsxs(xe,{children:[e.jsx(de,{children:e.jsxs(S,{children:[e.jsx(S.Item,{children:e.jsx(h,{type:"text",icon:e.jsx(Y,{}),onClick:()=>g("/entities"),style:{padding:0,border:"none",background:"transparent",height:"auto"},children:t("menu:entities")})}),e.jsx(S.Item,{children:e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsx(N,{style:{marginRight:8,color:"#1890ff"}}),t(c==="create"?"entities:createTitle":"entities:editTitle")]})})]})}),e.jsx("div",{style:{marginBottom:24},children:e.jsx(oe,{level:2,style:{margin:0},children:e.jsxs(k,{children:[e.jsx(N,{style:{color:"#1890ff"}}),t(c==="create"?"entities:createTitle":"entities:editTitle")]})})}),e.jsx(u,{children:e.jsx(_,{current:o,items:P,style:{marginBottom:24}})}),e.jsxs(s,{form:n,layout:"vertical",onFinish:Q,initialValues:{status:"active"},children:[o===0&&J(),o===1&&G(),o===2&&H(),e.jsx(u,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("div",{children:o>0&&e.jsx(h,{onClick:()=>C(o-1),children:t("entities:form.previousStep")})}),e.jsxs(k,{children:[e.jsx(h,{onClick:z,children:t("common:cancel")}),o<P.length-1?e.jsx(h,{type:"primary",onClick:()=>C(o+1),children:t("entities:form.nextStep")}):e.jsx(h,{type:"primary",htmlType:"submit",loading:A,icon:e.jsx(ee,{}),children:t(c==="create"?"entities:form.createEntity":"entities:form.updateEntity")})]})]})})]})]})})};export{je as E};
