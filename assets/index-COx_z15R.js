import{u as le,j as e,d as g}from"./index-CCrQ40Eo.js";import{r as c,aa as l,T as re,j as u,as as F,B as x,n as de,o as ue,d as y,C as o,S as j,X as N,at as E,a as pe,M as V,ag as b,l as O,a8 as he,x as i,t as p,y as v,i as w,O as me,Q as xe,k as je,a2 as ge,au as fe,u as R,v as ke,w as ye,av as be,aj as C,D as Te}from"./antd-DB_1XVWl.js";import{s as ve}from"./index-Daowydkz.js";import{S as Re}from"./SearchFilterBar-hGzW7t0l.js";import"./vendor-DJG_os-6.js";const{Title:Ce,Paragraph:H,Text:h}=re,{Option:I}=O,{TextArea:Ie}=b,{RangePicker:Fe}=Te,Se=g.div`
  padding: 24px;
`,we=g.div`
  margin-bottom: 24px;
`,S=g(w)`
  .ant-card-body {
    padding: 16px;
  }
`,ze=g(w)`
  height: 100%;
  min-height: 320px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 57px);
  }

  .ant-card-head {
    padding: 12px 16px;
    min-height: 57px;
    
    .ant-card-head-title {
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
    }
    
    .ant-card-extra {
      padding: 0;
    }
    
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      .title-left {
        flex: 1;
        min-width: 0; /* 允许文本截断 */
        
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      
      .title-right {
        flex-shrink: 0;
        margin-left: 8px;
      }
    }
  }
  
  .card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    
    .ant-btn {
      color: #666;
      
      &:hover {
        color: #1890ff;
        background-color: rgba(24, 144, 255, 0.1);
      }
    }
  }

  /* 响应式优化 */
  @media (max-width: 768px) {
    min-height: 280px;
    
    .ant-card-head {
      padding: 10px 12px;
      min-height: 50px;
    }
    
    .ant-card-body {
      padding: 12px;
      height: calc(100% - 50px);
    }
  }
`,Pe=g.div`
  .ant-col {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
`;g.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;const Ne=()=>{var q,D,A;const[_e,Be]=c.useState(!1),[L,T]=c.useState(!1),[K,z]=c.useState(!1),[P,_]=c.useState(null),[n,Q]=c.useState(null),[X,Y]=c.useState(""),[G,J]=c.useState("all"),[U,W]=c.useState("all"),[f]=l.useForm(),{t:s}=le(["tasks","common"]);c.useEffect(()=>{ve(s("tasks:inspection.title"))},[s]);const m=[{id:"1",name:"核心服务健康检查",description:"定期触发核心服务监控任务集合，执行健康检查、性能分析等巡检动作",type:"health_check",taskCollections:["核心服务监控任务","业务流程巡检任务"],schedule:{type:"interval",expression:"*/5 * * * *",timezone:"Asia/Shanghai"},config:{timeout:30,retryCount:3,alertThreshold:80,checkpoints:["任务集合执行状态","巡检动作成功率","响应时间","错误率"]},status:"running",lastRun:{startTime:"2024-06-15 14:30:00",endTime:"2024-06-15 14:30:45",status:"success",duration:45,result:{核心服务监控任务:{status:"success",duration:25,actions:7},业务流程巡检任务:{status:"success",duration:20,actions:6}}},nextRun:"2024-06-15 14:35:00",statistics:{totalRuns:2847,successCount:2801,failureCount:46,avgDuration:42,successRate:98.4},alerts:{enabled:!0,channels:["email","webhook","sms"],conditions:["任务集合执行失败","成功率<80%","执行超时"]},createdBy:"运维工程师",createdAt:"2024-06-01",lastModified:"2024-06-14"},{id:"2",name:"数据库性能监控",description:"定期触发数据库相关任务集合，监控数据库集群的性能指标和健康状态",type:"performance_monitor",taskCollections:["数据库监控任务集"],schedule:{type:"cron",expression:"0 */10 * * * *",timezone:"Asia/Shanghai"},config:{timeout:60,retryCount:2,alertThreshold:70,checkpoints:["任务集合状态","数据库连接","查询性能","资源使用率"]},status:"running",lastRun:{startTime:"2024-06-15 14:20:00",endTime:"2024-06-15 14:21:15",status:"success",duration:75,result:{数据库监控任务集:{status:"success",duration:75,actions:4}}},nextRun:"2024-06-15 14:30:00",statistics:{totalRuns:1456,successCount:1398,failureCount:58,avgDuration:68,successRate:96},alerts:{enabled:!0,channels:["email","webhook"],conditions:["数据库任务失败","性能指标异常","连接数超限"]},createdBy:"数据库管理员",createdAt:"2024-06-05",lastModified:"2024-06-13"},{id:"3",name:"安全漏洞扫描",description:"定期触发安全扫描任务集合，执行系统安全检查和漏洞扫描",type:"security_scan",taskCollections:["安全扫描任务集"],schedule:{type:"cron",expression:"0 0 2 * * *",timezone:"Asia/Shanghai"},config:{timeout:300,retryCount:1,alertThreshold:90,checkpoints:["安全扫描执行","漏洞检测","合规检查","风险评估"]},status:"paused",lastRun:{startTime:"2024-06-14 02:00:00",endTime:"2024-06-14 02:08:30",status:"success",duration:510,result:{安全扫描任务集:{status:"success",duration:510,actions:4}}},nextRun:"2024-06-16 02:00:00",statistics:{totalRuns:45,successCount:42,failureCount:3,avgDuration:485,successRate:93.3},alerts:{enabled:!0,channels:["email"],conditions:["发现高危漏洞","安全扫描失败","合规检查不通过"]},createdBy:"安全工程师",createdAt:"2024-05-20",lastModified:"2024-06-10"}],k={health_check:{name:s("tasks:inspection.types.health_check"),color:"green",icon:e.jsx(fe,{})},performance_monitor:{name:s("tasks:inspection.types.performance_monitor"),color:"blue",icon:e.jsx(ge,{})},security_scan:{name:s("tasks:inspection.types.security_scan"),color:"orange",icon:e.jsx(je,{})},log_analysis:{name:s("tasks:inspection.types.log_analysis"),color:"purple",icon:e.jsx(xe,{})}},B=t=>{const r={running:{color:"green",text:s("tasks:inspection.status.active")},paused:{color:"orange",text:s("tasks:inspection.status.paused")},stopped:{color:"red",text:s("common:status.stopped")},error:{color:"red",text:s("common:status.error")}}[t];return e.jsx(p,{color:r.color,children:r.text})},M=t=>{const r={success:{color:"green",text:s("common:status.success")},failed:{color:"red",text:s("tasks:inspection.status.failed")},timeout:{color:"orange",text:s("common:status.timeout")}}[t];return e.jsx(p,{color:r.color,children:r.text})},Z=()=>{_(null),f.resetFields(),T(!0)},ee=t=>{_(t),f.setFieldsValue({name:t.name,description:t.description,type:t.type,timeout:t.config.timeout,retryCount:t.config.retryCount,alertThreshold:t.config.alertThreshold}),T(!0)},$=t=>{Q(t),z(!0)},se=t=>{C.success(s("tasks:inspection.messages.startSuccess"))},te=t=>{C.success(s("tasks:inspection.messages.pauseSuccess"))},ne=async()=>{try{const t=await f.validateFields();P?C.success(s("tasks:inspection.messages.updateSuccess")):C.success(s("tasks:inspection.messages.createSuccess")),T(!1),f.resetFields()}catch(t){console.error("表单验证失败:",t)}},ie=()=>m.map(t=>{const a=k[t.type],r=t.taskCollections.length;return e.jsx(o,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:e.jsxs(ze,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(u,{children:[a==null?void 0:a.icon,e.jsx("span",{children:t.name})]})}),e.jsx("div",{className:"title-right",children:B(t.status)})]}),onClick:()=>$(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(u,{wrap:!0,size:"small",children:[e.jsx(p,{color:a==null?void 0:a.color,icon:a==null?void 0:a.icon,children:a==null?void 0:a.name}),e.jsxs(p,{icon:e.jsx(E,{}),children:[r,s("tasks:inspection.card.taskCollections")]})]})}),e.jsx("div",{style:{marginBottom:16,flex:1},children:e.jsx(H,{ellipsis:{rows:2,tooltip:t.description},style:{marginBottom:0,minHeight:44,fontSize:13,lineHeight:"1.5"},children:t.description})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(y,{gutter:12,children:[e.jsx(o,{span:12,children:e.jsx(j,{title:s("tasks:inspection.card.successRate"),value:t.statistics.successRate,suffix:"%",valueStyle:{fontSize:14}})}),e.jsx(o,{span:12,children:e.jsx(j,{title:s("tasks:inspection.card.executionCount"),value:t.statistics.totalRuns,valueStyle:{fontSize:14}})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(h,{strong:!0,style:{fontSize:12},children:s("tasks:inspection.card.lastExecution")}),M(t.lastRun.status)]}),e.jsxs(h,{type:"secondary",style:{fontSize:11},children:[t.lastRun.duration,"s"]})]})}),e.jsxs("div",{style:{fontSize:11,color:"#666",lineHeight:"1.4",marginTop:"auto"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[e.jsxs(h,{children:[s("tasks:inspection.card.schedule"),": "]}),e.jsx(h,{children:t.schedule.expression})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(h,{children:[s("tasks:inspection.card.nextExecution"),": "]}),e.jsx(h,{children:t.nextRun})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(u,{children:[e.jsx(R,{title:s("tasks:inspection.card.viewDetails"),children:e.jsx(x,{type:"text",icon:e.jsx(ke,{}),size:"small",onClick:d=>{d.stopPropagation(),$(t)}})}),e.jsx(R,{title:s("tasks:inspection.card.edit"),children:e.jsx(x,{type:"text",icon:e.jsx(ye,{}),size:"small",onClick:d=>{d.stopPropagation(),ee(t)}})}),t.status==="running"?e.jsx(R,{title:s("tasks:inspection.card.pause"),children:e.jsx(x,{type:"text",icon:e.jsx(be,{}),size:"small",onClick:d=>{d.stopPropagation(),te(t.id)}})}):e.jsx(R,{title:s("tasks:inspection.card.start"),children:e.jsx(x,{type:"text",icon:e.jsx(N,{}),size:"small",onClick:d=>{d.stopPropagation(),se(t.id)}})})]})})]})},t.id)}),ae=m.filter(t=>t.status==="running").length,oe=m.reduce((t,a)=>t+a.taskCollections.length,0),ce=m.reduce((t,a)=>t+a.statistics.successRate,0)/m.length;return e.jsxs(Se,{className:"inspection-tasks-page",children:[e.jsx(we,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(Ce,{level:2,style:{margin:0},children:e.jsxs(u,{children:[e.jsx(F,{style:{color:"#1890ff"}}),s("tasks:inspection.title")]})}),e.jsx(H,{style:{marginTop:8,marginBottom:0,fontSize:16},children:s("tasks:inspection.subtitle")})]}),e.jsxs(u,{children:[e.jsx(x,{icon:e.jsx(de,{}),children:s("tasks:inspection.refresh")}),e.jsx(x,{type:"primary",icon:e.jsx(ue,{}),onClick:Z,children:s("tasks:inspection.createTask")})]})]})}),e.jsxs(y,{gutter:16,style:{marginBottom:24},children:[e.jsx(o,{xs:24,sm:12,md:6,children:e.jsx(S,{className:"inspection-stats-primary",children:e.jsx(j,{title:s("tasks:inspection.stats.totalTasks"),value:m.length,suffix:s("common:unit.count"),prefix:e.jsx(F,{})})})}),e.jsx(o,{xs:24,sm:12,md:6,children:e.jsx(S,{className:"inspection-stats-success",children:e.jsx(j,{title:s("tasks:inspection.stats.runningTasks"),value:ae,suffix:s("common:unit.count"),prefix:e.jsx(N,{})})})}),e.jsx(o,{xs:24,sm:12,md:6,children:e.jsx(S,{className:"inspection-stats-warning",children:e.jsx(j,{title:s("tasks:inspection.card.taskCollections"),value:oe,suffix:s("common:unit.count"),prefix:e.jsx(E,{})})})}),e.jsx(o,{xs:24,sm:12,md:6,children:e.jsx(S,{className:"inspection-stats-purple",children:e.jsx(j,{title:s("tasks:inspection.card.successRate"),value:ce.toFixed(1),suffix:"%",prefix:e.jsx(pe,{})})})})]}),e.jsx(Re,{searchValue:X,onSearchChange:Y,searchPlaceholder:s("tasks:inspection.search.placeholder"),filters:[{key:"type",value:G,onChange:J,placeholder:s("tasks:inspection.search.type"),width:120,options:[{value:"all",label:s("tasks:inspection.search.allTypes")},...Object.entries(k).map(([t,a])=>({value:t,label:a.name}))]},{key:"status",value:U,onChange:W,placeholder:s("tasks:inspection.search.status"),width:100,options:[{value:"all",label:s("tasks:inspection.search.allStatuses")},{value:"running",label:s("tasks:inspection.status.active")},{value:"paused",label:s("tasks:inspection.status.paused")},{value:"stopped",label:s("tasks:inspection.status.draft")},{value:"error",label:s("tasks:inspection.status.failed")}]}],onRefresh:()=>window.location.reload()}),e.jsx(Pe,{children:e.jsx(y,{gutter:[16,16],children:ie()})}),e.jsx(V,{title:s(P?"tasks:inspection.editTitle":"tasks:inspection.createTitle"),open:L,onOk:ne,onCancel:()=>T(!1),width:800,children:e.jsxs(l,{form:f,layout:"vertical",initialValues:{type:"health_check",timeout:30,retryCount:3,alertThreshold:80},children:[e.jsx(l.Item,{name:"name",label:s("tasks:inspection.form.name"),rules:[{required:!0,message:s("tasks:inspection.form.nameRequired")}],children:e.jsx(b,{placeholder:s("tasks:inspection.form.namePlaceholder")})}),e.jsx(l.Item,{name:"description",label:s("tasks:inspection.form.description"),rules:[{required:!0,message:s("tasks:inspection.form.descriptionRequired")}],children:e.jsx(Ie,{rows:3,placeholder:s("tasks:inspection.form.descriptionPlaceholder")})}),e.jsxs(y,{gutter:16,children:[e.jsx(o,{span:12,children:e.jsx(l.Item,{name:"type",label:s("tasks:inspection.form.type"),rules:[{required:!0,message:s("tasks:inspection.form.typeRequired")}],children:e.jsxs(O,{placeholder:s("tasks:inspection.form.typePlaceholder"),children:[e.jsx(I,{value:"health_check",children:s("tasks:inspection.types.health_check")}),e.jsx(I,{value:"performance_monitor",children:s("tasks:inspection.types.performance_monitor")}),e.jsx(I,{value:"security_scan",children:s("tasks:inspection.types.security_scan")}),e.jsx(I,{value:"log_analysis",children:s("tasks:inspection.types.log_analysis")})]})})}),e.jsx(o,{span:12,children:e.jsx(l.Item,{name:"timeout",label:s("tasks:inspection.form.timeout"),rules:[{required:!0,message:s("tasks:inspection.form.timeoutRequired")}],children:e.jsx(b,{type:"number",placeholder:s("tasks:inspection.form.timeoutPlaceholder")})})})]}),e.jsxs(y,{gutter:16,children:[e.jsx(o,{span:12,children:e.jsx(l.Item,{name:"retryCount",label:s("tasks:inspection.form.retryCount"),rules:[{required:!0,message:s("tasks:inspection.form.retryCountRequired")}],children:e.jsx(b,{type:"number",placeholder:s("tasks:inspection.form.retryCountPlaceholder")})})}),e.jsx(o,{span:12,children:e.jsx(l.Item,{name:"alertThreshold",label:s("tasks:inspection.form.alertThreshold"),rules:[{required:!0,message:s("tasks:inspection.form.alertThresholdRequired")}],children:e.jsx(b,{type:"number",placeholder:s("tasks:inspection.form.alertThresholdPlaceholder")})})})]}),e.jsx(he,{message:s("common:tips"),description:s("tasks:inspection.tips.createHint"),type:"info",showIcon:!0,style:{marginTop:16}})]})}),e.jsx(V,{title:n==null?void 0:n.name,open:K,onCancel:()=>z(!1),footer:null,width:1200,style:{top:20},children:n&&e.jsxs("div",{children:[e.jsxs(i,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(i.Item,{label:s("tasks:inspection.detail.taskName"),span:2,children:n.name}),e.jsx(i.Item,{label:s("tasks:inspection.detail.taskType"),children:e.jsx(p,{color:(q=k[n.type])==null?void 0:q.color,icon:(D=k[n.type])==null?void 0:D.icon,children:(A=k[n.type])==null?void 0:A.name})}),e.jsx(i.Item,{label:s("common:status"),children:B(n.status)}),e.jsxs(i.Item,{label:s("tasks:inspection.detail.successRate"),children:[n.statistics.successRate,"%"]}),e.jsxs(i.Item,{label:s("tasks:inspection.detail.executionCount"),children:[n.statistics.totalRuns,s("common:unit.times")]}),e.jsxs(i.Item,{label:s("tasks:inspection.detail.avgDuration"),children:[n.statistics.avgDuration,s("tasks:inspection.detail.seconds")]}),e.jsx(i.Item,{label:s("tasks:inspection.detail.nextExecution"),children:n.nextRun}),e.jsx(i.Item,{label:s("tasks:inspection.detail.creator"),children:n.createdBy}),e.jsx(i.Item,{label:s("common:createTime"),children:n.createdAt}),e.jsx(i.Item,{label:s("common:description"),span:2,children:n.description})]}),e.jsxs(v,{defaultActiveKey:"collections",children:[e.jsx(v.TabPane,{tab:s("tasks:inspection.detail.taskCollections"),children:e.jsx(w,{title:s("tasks:inspection.detail.triggeredCollections"),size:"small",children:n.taskCollections.length>0?e.jsx(u,{wrap:!0,children:n.taskCollections.map(t=>e.jsx(p,{icon:e.jsx(me,{}),color:"blue",children:t},t))}):e.jsx(h,{type:"secondary",children:s("tasks:inspection.detail.noCollections")})})},"collections"),e.jsx(v.TabPane,{tab:s("tasks:inspection.detail.configParams"),children:e.jsxs(i,{column:2,size:"small",children:[e.jsxs(i.Item,{label:s("tasks:inspection.detail.timeout"),children:[n.config.timeout,s("tasks:inspection.detail.seconds")]}),e.jsxs(i.Item,{label:s("tasks:inspection.detail.retryCount"),children:[n.config.retryCount,s("common:unit.times")]}),e.jsxs(i.Item,{label:s("tasks:inspection.detail.alertThreshold"),children:[n.config.alertThreshold,"%"]}),e.jsx(i.Item,{label:s("tasks:inspection.detail.scheduleExpression"),children:n.schedule.expression}),e.jsx(i.Item,{label:s("tasks:inspection.detail.timezone"),children:n.schedule.timezone}),e.jsx(i.Item,{label:s("tasks:inspection.detail.checkpoints"),span:2,children:e.jsx(u,{wrap:!0,children:n.config.checkpoints.map(t=>e.jsx(p,{children:t},t))})})]})},"config"),e.jsx(v.TabPane,{tab:s("tasks:inspection.detail.executionHistory"),children:e.jsx(w,{title:s("tasks:inspection.detail.recentResults"),size:"small",children:e.jsxs(i,{column:2,size:"small",children:[e.jsx(i.Item,{label:s("tasks:inspection.detail.startTime"),children:n.lastRun.startTime}),e.jsx(i.Item,{label:s("tasks:inspection.detail.endTime"),children:n.lastRun.endTime}),e.jsx(i.Item,{label:s("tasks:inspection.detail.executionStatus"),children:M(n.lastRun.status)}),e.jsxs(i.Item,{label:s("tasks:inspection.detail.executionDuration"),children:[n.lastRun.duration,s("tasks:inspection.detail.seconds")]})]})})},"history")]})]})})]})};export{Ne as default};
