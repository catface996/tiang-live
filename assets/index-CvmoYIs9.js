import{a as d,j as e}from"./react-D_ZWy-Ho.js";import{u as ge,aC as p,c as ue,S as m,n as k,B as u,ai as ye,aa as he,U as y,V as r,W as f,K as xe,bn as v,p as fe,aF as U,az as O,a1 as C,bg as je,ap as Se,ax as l,a3 as o,bo as V,_ as j,bp as D,d as h,T as b,a8 as ve,a9 as be,ah as P,a0 as Pe,o as Ie,a as Ce,Y as Te,bk as we}from"./react-dom-C5h-mI7H.js";import{u as ke}from"./index-CvekEljP.js";import{s as Re}from"./index-Daowydkz.js";import{S as Fe}from"./SearchFilterBar-ZQit0ro2.js";import"./vendor-VHja5XRA.js";import"./cytoscape-DXzeTOL3.js";import"./media-BPG7piku.js";import"./lodash-D08E6HgQ.js";import"./redux-CiqK6azd.js";import"./echarts-core-CW0Gv0IT.js";import"./antd-icons-CI4I6I7B.js";import"./dayjs-CrhenB4N.js";import"./emotion-BhZTwsuK.js";import"./mermaid-AggIEIwl.js";import"./d3-Dbz_rnoS.js";import"./i18n-CMVetavo.js";const{Title:Me,Paragraph:E,Text:H}=ue,{Option:n}=C,{TextArea:K}=O,ze=h.div`
  padding: 24px;
`,_e=h.div`
  margin-bottom: 24px;
`,I=h(j)`
  .ant-card-body {
    padding: 16px;
  }
`,Ae=h(j)`
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;h.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;const $e=h.div`
  background: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,ts=()=>{var B,q,N;const{t:s}=ge(),{currentTheme:L}=ke(t=>t.theme),Y=L==="dark"?"#ffffff":"#1890ff",[qe,Ne]=d.useState(!1),[J,S]=d.useState(!1),[W,R]=d.useState(!1),[F,M]=d.useState(null),[i,G]=d.useState(null),[Q,X]=d.useState(""),[Z,ee]=d.useState("all"),[se,te]=d.useState("all"),[ie,ae]=d.useState("all"),[x]=p.useForm();d.useEffect(()=>{Re(s("systemSettings.prompts.title"))},[s]);const g=[{id:"1",name:"代码审查助手",category:"开发工具",description:"帮助开发者进行代码审查，识别潜在问题和改进建议",content:`你是一个专业的代码审查专家。请仔细审查以下代码，并提供详细的反馈：

代码语言：{language}
代码内容：
{code}

请从以下几个方面进行审查：
1. 代码质量和可读性
2. 性能优化建议
3. 安全性问题
4. 最佳实践遵循情况
5. 潜在的bug或错误

请提供具体的改进建议和修改方案。`,variables:["language","code"],tags:["代码审查","开发","质量控制"],language:"zh-CN",difficulty:"intermediate",rating:4.8,usageCount:1247,isPublic:!0,isFavorite:!0,createdBy:"开发团队",createdAt:"2024-05-15",lastModified:"2024-06-10",lastUsed:"2024-06-15 14:20:00",version:"1.2"},{id:"2",name:"系统故障诊断",category:"运维工具",description:"协助运维人员诊断系统故障，提供解决方案",content:`你是一个经验丰富的系统运维专家。现在需要你帮助诊断以下系统故障：

系统类型：{system_type}
故障现象：{symptoms}
错误日志：{error_logs}
系统环境：{environment}

请按照以下步骤进行故障诊断：
1. 分析故障现象和可能原因
2. 检查相关系统组件和依赖
3. 提供详细的排查步骤
4. 给出具体的解决方案
5. 建议预防措施

请提供清晰的诊断报告和操作指南。`,variables:["system_type","symptoms","error_logs","environment"],tags:["故障诊断","运维","系统维护"],language:"zh-CN",difficulty:"advanced",rating:4.9,usageCount:856,isPublic:!0,isFavorite:!1,createdBy:"运维团队",createdAt:"2024-05-20",lastModified:"2024-06-12",lastUsed:"2024-06-15 13:45:00",version:"1.1"},{id:"3",name:"业务需求分析",category:"产品管理",description:"帮助产品经理分析和整理业务需求",content:`你是一个资深的产品经理和业务分析师。请帮助分析以下业务需求：

需求背景：{background}
目标用户：{target_users}
业务目标：{business_goals}
功能描述：{feature_description}

请从以下维度进行需求分析：
1. 需求合理性和可行性评估
2. 用户价值和业务价值分析
3. 技术实现复杂度评估
4. 风险识别和应对策略
5. 优先级建议和排期规划

请提供结构化的需求分析报告。`,variables:["background","target_users","business_goals","feature_description"],tags:["需求分析","产品管理","业务分析"],language:"zh-CN",difficulty:"intermediate",rating:4.6,usageCount:634,isPublic:!0,isFavorite:!0,createdBy:"产品团队",createdAt:"2024-06-01",lastModified:"2024-06-14",lastUsed:"2024-06-15 12:30:00",version:"1.0"},{id:"4",name:"技术文档生成",category:"文档工具",description:"自动生成技术文档和API说明",content:`你是一个专业的技术文档编写专家。请根据以下信息生成完整的技术文档：

项目名称：{project_name}
功能模块：{module_name}
技术栈：{tech_stack}
API接口：{api_details}
使用场景：{use_cases}

请生成包含以下内容的技术文档：
1. 项目概述和架构说明
2. 功能模块详细介绍
3. API接口文档和示例
4. 安装和配置指南
5. 使用示例和最佳实践
6. 常见问题和故障排除

请确保文档结构清晰，内容详实，易于理解。`,variables:["project_name","module_name","tech_stack","api_details","use_cases"],tags:["技术文档","文档生成","API文档"],language:"zh-CN",difficulty:"beginner",rating:4.4,usageCount:423,isPublic:!1,isFavorite:!1,createdBy:"技术团队",createdAt:"2024-06-05",lastModified:"2024-06-13",lastUsed:"2024-06-15 11:15:00",version:"1.0"}],T={开发工具:{color:"blue",icon:e.jsx(we,{})},运维工具:{color:"green",icon:e.jsx(Te,{})},产品管理:{color:"orange",icon:e.jsx(Ce,{})},文档工具:{color:"purple",icon:e.jsx(k,{})},客服助手:{color:"cyan",icon:e.jsx(Ie,{})},数据分析:{color:"red",icon:e.jsx(Pe,{})}},z={beginner:{name:"初级",color:"green"},intermediate:{name:"中级",color:"orange"},advanced:{name:"高级",color:"red"}},_=t=>({开发工具:"devTools",运维工具:"opsTools",产品管理:"productManagement",文档工具:"docTools",客服助手:"customerService",数据分析:"dataAnalysis"})[t]||"devTools",re=()=>{M(null),x.resetFields(),S(!0)},le=t=>{M(t),x.setFieldsValue({name:t.name,category:t.category,description:t.description,content:t.content,language:t.language,difficulty:t.difficulty,isPublic:t.isPublic}),S(!0)},A=t=>{G(t),R(!0)},$=t=>{navigator.clipboard.writeText(t.content),P.success(s("systemSettings.prompts.messages.copySuccess"))},ne=t=>{P.success(s("systemSettings.prompts.messages.favoriteSuccess"))},oe=async()=>{try{const t=await x.validateFields();F?P.success(s("systemSettings.prompts.messages.updateSuccess")):P.success(s("systemSettings.prompts.messages.createSuccess")),S(!1),x.resetFields()}catch(t){console.error("表单验证失败:",t)}},ce=()=>g.map(t=>{const a=T[t.category],w=z[t.difficulty];return e.jsx(r,{xs:24,sm:12,lg:8,xl:6,children:e.jsxs(Ae,{title:e.jsxs(m,{children:[a==null?void 0:a.icon,e.jsx("span",{children:t.name}),t.isFavorite&&e.jsx(v,{style:{color:"#faad14"}})]}),extra:e.jsxs(m,{children:[e.jsx(b,{title:s("systemSettings.prompts.actions.copy"),children:e.jsx(u,{type:"link",icon:e.jsx(D,{}),size:"small",onClick:c=>{c.stopPropagation(),$(t)}})}),e.jsx(b,{title:t.isFavorite?s("systemSettings.prompts.actions.unfavorite"):s("systemSettings.prompts.actions.favorite"),children:e.jsx(u,{type:"link",icon:e.jsx(v,{}),size:"small",style:{color:t.isFavorite?"#faad14":void 0},onClick:c=>{c.stopPropagation(),ne(t.id)}})}),e.jsx(b,{title:s("systemSettings.prompts.actions.view"),children:e.jsx(u,{type:"link",icon:e.jsx(ve,{}),size:"small",onClick:c=>{c.stopPropagation(),A(t)}})}),e.jsx(b,{title:s("systemSettings.prompts.actions.edit"),children:e.jsx(u,{type:"link",icon:e.jsx(be,{}),size:"small",onClick:c=>{c.stopPropagation(),le(t)}})})]}),onClick:()=>A(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(m,{wrap:!0,children:[e.jsx(o,{color:a==null?void 0:a.color,icon:a==null?void 0:a.icon,children:s(`systemSettings.prompts.categories.${_(t.category)}`)}),e.jsx(o,{color:w==null?void 0:w.color,children:s(`systemSettings.prompts.difficulty.${t.difficulty}`)}),t.isPublic&&e.jsx(o,{color:"blue",children:s("systemSettings.prompts.status.public")})]})}),e.jsx(E,{ellipsis:{rows:2},style:{marginBottom:16,minHeight:40},children:t.description}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(y,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(V,{disabled:!0,value:t.rating,allowHalf:!0,style:{fontSize:12}}),e.jsx("div",{style:{fontSize:12,color:"#666"},children:t.rating})]})}),e.jsx(r,{span:12,children:e.jsx(f,{title:s("systemSettings.prompts.stats.usageCount"),value:t.usageCount,valueStyle:{fontSize:14}})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(m,{wrap:!0,children:[t.tags.slice(0,3).map(c=>e.jsx(o,{size:"small",children:c},c)),t.tags.length>3&&e.jsxs(o,{size:"small",children:["+",t.tags.length-3]})]})}),e.jsxs("div",{style:{fontSize:12,color:"#666"},children:[e.jsxs("div",{children:[s("systemSettings.prompts.detail.version"),": ",t.version]}),e.jsxs("div",{children:[s("systemSettings.prompts.detail.lastUsed"),": ",t.lastUsed]})]})]})},t.id)}),de=g.filter(t=>t.isPublic).length,me=g.filter(t=>t.isFavorite).length;g.reduce((t,a)=>t+a.usageCount,0);const pe=g.reduce((t,a)=>t+a.rating,0)/g.length;return e.jsxs(ze,{children:[e.jsx(_e,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(Me,{level:2,style:{margin:0},children:e.jsxs(m,{children:[e.jsx(k,{style:{color:Y}}),s("systemSettings.prompts.title")]})}),e.jsx(E,{style:{marginTop:8,marginBottom:0,fontSize:16},children:s("systemSettings.prompts.subtitle")})]}),e.jsxs(m,{children:[e.jsx(u,{icon:e.jsx(ye,{}),children:s("common.refresh")}),e.jsx(u,{type:"primary",icon:e.jsx(he,{}),onClick:re,children:s("systemSettings.prompts.createPrompt")})]})]})}),e.jsxs(y,{gutter:16,style:{marginBottom:24},children:[e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(I,{children:e.jsx(f,{title:s("systemSettings.prompts.stats.totalTemplates"),value:g.length,suffix:s("common.unit.count"),valueStyle:{color:"#1890ff"},prefix:e.jsx(k,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(I,{children:e.jsx(f,{title:s("systemSettings.prompts.stats.publicTemplates"),value:de,suffix:s("common.unit.count"),valueStyle:{color:"#52c41a"},prefix:e.jsx(xe,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(I,{children:e.jsx(f,{title:s("systemSettings.prompts.stats.favoriteTemplates"),value:me,suffix:s("common.unit.count"),valueStyle:{color:"#faad14"},prefix:e.jsx(v,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(I,{children:e.jsx(f,{title:s("systemSettings.prompts.stats.averageRating"),value:pe.toFixed(1),valueStyle:{color:"#722ed1"},prefix:e.jsx(fe,{})})})})]}),e.jsx(Fe,{searchValue:Q,onSearchChange:X,searchPlaceholder:s("systemSettings.prompts.search.placeholder"),filters:[{key:"category",value:Z,onChange:ee,placeholder:s("systemSettings.prompts.search.category"),width:120,options:[{value:"all",label:s("systemSettings.prompts.search.allCategories")},{value:"开发工具",label:s("systemSettings.prompts.categories.devTools")},{value:"运维工具",label:s("systemSettings.prompts.categories.opsTools")},{value:"产品管理",label:s("systemSettings.prompts.categories.productManagement")},{value:"文档工具",label:s("systemSettings.prompts.categories.docTools")},{value:"客服助手",label:s("systemSettings.prompts.categories.customerService")},{value:"数据分析",label:s("systemSettings.prompts.categories.dataAnalysis")}]},{key:"difficulty",value:se,onChange:te,placeholder:s("systemSettings.prompts.search.difficulty"),width:100,options:[{value:"all",label:s("systemSettings.prompts.search.allDifficulties")},{value:"beginner",label:s("systemSettings.prompts.difficulty.beginner")},{value:"intermediate",label:s("systemSettings.prompts.difficulty.intermediate")},{value:"advanced",label:s("systemSettings.prompts.difficulty.advanced")}]},{key:"status",value:ie,onChange:ae,placeholder:s("systemSettings.prompts.search.status"),width:100,options:[{value:"all",label:s("systemSettings.prompts.search.allStatuses")},{value:"public",label:s("systemSettings.prompts.status.public")},{value:"private",label:s("systemSettings.prompts.status.private")},{value:"favorite",label:s("systemSettings.prompts.status.favorite")}]}],onRefresh:()=>window.location.reload()}),e.jsx(y,{gutter:16,children:ce()}),e.jsx(U,{title:F?"编辑提示词模板":"创建提示词模板",open:J,onOk:oe,onCancel:()=>S(!1),width:800,children:e.jsxs(p,{form:x,layout:"vertical",initialValues:{language:"zh-CN",difficulty:"intermediate",isPublic:!1},children:[e.jsxs(y,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(p.Item,{name:"name",label:s("systemSettings.prompts.form.templateName"),rules:[{required:!0,message:s("systemSettings.prompts.form.templateNameRequired")}],children:e.jsx(O,{placeholder:s("systemSettings.prompts.form.templateNamePlaceholder")})})}),e.jsx(r,{span:12,children:e.jsx(p.Item,{name:"category",label:s("systemSettings.prompts.form.category"),rules:[{required:!0,message:s("systemSettings.prompts.form.categoryRequired")}],children:e.jsxs(C,{placeholder:s("systemSettings.prompts.form.categoryPlaceholder"),children:[e.jsx(n,{value:"开发工具",children:s("systemSettings.prompts.categories.devTools")}),e.jsx(n,{value:"运维工具",children:s("systemSettings.prompts.categories.opsTools")}),e.jsx(n,{value:"产品管理",children:s("systemSettings.prompts.categories.productManagement")}),e.jsx(n,{value:"文档工具",children:s("systemSettings.prompts.categories.docTools")}),e.jsx(n,{value:"客服助手",children:s("systemSettings.prompts.categories.customerService")}),e.jsx(n,{value:"数据分析",children:s("systemSettings.prompts.categories.dataAnalysis")})]})})})]}),e.jsx(p.Item,{name:"description",label:s("systemSettings.prompts.form.description"),rules:[{required:!0,message:s("systemSettings.prompts.form.descriptionRequired")}],children:e.jsx(K,{rows:2,placeholder:s("systemSettings.prompts.form.descriptionPlaceholder")})}),e.jsx(p.Item,{name:"content",label:s("systemSettings.prompts.form.content"),rules:[{required:!0,message:s("systemSettings.prompts.form.contentRequired")}],children:e.jsx(K,{rows:8,placeholder:s("systemSettings.prompts.form.contentPlaceholder")})}),e.jsxs(y,{gutter:16,children:[e.jsx(r,{span:8,children:e.jsx(p.Item,{name:"language",label:s("systemSettings.prompts.form.language"),rules:[{required:!0,message:s("systemSettings.prompts.form.languageRequired")}],children:e.jsxs(C,{placeholder:s("systemSettings.prompts.form.languagePlaceholder"),children:[e.jsx(n,{value:"zh-CN",children:"中文"}),e.jsx(n,{value:"en-US",children:"English"}),e.jsx(n,{value:"ja-JP",children:"日本語"})]})})}),e.jsx(r,{span:8,children:e.jsx(p.Item,{name:"difficulty",label:s("systemSettings.prompts.form.difficulty"),rules:[{required:!0,message:s("systemSettings.prompts.form.difficultyRequired")}],children:e.jsxs(C,{placeholder:s("systemSettings.prompts.search.difficulty"),children:[e.jsx(n,{value:"beginner",children:s("systemSettings.prompts.difficulty.beginner")}),e.jsx(n,{value:"intermediate",children:s("systemSettings.prompts.difficulty.intermediate")}),e.jsx(n,{value:"advanced",children:s("systemSettings.prompts.difficulty.advanced")})]})})}),e.jsx(r,{span:8,children:e.jsx(p.Item,{name:"isPublic",label:s("systemSettings.prompts.detail.isPublic"),valuePropName:"checked",children:e.jsx(je,{})})})]}),e.jsx(Se,{message:s("systemSettings.prompts.form.variableTip"),description:s("systemSettings.prompts.form.variableTipDescription"),type:"info",showIcon:!0,style:{marginTop:16}})]})}),e.jsx(U,{title:i==null?void 0:i.name,open:W,onCancel:()=>R(!1),footer:null,width:1e3,style:{top:20},children:i&&e.jsxs("div",{children:[e.jsxs(l,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(l.Item,{label:s("systemSettings.prompts.detail.templateName"),span:2,children:i.name}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.category"),children:e.jsx(o,{color:(B=T[i.category])==null?void 0:B.color,icon:(q=T[i.category])==null?void 0:q.icon,children:s(`systemSettings.prompts.categories.${_(i.category)}`)})}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.difficulty"),children:e.jsx(o,{color:(N=z[i.difficulty])==null?void 0:N.color,children:s(`systemSettings.prompts.difficulty.${i.difficulty}`)})}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.rating"),children:e.jsxs(m,{children:[e.jsx(V,{disabled:!0,value:i.rating,allowHalf:!0}),e.jsx(H,{children:i.rating})]})}),e.jsxs(l.Item,{label:s("systemSettings.prompts.detail.usageCount"),children:[i.usageCount,s("common.unit.times")]}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.language"),children:i.language}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.version"),children:i.version}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.status"),children:e.jsxs(m,{children:[i.isPublic&&e.jsx(o,{color:"blue",children:s("systemSettings.prompts.status.public")}),i.isFavorite&&e.jsx(o,{color:"gold",icon:e.jsx(v,{}),children:s("systemSettings.prompts.status.favorite")})]})}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.creator"),children:i.createdBy}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.createdAt"),children:i.createdAt}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.lastUsed"),children:i.lastUsed}),e.jsx(l.Item,{label:s("systemSettings.prompts.detail.description"),span:2,children:i.description})]}),e.jsxs(j,{title:s("systemSettings.prompts.detail.content"),style:{marginBottom:16},children:[e.jsx($e,{children:i.content}),e.jsx("div",{style:{marginTop:12,textAlign:"right"},children:e.jsx(u,{icon:e.jsx(D,{}),onClick:()=>$(i),children:s("systemSettings.prompts.actions.copy")})})]}),e.jsxs(y,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(j,{title:s("systemSettings.prompts.detail.variablesList"),size:"small",children:i.variables.length>0?e.jsx(m,{wrap:!0,children:i.variables.map(t=>e.jsx(o,{color:"blue",children:`{${t}}`},t))}):e.jsx(H,{type:"secondary",children:s("systemSettings.prompts.detail.noVariables")})})}),e.jsx(r,{span:12,children:e.jsx(j,{title:s("systemSettings.prompts.detail.tags"),size:"small",children:e.jsx(m,{wrap:!0,children:i.tags.map(t=>e.jsx(o,{children:t},t))})})})]})]})})]})};export{ts as default};
