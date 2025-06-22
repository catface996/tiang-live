import{j as r}from"./react-BkaC_jdz.js";import{U as m,V as e,az as u,aA as x,a1 as c,S as h,B as g,ai as y,d as j}from"./react-dom-ZHUlsYA_.js";const{Search:k}=u,{Option:w}=c,B=j.div`
  margin-bottom: 24px;
  padding: 16px;
  background: var(--card-bg);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  
  .ant-input-search {
    .ant-input {
      background: var(--input-bg);
      border-color: var(--border-color);
      color: var(--text-color);
      
      &:hover {
        border-color: var(--primary-color);
      }
      
      &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px var(--primary-color-fade);
      }
      
      &::placeholder {
        color: var(--text-secondary);
      }
    }
    
    .ant-input-search-button {
      background: transparent !important;
      border-color: var(--border-color) !important;
      color: var(--text-color) !important;
      
      &:hover {
        background: var(--button-hover-bg) !important;
        border-color: var(--primary-color) !important;
        color: var(--primary-color) !important;
      }
      
      .anticon {
        color: var(--text-color) !important;
      }
      
      &:hover .anticon {
        color: var(--primary-color) !important;
      }
    }
  }
  
  .ant-select {
    .ant-select-selector {
      background: var(--input-bg) !important;
      border-color: var(--border-color) !important;
      color: var(--text-color) !important;
      
      &:hover {
        border-color: var(--primary-color) !important;
      }
    }
    
    &.ant-select-focused .ant-select-selector {
      border-color: var(--primary-color) !important;
      box-shadow: 0 0 0 2px var(--primary-color-fade) !important;
    }
    
    .ant-select-selection-placeholder {
      color: var(--text-secondary) !important;
    }
    
    .ant-select-arrow {
      color: var(--text-secondary);
    }
  }
  
  .ant-btn {
    background: var(--button-bg);
    border-color: var(--border-color);
    color: var(--text-color);
    
    &:hover {
      background: var(--button-hover-bg);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
  }
`,I=({searchValue:l="",onSearchChange:a,searchPlaceholder:n="搜索...",filters:d=[],showRefresh:i=!0,onRefresh:s,extraActions:p,className:v,style:b})=>r.jsx(B,{className:v,style:b,children:r.jsxs(m,{gutter:16,align:"middle",children:[r.jsx(e,{flex:"auto",children:r.jsx(k,{placeholder:n,value:l,onChange:o=>a==null?void 0:a(o.target.value),style:{width:"100%"},allowClear:!0,enterButton:r.jsx(x,{})})}),d.map(o=>r.jsx(e,{children:r.jsx(c,{value:o.value,onChange:o.onChange,style:{width:o.width||120},placeholder:o.placeholder,children:o.options.map(t=>r.jsx(w,{value:t.value,children:t.label},t.value))})},o.key)),r.jsx(e,{children:r.jsxs(h,{children:[i&&r.jsx(g,{icon:r.jsx(y,{}),onClick:s,title:"刷新"}),p]})})]})});export{I as S};
