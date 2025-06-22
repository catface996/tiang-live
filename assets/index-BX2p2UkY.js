import{a as l,R as me,j as e}from"./react-BkaC_jdz.js";import{_ as F,y as xe,d as y,aC as x,u as he,c as fe,S as d,k as E,B as q,ai as je,aa as ge,U as f,V as r,W as w,aD as qe,aE as U,ab as ye,aF as O,ax as p,a3 as A,r as B,az as k,a1 as P,an as H,X as Q,aG as W,a8 as J,a7 as ve,aH as be,aI as Se,T as X,a9 as Ce,ah as I}from"./react-dom-ZHUlsYA_.js";import{s as we}from"./index-Daowydkz.js";import{S as Me}from"./SearchFilterBar-Dq5sQrlY.js";import{m as Y}from"./mermaid-DnXdFSui.js";import"./vendor-CsGdsTBW.js";import"./dayjs-Bzorz0fL.js";import"./media-BbQ0wNgX.js";import"./lodash-BORto0-T.js";import"./redux-CiqK6azd.js";import"./echarts-core-7X-L1hka.js";import"./antd-icons-CI4I6I7B.js";import"./emotion-BhZTwsuK.js";import"./d3-ByniJY_B.js";const Ae=y.div`
  .mermaid {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    
    svg {
      max-width: 100%;
      height: auto;
    }
  }
`,Re=y.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`,_=({chart:n,title:j,loading:v=!1})=>{const c=l.useRef(null),[b,o]=me.useState(!1);return l.useEffect(()=>{Y.initialize({startOnLoad:!1,theme:"default",securityLevel:"loose",fontFamily:"Arial, sans-serif",fontSize:14,sequence:{diagramMarginX:50,diagramMarginY:10,actorMargin:50,width:150,height:65,boxMargin:10,boxTextMargin:5,noteMargin:10,messageMargin:35,mirrorActors:!0,bottomMarginAdj:1,useMaxWidth:!0,rightAngles:!1,showSequenceNumbers:!1}})},[]),l.useEffect(()=>{const h=async()=>{if(!n||!n.trim()){console.log("时序图: 没有图表内容"),o(!1);return}if(!c.current){console.log("时序图: DOM元素未准备好"),o(!1);return}console.log("时序图: 开始渲染",n.substring(0,50)+"..."),o(!0);try{c.current.innerHTML="";const u=`sequence-diagram-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;console.log("时序图: 调用mermaid.render");const{svg:S}=await Y.render(u,n);console.log("时序图: 渲染成功"),c.current&&(c.current.innerHTML=S),o(!1)}catch(u){console.error("时序图渲染错误:",u),c.current&&(c.current.innerHTML=`
            <div style="text-align: center; color: #ff4d4f; padding: 20px;">
              <p>时序图渲染失败</p>
              <p style="font-size: 12px; color: #999;">请检查时序图语法</p>
              <details style="margin-top: 10px; text-align: left;">
                <summary style="cursor: pointer;">错误详情</summary>
                <pre style="font-size: 10px; color: #666; margin-top: 5px;">${u}</pre>
              </details>
            </div>
          `),o(!1)}},m=setTimeout(()=>{h()},100);return()=>clearTimeout(m)},[n]),v||b?e.jsx(F,{title:j,children:e.jsx(Re,{children:e.jsx(xe,{size:"large",tip:"正在渲染时序图..."})})}):e.jsx(F,{title:j,children:e.jsx(Ae,{children:e.jsx("div",{ref:c,className:"mermaid"})})})},Ie=[{id:"1",name:"用户登录认证流程",description:"用户通过前端登录，后端验证身份并返回token的完整时序流程",type:"authentication",status:"active",participants:["用户","前端应用","认证服务","数据库"],steps:8,duration:"2000-5000",createdBy:"系统架构师",createdAt:"2024-06-10",lastModified:"2024-06-14",mermaidChart:`sequenceDiagram
    participant U as 用户
    participant F as 前端应用
    participant A as 认证服务
    participant D as 数据库
    
    U->>F: 输入用户名密码
    F->>A: 发送登录请求
    A->>D: 查询用户信息
    D-->>A: 返回用户数据
    A->>A: 验证密码
    alt 验证成功
        A->>A: 生成JWT Token
        A-->>F: 返回Token和用户信息
        F-->>U: 登录成功，跳转首页
    else 验证失败
        A-->>F: 返回错误信息
        F-->>U: 显示登录失败
    end`},{id:"2",name:"订单处理业务流程",description:"从用户下单到订单完成的完整业务时序，包含库存检查、支付处理等环节",type:"business",status:"active",participants:["用户","订单服务","库存服务","支付服务","通知服务"],steps:12,duration:"10000-30000",createdBy:"业务分析师",createdAt:"2024-06-08",lastModified:"2024-06-13",mermaidChart:`sequenceDiagram
    participant U as 用户
    participant O as 订单服务
    participant I as 库存服务
    participant P as 支付服务
    participant N as 通知服务
    
    U->>O: 提交订单
    O->>I: 检查库存
    alt 库存充足
        I-->>O: 库存确认
        O->>O: 创建订单
        O->>P: 发起支付
        P-->>O: 支付成功
        O->>I: 扣减库存
        O->>N: 发送订单确认
        N-->>U: 短信/邮件通知
        O-->>U: 订单创建成功
    else 库存不足
        I-->>O: 库存不足
        O-->>U: 商品库存不足
    end`},{id:"3",name:"微服务健康检查",description:"监控系统对各微服务进行健康检查的时序流程，包含服务发现和状态上报",type:"monitoring",status:"active",participants:["监控中心","服务注册中心","用户服务","订单服务","支付服务"],steps:10,duration:"5000-15000",createdBy:"运维工程师",createdAt:"2024-06-05",lastModified:"2024-06-12",mermaidChart:`sequenceDiagram
    participant M as 监控中心
    participant R as 服务注册中心
    participant U as 用户服务
    participant O as 订单服务
    participant P as 支付服务
    
    M->>R: 获取服务列表
    R-->>M: 返回服务实例
    
    par 并行健康检查
        M->>U: 健康检查请求
        U-->>M: 返回健康状态
    and
        M->>O: 健康检查请求
        O-->>M: 返回健康状态
    and
        M->>P: 健康检查请求
        P-->>M: 返回健康状态
    end
    
    M->>M: 汇总健康状态
    M->>R: 更新服务状态`},{id:"4",name:"数据同步流程",description:"主数据库与从数据库之间的数据同步时序，确保数据一致性",type:"data",status:"draft",participants:["应用服务","主数据库","从数据库","同步服务"],steps:6,duration:"1000-3000",createdBy:"数据库管理员",createdAt:"2024-06-12",lastModified:"2024-06-14",mermaidChart:`sequenceDiagram
    participant A as 应用服务
    participant M as 主数据库
    participant S as 同步服务
    participant R as 从数据库
    
    A->>M: 写入数据
    M-->>A: 写入确认
    M->>S: 触发同步事件
    S->>M: 读取变更日志
    M-->>S: 返回变更数据
    S->>R: 同步数据到从库
    R-->>S: 同步确认
    S->>S: 记录同步状态`},{id:"5",name:"API网关请求路由",description:"API网关接收请求并路由到相应微服务的时序流程，包含认证和限流",type:"gateway",status:"inactive",participants:["客户端","API网关","认证服务","用户服务","限流服务"],steps:15,duration:"100-500",createdBy:"架构师",createdAt:"2024-06-01",lastModified:"2024-06-11",mermaidChart:`sequenceDiagram
    participant C as 客户端
    participant G as API网关
    participant A as 认证服务
    participant L as 限流服务
    participant U as 用户服务
    
    C->>G: 发送API请求
    G->>A: 验证Token
    A-->>G: 认证结果
    
    alt 认证成功
        G->>L: 检查限流
        alt 未超限
            L-->>G: 通过限流检查
            G->>U: 转发请求到目标服务
            U-->>G: 返回响应
            G-->>C: 返回最终响应
        else 超出限流
            L-->>G: 限流拒绝
            G-->>C: 返回限流错误
        end
    else 认证失败
        G-->>C: 返回认证错误
    end`},{id:"6",name:"消息队列处理流程",description:"异步消息队列的生产、消费和处理时序流程",type:"business",status:"active",participants:["生产者","消息队列","消费者","业务处理器","数据库"],steps:8,duration:"50-200",createdBy:"系统架构师",createdAt:"2024-06-15",lastModified:"2024-06-18",mermaidChart:`sequenceDiagram
    participant P as 生产者
    participant Q as 消息队列
    participant C as 消费者
    participant H as 业务处理器
    participant D as 数据库
    
    P->>Q: 发送消息
    Q-->>P: 确认接收
    Q->>C: 推送消息
    C->>H: 处理业务逻辑
    H->>D: 持久化数据
    D-->>H: 确认保存
    H-->>C: 处理完成
    C->>Q: 确认消费`},{id:"7",name:"文件上传处理流程",description:"用户文件上传到云存储的完整时序流程，包含验证、上传、回调等步骤",type:"business",status:"active",participants:["客户端","上传服务","文件验证器","云存储","回调服务"],steps:10,duration:"2000-10000",createdBy:"前端工程师",createdAt:"2024-06-20",lastModified:"2024-06-20",mermaidChart:`sequenceDiagram
    participant C as 客户端
    participant U as 上传服务
    participant V as 文件验证器
    participant S as 云存储
    participant CB as 回调服务
    
    C->>U: 上传文件请求
    U->>V: 验证文件格式
    V-->>U: 验证通过
    U->>S: 上传到云存储
    S-->>U: 返回存储地址
    U->>CB: 触发上传回调
    CB->>CB: 处理后续业务
    CB-->>U: 回调完成
    U-->>C: 返回上传结果`},{id:"8",name:"缓存更新策略",description:"分布式缓存的更新和失效策略时序流程",type:"data",status:"active",participants:["应用服务","本地缓存","Redis集群","数据库","缓存管理器"],steps:7,duration:"10-50",createdBy:"后端工程师",createdAt:"2024-06-18",lastModified:"2024-06-19",mermaidChart:`sequenceDiagram
    participant A as 应用服务
    participant L as 本地缓存
    participant R as Redis集群
    participant D as 数据库
    participant M as 缓存管理器
    
    A->>L: 查询本地缓存
    alt 本地缓存命中
        L-->>A: 返回缓存数据
    else 本地缓存未命中
        A->>R: 查询Redis
        alt Redis命中
            R-->>A: 返回缓存数据
            A->>L: 更新本地缓存
        else Redis未命中
            A->>D: 查询数据库
            D-->>A: 返回数据
            A->>R: 更新Redis
            A->>L: 更新本地缓存
        end
    end`}],De={sequences:Ie},K=(n,j)=>{if(!n)return"";const v=n.match(/^(\d+)-(\d+)$/);if(!v)return n;const[,c,b]=v,o=parseInt(c),h=parseInt(b);if(o>=1e3){const m=o/1e3,u=h/1e3,S=m%1===0?m.toString():m.toFixed(1),R=u%1===0?u.toString():u.toFixed(1);return`${S}-${R} ${j("sequences:units.seconds")}`}else return`${c}-${b} ${j("sequences:units.milliseconds")}`},{Title:Pe,Paragraph:Fe,Text:_e}=fe,{Option:i}=P,{TextArea:Z}=k,Te=y.div`
  padding: 24px;
`,Ue=y.div`
  margin-bottom: 24px;
`,Oe=y(Z)`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;
  font-size: 13px;
  line-height: 1.5;
  background-color: #f6f8fa;
  border: 1px solid #d1d9e0;
  
  &:focus {
    background-color: #ffffff;
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  &::placeholder {
    color: #8c8c8c;
    font-size: 12px;
  }
`,D=y(F)`
  .ant-card-body {
    padding: 16px;
  }
`,Be=y(F)`
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 320px;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  
  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 12px 16px;
    
    .ant-card-head-title {
      font-size: 14px;
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
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 57px);
  }
  
  .sequence-description {
    flex: 1;
    margin-bottom: 12px;
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 36px;
  }
  
  .sequence-stats {
    margin-bottom: 12px;
    
    .ant-statistic-title {
      font-size: 11px;
      margin-bottom: 2px;
      color: #999;
    }
    
    .ant-statistic-content {
      font-size: 14px;
      font-weight: 600;
    }
  }
  
  .sequence-meta {
    font-size: 11px;
    color: #999;
    margin-bottom: 12px;
    
    > div {
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .sequence-actions {
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .participants-count {
      font-size: 11px;
      color: #999;
      font-weight: 500;
    }
  }
  
  /* 响应式优化 */
  @media (max-width: 768px) {
    min-height: 280px;
    
    .ant-card-head {
      padding: 10px 12px;
      
      .ant-card-head-title {
        font-size: 13px;
      }
    }
    
    .ant-card-body {
      padding: 12px;
    }
    
    .sequence-description {
      font-size: 12px;
      -webkit-line-clamp: 3;
      min-height: 42px;
    }
    
    .sequence-stats {
      .ant-statistic-content {
        font-size: 13px;
      }
    }
  }
  
  @media (max-width: 576px) {
    min-height: 260px;
    
    .sequence-stats {
      .ant-row {
        flex-direction: column;
        gap: 8px;
      }
      
      .ant-col {
        width: 100% !important;
        max-width: 100% !important;
        flex: none;
      }
    }
  }
`,Ke=()=>{var N,V,G;const[n,j]=l.useState(null),[v,c]=l.useState(!1),[b,o]=l.useState(!1),[h,m]=l.useState(null),[u,S]=l.useState(!1),[R,ee]=l.useState(""),[se,te]=l.useState(""),[ne,ae]=l.useState("all"),[ie,re]=l.useState("all"),[C]=x.useForm(),{t:s}=he(["sequences","common"]);l.useEffect(()=>{we(s("sequences:title"))},[]);const T=De.sequences,M={authentication:{name:s("sequences:types.authentication"),color:"blue",icon:e.jsx(B,{})},business:{name:s("sequences:types.business"),color:"green",icon:e.jsx(H,{})},monitoring:{name:s("sequences:types.monitoring"),color:"orange",icon:e.jsx(U,{})},data:{name:s("sequences:types.data"),color:"purple",icon:e.jsx(Q,{})},gateway:{name:s("sequences:types.gateway"),color:"cyan",icon:e.jsx(W,{})}},z=t=>{const g={active:{color:"green",text:s("sequences:statuses.active")},inactive:{color:"red",text:s("sequences:statuses.inactive")},draft:{color:"orange",text:s("sequences:statuses.draft")}}[t];return g?e.jsx(A,{color:g.color,children:g.text}):e.jsx(A,{children:t})},ce=T.filter(t=>t.status==="active").length,$=t=>{j(t),c(!0)},oe=()=>{m(null),C.resetFields(),o(!0)},le=t=>{m(t),C.setFieldsValue({name:t.name,description:t.description,type:t.type,status:t.status,participants:t.participants,duration:t.duration,mermaidChart:t.mermaidChart}),o(!0)},de=async t=>{try{h?I.success(s("sequences:messages.updateSuccess")):I.success(s("sequences:messages.createSuccess")),o(!1),C.resetFields()}catch{I.error(s(h?"sequences:messages.updateFailed":"sequences:messages.createFailed"))}},L=()=>{o(!1),C.resetFields(),m(null)},ue=()=>{const t=C.getFieldValue("mermaidChart");t?(ee(t),S(!0)):I.warning(s("sequences:messages.noChartCode"))},pe=()=>T.map(t=>{const a=M[t.type];return e.jsx(r,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:e.jsxs(Be,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsx("span",{children:t.name})}),e.jsx("div",{className:"title-right",children:z(t.status)})]}),onClick:()=>$(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsx(A,{color:a==null?void 0:a.color,icon:a==null?void 0:a.icon,children:a==null?void 0:a.name})}),e.jsx("div",{className:"sequence-description",children:t.description}),e.jsx("div",{className:"sequence-stats",children:e.jsxs(f,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(w,{title:s("sequences:stepCount"),value:t.steps,suffix:s("sequences:steps"),valueStyle:{fontSize:14}})}),e.jsx(r,{span:12,children:e.jsx(w,{title:s("sequences:executionDuration"),value:K(t.duration,s),valueStyle:{fontSize:14}})})]})}),e.jsxs("div",{className:"sequence-meta",children:[e.jsxs("div",{children:[s("sequences:createdBy"),": ",t.createdBy]}),e.jsxs("div",{children:[s("sequences:lastModified"),": ",t.lastModified]})]}),e.jsxs("div",{className:"sequence-actions",children:[e.jsxs("div",{className:"participants-count",children:[s("sequences:participants"),": ",t.participants.length]}),e.jsxs(d,{children:[e.jsx(X,{title:s("sequences:viewSequenceDiagram"),children:e.jsx(q,{type:"text",icon:e.jsx(J,{}),size:"small",onClick:g=>{g.stopPropagation(),$(t)}})}),e.jsx(X,{title:s("sequences:editSequence"),children:e.jsx(q,{type:"text",icon:e.jsx(Ce,{}),size:"small",onClick:g=>{g.stopPropagation(),le(t)}})})]})]})]})},t.id)});return e.jsxs(Te,{children:[e.jsx(Ue,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(Pe,{level:2,style:{margin:0},children:e.jsxs(d,{children:[e.jsx(E,{style:{color:"#1890ff"}}),s("sequences:title")]})}),e.jsx(Fe,{style:{marginTop:8,marginBottom:0,fontSize:16},children:s("sequences:description")})]}),e.jsxs(d,{children:[e.jsx(q,{icon:e.jsx(je,{}),children:s("common:refresh")}),e.jsx(q,{type:"primary",icon:e.jsx(ge,{}),onClick:oe,children:s("sequences:createSequence")})]})]})}),e.jsxs(f,{gutter:16,style:{marginBottom:24},children:[e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(D,{children:e.jsx(w,{title:s("sequences:stats.totalSequences"),value:T.length,suffix:s("common:unit.count"),valueStyle:{color:"#1890ff"},prefix:e.jsx(E,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(D,{children:e.jsx(w,{title:s("sequences:stats.activeSequences"),value:ce,suffix:s("common:unit.count"),valueStyle:{color:"#52c41a"},prefix:e.jsx(qe,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(D,{children:e.jsx(w,{title:s("sequences:stats.executionCount"),value:1247,suffix:s("sequences:executionUnit"),valueStyle:{color:"#722ed1"},prefix:e.jsx(U,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(D,{children:e.jsx(w,{title:s("sequences:stats.successRate"),value:98.5,suffix:"%",valueStyle:{color:"#52c41a"},prefix:e.jsx(ye,{status:"success"})})})})]}),e.jsx(Me,{searchValue:se,onSearchChange:te,searchPlaceholder:s("sequences:searchPlaceholder"),filters:[{key:"type",value:ne,onChange:ae,placeholder:s("sequences:typeFilter"),width:120,options:[{value:"all",label:s("sequences:allTypes")},...Object.entries(M).map(([t,a])=>({value:t,label:a.name}))]},{key:"status",value:ie,onChange:re,placeholder:s("common:status"),width:100,options:[{value:"all",label:s("sequences:allStatuses")},{value:"active",label:s("sequences:statuses.active")},{value:"inactive",label:s("sequences:statuses.inactive")},{value:"draft",label:s("sequences:statuses.draft")}]}],onRefresh:()=>window.location.reload()}),e.jsx(f,{gutter:[24,24],children:pe()}),e.jsx(O,{title:n==null?void 0:n.name,open:v,onCancel:()=>c(!1),footer:null,width:1200,style:{top:20},children:n&&e.jsxs("div",{children:[e.jsxs(p,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(p.Item,{label:s("sequences:sequenceName"),span:2,children:n.name}),e.jsx(p.Item,{label:s("common:type"),children:e.jsx(A,{color:(N=M[n.type])==null?void 0:N.color,icon:(V=M[n.type])==null?void 0:V.icon,children:(G=M[n.type])==null?void 0:G.name})}),e.jsx(p.Item,{label:s("common:status"),children:z(n.status)}),e.jsxs(p.Item,{label:s("sequences:stepCount"),children:[n.steps,s("sequences:steps")]}),e.jsx(p.Item,{label:s("sequences:executionDuration"),children:K(n.duration,s)}),e.jsx(p.Item,{label:s("sequences:participants"),span:2,children:e.jsx(d,{wrap:!0,children:n.participants.map((t,a)=>e.jsx(A,{icon:e.jsx(B,{}),children:t},a))})}),e.jsx(p.Item,{label:s("sequences:createdBy"),children:n.createdBy}),e.jsx(p.Item,{label:s("sequences:createdAt"),children:n.createdAt}),e.jsx(p.Item,{label:s("common:description"),span:2,children:n.description})]}),e.jsx(_,{chart:n.mermaidChart,title:s("sequences:sequenceDiagram")})]})}),e.jsx(O,{title:s(h?"sequences:editSequence":"sequences:createSequence"),open:b,onCancel:L,footer:null,width:800,destroyOnClose:!0,children:e.jsxs(x,{form:C,layout:"vertical",onFinish:de,initialValues:{status:"draft",type:"business"},children:[e.jsx(f,{gutter:16,children:e.jsx(r,{span:24,children:e.jsx(x.Item,{name:"name",label:s("sequences:form.name"),rules:[{required:!0,message:s("sequences:form.nameRequired")},{max:100,message:s("sequences:form.nameMaxLength")}],children:e.jsx(k,{placeholder:s("sequences:form.namePlaceholder")})})})}),e.jsx(f,{gutter:16,children:e.jsx(r,{span:24,children:e.jsx(x.Item,{name:"description",label:s("sequences:form.description"),rules:[{required:!0,message:s("sequences:form.descriptionRequired")},{max:500,message:s("sequences:form.descriptionMaxLength")}],children:e.jsx(Z,{rows:4,placeholder:s("sequences:form.descriptionPlaceholder"),showCount:!0,maxLength:500})})})}),e.jsxs(f,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(x.Item,{name:"type",label:s("sequences:form.type"),rules:[{required:!0,message:s("sequences:form.typeRequired")}],children:e.jsxs(P,{placeholder:s("sequences:form.typePlaceholder"),children:[e.jsx(i,{value:"authentication",children:e.jsxs(d,{children:[e.jsx(B,{}),s("sequences:types.authentication")]})}),e.jsx(i,{value:"business",children:e.jsxs(d,{children:[e.jsx(H,{}),s("sequences:types.business")]})}),e.jsx(i,{value:"monitoring",children:e.jsxs(d,{children:[e.jsx(U,{}),s("sequences:types.monitoring")]})}),e.jsx(i,{value:"data",children:e.jsxs(d,{children:[e.jsx(Q,{}),s("sequences:types.data")]})}),e.jsx(i,{value:"gateway",children:e.jsxs(d,{children:[e.jsx(W,{}),s("sequences:types.gateway")]})})]})})}),e.jsx(r,{span:12,children:e.jsx(x.Item,{name:"status",label:s("sequences:form.status"),rules:[{required:!0,message:s("sequences:form.statusRequired")}],children:e.jsxs(P,{placeholder:s("sequences:form.statusPlaceholder"),children:[e.jsx(i,{value:"draft",children:s("sequences:statuses.draft")}),e.jsx(i,{value:"active",children:s("sequences:statuses.active")}),e.jsx(i,{value:"inactive",children:s("sequences:statuses.inactive")})]})})})]}),e.jsxs(f,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(x.Item,{name:"participants",label:s("sequences:form.participants"),rules:[{required:!0,message:s("sequences:form.participantsRequired")}],children:e.jsxs(P,{mode:"tags",placeholder:s("sequences:form.participantsPlaceholder"),style:{width:"100%"},children:[e.jsx(i,{value:"User",children:s("sequences:participantOptions.user")}),e.jsx(i,{value:"Frontend",children:s("sequences:participantOptions.frontend")}),e.jsx(i,{value:"Backend",children:s("sequences:participantOptions.backend")}),e.jsx(i,{value:"Database",children:s("sequences:participantOptions.database")}),e.jsx(i,{value:"Cache",children:s("sequences:participantOptions.cache")}),e.jsx(i,{value:"Queue",children:s("sequences:participantOptions.queue")}),e.jsx(i,{value:"External API",children:s("sequences:participantOptions.externalApi")})]})})}),e.jsx(r,{span:12,children:e.jsx(x.Item,{name:"duration",label:s("sequences:form.duration"),rules:[{required:!0,message:s("sequences:form.durationRequired")}],children:e.jsx(k,{placeholder:s("sequences:form.durationPlaceholder"),addonAfter:s("sequences:form.durationUnit")})})})]}),e.jsx(f,{gutter:16,children:e.jsx(r,{span:24,children:e.jsx(x.Item,{name:"mermaidChart",label:e.jsxs(d,{children:[s("sequences:form.mermaidChart"),e.jsx(q,{type:"link",size:"small",icon:e.jsx(J,{}),onClick:ue,children:s("sequences:form.previewChart")})]}),rules:[{required:!0,message:s("sequences:form.mermaidChartRequired")}],children:e.jsx(Oe,{rows:8,placeholder:s("sequences:form.mermaidChartPlaceholder"),showCount:!0})})})}),e.jsx(ve,{}),e.jsx("div",{style:{textAlign:"right"},children:e.jsxs(d,{children:[e.jsx(q,{onClick:L,icon:e.jsx(be,{}),children:s("common:cancel")}),e.jsx(q,{type:"primary",htmlType:"submit",icon:e.jsx(Se,{}),children:s(h?"common:update":"common:create")})]})})]})}),e.jsx(O,{title:s("sequences:form.chartPreview"),open:u,onCancel:()=>S(!1),footer:null,width:1e3,style:{top:20},children:R&&e.jsx(_,{chart:R,title:s("sequences:form.previewTitle")})})]})};export{Ke as default};
