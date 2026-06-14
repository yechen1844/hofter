# 分享跳转聊天功能修复计划

## 问题分析

### 当前流程
1. 用户在阅读器中点击"分享"按钮
2. `shareWork()` 调用 `roche.conversation.list()` 获取会话列表（这个API可用）
3. 用户选择会话后，`doShareWork()` 执行：
   - 关闭 Hofter 插件（`roche.ui.closeApp()`）
   - 延迟后调用 `navigateToChat(conversationId, convName)`
   - 再延迟后调用 `injectAndSend(cardText)` 发送消息

### 失败原因
**关键问题：`roche.ui.closeApp()` 关闭了 Hofter 插件后，插件代码仍在运行，但此时 Hofter 的 DOM 容器已被移除。`navigateToChat` 试图通过 DOM 操作点击 `.conversation-item` 来跳转，但此时用户看到的不是会话列表页面，而是聊天页面或其他页面。**

更深层的问题：
1. **Roche 没有提供 `roche.conversation.open(id)` 或 `roche.ui.navigateTo(url)` 这样的导航API** — 只有 `roche.ui.openApp(appId)` 和 `roche.ui.closeApp()`
2. **关闭插件后，Roche 前台不会自动回到会话列表** — 用户可能停留在任意页面
3. **DOM 点击方案不可靠** — 即使找到 `.conversation-item` 并点击，Roche 可能使用 Vue Router，简单的 `.click()` 不一定能触发路由跳转
4. **`injectAndSend` 依赖找到 `.chat-input-textarea`** — 但如果没跳转到正确的聊天页面，就找不到输入框

### CSS 文件揭示的 Roche 架构
- **Vue 框架**（`data-v-*` scoped CSS）
- **底部导航** `.bottom-nav` — 固定底部，包含多个 tab
- **会话列表** `.conversation-item` — 包含 `.conv-name`、`.conversation-avatar`
- **聊天页面** `.chat-header-*`、`.chat-input-textarea`、`.chat-scroll-area`
- **返回按钮** `.chat-header-button--back`
- **加号面板** `.chat-plus-panel`、`.chat-plus-action`

## 解决方案

### 核心思路：不关闭插件，先导航再关闭

**方案：两阶段导航 + 不依赖 DOM 点击**

1. **不关闭 Hofter 插件**，先完成导航
2. 使用 `roche.conversation.list()` 获取会话列表（已可用）
3. 使用 `roche.conversation.get(id)` 获取单个会话详情（已可用）
4. **关键创新：利用 Roche 的底部导航 `.bottom-nav` 切换到消息页面，然后点击对应的 `.conversation-item`**
5. 导航成功后再关闭 Hofter 插件，然后注入发送

### 具体步骤

#### Step 1: 修改 `doShareWork` — 不立即关闭插件
- 不再先 `closeApp()` 再导航
- 改为：先导航，导航成功后再关闭插件

#### Step 2: 重写 `navigateToChat` — 两阶段导航
**阶段1：确保在消息列表页面**
- 查找 `.bottom-nav` 中的消息 tab 按钮
- 点击消息 tab，等待会话列表出现
- 如果已在聊天页面，先点击 `.chat-header-button--back` 返回

**阶段2：在会话列表中找到并点击目标会话**
- 使用 `.conversation-item` + `.conv-name` 精准匹配
- 如果匹配到，点击该元素
- 等待聊天页面加载完成（检测 `.chat-input-textarea` 出现）

#### Step 3: 修改 `injectAndSend` — 增加重试和等待
- 增加轮询等待 `.chat-input-textarea` 出现（最多10秒）
- 找到后注入文本并发送

#### Step 4: 完整流程
```
doShareWork():
  1. 关闭分享面板
  2. navigateToChat(convId, convName):
     a. 检查当前是否在消息列表页
     b. 如果不在，点击底部导航的消息tab
     c. 等待 .conversation-item 出现
     d. 遍历找到匹配的 .conversation-item
     e. 点击它
     f. 等待 .chat-input-textarea 出现
  3. 关闭 Hofter 插件 (closeApp)
  4. 延迟后 injectAndSend(cardText)
  5. 如果 injectAndSend 失败，复制到剪贴板
```

## 修改文件

### `e:/所有文件/hofter-plugin/plugin.js`

1. **`doShareWork` 函数**（~L4951）：
   - 移除先 `closeApp()` 的逻辑
   - 改为：先导航，成功后再 closeApp

2. **`navigateToChat` 函数**（~L3641）：
   - 完全重写为两阶段导航
   - 阶段1：通过 `.bottom-nav` 切换到消息列表
   - 阶段2：通过 `.conversation-item` + `.conv-name` 点击目标会话
   - 使用 Promise + 轮询等待 DOM 元素出现
   - 增加超时处理

3. **`injectAndSend` 函数**（~L3777）：
   - 增加轮询等待 `.chat-input-textarea` 出现
   - 最多等待10秒

4. **新增辅助函数**：
   - `waitForElement(selector, timeout)` — 轮询等待 DOM 元素出现
   - `clickBottomNavTab(tabName)` — 点击底部导航的消息tab

## 假设与风险

1. **假设**：`.bottom-nav` 中有消息 tab，点击后能切换到会话列表
2. **假设**：`.conversation-item` 的 `.click()` 能触发 Vue Router 跳转
3. **风险**：如果 Roche 使用了事件委托或自定义事件（而非原生 click），`.click()` 可能不生效
4. **风险**：关闭插件后，插件的 setTimeout 可能被清除

## 验证步骤

1. 在 Hofter 中生成一篇文章
2. 点击分享，选择一个会话
3. 验证：是否自动跳转到对应聊天页面
4. 验证：是否自动在输入框中填入分享内容并发送
5. 如果跳转失败，检查 debug 日志中的 DOM 扫描结果
