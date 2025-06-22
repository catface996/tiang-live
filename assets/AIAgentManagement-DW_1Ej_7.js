import{a as g,j as e}from"./react-D_ZWy-Ho.js";import{u as te,af as se,e as ae,p as O,a3 as K,S as T,T as G,B as M,a8 as ke,a9 as we,bc as Ae,aL as Ie,q as Se,aM as Re,m as De,bd as Te,X as ze,be as Me,Y as W,ak as Be,aS as z,aQ as N,d as r,aE as Pe,a4 as oe,K as H,c as ne,_ as re,A as Fe,W as A,aC as m,ai as Le,aa as Ve,U as C,V as u,aD as qe,aF as J,az as ie,a1 as Y,bf as Z,bg as Ee,ax as l,b4 as $,aW as Ue,an as E,ah as k,ap as Oe}from"./react-dom-CRymxTn5.js";import{s as We}from"./index-Daowydkz.js";import{u as ce}from"./index-ICAg9FmD.js";import{S as Ne}from"./SearchFilterBar-4BgSZdRI.js";import"./vendor-VHja5XRA.js";import"./cytoscape-DXzeTOL3.js";import"./media-BPG7piku.js";import"./lodash-D08E6HgQ.js";import"./redux-CiqK6azd.js";import"./echarts-core-CW0Gv0IT.js";import"./antd-icons-CI4I6I7B.js";import"./dayjs-CrhenB4N.js";import"./emotion-BhZTwsuK.js";import"./mermaid-AggIEIwl.js";import"./d3-Dbz_rnoS.js";import"./i18n-CMVetavo.js";const{Text:He,Paragraph:Ye}=ne,Ke=r(re)`
  height: 100%;
  min-height: 420px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
      transition: all 0.2s ease;
      
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
      transition: all 0.2s ease;
      
      &:hover {
        color: ${t=>t.$isDark?"#177ddc":"#40a9ff"};
        background: ${t=>t.$isDark?"rgba(23, 125, 220, 0.1)":"rgba(64, 169, 255, 0.1)"};
        transform: scale(1.05);
      }
    }
  }
`,Qe=r.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,Xe=r.div`
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`,_e=r(Fe)`
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
`,Ge=r.div`
  flex: 1;
  min-width: 0;
`,Je=r.div`
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
`,Ze=r.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`,ee=r(K)`
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
`,et=r.div`
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
`;r.span`
  color: ${t=>t.$isDark?"#434343":"#d9d9d9"};
  font-weight: 300;
`;r.span`
  color: ${t=>t.$isDark?"#8c8c8c":"#666"};
  font-size: 12px;
`;r(A)`
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
`;const tt=r(Ye)`
  margin: 12px 0 !important;
  color: ${t=>t.$isDark?"#8c8c8c":"#666"} !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  
  .ant-typography {
    margin-bottom: 0 !important;
  }
`,st=r.div`
  margin: 12px 0;
  
  .ant-tag {
    margin: 0 4px 4px 0;
    border-radius: 4px;
    font-size: 12px;
  }
`,at=r.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 16px;
  padding-top: 12px;
  gap: 4px;
`;r(He)`
  font-size: 12px !important;
  color: ${t=>t.$isDark?"#8c8c8c":"#999"} !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  
  &:last-child {
    text-align: right;
  }
`;const ot=r.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  
  ${t=>{switch(t.status){case"running":return"background-color: #52c41a; box-shadow: 0 0 6px #52c41a60;";case"stopped":return"background-color: #ff4d4f; box-shadow: 0 0 6px #ff4d4f60;";case"paused":return"background-color: #faad14; box-shadow: 0 0 6px #faad1460;";default:return"background-color: #d9d9d9;"}}}
`,nt=t=>({monitor:{name:t("agents:types.monitor"),color:"#1890ff",bgColor:"#e6f7ff",icon:e.jsx(N,{})},analysis:{name:t("agents:types.analysis"),color:"#52c41a",bgColor:"#f6ffed",icon:e.jsx(z,{})},deployment:{name:t("agents:types.deployment"),color:"#722ed1",bgColor:"#f9f0ff",icon:e.jsx(Be,{})},optimization:{name:t("agents:types.optimization"),color:"#fa8c16",bgColor:"#fff7e6",icon:e.jsx(W,{})},security:{name:t("agents:types.security"),color:"#ff4d4f",bgColor:"#fff2f0",icon:e.jsx(Me,{})},backup:{name:t("agents:types.backup"),color:"#13c2c2",bgColor:"#e6fffb",icon:e.jsx(ze,{})},gateway:{name:t("agents:types.gateway"),color:"#2f54eb",bgColor:"#f0f5ff",icon:e.jsx(Te,{})},planning:{name:t("agents:types.planning"),color:"#eb2f96",bgColor:"#fff0f6",icon:e.jsx(De,{})},diagnosis:{name:t("agents:types.diagnosis"),color:"#fa541c",bgColor:"#fff2e8",icon:e.jsx(Re,{})},config:{name:t("agents:types.config"),color:"#a0d911",bgColor:"#fcffe6",icon:e.jsx(Se,{})},traffic:{name:t("agents:types.traffic"),color:"#fadb14",bgColor:"#feffe6",icon:e.jsx(Ie,{})},cleanup:{name:t("agents:types.cleanup"),color:"#8c8c8c",bgColor:"#f5f5f5",icon:e.jsx(Ae,{})}}),rt=(t,s)=>({running:{text:s("agents:status.running"),color:"#52c41a",bgColor:"#f6ffed",icon:e.jsx(H,{})},stopped:{text:s("agents:status.stopped"),color:"#ff4d4f",bgColor:"#fff2f0",icon:e.jsx(oe,{})},paused:{text:s("agents:status.paused"),color:"#faad14",bgColor:"#fff7e6",icon:e.jsx(Pe,{})}})[t],it=(t,s)=>({monitor:s?"#1890ff":"#4096ff",analysis:s?"#52c41a":"#73d13d",deployment:s?"#722ed1":"#9254de",optimization:s?"#fa8c16":"#ffa940",security:s?"#ff4d4f":"#ff7875",backup:s?"#13c2c2":"#36cfc9",gateway:s?"#2f54eb":"#597ef7",planning:s?"#eb2f96":"#f759ab",diagnosis:s?"#fa541c":"#ff7a45",config:s?"#a0d911":"#b7eb8f",traffic:s?"#fadb14":"#ffd666",cleanup:s?"#8c8c8c":"#bfbfbf"})[t]||(s?"#1890ff":"#4096ff"),ct=({agent:t,onEdit:s,onDelete:I,onStart:Q,onStop:B,onView:S})=>{const{currentTheme:P}=ce(p=>p.theme),{t:f}=te(["common"]);se.useToken();const R=ae(),c=P==="dark",i=g.useMemo(()=>nt(f),[f]),h=rt(t.status,f),d=i[t.type],F=it(t.type,c);if(!d)return console.error("Unknown agent type:",t.type),null;const y=(p,j)=>{switch(j.stopPropagation(),p){case"edit":s(t);break;case"delete":I(t.id);break;case"start":Q(t.id);break;case"stop":B(t.id);break;case"view":R(`/ai-agents/detail/${t.id}`);break}};return e.jsxs(Ke,{$isDark:c,hoverable:!0,onClick:()=>S(t),children:[e.jsxs(Qe,{children:[e.jsx(Xe,{children:e.jsx(_e,{size:56,icon:e.jsx(O,{}),$bgColor:F})}),e.jsxs(Ge,{children:[e.jsx(Je,{$isDark:c,children:t.name}),e.jsxs(Ze,{children:[e.jsx(ee,{color:d.color,icon:d.icon,$bgColor:d.bgColor,$borderColor:d.color,$textColor:d.color,children:d.name}),e.jsxs(ee,{color:h.color,icon:h.icon,$bgColor:h.bgColor,$borderColor:h.color,$textColor:h.color,children:[e.jsx(ot,{status:t.status}),h.text]})]})]})]}),e.jsx(tt,{$isDark:c,ellipsis:{rows:2},children:t.description}),e.jsxs(et,{$isDark:c,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[e.jsxs("span",{style:{color:c?"#8c8c8c":"#666",fontSize:"12px"},children:[f("agents:stats.tasksCompleted"),":"]}),e.jsx("span",{style:{color:c?"#ffffff":"#262626",fontSize:"14px",fontWeight:"bold"},children:t.stats.tasksCompleted})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[e.jsxs("span",{style:{color:c?"#8c8c8c":"#666",fontSize:"12px"},children:[f("agents:stats.successRate"),":"]}),e.jsxs("span",{style:{color:c?"#ffffff":"#262626",fontSize:"14px",fontWeight:"bold"},children:[t.stats.successRate,"%"]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{style:{color:c?"#8c8c8c":"#666",fontSize:"12px"},children:[f("agents:stats.responseTime"),":"]}),e.jsxs("span",{style:{color:c?"#ffffff":"#262626",fontSize:"14px",fontWeight:"bold"},children:[t.stats.avgResponseTime,"ms"]})]})]}),t.tags&&t.tags.length>0&&e.jsx(st,{children:t.tags.map(p=>e.jsx(K,{children:p},p))}),e.jsxs(at,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsxs("span",{style:{color:c?"#8c8c8c":"#999",fontSize:"12px"},children:[f("agents:lastActive"),":"]}),e.jsx("span",{style:{color:c?"#8c8c8c":"#999",fontSize:"12px"},children:t.lastActive})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsxs("span",{style:{color:c?"#8c8c8c":"#999",fontSize:"12px"},children:[f("agents:uptime"),":"]}),e.jsx("span",{style:{color:c?"#8c8c8c":"#999",fontSize:"12px"},children:t.stats.uptime})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(T,{children:[e.jsx(G,{title:f("common:view"),children:e.jsx(M,{type:"text",icon:e.jsx(ke,{}),size:"small",onClick:p=>y("view",p)})}),e.jsx(G,{title:f("common:edit"),children:e.jsx(M,{type:"text",icon:e.jsx(we,{}),size:"small",onClick:p=>y("edit",p)})})]})})]})},{Title:U,Paragraph:lt,Text:w}=ne,{Option:v}=Y,{TextArea:ft}=ie,dt=r.div`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${t=>t.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,pt=r.div`
  margin-bottom: 24px;
  padding: 24px;
  background: ${t=>t.$isDark?"#141414":"#ffffff"};
  border-radius: 8px;
  box-shadow: ${t=>t.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  transition: all 0.3s ease;
`,D=r(re)`
  border-radius: 8px;
  box-shadow: ${t=>t.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  background: ${t=>t.$isDark?"#141414":"#ffffff"};
  transition: all 0.3s ease;
  
  .ant-card-body {
    padding: 16px;
  }
  
  .ant-statistic-title {
    color: ${t=>t.$isDark?"#ffffff":"#666666"};
  }
  
  .ant-statistic-content {
    color: ${t=>t.$isDark?"#ffffff":"#262626"};
  }
`,ut=r.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${t=>{switch(t.status){case"running":return"#52c41a";case"stopped":return"#f5222d";case"paused":return"#faad14";default:return"#d9d9d9"}}};
  display: inline-block;
  margin-right: 8px;
`,xt=r(Oe)`
  background: ${t=>t.$isDark?"#2a1f00":"#fffbe6"};
  border: ${t=>t.$isDark?"1px solid #594214":"1px solid #ffe58f"};
  
  .ant-alert-message {
    color: ${t=>t.$isDark?"#faad14":"#d48806"};
  }
  
  .ant-alert-description {
    color: ${t=>t.$isDark?"#d4b106":"#d48806"};
  }
`,zt=()=>{var _;const t=ae(),{t:s}=te(["agents","common"]),[I,Q]=g.useState(!1),[B,S]=g.useState(!1),[P,f]=g.useState(!1),[R,c]=g.useState(null),[i,h]=g.useState(null),[d,F]=g.useState(""),[y,p]=g.useState("all"),[j,le]=g.useState("all"),[L]=m.useForm(),{currentTheme:fe}=ce(o=>o.theme);se.useToken();const a=fe==="dark";g.useEffect(()=>{We(s("agents:title"))},[s]);const b=[{id:"1",name:"系统监控智能体",type:"monitor",status:"running",description:"负责监控系统健康状态，自动检测异常并发送告警",version:"v2.1.0",cpu:15.6,memory:256,tasks:1247,successRate:98.5,lastActive:"2024-06-15 14:30:25",createdAt:"2024-05-20",config:{maxConcurrency:10,timeout:30,retryCount:3,autoRestart:!0}},{id:"2",name:"日志分析智能体",type:"analysis",status:"running",description:"分析系统日志，识别异常模式和潜在问题",version:"v1.8.2",cpu:23.4,memory:512,tasks:856,successRate:96.8,lastActive:"2024-06-15 14:28:10",createdAt:"2024-04-15",config:{maxConcurrency:5,timeout:60,retryCount:2,autoRestart:!0}},{id:"3",name:"自动化部署智能体",type:"deployment",status:"paused",description:"自动化应用部署和配置管理",version:"v3.0.1",cpu:8.2,memory:128,tasks:342,successRate:99.2,lastActive:"2024-06-15 12:15:30",createdAt:"2024-06-01",config:{maxConcurrency:3,timeout:120,retryCount:1,autoRestart:!1}},{id:"4",name:"性能优化智能体",type:"optimization",status:"stopped",description:"分析系统性能瓶颈，提供优化建议",version:"v1.5.0",cpu:0,memory:0,tasks:128,successRate:94.7,lastActive:"2024-06-14 18:45:12",createdAt:"2024-03-10",config:{maxConcurrency:2,timeout:180,retryCount:3,autoRestart:!1}},{id:"5",name:"安全扫描智能体",type:"security",status:"running",description:"执行安全漏洞扫描和威胁检测，保障系统安全",version:"v2.3.1",cpu:18.9,memory:384,tasks:673,successRate:97.3,lastActive:"2024-06-15 14:25:45",createdAt:"2024-05-05",config:{maxConcurrency:8,timeout:90,retryCount:2,autoRestart:!0}},{id:"6",name:"数据备份智能体",type:"backup",status:"running",description:"自动化数据备份和恢复管理，确保数据安全",version:"v1.9.3",cpu:12.3,memory:192,tasks:445,successRate:99.8,lastActive:"2024-06-15 14:20:15",createdAt:"2024-04-20",config:{maxConcurrency:4,timeout:300,retryCount:3,autoRestart:!0}},{id:"7",name:"API网关智能体",type:"gateway",status:"running",description:"智能API路由和负载均衡，优化请求分发",version:"v2.0.5",cpu:31.7,memory:768,tasks:2156,successRate:99.1,lastActive:"2024-06-15 14:32:08",createdAt:"2024-05-15",config:{maxConcurrency:20,timeout:15,retryCount:1,autoRestart:!0}},{id:"8",name:"容量规划智能体",type:"planning",status:"paused",description:"分析资源使用趋势，提供容量规划建议",version:"v1.4.2",cpu:5.8,memory:96,tasks:89,successRate:95.5,lastActive:"2024-06-15 10:45:30",createdAt:"2024-03-25",config:{maxConcurrency:2,timeout:240,retryCount:2,autoRestart:!1}},{id:"9",name:"故障诊断智能体",type:"diagnosis",status:"running",description:"智能故障诊断和根因分析，快速定位问题",version:"v2.2.0",cpu:21.4,memory:512,tasks:567,successRate:96.2,lastActive:"2024-06-15 14:18:55",createdAt:"2024-04-30",config:{maxConcurrency:6,timeout:120,retryCount:3,autoRestart:!0}},{id:"10",name:"配置管理智能体",type:"config",status:"stopped",description:"自动化配置管理和版本控制，确保配置一致性",version:"v1.7.1",cpu:0,memory:0,tasks:234,successRate:98.9,lastActive:"2024-06-14 16:20:12",createdAt:"2024-03-15",config:{maxConcurrency:3,timeout:60,retryCount:2,autoRestart:!1}},{id:"11",name:"流量分析智能体",type:"traffic",status:"running",description:"实时流量分析和异常检测，优化网络性能",version:"v1.6.4",cpu:16.2,memory:320,tasks:789,successRate:97.8,lastActive:"2024-06-15 14:29:33",createdAt:"2024-05-10",config:{maxConcurrency:12,timeout:45,retryCount:2,autoRestart:!0}},{id:"12",name:"资源清理智能体",type:"cleanup",status:"paused",description:"定期清理无用资源和临时文件，释放存储空间",version:"v1.3.0",cpu:3.1,memory:64,tasks:156,successRate:99.4,lastActive:"2024-06-15 08:30:00",createdAt:"2024-02-28",config:{maxConcurrency:1,timeout:600,retryCount:1,autoRestart:!1}}],V={monitor:{name:s("agents:types.monitor"),color:"blue",icon:e.jsx(N,{})},analysis:{name:s("agents:types.analysis"),color:"green",icon:e.jsx(z,{})},deployment:{name:s("agents:types.deployment"),color:"purple",icon:e.jsx(E,{})},optimization:{name:s("agents:types.optimization"),color:"orange",icon:e.jsx(W,{})},security:{name:s("agents:types.security"),color:"red",icon:e.jsx(oe,{})},backup:{name:s("agents:types.backup"),color:"cyan",icon:e.jsx(H,{})},gateway:{name:s("agents:types.gateway"),color:"geekblue",icon:e.jsx(E,{})},planning:{name:s("agents:types.planning"),color:"magenta",icon:e.jsx(z,{})},diagnosis:{name:s("agents:types.diagnosis"),color:"volcano",icon:e.jsx(N,{})},config:{name:s("agents:types.config"),color:"lime",icon:e.jsx(E,{})},traffic:{name:s("agents:types.traffic"),color:"gold",icon:e.jsx(z,{})},cleanup:{name:s("agents:types.cleanup"),color:"gray",icon:e.jsx(Ue,{})}},de=o=>{const x={running:{color:a?"#52c41a":"green",text:s("agents:status.running"),bgColor:a?"rgba(82, 196, 26, 0.1)":void 0},stopped:{color:a?"#f5222d":"red",text:s("agents:status.stopped"),bgColor:a?"rgba(245, 34, 45, 0.1)":void 0},paused:{color:a?"#faad14":"orange",text:s("agents:status.paused"),bgColor:a?"rgba(250, 173, 20, 0.1)":void 0}}[o];return e.jsxs(K,{color:x.color,style:x.bgColor?{backgroundColor:x.bgColor,border:`1px solid ${x.color}`,color:x.color}:{},children:[e.jsx(ut,{status:o}),x.text]})},pe=()=>{t("/ai-agents/create")},ue=o=>{t(`/ai-agents/edit/${o.id}`)},xe=o=>{h(o),f(!0)},ge=o=>{k.success("智能体启动成功")},me=o=>{k.success("智能体停止成功")},he=o=>{k.success("智能体删除成功")},ye=async()=>{try{const o=await L.validateFields();R?k.success("智能体更新成功"):k.success("智能体创建成功"),S(!1),L.resetFields()}catch(o){console.error("表单验证失败:",o)}},be=()=>b.filter(n=>{const x=n.name.toLowerCase().includes(d.toLowerCase())||n.description.toLowerCase().includes(d.toLowerCase()),q=y==="all"||n.status===y,Ce=j==="all"||n.type===j;return x&&q&&Ce}).map(n=>e.jsx(u,{xs:24,sm:24,lg:12,xl:8,children:e.jsx(ct,{agent:{...n,stats:{tasksCompleted:n.tasks,successRate:n.successRate,avgResponseTime:Math.floor(Math.random()*200)+100,uptime:"2天3小时"}},onEdit:ue,onDelete:he,onStart:ge,onStop:me,onView:xe})},n.id)),je=b.filter(o=>o.status==="running").length,$e=b.reduce((o,n)=>o+n.tasks,0),ve=b.reduce((o,n)=>o+n.successRate,0)/b.length,X=b.reduce((o,n)=>o+n.cpu,0);return e.jsxs(dt,{$isDark:a,children:[e.jsx(pt,{$isDark:a,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(U,{level:2,style:{margin:0,color:a?"#ffffff":"#262626"},children:e.jsxs(T,{children:[e.jsx(O,{style:{color:a?"#177ddc":"#1890ff"}}),s("agents:title")]})}),e.jsx(lt,{style:{marginTop:8,marginBottom:0,fontSize:16,color:a?"#8c8c8c":"#666666"},children:s("agents:subtitle")})]}),e.jsxs(T,{children:[e.jsx(M,{icon:e.jsx(Le,{}),style:{color:a?"#ffffff":void 0,borderColor:a?"#434343":void 0,backgroundColor:a?"transparent":void 0},children:s("common:refresh")}),e.jsx(M,{type:"primary",icon:e.jsx(Ve,{}),onClick:pe,children:s("agents:createAgent")})]})]})}),e.jsxs(C,{gutter:16,style:{marginBottom:24},children:[e.jsx(u,{xs:24,sm:12,md:6,children:e.jsx(D,{$isDark:a,children:e.jsx(A,{title:s("agents:stats.totalAgents"),value:b.length,suffix:s("agents:stats.unit"),valueStyle:{color:"#1890ff"},prefix:e.jsx(O,{})})})}),e.jsx(u,{xs:24,sm:12,md:6,children:e.jsx(D,{$isDark:a,children:e.jsx(A,{title:s("agents:stats.runningAgents"),value:je,suffix:s("agents:stats.unit"),valueStyle:{color:"#52c41a"},prefix:e.jsx(qe,{})})})}),e.jsx(u,{xs:24,sm:12,md:6,children:e.jsx(D,{$isDark:a,children:e.jsx(A,{title:s("agents:stats.totalTasks"),value:$e,suffix:s("agents:stats.taskUnit"),valueStyle:{color:"#faad14"},prefix:e.jsx(W,{})})})}),e.jsx(u,{xs:24,sm:12,md:6,children:e.jsx(D,{$isDark:a,children:e.jsx(A,{title:s("agents:stats.avgSuccessRate"),value:ve.toFixed(1),suffix:"%",valueStyle:{color:"#722ed1"},prefix:e.jsx(H,{})})})})]}),X>60&&e.jsx(xt,{$isDark:a,message:s("agents:alerts.highCpuUsage"),description:s("agents:alerts.highCpuUsageDesc",{cpu:X.toFixed(1)}),type:"warning",showIcon:!0,closable:!0,style:{marginBottom:24}}),e.jsx(Ne,{searchValue:d,onSearchChange:F,searchPlaceholder:s("agents:searchPlaceholder"),filters:[{key:"status",value:y,onChange:p,placeholder:s("agents:filterByStatus"),width:120,options:[{value:"all",label:s("common:all")},{value:"running",label:s("agents:status.running")},{value:"paused",label:s("agents:status.paused")},{value:"stopped",label:s("agents:status.stopped")}]},{key:"type",value:j,onChange:le,placeholder:s("agents:filterByType"),width:140,options:[{value:"all",label:s("common:all")},...Object.entries(V).map(([o,n])=>({value:o,label:n.name}))]}],extraActions:e.jsx("div",{style:{textAlign:"right"},children:e.jsx("span",{style:{color:a?"#8c8c8c":"#666666",fontSize:"14px"},children:s("agents:totalFound",{count:b.filter(o=>{const n=o.name.toLowerCase().includes(d.toLowerCase())||o.description.toLowerCase().includes(d.toLowerCase()),x=y==="all"||o.status===y,q=j==="all"||o.type===j;return n&&x&&q}).length})})})}),e.jsx(C,{gutter:[16,16],children:be()}),e.jsx(J,{title:s(R?"agents:editAgent":"agents:createAgent"),open:B,onOk:ye,onCancel:()=>S(!1),width:800,children:e.jsxs(m,{form:L,layout:"vertical",initialValues:{type:"monitor",maxConcurrency:5,timeout:60,retryCount:3,autoRestart:!0},children:[e.jsxs(C,{gutter:16,children:[e.jsx(u,{span:12,children:e.jsx(m.Item,{name:"name",label:"智能体名称",rules:[{required:!0,message:"请输入智能体名称"},{max:50,message:"名称不能超过50个字符"}],children:e.jsx(ie,{placeholder:"请输入智能体名称"})})}),e.jsx(u,{span:12,children:e.jsx(m.Item,{name:"type",label:"智能体类型",rules:[{required:!0,message:"请选择智能体类型"}],children:e.jsx(Y,{placeholder:"请选择类型",children:Object.entries(V).map(([o,n])=>e.jsx(v,{value:o,children:e.jsxs(T,{children:[n.icon,n.name]})},o))})})})]}),e.jsx(m.Item,{name:"description",label:"描述",rules:[{required:!0,message:"请输入智能体描述"},{max:200,message:"描述不能超过200个字符"}],children:e.jsx(ft,{rows:3,placeholder:"请输入智能体的功能描述"})}),e.jsxs(C,{gutter:16,children:[e.jsx(u,{span:12,children:e.jsx(m.Item,{name:"maxConcurrency",label:"最大并发数",rules:[{required:!0,message:"请设置最大并发数"}],children:e.jsx(Z,{min:1,max:20,marks:{1:"1",5:"5",10:"10",20:"20"}})})}),e.jsx(u,{span:12,children:e.jsx(m.Item,{name:"timeout",label:"超时时间(秒)",rules:[{required:!0,message:"请设置超时时间"}],children:e.jsx(Z,{min:10,max:300,marks:{10:"10s",60:"1m",180:"3m",300:"5m"}})})})]}),e.jsxs(C,{gutter:16,children:[e.jsx(u,{span:12,children:e.jsx(m.Item,{name:"retryCount",label:"重试次数",rules:[{required:!0,message:"请设置重试次数"}],children:e.jsxs(Y,{children:[e.jsx(v,{value:0,children:"不重试"}),e.jsx(v,{value:1,children:"1次"}),e.jsx(v,{value:2,children:"2次"}),e.jsx(v,{value:3,children:"3次"}),e.jsx(v,{value:5,children:"5次"})]})})}),e.jsx(u,{span:12,children:e.jsx(m.Item,{name:"autoRestart",label:"自动重启",valuePropName:"checked",children:e.jsx(Ee,{})})})]})]})}),e.jsx(J,{title:e.jsx("span",{style:{color:a?"#ffffff":"#262626"},children:"智能体详情"}),open:P,onCancel:()=>f(!1),footer:null,width:800,styles:{content:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#000000"}},children:i&&e.jsxs("div",{children:[e.jsxs(l,{bordered:!0,column:2,labelStyle:{backgroundColor:a?"#1f1f1f":"#fafafa",color:a?"#ffffff":"#262626"},contentStyle:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#262626"},children:[e.jsx(l.Item,{label:"名称",children:i.name}),e.jsx(l.Item,{label:"版本",children:i.version}),e.jsx(l.Item,{label:"类型",children:(_=V[i.type])==null?void 0:_.name}),e.jsx(l.Item,{label:"状态",children:de(i.status)}),e.jsxs(l.Item,{label:"CPU使用率",children:[i.cpu,"%"]}),e.jsxs(l.Item,{label:"内存使用",children:[i.memory,"MB"]}),e.jsxs(l.Item,{label:"执行任务",children:[i.tasks,"次"]}),e.jsxs(l.Item,{label:"成功率",children:[i.successRate,"%"]}),e.jsx(l.Item,{label:"创建时间",span:2,children:i.createdAt}),e.jsx(l.Item,{label:"描述",span:2,children:i.description})]}),e.jsxs("div",{style:{marginTop:24},children:[e.jsx(U,{level:4,style:{color:a?"#ffffff":"#262626"},children:"配置信息"}),e.jsxs(l,{bordered:!0,column:2,labelStyle:{backgroundColor:a?"#1f1f1f":"#fafafa",color:a?"#ffffff":"#262626"},contentStyle:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#262626"},children:[e.jsx(l.Item,{label:"最大并发",children:i.config.maxConcurrency}),e.jsxs(l.Item,{label:"超时时间",children:[i.config.timeout,"秒"]}),e.jsxs(l.Item,{label:"重试次数",children:[i.config.retryCount,"次"]}),e.jsx(l.Item,{label:"自动重启",children:i.config.autoRestart?"启用":"禁用"})]})]}),e.jsxs("div",{style:{marginTop:24},children:[e.jsx(U,{level:4,style:{color:a?"#ffffff":"#262626"},children:"运行日志"}),e.jsxs($,{children:[e.jsxs($.Item,{color:"green",children:[e.jsx(w,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:30:25"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 智能体启动成功"})]}),e.jsxs($.Item,{color:"blue",children:[e.jsx(w,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:28:10"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 执行监控任务 #1247"})]}),e.jsxs($.Item,{color:"blue",children:[e.jsx(w,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:25:30"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 检测到系统异常，发送告警"})]}),e.jsxs($.Item,{color:"orange",children:[e.jsx(w,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:20:15"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 任务执行超时，开始重试"})]}),e.jsxs($.Item,{children:[e.jsx(w,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:15:00"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 智能体配置更新"})]})]})]})]})})]})};export{zt as default};
