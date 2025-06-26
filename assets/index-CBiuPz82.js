import{u as pe,c as me,j as e,d as h}from"./index-BoaK5Cbd.js";import{r as c,ab as p,T as ue,k as d,a0 as w,B as f,o as xe,p as he,d as x,C as r,S as j,a as ge,az as C,aq as fe,M as N,ah as H,m as P,aA as je,Q as ye,y as i,u as n,aB as q,j as y,aC as ve,v as U,w as be,x as Pe,ak as T,l as Ie,al as Se,am as we,g as Ce,ax as Te}from"./antd-CAFIM9ev.js";import{s as Re}from"./index-Daowydkz.js";import{S as ke}from"./SearchFilterBar-AJ-ixr8L.js";import"./vendor-DJG_os-6.js";const{Title:Me,Paragraph:D,Text:V}=ue,{Option:o}=P,{TextArea:E}=H,ze=h.div`
  padding: 24px;
`,_e=h.div`
  margin-bottom: 24px;
`,b=h(y)`
  .ant-card-body {
    padding: 16px;
  }
`,Ae=h(y)`
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
`;const Be=h.div`
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
`,He=()=>{var B,F,$;const{t:s}=pe(["prompts","common"]),{currentTheme:K}=me(t=>t.theme),O=K==="dark"?"#ffffff":"#1890ff",[$e,Ne]=c.useState(!1),[L,v]=c.useState(!1),[J,R]=c.useState(!1),[k,M]=c.useState(null),[a,Q]=c.useState(null),[Y,G]=c.useState(""),[W,X]=c.useState("all"),[Z,ee]=c.useState("all"),[se,te]=c.useState("all"),[g]=p.useForm();c.useEffect(()=>{Re(s("prompts:title"))},[s]);const m=[{id:"1",name:"代码审查助手",category:"开发工具",description:"帮助开发者进行代码审查，识别潜在问题和改进建议",content:`你是一个专业的代码审查专家。请仔细审查以下代码，并提供详细的反馈：

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

请确保文档结构清晰，内容详实，易于理解。`,variables:["project_name","module_name","tech_stack","api_details","use_cases"],tags:["技术文档","文档生成","API文档"],language:"zh-CN",difficulty:"beginner",rating:4.4,usageCount:423,isPublic:!1,isFavorite:!1,createdBy:"技术团队",createdAt:"2024-06-05",lastModified:"2024-06-13",lastUsed:"2024-06-15 11:15:00",version:"1.0"}],I={开发工具:{color:"blue",icon:e.jsx(Te,{})},运维工具:{color:"green",icon:e.jsx(Ce,{})},产品管理:{color:"orange",icon:e.jsx(we,{})},文档工具:{color:"purple",icon:e.jsx(w,{})},客服助手:{color:"cyan",icon:e.jsx(Se,{})},数据分析:{color:"red",icon:e.jsx(Ie,{})}},z={beginner:{name:"初级",color:"green"},intermediate:{name:"中级",color:"orange"},advanced:{name:"高级",color:"red"}},_=t=>({开发工具:"devTools",运维工具:"opsTools",产品管理:"productManagement",文档工具:"docTools",客服助手:"customerService",数据分析:"dataAnalysis"})[t]||"devTools",ae=()=>{M(null),g.resetFields(),v(!0)},le=t=>{M(t),g.setFieldsValue({name:t.name,category:t.category,description:t.description,content:t.content,language:t.language,difficulty:t.difficulty,isPublic:t.isPublic}),v(!0)},A=t=>{Q(t),R(!0)},re=t=>{navigator.clipboard.writeText(t.content),T.success(s("prompts:messages.copySuccess"))},ie=async()=>{try{const t=await g.validateFields();k?T.success(s("prompts:messages.updateSuccess")):T.success(s("prompts:messages.createSuccess")),v(!1),g.resetFields()}catch(t){console.error("表单验证失败:",t)}},oe=()=>m.map(t=>{const l=I[t.category],S=z[t.difficulty];return e.jsx(r,{xs:24,sm:24,md:12,lg:8,xl:8,children:e.jsxs(Ae,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(d,{children:[l==null?void 0:l.icon,e.jsx("span",{children:t.name})]})}),e.jsx("div",{className:"title-right",children:t.isFavorite&&e.jsx(C,{style:{color:"#faad14"}})})]}),onClick:()=>A(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{wrap:!0,children:[e.jsx(n,{color:l==null?void 0:l.color,icon:l==null?void 0:l.icon,children:s(`prompts:categories.${_(t.category)}`)}),e.jsx(n,{color:S==null?void 0:S.color,children:s(`prompts:difficulty.${t.difficulty}`)}),t.isPublic&&e.jsx(n,{color:"blue",children:s("prompts:status.public")})]})}),e.jsx(D,{ellipsis:{rows:2},style:{marginBottom:16,minHeight:40},children:t.description}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(x,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(q,{disabled:!0,value:t.rating,allowHalf:!0,style:{fontSize:12}}),e.jsx("div",{style:{fontSize:12,color:"#666"},children:t.rating})]})}),e.jsx(r,{span:12,children:e.jsx(j,{title:s("prompts:stats.usageCount"),value:t.usageCount,valueStyle:{fontSize:14}})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(d,{wrap:!0,children:[t.tags.slice(0,3).map(u=>e.jsx(n,{size:"small",children:u},u)),t.tags.length>3&&e.jsxs(n,{size:"small",children:["+",t.tags.length-3]})]})}),e.jsxs("div",{style:{fontSize:12,color:"#666"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[e.jsxs("span",{children:[s("prompts:detail.version"),":"]}),e.jsx("span",{children:t.version})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[s("prompts:detail.lastUsed"),":"]}),e.jsx("span",{children:t.lastUsed})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(d,{children:[e.jsx(U,{title:s("prompts:actions.view"),children:e.jsx(f,{type:"text",icon:e.jsx(be,{}),size:"small",onClick:u=>{u.stopPropagation(),A(t)}})}),e.jsx(U,{title:s("prompts:actions.edit"),children:e.jsx(f,{type:"text",icon:e.jsx(Pe,{}),size:"small",onClick:u=>{u.stopPropagation(),le(t)}})})]})})]})},t.id)}),ne=m.filter(t=>t.isPublic).length,ce=m.filter(t=>t.isFavorite).length;m.reduce((t,l)=>t+l.usageCount,0);const de=m.reduce((t,l)=>t+l.rating,0)/m.length;return e.jsxs(ze,{children:[e.jsx(_e,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[e.jsxs("div",{children:[e.jsx(Me,{level:2,style:{margin:0},children:e.jsxs(d,{children:[e.jsx(w,{style:{color:O}}),s("prompts:title")]})}),e.jsx(D,{style:{marginTop:8,marginBottom:0,fontSize:16},children:s("prompts:subtitle")})]}),e.jsxs(d,{children:[e.jsx(f,{icon:e.jsx(xe,{}),children:s("common:refresh")}),e.jsx(f,{type:"primary",icon:e.jsx(he,{}),onClick:ae,children:s("prompts:createPrompt")})]})]})}),e.jsxs(x,{gutter:16,style:{marginBottom:24},children:[e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(b,{children:e.jsx(j,{title:s("prompts:stats.totalTemplates"),value:m.length,suffix:s("common:unit.count"),valueStyle:{color:"#1890ff"},prefix:e.jsx(w,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(b,{children:e.jsx(j,{title:s("prompts:stats.publicTemplates"),value:ne,suffix:s("common:unit.count"),valueStyle:{color:"#52c41a"},prefix:e.jsx(ge,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(b,{children:e.jsx(j,{title:s("prompts:stats.favoriteTemplates"),value:ce,suffix:s("common:unit.count"),valueStyle:{color:"#faad14"},prefix:e.jsx(C,{})})})}),e.jsx(r,{xs:24,sm:12,md:6,children:e.jsx(b,{children:e.jsx(j,{title:s("prompts:stats.averageRating"),value:de.toFixed(1),valueStyle:{color:"#722ed1"},prefix:e.jsx(fe,{})})})})]}),e.jsx(ke,{searchValue:Y,onSearchChange:G,searchPlaceholder:s("prompts:search.placeholder"),filters:[{key:"category",value:W,onChange:X,placeholder:s("prompts:search.category"),width:120,options:[{value:"all",label:s("prompts:search.allCategories")},{value:"开发工具",label:s("prompts:categories.devTools")},{value:"运维工具",label:s("prompts:categories.opsTools")},{value:"产品管理",label:s("prompts:categories.productManagement")},{value:"文档工具",label:s("prompts:categories.docTools")},{value:"客服助手",label:s("prompts:categories.customerService")},{value:"数据分析",label:s("prompts:categories.dataAnalysis")}]},{key:"difficulty",value:Z,onChange:ee,placeholder:s("prompts:search.difficulty"),width:100,options:[{value:"all",label:s("prompts:search.allDifficulties")},{value:"beginner",label:s("prompts:difficulty.beginner")},{value:"intermediate",label:s("prompts:difficulty.intermediate")},{value:"advanced",label:s("prompts:difficulty.advanced")}]},{key:"status",value:se,onChange:te,placeholder:s("prompts:search.status"),width:100,options:[{value:"all",label:s("prompts:search.allStatuses")},{value:"public",label:s("prompts:status.public")},{value:"private",label:s("prompts:status.private")},{value:"favorite",label:s("prompts:status.favorite")}]}],onRefresh:()=>window.location.reload()}),e.jsx(x,{gutter:[16,16],children:oe()}),e.jsx(N,{title:k?"编辑提示词模板":"创建提示词模板",open:L,onOk:ie,onCancel:()=>v(!1),width:800,children:e.jsxs(p,{form:g,layout:"vertical",initialValues:{language:"zh-CN",difficulty:"intermediate",isPublic:!1},children:[e.jsxs(x,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(p.Item,{name:"name",label:s("prompts:form.templateName"),rules:[{required:!0,message:s("prompts:form.templateNameRequired")}],children:e.jsx(H,{placeholder:s("prompts:form.templateNamePlaceholder")})})}),e.jsx(r,{span:12,children:e.jsx(p.Item,{name:"category",label:s("prompts:form.category"),rules:[{required:!0,message:s("prompts:form.categoryRequired")}],children:e.jsxs(P,{placeholder:s("prompts:form.categoryPlaceholder"),children:[e.jsx(o,{value:"开发工具",children:s("prompts:categories.devTools")}),e.jsx(o,{value:"运维工具",children:s("prompts:categories.opsTools")}),e.jsx(o,{value:"产品管理",children:s("prompts:categories.productManagement")}),e.jsx(o,{value:"文档工具",children:s("prompts:categories.docTools")}),e.jsx(o,{value:"客服助手",children:s("prompts:categories.customerService")}),e.jsx(o,{value:"数据分析",children:s("prompts:categories.dataAnalysis")})]})})})]}),e.jsx(p.Item,{name:"description",label:s("prompts:form.description"),rules:[{required:!0,message:s("prompts:form.descriptionRequired")}],children:e.jsx(E,{rows:2,placeholder:s("prompts:form.descriptionPlaceholder")})}),e.jsx(p.Item,{name:"content",label:s("prompts:form.content"),rules:[{required:!0,message:s("prompts:form.contentRequired")}],children:e.jsx(E,{rows:8,placeholder:s("prompts:form.contentPlaceholder")})}),e.jsxs(x,{gutter:16,children:[e.jsx(r,{span:8,children:e.jsx(p.Item,{name:"language",label:s("prompts:form.language"),rules:[{required:!0,message:s("prompts:form.languageRequired")}],children:e.jsxs(P,{placeholder:s("prompts:form.languagePlaceholder"),children:[e.jsx(o,{value:"zh-CN",children:"中文"}),e.jsx(o,{value:"en-US",children:"English"}),e.jsx(o,{value:"ja-JP",children:"日本語"})]})})}),e.jsx(r,{span:8,children:e.jsx(p.Item,{name:"difficulty",label:s("prompts:form.difficulty"),rules:[{required:!0,message:s("prompts:form.difficultyRequired")}],children:e.jsxs(P,{placeholder:s("prompts:search.difficulty"),children:[e.jsx(o,{value:"beginner",children:s("prompts:difficulty.beginner")}),e.jsx(o,{value:"intermediate",children:s("prompts:difficulty.intermediate")}),e.jsx(o,{value:"advanced",children:s("prompts:difficulty.advanced")})]})})}),e.jsx(r,{span:8,children:e.jsx(p.Item,{name:"isPublic",label:s("prompts:detail.isPublic"),valuePropName:"checked",children:e.jsx(je,{})})})]}),e.jsx(ye,{message:s("prompts:form.variableTip"),description:s("prompts:form.variableTipDescription"),type:"info",showIcon:!0,style:{marginTop:16}})]})}),e.jsx(N,{title:a==null?void 0:a.name,open:J,onCancel:()=>R(!1),footer:null,width:1e3,style:{top:20},children:a&&e.jsxs("div",{children:[e.jsxs(i,{bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(i.Item,{label:s("prompts:detail.templateName"),span:2,children:a.name}),e.jsx(i.Item,{label:s("prompts:detail.category"),children:e.jsx(n,{color:(B=I[a.category])==null?void 0:B.color,icon:(F=I[a.category])==null?void 0:F.icon,children:s(`prompts:categories.${_(a.category)}`)})}),e.jsx(i.Item,{label:s("prompts:detail.difficulty"),children:e.jsx(n,{color:($=z[a.difficulty])==null?void 0:$.color,children:s(`prompts:difficulty.${a.difficulty}`)})}),e.jsx(i.Item,{label:s("prompts:detail.rating"),children:e.jsxs(d,{children:[e.jsx(q,{disabled:!0,value:a.rating,allowHalf:!0}),e.jsx(V,{children:a.rating})]})}),e.jsxs(i.Item,{label:s("prompts:detail.usageCount"),children:[a.usageCount,s("common:unit.times")]}),e.jsx(i.Item,{label:s("prompts:detail.language"),children:a.language}),e.jsx(i.Item,{label:s("prompts:detail.version"),children:a.version}),e.jsx(i.Item,{label:s("prompts:detail.status"),children:e.jsxs(d,{children:[a.isPublic&&e.jsx(n,{color:"blue",children:s("prompts:status.public")}),a.isFavorite&&e.jsx(n,{color:"gold",icon:e.jsx(C,{}),children:s("prompts:status.favorite")})]})}),e.jsx(i.Item,{label:s("prompts:detail.creator"),children:a.createdBy}),e.jsx(i.Item,{label:s("prompts:detail.createdAt"),children:a.createdAt}),e.jsx(i.Item,{label:s("prompts:detail.lastUsed"),children:a.lastUsed}),e.jsx(i.Item,{label:s("prompts:detail.description"),span:2,children:a.description})]}),e.jsxs(y,{title:s("prompts:detail.content"),style:{marginBottom:16},children:[e.jsx(Be,{children:a.content}),e.jsx("div",{style:{marginTop:12,textAlign:"right"},children:e.jsx(f,{icon:e.jsx(ve,{}),onClick:()=>re(a),children:s("prompts:actions.copy")})})]}),e.jsxs(x,{gutter:16,children:[e.jsx(r,{span:12,children:e.jsx(y,{title:s("prompts:detail.variablesList"),size:"small",children:a.variables.length>0?e.jsx(d,{wrap:!0,children:a.variables.map(t=>e.jsx(n,{color:"blue",children:`{${t}}`},t))}):e.jsx(V,{type:"secondary",children:s("prompts:detail.noVariables")})})}),e.jsx(r,{span:12,children:e.jsx(y,{title:s("prompts:detail.tags"),size:"small",children:e.jsx(d,{wrap:!0,children:a.tags.map(t=>e.jsx(n,{children:t},t))})})})]})]})})]})};export{He as default};
