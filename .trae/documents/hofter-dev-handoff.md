# Hofter 插件 — 完整项目对接文档

> 本文档面向接手此项目的 AI 模型，包含完整的架构、文件结构、函数清单、数据流和关键代码段。

---

## 一、项目概览

Hofter 是一个运行在 **Roche 平台**（类 Character.AI + Lofter 混合平台）上的同人小说社区插件。功能包括：

- **同人文生成**：L1 摘要 → L2 正文 → L3 评论区（由 AI 生成）
- **标签系统**：CP 标签（角色配对）+ 梗标签（设定关键词）+ 标签探索（AI 生成推荐标签）
- **用户创作**：用户可写自己的同人文并发布
- **分享系统**（核心）：用户将文章分享到 Roche 聊天界面，AI 角色自动生成评论

### 两个插件

| 插件 | 文件 | 用途 |
|------|------|------|
| Hofter（主） | `plugin.js` | 同人文生成、阅读、分享、管理 |
| Hofter Monitor（监控） | `hofter-monitor.js` | 调试工具，DOM 扫描、路由嗅探、会话列表查看 |

---

## 二、需读取的文件清单

1. **`e:\所有文件\hofter-plugin\plugin.js`**（约 6000 行）— **主插件，核心修改对象**
2. **`e:\所有文件\hofter-plugin\manifest.json`** — 插件清单（权限声明）
3. **`e:\所有文件\hofter-plugin\hofter-monitor.js`** — 监控插件（参考悬浮球实现）
4. **`e:\所有文件\hofter-plugin\hofter-monitor-manifest.json`** — 监控插件清单
5. **`e:\所有文件\全部css整理版.txt`** — Roche 前台全部 CSS（提供真实 CSS 类名）

---

## 三、Roche 插件框架核心约定

```js
window.RochePlugin.register({
  id: "hofter",
  name: "hofter",
  version: "2.0.0",
  apps: [{
    id: "hofter-home",
    name: "hofter",
    icon: "extension",
    mount: function(container, roche) {
      // container: DOM 元素，插件渲染于此
      // roche: Roche API 对象
    },
    unmount: function(container) {
      // 清理
    }
  }]
});
```

### 可用的 Roche API

| API | 说明 |
|-----|------|
| `roche.ui.closeApp()` | 关闭当前插件 |
| `roche.ui.toast(msg)` | 显示 Toast |
| `roche.storage.get/set/delete(key, value)` | 数据隔离存储（**跨 mount/unmount 持久化**） |
| `roche.conversation.list(options)` | 获取会话列表 |
| `roche.conversation.get(id)` | 获取单个会话详情 |
| `roche.persona.getUserPersonas()` | 获取用户人设列表 |
| `roche.character.get(id)` | 获取角色信息 |
| `roche.memory.getLongTerm(options)` | 读取长期记忆 |
| `roche.memory.getShortTerm(options)` | 读取短期记忆 |
| `roche.memory.write(options)` | 写入事实记忆 |

### 重要限制

- **插件无法通过 JS 触发 Roche 页面导航**（`history.pushState` 不触发 Vue Router，`window.location.href` 导致黑屏）
- `roche.memory.write` 只能写"事实记忆"，不能修改短期记忆（对话上下文）

### Roche 前端技术栈

- **Vue 3 SPA**，生产构建，移除了 `__vue_app__` 入口
- **History 路由**，格式 `/chat/c_XXXXXXXXXXXXX`
- 真实 CSS 类名：`.chat-input-textarea`, `.conversation-item`, `.conv-name`, `.chat-header-button--back`, `.chat-header-title`, `.bottom-nav`

---

## 四、plugin.js 函数结构总览

### 4.1 核心数据

```
L53-884   var PROMPTS        → AI 提示词（L1/L2/L3/Explore/CharComment 等）
L886-926  var state          → 全局状态对象（所有运行时数据）
L4145-4156 var _shareBallState → 分享悬浮球状态
```

### 4.2 工具函数

| 行号 | 函数 | 说明 |
|------|------|------|
| L929 | `escapeHtml(text)` | HTML 转义 |
| L936 | `renderRichText(text)` | 富文本渲染（双引号加粗、翻译样式） |
| L970 | `generateId()` | 生成唯一 ID |
| L991 | `showToast(msg)` | 显示 Toast |
| L1023 | `showLoading()` | 显示加载中 |
| L1029 | `hideLoading()` | 隐藏加载中 |
| L1047 | `getPersonaById(id)` | 按 ID 获取人设 |
| L1048 | `getCharById(id)` | 按 ID 获取角色 |

### 4.3 存储封装

| 行号 | 函数 | 说明 |
|------|------|------|
| L1051 | `personaKey(baseKey)` | 生成人设作用域 key |
| L1056 | `getSettings()` | 获取设置（深拷贝） |
| L1057 | `saveSettings(s)` | 保存设置 |
| L1058-1060 | `saveCpTags/saveTropeTags/saveFandomTags` | 保存标签数据 |
| L1061 | `saveSummariesCache(a)` | 保存 AI 生成作品缓存 |
| L1075 | `savePublishedWorks(a)` | 保存用户创作作品 |

### 4.4 AI 生成函数

| 行号 | 函数 | 说明 |
|------|------|------|
| L1103 | `aiChatStream(...)` | AI 流式对话 |
| L1313 | `customAiChat(...)` | 自定义模型 API 调用 |
| L1469 | `generateLayer1Summaries(...)` | 生成 L1 摘要（10-15 篇） |
| L1601 | `generateLayer2Full(...)` | 生成 L2 完整正文 |
| L1744 | `generateLayer3Comments(...)` | 生成 L3 评论区 |
| L1779 | `generateContinuation(...)` | 续写正文 |
| L1902 | `generateExploreTags(...)` | 生成标签探索推荐标签 |

### 4.5 页面渲染

| 行号 | 函数 | 说明 |
|------|------|------|
| L2333 | `renderApp()` | 主渲染入口 |
| L2410 | `renderHomePage(container)` | 首页渲染 |
| L2491 | `renderDiscoverPage(container)` | 发现页渲染 |
| L2506 | `renderDiscoverTabContent(container)` | 发现页 tab 内容 |
| L2561 | `renderExploreTab(container)` | 标签探索 tab |
| L2571 | `renderExploreTagsList(container, tags)` | 标签探索列表渲染 |
| L2670 | `renderProfilePage(container)` | 我的页面 |
| L2760 | `renderTagPage(container)` | Tag 专属页面 |
| L2851 | `renderOnboarding()` | 开屏引导 |
| L3072 | `showSettings()` | 设置页 |
| L3352 | `openReader()` | 打开沉浸式阅读器 |
| L3410 | `renderReaderContent(summary)` | 渲染阅读器内容 |
| L3492 | `renderComments(comments, ...)` | 渲染评论区 |

### 4.6 下拉刷新

| 行号 | 函数 | 说明 |
|------|------|------|
| L2894 | `initPullToRefresh(el)` | 初始化下拉刷新 |
| L2997 | `doRefresh()` | 执行刷新（在 explore tab 时调用 loadExploreTags） |

### 4.7 分享核心（关键修改区域）

#### 辅助函数

| 行号 | 函数 | 说明 |
|------|------|------|
| L3618 | `buildShareCardText(summary, sendSummary)` | **构建分享卡片文本** |
| L3668 | `waitForElement(selector, timeout)` | 轮询等待 DOM 元素 |
| L3685 | `findChatInput()` | 查找聊天输入框（`.chat-input-textarea` 等） |
| L3710 | `injectAndSend(text)` | 注入文本到聊天输入框并发送（找输入框 → doInject → Enter） |
| L3730 | `doInject(input, text)` | 实际注入逻辑（set value → dispatch input/change → 300ms 后 dispatch Enter） |

#### 废弃函数（已删除，勿使用）

- `clickBottomNavInbox()` — 已删除
- `navigateToChat()` — 已删除
- `probeVueRouter()` — 已删除
- `searchVnodeForRouter()` — 已删除
- `domClickFallback()` — 已删除
- `phase1_ensureInboxPage()` — 已删除
- `phase2_clickConversation()` — 已删除
- `autoInjectAfterNav()` — 已删除

#### 角色评论生成

| 行号 | 函数 | 说明 |
|------|------|------|
| L3751 | `injectNarratorMessage(conversationId, text)` | 注入旁白消息到聊天界面（⚠️ 不可用） |
| L3769 | `writeCharFactMemory(...)` | 写入事实记忆（⚠️ 不再使用） |
| L3784 | `checkSharedInConversations(summary, callback)` | 检查已分享会话，触发角色评论生成 |
| L3839 | `generateCharCommentForShared(...)` | 评论生成入口（判断单聊/群聊） |
| L3856 | `generateCharComment(...)` | **单聊角色评论生成** |
| L3954 | `generateGroupCharComments(...)` | **群聊多角色评论生成** |
| L4103 | `startChatMessageObserver()` | MutationObserver 监听聊天消息 |
| L4117 | `enhanceShareCardInChat(node)` | 将纯文本分享消息渲染为卡片样式 |

### 4.8 分享悬浮球（v2.0.0 新增）

| 行号 | 函数 | 说明 |
|------|------|------|
| L4145 | `var _shareBallState` | 悬浮球状态对象 |
| L4158 | `getCurrentConversationId()` | **从 URL 检测当前会话 ID**（`/chat/(c_\d+)`） |
| L4165 | `getPendingShares()` | **读取 pending shares**（先 localStorage 后备 roche.storage） |
| L4192 | `removePendingShare(shareId)` | 移除一个 pending share |
| L4212 | `updateShareBadge(count)` | 更新悬浮球角标 |
| L4217 | `hideShareBall()` | 隐藏悬浮球 |
| L4226 | `renderShareBall()` | **渲染悬浮球**（触摸/鼠标事件、拖拽、MutationObserver） |
| L4329 | `toggleSharePanel()` | 切换悬浮球面板 |
| L4343 | `renderSharePanel()` | **渲染分享面板**（待分享列表 + 分享/记忆按钮） |
| L4395 | `panelEventBlock(el)` | 面板事件 stopPropagation |
| L4404 | `checkAndShowShareBall()` | mount 时检查 pending shares |
| L4415 | `getCurrentConvNameFromSummary(summary)` | 从 summary 获取最新会话 ID |
| L4424 | `findSummaryById(id)` | 按 ID 查找作品 |

### 4.9 全局 API（`window.__hofter.*`）

| 行号 | API | 说明 |
|------|-----|------|
| L4436 | `createHofterAPI()` | 返回 API 对象 |
| — | `.shareWork()` | **显示分享面板**（简化版，只有内容模式选择） |
| — | `.doShareWork()` | **存入分享**（构建卡券 → 存入 roche.storage） |
| — | `.injectShareFromBall(shareId)` | **悬浮球注入分享**（检测会话 → injectAndSend → 更新 sharedInfo） |
| — | `.injectMemoryFromBall(shareId)` | 悬浮球注入记忆文本 |
| — | `.setShareMemoryMode(mode)` | 切换记忆注入方式 |

### 4.10 插件注册

| 行号 | 说明 |
|------|------|
| L5814 | `RochePlugin.register({...})` |
| L5824 | `mount(container, roche)` — 加载数据 → renderApp → checkAndShowShareBall |
| L5911 | `unmount(container)` — 清理 DOM，保留 window.__hofter |

---

## 五、分享系统完整数据流

### 5.1 数据存储

#### pending share（`roche.storage` key: `_hofter_pending_shares`）

```json
[{
  "id": "share_1234567890_abcd",
  "summaryId": "sum_xxx",
  "title": "文章标题",
  "cpTagName": "CP名",
  "author": "作者",
  "isByUser": false,
  "cardText": "完整分享文本...",
  "sendSummary": true,
  "sharedAt": 1234567890000,
  "memoryText": "📝 [用户名的Hofter分享]\n用户名在Hofter同人社区分享了一篇文章《标题》",
  "conversationId": "",            // 由悬浮球在注入时设置
  "convName": "",
  "contactId": "",
  "isGroup": false
}]
```

#### sharedInfo（内存中存于 `summary._sharedConversations[]`）

```js
{
  conversationId: "",       // 由悬浮球注入后填充
  contactId: "",
  isGroup: false,
  memberIds: [],
  memberProfiles: [],
  sharedAt: 1234567890000,
  sendSummary: true,
  injectedAt: null,          // 悬浮球注入成功时设时间戳
  processed: false,          // 是否已生成角色评论
  detectedAt: null,
  lastCharCommentAt: null
}
```

### 5.2 用户流程（分 4 个阶段）

#### 阶段 A：在 Hofter 中存入分享

```
用户按下"分享"按钮
  → shareWork() [L~5244]
    → 显示底部 sheet：内容模式选择（正文/内容总结）+ "存入分享"按钮
    → 不获取会话列表（用户只管"存"，不选目标）

用户按下"存入分享"
  → doShareWork() [L~5270]
    → buildShareCardText(summary, sendSummary) 构建卡券文本
    → 创建 sharedInfo，追加到 summary._sharedConversations
    → 构建 memoryText（按 shareMemoryMode 设置）
    → 存入 roche.storage + localStorage（key: _hofter_pending_shares）
    → Toast："已保存！请打开聊天后点击悬浮球分享"
```

#### 阶段 B：用户手动打开聊天（Roche 原生操作）

```
用户在 Roche 中手动导航到目标聊天界面
  → mount() 时 checkAndShowShareBall() 自动调用
    → getPendingShares() 检测到有数据
    → renderShareBall() 渲染悬浮球（带角标数字）
    → 悬浮球可自由拖拽
```

#### 阶段 C：通过悬浮球注入分享

```
用户点击悬浮球
  → toggleSharePanel() [L4329]
    → renderSharePanel() [L4343]
      → getCurrentConversationId() 检测 URL 是否是 /chat/c_XXXXX
        → 否：Toast "请先打开聊天界面"
        → 是：显示待分享文章列表

用户点击某项的"分享"按钮
  → injectShareFromBall(shareId) [API]
    → getCurrentConversationId() 确认在聊天页面
    → injectAndSend(cardText) 注入到输入框并 Enter 发送
    → 更新 summary._sharedConversations（设 injectedAt、conversationId）
    → 按设置自动注入记忆文本（auto 模式）
    → removePendingShare(shareId)
    → Toast "分享成功！"
    → 无更多 pending → hideShareBall()
```

#### 阶段 D：角色评论生成（自动）

```
下次用户打开 Hofter 时
  → checkSharedInConversations() [L3784] 检查所有未处理的 sharedInfo
    → 检测是否已送达（injectedAt > 5 秒，或记忆中找到分享内容）
    → processed = true
    → generateCharCommentForShared()
      → 单聊：generateCharComment() [L3856]
        → 读取角色信息 + 记忆 → 构造 prompt → AI 生成评论
      → 群聊：generateGroupCharComments() [L3954]
        → 读取群成员 + 各角色记忆 → 构造 prompt → AI 生成多条评论
    → 评论写入 summary.fullContent.comments
    → renderReaderContent() 刷新阅读页
    → 记忆注入由分享悬浮球负责，不再在生成评论时直接写入
```

### 5.3 分享文本格式

```
📖 {userName}向您分享了一篇Hofter同人社区的文章

【标题】{文章标题}
【作者】{author}（用户创作）     ← isByUser=true 时
【CP】{cpTagName}

【摘要】
{excerpt — L1摘要，始终包含}

【内容总结】                      ← sendSummary=true
{contentSummary}

--- 或 ---

【完整正文】                      ← sendSummary=false
{章节内容拼接}

━━━ 相关评论 ━━━                 ← 已有评论时
{用户名}（分享者）：评论内容
```

### 5.4 聊天中的卡片渲染

`enhanceShareCardInChat` [L4117] 通过 MutationObserver 检测到匹配文本 `📖` + `Hofter同人社区`，自动替换为渐变卡片：

```html
<div style="background:linear-gradient(135deg,rgba(102,126,234,0.08),rgba(118,75,162,0.08));
            border:1px solid rgba(102,126,234,0.2);border-radius:12px;padding:12px;max-width:300px">
  <div style="font-size:11px;color:#667eea;font-weight:600">📖 Hofter同人社区</div>
  <div style="font-size:14px;font-weight:700">{标题}</div>
  <div style="font-size:12px;color:#764ba2">{CP标签}</div>
  <div style="font-size:12px;color:#666;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3">
    {摘要预览（3行截断）}
  </div>
</div>
```

---

## 六、分享悬浮球实现要点

### 6.1 触摸/鼠标事件处理

使用 `_lastTouchTime` 时间戳方案（已在 monitor 插件中验证），**不直接使用 click 事件**：

```js
// 触摸事件
ball.addEventListener("touchstart", function(e) {
  _shareBallState._lastTouchTime = Date.now();
  onStart(t.clientX, t.clientY);
}, { passive: true });

// 鼠标事件 — 触摸后 800ms 内忽略（防止兼容性鼠标事件双触发）
ball.addEventListener("mousedown", function(e) {
  if (Date.now() - _shareBallState._lastTouchTime < 800) return;
  onStart(e.clientX, e.clientY);
  e.preventDefault();
});

// 完全阻止 click 事件
ball.addEventListener("click", function(e) {
  e.preventDefault(); e.stopPropagation();
}, true);
```

### 6.2 togglePanel 防抖

500ms 内只允许一次切换，防止 `touchend` + `mouseup` 双触发。

### 6.3 面板事件阻止冒泡

```js
function panelEventBlock(el) {
  el.addEventListener("touchstart", function(e) { e.stopPropagation(); }, { passive: true });
  el.addEventListener("touchmove", function(e) { e.stopPropagation(); }, { passive: true });
  el.addEventListener("touchend", function(e) { e.stopPropagation(); }, { passive: true });
  el.addEventListener("mousedown", function(e) { e.stopPropagation(); });
  el.addEventListener("mouseup", function(e) { e.stopPropagation(); });
  el.addEventListener("click", function(e) { e.stopPropagation(); });
}
```

### 6.4 悬浮球生命周期

- **mount 时** → `checkAndShowShareBall()` 检查 pending shares
- **有数据** → `renderShareBall()` 渲染悬浮球
- **无数据** → 不渲染
- **unmount 时** → 保留悬浮球（不清理）
- **MutationObserver** → 自动重建被意外移除的悬浮球
- **所有分享完成** → `hideShareBall()` 移除

### 6.5 与 monitor 悬浮球互不干扰

| 项目 | Hofter 分享球 | Monitor 监控球 |
|------|---------------|---------------|
| ID | `hp-share-ball` | `hm-ball` |
| 面板 ID | `hp-share-panel-ball` | `hm-panel` |
| badge ID | `hp-share-ball-badge` | — |

---

## 七、角色评论生成提示词

### 7.1 单聊（`PROMPTS.charCommentCN`）[L879]

```
你是{charName}。{charPersona}

{userName}在Hofter同人社区给你分享了一篇同人文。你知道这是同人文——有人写了关于你们的故事，虽然你不知道为什么。

这篇文章的CP是{cpName}。请你先思考：这和我有关吗？我是CP中的一方吗？还是我只是旁观者？

然后请在文章评论区发表你的感想。

你可以：
- 发表一条或多条评论
- 回复已有的评论
- 对文中具体情节做出反应
- 和其他评论者互动

要求：
- 保持角色性格一致
- 可以对文中的情节表达真实感受
- 反应应与你和{userName}的关系一致
- 你知道这是同人文，但不知道为什么有人写

以下是你的相关记忆：
{coreMemory}

最近聊天摘要：
{shortTermMemory}

返回纯JSON：
{ "comments": [{ "text": "评论内容", "replyTo": "" }] }
```

### 7.2 群聊（`PROMPTS.groupCharCommentCN`）[L881]

```
你是一个同人社区评论系统的模拟器。现在有一篇文章被分享到了一个群聊中。

【群聊成员】{memberList}
【群聊记忆】{groupCoreMemory}
【各角色个人记忆】{individualMemories}

请模拟群聊中各成员的反应。不是每个角色都会评论。

返回JSON：
{ "comments": [{ "name": "角色名", "text": "评论内容", "replyTo": "" }] }
```

### 7.3 变量替换规则

| 模板变量 | 来源 |
|---------|------|
| `{charName}` | `charInfo.handle` 或 `charInfo.name` |
| `{charPersona}` | `charInfo.persona` 或 `charInfo.bio` |
| `{userName}` | `state.activePersona.handle` 或 `state.activePersona.name` |
| `{cpName}` | `summary.cpTagName` |
| `{coreMemory}` | `roche.memory.getLongTerm({conversationId}).core.summary` |
| `{shortTermMemory}` | `roche.memory.getShortTerm({conversationId, limit:100})` 最近 20 条 |

---

## 八、设置项

`state.settings` 对象 [L910]：

```js
settings: {
  onboardCompleted: false,
  activePersonaId: "",
  cpMode: "default",
  mountedConversationIds: [],        // 已挂载的会话 ID 列表
  memoryAttachProbability: 30,       // 记忆传入概率 (%)
  theme: "light",
  fontSize: 17,
  wordCountMin: 3000,
  wordCountMax: 8000,
  autoGenerateComments: false,
  autoFollowTropeTags: false,
  modelPresets: [],
  activeModelPresetId: "",
  promptLanguage: "zh",
  shareMemoryMode: "auto"            // v2.0.0 新增：记忆注入方式
}
```

### "分享记忆注入"三个选项

| 模式 | 说明 |
|------|------|
| `auto` | **自动注入**（默认）：悬浮球发分享文本后 500ms 自动发记忆文本 |
| `manual` | **手动选择**：悬浮球面板额外显示"记忆"按钮，用户自行点击 |
| `none` | **不注入**：不发记忆文本 |

记忆文本格式：
```
✍️ [用户名的Hofter分享]
用户名在Hofter同人社区分享了一篇文章《标题》
作者：作者名
CP：CP名
```

---

## 九、权限声明

### manifest.json

```json
{
  "permissions": [
    "persona:read", "character:read", "memory:read", "memory:write",
    "worldbook:read", "ai:chat", "ai:image", "storage", "ui"
  ]
}
```

### hofter-monitor-manifest.json

```json
{
  "permissions": ["persona:read","character:read","memory:read","worldbook:read","ai:chat","storage","ui"]
}
```

---

## 十、已知 Bug 与待修复事项

1. **分享悬浮球可能不出现（v2.0.0 刚推送，未充分测试）** — 检查 `checkAndShowShareBall()` 是否正确在 mount 时调用，`getPendingShares()` 是否从 `roche.storage` 正确读取到数据
2. **`doShareWork()` 中 `getPendingShares()` 是异步的** — `getPendingShares()` 返回 Promise，确保 `.then()` 调用正确
3. **`enhanceShareCardInChat()` 只在插件 mount 时启动** — 如果用户通过分享悬浮球发送消息时插件已 unmount，卡片美化不会生效。这是已知限制
4. **悬浮球可能和 monitor 悬浮球位置重叠** — 两个悬浮球独立存储位置，各不干扰

---

## 十一、开发与调试指南

### 调试入口

监控插件 `hofter-monitor.js` 提供以下功能：
- 点击"Routes"按钮 → 嗅探当前路由格式
- 点击"Convs"按钮 → 列出所有会话
- 点击"Scan DOM" → 扫描 DOM 中的 Vue 实例
- 悬浮球在关闭 App 后仍可用

### 快速定位行号

在 `plugin.js` 中，使用搜索工具查找函数名即可。

### 注意

- 所有函数都是全局定义的（非模块化），通过 `window.__hofter.*` 暴露给 HTML onclick
- 代码风格使用 ES5（var、function），不使用箭头函数和模板字符串
