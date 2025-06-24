import{u as H,c as V,j as e,d as n}from"./index-CLn_jbkO.js";import{r as c,K as q,d as G,C as v,T as _,k as d,ag as O,N as Y,v as A,B as m,a8 as F,o as J,ah as Q,ai as W,aj as X,ak as w,A as C,i as Z,al as S,a4 as ss,O as es,ac as ts,am as as,g as is,j as rs,u as ns}from"./antd-CtXjdSWW.js";import{s as os}from"./index-Daowydkz.js";import"./vendor-DJG_os-6.js";const{Title:ls,Paragraph:cs,Text:$}=_,{TextArea:ds}=ts,fs=n.div`
  padding: 24px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background: ${s=>s.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,xs=n.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,ps=n(rs)`
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
`,gs=n.div`
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
`,U=n.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: ${s=>s.isUser?"flex-end":"flex-start"};
`,R=n.div`
  max-width: 70%;
  display: flex;
  align-items: flex-start;
  flex-direction: ${s=>s.isUser?"row-reverse":"row"};
  gap: 8px;
`,T=n.div`
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
`,us=n.div`
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
`,hs=n.div`
  margin-bottom: 16px;
  padding: 16px;
  background: ${s=>s.$isDark?"#1f1f1f":"#f8f9fa"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #e8e8e8"};
  border-radius: 8px;
  transition: all 0.3s ease;
`,ms=n(ns)`
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
`,$s=n.div`
  margin-bottom: 24px;
  padding: 24px;
  background: ${s=>s.$isDark?"#141414":"#ffffff"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  border-radius: 8px;
  box-shadow: ${s=>s.$isDark?"0 2px 8px rgba(255, 255, 255, 0.05)":"0 2px 8px rgba(0, 0, 0, 0.06)"};
  transition: all 0.3s ease;
`,Ds=()=>{const[s,p]=c.useState([]),[u,b]=c.useState(""),[I,k]=c.useState(!1),[M,j]=c.useState(!1),[y,g]=c.useState(!1),D=c.useRef(null),{t}=H(["common"]),{currentTheme:E}=V(a=>a.theme);q.useToken();const i=E==="dark";c.useEffect(()=>{os(t("aiAssistant:title"));const a={id:"1",content:t("dashboard:welcome"),isUser:!1,timestamp:new Date};p([a]),g(!1)},[]),c.useEffect(()=>{y&&P()},[s,y]);const P=()=>{var a;(a=D.current)==null||a.scrollIntoView({behavior:"smooth"})},z=[t("aiAssistant:suggestions.createPlane"),t("aiAssistant:suggestions.entityRelation"),t("aiAssistant:suggestions.healthMonitor"),t("aiAssistant:suggestions.planeDependency"),t("aiAssistant:suggestions.tagManagement"),t("aiAssistant:suggestions.systemReport")],h=async a=>{const o=a||u.trim();if(!o)return;const l={id:Date.now().toString(),content:o,isUser:!0,timestamp:new Date};p(r=>[...r,l]),b(""),k(!0),j(!0),g(!0),setTimeout(()=>{const r=B(o),f={id:(Date.now()+1).toString(),content:r,isUser:!1,timestamp:new Date};p(x=>[...x,f]),k(!1),j(!1),g(!0)},1500+Math.random()*1e3)},B=a=>{const o=a.toLowerCase(),l=f=>f.some(x=>o.includes(x)),r=f=>f.some(x=>o.includes(x));return l(["平面","创建"])||r(["plane","create"])?t("aiAssistant:responses.createPlane"):l(["实体","关系"])||r(["entity","relation"])?t("aiAssistant:responses.entityRelation"):l(["健康度","监控"])||r(["health","monitor"])?t("aiAssistant:responses.healthMonitor"):l(["依赖","配置"])||r(["dependency","config"])?t("aiAssistant:responses.dependency"):l(["标签","管理"])||r(["tag","management"])?t("aiAssistant:responses.tagManagement"):l(["报告","生成"])||r(["report","generate"])?t("aiAssistant:responses.reportGeneration"):l(["时序","管理"])||r(["sequence","management"])?t("aiAssistant:responses.sequenceManagement"):l(["智能体","agent"])||r(["agent","ai"])?t("aiAssistant:responses.aiAgent"):t("aiAssistant:responses.default")},K=()=>{p([{id:"1",content:t("aiAssistant:chatCleared"),isUser:!1,timestamp:new Date}]),g(!1)},L=a=>{h(a)},N=a=>{const o=t("common:locale")==="zh-CN"?"zh-CN":"en-US";return a.toLocaleTimeString(o,{hour:"2-digit",minute:"2-digit"})};return e.jsxs(fs,{$isDark:i,children:[e.jsx($s,{$isDark:i,children:e.jsxs(G,{justify:"space-between",align:"middle",children:[e.jsxs(v,{children:[e.jsx(ls,{level:2,style:{margin:0,color:i?"#ffffff":"#262626"},children:e.jsxs(d,{children:[e.jsx(O,{style:{color:i?"#177ddc":"#1890ff"}}),t("aiAssistant:title"),e.jsx(Y,{count:"Beta",style:{backgroundColor:"#52c41a",fontSize:12}})]})}),e.jsx(cs,{style:{marginTop:8,marginBottom:0,fontSize:16,color:i?"#8c8c8c":"#666666"},children:t("aiAssistant:subtitle")})]}),e.jsx(v,{children:e.jsxs(d,{children:[e.jsx(A,{title:t("aiAssistant:clear"),children:e.jsx(m,{icon:e.jsx(F,{}),onClick:K,style:{color:i?"#ffffff":void 0,borderColor:i?"#434343":void 0,backgroundColor:i?"transparent":void 0},children:t("aiAssistant:clear")})}),e.jsx(A,{title:t("common:refresh"),children:e.jsx(m,{icon:e.jsx(J,{}),onClick:()=>window.location.reload(),style:{color:i?"#ffffff":void 0,borderColor:i?"#434343":void 0,backgroundColor:i?"transparent":void 0},children:t("common:refresh")})})]})})]})}),e.jsx(xs,{children:e.jsxs(ps,{$isDark:i,children:[s.length<=1&&e.jsxs(hs,{$isDark:i,children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{children:[e.jsx(Q,{style:{color:"#faad14"}}),e.jsxs($,{strong:!0,style:{color:i?"#ffffff":"#262626"},children:[t("aiAssistant:suggestiondescription"),"："]})]})}),e.jsx("div",{children:z.map((a,o)=>e.jsx(ms,{icon:e.jsx(W,{}),color:"blue",$isDark:i,onClick:()=>L(a),children:a},o))}),e.jsx(X,{style:{borderColor:i?"#303030":"#f0f0f0"}})]}),e.jsxs(gs,{$isDark:i,children:[s.length===0?e.jsx(w,{description:e.jsx("span",{style:{color:i?"#8c8c8c":"#666666"},children:t("aiAssistant:emptyMessage")}),image:w.PRESENTED_IMAGE_SIMPLE}):s.map(a=>e.jsx(U,{isUser:a.isUser,children:e.jsxs(R,{isUser:a.isUser,children:[e.jsx(C,{icon:a.isUser?e.jsx(Z,{}):e.jsx(S,{}),style:{backgroundColor:a.isUser?i?"#177ddc":"#1890ff":"#52c41a",flexShrink:0}}),e.jsxs("div",{children:[e.jsx(T,{isUser:a.isUser,$isDark:i,children:e.jsx("div",{style:{whiteSpace:"pre-wrap",lineHeight:1.6},children:a.content})}),e.jsx("div",{style:{fontSize:12,color:i?"#8c8c8c":"#999",marginTop:4,textAlign:a.isUser?"right":"left"},children:e.jsxs(d,{size:4,children:[e.jsx(ss,{}),N(a.timestamp)]})})]})]})},a.id)),M&&e.jsx(U,{isUser:!1,children:e.jsxs(R,{isUser:!1,children:[e.jsx(C,{icon:e.jsx(S,{}),style:{backgroundColor:"#52c41a"}}),e.jsx(T,{isUser:!1,$isDark:i,children:e.jsxs(d,{children:[e.jsx(es,{size:"small"}),e.jsx($,{type:"secondary",style:{color:i?"#8c8c8c":"#666666"},children:t("aiAssistant:thinking")})]})})]})}),e.jsx("div",{ref:D})]}),e.jsxs(us,{$isDark:i,children:[e.jsx(ds,{value:u,onChange:a=>b(a.target.value),placeholder:t("aiAssistant:chatPlaceholder"),autoSize:{minRows:1,maxRows:4},onPressEnter:a=>{a.ctrlKey&&h()},style:{flex:1}}),e.jsx(m,{type:"primary",icon:e.jsx(as,{}),loading:I,onClick:()=>h(),disabled:!u.trim(),style:{height:"auto",minHeight:32},children:t("aiAssistant:send")})]}),e.jsx("div",{style:{marginTop:8,textAlign:"center"},children:e.jsx($,{type:"secondary",style:{fontSize:12,color:i?"#8c8c8c":"#666666"},children:e.jsxs(d,{children:[e.jsx(is,{}),t("aiAssistant:sendShortcut")]})})})]})})]})};export{Ds as default};
