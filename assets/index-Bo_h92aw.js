import{u as V,c as G,j as e,d as l}from"./index-CCrQ40Eo.js";import{r as c,ak as H,d as v,C as m,T as Y,j as d,al as _,u as w,B as $,ac as F,n as J,am as O,an as Q,ao as W,ap as C,A as S,h as X,aq as U,P as Z,Y as ss,ag as es,ar as ts,g as is,i as as,t as rs}from"./antd-DB_1XVWl.js";import{s as ns}from"./index-Daowydkz.js";import"./vendor-DJG_os-6.js";const{Title:os,Paragraph:ls,Text:b}=Y,{TextArea:cs}=es,ds=l.div`
  padding: 24px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background: ${s=>s.$isDark?"#000000":"#f5f5f5"};
  transition: all 0.3s ease;
`,fs=l.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,xs=l(as)`
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
`,gs=l.div`
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
`,R=l.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: ${s=>s.isUser?"flex-end":"flex-start"};
`,T=l.div`
  max-width: 70%;
  display: flex;
  align-items: flex-start;
  flex-direction: ${s=>s.isUser?"row-reverse":"row"};
  gap: 8px;
`,I=l.div`
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
`,ps=l.div`
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
`,us=l.div`
  margin-bottom: 16px;
  padding: 16px;
  background: ${s=>s.$isDark?"#1f1f1f":"#f8f9fa"};
  border: ${s=>s.$isDark?"1px solid #303030":"1px solid #e8e8e8"};
  border-radius: 8px;
  transition: all 0.3s ease;
`,hs=l(rs)`
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
`,js=()=>{const[s,g]=c.useState([]),[u,k]=c.useState(""),[M,j]=c.useState(!1),[E,y]=c.useState(!1),[D,p]=c.useState(!1),A=c.useRef(null),{t}=V(["common"]),{currentTheme:P}=G(i=>i.theme);H.useToken();const a=P==="dark";c.useEffect(()=>{ns(t("aiAssistant:title"));const i={id:"1",content:t("dashboard:welcome"),isUser:!1,timestamp:new Date};g([i]),p(!1)},[]),c.useEffect(()=>{D&&z()},[s,D]);const z=()=>{var i;(i=A.current)==null||i.scrollIntoView({behavior:"smooth"})},B=[t("aiAssistant:suggestions.createPlane"),t("aiAssistant:suggestions.entityRelation"),t("aiAssistant:suggestions.healthMonitor"),t("aiAssistant:suggestions.planeDependency"),t("aiAssistant:suggestions.tagManagement"),t("aiAssistant:suggestions.systemReport")],h=async i=>{const n=i||u.trim();if(!n)return;const o={id:Date.now().toString(),content:n,isUser:!0,timestamp:new Date};g(r=>[...r,o]),k(""),j(!0),y(!0),p(!0),setTimeout(()=>{const r=L(n),f={id:(Date.now()+1).toString(),content:r,isUser:!1,timestamp:new Date};g(x=>[...x,f]),j(!1),y(!1),p(!0)},1500+Math.random()*1e3)},L=i=>{const n=i.toLowerCase(),o=f=>f.some(x=>n.includes(x)),r=f=>f.some(x=>n.includes(x));return o(["平面","创建"])||r(["plane","create"])?t("aiAssistant:responses.createPlane"):o(["实体","关系"])||r(["entity","relation"])?t("aiAssistant:responses.entityRelation"):o(["健康度","监控"])||r(["health","monitor"])?t("aiAssistant:responses.healthMonitor"):o(["依赖","配置"])||r(["dependency","config"])?t("aiAssistant:responses.dependency"):o(["标签","管理"])||r(["tag","management"])?t("aiAssistant:responses.tagManagement"):o(["报告","生成"])||r(["report","generate"])?t("aiAssistant:responses.reportGeneration"):o(["时序","管理"])||r(["sequence","management"])?t("aiAssistant:responses.sequenceManagement"):o(["智能体","agent"])||r(["agent","ai"])?t("aiAssistant:responses.aiAgent"):t("aiAssistant:responses.default")},q=()=>{g([{id:"1",content:t("aiAssistant:chatCleared"),isUser:!1,timestamp:new Date}]),p(!1)},K=i=>{h(i)},N=i=>{const n=t("common:locale")==="zh-CN"?"zh-CN":"en-US";return i.toLocaleTimeString(n,{hour:"2-digit",minute:"2-digit"})};return e.jsxs(ds,{$isDark:a,children:[e.jsxs(v,{justify:"space-between",align:"middle",style:{marginBottom:12},children:[e.jsx(m,{children:e.jsx(os,{level:2,style:{margin:0,color:a?"#ffffff":"#262626"},children:e.jsxs(d,{children:[e.jsx(_,{style:{color:a?"#177ddc":"#1890ff"}}),t("aiAssistant:title")]})})}),e.jsx(m,{children:e.jsxs(d,{children:[e.jsx(w,{title:t("aiAssistant:clear"),children:e.jsx($,{icon:e.jsx(F,{}),onClick:q,style:{color:a?"#ffffff":void 0,borderColor:a?"#434343":void 0,backgroundColor:a?"transparent":void 0},children:t("aiAssistant:clear")})}),e.jsx(w,{title:t("common:refresh"),children:e.jsx($,{icon:e.jsx(J,{}),onClick:()=>window.location.reload(),style:{color:a?"#ffffff":void 0,borderColor:a?"#434343":void 0,backgroundColor:a?"transparent":void 0},children:t("common:refresh")})})]})})]}),e.jsx(v,{style:{marginBottom:24},children:e.jsx(m,{span:24,children:e.jsx(ls,{style:{marginBottom:0,fontSize:16,color:a?"#8c8c8c":"#666666"},children:t("aiAssistant:subtitle")})})}),e.jsx(fs,{children:e.jsxs(xs,{$isDark:a,children:[s.length<=1&&e.jsxs(us,{$isDark:a,children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{children:[e.jsx(O,{style:{color:"#faad14"}}),e.jsxs(b,{strong:!0,style:{color:a?"#ffffff":"#262626"},children:[t("aiAssistant:suggestiondescription"),"："]})]})}),e.jsx("div",{children:B.map((i,n)=>e.jsx(hs,{icon:e.jsx(Q,{}),color:"blue",$isDark:a,onClick:()=>K(i),children:i},n))}),e.jsx(W,{style:{borderColor:a?"#303030":"#f0f0f0"}})]}),e.jsxs(gs,{$isDark:a,children:[s.length===0?e.jsx(C,{description:e.jsx("span",{style:{color:a?"#8c8c8c":"#666666"},children:t("aiAssistant:emptyMessage")}),image:C.PRESENTED_IMAGE_SIMPLE}):s.map(i=>e.jsx(R,{isUser:i.isUser,children:e.jsxs(T,{isUser:i.isUser,children:[e.jsx(S,{icon:i.isUser?e.jsx(X,{}):e.jsx(U,{}),style:{backgroundColor:i.isUser?a?"#177ddc":"#1890ff":"#52c41a",flexShrink:0}}),e.jsxs("div",{children:[e.jsx(I,{isUser:i.isUser,$isDark:a,children:e.jsx("div",{style:{whiteSpace:"pre-wrap",lineHeight:1.6},children:i.content})}),e.jsx("div",{style:{fontSize:12,color:a?"#8c8c8c":"#999",marginTop:4,textAlign:i.isUser?"right":"left"},children:e.jsxs(d,{size:4,children:[e.jsx(Z,{}),N(i.timestamp)]})})]})]})},i.id)),E&&e.jsx(R,{isUser:!1,children:e.jsxs(T,{isUser:!1,children:[e.jsx(S,{icon:e.jsx(U,{}),style:{backgroundColor:"#52c41a"}}),e.jsx(I,{isUser:!1,$isDark:a,children:e.jsxs(d,{children:[e.jsx(ss,{size:"small"}),e.jsx(b,{type:"secondary",style:{color:a?"#8c8c8c":"#666666"},children:t("aiAssistant:thinking")})]})})]})}),e.jsx("div",{ref:A})]}),e.jsxs(ps,{$isDark:a,children:[e.jsx(cs,{value:u,onChange:i=>k(i.target.value),placeholder:t("aiAssistant:chatPlaceholder"),autoSize:{minRows:1,maxRows:4},onPressEnter:i=>{i.ctrlKey&&h()},style:{flex:1}}),e.jsx($,{type:"primary",icon:e.jsx(ts,{}),loading:M,onClick:()=>h(),disabled:!u.trim(),style:{height:"auto",minHeight:32},children:t("aiAssistant:send")})]}),e.jsx("div",{style:{marginTop:8,textAlign:"center"},children:e.jsx(b,{type:"secondary",style:{fontSize:12,color:a?"#8c8c8c":"#666666"},children:e.jsxs(d,{children:[e.jsx(is,{}),t("aiAssistant:sendShortcut")]})})})]})})]})};export{js as default};
