# Hofter 插件开发进度与计划

## 项目概述
Hofter 是一个基于 Roche 平台的沉浸式同人小说社区插件。以"你的视角，看世界怎么嗑你和TA"为核心理念，提供AI驱动的同人创作、阅读、互动体验。

## 架构
- 单文件插件架构：`plugin.js`（约5000+行）
- CSS-in-JS 注入
- 状态管理：全局 `state` 对象
- DOM操作：直接操作 `state.containerEl`
- Roche API：`roche.ai.chat`, `roche.character`, `roche.persona`, `roche.memory`, `roche.conversation`, `roche.storage`, `roche.ui`
- 原生JS能力：可操作页面DOM、模拟用户输入、监听DOM变化

## AI分层架构
| 层级 | 功能 | 提示词 | 状态 |
|------|------|--------|------|
| L1 | 批量生成同人文摘要（10-15篇） | `PROMPTS.layer1Summary` / `layer1SummaryEN` | ✅ 完成 |
| L2 | 单篇完整正文生成（含macro_chain思维链） | `PROMPTS.layer2Full` / `layer2FullEN` | ✅ 完成 |
| L3 | 评论区生成（模拟同人女生态） | `PROMPTS.layer3Comments` / `layer3CommentsEN` | ✅ 完成 |
| 续写 | 追更续写（复用L2提示词+续写模式声明） | 复用 `PROMPTS.layer2Full` | ✅ 完成 |
| 灵感补全 | 创作页灵感补全 | `PROMPTS.inspirationComplete` | ✅ 完成 |
| 角色评论 | 单角色评论生成 | `PROMPTS.charCommentCN` / `charCommentEN` | ✅ 完成 |
| 群聊角色评论 | 群聊多角色评论 | `PROMPTS.groupCharCommentCN` / `groupCharCommentEN` | ✅ 完成 |
| 标签探索 | 探索新标签生成 | `PROMPTS.exploreTags` | ✅ 完成 |

## 页面与导航
| 页面 | ID | 功能 | 状态 |
|------|-----|------|------|
| 首页 | home | 关注/订阅 feed流 | ✅ 完成 |
| 发现 | discover | 推荐/热门/标签探索 + 搜索 | ✅ 完成（有bug修复） |
| 收藏 | collection | 收藏的文章列表 | ✅ 完成 |
| 我的 | profile | 个人作品 + 设置入口 | ✅ 完成 |
| 标签页 | tagPage | CP标签/梗标签详情页 | ✅ 完成 |
| 阅读器 | (overlay) | 章节阅读 + 追更 + 评论 + 模型上下文 | ✅ 完成 |
| 创作页 | (sheet) | 灵感创作/写文章/发动态 | ✅ 完成 |
| 设置页 | (sheet) | 各种设置项 | ✅ 完成 |
| 模型预设 | (sheet) | 自定义API模型配置 | ✅ 完成 |

## 核心功能完成度

### ✅ 已完成
1. **开屏引导** - 3步引导（选人设→选CP→选梗标签）
2. **L1摘要批量生成** - 下拉刷新获取10-15篇推荐
3. **L2正文生成** - 含7步macro_chain思维链 + inline_checks
4. **L3评论生成** - 模拟同人女评论区生态（13种评论者类型）
5. **续写/追更** - 复用L2提示词，注入续写模式声明
6. **灵感补全** - 创作页AI辅助
7. **阅读器** - 章节切换、字号调节、深色模式
8. **评论系统** - 划线评、普通评、角色评
9. **收藏功能** - 文章收藏/取消收藏
10. **搜索功能** - 搜索角色、标签、作品
11. **标签系统** - CP标签 + 梗标签，探索新标签
12. **分享给角色** - 分享到聊天，角色自动评论
13. **角色评论** - 单聊/群聊角色评论生成
14. **模型上下文查看** - 查看系统提示词、用户消息、记忆、主思维链、内联校验
15. **模型上下文随章节切换** - 切换章节时自动切换上下文标签
16. **自定义模型预设** - 支持配置自定义API endpoint
17. **用户创作发布** - 手写文章 + 发布
18. **记忆挂载** - 选择挂载到哪些会话

### 🔧 已修复的Bug
1. **extractDeltaText作用域错误** - 从aiChatStream内部移到外部，修复flash模型L3报错
2. **发布文章换行丢失** - renderRichText中\n转<br>
3. **热门/tag探索界面无法打开** - switchDiscoverTab恢复contentEl display
4. **中文内联扫描重复④** - 重新编号①-⑭
5. **contentSummary续写时不生成** - 保存result.content_summary
6. **主思维链不返回** - 加强RULE 1/2/3格式要求
7. **续写用错提示词** - 改用L2提示词
8. **briefSummary冗余** - 已删除
9. **缓存保存覆盖用户作品** - 添加isByUser检查
10. **buildShareCardText内容类型错误** - chapters[i].content是数组不是字符串

### ⚠️ 已知问题 / 待验证
1. **主思维链是否稳定返回** - 已加强提示词但未确认
2. **角色评论在群聊中的表现** - 需要实际测试
3. **分享卡片在聊天中的渲染** - MutationObserver方案需验证
4. **热门/tag探索界面** - 修复了display问题，需确认是否还有其他原因

### 📋 待开发 / 完善
1. **前端UI打磨**
   - 阅读器排版优化
   - 卡片设计美化
   - 动效优化
   - 响应式布局完善
2. **功能增强**
   - 图片发布（已有占位）
   - 视频发布（已有占位）
   - 动态发布完善
   - 消息通知系统
   - 评论互动（回复评论）
   - 多章节管理（编辑/删除章节）
3. **稳定性**
   - AI生成重试机制
   - 网络错误处理
   - 数据持久化增强
   - 大量文章时的性能优化
4. **提示词优化**
   - L2格式示范效果验证
   - 续写质量验证
   - 角色评论质量调优
   - 英文提示词质量验证

## 设置项一览
| 设置项 | 字段 | 默认值 | 说明 |
|--------|------|--------|------|
| 主题 | theme | light | light/dark |
| 提示词语言 | promptLanguage | zh | zh/en |
| 字数范围下限 | wordCountMin | 3000 | L2生成最小字数 |
| 字数范围上限 | wordCountMax | 8000 | L2生成最大字数 |
| 记忆挂载概率 | memoryAttachProbability | 30 | 0-100 |
| CP模式 | cpMode | default | default/unrestricted |
| 自动生成评论 | autoGenerateComments | true | 阅读时是否自动生成 |
| 自动关注梗标签 | autoFollowTropeTags | true | 是否自动关注用过的梗 |
| 开屏完成 | onboardCompleted | false | 是否完成引导 |
| 挂载会话 | mountedConversationIds | [] | 挂载记忆的会话ID列表 |
| 自定义模型预设 | modelPresets | [] | 自定义API配置列表 |

## 数据结构
- `state.summaries` - 文章摘要列表
- `state.cpTags` - CP标签列表
- `state.tropeTags` - 梗标签列表
- `state.characters` - 角色列表（从roche获取）
- `state.personas` - 人设列表（从roche获取）
- `state.exploreTagsCache` - 探索标签缓存
- `summary.fullContent` - 完整正文（含chapters, inline_checks）
- `summary._debugContext` - L2调试上下文
- `summary._continuationContexts` - 续写调试上下文数组
- `summary._sharedConversations` - 分享到的会话列表
- `summary.contentSummary` - 200字内容摘要
- `summary.comments` - 评论数组
