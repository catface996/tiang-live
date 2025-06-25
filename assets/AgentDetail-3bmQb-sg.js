import{a as K,b as M,u as H,c as L,j as e,d as o}from"./index-DmkKiKNT.js";import{K as U,r as h,u as $,k as v,B as x,aI as W,al as J,T as V,at as q,ao as G,x as Q,o as X,a8 as Y,d as y,C as r,S as m,V as Z,a2 as _,a4 as T,z as R,j as g,y as d,aJ as j,a1 as I,P as ee,A as te}from"./antd-CbyKqlos.js";import{s as se}from"./index-Daowydkz.js";import"./vendor-DJG_os-6.js";const{Title:ae,Text:b,Paragraph:ne}=V,{TabPane:f}=R,oe=o.div`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${s=>s.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,ie=o(g)`
  margin-bottom: 24px;
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 12px;
  
  .ant-card-body {
    padding: 32px;
  }
`,re=o.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 24px;
`,de=o.div`
  flex-shrink: 0;
`,le=o(te)`
  background: linear-gradient(135deg, ${s=>s.$bgColor}, ${s=>s.$bgColor}dd) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px ${s=>s.$bgColor}40;
  border: 2px solid ${s=>s.$bgColor}20;
  
  .anticon {
    color: #ffffff !important;
    font-size: 32px;
  }
`,ce=o.div`
  flex: 1;
  min-width: 0;
`,xe=o(ae)`
  margin: 0 0 8px 0 !important;
  color: ${s=>s.$isDark?"#ffffff":"#262626"} !important;
`,ge=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`,w=o($)`
  border-radius: 6px;
  font-size: 12px;
  padding: 4px 12px;
  margin: 0;
  
  ${s=>s.$bgColor&&`
    background-color: ${s.$bgColor} !important;
    border: 1px solid ${s.$borderColor} !important;
    color: ${s.$textColor} !important;
  `}
  
  .anticon {
    color: ${s=>s.$textColor||"inherit"} !important;
    margin-right: 4px;
  }
`,me=o.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`,p=o(g)`
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px;
  
  .ant-statistic-content-value {
    color: ${s=>s.$isDark?"#ffffff":"#262626"};
  }
`,fe=o(g)`
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 12px;
  margin-bottom: 24px;
  
  .ant-tabs-content-holder {
    padding: 24px;
  }
`,A=o.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  
  ${s=>{switch(s.status){case"running":return"background-color: #52c41a; box-shadow: 0 0 6px #52c41a60;";case"stopped":return"background-color: #ff4d4f; box-shadow: 0 0 6px #ff4d4f60;";case"paused":return"background-color: #faad14; box-shadow: 0 0 6px #faad1460;";default:return"background-color: #d9d9d9;"}}}
`,pe={id:"1",name:"日志分析智能体",type:"analysis",status:"running",description:"专门用于分析系统日志，识别异常模式和潜在问题的智能体。具备自然语言处理和模式识别能力。",lastActive:"2分钟前",tags:["日志分析","异常检测","自动化"],stats:{tasksCompleted:1247,successRate:98.5,avgResponseTime:156,uptime:"15天8小时"}},ue=[{time:"2024-01-20 14:30:25",level:"INFO",message:"智能体启动成功"},{time:"2024-01-20 14:30:30",level:"INFO",message:"开始执行日志分析任务"},{time:"2024-01-20 14:31:15",level:"WARN",message:"检测到异常日志模式"},{time:"2024-01-20 14:31:20",level:"INFO",message:"生成分析报告"},{time:"2024-01-20 14:32:00",level:"INFO",message:"任务执行完成"}],he=[{id:1,task:"系统日志分析",startTime:"2024-01-20 14:30:00",endTime:"2024-01-20 14:32:00",status:"success",duration:"2分钟"},{id:2,task:"错误日志检测",startTime:"2024-01-20 13:15:00",endTime:"2024-01-20 13:16:30",status:"success",duration:"1分30秒"},{id:3,task:"性能日志分析",startTime:"2024-01-20 12:00:00",endTime:"2024-01-20 12:05:00",status:"failed",duration:"5分钟"},{id:4,task:"安全日志审计",startTime:"2024-01-20 11:30:00",endTime:"2024-01-20 11:32:00",status:"success",duration:"2分钟"}],ve=()=>{const{id:s}=K(),k=M(),{t}=H(["agents","common"]),{currentTheme:D}=L(n=>n.theme);U.useToken();const i=D==="dark",[a,je]=h.useState(pe),[S,C]=h.useState(!1);h.useEffect(()=>{se(t("agents:detail.title"))},[s,t]);const N=()=>({analysis:{name:t("agents:types.analysis"),color:"#52c41a",bgColor:"#f6ffed",icon:"📊"}}),B=n=>({running:{text:t("agents:status.running"),color:"#52c41a",bgColor:"#f6ffed"},stopped:{text:t("agents:status.stopped"),color:"#ff4d4f",bgColor:"#fff2f0"},paused:{text:t("agents:status.paused"),color:"#faad14",bgColor:"#fff7e6"}})[n],P=n=>({analysis:i?"#52c41a":"#73d13d"})[n]||(i?"#1890ff":"#4096ff"),l=N().analysis,c=B(a.status),z=P(a.type),u=n=>{C(!0),setTimeout(()=>{C(!1),console.log(`执行操作: ${n}`)},1e3)},F=[{title:t("agents:detail.logs"),dataIndex:"time",key:"time",width:180},{title:t("common:level"),dataIndex:"level",key:"level",width:80,render:n=>e.jsx($,{color:n==="ERROR"?"red":n==="WARN"?"orange":"blue",children:n})},{title:t("common:message"),dataIndex:"message",key:"message"}],O=[{title:t("agents:detail.history"),dataIndex:"task",key:"task"},{title:t("common:startTime"),dataIndex:"startTime",key:"startTime",width:180},{title:t("common:endTime"),dataIndex:"endTime",key:"endTime",width:180},{title:t("common:duration"),dataIndex:"duration",key:"duration",width:120},{title:t("common:status"),dataIndex:"status",key:"status",width:100,render:n=>e.jsx($,{color:n==="success"?"green":"red",children:t(n==="success"?"common:success":"common:failed")})}];return e.jsxs(oe,{$isDark:i,children:[e.jsxs(ie,{$isDark:i,children:[e.jsx(v,{style:{marginBottom:24},children:e.jsx(x,{icon:e.jsx(W,{}),onClick:()=>k("/agents"),children:t("common:back")})}),e.jsxs(re,{children:[e.jsx(de,{children:e.jsx(le,{size:80,icon:e.jsx(J,{}),$bgColor:z})}),e.jsxs(ce,{children:[e.jsxs(xe,{level:2,$isDark:i,children:[e.jsx(A,{status:a.status}),a.name]}),e.jsxs(ge,{children:[e.jsx(w,{$bgColor:l.bgColor,$borderColor:l.color,$textColor:l.color,children:l.name}),e.jsx(w,{$bgColor:c.bgColor,$borderColor:c.color,$textColor:c.color,children:c.text})]}),e.jsx(ne,{style:{color:i?"#8c8c8c":"#666",marginBottom:24},children:a.description}),e.jsxs(me,{children:[e.jsx(x,{type:"primary",icon:a.status==="running"?e.jsx(q,{}):e.jsx(G,{}),loading:S,onClick:()=>u(a.status==="running"?"stop":"start"),children:a.status==="running"?t("agents:actions.stop"):t("agents:actions.start")}),e.jsx(x,{icon:e.jsx(Q,{}),onClick:()=>k(`/agents/edit/${a.id}`),children:t("agents:actions.edit")}),e.jsx(x,{icon:e.jsx(X,{}),onClick:()=>u("restart"),children:t("agents:actions.restart")}),e.jsx(x,{danger:!0,icon:e.jsx(Y,{}),onClick:()=>u("delete"),children:t("agents:actions.delete")})]})]})]}),e.jsxs(y,{gutter:24,children:[e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(p,{$isDark:i,children:e.jsx(m,{title:t("agents:stats.tasksCompleted"),value:a.stats.tasksCompleted,prefix:e.jsx(Z,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(p,{$isDark:i,children:e.jsx(m,{title:t("agents:stats.successRate"),value:a.stats.successRate,suffix:"%",prefix:e.jsx(_,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(p,{$isDark:i,children:e.jsx(m,{title:t("agents:stats.responseTime"),value:a.stats.avgResponseTime,suffix:"ms",prefix:e.jsx(T,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(p,{$isDark:i,children:e.jsx(m,{title:t("agents:detail.uptime"),value:a.stats.uptime,prefix:e.jsx(T,{})})})})]})]}),e.jsx(fe,{$isDark:i,children:e.jsxs(R,{defaultActiveKey:"overview",children:[e.jsx(f,{tab:t("agents:detail.overview"),children:e.jsxs(y,{gutter:24,children:[e.jsx(r,{xs:24,lg:12,children:e.jsx(g,{title:t("agents:detail.basicInfo"),bordered:!1,children:e.jsxs(d,{column:1,children:[e.jsx(d.Item,{label:t("agents:detail.id"),children:a.id}),e.jsx(d.Item,{label:t("agents:detail.name"),children:a.name}),e.jsx(d.Item,{label:t("agents:detail.type"),children:l.name}),e.jsxs(d.Item,{label:t("agents:detail.status"),children:[e.jsx(A,{status:a.status}),c.text]}),e.jsx(d.Item,{label:t("agents:detail.lastActiveAt"),children:a.lastActive})]})})}),e.jsx(r,{xs:24,lg:12,children:e.jsx(g,{title:t("agents:detail.performance"),bordered:!1,children:e.jsxs(v,{direction:"vertical",style:{width:"100%"},children:[e.jsxs("div",{children:[e.jsx(b,{children:t("agents:detail.cpuUsage")}),e.jsx(j,{percent:45,status:"active"})]}),e.jsxs("div",{children:[e.jsx(b,{children:t("agents:detail.memoryUsage")}),e.jsx(j,{percent:67,status:"active"})]}),e.jsxs("div",{children:[e.jsx(b,{children:t("agents:detail.errorRate")}),e.jsx(j,{percent:2,status:"exception"})]})]})})})]})},"overview"),e.jsx(f,{tab:t("agents:detail.logs"),children:e.jsx(I,{columns:F,dataSource:ue,rowKey:"time",pagination:{pageSize:10}})},"logs"),e.jsx(f,{tab:t("agents:detail.history"),children:e.jsx(I,{columns:O,dataSource:he,rowKey:"id",pagination:{pageSize:10}})},"history"),e.jsx(f,{tab:t("agents:detail.monitoring"),children:e.jsx(ee,{message:t("common:inDevelopment"),description:"性能监控图表功能正在开发中...",type:"info",showIcon:!0})},"monitoring")]})})]})};export{ve as default};
