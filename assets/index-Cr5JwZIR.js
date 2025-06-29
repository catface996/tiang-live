import{u as W,c as ue,j as e,d as b}from"./index-CCrQ40Eo.js";import{M as X,aa as c,d as p,C as r,ag as q,l as B,aS as xe,aN as he,a8 as je,r as d,T as ge,j as g,aJ as ye,B as S,n as fe,o as be,S as y,aX as $,a as L,g as V,at as K,x as a,t as u,y as A,i as f,f as ve,aY as ke,aq as Te,q as Pe,u as H,v as Ie,w as Me,aj as Y}from"./antd-DB_1XVWl.js";import{s as Se}from"./index-Daowydkz.js";import{S as Ae}from"./SearchFilterBar-hGzW7t0l.js";import"./vendor-DJG_os-6.js";const{Option:m}=B,{TextArea:we}=q,qe=b(je)`
  margin-top: 16px;

  &.ant-alert-info {
    background-color: ${s=>s.$isDark?"rgba(24, 144, 255, 0.1)":"#e6f7ff"};
    border: 1px solid ${s=>s.$isDark?"rgba(24, 144, 255, 0.3)":"#91d5ff"};

    .ant-alert-message {
      color: ${s=>s.$isDark?"#91d5ff":"#0050b3"};
    }

    .ant-alert-description {
      color: ${s=>s.$isDark?"#bfbfbf":"#262626"};
    }

    .ant-alert-icon {
      color: ${s=>s.$isDark?"#91d5ff":"#1890ff"};
    }
  }
`,De=({visible:s,editingModel:R,form:C,onOk:D,onCancel:x})=>{const{t:l}=W(["models","common"]),{currentTheme:T}=ue(I=>I.theme),P=T==="dark";return e.jsx(X,{title:l(R?"models:editModel":"models:createModel"),open:s,onOk:D,onCancel:x,width:800,children:e.jsxs(c,{form:C,layout:"vertical",initialValues:{temperature:.7,topP:1,maxTokens:4096},children:[e.jsxs(p,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(c.Item,{name:"name",label:l("models:form.name"),rules:[{required:!0,message:l("models:form.nameRequired")}],children:e.jsx(q,{placeholder:l("models:form.namePlaceholder")})})}),e.jsx(r,{span:12,children:e.jsx(c.Item,{name:"provider",label:l("models:form.provider"),rules:[{required:!0,message:l("models:form.providerRequired")}],children:e.jsxs(B,{placeholder:l("models:form.providerPlaceholder"),children:[e.jsx(m,{value:"OpenAI",children:l("models:providers.OpenAI")}),e.jsx(m,{value:"Anthropic",children:l("models:providers.Anthropic")}),e.jsx(m,{value:"Google",children:l("models:providers.Google")}),e.jsx(m,{value:"Azure",children:l("models:providers.Azure")})]})})})]}),e.jsxs(p,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(c.Item,{name:"modelType",label:l("models:form.modelType"),rules:[{required:!0,message:l("models:form.typeRequired")}],children:e.jsxs(B,{placeholder:l("models:form.typePlaceholder"),children:[e.jsx(m,{value:"llm",children:l("models:types.llm")}),e.jsx(m,{value:"embedding",children:l("models:types.embedding")}),e.jsx(m,{value:"image",children:l("models:types.image")}),e.jsx(m,{value:"audio",children:l("models:types.audio")})]})})}),e.jsx(r,{span:12,children:e.jsx(c.Item,{name:"version",label:l("models:form.version"),rules:[{required:!0,message:l("models:form.versionRequired")}],children:e.jsx(q,{placeholder:l("models:form.versionPlaceholder")})})})]}),e.jsx(c.Item,{name:"apiEndpoint",label:l("models:form.apiEndpoint"),rules:[{required:!0,message:l("models:form.endpointRequired")}],children:e.jsx(q,{placeholder:l("models:form.endpointPlaceholder")})}),e.jsxs(p,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(c.Item,{name:"maxTokens",label:l("models:form.maxTokens"),rules:[{required:!0,message:l("models:form.maxTokensRequired")}],children:e.jsx(xe,{min:1,max:128e3,style:{width:"100%"},placeholder:l("models:form.maxTokensPlaceholder")})})}),e.jsx(r,{span:12,children:e.jsx(c.Item,{name:"temperature",label:l("models:form.temperature"),rules:[{required:!0,message:l("models:form.temperatureRequired")}],children:e.jsx(he,{min:0,max:2,step:.1,marks:{0:"0",1:"1",2:"2"}})})})]}),e.jsx(c.Item,{name:"description",label:l("models:form.description"),rules:[{required:!0,message:l("models:form.descriptionRequired")}],children:e.jsx(we,{rows:3,placeholder:l("models:form.descriptionPlaceholder")})}),e.jsx(qe,{$isDark:P,message:"提示",description:"API密钥等敏感信息将在保存后进行加密存储，请确保API端点的正确性。",type:"info",showIcon:!0})]})})},$e=[{id:"1",name:"GPT-4 Turbo",provider:"OpenAI",modelType:"llm",version:"gpt-4-1106-preview",apiEndpoint:"https://api.openai.com/v1/chat/completions",apiKey:"sk-*********************",maxTokens:4096,temperature:.7,topP:1,frequencyPenalty:0,presencePenalty:0,status:"active",description:"models.mockData.gpt4Description",capabilities:["models.capabilities.textGeneration","models.capabilities.codeGeneration","models.capabilities.qaDialog","models.capabilities.textAnalysis","models.capabilities.translation"],pricing:{inputTokens:.01,outputTokens:.03,currency:"USD"},limits:{requestsPerMinute:500,tokensPerMinute:15e4,dailyLimit:1e6},createdBy:"models.mockData.systemAdmin",createdAt:"2024-01-15 10:30:00",lastModified:"2024-01-20 14:25:00",lastUsed:"2024-01-20 16:45:00",usageCount:15420},{id:"2",name:"Claude-3 Sonnet",provider:"Anthropic",modelType:"llm",version:"claude-3-sonnet-20240229",apiEndpoint:"https://api.anthropic.com/v1/messages",apiKey:"sk-ant-*********************",maxTokens:4096,temperature:.8,topP:1,frequencyPenalty:0,presencePenalty:0,status:"active",description:"models.mockData.claudeDescription",capabilities:["models.capabilities.textGeneration","models.capabilities.codeAnalysis","models.capabilities.logicalReasoning","models.capabilities.mathCalculation","models.capabilities.documentAnalysis"],pricing:{inputTokens:.003,outputTokens:.015,currency:"USD"},limits:{requestsPerMinute:1e3,tokensPerMinute:2e5,dailyLimit:2e6},createdBy:"models.mockData.systemAdmin",createdAt:"2024-01-10 09:15:00",lastModified:"2024-01-18 11:20:00",lastUsed:"2024-01-20 15:30:00",usageCount:8750},{id:"3",name:"Text-Embedding-3-Large",provider:"OpenAI",modelType:"embedding",version:"text-embedding-3-large",apiEndpoint:"https://api.openai.com/v1/embeddings",apiKey:"sk-*********************",maxTokens:8191,temperature:0,topP:1,frequencyPenalty:0,presencePenalty:0,status:"active",description:"models.mockData.embeddingDescription",capabilities:["models.capabilities.textEmbedding","models.capabilities.semanticSearch","models.capabilities.similarityCalculation","models.capabilities.clusterAnalysis"],pricing:{inputTokens:1e-4,outputTokens:0,currency:"USD"},limits:{requestsPerMinute:3e3,tokensPerMinute:1e6,dailyLimit:1e7},createdBy:"models.mockData.systemAdmin",createdAt:"2024-01-12 14:45:00",lastModified:"2024-01-19 16:10:00",lastUsed:"2024-01-20 17:20:00",usageCount:25680},{id:"4",name:"Gemini Pro",provider:"Google",modelType:"llm",version:"gemini-pro",apiEndpoint:"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",apiKey:"AIza*********************",maxTokens:2048,temperature:.9,topP:1,frequencyPenalty:0,presencePenalty:0,status:"testing",description:"models.mockData.geminiDescription",capabilities:["models.capabilities.textGeneration","models.capabilities.multimodalUnderstanding","models.capabilities.creativeWriting","models.capabilities.codeGeneration"],pricing:{inputTokens:5e-4,outputTokens:.0015,currency:"USD"},limits:{requestsPerMinute:60,tokensPerMinute:32e3,dailyLimit:1e5},createdBy:"models.mockData.systemAdmin",createdAt:"2024-01-08 16:20:00",lastModified:"2024-01-17 13:45:00",lastUsed:"2024-01-20 12:15:00",usageCount:3240}],Be={models:$e},{Title:Re,Paragraph:J,Text:Ce}=ge,ze=b.div`
  padding: 24px;
`,Ee=b.div`
  margin-bottom: 24px;
`,w=b(f)`
  .ant-card-body {
    padding: 16px;
  }
`,Ue=b(f)`
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .ant-card-head {
    padding: 12px 16px;
    min-height: 57px;

    .ant-card-head-title {
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
    }

    .ant-card-extra {
      padding: 0;
    }

    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .title-left {
        flex: 1;
        min-width: 0; /* 允许文本截断 */

        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .title-right {
        flex-shrink: 0;
        margin-left: 8px;
      }
    }
  }

  .card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;

    .ant-btn {
      color: #666;

      &:hover {
        color: #1890ff;
        background-color: rgba(24, 144, 255, 0.1);
      }
    }
  }
`;b.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;const Ve=()=>{var U,F,N,G,O;const{t:s}=W(["models","common"]),[R,C]=d.useState(!1),[D,x]=d.useState(!1),[l,T]=d.useState(!1),[P,I]=d.useState(null),[i,Q]=d.useState(null),[Z,_]=d.useState(""),[ee,se]=d.useState("all"),[te,le]=d.useState("all"),[ie,ae]=d.useState("all"),[v]=c.useForm();d.useEffect(()=>{Se(s("models:title"))},[s]);const h=Be.models.map(t=>({...t,description:s(t.description.replace("models.","models:")),capabilities:t.capabilities.map(o=>s(o.replace("models.","models:"))),createdBy:s(t.createdBy.replace("models.","models:"))})),M={OpenAI:{color:"green",icon:e.jsx($,{})},Anthropic:{color:"blue",icon:e.jsx(Te,{})},Google:{color:"red",icon:e.jsx(ke,{})},Azure:{color:"cyan",icon:e.jsx(ve,{})}},k={llm:{name:s("models:types.llm"),color:"blue",icon:e.jsx($,{})},embedding:{name:s("models:types.embedding"),color:"green",icon:e.jsx(Pe,{})},image:{name:s("models:types.image"),color:"orange",icon:e.jsx(K,{})},audio:{name:s("models:types.audio"),color:"purple",icon:e.jsx(V,{})}},z=t=>{const n={active:{color:"green",text:s("models:status.active")},inactive:{color:"red",text:s("models:status.inactive")},testing:{color:"orange",text:s("models:status.testing")}}[t];return e.jsx(u,{color:n.color,children:n.text})},oe=()=>{I(null),v.resetFields(),x(!0)},re=t=>{I(t),v.setFieldsValue({name:t.name,provider:t.provider,modelType:t.modelType,version:t.version,apiEndpoint:t.apiEndpoint,maxTokens:t.maxTokens,temperature:t.temperature,description:t.description}),x(!0)},E=t=>{Q(t),T(!0)},ne=async()=>{try{const t=await v.validateFields();P?Y.success(s("models:alerts.updateSuccess")):Y.success(s("models:alerts.createSuccess")),x(!1),v.resetFields()}catch(t){console.error("表单验证失败:",t)}},de=()=>h.map(t=>{const o=M[t.provider],n=k[t.modelType];return e.jsx(r,{xs:24,sm:24,md:12,lg:8,xl:8,children:e.jsxs(Ue,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(g,{children:[o==null?void 0:o.icon,e.jsx("span",{children:t.name})]})}),e.jsx("div",{className:"title-right",children:z(t.status)})]}),onClick:()=>E(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(g,{wrap:!0,children:[e.jsx(u,{color:o==null?void 0:o.color,icon:o==null?void 0:o.icon,children:t.provider}),e.jsx(u,{color:n==null?void 0:n.color,icon:n==null?void 0:n.icon,children:n==null?void 0:n.name})]})}),e.jsx(J,{ellipsis:{rows:2},style:{marginBottom:16,minHeight:40},children:t.description}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(p,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(y,{title:s("models:stats.usageCount"),value:t.usageCount,valueStyle:{fontSize:14}})}),e.jsx(r,{span:12,children:e.jsx(y,{title:s("models:stats.maxTokens"),value:t.maxTokens,valueStyle:{fontSize:14}})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(g,{wrap:!0,children:[t.capabilities.slice(0,3).map(j=>e.jsx(u,{size:"small",children:j},j)),t.capabilities.length>3&&e.jsxs(u,{size:"small",children:["+",t.capabilities.length-3]})]})}),e.jsxs("div",{style:{fontSize:12,color:"#666"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[e.jsxs("span",{children:[s("models:stats.version"),":"]}),e.jsx("span",{children:t.version})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[s("models:stats.lastUsed"),":"]}),e.jsx("span",{children:t.lastUsed})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(g,{children:[e.jsx(H,{title:s("models:viewDetails"),children:e.jsx(S,{type:"text",icon:e.jsx(Ie,{}),size:"small",onClick:j=>{j.stopPropagation(),E(t)}})}),e.jsx(H,{title:s("common:edit"),children:e.jsx(S,{type:"text",icon:e.jsx(Me,{}),size:"small",onClick:j=>{j.stopPropagation(),re(t)}})})]})})]})},t.id)}),ce=h.filter(t=>t.status==="active").length,me=h.reduce((t,o)=>t+o.usageCount,0),pe=h.reduce((t,o)=>t+o.temperature,0)/h.length;return e.jsxs(ze,{className:"model-management-page",children:[e.jsxs(Ee,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[e.jsx(Re,{className:"page-title",level:2,style:{margin:0},children:e.jsxs(g,{children:[e.jsx(ye,{}),s("models:title")]})}),e.jsxs(g,{children:[e.jsx(S,{icon:e.jsx(fe,{}),children:s("common:refresh")}),e.jsx(S,{type:"primary",icon:e.jsx(be,{}),onClick:oe,children:s("models:addModel")})]})]}),e.jsx(J,{style:{marginTop:0,marginBottom:0},children:s("models:subtitle")})]}),e.jsxs(p,{gutter:16,style:{marginBottom:24},children:[e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(w,{className:"model-stats-primary",children:e.jsx(y,{title:s("models:stats.totalModels"),value:h.length,suffix:s("models:stats.unit"),prefix:e.jsx($,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(w,{className:"model-stats-success",children:e.jsx(y,{title:s("models:stats.activeModels"),value:ce,suffix:s("models:stats.unit"),prefix:e.jsx(L,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(w,{className:"model-stats-warning",children:e.jsx(y,{title:s("models:stats.totalUsage"),value:me,prefix:e.jsx(V,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(w,{className:"model-stats-purple",children:e.jsx(y,{title:s("models:stats.avgTemperature"),value:pe.toFixed(1),prefix:e.jsx(K,{})})})})]}),e.jsx(Ae,{searchValue:Z,onSearchChange:_,searchPlaceholder:s("models:searchPlaceholder"),filters:[{key:"provider",value:ee,onChange:se,placeholder:s("models:filterByProvider"),width:120,options:[{value:"all",label:s("models:providers.all")},...Object.entries(M).map(([t,o])=>({value:t,label:s(`models.providers.${t}`)}))]},{key:"type",value:te,onChange:le,placeholder:s("models:filterByType"),width:120,options:[{value:"all",label:s("common:all")},...Object.entries(k).map(([t,o])=>({value:t,label:o.name}))]},{key:"status",value:ie,onChange:ae,placeholder:s("models:filterByStatus"),width:100,options:[{value:"all",label:s("common:all")},{value:"active",label:s("models:status.active")},{value:"inactive",label:s("models:status.inactive")},{value:"testing",label:s("models:status.testing")}]}],onRefresh:()=>window.location.reload()}),e.jsx(p,{gutter:[16,16],children:de()}),e.jsx(De,{visible:D,editingModel:P,form:v,onOk:ne,onCancel:()=>x(!1)}),e.jsx(X,{title:i==null?void 0:i.name,open:l,onCancel:()=>T(!1),footer:null,width:1e3,style:{top:20},children:i&&e.jsxs("div",{children:[e.jsxs(a,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(a.Item,{label:s("models:detail.name"),span:2,children:i.name}),e.jsx(a.Item,{label:s("models:detail.provider"),children:e.jsx(u,{color:(U=M[i.provider])==null?void 0:U.color,icon:(F=M[i.provider])==null?void 0:F.icon,children:i.provider})}),e.jsx(a.Item,{label:s("models:detail.type"),children:e.jsx(u,{color:(N=k[i.modelType])==null?void 0:N.color,icon:(G=k[i.modelType])==null?void 0:G.icon,children:(O=k[i.modelType])==null?void 0:O.name})}),e.jsx(a.Item,{label:s("models:detail.version"),children:i.version}),e.jsx(a.Item,{label:s("models:detail.status"),children:z(i.status)}),e.jsx(a.Item,{label:s("models:detail.apiEndpoint"),span:2,children:e.jsx(Ce,{code:!0,children:i.apiEndpoint})}),e.jsxs(a.Item,{label:s("models:detail.usageCount"),children:[i.usageCount,s("models:stats.requestUnit")]}),e.jsx(a.Item,{label:s("models:detail.lastUsed"),children:i.lastUsed}),e.jsx(a.Item,{label:s("models:detail.createdBy"),children:i.createdBy}),e.jsx(a.Item,{label:s("models:detail.createdAt"),children:i.createdAt}),e.jsx(a.Item,{label:s("models:detail.description"),span:2,children:i.description})]}),e.jsxs(A,{defaultActiveKey:"parameters",children:[e.jsx(A.TabPane,{tab:s("models:detail.parameters"),children:e.jsxs(p,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(f,{title:s("models:detail.parameters"),size:"small",children:e.jsxs(a,{column:1,size:"small",children:[e.jsx(a.Item,{label:s("models:detail.maxTokens"),children:i.maxTokens}),e.jsx(a.Item,{label:s("models:detail.temperature"),children:i.temperature}),e.jsx(a.Item,{label:s("models:detail.topP"),children:i.topP}),e.jsx(a.Item,{label:s("models:detail.frequencyPenalty"),children:i.frequencyPenalty}),e.jsx(a.Item,{label:s("models:detail.presencePenalty"),children:i.presencePenalty})]})})}),e.jsx(r,{span:12,children:e.jsx(f,{title:s("models:detail.limits"),size:"small",children:e.jsxs(a,{column:1,size:"small",children:[e.jsx(a.Item,{label:s("models:detail.requestsPerMinute"),children:i.limits.requestsPerMinute}),e.jsx(a.Item,{label:s("models:detail.tokensPerMinute"),children:i.limits.tokensPerMinute}),e.jsx(a.Item,{label:s("models:detail.dailyLimit"),children:i.limits.dailyLimit})]})})})]})},"parameters"),e.jsx(A.TabPane,{tab:s("models:detail.capabilities"),children:e.jsx(p,{gutter:16,children:i.capabilities.map(t=>e.jsx(r,{xs:24,sm:12,lg:8,children:e.jsx(f,{size:"small",style:{marginBottom:16},children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(L,{style:{color:"#52c41a",fontSize:24,marginBottom:8}}),e.jsx("div",{children:t})]})})},t))})},"capabilities"),e.jsx(A.TabPane,{tab:s("models:detail.pricing"),children:e.jsx(f,{title:s("models:detail.pricingDetails"),size:"small",children:e.jsxs(a,{column:2,size:"small",children:[e.jsxs(a.Item,{label:s("models:detail.inputTokenPrice"),children:["$",i.pricing.inputTokens," / 1K tokens"]}),e.jsxs(a.Item,{label:s("models:detail.outputTokenPrice"),children:["$",i.pricing.outputTokens," / 1K tokens"]}),e.jsx(a.Item,{label:s("models:detail.currency"),children:i.pricing.currency})]})})},"pricing")]})]})})]})};export{Ve as default};
