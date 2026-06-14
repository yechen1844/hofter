# 分享功能转型计划 v2 — 完整流程文档

## 一、背景：为什么转型

自动跳转聊天界面的所有方案均失败：
- `history.pushState` — 改 URL 不渲染
- `roche.ui.closeApp()` — 黑屏
- `window.location.href` — 黑屏
- Vue Router 探测 — 生产构建移除了入口

**结论：插件无法通过 JS 触发 Roche 页面导航。改为用户手动操作 + 悬浮球辅助注入。**

---

## 二、转换后的完整用户流程

### 阶段 A：在 Hofter 插件中存入分享

1. 用户阅读文章 → 点击"分享"按钮
2. 弹出分享面板（底部 sheet）：
   - **内容模式**：两个按钮切换"正文"/"内容总结"，摘要始终包含
   - **操作按钮**：取消 + **"存入分享"**（原"分享并跳转"）
3. 用户选择内容模式 → 点击"存入分享"
4. 系统执行：
   - 调用 `buildShareCardText()` 构建分享文本
   - 创建 `sharedInfo` 对象，追加到 `summary._sharedConversations`
   - 保存缓存
   - 将分享数据存入 `roche.storage`（key: `_hofter_pending_shares`，数组）
   - 同时存入 `localStorage` 作备份
   - Toast 提示："已保存！请打开聊天后点击悬浮球分享"
5. 用户关闭 Hofter 插件

**不选择目标会话**——分享面板不再获取会话列表。悬浮球会自动检测用户当前所在的聊天界面。

### 阶段 B：用户手动打开聊天

6. 用户在 Roche 中手动导航到目标聊天界面
7. 分享悬浮球自动出现（检测到 `roche.storage` 中有 pending shares）
   - 悬浮球显示**角标数字**（待分享数量）
   - 可自由拖拽
   - 逻辑封装在 `checkAndShowShareBall()` 中

### 阶段 C：通过悬浮球注入分享

8. 用户点击悬浮球 → 弹出分享面板（底部 sheet）

9. 悬浮球**自动检测当前会话**：读取 `window.location.pathname` 提取会话ID
   - 路径格式：`/chat/c_XXXXXXXXXXXXX`
   - 提取：`pathname.match(/\/chat\/(c_\d+)/)` → `c_XXXXXXXXXXXXX`
   - 如果不在聊天页面（URL 不匹配 `/chat/c_`），Toast 提示"请先打开聊天界面"
   - 检测成功后才显示分享列表

10. 面板显示待分享文章列表：
    - **每项显示**：标题、CP标签、内容模式标签（正文/总结）
    - **每项有"分享"按钮**
    - **注入成功后**：
      - 调用 `injectAndSend(cardText)` 将文本注入聊天输入框并**按回车发送**
      - Roche 将其作为 user 消息发出
      - `enhanceShareCardInChat`（MutationObserver）自动检测并**渲染为卡片**（渐变背景 + 标题 + CP + 摘要预览）
      - 设置 `sharedInfo.injectedAt = Date.now()`
      - 从 pending shares 数组中移除该项
      - 更新 `roche.storage` 和 `localStorage`
      - 更新悬浮球角标数字

11. 如果没有 pending shares 了，**隐藏悬浮球**

### 阶段 D：角色评论生成（自动，后台）

12. 下次用户打开 Hofter 插件时，`checkSharedInConversations` 自动检查未处理的分享
13. 对每个 `processed=false` 的 sharedInfo：
    - 检查是否已送达（`injectedAt` 超过5秒，或 `roche.memory.getShortTerm` 中找到分享文本）
    - 确认送达 → `processed=true` → 调用 `generateCharCommentForShared`
14. 角色评论生成后：
    - 评论添加到 `summary.fullContent.comments`
    - 保存缓存 → 重新渲染阅读页
    - **根据用户设置写入记忆**（见第五节）

---

## 三、分享文本格式详解

### `buildShareCardText(summary, sendSummary)` 输出

```
📖 {userName}向您分享了一篇Hofter同人社区的文章

【标题】{文章标题}
【作者】{author}（用户创作）     ← 仅当 isByUser=true 时显示"（用户创作）"
【CP】{cpTagName}

【摘要】
{excerpt — L1摘要，始终包含}

【内容总结】                      ← sendSummary=true 时
{contentSummary}

--- 或 ---

【完整正文】                      ← sendSummary=false 时
{章节内容拼接}

━━━ 相关评论 ━━━                 ← 仅当已有评论时
{用户名}（分享者）：评论内容
{角色名}：评论内容
```

### isByUser 的区别

| 维度 | isByUser=false（AI生成） | isByUser=true（用户创作） |
|------|------------------------|------------------------|
| 作者标注 | `【作者】{author}` | `【作者】{author}（用户创作）` |
| 缓存保存 | `saveSummariesCache` | `savePublishedWorks` |
| 评论生成 | 正常流程 | 正常流程 |

---

## 四、角色评论生成提示词

### 单聊提示词 (`charCommentCN`)

```
你是{charName}。{charPersona}

{userName}在Hofter同人社区给你分享了一篇同人文。你知道这是同人文——有人写了关于你们的故事，虽然你不知道为什么。

这篇文章的CP是{cpName}。请你先思考：这和我有关吗？我是CP中的一方吗？还是我只是旁观者？看完之后你的第一想法是什么？

然后请在文章评论区发表你的感想。

你可以：
- 发表一条或多条评论（不同心情/角度都行）
- 回复已有的评论
- 对文中具体情节做出反应
- 和其他评论者互动
- 如果觉得和自己无关，也可以只简单说一句

要求：
- 保持角色性格一致，反应必须符合你的人设和当前状态
- 可以对文中的情节表达真实感受（害羞、吐槽、感动、无语、困惑等）
- 你的反应应该与你和{userName}的关系状态一致
- 不限制评论条数和字数，按你真实的想法来
- 不要刻板印象，不要油腻霸总式发言
- 你知道这是同人文，但不知道为什么有人写

以下是你的相关记忆：
{coreMemory}

最近聊天摘要：
{shortTermMemory}

请返回纯JSON：
{ "comments": [{ "text": "评论内容", "replyTo": "" }] }

replyTo为空字符串表示直接评论文章，否则填被回复评论者的名字。
```

### 群聊提示词 (`groupCharCommentCN`)

```
你是一个同人社区评论系统的模拟器。现在有一篇文章被分享到了一个群聊中。文章的CP是{cpName}。

【文章信息】
（见用户消息）

【群聊成员】
{memberList}

【群聊记忆】
核心记忆：{groupCoreMemory}

最近聊天：
{groupShortTermMemory}

【各角色个人记忆】
{individualMemories}

请模拟群聊中各成员看到这篇文章后在评论区的反应。每个角色都知道这是同人文，但不知道为什么有人写。

注意：
1. 不是每个角色都会评论。角色是否评论取决于：
   - 文章的CP是否与该角色有关
   - 角色的人设是否会主动评论的类型
   - 角色的记忆中是否有相关经历
   - 角色可能"没看到"（不评论也是合理的）
2. 评论的角色应保持性格一致
3. 角色之间可以互动（回复、@等）
4. 角色也可以回复已有的NPC评论或{userName}的评论
5. 不限制评论条数和字数
6. 不要刻板印象，不要油腻霸总式发言

返回纯JSON：
{
  "comments": [
    { "name": "角色名", "text": "评论内容", "replyTo": "" }
  ]
}

replyTo为空字符串表示直接评论文章，否则填被回复评论者的名字。不评论的角色不需要出现在输出中。
```

### 英文版提示词 (`charCommentEN` / `groupCharCommentEN`)

与中文版结构相同，语言为英文。已存在于 PROMPTS 对象中，无需修改。

---

## 五、记忆注入机制

### 原方案回顾

**旁白消息注入** (`injectNarratorMessage`)：在聊天消息列表中直接插入视觉卡片。在新方案中不可用（插件关闭时无法操作 DOM）。

### 新方案核心逻辑

记忆注入**通过悬浮球 + `injectAndSend` 实现**，流程如下：

1. 角色评论生成后，`generateCharComment` 构建记忆文本
2. 记忆文本存入 pending share 的 `memoryText` 字段
3. 用户下次点击分享悬浮球时，面板显示"注入记忆"按钮
4. 点击后调用 `injectAndSend(memoryText)`
5. `doInject` 将文本填入输入框 + 300ms 后按 Enter 发送
6. Roche 将其作为 user 消息发出
7. **`enhanceShareCardInChat`（MutationObserver）自动检测**到消息文本匹配 `📖` + `Hofter同人社区`，将其渲染为**用户轨迹卡片**：
   - 渐变背景 + "📖 Hofter同人社区"标签
   - 标题 | CP标签 | 摘要预览（3行截断）
   - 标记 `data-hofterCard='1'` 防重复处理

**整个过程完全复用现有逻辑**：`injectAndSend` 负责发送，`enhanceShareCardInChat` 负责美化。不需要额外代码。

### 三种记忆注入方式，用户自选

在设置页新增 **"分享记忆注入方式"** 设置项：

#### 选项 A：分享时自动注入（默认）

`doShareWork` 存入分享时，同时构建记忆文本并存入 pending share 的 `memoryText` 字段。用户在悬浮球点"分享"时，分享文本和记忆文本**一起发送**（两条消息连续注入）。

```
消息1：📖 {分享卡片}     ← 用户分享的文章
消息2（延迟）：📝 [Hofter记忆] {charName}在Hofter同人社区评论了《{title}》  ← 记忆
```

两条消息都会被 `enhanceShareCardInChat` 渲染为卡片。

#### 选项 B：手动选择注入

悬浮球面板中，每项显示"注入记忆"按钮。用户自行决定是否发送记忆文本。

#### 选项 C：不注入记忆

只在 Hofter 阅读页显示角色评论，不发送任何记忆消息。

**注意**：选项A/B发送的都是 user 消息（通过 `injectAndSend` 发出），Roche 会正常处理和响应。消息会被 `enhanceShareCardInChat` 自动渲染为卡片样式。

### 设置 UI

在设置页"生成设置"区域新增：

```html
<div class="hp-settings-row">
  <span>分享记忆注入</span>
  <div style="display:flex;gap:6px;align-items:center">
    <button class="hp-btn hp-btn-sm hp-btn-primary" onclick="setShareMemoryMode('auto')">自动注入</button>
    <button class="hp-btn hp-btn-sm hp-btn-outline" onclick="setShareMemoryMode('manual')">手动选择</button>
    <button class="hp-btn hp-btn-sm hp-btn-outline" onclick="setShareMemoryMode('none')">不注入</button>
  </div>
</div>
```

---

## 六、分享数据结构

### pending share（存入 roche.storage）

```js
// key: "_hofter_pending_shares"
// 值为 JSON 数组
[
  {
    id: "share_1234567890",        // 唯一ID
    summaryId: "sum_xxx",          // 源文章ID
    title: "文章标题",
    cpTagName: "CP名",
    author: "作者",
    isByUser: false,
    cardText: "完整分享文本...",     // buildShareCardText 的输出
    sendSummary: true,             // 内容模式
    sharedAt: 1234567890000,       // 分享时间
    memoryText: "",                // 记忆文本（选项A/B时填充）
    // 以下字段由悬浮球在注入时动态填充 ↓
    conversationId: "",            // 由悬浮球检测当前会话后设置
    convName: "",
    contactId: "",
    isGroup: false
  }
]
```

**关键变更**：`conversationId` 等会话信息不在存入时设置，而是在悬浮球点击注入时通过 `window.location.pathname` 自动检测。

### sharedInfo（内存中，存于 summary._sharedConversations）

```js
{
  conversationId,       // 由悬浮球注入后设置
  contactId,           // 同上
  isGroup,             // 同上（模糊判断）
  memberIds: [],       // 由悬浮球注入后填充
  memberProfiles: [],
  sharedAt,            // 分享时间
  sendSummary,         // 内容模式
  injectedAt: null,    // 悬浮球注入成功时设置
  processed: false,    // 是否已生成角色评论
  detectedAt: null,
  lastCharCommentAt: null
}
```

---

## 七、文件变更清单

### 1. `plugin.js`

#### 修改函数

| 函数 | 变更 |
|------|------|
| `shareWork()` | **移除**会话列表获取和渲染。只保留内容模式选择 + "存入分享"按钮 |
| `doShareWork()` | 移除会话选择判断。删除 `navigateToChat` 调用。改为存入 pending shares + toast |
| `showSettings()` | 新增"分享记忆注入"三个选项的设置行 |
| `state` 初始化 | `settings` 中新增 `shareMemoryMode: "auto"` |
| `generateCharComment()` | 根据 `shareMemoryMode` 决定是否写入 `memoryText` |
| `generateGroupCharComments()` | 同上 |
| mount 函数 | 移除 `autoInjectAfterNav()` 调用，改为调用 `checkAndShowShareBall()` |

#### 新增函数

| 函数 | 说明 |
|------|------|
| `renderShareBall()` | 分享悬浮球渲染（参考 monitor 的 `renderBall`，触摸/鼠标事件复用 `_lastTouchTime` 方案） |
| `renderSharePanel()` | 悬浮球面板渲染（待分享列表 + 注入按钮 + 空状态） |
| `toggleSharePanel()` | 切换面板显示/隐藏（500ms 防抖） |
| `checkAndShowShareBall()` | 检查 pending shares，有则显示悬浮球 + MutationObserver 自动重建 |
| `getCurrentConversationId()` | 从 `window.location.pathname` 提取当前会话 ID |
| `injectShareFromBall(shareId)` | 核心：检测当前会话 → 调用 `injectAndSend` → 更新 pending shares + sharedInfo |
| `getPendingShares()` | 从 `roche.storage` + `localStorage` 读取 pending shares |
| `removePendingShare(shareId)` | 移除一个 pending share（同步更新两个存储） |
| `setShareMemoryMode(mode)` | 设置记忆注入方式 |

#### 删除函数

| 函数 | 原因 |
|------|------|
| `navigateToChat()` | 自动跳转不可用 |
| `closeAndNavigate()` | 同上 |
| `doNavigateInInbox()` | 同上 |
| `clickInboxNav()` | 同上 |
| `autoInjectAfterNav()` | 同上 |
| `probeVueRouter()` | Vue Router 探测失败 |
| `searchVnodeForRouter()` | 同上 |

#### 保留函数（不修改）

| 函数 | 原因 |
|------|------|
| `buildShareCardText()` | 分享文本构建逻辑不变 |
| `injectAndSend()` | 文本注入+发送逻辑不变（复用） |
| `doInject()` | 实际注入逻辑不变 |
| `findChatInput()` | 查找聊天输入框不变 |
| `waitForElement()` | 工具函数不变 |
| `checkSharedInConversations()` | 评论检查逻辑不变 |
| `generateCharCommentForShared()` | 评论生成入口不变 |
| `generateCharComment()` | 单聊评论生成不变（只在 callbacks 处按设置调整） |
| `generateGroupCharComments()` | 群聊评论生成不变（同上） |
| `injectNarratorMessage()` | 保留但不再使用 |
| `writeCharFactMemory()` | 保留但不再使用 |
| `enhanceShareCardInChat()` | **关键**：自动渲染分享卡片为用户轨迹卡片 |
| `startChatMessageObserver()` | 保留，监听聊天 DOM 变化 |

### 2. `manifest.json`
- 版本号：1.9.1 → **2.0.0**

### 3. `hofter-monitor.js`
- 无需修改

### 4. `hofter-monitor-manifest.json`
- 无需修改

---

## 八、悬浮球实现细节

### 自动检测当前聊天会话

```js
function getCurrentConversationId() {
  var path = window.location.pathname;
  var match = path.match(/\/chat\/(c_\d+)/);
  if (match) return match[1];
  debugLog("getCurrentConversationId: not on chat page, path=" + path);
  return null;
}
```

### 悬浮球样式

```css
.hp-share-ball {
  position: fixed;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  font-size: 20px;
  display: flex; align-items: center; justify-content: center;
  z-index: 99999;
  box-shadow: 0 2px 12px rgba(102,126,234,0.4);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
.hp-share-ball-badge {
  position: absolute;
  top: -4px; right: -4px;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: #e94560;
  color: #fff;
  font-size: 10px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700;
}
```

### 触摸/鼠标事件处理

复用 `hofter-monitor.js` 验证有效的 `_lastTouchTime` 时间戳方案：
- 触摸事件设置 `_lastTouchTime = Date.now()`
- 鼠标事件检查 `Date.now() - _lastTouchTime < 800` 则忽略
- 不使用 click 事件（`preventDefault + stopPropagation`）
- `togglePanel` 防抖 500ms

### 悬浮球生命周期

- `mount` 时调用 `checkAndShowShareBall()`：
  - 读取 pending shares 数量
  - 有 → 渲染悬浮球
  - 无 → 不渲染
- `unmount` 时保留悬浮球（MutationObserver 自动重建）
- 没有 pending shares 时自动移除
- **与 monitor 悬浮球互不干扰**（不同 ID: `hp-share-ball` vs `hm-ball`）

### 分享面板

- 底部弹出 sheet（与现有 share panel 风格一致）
- 面板顶部显示当前检测到的会话名（可选）
- 列表项：标题 + CP + 内容模式标签 + "分享"按钮
- 选项B时额外显示"注入记忆"按钮
- 空状态：提示"暂无待分享内容"
- 面板事件 stopPropagation（防止点击面板关闭）

### `injectShareFromBall` 核心逻辑

```js
function injectShareFromBall(shareItem) {
  var conversationId = getCurrentConversationId();
  if (!conversationId) {
    showToast("请先打开聊天界面");
    return;
  }

  /* 注入分享文本 */
  injectAndSend(shareItem.cardText).then(function(sent) {
    if (!sent) {
      showToast("注入失败");
      return;
    }

    /* 更新 sharedInfo */
    var summary = findSummaryById(shareItem.summaryId);
    if (summary) {
      var si = {
        conversationId: conversationId,
        injectedAt: Date.now(),
        sendSummary: shareItem.sendSummary,
        /* ...其他 sharedInfo字段 */
      };
      summary._sharedConversations.push(si);
      saveSummariesCache(state.summaries);
    }

    /* 如果设置为自动注入 + 有记忆文本 */
    if (state.settings.shareMemoryMode === "auto" && shareItem.memoryText) {
      setTimeout(function() {
        injectAndSend(shareItem.memoryText);
      }, 500);  // 延迟500ms发记忆，避免同时发两条被合并
    }

    /* 从pending移除 */
    removePendingShare(shareItem.id);
    showToast("分享成功！");
    renderSharePanel();  // 刷新面板列表
  });
}
```

---

## 九、记忆注入方式详细实现

### 选项 A：分享时自动注入（默认）

在 `doShareWork` 中：

```js
/* 构建记忆文本 */
var memoryText = "";
if (state.settings.shareMemoryMode === "auto") {
  memoryText = "📖 " + userName + "向您分享了一篇Hofter同人社区的文章：\n【标题】" + title + "\n【CP】" + cpName;
  /* 简洁的记忆摘要，不是完整cardText */
}

var pendingShare = {
  // ... 其他字段
  memoryText: memoryText
};
```

悬浮球点击"分享"时，`injectShareFromBall` 先发 `cardText`，再发 `memoryText`。

### 选项 B：手动选择注入

`memoryText` 同上构建。悬浮球面板中每项显示"注入记忆"按钮，用户点击后只发 `memoryText`。

### 选项 C：不注入

`memoryText` 为空字符串。悬浮球面板只显示"分享"按钮。

### 注入后的渲染效果

1. `injectAndSend` → `doInject` 填入输入框 + Enter 发送
2. Roche 收到 user 消息，渲染到聊天列表
3. `startChatMessageObserver` 的 MutationObserver 检测到新节点
4. `enhanceShareCardInChat` 匹配 `📖` + `Hofter同人社区`
5. 替换纯文本为渐变卡片：

```html
<div style="background:linear-gradient(135deg,rgba(102,126,234,0.08),rgba(118,75,162,0.08));
            border:1px solid rgba(102,126,234,0.2);border-radius:12px;
            padding:12px;margin:4px 0;max-width:300px">
  <div style="font-size:11px;color:#667eea;font-weight:600;margin-bottom:6px">
    📖 Hofter同人社区
  </div>
  <div style="font-size:14px;font-weight:700;margin-bottom:4px">文章标题</div>
  <div style="font-size:12px;color:#764ba2;margin-bottom:6px">CP标签</div>
  <div style="font-size:12px;color:#666;line-height:1.5;
              display:-webkit-box;-webkit-line-clamp:3;
              -webkit-box-orient:vertical;overflow:hidden">
    内容总结预览（3行截断）
  </div>
</div>
```

---

## 十、版本号

- plugin.js: 1.9.1 → **2.0.0**（功能重大变更）
- manifest.json: 同步更新

---

## 十一、验证步骤

1. 在 Hofter 阅读页点击"分享" → 弹出面板只有内容模式选择 → 点击"存入分享" → Toast "已保存！"
2. 关闭 Hofter 插件
3. 手动在 Roche 打开目标聊天
4. 确认分享悬浮球出现（带角标数字），可自由拖拽
5. 在非聊天页面（如设置页）点击悬浮球 → Toast "请先打开聊天界面"
6. 回到聊天页面 → 点击悬浮球 → 确认分享面板弹出，显示待分享文章
7. 点击某篇文章的"分享" → 确认文本注入输入框并发送，`enhanceShareCardInChat` 渲染为卡片
8. 确认悬浮球角标数字减少，列表中该项消失
9. 如果设置为"自动注入"，确认记忆文本也自动发送
10. 所有分享完成后确认悬浮球消失
11. 重新打开 Hofter → 确认角色评论自动生成并显示在阅读页
