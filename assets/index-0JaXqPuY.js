import{u as M,c as A,j as r,d as m,b as q}from"./index-CxXKn8Du.js";import{Y as B,v as S,w as T,a3 as z,ae as G,A as J,$ as h,t as N,T as E,j as F,S as g,aM as K,h as Q,a0 as U,P as W,u as C,B as f,aN as X,aO as Z,i as O,r as p,aP as _,n as ee,o as re,d as I,C as u,al as R,D as oe,l as ae}from"./antd-mjhx-L7S.js";import{s as P}from"./index-Daowydkz.js";import{S as se}from"./SearchFilterBar-BLWQ69gf.js";import{a as te}from"./reportService-DqILwhV_.js";import"./vendor-DJG_os-6.js";const{Text:ke,Paragraph:ie}=E,le=m(O)`
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
`,ne=({report:e,onView:x,onEdit:c,onDownload:$,onDelete:k})=>{const{t:s}=M(["reports","common"]),{currentTheme:y}=A(t=>t.theme);B.useToken();const a=y==="dark",v=t=>({published:{color:a?"#52c41a":"green",text:s("reports:status.published"),icon:"🟢",bgColor:a?"rgba(82, 196, 26, 0.1)":void 0},draft:{color:a?"#faad14":"orange",text:s("reports:status.draft"),icon:"🟡",bgColor:a?"rgba(250, 173, 20, 0.1)":void 0},archived:{color:a?"#8c8c8c":"gray",text:s("reports:status.archived"),icon:"⚪",bgColor:a?"rgba(140, 140, 140, 0.1)":void 0}})[t]||{color:"default",text:t,icon:"⚫",bgColor:void 0},D=t=>({[s("reports:types.health")]:{color:a?"#1890ff":"blue",icon:"📊",bgColor:a?"rgba(24, 144, 255, 0.1)":void 0},[s("reports:types.dependency")]:{color:a?"#722ed1":"purple",icon:"🔗",bgColor:a?"rgba(114, 46, 209, 0.1)":void 0},[s("reports:types.relationship")]:{color:a?"#13c2c2":"cyan",icon:"🕸️",bgColor:a?"rgba(19, 194, 194, 0.1)":void 0},[s("reports:types.performance")]:{color:a?"#faad14":"gold",icon:"⚡",bgColor:a?"rgba(250, 173, 20, 0.1)":void 0}})[t]||{color:"default",icon:"📄",bgColor:void 0},o=v(e.status),l=D(e.type),w=[{key:"view",icon:r.jsx(S,{}),label:s("common:view"),onClick:()=>x(e)},{key:"edit",icon:r.jsx(T,{}),label:s("common:edit"),onClick:()=>c(e)},{key:"download",icon:r.jsx(z,{}),label:s("common:download"),onClick:()=>$(e)},{type:"divider"},{key:"delete",icon:r.jsx(G,{}),label:s("common:delete"),danger:!0,onClick:()=>k(e)}],n=(t,b)=>{switch(b.stopPropagation(),t){case"view":x(e);break;case"edit":c(e);break;case"download":$(e);break;case"delete":k(e);break}};return r.jsxs(le,{$isDark:a,hoverable:!0,onClick:()=>x(e),actions:[r.jsx(C,{title:s("common:view"),children:r.jsx(f,{type:"text",icon:r.jsx(S,{}),onClick:t=>n("view",t)})},"view"),r.jsx(C,{title:s("common:edit"),children:r.jsx(f,{type:"text",icon:r.jsx(T,{}),onClick:t=>n("edit",t)})},"edit"),r.jsx(C,{title:s("common:download"),children:r.jsx(f,{type:"text",icon:r.jsx(z,{}),onClick:t=>n("download",t)})},"download"),r.jsx(X,{menu:{items:w.map(t=>({...t,onClick:t.onClick?()=>t.onClick():void 0}))},trigger:["click"],children:r.jsx(f,{type:"text",icon:r.jsx(Z,{}),onClick:t=>t.stopPropagation()})},"more")],children:[r.jsxs("div",{className:"report-header",children:[r.jsx("div",{className:"report-icon",children:r.jsx(J,{size:48,icon:r.jsx(h,{}),style:{backgroundColor:l.color==="blue"||l.color==="#1890ff"?"#1890ff":l.color==="purple"||l.color==="#722ed1"?"#722ed1":l.color==="cyan"||l.color==="#13c2c2"?"#13c2c2":l.color==="gold"||l.color==="#faad14"?"#faad14":"#1890ff"}})}),r.jsxs("div",{className:"report-info",children:[r.jsx("div",{className:"report-title",children:e.name}),r.jsxs("div",{className:"report-meta",children:[r.jsx(N,{color:l.color,icon:r.jsx("span",{children:l.icon}),style:l.bgColor?{backgroundColor:l.bgColor,border:`1px solid ${l.color}`,color:l.color}:{},children:e.type}),r.jsx(N,{color:o.color,icon:r.jsx("span",{children:o.icon}),style:o.bgColor?{backgroundColor:o.bgColor,border:`1px solid ${o.color}`,color:o.color}:{},children:o.text})]})]})]}),r.jsx("div",{className:"report-description",children:r.jsx(ie,{ellipsis:{rows:2,tooltip:e.description||s("reports:card.defaultDescription",{type:e.type})},style:{margin:0,fontSize:13,color:a?"#8c8c8c":"#666",lineHeight:"1.5"},children:e.description||s("reports:card.defaultDescription",{type:e.type})})}),r.jsx("div",{className:"report-stats",children:r.jsxs(F,{split:r.jsx("span",{style:{color:a?"#434343":"#d9d9d9"},children:"|"}),size:"small",wrap:!0,children:[r.jsx(g,{title:r.jsx("span",{style:{color:a?"#8c8c8c":"#666",fontSize:11},children:s("reports:card.fileSize")}),value:e.size,valueStyle:{fontSize:13,color:a?"#ffffff":"#262626"}}),r.jsx(g,{title:r.jsx("span",{style:{color:a?"#8c8c8c":"#666",fontSize:11},children:s("reports:card.downloads")}),value:e.downloads,valueStyle:{fontSize:13,color:a?"#ffffff":"#262626"},prefix:r.jsx(K,{style:{color:"#1890ff",fontSize:12}})})]})}),r.jsxs("div",{className:"report-footer",children:[r.jsxs("div",{className:"report-author",children:[r.jsx(Q,{style:{marginRight:4}}),r.jsx("span",{children:e.author})]}),r.jsxs("div",{style:{textAlign:"right"},children:[r.jsxs("div",{style:{fontSize:12,color:a?"#8c8c8c":"#999",marginBottom:2},children:[r.jsx(U,{style:{marginRight:4}}),s("reports:card.created"),": ",e.createdAt.split(" ")[0]]}),r.jsxs("div",{style:{fontSize:12,color:a?"#8c8c8c":"#999"},children:[r.jsx(W,{style:{marginRight:4}}),s("reports:card.updated"),": ",e.lastModified.split(" ")[0]]})]})]})]})},{Title:ce,Paragraph:de}=E,{RangePicker:je}=oe,{Option:ye}=ae,pe=m.div`
  padding: 24px;
  min-height: 100vh;
  background: ${e=>e.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,fe=m.div`
  margin-bottom: 24px;
  padding: 24px;
  background: ${e=>e.$isDark?"#141414":"#ffffff"};
  border-radius: 8px;
  box-shadow: ${e=>e.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  transition: all 0.3s ease;
`,j=m(O)`
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
`;m.div`
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
`;const xe=m.div`
  .ant-col {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
`,ve=()=>{const[e,x]=p.useState(!1),[c,$]=p.useState([]),[k,s]=p.useState(""),[y,a]=p.useState("all"),[v,D]=p.useState("all"),{t:o}=M(["reports","common"]),l=q(),{currentTheme:w}=A(i=>i.theme);B.useToken();const n=w==="dark";p.useEffect(()=>{P(o("reports:title")),(async()=>{try{x(!0);const d=await te();$(d)}catch(d){console.error("Failed to load reports:",d)}finally{x(!1)}})()},[o]),p.useEffect(()=>{P(o("report.title"))},[o]);const t={health:{name:o("reports:types.health"),color:"green",icon:r.jsx(h,{})},dependency:{name:o("reports:types.dependency"),color:"blue",icon:r.jsx(h,{})},relationship:{name:o("reports:types.relationship"),color:"orange",icon:r.jsx(h,{})},performance:{name:o("reports:types.performance"),color:"purple",icon:r.jsx(h,{})}},b=i=>{l(`/reports/${i.id}`)},H=i=>{R.info(`编辑报告: ${i.name}`)},V=i=>{R.success(`开始下载: ${i.name}`)},Y=i=>{R.warning(`删除报告: ${i.name}`)},L=()=>c.map(i=>r.jsx(u,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:r.jsx(ne,{report:i,onView:b,onEdit:H,onDownload:V,onDelete:Y})},i.id));return r.jsxs(pe,{$isDark:n,className:"report-management-page",children:[r.jsxs(fe,{$isDark:n,children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[r.jsx(ce,{level:2,style:{margin:0},children:o("reports:title")}),r.jsxs(F,{children:[r.jsx(f,{icon:r.jsx(_,{}),children:o("reports:batchExport")}),r.jsx(f,{icon:r.jsx(ee,{}),children:o("common:refresh")}),r.jsx(f,{type:"primary",icon:r.jsx(re,{}),children:o("reports:createTitle")})]})]}),r.jsx(de,{style:{marginTop:0,marginBottom:0},children:o("reports:subtitle")})]}),r.jsxs(I,{gutter:16,style:{marginBottom:24},children:[r.jsx(u,{xs:24,sm:12,md:6,children:r.jsx(j,{$isDark:n,className:"report-stats-primary",children:r.jsx(g,{title:o("reports:stats.totalReports"),value:c.length,prefix:r.jsx(h,{})})})}),r.jsx(u,{xs:24,sm:12,md:6,children:r.jsx(j,{$isDark:n,className:"report-stats-success",children:r.jsx(g,{title:o("reports:stats.published"),value:c.filter(i=>i.status==="published").length,prefix:r.jsx(S,{})})})}),r.jsx(u,{xs:24,sm:12,md:6,children:r.jsx(j,{$isDark:n,className:"report-stats-warning",children:r.jsx(g,{title:o("reports:stats.draft"),value:c.filter(i=>i.status==="draft").length,prefix:r.jsx(T,{})})})}),r.jsx(u,{xs:24,sm:12,md:6,children:r.jsx(j,{$isDark:n,className:"report-stats-purple",children:r.jsx(g,{title:o("reports:stats.totalDownloads"),value:c.reduce((i,d)=>i+d.downloads,0),prefix:r.jsx(z,{})})})})]}),r.jsx(se,{searchValue:k,onSearchChange:s,searchPlaceholder:o("reports:search.placeholder"),filters:[{key:"type",value:y,onChange:a,placeholder:o("reports:search.type"),width:120,options:[{value:"all",label:o("reports:search.allTypes")},...Object.entries(t).map(([i,d])=>({value:i,label:d.name}))]},{key:"status",value:v,onChange:D,placeholder:o("reports:search.status"),width:100,options:[{value:"all",label:o("reports:search.allStatuses")},{value:"published",label:o("reports:status.published")},{value:"draft",label:o("reports:status.draft")},{value:"archived",label:o("reports:status.archived")}]}],onRefresh:()=>window.location.reload()}),r.jsx(xe,{children:r.jsx(I,{gutter:[16,16],children:L()})})]})};export{ve as default};
