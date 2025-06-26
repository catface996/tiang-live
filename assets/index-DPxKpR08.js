import{u as M,c as A,j as o,d as m,b as Y}from"./index-i3_CIisb.js";import{Z as B,w as R,x as T,a4 as z,ad as Z,A as _,a0 as h,u as I,T as E,k as F,S as g,aR as q,i as G,a1 as J,U as K,v as w,B as p,aS as Q,aT as W,j as H,r as f,_ as X,aU as ee,o as oe,p as re,d as P,C as b,ak as S,D as ae,m as te}from"./antd-C0IAgzs2.js";import{s as N}from"./index-Daowydkz.js";import{S as se}from"./SearchFilterBar-BpyDeV8A.js";import{a as ie}from"./reportService-DqILwhV_.js";import"./vendor-DJG_os-6.js";const{Text:je,Paragraph:le}=E,ne=m(H)`
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
`,ce=({report:e,onView:x,onEdit:c,onDownload:$,onDelete:k})=>{const{t}=M(["reports","common"]),{currentTheme:y}=A(i=>i.theme);B.useToken();const a=y==="dark",v=i=>({published:{color:a?"#52c41a":"green",text:t("reports:status.published"),icon:"🟢",bgColor:a?"rgba(82, 196, 26, 0.1)":void 0},draft:{color:a?"#faad14":"orange",text:t("reports:status.draft"),icon:"🟡",bgColor:a?"rgba(250, 173, 20, 0.1)":void 0},archived:{color:a?"#8c8c8c":"gray",text:t("reports:status.archived"),icon:"⚪",bgColor:a?"rgba(140, 140, 140, 0.1)":void 0}})[i]||{color:"default",text:i,icon:"⚫",bgColor:void 0},D=i=>({[t("reports:types.health")]:{color:a?"#1890ff":"blue",icon:"📊",bgColor:a?"rgba(24, 144, 255, 0.1)":void 0},[t("reports:types.dependency")]:{color:a?"#722ed1":"purple",icon:"🔗",bgColor:a?"rgba(114, 46, 209, 0.1)":void 0},[t("reports:types.relationship")]:{color:a?"#13c2c2":"cyan",icon:"🕸️",bgColor:a?"rgba(19, 194, 194, 0.1)":void 0},[t("reports:types.performance")]:{color:a?"#faad14":"gold",icon:"⚡",bgColor:a?"rgba(250, 173, 20, 0.1)":void 0}})[i]||{color:"default",icon:"📄",bgColor:void 0},r=v(e.status),n=D(e.type),C=[{key:"view",icon:o.jsx(R,{}),label:t("common:view"),onClick:()=>x(e)},{key:"edit",icon:o.jsx(T,{}),label:t("common:edit"),onClick:()=>c(e)},{key:"download",icon:o.jsx(z,{}),label:t("common:download"),onClick:()=>$(e)},{type:"divider"},{key:"delete",icon:o.jsx(Z,{}),label:t("common:delete"),danger:!0,onClick:()=>k(e)}],s=(i,u)=>{switch(u.stopPropagation(),i){case"view":x(e);break;case"edit":c(e);break;case"download":$(e);break;case"delete":k(e);break}};return o.jsxs(ne,{$isDark:a,hoverable:!0,onClick:()=>x(e),actions:[o.jsx(w,{title:t("common:view"),children:o.jsx(p,{type:"text",icon:o.jsx(R,{}),onClick:i=>s("view",i)})},"view"),o.jsx(w,{title:t("common:edit"),children:o.jsx(p,{type:"text",icon:o.jsx(T,{}),onClick:i=>s("edit",i)})},"edit"),o.jsx(w,{title:t("common:download"),children:o.jsx(p,{type:"text",icon:o.jsx(z,{}),onClick:i=>s("download",i)})},"download"),o.jsx(Q,{menu:{items:C.map(i=>({...i,onClick:i.onClick?()=>i.onClick():void 0}))},trigger:["click"],children:o.jsx(p,{type:"text",icon:o.jsx(W,{}),onClick:i=>i.stopPropagation()})},"more")],children:[o.jsxs("div",{className:"report-header",children:[o.jsx("div",{className:"report-icon",children:o.jsx(_,{size:48,icon:o.jsx(h,{}),style:{backgroundColor:n.color==="blue"||n.color==="#1890ff"?"#1890ff":n.color==="purple"||n.color==="#722ed1"?"#722ed1":n.color==="cyan"||n.color==="#13c2c2"?"#13c2c2":n.color==="gold"||n.color==="#faad14"?"#faad14":"#1890ff"}})}),o.jsxs("div",{className:"report-info",children:[o.jsx("div",{className:"report-title",children:e.name}),o.jsxs("div",{className:"report-meta",children:[o.jsx(I,{color:n.color,icon:o.jsx("span",{children:n.icon}),style:n.bgColor?{backgroundColor:n.bgColor,border:`1px solid ${n.color}`,color:n.color}:{},children:e.type}),o.jsx(I,{color:r.color,icon:o.jsx("span",{children:r.icon}),style:r.bgColor?{backgroundColor:r.bgColor,border:`1px solid ${r.color}`,color:r.color}:{},children:r.text})]})]})]}),o.jsx("div",{className:"report-description",children:o.jsx(le,{ellipsis:{rows:2,tooltip:e.description||t("reports:card.defaultDescription",{type:e.type})},style:{margin:0,fontSize:13,color:a?"#8c8c8c":"#666",lineHeight:"1.5"},children:e.description||t("reports:card.defaultDescription",{type:e.type})})}),o.jsx("div",{className:"report-stats",children:o.jsxs(F,{split:o.jsx("span",{style:{color:a?"#434343":"#d9d9d9"},children:"|"}),size:"small",wrap:!0,children:[o.jsx(g,{title:o.jsx("span",{style:{color:a?"#8c8c8c":"#666",fontSize:11},children:t("reports:card.fileSize")}),value:e.size,valueStyle:{fontSize:13,color:a?"#ffffff":"#262626"}}),o.jsx(g,{title:o.jsx("span",{style:{color:a?"#8c8c8c":"#666",fontSize:11},children:t("reports:card.downloads")}),value:e.downloads,valueStyle:{fontSize:13,color:a?"#ffffff":"#262626"},prefix:o.jsx(q,{style:{color:"#1890ff",fontSize:12}})})]})}),o.jsxs("div",{className:"report-footer",children:[o.jsxs("div",{className:"report-author",children:[o.jsx(G,{style:{marginRight:4}}),o.jsx("span",{children:e.author})]}),o.jsxs("div",{style:{textAlign:"right"},children:[o.jsxs("div",{style:{fontSize:12,color:a?"#8c8c8c":"#999",marginBottom:2},children:[o.jsx(J,{style:{marginRight:4}}),t("reports:card.created"),": ",e.createdAt.split(" ")[0]]}),o.jsxs("div",{style:{fontSize:12,color:a?"#8c8c8c":"#999"},children:[o.jsx(K,{style:{marginRight:4}}),t("reports:card.updated"),": ",e.lastModified.split(" ")[0]]})]})]})]})},{Title:de,Paragraph:fe}=E,{RangePicker:ye}=ae,{Option:ve}=te,pe=m.div`
  padding: 24px;
  min-height: 100vh;
  background: ${e=>e.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,xe=m.div`
  margin-bottom: 24px;
  padding: 24px;
  background: ${e=>e.$isDark?"#141414":"#ffffff"};
  border-radius: 8px;
  box-shadow: ${e=>e.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  transition: all 0.3s ease;
`,j=m(H)`
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
`;const he=m.div`
  .ant-col {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
`,De=()=>{const[e,x]=f.useState(!1),[c,$]=f.useState([]),[k,t]=f.useState(""),[y,a]=f.useState("all"),[v,D]=f.useState("all"),{t:r}=M(["reports","common"]),n=Y(),{currentTheme:C}=A(l=>l.theme);B.useToken();const s=C==="dark";f.useEffect(()=>{N(r("reports:title")),(async()=>{try{x(!0);const d=await ie();$(d)}catch(d){console.error("Failed to load reports:",d)}finally{x(!1)}})()},[r]),f.useEffect(()=>{N(r("report.title"))},[r]);const i={health:{name:r("reports:types.health"),color:"green",icon:o.jsx(h,{})},dependency:{name:r("reports:types.dependency"),color:"blue",icon:o.jsx(h,{})},relationship:{name:r("reports:types.relationship"),color:"orange",icon:o.jsx(h,{})},performance:{name:r("reports:types.performance"),color:"purple",icon:o.jsx(h,{})}},u=l=>{n(`/reports/${l.id}`)},L=l=>{S.info(`编辑报告: ${l.name}`)},O=l=>{S.success(`开始下载: ${l.name}`)},U=l=>{S.warning(`删除报告: ${l.name}`)},V=()=>c.map(l=>o.jsx(b,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:o.jsx(ce,{report:l,onView:u,onEdit:L,onDownload:O,onDelete:U})},l.id));return o.jsxs(pe,{$isDark:s,children:[o.jsx(xe,{$isDark:s,children:o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[o.jsxs("div",{children:[o.jsxs(de,{level:2,style:{margin:0,color:s?"#ffffff":"#262626"},children:[r("reports:title"),o.jsx(X,{count:r("common:inDevelopment"),style:{backgroundColor:"#faad14",marginLeft:12,fontSize:12}})]}),o.jsx(fe,{style:{marginTop:8,marginBottom:0,fontSize:16,color:s?"#8c8c8c":"#666666"},children:r("reports:subtitle")})]}),o.jsxs(F,{children:[o.jsx(p,{icon:o.jsx(ee,{}),style:{color:s?"#ffffff":void 0,borderColor:s?"#434343":void 0,backgroundColor:s?"transparent":void 0},children:r("reports:batchExport")}),o.jsx(p,{icon:o.jsx(oe,{}),style:{color:s?"#ffffff":void 0,borderColor:s?"#434343":void 0,backgroundColor:s?"transparent":void 0},children:r("common:refresh")}),o.jsx(p,{type:"primary",icon:o.jsx(re,{}),children:r("reports:createTitle")})]})]})}),o.jsxs(P,{gutter:16,style:{marginBottom:24},children:[o.jsx(b,{xs:24,sm:12,md:6,children:o.jsx(j,{$isDark:s,children:o.jsx(g,{title:r("reports:stats.totalReports"),value:c.length,suffix:r("common:unit.count"),valueStyle:{color:"#1890ff"},prefix:o.jsx(h,{})})})}),o.jsx(b,{xs:24,sm:12,md:6,children:o.jsx(j,{$isDark:s,children:o.jsx(g,{title:r("reports:stats.published"),value:c.filter(l=>l.status==="published").length,suffix:r("common:unit.count"),valueStyle:{color:"#52c41a"},prefix:o.jsx(R,{})})})}),o.jsx(b,{xs:24,sm:12,md:6,children:o.jsx(j,{$isDark:s,children:o.jsx(g,{title:r("reports:stats.draft"),value:c.filter(l=>l.status==="draft").length,suffix:r("common:unit.count"),valueStyle:{color:"#faad14"},prefix:o.jsx(T,{})})})}),o.jsx(b,{xs:24,sm:12,md:6,children:o.jsx(j,{$isDark:s,children:o.jsx(g,{title:r("reports:stats.totalDownloads"),value:c.reduce((l,d)=>l+d.downloads,0),suffix:r("common:unit.times"),valueStyle:{color:"#722ed1"},prefix:o.jsx(z,{})})})})]}),o.jsx(se,{searchValue:k,onSearchChange:t,searchPlaceholder:r("reports:search.placeholder"),filters:[{key:"type",value:y,onChange:a,placeholder:r("reports:search.type"),width:120,options:[{value:"all",label:r("reports:search.allTypes")},...Object.entries(i).map(([l,d])=>({value:l,label:d.name}))]},{key:"status",value:v,onChange:D,placeholder:r("reports:search.status"),width:100,options:[{value:"all",label:r("reports:search.allStatuses")},{value:"published",label:r("reports:status.published")},{value:"draft",label:r("reports:status.draft")},{value:"archived",label:r("reports:status.archived")}]}],onRefresh:()=>window.location.reload()}),o.jsx(he,{children:o.jsx(P,{gutter:[16,16],children:V()})})]})};export{De as default};
