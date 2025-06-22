import{a as c,j as e}from"./react-MdpB-M3H.js";import{u as pe,aC as p,c as me,S as d,n as w,B as f,ai as ue,aa as he,U as h,V as l,W as j,K as xe,bn as C,p as ge,aF as N,az as H,a1 as P,bg as fe,ap as je,ax as i,a3 as n,bo as q,_ as y,bp as ye,d as x,T as U,a8 as ve,a9 as be,ah as T,a0 as Pe,o as Ie,a as Se,Y as we,bk as Ce}from"./react-dom-QQALPBrT.js";import{u as Te}from"./index-B75Nmaw9.js";import{s as Re}from"./index-Daowydkz.js";import{S as ke}from"./SearchFilterBar-C4OuSSAC.js";import"./vendor-ClJIwLAB.js";import"./dayjs-Bzorz0fL.js";import"./pdf-utils-C_SCuxBx.js";import"./media-utils-evJiVgOc.js";import"./lodash-BORto0-T.js";import"./redux-CiqK6azd.js";import"./echarts-core-CUuKLdQv.js";import"./antd-icons-CI4I6I7B.js";import"./emotion-BhZTwsuK.js";import"./mermaid-B5ZLspDL.js";import"./d3-C77K6LmW.js";import"./i18n-CMVetavo.js";const{Title:Me,Paragraph:V,Text:D}=me,{Option:o}=P,{TextArea:E}=H,_e=x.div`
  padding: 24px;
`,ze=x.div`
  margin-bottom: 24px;
`,b=x(y)`
  .ant-card-body {
    padding: 16px;
  }
`,Fe=x(y)`
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
`;x.div`
  background: #fafafa;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
`;const Ae=x.div`
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
`,tt=()=>{var A,$,B;const{t}=pe(["prompts","common"]),{currentTheme:K}=Te(s=>s.theme),O=K==="dark"?"#ffffff":"#1890ff",[Be,Ne]=c.useState(!1),[L,v]=c.useState(!1),[Y,R]=c.useState(!1),[k,M]=c.useState(null),[a,J]=c.useState(null),[W,G]=c.useState(""),[Q,X]=c.useState("all"),[Z,ee]=c.useState("all"),[te,se]=c.useState("all"),[g]=p.useForm();c.useEffect(()=>{Re(t("prompts:title"))},[t]);const m=[{id:"1",name:"代码审查助手",category:"开发工具",description:"帮助开发者进行代码审查，识别潜在问题和改进建议",content:`你是一个专业的代码审查专家。请仔细审查以下代码，并提供详细的反馈：

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

请确保文档结构清晰，内容详实，易于理解。`,variables:["project_name","module_name","tech_stack","api_details","use_cases"],tags:["技术文档","文档生成","API文档"],language:"zh-CN",difficulty:"beginner",rating:4.4,usageCount:423,isPublic:!1,isFavorite:!1,createdBy:"技术团队",createdAt:"2024-06-05",lastModified:"2024-06-13",lastUsed:"2024-06-15 11:15:00",version:"1.0"}],I={开发工具:{color:"blue",icon:e.jsx(Ce,{})},运维工具:{color:"green",icon:e.jsx(we,{})},产品管理:{color:"orange",icon:e.jsx(Se,{})},文档工具:{color:"purple",icon:e.jsx(w,{})},客服助手:{color:"cyan",icon:e.jsx(Ie,{})},数据分析:{color:"red",icon:e.jsx(Pe,{})}},_={beginner:{name:"初级",color:"green"},intermediate:{name:"中级",color:"orange"},advanced:{name:"高级",color:"red"}},z=s=>({开发工具:"devTools",运维工具:"opsTools",产品管理:"productManagement",文档工具:"docTools",客服助手:"customerService",数据分析:"dataAnalysis"})[s]||"devTools",ae=()=>{M(null),g.resetFields(),v(!0)},re=s=>{M(s),g.setFieldsValue({name:s.name,category:s.category,description:s.description,content:s.content,language:s.language,difficulty:s.difficulty,isPublic:s.isPublic}),v(!0)},F=s=>{J(s),R(!0)},le=s=>{navigator.clipboard.writeText(s.content),T.success(t("prompts:messages.copySuccess"))},ie=async()=>{try{const s=await g.validateFields();k?T.success(t("prompts:messages.updateSuccess")):T.success(t("prompts:messages.createSuccess")),v(!1),g.resetFields()}catch(s){console.error("表单验证失败:",s)}},oe=()=>m.map(s=>{const r=I[s.category],S=_[s.difficulty];return e.jsx(l,{xs:24,sm:24,md:12,lg:8,xl:8,children:e.jsxs(Fe,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(d,{children:[r==null?void 0:r.icon,e.jsx("span",{children:s.name})]})}),e.jsx("div",{className:"title-right",children:s.isFavorite&&e.jsx(C,{style:{color:"#faad14"}})})]}),onClick:()=>F(s),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{wrap:!0,children:[e.jsx(n,{color:r==null?void 0:r.color,icon:r==null?void 0:r.icon,children:t(`prompts:categories.${z(s.category)}`)}),e.jsx(n,{color:S==null?void 0:S.color,children:t(`prompts:difficulty.${s.difficulty}`)}),s.isPublic&&e.jsx(n,{color:"blue",children:t("prompts:status.public")})]})}),e.jsx(V,{ellipsis:{rows:2},style:{marginBottom:16,minHeight:40},children:s.description}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(h,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(q,{disabled:!0,value:s.rating,allowHalf:!0,style:{fontSize:12}}),e.jsx("div",{style:{fontSize:12,color:"#666"},children:s.rating})]})}),e.jsx(l,{span:12,children:e.jsx(j,{title:t("prompts:stats.usageCount"),value:s.usageCount,valueStyle:{fontSize:14}})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{wrap:!0,children:[s.tags.slice(0,3).map(u=>e.jsx(n,{size:"small",children:u},u)),s.tags.length>3&&e.jsxs(n,{size:"small",children:["+",s.tags.length-3]})]})}),e.jsxs("div",{style:{fontSize:12,color:"#666"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[e.jsxs("span",{children:[t("prompts:detail.version"),":"]}),e.jsx("span",{children:s.version})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[t("prompts:detail.lastUsed"),":"]}),e.jsx("span",{children:s.lastUsed})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(d,{children:[e.jsx(U,{title:t("prompts:actions.view"),children:e.jsx(f,{type:"text",icon:e.jsx(ve,{}),size:"small",onClick:u=>{u.stopPropagation(),F(s)}})}),e.jsx(U,{title:t("prompts:actions.edit"),children:e.jsx(f,{type:"text",icon:e.jsx(be,{}),size:"small",onClick:u=>{u.stopPropagation(),re(s)}})})]})})]})},s.id)}),ne=m.filter(s=>s.isPublic).length,ce=m.filter(s=>s.isFavorite).length;m.reduce((s,r)=>s+r.usageCount,0);const de=m.reduce((s,r)=>s+r.rating,0)/m.length;return e.jsxs(_e,{children:[e.jsx(ze,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(Me,{level:2,style:{margin:0},children:e.jsxs(d,{children:[e.jsx(w,{style:{color:O}}),t("prompts:title")]})}),e.jsx(V,{style:{marginTop:8,marginBottom:0,fontSize:16},children:t("prompts:subtitle")})]}),e.jsxs(d,{children:[e.jsx(f,{icon:e.jsx(ue,{}),children:t("common:refresh")}),e.jsx(f,{type:"primary",icon:e.jsx(he,{}),onClick:ae,children:t("prompts:createPrompt")})]})]})}),e.jsxs(h,{gutter:16,style:{marginBottom:24},children:[e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(b,{children:e.jsx(j,{title:t("prompts:stats.totalTemplates"),value:m.length,suffix:t("common:unit.count"),valueStyle:{color:"#1890ff"},prefix:e.jsx(w,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(b,{children:e.jsx(j,{title:t("prompts:stats.publicTemplates"),value:ne,suffix:t("common:unit.count"),valueStyle:{color:"#52c41a"},prefix:e.jsx(xe,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(b,{children:e.jsx(j,{title:t("prompts:stats.favoriteTemplates"),value:ce,suffix:t("common:unit.count"),valueStyle:{color:"#faad14"},prefix:e.jsx(C,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(b,{children:e.jsx(j,{title:t("prompts:stats.averageRating"),value:de.toFixed(1),valueStyle:{color:"#722ed1"},prefix:e.jsx(ge,{})})})})]}),e.jsx(ke,{searchValue:W,onSearchChange:G,searchPlaceholder:t("prompts:search.placeholder"),filters:[{key:"category",value:Q,onChange:X,placeholder:t("prompts:search.category"),width:120,options:[{value:"all",label:t("prompts:search.allCategories")},{value:"开发工具",label:t("prompts:categories.devTools")},{value:"运维工具",label:t("prompts:categories.opsTools")},{value:"产品管理",label:t("prompts:categories.productManagement")},{value:"文档工具",label:t("prompts:categories.docTools")},{value:"客服助手",label:t("prompts:categories.customerService")},{value:"数据分析",label:t("prompts:categories.dataAnalysis")}]},{key:"difficulty",value:Z,onChange:ee,placeholder:t("prompts:search.difficulty"),width:100,options:[{value:"all",label:t("prompts:search.allDifficulties")},{value:"beginner",label:t("prompts:difficulty.beginner")},{value:"intermediate",label:t("prompts:difficulty.intermediate")},{value:"advanced",label:t("prompts:difficulty.advanced")}]},{key:"status",value:te,onChange:se,placeholder:t("prompts:search.status"),width:100,options:[{value:"all",label:t("prompts:search.allStatuses")},{value:"public",label:t("prompts:status.public")},{value:"private",label:t("prompts:status.private")},{value:"favorite",label:t("prompts:status.favorite")}]}],onRefresh:()=>window.location.reload()}),e.jsx(h,{gutter:[16,16],children:oe()}),e.jsx(N,{title:k?"编辑提示词模板":"创建提示词模板",open:L,onOk:ie,onCancel:()=>v(!1),width:800,children:e.jsxs(p,{form:g,layout:"vertical",initialValues:{language:"zh-CN",difficulty:"intermediate",isPublic:!1},children:[e.jsxs(h,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsx(p.Item,{name:"name",label:t("prompts:form.templateName"),rules:[{required:!0,message:t("prompts:form.templateNameRequired")}],children:e.jsx(H,{placeholder:t("prompts:form.templateNamePlaceholder")})})}),e.jsx(l,{span:12,children:e.jsx(p.Item,{name:"category",label:t("prompts:form.category"),rules:[{required:!0,message:t("prompts:form.categoryRequired")}],children:e.jsxs(P,{placeholder:t("prompts:form.categoryPlaceholder"),children:[e.jsx(o,{value:"开发工具",children:t("prompts:categories.devTools")}),e.jsx(o,{value:"运维工具",children:t("prompts:categories.opsTools")}),e.jsx(o,{value:"产品管理",children:t("prompts:categories.productManagement")}),e.jsx(o,{value:"文档工具",children:t("prompts:categories.docTools")}),e.jsx(o,{value:"客服助手",children:t("prompts:categories.customerService")}),e.jsx(o,{value:"数据分析",children:t("prompts:categories.dataAnalysis")})]})})})]}),e.jsx(p.Item,{name:"description",label:t("prompts:form.description"),rules:[{required:!0,message:t("prompts:form.descriptionRequired")}],children:e.jsx(E,{rows:2,placeholder:t("prompts:form.descriptionPlaceholder")})}),e.jsx(p.Item,{name:"content",label:t("prompts:form.content"),rules:[{required:!0,message:t("prompts:form.contentRequired")}],children:e.jsx(E,{rows:8,placeholder:t("prompts:form.contentPlaceholder")})}),e.jsxs(h,{gutter:16,children:[e.jsx(l,{span:8,children:e.jsx(p.Item,{name:"language",label:t("prompts:form.language"),rules:[{required:!0,message:t("prompts:form.languageRequired")}],children:e.jsxs(P,{placeholder:t("prompts:form.languagePlaceholder"),children:[e.jsx(o,{value:"zh-CN",children:"中文"}),e.jsx(o,{value:"en-US",children:"English"}),e.jsx(o,{value:"ja-JP",children:"日本語"})]})})}),e.jsx(l,{span:8,children:e.jsx(p.Item,{name:"difficulty",label:t("prompts:form.difficulty"),rules:[{required:!0,message:t("prompts:form.difficultyRequired")}],children:e.jsxs(P,{placeholder:t("prompts:search.difficulty"),children:[e.jsx(o,{value:"beginner",children:t("prompts:difficulty.beginner")}),e.jsx(o,{value:"intermediate",children:t("prompts:difficulty.intermediate")}),e.jsx(o,{value:"advanced",children:t("prompts:difficulty.advanced")})]})})}),e.jsx(l,{span:8,children:e.jsx(p.Item,{name:"isPublic",label:t("prompts:detail.isPublic"),valuePropName:"checked",children:e.jsx(fe,{})})})]}),e.jsx(je,{message:t("prompts:form.variableTip"),description:t("prompts:form.variableTipDescription"),type:"info",showIcon:!0,style:{marginTop:16}})]})}),e.jsx(N,{title:a==null?void 0:a.name,open:Y,onCancel:()=>R(!1),footer:null,width:1e3,style:{top:20},children:a&&e.jsxs("div",{children:[e.jsxs(i,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(i.Item,{label:t("prompts:detail.templateName"),span:2,children:a.name}),e.jsx(i.Item,{label:t("prompts:detail.category"),children:e.jsx(n,{color:(A=I[a.category])==null?void 0:A.color,icon:($=I[a.category])==null?void 0:$.icon,children:t(`prompts:categories.${z(a.category)}`)})}),e.jsx(i.Item,{label:t("prompts:detail.difficulty"),children:e.jsx(n,{color:(B=_[a.difficulty])==null?void 0:B.color,children:t(`prompts:difficulty.${a.difficulty}`)})}),e.jsx(i.Item,{label:t("prompts:detail.rating"),children:e.jsxs(d,{children:[e.jsx(q,{disabled:!0,value:a.rating,allowHalf:!0}),e.jsx(D,{children:a.rating})]})}),e.jsxs(i.Item,{label:t("prompts:detail.usageCount"),children:[a.usageCount,t("common:unit.times")]}),e.jsx(i.Item,{label:t("prompts:detail.language"),children:a.language}),e.jsx(i.Item,{label:t("prompts:detail.version"),children:a.version}),e.jsx(i.Item,{label:t("prompts:detail.status"),children:e.jsxs(d,{children:[a.isPublic&&e.jsx(n,{color:"blue",children:t("prompts:status.public")}),a.isFavorite&&e.jsx(n,{color:"gold",icon:e.jsx(C,{}),children:t("prompts:status.favorite")})]})}),e.jsx(i.Item,{label:t("prompts:detail.creator"),children:a.createdBy}),e.jsx(i.Item,{label:t("prompts:detail.createdAt"),children:a.createdAt}),e.jsx(i.Item,{label:t("prompts:detail.lastUsed"),children:a.lastUsed}),e.jsx(i.Item,{label:t("prompts:detail.description"),span:2,children:a.description})]}),e.jsxs(y,{title:t("prompts:detail.content"),style:{marginBottom:16},children:[e.jsx(Ae,{children:a.content}),e.jsx("div",{style:{marginTop:12,textAlign:"right"},children:e.jsx(f,{icon:e.jsx(ye,{}),onClick:()=>le(a),children:t("prompts:actions.copy")})})]}),e.jsxs(h,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsx(y,{title:t("prompts:detail.variablesList"),size:"small",children:a.variables.length>0?e.jsx(d,{wrap:!0,children:a.variables.map(s=>e.jsx(n,{color:"blue",children:`{${s}}`},s))}):e.jsx(D,{type:"secondary",children:t("prompts:detail.noVariables")})})}),e.jsx(l,{span:12,children:e.jsx(y,{title:t("prompts:detail.tags"),size:"small",children:e.jsx(d,{wrap:!0,children:a.tags.map(s=>e.jsx(n,{children:s},s))})})})]})]})})]})};export{tt as default};
