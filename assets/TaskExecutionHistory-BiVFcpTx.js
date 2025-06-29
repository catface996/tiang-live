import{u as W,a as Q,b as V,j as e,d as o}from"./index-CCrQ40Eo.js";import{r as c,J as T,K as v,N as J,O as C,T as U,d as S,C as m,j as p,D as X,B as R,n as G,L as w,t as Z,P as E,Q as ee,g as te,U as se,V as ae,q as re,W as oe,X as ie,a as ne,l as ce,i as D}from"./antd-DB_1XVWl.js";import{s as le}from"./index-Daowydkz.js";import{S as de}from"./SearchFilterBar-hGzW7t0l.js";import"./Breadcrumb-DmURwxF7.js";import"./vendor-DJG_os-6.js";const{Title:_,Text:f}=U,{Option:He}=ce,{RangePicker:ue}=X,ge=o.div`
  padding: 24px;
  background-color: var(--bg-layout);
  color: var(--text-primary);
  min-height: 100vh;
`,me=o.div`
  background-color: var(--bg-container);
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border-light);
`,xe=o(D)`
  margin-bottom: 8px;
  border-radius: 6px;
  background-color: var(--bg-container);
  border: 1px solid var(--border-light);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-1px);
  }
  
  &.completed {
    border-left: 4px solid var(--success);
  }
  
  &.running {
    border-left: 4px solid var(--primary);
  }
  
  &.scheduled {
    border-left: 4px solid var(--warning);
  }
  
  &.failed {
    border-left: 4px solid var(--error);
  }
  
  .ant-card-body {
    background-color: var(--bg-container);
    color: var(--text-primary);
  }
`,b=o(D)`
  background-color: var(--bg-container);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-1px);
  }
  
  .ant-card-body {
    background-color: var(--bg-container);
    text-align: center;
    padding: 20px;
  }
  
  .stats-number {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
    
    &.primary { color: var(--primary); }
    &.success { color: var(--success); }
    &.warning { color: var(--warning); }
    &.error { color: var(--error); }
  }
  
  .stats-label {
    color: var(--text-secondary);
    font-size: 14px;
  }
`,he=o.div`
  margin-bottom: 24px;
  
  .ant-typography {
    color: var(--text-primary);
    margin: 0;
  }
  
  .header-icon {
    margin-right: 8px;
    color: var(--primary);
  }
`,ye=o(v)`
  margin-bottom: 24px;
  
  .ant-breadcrumb-link {
    color: var(--text-secondary);
    
    &:hover {
      color: var(--primary);
    }
  }
  
  .breadcrumb-link {
    cursor: pointer;
    margin-left: 4px;
    color: var(--text-secondary);
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary);
    }
  }
`;o.div`
  margin-bottom: 24px;
  
  .ant-alert {
    background-color: var(--bg-elevated);
    border-color: var(--border-light);
    color: var(--text-primary);
  }
`;const pe=o.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .ant-typography {
    color: var(--text-primary);
    margin: 0;
  }
`,ke=o.div`
  .execution-title {
    .ant-typography {
      color: var(--text-primary);
    }
  }
  
  .execution-meta {
    .ant-typography {
      color: var(--text-secondary);
    }
  }
  
  .execution-progress {
    margin-top: 8px;
    
    .progress-text {
      color: var(--text-secondary);
      font-size: 12px;
      margin-bottom: 4px;
    }
  }
`,Te=o(R)`
  &.ant-btn-text {
    color: var(--text-primary);
    
    &:hover {
      background-color: var(--bg-hover);
      color: var(--primary);
    }
  }
`,x=[{id:"exec_001",taskCollectionId:"1",taskCollectionName:"核心业务系统健康检查",status:"completed",triggerType:"cron",triggerSource:null,startTime:"2025-06-26 10:00:00",endTime:"2025-06-26 10:15:30",duration:930,executedTargets:8,totalTargets:8,successRate:100,details:{targets:[{id:"entity_001",name:"用户管理系统",type:"entity",status:"success",actions:[{id:"health_check",name:"健康检查",status:"success",duration:120},{id:"performance_analysis",name:"性能分析",status:"success",duration:180}]}]}},{id:"exec_002",taskCollectionId:"2",taskCollectionName:"数据库性能监控",status:"running",triggerType:"hook",triggerSource:"API调用",startTime:"2025-06-26 14:30:00",endTime:null,duration:null,executedTargets:3,totalTargets:5,successRate:75,details:null},{id:"exec_003",taskCollectionId:"3",taskCollectionName:"安全扫描任务",status:"scheduled",triggerType:"cron",triggerSource:null,startTime:"2025-06-26 23:00:00",endTime:null,duration:null,executedTargets:0,totalTargets:6,successRate:0,details:null},{id:"exec_004",taskCollectionId:"1",taskCollectionName:"核心业务系统健康检查",status:"failed",triggerType:"cron",triggerSource:null,startTime:"2025-06-25 15:00:00",endTime:"2025-06-25 15:08:45",duration:525,executedTargets:5,totalTargets:8,successRate:62.5,details:{targets:[{id:"entity_002",name:"订单管理系统",type:"entity",status:"failed",actions:[{id:"health_check",name:"健康检查",status:"failed",duration:60}]}]}},{id:"exec_005",taskCollectionId:"4",taskCollectionName:"网络安全巡检",status:"completed",triggerType:"hook",triggerSource:"Webhook触发",startTime:"2025-06-24 10:30:00",endTime:"2025-06-24 11:45:20",duration:4520,executedTargets:12,totalTargets:12,successRate:100,details:{targets:[{id:"entity_003",name:"防火墙系统",type:"entity",status:"success",actions:[{id:"security_scan",name:"安全扫描",status:"success",duration:300}]}]}},{id:"exec_006",taskCollectionId:"2",taskCollectionName:"数据库性能监控",status:"completed",triggerType:"cron",triggerSource:null,startTime:"2025-06-23 18:00:00",endTime:"2025-06-23 18:25:15",duration:1515,executedTargets:5,totalTargets:5,successRate:100,details:{targets:[{id:"entity_004",name:"MySQL主库",type:"entity",status:"success",actions:[{id:"performance_analysis",name:"性能分析",status:"success",duration:240}]}]}},{id:"exec_007",taskCollectionId:"5",taskCollectionName:"备份验证任务",status:"completed",triggerType:"cron",triggerSource:null,startTime:"2025-06-22 02:00:00",endTime:"2025-06-22 02:45:30",duration:2730,executedTargets:3,totalTargets:3,successRate:100,details:{targets:[{id:"sequence_001",name:"数据备份流程",type:"sequence",status:"success",actions:[{id:"backup_verify",name:"备份验证",status:"success",duration:600}]}]}},{id:"exec_008",taskCollectionId:"6",taskCollectionName:"日志分析任务",status:"failed",triggerType:"hook",triggerSource:"监控告警触发",startTime:"2025-06-21 16:20:00",endTime:"2025-06-21 16:35:15",duration:915,executedTargets:2,totalTargets:4,successRate:50,details:{targets:[{id:"entity_005",name:"应用日志系统",type:"entity",status:"failed",actions:[{id:"log_analysis",name:"日志分析",status:"failed",duration:180}]}]}},{id:"exec_009",taskCollectionId:"7",taskCollectionName:"容器健康检查",status:"completed",triggerType:"cron",triggerSource:null,startTime:"2025-06-20 09:00:00",endTime:"2025-06-20 09:12:30",duration:750,executedTargets:15,totalTargets:15,successRate:100,details:{targets:[{id:"entity_006",name:"Kubernetes集群",type:"entity",status:"success",actions:[{id:"health_check",name:"健康检查",status:"success",duration:90}]}]}},{id:"exec_010",taskCollectionId:"8",taskCollectionName:"API接口监控",status:"running",triggerType:"hook",triggerSource:"手动触发",startTime:"2025-06-26 15:45:00",endTime:null,duration:null,executedTargets:6,totalTargets:10,successRate:85,details:null},{id:"exec_011",taskCollectionId:"1",taskCollectionName:"核心业务系统健康检查",status:"scheduled",triggerType:"cron",triggerSource:null,startTime:"2025-06-27 09:00:00",endTime:null,duration:null,executedTargets:0,totalTargets:8,successRate:0,details:null},{id:"exec_012",taskCollectionId:"3",taskCollectionName:"安全扫描任务",status:"completed",triggerType:"hook",triggerSource:"API调用",startTime:"2025-06-19 14:15:00",endTime:"2025-06-19 15:30:45",duration:4545,executedTargets:6,totalTargets:6,successRate:100,details:{targets:[{id:"entity_007",name:"Web应用防火墙",type:"entity",status:"success",actions:[{id:"security_scan",name:"安全扫描",status:"success",duration:450}]}]}},{id:"exec_013",taskCollectionId:"4",taskCollectionName:"网络安全巡检",status:"failed",triggerType:"cron",triggerSource:null,startTime:"2025-06-18 08:00:00",endTime:"2025-06-18 08:25:30",duration:1530,executedTargets:8,totalTargets:12,successRate:66.7,details:{targets:[{id:"entity_008",name:"入侵检测系统",type:"entity",status:"failed",actions:[{id:"security_scan",name:"安全扫描",status:"failed",duration:120}]}]}},{id:"exec_014",taskCollectionId:"5",taskCollectionName:"备份验证任务",status:"scheduled",triggerType:"cron",triggerSource:null,startTime:"2025-06-27 02:00:00",endTime:null,duration:null,executedTargets:0,totalTargets:3,successRate:0,details:null},{id:"exec_015",taskCollectionId:"6",taskCollectionName:"日志分析任务",status:"completed",triggerType:"hook",triggerSource:"Webhook触发",startTime:"2025-06-17 11:30:00",endTime:"2025-06-17 12:15:20",duration:2720,executedTargets:4,totalTargets:4,successRate:100,details:{targets:[{id:"sequence_002",name:"日志聚合流程",type:"sequence",status:"success",actions:[{id:"log_analysis",name:"日志分析",status:"success",duration:360}]}]}}],Ne=()=>{const{t:s}=W(["taskExecutionHistory","common"]),{taskId:u}=Q(),j=V(),[d,H]=c.useState([]),[N,B]=c.useState([]),[g,P]=c.useState(""),[h,$]=c.useState("all"),[y,z]=c.useState("all"),[l,L]=c.useState(null),[k,A]=c.useState("desc");c.useEffect(()=>{le(s("taskExecutionHistory:title"));const t=u?x.filter(a=>a.taskCollectionId===u):x;H(t),console.log("加载的执行历史记录总数:",x.length),console.log("过滤后的执行历史记录:",t.length),console.log("当前taskId:",u),console.log("模拟数据前3条:",x.slice(0,3))},[u,s]),c.useEffect(()=>{console.log("筛选逻辑执行 - executionHistory长度:",d.length),console.log("当前筛选条件:",{searchKeyword:g,statusFilter:h,triggerFilter:y,dateRange:l,sortOrder:k});let t=[...d];g&&(t=t.filter(a=>{var r;return a.taskCollectionName.toLowerCase().includes(g.toLowerCase())||((r=a.triggerSource)==null?void 0:r.toLowerCase().includes(g.toLowerCase()))})),h!=="all"&&(t=t.filter(a=>a.status===h)),y!=="all"&&(t=t.filter(a=>a.triggerType===y)),l&&l[0]&&l[1]&&(t=t.filter(a=>{var i,n;const r=T(a.startTime);return r.isAfter((i=l[0])==null?void 0:i.startOf("day"))&&r.isBefore((n=l[1])==null?void 0:n.endOf("day"))})),t.sort((a,r)=>{const i=T(a.startTime).unix(),n=T(r.startTime).unix();return k==="desc"?n-i:i-n}),console.log("筛选后的记录数量:",t.length),console.log("筛选后的前3条记录:",t.slice(0,3)),B(t)},[d,g,h,y,l,k]);const M=()=>{const t=u?x.filter(a=>a.taskCollectionId===u):x;H(t)},I=t=>{j(`/task-management/task-collections/run/${t.id}`)},O=t=>{switch(t){case"completed":return"success";case"running":return"processing";case"scheduled":return"warning";case"failed":return"error";default:return"default"}},F=t=>{switch(t){case"completed":return e.jsx(ne,{className:"status-icon success"});case"running":return e.jsx(ie,{className:"status-icon primary"});case"scheduled":return e.jsx(E,{className:"status-icon warning"});case"failed":return e.jsx(oe,{className:"status-icon error"});default:return e.jsx(E,{className:"status-icon"})}},Y=(t,a)=>t==="cron"?{icon:e.jsx(ae,{className:"trigger-icon primary"}),text:s("taskExecutionHistory:triggerType.cron"),color:"blue"}:{icon:e.jsx(re,{className:"trigger-icon success"}),text:a||s("taskExecutionHistory:triggerType.hook"),color:"green"},q=t=>s(`taskExecutionHistory:status.${t}`),K=t=>{if(t<60)return s("taskExecutionHistory:time.formatDuration.seconds",{count:t});if(t<3600){const i=Math.floor(t/60),n=t%60;return s("taskExecutionHistory:time.formatDuration.minutes",{minutes:i,seconds:n})}const a=Math.floor(t/3600),r=Math.floor(t%3600/60);return s("taskExecutionHistory:time.formatDuration.hours",{hours:a,minutes:r})};return e.jsxs(ge,{children:[e.jsxs(ye,{children:[e.jsxs(v.Item,{children:[e.jsx(J,{}),e.jsx("span",{className:"breadcrumb-link",onClick:()=>j("/"),children:s("taskExecutionHistory:breadcrumb.home")})]}),e.jsxs(v.Item,{children:[e.jsx(C,{}),e.jsx("span",{className:"breadcrumb-link",onClick:()=>j("/task-management/task-collections"),children:s("taskExecutionHistory:breadcrumb.taskCollections")})]}),e.jsxs(v.Item,{children:[e.jsx(C,{}),s("taskExecutionHistory:breadcrumb.executionHistory")]})]}),e.jsx(he,{children:e.jsxs(_,{level:2,children:[e.jsx(C,{className:"header-icon"}),s("taskExecutionHistory:title")]})}),e.jsxs(S,{gutter:16,style:{marginBottom:24},children:[e.jsx(m,{xs:24,sm:6,children:e.jsxs(b,{children:[e.jsx("div",{className:"stats-number primary",children:d.length}),e.jsx("div",{className:"stats-label",children:s("taskExecutionHistory:stats.totalExecutions")})]})}),e.jsx(m,{xs:24,sm:6,children:e.jsxs(b,{children:[e.jsx("div",{className:"stats-number success",children:d.filter(t=>t.status==="completed").length}),e.jsx("div",{className:"stats-label",children:s("taskExecutionHistory:stats.successfulExecutions")})]})}),e.jsx(m,{xs:24,sm:6,children:e.jsxs(b,{children:[e.jsx("div",{className:"stats-number primary",children:d.filter(t=>t.status==="running").length}),e.jsx("div",{className:"stats-label",children:s("taskExecutionHistory:stats.runningExecutions")})]})}),e.jsx(m,{xs:24,sm:6,children:e.jsxs(b,{children:[e.jsx("div",{className:"stats-number warning",children:d.filter(t=>t.status==="scheduled").length}),e.jsx("div",{className:"stats-label",children:s("taskExecutionHistory:stats.scheduledExecutions")})]})})]}),e.jsx("div",{className:"search-filter-responsive",children:e.jsx(de,{searchValue:g,onSearchChange:P,searchPlaceholder:s("taskExecutionHistory:search.placeholder"),filters:[{key:"status",value:h,onChange:$,options:[{value:"all",label:s("taskExecutionHistory:status.all")},{value:"completed",label:s("taskExecutionHistory:status.completed")},{value:"running",label:s("taskExecutionHistory:status.running")},{value:"scheduled",label:s("taskExecutionHistory:status.scheduled")},{value:"failed",label:s("taskExecutionHistory:status.failed")}],placeholder:s("taskExecutionHistory:filter.status"),width:120},{key:"trigger",value:y,onChange:z,options:[{value:"all",label:s("taskExecutionHistory:triggerType.all")},{value:"cron",label:s("taskExecutionHistory:triggerType.cron")},{value:"hook",label:s("taskExecutionHistory:triggerType.hook")}],placeholder:s("taskExecutionHistory:filter.triggerType"),width:120},{key:"sort",value:k,onChange:A,options:[{value:"desc",label:s("taskExecutionHistory:sort.newest")},{value:"asc",label:s("taskExecutionHistory:sort.oldest")}],placeholder:s("taskExecutionHistory:filter.sort"),width:120}],showRefresh:!1,extraActions:e.jsxs(p,{size:"middle",children:[e.jsx(ue,{value:l,onChange:L,placeholder:[s("taskExecutionHistory:filter.startDate"),s("taskExecutionHistory:filter.endDate")],style:{width:240}}),e.jsx(R,{icon:e.jsx(G,{}),onClick:M,title:s("common:refresh")})]})})}),e.jsxs(me,{children:[e.jsx(pe,{children:e.jsxs(_,{level:4,children:[s("taskExecutionHistory:list.title")," (",N.length,s("taskExecutionHistory:list.count"),")"]})}),e.jsx(w,{dataSource:N,renderItem:t=>{const a=Y(t.triggerType,t.triggerSource),r=T(t.startTime).format("YYYY-MM-DD HH:mm:ss"),i=q(t.status);return e.jsx(w.Item,{style:{padding:0,marginBottom:8},children:e.jsx(xe,{className:t.status,size:"small",hoverable:!0,onClick:()=>I(t),style:{width:"100%"},children:e.jsx(ke,{children:e.jsxs(S,{align:"middle",justify:"space-between",children:[e.jsx(m,{flex:"auto",children:e.jsxs(p,{direction:"vertical",size:4,children:[e.jsxs(p,{className:"execution-title",children:[F(t.status),e.jsx(f,{strong:!0,children:t.taskCollectionName}),e.jsx(Z,{color:a.color,icon:a.icon,children:a.text})]}),e.jsxs(p,{size:16,className:"execution-meta",children:[e.jsxs(f,{type:"secondary",children:[e.jsx(E,{})," ",r]}),t.duration&&e.jsxs(f,{type:"secondary",children:[e.jsx(ee,{})," ",K(t.duration)]}),e.jsxs(f,{type:"secondary",children:[e.jsx(te,{})," ",t.executedTargets,"/",t.totalTargets," 目标"]})]}),t.totalTargets>0&&e.jsx("div",{className:"execution-progress",children:e.jsxs("div",{className:"progress-text",children:["执行进度: ",t.executedTargets,"/",t.totalTargets," (",Math.round(t.executedTargets/t.totalTargets*100),"%)"]})})]})}),e.jsx(m,{children:e.jsxs(p,{children:[e.jsx(se,{status:O(t.status),text:i}),e.jsx(Te,{type:"text",size:"small",onClick:n=>{n.stopPropagation(),I(t)},children:"查看详情"})]})})]})})})})},pagination:{pageSize:20,showSizeChanger:!0,showQuickJumper:!0,showTotal:(t,a)=>s("taskExecutionHistory:pagination.showTotal",{start:a[0],end:a[1],total:t}),pageSizeOptions:["10","20","50","100"]}})]})]})};export{Ne as default};
