import{u as ce,c as de,j as e,d as x}from"./index-CxXKn8Du.js";import{r as c,ac as p,T as pe,j as d,$ as C,B as f,n as me,o as ue,d as h,C as l,S as j,a as he,aA as S,ar as xe,M as z,ai as H,l as P,aB as ge,_ as fe,x as i,t as n,aC as q,i as v,aD as je,u as U,v as ve,w as ye,al as T,k as be,am as Pe,an as Ie,g as we,ay as Ce}from"./antd-mjhx-L7S.js";import{s as Se}from"./index-Daowydkz.js";import{S as Te}from"./SearchFilterBar-BLWQ69gf.js";import"./vendor-DJG_os-6.js";const{Title:Re,Paragraph:V,Text:D}=pe,{Option:o}=P,{TextArea:E}=H,Me=x.div`
  padding: 24px;
`,_e=x.div`
  margin-bottom: 24px;
`,b=x(v)`
  .ant-card-body {
    padding: 16px;
  }
`,ke=x(v)`
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
`;const Ne=x.div`
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
`,De=()=>{var B,$,F;const{t:s}=ce(["prompts","common"]),{currentTheme:Ae}=de(t=>t.theme),[Be,$e]=c.useState(!1),[K,y]=c.useState(!1),[O,R]=c.useState(!1),[M,_]=c.useState(null),[a,L]=c.useState(null),[J,Y]=c.useState(""),[G,Q]=c.useState("all"),[W,X]=c.useState("all"),[Z,ee]=c.useState("all"),[g]=p.useForm();c.useEffect(()=>{Se(s("prompts:title"))},[s]);const m=[{id:"1",name:"代码审查助手",category:"开发工具",description:"帮助开发者进行代码审查，识别潜在问题和改进建议",content:`你是一个专业的代码审查专家。请仔细审查以下代码，并提供详细的反馈：

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

请确保文档结构清晰，内容详实，易于理解。`,variables:["project_name","module_name","tech_stack","api_details","use_cases"],tags:["技术文档","文档生成","API文档"],language:"zh-CN",difficulty:"beginner",rating:4.4,usageCount:423,isPublic:!1,isFavorite:!1,createdBy:"技术团队",createdAt:"2024-06-05",lastModified:"2024-06-13",lastUsed:"2024-06-15 11:15:00",version:"1.0"}],I={开发工具:{color:"blue",icon:e.jsx(Ce,{})},运维工具:{color:"green",icon:e.jsx(we,{})},产品管理:{color:"orange",icon:e.jsx(Ie,{})},文档工具:{color:"purple",icon:e.jsx(C,{})},客服助手:{color:"cyan",icon:e.jsx(Pe,{})},数据分析:{color:"red",icon:e.jsx(be,{})}},k={beginner:{name:"初级",color:"green"},intermediate:{name:"中级",color:"orange"},advanced:{name:"高级",color:"red"}},N=t=>({开发工具:"devTools",运维工具:"opsTools",产品管理:"productManagement",文档工具:"docTools",客服助手:"customerService",数据分析:"dataAnalysis"})[t]||"devTools",se=()=>{_(null),g.resetFields(),y(!0)},te=t=>{_(t),g.setFieldsValue({name:t.name,category:t.category,description:t.description,content:t.content,language:t.language,difficulty:t.difficulty,isPublic:t.isPublic}),y(!0)},A=t=>{L(t),R(!0)},ae=t=>{navigator.clipboard.writeText(t.content),T.success(s("prompts:messages.copySuccess"))},re=async()=>{try{const t=await g.validateFields();M?T.success(s("prompts:messages.updateSuccess")):T.success(s("prompts:messages.createSuccess")),y(!1),g.resetFields()}catch(t){console.error("表单验证失败:",t)}},le=()=>m.map(t=>{const r=I[t.category],w=k[t.difficulty];return e.jsx(l,{xs:24,sm:24,md:12,lg:8,xl:8,children:e.jsxs(ke,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(d,{children:[r==null?void 0:r.icon,e.jsx("span",{children:t.name})]})}),e.jsx("div",{className:"title-right",children:t.isFavorite&&e.jsx(S,{})})]}),onClick:()=>A(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{wrap:!0,children:[e.jsx(n,{color:r==null?void 0:r.color,icon:r==null?void 0:r.icon,children:s(`prompts:categories.${N(t.category)}`)}),e.jsx(n,{color:w==null?void 0:w.color,children:s(`prompts:difficulty.${t.difficulty}`)}),t.isPublic&&e.jsx(n,{color:"blue",children:s("prompts:status.public")})]})}),e.jsx(V,{ellipsis:{rows:2},style:{marginBottom:16,minHeight:40},children:t.description}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(h,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(q,{disabled:!0,value:t.rating,allowHalf:!0}),e.jsx("div",{children:t.rating})]})}),e.jsx(l,{span:12,children:e.jsx(j,{title:s("prompts:stats.usageCount"),value:t.usageCount})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{wrap:!0,children:[t.tags.slice(0,3).map(u=>e.jsx(n,{size:"small",children:u},u)),t.tags.length>3&&e.jsxs(n,{size:"small",children:["+",t.tags.length-3]})]})}),e.jsxs("div",{style:{fontSize:12,color:"#666"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[e.jsxs("span",{children:[s("prompts:detail.version"),":"]}),e.jsx("span",{children:t.version})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[s("prompts:detail.lastUsed"),":"]}),e.jsx("span",{children:t.lastUsed})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(d,{children:[e.jsx(U,{title:s("prompts:actions.view"),children:e.jsx(f,{type:"text",icon:e.jsx(ve,{}),size:"small",onClick:u=>{u.stopPropagation(),A(t)}})}),e.jsx(U,{title:s("prompts:actions.edit"),children:e.jsx(f,{type:"text",icon:e.jsx(ye,{}),size:"small",onClick:u=>{u.stopPropagation(),te(t)}})})]})})]})},t.id)}),ie=m.filter(t=>t.isPublic).length,oe=m.filter(t=>t.isFavorite).length;m.reduce((t,r)=>t+r.usageCount,0);const ne=m.reduce((t,r)=>t+r.rating,0)/m.length;return e.jsxs(Me,{className:"prompt-templates-page",children:[e.jsxs(_e,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[e.jsx(Re,{level:2,style:{margin:0},children:e.jsxs(d,{children:[e.jsx(C,{}),s("prompts:title")]})}),e.jsxs(d,{children:[e.jsx(f,{icon:e.jsx(me,{}),children:s("common:refresh")}),e.jsx(f,{type:"primary",icon:e.jsx(ue,{}),onClick:se,children:s("prompts:createPrompt")})]})]}),e.jsx(V,{style:{marginTop:0,marginBottom:0},children:s("prompts:subtitle")})]}),e.jsxs(h,{gutter:16,style:{marginBottom:24},children:[e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(b,{className:"prompt-stats-primary",children:e.jsx(j,{title:s("prompts:stats.totalTemplates"),value:m.length,prefix:e.jsx(C,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(b,{className:"prompt-stats-success",children:e.jsx(j,{title:s("prompts:stats.publicTemplates"),value:ie,prefix:e.jsx(he,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(b,{className:"prompt-stats-warning",children:e.jsx(j,{title:s("prompts:stats.favoriteTemplates"),value:oe,prefix:e.jsx(S,{})})})}),e.jsx(l,{xs:24,sm:12,md:6,children:e.jsx(b,{className:"prompt-stats-purple",children:e.jsx(j,{title:s("prompts:stats.averageRating"),value:ne.toFixed(1),prefix:e.jsx(xe,{})})})})]}),e.jsx(Te,{searchValue:J,onSearchChange:Y,searchPlaceholder:s("prompts:search.placeholder"),filters:[{key:"category",value:G,onChange:Q,placeholder:s("prompts:search.category"),width:120,options:[{value:"all",label:s("prompts:search.allCategories")},{value:"开发工具",label:s("prompts:categories.devTools")},{value:"运维工具",label:s("prompts:categories.opsTools")},{value:"产品管理",label:s("prompts:categories.productManagement")},{value:"文档工具",label:s("prompts:categories.docTools")},{value:"客服助手",label:s("prompts:categories.customerService")},{value:"数据分析",label:s("prompts:categories.dataAnalysis")}]},{key:"difficulty",value:W,onChange:X,placeholder:s("prompts:search.difficulty"),width:100,options:[{value:"all",label:s("prompts:search.allDifficulties")},{value:"beginner",label:s("prompts:difficulty.beginner")},{value:"intermediate",label:s("prompts:difficulty.intermediate")},{value:"advanced",label:s("prompts:difficulty.advanced")}]},{key:"status",value:Z,onChange:ee,placeholder:s("prompts:search.status"),width:100,options:[{value:"all",label:s("prompts:search.allStatuses")},{value:"public",label:s("prompts:status.public")},{value:"private",label:s("prompts:status.private")},{value:"favorite",label:s("prompts:status.favorite")}]}],onRefresh:()=>window.location.reload()}),e.jsx(h,{gutter:[16,16],children:le()}),e.jsx(z,{title:M?"编辑提示词模板":"创建提示词模板",open:K,onOk:re,onCancel:()=>y(!1),width:800,children:e.jsxs(p,{form:g,layout:"vertical",initialValues:{language:"zh-CN",difficulty:"intermediate",isPublic:!1},children:[e.jsxs(h,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsx(p.Item,{name:"name",label:s("prompts:form.templateName"),rules:[{required:!0,message:s("prompts:form.templateNameRequired")}],children:e.jsx(H,{placeholder:s("prompts:form.templateNamePlaceholder")})})}),e.jsx(l,{span:12,children:e.jsx(p.Item,{name:"category",label:s("prompts:form.category"),rules:[{required:!0,message:s("prompts:form.categoryRequired")}],children:e.jsxs(P,{placeholder:s("prompts:form.categoryPlaceholder"),children:[e.jsx(o,{value:"开发工具",children:s("prompts:categories.devTools")}),e.jsx(o,{value:"运维工具",children:s("prompts:categories.opsTools")}),e.jsx(o,{value:"产品管理",children:s("prompts:categories.productManagement")}),e.jsx(o,{value:"文档工具",children:s("prompts:categories.docTools")}),e.jsx(o,{value:"客服助手",children:s("prompts:categories.customerService")}),e.jsx(o,{value:"数据分析",children:s("prompts:categories.dataAnalysis")})]})})})]}),e.jsx(p.Item,{name:"description",label:s("prompts:form.description"),rules:[{required:!0,message:s("prompts:form.descriptionRequired")}],children:e.jsx(E,{rows:2,placeholder:s("prompts:form.descriptionPlaceholder")})}),e.jsx(p.Item,{name:"content",label:s("prompts:form.content"),rules:[{required:!0,message:s("prompts:form.contentRequired")}],children:e.jsx(E,{rows:8,placeholder:s("prompts:form.contentPlaceholder")})}),e.jsxs(h,{gutter:16,children:[e.jsx(l,{span:8,children:e.jsx(p.Item,{name:"language",label:s("prompts:form.language"),rules:[{required:!0,message:s("prompts:form.languageRequired")}],children:e.jsxs(P,{placeholder:s("prompts:form.languagePlaceholder"),children:[e.jsx(o,{value:"zh-CN",children:"中文"}),e.jsx(o,{value:"en-US",children:"English"}),e.jsx(o,{value:"ja-JP",children:"日本語"})]})})}),e.jsx(l,{span:8,children:e.jsx(p.Item,{name:"difficulty",label:s("prompts:form.difficulty"),rules:[{required:!0,message:s("prompts:form.difficultyRequired")}],children:e.jsxs(P,{placeholder:s("prompts:search.difficulty"),children:[e.jsx(o,{value:"beginner",children:s("prompts:difficulty.beginner")}),e.jsx(o,{value:"intermediate",children:s("prompts:difficulty.intermediate")}),e.jsx(o,{value:"advanced",children:s("prompts:difficulty.advanced")})]})})}),e.jsx(l,{span:8,children:e.jsx(p.Item,{name:"isPublic",label:s("prompts:detail.isPublic"),valuePropName:"checked",children:e.jsx(ge,{})})})]}),e.jsx(fe,{message:s("prompts:form.variableTip"),description:s("prompts:form.variableTipDescription"),type:"info",showIcon:!0,style:{marginTop:16}})]})}),e.jsx(z,{title:a==null?void 0:a.name,open:O,onCancel:()=>R(!1),footer:null,width:1e3,style:{top:20},children:a&&e.jsxs("div",{children:[e.jsxs(i,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(i.Item,{label:s("prompts:detail.templateName"),span:2,children:a.name}),e.jsx(i.Item,{label:s("prompts:detail.category"),children:e.jsx(n,{color:(B=I[a.category])==null?void 0:B.color,icon:($=I[a.category])==null?void 0:$.icon,children:s(`prompts:categories.${N(a.category)}`)})}),e.jsx(i.Item,{label:s("prompts:detail.difficulty"),children:e.jsx(n,{color:(F=k[a.difficulty])==null?void 0:F.color,children:s(`prompts:difficulty.${a.difficulty}`)})}),e.jsx(i.Item,{label:s("prompts:detail.rating"),children:e.jsxs(d,{children:[e.jsx(q,{disabled:!0,value:a.rating,allowHalf:!0}),e.jsx(D,{children:a.rating})]})}),e.jsxs(i.Item,{label:s("prompts:detail.usageCount"),children:[a.usageCount,s("common:unit.times")]}),e.jsx(i.Item,{label:s("prompts:detail.language"),children:a.language}),e.jsx(i.Item,{label:s("prompts:detail.version"),children:a.version}),e.jsx(i.Item,{label:s("prompts:detail.status"),children:e.jsxs(d,{children:[a.isPublic&&e.jsx(n,{color:"blue",children:s("prompts:status.public")}),a.isFavorite&&e.jsx(n,{color:"gold",icon:e.jsx(S,{}),children:s("prompts:status.favorite")})]})}),e.jsx(i.Item,{label:s("prompts:detail.creator"),children:a.createdBy}),e.jsx(i.Item,{label:s("prompts:detail.createdAt"),children:a.createdAt}),e.jsx(i.Item,{label:s("prompts:detail.lastUsed"),children:a.lastUsed}),e.jsx(i.Item,{label:s("prompts:detail.description"),span:2,children:a.description})]}),e.jsxs(v,{title:s("prompts:detail.content"),style:{marginBottom:16},children:[e.jsx(Ne,{children:a.content}),e.jsx("div",{style:{marginTop:12,textAlign:"right"},children:e.jsx(f,{icon:e.jsx(je,{}),onClick:()=>ae(a),children:s("prompts:actions.copy")})})]}),e.jsxs(h,{gutter:16,children:[e.jsx(l,{span:12,children:e.jsx(v,{title:s("prompts:detail.variablesList"),size:"small",children:a.variables.length>0?e.jsx(d,{wrap:!0,children:a.variables.map(t=>e.jsx(n,{color:"blue",children:`{${t}}`},t))}):e.jsx(D,{type:"secondary",children:s("prompts:detail.noVariables")})})}),e.jsx(l,{span:12,children:e.jsx(v,{title:s("prompts:detail.tags"),size:"small",children:e.jsx(d,{wrap:!0,children:a.tags.map(t=>e.jsx(n,{children:t},t))})})})]})]})})]})};export{De as default};
