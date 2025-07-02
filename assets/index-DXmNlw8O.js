import{b as c,u as p,j as o,d}from"./index-DWPu_TRF.js";import{ae as m,ay as x,f as g,q as h,az as u,aA as T,T as y,d as f,C as b,i as j}from"./antd-DnS9M1TX.js";import"./vendor-DJG_os-6.js";const{Title:a,Paragraph:i}=y,v=d.div`
  padding: 24px;

  .tool-card {
    height: 200px;
    cursor: pointer;
    border: 1px solid var(--border-color);

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: var(--primary-color);
    }

    .ant-card-body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .tool-icon {
      font-size: 48px;
      color: var(--primary-color);
      margin-bottom: 16px;
    }

    .tool-title {
      margin-bottom: 8px !important;
      color: var(--text-color);
    }

    .tool-description {
      color: var(--text-color-secondary);
      margin-bottom: 0 !important;
    }
  }

  .header-section {
    margin-bottom: 32px;
    text-align: center;

    .main-title {
      color: var(--text-color);
      margin-bottom: 8px !important;
    }

    .main-description {
      color: var(--text-color-secondary);
      font-size: 16px;
      margin-bottom: 0 !important;
    }
  }
`,R=()=>{const e=c(),{t:s}=p(["testTools","common"]),n=[{key:"entity-topology",title:s("testTools:tools.entityTopology.title"),description:s("testTools:tools.entityTopology.description"),icon:o.jsx(m,{}),path:"/test-tools/entity-topology",status:"available"},{key:"relation-graph",title:s("testTools:tools.relationGraph.title"),description:s("testTools:tools.relationGraph.description"),icon:o.jsx(x,{}),path:"/test-tools/relation-graph",status:"coming-soon"},{key:"data-flow",title:s("testTools:tools.dataFlow.title"),description:s("testTools:tools.dataFlow.description"),icon:o.jsx(g,{}),path:"/test-tools/data-flow",status:"coming-soon"},{key:"api-testing",title:s("testTools:tools.apiTesting.title"),description:s("testTools:tools.apiTesting.description"),icon:o.jsx(h,{}),path:"/test-tools/api-testing",status:"beta"},{key:"performance-monitor",title:s("testTools:tools.performanceMonitor.title"),description:s("testTools:tools.performanceMonitor.description"),icon:o.jsx(u,{}),path:"/test-tools/performance-monitor",status:"coming-soon"},{key:"experiment-lab",title:s("testTools:tools.experimentLab.title"),description:s("testTools:tools.experimentLab.description"),icon:o.jsx(T,{}),path:"/test-tools/experiment-lab",status:"beta"}],l=t=>{t.status==="available"||t.status==="beta"?e(t.path):console.log(`${t.title} 功能即将上线`)},r=t=>{switch(t){case"beta":return o.jsxs("span",{style:{color:"#faad14",fontSize:"12px"},children:[" (",s("testTools:toolStatus.beta"),")"]});case"coming-soon":return o.jsxs("span",{style:{color:"#d9d9d9",fontSize:"12px"},children:[" (",s("testTools:toolStatus.comingSoon"),")"]});default:return null}};return o.jsxs(v,{children:[o.jsxs("div",{className:"header-section",children:[o.jsx(a,{level:2,className:"main-title",children:s("testTools:title")}),o.jsx(i,{className:"main-description",children:s("testTools:description")})]}),o.jsx(f,{gutter:[24,24],children:n.map(t=>o.jsx(b,{xs:24,sm:12,lg:8,xl:6,children:o.jsxs(j,{className:"tool-card",onClick:()=>l(t),hoverable:t.status==="available"||t.status==="beta",style:{opacity:t.status==="coming-soon"?.6:1,cursor:t.status==="coming-soon"?"not-allowed":"pointer"},children:[o.jsx("div",{className:"tool-icon",children:t.icon}),o.jsxs(a,{level:4,className:"tool-title",children:[t.title,r(t.status)]}),o.jsx(i,{className:"tool-description",children:t.description})]})},t.key))})]})};export{R as default};
