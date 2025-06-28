import{u as S,j as e,d as h,c as q,b as ee,e as se,s as F,f as te,h as M,i as ne,k as ae,l as re}from"./index-CxXKn8Du.js";import{t as L,u as v,a as z,W as T,b1 as K,aF as ie,T as A,ap as le,j as D,B as P,v as oe,w as de,o as Z,U as ce,i as R,b2 as J,a8 as pe,Z as xe,aq as V,e as fe,ah as Q,d as X,C as U,S as he,Y as me,a6 as ge,r as ue,al as B,n as ye}from"./antd-mjhx-L7S.js";import{s as je}from"./index-Daowydkz.js";import{g as ve,a as w,b as be,p as H}from"./PlaneCreateEdit-BB7AW5YU.js";import{P as ns}from"./PlaneCreateEdit-BB7AW5YU.js";import"./vendor-DJG_os-6.js";const _=h.div`
  display: flex;
  align-items: center;
  gap: ${s=>s.$size==="small"?"8px":"12px"};
  flex-wrap: wrap;
`,W=h.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${s=>s.$size==="small"?"12px":"14px"};
`,$e=h.div`
  width: 100%;
  margin-top: 8px;
`,ke=({entityHealth:s,showProgress:o=!1,size:t="default"})=>{const{t:r}=S(["entities","common"]),{healthy:n,warning:f,error:l,total:i}=s;if(i===0)return e.jsx(_,{$size:t,children:e.jsx(L,{color:"default",children:r("planes:card.entityStats.noEntities")})});const x=n/i*100,m=f/i*100,g=l/i*100;return e.jsxs("div",{children:[e.jsxs(_,{$size:t,children:[e.jsx(v,{title:`${r("planes:card.entityStats.healthyTooltip")}: ${n} (${x.toFixed(1)}%)`,children:e.jsxs(W,{$size:t,children:[e.jsx(z,{style:{color:"#52c41a"}}),e.jsx("span",{style:{color:"#52c41a",fontWeight:500},children:n})]})}),e.jsx(v,{title:`${r("planes:card.entityStats.warningTooltip")}: ${f} (${m.toFixed(1)}%)`,children:e.jsxs(W,{$size:t,children:[e.jsx(T,{style:{color:"#faad14"}}),e.jsx("span",{style:{color:"#faad14",fontWeight:500},children:f})]})}),e.jsx(v,{title:`${r("planes:card.entityStats.errorTooltip")}: ${l} (${g.toFixed(1)}%)`,children:e.jsxs(W,{$size:t,children:[e.jsx(K,{style:{color:"#ff4d4f"}}),e.jsx("span",{style:{color:"#ff4d4f",fontWeight:500},children:l})]})}),e.jsxs("span",{style:{color:"#8c8c8c",fontSize:t==="small"?"11px":"12px"},children:["/ ",i]})]}),o&&e.jsxs($e,{children:[e.jsx(ie,{percent:100,success:{percent:x},strokeColor:{"0%":"#ff4d4f",[`${g}%`]:"#ff4d4f",[`${g+m}%`]:"#faad14","100%":"#52c41a"},showInfo:!1,size:"small"}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px",color:"#8c8c8c",marginTop:"4px"},children:[e.jsxs("span",{children:[r("planes:card.entityStats.error")," ",g.toFixed(1),"%"]}),e.jsxs("span",{children:[r("planes:card.entityStats.warning")," ",m.toFixed(1),"%"]}),e.jsxs("span",{children:[r("planes:card.entityStats.healthy")," ",x.toFixed(1),"%"]})]})]})]})},{Text:$,Paragraph:we}=A,De=h(R)`
  margin-bottom: 16px;
  border: 2px solid var(--border-color);
  background-color: var(--card-bg);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
    box-shadow: var(--card-hover-shadow);
    transform: translateY(-2px);
  }
  
  .ant-card-head {
    background: ${s=>ve(s.$level)};
    border-bottom: none;
    
    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
  }
  
  .ant-card-body {
    color: var(--text-color);
  }
`,Ne=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`,Ce=s=>{switch(s){case"ACTIVE":return"#52c41a";case"WARNING":return"#faad14";case"ERROR":return"#ff4d4f";case"MAINTENANCE":return"#1890ff";default:return"#d9d9d9"}},Se=(s,o)=>o(`planes:status.${s}`)||o("planes:status.UNKNOWN"),Ie=({plane:s,onAction:o,className:t})=>{const{t:r}=S(["planes","common"]),n=f=>{o(f,s.id)};return e.jsxs(De,{$level:s.level,className:t,title:e.jsxs(D,{children:[e.jsx("span",{className:"plane-icon",children:s.config.icon||"📋"}),e.jsx("span",{children:s.displayName||s.name}),e.jsx(ce,{color:Ce(s.status),text:Se(s.status,r)})]}),extra:e.jsxs(D,{children:[e.jsx(v,{title:r("planes:card.tooltips.viewDetails"),children:e.jsx(P,{type:"text",icon:e.jsx(oe,{}),onClick:()=>n("view"),className:"plane-action-btn"})}),e.jsx(v,{title:r("planes:card.tooltips.editConfig"),children:e.jsx(P,{type:"text",icon:e.jsx(de,{}),onClick:()=>n("edit"),className:"plane-action-btn"})}),e.jsx(v,{title:r("planes:card.tooltips.addInstance"),children:e.jsx(P,{type:"text",icon:e.jsx(Z,{}),onClick:()=>n("add"),className:"plane-action-btn"})})]}),children:[e.jsx(we,{className:"plane-description",children:s.description}),e.jsxs("div",{className:"entity-health-section",children:[e.jsxs($,{strong:!0,className:"section-title",children:[r("planes:card.labels.entityHealthStatus"),":"]}),e.jsx(ke,{entityHealth:s.entityHealth,showProgress:!0,size:"default"})]}),e.jsx(le,{className:"plane-divider"}),e.jsxs(Ne,{children:[e.jsxs(D,{size:"large",children:[e.jsxs("div",{children:[e.jsxs($,{strong:!0,children:[r("planes:card.labels.level"),": "]}),e.jsxs($,{children:["L",s.level]})]}),e.jsxs("div",{children:[e.jsxs($,{strong:!0,children:[r("planes:card.labels.totalEntities"),": "]}),e.jsx($,{children:s.entityHealth.total})]}),e.jsxs("div",{children:[e.jsxs($,{strong:!0,children:[r("planes:card.labels.createdAt"),": "]}),e.jsx($,{children:new Date(s.createdAt).toLocaleDateString()})]})]}),s.dependencies&&s.dependencies.length>0&&e.jsxs("div",{children:[e.jsxs($,{type:"secondary",className:"dependency-text",children:[r("planes:card.labels.dependencies"),": ",s.dependencies.length," ",r("planes:card.labels.planesCount"),s.dependencies.length>1&&e.jsxs("span",{className:"multiple-dependency-warning",children:[" (",r("planes:card.labels.multipleDependency"),")"]})]}),e.jsx("div",{className:"dependency-list",children:s.dependencies.map((f,l)=>e.jsxs("span",{className:"dependency-item",children:[f,l<s.dependencies.length-1&&", "]},f))})]})]})]})};h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  position: relative;
  
  .arrow-icon {
    font-size: 24px;
    color: #1890ff;
    ${s=>s.$animated&&`
      animation: bounce 2s infinite;
    `}
  }
  
  .relationship-label {
    position: absolute;
    right: -80px;
    background: #f0f0f0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    white-space: nowrap;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;const Pe=h.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
  position: relative;
`,Te=h.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  
  .arrow-icon {
    font-size: 24px;
    color: #1890ff;
    ${s=>s.$animated&&`
      animation: bounce 2s infinite;
    `}
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`,Re=h.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  max-width: 300px;
`,Ee=h.div`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  color: white;
  background: ${s=>w(s.$planeId)};
  opacity: ${s=>{switch(s.$strength){case"critical":return 1;case"strong":return .9;case"medium":return .8;case"weak":return .7;default:return .8}}};
  white-space: nowrap;
  border: 1px solid ${s=>w(s.$planeId)};
`,Y=s=>{var o;return((o=s.properties)==null?void 0:o.strength)||"medium"},Le=s=>{var o;return((o=s.properties)==null?void 0:o.description)||"支撑关系"},ze=({currentPlane:s,allPlanes:o,relationships:t,animated:r=!0})=>{const n=t.filter(l=>s.dependencies.includes(l.sourceId)&&l.targetId===s.id);if(n.length===0)return null;const f=n.sort((l,i)=>{const x={critical:4,strong:3,medium:2,weak:1},m=x[Y(l)]||0;return(x[Y(i)]||0)-m});return e.jsxs(Pe,{$animated:r,children:[e.jsx(Te,{$animated:r,children:n.length>1?e.jsx(v,{title:`${s.displayName} 依赖 ${n.length} 个平面`,children:e.jsx(J,{className:"arrow-icon"})}):e.jsx(pe,{className:"arrow-icon"})}),e.jsx(Re,{children:f.map(l=>{const i=o.find(g=>g.id===l.sourceId),x=Y(l),m=Le(l);return e.jsx(v,{title:`${i==null?void 0:i.displayName} → ${s.displayName}: ${m}`,children:e.jsx(Ee,{$planeId:l.sourceId,$strength:x,children:(i==null?void 0:i.displayName)||l.sourceId})},l.id)})})]})},O=h.div`
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0;
  margin: 16px 0;
  min-height: 400px;
  transition: all 0.3s ease;
`,Ae=h.div`
  margin-bottom: 24px;
  padding: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:first-child {
    padding-top: 24px;
  }
`,Fe=({planes:s,relationships:o,loading:t=!1,onPlaneAction:r})=>{const{t:n}=S(["planes","common"]),f=[...s].sort((i,x)=>x.level-i.level),l=i=>f.some(x=>x.level===i-1);return t?e.jsx(O,{children:e.jsxs("div",{className:"loading-container",children:[e.jsx(xe,{size:"large"}),e.jsx("div",{className:"loading-text",children:n("planes:loading.topology")})]})}):s.length===0?e.jsx(O,{children:e.jsx(V,{description:n("planes:loading.noPlaneData"),image:V.PRESENTED_IMAGE_SIMPLE})}):e.jsx(O,{children:f.map((i,x)=>e.jsxs(Ae,{children:[e.jsx(Ie,{plane:i,onAction:r}),l(i.level)&&e.jsx(ze,{currentPlane:i,allPlanes:f,relationships:o,animated:!0})]},i.id))})},{Title:Qe}=A,Me=({planes:s,metrics:o=[],loading:t=!1})=>{const{t:r}=S(["planes","common"]),n=s.length,f=s.filter(d=>d.status==="ACTIVE").length,l=s.filter(d=>d.status==="WARNING").length,i=s.filter(d=>d.status==="ERROR").length,x=o.reduce((d,c)=>d+c.instanceCount,0),m=s.reduce((d,c)=>d+c.entityHealth.healthy,0),g=s.reduce((d,c)=>d+c.entityHealth.warning,0),I=s.reduce((d,c)=>d+c.entityHealth.error,0);s.reduce((d,c)=>d+c.entityHealth.total,0);const p=[{title:r("planes:stats.totalPlanes"),value:n,icon:e.jsx(fe,{}),className:"plane-stats-primary"},{title:r("planes:stats.activePlanes"),value:f,icon:e.jsx(z,{}),className:"plane-stats-success"},{title:r("planes:stats.warningPlanes"),value:l,icon:e.jsx(T,{}),className:"plane-stats-warning"},{title:r("planes:stats.errorPlanes"),value:i,icon:e.jsx(K,{}),className:"plane-stats-error"},{title:r("planes:stats.totalInstances"),value:x,icon:e.jsx(Q,{}),className:"plane-stats-purple"},{title:r("planes:stats.healthyEntities"),value:m,icon:e.jsx(z,{}),className:"plane-stats-success"},{title:r("planes:stats.warningEntities"),value:g,icon:e.jsx(T,{}),className:"plane-stats-warning"},{title:r("planes:stats.errorEntities"),value:I,icon:e.jsx(K,{}),className:"plane-stats-error"}];return e.jsx(X,{gutter:[16,16],style:{marginBottom:32},children:p.map((d,c)=>e.jsx(U,{xs:24,sm:12,md:6,lg:3,children:e.jsx(R,{loading:t,className:d.className,children:e.jsx(he,{title:d.title,value:d.value,prefix:d.icon})})},c))})},{Title:Xe,Text:j}=A,{useToken:Be}=me,He=h.div`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${s=>s.$isDark?`${w(s.$planeId)}20`:be(s.$planeId)};
  border: 1px solid ${s=>w(s.$planeId)};
  margin-right: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${s=>s.$isDark?`${w(s.$planeId)}30`:`${w(s.$planeId)}15`};
  }
`,We=h.div`
  margin-bottom: 16px;
  padding: 16px;
  background: ${s=>s.$isDark?"#1f1f1f":"#fafafa"};
  border: 1px solid ${s=>s.$isDark?"#303030":"#f0f0f0"};
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${s=>s.$isDark?"#434343":"#d9d9d9"};
    box-shadow: ${s=>s.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  }
`,Ye=h.div`
  .ant-table-tbody > tr.high-risk-row {
    background-color: ${s=>s.$isDark?"#2a1215":"#fff2f0"} !important;
    border-left: 3px solid #ff4d4f;
  }
  
  .ant-table-tbody > tr.medium-risk-row {
    background-color: ${s=>s.$isDark?"#2b2611":"#fffbe6"} !important;
    border-left: 3px solid #faad14;
  }
  
  .ant-table-tbody > tr.low-risk-row {
    border-left: 3px solid #52c41a;
  }
  
  .ant-table-tbody > tr.high-risk-row:hover > td,
  .ant-table-tbody > tr.medium-risk-row:hover > td {
    background-color: inherit !important;
  }
  
  .ant-table-thead > tr > th {
    background: ${s=>s.$isDark?"#1f1f1f":"#fafafa"} !important;
    border-bottom: 1px solid ${s=>s.$isDark?"#303030":"#f0f0f0"} !important;
    color: ${s=>s.$isDark?"#ffffff":"rgba(0, 0, 0, 0.85)"} !important;
  }
  
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid ${s=>s.$isDark?"#303030":"#f0f0f0"} !important;
  }
  
  .ant-table-tbody > tr:hover > td {
    background: ${s=>s.$isDark?"#262626":"#fafafa"} !important;
  }
`,Oe=h.div`
  margin-top: 16px;
  padding: 12px;
  background: ${s=>s.$isDark?"#0f1419":"#f6f8fa"};
  border: 1px solid ${s=>s.$isDark?"#21262d":"#d1d9e0"};
  border-radius: 6px;
  font-size: 12px;
  color: ${s=>s.$isDark?"#8b949e":"#656d76"};
  
  .risk-item {
    display: inline-block;
    margin-right: 16px;
    
    &:last-child {
      margin-right: 0;
    }
  }
  
  .risk-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
    
    &.low { background-color: #52c41a; }
    &.medium { background-color: #faad14; }
    &.high { background-color: #ff4d4f; }
  }
`,Ge=({planes:s,relationships:o})=>{const{t}=S(["planes","common"]),{currentTheme:r}=q(a=>a.theme);Be();const n=r==="dark",l=s.map(a=>{const u=a.dependencies||[],N=s.filter(E=>E.dependencies&&E.dependencies.includes(a.id)).map(E=>E.id),C=u.length,b=N.length,y=C*2+b;let k="low";return y>=8?k="high":y>=4&&(k="medium"),{planeId:a.id,planeName:a.displayName,level:a.level,dependencyCount:C,dependentCount:b,complexityScore:y,riskLevel:k,dependencies:u,dependents:N}}),i=a=>{switch(a){case"high":return n?"#ff7875":"#ff4d4f";case"medium":return n?"#ffc53d":"#faad14";case"low":return n?"#73d13d":"#52c41a";default:return n?"#595959":"#d9d9d9"}},x=a=>{switch(a){case"high":return e.jsx(T,{});case"medium":return e.jsx(T,{});case"low":return e.jsx(z,{});default:return e.jsx(Q,{})}},m=a=>a>=8?n?"#ff7875":"#ff4d4f":a>=4?n?"#ffc53d":"#faad14":n?"#73d13d":"#52c41a",g=[{title:t("planes:dependency.columns.planeName"),dataIndex:"planeName",key:"planeName",render:(a,u)=>e.jsxs(D,{children:[e.jsx(He,{$planeId:u.planeId,$isDark:n,children:e.jsxs(j,{strong:!0,style:{color:w(u.planeId)},children:["L",u.level]})}),e.jsx(j,{style:{color:n?"#ffffff":"rgba(0, 0, 0, 0.85)"},children:a})]})},{title:t("planes:dependency.columns.dependencyCount"),dataIndex:"dependencyCount",key:"dependencyCount",render:(a,u)=>{const N=u.dependencies.map(b=>{const y=s.find(k=>k.id===b);return(y==null?void 0:y.displayName)||b}).join(", "),C=a>2?n?"#d89614":"orange":a>0?n?"#177ddc":"blue":n?"#434343":"default";return e.jsx(v,{title:`${t("planes:dependency.tooltips.dependencyPlanes")}: ${N||t("planes:dependency.tooltips.none")}`,children:e.jsx(L,{color:C,children:a})})}},{title:t("planes:dependency.columns.dependentCount"),dataIndex:"dependentCount",key:"dependentCount",render:(a,u)=>{const N=u.dependents.map(b=>{const y=s.find(k=>k.id===b);return(y==null?void 0:y.displayName)||b}).join(", "),C=a>2?n?"#d32029":"red":a>0?n?"#49aa19":"green":n?"#434343":"default";return e.jsx(v,{title:`${t("planes:dependency.tooltips.dependentPlanes")}: ${N||t("planes:dependency.tooltips.none")}`,children:e.jsx(L,{color:C,children:a})})}},{title:t("planes:dependency.columns.complexityScore"),dataIndex:"complexityScore",key:"complexityScore",render:a=>e.jsx(j,{strong:!0,style:{color:m(a)},children:a})},{title:t("planes:dependency.columns.riskLevel"),dataIndex:"riskLevel",key:"riskLevel",render:a=>e.jsx(L,{color:i(a),icon:x(a),style:{color:n?"#000000":"#ffffff",fontWeight:"bold"},children:t(`planes:dependency.riskLevels.${a}`)})}],I=l.reduce((a,u)=>a+u.complexityScore,0),p=l.filter(a=>a.riskLevel==="high").length,d=l.filter(a=>a.riskLevel==="medium").length,c=Math.max(...l.map(a=>a.dependencyCount));return e.jsxs(R,{title:e.jsxs(D,{children:[e.jsx(J,{style:{color:n?"#ffffff":"rgba(0, 0, 0, 0.85)"}}),e.jsx("span",{style:{color:n?"#ffffff":"rgba(0, 0, 0, 0.85)"},children:t("planes:dependency.title")})]}),style:{marginTop:24,background:n?"#141414":"#ffffff",borderColor:n?"#303030":"#d9d9d9"},children:[e.jsx(We,{$isDark:n,children:e.jsxs(D,{size:"large",wrap:!0,children:[e.jsxs("div",{children:[e.jsxs(j,{type:"secondary",style:{color:n?"#8c8c8c":"#595959"},children:[t("planes:dependency.stats.totalComplexity"),":"]}),e.jsx(j,{strong:!0,style:{fontSize:"16px",color:n?"#40a9ff":"#1890ff",marginLeft:"4px"},children:I})]}),e.jsxs("div",{children:[e.jsxs(j,{type:"secondary",style:{color:n?"#8c8c8c":"#595959"},children:[t("planes:dependency.stats.highRiskPlanes"),":"]}),e.jsx(j,{strong:!0,style:{fontSize:"16px",color:n?"#ff7875":"#ff4d4f",marginLeft:"4px"},children:p})]}),e.jsxs("div",{children:[e.jsxs(j,{type:"secondary",style:{color:n?"#8c8c8c":"#595959"},children:[t("planes:dependency.stats.mediumRiskPlanes"),":"]}),e.jsx(j,{strong:!0,style:{fontSize:"16px",color:n?"#ffc53d":"#faad14",marginLeft:"4px"},children:d})]}),e.jsxs("div",{children:[e.jsxs(j,{type:"secondary",style:{color:n?"#8c8c8c":"#595959"},children:[t("planes:dependency.stats.maxDependencies"),":"]}),e.jsx(j,{strong:!0,style:{fontSize:"16px",color:n?"#b37feb":"#722ed1",marginLeft:"4px"},children:c})]})]})}),e.jsx(Ye,{$isDark:n,children:e.jsx(ge,{dataSource:l,columns:g,rowKey:"planeId",pagination:!1,size:"small",rowClassName:a=>a.riskLevel==="high"?"high-risk-row":a.riskLevel==="medium"?"medium-risk-row":"low-risk-row",style:{background:n?"#141414":"#ffffff"}})}),e.jsxs(Oe,{$isDark:n,children:[e.jsxs("div",{style:{fontWeight:"bold",marginBottom:"8px",color:n?"#ffffff":"#000000"},children:[t("planes:dependency.riskExplanation.title"),":"]}),e.jsxs("div",{children:[e.jsxs("span",{className:"risk-item",children:[e.jsx("span",{className:"risk-dot low"}),t("planes:dependency.riskExplanation.low")]}),e.jsxs("span",{className:"risk-item",children:[e.jsx("span",{className:"risk-dot medium"}),t("planes:dependency.riskExplanation.medium")]}),e.jsxs("span",{className:"risk-item",children:[e.jsx("span",{className:"risk-dot high"}),t("planes:dependency.riskExplanation.high")]})]})]})]})},{Title:G,Paragraph:Ke}=A,Ue=h.div`
  padding: 24px;
`,es=()=>{const s=ee(),o=se(),{t}=S(["planes","common"]),{definitions:r,topology:n,metrics:f,loading:l,error:i}=q(p=>p.plane);ue.useEffect(()=>{je(t("planes:title")),x()},[t]);const x=async()=>{try{o(F({type:"definitions",loading:!0})),o(F({type:"topology",loading:!0})),o(F({type:"metrics",loading:!0}));try{const p=await H.getPlaneDefinitions();o(te(p.data))}catch(p){o(M({type:"definitions",error:p.message||t("planes:errors.planeDefinitionLoadFailed")}))}try{const p=await H.getPlaneTopology();o(ne(p))}catch(p){o(M({type:"topology",error:p.message||t("planes:errors.topologyLoadFailed")}))}try{const p=await H.getAllPlanesMetrics();o(ae(p))}catch(p){o(M({type:"metrics",error:p.message||t("planes:errors.metricsLoadFailed")}))}}catch(p){B.error(t("planes:errors.loadDataFailed")),console.error("Failed to load plane data:",p)}},m=()=>{x()},g=(p,d)=>{const c=r.find(a=>a.id===d);switch(c&&o(re(c)),p){case"view":B.info(`${t("common:view")}: ${(c==null?void 0:c.displayName)||d}`);break;case"edit":s(`/planes/edit/${d}`);break;case"add":B.info(`${t("common:add")}: ${(c==null?void 0:c.displayName)||d}`);break}},I=()=>{s("/planes/create")};return e.jsxs(Ue,{className:"plane-management-page",children:[e.jsxs("div",{style:{marginBottom:24},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[e.jsx(G,{level:2,style:{margin:0},children:t("planes:title")}),e.jsxs(D,{children:[e.jsx(P,{icon:e.jsx(ye,{}),onClick:m,loading:l.definitions||l.topology||l.metrics,children:t("common:refresh")}),e.jsx(P,{type:"primary",icon:e.jsx(Z,{}),onClick:I,children:t("planes:createTitle")})]})]}),e.jsx(Ke,{style:{margin:0},children:t("planes:subtitle")})]}),(i.definitions||i.topology||i.metrics)&&e.jsx(R,{className:"error-card",style:{marginBottom:24},children:e.jsxs("div",{className:"error-text",children:[i.definitions&&e.jsxs("div",{children:[t("planes:errors.planeDefinitionLoadFailed"),": ",i.definitions]}),i.topology&&e.jsxs("div",{children:[t("planes:errors.topologyLoadFailed"),": ",i.topology]}),i.metrics&&e.jsxs("div",{children:[t("planes:errors.metricsLoadFailed"),": ",i.metrics]})]})}),e.jsx(Me,{planes:r,metrics:f,loading:l.definitions||l.metrics}),e.jsx(Fe,{planes:r,relationships:(n==null?void 0:n.relationships)||[],loading:l.definitions||l.topology,onPlaneAction:g}),e.jsx(Ge,{planes:r,relationships:(n==null?void 0:n.relationships)||[]}),e.jsx(R,{title:t("planes:operations.title"),style:{marginTop:24},children:e.jsxs(X,{gutter:[16,16],children:[e.jsxs(U,{xs:24,md:12,children:[e.jsx(G,{level:4,children:t("planes:operations.levelDescription")}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.levelDetails.l1")}),": ",t("planes:operations.levelDetails.l1Desc")]}),e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.levelDetails.l2")}),": ",t("planes:operations.levelDetails.l2Desc")]}),e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.levelDetails.l3")}),": ",t("planes:operations.levelDetails.l3Desc")," ",e.jsxs("span",{className:"level-warning",children:["(",t("planes:operations.levelDetails.multipleDependency"),")"]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.levelDetails.l4")}),": ",t("planes:operations.levelDetails.l4Desc")," ",e.jsxs("span",{className:"level-warning",children:["(",t("planes:operations.levelDetails.multipleDependency"),")"]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.levelDetails.l5")}),": ",t("planes:operations.levelDetails.l5Desc")," ",e.jsxs("span",{className:"level-error",children:["(",t("planes:operations.levelDetails.complexDependency"),")"]})]})]})]}),e.jsxs(U,{xs:24,md:12,children:[e.jsx(G,{level:4,children:t("planes:operations.features.title")}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.features.multipleDependencySupport")}),": ",t("planes:operations.features.multipleDependencySupportDesc")]}),e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.features.complexityAnalysis")}),": ",t("planes:operations.features.complexityAnalysisDesc")]}),e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.features.visualization")}),": ",t("planes:operations.features.visualizationDesc")]}),e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.features.realTimeMonitoring")}),": ",t("planes:operations.features.realTimeMonitoringDesc")]}),e.jsxs("li",{children:[e.jsx("strong",{children:t("planes:operations.features.riskAssessment")}),": ",t("planes:operations.features.riskAssessmentDesc")]})]})]})]})})]})};export{ns as PlaneCreateEdit,es as default};
