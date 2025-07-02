import{u as Me,b as ze,j as e,d as B}from"./index-DWPu_TRF.js";import{r as h,a9 as I,T as Be,j as g,N as W,B as w,n as qe,o as Ne,d as x,C as u,S,W as Pe,as as ae,a as Ee,M as ne,af as le,l as oe,a7 as K,y as A,aE as f,i as j,t as y,x as p,ae as ie,ah as ce,Q as $e,aD as De,u as E,a0 as Fe,aC as Le,v as Oe,w as Ve,ai as M,k as He,a1 as We,aF as Ke,at as Qe}from"./antd-DnS9M1TX.js";import{s as Ge}from"./index-Daowydkz.js";import{S as Ue}from"./SearchFilterBar-CUZKkW-k.js";import{default as gt}from"./TaskCollectionRunDetail-By4cvmiv.js";import{default as jt}from"./TaskExecutionHistory-Dk_zfhEw.js";import"./vendor-DJG_os-6.js";import"./Breadcrumb-BVBfC3Z-.js";import"./transform-CtUPqxAi.js";import"./zoom-DKpi6doi.js";const Ye=[{id:"1",name:"核心服务监控任务",description:"对核心微服务进行全面的健康检查和性能监控，确保系统稳定运行",targets:[{id:"target_1",name:"用户服务",type:"entity",category:"微服务",actions:["health_check","performance_analysis"]},{id:"target_2",name:"订单服务",type:"entity",category:"微服务",actions:["health_check","fault_analysis","performance_analysis"]},{id:"target_3",name:"支付服务",type:"entity",category:"微服务",actions:["health_check","security_scan"]}],status:"active",schedule:"每5分钟",lastRun:"2024-06-21 16:30:00",nextRun:"2024-06-21 16:35:00",successRate:98.5,totalRuns:2847,createdBy:"运维工程师",createdAt:"2024-06-01",lastModified:"2024-06-20"},{id:"2",name:"业务流程巡检任务",description:"对关键业务时序进行健康检查和故障分析，保障业务流程正常运转",targets:[{id:"target_4",name:"用户登录流程",type:"sequence",category:"认证时序",actions:["health_check","performance_analysis"]},{id:"target_5",name:"订单处理流程",type:"sequence",category:"业务时序",actions:["health_check","fault_analysis"]},{id:"target_6",name:"支付处理流程",type:"sequence",category:"支付时序",actions:["health_check","security_scan","performance_analysis"]}],status:"active",schedule:"每15分钟",lastRun:"2024-06-21 16:15:00",nextRun:"2024-06-21 16:30:00",successRate:96.8,totalRuns:1456,createdBy:"业务分析师",createdAt:"2024-06-05",lastModified:"2024-06-19"},{id:"3",name:"安全扫描任务集",description:"定期对系统进行安全扫描和漏洞检测，确保系统安全性",targets:[{id:"target_7",name:"API网关",type:"entity",category:"网关服务",actions:["security_scan","health_check"]},{id:"target_8",name:"数据库集群",type:"entity",category:"数据存储",actions:["security_scan","performance_analysis"]}],status:"paused",schedule:"每天",lastRun:"2024-06-20 02:00:00",nextRun:"2024-06-22 02:00:00",successRate:94.2,totalRuns:45,createdBy:"安全工程师",createdAt:"2024-05-20",lastModified:"2024-06-18"},{id:"4",name:"数据库性能监控",description:"监控数据库集群的性能指标，及时发现性能瓶颈和异常",targets:[{id:"target_9",name:"MySQL主库",type:"entity",category:"数据库",actions:["health_check","performance_analysis","fault_analysis"]},{id:"target_10",name:"MySQL从库",type:"entity",category:"数据库",actions:["health_check","performance_analysis"]},{id:"target_11",name:"Redis缓存",type:"entity",category:"缓存",actions:["health_check","performance_analysis"]},{id:"target_12",name:"MongoDB集群",type:"entity",category:"文档数据库",actions:["health_check","performance_analysis","security_scan"]}],status:"active",schedule:"每10分钟",lastRun:"2024-06-21 16:20:00",nextRun:"2024-06-21 16:30:00",successRate:97.3,totalRuns:1823,createdBy:"数据库管理员",createdAt:"2024-06-03",lastModified:"2024-06-21"},{id:"5",name:"容器化服务监控",description:"监控Kubernetes集群中的容器化服务，确保容器健康运行",targets:[{id:"target_13",name:"Nginx Ingress",type:"entity",category:"负载均衡",actions:["health_check","performance_analysis"]},{id:"target_14",name:"商品服务Pod",type:"entity",category:"容器服务",actions:["health_check","fault_analysis","performance_analysis"]},{id:"target_15",name:"库存服务Pod",type:"entity",category:"容器服务",actions:["health_check","performance_analysis"]}],status:"active",schedule:"每3分钟",lastRun:"2024-06-21 16:33:00",nextRun:"2024-06-21 16:36:00",successRate:99.1,totalRuns:4521,createdBy:"DevOps工程师",createdAt:"2024-06-08",lastModified:"2024-06-21"},{id:"6",name:"消息队列健康检查",description:"监控消息队列系统的健康状态和消息处理性能",targets:[{id:"target_16",name:"RabbitMQ集群",type:"entity",category:"消息队列",actions:["health_check","performance_analysis","fault_analysis"]},{id:"target_17",name:"Kafka集群",type:"entity",category:"流处理",actions:["health_check","performance_analysis"]},{id:"target_18",name:"消息处理流程",type:"sequence",category:"消息时序",actions:["health_check","fault_analysis"]}],status:"active",schedule:"每8分钟",lastRun:"2024-06-21 16:24:00",nextRun:"2024-06-21 16:32:00",successRate:95.7,totalRuns:892,createdBy:"中间件工程师",createdAt:"2024-06-10",lastModified:"2024-06-20"},{id:"7",name:"前端应用监控",description:"监控前端应用的可用性和用户体验指标",targets:[{id:"target_19",name:"Web应用",type:"entity",category:"前端应用",actions:["health_check","performance_analysis"]},{id:"target_20",name:"移动端应用",type:"entity",category:"移动应用",actions:["health_check","performance_analysis"]},{id:"target_21",name:"CDN节点",type:"entity",category:"内容分发",actions:["health_check","performance_analysis"]}],status:"active",schedule:"每2分钟",lastRun:"2024-06-21 16:34:00",nextRun:"2024-06-21 16:36:00",successRate:98.9,totalRuns:6234,createdBy:"前端工程师",createdAt:"2024-06-12",lastModified:"2024-06-21"},{id:"8",name:"第三方服务集成监控",description:"监控与第三方服务的集成状态和接口可用性",targets:[{id:"target_22",name:"支付宝接口",type:"entity",category:"第三方API",actions:["health_check","performance_analysis","security_scan"]},{id:"target_23",name:"微信支付接口",type:"entity",category:"第三方API",actions:["health_check","performance_analysis","security_scan"]},{id:"target_24",name:"短信服务接口",type:"entity",category:"第三方API",actions:["health_check","fault_analysis"]},{id:"target_25",name:"第三方支付流程",type:"sequence",category:"支付时序",actions:["health_check","performance_analysis","fault_analysis"]}],status:"active",schedule:"每6分钟",lastRun:"2024-06-21 16:30:00",nextRun:"2024-06-21 16:36:00",successRate:93.4,totalRuns:1567,createdBy:"集成工程师",createdAt:"2024-06-15",lastModified:"2024-06-21"},{id:"9",name:"日志系统监控",description:"监控日志收集和分析系统的运行状态",targets:[{id:"target_26",name:"ELK集群",type:"entity",category:"日志系统",actions:["health_check","performance_analysis"]},{id:"target_27",name:"Fluentd收集器",type:"entity",category:"日志收集",actions:["health_check","fault_analysis"]},{id:"target_28",name:"日志分析流程",type:"sequence",category:"分析时序",actions:["health_check","performance_analysis"]}],status:"active",schedule:"每12分钟",lastRun:"2024-06-21 16:24:00",nextRun:"2024-06-21 16:36:00",successRate:96.2,totalRuns:743,createdBy:"运维工程师",createdAt:"2024-06-07",lastModified:"2024-06-19"},{id:"10",name:"备份系统检查",description:"定期检查数据备份系统的完整性和可恢复性",targets:[{id:"target_29",name:"数据库备份",type:"entity",category:"备份系统",actions:["health_check","fault_analysis"]},{id:"target_30",name:"文件备份",type:"entity",category:"备份系统",actions:["health_check","security_scan"]},{id:"target_31",name:"备份恢复流程",type:"sequence",category:"恢复时序",actions:["health_check","fault_analysis"]}],status:"active",schedule:"每天",lastRun:"2024-06-21 03:00:00",nextRun:"2024-06-22 03:00:00",successRate:99.5,totalRuns:156,createdBy:"备份管理员",createdAt:"2024-05-25",lastModified:"2024-06-20"},{id:"11",name:"网络设备监控",description:"监控网络设备的连通性和性能指标",targets:[{id:"target_32",name:"核心交换机",type:"entity",category:"网络设备",actions:["health_check","performance_analysis"]},{id:"target_33",name:"防火墙",type:"entity",category:"安全设备",actions:["health_check","security_scan","performance_analysis"]},{id:"target_34",name:"负载均衡器",type:"entity",category:"负载均衡",actions:["health_check","performance_analysis","fault_analysis"]}],status:"active",schedule:"每4分钟",lastRun:"2024-06-21 16:32:00",nextRun:"2024-06-21 16:36:00",successRate:97.8,totalRuns:2156,createdBy:"网络工程师",createdAt:"2024-06-02",lastModified:"2024-06-21"},{id:"12",name:"AI模型服务监控",description:"监控AI模型推理服务的可用性和响应性能",targets:[{id:"target_35",name:"推荐算法服务",type:"entity",category:"AI服务",actions:["health_check","performance_analysis"]},{id:"target_36",name:"图像识别服务",type:"entity",category:"AI服务",actions:["health_check","performance_analysis","fault_analysis"]},{id:"target_37",name:"自然语言处理服务",type:"entity",category:"AI服务",actions:["health_check","performance_analysis"]},{id:"target_38",name:"AI推理流程",type:"sequence",category:"AI时序",actions:["health_check","performance_analysis","fault_analysis"]}],status:"draft",schedule:"每7分钟",lastRun:"2024-06-20 15:45:00",nextRun:"2024-06-22 09:00:00",successRate:92.1,totalRuns:234,createdBy:"AI工程师",createdAt:"2024-06-18",lastModified:"2024-06-21"}],Je={health_check:{name:"健康检查",color:"green",description:"检查服务或组件的基本健康状态"},fault_analysis:{name:"故障分析",color:"red",description:"分析和诊断系统故障"},performance_analysis:{name:"性能分析",color:"blue",description:"分析系统性能指标和瓶颈"},security_scan:{name:"安全扫描",color:"orange",description:"扫描安全漏洞和风险"}},Xe=["每分钟","每2分钟","每3分钟","每4分钟","每5分钟","每6分钟","每7分钟","每8分钟","每10分钟","每12分钟","每15分钟","每30分钟","每小时","每2小时","每4小时","每6小时","每12小时","每天","每周","每月"],$={taskCollections:Ye,actionTypes:Je,scheduleOptions:Xe},{Title:z,Paragraph:Q,Text:D}=Be,{Option:Ze}=oe,{TextArea:et}=le,tt=B.div`
  padding: 24px;
`,st=B.div`
  margin-bottom: 24px;
`,F=B(j)`
  .ant-card-body {
    padding: 16px;
  }
  
  .ant-statistic {
    .ant-statistic-title {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .ant-statistic-content {
      font-size: 20px;
      font-weight: 600;
    }
  }
  
  @media (max-width: 768px) {
    .ant-card-body {
      padding: 12px;
    }
    
    .ant-statistic {
      .ant-statistic-title {
        font-size: 11px;
      }
      
      .ant-statistic-content {
        font-size: 18px;
      }
    }
  }
`,at=B(j)`
  height: 100%;
  min-height: 450px;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  .ant-card-head {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    
    .ant-card-head-title {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.4;
      width: 100%;
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
  
  .ant-card-body {
    padding: 20px;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
  }
  
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .card-tags {
    margin-bottom: 16px;
    min-height: 32px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .card-description {
    flex: 1;
    margin-bottom: 16px;
    min-height: 48px;
    display: flex;
    align-items: flex-start;
  }
  
  .card-stats {
    margin-bottom: 16px;
    
    .ant-statistic {
      .ant-statistic-title {
        font-size: 11px;
        color: #666;
        margin-bottom: 4px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .ant-statistic-content {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.2;
      }
    }
  }
  
  .card-progress {
    margin-bottom: 16px;
  }
  
  .card-footer {
    margin-top: auto;
    padding-top: 12px;
    font-size: 12px;
    color: #999;
    
    .footer-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .footer-label {
        flex-shrink: 0;
        margin-right: 8px;
      }
      
      .footer-value {
        flex: 1;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
    min-height: 420px;
    
    .ant-card-head {
      padding: 12px 16px;
      
      .ant-card-head-title {
        font-size: 14px;
      }
    }
    
    .ant-card-body {
      padding: 16px;
    }
    
    .card-stats {
      .ant-statistic {
        .ant-statistic-title {
          font-size: 10px;
        }
        
        .ant-statistic-content {
          font-size: 16px;
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    min-height: 400px;
    
    .card-stats {
      .ant-row {
        .ant-col {
          margin-bottom: 8px;
        }
      }
    }
  }
`;B.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;const yt=()=>{const[nt,it]=h.useState(!1),[re,q]=h.useState(!1),[de,G]=h.useState(!1),[L,U]=h.useState(null),[o,he]=h.useState(null),[me,ue]=h.useState(""),[ye,pe]=h.useState("all"),[xe,ge]=h.useState("all"),[v]=I.useForm(),{t:s}=Me(["tasks","common"]),Y=ze(),[r,C]=h.useState([]),[m,T]=h.useState([]),[N,b]=h.useState({}),[P,R]=h.useState({}),[d,_]=h.useState(0);h.useEffect(()=>{Ge(s("tasks:collections.title"))},[s]);const J=[{id:"health_check",name:s("tasks:collections.actions.healthCheck"),type:"health_check",description:s("tasks:collections.actionDescriptions.healthCheck"),duration:s("tasks:collections.duration.healthCheck"),frequency:s("tasks:collections.frequency.every5min")},{id:"fault_analysis",name:s("tasks:collections.actions.faultAnalysis"),type:"fault_analysis",description:s("tasks:collections.actionDescriptions.faultAnalysis"),duration:s("tasks:collections.duration.faultAnalysis"),frequency:s("tasks:collections.frequency.every30min")},{id:"performance_analysis",name:s("tasks:collections.actions.performanceAnalysis"),type:"performance_analysis",description:s("tasks:collections.actionDescriptions.performanceAnalysis"),duration:s("tasks:collections.duration.performanceAnalysis"),frequency:s("tasks:collections.frequency.hourly")},{id:"security_scan",name:s("tasks:collections.actions.securityScan"),type:"security_scan",description:s("tasks:collections.actionDescriptions.securityScan"),duration:s("tasks:collections.duration.securityScan"),frequency:s("tasks:collections.frequency.daily")}],O=[{id:"user_service",name:"用户服务",category:"微服务"},{id:"order_service",name:"订单服务",category:"微服务"},{id:"payment_service",name:"支付服务",category:"微服务"},{id:"product_service",name:"商品服务",category:"微服务"},{id:"inventory_service",name:"库存服务",category:"微服务"},{id:"notification_service",name:"通知服务",category:"微服务"},{id:"mysql_master",name:"MySQL主库",category:"数据库"},{id:"mysql_slave",name:"MySQL从库",category:"数据库"},{id:"redis_cluster",name:"Redis集群",category:"缓存"},{id:"mongodb_cluster",name:"MongoDB集群",category:"文档数据库"},{id:"elasticsearch",name:"Elasticsearch",category:"搜索引擎"},{id:"rabbitmq_cluster",name:"RabbitMQ集群",category:"消息队列"},{id:"kafka_cluster",name:"Kafka集群",category:"流处理"},{id:"nginx_ingress",name:"Nginx Ingress",category:"负载均衡"},{id:"api_gateway",name:"API网关",category:"网关服务"},{id:"web_app",name:"Web应用",category:"前端应用"},{id:"mobile_app",name:"移动端应用",category:"移动应用"},{id:"cdn_nodes",name:"CDN节点",category:"内容分发"},{id:"alipay_api",name:"支付宝接口",category:"第三方API"},{id:"wechat_pay_api",name:"微信支付接口",category:"第三方API"},{id:"sms_service",name:"短信服务接口",category:"第三方API"},{id:"ai_recommendation",name:"推荐算法服务",category:"AI服务"},{id:"ai_image_recognition",name:"图像识别服务",category:"AI服务"},{id:"ai_nlp",name:"自然语言处理服务",category:"AI服务"},{id:"backup_system",name:"备份系统",category:"备份系统"},{id:"elk_cluster",name:"ELK集群",category:"日志系统"},{id:"core_switch",name:"核心交换机",category:"网络设备"},{id:"firewall",name:"防火墙",category:"安全设备"},{id:"load_balancer",name:"负载均衡器",category:"负载均衡"}],V=[{id:"user_login_flow",name:"用户登录流程",category:"认证时序"},{id:"user_register_flow",name:"用户注册流程",category:"认证时序"},{id:"order_create_flow",name:"订单创建流程",category:"业务时序"},{id:"order_payment_flow",name:"订单支付流程",category:"业务时序"},{id:"order_fulfillment_flow",name:"订单履约流程",category:"业务时序"},{id:"payment_process_flow",name:"支付处理流程",category:"支付时序"},{id:"refund_process_flow",name:"退款处理流程",category:"支付时序"},{id:"inventory_update_flow",name:"库存更新流程",category:"库存时序"},{id:"product_sync_flow",name:"商品同步流程",category:"同步时序"},{id:"data_backup_flow",name:"数据备份流程",category:"备份时序"},{id:"log_analysis_flow",name:"日志分析流程",category:"分析时序"},{id:"health_check_flow",name:"健康检查流程",category:"监控时序"},{id:"alert_notification_flow",name:"告警通知流程",category:"通知时序"},{id:"ai_inference_flow",name:"AI推理流程",category:"AI时序"},{id:"message_processing_flow",name:"消息处理流程",category:"消息时序"}],k=$.taskCollections,X={health_check:{name:"健康检查",color:"green",icon:e.jsx(Qe,{})},fault_analysis:{name:"故障分析",color:"red",icon:e.jsx(Ke,{})},performance_analysis:{name:"性能分析",color:"blue",icon:e.jsx(We,{})},security_scan:{name:"安全扫描",color:"orange",icon:e.jsx(He,{})}},Z=t=>{const n={active:{color:"green",text:s("tasks:collections.status.active")},paused:{color:"orange",text:s("tasks:collections.status.paused")},draft:{color:"gray",text:s("tasks:collections.status.draft")}}[t];return e.jsx(y,{color:n.color,children:n.text})},fe=()=>{U(null),v.resetFields(),C([]),T([]),b({}),R({}),_(0),q(!0)},je=t=>{U(t),v.setFieldsValue({name:t.name,description:t.description,schedule:t.schedule});const a=t.targets.filter(i=>i.type==="entity").map(i=>i.id),n=t.targets.filter(i=>i.type==="sequence").map(i=>i.id);C(a),T(n);const l={},c={};t.targets.forEach(i=>{i.type==="entity"?l[i.id]=i.actions:c[i.id]=i.actions}),b(l),R(c),_(0),q(!0)},ee=t=>{C(t);const a={...N};Object.keys(a).forEach(n=>{t.includes(n)||delete a[n]}),b(a)},te=t=>{T(t);const a={...P};Object.keys(a).forEach(n=>{t.includes(n)||delete a[n]}),R(a)},_e=(t,a)=>{b(n=>({...n,[t]:a}))},ke=(t,a)=>{R(n=>({...n,[t]:a}))},ve=()=>{if(d===0)v.validateFields(["name","description","schedule"]).then(()=>{_(1)}).catch(()=>{M.error("请完善基本信息")});else if(d===1){if(r.length===0&&m.length===0){M.error("请至少选择一个监控目标");return}_(2)}},be=()=>{_(t=>Math.max(0,t-1))},se=t=>{he(t),G(!0)},Re=t=>{const a=`run_${t}_${Date.now()}`;Y(`/task-management/task-collections/run/${a}`)},we=t=>{Y(`/task-management/task-collections/history/${t}`)},Se=async()=>{try{if(d<2){ve();return}if([...r,...m].some(c=>{const i=r.includes(c)?N[c]:P[c];return!i||i.length===0})){M.error("请为所有选中的目标配置至少一个检查动作");return}const n=await v.validateFields(),l=[...r.map(c=>{const i=O.find(H=>H.id===c);return{id:c,name:(i==null?void 0:i.name)||"",type:"entity",category:(i==null?void 0:i.category)||"",actions:N[c]||[]}}),...m.map(c=>{const i=V.find(H=>H.id===c);return{id:c,name:(i==null?void 0:i.name)||"",type:"sequence",category:(i==null?void 0:i.category)||"",actions:P[c]||[]}})];console.log("创建任务集合:",{...n,targets:l,status:"draft"}),L?M.success(s("tasks:collections.messages.updateSuccess")):M.success(s("tasks:collections.messages.createSuccess")),q(!1),v.resetFields(),C([]),T([]),b({}),R({}),_(0)}catch(t){console.error("表单验证失败:",t)}},Ae=()=>k.map(t=>{const a=t.targets.filter(c=>c.type==="entity").length,n=t.targets.filter(c=>c.type==="sequence").length,l=t.targets.reduce((c,i)=>c+i.actions.length,0);return e.jsx(u,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:e.jsx(at,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(g,{children:[e.jsx(W,{style:{color:"#1890ff"}}),e.jsx("span",{children:t.name})]})}),e.jsx("div",{className:"title-right",children:Z(t.status)})]}),onClick:()=>se(t),children:e.jsxs("div",{className:"card-content",children:[e.jsxs("div",{className:"card-tags",children:[e.jsxs(y,{icon:e.jsx(ie,{}),color:"blue",children:[a,s("tasks:collections.card.entities")]}),e.jsxs(y,{icon:e.jsx(ce,{}),color:"green",children:[n,s("tasks:collections.card.sequences")]}),e.jsxs(y,{icon:e.jsx(ae,{}),color:"orange",children:[l,s("tasks:collections.card.actions")]})]}),e.jsx("div",{className:"card-description",children:e.jsx(Q,{ellipsis:{rows:2,tooltip:t.description},style:{margin:0,color:"#666",lineHeight:"1.5"},children:t.description})}),e.jsx("div",{className:"card-stats",children:e.jsxs(x,{gutter:[8,8],children:[e.jsx(u,{span:12,children:e.jsx(S,{title:s("tasks:collections.card.successRate"),value:t.successRate,suffix:"%",valueStyle:{fontSize:18,color:t.successRate>95?"#52c41a":"#faad14"}})}),e.jsx(u,{span:12,children:e.jsx(S,{title:s("tasks:collections.card.executionCount"),value:t.totalRuns,valueStyle:{fontSize:18,color:"#1890ff"}})})]})}),e.jsxs("div",{className:"card-progress",children:[e.jsxs(D,{strong:!0,style:{fontSize:12,color:"#666"},children:[s("tasks:collections.card.successRate"),":"]}),e.jsx(De,{percent:t.successRate,size:"small",strokeColor:t.successRate>95?"#52c41a":"#faad14",style:{marginTop:4}})]}),e.jsxs("div",{className:"card-footer",children:[e.jsxs("div",{className:"footer-item",children:[e.jsx("span",{className:"footer-label",children:s("tasks:collections.card.schedule")}),e.jsx("span",{className:"footer-value",children:t.schedule})]}),e.jsxs("div",{className:"footer-item",children:[e.jsx("span",{className:"footer-label",children:s("tasks:collections.card.nextExecution")}),e.jsx("span",{className:"footer-value",children:t.nextRun})]}),e.jsxs("div",{className:"footer-item",children:[e.jsx("span",{className:"footer-label",children:s("tasks:collections.card.creator")}),e.jsx("span",{className:"footer-value",children:t.createdBy})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(g,{children:[e.jsx(E,{title:s("tasks:collections.card.viewExecutionHistory"),children:e.jsx(w,{type:"text",icon:e.jsx(Fe,{}),size:"small",onClick:c=>{c.stopPropagation(),we(t.id)}})}),e.jsx(E,{title:"查看运行详情",children:e.jsx(w,{type:"text",icon:e.jsx(Le,{}),size:"small",onClick:c=>{c.stopPropagation(),Re(t.id)}})}),e.jsx(E,{title:s("tasks:collections.card.viewDetails"),children:e.jsx(w,{type:"text",icon:e.jsx(Oe,{}),size:"small",onClick:c=>{c.stopPropagation(),se(t)}})}),e.jsx(E,{title:s("tasks:collections.card.edit"),children:e.jsx(w,{type:"text",icon:e.jsx(Ve,{}),size:"small",onClick:c=>{c.stopPropagation(),je(t)}})})]})})]})})},t.id)}),Ce=k.filter(t=>t.status==="active").length,Te=k.reduce((t,a)=>t+a.targets.length,0);k.reduce((t,a)=>t+a.targets.reduce((n,l)=>n+l.actions.length,0),0);const Ie=k.reduce((t,a)=>t+a.successRate,0)/k.length;return e.jsxs(tt,{className:"task-collection-management-page",children:[e.jsx(st,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(z,{level:2,style:{margin:0},children:e.jsxs(g,{children:[e.jsx(W,{style:{color:"#1890ff"}}),s("tasks:collections.title")]})}),e.jsx(Q,{style:{marginTop:8,marginBottom:0,fontSize:16},children:s("tasks:collections.subtitle")})]}),e.jsxs(g,{children:[e.jsx(w,{icon:e.jsx(qe,{}),children:s("tasks:collections.refresh")}),e.jsx(w,{type:"primary",icon:e.jsx(Ne,{}),onClick:fe,children:s("tasks:collections.createCollection")})]})]})}),e.jsxs(x,{gutter:[16,16],style:{marginBottom:24},children:[e.jsx(u,{xs:12,sm:12,md:6,lg:6,xl:6,children:e.jsx(F,{className:"collection-stats-primary",children:e.jsx(S,{title:s("tasks:collections.stats.totalCollections"),value:k.length,suffix:s("common:unit.count"),prefix:e.jsx(W,{})})})}),e.jsx(u,{xs:12,sm:12,md:6,lg:6,xl:6,children:e.jsx(F,{className:"collection-stats-success",children:e.jsx(S,{title:s("tasks:collections.stats.activeCollections"),value:Ce,suffix:s("common:unit.count"),prefix:e.jsx(Pe,{})})})}),e.jsx(u,{xs:12,sm:12,md:6,lg:6,xl:6,children:e.jsx(F,{className:"collection-stats-warning",children:e.jsx(S,{title:s("tasks:collections.stats.totalTasks"),value:Te,suffix:s("common:unit.count"),prefix:e.jsx(ae,{})})})}),e.jsx(u,{xs:12,sm:12,md:6,lg:6,xl:6,children:e.jsx(F,{className:"collection-stats-purple",children:e.jsx(S,{title:s("tasks:collections.stats.executionRate"),value:Ie.toFixed(1),suffix:"%",prefix:e.jsx(Ee,{})})})})]}),e.jsx(Ue,{searchValue:me,onSearchChange:ue,searchPlaceholder:s("tasks:collections.search.placeholder"),filters:[{key:"status",value:ye,onChange:pe,placeholder:s("tasks:collections.filter.status"),width:100,options:[{value:"all",label:s("tasks:collections.filter.allStatus")},{value:"active",label:s("tasks:collections.status.active")},{value:"paused",label:s("tasks:collections.status.paused")},{value:"draft",label:s("tasks:collections.status.draft")}]},{key:"frequency",value:xe,onChange:ge,placeholder:s("tasks:collections.filter.frequency"),width:120,options:[{value:"all",label:s("tasks:collections.filter.allFrequency")},{value:"5min",label:s("tasks:collections.frequency.every5min")},{value:"15min",label:s("tasks:collections.frequency.every15min")},{value:"1hour",label:s("tasks:collections.frequency.everyHour")},{value:"1day",label:s("tasks:collections.frequency.everyDay")}]}],onRefresh:()=>window.location.reload()}),e.jsx(x,{gutter:[20,20],children:Ae()}),e.jsxs(ne,{title:s(L?"tasks:collections.editTitle":"tasks:collections.createTitle"),open:re,onOk:Se,width:1e3,okText:d<2?"下一步":L?"更新":"创建",cancelText:d>0?"上一步":"取消",onCancel:()=>{d>0?be():(q(!1),_(0),C([]),T([]),b({}),R({}))},children:[e.jsxs("div",{style:{marginBottom:24},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",marginBottom:16},children:[e.jsx("div",{style:{width:24,height:24,borderRadius:"50%",backgroundColor:d>=0?"#1890ff":"#d9d9d9",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:"bold"},children:"1"}),e.jsx("div",{style:{flex:1,height:2,backgroundColor:d>=1?"#1890ff":"#d9d9d9",margin:"0 8px"}}),e.jsx("div",{style:{width:24,height:24,borderRadius:"50%",backgroundColor:d>=1?"#1890ff":"#d9d9d9",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:"bold"},children:"2"}),e.jsx("div",{style:{flex:1,height:2,backgroundColor:d>=2?"#1890ff":"#d9d9d9",margin:"0 8px"}}),e.jsx("div",{style:{width:24,height:24,borderRadius:"50%",backgroundColor:d>=2?"#1890ff":"#d9d9d9",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:"bold"},children:"3"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:12,color:"#666"},children:[e.jsx("span",{children:"基本信息"}),e.jsx("span",{children:"选择目标"}),e.jsx("span",{children:"配置动作"})]})]}),d===0&&e.jsxs(I,{form:v,layout:"vertical",initialValues:{schedule:"每15分钟"},children:[e.jsx(I.Item,{name:"name",label:s("tasks:collections.form.name"),rules:[{required:!0,message:s("tasks:collections.form.nameRequired")},{max:50,message:s("tasks:collections.form.nameMaxLength")}],children:e.jsx(le,{placeholder:s("tasks:collections.form.namePlaceholder")})}),e.jsx(I.Item,{name:"description",label:s("tasks:collections.form.description"),rules:[{required:!0,message:s("tasks:collections.form.descriptionRequired")},{max:200,message:s("tasks:collections.form.descriptionMaxLength")}],children:e.jsx(et,{rows:3,placeholder:s("tasks:collections.form.descriptionPlaceholder")})}),e.jsx(I.Item,{name:"schedule",label:s("tasks:collections.form.schedule"),rules:[{required:!0,message:s("tasks:collections.form.scheduleRequired")}],children:e.jsx(oe,{placeholder:s("tasks:collections.form.schedulePlaceholder"),children:$.scheduleOptions.map(t=>e.jsx(Ze,{value:t,children:t},t))})}),e.jsx(K,{message:"提示",description:"请填写任务集合的基本信息，包括名称、描述和执行频率。",type:"info",showIcon:!0,style:{marginTop:16}})]}),d===1&&e.jsxs("div",{children:[e.jsx(z,{level:4,children:"选择监控目标"}),e.jsxs(A,{defaultActiveKey:"entities",children:[e.jsx(A.TabPane,{tab:`实体 (${r.length})`,children:e.jsx("div",{style:{maxHeight:400,overflowY:"auto"},children:e.jsx(f.Group,{value:r,onChange:ee,style:{width:"100%"},children:e.jsx(x,{gutter:[16,16],children:O.map(t=>e.jsx(u,{xs:24,sm:12,md:8,children:e.jsx(j,{size:"small",style:{cursor:"pointer",border:r.includes(t.id)?"2px solid #1890ff":"1px solid #d9d9d9"},onClick:()=>{const a=r.includes(t.id)?r.filter(n=>n!==t.id):[...r,t.id];ee(a)},children:e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsx(f,{checked:r.includes(t.id),style:{marginRight:8}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:t.name}),e.jsx("div",{style:{fontSize:12,color:"#666"},children:t.category})]})]})})},t.id))})})})},"entities"),e.jsx(A.TabPane,{tab:`时序 (${m.length})`,children:e.jsx("div",{style:{maxHeight:400,overflowY:"auto"},children:e.jsx(f.Group,{value:m,onChange:te,style:{width:"100%"},children:e.jsx(x,{gutter:[16,16],children:V.map(t=>e.jsx(u,{xs:24,sm:12,md:8,children:e.jsx(j,{size:"small",style:{cursor:"pointer",border:m.includes(t.id)?"2px solid #1890ff":"1px solid #d9d9d9"},onClick:()=>{const a=m.includes(t.id)?m.filter(n=>n!==t.id):[...m,t.id];te(a)},children:e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsx(f,{checked:m.includes(t.id),style:{marginRight:8}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:t.name}),e.jsx("div",{style:{fontSize:12,color:"#666"},children:t.category})]})]})})},t.id))})})})},"sequences")]}),e.jsx(K,{message:"提示",description:`已选择 ${r.length} 个实体和 ${m.length} 个时序。请至少选择一个监控目标。`,type:"info",showIcon:!0,style:{marginTop:16}})]}),d===2&&e.jsxs("div",{children:[e.jsx(z,{level:4,children:"配置检查动作"}),e.jsxs("div",{style:{maxHeight:500,overflowY:"auto"},children:[r.length>0&&e.jsxs("div",{style:{marginBottom:24},children:[e.jsx(z,{level:5,children:"实体检查动作"}),r.map(t=>{const a=O.find(n=>n.id===t);return e.jsxs(j,{size:"small",style:{marginBottom:16},children:[e.jsxs("div",{style:{marginBottom:12},children:[e.jsx(D,{strong:!0,children:a==null?void 0:a.name}),e.jsx(y,{color:"blue",style:{marginLeft:8},children:a==null?void 0:a.category})]}),e.jsx(f.Group,{value:N[t]||[],onChange:n=>_e(t,n),children:e.jsx(x,{gutter:[16,8],children:Object.entries($.actionTypes).map(([n,l])=>e.jsx(u,{xs:12,sm:8,md:6,children:e.jsx(f,{value:n,children:e.jsx(g,{children:e.jsx(y,{color:l.color,children:l.name})})})},n))})})]},t)})]}),m.length>0&&e.jsxs("div",{children:[e.jsx(z,{level:5,children:"时序检查动作"}),m.map(t=>{const a=V.find(n=>n.id===t);return e.jsxs(j,{size:"small",style:{marginBottom:16},children:[e.jsxs("div",{style:{marginBottom:12},children:[e.jsx(D,{strong:!0,children:a==null?void 0:a.name}),e.jsx(y,{color:"green",style:{marginLeft:8},children:a==null?void 0:a.category})]}),e.jsx(f.Group,{value:P[t]||[],onChange:n=>ke(t,n),children:e.jsx(x,{gutter:[16,8],children:Object.entries($.actionTypes).map(([n,l])=>e.jsx(u,{xs:12,sm:8,md:6,children:e.jsx(f,{value:n,children:e.jsx(g,{children:e.jsx(y,{color:l.color,children:l.name})})})},n))})})]},t)})]})]}),e.jsx(K,{message:"提示",description:"请为每个选中的目标配置至少一个检查动作。不同的动作类型适用于不同的监控场景。",type:"info",showIcon:!0,style:{marginTop:16}})]})]}),e.jsx(ne,{title:o==null?void 0:o.name,open:de,onCancel:()=>G(!1),footer:null,width:1200,style:{top:20},children:o&&e.jsxs("div",{children:[e.jsxs(p,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(p.Item,{label:s("tasks:collections.modal.taskName"),span:2,children:o.name}),e.jsx(p.Item,{label:s("tasks:collections.modal.taskStatus"),children:Z(o.status)}),e.jsx(p.Item,{label:s("tasks:collections.modal.scheduleFrequency"),children:o.schedule}),e.jsxs(p.Item,{label:s("tasks:collections.card.successRate"),children:[o.successRate,"%"]}),e.jsxs(p.Item,{label:s("tasks:collections.card.executionCount"),children:[o.totalRuns,s("common:unit.times")]}),e.jsx(p.Item,{label:s("tasks:collections.modal.lastExecution"),children:o.lastRun}),e.jsx(p.Item,{label:s("tasks:collections.card.nextExecution"),children:o.nextRun}),e.jsx(p.Item,{label:s("tasks:collections.card.creator"),children:o.createdBy}),e.jsx(p.Item,{label:s("tasks:collections.modal.taskCreatedAt"),children:o.createdAt}),e.jsx(p.Item,{label:s("tasks:collections.modal.taskDescription"),span:2,children:o.description})]}),e.jsxs(A,{defaultActiveKey:"targets",children:[e.jsx(A.TabPane,{tab:s("tasks:collections.detail.monitoringTargets"),children:e.jsx(x,{gutter:16,children:o.targets.map(t=>e.jsx(u,{xs:24,sm:12,lg:8,children:e.jsxs(j,{title:e.jsxs(g,{children:[t.type==="entity"?e.jsx(ie,{style:{color:"#1890ff"}}):e.jsx(ce,{style:{color:"#52c41a"}}),t.name]}),size:"small",style:{marginBottom:16},children:[e.jsxs("div",{style:{marginBottom:8},children:[e.jsx(y,{color:t.type==="entity"?"blue":"green",children:t.type==="entity"?s("tasks:collections.detail.entity"):s("tasks:collections.detail.sequence")}),e.jsx(y,{children:t.category})]}),e.jsxs("div",{children:[e.jsxs(D,{strong:!0,style:{fontSize:12},children:[s("tasks:collections.detail.inspectionActionsLabel"),":"]}),e.jsx("div",{style:{marginTop:4},children:t.actions.map(a=>{J.find(l=>l.id===a);const n=X[a];return e.jsx(y,{size:"small",color:n==null?void 0:n.color,icon:n==null?void 0:n.icon,style:{marginBottom:4},children:n==null?void 0:n.name},a)})})]})]})},t.id))})},"targets"),e.jsx(A.TabPane,{tab:s("tasks:collections.detail.inspectionActions"),children:e.jsx(x,{gutter:16,children:J.map(t=>{const a=X[t.type],n=o.targets.some(l=>l.actions.includes(t.id));return e.jsx(u,{xs:24,sm:12,lg:8,children:e.jsxs(j,{title:e.jsxs(g,{children:[a==null?void 0:a.icon,t.name,n&&e.jsx($e,{status:"success",text:s("tasks:collections.detail.inUse")})]}),size:"small",style:{marginBottom:16,opacity:n?1:.6},children:[e.jsx("div",{style:{marginBottom:8},children:e.jsx(y,{color:a==null?void 0:a.color,children:a==null?void 0:a.name})}),e.jsx(Q,{style:{fontSize:12,marginBottom:8},children:t.description}),e.jsxs("div",{style:{fontSize:11,color:"#666"},children:[e.jsxs("div",{children:[s("tasks:collections.detail.duration"),": ",t.duration]}),e.jsxs("div",{children:[s("tasks:collections.detail.suggestedFrequency"),": ",t.frequency]})]})]})},t.id)})})},"actions")]})]})})]})};export{gt as TaskCollectionRunDetail,jt as TaskExecutionHistory,yt as default};
