import{u as oe,j as e,d as k}from"./index-BoaK5Cbd.js";import{r as n,ab as u,T as ie,k as c,s as S,B as y,o as re,p as le,d as I,C as l,S as p,a as ne,g as ce,at as _,u as r,aw as A,v as R,w as de,x as he,av as ue,Y as me,M as F,ah as v,m as W,Q as xe,y as i,z as f,j as T,P as pe,ax as ke,f as ge,ay as je,ak as P}from"./antd-CAFIM9ev.js";import{s as ye}from"./index-Daowydkz.js";import{S as fe}from"./SearchFilterBar-AJ-ixr8L.js";import"./vendor-DJG_os-6.js";const{Title:be,Paragraph:V,Text:d}=ie,{Option:b}=W,{TextArea:ve}=v,Te=k.div`
  padding: 24px;
`,Ce=k.div`
  margin-bottom: 24px;
`,w=k(T)`
  .ant-card-body {
    padding: 16px;
  }
`,Ie=k(T)`
  height: 100%;
  min-height: 340px;
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
    min-height: 300px;
    
    .ant-card-head {
      padding: 10px 12px;
      min-height: 50px;
    }
    
    .ant-card-body {
      padding: 12px;
      height: calc(100% - 50px);
    }
  }
`,we=k.div`
  .ant-col {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
`;k.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;const De=()=>{var q,E,$;const[Se,Re]=n.useState(!1),[N,C]=n.useState(!1),[O,B]=n.useState(!1),[H,z]=n.useState(null),[a,K]=n.useState(null),[Q,Y]=n.useState(""),[L,U]=n.useState("all"),[G,J]=n.useState("all"),[g]=u.useForm(),{t:s}=oe(["tasks","common"]),X=t=>({bearer_token:s("tasks:hooks.detail.authTypes.bearerToken"),database_credentials:s("tasks:hooks.detail.authTypes.databaseCredentials"),api_key:s("tasks:hooks.detail.authTypes.apiKey"),basic_auth:s("tasks:hooks.detail.authTypes.basicAuth"),oauth2:s("tasks:hooks.detail.authTypes.oauth2"),none:s("tasks:hooks.detail.authTypes.none")})[t]||t;n.useEffect(()=>{ye(s("tasks:hooks.title"))},[s]);const x=[{id:"1",name:"告警通知Hook",description:"当系统出现告警事件时，自动触发告警处理任务集合，执行通知和响应动作",type:"webhook",trigger:{events:["alert.created","alert.resolved"],conditions:["severity >= high"],filters:{services:["user-service","order-service"]}},taskCollections:["告警处理任务集","通知发送任务集"],config:{url:"https://hooks.slack.com/services/xxx",method:"POST",headers:{"Content-Type":"application/json"},payload:{text:"{{alert.message}}",channel:"#alerts",username:"AlertBot"},timeout:10,retryCount:3,retryDelay:5},status:"active",statistics:{totalTriggers:1247,successCount:1198,failureCount:49,avgResponseTime:245,successRate:96.1},lastExecution:{timestamp:"2024-06-15 14:25:30",status:"success",responseTime:180,response:{ok:!0,message:"Task collections executed successfully"}},security:{authentication:"bearer_token",encryption:!0,ipWhitelist:["10.0.0.0/8","172.16.0.0/12"]},createdBy:"运维工程师",createdAt:"2024-06-01",lastModified:"2024-06-14"},{id:"2",name:"数据同步Hook",description:"当用户信息更新时，触发数据同步任务集合，执行数据仓库和缓存系统的同步",type:"database",trigger:{events:["user.updated","user.created"],conditions:["user.status == active"],filters:{departments:["engineering","product"]}},taskCollections:["数据同步任务集","缓存更新任务集"],config:{timeout:30,retryCount:2,retryDelay:10},status:"active",statistics:{totalTriggers:856,successCount:834,failureCount:22,avgResponseTime:1200,successRate:97.4},lastExecution:{timestamp:"2024-06-15 14:20:15",status:"success",responseTime:980},security:{authentication:"database_credentials",encryption:!0,ipWhitelist:["192.168.1.0/24"]},createdBy:"数据工程师",createdAt:"2024-06-05",lastModified:"2024-06-13"},{id:"3",name:"订单状态变更Hook",description:"订单状态变更时，触发订单处理任务集合，执行下游业务处理和通知",type:"message_queue",trigger:{events:["order.status_changed"],conditions:["order.status in [paid, shipped, delivered]"],filters:{amount:{gte:100}}},taskCollections:["订单处理任务集","业务通知任务集"],config:{timeout:15,retryCount:5,retryDelay:3},status:"active",statistics:{totalTriggers:2341,successCount:2298,failureCount:43,avgResponseTime:85,successRate:98.2},lastExecution:{timestamp:"2024-06-15 14:30:45",status:"success",responseTime:65},security:{authentication:"api_key",encryption:!1,ipWhitelist:[]},createdBy:"业务开发",createdAt:"2024-05-20",lastModified:"2024-06-10"}],j={webhook:{name:s("tasks:hooks.types.webhook"),color:"blue",icon:e.jsx(je,{})},database:{name:s("tasks:hooks.types.database"),color:"green",icon:e.jsx(ge,{})},message_queue:{name:s("tasks:hooks.types.messageQueue"),color:"orange",icon:e.jsx(A,{})},api_call:{name:s("tasks:hooks.types.apiCall"),color:"purple",icon:e.jsx(S,{})},script:{name:s("tasks:hooks.types.script"),color:"cyan",icon:e.jsx(ke,{})}},M=t=>{const h={active:{color:"green",text:s("tasks:hooks.status.active")},inactive:{color:"orange",text:s("tasks:hooks.status.inactive")},error:{color:"red",text:s("tasks:hooks.status.error")}}[t];return e.jsx(r,{color:h.color,children:h.text})},Z=t=>{const h={success:{color:"green",text:s("common:success")},failed:{color:"red",text:s("tasks:hooks.status.error")},timeout:{color:"orange",text:s("common:timeout")}}[t];return e.jsx(r,{color:h.color,children:h.text})},ee=()=>{z(null),g.resetFields(),C(!0)},se=t=>{z(t),g.setFieldsValue({name:t.name,description:t.description,type:t.type,timeout:t.config.timeout,retryCount:t.config.retryCount,retryDelay:t.config.retryDelay}),C(!0)},D=t=>{K(t),B(!0)},te=(t,o)=>{const m=(o==="active"?"inactive":"active")==="active"?"enableSuccess":"disableSuccess";P.success(s(`tasks.hooks.messages.${m}`))},ae=async()=>{try{const t=await g.validateFields();H?P.success(s("tasks:hooks.messages.updateSuccess")):P.success(s("tasks:hooks.messages.createSuccess")),C(!1),g.resetFields()}catch(t){console.error("表单验证失败:",t)}};return e.jsxs(Te,{children:[e.jsx(Ce,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(be,{level:2,style:{margin:0},children:e.jsxs(c,{children:[e.jsx(S,{style:{color:"#1890ff"}}),s("tasks:hooks.title")]})}),e.jsx(V,{style:{marginTop:8,marginBottom:0,fontSize:16},children:s("tasks:hooks.subtitle")})]}),e.jsxs(c,{children:[e.jsx(y,{icon:e.jsx(re,{}),children:s("tasks:hooks.refresh")}),e.jsx(y,{type:"primary",icon:e.jsx(le,{}),onClick:ee,children:s("tasks:hooks.createHook")})]})]})}),e.jsxs(I,{gutter:16,style:{marginBottom:24},children:[e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(w,{children:e.jsx(p,{title:s("tasks:hooks.stats.totalHooks"),value:x.length,suffix:s("common:unit.count"),valueStyle:{color:"#1890ff"},prefix:e.jsx(S,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(w,{children:e.jsx(p,{title:s("tasks:hooks.stats.activeHooks"),value:x.filter(t=>t.status==="active").length,suffix:s("common:unit.count"),valueStyle:{color:"#52c41a"},prefix:e.jsx(ne,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(w,{children:e.jsx(p,{title:s("tasks:hooks.card.triggerCount"),value:x.reduce((t,o)=>t+o.statistics.totalTriggers,0),valueStyle:{color:"#faad14"},prefix:e.jsx(ce,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(w,{children:e.jsx(p,{title:s("tasks:hooks.stats.successRate"),value:(x.reduce((t,o)=>t+o.statistics.successRate,0)/x.length).toFixed(1),suffix:"%",valueStyle:{color:"#722ed1"},prefix:e.jsx(_,{})})})})]}),e.jsx(fe,{searchValue:Q,onSearchChange:Y,searchPlaceholder:s("tasks:hooks.search.placeholder"),filters:[{key:"type",value:L,onChange:U,placeholder:s("tasks:hooks.search.type"),width:120,options:[{value:"all",label:s("tasks:hooks.search.allTypes")},...Object.entries(j).map(([t,o])=>({value:t,label:o.name}))]},{key:"status",value:G,onChange:J,placeholder:s("tasks:hooks.search.status"),width:100,options:[{value:"all",label:s("tasks:hooks.search.allStatuses")},{value:"active",label:s("tasks:hooks.status.active")},{value:"inactive",label:s("tasks:hooks.status.inactive")},{value:"error",label:s("tasks:hooks.status.error")}]}],onRefresh:()=>window.location.reload()}),e.jsx(we,{children:e.jsx(I,{gutter:[16,16],children:x.map(t=>{const o=j[t.type],h=t.taskCollections.length;return e.jsx(l,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:e.jsxs(Ie,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(c,{children:[o==null?void 0:o.icon,e.jsx("span",{children:t.name})]})}),e.jsx("div",{className:"title-right",children:M(t.status)})]}),onClick:()=>D(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(c,{wrap:!0,size:"small",children:[e.jsx(r,{color:o==null?void 0:o.color,icon:o==null?void 0:o.icon,children:o==null?void 0:o.name}),e.jsxs(r,{icon:e.jsx(A,{}),children:[t.trigger.events.length,s("common:unit.events")]}),e.jsxs(r,{icon:e.jsx(_,{}),children:[h,s("tasks:hooks.card.taskCollections")]})]})}),e.jsx("div",{style:{marginBottom:16,flex:1},children:e.jsx(V,{ellipsis:{rows:2,tooltip:t.description},style:{marginBottom:0,minHeight:44,fontSize:13,lineHeight:"1.5"},children:t.description})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(I,{gutter:12,children:[e.jsx(l,{span:12,children:e.jsx(p,{title:s("tasks:hooks.card.successRate"),value:t.statistics.successRate,suffix:"%",valueStyle:{fontSize:14}})}),e.jsx(l,{span:12,children:e.jsx(p,{title:s("tasks:hooks.card.triggerCount"),value:t.statistics.totalTriggers,valueStyle:{fontSize:14}})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(d,{strong:!0,style:{fontSize:12},children:s("tasks:hooks.card.lastTriggered")}),Z(t.lastExecution.status)]}),e.jsxs(d,{type:"secondary",style:{fontSize:11},children:[t.lastExecution.responseTime,"ms"]})]})}),e.jsxs("div",{style:{fontSize:11,color:"#666",lineHeight:"1.4",marginTop:"auto"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:2},children:[e.jsxs(d,{children:[s("tasks:hooks.card.triggerEvent"),": "]}),e.jsx(d,{children:t.trigger.events.join(", ")})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(d,{children:[s("tasks:hooks.card.lastTriggered"),": "]}),e.jsx(d,{children:t.lastExecution.timestamp})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(c,{children:[e.jsx(R,{title:s("tasks:hooks.card.viewDetails"),children:e.jsx(y,{type:"text",icon:e.jsx(de,{}),size:"small",onClick:m=>{m.stopPropagation(),D(t)}})}),e.jsx(R,{title:s("tasks:hooks.card.edit"),children:e.jsx(y,{type:"text",icon:e.jsx(he,{}),size:"small",onClick:m=>{m.stopPropagation(),se(t)}})}),e.jsx(R,{title:t.status==="active"?s("tasks:hooks.card.disable"):s("tasks:hooks.card.enable"),children:e.jsx(y,{type:"text",icon:t.status==="active"?e.jsx(ue,{}):e.jsx(me,{}),size:"small",onClick:m=>{m.stopPropagation(),te(t.id,t.status)}})})]})})]})},t.id)})})}),e.jsx(F,{title:s(H?"tasks:hooks.editTitle":"tasks:hooks.createTitle"),open:N,onOk:ae,onCancel:()=>C(!1),width:800,children:e.jsxs(u,{form:g,layout:"vertical",initialValues:{type:"webhook",timeout:10,retryCount:3,retryDelay:5},children:[e.jsx(u.Item,{name:"name",label:s("tasks:hooks.form.name"),rules:[{required:!0,message:s("tasks:hooks.form.nameRequired")}],children:e.jsx(v,{placeholder:s("tasks:hooks.form.namePlaceholder")})}),e.jsx(u.Item,{name:"description",label:s("tasks:hooks.form.description"),rules:[{required:!0,message:s("tasks:hooks.form.descriptionRequired")}],children:e.jsx(ve,{rows:3,placeholder:s("tasks:hooks.form.descriptionPlaceholder")})}),e.jsx(u.Item,{name:"type",label:s("tasks:hooks.form.type"),rules:[{required:!0,message:s("tasks:hooks.form.typeRequired")}],children:e.jsxs(W,{placeholder:s("tasks:hooks.form.typePlaceholder"),children:[e.jsx(b,{value:"webhook",children:s("tasks:hooks.types.webhook")}),e.jsx(b,{value:"database",children:s("tasks:hooks.types.database")}),e.jsx(b,{value:"message_queue",children:s("tasks:hooks.types.messageQueue")}),e.jsx(b,{value:"api_call",children:"API"}),e.jsx(b,{value:"script",children:"Script"})]})}),e.jsxs(I,{gutter:16,children:[e.jsx(l,{span:8,children:e.jsx(u.Item,{name:"timeout",label:s("tasks:hooks.form.timeout"),rules:[{required:!0,message:s("tasks:hooks.form.timeoutRequired")}],children:e.jsx(v,{type:"number",placeholder:s("tasks:hooks.form.timeoutPlaceholder")})})}),e.jsx(l,{span:8,children:e.jsx(u.Item,{name:"retryCount",label:s("common:retryCount"),rules:[{required:!0,message:s("common:retryCountRequired")}],children:e.jsx(v,{type:"number",placeholder:s("common:retryCountPlaceholder")})})}),e.jsx(l,{span:8,children:e.jsx(u.Item,{name:"retryDelay",label:s("tasks:hooks.form.retryDelay"),rules:[{required:!0,message:s("tasks:hooks.form.retryDelayRequired")}],children:e.jsx(v,{type:"number",placeholder:s("tasks:hooks.form.retryDelayPlaceholder")})})})]}),e.jsx(xe,{message:s("common:tips"),description:s("tasks:hooks.tips.createHint"),type:"info",showIcon:!0,style:{marginTop:16}})]})}),e.jsx(F,{title:a==null?void 0:a.name,open:O,onCancel:()=>B(!1),footer:null,width:1200,style:{top:20},children:a&&e.jsxs("div",{children:[e.jsxs(i,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(i.Item,{label:s("tasks:hooks.modal.hookName"),span:2,children:a.name}),e.jsx(i.Item,{label:s("tasks:hooks.modal.hookType"),children:e.jsx(r,{color:(q=j[a.type])==null?void 0:q.color,icon:(E=j[a.type])==null?void 0:E.icon,children:($=j[a.type])==null?void 0:$.name})}),e.jsx(i.Item,{label:s("common:status"),children:M(a.status)}),e.jsxs(i.Item,{label:s("tasks:hooks.card.successRate"),children:[a.statistics.successRate,"%"]}),e.jsxs(i.Item,{label:s("tasks:hooks.card.triggerCount"),children:[a.statistics.totalTriggers,s("common:unit.times")]}),e.jsxs(i.Item,{label:s("common:avgResponseTime"),children:[a.statistics.avgResponseTime,"ms"]}),e.jsx(i.Item,{label:s("tasks:hooks.card.lastTriggered"),children:a.lastExecution.timestamp}),e.jsx(i.Item,{label:s("tasks:hooks.card.creator"),children:a.createdBy}),e.jsx(i.Item,{label:s("common:createdAt"),children:a.createdAt}),e.jsx(i.Item,{label:s("common:description"),span:2,children:a.description})]}),e.jsxs(f,{defaultActiveKey:"collections",children:[e.jsx(f.TabPane,{tab:s("tasks:hooks.modal.taskCollections"),children:e.jsx(T,{title:s("tasks:hooks.modal.triggeredCollections"),size:"small",style:{marginBottom:16},children:a.taskCollections.length>0?e.jsx(c,{wrap:!0,children:a.taskCollections.map(t=>e.jsx(r,{icon:e.jsx(pe,{}),color:"blue",children:t},t))}):e.jsx(d,{type:"secondary",children:s("tasks:hooks.modal.noCollections")})})},"collections"),e.jsxs(f.TabPane,{tab:s("tasks:hooks.modal.triggerConfig"),children:[e.jsx(T,{title:s("tasks:hooks.modal.triggerEvent"),size:"small",style:{marginBottom:16},children:e.jsx(c,{wrap:!0,children:a.trigger.events.map(t=>e.jsx(r,{color:"blue",children:t},t))})}),e.jsx(T,{title:s("tasks:hooks.modal.triggerConditions"),size:"small",children:e.jsx(c,{wrap:!0,children:a.trigger.conditions.map(t=>e.jsx(r,{color:"green",children:t},t))})})]},"trigger"),e.jsx(f.TabPane,{tab:s("tasks:hooks.modal.executionConfig"),children:e.jsxs(i,{column:2,size:"small",children:[e.jsxs(i.Item,{label:s("common:timeout"),children:[a.config.timeout,s("common:unit.seconds")]}),e.jsxs(i.Item,{label:s("common:retryCount"),children:[a.config.retryCount,s("common:unit.times")]}),e.jsxs(i.Item,{label:s("tasks:hooks.detail.retryDelay"),children:[a.config.retryDelay,s("tasks:hooks.detail.seconds")]}),a.config.url&&e.jsx(i.Item,{label:s("tasks:hooks.detail.targetUrl"),span:2,children:e.jsx(d,{code:!0,children:a.config.url})}),a.config.method&&e.jsx(i.Item,{label:s("tasks:hooks.detail.httpMethod"),children:e.jsx(r,{color:"blue",children:a.config.method})})]})},"config"),e.jsx(f.TabPane,{tab:s("tasks:hooks.detail.securityConfig"),children:e.jsxs(i,{column:2,size:"small",children:[e.jsx(i.Item,{label:s("tasks:hooks.detail.authentication"),children:X(a.security.authentication)}),e.jsx(i.Item,{label:s("tasks:hooks.detail.encryption"),children:a.security.encryption?s("common:yes"):s("common:no")}),e.jsx(i.Item,{label:s("tasks:hooks.detail.ipWhitelist"),span:2,children:a.security.ipWhitelist.length>0?e.jsx(c,{wrap:!0,children:a.security.ipWhitelist.map(t=>e.jsx(r,{children:t},t))}):e.jsx(d,{type:"secondary",children:s("tasks:hooks.detail.noRestriction")})})]})},"security")]})]})})]})};export{De as default};
