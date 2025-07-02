import{u as M,c as A,j as r,d as u,b as G}from"./index-DWPu_TRF.js";import{v as S,w as T,$ as z,ab as J,A as L,Y as h,t as I,T as B,j as E,S as g,aG as q,h as K,a0 as Q,O as U,u as C,B as f,aH as W,aI as X,i as F,r as p,aj as Z,aJ as _,n as ee,o as re,d as N,C as b,ai as R,D as oe,l as te}from"./antd-DnS9M1TX.js";import{s as P}from"./index-Daowydkz.js";import{S as ae}from"./SearchFilterBar-CUZKkW-k.js";import{a as se}from"./reportService-C3WaqFnT.js";import"./vendor-DJG_os-6.js";const{Paragraph:ie}=B,le=u(F)`
  height: 100%;
  min-height: 380px;
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
      border-right: none !important;
      border-left: none !important;

      &:not(:last-child) {
        border-right: none !important;
      }

      &::after {
        display: none !important;
      }
    }

    /* 移除所有可能的分割线 */
    li + li {
      border-left: none !important;
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
`,ne=({report:e,onView:x,onEdit:c,onDownload:$,onDelete:k})=>{const{t:a}=M(["reports","common"]),{currentTheme:y}=A(s=>s.theme),t=y==="dark",v=s=>({published:{color:t?"#52c41a":"green",text:a("reports:status.published"),icon:"🟢",bgColor:t?"rgba(82, 196, 26, 0.1)":void 0},draft:{color:t?"#faad14":"orange",text:a("reports:status.draft"),icon:"🟡",bgColor:t?"rgba(250, 173, 20, 0.1)":void 0},archived:{color:t?"#8c8c8c":"gray",text:a("reports:status.archived"),icon:"⚪",bgColor:t?"rgba(140, 140, 140, 0.1)":void 0}})[s]||{color:"default",text:s,icon:"⚫",bgColor:void 0},D=s=>({[a("reports:types.health")]:{color:t?"#1890ff":"blue",icon:"📊",bgColor:t?"rgba(24, 144, 255, 0.1)":void 0},[a("reports:types.dependency")]:{color:t?"#722ed1":"purple",icon:"🔗",bgColor:t?"rgba(114, 46, 209, 0.1)":void 0},[a("reports:types.relationship")]:{color:t?"#13c2c2":"cyan",icon:"🕸️",bgColor:t?"rgba(19, 194, 194, 0.1)":void 0},[a("reports:types.performance")]:{color:t?"#faad14":"gold",icon:"⚡",bgColor:t?"rgba(250, 173, 20, 0.1)":void 0}})[s]||{color:"default",icon:"📄",bgColor:void 0},o=v(e.status),l=D(e.type),w=[{key:"view",icon:r.jsx(S,{}),label:a("common:view"),onClick:()=>x(e)},{key:"edit",icon:r.jsx(T,{}),label:a("common:edit"),onClick:()=>c(e)},{key:"download",icon:r.jsx(z,{}),label:a("common:download"),onClick:()=>$(e)},{type:"divider"},{key:"delete",icon:r.jsx(J,{}),label:a("common:delete"),danger:!0,onClick:()=>k(e)}],n=(s,m)=>{switch(m.stopPropagation(),s){case"view":x(e);break;case"edit":c(e);break;case"download":$(e);break;case"delete":k(e);break}};return r.jsxs(le,{$isDark:t,hoverable:!0,onClick:()=>x(e),actions:[r.jsx(C,{title:a("common:view"),children:r.jsx(f,{type:"text",icon:r.jsx(S,{}),onClick:s=>n("view",s)})},"view"),r.jsx(C,{title:a("common:edit"),children:r.jsx(f,{type:"text",icon:r.jsx(T,{}),onClick:s=>n("edit",s)})},"edit"),r.jsx(C,{title:a("common:download"),children:r.jsx(f,{type:"text",icon:r.jsx(z,{}),onClick:s=>n("download",s)})},"download"),r.jsx(W,{menu:{items:w.map(s=>({...s,onClick:s.onClick?()=>s.onClick():void 0}))},trigger:["click"],children:r.jsx(f,{type:"text",icon:r.jsx(X,{}),onClick:s=>s.stopPropagation()})},"more")],children:[r.jsxs("div",{className:"report-header",children:[r.jsx("div",{className:"report-icon",children:r.jsx(L,{size:48,icon:r.jsx(h,{}),style:{backgroundColor:l.color==="blue"||l.color==="#1890ff"?"#1890ff":l.color==="purple"||l.color==="#722ed1"?"#722ed1":l.color==="cyan"||l.color==="#13c2c2"?"#13c2c2":l.color==="gold"||l.color==="#faad14"?"#faad14":"#1890ff"}})}),r.jsxs("div",{className:"report-info",children:[r.jsx("div",{className:"report-title",children:e.name}),r.jsxs("div",{className:"report-meta",children:[r.jsx(I,{color:l.color,icon:r.jsx("span",{children:l.icon}),style:l.bgColor?{backgroundColor:l.bgColor,border:`1px solid ${l.color}`,color:l.color}:{},children:e.type}),r.jsx(I,{color:o.color,icon:r.jsx("span",{children:o.icon}),style:o.bgColor?{backgroundColor:o.bgColor,border:`1px solid ${o.color}`,color:o.color}:{},children:o.text})]})]})]}),r.jsx("div",{className:"report-description",children:r.jsx(ie,{ellipsis:{rows:2,tooltip:e.description||a("reports:card.defaultDescription",{type:e.type})},style:{margin:0,fontSize:13,color:t?"#8c8c8c":"#666",lineHeight:"1.5"},children:e.description||a("reports:card.defaultDescription",{type:e.type})})}),r.jsx("div",{className:"report-stats",children:r.jsxs(E,{split:r.jsx("span",{style:{color:t?"#434343":"#d9d9d9"},children:"|"}),size:"small",wrap:!0,children:[r.jsx(g,{title:r.jsx("span",{style:{color:t?"#8c8c8c":"#666",fontSize:11},children:a("reports:card.fileSize")}),value:e.size,valueStyle:{fontSize:13,color:t?"#ffffff":"#262626"}}),r.jsx(g,{title:r.jsx("span",{style:{color:t?"#8c8c8c":"#666",fontSize:11},children:a("reports:card.downloads")}),value:e.downloads,valueStyle:{fontSize:13,color:t?"#ffffff":"#262626"},prefix:r.jsx(q,{style:{color:"#1890ff",fontSize:12}})})]})}),r.jsxs("div",{className:"report-footer",children:[r.jsxs("div",{className:"report-author",children:[r.jsx(K,{style:{marginRight:4}}),r.jsx("span",{children:e.author})]}),r.jsxs("div",{style:{textAlign:"right"},children:[r.jsxs("div",{style:{fontSize:12,color:t?"#8c8c8c":"#999",marginBottom:2},children:[r.jsx(Q,{style:{marginRight:4}}),a("reports:card.created"),": ",e.createdAt.split(" ")[0]]}),r.jsxs("div",{style:{fontSize:12,color:t?"#8c8c8c":"#999"},children:[r.jsx(U,{style:{marginRight:4}}),a("reports:card.updated"),": ",e.lastModified.split(" ")[0]]})]})]})]})},{Title:ce,Paragraph:de}=B,{RangePicker:$e}=oe,{Option:ke}=te,pe=u.div`
  padding: 24px;
  min-height: 100vh;
  background: ${e=>e.$isDark?"#000000":"#f5f5f5"};
`,j=u(F)`
  border-radius: 8px;
  box-shadow: ${e=>e.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  background: ${e=>e.$isDark?"#141414":"#ffffff"};

  .ant-card-body {
    padding: 16px;
  }

  .ant-statistic-title {
    color: ${e=>e.$isDark?"#ffffff":"#666666"};
  }

  .ant-statistic-content {
    color: ${e=>e.$isDark?"#ffffff":"#262626"};
  }
`;u.div`
  background: ${e=>e.$isDark?"#1f1f1f":"#fafafa"};
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: ${e=>e.$isDark?"1px solid #303030":"1px solid #f0f0f0"};

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
`;const fe=u.div`
  .ant-col {
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    .ant-col {
      margin-bottom: 12px;
    }
  }
`,je=()=>{const[e,x]=p.useState(!1),[c,$]=p.useState([]),[k,a]=p.useState(""),[y,t]=p.useState("all"),[v,D]=p.useState("all"),{t:o}=M(["reports","common"]),l=G(),{currentTheme:w}=A(i=>i.theme);Z.useToken();const n=w==="dark";p.useEffect(()=>{P(o("reports:title")),(async()=>{try{x(!0);const d=await se();$(d)}catch(d){console.error("Failed to load reports:",d)}finally{x(!1)}})()},[o]),p.useEffect(()=>{P(o("report.title"))},[o]);const s={health:{name:o("reports:types.health"),color:"green",icon:r.jsx(h,{})},dependency:{name:o("reports:types.dependency"),color:"blue",icon:r.jsx(h,{})},relationship:{name:o("reports:types.relationship"),color:"orange",icon:r.jsx(h,{})},performance:{name:o("reports:types.performance"),color:"purple",icon:r.jsx(h,{})}},m=i=>{l(`/reports/${i.id}`)},O=i=>{R.info(`编辑报告: ${i.name}`)},H=i=>{R.success(`开始下载: ${i.name}`)},V=i=>{R.warning(`删除报告: ${i.name}`)},Y=()=>c.map(i=>r.jsx(b,{xs:24,sm:24,md:12,lg:12,xl:8,xxl:6,children:r.jsx(ne,{report:i,onView:m,onEdit:O,onDownload:H,onDelete:V})},i.id));return r.jsxs(pe,{$isDark:n,className:"report-management-page",children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[r.jsx(ce,{level:2,style:{margin:0},children:o("reports:title")}),r.jsxs(E,{children:[r.jsx(f,{icon:r.jsx(_,{}),children:o("reports:batchExport")}),r.jsx(f,{icon:r.jsx(ee,{}),children:o("common:refresh")}),r.jsx(f,{type:"primary",icon:r.jsx(re,{}),children:o("reports:createTitle")})]})]}),r.jsx(de,{style:{marginTop:0,marginBottom:24},children:o("reports:subtitle")}),r.jsxs(N,{gutter:16,style:{marginBottom:24},children:[r.jsx(b,{xs:24,sm:12,md:6,children:r.jsx(j,{$isDark:n,className:"report-stats-primary",children:r.jsx(g,{title:o("reports:stats.totalReports"),value:c.length,prefix:r.jsx(h,{})})})}),r.jsx(b,{xs:24,sm:12,md:6,children:r.jsx(j,{$isDark:n,className:"report-stats-success",children:r.jsx(g,{title:o("reports:stats.published"),value:c.filter(i=>i.status==="published").length,prefix:r.jsx(S,{})})})}),r.jsx(b,{xs:24,sm:12,md:6,children:r.jsx(j,{$isDark:n,className:"report-stats-warning",children:r.jsx(g,{title:o("reports:stats.draft"),value:c.filter(i=>i.status==="draft").length,prefix:r.jsx(T,{})})})}),r.jsx(b,{xs:24,sm:12,md:6,children:r.jsx(j,{$isDark:n,className:"report-stats-purple",children:r.jsx(g,{title:o("reports:stats.totalDownloads"),value:c.reduce((i,d)=>i+d.downloads,0),prefix:r.jsx(z,{})})})})]}),r.jsx(ae,{searchValue:k,onSearchChange:a,searchPlaceholder:o("reports:search.placeholder"),filters:[{key:"type",value:y,onChange:t,placeholder:o("reports:search.type"),width:120,options:[{value:"all",label:o("reports:search.allTypes")},...Object.entries(s).map(([i,d])=>({value:i,label:d.name}))]},{key:"status",value:v,onChange:D,placeholder:o("reports:search.status"),width:100,options:[{value:"all",label:o("reports:search.allStatuses")},{value:"published",label:o("reports:status.published")},{value:"draft",label:o("reports:status.draft")},{value:"archived",label:o("reports:status.archived")}]}],onRefresh:()=>window.location.reload()}),r.jsx(fe,{children:r.jsx(N,{gutter:[16,16],children:Y()})})]})};export{je as default};
