import{a as E,b as K,u as H,c as L,j as e,d as o}from"./index-i3_CIisb.js";import{Z as U,r as h,u as $,k as v,B as x,aK as W,aq as q,T as Q,av as Y,Y as Z,x as G,o as J,ad as V,d as y,C as r,S as m,a0 as X,aL as _,U as T,z as R,j as g,y as d,aM as j,a7 as I,Q as ee,A as se}from"./antd-C0IAgzs2.js";import{s as te}from"./index-Daowydkz.js";import"./vendor-DJG_os-6.js";const{Title:ae,Text:b,Paragraph:ne}=Q,{TabPane:f}=R,oe=o.div`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${t=>t.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,ie=o(g)`
  margin-bottom: 24px;
  background: ${t=>t.$isDark?"#141414":"#ffffff"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
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
`,le=o(se)`
  background: linear-gradient(135deg, ${t=>t.$bgColor}, ${t=>t.$bgColor}dd) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px ${t=>t.$bgColor}40;
  border: 2px solid ${t=>t.$bgColor}20;
  
  .anticon {
    color: #ffffff !important;
    font-size: 32px;
  }
`,ce=o.div`
  flex: 1;
  min-width: 0;
`,xe=o(ae)`
  margin: 0 0 8px 0 !important;
  color: ${t=>t.$isDark?"#ffffff":"#262626"} !important;
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
  
  ${t=>t.$bgColor&&`
    background-color: ${t.$bgColor} !important;
    border: 1px solid ${t.$borderColor} !important;
    color: ${t.$textColor} !important;
  `}
  
  .anticon {
    color: ${t=>t.$textColor||"inherit"} !important;
    margin-right: 4px;
  }
`,me=o.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`,p=o(g)`
  background: ${t=>t.$isDark?"#141414":"#ffffff"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px;
  
  .ant-statistic-content-value {
    color: ${t=>t.$isDark?"#ffffff":"#262626"};
  }
`,fe=o(g)`
  background: ${t=>t.$isDark?"#141414":"#ffffff"};
  border: ${t=>t.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
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
  
  ${t=>{switch(t.status){case"running":return"background-color: #52c41a; box-shadow: 0 0 6px #52c41a60;";case"stopped":return"background-color: #ff4d4f; box-shadow: 0 0 6px #ff4d4f60;";case"paused":return"background-color: #faad14; box-shadow: 0 0 6px #faad1460;";default:return"background-color: #d9d9d9;"}}}
`,pe={id:"1",name:"日志分析智能体",type:"analysis",status:"running",description:"专门用于分析系统日志，识别异常模式和潜在问题的智能体。具备自然语言处理和模式识别能力。",lastActive:"2分钟前",tags:["日志分析","异常检测","自动化"],stats:{tasksCompleted:1247,successRate:98.5,avgResponseTime:156,uptime:"15天8小时"}},ue=[{time:"2024-01-20 14:30:25",level:"INFO",message:"智能体启动成功"},{time:"2024-01-20 14:30:30",level:"INFO",message:"开始执行日志分析任务"},{time:"2024-01-20 14:31:15",level:"WARN",message:"检测到异常日志模式"},{time:"2024-01-20 14:31:20",level:"INFO",message:"生成分析报告"},{time:"2024-01-20 14:32:00",level:"INFO",message:"任务执行完成"}],he=[{id:1,task:"系统日志分析",startTime:"2024-01-20 14:30:00",endTime:"2024-01-20 14:32:00",status:"success",duration:"2分钟"},{id:2,task:"错误日志检测",startTime:"2024-01-20 13:15:00",endTime:"2024-01-20 13:16:30",status:"success",duration:"1分30秒"},{id:3,task:"性能日志分析",startTime:"2024-01-20 12:00:00",endTime:"2024-01-20 12:05:00",status:"failed",duration:"5分钟"},{id:4,task:"安全日志审计",startTime:"2024-01-20 11:30:00",endTime:"2024-01-20 11:32:00",status:"success",duration:"2分钟"}],ve=()=>{const{id:t}=E(),k=K(),{t:s}=H(["agents","common"]),{currentTheme:D}=L(n=>n.theme);U.useToken();const i=D==="dark",[a,je]=h.useState(pe),[S,C]=h.useState(!1);h.useEffect(()=>{te(s("agents:detail.title"))},[t,s]);const N=()=>({analysis:{name:s("agents:types.analysis"),color:"#52c41a",bgColor:"#f6ffed",icon:"📊"}}),B=n=>({running:{text:s("agents:status.running"),color:"#52c41a",bgColor:"#f6ffed"},stopped:{text:s("agents:status.stopped"),color:"#ff4d4f",bgColor:"#fff2f0"},paused:{text:s("agents:status.paused"),color:"#faad14",bgColor:"#fff7e6"}})[n],z=n=>({analysis:i?"#52c41a":"#73d13d"})[n]||(i?"#1890ff":"#4096ff"),l=N().analysis,c=B(a.status),P=z(a.type),u=n=>{C(!0),setTimeout(()=>{C(!1),console.log(`执行操作: ${n}`)},1e3)},F=[{title:s("agents:detail.logs"),dataIndex:"time",key:"time",width:180},{title:s("common:level"),dataIndex:"level",key:"level",width:80,render:n=>e.jsx($,{color:n==="ERROR"?"red":n==="WARN"?"orange":"blue",children:n})},{title:s("common:message"),dataIndex:"message",key:"message"}],M=[{title:s("agents:detail.history"),dataIndex:"task",key:"task"},{title:s("common:startTime"),dataIndex:"startTime",key:"startTime",width:180},{title:s("common:endTime"),dataIndex:"endTime",key:"endTime",width:180},{title:s("common:duration"),dataIndex:"duration",key:"duration",width:120},{title:s("common:status"),dataIndex:"status",key:"status",width:100,render:n=>e.jsx($,{color:n==="success"?"green":"red",children:s(n==="success"?"common:success":"common:failed")})}];return e.jsxs(oe,{$isDark:i,children:[e.jsxs(ie,{$isDark:i,children:[e.jsx(v,{style:{marginBottom:24},children:e.jsx(x,{icon:e.jsx(W,{}),onClick:()=>k("/agents"),children:s("common:back")})}),e.jsxs(re,{children:[e.jsx(de,{children:e.jsx(le,{size:80,icon:e.jsx(q,{}),$bgColor:P})}),e.jsxs(ce,{children:[e.jsxs(xe,{level:2,$isDark:i,children:[e.jsx(A,{status:a.status}),a.name]}),e.jsxs(ge,{children:[e.jsx(w,{$bgColor:l.bgColor,$borderColor:l.color,$textColor:l.color,children:l.name}),e.jsx(w,{$bgColor:c.bgColor,$borderColor:c.color,$textColor:c.color,children:c.text})]}),e.jsx(ne,{style:{color:i?"#8c8c8c":"#666",marginBottom:24},children:a.description}),e.jsxs(me,{children:[e.jsx(x,{type:"primary",icon:a.status==="running"?e.jsx(Y,{}):e.jsx(Z,{}),loading:S,onClick:()=>u(a.status==="running"?"stop":"start"),children:a.status==="running"?s("agents:actions.stop"):s("agents:actions.start")}),e.jsx(x,{icon:e.jsx(G,{}),onClick:()=>k(`/agents/edit/${a.id}`),children:s("agents:actions.edit")}),e.jsx(x,{icon:e.jsx(J,{}),onClick:()=>u("restart"),children:s("agents:actions.restart")}),e.jsx(x,{danger:!0,icon:e.jsx(V,{}),onClick:()=>u("delete"),children:s("agents:actions.delete")})]})]})]}),e.jsxs(y,{gutter:24,children:[e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(p,{$isDark:i,children:e.jsx(m,{title:s("agents:stats.tasksCompleted"),value:a.stats.tasksCompleted,prefix:e.jsx(X,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(p,{$isDark:i,children:e.jsx(m,{title:s("agents:stats.successRate"),value:a.stats.successRate,suffix:"%",prefix:e.jsx(_,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(p,{$isDark:i,children:e.jsx(m,{title:s("agents:stats.responseTime"),value:a.stats.avgResponseTime,suffix:"ms",prefix:e.jsx(T,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(p,{$isDark:i,children:e.jsx(m,{title:s("agents:detail.uptime"),value:a.stats.uptime,prefix:e.jsx(T,{})})})})]})]}),e.jsx(fe,{$isDark:i,children:e.jsxs(R,{defaultActiveKey:"overview",children:[e.jsx(f,{tab:s("agents:detail.overview"),children:e.jsxs(y,{gutter:24,children:[e.jsx(r,{xs:24,lg:12,children:e.jsx(g,{title:s("agents:detail.basicInfo"),bordered:!1,children:e.jsxs(d,{column:1,children:[e.jsx(d.Item,{label:s("agents:detail.id"),children:a.id}),e.jsx(d.Item,{label:s("agents:detail.name"),children:a.name}),e.jsx(d.Item,{label:s("agents:detail.type"),children:l.name}),e.jsxs(d.Item,{label:s("agents:detail.status"),children:[e.jsx(A,{status:a.status}),c.text]}),e.jsx(d.Item,{label:s("agents:detail.lastActiveAt"),children:a.lastActive})]})})}),e.jsx(r,{xs:24,lg:12,children:e.jsx(g,{title:s("agents:detail.performance"),bordered:!1,children:e.jsxs(v,{direction:"vertical",style:{width:"100%"},children:[e.jsxs("div",{children:[e.jsx(b,{children:s("agents:detail.cpuUsage")}),e.jsx(j,{percent:45,status:"active"})]}),e.jsxs("div",{children:[e.jsx(b,{children:s("agents:detail.memoryUsage")}),e.jsx(j,{percent:67,status:"active"})]}),e.jsxs("div",{children:[e.jsx(b,{children:s("agents:detail.errorRate")}),e.jsx(j,{percent:2,status:"exception"})]})]})})})]})},"overview"),e.jsx(f,{tab:s("agents:detail.logs"),children:e.jsx(I,{columns:F,dataSource:ue,rowKey:"time",pagination:{pageSize:10}})},"logs"),e.jsx(f,{tab:s("agents:detail.history"),children:e.jsx(I,{columns:M,dataSource:he,rowKey:"id",pagination:{pageSize:10}})},"history"),e.jsx(f,{tab:s("agents:detail.monitoring"),children:e.jsx(ee,{message:s("common:inDevelopment"),description:"性能监控图表功能正在开发中...",type:"info",showIcon:!0})},"monitoring")]})})]})};export{ve as default};
