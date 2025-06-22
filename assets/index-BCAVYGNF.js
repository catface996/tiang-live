import{a as c,j as t}from"./react-BkaC_jdz.js";import{u as H,c as K,S as d,l as k,B as h,ai as L,aa as U,U as x,V as l,W as p,ak as J,an as T,aJ as W,a3 as r,T as R,a8 as X,a9 as Y,aF as _,ax as n,au as v,_ as g,X as G,d as j,R as Q,aK as Z,aL as tt,aM as et,aN as st,aO as it,a1 as ot}from"./react-dom-ZHUlsYA_.js";import{s as at}from"./index-Daowydkz.js";import{S as nt}from"./SearchFilterBar-Dq5sQrlY.js";import"./vendor-CsGdsTBW.js";import"./dayjs-Bzorz0fL.js";import"./media-BbQ0wNgX.js";import"./lodash-BORto0-T.js";import"./redux-CiqK6azd.js";import"./echarts-core-7X-L1hka.js";import"./antd-icons-CI4I6I7B.js";import"./emotion-BhZTwsuK.js";const{Title:lt,Paragraph:f,Text:rt}=K,{Option:Ct}=ot,ct=j.div`
  padding: 24px;
`,dt=j.div`
  margin-bottom: 24px;
`,y=j(g)`
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
`,pt=j(g)`
  height: 100%;
  min-height: 420px;
  transition: all 0.3s ease;
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
    gap: 8px;
    flex-wrap: wrap;
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
  
  .card-tags-section {
    margin-bottom: 16px;
    min-height: 28px;
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
    min-height: 380px;
    
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
    min-height: 360px;
    
    .card-stats {
      .ant-row {
        .ant-col {
          margin-bottom: 8px;
        }
      }
    }
  }
`,zt=()=>{var C,z,B;const[mt,ut]=c.useState(!1),[M,I]=c.useState(!1),[o,N]=c.useState(null),[$,P]=c.useState(""),[A,E]=c.useState("all"),[F,V]=c.useState("all"),[O,q]=c.useState("all"),{t:e}=H(["common"]);c.useEffect(()=>{at(e("solutions:title"))},[e]);const m=[{id:"1",name:"电商平台业务架构",industry:"ecommerce",description:"完整的电商平台业务架构方案，包含用户管理、商品管理、订单处理、支付结算等核心业务模块",scenario:"适用于B2C电商平台、在线商城、跨境电商等场景",entities:[{id:"user",name:"用户",type:"业务实体",description:"平台注册用户，包含个人和企业用户",attributes:["用户ID","用户名","邮箱","手机号","用户类型","注册时间"]},{id:"product",name:"商品",type:"业务实体",description:"平台销售的商品信息",attributes:["商品ID","商品名称","价格","库存","分类","品牌","规格"]},{id:"order",name:"订单",type:"业务实体",description:"用户购买行为产生的订单记录",attributes:["订单ID","用户ID","商品列表","总金额","订单状态","创建时间"]},{id:"payment",name:"支付",type:"业务实体",description:"订单支付相关信息",attributes:["支付ID","订单ID","支付方式","支付金额","支付状态","支付时间"]}],relations:[{id:"user-order",from:"user",to:"order",type:"一对多",description:"一个用户可以创建多个订单"},{id:"order-product",from:"order",to:"product",type:"多对多",description:"一个订单可以包含多个商品，一个商品可以属于多个订单"},{id:"order-payment",from:"order",to:"payment",type:"一对一",description:"每个订单对应一个支付记录"}],complexity:"medium",status:"active",tags:["电商","B2C","在线支付","库存管理"],createdBy:"业务架构师",createdAt:"2024-06-01",lastModified:"2024-06-14",usageCount:156},{id:"2",name:"银行核心业务系统",industry:"finance",description:"银行核心业务系统架构，涵盖账户管理、交易处理、风险控制、合规监管等金融业务",scenario:"适用于商业银行、信用社、金融科技公司等金融机构",entities:[{id:"account",name:"账户",type:"业务实体",description:"客户在银行开立的各类账户",attributes:["账户号","账户类型","客户ID","余额","状态","开户时间"]},{id:"customer",name:"客户",type:"业务实体",description:"银行服务的个人或企业客户",attributes:["客户ID","客户姓名","身份证号","联系方式","客户等级","风险评级"]},{id:"transaction",name:"交易",type:"业务实体",description:"客户进行的各类金融交易",attributes:["交易ID","交易类型","金额","账户号","交易时间","交易状态"]},{id:"loan",name:"贷款",type:"业务实体",description:"银行提供的各类贷款产品",attributes:["贷款ID","客户ID","贷款金额","利率","期限","担保方式","审批状态"]}],relations:[{id:"customer-account",from:"customer",to:"account",type:"一对多",description:"一个客户可以拥有多个账户"},{id:"account-transaction",from:"account",to:"transaction",type:"一对多",description:"一个账户可以产生多笔交易"},{id:"customer-loan",from:"customer",to:"loan",type:"一对多",description:"一个客户可以申请多笔贷款"}],complexity:"complex",status:"active",tags:["银行","金融","风控","合规"],createdBy:"金融架构师",createdAt:"2024-05-15",lastModified:"2024-06-12",usageCount:89},{id:"3",name:"智慧医疗管理平台",industry:"healthcare",description:"医疗机构数字化管理平台，整合患者管理、诊疗流程、医疗资源调度和医保结算等功能",scenario:"适用于医院、诊所、社区医疗中心等医疗机构",entities:[{id:"patient",name:"患者",type:"业务实体",description:"就诊患者的基本信息和病历",attributes:["患者ID","姓名","性别","年龄","联系方式","病历号","医保信息"]},{id:"doctor",name:"医生",type:"业务实体",description:"医院医护人员信息",attributes:["医生ID","姓名","科室","职称","专长","排班信息"]},{id:"appointment",name:"预约",type:"业务实体",description:"患者的就诊预约记录",attributes:["预约ID","患者ID","医生ID","科室","预约时间","预约状态"]},{id:"diagnosis",name:"诊断",type:"业务实体",description:"医生对患者的诊断结果",attributes:["诊断ID","患者ID","医生ID","诊断结果","诊断时间","处方ID"]}],relations:[{id:"patient-appointment",from:"patient",to:"appointment",type:"一对多",description:"一个患者可以有多个预约记录"},{id:"doctor-appointment",from:"doctor",to:"appointment",type:"一对多",description:"一个医生可以有多个预约安排"},{id:"patient-diagnosis",from:"patient",to:"diagnosis",type:"一对多",description:"一个患者可以有多个诊断记录"}],complexity:"complex",status:"active",tags:["医疗","患者管理","预约系统","电子病历"],createdBy:"医疗信息架构师",createdAt:"2024-05-20",lastModified:"2024-06-10",usageCount:78},{id:"4",name:"智能物流配送系统",industry:"logistics",description:"现代化物流配送系统架构，支持订单管理、路线规划、车辆调度和实时追踪等功能",scenario:"适用于快递公司、物流企业、电商配送等场景",entities:[{id:"package",name:"包裹",type:"业务实体",description:"待配送的包裹信息",attributes:["包裹ID","订单ID","重量","体积","物品类型","优先级"]},{id:"vehicle",name:"车辆",type:"业务实体",description:"配送车辆信息",attributes:["车辆ID","车型","载重","当前位置","状态","司机ID"]},{id:"route",name:"路线",type:"业务实体",description:"配送路线规划",attributes:["路线ID","起点","终点","途经点","预计时间","实际时间","距离"]},{id:"warehouse",name:"仓库",type:"业务实体",description:"物流仓库信息",attributes:["仓库ID","名称","位置","容量","存储类型","操作时间"]}],relations:[{id:"package-route",from:"package",to:"route",type:"多对一",description:"多个包裹可以共享一条配送路线"},{id:"vehicle-route",from:"vehicle",to:"route",type:"一对多",description:"一个车辆可以执行多条配送路线"},{id:"warehouse-package",from:"warehouse",to:"package",type:"一对多",description:"一个仓库可以存储多个包裹"}],complexity:"medium",status:"active",tags:["物流","配送","路线规划","实时追踪"],createdBy:"物流系统架构师",createdAt:"2024-05-25",lastModified:"2024-06-08",usageCount:92},{id:"5",name:"智慧校园管理系统",industry:"education",description:"现代化校园管理系统，整合学生管理、课程安排、教学资源和校园服务等功能",scenario:"适用于大学、中小学、培训机构等教育组织",entities:[{id:"student",name:"学生",type:"业务实体",description:"在校学生信息",attributes:["学生ID","姓名","年级","班级","联系方式","入学时间","学籍状态"]},{id:"teacher",name:"教师",type:"业务实体",description:"教职工信息",attributes:["教师ID","姓名","科目","职称","联系方式","入职时间"]},{id:"course",name:"课程",type:"业务实体",description:"教学课程信息",attributes:["课程ID","课程名称","学分","课时","教师ID","教室","时间段"]},{id:"classroom",name:"教室",type:"业务实体",description:"教学场所信息",attributes:["教室ID","名称","位置","容量","设备配置","状态"]}],relations:[{id:"student-course",from:"student",to:"course",type:"多对多",description:"学生可以选修多门课程，课程可以有多个学生"},{id:"teacher-course",from:"teacher",to:"course",type:"一对多",description:"一个教师可以教授多门课程"},{id:"course-classroom",from:"course",to:"classroom",type:"多对多",description:"课程可以在不同教室进行，教室可以用于不同课程"}],complexity:"medium",status:"active",tags:["教育","学生管理","课程安排","教学资源"],createdBy:"教育信息架构师",createdAt:"2024-05-18",lastModified:"2024-06-05",usageCount:65},{id:"6",name:"智能制造生产管理",industry:"automotive",description:"智能制造生产管理系统，支持生产计划、设备管理、质量控制和供应链协同等功能",scenario:"适用于汽车制造、电子组装、工业生产等制造业",entities:[{id:"product",name:"产品",type:"业务实体",description:"生产的产品信息",attributes:["产品ID","名称","型号","规格","BOM清单","生产周期"]},{id:"equipment",name:"设备",type:"业务实体",description:"生产设备信息",attributes:["设备ID","名称","类型","状态","维护周期","生产能力"]},{id:"workorder",name:"工单",type:"业务实体",description:"生产工单信息",attributes:["工单ID","产品ID","计划数量","开始时间","结束时间","状态"]},{id:"material",name:"物料",type:"业务实体",description:"生产所需物料信息",attributes:["物料ID","名称","规格","库存量","供应商","采购周期"]}],relations:[{id:"product-workorder",from:"product",to:"workorder",type:"一对多",description:"一个产品可以有多个生产工单"},{id:"equipment-workorder",from:"equipment",to:"workorder",type:"多对多",description:"设备可以执行多个工单，工单可能需要多台设备"},{id:"product-material",from:"product",to:"material",type:"多对多",description:"产品由多种物料组成，物料可用于多种产品"}],complexity:"complex",status:"active",tags:["制造","生产管理","设备监控","质量控制"],createdBy:"制造系统架构师",createdAt:"2024-05-10",lastModified:"2024-06-12",usageCount:103}],u={ecommerce:{name:e("solutions:industry.ecommerce"),color:"blue",icon:t.jsx(it,{})},finance:{name:e("solutions:industry.finance"),color:"green",icon:t.jsx(st,{})},healthcare:{name:e("solutions:industry.healthcare"),color:"red",icon:t.jsx(et,{})},automotive:{name:e("solutions:industry.automotive"),color:"orange",icon:t.jsx(tt,{})},education:{name:e("solutions:industry.education"),color:"purple",icon:t.jsx(Z,{})},logistics:{name:e("solutions:industry.logistics"),color:"cyan",icon:t.jsx(Q,{})}},w=s=>{const a={simple:{color:"green",text:e("solutions:complexity.simple")},medium:{color:"orange",text:e("solutions:complexity.medium")},complex:{color:"red",text:e("solutions:complexity.complex")}}[s];return t.jsx(r,{color:a.color,children:a.text})},S=s=>{const a={active:{color:"green",text:e("solutions:status.active")},draft:{color:"orange",text:e("solutions:status.draft")},deprecated:{color:"red",text:e("solutions:status.deprecated")}}[s];return t.jsx(r,{color:a.color,children:a.text})},D=s=>{N(s),I(!0)};return t.jsxs(ct,{children:[t.jsx(dt,{children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[t.jsxs("div",{children:[t.jsx(lt,{level:2,style:{margin:0},children:t.jsxs(d,{children:[t.jsx(k,{style:{color:"#1890ff"}}),e("solutions:title")]})}),t.jsx(f,{style:{marginTop:8,marginBottom:0,fontSize:16},children:e("solutions:subtitle")})]}),t.jsxs(d,{children:[t.jsx(h,{icon:t.jsx(L,{}),children:e("solutions:refresh")}),t.jsx(h,{type:"primary",icon:t.jsx(U,{}),children:e("solutions:createSolution")})]})]})}),t.jsxs(x,{gutter:[16,16],style:{marginBottom:24},children:[t.jsx(l,{xs:12,sm:12,md:6,lg:6,xl:6,children:t.jsx(y,{children:t.jsx(p,{title:e("solutions:stats.totalSolutions"),value:m.length,suffix:e("common:unit.count"),valueStyle:{color:"#1890ff"},prefix:t.jsx(k,{})})})}),t.jsx(l,{xs:12,sm:12,md:6,lg:6,xl:6,children:t.jsx(y,{children:t.jsx(p,{title:e("solutions:stats.activeSolutions"),value:m.filter(s=>s.status==="active").length,suffix:e("common:unit.count"),valueStyle:{color:"#52c41a"},prefix:t.jsx(J,{})})})}),t.jsx(l,{xs:12,sm:12,md:6,lg:6,xl:6,children:t.jsx(y,{children:t.jsx(p,{title:e("solutions:stats.businessEntities"),value:m.reduce((s,i)=>s+i.entities.length,0),suffix:e("common:unit.count"),valueStyle:{color:"#faad14"},prefix:t.jsx(T,{})})})}),t.jsx(l,{xs:12,sm:12,md:6,lg:6,xl:6,children:t.jsx(y,{children:t.jsx(p,{title:e("solutions:stats.totalUsage"),value:m.reduce((s,i)=>s+i.usageCount,0),suffix:e("common:unit.times"),valueStyle:{color:"#722ed1"},prefix:t.jsx(W,{})})})})]}),t.jsx(nt,{searchValue:$,onSearchChange:P,searchPlaceholder:e("solutions:search.placeholder"),filters:[{key:"industry",value:A,onChange:E,placeholder:e("solutions:search.industryType"),width:120,options:[{value:"all",label:e("solutions:allIndustries")},...Object.entries(u).map(([s,i])=>({value:s,label:i.name}))]},{key:"complexity",value:F,onChange:V,placeholder:e("solutions:search.complexity"),width:100,options:[{value:"all",label:e("solutions:allComplexities")},{value:"simple",label:e("solutions:complexity.simple")},{value:"medium",label:e("solutions:complexity.medium")},{value:"complex",label:e("solutions:complexity.complex")}]},{key:"status",value:O,onChange:q,placeholder:e("solutions:search.status"),width:100,options:[{value:"all",label:e("solutions:allStatuses")},{value:"active",label:e("solutions:status.active")},{value:"draft",label:e("solutions:status.draft")},{value:"deprecated",label:e("solutions:status.deprecated")}]}],onRefresh:()=>window.location.reload()}),t.jsx(x,{gutter:[20,20],children:m.map(s=>{const i=u[s.industry];return t.jsx(l,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:t.jsx(pt,{title:t.jsxs("div",{className:"card-title",children:[t.jsx("div",{className:"title-left",children:t.jsxs(d,{children:[i==null?void 0:i.icon,t.jsx("span",{children:s.name})]})}),t.jsx("div",{className:"title-right",children:S(s.status)})]}),onClick:()=>D(s),children:t.jsxs("div",{className:"card-content",children:[t.jsxs("div",{className:"card-tags",children:[t.jsx(r,{color:i==null?void 0:i.color,icon:i==null?void 0:i.icon,children:i==null?void 0:i.name}),w(s.complexity)]}),t.jsx("div",{className:"card-description",children:t.jsx(f,{ellipsis:{rows:2,tooltip:s.description},style:{margin:0,color:"#666",lineHeight:"1.5"},children:s.description})}),t.jsx("div",{className:"card-stats",children:t.jsxs(x,{gutter:[8,8],children:[t.jsx(l,{span:8,children:t.jsx(p,{title:e("solutions:card.businessEntities"),value:s.entities.length,valueStyle:{fontSize:18,color:"#1890ff"}})}),t.jsx(l,{span:8,children:t.jsx(p,{title:e("solutions:modal.relationCount"),value:s.relations.length,valueStyle:{fontSize:18,color:"#52c41a"}})}),t.jsx(l,{span:8,children:t.jsx(p,{title:e("solutions:card.usageCount"),value:s.usageCount,valueStyle:{fontSize:18,color:"#722ed1"}})})]})}),t.jsx("div",{className:"card-tags-section",children:t.jsxs(d,{wrap:!0,size:[4,4],children:[s.tags.slice(0,4).map(a=>t.jsx(r,{size:"small",color:"geekblue",children:a},a)),s.tags.length>4&&t.jsxs(r,{size:"small",color:"default",children:["+",s.tags.length-4]})]})}),t.jsxs("div",{className:"card-footer",children:[t.jsxs("div",{className:"footer-item",children:[t.jsx("span",{className:"footer-label",children:e("solutions:card.creator")}),t.jsx("span",{className:"footer-value",children:s.createdBy})]}),t.jsxs("div",{className:"footer-item",children:[t.jsx("span",{className:"footer-label",children:e("solutions:card.updateTime")}),t.jsx("span",{className:"footer-value",children:s.lastModified})]})]}),t.jsx("div",{className:"card-actions",children:t.jsxs(d,{children:[t.jsx(R,{title:e("solutions:card.viewDetails"),children:t.jsx(h,{type:"text",icon:t.jsx(X,{}),size:"small",onClick:a=>{a.stopPropagation(),D(s)}})}),t.jsx(R,{title:e("solutions:card.edit"),children:t.jsx(h,{type:"text",icon:t.jsx(Y,{}),size:"small",onClick:a=>{a.stopPropagation()}})})]})})]})})},s.id)})}),t.jsx(_,{title:o==null?void 0:o.name,open:M,onCancel:()=>I(!1),footer:null,width:1200,style:{top:20},children:o&&t.jsxs("div",{children:[t.jsxs(n,{bordered:!0,column:2,style:{marginBottom:24},children:[t.jsx(n.Item,{label:e("solutions:modal.solutionName"),span:2,children:o.name}),t.jsx(n.Item,{label:e("solutions:modal.industryType"),children:t.jsx(r,{color:(C=u[o.industry])==null?void 0:C.color,icon:(z=u[o.industry])==null?void 0:z.icon,children:(B=u[o.industry])==null?void 0:B.name})}),t.jsx(n.Item,{label:e("solutions:modal.complexity"),children:w(o.complexity)}),t.jsx(n.Item,{label:e("solutions:modal.status"),children:S(o.status)}),t.jsxs(n.Item,{label:e("solutions:modal.usageCount"),children:[o.usageCount,e("common:unit.times")]}),t.jsxs(n.Item,{label:e("solutions:modal.entityCount"),children:[o.entities.length,e("common:unit.count")]}),t.jsxs(n.Item,{label:e("solutions:modal.relationCount"),children:[o.relations.length,e("common:unit.count")]}),t.jsx(n.Item,{label:e("solutions:modal.creator"),children:o.createdBy}),t.jsx(n.Item,{label:e("solutions:modal.createTime"),children:o.createdAt}),t.jsx(n.Item,{label:e("solutions:modal.tags"),span:2,children:t.jsx(d,{wrap:!0,children:o.tags.map(s=>t.jsx(r,{children:s},s))})}),t.jsx(n.Item,{label:e("solutions:modal.description"),span:2,children:o.description}),t.jsx(n.Item,{label:e("solutions:modal.scenario"),span:2,children:o.scenario})]}),t.jsxs(v,{defaultActiveKey:"entities",children:[t.jsx(v.TabPane,{tab:e("solutions:modal.businessEntities"),children:t.jsx(x,{gutter:16,children:o.entities.map(s=>t.jsx(l,{xs:24,sm:12,lg:8,children:t.jsxs(g,{title:t.jsxs(d,{children:[t.jsx(G,{style:{color:"#1890ff"}}),s.name]}),size:"small",style:{marginBottom:16},children:[t.jsx("div",{style:{marginBottom:8},children:t.jsx(r,{color:"blue",children:s.type})}),t.jsx(f,{style:{fontSize:12,marginBottom:12},children:s.description}),t.jsxs("div",{children:[t.jsxs(rt,{strong:!0,style:{fontSize:12},children:[e("solutions:modal.attributes"),":"]}),t.jsx("div",{style:{marginTop:4},children:s.attributes.map(i=>t.jsx(r,{size:"small",style:{marginBottom:4},children:i},i))})]})]})},s.id))})},"entities"),t.jsx(v.TabPane,{tab:e("solutions:modal.entityRelations"),children:t.jsx(x,{gutter:16,children:o.relations.map(s=>{var i,a;return t.jsx(l,{xs:24,sm:12,lg:8,children:t.jsxs(g,{title:t.jsxs(d,{children:[t.jsx(T,{style:{color:"#52c41a"}}),(i=o.entities.find(b=>b.id===s.from))==null?void 0:i.name,"→",(a=o.entities.find(b=>b.id===s.to))==null?void 0:a.name]}),size:"small",style:{marginBottom:16},children:[t.jsx("div",{style:{marginBottom:8},children:t.jsx(r,{color:"green",children:s.type})}),t.jsx(f,{style:{fontSize:12},children:s.description})]})},s.id)})})},"relations")]})]})})]})};export{zt as default};
