import{a as d,j as e}from"./react-D_ZWy-Ho.js";import{c as B,d as l,A as re,a3 as y,W as se,_ as P,u as U,aC as i,U as z,V as n,az as V,a1 as A,q as W,a as ie,a7 as oe,bg as N,bm as $,an as ne,Y as le,bh as me,au as ce,bt as F,ap as de,aR as pe,ah as S,e as ge,a_ as fe,S as M,p as xe,B as L,bu as ue,aI as he}from"./react-dom-GpeNoQsX.js";import{s as be}from"./index-Daowydkz.js";import"./index-BquYqWj2.js";import"./vendor-VHja5XRA.js";import"./cytoscape-DXzeTOL3.js";import"./media-BPG7piku.js";import"./lodash-D08E6HgQ.js";import"./redux-CiqK6azd.js";import"./echarts-core-CW0Gv0IT.js";import"./antd-icons-CI4I6I7B.js";import"./dayjs-CrhenB4N.js";import"./emotion-BhZTwsuK.js";import"./mermaid-AggIEIwl.js";import"./d3-Dbz_rnoS.js";import"./i18n-CMVetavo.js";const{Text:ve,Paragraph:Ke}=B;l(re)`
  background-color: ${a=>a.$bgColor} !important;
  color: #ffffff !important;
  
  .anticon {
    color: #ffffff !important;
  }
  
  svg {
    color: #ffffff !important;
  }
`;l(y)`
  ${a=>a.$bgColor&&`
    background-color: ${a.$bgColor} !important;
    border: 1px solid ${a.$borderColor} !important;
    color: ${a.$textColor} !important;
  `}
  
  .anticon {
    color: ${a=>a.$textColor||"inherit"} !important;
  }
`;l.span`
  color: ${a=>a.$isDark?"#434343":"#d9d9d9"};
`;l.span`
  color: ${a=>a.$isDark?"#8c8c8c":"#666"};
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
  color: ${a=>a.$isDark?"#8c8c8c":"#999"} !important;
`;l(se)`
  .ant-statistic-content-value {
    font-size: 14px !important;
    color: ${a=>a.$isDark?"#ffffff":"#262626"} !important;
  }
`;l(P)`
  height: 100%;
  transition: all 0.3s ease;
  background: ${a=>a.$isDark?"#141414":"#ffffff"};
  border: ${a=>a.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
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
    background: ${a=>a.$isDark?"#141414":"#ffffff"};
  }
  
  /* actions区域样式 */
  .ant-card-actions {
    background: ${a=>a.$isDark?"#1f1f1f":"#fafafa"};
    border-top: ${a=>a.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
    
    li {
      border-right: ${a=>a.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
      
      &:last-child {
        border-right: none;
      }
    }
    
    .ant-btn {
      color: ${a=>a.$isDark?"#ffffff":"#595959"};
    }
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${a=>a.$isDark?"0 4px 12px rgba(255, 255, 255, 0.1)":"0 4px 12px rgba(0, 0, 0, 0.1)"};
    border-color: ${a=>a.$isDark?"#177ddc":"#40a9ff"};
  }
      
      &:hover {
        color: ${a=>a.$isDark?"#177ddc":"#40a9ff"};
        background: ${a=>a.$isDark?"rgba(23, 125, 220, 0.1)":"rgba(64, 169, 255, 0.1)"};
      }
      
      &.ant-btn-dangerous:hover {
        color: #ff4d4f;
        background: ${a=>(a.$isDark,"rgba(255, 77, 79, 0.1)")};
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
    color: ${a=>a.$isDark?"#ffffff":"#262626"};
    line-height: 1.4;
  }
  
  .agent-type {
    margin-top: 4px;
  }
  
  .agent-stats {
    margin: 16px 0;
    padding: 16px;
    background: ${a=>a.$isDark?"#1f1f1f":"#fafafa"};
    border: ${a=>a.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
    border-radius: 6px;
  }
  
  .agent-description {
    margin: 16px 0;
    color: ${a=>a.$isDark?"#8c8c8c":"#666"};
    font-size: 13px;
    line-height: 1.5;
  }
  
  .agent-tags {
    margin: 16px 0;
  }
  
  .agent-actions {
    margin-top: 16px;
    padding-top: 16px;
    border-top: ${a=>a.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
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
`;const{Title:Ge,Text:m,Paragraph:E}=B,{Option:c}=A,{TextArea:Y}=V,je=l(P)`
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
`,Ae=l.div`
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
`,ke=({initialData:a,onSubmit:b,loading:k=!1})=>{const{t}=U(),[g]=i.useForm(),[f,C]=d.useState("basic"),[x,v]=d.useState("template"),[u,h]=d.useState(""),[j,_]=d.useState(""),[T,K]=d.useState(""),[G,I]=d.useState([]),[w,D]=d.useState({});d.useEffect(()=>{a&&(g.setFieldsValue(a),K(`${a.model.provider}-${a.model.modelName}`),I(a.mcpServers),_(a.prompts.system),D(a.prompts.variables),a.prompts.templates.length>0?(v("template"),h(a.prompts.templates[0])):v("custom"))},[a,g]);const R=[{id:"customer-service-template",name:t("aiAgent.form.promptTemplates.customerService.name"),description:t("aiAgent.form.promptTemplates.customerService.description"),content:t("aiAgent.form.promptTemplates.customerService.content"),variables:["company_name","service_hours"],category:t("aiAgent.form.promptTemplates.categories.dialogue")},{id:"data-analysis-template",name:t("aiAgent.form.promptTemplates.dataAnalysis.name"),description:t("aiAgent.form.promptTemplates.dataAnalysis.description"),content:t("aiAgent.form.promptTemplates.dataAnalysis.content"),variables:[],category:t("aiAgent.form.promptTemplates.categories.analysis")},{id:"code-review-template",name:t("aiAgent.form.promptTemplates.codeReview.name"),description:t("aiAgent.form.promptTemplates.codeReview.description"),content:t("aiAgent.form.promptTemplates.codeReview.content"),variables:[],category:t("aiAgent.form.promptTemplates.categories.development")},{id:"monitoring-template",name:t("aiAgent.form.promptTemplates.monitoring.name"),description:t("aiAgent.form.promptTemplates.monitoring.description"),content:t("aiAgent.form.promptTemplates.monitoring.content"),variables:[],category:t("aiAgent.form.promptTemplates.categories.operations")}],O=[{id:"openai-gpt-4",provider:"OpenAI",name:"GPT-4",version:"gpt-4-0613",description:t("aiAgent.form.models.gpt4.description"),status:"available",pricing:"$0.03/1K tokens"},{id:"openai-gpt-3.5-turbo",provider:"OpenAI",name:"GPT-3.5 Turbo",version:"gpt-3.5-turbo-0613",description:t("aiAgent.form.models.gpt35.description"),status:"available",pricing:"$0.002/1K tokens"},{id:"anthropic-claude-3",provider:"Anthropic",name:"Claude 3",version:"claude-3-opus-20240229",description:t("aiAgent.form.models.claude3.description"),status:"available",pricing:"$0.015/1K tokens"},{id:"local-llama2",provider:t("aiAgent.form.models.localDeployment"),name:"Llama 2",version:"llama2-7b-chat",description:t("aiAgent.form.models.llama2.description"),status:"available",pricing:t("aiAgent.form.models.free")}],H=[{id:"database-mcp",name:t("aiAgent.form.mcpServers.database.name"),description:t("aiAgent.form.mcpServers.database.description"),status:"running",capabilities:["mysql","postgresql","mongodb"]},{id:"email-mcp",name:t("aiAgent.form.mcpServers.email.name"),description:t("aiAgent.form.mcpServers.email.description"),status:"running",capabilities:["smtp","imap","templates"]},{id:"file-mcp",name:t("aiAgent.form.mcpServers.file.name"),description:t("aiAgent.form.mcpServers.file.description"),status:"running",capabilities:["read","write","search"]},{id:"api-mcp",name:t("aiAgent.form.mcpServers.api.name"),description:t("aiAgent.form.mcpServers.api.description"),status:"running",capabilities:["http","rest","graphql"]},{id:"scheduler-mcp",name:t("aiAgent.form.mcpServers.scheduler.name"),description:t("aiAgent.form.mcpServers.scheduler.description"),status:"stopped",capabilities:["cron","interval","webhook"]}],J=async r=>{var s,o;try{const p={...r,id:a==null?void 0:a.id,model:{...r.model,provider:T.split("-")[0],modelName:T.split("-")[1],version:((s=O.find(q=>q.id===T))==null?void 0:s.version)||""},prompts:{system:x==="template"?((o=R.find(q=>q.id===u))==null?void 0:o.content)||"":j,templates:x==="template"?[u]:[],variables:w},mcpServers:G};await b(p)}catch{S.error("提交失败，请重试")}},Q=r=>{h(r);const s=R.find(o=>o.id===r);if(s){const o={};s.variables.forEach(p=>{o[p]=w[p]||""}),D(o)}},X=(r,s)=>{D(o=>({...o,[r]:s}))},Z=()=>e.jsxs(ye,{children:[e.jsxs(F.Group,{value:x,onChange:r=>v(r.target.value),style:{marginBottom:16},children:[e.jsx(F,{value:"template",children:t("aiAgent.form.prompts.useTemplate")}),e.jsx(F,{value:"custom",children:t("aiAgent.form.prompts.customPrompt")})]}),x==="template"?e.jsxs("div",{children:[e.jsxs(m,{strong:!0,children:[t("aiAgent.form.prompts.selectTemplate"),"："]}),e.jsx("div",{style:{marginTop:12},children:R.map(r=>e.jsxs("div",{className:`prompt-template-item ${u===r.id?"selected":""}`,onClick:()=>Q(r.id),children:[e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:e.jsxs("div",{style:{flex:1},children:[e.jsx(m,{strong:!0,children:r.name}),e.jsx(y,{color:"blue",style:{marginLeft:8},children:r.category}),e.jsx(E,{style:{margin:"4px 0",color:"#666"},children:r.description})]})}),u===r.id&&r.variables.length>0&&e.jsxs("div",{className:"prompt-variables",children:[e.jsxs(m,{strong:!0,children:[t("aiAgent.form.prompts.templateVariables"),"："]}),r.variables.map(s=>e.jsxs("div",{style:{marginTop:8},children:[e.jsxs(m,{children:[s,":"]}),e.jsx(V,{placeholder:t("aiAgent.form.prompts.enterVariableValue",{variable:s}),value:w[s]||"",onChange:o=>X(s,o.target.value),style:{marginTop:4}})]},s))]})]},r.id))})]}):e.jsxs("div",{children:[e.jsxs(m,{strong:!0,children:[t("aiAgent.form.prompts.customPrompt"),"："]}),e.jsx(Y,{rows:8,placeholder:t("aiAgent.form.prompts.customPromptPlaceholder"),value:j,onChange:r=>_(r.target.value),style:{marginTop:8}}),e.jsx(de,{message:t("aiAgent.form.prompts.tip"),description:t("aiAgent.form.prompts.customPromptTip"),type:"info",showIcon:!0,style:{marginTop:12}})]})]}),ee=()=>e.jsxs(Ae,{children:[e.jsxs(m,{strong:!0,children:[t("aiAgent.form.models.selectModel"),"："]}),e.jsx("div",{style:{marginTop:12},children:O.map(r=>e.jsx("div",{className:`model-item ${T===r.id?"selected":""}`,onClick:()=>K(r.id),children:e.jsxs("div",{className:"model-info",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:4},children:[e.jsxs(m,{strong:!0,children:[r.provider," - ",r.name]}),e.jsx(y,{color:r.status==="available"?"green":"red",style:{marginLeft:8},children:r.status==="available"?t("aiAgent.form.models.available"):t("aiAgent.form.models.unavailable")})]}),e.jsxs(m,{type:"secondary",style:{fontSize:12},children:[t("aiAgent.form.models.version"),": ",r.version," | ",t("aiAgent.form.models.pricing"),": ",r.pricing]}),e.jsx(E,{style:{margin:"4px 0 0 0",fontSize:12,color:"#666"},children:r.description})]})},r.id))})]}),te=()=>e.jsxs("div",{children:[e.jsxs(m,{strong:!0,children:[t("aiAgent.form.mcpServers.selectServers"),"："]}),e.jsx(E,{type:"secondary",style:{marginTop:4},children:t("aiAgent.form.mcpServers.description")}),e.jsx("div",{style:{marginTop:12},children:H.map(r=>e.jsx(P,{size:"small",style:{marginBottom:8},bodyStyle:{padding:12},children:e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:4},children:[e.jsx(pe,{checked:G.includes(r.id),onChange:s=>{s.target.checked?I(o=>[...o,r.id]):I(o=>o.filter(p=>p!==r.id))},children:e.jsx(m,{strong:!0,children:r.name})}),e.jsx(y,{color:r.status==="running"?"green":"red",style:{marginLeft:8},children:r.status==="running"?t("aiAgent.form.mcpServers.running"):t("aiAgent.form.mcpServers.stopped")})]}),e.jsx(m,{type:"secondary",style:{fontSize:12},children:r.description}),e.jsx("div",{style:{marginTop:4},children:r.capabilities.map(s=>e.jsx(y,{size:"small",style:{marginRight:4},children:s},s))})]})})},r.id))})]}),ae=[{key:"basic",label:t("aiAgent.form.tabs.basic"),icon:e.jsx(W,{}),children:e.jsxs(z,{gutter:24,children:[e.jsx(n,{span:24,children:e.jsx(i.Item,{name:"name",label:t("aiAgent.form.fields.name"),rules:[{required:!0,message:t("aiAgent.form.validation.nameRequired")}],children:e.jsx(V,{placeholder:t("aiAgent.form.placeholders.name")})})}),e.jsx(n,{span:24,children:e.jsx(i.Item,{name:"description",label:t("aiAgent.form.fields.description"),rules:[{required:!0,message:t("aiAgent.form.validation.descriptionRequired")}],children:e.jsx(Y,{rows:3,placeholder:t("aiAgent.form.placeholders.description")})})}),e.jsx(n,{span:12,children:e.jsx(i.Item,{name:"type",label:t("aiAgent.form.fields.type"),rules:[{required:!0,message:t("aiAgent.form.validation.typeRequired")}],children:e.jsxs(A,{placeholder:t("aiAgent.form.placeholders.type"),children:[e.jsx(c,{value:"chat",children:t("aiAgent.form.types.chat")}),e.jsx(c,{value:"task",children:t("aiAgent.form.types.task")}),e.jsx(c,{value:"analysis",children:t("aiAgent.form.types.analysis")}),e.jsx(c,{value:"monitoring",children:t("aiAgent.form.types.monitoring")})]})})}),e.jsx(n,{span:12,children:e.jsx(i.Item,{name:"status",label:t("aiAgent.form.fields.status"),rules:[{required:!0,message:t("aiAgent.form.validation.statusRequired")}],children:e.jsxs(A,{placeholder:t("aiAgent.form.placeholders.status"),children:[e.jsx(c,{value:"active",children:t("aiAgent.form.status.active")}),e.jsx(c,{value:"inactive",children:t("aiAgent.form.status.inactive")}),e.jsx(c,{value:"training",children:t("aiAgent.form.status.training")})]})})}),e.jsx(n,{span:24,children:e.jsx(i.Item,{name:"tags",label:t("aiAgent.form.fields.tags"),children:e.jsx(A,{mode:"tags",placeholder:t("aiAgent.form.placeholders.tags"),style:{width:"100%"}})})})]})},{key:"prompts",label:t("aiAgent.form.tabs.prompts"),icon:e.jsx(ie,{}),children:Z()},{key:"model",label:t("aiAgent.form.tabs.model"),icon:e.jsx(ne,{}),children:e.jsxs("div",{children:[ee(),e.jsx(oe,{}),e.jsxs(m,{strong:!0,children:[t("aiAgent.form.models.parameterConfig"),"："]}),e.jsxs(z,{gutter:16,style:{marginTop:16},children:[e.jsx(n,{span:12,children:e.jsx(i.Item,{name:["model","config","temperature"],label:"Temperature",tooltip:t("aiAgent.form.models.temperatureTooltip"),children:e.jsx(N,{min:0,max:2,step:.1,marks:{0:"0",1:"1",2:"2"}})})}),e.jsx(n,{span:12,children:e.jsx(i.Item,{name:["model","config","maxTokens"],label:"Max Tokens",tooltip:t("aiAgent.form.models.maxTokensTooltip"),children:e.jsx($,{min:1,max:4096,style:{width:"100%"}})})}),e.jsx(n,{span:12,children:e.jsx(i.Item,{name:["model","config","topP"],label:"Top P",tooltip:t("aiAgent.form.models.topPTooltip"),children:e.jsx(N,{min:0,max:1,step:.1,marks:{0:"0",.5:"0.5",1:"1"}})})}),e.jsx(n,{span:12,children:e.jsx(i.Item,{name:["model","config","frequencyPenalty"],label:"Frequency Penalty",tooltip:t("aiAgent.form.models.frequencyPenaltyTooltip"),children:e.jsx(N,{min:-2,max:2,step:.1,marks:{"-2":"-2",0:"0",2:"2"}})})})]})]})},{key:"mcp",label:t("aiAgent.form.tabs.mcpServer"),icon:e.jsx(le,{}),children:te()},{key:"settings",label:t("aiAgent.form.tabs.settings"),icon:e.jsx(W,{}),children:e.jsxs(z,{gutter:24,children:[e.jsx(n,{span:12,children:e.jsx(i.Item,{name:["settings","autoStart"],label:t("aiAgent.form.settings.autoStart"),valuePropName:"checked",children:e.jsx(me,{})})}),e.jsx(n,{span:12,children:e.jsx(i.Item,{name:["settings","maxConcurrency"],label:t("aiAgent.form.settings.maxConcurrency"),children:e.jsx($,{min:1,max:100})})}),e.jsx(n,{span:12,children:e.jsx(i.Item,{name:["settings","timeout"],label:t("aiAgent.form.settings.timeout"),children:e.jsx($,{min:5,max:300})})}),e.jsx(n,{span:12,children:e.jsx(i.Item,{name:["settings","retryCount"],label:t("aiAgent.form.settings.retryCount"),children:e.jsx($,{min:0,max:10})})}),e.jsx(n,{span:24,children:e.jsx(i.Item,{name:["settings","logLevel"],label:t("aiAgent.form.settings.logLevel"),children:e.jsxs(A,{children:[e.jsx(c,{value:"debug",children:"Debug"}),e.jsx(c,{value:"info",children:"Info"}),e.jsx(c,{value:"warn",children:"Warn"}),e.jsx(c,{value:"error",children:"Error"})]})})})]})}];return e.jsx(i,{id:"ai-agent-form",form:g,layout:"vertical",onFinish:J,initialValues:{type:"chat",status:"active",model:{config:{temperature:.7,maxTokens:2048,topP:1,frequencyPenalty:0,presencePenalty:0}},settings:{autoStart:!0,maxConcurrency:10,timeout:30,retryCount:3,logLevel:"info"}},children:e.jsx(je,{children:e.jsx(ce,{activeKey:f,onChange:C,items:ae})})})},{Title:Te,Paragraph:$e}=B,Se=l.div`
  padding: 24px;
  background: #f5f5f5;
`,Oe=()=>{const{t:a}=U(),b=ge(),{id:k}=fe(),t=!!k,[g,f]=d.useState(!1),[C,x]=d.useState();d.useEffect(()=>{be(a(t?"aiAgent.form.editTitle":"aiAgent.form.createTitle")),t&&v()},[t,k,a]);const v=async()=>{f(!0);try{const h={id:k,name:a("aiAgent.form.mockData.customerServiceName"),description:a("aiAgent.form.mockData.customerServiceDescription"),type:"chat",status:"active",model:{provider:"openai",modelName:"gpt-4",version:"gpt-4-0613",config:{temperature:.7,maxTokens:2048,topP:1,frequencyPenalty:0,presencePenalty:0}},prompts:{system:a("aiAgent.form.mockData.systemPrompt"),templates:["customer-service-template"],variables:{company_name:a("aiAgent.form.mockData.companyName"),service_hours:"9:00-18:00"}},mcpServers:["database-mcp","email-mcp"],capabilities:["text-generation","question-answering","sentiment-analysis"],settings:{autoStart:!0,maxConcurrency:10,timeout:30,retryCount:3,logLevel:"info"},tags:[a("aiAgent.form.mockData.tags.customerService"),a("aiAgent.form.mockData.tags.dialogue"),a("aiAgent.form.mockData.tags.assistant")]};x(h)}catch{S.error(a("aiAgent.form.messages.loadDataFailed"))}finally{f(!1)}},u=async h=>{f(!0);try{await new Promise(j=>setTimeout(j,1e3)),S.success(a(t?"aiAgent.form.messages.updateSuccess":"aiAgent.form.messages.createSuccess")),b("/ai-agents")}catch{S.error(a(t?"aiAgent.form.messages.updateFailed":"aiAgent.form.messages.createFailed"))}finally{f(!1)}};return e.jsxs(Se,{children:[e.jsx("div",{style:{marginBottom:24},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx(Te,{level:2,style:{margin:0},children:e.jsxs(M,{children:[e.jsx(xe,{style:{color:"#1890ff"}}),a(t?"aiAgent.form.editTitle":"aiAgent.form.createTitle")]})}),e.jsx($e,{style:{marginTop:8,marginBottom:0,fontSize:16,color:"#666"},children:a(t?"aiAgent.form.editSubtitle":"aiAgent.form.createSubtitle")})]}),e.jsx(M,{children:e.jsx(L,{icon:e.jsx(ue,{}),onClick:()=>b("/ai-agents"),children:a("common.backToList")})})]})}),e.jsx(ke,{initialData:C,onSubmit:u,loading:g}),e.jsx(P,{children:e.jsx("div",{style:{textAlign:"right"},children:e.jsxs(M,{children:[e.jsx(L,{onClick:()=>b("/ai-agents"),children:a("common.cancel")}),e.jsx(L,{type:"primary",loading:g,icon:e.jsx(he,{}),form:"ai-agent-form",htmlType:"submit",children:a(t?"aiAgent.form.updateAgent":"aiAgent.form.createAgent")})]})})})]})};export{Oe as default};
