import{a as c,j as e}from"./react-D_ZWy-Ho.js";import{u as K,af as N,U as _,V as A,c as q,S as d,o as G,ab as Y,T as v,B as m,aW as W,ai as F,a as J,ba as O,a7 as Q,ae as w,A as C,r as X,p as S,aE as Z,y as ss,az as es,bb as ts,Y as is,d as o,_ as as,a3 as rs}from"./react-dom-GpeNoQsX.js";import{s as os}from"./index-Daowydkz.js";import{u as ns}from"./index-Dbh4PPVu.js";import"./vendor-VHja5XRA.js";import"./cytoscape-DXzeTOL3.js";import"./media-BPG7piku.js";import"./lodash-D08E6HgQ.js";import"./redux-CiqK6azd.js";import"./echarts-core-CW0Gv0IT.js";import"./antd-icons-CI4I6I7B.js";import"./dayjs-CrhenB4N.js";import"./emotion-BhZTwsuK.js";import"./mermaid-AggIEIwl.js";import"./d3-Dbz_rnoS.js";import"./i18n-CMVetavo.js";const{Title:ls,Paragraph:cs,Text:$}=q,{TextArea:ds}=es,fs=o.div`
  padding: 24px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background: ${s=>s.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,xs=o.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,ps=o(as)`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px;
  box-shadow: ${s=>s.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  transition: all 0.3s ease;
  
  .ant-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }
`,gs=o.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: ${s=>s.$isDark?"#0a0a0a":"#fafafa"};
  border: ${s=>s.$isDark?"1px solid #262626":"1px solid #f0f0f0"};
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  
  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${s=>s.$isDark?"#1f1f1f":"#f1f1f1"};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${s=>s.$isDark?"#434343":"#c1c1c1"};
    border-radius: 3px;
    
    &:hover {
      background: ${s=>s.$isDark?"#595959":"#a8a8a8"};
    }
  }
`,U=o.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: ${s=>s.isUser?"flex-end":"flex-start"};
`,R=o.div`
  max-width: 70%;
  display: flex;
  align-items: flex-start;
  flex-direction: ${s=>s.isUser?"row-reverse":"row"};
  gap: 8px;
`,T=o.div`
  padding: 12px 16px;
  border-radius: 12px;
  background: ${s=>s.isUser?s.$isDark?"#177ddc":"#1890ff":s.$isDark?"#262626":"#ffffff"};
  color: ${s=>s.isUser||s.$isDark?"#ffffff":"#000000"};
  box-shadow: ${s=>s.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.1)"};
  border: ${s=>s.$isDark&&!s.isUser?"1px solid #434343":"none"};
  position: relative;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    ${s=>s.isUser?`
      right: -12px;
      border-left-color: ${s.$isDark?"#177ddc":"#1890ff"};
    `:`
      left: -12px;
      border-right-color: ${s.$isDark?"#262626":"#ffffff"};
      ${s.$isDark?"filter: drop-shadow(1px 0 0 #434343);":""}
    `}
  }
`,us=o.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
  
  .ant-input {
    background: ${s=>s.$isDark?"#000000":"#ffffff"};
    border-color: ${s=>s.$isDark?"#434343":"#d9d9d9"};
    color: ${s=>s.$isDark?"#ffffff":"#000000"};
    
    &:hover {
      border-color: ${s=>s.$isDark?"#177ddc":"#40a9ff"};
    }
    
    &:focus {
      border-color: ${s=>s.$isDark?"#177ddc":"#40a9ff"};
      box-shadow: ${s=>s.$isDark?"0 0 0 2px rgba(23, 125, 220, 0.2)":"0 0 0 2px rgba(24, 144, 255, 0.2)"};
    }
    
    &::placeholder {
      color: ${s=>s.$isDark?"#8c8c8c":"#bfbfbf"};
    }
  }
`,hs=o.div`
  margin-bottom: 16px;
  padding: 16px;
  background: ${s=>s.$isDark?"#1f1f1f":"#f8f9fa"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #e8e8e8"};
  border-radius: 8px;
  transition: all 0.3s ease;
`,ms=o(rs)`
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${s=>s.$isDark?"rgba(24, 144, 255, 0.1)":void 0};
  border-color: ${s=>s.$isDark?"#177ddc":void 0};
  color: ${s=>s.$isDark?"#177ddc":void 0};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${s=>s.$isDark?"0 2px 8px rgba(23, 125, 220, 0.3)":"0 2px 8px rgba(0, 0, 0, 0.1)"};
    background: ${s=>s.$isDark?"rgba(24, 144, 255, 0.2)":void 0};
  }
`,$s=o.div`
  margin-bottom: 24px;
  padding: 24px;
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px;
  box-shadow: ${s=>s.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  transition: all 0.3s ease;
`,zs=()=>{const[s,p]=c.useState([]),[u,b]=c.useState(""),[I,k]=c.useState(!1),[M,j]=c.useState(!1),[y,g]=c.useState(!1),D=c.useRef(null),{t}=K(),{currentTheme:E}=ns(i=>i.theme);N.useToken();const a=E==="dark";c.useEffect(()=>{os(t("aiAssistant.title"));const i={id:"1",content:t("dashboard.welcome"),isUser:!1,timestamp:new Date};p([i]),g(!1)},[]),c.useEffect(()=>{y&&z()},[s,y]);const z=()=>{var i;(i=D.current)==null||i.scrollIntoView({behavior:"smooth"})},P=[t("aiAssistant.suggestions.createPlane"),t("aiAssistant.suggestions.entityRelation"),t("aiAssistant.suggestions.healthMonitor"),t("aiAssistant.suggestions.planeDependency"),t("aiAssistant.suggestions.tagManagement"),t("aiAssistant.suggestions.systemReport")],h=async i=>{const n=i||u.trim();if(!n)return;const l={id:Date.now().toString(),content:n,isUser:!0,timestamp:new Date};p(r=>[...r,l]),b(""),k(!0),j(!0),g(!0),setTimeout(()=>{const r=B(n),f={id:(Date.now()+1).toString(),content:r,isUser:!1,timestamp:new Date};p(x=>[...x,f]),k(!1),j(!1),g(!0)},1500+Math.random()*1e3)},B=i=>{const n=i.toLowerCase(),l=f=>f.some(x=>n.includes(x)),r=f=>f.some(x=>n.includes(x));return l(["平面","创建"])||r(["plane","create"])?t("aiAssistant.responses.createPlane"):l(["实体","关系"])||r(["entity","relation"])?t("aiAssistant.responses.entityRelation"):l(["健康度","监控"])||r(["health","monitor"])?t("aiAssistant.responses.healthMonitor"):l(["依赖","配置"])||r(["dependency","config"])?t("aiAssistant.responses.dependency"):l(["标签","管理"])||r(["tag","management"])?t("aiAssistant.responses.tagManagement"):l(["报告","生成"])||r(["report","generate"])?t("aiAssistant.responses.reportGeneration"):l(["时序","管理"])||r(["sequence","management"])?t("aiAssistant.responses.sequenceManagement"):l(["智能体","agent"])||r(["agent","ai"])?t("aiAssistant.responses.aiAgent"):t("aiAssistant.responses.default")},L=()=>{p([{id:"1",content:t("aiAssistant.chatCleared"),isUser:!1,timestamp:new Date}]),g(!1)},V=i=>{h(i)},H=i=>{const n=t("common.locale")==="zh-CN"?"zh-CN":"en-US";return i.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"})};return e.jsxs(fs,{$isDark:a,children:[e.jsx($s,{$isDark:a,children:e.jsxs(_,{justify:"space-between",align:"middle",children:[e.jsxs(A,{children:[e.jsx(ls,{level:2,style:{margin:0,color:a?"#ffffff":"#262626"},children:e.jsxs(d,{children:[e.jsx(G,{style:{color:a?"#177ddc":"#1890ff"}}),t("aiAssistant.title"),e.jsx(Y,{count:"Beta",style:{backgroundColor:"#52c41a",fontSize:12}})]})}),e.jsx(cs,{style:{marginTop:8,marginBottom:0,fontSize:16,color:a?"#8c8c8c":"#666666"},children:t("aiAssistant.subtitle")})]}),e.jsx(A,{children:e.jsxs(d,{children:[e.jsx(v,{title:t("aiAssistant.clear"),children:e.jsx(m,{icon:e.jsx(W,{}),onClick:L,style:{color:a?"#ffffff":void 0,borderColor:a?"#434343":void 0,backgroundColor:a?"transparent":void 0},children:t("aiAssistant.clear")})}),e.jsx(v,{title:t("common.refresh"),children:e.jsx(m,{icon:e.jsx(F,{}),onClick:()=>window.location.reload(),style:{color:a?"#ffffff":void 0,borderColor:a?"#434343":void 0,backgroundColor:a?"transparent":void 0},children:t("common.refresh")})})]})})]})}),e.jsx(xs,{children:e.jsxs(ps,{$isDark:a,children:[s.length<=1&&e.jsxs(hs,{$isDark:a,children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{children:[e.jsx(J,{style:{color:"#faad14"}}),e.jsxs($,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:[t("aiAssistant.suggestions"),"："]})]})}),e.jsx("div",{children:P.map((i,n)=>e.jsx(ms,{icon:e.jsx(O,{}),color:"blue",$isDark:a,onClick:()=>V(i),children:i},n))}),e.jsx(Q,{style:{borderColor:a?"#303030":"#f0f0f0"}})]}),e.jsxs(gs,{$isDark:a,children:[s.length===0?e.jsx(w,{description:e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:t("aiAssistant.emptyMessage")}),image:w.PRESENTED_IMAGE_SIMPLE}):s.map(i=>e.jsx(U,{isUser:i.isUser,children:e.jsxs(R,{isUser:i.isUser,children:[e.jsx(C,{icon:i.isUser?e.jsx(X,{}):e.jsx(S,{}),style:{backgroundColor:i.isUser?a?"#177ddc":"#1890ff":"#52c41a",flexShrink:0}}),e.jsxs("div",{children:[e.jsx(T,{isUser:i.isUser,$isDark:a,children:e.jsx("div",{style:{whiteSpace:"pre-wrap",lineHeight:1.6},children:i.content})}),e.jsx("div",{style:{fontSize:12,color:a?"#8c8c8c":"#999",marginTop:4,textAlign:i.isUser?"right":"left"},children:e.jsxs(d,{size:4,children:[e.jsx(Z,{}),H(i.timestamp)]})})]})]})},i.id)),M&&e.jsx(U,{isUser:!1,children:e.jsxs(R,{isUser:!1,children:[e.jsx(C,{icon:e.jsx(S,{}),style:{backgroundColor:"#52c41a"}}),e.jsx(T,{isUser:!1,$isDark:a,children:e.jsxs(d,{children:[e.jsx(ss,{size:"small"}),e.jsx($,{type:"secondary",style:{color:a?"#8c8c8c":"#666666"},children:t("aiAssistant.thinking")})]})})]})}),e.jsx("div",{ref:D})]}),e.jsxs(us,{$isDark:a,children:[e.jsx(ds,{value:u,onChange:i=>b(i.target.value),placeholder:t("aiAssistant.chatPlaceholder"),autoSize:{minRows:1,maxRows:4},onPressEnter:i=>{i.ctrlKey&&h()},style:{flex:1}}),e.jsx(m,{type:"primary",icon:e.jsx(ts,{}),loading:I,onClick:()=>h(),disabled:!u.trim(),style:{height:"auto",minHeight:32},children:t("aiAssistant.send")})]}),e.jsx("div",{style:{marginTop:8,textAlign:"center"},children:e.jsx($,{type:"secondary",style:{fontSize:12,color:a?"#8c8c8c":"#666666"},children:e.jsxs(d,{children:[e.jsx(is,{}),t("aiAssistant.sendShortcut")]})})})]})})]})};export{zs as default};
