import{d as o,u as Y,j as e,b as oe,a as ne}from"./index-Ds4hQBUW.js";import{T as V,A as ie,t as y,S as le,i as w,a9 as n,r as d,d as F,C as i,af as L,l as k,aI as H,al as ce,an as me,aM as z,aR as P,q as de,g as pe,aN as ge,y as fe,a$ as B,a7 as xe,aB as ue,ai as I,J as C,K as he,j as J,ap as be,B as Q,aQ as ve}from"./antd-Beg1odhe.js";import{s as je}from"./index-Daowydkz.js";import"./vendor-DJG_os-6.js";const{Text:ye,Paragraph:ze}=V;o(ie)`
  background-color: ${s=>s.$bgColor} !important;
  color: #ffffff !important;
  
  .anticon {
    color: #ffffff !important;
  }
  
  svg {
    color: #ffffff !important;
  }
`;o(y)`
  ${s=>s.$bgColor&&`
    background-color: ${s.$bgColor} !important;
    border: 1px solid ${s.$borderColor} !important;
    color: ${s.$textColor} !important;
  `}
  
  .anticon {
    color: ${s=>s.$textColor||"inherit"} !important;
  }
`;o.span`
  color: ${s=>s.$isDark?"#434343":"#d9d9d9"};
`;o.span`
  color: ${s=>s.$isDark?"#8c8c8c":"#666"};
`;o.div`
  .ant-tag {
    margin-bottom: 4px;
  }
`;o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;o(ye)`
  font-size: 12px;
  color: ${s=>s.$isDark?"#8c8c8c":"#999"} !important;
`;o(le)`
  .ant-statistic-content-value {
    font-size: 14px !important;
    color: ${s=>s.$isDark?"#ffffff":"#262626"} !important;
  }
`;o(w)`
  height: 100%;
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
`;const{Title:Be,Text:c,Paragraph:E}=V,{Option:m}=k,{TextArea:W}=L,ke=o(w)`
  margin-bottom: 24px;

  .ant-card-head {
    border-bottom: 2px solid #f0f0f0;
  }

  .ant-card-head-title {
    font-size: 16px;
    font-weight: 600;
  }
`,Te=o.div`
  .prompt-template-item {
    padding: 12px;
    border: 1px solid var(--border-base, #d9d9d9);
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    background-color: var(--bg-container, #ffffff);
    color: var(--text-primary, rgba(0, 0, 0, 0.88));

    &:hover {
      border-color: #1890ff;
      box-shadow: 0 2px 4px rgba(24, 144, 255, 0.1);
      background-color: var(--bg-hover, #f5f5f5);
    }

    &.selected {
      border-color: #1890ff;
      background-color: rgba(24, 144, 255, 0.08);
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);

      /* 暗色主题下的特殊处理 */
      .theme-dark & {
        background-color: rgba(24, 144, 255, 0.15);
        color: var(--text-primary, rgba(255, 255, 255, 0.88));
      }
    }
  }

  .prompt-variables {
    background: #fafafa;
    padding: 12px;
    border-radius: 6px;
    margin-top: 12px;
  }
`,$e=o.div`
  .model-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid var(--border-base, #d9d9d9);
    border-radius: 6px;
    margin-bottom: 8px;
    cursor: pointer;
    background-color: var(--bg-container, #ffffff);
    color: var(--text-primary, rgba(0, 0, 0, 0.88));

    &:hover {
      border-color: #1890ff;
      background-color: var(--bg-hover, #f5f5f5);
    }

    &.selected {
      border-color: #1890ff;
      background-color: rgba(24, 144, 255, 0.08);
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);

      /* 暗色主题下的特殊处理 */
      .theme-dark & {
        background-color: rgba(24, 144, 255, 0.15);
        color: var(--text-primary, rgba(255, 255, 255, 0.88));
      }
    }
  }

  .model-info {
    flex: 1;
  }

  .model-status {
    margin-left: 12px;
  }
`,Se=({initialData:s,onSubmit:h,loading:T=!1})=>{const{t}=Y(["agents","common"]),[p]=n.useForm(),[g,D]=d.useState("basic"),[f,b]=d.useState("template"),[x,u]=d.useState(""),[v,K]=d.useState(""),[$,_]=d.useState(""),[S,N]=d.useState([]),[A,R]=d.useState({});d.useEffect(()=>{s&&(p.setFieldsValue(s),_(`${s.model.provider}-${s.model.modelName}`),N(s.mcpServers),K(s.prompts.system),R(s.prompts.variables),s.prompts.templates.length>0?(b("template"),u(s.prompts.templates[0])):b("custom"))},[s,p]);const q=[{id:"customer-service-template",name:t("agents:form.promptTemplates.customerService.name"),description:t("agents:form.promptTemplates.customerService.description"),content:t("agents:form.promptTemplates.customerService.content"),variables:["company_name","service_hours"],category:t("agents:form.promptTemplates.categories.dialogue")},{id:"data-analysis-template",name:t("agents:form.promptTemplates.dataAnalysis.name"),description:t("agents:form.promptTemplates.dataAnalysis.description"),content:t("agents:form.promptTemplates.dataAnalysis.content"),variables:[],category:t("agents:form.promptTemplates.categories.analysis")},{id:"code-review-template",name:t("agents:form.promptTemplates.codeReview.name"),description:t("agents:form.promptTemplates.codeReview.description"),content:t("agents:form.promptTemplates.codeReview.content"),variables:[],category:t("agents:form.promptTemplates.categories.development")},{id:"monitoring-template",name:t("agents:form.promptTemplates.monitoring.name"),description:t("agents:form.promptTemplates.monitoring.description"),content:t("agents:form.promptTemplates.monitoring.content"),variables:[],category:t("agents:form.promptTemplates.categories.operations")}],G=[{id:"openai-gpt-4",provider:"OpenAI",name:"GPT-4",version:"gpt-4-0613",description:t("agents:form.models.gpt4.description"),status:"available",pricing:"$0.03/1K tokens"},{id:"openai-gpt-3.5-turbo",provider:"OpenAI",name:"GPT-3.5 Turbo",version:"gpt-3.5-turbo-0613",description:t("agents:form.models.gpt35.description"),status:"available",pricing:"$0.002/1K tokens"},{id:"anthropic-claude-3",provider:"Anthropic",name:"Claude 3",version:"claude-3-opus-20240229",description:t("agents:form.models.claude3.description"),status:"available",pricing:"$0.015/1K tokens"},{id:"local-llama2",provider:t("agents:form.models.localDeployment"),name:"Llama 2",version:"llama2-7b-chat",description:t("agents:form.models.llama2.description"),status:"available",pricing:t("agents:form.models.free")}],U=[{id:"database-mcp",name:t("agents:form.mcpServers.database.name"),description:t("agents:form.mcpServers.database.description"),status:"running",capabilities:["mysql","postgresql","mongodb"]},{id:"email-mcp",name:t("agents:form.mcpServers.email.name"),description:t("agents:form.mcpServers.email.description"),status:"running",capabilities:["smtp","imap","templates"]},{id:"file-mcp",name:t("agents:form.mcpServers.file.name"),description:t("agents:form.mcpServers.file.description"),status:"running",capabilities:["read","write","search"]},{id:"api-mcp",name:t("agents:form.mcpServers.api.name"),description:t("agents:form.mcpServers.api.description"),status:"running",capabilities:["http","rest","graphql"]},{id:"scheduler-mcp",name:t("agents:form.mcpServers.scheduler.name"),description:t("agents:form.mcpServers.scheduler.description"),status:"stopped",capabilities:["cron","interval","webhook"]}],X=async a=>{var r,l;try{const j={...a,id:s==null?void 0:s.id,model:{...a.model,provider:$.split("-")[0],modelName:$.split("-")[1],version:((r=G.find(M=>M.id===$))==null?void 0:r.version)||""},prompts:{system:f==="template"?((l=q.find(M=>M.id===x))==null?void 0:l.content)||"":v,templates:f==="template"?[x]:[],variables:A},mcpServers:S};await h(j)}catch{I.error("提交失败，请重试")}},Z=a=>{u(a);const r=q.find(l=>l.id===a);if(r){const l={};r.variables.forEach(j=>{l[j]=A[j]||""}),R(l)}},ee=(a,r)=>{R(l=>({...l,[a]:r}))},te=()=>e.jsxs(Te,{children:[e.jsxs(B.Group,{value:f,onChange:a=>b(a.target.value),style:{marginBottom:16},children:[e.jsx(B,{value:"template",children:t("agents:form.prompts.useTemplate")}),e.jsx(B,{value:"custom",children:t("agents:form.prompts.customPrompt")})]}),f==="template"?e.jsxs("div",{children:[e.jsxs(c,{strong:!0,children:[t("agents:form.prompts.selectTemplate"),"："]}),e.jsx("div",{style:{marginTop:12},children:q.map(a=>e.jsxs("div",{className:`prompt-template-item ${x===a.id?"selected":""}`,onClick:()=>Z(a.id),children:[e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:e.jsxs("div",{style:{flex:1},children:[e.jsx(c,{strong:!0,children:a.name}),e.jsx(y,{color:"blue",style:{marginLeft:8},children:a.category}),e.jsx(E,{style:{margin:"4px 0",color:"#666"},children:a.description})]})}),x===a.id&&a.variables.length>0&&e.jsxs("div",{className:"prompt-variables",children:[e.jsxs(c,{strong:!0,children:[t("agents:form.prompts.templateVariables"),"："]}),a.variables.map(r=>e.jsxs("div",{style:{marginTop:8},children:[e.jsxs(c,{children:[r,":"]}),e.jsx(L,{placeholder:t("agents:form.prompts.enterVariableValue",{variable:r}),value:A[r]||"",onChange:l=>ee(r,l.target.value),style:{marginTop:4}})]},r))]})]},a.id))})]}):e.jsxs("div",{children:[e.jsxs(c,{strong:!0,children:[t("agents:form.prompts.customPrompt"),"："]}),e.jsx(W,{rows:8,placeholder:t("agents:form.prompts.customPromptPlaceholder"),value:v,onChange:a=>K(a.target.value),style:{marginTop:8}}),e.jsx(xe,{message:t("agents:form.prompts.tip"),description:t("agents:form.prompts.customPromptTip"),type:"info",showIcon:!0,style:{marginTop:12}})]})]}),se=()=>e.jsxs($e,{children:[e.jsxs(c,{strong:!0,children:[t("agents:form.models.selectModel"),"："]}),e.jsx("div",{style:{marginTop:12},children:G.map(a=>e.jsx("div",{className:`model-item ${$===a.id?"selected":""}`,onClick:()=>_(a.id),children:e.jsxs("div",{className:"model-info",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:4},children:[e.jsxs(c,{strong:!0,children:[a.provider," - ",a.name]}),e.jsx(y,{color:a.status==="available"?"green":"red",style:{marginLeft:8},children:a.status==="available"?t("agents:form.models.available"):t("agents:form.models.unavailable")})]}),e.jsxs(c,{type:"secondary",style:{fontSize:12},children:[t("agents:form.models.version"),": ",a.version," | ",t("agents:form.models.pricing"),": ",a.pricing]}),e.jsx(E,{style:{margin:"4px 0 0 0",fontSize:12,color:"#666"},children:a.description})]})},a.id))})]}),O=a=>{S.includes(a)?N(r=>r.filter(l=>l!==a)):N(r=>[...r,a])},ae=()=>e.jsxs("div",{children:[e.jsxs(c,{strong:!0,children:[t("agents:form.mcpServers.selectServers"),"："]}),e.jsx(E,{type:"secondary",style:{marginTop:4},children:t("agents:form.mcpServers.description")}),e.jsx("div",{style:{marginTop:12},children:U.map(a=>e.jsx(w,{size:"small",style:{marginBottom:8,cursor:"pointer"},bodyStyle:{padding:12},onClick:()=>O(a.id),className:`mcp-server-item ${S.includes(a.id)?"selected":""}`,children:e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:4},children:[e.jsx(ue,{checked:S.includes(a.id),onChange:r=>{r.stopPropagation(),O(a.id)},onClick:r=>{r.stopPropagation()},children:e.jsx(c,{strong:!0,children:a.name})}),e.jsx(y,{color:a.status==="running"?"green":"red",style:{marginLeft:8},children:a.status==="running"?t("agents:form.mcpServers.running"):t("agents:form.mcpServers.stopped")})]}),e.jsx(c,{type:"secondary",style:{fontSize:12},children:a.description}),e.jsx("div",{style:{marginTop:4},children:a.capabilities.map(r=>e.jsx(y,{size:"small",style:{marginRight:4},children:r},r))})]})})},a.id))})]}),re=[{key:"basic",label:t("agents:form.tabs.basic"),icon:e.jsx(H,{}),children:e.jsxs(F,{gutter:24,children:[e.jsx(i,{span:24,children:e.jsx(n.Item,{name:"name",label:t("agents:form.fields.name"),rules:[{required:!0,message:t("agents:form.validation.nameRequired")}],children:e.jsx(L,{placeholder:t("agents:form.placeholders.name")})})}),e.jsx(i,{span:24,children:e.jsx(n.Item,{name:"description",label:t("agents:form.fields.description"),rules:[{required:!0,message:t("agents:form.validation.descriptionRequired")}],children:e.jsx(W,{rows:3,placeholder:t("agents:form.placeholders.description")})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:"type",label:t("agents:form.fields.type"),rules:[{required:!0,message:t("agents:form.validation.typeRequired")}],children:e.jsxs(k,{placeholder:t("agents:form.placeholders.type"),children:[e.jsx(m,{value:"chat",children:t("agents:form.types.chat")}),e.jsx(m,{value:"task",children:t("agents:form.types.task")}),e.jsx(m,{value:"analysis",children:t("agents:form.types.analysis")}),e.jsx(m,{value:"monitoring",children:t("agents:form.types.monitoring")})]})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:"status",label:t("agents:form.fields.status"),rules:[{required:!0,message:t("agents:form.validation.statusRequired")}],children:e.jsxs(k,{placeholder:t("agents:form.placeholders.status"),children:[e.jsx(m,{value:"active",children:t("agents:form.status.active")}),e.jsx(m,{value:"inactive",children:t("agents:form.status.inactive")}),e.jsx(m,{value:"training",children:t("agents:form.status.training")})]})})}),e.jsx(i,{span:24,children:e.jsx(n.Item,{name:"tags",label:t("agents:form.fields.tags"),children:e.jsx(k,{mode:"tags",placeholder:t("agents:form.placeholders.tags"),style:{width:"100%"}})})})]})},{key:"prompts",label:t("agents:form.tabs.prompts"),icon:e.jsx(ce,{}),children:te()},{key:"model",label:t("agents:form.tabs.model"),icon:e.jsx(de,{}),children:e.jsxs("div",{children:[se(),e.jsx(me,{}),e.jsxs(c,{strong:!0,children:[t("agents:form.models.parameterConfig"),"："]}),e.jsxs(F,{gutter:16,style:{marginTop:16},children:[e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["model","config","temperature"],label:"Temperature",tooltip:t("agents:form.models.temperatureTooltip"),children:e.jsx(z,{min:0,max:2,step:.1,marks:{0:"0",1:"1",2:"2"}})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["model","config","maxTokens"],label:"Max Tokens",tooltip:t("agents:form.models.maxTokensTooltip"),children:e.jsx(P,{min:1,max:4096,style:{width:"100%"}})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["model","config","topP"],label:"Top P",tooltip:t("agents:form.models.topPTooltip"),children:e.jsx(z,{min:0,max:1,step:.1,marks:{0:"0",.5:"0.5",1:"1"}})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["model","config","frequencyPenalty"],label:"Frequency Penalty",tooltip:t("agents:form.models.frequencyPenaltyTooltip"),children:e.jsx(z,{min:-2,max:2,step:.1,marks:{"-2":"-2",0:"0",2:"2"}})})})]})]})},{key:"mcp",label:t("agents:form.tabs.mcpServer"),icon:e.jsx(pe,{}),children:ae()},{key:"settings",label:t("agents:form.tabs.settings"),icon:e.jsx(H,{}),children:e.jsxs(F,{gutter:24,children:[e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["settings","autoStart"],label:t("agents:form.settings.autoStart"),valuePropName:"checked",children:e.jsx(ge,{})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["settings","maxConcurrency"],label:t("agents:form.settings.maxConcurrency"),children:e.jsx(P,{min:1,max:100})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["settings","timeout"],label:t("agents:form.settings.timeout"),children:e.jsx(P,{min:5,max:300})})}),e.jsx(i,{span:12,children:e.jsx(n.Item,{name:["settings","retryCount"],label:t("agents:form.settings.retryCount"),children:e.jsx(P,{min:0,max:10})})}),e.jsx(i,{span:24,children:e.jsx(n.Item,{name:["settings","logLevel"],label:t("agents:form.settings.logLevel"),children:e.jsxs(k,{children:[e.jsx(m,{value:"debug",children:"Debug"}),e.jsx(m,{value:"info",children:"Info"}),e.jsx(m,{value:"warn",children:"Warn"}),e.jsx(m,{value:"error",children:"Error"})]})})})]})}];return e.jsx(n,{id:"ai-agent-form",form:p,layout:"vertical",onFinish:X,initialValues:{type:"chat",status:"active",model:{config:{temperature:.7,maxTokens:2048,topP:1,frequencyPenalty:0,presencePenalty:0}},settings:{autoStart:!0,maxConcurrency:10,timeout:30,retryCount:3,logLevel:"info"}},children:e.jsx(ke,{children:e.jsx(fe,{activeKey:g,onChange:D,items:re})})})},{Title:Pe,Paragraph:Ce}=V,Ie=o.div`
  padding: 24px;
  background: var(--content-bg);
  min-height: calc(100vh - 64px);
`,we=o.div`
  margin-bottom: 24px;
`,De=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Ne=o.div`
  flex: 1;
`,Ae=o.div`
  text-align: right;
`,Ee=()=>{const{t:s}=Y(["agents","common"]),h=oe(),{id:T}=ne(),t=!!T,[p,g]=d.useState(!1),[D,f]=d.useState();d.useEffect(()=>{je(s(t?"agents:form.editTitle":"agents:form.createTitle")),t&&b()},[t,T,s]);const b=async()=>{g(!0);try{const u={id:T,name:s("agents:form.mockData.customerServiceName"),description:s("agents:form.mockData.customerServiceDescription"),type:"chat",status:"active",model:{provider:"openai",modelName:"gpt-4",version:"gpt-4-0613",config:{temperature:.7,maxTokens:2048,topP:1,frequencyPenalty:0,presencePenalty:0}},prompts:{system:s("agents:form.mockData.systemPrompt"),templates:[s("agents:form.mockData.template1"),s("agents:form.mockData.template2")],variables:{company_name:s("agents:form.mockData.companyName"),support_email:"support@example.com"}},mcpServers:["database-server","file-server"],capabilities:["text-generation","conversation","task-automation"],settings:{autoStart:!0,maxConcurrency:5,timeout:3e4,retryCount:3,logLevel:"info"},tags:["customer-service","chat","support"]};f(u)}catch{I.error(s("agents:form.messages.loadDataFailed"))}finally{g(!1)}},x=async u=>{g(!0);try{await new Promise(v=>setTimeout(v,1e3)),I.success(s(t?"agents:form.messages.updateSuccess":"agents:form.messages.createSuccess")),h("/ai-agents")}catch{I.error(s(t?"agents:form.messages.updateFailed":"agents:form.messages.createFailed"))}finally{g(!1)}};return e.jsxs(Ie,{className:"ai-agent-form-page",children:[e.jsxs(C,{className:"page-breadcrumb",children:[e.jsx(C.Item,{children:e.jsx(he,{})}),e.jsx(C.Item,{children:e.jsx("a",{onClick:()=>h("/ai-agents"),children:s("agents:title")})}),e.jsx(C.Item,{children:s(t?"agents:form.editTitle":"agents:form.createTitle")})]}),e.jsx(we,{children:e.jsx(De,{children:e.jsxs(Ne,{children:[e.jsx(Pe,{className:"page-title",level:2,children:e.jsxs(J,{children:[e.jsx(be,{className:"title-icon"}),s(t?"agents:form.editTitle":"agents:form.createTitle")]})}),e.jsx(Ce,{className:"page-subtitle",children:s(t?"agents:form.editSubtitle":"agents:form.createSubtitle")})]})})}),e.jsx(Se,{initialData:D,onSubmit:x,loading:p}),e.jsx(w,{className:"action-card",children:e.jsx(Ae,{children:e.jsxs(J,{children:[e.jsx(Q,{onClick:()=>h("/ai-agents"),children:s("common:cancel")}),e.jsx(Q,{type:"primary",loading:p,icon:e.jsx(ve,{}),form:"ai-agent-form",htmlType:"submit",children:s(t?"agents:form.updateAgent":"agents:form.createAgent")})]})})})]})};export{Ee as default};
