import{a as o,j as e}from"./react-D_ZWy-Ho.js";import{aC as c,u as ce,c as re,S as u,aA as E,B as m,ai as de,aa as ue,U as y,V as l,W as j,aD as V,aQ as q,K as pe,aF as H,az as b,a1 as O,ap as xe,ax as i,a3 as p,au as T,_ as w,aP as he,d as g,bh as me,a0 as je,aS as ge,aU as fe,T as R,a8 as ke,a9 as ye,bi as be,ah as C,a2 as ve}from"./react-dom-C5h-mI7H.js";import{s as Te}from"./index-Daowydkz.js";import{S as Re}from"./SearchFilterBar-ZQit0ro2.js";import"./vendor-VHja5XRA.js";import"./cytoscape-DXzeTOL3.js";import"./media-BPG7piku.js";import"./lodash-D08E6HgQ.js";import"./redux-CiqK6azd.js";import"./echarts-core-CW0Gv0IT.js";import"./antd-icons-CI4I6I7B.js";import"./dayjs-CrhenB4N.js";import"./emotion-BhZTwsuK.js";const{Title:Ce,Paragraph:N,Text:x}=re,{Option:I}=O,{TextArea:Ie}=b,{RangePicker:Ue}=ve,Se=g.div`
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
`;const Qe=()=>{var A,D,F;const[Be,Me]=o.useState(!1),[K,v]=o.useState(!1),[L,z]=o.useState(!1),[P,B]=o.useState(null),[n,U]=o.useState(null),[Q,W]=o.useState(""),[Y,G]=o.useState("all"),[J,X]=o.useState("all"),[f]=c.useForm(),{t:s}=ce();o.useEffect(()=>{Te(s("tasks.inspection.title"))},[s]);const h=[{id:"1",name:"核心服务健康检查",description:"定期触发核心服务监控任务集合，执行健康检查、性能分析等巡检动作",type:"health_check",taskCollections:["核心服务监控任务","业务流程巡检任务"],schedule:{type:"interval",expression:"*/5 * * * *",timezone:"Asia/Shanghai"},config:{timeout:30,retryCount:3,alertThreshold:80,checkpoints:["任务集合执行状态","巡检动作成功率","响应时间","错误率"]},status:"running",lastRun:{startTime:"2024-06-15 14:30:00",endTime:"2024-06-15 14:30:45",status:"success",duration:45,result:{核心服务监控任务:{status:"success",duration:25,actions:7},业务流程巡检任务:{status:"success",duration:20,actions:6}}},nextRun:"2024-06-15 14:35:00",statistics:{totalRuns:2847,successCount:2801,failureCount:46,avgDuration:42,successRate:98.4},alerts:{enabled:!0,channels:["email","webhook","sms"],conditions:["任务集合执行失败","成功率<80%","执行超时"]},createdBy:"运维工程师",createdAt:"2024-06-01",lastModified:"2024-06-14"},{id:"2",name:"数据库性能监控",description:"定期触发数据库相关任务集合，监控数据库集群的性能指标和健康状态",type:"performance_monitor",taskCollections:["数据库监控任务集"],schedule:{type:"cron",expression:"0 */10 * * * *",timezone:"Asia/Shanghai"},config:{timeout:60,retryCount:2,alertThreshold:70,checkpoints:["任务集合状态","数据库连接","查询性能","资源使用率"]},status:"running",lastRun:{startTime:"2024-06-15 14:20:00",endTime:"2024-06-15 14:21:15",status:"success",duration:75,result:{数据库监控任务集:{status:"success",duration:75,actions:4}}},nextRun:"2024-06-15 14:30:00",statistics:{totalRuns:1456,successCount:1398,failureCount:58,avgDuration:68,successRate:96},alerts:{enabled:!0,channels:["email","webhook"],conditions:["数据库任务失败","性能指标异常","连接数超限"]},createdBy:"数据库管理员",createdAt:"2024-06-05",lastModified:"2024-06-13"},{id:"3",name:"安全漏洞扫描",description:"定期触发安全扫描任务集合，执行系统安全检查和漏洞扫描",type:"security_scan",taskCollections:["安全扫描任务集"],schedule:{type:"cron",expression:"0 0 2 * * *",timezone:"Asia/Shanghai"},config:{timeout:300,retryCount:1,alertThreshold:90,checkpoints:["安全扫描执行","漏洞检测","合规检查","风险评估"]},status:"paused",lastRun:{startTime:"2024-06-14 02:00:00",endTime:"2024-06-14 02:08:30",status:"success",duration:510,result:{安全扫描任务集:{status:"success",duration:510,actions:4}}},nextRun:"2024-06-16 02:00:00",statistics:{totalRuns:45,successCount:42,failureCount:3,avgDuration:485,successRate:93.3},alerts:{enabled:!0,channels:["email"],conditions:["发现高危漏洞","安全扫描失败","合规检查不通过"]},createdBy:"安全工程师",createdAt:"2024-05-20",lastModified:"2024-06-10"}],k={health_check:{name:s("tasks.inspection.types.healthCheck"),color:"green",icon:e.jsx(fe,{})},performance_monitor:{name:s("tasks.inspection.types.performanceMonitor"),color:"blue",icon:e.jsx(ge,{})},security_scan:{name:s("tasks.inspection.types.securityScan"),color:"orange",icon:e.jsx(je,{})},log_analysis:{name:s("tasks.inspection.types.logAnalysis"),color:"purple",icon:e.jsx(me,{})}},M=t=>{const r={running:{color:"green",text:s("tasks.inspection.status.active")},paused:{color:"orange",text:s("tasks.inspection.status.paused")},stopped:{color:"red",text:s("common.status.stopped")},error:{color:"red",text:s("common.status.error")}}[t];return e.jsx(p,{color:r.color,children:r.text})},_=t=>{const r={success:{color:"green",text:s("common.status.success")},failed:{color:"red",text:s("tasks.inspection.status.failed")},timeout:{color:"orange",text:s("common.status.timeout")}}[t];return e.jsx(p,{color:r.color,children:r.text})},Z=()=>{B(null),f.resetFields(),v(!0)},ee=t=>{B(t),f.setFieldsValue({name:t.name,description:t.description,type:t.type,timeout:t.config.timeout,retryCount:t.config.retryCount,alertThreshold:t.config.alertThreshold}),v(!0)},$=t=>{U(t),z(!0)},se=t=>{C.success(s("tasks.inspection.messages.startSuccess"))},te=t=>{C.success(s("tasks.inspection.messages.pauseSuccess"))},ne=async()=>{try{const t=await f.validateFields();P?C.success(s("tasks.inspection.messages.updateSuccess")):C.success(s("tasks.inspection.messages.createSuccess")),v(!1),f.resetFields()}catch(t){console.error("表单验证失败:",t)}},ie=()=>h.map(t=>{const a=k[t.type],r=t.taskCollections.length;return e.jsx(l,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:e.jsxs(ze,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(u,{children:[a==null?void 0:a.icon,e.jsx("span",{children:t.name})]})}),e.jsx("div",{className:"title-right",children:M(t.status)})]}),onClick:()=>$(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(u,{wrap:!0,size:"small",children:[e.jsx(p,{color:a==null?void 0:a.color,icon:a==null?void 0:a.icon,children:a==null?void 0:a.name}),e.jsxs(p,{icon:e.jsx(q,{}),children:[r,s("tasks.inspection.card.taskCollections")]})]})}),e.jsx("div",{style:{marginBottom:16,flex:1},children:e.jsx(N,{ellipsis:{rows:2,tooltip:t.description},style:{marginBottom:0,minHeight:44,fontSize:13,lineHeight:"1.5"},children:t.description})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(y,{gutter:12,children:[e.jsx(l,{span:12,children:e.jsx(j,{title:s("tasks.inspection.card.successRate"),value:t.statistics.successRate,suffix:"%",valueStyle:{fontSize:14}})}),e.jsx(l,{span:12,children:e.jsx(j,{title:s("tasks.inspection.card.executionCount"),value:t.statistics.totalRuns,valueStyle:{fontSize:14}})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(x,{strong:!0,style:{fontSize:12},children:s("tasks.inspection.card.lastExecution")}),_(t.lastRun.status)]}),e.jsxs(x,{type:"secondary",style:{fontSize:11},children:[t.lastRun.duration,"s"]})]})}),e.jsxs("div",{style:{fontSize:11,color:"#666",lineHeight:"1.4",marginTop:"auto"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[e.jsxs(x,{children:[s("tasks.inspection.card.schedule"),": "]}),e.jsx(x,{children:t.schedule.expression})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(x,{children:[s("tasks.inspection.card.nextExecution"),": "]}),e.jsx(x,{children:t.nextRun})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(u,{children:[e.jsx(R,{title:s("tasks.inspection.card.viewDetails"),children:e.jsx(m,{type:"text",icon:e.jsx(ke,{}),size:"small",onClick:d=>{d.stopPropagation(),$(t)}})}),e.jsx(R,{title:s("tasks.inspection.card.edit"),children:e.jsx(m,{type:"text",icon:e.jsx(ye,{}),size:"small",onClick:d=>{d.stopPropagation(),ee(t)}})}),t.status==="running"?e.jsx(R,{title:s("tasks.inspection.card.pause"),children:e.jsx(m,{type:"text",icon:e.jsx(be,{}),size:"small",onClick:d=>{d.stopPropagation(),te(t.id)}})}):e.jsx(R,{title:s("tasks.inspection.card.start"),children:e.jsx(m,{type:"text",icon:e.jsx(V,{}),size:"small",onClick:d=>{d.stopPropagation(),se(t.id)}})})]})})]})},t.id)}),ae=h.filter(t=>t.status==="running").length,le=h.reduce((t,a)=>t+a.taskCollections.length,0),oe=h.reduce((t,a)=>t+a.statistics.successRate,0)/h.length;return e.jsxs(Se,{children:[e.jsx(we,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(Ce,{level:2,style:{margin:0},children:e.jsxs(u,{children:[e.jsx(E,{style:{color:"#1890ff"}}),s("tasks.inspection.title")]})}),e.jsx(N,{style:{marginTop:8,marginBottom:0,fontSize:16},children:s("tasks.inspection.subtitle")})]}),e.jsxs(u,{children:[e.jsx(m,{icon:e.jsx(de,{}),children:s("tasks.inspection.refresh")}),e.jsx(m,{type:"primary",icon:e.jsx(ue,{}),onClick:Z,children:s("tasks.inspection.createTask")})]})]})}),e.jsxs(y,{gutter:16,style:{marginBottom:24},children:[e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(S,{children:e.jsx(j,{title:s("tasks.inspection.stats.totalTasks"),value:h.length,suffix:s("common.unit.count"),valueStyle:{color:"#1890ff"},prefix:e.jsx(E,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(S,{children:e.jsx(j,{title:s("tasks.inspection.stats.runningTasks"),value:ae,suffix:s("common.unit.count"),valueStyle:{color:"#52c41a"},prefix:e.jsx(V,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(S,{children:e.jsx(j,{title:s("tasks.inspection.card.taskCollections"),value:le,suffix:s("common.unit.count"),valueStyle:{color:"#faad14"},prefix:e.jsx(q,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(S,{children:e.jsx(j,{title:s("tasks.inspection.card.successRate"),value:oe.toFixed(1),suffix:"%",valueStyle:{color:"#722ed1"},prefix:e.jsx(pe,{})})})})]}),e.jsx(Re,{searchValue:Q,onSearchChange:W,searchPlaceholder:s("tasks.inspection.search.placeholder"),filters:[{key:"type",value:Y,onChange:G,placeholder:s("tasks.inspection.search.type"),width:120,options:[{value:"all",label:s("tasks.inspection.search.allTypes")},...Object.entries(k).map(([t,a])=>({value:t,label:a.name}))]},{key:"status",value:J,onChange:X,placeholder:s("tasks.inspection.search.status"),width:100,options:[{value:"all",label:s("tasks.inspection.search.allStatuses")},{value:"running",label:s("tasks.inspection.status.active")},{value:"paused",label:s("tasks.inspection.status.paused")},{value:"stopped",label:s("tasks.inspection.status.draft")},{value:"error",label:s("tasks.inspection.status.failed")}]}],onRefresh:()=>window.location.reload()}),e.jsx(Pe,{children:e.jsx(y,{gutter:[16,16],children:ie()})}),e.jsx(H,{title:s(P?"tasks.inspection.editTitle":"tasks.inspection.createTitle"),open:K,onOk:ne,onCancel:()=>v(!1),width:800,children:e.jsxs(c,{form:f,layout:"vertical",initialValues:{type:"health_check",timeout:30,retryCount:3,alertThreshold:80},children:[e.jsx(c.Item,{name:"name",label:s("tasks.inspection.form.name"),rules:[{required:!0,message:s("tasks.inspection.form.nameRequired")}],children:e.jsx(b,{placeholder:s("tasks.inspection.form.namePlaceholder")})}),e.jsx(c.Item,{name:"description",label:s("tasks.inspection.form.description"),rules:[{required:!0,message:s("tasks.inspection.form.descriptionRequired")}],children:e.jsx(Ie,{rows:3,placeholder:s("tasks.inspection.form.descriptionPlaceholder")})}),e.jsxs(y,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsx(c.Item,{name:"type",label:"任务类型",rules:[{required:!0,message:"请选择任务类型"}],children:e.jsxs(O,{placeholder:"请选择巡检类型",children:[e.jsx(I,{value:"health_check",children:"健康检查"}),e.jsx(I,{value:"performance_monitor",children:"性能监控"}),e.jsx(I,{value:"security_scan",children:"安全扫描"}),e.jsx(I,{value:"log_analysis",children:"日志分析"})]})})}),e.jsx(l,{span:12,children:e.jsx(c.Item,{name:"timeout",label:"超时时间(秒)",rules:[{required:!0,message:"请设置超时时间"}],children:e.jsx(b,{type:"number",placeholder:"请输入超时时间"})})})]}),e.jsxs(y,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsx(c.Item,{name:"retryCount",label:"重试次数",rules:[{required:!0,message:"请设置重试次数"}],children:e.jsx(b,{type:"number",placeholder:"请输入重试次数"})})}),e.jsx(l,{span:12,children:e.jsx(c.Item,{name:"alertThreshold",label:"告警阈值(%)",rules:[{required:!0,message:"请设置告警阈值"}],children:e.jsx(b,{type:"number",placeholder:"请输入告警阈值"})})})]}),e.jsx(xe,{message:s("common.tips"),description:s("tasks.inspection.tips.createHint"),type:"info",showIcon:!0,style:{marginTop:16}})]})}),e.jsx(H,{title:n==null?void 0:n.name,open:L,onCancel:()=>z(!1),footer:null,width:1200,style:{top:20},children:n&&e.jsxs("div",{children:[e.jsxs(i,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(i.Item,{label:s("tasks.inspection.detail.taskName"),span:2,children:n.name}),e.jsx(i.Item,{label:s("tasks.inspection.detail.taskType"),children:e.jsx(p,{color:(A=k[n.type])==null?void 0:A.color,icon:(D=k[n.type])==null?void 0:D.icon,children:(F=k[n.type])==null?void 0:F.name})}),e.jsx(i.Item,{label:s("common.status"),children:M(n.status)}),e.jsxs(i.Item,{label:s("tasks.inspection.detail.successRate"),children:[n.statistics.successRate,"%"]}),e.jsxs(i.Item,{label:s("tasks.inspection.detail.executionCount"),children:[n.statistics.totalRuns,s("common.unit.times")]}),e.jsxs(i.Item,{label:s("tasks.inspection.detail.avgDuration"),children:[n.statistics.avgDuration,s("tasks.inspection.detail.seconds")]}),e.jsx(i.Item,{label:s("tasks.inspection.detail.nextExecution"),children:n.nextRun}),e.jsx(i.Item,{label:s("tasks.inspection.detail.creator"),children:n.createdBy}),e.jsx(i.Item,{label:s("common.createTime"),children:n.createdAt}),e.jsx(i.Item,{label:s("common.description"),span:2,children:n.description})]}),e.jsxs(T,{defaultActiveKey:"collections",children:[e.jsx(T.TabPane,{tab:s("tasks.inspection.detail.taskCollections"),children:e.jsx(w,{title:s("tasks.inspection.detail.triggeredCollections"),size:"small",children:n.taskCollections.length>0?e.jsx(u,{wrap:!0,children:n.taskCollections.map(t=>e.jsx(p,{icon:e.jsx(he,{}),color:"blue",children:t},t))}):e.jsx(x,{type:"secondary",children:s("tasks.inspection.detail.noCollections")})})},"collections"),e.jsx(T.TabPane,{tab:s("tasks.inspection.detail.configParams"),children:e.jsxs(i,{column:2,size:"small",children:[e.jsxs(i.Item,{label:s("tasks.inspection.detail.timeout"),children:[n.config.timeout,s("tasks.inspection.detail.seconds")]}),e.jsxs(i.Item,{label:s("tasks.inspection.detail.retryCount"),children:[n.config.retryCount,s("common.unit.times")]}),e.jsxs(i.Item,{label:s("tasks.inspection.detail.alertThreshold"),children:[n.config.alertThreshold,"%"]}),e.jsx(i.Item,{label:s("tasks.inspection.detail.scheduleExpression"),children:n.schedule.expression}),e.jsx(i.Item,{label:s("tasks.inspection.detail.timezone"),children:n.schedule.timezone}),e.jsx(i.Item,{label:s("tasks.inspection.detail.checkpoints"),span:2,children:e.jsx(u,{wrap:!0,children:n.config.checkpoints.map(t=>e.jsx(p,{children:t},t))})})]})},"config"),e.jsx(T.TabPane,{tab:s("tasks.inspection.detail.executionHistory"),children:e.jsx(w,{title:s("tasks.inspection.detail.recentResults"),size:"small",children:e.jsxs(i,{column:2,size:"small",children:[e.jsx(i.Item,{label:s("tasks.inspection.detail.startTime"),children:n.lastRun.startTime}),e.jsx(i.Item,{label:s("tasks.inspection.detail.endTime"),children:n.lastRun.endTime}),e.jsx(i.Item,{label:s("tasks.inspection.detail.executionStatus"),children:_(n.lastRun.status)}),e.jsxs(i.Item,{label:s("tasks.inspection.detail.executionDuration"),children:[n.lastRun.duration,s("tasks.inspection.detail.seconds")]})]})})},"history")]})]})})]})};export{Qe as default};
