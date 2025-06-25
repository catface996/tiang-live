import{u as se,b as ae,a as ne,c as re,j as e,d as c}from"./index-DmkKiKNT.js";import{r as m,af as o,Q as T,B as x,aI as ie,T as le,k as g,o as ce,at as E,aK as oe,aL as z,Z as de,P as pe,aj as $,N as ue,aJ as me,d as M,C as r,a1 as B,f as P,aC as xe,s as A,ay as ge,u as w,w as F,$ as he,a as fe,aB as Q,V as H,ao as ye,M as je,j as N}from"./antd-CbyKqlos.js";import"./vendor-DJG_os-6.js";const{Title:be,Text:h,Paragraph:Se}=le,ke=c.div`
  padding: 24px;
`,$e=c.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  .ant-breadcrumb {
    display: flex;
    align-items: center;
    line-height: 1;
    
    .ant-breadcrumb-link {
      display: flex;
      align-items: center;
      line-height: 1;
    }
    
    .ant-breadcrumb-separator {
      display: flex;
      align-items: center;
      line-height: 1;
      margin: 0 8px;
    }
    
    ol {
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;
      list-style: none;
      
      li {
        display: flex;
        align-items: center;
        line-height: 1;
      }
    }
  }
`,we=c.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`,De=c.div`
  flex: 1;
`,Ie=c.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Ce=c(N)`
  margin-bottom: 24px;
  border-radius: 8px;
  background: ${a=>a.$isDark?"linear-gradient(145deg, #1a1a1a, #141414)":"linear-gradient(145deg, #ffffff, #fafafa)"};
  border: 1px solid ${a=>a.$isDark?"rgba(255, 255, 255, 0.08)":"rgba(0, 0, 0, 0.06)"};
  
  .ant-card-body {
    padding: 20px;
  }
`,D=c.div`
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: ${a=>a.$isDark?"rgba(255, 255, 255, 0.03)":"rgba(0, 0, 0, 0.02)"};
  border: 1px solid ${a=>a.$isDark?"rgba(255, 255, 255, 0.05)":"rgba(0, 0, 0, 0.04)"};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${a=>a.$isDark?"rgba(255, 255, 255, 0.05)":"rgba(0, 0, 0, 0.04)"};
    transform: translateY(-2px);
  }
`,I=c.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${a=>a.color||"#1890ff"};
`,C=c.div`
  font-size: 14px;
  color: ${a=>a.$isDark?"rgba(255, 255, 255, 0.65)":"rgba(0, 0, 0, 0.65)"};
  font-weight: 500;
`,ve=c(N)`
  margin-bottom: 24px;
  border-radius: 8px;
  background: ${a=>a.$isDark?"linear-gradient(145deg, #1a1a1a, #141414)":"linear-gradient(145deg, #ffffff, #fafafa)"};
  border: 1px solid ${a=>a.$isDark?"rgba(255, 255, 255, 0.08)":"rgba(0, 0, 0, 0.06)"};
  
  .ant-card-head {
    border-bottom: 1px solid ${a=>a.$isDark?"#303030":"#f0f0f0"};
  }
`,Re=()=>{const{t:a}=se(["entityScan","common"]),V=ae(),{dataSourceId:b}=ne(),l=re(t=>t.theme.isDark),[d,J]=m.useState(null),[n,f]=m.useState(null),[p,q]=m.useState([]),[W,S]=m.useState(!1),[K,y]=m.useState(!1),[u,v]=m.useState([]),Y=(t,s)=>{switch(t){case"database":return e.jsx(P,{});case"api":return e.jsx(A,{});case"cloud":return e.jsx(xe,{});default:return e.jsx(P,{})}},_=t=>{switch(t){case"table":return e.jsx(Q,{style:{color:"#1890ff"}});case"view":return e.jsx(F,{style:{color:"#52c41a"}});case"procedure":return e.jsx(ye,{style:{color:"#722ed1"}});case"function":return e.jsx(H,{style:{color:"#fa8c16"}});case"api":return e.jsx(A,{style:{color:"#13c2c2"}});case"file":return e.jsx(H,{style:{color:"#eb2f96"}});default:return e.jsx(Q,{})}},R=t=>{const s={running:{text:"扫描中",color:"processing",icon:e.jsx(z,{spin:!0})},completed:{text:"已完成",color:"success",icon:e.jsx(fe,{})},failed:{text:"扫描失败",color:"error",icon:e.jsx(he,{})},paused:{text:"已暂停",color:"warning",icon:e.jsx(E,{})}};return s[t]||s.completed};m.useEffect(()=>{b&&(Z(),L())},[b]);const Z=async()=>{try{S(!0);const t={id:b,name:"MySQL主数据库",type:"database",subType:"mysql",description:"生产环境主数据库，包含用户、订单、商品等核心业务数据",host:"192.168.1.100",port:3306,database:"ecommerce_db",username:"admin",status:"connected",lastConnected:new Date().toLocaleString(),scanCount:5};J(t)}catch{o.error("加载数据源信息失败")}finally{S(!1)}},L=async()=>{try{S(!0);const t={id:`task_${Date.now()}`,dataSourceId:b,dataSourceName:"MySQL主数据库",status:"completed",progress:100,startTime:new Date(Date.now()-3e5).toLocaleString(),endTime:new Date().toLocaleString(),entityCount:15,errorCount:0,selectedCount:12};f(t);const s=[{id:"1",name:"users",type:"table",schema:"ecommerce_db",description:"用户信息表",selected:!0,scanTime:new Date().toLocaleString(),recordCount:1e4,size:"2.5MB",columns:[{name:"id",type:"bigint",nullable:!1,primaryKey:!0,description:"用户ID"},{name:"username",type:"varchar(50)",nullable:!1,primaryKey:!1,description:"用户名"},{name:"email",type:"varchar(100)",nullable:!1,primaryKey:!1,description:"邮箱"},{name:"created_at",type:"timestamp",nullable:!1,primaryKey:!1,description:"创建时间"}]},{id:"2",name:"orders",type:"table",schema:"ecommerce_db",description:"订单信息表",selected:!0,scanTime:new Date().toLocaleString(),recordCount:5e4,size:"12.8MB",columns:[{name:"id",type:"bigint",nullable:!1,primaryKey:!0,description:"订单ID"},{name:"user_id",type:"bigint",nullable:!1,primaryKey:!1,foreignKey:"users.id",description:"用户ID"},{name:"total_amount",type:"decimal(10,2)",nullable:!1,primaryKey:!1,description:"订单总额"},{name:"status",type:"varchar(20)",nullable:!1,primaryKey:!1,description:"订单状态"}]},{id:"3",name:"products",type:"table",schema:"ecommerce_db",description:"商品信息表",selected:!0,scanTime:new Date().toLocaleString(),recordCount:5e3,size:"8.2MB",columns:[{name:"id",type:"bigint",nullable:!1,primaryKey:!0,description:"商品ID"},{name:"name",type:"varchar(200)",nullable:!1,primaryKey:!1,description:"商品名称"},{name:"price",type:"decimal(10,2)",nullable:!1,primaryKey:!1,description:"商品价格"},{name:"category_id",type:"int",nullable:!1,primaryKey:!1,description:"分类ID"}]},{id:"4",name:"user_orders_view",type:"view",schema:"ecommerce_db",description:"用户订单视图",selected:!1,scanTime:new Date().toLocaleString(),columns:[{name:"user_id",type:"bigint",nullable:!1,primaryKey:!1,description:"用户ID"},{name:"username",type:"varchar(50)",nullable:!1,primaryKey:!1,description:"用户名"},{name:"order_count",type:"bigint",nullable:!1,primaryKey:!1,description:"订单数量"},{name:"total_spent",type:"decimal(12,2)",nullable:!0,primaryKey:!1,description:"总消费"}]},{id:"5",name:"get_user_stats",type:"procedure",schema:"ecommerce_db",description:"获取用户统计信息存储过程",selected:!1,scanTime:new Date().toLocaleString(),columns:[]}];q(s),v(s.filter(i=>i.selected).map(i=>i.id))}catch{o.error("加载扫描结果失败")}finally{S(!1)}},G=async()=>{if(d)try{y(!0),f(s=>s?{...s,status:"running",progress:0,startTime:new Date().toLocaleString(),endTime:void 0}:null),o.loading("正在扫描数据源...",2);const t=setInterval(()=>{f(s=>{if(!s||s.status!=="running")return clearInterval(t),s;const i=Math.min(s.progress+Math.random()*15,100);return i>=100?(clearInterval(t),y(!1),o.success("扫描完成！"),{...s,status:"completed",progress:100,endTime:new Date().toLocaleString(),entityCount:p.length,selectedCount:u.length}):{...s,progress:i}})},500)}catch{y(!1),o.error("扫描失败！")}},O=()=>{y(!1),f(t=>t?{...t,status:"paused"}:null),o.info("扫描已暂停")},U=()=>{y(!1),f(t=>t?{...t,status:"completed",endTime:new Date().toLocaleString()}:null),o.info("扫描已停止")},X=()=>{const t=p.filter(s=>u.includes(s.id));o.success(`已导出 ${t.length} 个实体定义`)},ee=t=>{var s;je.info({title:`实体详情 - ${t.name}`,width:800,content:e.jsxs("div",{style:{marginTop:16},children:[e.jsxs(M,{gutter:[16,8],style:{marginBottom:16},children:[e.jsx(r,{span:6,children:e.jsx("strong",{children:"名称:"})}),e.jsx(r,{span:18,children:t.name}),e.jsx(r,{span:6,children:e.jsx("strong",{children:"类型:"})}),e.jsx(r,{span:18,children:e.jsxs(g,{children:[_(t.type),t.type]})}),e.jsx(r,{span:6,children:e.jsx("strong",{children:"模式:"})}),e.jsx(r,{span:18,children:t.schema||"-"}),e.jsx(r,{span:6,children:e.jsx("strong",{children:"描述:"})}),e.jsx(r,{span:18,children:t.description||"-"}),e.jsx(r,{span:6,children:e.jsx("strong",{children:"记录数:"})}),e.jsx(r,{span:18,children:((s=t.recordCount)==null?void 0:s.toLocaleString())||"-"}),e.jsx(r,{span:6,children:e.jsx("strong",{children:"大小:"})}),e.jsx(r,{span:18,children:t.size||"-"})]}),t.columns.length>0&&e.jsxs(e.Fragment,{children:[e.jsx($,{children:"字段信息"}),e.jsx(B,{size:"small",dataSource:t.columns,pagination:!1,columns:[{title:"字段名",dataIndex:"name",key:"name"},{title:"类型",dataIndex:"type",key:"type"},{title:"属性",key:"attributes",render:(i,j)=>e.jsxs(g,{children:[j.primaryKey&&e.jsx(w,{color:"red",children:"主键"}),j.foreignKey&&e.jsx(w,{color:"blue",children:"外键"}),j.nullable&&e.jsx(w,{color:"orange",children:"可空"})]})},{title:"描述",dataIndex:"description",key:"description"}]})]})]})})},te=[{title:"选择",key:"select",width:60,render:(t,s)=>e.jsx(ge,{checked:u.includes(s.id),onChange:i=>{v(i?[...u,s.id]:u.filter(j=>j!==s.id))}})},{title:"实体名称",dataIndex:"name",key:"name",render:(t,s)=>e.jsxs(g,{children:[_(s.type),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:t}),e.jsxs(h,{type:"secondary",style:{fontSize:"12px"},children:[s.schema&&`${s.schema}.`,t]})]})]})},{title:"类型",dataIndex:"type",key:"type",width:100,render:t=>{const i={table:{name:"表",color:"blue"},view:{name:"视图",color:"green"},procedure:{name:"存储过程",color:"purple"},function:{name:"函数",color:"orange"},api:{name:"API",color:"cyan"},file:{name:"文件",color:"magenta"}}[t]||{name:t,color:"default"};return e.jsx(w,{color:i.color,children:i.name})}},{title:"描述",dataIndex:"description",key:"description",ellipsis:!0},{title:"记录数",dataIndex:"recordCount",key:"recordCount",width:100,render:t=>t?t.toLocaleString():"-"},{title:"大小",dataIndex:"size",key:"size",width:80},{title:"扫描时间",dataIndex:"scanTime",key:"scanTime",width:150,render:t=>e.jsx(h,{style:{fontSize:"12px"},children:t})},{title:"操作",key:"actions",width:100,render:(t,s)=>e.jsx(g,{children:e.jsx(x,{type:"text",size:"small",icon:e.jsx(F,{}),onClick:()=>ee(s),children:"查看"})})}],k=()=>n?{totalEntities:p.length,selectedEntities:u.length,tableCount:p.filter(t=>t.type==="table").length,viewCount:p.filter(t=>t.type==="view").length}:{totalEntities:0,selectedEntities:0,tableCount:0,viewCount:0};return d?e.jsxs(ke,{children:[e.jsx($e,{children:e.jsxs(T,{children:[e.jsx(T.Item,{children:e.jsx(x,{type:"text",icon:e.jsx(ie,{}),onClick:()=>V("/system-settings/entity-scan"),style:{display:"flex",alignItems:"center",padding:"4px 8px",height:"auto"},children:a("menu:entityScan")})}),e.jsx(T.Item,{children:e.jsx("span",{style:{display:"flex",alignItems:"center"},children:d.name})})]})}),e.jsxs(we,{children:[e.jsxs(De,{children:[e.jsx(be,{level:2,style:{margin:0},children:e.jsxs(g,{children:[Y(d.type,d.subType),d.name]})}),e.jsx(Se,{style:{margin:"8px 0 0 0",color:l?"rgba(255, 255, 255, 0.65)":"rgba(0, 0, 0, 0.65)"},children:d.description})]}),e.jsxs(Ie,{children:[e.jsx(x,{icon:e.jsx(ce,{}),onClick:L,disabled:K,children:"刷新"}),(n==null?void 0:n.status)==="running"?e.jsxs(g,{children:[e.jsx(x,{icon:e.jsx(E,{}),onClick:O,children:"暂停"}),e.jsx(x,{danger:!0,icon:e.jsx(oe,{}),onClick:U,children:"停止"})]}):e.jsx(x,{type:"primary",icon:e.jsx(z,{}),onClick:G,loading:K,children:"开始扫描"}),e.jsx(x,{icon:e.jsx(de,{}),onClick:X,disabled:u.length===0,children:"导出实体"})]})]}),n&&e.jsx(pe,{message:e.jsxs(g,{children:[e.jsx(ue,{status:R(n.status).color}),R(n.status).text,n.status==="running"&&e.jsx(me,{percent:Math.round(n.progress),size:"small",style:{width:200,marginLeft:16}})]}),description:e.jsxs("div",{children:[e.jsxs(h,{children:["开始时间: ",n.startTime]}),n.endTime&&e.jsxs(e.Fragment,{children:[e.jsx($,{type:"vertical"}),e.jsxs(h,{children:["结束时间: ",n.endTime]})]}),e.jsx($,{type:"vertical"}),e.jsxs(h,{children:["发现实体: ",n.entityCount," 个"]}),n.errorCount>0&&e.jsxs(e.Fragment,{children:[e.jsx($,{type:"vertical"}),e.jsxs(h,{type:"danger",children:["错误: ",n.errorCount," 个"]})]})]}),type:n.status==="failed"?"error":n.status==="running"?"info":"success",style:{marginBottom:24}}),e.jsx(Ce,{$isDark:l,title:"扫描统计",children:e.jsxs(M,{gutter:[16,16],children:[e.jsx(r,{xs:12,sm:6,children:e.jsxs(D,{$isDark:l,children:[e.jsx(I,{color:"#1890ff",children:k().totalEntities}),e.jsx(C,{$isDark:l,children:"发现实体"})]})}),e.jsx(r,{xs:12,sm:6,children:e.jsxs(D,{$isDark:l,children:[e.jsx(I,{color:"#52c41a",children:k().selectedEntities}),e.jsx(C,{$isDark:l,children:"已选择"})]})}),e.jsx(r,{xs:12,sm:6,children:e.jsxs(D,{$isDark:l,children:[e.jsx(I,{color:"#722ed1",children:k().tableCount}),e.jsx(C,{$isDark:l,children:"数据表"})]})}),e.jsx(r,{xs:12,sm:6,children:e.jsxs(D,{$isDark:l,children:[e.jsx(I,{color:"#fa8c16",children:k().viewCount}),e.jsx(C,{$isDark:l,children:"视图"})]})})]})}),e.jsx(ve,{$isDark:l,title:"扫描实体",children:e.jsx(B,{columns:te,dataSource:p,loading:W,rowKey:"id",pagination:{total:p.length,pageSize:20,showSizeChanger:!0,showQuickJumper:!0,showTotal:(t,s)=>`第 ${s[0]}-${s[1]} 条，共 ${t} 条记录`}})})]}):e.jsx("div",{children:"加载中..."})};export{Re as default};
