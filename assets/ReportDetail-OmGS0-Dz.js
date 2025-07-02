import{a as W,b as H,u as L,j as t,d as n}from"./index-DWPu_TRF.js";import{r as u,Q as O,X as J,B as p,J as m,K as Q,Y as V,Z as X,_ as Y,$ as Z,h as R,a0 as _,x,C as c,S as d,a1 as G,a as T,V as C,a2 as U,d as f,a3 as tt,a4 as at,a5 as D,j as N,T as rt,O as nt,a6 as et,i as z,a7 as it,a8 as ot,t as M}from"./antd-DnS9M1TX.js";import{s as st}from"./index-Daowydkz.js";import{g as ct}from"./reportService-C3WaqFnT.js";import"./vendor-DJG_os-6.js";const{Title:dt,Paragraph:lt,Text:h}=rt,g=n.div`
  padding: 24px;
  min-height: 100vh;
  background: var(--bg-layout);
`,pt=n(m)`
  margin-bottom: 24px;

  .ant-breadcrumb-link {
    color: var(--text-secondary);
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
  }

  .ant-breadcrumb-separator {
    color: var(--text-tertiary);
  }
`,b=n(z)`
  margin-bottom: 24px;
  border-radius: 8px;
  background: var(--bg-container);
  border: 1px solid var(--border-primary);

  .ant-card-body {
    padding: 24px;
  }

  .ant-card-head {
    background: var(--bg-container);
    border-bottom: 1px solid var(--border-secondary);
  }
`,mt=n.div`
  margin-bottom: 24px;
`,xt=n.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,ut=n(dt)`
  &.ant-typography {
    margin: 0 !important;
    color: var(--text-primary) !important;
    display: flex;
    align-items: center;

    .anticon {
      margin-right: 12px;
      color: var(--primary-color);
    }
  }
`,ht=n(N)`
  flex-shrink: 0;
`,gt=n.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`,$=n.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-secondary);

  .anticon {
    color: var(--text-tertiary);
  }
`,y=n(lt)`
  &.ant-typography {
    color: var(--text-primary) !important;
    font-size: 16px;
    margin-bottom: 16px !important; /* 增加描述底部间距 */
    line-height: 1.6;
  }
`,bt=n(x)`
  margin-top: 24px;
  background: transparent !important;

  /* 移除所有可能的背景色 */
  &.ant-descriptions {
    background: transparent !important;
  }

  .ant-descriptions-view {
    background: transparent !important;
  }

  .ant-descriptions-item-label {
    color: var(--text-secondary);
    font-weight: 500;
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-item-content {
    color: var(--text-primary);
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-item {
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-row {
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-item-container {
    background: transparent !important;
    background-color: transparent !important;
  }

  /* 移除可能的斑马纹效果 */
  .ant-descriptions-row:nth-child(odd) {
    background: transparent !important;
    background-color: transparent !important;
  }

  .ant-descriptions-row:nth-child(even) {
    background: transparent !important;
    background-color: transparent !important;
  }

  /* 移除表格样式的背景 */
  &.ant-descriptions-bordered {
    background: transparent !important;

    .ant-descriptions-item-label,
    .ant-descriptions-item-content {
      background: transparent !important;
      background-color: transparent !important;
    }
  }

  /* 移除所有可能的表格单元格背景 */
  td {
    background: transparent !important;
    background-color: transparent !important;
  }

  th {
    background: transparent !important;
    background-color: transparent !important;
  }
`,l=n(z)`
  text-align: center;
  border-radius: 8px;
  background: var(--bg-container);
  border: 1px solid var(--border-primary);

  .ant-statistic-title {
    color: var(--text-secondary);
  }
`,yt=n(l)`
  .ant-statistic-content .ant-statistic-content-prefix .anticon,
  .ant-statistic-content .ant-statistic-content-value,
  .ant-statistic-content .ant-statistic-content-value-int,
  .ant-statistic-content .ant-statistic-content-suffix {
    color: #1890ff !important;
  }
`,ft=n(l)`
  .ant-statistic-content .ant-statistic-content-prefix .anticon,
  .ant-statistic-content .ant-statistic-content-value,
  .ant-statistic-content .ant-statistic-content-value-int,
  .ant-statistic-content .ant-statistic-content-suffix {
    color: #52c41a !important;
  }
`,vt=n(l)`
  .ant-statistic-content .ant-statistic-content-prefix .anticon,
  .ant-statistic-content .ant-statistic-content-value,
  .ant-statistic-content .ant-statistic-content-value-int,
  .ant-statistic-content .ant-statistic-content-suffix {
    color: #faad14 !important;
  }
`,jt=n(l)`
  .ant-statistic-content .ant-statistic-content-prefix .anticon,
  .ant-statistic-content .ant-statistic-content-value,
  .ant-statistic-content .ant-statistic-content-value-int,
  .ant-statistic-content .ant-statistic-content-suffix {
    color: #722ed1 !important;
  }
`,kt=n.div`
  text-align: center;
  padding: 100px 0;

  .loading-text {
    margin-top: 16px;
    color: var(--text-secondary);
  }
`,wt=n(it)`
  &.ant-alert {
    background: var(--bg-container);
    border: 1px solid var(--border-primary);
  }
`,St=n(ot)`
  margin-top: 24px; /* 增加表格顶部间距 */

  .ant-table {
    background: var(--bg-container);
  }

  .ant-table-thead > tr > th {
    background: var(--table-header-bg);
    border-bottom: 1px solid var(--border-primary);
    color: var(--text-primary);
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid var(--border-secondary);
    color: var(--text-primary);
  }

  .ant-table-tbody > tr:hover > td {
    background: var(--table-row-hover-bg);
  }
`,It=n(D)`
  .ant-timeline-item-content {
    color: var(--text-primary);
  }

  .ant-timeline-item-tail {
    border-left-color: var(--border-primary);
  }

  /* 高优先级 - 红色 */
  &.priority-high .ant-timeline-item-head .anticon {
    color: #ff4d4f !important;
  }

  /* 中优先级 - 橙色 */
  &.priority-medium .ant-timeline-item-head .anticon {
    color: #faad14 !important;
  }

  /* 低优先级 - 绿色 */
  &.priority-low .ant-timeline-item-head .anticon {
    color: #52c41a !important;
  }

  /* 辅助图标颜色 */
  .ant-typography .anticon {
    color: var(--text-tertiary);
  }
`,Rt=n(M)`
  &.status-published {
    color: #52c41a !important;
    background: rgba(82, 196, 26, 0.1) !important;
    border-color: #52c41a !important;
  }

  &.status-draft {
    color: #faad14 !important;
    background: rgba(250, 173, 20, 0.1) !important;
    border-color: #faad14 !important;
  }

  &.status-archived {
    color: #8c8c8c !important;
    background: rgba(140, 140, 140, 0.1) !important;
    border-color: #8c8c8c !important;
  }
`,Tt=n(M)`
  &.priority-high {
    color: #ff4d4f !important;
    background: rgba(255, 77, 79, 0.1) !important;
    border-color: #ff4d4f !important;
  }

  &.priority-medium {
    color: #faad14 !important;
    background: rgba(250, 173, 20, 0.1) !important;
    border-color: #faad14 !important;
  }

  &.priority-low {
    color: #1890ff !important;
    background: rgba(24, 144, 255, 0.1) !important;
    border-color: #1890ff !important;
  }
`,Ct=n.span`
  font-size: 12px;
  margin-left: 8px;
`,$t=n.div`
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 8px;
`,Dt=n(f)`
  margin-bottom: 24px;
`,Nt=n.div`
  .analysis-description {
    margin-bottom: 20px;
    padding-bottom: 4px;
  }

  .analysis-table {
    margin-top: 4px;
  }
`,zt=n(l)`
  /* 良好状态 - 深绿色 */
  &.trend-good {
    .ant-statistic-content .ant-statistic-content-prefix .anticon,
    .ant-statistic-content .ant-statistic-content-value,
    .ant-statistic-content .ant-statistic-content-value-int {
      color: #3f8600 !important;
    }
  }

  /* 警告状态 - 深红色 */
  &.trend-warning,
  &.trend-critical {
    .ant-statistic-content .ant-statistic-content-prefix .anticon,
    .ant-statistic-content .ant-statistic-content-value,
    .ant-statistic-content .ant-statistic-content-value-int {
      color: #cf1322 !important;
    }
  }

  /* 默认状态 - 蓝色 */
  &.trend-default {
    .ant-statistic-content .ant-statistic-content-prefix .anticon,
    .ant-statistic-content .ant-statistic-content-value,
    .ant-statistic-content .ant-statistic-content-value-int {
      color: #1890ff !important;
    }
  }
`,qt=()=>{var S,I;const[P,v]=u.useState(!0),[e,j]=u.useState(null),{id:k}=W(),w=H(),{t:a}=L(["reports","common"]);u.useEffect(()=>{st(a("reports:detail.title")),(async()=>{try{v(!0);const s=await ct(k||"");j(s)}catch(s){console.error("Failed to load report data:",s),j(null)}finally{v(!1)}})()},[a,k]);const B=r=>({published:"status-published",draft:"status-draft",archived:"status-archived"})[r]||"",A=r=>({published:a("reports:status.published"),draft:a("reports:status.draft"),archived:a("reports:status.archived")})[r]||r,F=r=>({healthy:"success",warning:"warning",critical:"error"})[r]||"default",q=r=>({high:"priority-high",medium:"priority-medium",low:"priority-low"})[r]||"",E=[{title:a("reports:detail.service"),dataIndex:"service",key:"service",width:"25%"},{title:a("reports:detail.status"),dataIndex:"status",key:"status",width:"15%",render:r=>t.jsx(O,{status:F(r),text:a(r==="healthy"?"reports:detail.healthy":r==="warning"?"reports:detail.warning":"reports:detail.critical")})},{title:a("reports:detail.responseTime"),dataIndex:"responseTime",key:"responseTime",width:"15%"},{title:a("reports:detail.errorRate"),dataIndex:"errorRate",key:"errorRate",width:"15%"},{title:a("reports:detail.availability"),dataIndex:"availability",key:"availability",width:"15%"},{title:a("reports:detail.requests"),dataIndex:"requests",key:"requests",width:"15%"}];return P?t.jsx(g,{children:t.jsxs(kt,{children:[t.jsx(J,{size:"large"}),t.jsx("div",{className:"loading-text",children:a("reports:detail.loading")})]})}):e?t.jsxs(g,{children:[t.jsxs(pt,{children:[t.jsx(m.Item,{children:t.jsx(Q,{})}),t.jsx(m.Item,{children:t.jsx("span",{onClick:()=>w("/reports"),children:a("reports:title")})}),t.jsx(m.Item,{children:e.name})]}),t.jsxs(b,{children:[t.jsxs(mt,{children:[t.jsxs(xt,{children:[t.jsxs(ut,{level:2,children:[t.jsx(V,{}),e.name]}),t.jsxs(ht,{children:[t.jsx(p,{icon:t.jsx(X,{}),children:a("reports:detail.share")}),t.jsx(p,{icon:t.jsx(Y,{}),children:a("reports:detail.print")}),t.jsx(p,{type:"primary",icon:t.jsx(Z,{}),children:a("reports:detail.download")})]})]}),t.jsxs(gt,{children:[t.jsx(Rt,{className:B(e.status),children:A(e.status)}),t.jsxs($,{children:[t.jsx(R,{}),t.jsx("span",{children:e.author})]}),t.jsxs($,{children:[t.jsx(_,{}),t.jsx("span",{children:e.createdAt})]})]}),t.jsx(y,{children:e.description})]}),t.jsxs(bt,{column:3,children:[t.jsx(x.Item,{label:a("reports:detail.fileSize"),children:e.size}),t.jsx(x.Item,{label:a("reports:detail.downloads"),children:e.downloads}),t.jsx(x.Item,{label:a("reports:detail.lastModified"),children:e.lastModified})]})]}),e.summary&&t.jsxs(Dt,{gutter:[16,16],children:[t.jsx(c,{xs:24,sm:12,md:6,children:t.jsx(yt,{children:t.jsx(d,{title:a("reports:detail.totalServices"),value:e.summary.totalServices,prefix:t.jsx(G,{})})})}),t.jsx(c,{xs:24,sm:12,md:6,children:t.jsx(ft,{children:t.jsx(d,{title:a("reports:detail.healthyServices"),value:e.summary.healthyServices,prefix:t.jsx(T,{})})})}),t.jsx(c,{xs:24,sm:12,md:6,children:t.jsx(vt,{children:t.jsx(d,{title:a("reports:detail.warningServices"),value:e.summary.warningServices,prefix:t.jsx(C,{})})})}),t.jsx(c,{xs:24,sm:12,md:6,children:t.jsx(jt,{children:t.jsx(d,{title:a("reports:detail.overallScore"),value:e.summary.overallScore,suffix:"%",prefix:t.jsx(U,{})})})})]}),(S=e.sections)==null?void 0:S.map((r,s)=>t.jsxs(b,{title:r.titleKey?a(`reports:sections.${r.titleKey}`):r.title,children:[r.type==="analysis"&&r.data?t.jsxs(Nt,{children:[t.jsx("div",{className:"analysis-description",children:t.jsx(y,{children:r.content})}),t.jsx("div",{className:"analysis-table",children:t.jsx(St,{columns:E,dataSource:r.data,pagination:!1,size:"middle"})})]}):t.jsx(y,{children:r.content}),r.type==="trend"&&t.jsx("div",{children:r.metrics&&t.jsx(f,{gutter:[16,16],children:r.metrics.map((i,o)=>t.jsx(c,{xs:24,sm:12,md:6,children:t.jsxs(zt,{size:"small",className:`trend-${i.status==="good"?"good":i.status==="warning"?"warning":i.status==="critical"?"critical":"default"}`,children:[t.jsx(d,{title:i.name,value:i.current,precision:i.name.includes("率")?1:0,prefix:i.trend.startsWith("+")?t.jsx(tt,{}):i.trend.startsWith("-")?t.jsx(at,{}):null,suffix:t.jsxs(Ct,{children:["(",i.trend,")"]})}),t.jsx($t,{children:i.description})]})},o))})})]},s)),((I=e.sections)==null?void 0:I.some(r=>r.type==="recommendations"))&&t.jsx(b,{title:a("reports:detail.recommendations"),children:e.sections.filter(r=>r.type==="recommendations").map((r,s)=>{var i;return t.jsx("div",{children:r.recommendations&&t.jsx(It,{className:`priority-${((i=r.recommendations[0])==null?void 0:i.priority)||"default"}`,children:r.recommendations.map((o,K)=>t.jsx(D.Item,{color:o.priority==="high"?"#ff4d4f":o.priority==="medium"?"#faad14":"#52c41a",dot:o.priority==="high"?t.jsx(C,{}):o.priority==="medium"?t.jsx(et,{}):t.jsx(T,{}),children:t.jsxs("div",{children:[t.jsxs(N,{children:[t.jsx(Tt,{className:q(o.priority),children:o.priority==="high"?a("reports:detail.highPriority"):o.priority==="medium"?a("reports:detail.mediumPriority"):a("reports:detail.lowPriority")}),t.jsx(h,{strong:!0,children:o.item})]}),t.jsx("div",{children:t.jsxs(f,{gutter:[16,8],children:[t.jsx(c,{span:12,children:t.jsxs(h,{type:"secondary",children:[t.jsx(nt,{})," ",a("reports:detail.deadline"),": ",o.deadline]})}),o.assignee&&t.jsx(c,{span:12,children:t.jsxs(h,{type:"secondary",children:[t.jsx(R,{})," ",a("reports:detail.assignee"),": ",o.assignee]})})]})})]})},K))})},s)})})]}):t.jsx(g,{children:t.jsx(wt,{message:a("reports:detail.notFound"),description:a("reports:detail.notFoundDesc"),type:"error",showIcon:!0,action:t.jsx(p,{size:"small",onClick:()=>w("/reports"),children:a("common:back")})})})};export{qt as default};
