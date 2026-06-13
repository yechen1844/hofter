(function() {
  "use strict";

  /* ============================================
   * hofter-monitor - 前台监控悬浮球控制台
   * 独立运行，hofter退出后仍可使用
   * ============================================ */

  var PLUGIN_ID = "hofter-monitor";
  var ROOT_CLASS = "hofter-monitor-plugin";
  var _state = {
    containerEl: null,
    styleEl: null,
    logs: [],
    maxLogs: 500,
    panelVisible: false,
    ballVisible: true,
    autoScroll: true,
    filterLevel: "all", /* all, info, warn, error */
    observers: [],
    domWatchEnabled: true,
    convWatchEnabled: true,
    position: { x: 20, y: 200 },
    dragging: false,
    dragStart: { x: 0, y: 0 },
    posStart: { x: 0, y: 0 }
  };

  /* ─── 日志工具 ─── */
  function addLog(level, source, message) {
    var entry = {
      time: new Date().toLocaleTimeString("zh-CN", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", fractionalSecondDigits: 3 }),
      level: level,
      source: source,
      message: message
    };
    _state.logs.push(entry);
    if (_state.logs.length > _state.maxLogs) _state.logs.shift();
    appendLogEntry(entry);
  }

  function appendLogEntry(entry) {
    /* 更新悬浮球面板 */
    var container = document.getElementById("hm-log-container");
    if (container) {
      if (_state.filterLevel !== "all" && entry.level !== _state.filterLevel) return;
      var div = document.createElement("div");
      div.className = "hm-log-entry hm-log-" + entry.level;
      div.innerHTML = '<span class="hm-log-time">' + entry.time + '</span>' +
        '<span class="hm-log-level">' + entry.level.toUpperCase() + '</span>' +
        '<span class="hm-log-source">[' + escapeHtml(entry.source) + ']</span>' +
        '<span class="hm-log-msg">' + escapeHtml(entry.message) + '</span>';
      container.appendChild(div);
      if (_state.autoScroll) container.scrollTop = container.scrollHeight;
      while (container.children.length > 200) container.removeChild(container.firstChild);
    }
    /* 更新主界面 */
    var mainContainer = _state.mainLogContainer || document.getElementById("hm-log-container-main");
    if (mainContainer) {
      if (_state.filterLevel !== "all" && entry.level !== _state.filterLevel) return;
      var div2 = document.createElement("div");
      div2.className = "hm-log-entry hm-log-" + entry.level;
      div2.innerHTML = '<span class="hm-log-time">' + entry.time + '</span>' +
        '<span class="hm-log-level">' + entry.level.toUpperCase() + '</span>' +
        '<span class="hm-log-source">[' + escapeHtml(entry.source) + ']</span>' +
        '<span class="hm-log-msg">' + escapeHtml(entry.message) + '</span>';
      mainContainer.appendChild(div2);
      if (_state.autoScroll) mainContainer.scrollTop = mainContainer.scrollHeight;
      while (mainContainer.children.length > 200) mainContainer.removeChild(mainContainer.firstChild);
    }
    /* 更新计数 */
    var countEl = document.getElementById("hm-log-count-main");
    if (countEl) countEl.textContent = "Logs: " + _state.logs.length;
  }

  function escapeHtml(s) { if (!s) return ""; return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

  function refreshLogPanel() {
    var container = document.getElementById("hm-log-container");
    if (container) {
      container.innerHTML = "";
      for (var i = 0; i < _state.logs.length; i++) {
        appendLogEntry(_state.logs[i]);
      }
    }
  }

  function refreshMainLog() {
    var mainContainer = _state.mainLogContainer || document.getElementById("hm-log-container-main");
    if (mainContainer) {
      mainContainer.innerHTML = "";
      for (var i = 0; i < _state.logs.length; i++) {
        if (_state.filterLevel !== "all" && _state.logs[i].level !== _state.filterLevel) continue;
        var div = document.createElement("div");
        div.className = "hm-log-entry hm-log-" + _state.logs[i].level;
        div.innerHTML = '<span class="hm-log-time">' + _state.logs[i].time + '</span>' +
          '<span class="hm-log-level">' + _state.logs[i].level.toUpperCase() + '</span>' +
          '<span class="hm-log-source">[' + escapeHtml(_state.logs[i].source) + ']</span>' +
          '<span class="hm-log-msg">' + escapeHtml(_state.logs[i].message) + '</span>';
        mainContainer.appendChild(div);
      }
      mainContainer.scrollTop = mainContainer.scrollHeight;
    }
  }

  /* ─── DOM 监控 ─── */
  function startDOMWatch() {
    if (!_state.domWatchEnabled) return;
    /* 监控Roche侧边栏的DOM变化 */
    var sidebarSelectors = ['[class*="sidebar"]', '[class*="chat-list"]', '[class*="conv-list"]', 'nav', 'aside'];
    for (var s = 0; s < sidebarSelectors.length; s++) {
      var el = document.querySelector(sidebarSelectors[s]);
      if (el) {
        addLog("info", "dom-watch", "Found sidebar: " + sidebarSelectors[s] + " class=" + (el.className || "").substring(0, 60));
        try {
          var obs = new MutationObserver(function(mutations) {
            for (var m = 0; m < mutations.length; m++) {
              var mut = mutations[m];
              if (mut.type === "childList" && mut.addedNodes.length > 0) {
                for (var n = 0; n < mut.addedNodes.length; n++) {
                  var node = mut.addedNodes[n];
                  if (node.nodeType === 1) {
                    var tag = node.tagName;
                    var cn = (node.className || "").substring(0, 40);
                    var dataAttrs = "";
                    if (node.attributes) {
                      for (var a = 0; a < node.attributes.length; a++) {
                        if (node.attributes[a].name.indexOf("data-") === 0) {
                          dataAttrs += node.attributes[a].name + "=" + node.attributes[a].value.substring(0, 20) + " ";
                        }
                      }
                    }
                    addLog("info", "dom-mutation", "Added: <" + tag + "> class=" + cn + " " + dataAttrs.trim());
                  }
                }
              }
            }
          });
          obs.observe(el, { childList: true, subtree: true });
          _state.observers.push(obs);
          addLog("info", "dom-watch", "Observing: " + sidebarSelectors[s]);
        } catch(e) {
          addLog("error", "dom-watch", "Failed to observe: " + e.message);
        }
      }
    }

    /* 监控URL变化 */
    var lastUrl = window.location.href;
    var urlCheckInterval = setInterval(function() {
      if (window.location.href !== lastUrl) {
        addLog("info", "url-watch", "URL changed: " + lastUrl + " -> " + window.location.href);
        lastUrl = window.location.href;
      }
    }, 500);
    _state.observers.push({ disconnect: function() { clearInterval(urlCheckInterval); } });

    /* 记录当前页面结构概览 */
    addLog("info", "dom-scan", "=== DOM Structure Scan ===");
    var allDivs = document.querySelectorAll("div[class]");
    var classStats = {};
    for (var d = 0; d < allDivs.length; d++) {
      var cls = allDivs[d].className;
      if (typeof cls === "string") {
        var parts = cls.split(/\s+/);
        for (var p = 0; p < parts.length; p++) {
          if (parts[p].indexOf("sidebar") >= 0 || parts[p].indexOf("chat") >= 0 || parts[p].indexOf("conv") >= 0 || parts[p].indexOf("session") >= 0 || parts[p].indexOf("message") >= 0 || parts[p].indexOf("contact") >= 0) {
            classStats[parts[p]] = (classStats[parts[p]] || 0) + 1;
          }
        }
      }
    }
    for (var k in classStats) {
      if (classStats.hasOwnProperty(k)) {
        addLog("info", "dom-scan", "Class: ." + k + " count=" + classStats[k]);
      }
    }
    addLog("info", "dom-scan", "=== Scan Complete ===");
  }

  /* ─── 会话列表监控 ─── */
  function startConvWatch() {
    if (!_state.convWatchEnabled) return;
    if (window.roche && roche.conversation && roche.conversation.list) {
      roche.conversation.list().then(function(list) {
        addLog("info", "conv-watch", "Conversations found: " + (list ? list.length : 0));
        if (list && list.length > 0) {
          for (var i = 0; i < Math.min(list.length, 10); i++) {
            var c = list[i];
            addLog("info", "conv-watch", "Conv[" + i + "]: id=" + (c.id||"") + " name=" + (c.name||c.title||"") + " type=" + (c.type||""));
          }
        }
      }).catch(function(e) {
        addLog("error", "conv-watch", "Failed to list conversations: " + (e && e.message ? e.message : String(e)));
      });
    } else {
      addLog("warn", "conv-watch", "roche.conversation API not available");
    }
  }

  /* ─── 路由嗅探器 ─── */
  var _routeSnifferInstalled = false;
  var _capturedRoutes = [];

  function startRouteSniffer() {
    if (_routeSnifferInstalled) return;
    _routeSnifferInstalled = true;
    addLog("info", "route-sniffer", "Route sniffer started - navigate in Roche to capture routes");

    /* 拦截 history.pushState */
    var origPushState = history.pushState;
    history.pushState = function(state, title, url) {
      addLog("info", "route-sniffer", "pushState: " + url);
      _capturedRoutes.push({ type: "pushState", url: url, time: Date.now() });
      return origPushState.apply(this, arguments);
    };

    /* 拦截 history.replaceState */
    var origReplaceState = history.replaceState;
    history.replaceState = function(state, title, url) {
      addLog("info", "route-sniffer", "replaceState: " + url);
      _capturedRoutes.push({ type: "replaceState", url: url, time: Date.now() });
      return origReplaceState.apply(this, arguments);
    };

    /* 监听 hash 变化 */
    window.addEventListener("hashchange", function(e) {
      addLog("info", "route-sniffer", "hashchange: " + window.location.hash + " oldURL=" + (e.oldURL || ""));
      _capturedRoutes.push({ type: "hashchange", hash: window.location.hash, time: Date.now() });
    });

    /* 监听 popstate */
    window.addEventListener("popstate", function(e) {
      addLog("info", "route-sniffer", "popstate: " + window.location.pathname + window.location.hash);
      _capturedRoutes.push({ type: "popstate", path: window.location.pathname + window.location.hash, time: Date.now() });
    });

    /* 记录初始 URL */
    addLog("info", "route-sniffer", "Initial URL: " + window.location.href);
    addLog("info", "route-sniffer", "Initial pathname: " + window.location.pathname);
    addLog("info", "route-sniffer", "Initial hash: " + window.location.hash);
    _capturedRoutes.push({ type: "init", url: window.location.href, time: Date.now() });

    /* 探测 Vue 实例 */
    setTimeout(function() {
      var vueInfo = probeVueRouter();
      if (vueInfo) {
        addLog("info", "route-sniffer", "Vue Router detected! version=" + vueInfo.version + " currentRoute=" + vueInfo.currentRoute);
        addLog("info", "route-sniffer", "Vue Router routes: " + vueInfo.routes);
      } else {
        addLog("warn", "route-sniffer", "Vue Router not found via DOM probe");
      }
    }, 2000);
  }

  /* 探测 Vue Router 实例 */
  function probeVueRouter() {
    try {
      /* Vue 3: __vue_app__ */
      var appNode = document.querySelector('#app') || document.body.firstElementChild;
      if (!appNode) return null;

      /* Vue 3 */
      var vueApp = appNode.__vue_app__;
      if (vueApp) {
        var router = vueApp.config && vueApp.config.globalProperties && vueApp.config.globalProperties.$router;
        if (router) {
          var routes = "";
          if (router.getRoutes) {
            var routeList = router.getRoutes();
            routes = routeList.map(function(r) { return r.path; }).join(", ");
          } else if (router.options && router.options.routes) {
            routes = router.options.routes.map(function(r) { return r.path; }).join(", ");
          }
          var currentRoute = router.currentRoute && router.currentRoute.value ? router.currentRoute.value.path : "";
          return { version: 3, currentRoute: currentRoute, routes: routes, router: router };
        }
      }

      /* Vue 2: __vue__ */
      var vue2 = appNode.__vue__;
      if (vue2 && vue2.$router) {
        var router2 = vue2.$router;
        var routes2 = "";
        if (router2.options && router2.options.routes) {
          routes2 = router2.options.routes.map(function(r) { return r.path; }).join(", ");
        }
        var currentRoute2 = router2.currentRoute ? router2.currentRoute.path : "";
        return { version: 2, currentRoute: currentRoute2, routes: routes2, router: router2 };
      }

      /* 遍历所有 DOM 元素寻找 Vue 实例 */
      var allEls = document.querySelectorAll('*');
      for (var i = 0; i < Math.min(allEls.length, 200); i++) {
        var el = allEls[i];
        if (el.__vue_app__) {
          var r3 = el.__vue_app__.config && el.__vue_app__.config.globalProperties && el.__vue_app__.config.globalProperties.$router;
          if (r3) {
            var cr3 = r3.currentRoute && r3.currentRoute.value ? r3.currentRoute.value.path : "";
            var rt3 = r3.getRoutes ? r3.getRoutes().map(function(x) { return x.path; }).join(", ") : "";
            return { version: 3, currentRoute: cr3, routes: rt3, router: r3 };
          }
        }
        if (el.__vue__ && el.__vue__.$router) {
          var r2 = el.__vue__.$router;
          var cr2 = r2.currentRoute ? r2.currentRoute.path : "";
          var rt2 = r2.options && r2.options.routes ? r2.options.routes.map(function(x) { return x.path; }).join(", ") : "";
          return { version: 2, currentRoute: cr2, routes: rt2, router: r2 };
        }
      }
    } catch(e) {
      addLog("error", "route-sniffer", "probeVueRouter error: " + e.message);
    }
    return null;
  }

  function doVueJump(targetPath, convId) {
    addLog("info", "vue-jump", "Attempting to jump to: " + targetPath);

    /* 方案1：Vue Router 劫持 */
    var vueInfo = probeVueRouter();
    if (vueInfo && vueInfo.router) {
      addLog("info", "vue-jump", "Found Vue Router v" + vueInfo.version + ", trying router.push...");
      try {
        vueInfo.router.push(targetPath);
        addLog("info", "vue-jump", "router.push called successfully!");
        /* 关闭插件面板 */
        if (window.roche && roche.ui && roche.ui.closeApp) {
          setTimeout(function() { roche.ui.closeApp(); }, 500);
        }
        return;
      } catch(e) {
        addLog("error", "vue-jump", "router.push error: " + e.message);
      }
    }

    /* 方案2：history.pushState + popstate */
    addLog("info", "vue-jump", "Trying history.pushState + popstate...");
    try {
      history.pushState(null, '', targetPath);
      window.dispatchEvent(new Event('popstate'));
      addLog("info", "vue-jump", "pushState + popstate dispatched");
      if (window.roche && roche.ui && roche.ui.closeApp) {
        setTimeout(function() { roche.ui.closeApp(); }, 500);
      }
      return;
    } catch(e) {
      addLog("error", "vue-jump", "pushState error: " + e.message);
    }

    /* 方案3：hash 路由 */
    addLog("info", "vue-jump", "Trying hash route...");
    try {
      window.location.hash = targetPath;
      addLog("info", "vue-jump", "Hash set to " + targetPath);
      if (window.roche && roche.ui && roche.ui.closeApp) {
        setTimeout(function() { roche.ui.closeApp(); }, 500);
      }
      return;
    } catch(e) {
      addLog("error", "vue-jump", "hash route error: " + e.message);
    }

    addLog("error", "vue-jump", "All jump methods failed!");
  }

  /* ─── 拦截 console ─── */
  function hookConsole() {
    var origLog = console.log;
    var origWarn = console.warn;
    var origError = console.error;

    console.log = function() {
      var msg = Array.prototype.slice.call(arguments).join(" ");
      if (msg.indexOf("[hofter") >= 0 || msg.indexOf("hofter") >= 0) {
        addLog("info", "console", msg.substring(0, 200));
      }
      origLog.apply(console, arguments);
    };
    console.warn = function() {
      var msg = Array.prototype.slice.call(arguments).join(" ");
      addLog("warn", "console", msg.substring(0, 200));
      origWarn.apply(console, arguments);
    };
    console.error = function() {
      var msg = Array.prototype.slice.call(arguments).join(" ");
      addLog("error", "console", msg.substring(0, 200));
      origError.apply(console, arguments);
    };

    _state.observers.push({
      disconnect: function() {
        console.log = origLog;
        console.warn = origWarn;
        console.error = origError;
      }
    });
  }

  /* ─── 拦截网络请求 ─── */
  function hookFetch() {
    var origFetch = window.fetch;
    window.fetch = function() {
      var url = arguments[0];
      if (typeof url === "string" && (url.indexOf("chat") >= 0 || url.indexOf("conversation") >= 0 || url.indexOf("message") >= 0)) {
        addLog("info", "network", "fetch: " + url.substring(0, 120));
      }
      return origFetch.apply(this, arguments);
    };
    _state.observers.push({ disconnect: function() { window.fetch = origFetch; } });
  }

  /* ─── UI 渲染 ─── */
  function getStyles() {
    return `
      .${ROOT_CLASS} { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .hm-ball {
        position: fixed; z-index: 999999; width: 44px; height: 44px; border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2); color: #fff;
        display: flex; align-items: center; justify-content: center; cursor: grab;
        box-shadow: 0 2px 12px rgba(102,126,234,0.4); font-size: 18px; font-weight: 700;
        user-select: none; transition: transform 0.15s, box-shadow 0.15s;
      }
      .hm-ball:hover { transform: scale(1.1); box-shadow: 0 4px 20px rgba(102,126,234,0.6); }
      .hm-ball:active { cursor: grabbing; }
      .hm-panel {
        position: fixed; z-index: 999998; top: 60px; right: 16px;
        width: 380px; max-height: 70vh; background: #1a1a2e; border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5); display: flex; flex-direction: column;
        overflow: hidden; font-size: 12px; color: #e0e0e0;
      }
      .hm-panel-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 12px 16px; background: #16213e; border-bottom: 1px solid #0f3460;
      }
      .hm-panel-title { font-size: 14px; font-weight: 700; color: #e94560; }
      .hm-panel-actions { display: flex; flex-wrap: wrap; gap: 6px; }
      .hm-btn {
        padding: 4px 10px; border-radius: 6px; border: none; cursor: pointer;
        font-size: 11px; font-weight: 600; transition: background 0.15s; white-space: nowrap;
      }
      .hm-btn-primary { background: #e94560; color: #fff; }
      .hm-btn-primary:hover { background: #c73652; }
      .hm-btn-secondary { background: #0f3460; color: #e0e0e0; }
      .hm-btn-secondary:hover { background: #1a4a8a; }
      .hm-btn-active { background: #e94560; color: #fff; }
      .hm-filter-bar {
        display: flex; gap: 4px; padding: 8px 16px; background: #16213e;
        border-bottom: 1px solid #0f3460;
      }
      .hm-filter-btn {
        padding: 3px 8px; border-radius: 4px; border: none; cursor: pointer;
        font-size: 10px; font-weight: 600; background: #0f3460; color: #a0a0a0;
      }
      .hm-filter-btn.active { background: #e94560; color: #fff; }
      .hm-log-container {
        flex: 1; overflow-y: auto; padding: 8px; min-height: 200px; max-height: 50vh;
      }
      .hm-log-entry {
        padding: 3px 6px; border-radius: 4px; margin-bottom: 2px;
        font-family: "Cascadia Code", "Fira Code", monospace; font-size: 11px;
        line-height: 1.5; word-break: break-all;
      }
      .hm-log-entry:hover { background: rgba(255,255,255,0.05); }
      .hm-log-info { color: #a0c4ff; }
      .hm-log-warn { color: #ffd166; background: rgba(255,209,102,0.08); }
      .hm-log-error { color: #ef476f; background: rgba(239,71,111,0.08); }
      .hm-log-time { color: #555; margin-right: 6px; }
      .hm-log-level { font-weight: 700; margin-right: 4px; min-width: 36px; display: inline-block; }
      .hm-log-source { color: #06d6a0; margin-right: 4px; }
      .hm-log-msg { color: #e0e0e0; }
      .hm-status-bar {
        display: flex; justify-content: space-between; padding: 6px 16px;
        background: #16213e; border-top: 1px solid #0f3460; font-size: 10px; color: #555;
      }
    `;
  }

  function renderBall() {
    /* 避免重复创建悬浮球 */
    var existingBall = document.getElementById("hm-ball");
    if (existingBall) return;
    var ball = document.createElement("div");
    ball.className = "hm-ball";
    ball.id = "hm-ball";
    ball.textContent = "M";
    ball.style.left = _state.position.x + "px";
    ball.style.top = _state.position.y + "px";
    /* 拖拽状态 */
    var dragMoved = false;
    var isDragging = false;
    var startX = 0, startY = 0, posStartX = 0, posStartY = 0;

    function onStart(cx, cy) {
      isDragging = true;
      dragMoved = false;
      startX = cx; startY = cy;
      posStartX = _state.position.x; posStartY = _state.position.y;
    }
    function onMove(cx, cy) {
      if (!isDragging) return;
      var dx = cx - startX, dy = cy - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragMoved = true;
      /* 限制在屏幕范围内 */
      var maxX = window.innerWidth - 44;
      var maxY = window.innerHeight - 44;
      _state.position.x = Math.max(0, Math.min(maxX, posStartX + dx));
      _state.position.y = Math.max(0, Math.min(maxY, posStartY + dy));
      ball.style.left = _state.position.x + "px";
      ball.style.top = _state.position.y + "px";
    }
    function onEnd() { isDragging = false; }

    /* 鼠标拖拽 */
    ball.addEventListener("mousedown", function(e) {
      onStart(e.clientX, e.clientY);
      e.preventDefault();
    });
    document.addEventListener("mousemove", function(e) { onMove(e.clientX, e.clientY); });
    document.addEventListener("mouseup", function() { onEnd(); });

    /* 触摸拖拽 */
    ball.addEventListener("touchstart", function(e) {
      var t = e.touches[0];
      onStart(t.clientX, t.clientY);
      e.preventDefault();
    }, { passive: false });
    document.addEventListener("touchmove", function(e) {
      if (!isDragging) return;
      var t = e.touches[0];
      onMove(t.clientX, t.clientY);
      e.preventDefault();
    }, { passive: false });
    document.addEventListener("touchend", function() { onEnd(); });

    /* 点击切换面板 */
    ball.addEventListener("click", function() {
      if (dragMoved) { dragMoved = false; return; }
      togglePanel();
    });
    document.body.appendChild(ball);
  }

  function togglePanel() {
    if (_state.panelVisible) {
      var panel = document.getElementById("hm-panel");
      if (panel) panel.remove();
      _state.panelVisible = false;
    } else {
      renderPanel();
      _state.panelVisible = true;
    }
  }

  function renderPanel() {
    var panel = document.createElement("div");
    panel.className = "hm-panel";
    panel.id = "hm-panel";
    panel.innerHTML = `
      <div class="hm-panel-header">
        <span class="hm-panel-title">Hofter Monitor</span>
        <button class="hm-btn hm-btn-primary" onclick="window.__hofterMonitor.togglePanel()" style="padding:4px 12px">X</button>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;padding:8px 16px;background:#16213e;border-bottom:1px solid #0f3460">
        <button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.scanDOM()">Scan DOM</button>
        <button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.listConvs()">Convs</button>
        <button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.tryNavChat()">Nav Chat</button>
        <button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.sniffRoutes()">Routes</button>
        <button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.vueJump()">Vue Jump</button>
        <button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.copyLogs()">Copy</button>
        <button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.clearLogs()">Clear</button>
      </div>
      <div class="hm-filter-bar">
        <button class="hm-filter-btn ${_state.filterLevel === 'all' ? 'active' : ''}" onclick="window.__hofterMonitor.setFilter('all')">All</button>
        <button class="hm-filter-btn ${_state.filterLevel === 'info' ? 'active' : ''}" onclick="window.__hofterMonitor.setFilter('info')">Info</button>
        <button class="hm-filter-btn ${_state.filterLevel === 'warn' ? 'active' : ''}" onclick="window.__hofterMonitor.setFilter('warn')">Warn</button>
        <button class="hm-filter-btn ${_state.filterLevel === 'error' ? 'active' : ''}" onclick="window.__hofterMonitor.setFilter('error')">Error</button>
      </div>
      <div class="hm-log-container" id="hm-log-container"></div>
      <div class="hm-status-bar">
        <span id="hm-log-count">Logs: ${_state.logs.length}</span>
        <span>Auto-scroll: ON</span>
      </div>
    `;
    document.body.appendChild(panel);
    refreshLogPanel();
  }

  /* ─── API ─── */
  window.__hofterMonitor = {
    togglePanel: function() { togglePanel(); },
    clearLogs: function() { _state.logs = []; refreshLogPanel(); addLog("info", "system", "Logs cleared"); },
    copyLogs: function() {
      var text = _state.logs.map(function(e) {
        return e.time + " " + e.level.toUpperCase() + "[" + e.source + "] " + e.message;
      }).join("\n");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          addLog("info", "system", "Logs copied to clipboard (" + _state.logs.length + " entries)");
        }).catch(function() {
          addLog("error", "system", "Failed to copy logs");
        });
      } else {
        /* 降级方案 */
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.cssText = "position:fixed;left:-9999px";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); addLog("info", "system", "Logs copied (" + _state.logs.length + ")"); }
        catch(e) { addLog("error", "system", "Copy failed: " + e.message); }
        document.body.removeChild(ta);
      }
    },
    setFilter: function(level) {
      _state.filterLevel = level;
      var btns = document.querySelectorAll(".hm-filter-btn");
      var levels = ["all", "info", "warn", "error"];
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.toggle("active", levels[i] === level);
      }
      refreshLogPanel();
    },
    scanDOM: function() {
      addLog("info", "dom-scan", "=== Deep DOM Scan ===");
      /* 1. 扫描所有可能的聊天列表元素 */
      var selectors = [
        /* Roche 真实 CSS 钩子 */
        '.conversation-item', '.conv-name', '.conv-preview', '.conversation-avatar',
        '.inbox-header', '.inbox-title', '.search-input',
        '.chat-header-avatar', '.chat-header-title', '.chat-header-online',
        '.chat-header-button--back', '.chat-header-button--search', '.chat-header-button--settings',
        '.chat-input-textarea', '.chat-input-plus', '.chat-input-send', '.chat-input-heart',
        '.chat-input-bar', '.chat-input-field', '.chat-glass-surface',
        '.chat-message', '.chat-message--sent', '.chat-message--received',
        '.chat-message-avatar', '.chat-card', '.bubble-sent', '.bubble-received',
        '.chat-scroll-area', '.chat-plus-panel', '.chat-plus-action',
        '.floating-preset-button', '.bottom-nav',
        /* 通用选择器 */
        '[class*="sidebar"]', '[class*="chat-list"]', '[class*="conv-list"]',
        'nav', 'aside', '[role="navigation"]',
        '[data-id]', '[data-conversation-id]', '[data-session-id]',
        '[class*="router"]', '[class*="view"]', '[class*="page"]',
        '[class*="app"]', '[class*="main"]', '[class*="content"]',
        '[class*="frame"]', '[class*="container"]', '[class*="layout"]',
        'iframe'
      ];
      for (var s = 0; s < selectors.length; s++) {
        var els = document.querySelectorAll(selectors[s]);
        if (els.length > 0) {
          addLog("info", "dom-scan", selectors[s] + " => " + els.length + " elements");
          for (var e = 0; e < Math.min(els.length, 3); e++) {
            var el = els[e];
            var tag = el.tagName;
            var cn = (el.className || "").substring(0, 80);
            var dataAttrs = "";
            if (el.attributes) {
              for (var a = 0; a < el.attributes.length; a++) {
                if (el.attributes[a].name.indexOf("data-") === 0 || el.attributes[a].name === "id" || el.attributes[a].name === "href" || el.attributes[a].name === "src") {
                  dataAttrs += el.attributes[a].name + "=" + el.attributes[a].value.substring(0, 50) + " ";
                }
              }
            }
            var text = (el.textContent || "").substring(0, 60).replace(/\n/g, " ");
            addLog("info", "dom-scan", "  [" + e + "] <" + tag + "> class=" + cn + " " + dataAttrs.trim() + " text=" + text);
          }
        }
      }
      /* 2. 扫描body直接子元素结构 */
      addLog("info", "dom-scan", "--- Body children ---");
      var bodyChildren = document.body.children;
      for (var bi = 0; bi < Math.min(bodyChildren.length, 15); bi++) {
        var bc = bodyChildren[bi];
        var bcn = (bc.className || "").substring(0, 60);
        var bid = bc.id || "";
        addLog("info", "dom-scan", "body[" + bi + "] <" + bc.tagName + "> id=" + bid + " class=" + bcn + " children=" + bc.children.length);
      }
      /* 3. 探测 Roche API */
      addLog("info", "dom-scan", "--- Roche API ---");
      if (window.roche) {
        var rocheKeys = Object.keys(window.roche);
        addLog("info", "dom-scan", "roche keys: " + rocheKeys.join(", "));
        if (roche.ui) {
          var uiKeys = Object.keys(roche.ui);
          addLog("info", "dom-scan", "roche.ui keys: " + uiKeys.join(", "));
        }
        if (roche.conversation) {
          var convKeys = Object.keys(roche.conversation);
          addLog("info", "dom-scan", "roche.conversation keys: " + convKeys.join(", "));
        }
        if (roche.ai) {
          var aiKeys = Object.keys(roche.ai);
          addLog("info", "dom-scan", "roche.ai keys: " + aiKeys.join(", "));
        }
      } else {
        addLog("warn", "dom-scan", "window.roche not found");
      }
      /* 4. 探测路由 */
      addLog("info", "dom-scan", "--- Router ---");
      addLog("info", "dom-scan", "URL: " + window.location.href);
      addLog("info", "dom-scan", "Hash: " + window.location.hash);
      addLog("info", "dom-scan", "Pathname: " + window.location.pathname);
      addLog("info", "dom-scan", "Search: " + window.location.search);
      /* 检测常见前端框架路由 */
      if (window.__NEXT_DATA__) addLog("info", "dom-scan", "Next.js detected");
      if (window.__NUXT__) addLog("info", "dom-scan", "Nuxt.js detected");
      if (window.__VUE__) addLog("info", "dom-scan", "Vue detected");
      if (window.angular) addLog("info", "dom-scan", "Angular detected");
      if (window.__SVELTE__) addLog("info", "dom-scan", "Svelte detected");
      /* 5. 尝试找到可点击的聊天入口 */
      addLog("info", "dom-scan", "--- Clickable chat entries ---");
      var allClickable = document.querySelectorAll('[onclick], [role="button"], [role="link"], a[href], button');
      addLog("info", "dom-scan", "Total clickable elements: " + allClickable.length);
      for (var ci = 0; ci < Math.min(allClickable.length, 20); ci++) {
        var ce = allClickable[ci];
        var ceText = (ce.textContent || "").substring(0, 30).replace(/\n/g, " ");
        var ceHref = ce.getAttribute("href") || "";
        var ceOnclick = ce.getAttribute("onclick") || "";
        if (ceText || ceHref || ceOnclick) {
          addLog("info", "dom-scan", "clickable[" + ci + "] <" + ce.tagName + "> text=" + ceText + " href=" + ceHref.substring(0, 50) + " onclick=" + ceOnclick.substring(0, 50));
        }
      }
      /* 6. 检测所有 iframe */
      var iframes = document.querySelectorAll("iframe");
      if (iframes.length > 0) {
        addLog("info", "dom-scan", "Found " + iframes.length + " iframes");
        for (var ii = 0; ii < iframes.length; ii++) {
          var iframe = iframes[ii];
          addLog("info", "dom-scan", "iframe[" + ii + "] src=" + (iframe.src || "").substring(0, 80) + " id=" + (iframe.id || ""));
        }
      }
      addLog("info", "dom-scan", "=== Scan Complete ===");
    },
    listConvs: function() {
      if (window.roche && roche.conversation && roche.conversation.list) {
        addLog("info", "conv-watch", "Fetching conversation list...");
        roche.conversation.list().then(function(list) {
          addLog("info", "conv-watch", "Conversations: " + (list ? list.length : 0));
          if (list) {
            for (var i = 0; i < list.length; i++) {
              var c = list[i];
              var keys = Object.keys(c).join(", ");
              addLog("info", "conv-watch", "Conv[" + i + "]: " + JSON.stringify(c).substring(0, 150));
              addLog("info", "conv-watch", "Conv[" + i + "] keys: " + keys);
            }
          }
        }).catch(function(e) {
          addLog("error", "conv-watch", "Failed: " + (e && e.message ? e.message : String(e)));
        });
      } else {
        addLog("warn", "conv-watch", "roche.conversation API not available");
      }
    },
    /* 尝试用各种方式打开聊天 */
    tryNavChat: function(convId) {
      addLog("info", "nav-chat", "=== Try Navigate to Chat ===");
      if (!convId) {
        /* 先列出会话 */
        if (window.roche && roche.conversation && roche.conversation.list) {
          roche.conversation.list().then(function(list) {
            if (list && list.length > 0) {
              convId = list[0].id || list[0].conversationId || "";
              addLog("info", "nav-chat", "Using first conv id: " + convId);
              doNavigate(convId);
            } else {
              addLog("warn", "nav-chat", "No conversations found");
            }
          }).catch(function(e) {
            addLog("error", "nav-chat", "Failed to list convs: " + (e && e.message ? e.message : String(e)));
          });
        } else {
          addLog("warn", "nav-chat", "roche.conversation API not available");
        }
        return;
      }
      doNavigate(convId);

      function doNavigate(cid) {
        addLog("info", "nav-chat", "Target convId: " + cid);
        /* 方法1: roche.conversation.open */
        if (window.roche && roche.conversation) {
          if (roche.conversation.open) {
            addLog("info", "nav-chat", "Trying roche.conversation.open...");
            try {
              var result = roche.conversation.open(cid);
              addLog("info", "nav-chat", "conversation.open returned: " + JSON.stringify(result).substring(0, 100));
            } catch(e) {
              addLog("error", "nav-chat", "conversation.open error: " + e.message);
            }
          }
          if (roche.conversation.get) {
            addLog("info", "nav-chat", "Trying roche.conversation.get...");
            roche.conversation.get(cid).then(function(conv) {
              addLog("info", "nav-chat", "conversation.get result: " + JSON.stringify(conv).substring(0, 200));
              addLog("info", "nav-chat", "conv keys: " + Object.keys(conv || {}).join(", "));
            }).catch(function(e) {
              addLog("error", "nav-chat", "conversation.get error: " + (e && e.message ? e.message : String(e)));
            });
          }
          if (roche.conversation.navigate) {
            addLog("info", "nav-chat", "Trying roche.conversation.navigate...");
            try {
              roche.conversation.navigate(cid);
              addLog("info", "nav-chat", "conversation.navigate called");
            } catch(e) {
              addLog("error", "nav-chat", "conversation.navigate error: " + e.message);
            }
          }
          if (roche.conversation.show) {
            addLog("info", "nav-chat", "Trying roche.conversation.show...");
            try {
              roche.conversation.show(cid);
              addLog("info", "nav-chat", "conversation.show called");
            } catch(e) {
              addLog("error", "nav-chat", "conversation.show error: " + e.message);
            }
          }
        }
        /* 方法2: roche.ui */
        if (window.roche && roche.ui) {
          if (roche.ui.openConversation) {
            addLog("info", "nav-chat", "Trying roche.ui.openConversation...");
            try {
              roche.ui.openConversation(cid);
              addLog("info", "nav-chat", "openConversation called");
            } catch(e) {
              addLog("error", "nav-chat", "openConversation error: " + e.message);
            }
          }
          if (roche.ui.navigateTo) {
            addLog("info", "nav-chat", "Trying roche.ui.navigateTo...");
            try {
              roche.ui.navigateTo("/chat/" + cid);
              addLog("info", "nav-chat", "navigateTo called");
            } catch(e) {
              addLog("error", "nav-chat", "navigateTo error: " + e.message);
            }
          }
        }
        /* 方法3: URL hash */
        addLog("info", "nav-chat", "Trying hash routes...");
        var routes = ["#/chat/" + cid, "#/conversation/" + cid, "#/c/" + cid];
        for (var ri = 0; ri < routes.length; ri++) {
          addLog("info", "nav-chat", "Try: " + routes[ri]);
        }
        /* 方法4: 模拟点击侧边栏 */
        addLog("info", "nav-chat", "Trying DOM click on sidebar items...");
        var clickSelectors = [
          '[data-conversation-id="' + cid + '"]',
          '[data-conv-id="' + cid + '"]',
          '[data-id="' + cid + '"]',
          '[data-session-id="' + cid + '"]'
        ];
        for (var cs = 0; cs < clickSelectors.length; cs++) {
          var clickEl = document.querySelector(clickSelectors[cs]);
          if (clickEl) {
            addLog("info", "nav-chat", "Found and clicking: " + clickSelectors[cs]);
            clickEl.click();
            break;
          }
        }
        addLog("info", "nav-chat", "=== Navigate attempts done ===");
      }
    },
    log: function(level, source, message) { addLog(level, source, message); },
    sniffRoutes: function() {
      addLog("info", "route-sniffer", "=== Captured Routes ===");
      if (_capturedRoutes.length === 0) {
        addLog("warn", "route-sniffer", "No routes captured yet. Navigate in Roche to capture routes.");
      }
      for (var i = 0; i < _capturedRoutes.length; i++) {
        var r = _capturedRoutes[i];
        addLog("info", "route-sniffer", "[" + i + "] " + r.type + ": " + (r.url || r.hash || r.path || ""));
      }
      addLog("info", "route-sniffer", "Current URL: " + window.location.href);
      addLog("info", "route-sniffer", "Current pathname: " + window.location.pathname);
      addLog("info", "route-sniffer", "Current hash: " + window.location.hash);
      /* 再次探测 Vue Router */
      var vueInfo = probeVueRouter();
      if (vueInfo) {
        addLog("info", "route-sniffer", "Vue Router v" + vueInfo.version + " currentRoute=" + vueInfo.currentRoute);
        addLog("info", "route-sniffer", "Routes: " + vueInfo.routes);
      } else {
        addLog("warn", "route-sniffer", "Vue Router not found");
      }
      addLog("info", "route-sniffer", "=== End Routes ===");
    },
    vueJump: function(path) {
      if (!path) {
        /* 尝试跳转到第一个会话 */
        addLog("info", "vue-jump", "No path specified, trying to find a conversation to jump to...");
        if (window.roche && roche.conversation && roche.conversation.list) {
          roche.conversation.list().then(function(list) {
            if (list && list.length > 0) {
              var convId = list[0].id || list[0].conversationId || "";
              var convName = list[0].name || list[0].title || "";
              addLog("info", "vue-jump", "Using first conv: id=" + convId + " name=" + convName);
              doVueJump("/chat/" + convId, convId);
            } else {
              addLog("warn", "vue-jump", "No conversations found");
            }
          }).catch(function(e) {
            addLog("error", "vue-jump", "Failed to list convs: " + (e && e.message ? e.message : String(e)));
          });
        } else {
          addLog("warn", "vue-jump", "roche.conversation API not available, trying /chat as path");
          doVueJump("/chat", null);
        }
        return;
      }
      doVueJump(path, null);
    },
    closeApp: function() {
      if (_state.roche && _state.roche.ui && _state.roche.ui.closeApp) {
        _state.roche.ui.closeApp();
      }
      /* 关闭App后确保悬浮球仍可点击 */
      _state.panelVisible = false;
      addLog("info", "system", "App closed via exit button, floating ball still active");
    }
  };

  /* ─── 插件注册 ─── */
  window.RochePlugin.register({
    id: PLUGIN_ID,
    name: "Hofter Monitor",
    version: "1.0.0",
    apps: [
      {
        id: "hofter-monitor-home",
        name: "Hofter Monitor",
        icon: "extension",
        iconImage: "",
        mount: function(container, roche) {
          _state.containerEl = container;
          _state.roche = roche;
          /* 注入样式 */
          var styleEl = document.createElement("style");
          styleEl.textContent = getStyles();
          styleEl.setAttribute("data-hofter-monitor-style", "1");
          document.head.appendChild(styleEl);
          _state.styleEl = styleEl;
          /* 确保容器可见且有高度 */
          if (container) {
            container.style.height = "100%";
            container.style.minHeight = "100%";
            container.style.overflow = "hidden";
          }
          /* 渲染主界面到container */
          container.innerHTML = '<div class="' + ROOT_CLASS + '" style="height:100%;min-height:100%;display:flex;flex-direction:column;background:#1a1a2e;color:#e0e0e0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;overflow:hidden">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#16213e;border-bottom:1px solid #0f3460;flex-shrink:0">' +
              '<span style="font-size:16px;font-weight:700;color:#e94560">Hofter Monitor</span>' +
              '<button class="hm-btn hm-btn-primary" onclick="window.__hofterMonitor.closeApp()" style="padding:6px 16px;font-size:13px">\u9000\u51FA</button>' +
            '</div>' +
            '<div style="display:flex;flex-wrap:wrap;gap:6px;padding:8px 16px;background:#16213e;border-bottom:1px solid #0f3460;flex-shrink:0">' +
              '<button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.scanDOM()">Scan DOM</button>' +
              '<button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.listConvs()">Convs</button>' +
              '<button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.tryNavChat()">Nav Chat</button>' +
              '<button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.sniffRoutes()">Routes</button>' +
              '<button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.vueJump()">Vue Jump</button>' +
              '<button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.copyLogs()">Copy</button>' +
              '<button class="hm-btn hm-btn-secondary" onclick="window.__hofterMonitor.clearLogs()">Clear</button>' +
            '</div>' +
            '<div class="hm-filter-bar" style="flex-shrink:0">' +
              '<button class="hm-filter-btn active" onclick="window.__hofterMonitor.setFilter(\'all\')">All</button>' +
              '<button class="hm-filter-btn" onclick="window.__hofterMonitor.setFilter(\'info\')">Info</button>' +
              '<button class="hm-filter-btn" onclick="window.__hofterMonitor.setFilter(\'warn\')">Warn</button>' +
              '<button class="hm-filter-btn" onclick="window.__hofterMonitor.setFilter(\'error\')">Error</button>' +
              '<button class="hm-btn hm-btn-secondary" style="margin-left:auto" onclick="window.__hofterMonitor.clearLogs()">Clear</button>' +
            '</div>' +
            '<div class="hm-log-container" id="hm-log-container-main" style="flex:1;overflow-y:auto;padding:8px;min-height:0"></div>' +
            '<div style="display:flex;justify-content:space-between;padding:6px 16px;background:#16213e;border-top:1px solid #0f3460;font-size:10px;color:#555;flex-shrink:0">' +
              '<span id="hm-log-count-main">Logs: ' + _state.logs.length + '</span>' +
              '<span>\u60AC\u6D6E\u7403\u5728\u5173\u95EDApp\u540E\u4ECD\u53EF\u4F7F\u7528</span>' +
            '</div>' +
          '</div>';
          /* 同步日志到主界面的容器 */
          _state.mainLogContainer = document.getElementById("hm-log-container-main");
          refreshMainLog();
          /* 渲染悬浮球到body（不受app生命周期影响） */
          renderBall();
          /* 启动监控 */
          hookConsole();
          hookFetch();
          startDOMWatch();
          startConvWatch();
          startRouteSniffer();
          addLog("info", "system", "Hofter Monitor v1.0.0 started");
          addLog("info", "system", "roche API available: " + !!roche);
          if (roche && roche.conversation) {
            addLog("info", "system", "roche.conversation API available");
          }
        },
        unmount: function(container) {
          /* 清理container内容，但保留悬浮球和监控 */
          _state.mainLogContainer = null;
          if (container) container.replaceChildren();
          /* 不清理悬浮球、不停止监控 — 悬浮球在app关闭后继续运行 */
          _state.panelVisible = false;
          /* 确保悬浮球仍然存在 */
          renderBall();
          addLog("info", "system", "App view closed, floating ball still active");
        }
      }
    ]
  });
})();
