import{u as E,c as H,j as e,d as h}from"./index-Ds4hQBUW.js";import{M as ee,a9 as x,d as v,C as n,af as se,l as N,aN as me,a7 as ue,x as d,t as f,j as u,aY as te,T as ae,aZ as V,B as C,a_ as he,i as O,r as m,Y as z,n as xe,o as ge,S as D,a as je,ap as be,u as G,v as ye,w as ve,ai as q,k as $e,ak as ke,al as we,g as De,aw as Ce}from"./antd-Beg1odhe.js";import{s as Ie}from"./index-Daowydkz.js";import{S as Se}from"./SearchFilterBar-o2SMI6sp.js";import"./vendor-DJG_os-6.js";const{Option:p}=N,{TextArea:Q}=se,Te=h(ue)`
  margin-top: 16px;

  &.ant-alert-info {
    background-color: ${s=>s.$isDark?"rgba(24, 144, 255, 0.1)":"#e6f7ff"};
    border: 1px solid ${s=>s.$isDark?"rgba(24, 144, 255, 0.3)":"#91d5ff"};

    .ant-alert-message {
      color: ${s=>s.$isDark?"#91d5ff":"#0050b3"};
    }

    .ant-alert-description {
      color: ${s=>s.$isDark?"#bfbfbf":"#262626"};
    }

    .ant-alert-icon {
      color: ${s=>s.$isDark?"#91d5ff":"#1890ff"};
    }
  }
`,Re=({visible:s,editingPrompt:r,form:I,onOk:S,onCancel:j})=>{const{t:a}=E(["prompts","common"]),{currentTheme:$}=H(b=>b.theme),i=$==="dark";return e.jsx(ee,{title:a(r?"prompts:editTemplate":"prompts:createTemplate"),open:s,onOk:S,onCancel:j,width:800,destroyOnClose:!0,children:e.jsxs(x,{form:I,layout:"vertical",initialValues:{language:"zh-CN",difficulty:"intermediate",isPublic:!1},children:[e.jsxs(v,{gutter:16,children:[e.jsx(n,{span:12,children:e.jsx(x.Item,{name:"name",label:a("prompts:form.templateName"),rules:[{required:!0,message:a("prompts:form.templateNameRequired")}],children:e.jsx(se,{placeholder:a("prompts:form.templateNamePlaceholder")})})}),e.jsx(n,{span:12,children:e.jsx(x.Item,{name:"category",label:a("prompts:form.category"),rules:[{required:!0,message:a("prompts:form.categoryRequired")}],children:e.jsxs(N,{placeholder:a("prompts:form.categoryPlaceholder"),children:[e.jsx(p,{value:"开发工具",children:a("prompts:categories.devTools")}),e.jsx(p,{value:"运维工具",children:a("prompts:categories.opsTools")}),e.jsx(p,{value:"产品管理",children:a("prompts:categories.productManagement")}),e.jsx(p,{value:"文档工具",children:a("prompts:categories.docTools")}),e.jsx(p,{value:"客服助手",children:a("prompts:categories.customerService")}),e.jsx(p,{value:"数据分析",children:a("prompts:categories.dataAnalysis")})]})})})]}),e.jsx(x.Item,{name:"description",label:a("prompts:form.description"),rules:[{required:!0,message:a("prompts:form.descriptionRequired")}],children:e.jsx(Q,{rows:2,placeholder:a("prompts:form.descriptionPlaceholder")})}),e.jsx(x.Item,{name:"content",label:a("prompts:form.content"),rules:[{required:!0,message:a("prompts:form.contentRequired")}],children:e.jsx(Q,{rows:8,placeholder:a("prompts:form.contentPlaceholder")})}),e.jsxs(v,{gutter:16,children:[e.jsx(n,{span:8,children:e.jsx(x.Item,{name:"language",label:a("prompts:form.language"),rules:[{required:!0,message:a("prompts:form.languageRequired")}],children:e.jsxs(N,{placeholder:a("prompts:form.languagePlaceholder"),children:[e.jsx(p,{value:"zh-CN",children:"中文"}),e.jsx(p,{value:"en-US",children:"English"}),e.jsx(p,{value:"ja-JP",children:"日本語"})]})})}),e.jsx(n,{span:8,children:e.jsx(x.Item,{name:"difficulty",label:a("prompts:form.difficulty"),rules:[{required:!0,message:a("prompts:form.difficultyRequired")}],children:e.jsxs(N,{placeholder:a("prompts:search.difficulty"),children:[e.jsx(p,{value:"beginner",children:a("prompts:difficulty.beginner")}),e.jsx(p,{value:"intermediate",children:a("prompts:difficulty.intermediate")}),e.jsx(p,{value:"advanced",children:a("prompts:difficulty.advanced")})]})})}),e.jsx(n,{span:8,children:e.jsx(x.Item,{name:"isPublic",label:a("prompts:detail.isPublic"),valuePropName:"checked",children:e.jsx(me,{})})})]}),e.jsx(Te,{$isDark:i,message:a("prompts:form.variableTip"),description:a("prompts:form.variableTipDescription"),type:"info",showIcon:!0})]})})},{Text:W}=ae,Me=h(ee)`
  .ant-modal-content {
    background: ${s=>s.$isDark?"#1f1f1f":"#ffffff"};
    border: ${s=>s.$isDark?"1px solid #303030":"1px solid #d9d9d9"};
  }

  .ant-modal-header {
    background: ${s=>s.$isDark?"#1f1f1f":"#ffffff"};
    border-bottom: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};

    .ant-modal-title {
      color: ${s=>s.$isDark?"#ffffff":"#000000"};
    }
  }

  .ant-modal-body {
    background: ${s=>s.$isDark?"#1f1f1f":"#ffffff"};
    padding: 24px;
  }

  .ant-modal-footer {
    background: ${s=>s.$isDark?"#1f1f1f":"#ffffff"};
    border-top: ${s=>s.$isDark?"1px solid #303030":"1px solid #f0f0f0"};
  }
`,_e=h(d)`
  &.ant-descriptions-bordered {
    .ant-descriptions-item-label {
      background: ${s=>s.$isDark?"#262626":"#fafafa"};
      color: ${s=>s.$isDark?"#ffffff":"#000000d9"};
      border-color: ${s=>s.$isDark?"#303030":"#f0f0f0"};
    }

    .ant-descriptions-item-content {
      background: ${s=>s.$isDark?"#1f1f1f":"#ffffff"};
      color: ${s=>s.$isDark?"#ffffff":"#000000d9"};
      border-color: ${s=>s.$isDark?"#303030":"#f0f0f0"};
    }

    .ant-descriptions-view {
      border-color: ${s=>s.$isDark?"#303030":"#f0f0f0"};
    }
  }
`,U=h(O)`
  background: ${s=>s.$isDark?"#1f1f1f":"#ffffff"};
  border-color: ${s=>s.$isDark?"#303030":"#d9d9d9"};

  .ant-card-head {
    background: ${s=>s.$isDark?"#262626":"#fafafa"};
    border-bottom-color: ${s=>s.$isDark?"#303030":"#f0f0f0"};

    .ant-card-head-title {
      color: ${s=>s.$isDark?"#ffffff":"#000000d9"};
    }
  }

  .ant-card-body {
    background: ${s=>s.$isDark?"#1f1f1f":"#ffffff"};
    color: ${s=>s.$isDark?"#ffffff":"#000000d9"};
  }
`,Ne=h.div`
  background: ${s=>s.$isDark?"#0d1117":"#f6f8fa"};
  border: ${s=>s.$isDark?"1px solid #30363d":"1px solid #e1e4e8"};
  border-radius: 6px;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'SF Mono', 'Consolas', 'Liberation Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
  color: ${s=>s.$isDark?"#e6edf3":"#24292f"};

  /* 滚动条样式 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${s=>s.$isDark?"#161b22":"#f1f3f4"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${s=>s.$isDark?"#484f58":"#c1c1c1"};
    border-radius: 4px;

    &:hover {
      background: ${s=>s.$isDark?"#656c76":"#a8a8a8"};
    }
  }

  /* 代码高亮效果 */
  .variable {
    color: ${s=>s.$isDark?"#79c0ff":"#0969da"};
    font-weight: 600;
  }

  .keyword {
    color: ${s=>s.$isDark?"#ff7b72":"#cf222e"};
    font-weight: 600;
  }
`,Pe=({visible:s,selectedPrompt:r,onCancel:I,onCopyPrompt:S,categoryMap:j,difficultyMap:a,getCategoryKey:$})=>{var T,R,M;const{t:i}=E(["prompts","common"]),{currentTheme:b}=H(c=>c.theme),l=b==="dark",P=c=>{if(!c)return c;let k=c.replace(/\{\{([^}]+)\}\}/g,'<span class="variable">{{$1}}</span>');return["请","帮助","分析","总结","生成","创建","优化","改进"].forEach(F=>{const A=new RegExp(`(${F})`,"g");k=k.replace(A,'<span class="keyword">$1</span>')}),k};return e.jsx(Me,{$isDark:l,title:r==null?void 0:r.name,open:s,onCancel:I,footer:null,width:1e3,style:{top:20},destroyOnClose:!0,children:r&&e.jsxs("div",{children:[e.jsxs(_e,{$isDark:l,bordered:!0,column:2,style:{marginBottom:24},children:[e.jsx(d.Item,{label:i("prompts:detail.templateName"),span:2,children:r.name}),e.jsx(d.Item,{label:i("prompts:detail.category"),children:e.jsx(f,{color:(T=j[r.category])==null?void 0:T.color,icon:(R=j[r.category])==null?void 0:R.icon,children:i(`prompts:categories.${$(r.category)}`)})}),e.jsx(d.Item,{label:i("prompts:detail.difficulty"),children:e.jsx(f,{color:(M=a[r.difficulty])==null?void 0:M.color,children:i(`prompts:difficulty.${r.difficulty}`)})}),e.jsx(d.Item,{label:i("prompts:detail.rating"),children:e.jsxs(u,{children:[e.jsx(te,{disabled:!0,value:r.rating,allowHalf:!0}),e.jsx(W,{style:{color:l?"#ffffff":"#000000d9"},children:r.rating})]})}),e.jsxs(d.Item,{label:i("prompts:detail.usageCount"),children:[r.usageCount,i("common:unit.times")]}),e.jsx(d.Item,{label:i("prompts:detail.language"),children:r.language}),e.jsx(d.Item,{label:i("prompts:detail.version"),children:r.version}),e.jsx(d.Item,{label:i("prompts:detail.status"),children:e.jsxs(u,{children:[r.isPublic&&e.jsx(f,{color:"blue",children:i("prompts:status.public")}),r.isFavorite&&e.jsx(f,{color:"gold",icon:e.jsx(V,{}),children:i("prompts:status.favorite")})]})}),e.jsx(d.Item,{label:i("prompts:detail.creator"),children:r.createdBy}),e.jsx(d.Item,{label:i("prompts:detail.createdAt"),children:r.createdAt}),e.jsx(d.Item,{label:i("prompts:detail.lastUsed"),children:r.lastUsed}),e.jsx(d.Item,{label:i("prompts:detail.description"),span:2,children:r.description})]}),e.jsxs(U,{$isDark:l,title:i("prompts:detail.content"),style:{marginBottom:16},children:[e.jsx(Ne,{$isDark:l,dangerouslySetInnerHTML:{__html:P(r.content)}}),e.jsx("div",{style:{marginTop:12,textAlign:"right"},children:e.jsx(C,{icon:e.jsx(he,{}),onClick:()=>S(r),style:{color:l?"#ffffff":"#000000d9",borderColor:l?"#303030":"#d9d9d9",background:l?"#262626":"#ffffff"},children:i("prompts:actions.copy")})})]}),e.jsxs(v,{gutter:16,children:[e.jsx(n,{span:12,children:e.jsx(U,{$isDark:l,title:i("prompts:detail.variablesList"),size:"small",children:r.variables.length>0?e.jsx(u,{wrap:!0,children:r.variables.map(c=>e.jsx(f,{color:"blue",children:`{${c}}`},c))}):e.jsx(W,{type:"secondary",style:{color:l?"#8c8c8c":"#00000073"},children:i("prompts:detail.noVariables")})})}),e.jsx(n,{span:12,children:e.jsx(U,{$isDark:l,title:i("prompts:detail.tags"),size:"small",children:e.jsx(u,{wrap:!0,children:r.tags.map(c=>e.jsx(f,{children:c},c))})})})]})]})})},{Title:Fe,Paragraph:X,Text:Oe}=ae,Ae=h.div`
  padding: 24px;
`,Be=h.div`
  margin-bottom: 24px;
`,_=h(O)`
  .ant-card-body {
    padding: 16px;
  }
`,ze=h(O)`
  height: 100%;
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
`;const Le=()=>{const{t:s}=E(["prompts","common"]),{currentTheme:r}=H(t=>t.theme),[I,S]=m.useState(!1),[j,a]=m.useState(!1),[$,i]=m.useState(!1),[b,l]=m.useState(null),[P,T]=m.useState(null),[R,M]=m.useState(""),[c,k]=m.useState("all"),[L,F]=m.useState("all"),[A,re]=m.useState("all"),[w]=x.useForm();m.useEffect(()=>{Ie(s("prompts:title"))},[s]);const g=[{id:"1",name:"代码审查助手",category:"开发工具",description:"帮助开发者进行代码审查，识别潜在问题和改进建议",content:`你是一个专业的代码审查专家。请仔细审查以下代码，并提供详细的反馈：

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

请确保文档结构清晰，内容详实，易于理解。`,variables:["project_name","module_name","tech_stack","api_details","use_cases"],tags:["技术文档","文档生成","API文档"],language:"zh-CN",difficulty:"beginner",rating:4.4,usageCount:423,isPublic:!1,isFavorite:!1,createdBy:"技术团队",createdAt:"2024-06-05",lastModified:"2024-06-13",lastUsed:"2024-06-15 11:15:00",version:"1.0"}],K={开发工具:{color:"blue",icon:e.jsx(Ce,{})},运维工具:{color:"green",icon:e.jsx(De,{})},产品管理:{color:"orange",icon:e.jsx(we,{})},文档工具:{color:"purple",icon:e.jsx(z,{})},客服助手:{color:"cyan",icon:e.jsx(ke,{})},数据分析:{color:"red",icon:e.jsx($e,{})}},Y={beginner:{name:"初级",color:"green"},intermediate:{name:"中级",color:"orange"},advanced:{name:"高级",color:"red"}},J=t=>({开发工具:"devTools",运维工具:"opsTools",产品管理:"productManagement",文档工具:"docTools",客服助手:"customerService",数据分析:"dataAnalysis"})[t]||"devTools",ie=()=>{l(null),w.resetFields(),a(!0)},le=t=>{l(t),w.setFieldsValue({name:t.name,category:t.category,description:t.description,content:t.content,language:t.language,difficulty:t.difficulty,isPublic:t.isPublic}),a(!0)},Z=t=>{T(t),i(!0)},oe=t=>{navigator.clipboard.writeText(t.content),q.success(s("prompts:messages.copySuccess"))},ne=async()=>{try{const t=await w.validateFields();b?q.success(s("prompts:messages.updateSuccess")):q.success(s("prompts:messages.createSuccess")),a(!1),w.resetFields()}catch(t){console.error("表单验证失败:",t)}},ce=()=>g.map(t=>{const o=K[t.category],B=Y[t.difficulty];return e.jsx(n,{xs:24,sm:24,md:12,lg:8,xl:8,children:e.jsxs(ze,{title:e.jsxs("div",{className:"card-title",children:[e.jsx("div",{className:"title-left",children:e.jsxs(u,{children:[o==null?void 0:o.icon,e.jsx("span",{children:t.name})]})}),e.jsx("div",{className:"title-right",children:t.isFavorite&&e.jsx(V,{})})]}),onClick:()=>Z(t),children:[e.jsx("div",{style:{marginBottom:12},children:e.jsxs(u,{wrap:!0,children:[e.jsx(f,{color:o==null?void 0:o.color,icon:o==null?void 0:o.icon,children:s(`prompts:categories.${J(t.category)}`)}),e.jsx(f,{color:B==null?void 0:B.color,children:s(`prompts:difficulty.${t.difficulty}`)}),t.isPublic&&e.jsx(f,{color:"blue",children:s("prompts:status.public")})]})}),e.jsx(X,{ellipsis:{rows:2},style:{marginBottom:16,minHeight:40},children:t.description}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(v,{gutter:16,children:[e.jsx(n,{span:12,children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(te,{disabled:!0,value:t.rating,allowHalf:!0}),e.jsx("div",{children:t.rating})]})}),e.jsx(n,{span:12,children:e.jsx(D,{title:s("prompts:stats.usageCount"),value:t.usageCount})})]})}),e.jsx("div",{style:{marginBottom:12},children:e.jsxs(u,{wrap:!0,children:[t.tags.slice(0,3).map(y=>e.jsx(f,{size:"small",children:y},y)),t.tags.length>3&&e.jsxs(f,{size:"small",children:["+",t.tags.length-3]})]})}),e.jsxs("div",{style:{fontSize:12,color:"#666"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[e.jsxs("span",{children:[s("prompts:detail.version"),":"]}),e.jsx("span",{children:t.version})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("span",{children:[s("prompts:detail.lastUsed"),":"]}),e.jsx("span",{children:t.lastUsed})]})]}),e.jsx("div",{className:"card-actions",children:e.jsxs(u,{children:[e.jsx(G,{title:s("prompts:actions.view"),children:e.jsx(C,{type:"text",icon:e.jsx(ye,{}),size:"small",onClick:y=>{y.stopPropagation(),Z(t)}})}),e.jsx(G,{title:s("prompts:actions.edit"),children:e.jsx(C,{type:"text",icon:e.jsx(ve,{}),size:"small",onClick:y=>{y.stopPropagation(),le(t)}})})]})})]})},t.id)}),de=g.filter(t=>t.isPublic).length,pe=g.filter(t=>t.isFavorite).length;g.reduce((t,o)=>t+o.usageCount,0);const fe=g.reduce((t,o)=>t+o.rating,0)/g.length;return e.jsxs(Ae,{className:"prompt-templates-page",children:[e.jsxs(Be,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8},children:[e.jsx(Fe,{level:2,style:{margin:0},children:e.jsxs(u,{children:[e.jsx(z,{}),s("prompts:title")]})}),e.jsxs(u,{children:[e.jsx(C,{icon:e.jsx(xe,{}),children:s("common:refresh")}),e.jsx(C,{type:"primary",icon:e.jsx(ge,{}),onClick:ie,children:s("prompts:createPrompt")})]})]}),e.jsx(X,{style:{marginTop:0,marginBottom:0},children:s("prompts:subtitle")})]}),e.jsxs(v,{gutter:16,style:{marginBottom:24},children:[e.jsx(n,{xs:24,sm:12,md:6,children:e.jsx(_,{className:"prompt-stats-primary",children:e.jsx(D,{title:s("prompts:stats.totalTemplates"),value:g.length,prefix:e.jsx(z,{})})})}),e.jsx(n,{xs:24,sm:12,md:6,children:e.jsx(_,{className:"prompt-stats-success",children:e.jsx(D,{title:s("prompts:stats.publicTemplates"),value:de,prefix:e.jsx(je,{})})})}),e.jsx(n,{xs:24,sm:12,md:6,children:e.jsx(_,{className:"prompt-stats-warning",children:e.jsx(D,{title:s("prompts:stats.favoriteTemplates"),value:pe,prefix:e.jsx(V,{})})})}),e.jsx(n,{xs:24,sm:12,md:6,children:e.jsx(_,{className:"prompt-stats-purple",children:e.jsx(D,{title:s("prompts:stats.averageRating"),value:fe.toFixed(1),prefix:e.jsx(be,{})})})})]}),e.jsx(Se,{searchValue:R,onSearchChange:M,searchPlaceholder:s("prompts:search.placeholder"),filters:[{key:"category",value:c,onChange:k,placeholder:s("prompts:search.category"),width:120,options:[{value:"all",label:s("prompts:search.allCategories")},{value:"开发工具",label:s("prompts:categories.devTools")},{value:"运维工具",label:s("prompts:categories.opsTools")},{value:"产品管理",label:s("prompts:categories.productManagement")},{value:"文档工具",label:s("prompts:categories.docTools")},{value:"客服助手",label:s("prompts:categories.customerService")},{value:"数据分析",label:s("prompts:categories.dataAnalysis")}]},{key:"difficulty",value:L,onChange:F,placeholder:s("prompts:search.difficulty"),width:100,options:[{value:"all",label:s("prompts:search.allDifficulties")},{value:"beginner",label:s("prompts:difficulty.beginner")},{value:"intermediate",label:s("prompts:difficulty.intermediate")},{value:"advanced",label:s("prompts:difficulty.advanced")}]},{key:"status",value:A,onChange:re,placeholder:s("prompts:search.status"),width:100,options:[{value:"all",label:s("prompts:search.allStatuses")},{value:"public",label:s("prompts:status.public")},{value:"private",label:s("prompts:status.private")},{value:"favorite",label:s("prompts:status.favorite")}]}],onRefresh:()=>window.location.reload()}),e.jsx(v,{gutter:[16,16],children:ce()}),e.jsx(Re,{visible:j,editingPrompt:b,form:w,onOk:ne,onCancel:()=>a(!1)}),e.jsx(Pe,{visible:$,selectedPrompt:P,onCancel:()=>i(!1),onCopyPrompt:oe,categoryMap:K,difficultyMap:Y,getCategoryKey:J})]})};export{Le as default};
