import{c as Q,u as X,b as Z,j as e,d as n}from"./index-Ds4hQBUW.js";import{aj as ye,r as h,ap as O,t as U,j as z,u as G,B,v as be,w as je,aH as $e,F as ve,aI as Ce,G as ke,aJ as we,aK as Ie,f as Re,aL as Ae,g as E,p as Se,a1 as M,as as L,O as De,V as ee,a as W,T as te,i as se,A as Te,S as R,a9 as u,n as ze,o as Me,d as w,C as x,W as Be,M as J,af as ae,l as _,aM as K,aN as Pe,x as l,a5 as j,ab as Fe,q as V,ai as D}from"./antd-Beg1odhe.js";import{s as Ne}from"./index-Daowydkz.js";import{S as Ve}from"./SearchFilterBar-o2SMI6sp.js";import"./vendor-DJG_os-6.js";const{Text:qe,Paragraph:Oe}=te,Ee=n(se)`
  height: 100%;
  min-height: 420px;
  background: ${t=>t.$isDark?"#141414":"#ffffff"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: ${t=>t.$isDark?"0 2px 8px rgba(0, 0, 0, 0.3)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${t=>t.$isDark?"0 8px 24px rgba(255, 255, 255, 0.12)":"0 8px 24px rgba(0, 0, 0, 0.12)"};
    border-color: ${t=>t.$isDark?"#177ddc":"#40a9ff"};
  }
  
  .ant-card-body {
    padding: 24px;
    background: ${t=>t.$isDark?"#141414":"#ffffff"};
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .ant-card-actions {
    background: ${t=>t.$isDark?"#1f1f1f":"#fafafa"};
    border-top: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
    padding: 12px 24px;
    
    li {
      border-right: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
      margin: 0;
      
      &:last-child {
        border-right: none;
      }
    }
    
    .ant-btn {
      color: ${t=>t.$isDark?"#8c8c8c":"#666666"};
      border: none;
      background: transparent;
      
      &:hover {
        color: ${t=>t.$isDark?"#177ddc":"#40a9ff"};
        background: ${t=>t.$isDark?"rgba(23, 125, 220, 0.1)":"rgba(64, 169, 255, 0.1)"};
        transform: scale(1.05);
      }
    }
  }
  
  .card-actions {
    margin-top: 10px;
    padding-top: 10px;
    border-top: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
    display: flex;
    justify-content: flex-end;
    
    .ant-btn {
      color: ${t=>t.$isDark?"#8c8c8c":"#666"};
      border: none;
      background: transparent;
      
      &:hover {
        color: ${t=>t.$isDark?"#177ddc":"#40a9ff"};
        background: ${t=>t.$isDark?"rgba(23, 125, 220, 0.1)":"rgba(64, 169, 255, 0.1)"};
        transform: scale(1.05);
      }
    }
  }
`,Le=n.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,We=n.div`
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`,_e=n(Te)`
  background: linear-gradient(135deg, ${t=>t.$bgColor}, ${t=>t.$bgColor}dd) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px ${t=>t.$bgColor}40;
  border: 2px solid ${t=>t.$bgColor}20;
  
  .anticon {
    color: #ffffff !important;
    font-size: 24px;
  }
  
  svg {
    color: #ffffff !important;
  }
`,Ue=n.div`
  flex: 1;
  min-width: 0;
`,He=n.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${t=>t.$isDark?"#ffffff":"#262626"};
  line-height: 1.4;
  word-break: break-word;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`,Ge=n.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`,Y=n(U)`
  border-radius: 6px;
  font-size: 12px;
  padding: 2px 8px;
  margin: 0;
  
  ${t=>t.$bgColor&&`
    background-color: ${t.$bgColor} !important;
    border: 1px solid ${t.$borderColor} !important;
    color: ${t.$textColor} !important;
  `}
  
  .anticon {
    color: ${t=>t.$textColor||"inherit"} !important;
    margin-right: 4px;
  }
`,Je=n.div`
  margin: 16px 0;
  padding: 14px;
  background: ${t=>t.$isDark?"#1f1f1f":"#fafafa"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px;
  
  .ant-space {
    width: 100%;
    justify-content: space-between;
  }
  
  .ant-space-item {
    flex: 1;
    text-align: center;
    min-width: 0;
  }
`;n.span`
  color: ${t=>t.$isDark?"#434343":"#d9d9d9"};
  font-weight: 300;
`;n.span`
  color: ${t=>t.$isDark?"#8c8c8c":"#666"};
  font-size: 12px;
`;n(R)`
  .ant-statistic-content-value {
    font-size: 14px !important;
    font-weight: 600 !important;
    color: ${t=>t.$isDark?"#ffffff":"#262626"} !important;
    white-space: nowrap;
  }
  
  .ant-statistic-content-suffix {
    font-size: 12px !important;
    color: ${t=>t.$isDark?"#8c8c8c":"#666"} !important;
  }
  
  .ant-statistic-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;const Ke=n(Oe)`
  margin: 12px 0 !important;
  color: ${t=>t.$isDark?"#8c8c8c":"#666"} !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  
  .ant-typography {
    margin-bottom: 0 !important;
  }
`,Ye=n.div`
  margin: 12px 0;
  
  .ant-tag {
    margin: 0 4px 4px 0;
    border-radius: 4px;
    font-size: 12px;
  }
`,Qe=n.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
  padding-top: 12px;
  gap: 4px;
`;n(qe)`
  font-size: 12px !important;
  color: ${t=>t.$isDark?"#8c8c8c":"#999"} !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  
  &:last-child {
    text-align: right;
  }
`;const Xe=n.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  
  ${t=>{switch(t.status){case"running":return"background-color: #52c41a; box-shadow: 0 0 6px #52c41a60;";case"stopped":return"background-color: #ff4d4f; box-shadow: 0 0 6px #ff4d4f60;";case"paused":return"background-color: #faad14; box-shadow: 0 0 6px #faad1460;";default:return"background-color: #d9d9d9;"}}}
`,Ze=t=>({monitor:{name:t("agents:types.monitor"),color:"#1890ff",bgColor:"#e6f7ff",icon:e.jsx(L,{})},analysis:{name:t("agents:types.analysis"),color:"#52c41a",bgColor:"#f6ffed",icon:e.jsx(M,{})},deployment:{name:t("agents:types.deployment"),color:"#722ed1",bgColor:"#f9f0ff",icon:e.jsx(Se,{})},optimization:{name:t("agents:types.optimization"),color:"#fa8c16",bgColor:"#fff7e6",icon:e.jsx(E,{})},security:{name:t("agents:types.security"),color:"#ff4d4f",bgColor:"#fff2f0",icon:e.jsx(Ae,{})},backup:{name:t("agents:types.backup"),color:"#13c2c2",bgColor:"#e6fffb",icon:e.jsx(Re,{})},gateway:{name:t("agents:types.gateway"),color:"#2f54eb",bgColor:"#f0f5ff",icon:e.jsx(Ie,{})},planning:{name:t("agents:types.planning"),color:"#eb2f96",bgColor:"#fff0f6",icon:e.jsx(we,{})},diagnosis:{name:t("agents:types.diagnosis"),color:"#fa541c",bgColor:"#fff2e8",icon:e.jsx(ke,{})},config:{name:t("agents:types.config"),color:"#a0d911",bgColor:"#fcffe6",icon:e.jsx(Ce,{})},traffic:{name:t("agents:types.traffic"),color:"#fadb14",bgColor:"#feffe6",icon:e.jsx(ve,{})},cleanup:{name:t("agents:types.cleanup"),color:"#8c8c8c",bgColor:"#f5f5f5",icon:e.jsx($e,{})}}),et=(t,s)=>({running:{text:s("agents:status.running"),color:"#52c41a",bgColor:"#f6ffed",icon:e.jsx(W,{})},stopped:{text:s("agents:status.stopped"),color:"#ff4d4f",bgColor:"#fff2f0",icon:e.jsx(ee,{})},paused:{text:s("agents:status.paused"),color:"#faad14",bgColor:"#fff7e6",icon:e.jsx(De,{})}})[t],tt=(t,s)=>({monitor:s?"#1890ff":"#4096ff",analysis:s?"#52c41a":"#73d13d",deployment:s?"#722ed1":"#9254de",optimization:s?"#fa8c16":"#ffa940",security:s?"#ff4d4f":"#ff7875",backup:s?"#13c2c2":"#36cfc9",gateway:s?"#2f54eb":"#597ef7",planning:s?"#eb2f96":"#f759ab",diagnosis:s?"#fa541c":"#ff7a45",config:s?"#a0d911":"#b7eb8f",traffic:s?"#fadb14":"#ffd666",cleanup:s?"#8c8c8c":"#bfbfbf"})[t]||(s?"#1890ff":"#4096ff"),st=({agent:t,onEdit:s,onDelete:v,onStart:A,onStop:P,onView:S})=>{const{currentTheme:c}=Q(d=>d.theme),{t:f}=X(["common"]);ye.useToken();const C=Z(),i=c==="dark",k=h.useMemo(()=>Ze(f),[f]),g=et(t.status,f),p=k[t.type],F=tt(t.type,i);if(!p)return console.error("Unknown agent type:",t.type),null;const y=(d,a)=>{switch(a.stopPropagation(),d){case"edit":s(t);break;case"delete":v(t.id);break;case"start":A(t.id);break;case"stop":P(t.id);break;case"view":C(`/ai-agents/detail/${t.id}`);break}};return e.jsxs(Ee,{$isDark:i,hoverable:!0,onClick:()=>S(t),children:[e.jsxs(Le,{children:[e.jsx(We,{children:e.jsx(_e,{size:56,icon:e.jsx(O,{}),$bgColor:F})}),e.jsxs(Ue,{children:[e.jsx(He,{$isDark:i,children:t.name}),e.jsxs(Ge,{children:[e.jsx(Y,{color:p.color,icon:p.icon,$bgColor:p.bgColor,$borderColor:p.color,$textColor:p.color,children:p.name}),e.jsxs(Y,{color:g.color,icon:g.icon,$bgColor:g.bgColor,$borderColor:g.color,$textColor:g.color,children:[e.jsx(Xe,{status:t.status}),g.text]})]})]})]}),e.jsx(Ke,{$isDark:i,ellipsis:{rows:2},children:t.description}),e.jsxs(Je,{$isDark:i,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[e.jsxs("span",{style:{color:i?"#8c8c8c":"#666",fontSize:"12px"},children:[f("agents:stats.tasksCompleted"),":"]}),e.jsx("span",{style:{color:i?"#ffffff":"#262626",fontSize:"14px",fontWeight:"bold"},children:t.stats.tasksCompleted})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[e.jsxs("span",{style:{color:i?"#8c8c8c":"#666",fontSize:"12px"},children:[f("agents:stats.successRate"),":"]}),e.jsxs("span",{style:{color:i?"#ffffff":"#262626",fontSize:"14px",fontWeight:"bold"},children:[t.stats.successRate,"%"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{style:{color:i?"#8c8c8c":"#666",fontSize:"12px"},children:[f("agents:stats.responseTime"),":"]}),e.jsxs("span",{style:{color:i?"#ffffff":"#262626",fontSize:"14px",fontWeight:"bold"},children:[t.stats.avgResponseTime,"ms"]})]})]}),t.tags&&t.tags.length>0&&e.jsx(Ye,{children:t.tags.map(d=>e.jsx(U,{children:d},d))}),e.jsxs(Qe,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsxs("span",{style:{color:i?"#8c8c8c":"#999",fontSize:"12px"},children:[f("agents:lastActive"),":"]}),e.jsx("span",{style:{color:i?"#8c8c8c":"#999",fontSize:"12px"},children:t.lastActive})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsxs("span",{style:{color:i?"#8c8c8c":"#999",fontSize:"12px"},children:[f("agents:uptime"),":"]}),e.jsx("span",{style:{color:i?"#8c8c8c":"#999",fontSize:"12px"},children:t.stats.uptime})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(z,{children:[e.jsx(G,{title:f("common:view"),children:e.jsx(B,{type:"text",icon:e.jsx(be,{}),size:"small",onClick:d=>y("view",d)})}),e.jsx(G,{title:f("common:edit"),children:e.jsx(B,{type:"text",icon:e.jsx(je,{}),size:"small",onClick:d=>y("edit",d)})})]})})]})},{Title:q,Paragraph:at,Text:I}=te,{Option:$}=_,{TextArea:ot}=ae,nt=n.div`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${t=>t.$isDark?"#000000":"#f5f5f5"};
`,T=n(se)`
  border-radius: 8px;
  box-shadow: ${t=>t.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  background: ${t=>t.$isDark?"#141414":"#ffffff"};

  .ant-card-body {
    padding: 16px;
  }

  .ant-statistic-title {
    color: ${t=>t.$isDark?"#ffffff":"#666666"};
  }

  .ant-statistic-content {
    color: ${t=>t.$isDark?"#ffffff":"#262626"};
  }
`,rt=n.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${t=>{switch(t.status){case"running":return"#52c41a";case"stopped":return"#f5222d";case"paused":return"#faad14";default:return"#d9d9d9"}}};
  display: inline-block;
  margin-right: 8px;
`,pt=()=>{var H;const t=Z(),{t:s}=X(["agents","common"]),[v,A]=h.useState(!1),[P,S]=h.useState(!1),[c,f]=h.useState(null),[C,i]=h.useState(""),[k,g]=h.useState("all"),[p,F]=h.useState("all"),[y]=u.useForm(),{currentTheme:d}=Q(o=>o.theme),a=d==="dark";h.useEffect(()=>{Ne(s("agents:title"))},[s]);const b=[{id:"1",name:"系统监控智能体",type:"monitor",status:"running",description:"负责监控系统健康状态，自动检测异常并发送告警",version:"v2.1.0",cpu:15.6,memory:256,tasks:1247,successRate:98.5,lastActive:"2024-06-15 14:30:25",createdAt:"2024-05-20",config:{maxConcurrency:10,timeout:30,retryCount:3,autoRestart:!0}},{id:"2",name:"日志分析智能体",type:"analysis",status:"running",description:"分析系统日志，识别异常模式和潜在问题",version:"v1.8.2",cpu:23.4,memory:512,tasks:856,successRate:96.8,lastActive:"2024-06-15 14:28:10",createdAt:"2024-04-15",config:{maxConcurrency:5,timeout:60,retryCount:2,autoRestart:!0}},{id:"3",name:"自动化部署智能体",type:"deployment",status:"paused",description:"自动化应用部署和配置管理",version:"v3.0.1",cpu:8.2,memory:128,tasks:342,successRate:99.2,lastActive:"2024-06-15 12:15:30",createdAt:"2024-06-01",config:{maxConcurrency:3,timeout:120,retryCount:1,autoRestart:!1}},{id:"4",name:"性能优化智能体",type:"optimization",status:"stopped",description:"分析系统性能瓶颈，提供优化建议",version:"v1.5.0",cpu:0,memory:0,tasks:128,successRate:94.7,lastActive:"2024-06-14 18:45:12",createdAt:"2024-03-10",config:{maxConcurrency:2,timeout:180,retryCount:3,autoRestart:!1}},{id:"5",name:"安全扫描智能体",type:"security",status:"running",description:"执行安全漏洞扫描和威胁检测，保障系统安全",version:"v2.3.1",cpu:18.9,memory:384,tasks:673,successRate:97.3,lastActive:"2024-06-15 14:25:45",createdAt:"2024-05-05",config:{maxConcurrency:8,timeout:90,retryCount:2,autoRestart:!0}},{id:"6",name:"数据备份智能体",type:"backup",status:"running",description:"自动化数据备份和恢复管理，确保数据安全",version:"v1.9.3",cpu:12.3,memory:192,tasks:445,successRate:99.8,lastActive:"2024-06-15 14:20:15",createdAt:"2024-04-20",config:{maxConcurrency:4,timeout:300,retryCount:3,autoRestart:!0}},{id:"7",name:"API网关智能体",type:"gateway",status:"running",description:"智能API路由和负载均衡，优化请求分发",version:"v2.0.5",cpu:31.7,memory:768,tasks:2156,successRate:99.1,lastActive:"2024-06-15 14:32:08",createdAt:"2024-05-15",config:{maxConcurrency:20,timeout:15,retryCount:1,autoRestart:!0}},{id:"8",name:"容量规划智能体",type:"planning",status:"paused",description:"分析资源使用趋势，提供容量规划建议",version:"v1.4.2",cpu:5.8,memory:96,tasks:89,successRate:95.5,lastActive:"2024-06-15 10:45:30",createdAt:"2024-03-25",config:{maxConcurrency:2,timeout:240,retryCount:2,autoRestart:!1}},{id:"9",name:"故障诊断智能体",type:"diagnosis",status:"running",description:"智能故障诊断和根因分析，快速定位问题",version:"v2.2.0",cpu:21.4,memory:512,tasks:567,successRate:96.2,lastActive:"2024-06-15 14:18:55",createdAt:"2024-04-30",config:{maxConcurrency:6,timeout:120,retryCount:3,autoRestart:!0}},{id:"10",name:"配置管理智能体",type:"config",status:"stopped",description:"自动化配置管理和版本控制，确保配置一致性",version:"v1.7.1",cpu:0,memory:0,tasks:234,successRate:98.9,lastActive:"2024-06-14 16:20:12",createdAt:"2024-03-15",config:{maxConcurrency:3,timeout:60,retryCount:2,autoRestart:!1}},{id:"11",name:"流量分析智能体",type:"traffic",status:"running",description:"实时流量分析和异常检测，优化网络性能",version:"v1.6.4",cpu:16.2,memory:320,tasks:789,successRate:97.8,lastActive:"2024-06-15 14:29:33",createdAt:"2024-05-10",config:{maxConcurrency:12,timeout:45,retryCount:2,autoRestart:!0}},{id:"12",name:"资源清理智能体",type:"cleanup",status:"paused",description:"定期清理无用资源和临时文件，释放存储空间",version:"v1.3.0",cpu:3.1,memory:64,tasks:156,successRate:99.4,lastActive:"2024-06-15 08:30:00",createdAt:"2024-02-28",config:{maxConcurrency:1,timeout:600,retryCount:1,autoRestart:!1}}],N={monitor:{name:s("agents:types.monitor"),color:"blue",icon:e.jsx(L,{})},analysis:{name:s("agents:types.analysis"),color:"green",icon:e.jsx(M,{})},deployment:{name:s("agents:types.deployment"),color:"purple",icon:e.jsx(V,{})},optimization:{name:s("agents:types.optimization"),color:"orange",icon:e.jsx(E,{})},security:{name:s("agents:types.security"),color:"red",icon:e.jsx(ee,{})},backup:{name:s("agents:types.backup"),color:"cyan",icon:e.jsx(W,{})},gateway:{name:s("agents:types.gateway"),color:"geekblue",icon:e.jsx(V,{})},planning:{name:s("agents:types.planning"),color:"magenta",icon:e.jsx(M,{})},diagnosis:{name:s("agents:types.diagnosis"),color:"volcano",icon:e.jsx(L,{})},config:{name:s("agents:types.config"),color:"lime",icon:e.jsx(V,{})},traffic:{name:s("agents:types.traffic"),color:"gold",icon:e.jsx(M,{})},cleanup:{name:s("agents:types.cleanup"),color:"gray",icon:e.jsx(Fe,{})}},oe=o=>{const m={running:{color:a?"#52c41a":"green",text:s("agents:status.running"),bgColor:a?"rgba(82, 196, 26, 0.1)":void 0},stopped:{color:a?"#f5222d":"red",text:s("agents:status.stopped"),bgColor:a?"rgba(245, 34, 45, 0.1)":void 0},paused:{color:a?"#faad14":"orange",text:s("agents:status.paused"),bgColor:a?"rgba(250, 173, 20, 0.1)":void 0}}[o];return e.jsxs(U,{color:m.color,style:m.bgColor?{backgroundColor:m.bgColor,border:`1px solid ${m.color}`,color:m.color}:{},children:[e.jsx(rt,{status:o}),m.text]})},ne=()=>{t("/ai-agents/create")},re=o=>{t(`/ai-agents/edit/${o.id}`)},ce=o=>{f(o),S(!0)},ie=o=>{D.success("智能体启动成功")},le=o=>{D.success("智能体停止成功")},fe=o=>{D.success("智能体删除成功")},de=async()=>{try{const o=await y.validateFields();D.success("智能体创建成功"),A(!1),y.resetFields()}catch(o){console.error("表单验证失败:",o)}},pe=()=>b.filter(r=>{const m=r.name.toLowerCase().includes(C.toLowerCase())||r.description.toLowerCase().includes(C.toLowerCase()),me=k==="all"||r.status===k,he=p==="all"||r.type===p;return m&&me&&he}).map(r=>e.jsx(x,{xs:24,sm:24,lg:12,xl:8,children:e.jsx(st,{agent:{...r,stats:{tasksCompleted:r.tasks,successRate:r.successRate,avgResponseTime:Math.floor(Math.random()*200)+100,uptime:"2天3小时"}},onEdit:re,onDelete:fe,onStart:ie,onStop:le,onView:ce})},r.id)),xe=b.filter(o=>o.status==="running").length,ue=b.reduce((o,r)=>o+r.tasks,0),ge=b.reduce((o,r)=>o+r.successRate,0)/b.length;return e.jsxs(nt,{$isDark:a,className:"ai-agent-management-page",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[e.jsx(q,{level:2,style:{margin:0},children:e.jsxs(z,{children:[e.jsx(O,{}),s("agents:title")]})}),e.jsxs(z,{children:[e.jsx(B,{icon:e.jsx(ze,{}),children:s("common:refresh")}),e.jsx(B,{type:"primary",icon:e.jsx(Me,{}),onClick:ne,children:s("agents:createAgent")})]})]}),e.jsx(at,{style:{marginTop:0,marginBottom:24},children:s("agents:subtitle")}),e.jsxs(w,{gutter:16,style:{marginBottom:24},children:[e.jsx(x,{xs:24,sm:12,md:6,children:e.jsx(T,{$isDark:a,className:"agent-stats-primary",children:e.jsx(R,{title:s("agents:stats.totalAgents"),value:b.length,prefix:e.jsx(O,{})})})}),e.jsx(x,{xs:24,sm:12,md:6,children:e.jsx(T,{$isDark:a,className:"agent-stats-success",children:e.jsx(R,{title:s("agents:stats.runningAgents"),value:xe,prefix:e.jsx(Be,{})})})}),e.jsx(x,{xs:24,sm:12,md:6,children:e.jsx(T,{$isDark:a,className:"agent-stats-warning",children:e.jsx(R,{title:s("agents:stats.totalTasks"),value:ue,prefix:e.jsx(E,{})})})}),e.jsx(x,{xs:24,sm:12,md:6,children:e.jsx(T,{$isDark:a,className:"agent-stats-purple",children:e.jsx(R,{title:s("agents:stats.avgSuccessRate"),value:ge.toFixed(1),prefix:e.jsx(W,{})})})})]}),e.jsx(Ve,{searchValue:C,onSearchChange:i,searchPlaceholder:s("agents:searchPlaceholder"),filters:[{key:"status",value:k,onChange:g,placeholder:s("agents:filterByStatus"),width:120,options:[{value:"all",label:s("common:all")},{value:"running",label:s("agents:status.running")},{value:"paused",label:s("agents:status.paused")},{value:"stopped",label:s("agents:status.stopped")}]},{key:"type",value:p,onChange:F,placeholder:s("agents:filterByType"),width:140,options:[{value:"all",label:s("common:all")},...Object.entries(N).map(([o,r])=>({value:o,label:r.name}))]}]}),e.jsx(w,{gutter:[16,16],children:pe()}),e.jsx(J,{title:s("agents:createAgent"),open:v,onOk:de,onCancel:()=>A(!1),width:800,children:e.jsxs(u,{form:y,layout:"vertical",initialValues:{type:"monitor",maxConcurrency:5,timeout:60,retryCount:3,autoRestart:!0},children:[e.jsxs(w,{gutter:16,children:[e.jsx(x,{span:12,children:e.jsx(u.Item,{name:"name",label:"智能体名称",rules:[{required:!0,message:"请输入智能体名称"},{max:50,message:"名称不能超过50个字符"}],children:e.jsx(ae,{placeholder:"请输入智能体名称"})})}),e.jsx(x,{span:12,children:e.jsx(u.Item,{name:"type",label:"智能体类型",rules:[{required:!0,message:"请选择智能体类型"}],children:e.jsx(_,{placeholder:"请选择类型",children:Object.entries(N).map(([o,r])=>e.jsx($,{value:o,children:e.jsxs(z,{children:[r.icon,r.name]})},o))})})})]}),e.jsx(u.Item,{name:"description",label:"描述",rules:[{required:!0,message:"请输入智能体描述"},{max:200,message:"描述不能超过200个字符"}],children:e.jsx(ot,{rows:3,placeholder:"请输入智能体的功能描述"})}),e.jsxs(w,{gutter:16,children:[e.jsx(x,{span:12,children:e.jsx(u.Item,{name:"maxConcurrency",label:"最大并发数",rules:[{required:!0,message:"请设置最大并发数"}],children:e.jsx(K,{min:1,max:20,marks:{1:"1",5:"5",10:"10",20:"20"}})})}),e.jsx(x,{span:12,children:e.jsx(u.Item,{name:"timeout",label:"超时时间(秒)",rules:[{required:!0,message:"请设置超时时间"}],children:e.jsx(K,{min:10,max:300,marks:{10:"10s",60:"1m",180:"3m",300:"5m"}})})})]}),e.jsxs(w,{gutter:16,children:[e.jsx(x,{span:12,children:e.jsx(u.Item,{name:"retryCount",label:"重试次数",rules:[{required:!0,message:"请设置重试次数"}],children:e.jsxs(_,{children:[e.jsx($,{value:0,children:"不重试"}),e.jsx($,{value:1,children:"1次"}),e.jsx($,{value:2,children:"2次"}),e.jsx($,{value:3,children:"3次"}),e.jsx($,{value:5,children:"5次"})]})})}),e.jsx(x,{span:12,children:e.jsx(u.Item,{name:"autoRestart",label:"自动重启",valuePropName:"checked",children:e.jsx(Pe,{})})})]})]})}),e.jsx(J,{title:e.jsx("span",{style:{color:a?"#ffffff":"#262626"},children:"智能体详情"}),open:P,onCancel:()=>S(!1),footer:null,width:800,styles:{content:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#000000"}},children:c&&e.jsxs("div",{children:[e.jsxs(l,{bordered:!0,column:2,labelStyle:{backgroundColor:a?"#1f1f1f":"#fafafa",color:a?"#ffffff":"#262626"},contentStyle:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#262626"},children:[e.jsx(l.Item,{label:"名称",children:c.name}),e.jsx(l.Item,{label:"版本",children:c.version}),e.jsx(l.Item,{label:"类型",children:(H=N[c.type])==null?void 0:H.name}),e.jsx(l.Item,{label:"状态",children:oe(c.status)}),e.jsxs(l.Item,{label:"CPU使用率",children:[c.cpu,"%"]}),e.jsxs(l.Item,{label:"内存使用",children:[c.memory,"MB"]}),e.jsxs(l.Item,{label:"执行任务",children:[c.tasks,"次"]}),e.jsxs(l.Item,{label:"成功率",children:[c.successRate,"%"]}),e.jsx(l.Item,{label:"创建时间",span:2,children:c.createdAt}),e.jsx(l.Item,{label:"描述",span:2,children:c.description})]}),e.jsxs("div",{style:{marginTop:24},children:[e.jsx(q,{level:4,style:{color:a?"#ffffff":"#262626"},children:"配置信息"}),e.jsxs(l,{bordered:!0,column:2,labelStyle:{backgroundColor:a?"#1f1f1f":"#fafafa",color:a?"#ffffff":"#262626"},contentStyle:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#262626"},children:[e.jsx(l.Item,{label:"最大并发",children:c.config.maxConcurrency}),e.jsxs(l.Item,{label:"超时时间",children:[c.config.timeout,"秒"]}),e.jsxs(l.Item,{label:"重试次数",children:[c.config.retryCount,"次"]}),e.jsx(l.Item,{label:"自动重启",children:c.config.autoRestart?"启用":"禁用"})]})]}),e.jsxs("div",{style:{marginTop:24},children:[e.jsx(q,{level:4,style:{color:a?"#ffffff":"#262626"},children:"运行日志"}),e.jsxs(j,{children:[e.jsxs(j.Item,{color:"green",children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:30:25"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 智能体启动成功"})]}),e.jsxs(j.Item,{color:"blue",children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:28:10"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 执行监控任务 #1247"})]}),e.jsxs(j.Item,{color:"blue",children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:25:30"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 检测到系统异常，发送告警"})]}),e.jsxs(j.Item,{color:"orange",children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:20:15"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 任务执行超时，开始重试"})]}),e.jsxs(j.Item,{children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:15:00"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 智能体配置更新"})]})]})]})]})})]})};export{pt as default};
