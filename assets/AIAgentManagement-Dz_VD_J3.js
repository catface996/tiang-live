import{a as m,j as e}from"./react-D_ZWy-Ho.js";import{u as oe,af as ne,e as re,p as W,S as M,a3 as _,T as w,B as $,a8 as Se,a9 as De,bc as Te,aD as ie,b6 as ze,aW as ce,bd as Me,aL as Pe,q as Fe,aM as Be,m as Le,be as Ve,X as qe,bf as Ee,Y,ak as Ue,aS as P,aQ as K,d as i,aE as Oe,a4 as le,K as Q,c as de,_ as fe,A as Ne,W as S,aC as h,ai as He,aa as We,U as A,V as u,aF as ee,az as pe,a1 as X,bg as te,bh as Ye,ax as d,b4 as k,an as U,ah as R,ap as Ke}from"./react-dom-GpeNoQsX.js";import{s as Qe}from"./index-Daowydkz.js";import{u as ue}from"./index-BquYqWj2.js";import{S as Xe}from"./SearchFilterBar-Lz3VU8LA.js";import"./vendor-VHja5XRA.js";import"./cytoscape-DXzeTOL3.js";import"./media-BPG7piku.js";import"./lodash-D08E6HgQ.js";import"./redux-CiqK6azd.js";import"./echarts-core-CW0Gv0IT.js";import"./antd-icons-CI4I6I7B.js";import"./dayjs-CrhenB4N.js";import"./emotion-BhZTwsuK.js";import"./mermaid-AggIEIwl.js";import"./d3-Dbz_rnoS.js";import"./i18n-CMVetavo.js";const{Text:_e,Paragraph:Ge}=de,Je=i(fe)`
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
`,Ze=i.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 16px;
`,et=i.div`
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`,tt=i(Ne)`
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
`,st=i.div`
  flex: 1;
  min-width: 0;
`,at=i.div`
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
`,ot=i.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`,se=i(_)`
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
`,nt=i.div`
  margin: 20px 0;
  padding: 16px;
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
`,rt=i.span`
  color: ${t=>t.$isDark?"#434343":"#d9d9d9"};
  font-weight: 300;
`,O=i.span`
  color: ${t=>t.$isDark?"#8c8c8c":"#666"};
  font-size: 12px;
`,N=i(S)`
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
`,it=i(Ge)`
  margin: 16px 0 !important;
  color: ${t=>t.$isDark?"#8c8c8c":"#666"} !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  
  .ant-typography {
    margin-bottom: 0 !important;
  }
`,ct=i.div`
  margin: 16px 0;
  
  .ant-tag {
    margin: 0 4px 4px 0;
    border-radius: 4px;
    font-size: 12px;
  }
`,lt=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid;
  border-color: ${t=>t.theme.isDark?"#303030":"#f0f0f0"};
  gap: 12px;
`,ae=i(_e)`
  font-size: 12px !important;
  color: ${t=>t.$isDark?"#8c8c8c":"#999"} !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  
  &:last-child {
    text-align: right;
  }
`,dt=i.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  
  ${t=>{switch(t.status){case"running":return"background-color: #52c41a; box-shadow: 0 0 6px #52c41a60;";case"stopped":return"background-color: #ff4d4f; box-shadow: 0 0 6px #ff4d4f60;";case"paused":return"background-color: #faad14; box-shadow: 0 0 6px #faad1460;";default:return"background-color: #d9d9d9;"}}}
`,ft=t=>({monitor:{name:t("agents.types.monitor"),color:"#1890ff",bgColor:"#e6f7ff",icon:e.jsx(K,{})},analysis:{name:t("agents.types.analysis"),color:"#52c41a",bgColor:"#f6ffed",icon:e.jsx(P,{})},deployment:{name:t("agents.types.deployment"),color:"#722ed1",bgColor:"#f9f0ff",icon:e.jsx(Ue,{})},optimization:{name:t("agents.types.optimization"),color:"#fa8c16",bgColor:"#fff7e6",icon:e.jsx(Y,{})},security:{name:t("agents.types.security"),color:"#ff4d4f",bgColor:"#fff2f0",icon:e.jsx(Ee,{})},backup:{name:t("agents.types.backup"),color:"#13c2c2",bgColor:"#e6fffb",icon:e.jsx(qe,{})},gateway:{name:t("agents.types.gateway"),color:"#2f54eb",bgColor:"#f0f5ff",icon:e.jsx(Ve,{})},planning:{name:t("agents.types.planning"),color:"#eb2f96",bgColor:"#fff0f6",icon:e.jsx(Le,{})},diagnosis:{name:t("agents.types.diagnosis"),color:"#fa541c",bgColor:"#fff2e8",icon:e.jsx(Be,{})},config:{name:t("agents.types.config"),color:"#a0d911",bgColor:"#fcffe6",icon:e.jsx(Fe,{})},traffic:{name:t("agents.types.traffic"),color:"#fadb14",bgColor:"#feffe6",icon:e.jsx(Pe,{})},cleanup:{name:t("agents.types.cleanup"),color:"#8c8c8c",bgColor:"#f5f5f5",icon:e.jsx(Me,{})}}),pt=(t,s)=>({running:{text:s("agents.status.running"),color:"#52c41a",bgColor:"#f6ffed",icon:e.jsx(Q,{})},stopped:{text:s("agents.status.stopped"),color:"#ff4d4f",bgColor:"#fff2f0",icon:e.jsx(le,{})},paused:{text:s("agents.status.paused"),color:"#faad14",bgColor:"#fff7e6",icon:e.jsx(Oe,{})}})[t],ut=(t,s)=>({monitor:s?"#1890ff":"#4096ff",analysis:s?"#52c41a":"#73d13d",deployment:s?"#722ed1":"#9254de",optimization:s?"#fa8c16":"#ffa940",security:s?"#ff4d4f":"#ff7875",backup:s?"#13c2c2":"#36cfc9",gateway:s?"#2f54eb":"#597ef7",planning:s?"#eb2f96":"#f759ab",diagnosis:s?"#fa541c":"#ff7a45",config:s?"#a0d911":"#b7eb8f",traffic:s?"#fadb14":"#ffd666",cleanup:s?"#8c8c8c":"#bfbfbf"})[t]||(s?"#1890ff":"#4096ff"),xt=({agent:t,onEdit:s,onDelete:v,onStart:G,onStop:F,onView:D})=>{const{currentTheme:B}=ue(n=>n.theme),{t:c}=oe();ne.useToken();const T=re(),f=B==="dark",l=m.useMemo(()=>ft(c),[c]),b=pt(t.status,c),p=l[t.type],L=ut(t.type,f);if(!p)return console.error("Unknown agent type:",t.type),null;const x=(n,j)=>{switch(j.stopPropagation(),n){case"edit":s(t);break;case"delete":v(t.id);break;case"start":G(t.id);break;case"stop":F(t.id);break;case"view":T(`/ai-agents/detail/${t.id}`);break}};return e.jsxs(Je,{$isDark:f,hoverable:!0,onClick:()=>D(t),actions:[e.jsx(w,{title:c("common.view"),children:e.jsx($,{type:"text",icon:e.jsx(Se,{}),onClick:n=>x("view",n)})},"view"),e.jsx(w,{title:c("common.edit"),children:e.jsx($,{type:"text",icon:e.jsx(De,{}),onClick:n=>x("edit",n)})},"edit"),t.status==="running"?e.jsx(w,{title:c("agents.actions.stop"),children:e.jsx($,{type:"text",icon:e.jsx(Te,{}),onClick:n=>x("stop",n)})},"stop"):e.jsx(w,{title:c("agents.actions.start"),children:e.jsx($,{type:"text",icon:e.jsx(ie,{}),onClick:n=>x("start",n)})},"start"),e.jsx(w,{title:c("common.delete"),children:e.jsx(ze,{title:c("agents.deleteConfirm"),onConfirm:n=>{n==null||n.stopPropagation(),v(t.id)},onCancel:n=>n==null?void 0:n.stopPropagation(),onClick:n=>n==null?void 0:n.stopPropagation(),children:e.jsx($,{type:"text",danger:!0,icon:e.jsx(ce,{}),onClick:n=>n.stopPropagation()})})},"delete")],children:[e.jsxs(Ze,{children:[e.jsx(et,{children:e.jsx(tt,{size:56,icon:e.jsx(W,{}),$bgColor:L})}),e.jsxs(st,{children:[e.jsx(at,{$isDark:f,children:t.name}),e.jsxs(ot,{children:[e.jsx(se,{color:p.color,icon:p.icon,$bgColor:p.bgColor,$borderColor:p.color,$textColor:p.color,children:p.name}),e.jsxs(se,{color:b.color,icon:b.icon,$bgColor:b.bgColor,$borderColor:b.color,$textColor:b.color,children:[e.jsx(dt,{status:t.status}),b.text]})]})]})]}),e.jsx(it,{$isDark:f,ellipsis:{rows:2},children:t.description}),e.jsx(nt,{$isDark:f,children:e.jsxs(M,{split:e.jsx(rt,{$isDark:f,children:"|"}),size:"small",style:{width:"100%",justifyContent:"space-between"},children:[e.jsx(N,{$isDark:f,title:e.jsx(O,{$isDark:f,children:c("agents.stats.tasksCompleted")}),value:t.stats.tasksCompleted}),e.jsx(N,{$isDark:f,title:e.jsx(O,{$isDark:f,children:c("agents.stats.successRate")}),value:t.stats.successRate,suffix:"%"}),e.jsx(N,{$isDark:f,title:e.jsx(O,{$isDark:f,children:c("agents.stats.responseTime")}),value:t.stats.avgResponseTime,suffix:"ms"})]})}),t.tags&&t.tags.length>0&&e.jsx(ct,{children:t.tags.map(n=>e.jsx(_,{children:n},n))}),e.jsxs(lt,{children:[e.jsxs(ae,{$isDark:f,children:[c("agents.lastActive"),": ",t.lastActive]}),e.jsxs(ae,{$isDark:f,children:[c("agents.uptime"),": ",t.stats.uptime]})]})]})},{Title:H,Paragraph:gt,Text:I}=de,{Option:C}=X,{TextArea:mt}=pe,ht=i.div`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${t=>t.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,bt=i.div`
  margin-bottom: 24px;
  padding: 24px;
  background: ${t=>t.$isDark?"#141414":"#ffffff"};
  border-radius: 8px;
  box-shadow: ${t=>t.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  transition: all 0.3s ease;
`,z=i(fe)`
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
`,yt=i.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${t=>{switch(t.status){case"running":return"#52c41a";case"stopped":return"#f5222d";case"paused":return"#faad14";default:return"#d9d9d9"}}};
  display: inline-block;
  margin-right: 8px;
`,jt=i(Ke)`
  background: ${t=>t.$isDark?"#2a1f00":"#fffbe6"};
  border: ${t=>t.$isDark?"1px solid #594214":"1px solid #ffe58f"};
  
  .ant-alert-message {
    color: ${t=>t.$isDark?"#faad14":"#d48806"};
  }
  
  .ant-alert-description {
    color: ${t=>t.$isDark?"#d4b106":"#d48806"};
  }
`,Vt=()=>{var Z;const t=re(),{t:s}=oe(),[v,G]=m.useState(!1),[F,D]=m.useState(!1),[B,c]=m.useState(!1),[T,f]=m.useState(null),[l,b]=m.useState(null),[p,L]=m.useState(""),[x,n]=m.useState("all"),[j,xe]=m.useState("all"),[V]=h.useForm(),{currentTheme:ge}=ue(o=>o.theme);ne.useToken();const a=ge==="dark";m.useEffect(()=>{Qe(s("agents.title"))},[s]);const y=[{id:"1",name:"系统监控智能体",type:"monitor",status:"running",description:"负责监控系统健康状态，自动检测异常并发送告警",version:"v2.1.0",cpu:15.6,memory:256,tasks:1247,successRate:98.5,lastActive:"2024-06-15 14:30:25",createdAt:"2024-05-20",config:{maxConcurrency:10,timeout:30,retryCount:3,autoRestart:!0}},{id:"2",name:"日志分析智能体",type:"analysis",status:"running",description:"分析系统日志，识别异常模式和潜在问题",version:"v1.8.2",cpu:23.4,memory:512,tasks:856,successRate:96.8,lastActive:"2024-06-15 14:28:10",createdAt:"2024-04-15",config:{maxConcurrency:5,timeout:60,retryCount:2,autoRestart:!0}},{id:"3",name:"自动化部署智能体",type:"deployment",status:"paused",description:"自动化应用部署和配置管理",version:"v3.0.1",cpu:8.2,memory:128,tasks:342,successRate:99.2,lastActive:"2024-06-15 12:15:30",createdAt:"2024-06-01",config:{maxConcurrency:3,timeout:120,retryCount:1,autoRestart:!1}},{id:"4",name:"性能优化智能体",type:"optimization",status:"stopped",description:"分析系统性能瓶颈，提供优化建议",version:"v1.5.0",cpu:0,memory:0,tasks:128,successRate:94.7,lastActive:"2024-06-14 18:45:12",createdAt:"2024-03-10",config:{maxConcurrency:2,timeout:180,retryCount:3,autoRestart:!1}},{id:"5",name:"安全扫描智能体",type:"security",status:"running",description:"执行安全漏洞扫描和威胁检测，保障系统安全",version:"v2.3.1",cpu:18.9,memory:384,tasks:673,successRate:97.3,lastActive:"2024-06-15 14:25:45",createdAt:"2024-05-05",config:{maxConcurrency:8,timeout:90,retryCount:2,autoRestart:!0}},{id:"6",name:"数据备份智能体",type:"backup",status:"running",description:"自动化数据备份和恢复管理，确保数据安全",version:"v1.9.3",cpu:12.3,memory:192,tasks:445,successRate:99.8,lastActive:"2024-06-15 14:20:15",createdAt:"2024-04-20",config:{maxConcurrency:4,timeout:300,retryCount:3,autoRestart:!0}},{id:"7",name:"API网关智能体",type:"gateway",status:"running",description:"智能API路由和负载均衡，优化请求分发",version:"v2.0.5",cpu:31.7,memory:768,tasks:2156,successRate:99.1,lastActive:"2024-06-15 14:32:08",createdAt:"2024-05-15",config:{maxConcurrency:20,timeout:15,retryCount:1,autoRestart:!0}},{id:"8",name:"容量规划智能体",type:"planning",status:"paused",description:"分析资源使用趋势，提供容量规划建议",version:"v1.4.2",cpu:5.8,memory:96,tasks:89,successRate:95.5,lastActive:"2024-06-15 10:45:30",createdAt:"2024-03-25",config:{maxConcurrency:2,timeout:240,retryCount:2,autoRestart:!1}},{id:"9",name:"故障诊断智能体",type:"diagnosis",status:"running",description:"智能故障诊断和根因分析，快速定位问题",version:"v2.2.0",cpu:21.4,memory:512,tasks:567,successRate:96.2,lastActive:"2024-06-15 14:18:55",createdAt:"2024-04-30",config:{maxConcurrency:6,timeout:120,retryCount:3,autoRestart:!0}},{id:"10",name:"配置管理智能体",type:"config",status:"stopped",description:"自动化配置管理和版本控制，确保配置一致性",version:"v1.7.1",cpu:0,memory:0,tasks:234,successRate:98.9,lastActive:"2024-06-14 16:20:12",createdAt:"2024-03-15",config:{maxConcurrency:3,timeout:60,retryCount:2,autoRestart:!1}},{id:"11",name:"流量分析智能体",type:"traffic",status:"running",description:"实时流量分析和异常检测，优化网络性能",version:"v1.6.4",cpu:16.2,memory:320,tasks:789,successRate:97.8,lastActive:"2024-06-15 14:29:33",createdAt:"2024-05-10",config:{maxConcurrency:12,timeout:45,retryCount:2,autoRestart:!0}},{id:"12",name:"资源清理智能体",type:"cleanup",status:"paused",description:"定期清理无用资源和临时文件，释放存储空间",version:"v1.3.0",cpu:3.1,memory:64,tasks:156,successRate:99.4,lastActive:"2024-06-15 08:30:00",createdAt:"2024-02-28",config:{maxConcurrency:1,timeout:600,retryCount:1,autoRestart:!1}}],q={monitor:{name:s("agents.types.monitor"),color:"blue",icon:e.jsx(K,{})},analysis:{name:s("agents.types.analysis"),color:"green",icon:e.jsx(P,{})},deployment:{name:s("agents.types.deployment"),color:"purple",icon:e.jsx(U,{})},optimization:{name:s("agents.types.optimization"),color:"orange",icon:e.jsx(Y,{})},security:{name:s("agents.types.security"),color:"red",icon:e.jsx(le,{})},backup:{name:s("agents.types.backup"),color:"cyan",icon:e.jsx(Q,{})},gateway:{name:s("agents.types.gateway"),color:"geekblue",icon:e.jsx(U,{})},planning:{name:s("agents.types.planning"),color:"magenta",icon:e.jsx(P,{})},diagnosis:{name:s("agents.types.diagnosis"),color:"volcano",icon:e.jsx(K,{})},config:{name:s("agents.types.config"),color:"lime",icon:e.jsx(U,{})},traffic:{name:s("agents.types.traffic"),color:"gold",icon:e.jsx(P,{})},cleanup:{name:s("agents.types.cleanup"),color:"gray",icon:e.jsx(ce,{})}},me=o=>{const g={running:{color:a?"#52c41a":"green",text:s("agents.status.running"),bgColor:a?"rgba(82, 196, 26, 0.1)":void 0},stopped:{color:a?"#f5222d":"red",text:s("agents.status.stopped"),bgColor:a?"rgba(245, 34, 45, 0.1)":void 0},paused:{color:a?"#faad14":"orange",text:s("agents.status.paused"),bgColor:a?"rgba(250, 173, 20, 0.1)":void 0}}[o];return e.jsxs(_,{color:g.color,style:g.bgColor?{backgroundColor:g.bgColor,border:`1px solid ${g.color}`,color:g.color}:{},children:[e.jsx(yt,{status:o}),g.text]})},he=()=>{t("/ai-agents/create")},be=o=>{t(`/ai-agents/edit/${o.id}`)},ye=o=>{b(o),c(!0)},je=o=>{R.success("智能体启动成功")},$e=o=>{R.success("智能体停止成功")},ke=o=>{R.success("智能体删除成功")},Ce=async()=>{try{const o=await V.validateFields();T?R.success("智能体更新成功"):R.success("智能体创建成功"),D(!1),V.resetFields()}catch(o){console.error("表单验证失败:",o)}},ve=()=>y.filter(r=>{const g=r.name.toLowerCase().includes(p.toLowerCase())||r.description.toLowerCase().includes(p.toLowerCase()),E=x==="all"||r.status===x,Ie=j==="all"||r.type===j;return g&&E&&Ie}).map(r=>e.jsx(u,{xs:24,sm:24,lg:12,xl:8,children:e.jsx(xt,{agent:{...r,stats:{tasksCompleted:r.tasks,successRate:r.successRate,avgResponseTime:Math.floor(Math.random()*200)+100,uptime:"2天3小时"}},onEdit:be,onDelete:ke,onStart:je,onStop:$e,onView:ye})},r.id)),we=y.filter(o=>o.status==="running").length,Ae=y.reduce((o,r)=>o+r.tasks,0),Re=y.reduce((o,r)=>o+r.successRate,0)/y.length,J=y.reduce((o,r)=>o+r.cpu,0);return e.jsxs(ht,{$isDark:a,children:[e.jsx(bt,{$isDark:a,children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(H,{level:2,style:{margin:0,color:a?"#ffffff":"#262626"},children:e.jsxs(M,{children:[e.jsx(W,{style:{color:a?"#177ddc":"#1890ff"}}),s("agents.title")]})}),e.jsx(gt,{style:{marginTop:8,marginBottom:0,fontSize:16,color:a?"#8c8c8c":"#666666"},children:s("agents.subtitle")})]}),e.jsxs(M,{children:[e.jsx($,{icon:e.jsx(He,{}),style:{color:a?"#ffffff":void 0,borderColor:a?"#434343":void 0,backgroundColor:a?"transparent":void 0},children:s("common.refresh")}),e.jsx($,{type:"primary",icon:e.jsx(We,{}),onClick:he,children:s("agents.createAgent")})]})]})}),e.jsxs(A,{gutter:16,style:{marginBottom:24},children:[e.jsx(u,{xs:24,sm:12,md:6,children:e.jsx(z,{$isDark:a,children:e.jsx(S,{title:s("agents.stats.totalAgents"),value:y.length,suffix:s("agents.stats.unit"),valueStyle:{color:"#1890ff"},prefix:e.jsx(W,{})})})}),e.jsx(u,{xs:24,sm:12,md:6,children:e.jsx(z,{$isDark:a,children:e.jsx(S,{title:s("agents.stats.runningAgents"),value:we,suffix:s("agents.stats.unit"),valueStyle:{color:"#52c41a"},prefix:e.jsx(ie,{})})})}),e.jsx(u,{xs:24,sm:12,md:6,children:e.jsx(z,{$isDark:a,children:e.jsx(S,{title:s("agents.stats.totalTasks"),value:Ae,suffix:s("agents.stats.taskUnit"),valueStyle:{color:"#faad14"},prefix:e.jsx(Y,{})})})}),e.jsx(u,{xs:24,sm:12,md:6,children:e.jsx(z,{$isDark:a,children:e.jsx(S,{title:s("agents.stats.avgSuccessRate"),value:Re.toFixed(1),suffix:"%",valueStyle:{color:"#722ed1"},prefix:e.jsx(Q,{})})})})]}),J>60&&e.jsx(jt,{$isDark:a,message:s("agents.alerts.highCpuUsage"),description:s("agents.alerts.highCpuUsageDesc",{cpu:J.toFixed(1)}),type:"warning",showIcon:!0,closable:!0,style:{marginBottom:24}}),e.jsx(Xe,{searchValue:p,onSearchChange:L,searchPlaceholder:s("agents.searchPlaceholder"),filters:[{key:"status",value:x,onChange:n,placeholder:s("agents.filterByStatus"),width:120,options:[{value:"all",label:s("common.all")},{value:"running",label:s("agents.status.running")},{value:"paused",label:s("agents.status.paused")},{value:"stopped",label:s("agents.status.stopped")}]},{key:"type",value:j,onChange:xe,placeholder:s("agents.filterByType"),width:140,options:[{value:"all",label:s("common.all")},...Object.entries(q).map(([o,r])=>({value:o,label:r.name}))]}],extraActions:e.jsx("div",{style:{textAlign:"right"},children:e.jsx("span",{style:{color:a?"#8c8c8c":"#666666",fontSize:"14px"},children:s("agents.totalFound",{count:y.filter(o=>{const r=o.name.toLowerCase().includes(p.toLowerCase())||o.description.toLowerCase().includes(p.toLowerCase()),g=x==="all"||o.status===x,E=j==="all"||o.type===j;return r&&g&&E}).length})})})}),e.jsx(A,{gutter:[16,16],children:ve()}),e.jsx(ee,{title:s(T?"agents.editAgent":"agents.createAgent"),open:F,onOk:Ce,onCancel:()=>D(!1),width:800,children:e.jsxs(h,{form:V,layout:"vertical",initialValues:{type:"monitor",maxConcurrency:5,timeout:60,retryCount:3,autoRestart:!0},children:[e.jsxs(A,{gutter:16,children:[e.jsx(u,{span:12,children:e.jsx(h.Item,{name:"name",label:"智能体名称",rules:[{required:!0,message:"请输入智能体名称"},{max:50,message:"名称不能超过50个字符"}],children:e.jsx(pe,{placeholder:"请输入智能体名称"})})}),e.jsx(u,{span:12,children:e.jsx(h.Item,{name:"type",label:"智能体类型",rules:[{required:!0,message:"请选择智能体类型"}],children:e.jsx(X,{placeholder:"请选择类型",children:Object.entries(q).map(([o,r])=>e.jsx(C,{value:o,children:e.jsxs(M,{children:[r.icon,r.name]})},o))})})})]}),e.jsx(h.Item,{name:"description",label:"描述",rules:[{required:!0,message:"请输入智能体描述"},{max:200,message:"描述不能超过200个字符"}],children:e.jsx(mt,{rows:3,placeholder:"请输入智能体的功能描述"})}),e.jsxs(A,{gutter:16,children:[e.jsx(u,{span:12,children:e.jsx(h.Item,{name:"maxConcurrency",label:"最大并发数",rules:[{required:!0,message:"请设置最大并发数"}],children:e.jsx(te,{min:1,max:20,marks:{1:"1",5:"5",10:"10",20:"20"}})})}),e.jsx(u,{span:12,children:e.jsx(h.Item,{name:"timeout",label:"超时时间(秒)",rules:[{required:!0,message:"请设置超时时间"}],children:e.jsx(te,{min:10,max:300,marks:{10:"10s",60:"1m",180:"3m",300:"5m"}})})})]}),e.jsxs(A,{gutter:16,children:[e.jsx(u,{span:12,children:e.jsx(h.Item,{name:"retryCount",label:"重试次数",rules:[{required:!0,message:"请设置重试次数"}],children:e.jsxs(X,{children:[e.jsx(C,{value:0,children:"不重试"}),e.jsx(C,{value:1,children:"1次"}),e.jsx(C,{value:2,children:"2次"}),e.jsx(C,{value:3,children:"3次"}),e.jsx(C,{value:5,children:"5次"})]})})}),e.jsx(u,{span:12,children:e.jsx(h.Item,{name:"autoRestart",label:"自动重启",valuePropName:"checked",children:e.jsx(Ye,{})})})]})]})}),e.jsx(ee,{title:e.jsx("span",{style:{color:a?"#ffffff":"#262626"},children:"智能体详情"}),open:B,onCancel:()=>c(!1),footer:null,width:800,styles:{content:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#000000"}},children:l&&e.jsxs("div",{children:[e.jsxs(d,{bordered:!0,column:2,labelStyle:{backgroundColor:a?"#1f1f1f":"#fafafa",color:a?"#ffffff":"#262626"},contentStyle:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#262626"},children:[e.jsx(d.Item,{label:"名称",children:l.name}),e.jsx(d.Item,{label:"版本",children:l.version}),e.jsx(d.Item,{label:"类型",children:(Z=q[l.type])==null?void 0:Z.name}),e.jsx(d.Item,{label:"状态",children:me(l.status)}),e.jsxs(d.Item,{label:"CPU使用率",children:[l.cpu,"%"]}),e.jsxs(d.Item,{label:"内存使用",children:[l.memory,"MB"]}),e.jsxs(d.Item,{label:"执行任务",children:[l.tasks,"次"]}),e.jsxs(d.Item,{label:"成功率",children:[l.successRate,"%"]}),e.jsx(d.Item,{label:"创建时间",span:2,children:l.createdAt}),e.jsx(d.Item,{label:"描述",span:2,children:l.description})]}),e.jsxs("div",{style:{marginTop:24},children:[e.jsx(H,{level:4,style:{color:a?"#ffffff":"#262626"},children:"配置信息"}),e.jsxs(d,{bordered:!0,column:2,labelStyle:{backgroundColor:a?"#1f1f1f":"#fafafa",color:a?"#ffffff":"#262626"},contentStyle:{backgroundColor:a?"#141414":"#ffffff",color:a?"#ffffff":"#262626"},children:[e.jsx(d.Item,{label:"最大并发",children:l.config.maxConcurrency}),e.jsxs(d.Item,{label:"超时时间",children:[l.config.timeout,"秒"]}),e.jsxs(d.Item,{label:"重试次数",children:[l.config.retryCount,"次"]}),e.jsx(d.Item,{label:"自动重启",children:l.config.autoRestart?"启用":"禁用"})]})]}),e.jsxs("div",{style:{marginTop:24},children:[e.jsx(H,{level:4,style:{color:a?"#ffffff":"#262626"},children:"运行日志"}),e.jsxs(k,{children:[e.jsxs(k.Item,{color:"green",children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:30:25"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 智能体启动成功"})]}),e.jsxs(k.Item,{color:"blue",children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:28:10"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 执行监控任务 #1247"})]}),e.jsxs(k.Item,{color:"blue",children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:25:30"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 检测到系统异常，发送告警"})]}),e.jsxs(k.Item,{color:"orange",children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:20:15"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 任务执行超时，开始重试"})]}),e.jsxs(k.Item,{children:[e.jsx(I,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:"14:15:00"}),e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:" - 智能体配置更新"})]})]})]})]})})]})};export{Vt as default};
