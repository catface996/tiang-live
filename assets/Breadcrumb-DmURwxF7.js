import{b as n,j as t,d as c}from"./index-CCrQ40Eo.js";import{K as i}from"./antd-DB_1XVWl.js";const l=c(i)`
  margin-bottom: 16px;
  
  .ant-breadcrumb-link {
    cursor: pointer;
    
    &:hover {
      color: #1890ff;
    }
  }
`,u=({items:e})=>{const a=n(),s=r=>{r&&a(r)},o=e.map((r,d)=>({title:t.jsxs("span",{onClick:()=>s(r.path),style:{cursor:r.path?"pointer":"default",display:"flex",alignItems:"center",gap:"4px"},children:[r.icon,r.title]})}));return t.jsx(l,{items:o})};export{u as B};
