import{a as c,j as e}from"./react-D_ZWy-Ho.js";import{u as me,aC as m,c as pe,S as d,n as w,B as y,ai as ge,aa as ue,U as u,V as r,W as f,K as he,bn as C,p as xe,aF as N,az as H,a1 as b,bg as ye,ap as fe,ax as l,a3 as o,bo as q,_ as j,bp as je,d as h,T as U,a8 as Se,a9 as ve,ah as T,a0 as be,o as Pe,a as Ie,Y as we,bk as Ce}from"./react-dom-C5h-mI7H.js";import{u as Te}from"./index-BS6KRDnO.js";import{s as Re}from"./index-Daowydkz.js";import{S as ke}from"./SearchFilterBar-ZQit0ro2.js";import"./vendor-VHja5XRA.js";import"./cytoscape-DXzeTOL3.js";import"./media-BPG7piku.js";import"./lodash-D08E6HgQ.js";import"./redux-CiqK6azd.js";import"./echarts-core-CW0Gv0IT.js";import"./antd-icons-CI4I6I7B.js";import"./dayjs-CrhenB4N.js";import"./emotion-BhZTwsuK.js";import"./mermaid-AggIEIwl.js";import"./d3-Dbz_rnoS.js";import"./i18n-CMVetavo.js";const{Title:Me,Paragraph:V,Text:D}=pe,{Option:n}=b,{TextArea:E}=H,_e=h.div`
  padding: 24px;
`,ze=h.div`
  margin-bottom: 24px;
`,v=h(j)`
  .ant-card-body {
    padding: 16px;
  }
`,Fe=h(j)`
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .ant-card-head {
    padding: 12px 16px;
    min-height: 57px;
    
    .ant-card-head-title {
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      width: 100%;
    }
    
    .ant-card-extra {
      padding: 0;
    }
    
    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      
      .title-left {
        flex: 1;
        min-width: 0; /* 允许文本截断 */
        
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      
      .title-right {
        flex-shrink: 0;
        margin-left: 8px;
      }
    }
  }
  
  .card-actions {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    
    .ant-btn {
      color: #666;
      
      &:hover {
        color: #1890ff;
        background-color: rgba(24, 144, 255, 0.1);
      }
    }
  }
`;h.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;const Ae=h.div`
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
`,tt=()=>{var A,$,B;const{t}=me(),{currentTheme:K}=Te(s=>s.theme),O=K==="dark"?"#ffffff":"#1890ff",[Be,Ne]=c.useState(!1),[L,S]=c.useState(!1),[Y,R]=c.useState(!1),[k,M]=c.useState(null),[i,J]=c.useState(null),[W,G]=c.useState(""),[Q,X]=c.useState("all"),[Z,ee]=c.useState("all"),[te,se]=c.useState("all"),[x]=m.useForm();c.useEffect(()=>{Re(t("systemSettings.prompts.title"))},[t]);const p=[{id:"1",name:"代码审查助手",category:"开发工具",description:"帮助开发者进行代码审查，识别潜在问题和改进建议",content:`你是一个专业的代码审查专家。请仔细审查以下代码，并提供详细的反馈：

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

请确保文档结构清晰，内容详实，易于理解。`,variables:["project_name","module_name","tech_stack","api_details","use_cases"],tags:["技术文档","文档生成","API文档"],language:"zh-CN",difficulty:"beginner",rating:4.4,usageCount:423,isPublic:!1,isFavorite:!1,createdBy:"技术团队",createdAt:"2024-06-05",lastModified:"2024-06-13",lastUsed:"2024-06-15 11:15:00",version:"1.0"}],P={开发工具:{color:"blue",icon:e.jsx(Ce,{})},运维工具:{color:"green",icon:e.jsx(we,{})},产品管理:{color:"orange",icon:e.jsx(Ie,{})},文档工具:{color:"purple",icon:e.jsx(w,{})},客服助手:{color:"cyan",icon:e.jsx(Pe,{})},数据分析:{color:"red",icon:e.jsx(be,{})}},_={beginner:{name:"初级",color:"green"},intermediate:{name:"中级",color:"orange"},advanced:{name:"高级",color:"red"}},z=s=>({开发工具:"devTools",运维工具:"opsTools",产品管理:"productManagement",文档工具:"docTools",客服助手:"customerService",数据分析:"dataAnalysis"})[s]||"devTools",ie=()=>{M(null),x.resetFields(),S(!0)},ae=s=>{M(s),x.setFieldsValue({name:s.name,category:s.category,description:s.description,content:s.content,language:s.language,difficulty:s.difficulty,isPublic:s.isPublic}),S(!0)},F=s=>{J(s),R(!0)},re=s=>{navigator.clipboard.writeText(s.content),T.success(t("systemSettings.prompts.messages.copySuccess"))},le=async()=>{try{const s=await x.validateFields();k?T.success(t("systemSettings.prompts.messages.updateSuccess")):T.success(t("systemSettings.prompts.messages.createSuccess")),S(!1),x.resetFields()}catch(s){console.error("表单验证失败:",s)}},ne=()=>p.map(s=>{const a=P[s.category],I=_[s.difficulty];return e.jsx(r,{xs:24,sm:24,md:12,lg:8,xl:8,children:e.jsxs(Fe,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(d,{children:[a==null?void 0:a.icon,e.jsx("span",{children:s.name})]})}),e.jsx("div",{className:"title-right",children:s.isFavorite&&e.jsx(C,{style:{color:"#faad14"}})})]}),onClick:()=>F(s),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{wrap:!0,children:[e.jsx(o,{color:a==null?void 0:a.color,icon:a==null?void 0:a.icon,children:t(`systemSettings.prompts.categories.${z(s.category)}`)}),e.jsx(o,{color:I==null?void 0:I.color,children:t(`systemSettings.prompts.difficulty.${s.difficulty}`)}),s.isPublic&&e.jsx(o,{color:"blue",children:t("systemSettings.prompts.status.public")})]})}),e.jsx(V,{ellipsis:{rows:2},style:{marginBottom:16,minHeight:40},children:s.description}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(u,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(q,{disabled:!0,value:s.rating,allowHalf:!0,style:{fontSize:12}}),e.jsx("div",{style:{fontSize:12,color:"#666"},children:s.rating})]})}),e.jsx(r,{span:12,children:e.jsx(f,{title:t("systemSettings.prompts.stats.usageCount"),value:s.usageCount,valueStyle:{fontSize:14}})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{wrap:!0,children:[s.tags.slice(0,3).map(g=>e.jsx(o,{size:"small",children:g},g)),s.tags.length>3&&e.jsxs(o,{size:"small",children:["+",s.tags.length-3]})]})}),e.jsxs("div",{style:{fontSize:12,color:"#666"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[e.jsxs("span",{children:[t("systemSettings.prompts.detail.version"),":"]}),e.jsx("span",{children:s.version})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[t("systemSettings.prompts.detail.lastUsed"),":"]}),e.jsx("span",{children:s.lastUsed})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(d,{children:[e.jsx(U,{title:t("systemSettings.prompts.actions.view"),children:e.jsx(y,{type:"text",icon:e.jsx(Se,{}),size:"small",onClick:g=>{g.stopPropagation(),F(s)}})}),e.jsx(U,{title:t("systemSettings.prompts.actions.edit"),children:e.jsx(y,{type:"text",icon:e.jsx(ve,{}),size:"small",onClick:g=>{g.stopPropagation(),ae(s)}})})]})})]})},s.id)}),oe=p.filter(s=>s.isPublic).length,ce=p.filter(s=>s.isFavorite).length;p.reduce((s,a)=>s+a.usageCount,0);const de=p.reduce((s,a)=>s+a.rating,0)/p.length;return e.jsxs(_e,{children:[e.jsx(ze,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(Me,{level:2,style:{margin:0},children:e.jsxs(d,{children:[e.jsx(w,{style:{color:O}}),t("systemSettings.prompts.title")]})}),e.jsx(V,{style:{marginTop:8,marginBottom:0,fontSize:16},children:t("systemSettings.prompts.subtitle")})]}),e.jsxs(d,{children:[e.jsx(y,{icon:e.jsx(ge,{}),children:t("common.refresh")}),e.jsx(y,{type:"primary",icon:e.jsx(ue,{}),onClick:ie,children:t("systemSettings.prompts.createPrompt")})]})]})}),e.jsxs(u,{gutter:16,style:{marginBottom:24},children:[e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(v,{children:e.jsx(f,{title:t("systemSettings.prompts.stats.totalTemplates"),value:p.length,suffix:t("common.unit.count"),valueStyle:{color:"#1890ff"},prefix:e.jsx(w,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(v,{children:e.jsx(f,{title:t("systemSettings.prompts.stats.publicTemplates"),value:oe,suffix:t("common.unit.count"),valueStyle:{color:"#52c41a"},prefix:e.jsx(he,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(v,{children:e.jsx(f,{title:t("systemSettings.prompts.stats.favoriteTemplates"),value:ce,suffix:t("common.unit.count"),valueStyle:{color:"#faad14"},prefix:e.jsx(C,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(v,{children:e.jsx(f,{title:t("systemSettings.prompts.stats.averageRating"),value:de.toFixed(1),valueStyle:{color:"#722ed1"},prefix:e.jsx(xe,{})})})})]}),e.jsx(ke,{searchValue:W,onSearchChange:G,searchPlaceholder:t("systemSettings.prompts.search.placeholder"),filters:[{key:"category",value:Q,onChange:X,placeholder:t("systemSettings.prompts.search.category"),width:120,options:[{value:"all",label:t("systemSettings.prompts.search.allCategories")},{value:"开发工具",label:t("systemSettings.prompts.categories.devTools")},{value:"运维工具",label:t("systemSettings.prompts.categories.opsTools")},{value:"产品管理",label:t("systemSettings.prompts.categories.productManagement")},{value:"文档工具",label:t("systemSettings.prompts.categories.docTools")},{value:"客服助手",label:t("systemSettings.prompts.categories.customerService")},{value:"数据分析",label:t("systemSettings.prompts.categories.dataAnalysis")}]},{key:"difficulty",value:Z,onChange:ee,placeholder:t("systemSettings.prompts.search.difficulty"),width:100,options:[{value:"all",label:t("systemSettings.prompts.search.allDifficulties")},{value:"beginner",label:t("systemSettings.prompts.difficulty.beginner")},{value:"intermediate",label:t("systemSettings.prompts.difficulty.intermediate")},{value:"advanced",label:t("systemSettings.prompts.difficulty.advanced")}]},{key:"status",value:te,onChange:se,placeholder:t("systemSettings.prompts.search.status"),width:100,options:[{value:"all",label:t("systemSettings.prompts.search.allStatuses")},{value:"public",label:t("systemSettings.prompts.status.public")},{value:"private",label:t("systemSettings.prompts.status.private")},{value:"favorite",label:t("systemSettings.prompts.status.favorite")}]}],onRefresh:()=>window.location.reload()}),e.jsx(u,{gutter:[16,16],children:ne()}),e.jsx(N,{title:k?"编辑提示词模板":"创建提示词模板",open:L,onOk:le,onCancel:()=>S(!1),width:800,children:e.jsxs(m,{form:x,layout:"vertical",initialValues:{language:"zh-CN",difficulty:"intermediate",isPublic:!1},children:[e.jsxs(u,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(m.Item,{name:"name",label:t("systemSettings.prompts.form.templateName"),rules:[{required:!0,message:t("systemSettings.prompts.form.templateNameRequired")}],children:e.jsx(H,{placeholder:t("systemSettings.prompts.form.templateNamePlaceholder")})})}),e.jsx(r,{span:12,children:e.jsx(m.Item,{name:"category",label:t("systemSettings.prompts.form.category"),rules:[{required:!0,message:t("systemSettings.prompts.form.categoryRequired")}],children:e.jsxs(b,{placeholder:t("systemSettings.prompts.form.categoryPlaceholder"),children:[e.jsx(n,{value:"开发工具",children:t("systemSettings.prompts.categories.devTools")}),e.jsx(n,{value:"运维工具",children:t("systemSettings.prompts.categories.opsTools")}),e.jsx(n,{value:"产品管理",children:t("systemSettings.prompts.categories.productManagement")}),e.jsx(n,{value:"文档工具",children:t("systemSettings.prompts.categories.docTools")}),e.jsx(n,{value:"客服助手",children:t("systemSettings.prompts.categories.customerService")}),e.jsx(n,{value:"数据分析",children:t("systemSettings.prompts.categories.dataAnalysis")})]})})})]}),e.jsx(m.Item,{name:"description",label:t("systemSettings.prompts.form.description"),rules:[{required:!0,message:t("systemSettings.prompts.form.descriptionRequired")}],children:e.jsx(E,{rows:2,placeholder:t("systemSettings.prompts.form.descriptionPlaceholder")})}),e.jsx(m.Item,{name:"content",label:t("systemSettings.prompts.form.content"),rules:[{required:!0,message:t("systemSettings.prompts.form.contentRequired")}],children:e.jsx(E,{rows:8,placeholder:t("systemSettings.prompts.form.contentPlaceholder")})}),e.jsxs(u,{gutter:16,children:[e.jsx(r,{span:8,children:e.jsx(m.Item,{name:"language",label:t("systemSettings.prompts.form.language"),rules:[{required:!0,message:t("systemSettings.prompts.form.languageRequired")}],children:e.jsxs(b,{placeholder:t("systemSettings.prompts.form.languagePlaceholder"),children:[e.jsx(n,{value:"zh-CN",children:"中文"}),e.jsx(n,{value:"en-US",children:"English"}),e.jsx(n,{value:"ja-JP",children:"日本語"})]})})}),e.jsx(r,{span:8,children:e.jsx(m.Item,{name:"difficulty",label:t("systemSettings.prompts.form.difficulty"),rules:[{required:!0,message:t("systemSettings.prompts.form.difficultyRequired")}],children:e.jsxs(b,{placeholder:t("systemSettings.prompts.search.difficulty"),children:[e.jsx(n,{value:"beginner",children:t("systemSettings.prompts.difficulty.beginner")}),e.jsx(n,{value:"intermediate",children:t("systemSettings.prompts.difficulty.intermediate")}),e.jsx(n,{value:"advanced",children:t("systemSettings.prompts.difficulty.advanced")})]})})}),e.jsx(r,{span:8,children:e.jsx(m.Item,{name:"isPublic",label:t("systemSettings.prompts.detail.isPublic"),valuePropName:"checked",children:e.jsx(ye,{})})})]}),e.jsx(fe,{message:t("systemSettings.prompts.form.variableTip"),description:t("systemSettings.prompts.form.variableTipDescription"),type:"info",showIcon:!0,style:{marginTop:16}})]})}),e.jsx(N,{title:i==null?void 0:i.name,open:Y,onCancel:()=>R(!1),footer:null,width:1e3,style:{top:20},children:i&&e.jsxs("div",{children:[e.jsxs(l,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(l.Item,{label:t("systemSettings.prompts.detail.templateName"),span:2,children:i.name}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.category"),children:e.jsx(o,{color:(A=P[i.category])==null?void 0:A.color,icon:($=P[i.category])==null?void 0:$.icon,children:t(`systemSettings.prompts.categories.${z(i.category)}`)})}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.difficulty"),children:e.jsx(o,{color:(B=_[i.difficulty])==null?void 0:B.color,children:t(`systemSettings.prompts.difficulty.${i.difficulty}`)})}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.rating"),children:e.jsxs(d,{children:[e.jsx(q,{disabled:!0,value:i.rating,allowHalf:!0}),e.jsx(D,{children:i.rating})]})}),e.jsxs(l.Item,{label:t("systemSettings.prompts.detail.usageCount"),children:[i.usageCount,t("common.unit.times")]}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.language"),children:i.language}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.version"),children:i.version}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.status"),children:e.jsxs(d,{children:[i.isPublic&&e.jsx(o,{color:"blue",children:t("systemSettings.prompts.status.public")}),i.isFavorite&&e.jsx(o,{color:"gold",icon:e.jsx(C,{}),children:t("systemSettings.prompts.status.favorite")})]})}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.creator"),children:i.createdBy}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.createdAt"),children:i.createdAt}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.lastUsed"),children:i.lastUsed}),e.jsx(l.Item,{label:t("systemSettings.prompts.detail.description"),span:2,children:i.description})]}),e.jsxs(j,{title:t("systemSettings.prompts.detail.content"),style:{marginBottom:16},children:[e.jsx(Ae,{children:i.content}),e.jsx("div",{style:{marginTop:12,textAlign:"right"},children:e.jsx(y,{icon:e.jsx(je,{}),onClick:()=>re(i),children:t("systemSettings.prompts.actions.copy")})})]}),e.jsxs(u,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(j,{title:t("systemSettings.prompts.detail.variablesList"),size:"small",children:i.variables.length>0?e.jsx(d,{wrap:!0,children:i.variables.map(s=>e.jsx(o,{color:"blue",children:`{${s}}`},s))}):e.jsx(D,{type:"secondary",children:t("systemSettings.prompts.detail.noVariables")})})}),e.jsx(r,{span:12,children:e.jsx(j,{title:t("systemSettings.prompts.detail.tags"),size:"small",children:e.jsx(d,{wrap:!0,children:i.tags.map(s=>e.jsx(o,{children:s},s))})})})]})]})})]})};export{tt as default};
