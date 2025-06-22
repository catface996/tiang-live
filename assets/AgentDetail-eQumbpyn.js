import{a as h,j as t}from"./react-MdpB-M3H.js";import{a_ as M,e as W,u as H,af as K,a3 as $,S as v,B as x,bu as U,p as L,c as _,bi as V,aD as q,a9 as G,ai as J,aW as Q,U as y,V as r,W as m,n as X,b3 as Y,aE as T,au as D,_ as g,ax as d,a6 as j,ag as I,ap as Z,d as n,A as tt}from"./react-dom-QQALPBrT.js";import{u as et}from"./index-B75Nmaw9.js";import{s as st}from"./index-Daowydkz.js";import"./vendor-ClJIwLAB.js";import"./dayjs-Bzorz0fL.js";import"./pdf-utils-C_SCuxBx.js";import"./media-utils-evJiVgOc.js";import"./lodash-BORto0-T.js";import"./redux-CiqK6azd.js";import"./echarts-core-CUuKLdQv.js";import"./antd-icons-CI4I6I7B.js";import"./emotion-BhZTwsuK.js";import"./mermaid-B5ZLspDL.js";import"./d3-C77K6LmW.js";import"./i18n-CMVetavo.js";const{Title:at,Text:b,Paragraph:ot}=_,{TabPane:f}=D,nt=n.div`
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: ${s=>s.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,it=n(g)`
  margin-bottom: 24px;
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 12px;
  
  .ant-card-body {
    padding: 32px;
  }
`,rt=n.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 24px;
`,dt=n.div`
  flex-shrink: 0;
`,lt=n(tt)`
  background: linear-gradient(135deg, ${s=>s.$bgColor}, ${s=>s.$bgColor}dd) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px ${s=>s.$bgColor}40;
  border: 2px solid ${s=>s.$bgColor}20;
  
  .anticon {
    color: #ffffff !important;
    font-size: 32px;
  }
`,ct=n.div`
  flex: 1;
  min-width: 0;
`,xt=n(at)`
  margin: 0 0 8px 0 !important;
  color: ${s=>s.$isDark?"#ffffff":"#262626"} !important;
`,gt=n.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`,w=n($)`
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
`,mt=n.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`,p=n(g)`
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px;
  
  .ant-statistic-content-value {
    color: ${s=>s.$isDark?"#ffffff":"#262626"};
  }
`,ft=n(g)`
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 12px;
  margin-bottom: 24px;
  
  .ant-tabs-content-holder {
    padding: 24px;
  }
`,A=n.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  
  ${s=>{switch(s.status){case"running":return"background-color: #52c41a; box-shadow: 0 0 6px #52c41a60;";case"stopped":return"background-color: #ff4d4f; box-shadow: 0 0 6px #ff4d4f60;";case"paused":return"background-color: #faad14; box-shadow: 0 0 6px #faad1460;";default:return"background-color: #d9d9d9;"}}}
`,pt={id:"1",name:"日志分析智能体",type:"analysis",status:"running",description:"专门用于分析系统日志，识别异常模式和潜在问题的智能体。具备自然语言处理和模式识别能力。",lastActive:"2分钟前",tags:["日志分析","异常检测","自动化"],stats:{tasksCompleted:1247,successRate:98.5,avgResponseTime:156,uptime:"15天8小时"}},ut=[{time:"2024-01-20 14:30:25",level:"INFO",message:"智能体启动成功"},{time:"2024-01-20 14:30:30",level:"INFO",message:"开始执行日志分析任务"},{time:"2024-01-20 14:31:15",level:"WARN",message:"检测到异常日志模式"},{time:"2024-01-20 14:31:20",level:"INFO",message:"生成分析报告"},{time:"2024-01-20 14:32:00",level:"INFO",message:"任务执行完成"}],ht=[{id:1,task:"系统日志分析",startTime:"2024-01-20 14:30:00",endTime:"2024-01-20 14:32:00",status:"success",duration:"2分钟"},{id:2,task:"错误日志检测",startTime:"2024-01-20 13:15:00",endTime:"2024-01-20 13:16:30",status:"success",duration:"1分30秒"},{id:3,task:"性能日志分析",startTime:"2024-01-20 12:00:00",endTime:"2024-01-20 12:05:00",status:"failed",duration:"5分钟"},{id:4,task:"安全日志审计",startTime:"2024-01-20 11:30:00",endTime:"2024-01-20 11:32:00",status:"success",duration:"2分钟"}],zt=()=>{const{id:s}=M(),k=W(),{t:e}=H(["agents","common"]),{currentTheme:R}=et(o=>o.theme);K.useToken();const i=R==="dark",[a,jt]=h.useState(pt),[S,C]=h.useState(!1);h.useEffect(()=>{st(e("agents:detail.title"))},[s,e]);const N=()=>({analysis:{name:e("agents:types.analysis"),color:"#52c41a",bgColor:"#f6ffed",icon:"📊"}}),B=o=>({running:{text:e("agents:status.running"),color:"#52c41a",bgColor:"#f6ffed"},stopped:{text:e("agents:status.stopped"),color:"#ff4d4f",bgColor:"#fff2f0"},paused:{text:e("agents:status.paused"),color:"#faad14",bgColor:"#fff7e6"}})[o],P=o=>({analysis:i?"#52c41a":"#73d13d"})[o]||(i?"#1890ff":"#4096ff"),l=N().analysis,c=B(a.status),z=P(a.type),u=o=>{C(!0),setTimeout(()=>{C(!1),console.log(`执行操作: ${o}`)},1e3)},E=[{title:e("agents:detail.logs"),dataIndex:"time",key:"time",width:180},{title:e("common:level"),dataIndex:"level",key:"level",width:80,render:o=>t.jsx($,{color:o==="ERROR"?"red":o==="WARN"?"orange":"blue",children:o})},{title:e("common:message"),dataIndex:"message",key:"message"}],F=[{title:e("agents:detail.history"),dataIndex:"task",key:"task"},{title:e("common:startTime"),dataIndex:"startTime",key:"startTime",width:180},{title:e("common:endTime"),dataIndex:"endTime",key:"endTime",width:180},{title:e("common:duration"),dataIndex:"duration",key:"duration",width:120},{title:e("common:status"),dataIndex:"status",key:"status",width:100,render:o=>t.jsx($,{color:o==="success"?"green":"red",children:e(o==="success"?"common:success":"common:failed")})}];return t.jsxs(nt,{$isDark:i,children:[t.jsxs(it,{$isDark:i,children:[t.jsx(v,{style:{marginBottom:24},children:t.jsx(x,{icon:t.jsx(U,{}),onClick:()=>k("/agents"),children:e("common:back")})}),t.jsxs(rt,{children:[t.jsx(dt,{children:t.jsx(lt,{size:80,icon:t.jsx(L,{}),$bgColor:z})}),t.jsxs(ct,{children:[t.jsxs(xt,{level:2,$isDark:i,children:[t.jsx(A,{status:a.status}),a.name]}),t.jsxs(gt,{children:[t.jsx(w,{$bgColor:l.bgColor,$borderColor:l.color,$textColor:l.color,children:l.name}),t.jsx(w,{$bgColor:c.bgColor,$borderColor:c.color,$textColor:c.color,children:c.text})]}),t.jsx(ot,{style:{color:i?"#8c8c8c":"#666",marginBottom:24},children:a.description}),t.jsxs(mt,{children:[t.jsx(x,{type:"primary",icon:a.status==="running"?t.jsx(V,{}):t.jsx(q,{}),loading:S,onClick:()=>u(a.status==="running"?"stop":"start"),children:a.status==="running"?e("agents:actions.stop"):e("agents:actions.start")}),t.jsx(x,{icon:t.jsx(G,{}),onClick:()=>k(`/agents/edit/${a.id}`),children:e("agents:actions.edit")}),t.jsx(x,{icon:t.jsx(J,{}),onClick:()=>u("restart"),children:e("agents:actions.restart")}),t.jsx(x,{danger:!0,icon:t.jsx(Q,{}),onClick:()=>u("delete"),children:e("agents:actions.delete")})]})]})]}),t.jsxs(y,{gutter:24,children:[t.jsx(r,{xs:24,sm:12,md:6,children:t.jsx(p,{$isDark:i,children:t.jsx(m,{title:e("agents:stats.tasksCompleted"),value:a.stats.tasksCompleted,prefix:t.jsx(X,{})})})}),t.jsx(r,{xs:24,sm:12,md:6,children:t.jsx(p,{$isDark:i,children:t.jsx(m,{title:e("agents:stats.successRate"),value:a.stats.successRate,suffix:"%",prefix:t.jsx(Y,{})})})}),t.jsx(r,{xs:24,sm:12,md:6,children:t.jsx(p,{$isDark:i,children:t.jsx(m,{title:e("agents:stats.responseTime"),value:a.stats.avgResponseTime,suffix:"ms",prefix:t.jsx(T,{})})})}),t.jsx(r,{xs:24,sm:12,md:6,children:t.jsx(p,{$isDark:i,children:t.jsx(m,{title:e("agents:detail.uptime"),value:a.stats.uptime,prefix:t.jsx(T,{})})})})]})]}),t.jsx(ft,{$isDark:i,children:t.jsxs(D,{defaultActiveKey:"overview",children:[t.jsx(f,{tab:e("agents:detail.overview"),children:t.jsxs(y,{gutter:24,children:[t.jsx(r,{xs:24,lg:12,children:t.jsx(g,{title:e("agents:detail.basicInfo"),bordered:!1,children:t.jsxs(d,{column:1,children:[t.jsx(d.Item,{label:e("agents:detail.id"),children:a.id}),t.jsx(d.Item,{label:e("agents:detail.name"),children:a.name}),t.jsx(d.Item,{label:e("agents:detail.type"),children:l.name}),t.jsxs(d.Item,{label:e("agents:detail.status"),children:[t.jsx(A,{status:a.status}),c.text]}),t.jsx(d.Item,{label:e("agents:detail.lastActiveAt"),children:a.lastActive})]})})}),t.jsx(r,{xs:24,lg:12,children:t.jsx(g,{title:e("agents:detail.performance"),bordered:!1,children:t.jsxs(v,{direction:"vertical",style:{width:"100%"},children:[t.jsxs("div",{children:[t.jsx(b,{children:e("agents:detail.cpuUsage")}),t.jsx(j,{percent:45,status:"active"})]}),t.jsxs("div",{children:[t.jsx(b,{children:e("agents:detail.memoryUsage")}),t.jsx(j,{percent:67,status:"active"})]}),t.jsxs("div",{children:[t.jsx(b,{children:e("agents:detail.errorRate")}),t.jsx(j,{percent:2,status:"exception"})]})]})})})]})},"overview"),t.jsx(f,{tab:e("agents:detail.logs"),children:t.jsx(I,{columns:E,dataSource:ut,rowKey:"time",pagination:{pageSize:10}})},"logs"),t.jsx(f,{tab:e("agents:detail.history"),children:t.jsx(I,{columns:F,dataSource:ht,rowKey:"id",pagination:{pageSize:10}})},"history"),t.jsx(f,{tab:e("agents:detail.monitoring"),children:t.jsx(Z,{message:e("common:inDevelopment"),description:"性能监控图表功能正在开发中...",type:"info",showIcon:!0})},"monitoring")]})})]})};export{zt as default};
