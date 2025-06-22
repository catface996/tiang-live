import{u as A,c as I,j as o,d as x,b as L}from"./index-Ah1DHFDa.js";import{K as P,w as R,x as z,Z as M,a8 as K,A as Q,V as p,u as T,T as N,k as E,S as f,aO as W,i as Y,W as Z,a4 as q,v as C,B as d,aP as G,aQ as J,j as F,r as u,N as U,aR as X,o as _,p as ee,d as B,C as g,af as S,D as oe,m as re}from"./antd-Cy_MGV7n.js";import{s as te}from"./index-Daowydkz.js";import{S as se}from"./SearchFilterBar-XI3x0YMN.js";import"./vendor-DJG_os-6.js";const{Text:be,Paragraph:ae}=N,ie=x(F)`
  height: 100%;
  min-height: 380px;
  transition: all 0.3s ease;
  background: ${e=>e.$isDark?"#141414":"#ffffff"};
  border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px !important;
  overflow: hidden;
  
  &:hover {
    box-shadow: ${e=>e.$isDark?"0 4px 12px rgba(255, 255, 255, 0.1)":"0 4px 12px rgba(0, 0, 0, 0.15)"};
    transform: translateY(-2px);
    border-color: ${e=>e.$isDark?"#177ddc":"#40a9ff"};
  }
  
  .ant-card-head {
    display: none; /* 隐藏默认头部，使用自定义头部 */
  }
  
  .ant-card-body {
    padding: 20px;
    background: ${e=>e.$isDark?"#141414":"#ffffff"};
    border-radius: 8px 8px 0 0 !important;
    display: flex;
    flex-direction: column;
    height: calc(100% - 64px); /* 减去actions的高度 */
  }
  
  .ant-card-actions {
    background: ${e=>e.$isDark?"#1f1f1f":"#fafafa"};
    border-top: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
    height: 64px;
    
    li {
      /* 移除按钮间的分割线 */
      border-right: none;
    }
    
    .ant-btn {
      color: ${e=>e.$isDark?"#ffffff":"#595959"};
      
      &:hover {
        color: ${e=>e.$isDark?"#177ddc":"#40a9ff"};
        background: ${e=>e.$isDark?"rgba(23, 125, 220, 0.1)":"rgba(64, 169, 255, 0.1)"};
      }
    }
  }
  
  .report-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .report-icon {
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .report-info {
    flex: 1;
    min-width: 0;
  }
  
  .report-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: ${e=>e.$isDark?"#ffffff":"#262626"};
    line-height: 1.4;
  }
  
  .report-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
  }
  
  .report-description {
    margin: 12px 0 16px 0;
    color: ${e=>e.$isDark?"#8c8c8c":"#666"};
    font-size: 13px;
    flex: 1;
  }
  
  .report-stats {
    margin: 16px 0;
    padding: 12px;
    background: ${e=>e.$isDark?"#1f1f1f":"#fafafa"};
    border-radius: 6px;
    border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  }
  
  .report-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 16px;
    border-top: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  }
  
  .report-author {
    display: flex;
    align-items: center;
    color: ${e=>e.$isDark?"#8c8c8c":"#666"};
    font-size: 12px;
  }
  
  .report-actions {
    display: flex;
    gap: 4px;
  }

  /* 响应式优化 */
  @media (max-width: 768px) {
    min-height: 340px;
    
    .ant-card-body {
      padding: 16px;
      height: calc(100% - 56px);
    }
    
    .ant-card-actions {
      height: 56px;
    }
    
    .report-header {
      margin-bottom: 12px;
    }
    
    .report-icon {
      margin-right: 10px;
    }
    
    .report-title {
      font-size: 15px;
    }
    
    .report-stats {
      margin: 12px 0;
      padding: 10px;
    }
  }

  @media (max-width: 576px) {
    min-height: 320px;
    
    .ant-card-body {
      padding: 14px;
    }
    
    .report-title {
      font-size: 14px;
    }
    
    .report-meta {
      gap: 4px;
    }
  }
`,ne=({report:e,onView:m,onEdit:b,onDownload:y,onDelete:k})=>{const{t:a}=A(["reports","common"]),{currentTheme:j}=I(i=>i.theme);P.useToken();const s=j==="dark",r=i=>({published:{color:s?"#52c41a":"green",text:a("reports:status.published"),icon:"🟢",bgColor:s?"rgba(82, 196, 26, 0.1)":void 0},draft:{color:s?"#faad14":"orange",text:a("reports:status.draft"),icon:"🟡",bgColor:s?"rgba(250, 173, 20, 0.1)":void 0},archived:{color:s?"#8c8c8c":"gray",text:a("reports:status.archived"),icon:"⚪",bgColor:s?"rgba(140, 140, 140, 0.1)":void 0}})[i]||{color:"default",text:i,icon:"⚫",bgColor:void 0},v=i=>({[a("reports:types.health")]:{color:s?"#1890ff":"blue",icon:"📊",bgColor:s?"rgba(24, 144, 255, 0.1)":void 0},[a("reports:types.dependency")]:{color:s?"#722ed1":"purple",icon:"🔗",bgColor:s?"rgba(114, 46, 209, 0.1)":void 0},[a("reports:types.relationship")]:{color:s?"#13c2c2":"cyan",icon:"🕸️",bgColor:s?"rgba(19, 194, 194, 0.1)":void 0},[a("reports:types.performance")]:{color:s?"#faad14":"gold",icon:"⚡",bgColor:s?"rgba(250, 173, 20, 0.1)":void 0}})[i]||{color:"default",icon:"📄",bgColor:void 0},l=r(e.status),t=v(e.type),D=[{key:"view",icon:o.jsx(R,{}),label:a("common:view"),onClick:()=>m(e)},{key:"edit",icon:o.jsx(z,{}),label:a("common:edit"),onClick:()=>b(e)},{key:"download",icon:o.jsx(M,{}),label:a("common:download"),onClick:()=>y(e)},{type:"divider"},{key:"delete",icon:o.jsx(K,{}),label:a("common:delete"),danger:!0,onClick:()=>k(e)}],c=(i,h)=>{switch(h.stopPropagation(),i){case"view":m(e);break;case"edit":b(e);break;case"download":y(e);break;case"delete":k(e);break}};return o.jsxs(ie,{$isDark:s,hoverable:!0,onClick:()=>m(e),actions:[o.jsx(C,{title:a("common:view"),children:o.jsx(d,{type:"text",icon:o.jsx(R,{}),onClick:i=>c("view",i)})},"view"),o.jsx(C,{title:a("common:edit"),children:o.jsx(d,{type:"text",icon:o.jsx(z,{}),onClick:i=>c("edit",i)})},"edit"),o.jsx(C,{title:a("common:download"),children:o.jsx(d,{type:"text",icon:o.jsx(M,{}),onClick:i=>c("download",i)})},"download"),o.jsx(G,{menu:{items:D.map(i=>({...i,onClick:i.onClick?()=>i.onClick():void 0}))},trigger:["click"],children:o.jsx(d,{type:"text",icon:o.jsx(J,{}),onClick:i=>i.stopPropagation()})},"more")],children:[o.jsxs("div",{className:"report-header",children:[o.jsx("div",{className:"report-icon",children:o.jsx(Q,{size:48,icon:o.jsx(p,{}),style:{backgroundColor:t.color==="blue"||t.color==="#1890ff"?"#1890ff":t.color==="purple"||t.color==="#722ed1"?"#722ed1":t.color==="cyan"||t.color==="#13c2c2"?"#13c2c2":t.color==="gold"||t.color==="#faad14"?"#faad14":"#1890ff"}})}),o.jsxs("div",{className:"report-info",children:[o.jsx("div",{className:"report-title",children:e.name}),o.jsxs("div",{className:"report-meta",children:[o.jsx(T,{color:t.color,icon:o.jsx("span",{children:t.icon}),style:t.bgColor?{backgroundColor:t.bgColor,border:`1px solid ${t.color}`,color:t.color}:{},children:e.type}),o.jsx(T,{color:l.color,icon:o.jsx("span",{children:l.icon}),style:l.bgColor?{backgroundColor:l.bgColor,border:`1px solid ${l.color}`,color:l.color}:{},children:l.text})]})]})]}),o.jsx("div",{className:"report-description",children:o.jsx(ae,{ellipsis:{rows:2,tooltip:e.description||a("reports:card.defaultDescription",{type:e.type})},style:{margin:0,fontSize:13,color:s?"#8c8c8c":"#666",lineHeight:"1.5"},children:e.description||a("reports:card.defaultDescription",{type:e.type})})}),o.jsx("div",{className:"report-stats",children:o.jsxs(E,{split:o.jsx("span",{style:{color:s?"#434343":"#d9d9d9"},children:"|"}),size:"small",wrap:!0,children:[o.jsx(f,{title:o.jsx("span",{style:{color:s?"#8c8c8c":"#666",fontSize:11},children:a("reports:card.fileSize")}),value:e.size,valueStyle:{fontSize:13,color:s?"#ffffff":"#262626"}}),o.jsx(f,{title:o.jsx("span",{style:{color:s?"#8c8c8c":"#666",fontSize:11},children:a("reports:card.downloads")}),value:e.downloads,valueStyle:{fontSize:13,color:s?"#ffffff":"#262626"},prefix:o.jsx(W,{style:{color:"#1890ff",fontSize:12}})})]})}),o.jsxs("div",{className:"report-footer",children:[o.jsxs("div",{className:"report-author",children:[o.jsx(Y,{style:{marginRight:4}}),o.jsx("span",{children:e.author})]}),o.jsxs("div",{style:{textAlign:"right"},children:[o.jsxs("div",{style:{fontSize:12,color:s?"#8c8c8c":"#999",marginBottom:2},children:[o.jsx(Z,{style:{marginRight:4}}),a("reports:card.created"),": ",e.createdAt.split(" ")[0]]}),o.jsxs("div",{style:{fontSize:12,color:s?"#8c8c8c":"#999"},children:[o.jsx(q,{style:{marginRight:4}}),a("reports:card.updated"),": ",e.lastModified.split(" ")[0]]})]})]})]})},{Title:le,Paragraph:ce}=N,{RangePicker:ye}=oe,{Option:ke}=re,de=x.div`
  padding: 24px;
  min-height: 100vh;
  background: ${e=>e.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,pe=x.div`
  margin-bottom: 24px;
  padding: 24px;
  background: ${e=>e.$isDark?"#141414":"#ffffff"};
  border-radius: 8px;
  box-shadow: ${e=>e.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  transition: all 0.3s ease;
`,$=x(F)`
  border-radius: 8px;
  box-shadow: ${e=>e.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  background: ${e=>e.$isDark?"#141414":"#ffffff"};
  transition: all 0.3s ease;
  
  .ant-card-body {
    padding: 16px;
  }
  
  .ant-statistic-title {
    color: ${e=>e.$isDark?"#ffffff":"#666666"};
  }
  
  .ant-statistic-content {
    color: ${e=>e.$isDark?"#ffffff":"#262626"};
  }
`;x.div`
  background: ${e=>e.$isDark?"#1f1f1f":"#fafafa"};
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  transition: all 0.3s ease;
  
  .ant-input {
    background: ${e=>e.$isDark?"#000000":"#ffffff"};
    border-color: ${e=>e.$isDark?"#434343":"#d9d9d9"};
    color: ${e=>e.$isDark?"#ffffff":"#000000"};
    
    &:hover {
      border-color: ${e=>e.$isDark?"#177ddc":"#40a9ff"};
    }
    
    &:focus {
      border-color: ${e=>e.$isDark?"#177ddc":"#40a9ff"};
      box-shadow: ${e=>e.$isDark?"0 0 0 2px rgba(23, 125, 220, 0.2)":"0 0 0 2px rgba(24, 144, 255, 0.2)"};
    }
  }
  
  .ant-select {
    .ant-select-selector {
      background: ${e=>e.$isDark?"#000000":"#ffffff"};
      border-color: ${e=>e.$isDark?"#434343":"#d9d9d9"};
      color: ${e=>e.$isDark?"#ffffff":"#000000"};
    }
    
    &:hover .ant-select-selector {
      border-color: ${e=>e.$isDark?"#177ddc":"#40a9ff"};
    }
    
    &.ant-select-focused .ant-select-selector {
      border-color: ${e=>e.$isDark?"#177ddc":"#40a9ff"};
      box-shadow: ${e=>e.$isDark?"0 0 0 2px rgba(23, 125, 220, 0.2)":"0 0 0 2px rgba(24, 144, 255, 0.2)"};
    }
  }
  
  .ant-picker {
    background: ${e=>e.$isDark?"#000000":"#ffffff"};
    border-color: ${e=>e.$isDark?"#434343":"#d9d9d9"};
    color: ${e=>e.$isDark?"#ffffff":"#000000"};
    
    &:hover {
      border-color: ${e=>e.$isDark?"#177ddc":"#40a9ff"};
    }
    
    &.ant-picker-focused {
      border-color: ${e=>e.$isDark?"#177ddc":"#40a9ff"};
      box-shadow: ${e=>e.$isDark?"0 0 0 2px rgba(23, 125, 220, 0.2)":"0 0 0 2px rgba(24, 144, 255, 0.2)"};
    }
  }
`;const fe=x.div`
  .ant-col {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
`,$e=()=>{const[e,m]=u.useState(!1),[b,y]=u.useState(""),[k,a]=u.useState("all"),[j,s]=u.useState("all"),{t:r}=A(["reports","common"]),v=L(),{currentTheme:l}=I(n=>n.theme);P.useToken();const t=l==="dark";u.useEffect(()=>{te(r("report.title"))},[r]);const D={health:{name:r("reports:types.health"),color:"green",icon:o.jsx(p,{})},dependency:{name:r("reports:types.dependency"),color:"blue",icon:o.jsx(p,{})},relationship:{name:r("reports:types.relationship"),color:"orange",icon:o.jsx(p,{})},performance:{name:r("reports:types.performance"),color:"purple",icon:o.jsx(p,{})}},c=[{key:"1",name:"系统健康度分析报告",type:r("reports:types.health"),status:"published",author:"系统管理员",createdAt:"2024-06-15 10:30:00",lastModified:"2024-06-15 14:20:00",size:"2.5MB",downloads:156,description:"全面分析系统健康状况，包括服务可用性、性能指标、错误率等关键指标。通过多维度数据分析，为系统优化提供决策支持。"},{key:"2",name:"平面依赖关系分析报告",type:r("reports:types.dependency"),status:"published",author:"架构师团队",createdAt:"2024-06-10 09:15:00",lastModified:"2024-06-12 16:45:00",size:"3.8MB",downloads:89,description:"深入分析系统各平面之间的依赖关系，识别潜在的架构风险和优化机会。发现2个循环依赖问题需要重点关注。"},{key:"3",name:"性能基准测试报告",type:r("reports:types.performance"),status:"published",author:"性能测试团队",createdAt:"2024-06-08 14:20:00",lastModified:"2024-06-09 11:30:00",size:"4.2MB",downloads:234,description:"全面的系统性能基准测试报告，涵盖负载测试、压力测试、容量测试等多个维度。最大支持10000并发用户。"},{key:"4",name:"安全风险评估报告",type:r("reports:types.security"),status:"draft",author:"安全团队",createdAt:"2024-06-12 16:00:00",lastModified:"2024-06-14 10:15:00",size:"1.8MB",downloads:45,description:"系统安全风险全面评估报告，包括漏洞扫描、渗透测试、代码安全审计等。发现23个安全问题，其中高危2个。"},{key:"5",name:"用户行为分析报告",type:r("reports:types.business"),status:"published",author:"数据分析师",createdAt:"2024-06-05 11:45:00",lastModified:"2024-06-06 09:20:00",size:"2.1MB",downloads:178,description:"基于用户行为数据的深度分析，包括用户画像、行为路径、转化漏斗等。分析了过去3个月的用户行为模式。"},{key:"6",name:"数据库性能优化报告",type:r("reports:types.performance"),status:"published",author:"DBA团队",createdAt:"2024-06-03 15:30:00",lastModified:"2024-06-04 13:15:00",size:"3.2MB",downloads:92,description:"数据库性能深度分析报告，包括慢查询优化、索引建议、存储优化等。识别出15个性能瓶颈点。"},{key:"7",name:"微服务架构评估报告",type:r("reports:types.system"),status:"archived",author:"架构师团队",createdAt:"2024-05-28 10:00:00",lastModified:"2024-05-30 16:30:00",size:"5.1MB",downloads:67,description:"微服务架构的全面评估报告，包括服务拆分合理性、通信效率、治理策略等。涵盖45个微服务的详细分析。"},{key:"8",name:"容器化部署分析报告",type:r("reports:types.system"),status:"published",author:"运维团队",createdAt:"2024-06-01 14:15:00",lastModified:"2024-06-02 10:45:00",size:"2.8MB",downloads:134,description:"容器化部署策略分析报告，包括资源利用率、扩缩容策略、监控告警等。Docker容器数量达到200+。"}],i=n=>{v(`/reports/${n.key}`)},h=n=>{S.info(`编辑报告: ${n.name}`)},O=n=>{S.success(`开始下载: ${n.name}`)},V=n=>{S.warning(`删除报告: ${n.name}`)},H=()=>c.map(n=>o.jsx(g,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:o.jsx(ne,{report:n,onView:i,onEdit:h,onDownload:O,onDelete:V})},n.key));return o.jsxs(de,{$isDark:t,children:[o.jsx(pe,{$isDark:t,children:o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[o.jsxs("div",{children:[o.jsxs(le,{level:2,style:{margin:0,color:t?"#ffffff":"#262626"},children:[r("reports:title"),o.jsx(U,{count:r("common:inDevelopment"),style:{backgroundColor:"#faad14",marginLeft:12,fontSize:12}})]}),o.jsx(ce,{style:{marginTop:8,marginBottom:0,fontSize:16,color:t?"#8c8c8c":"#666666"},children:r("reports:subtitle")})]}),o.jsxs(E,{children:[o.jsx(d,{icon:o.jsx(X,{}),style:{color:t?"#ffffff":void 0,borderColor:t?"#434343":void 0,backgroundColor:t?"transparent":void 0},children:r("reports:batchExport")}),o.jsx(d,{icon:o.jsx(_,{}),style:{color:t?"#ffffff":void 0,borderColor:t?"#434343":void 0,backgroundColor:t?"transparent":void 0},children:r("common:refresh")}),o.jsx(d,{type:"primary",icon:o.jsx(ee,{}),children:r("reports:createTitle")})]})]})}),o.jsxs(B,{gutter:16,style:{marginBottom:24},children:[o.jsx(g,{xs:24,sm:12,md:6,children:o.jsx($,{$isDark:t,children:o.jsx(f,{title:r("reports:stats.totalReports"),value:c.length,suffix:r("common:unit.count"),valueStyle:{color:"#1890ff"},prefix:o.jsx(p,{})})})}),o.jsx(g,{xs:24,sm:12,md:6,children:o.jsx($,{$isDark:t,children:o.jsx(f,{title:r("reports:stats.published"),value:c.filter(n=>n.status==="published").length,suffix:r("common:unit.count"),valueStyle:{color:"#52c41a"},prefix:o.jsx(R,{})})})}),o.jsx(g,{xs:24,sm:12,md:6,children:o.jsx($,{$isDark:t,children:o.jsx(f,{title:r("reports:stats.draft"),value:c.filter(n=>n.status==="draft").length,suffix:r("common:unit.count"),valueStyle:{color:"#faad14"},prefix:o.jsx(z,{})})})}),o.jsx(g,{xs:24,sm:12,md:6,children:o.jsx($,{$isDark:t,children:o.jsx(f,{title:r("reports:stats.totalDownloads"),value:c.reduce((n,w)=>n+w.downloads,0),suffix:r("common:unit.times"),valueStyle:{color:"#722ed1"},prefix:o.jsx(M,{})})})})]}),o.jsx(se,{searchValue:b,onSearchChange:y,searchPlaceholder:r("reports:search.placeholder"),filters:[{key:"type",value:k,onChange:a,placeholder:r("reports:search.type"),width:120,options:[{value:"all",label:r("reports:search.allTypes")},...Object.entries(D).map(([n,w])=>({value:n,label:w.name}))]},{key:"status",value:j,onChange:s,placeholder:r("reports:search.status"),width:100,options:[{value:"all",label:r("reports:search.allStatuses")},{value:"published",label:r("reports:status.published")},{value:"draft",label:r("reports:status.draft")},{value:"archived",label:r("reports:status.archived")}]}],onRefresh:()=>window.location.reload()}),o.jsx(fe,{children:o.jsx(B,{gutter:[16,16],children:H()})})]})};export{$e as default};
