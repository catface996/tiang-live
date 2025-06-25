import{d as l,u as Z,j as e,b as ae,a as re}from"./index-DmkKiKNT.js";import{T as V,A as ne,u as y,S as oe,j as C,a6 as n,r as d,d as z,C as i,ac as B,m as k,aD as W,ah as ie,aj as le,aW as F,aG as S,s as me,g as ce,ay as de,z as pe,aZ as M,P as ge,aM as fe,af as P,k as N,al as xe,B as L,aI as ue,aF as he}from"./antd-CbyKqlos.js";import{s as be}from"./index-Daowydkz.js";import"./vendor-DJG_os-6.js";const{Text:ve,Paragraph:Ae}=V;l(ne)`
  background-color: ${s=>s.$bgColor} !important;
  color: #ffffff !important;
  
  .anticon {
    color: #ffffff !important;
  }
  
  svg {
    color: #ffffff !important;
  }
`;l(y)`
  ${s=>s.$bgColor&&`
    background-color: ${s.$bgColor} !important;
    border: 1px solid ${s.$borderColor} !important;
    color: ${s.$textColor} !important;
  `}
  
  .anticon {
    color: ${s=>s.$textColor||"inherit"} !important;
  }
`;l.span`
  color: ${s=>s.$isDark?"#434343":"#d9d9d9"};
`;l.span`
  color: ${s=>s.$isDark?"#8c8c8c":"#666"};
`;l.div`
  .ant-tag {
    margin-bottom: 4px;
  }
`;l.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;l(ve)`
  font-size: 12px;
  color: ${s=>s.$isDark?"#8c8c8c":"#999"} !important;
`;l(oe)`
  .ant-statistic-content-value {
    font-size: 14px !important;
    color: ${s=>s.$isDark?"#ffffff":"#262626"} !important;
  }
`;l(C)`
  height: 100%;
  transition: all 0.3s ease;
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px !important;
  overflow: hidden; /* 确保内容不会超出圆角 */
  
  /* 强制卡片本身的圆角 */
  &,
  &.ant-card {
    border-radius: 8px !important;
  }
  
  /* 卡片主体样式 */
  .ant-card-body {
    padding: 20px;
    background: ${s=>s.$isDark?"#141414":"#ffffff"};
  }
  
  /* actions区域样式 */
  .ant-card-actions {
    background: ${s=>s.$isDark?"#1f1f1f":"#fafafa"};
    border-top: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
    
    li {
      border-right: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
      
      &:last-child {
        border-right: none;
      }
    }
    
    .ant-btn {
      color: ${s=>s.$isDark?"#ffffff":"#595959"};
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${s=>s.$isDark?"0 4px 12px rgba(255, 255, 255, 0.1)":"0 4px 12px rgba(0, 0, 0, 0.1)"};
    border-color: ${s=>s.$isDark?"#177ddc":"#40a9ff"};
  }
      
      &:hover {
        color: ${s=>s.$isDark?"#177ddc":"#40a9ff"};
        background: ${s=>s.$isDark?"rgba(23, 125, 220, 0.1)":"rgba(64, 169, 255, 0.1)"};
      }
      
      &.ant-btn-dangerous:hover {
        color: #ff4d4f;
        background: ${s=>(s.$isDark,"rgba(255, 77, 79, 0.1)")};
      }
    }
  }
  
  .agent-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    width: 100%;
  }
  
  .agent-avatar {
    margin-right: 12px;
    flex-shrink: 0;
    width: 48px; /* 限制avatar容器宽度 */
    height: 48px; /* 限制avatar容器高度 */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .agent-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  
  .agent-name {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: ${s=>s.$isDark?"#ffffff":"#262626"};
    line-height: 1.4;
  }
  
  .agent-type {
    margin-top: 4px;
  }
  
  .agent-stats {
    margin: 16px 0;
    padding: 16px;
    background: ${s=>s.$isDark?"#1f1f1f":"#fafafa"};
    border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
    border-radius: 6px;
  }
  
  .agent-description {
    margin: 16px 0;
    color: ${s=>s.$isDark?"#8c8c8c":"#666"};
    font-size: 13px;
    line-height: 1.5;
  }
  
  .agent-tags {
    margin: 16px 0;
  }
  
  .agent-actions {
    margin-top: 16px;
    padding-top: 16px;
    border-top: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    
    &.running {
      background-color: #52c41a;
    }
    
    &.stopped {
      background-color: #ff4d4f;
    }
    
    &.paused {
      background-color: #faad14;
    }
  }
`;const{Title:Re,Text:m,Paragraph:E}=V,{Option:c}=k,{TextArea:Y}=B,je=l(C)`
  margin-bottom: 24px;
  
  .ant-card-head {
    border-bottom: 2px solid #f0f0f0;
  }
  
  .ant-card-head-title {
    font-size: 16px;
    font-weight: 600;
  }
`,ye=l.div`
  .prompt-template-item {
    padding: 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      border-color: #1890ff;
      box-shadow: 0 2px 4px rgba(24, 144, 255, 0.1);
    }
    
    &.selected {
      border-color: #1890ff;
      background-color: #f6ffed;
    }
  }
  
  .prompt-variables {
    background: #fafafa;
    padding: 12px;
    border-radius: 6px;
    margin-top: 12px;
  }
`,ke=l.div`
  .model-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      border-color: #1890ff;
    }
    
    &.selected {
      border-color: #1890ff;
      background-color: #f6ffed;
    }
  }
  
  .model-info {
    flex: 1;
  }
  
  .model-status {
    margin-left: 12px;
  }
`,Te=({initialData:s,onSubmit:b,loading:T=!1})=>{const{t}=Z(["agents","common"]),[g]=n.useForm(),[f,I]=d.useState("basic"),[x,v]=d.useState("template"),[u,h]=d.useState(""),[j,G]=d.useState(""),[$,K]=d.useState(""),[_,w]=d.useState([]),[D,A]=d.useState({});d.useEffect(()=>{s&&(g.setFieldsValue(s),K(`${s.model.provider}-${s.model.modelName}`),w(s.mcpServers),G(s.prompts.system),A(s.prompts.variables),s.prompts.templates.length>0?(v("template"),h(s.prompts.templates[0])):v("custom"))},[s,g]);const R=[{id:"customer-service-template",name:t("agents:form.promptTemplates.customerService.name"),description:t("agents:form.promptTemplates.customerService.description"),content:t("agents:form.promptTemplates.customerService.content"),variables:["company_name","service_hours"],category:t("agents:form.promptTemplates.categories.dialogue")},{id:"data-analysis-template",name:t("agents:form.promptTemplates.dataAnalysis.name"),description:t("agents:form.promptTemplates.dataAnalysis.description"),content:t("agents:form.promptTemplates.dataAnalysis.content"),variables:[],category:t("agents:form.promptTemplates.categories.analysis")},{id:"code-review-template",name:t("agents:form.promptTemplates.codeReview.name"),description:t("agents:form.promptTemplates.codeReview.description"),content:t("agents:form.promptTemplates.codeReview.content"),variables:[],category:t("agents:form.promptTemplates.categories.development")},{id:"monitoring-template",name:t("agents:form.promptTemplates.monitoring.name"),description:t("agents:form.promptTemplates.monitoring.description"),content:t("agents:form.promptTemplates.monitoring.content"),variables:[],category:t("agents:form.promptTemplates.categories.operations")}],O=[{id:"openai-gpt-4",provider:"OpenAI",name:"GPT-4",version:"gpt-4-0613",description:t("agents:form.models.gpt4.description"),status:"available",pricing:"$0.03/1K tokens"},{id:"openai-gpt-3.5-turbo",provider:"OpenAI",name:"GPT-3.5 Turbo",version:"gpt-3.5-turbo-0613",description:t("agents:form.models.gpt35.description"),status:"available",pricing:"$0.002/1K tokens"},{id:"anthropic-claude-3",provider:"Anthropic",name:"Claude 3",version:"claude-3-opus-20240229",description:t("agents:form.models.claude3.description"),status:"available",pricing:"$0.015/1K tokens"},{id:"local-llama2",provider:t("agents:form.models.localDeployment"),name:"Llama 2",version:"llama2-7b-chat",description:t("agents:form.models.llama2.description"),status:"available",pricing:t("agents:form.models.free")}],H=[{id:"database-mcp",name:t("agents:form.mcpServers.database.name"),description:t("agents:form.mcpServers.database.description"),status:"running",capabilities:["mysql","postgresql","mongodb"]},{id:"email-mcp",name:t("agents:form.mcpServers.email.name"),description:t("agents:form.mcpServers.email.description"),status:"running",capabilities:["smtp","imap","templates"]},{id:"file-mcp",name:t("agents:form.mcpServers.file.name"),description:t("agents:form.mcpServers.file.description"),status:"running",capabilities:["read","write","search"]},{id:"api-mcp",name:t("agents:form.mcpServers.api.name"),description:t("agents:form.mcpServers.api.description"),status:"running",capabilities:["http","rest","graphql"]},{id:"scheduler-mcp",name:t("agents:form.mcpServers.scheduler.name"),description:t("agents:form.mcpServers.scheduler.description"),status:"stopped",capabilities:["cron","interval","webhook"]}],J=async a=>{var r,o;try{const p={...a,id:s==null?void 0:s.id,model:{...a.model,provider:$.split("-")[0],modelName:$.split("-")[1],version:((r=O.find(q=>q.id===$))==null?void 0:r.version)||""},prompts:{system:x==="template"?((o=R.find(q=>q.id===u))==null?void 0:o.content)||"":j,templates:x==="template"?[u]:[],variables:D},mcpServers:_};await b(p)}catch{P.error("提交失败，请重试")}},Q=a=>{h(a);const r=R.find(o=>o.id===a);if(r){const o={};r.variables.forEach(p=>{o[p]=D[p]||""}),A(o)}},U=(a,r)=>{A(o=>({...o,[a]:r}))},X=()=>e.jsxs(ye,{children:[e.jsxs(M.Group,{value:x,onChange:a=>v(a.target.value),style:{marginBottom:16},children:[e.jsx(M,{value:"template",children:t("agents:form.prompts.useTemplate")}),e.jsx(M,{value:"custom",children:t("agents:form.prompts.customPrompt")})]}),x==="template"?e.jsxs("div",{children:[e.jsxs(m,{strong:!0,children:[t("agents:form.prompts.selectTemplate"),"："]}),e.jsx("div",{style:{marginTop:12},children:R.map(a=>e.jsxs("div",{className:`prompt-template-item ${u===a.id?"selected":""}`,onClick:()=>Q(a.id),children:[e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:e.jsxs("div",{style:{flex:1},children:[e.jsx(m,{strong:!0,children:a.name}),e.jsx(y,{color:"blue",style:{marginLeft:8},children:a.category}),e.jsx(E,{style:{margin:"4px 0",color:"#666"},children:a.description})]})}),u===a.id&&a.variables.length>0&&e.jsxs("div",{className:"prompt-variables",children:[e.jsxs(m,{strong:!0,children:[t("agents:form.prompts.templateVariables"),"："]}),a.variables.map(r=>e.jsxs("div",{style:{marginTop:8},children:[e.jsxs(m,{children:[r,":"]}),e.jsx(B,{placeholder:t("agents:form.prompts.enterVariableValue",{variable:r}),value:D[r]||"",onChange:o=>U(r,o.target.value),style:{marginTop:4}})]},r))]})]},a.id))})]}):e.jsxs("div",{children:[e.jsxs(m,{strong:!0,children:[t("agents:form.prompts.customPrompt"),"："]}),e.jsx(Y,{rows:8,placeholder:t("agents:form.prompts.customPromptPlaceholder"),value:j,onChange:a=>G(a.target.value),style:{marginTop:8}}),e.jsx(ge,{message:t("agents:form.prompts.tip"),description:t("agents:form.prompts.customPromptTip"),type:"info",showIcon:!0,style:{marginTop:12}})]})]}),ee=()=>e.jsxs(ke,{children:[e.jsxs(m,{strong:!0,children:[t("agents:form.models.selectModel"),"："]}),e.jsx("div",{style:{marginTop:12},children:O.map(a=>e.jsx("div",{className:`model-item ${$===a.id?"selected":""}`,onClick:()=>K(a.id),children:e.jsxs("div",{className:"model-info",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:4},children:[e.jsxs(m,{strong:!0,children:[a.provider," - ",a.name]}),e.jsx(y,{color:a.status==="available"?"green":"red",style:{marginLeft:8},children:a.status==="available"?t("agents:form.models.available"):t("agents:form.models.unavailable")})]}),e.jsxs(m,{type:"secondary",style:{fontSize:12},children:[t("agents:form.models.version"),": ",a.version," | ",t("agents:form.models.pricing"),": ",a.pricing]}),e.jsx(E,{style:{margin:"4px 0 0 0",fontSize:12,color:"#666"},children:a.description})]})},a.id))})]}),te=()=>e.jsxs("div",{children:[e.jsxs(m,{strong:!0,children:[t("agents:form.mcpServers.selectServers"),"："]}),e.jsx(E,{type:"secondary",style:{marginTop:4},children:t("agents:form.mcpServers.description")}),e.jsx("div",{style:{marginTop:12},children:H.map(a=>e.jsx(C,{size:"small",style:{marginBottom:8},bodyStyle:{padding:12},children:e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:4},children:[e.jsx(fe,{checked:_.includes(a.id),onChange:r=>{r.target.checked?w(o=>[...o,a.id]):w(o=>o.filter(p=>p!==a.id))},children:e.jsx(m,{strong:!0,children:a.name})}),e.jsx(y,{color:a.status==="running"?"green":"red",style:{marginLeft:8},children:a.status==="running"?t("agents:form.mcpServers.running"):t("agents:form.mcpServers.stopped")})]}),e.jsx(m,{type:"secondary",style:{fontSize:12},children:a.description}),e.jsx("div",{style:{marginTop:4},children:a.capabilities.map(r=>e.jsx(y,{size:"small",style:{marginRight:4},children:r},r))})]})})},a.id))})]}),se=[{key:"basic",label:t("agents:form.tabs.basic"),icon:e.jsx(W,{}),children:e.jsxs(z,{gutter:24,children:[e.jsx(i,{span:24,children:e.jsx(n.Item,{name:"name",label:t("agents:form.fields.name"),rules:[{required:!0,message:t("agents:form.validation.nameRequired")}],children:e.jsx(B,{placeholder:t("agents:form.placeholders.name")})})}),e.jsx(i,{span:24,children:e.jsx(n.Item,{name:"description",label:t("agents:form.fields.description"),rules:[{required:!0,message:t("agents:form.validation.descriptionRequired")}],children:e.jsx(Y,{rows:3,placeholder:t("agents:form.placeholders.description")})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:"type",label:t("agents:form.fields.type"),rules:[{required:!0,message:t("agents:form.validation.typeRequired")}],children:e.jsxs(k,{placeholder:t("agents:form.placeholders.type"),children:[e.jsx(c,{value:"chat",children:t("agents:form.types.chat")}),e.jsx(c,{value:"task",children:t("agents:form.types.task")}),e.jsx(c,{value:"analysis",children:t("agents:form.types.analysis")}),e.jsx(c,{value:"monitoring",children:t("agents:form.types.monitoring")})]})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:"status",label:t("agents:form.fields.status"),rules:[{required:!0,message:t("agents:form.validation.statusRequired")}],children:e.jsxs(k,{placeholder:t("agents:form.placeholders.status"),children:[e.jsx(c,{value:"active",children:t("agents:form.status.active")}),e.jsx(c,{value:"inactive",children:t("agents:form.status.inactive")}),e.jsx(c,{value:"training",children:t("agents:form.status.training")})]})})}),e.jsx(i,{span:24,children:e.jsx(n.Item,{name:"tags",label:t("agents:form.fields.tags"),children:e.jsx(k,{mode:"tags",placeholder:t("agents:form.placeholders.tags"),style:{width:"100%"}})})})]})},{key:"prompts",label:t("agents:form.tabs.prompts"),icon:e.jsx(ie,{}),children:X()},{key:"model",label:t("agents:form.tabs.model"),icon:e.jsx(me,{}),children:e.jsxs("div",{children:[ee(),e.jsx(le,{}),e.jsxs(m,{strong:!0,children:[t("agents:form.models.parameterConfig"),"："]}),e.jsxs(z,{gutter:16,style:{marginTop:16},children:[e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["model","config","temperature"],label:"Temperature",tooltip:t("agents:form.models.temperatureTooltip"),children:e.jsx(F,{min:0,max:2,step:.1,marks:{0:"0",1:"1",2:"2"}})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["model","config","maxTokens"],label:"Max Tokens",tooltip:t("agents:form.models.maxTokensTooltip"),children:e.jsx(S,{min:1,max:4096,style:{width:"100%"}})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["model","config","topP"],label:"Top P",tooltip:t("agents:form.models.topPTooltip"),children:e.jsx(F,{min:0,max:1,step:.1,marks:{0:"0",.5:"0.5",1:"1"}})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["model","config","frequencyPenalty"],label:"Frequency Penalty",tooltip:t("agents:form.models.frequencyPenaltyTooltip"),children:e.jsx(F,{min:-2,max:2,step:.1,marks:{"-2":"-2",0:"0",2:"2"}})})})]})]})},{key:"mcp",label:t("agents:form.tabs.mcpServer"),icon:e.jsx(ce,{}),children:te()},{key:"settings",label:t("agents:form.tabs.settings"),icon:e.jsx(W,{}),children:e.jsxs(z,{gutter:24,children:[e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["settings","autoStart"],label:t("agents:form.settings.autoStart"),valuePropName:"checked",children:e.jsx(de,{})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["settings","maxConcurrency"],label:t("agents:form.settings.maxConcurrency"),children:e.jsx(S,{min:1,max:100})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["settings","timeout"],label:t("agents:form.settings.timeout"),children:e.jsx(S,{min:5,max:300})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["settings","retryCount"],label:t("agents:form.settings.retryCount"),children:e.jsx(S,{min:0,max:10})})}),e.jsx(i,{span:24,children:e.jsx(n.Item,{name:["settings","logLevel"],label:t("agents:form.settings.logLevel"),children:e.jsxs(k,{children:[e.jsx(c,{value:"debug",children:"Debug"}),e.jsx(c,{value:"info",children:"Info"}),e.jsx(c,{value:"warn",children:"Warn"}),e.jsx(c,{value:"error",children:"Error"})]})})})]})}];return e.jsx(n,{id:"ai-agent-form",form:g,layout:"vertical",onFinish:J,initialValues:{type:"chat",status:"active",model:{config:{temperature:.7,maxTokens:2048,topP:1,frequencyPenalty:0,presencePenalty:0}},settings:{autoStart:!0,maxConcurrency:10,timeout:30,retryCount:3,logLevel:"info"}},children:e.jsx(je,{children:e.jsx(pe,{activeKey:f,onChange:I,items:se})})})},{Title:$e,Paragraph:Se}=V,Pe=l.div`
  padding: 24px;
  background: #f5f5f5;
`,qe=()=>{const{t:s}=Z(["agents","common"]),b=ae(),{id:T}=re(),t=!!T,[g,f]=d.useState(!1),[I,x]=d.useState();d.useEffect(()=>{be(s(t?"agents:form.editTitle":"agents:form.createTitle")),t&&v()},[t,T,s]);const v=async()=>{f(!0);try{const h={id:T,name:s("agents:form.mockData.customerServiceName"),description:s("agents:form.mockData.customerServiceDescription"),type:"chat",status:"active",model:{provider:"openai",modelName:"gpt-4",version:"gpt-4-0613",config:{temperature:.7,maxTokens:2048,topP:1,frequencyPenalty:0,presencePenalty:0}},prompts:{system:s("agents:form.mockData.systemPrompt"),templates:["customer-service-template"],variables:{company_name:s("agents:form.mockData.companyName"),service_hours:"9:00-18:00"}},mcpServers:["database-mcp","email-mcp"],capabilities:["text-generation","question-answering","sentiment-analysis"],settings:{autoStart:!0,maxConcurrency:10,timeout:30,retryCount:3,logLevel:"info"},tags:[s("agents:form.mockData.tags.customerService"),s("agents:form.mockData.tags.dialogue"),s("agents:form.mockData.tags.assistant")]};x(h)}catch{P.error(s("agents:form.messages.loadDataFailed"))}finally{f(!1)}},u=async h=>{f(!0);try{await new Promise(j=>setTimeout(j,1e3)),P.success(s(t?"agents:form.messages.updateSuccess":"agents:form.messages.createSuccess")),b("/ai-agents")}catch{P.error(s(t?"agents:form.messages.updateFailed":"agents:form.messages.createFailed"))}finally{f(!1)}};return e.jsxs(Pe,{children:[e.jsx("div",{style:{marginBottom:24},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx($e,{level:2,style:{margin:0},children:e.jsxs(N,{children:[e.jsx(xe,{style:{color:"#1890ff"}}),s(t?"agents:form.editTitle":"agents:form.createTitle")]})}),e.jsx(Se,{style:{marginTop:8,marginBottom:0,fontSize:16,color:"#666"},children:s(t?"agents:form.editSubtitle":"agents:form.createSubtitle")})]}),e.jsx(N,{children:e.jsx(L,{icon:e.jsx(ue,{}),onClick:()=>b("/ai-agents"),children:s("common:backToList")})})]})}),e.jsx(Te,{initialData:I,onSubmit:u,loading:g}),e.jsx(C,{children:e.jsx("div",{style:{textAlign:"right"},children:e.jsxs(N,{children:[e.jsx(L,{onClick:()=>b("/ai-agents"),children:s("common:cancel")}),e.jsx(L,{type:"primary",loading:g,icon:e.jsx(he,{}),form:"ai-agent-form",htmlType:"submit",children:s(t?"agents:form.updateAgent":"agents:form.createAgent")})]})})})]})};export{qe as default};
