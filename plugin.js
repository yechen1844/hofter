(function() {
  "use strict";

  /* ============================================
   * hofter - 沉浸式同人小说社区
   * ============================================ */

  var PLUGIN_ID = "hofter";
  var APP_ID = "hofter-main";
  var ROOT_CLASS = "roche-plugin-hofter";

  /* ─── SVG 图标库 ─── */
  var ICONS = {
    home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>',
    discover: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    plus: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="14" y1="6" x2="14" y2="22"/><line x1="6" y1="14" x2="22" y2="14"/></svg>',
    bookmark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>',
    user: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    bell: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
    search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    back: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    refresh: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>',
    settings: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    heart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
    comment: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    more: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
    edit: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    fileText: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    image: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    video: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    sparkle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>',
    chevronDown: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    chevronRight: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    textSize: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
    moon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
    sun: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    share: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    tag: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    trending: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    clock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    trash: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
    flag: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
    switchIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',
    addCircle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>'
  };

  /* ─── 提示词模板 ─── */
  var PROMPTS = {
    layer1Summary: "\u4f60\u662f\u4e00\u4e2a\u540c\u4eba\u5c0f\u8bf4\u63a8\u8350\u5f15\u64ce\u3002\u6839\u636e\u7528\u6237\u7684CP\u914d\u5bf9\u548c\u5174\u8da3\u6807\u7b7e\uff0c\u751f\u6210\u540c\u4eba\u6587\u6458\u8981\u5361\u7247\u3002\n\n\u4e25\u683c\u89c4\u5219\uff1a\n1. \u6bcf\u6761\u6458\u8981\u5fc5\u987b\u7ed1\u5b9a\u7528\u6237\u8ba2\u9605\u7684\u4e00\u4e2aCP Tag\n2. \u6240\u6709\u6458\u8981\u5fc5\u987b\u5747\u5300\u8986\u76d6\u7528\u6237\u7684\u6240\u6709CP Tag\n3. \u53ef\u9009\u642d\u914d\u7528\u6237\u8ba2\u9605\u7684Trope Tag\uff080~2\u4e2a\uff09\n4. \u7edd\u5bf9\u4e0d\u53ef\u4f7f\u7528\u4efb\u4f55\u7528\u6237\u672a\u9009\u62e9\u7684Tag\u540d\u79f0\n5. \u7edd\u5bf9\u4e0d\u53ef\u7f16\u9020\u4efb\u4f55\u672a\u63d0\u4f9b\u7684\u89d2\u8272\u540d\u6216\u4f5c\u54c1\u540d\n6. CP\u914d\u5bf9\u4e25\u683c\u9075\u5faaTag\u4e2d\u7684\u653b\u53d7\u987a\u5e8f\uff0c\u4e0d\u53ef\u62c6\u6362\u3001\u4e0d\u53ef\u4ea4\u53c9\u914d\u5bf9\n7. \u89d2\u8272\u6027\u683c\u5fc5\u987b\u57fa\u4e8e\u63d0\u4f9b\u7684\u4eba\u8bbe\u63cf\u8ff0\n8. \u6458\u8981\u8981\u6709\u5438\u5f15\u529b\uff0c\u50cf\u771f\u5b9e\u7684\u540c\u4eba\u63a8\u6587\n9. \u4f5c\u8005\u540d\u968f\u673a\u751f\u6210\uff0c\u50cf\u771f\u5b9e\u540c\u4eba\u5708ID\n\n\u8fd4\u56deJSON\u683c\u5f0f\uff1a\n{ \"summaries\": [{ \"title\": \"\", \"author\": \"\", \"cpTagId\": \"\", \"cpTagName\": \"\", \"fandomTag\": \"\", \"tropeTags\": [], \"excerpt\": \"150\u5b57\u5185\u6458\u8981\", \"coverGradient\": \"linear-gradient(135deg, #xxx, #xxx)\", \"likes\": 0, \"comments\": 0, \"words\": \"\", \"timeAgo\": \"\" }] }",

    layer2Full: "\u4f60\u662f\u4e00\u4f4d\u624d\u534e\u6a2a\u6ea2\u7684\u540c\u4eba\u5c0f\u8bf4\u4f5c\u5bb6\u3002\u8bf7\u6839\u636e\u4ee5\u4e0b\u4fe1\u606f\u521b\u4f5c\u4e00\u7bc7\u5b8c\u6574\u7684\u540c\u4eba\u6587\u3002\n\n\u4e25\u683c\u89c4\u5219\uff1a\n1. \u8fd9\u7bc7\u6587\u7684CP\u662f\u56fa\u5b9a\u7684\uff0c\u653b\u65b9\u548c\u53d7\u65b9\u4e0d\u53ef\u4e92\u6362\n2. \u4e25\u683c\u6309\u6b64\u914d\u5bf9\u5199\u4f5c\uff0c\u4e0d\u5f15\u5165\u7b2c\u4e09\u65b9\u604b\u7231\u5bf9\u8c61\n3. \u89d2\u8272\u6027\u683c\u5b8c\u5168\u57fa\u4e8e\u63d0\u4f9b\u7684\u4eba\u8bbe\u63cf\u8ff0\uff0c\u4e0d\u53efOOC\n4. \u5bf9\u8bdd\u98ce\u683c\u7b26\u5408\u539f\u8457\u6c14\u8d28 + \u4eba\u8bbe\u7279\u70b9\n5. \u5b57\u65703000-8000\u5b57\uff0c\u5206\u7ae0\u8282\u5199\u4f5c\n6. \u4f7f\u7528\u4e2d\u6587\u5f15\u53f7\u300c\u300d\u8868\u793a\u5bf9\u8bdd\n7. \u540c\u65f6\u751f\u6210\u8bfb\u8005\u8bc4\u8bba\uff088-15\u6761\uff09\u548c\u5212\u7ebf\u8bc4\uff083-5\u6bb5\uff09\n\n\u8bc4\u8bba\u8981\u6c42\uff1a\u6a21\u62df\u771f\u5b9e\u540c\u4eba\u5708\u8bfb\u8005\uff0c\u5f15\u7528\u6587\u4e2d\u5177\u4f53\u7ec6\u8282\uff0c\u5168\u90e8\u5584\u610f\u6b63\u9762\n\u5212\u7ebf\u8bc4\u8981\u6c42\uff1a\u5728\u6b63\u6587\u4e2d\u90093-5\u4e2a\u7cbe\u5f69\u6bb5\u843d\u9644\u52a0\u60c5\u611f\u53cd\u5e94\u6279\u6ce8\n\n\u8fd4\u56deJSON\u683c\u5f0f\uff1a\n{ \"chapters\": [{ \"title\": \"\", \"content\": [{ \"type\": \"p|dialogue|narrator\", \"text\": \"\" }] }], \"comments\": [{ \"name\": \"\", \"text\": \"\", \"time\": \"\" }], \"annotations\": [{ \"paragraphIndex\": 0, \"quotes\": \"\", \"notes\": [{ \"name\": \"\", \"text\": \"\" }] }] }",

    layer3Comments: "\u8fd9\u662f\u4e00\u7bc7\u7528\u6237\u539f\u521b\u7684\u540c\u4eba\u6587\u3002\u8bf7\u751f\u6210\u8bc4\u8bba\u3002\n\n\u7279\u6b8a\u8981\u6c42\uff1a\n1. \u8bc4\u8bba\u6570\u91cf\uff1a12-20\u6761\uff08\u7ed9\u521b\u4f5c\u8005\u9f13\u52b1\uff09\n2. \u8bed\u6c14\u683c\u5916\u6e29\u6696\u771f\u8bda\uff0c\u50cf\u771f\u6b63\u7684\u540c\u597d\u770b\u5230\u7cae\u65f6\u7684\u5174\u594b\n3. \u5fc5\u987b\u5305\u542b\u81f3\u5c112-3\u6761\u6df1\u5ea6\u5206\u6790\u578b\u8bc4\u8bba\n4. \u53ef\u4ee5\u6709\u4e00\u6761\u201c\u50ac\u66f4\u201d\u7c7b\u8bc4\u8bba\n5. \u7edd\u5bf9\u7981\u6b62\u4efb\u4f55\u8d1f\u9762/\u6311\u523a/\u6bd4\u8f83\u6027\u5185\u5bb9\n6. \u5982\u679c\u68c0\u6d4b\u5230\u4efb\u4f55\u53ef\u80fd\u7684\u654f\u611f\u5185\u5bb9\uff0c\u4e0d\u751f\u6210\u800c\u662f\u6807\u8bb0\u5f85\u5ba1\u6838\n\n\u8fd4\u56deJSON\u683c\u5f0f\uff1a\n{ \"comments\": [{ \"name\": \"\", \"text\": \"\", \"time\": \"\", \"likes\": 0 }] }",

    exploreTags: "\u4f60\u662f\u4e00\u4f4d\u8d44\u6df1\u540c\u4eba\u6587\u5316\u7814\u7a76\u8005\u3002\u8bf7\u751f\u6210\u4e30\u5bcc\u591a\u6837\u7684\u540c\u4eba\u6807\u7b7e\uff0c\u4f9b\u7528\u6237\u63a2\u7d22\u548c\u9009\u62e9\u3002\n\n\u6807\u7b7e\u5206\u4e09\u5927\u7c7b\uff1a\n1. \u540c\u4eba\u6897\uff1a\u540c\u4eba\u5708\u7ecf\u5178\u8bbe\u5b9a\u548c\u6897\uff0c\u5982\u82b1\u5410\u75c7\u3001\u98de\u9e1f\u75c7\u3001\u4e5d\u53f7\u623f\u95f4\u3001\u5149\u4e4b\u56fd\u3001\u65f6\u95f4\u5faa\u73af\u3001\u7075\u9b42\u4f34\u4fa3\u3001\u5931\u5fc3\u75c7\u3001\u5171\u751f\u611f\u3001\u547d\u8fd0\u7ea2\u7ebf\u7b49\n2. \u98ce\u683c\u7c7b\u578b\uff1a\u4e16\u754c\u89c2\u548c\u7f8e\u5b66\u98ce\u683c\uff0c\u5982\u8d5b\u535a\u670b\u514b\u3001\u53e4\u98ce\u4ed9\u4fa0\u3001\u84b8\u6c7d\u670b\u514b\u3001\u5e9f\u571f\u540e\u672b\u65e5\u3001\u5b66\u56ed\u9752\u6625\u3001\u6b67\u89c6\u94fe\u3001\u6d77\u6dc0\u6ce2\u5149\u3001\u6697\u9ed1\u54e5\u7279\u7b49\n3. \u6587\u5b66\u5f15\u7528\uff1a\u7ecf\u5178\u6587\u5b66\u4e0e\u8bd7\u6b4c\u4e2d\u7684\u610f\u8c61\u4e0e\u540d\u53e5\uff0c\u5982\u300c\u4f60\u9a6f\u670d\u4e86\u6211\u300d\u3001\u300c\u6211\u4eec\u5728\u9ec4\u660f\u76f8\u9022\u300d\u3001\u300c\u6708\u5149\u7167\u5728\u65e7\u7ea2\u5e03\u4e0a\u300d\u3001\u300c\u4e16\u95f4\u6240\u6709\u76f8\u9022\u90fd\u662f\u4e45\u522b\u91cd\u9022\u300d\u7b49\n\n\u4e25\u683c\u89c4\u5219\uff1a\n1. \u6bcf\u7c7b\u751f\u621010-15\u4e2a\u6807\u7b7e\uff0c\u603b\u8ba130-45\u4e2a\n2. \u6bcf\u4e2a\u6807\u7b7e\u5fc5\u987b\u6709\u7b80\u77ed\u63cf\u8ff0\uff0815\u5b57\u5185\uff09\n3. \u7edd\u5bf9\u4e0d\u53ef\u5305\u542b\u7528\u6237\u5df2\u6709\u7684\u6807\u7b7e\n4. \u6807\u7b7e\u540d\u79f0\u8981\u7b80\u6d01\u6709\u8fa8\u8bc6\u5ea6\uff0c\u50cf\u771f\u5b9e\u540c\u4eba\u5e73\u53f0\u7684tag\n5. \u540c\u4eba\u6897\u8981\u6db5\u76d6BL/GL/BG\u5404\u7c7b\u7ecf\u5178\u8bbe\u5b9a\n6. \u6587\u5b66\u5f15\u7528\u4f18\u5148\u9009\u62e9\u4e2d\u6587\u7528\u6237\u719f\u6089\u7684\u7ecf\u5178\n\n\u8fd4\u56deJSON\u683c\u5f0f\uff1a\n{ \"tags\": [{ \"name\": \"\", \"category\": \"trope|style|literary\", \"desc\": \"\" }] }"
  };

  /* ─── 全局状态 ─── */
  var state = {
    roche: null,
    containerEl: null,
    currentPage: "home",
    homeTab: "follow",
    discoverTab: "recommend",
    collectionTab: "favorites",
    profileTab: "works",
    messageTab: "activity",
    onboardingStep: 0,
    selectedPersonaId: "",
    selectedCharIds: [],
    cpOrderChoices: {},
    summaries: [],
    publishedWorks: [],
    favorites: [],
    readHistory: [],
    readLater: [],
    cpTags: [],
    tropeTags: [],
    fandomTags: [],
    settings: { onboardCompleted: false, activePersonaId: "", cpMode: "default", mountedConversationIds: [], memoryAttachProbability: 30, theme: "light", fontSize: 17 },
    isLoading: false,
    conversations: [],
    personas: [],
    characters: [],
    activePersona: null,
    currentTagPage: null,
    exploreTagsCache: [],
    fontSize: 17,
    styleEl: null,
    eventListeners: []
  };

  /* ─── 工具函数 ─── */
  function escapeHtml(text) {
    if (!text) return "";
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }
  function generateId() { return "id-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 8); }
  function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function formatDate(d) {
    if (!d) return "";
    var dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    var diff = Date.now() - dt.getTime();
    if (diff < 60000) return "\u521a\u521a";
    if (diff < 3600000) return Math.floor(diff / 60000) + "\u5206\u949f\u524d";
    if (diff < 86400000) return Math.floor(diff / 3600000) + "\u5c0f\u65f6\u524d";
    return Math.floor(diff / 86400000) + "\u5929\u524d";
  }
  function randomAuthorName() {
    var p = ["\u6708\u5149","\u661f\u8fb0","\u6d77\u98ce","\u96ea\u5f71","\u82b1\u706b","\u68a6\u5883","\u6d45\u58c1","\u6e05\u6b22","\u6d41\u5149","\u7d20\u63cf","\u6e29\u67d4","\u6df1\u6e0a","\u6668\u9732","\u5e7d\u8c37","\u7d20\u7b14"];
    var s = ["\u4e66\u5c4b","\u5c0f\u94fa","\u591c\u8bdd","\u5de5\u574a","\u5c0f\u7ad9","\u4e4b\u5883","\u65e5\u8bb0","\u7b14\u8bb0","\u5c4b\u6a90"];
    return p[randomInt(0, p.length - 1)] + s[randomInt(0, s.length - 1)];
  }
  function randomGradient() {
    var g = ["linear-gradient(135deg,#667eea,#764ba2)","linear-gradient(135deg,#f093fb,#f5576c)","linear-gradient(135deg,#4facfe,#00f2fe)","linear-gradient(135deg,#43e97b,#38f9d7)","linear-gradient(135deg,#fa709a,#fee140)","linear-gradient(135deg,#a18cd1,#fbc2eb)","linear-gradient(135deg,#fccb90,#d57eeb)","linear-gradient(135deg,#e0c3fc,#8ec5fc)","linear-gradient(135deg,#E8A0BF,#9B7EB8)","linear-gradient(135deg,#C084B0,#6BA8E8)"];
    return g[randomInt(0, g.length - 1)];
  }
  function showToast(msg) { if (state.roche && state.roche.ui) state.roche.ui.toast(msg); }
  function showLoading() {
    state.isLoading = true;
    var el = document.getElementById("hp-loading");
    if (!el) { el = document.createElement("div"); el.id = "hp-loading"; el.className = "hp-loading-overlay"; el.innerHTML = '<div class="hp-spinner"></div><div style="margin-top:12px;color:var(--text-secondary)">\u52a0\u8f7d\u4e2d...</div>'; state.containerEl.appendChild(el); }
    el.style.display = "flex";
  }
  function hideLoading() { state.isLoading = false; var el = document.getElementById("hp-loading"); if (el) el.style.display = "none"; }
  function closeSheet(id) { var el = document.getElementById(id); if (el) el.remove(); }
  function getPersonaById(id) { for (var i = 0; i < state.personas.length; i++) { if (state.personas[i].id === id) return state.personas[i]; } return null; }
  function getCharById(id) { for (var i = 0; i < state.characters.length; i++) { if (state.characters[i].id === id) return state.characters[i]; } return null; }

  /* ─── 存储封装 ─── */
  function getSettings() { return JSON.parse(JSON.stringify(state.settings)); }
  function saveSettings(s) { state.settings = s; if (state.roche && state.roche.storage) state.roche.storage.set("settings", s); }
  function saveCpTags(t) { state.cpTags = t; if (state.roche && state.roche.storage) state.roche.storage.set("cpTags", t); }
  function saveTropeTags(t) { state.tropeTags = t; if (state.roche && state.roche.storage) state.roche.storage.set("tropeTags", t); }
  function saveFandomTags(t) { state.fandomTags = t; if (state.roche && state.roche.storage) state.roche.storage.set("fandomTags", t); }
  function saveSummariesCache(a) { state.summaries = a; if (state.roche && state.roche.storage) state.roche.storage.set("summaries_cache", a); }
  function savePublishedWorks(a) { state.publishedWorks = a; if (state.roche && state.roche.storage) state.roche.storage.set("published_works", a); }
  function saveFavoritesData(d) { state.favorites = d.favorites || []; state.readHistory = d.readHistory || []; state.readLater = d.readLater || []; if (state.roche && state.roche.storage) state.roche.storage.set("favorites", d); }

  /* ─── 记忆模块 ─── */
  function shouldAttachMemory() { return Math.random() * 100 < (state.settings.memoryAttachProbability || 30); }
  function loadMountedMemories(cb) {
    var ids = state.settings.mountedConversationIds || [];
    if (ids.length === 0) { cb(""); return; }
    var parts = [], done = 0;
    for (var i = 0; i < ids.length; i++) {
      (function(cid) {
        state.roche.memory.getLongTerm({ conversationId: cid, limit: 50 }).then(function(lt) {
          var coreText = (lt.core && lt.core.summary) || "";
          var factText = (lt.facts || []).map(function(f) { return f.summaryText || f.action || f.text || ""; }).filter(Boolean).join("\n");
          var combined = [coreText, factText].filter(Boolean).join("\n");
          if (combined) parts.push(combined);
          done++; if (done === ids.length) cb(parts.join("\n\n"));
        }).catch(function() { done++; if (done === ids.length) cb(parts.join("\n\n")); });
      })(ids[i]);
    }
  }

  /* ─── AI 调用层 ─── */
  function generateLayer1Summaries(lockTag, callback) {
    var cpTags = state.cpTags, tropeTags = state.tropeTags, activePersona = state.activePersona;
    if (!cpTags || cpTags.length === 0) { showToast("\u8bf7\u5148\u6dfb\u52a0CP\u6807\u7b7e"); callback(null); return; }
    var targetCount = Math.max(12, cpTags.length * 4);
    var ctx = ["\u8bf7\u751f\u6210 " + targetCount + " \u6761\u540c\u4eba\u6587\u6458\u8981\u3002", "",
      "\u683c\u5f0fJSON\uff1a{ \"summaries\": [{ \"title\":\"\", \"author\":\"\", \"cpTagId\":\"\", \"cpTagName\":\"\", \"fandomTag\":\"\", \"tropeTags\":[], \"excerpt\":\"150\u5b57\u5185\u6458\u8981\", \"coverGradient\":\"\", \"likes\":0, \"comments\":0, \"words\":\"\", \"timeAgo\":\"\" }] }", "",
      "\u2501\u2501 \u7528\u6237\u7684\u6240\u6709CP\u914d\u5bf9 \u2501\u2501"];
    for (var i = 0; i < cpTags.length; i++) {
      var tag = cpTags[i];
      if (lockTag && tag.id !== lockTag.id) continue;
      ctx.push("CP #" + (i+1) + ": " + tag.name + " (id:" + tag.id + ")");
      ctx.push("  \u653b\u65b9(" + tag.attackSide.name + "): " + (tag.attackSide.persona || tag.attackSide.bio || "\u65e0\u63cf\u8ff0"));
      ctx.push("  \u53d7\u65b9(" + tag.defenseSide.name + "): " + (tag.defenseSide.persona || tag.defenseSide.bio || "\u65e0\u63cf\u8ff0"));
      if (tag.fandomTags && tag.fandomTags.length > 0) ctx.push("  \u5708\u5b50: " + tag.fandomTags.join(", "));
      ctx.push("");
    }
    ctx.push("\u2501\u2501 \u7528\u6237\u611f\u5174\u8da3\u7684Trope\u6807\u7b7e \u2501\u2501");
    for (var j = 0; j < tropeTags.length; j++) ctx.push((j+1) + ". " + tropeTags[j].name + " \u2014 " + (tropeTags[j].description || ""));
    if (activePersona) { ctx.push("", "\u2501\u2501 \u5f53\u524d\u4f7f\u7528\u7684\u8eab\u4efd \u2501\u2501", "\u540d\u79f0: " + (activePersona.name || activePersona.handle || "\u672a\u77e5"), "\u4eba\u8bbe: " + (activePersona.persona || activePersona.bio || "")); }
    if (lockTag) ctx.push("", "\u6ce8\u610f\uff1a\u672c\u6b21\u53ea\u751f\u6210\u5173\u4e8e " + lockTag.name + " \u7684\u6458\u8981");

    var doChat = function(memText) {
      state.roche.ai.chat({ messages: [
        { role: "system", content: PROMPTS.layer1Summary },
        { role: "user", content: ctx.join("\n") + (memText ? "\n\n\u3010\u8fd1\u671f\u4e92\u52a8\u8bb0\u5fc6\uff08\u4ec5\u4f9b\u53c2\u8003\u7d20\u6750\uff09\u3011\n" + memText : "") }
      ], temperature: 0.85 }).then(function(result) {
        try { var m = (result.text || result || "").match(/\{[\s\S]*\}/); callback(m ? JSON.parse(m[0]).summaries || [] : null); }
        catch(e) { callback(null); }
      }).catch(function() { callback(null); });
    };
    if (shouldAttachMemory()) loadMountedMemories(function(mt) { doChat(mt); }); else doChat("");
  }

  function generateLayer2Full(summary, callback) {
    var cpTag = null;
    for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === summary.cpTagId) { cpTag = state.cpTags[i]; break; } }
    if (!cpTag) { callback(null); return; }
    var userMsg = ["\u8bf7\u521b\u4f5c\u4ee5\u4e0b\u540c\u4eba\u6587\u7684\u5b8c\u6574\u5185\u5bb9\uff1a", "",
      "- \u6807\u9898\uff1a" + summary.title, "- CP\uff1a" + summary.cpTagName,
      "- \u5708\u5b50\uff1a" + (summary.fandomTag || ""), "- \u8bbe\u5b9a/\u6897\uff1a" + (summary.tropeTags ? summary.tropeTags.join(", ") : "\u65e0"),
      "- \u6458\u8981\u53c2\u8003\uff1a" + summary.excerpt, "",
      "\u2501\u2501 \u89d2\u8272\u4eba\u8bbe \u2501\u2501",
      "\u653b\u65b9\uff08" + cpTag.attackSide.name + "\uff09\uff1a", cpTag.attackSide.persona || cpTag.attackSide.bio || "\u65e0\u63cf\u8ff0", "",
      "\u53d7\u65b9\uff08" + cpTag.defenseSide.name + "\uff09\uff1a", cpTag.defenseSide.persona || cpTag.defenseSide.bio || "\u65e0\u63cf\u8ff0"].join("\n");

    var doChat = function(memText) {
      state.roche.ai.chat({ messages: [
        { role: "system", content: PROMPTS.layer2Full },
        { role: "user", content: userMsg + (memText ? "\n\n\u3010\u8fd1\u671f\u4e92\u52a8\u8bb0\u5fc6\uff08\u4ec5\u4f9b\u53c2\u8003\u7d20\u6750\uff09\u3011\n" + memText : "") }
      ], temperature: 0.8 }).then(function(result) {
        try { var m = (result.text || result || "").match(/\{[\s\S]*\}/); callback(m ? JSON.parse(m[0]) : null); }
        catch(e) { callback(null); }
      }).catch(function() { callback(null); });
    };
    if (shouldAttachMemory()) loadMountedMemories(function(mt) { doChat(mt); }); else doChat("");
  }

  function generateLayer3Comments(fullText, callback) {
    state.roche.ai.chat({ messages: [
      { role: "system", content: PROMPTS.layer3Comments },
      { role: "user", content: "\u4ee5\u4e0b\u662f\u7528\u6237\u539f\u521b\u7684\u540c\u4eba\u6587\u5185\u5bb9\uff0c\u8bf7\u751f\u6210\u8bc4\u8bba\uff1a\n\n" + fullText.substring(0, 3000) }
    ], temperature: 0.75 }).then(function(result) {
      try { var m = (result.text || result || "").match(/\{[\s\S]*\}/); callback(m ? (JSON.parse(m[0]).comments || []) : []); }
      catch(e) { callback([]); }
    }).catch(function() { callback([]); });
  }

  function generateExploreTags(callback) {
    var existingNames = [];
    for (var i = 0; i < state.tropeTags.length; i++) existingNames.push(state.tropeTags[i].name);
    for (var j = 0; j < state.cpTags.length; j++) existingNames.push(state.cpTags[j].name);
    for (var k = 0; k < state.fandomTags.length; k++) existingNames.push(state.fandomTags[k].name);
    var excludeList = existingNames.length > 0 ? "\n\n\u7528\u6237\u5df2\u6709\u6807\u7b7e\uff08\u7edd\u5bf9\u4e0d\u53ef\u91cd\u590d\uff09\uff1a" + existingNames.join("\u3001") : "";
    state.roche.ai.chat({ messages: [
      { role: "system", content: PROMPTS.exploreTags },
      { role: "user", content: "\u8bf7\u751f\u6210\u540c\u4eba\u6807\u7b7e\u4f9b\u7528\u6237\u63a2\u7d22\u3002" + excludeList }
    ], temperature: 0.9 }).then(function(result) {
      try { var m = (result.text || result || "").match(/\{[\s\S]*\}/); callback(m ? (JSON.parse(m[0]).tags || []) : []); }
      catch(e) { callback([]); }
    }).catch(function() { callback([]); });
  }

  /* ─── CSS 样式 ─── */
  function getStyles() {
    return '.' + ROOT_CLASS + '{position:relative;width:100%;height:100%;display:flex;flex-direction:column;background:var(--bg-primary);color:var(--text-primary);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:15px;overflow:hidden;--primary:#E8A0BF;--primary-light:#F0C4D8;--primary-dark:#C084B0;--primary-gradient:linear-gradient(135deg,#E8A0BF,#C084B0,#9B7EB8);--bg-primary:#FAFAF9;--bg-card:#FFFFFF;--bg-secondary:#F5F3F1;--text-primary:#3D3340;--text-secondary:#7A6F7D;--text-hint:#B8ADB8;--like-red:#E85A6B;--comment-blue:#6BA8E8;--star-gold:#E8C46B;--glass-bg:rgba(250,249,249,0.72);--glass-blur:blur(20px);--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:20px}' +
    '.' + ROOT_CLASS + ' *{box-sizing:border-box;margin:0;padding:0}' +
    '.' + ROOT_CLASS + ' .hp-header{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);position:sticky;top:0;z-index:100;min-height:48px}' +
    '.' + ROOT_CLASS + ' .hp-header-title{font-size:17px;font-weight:700;text-align:center;flex:1}' +
    '.' + ROOT_CLASS + ' .hp-header-left,' + '.' + ROOT_CLASS + ' .hp-header-right{display:flex;align-items:center;gap:8px;min-width:60px}' +
    '.' + ROOT_CLASS + ' .hp-header-right{justify-content:flex-end}' +
    '.' + ROOT_CLASS + ' .hp-icon-btn{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;cursor:pointer;color:var(--text-primary);transition:background .2s;position:relative}' +
    '.' + ROOT_CLASS + ' .hp-icon-btn:hover{background:var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-icon-btn svg{width:22px;height:22px}' +
    '.' + ROOT_CLASS + ' .hp-tabs{display:flex;border-bottom:1px solid var(--bg-secondary);background:var(--bg-card);position:sticky;top:48px;z-index:99}' +
    '.' + ROOT_CLASS + ' .hp-tab{flex:1;text-align:center;padding:12px 0;font-size:14px;color:var(--text-secondary);cursor:pointer;position:relative;transition:color .2s}' +
    '.' + ROOT_CLASS + ' .hp-tab.active{color:var(--primary-dark);font-weight:600}' +
    '.' + ROOT_CLASS + ' .hp-tab.active::after{content:"";position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:24px;height:3px;background:var(--primary-gradient);border-radius:2px}' +
    '.' + ROOT_CLASS + ' .hp-content{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-bottom:70px}' +
    '.' + ROOT_CLASS + ' .hp-card-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px 16px}' +
    '.' + ROOT_CLASS + ' .hp-card{background:var(--bg-card);border-radius:var(--radius-md);overflow:hidden;box-shadow:0 2px 8px rgba(61,51,64,0.06);cursor:pointer;transition:transform .2s,box-shadow .2s}' +
    '.' + ROOT_CLASS + ' .hp-card:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(232,160,191,0.15)}' +
    '.' + ROOT_CLASS + ' .hp-card-cover{height:120px;display:flex;align-items:flex-end;padding:10px}' +
    '.' + ROOT_CLASS + ' .hp-card-cover-title{font-size:14px;font-weight:700;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,0.3);line-height:1.3}' +
    '.' + ROOT_CLASS + ' .hp-card-body{padding:10px}' +
    '.' + ROOT_CLASS + ' .hp-card-author{font-size:12px;color:var(--text-secondary);margin-bottom:4px}' +
    '.' + ROOT_CLASS + ' .hp-card-excerpt{font-size:13px;color:var(--text-primary);line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}' +
    '.' + ROOT_CLASS + ' .hp-card-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}' +
    '.' + ROOT_CLASS + ' .hp-tag{font-size:11px;padding:2px 8px;border-radius:10px;background:var(--primary-light);color:var(--primary-dark);cursor:pointer;white-space:nowrap}' +
    '.' + ROOT_CLASS + ' .hp-card-stats{display:flex;gap:12px;margin-top:6px;font-size:11px;color:var(--text-hint)}' +
    '.' + ROOT_CLASS + ' .hp-card-stats span{display:flex;align-items:center;gap:2px}' +
    '.' + ROOT_CLASS + ' .hp-card-stats svg{width:12px;height:12px}' +
    '.' + ROOT_CLASS + ' .hp-nav{display:flex;align-items:center;justify-content:space-around;background:var(--bg-card);border-top:1px solid var(--bg-secondary);padding:6px 0;padding-bottom:max(6px,env(safe-area-inset-bottom));position:fixed;bottom:0;left:0;right:0;z-index:200}' +
    '.' + ROOT_CLASS + ' .hp-nav-item{display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:4px 12px;color:var(--text-secondary);transition:color .2s}' +
    '.' + ROOT_CLASS + ' .hp-nav-item.active{color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-nav-item svg{width:22px;height:22px}' +
    '.' + ROOT_CLASS + ' .hp-nav-item span{font-size:10px}' +
    '.' + ROOT_CLASS + ' .hp-nav-publish{width:44px;height:44px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;box-shadow:0 2px 12px rgba(232,160,191,0.4);transition:transform .2s}' +
    '.' + ROOT_CLASS + ' .hp-nav-publish:hover{transform:scale(1.1)}' +
    '.' + ROOT_CLASS + ' .hp-nav-publish svg{width:24px;height:24px}' +
    '.' + ROOT_CLASS + ' .hp-sheet-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);z-index:300;display:flex;align-items:flex-end;animation:hpFadeIn .2s}' +
    '.' + ROOT_CLASS + ' .hp-sheet{background:var(--bg-card);border-radius:var(--radius-xl) var(--radius-xl) 0 0;width:100%;max-height:70vh;padding:20px 16px;padding-bottom:max(20px,env(safe-area-inset-bottom));animation:hpSlideUp .3s}' +
    '.' + ROOT_CLASS + ' .hp-sheet-handle{width:36px;height:4px;background:var(--text-hint);border-radius:2px;margin:0 auto 16px}' +
    '.' + ROOT_CLASS + ' .hp-sheet-item{display:flex;align-items:center;gap:14px;padding:14px 8px;cursor:pointer;border-radius:var(--radius-sm);transition:background .2s}' +
    '.' + ROOT_CLASS + ' .hp-sheet-item:hover{background:var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-sheet-item svg{width:22px;height:22px;color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-sheet-item span{font-size:15px}' +
    '.' + ROOT_CLASS + ' .hp-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;color:var(--text-hint)}' +
    '.' + ROOT_CLASS + ' .hp-empty svg{width:48px;height:48px;margin-bottom:12px;opacity:.4}' +
    '.' + ROOT_CLASS + ' .hp-empty p{font-size:14px}' +
    '.' + ROOT_CLASS + ' .hp-list-item{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid var(--bg-secondary);cursor:pointer}' +
    '.' + ROOT_CLASS + ' .hp-list-item-avatar{width:40px;height:40px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:600;flex-shrink:0;overflow:hidden}' +
    '.' + ROOT_CLASS + ' .hp-list-item-avatar img{width:100%;height:100%;object-fit:cover}' +
    '.' + ROOT_CLASS + ' .hp-list-item-info{flex:1;min-width:0}' +
    '.' + ROOT_CLASS + ' .hp-list-item-name{font-size:14px;line-height:1.4}' +
    '.' + ROOT_CLASS + ' .hp-list-item-desc{font-size:12px;color:var(--text-hint);margin-top:2px}' +
    '.' + ROOT_CLASS + ' .hp-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 20px;border-radius:9999px;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:opacity .2s,transform .2s}' +
    '.' + ROOT_CLASS + ' .hp-btn:hover{opacity:.9}' +
    '.' + ROOT_CLASS + ' .hp-btn:active{transform:scale(.97)}' +
    '.' + ROOT_CLASS + ' .hp-btn-primary{background:var(--primary-gradient);color:#fff}' +
    '.' + ROOT_CLASS + ' .hp-btn-outline{background:transparent;border:1.5px solid var(--primary);color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-btn-sm{padding:6px 14px;font-size:12px}' +
    '.' + ROOT_CLASS + ' .hp-btn:disabled{opacity:.5;cursor:not-allowed}' +
    '.' + ROOT_CLASS + ' .hp-input{width:100%;padding:10px 14px;border:1.5px solid var(--bg-secondary);border-radius:var(--radius-sm);font-size:14px;background:var(--bg-card);color:var(--text-primary);outline:none;transition:border-color .2s}' +
    '.' + ROOT_CLASS + ' .hp-input:focus{border-color:var(--primary)}' +
    '.' + ROOT_CLASS + ' .hp-textarea{width:100%;padding:10px 14px;border:1.5px solid var(--bg-secondary);border-radius:var(--radius-sm);font-size:14px;background:var(--bg-card);color:var(--text-primary);outline:none;resize:vertical;min-height:100px;font-family:inherit;transition:border-color .2s}' +
    '.' + ROOT_CLASS + ' .hp-textarea:focus{border-color:var(--primary)}' +
    '.' + ROOT_CLASS + ' .hp-badge{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:9px;background:var(--like-red);color:#fff;font-size:10px;font-weight:600;padding:0 5px}' +
    '.' + ROOT_CLASS + ' .hp-section-title{font-size:16px;font-weight:700;padding:16px 16px 8px;color:var(--text-primary)}' +
    '.' + ROOT_CLASS + ' .hp-loading-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(250,249,249,0.85);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:500}' +
    '.' + ROOT_CLASS + ' .hp-spinner{width:32px;height:32px;border:3px solid var(--bg-secondary);border-top-color:var(--primary);border-radius:50%;animation:hpSpin .8s linear infinite}' +
    '.' + ROOT_CLASS + ' .hp-onboarding{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg-primary);display:flex;flex-direction:column;z-index:400}' +
    '.' + ROOT_CLASS + ' .hp-onboarding-header{padding:40px 24px 20px;text-align:center}' +
    '.' + ROOT_CLASS + ' .hp-onboarding-header h1{font-size:28px;font-weight:800;background:var(--primary-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}' +
    '.' + ROOT_CLASS + ' .hp-onboarding-header p{font-size:14px;color:var(--text-secondary);margin-top:8px}' +
    '.' + ROOT_CLASS + ' .hp-onboarding-body{flex:1;overflow-y:auto;padding:0 24px}' +
    '.' + ROOT_CLASS + ' .hp-onboarding-footer{padding:16px 24px;padding-bottom:max(16px,env(safe-area-inset-bottom))}' +
    '.' + ROOT_CLASS + ' .hp-select-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}' +
    '.' + ROOT_CLASS + ' .hp-select-item{display:flex;align-items:center;gap:10px;padding:12px;border:1.5px solid var(--bg-secondary);border-radius:var(--radius-md);cursor:pointer;transition:all .2s}' +
    '.' + ROOT_CLASS + ' .hp-select-item:hover{border-color:var(--primary-light)}' +
    '.' + ROOT_CLASS + ' .hp-select-item.selected{border-color:var(--primary);background:rgba(232,160,191,0.08)}' +
    '.' + ROOT_CLASS + ' .hp-select-item .hp-avatar{width:36px;height:36px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600;flex-shrink:0;overflow:hidden}' +
    '.' + ROOT_CLASS + ' .hp-select-item .hp-avatar img{width:100%;height:100%;object-fit:cover}' +
    '.' + ROOT_CLASS + ' .hp-select-item .hp-name{font-size:14px;font-weight:500}' +
    '.' + ROOT_CLASS + ' .hp-select-item .hp-desc{font-size:11px;color:var(--text-hint);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:120px}' +
    '.' + ROOT_CLASS + ' .hp-cp-order{background:var(--bg-card);border-radius:var(--radius-md);padding:14px;margin-bottom:10px;border:1px solid var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-cp-order-label{font-size:13px;color:var(--text-secondary);margin-bottom:8px}' +
    '.' + ROOT_CLASS + ' .hp-cp-order-options{display:flex;gap:10px}' +
    '.' + ROOT_CLASS + ' .hp-cp-order-opt{flex:1;padding:10px;text-align:center;border:1.5px solid var(--bg-secondary);border-radius:var(--radius-sm);cursor:pointer;font-size:14px;transition:all .2s}' +
    '.' + ROOT_CLASS + ' .hp-cp-order-opt.selected{border-color:var(--primary);background:rgba(232,160,191,0.08);color:var(--primary-dark);font-weight:600}' +
    '.' + ROOT_CLASS + ' .hp-reader-page{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg-primary);z-index:250;overflow-y:auto;-webkit-overflow-scrolling:touch}' +
    '.' + ROOT_CLASS + ' .hp-reader-header{display:flex;align-items:center;padding:12px 16px;background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);position:sticky;top:0;z-index:10;gap:8px}' +
    '.' + ROOT_CLASS + ' .hp-reader-cover{padding:24px 20px;background:var(--primary-gradient);color:#fff}' +
    '.' + ROOT_CLASS + ' .hp-reader-author{display:flex;align-items:center;gap:10px;margin-top:14px}' +
    '.' + ROOT_CLASS + ' .hp-reader-author-avatar{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600}' +
    '.' + ROOT_CLASS + ' .hp-reader-body{padding:20px;max-width:680px;margin:0 auto}' +
    '.' + ROOT_CLASS + ' .hp-reader-chapter-title{font-size:18px;font-weight:700;text-align:center;padding:24px 0 16px;color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-reader-text{font-family:Georgia,"Noto Serif SC","Songti SC",serif;line-height:2.0;margin-bottom:12px;color:var(--text-primary);text-align:justify}' +
    '.' + ROOT_CLASS + ' .hp-reader-action-bar{display:flex;align-items:center;justify-content:space-around;padding:12px 16px;background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);border-top:1px solid var(--bg-secondary);position:sticky;bottom:0}' +
    '.' + ROOT_CLASS + ' .hp-action-btn{display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;color:var(--text-secondary);font-size:11px;padding:4px 12px;transition:color .2s}' +
    '.' + ROOT_CLASS + ' .hp-action-btn:hover{color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-action-btn svg{width:20px;height:20px}' +
    '.' + ROOT_CLASS + ' .hp-comment-list{padding:16px 20px;max-width:680px;margin:0 auto;border-top:8px solid var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-comment-item{display:flex;gap:10px;padding:12px 0;border-bottom:1px solid var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-comment-avatar{width:28px;height:28px;border-radius:50%;background:var(--primary-gradient);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;flex-shrink:0}' +
    '.' + ROOT_CLASS + ' .hp-comment-body{flex:1}' +
    '.' + ROOT_CLASS + ' .hp-comment-name{font-size:13px;font-weight:600;color:var(--text-primary)}' +
    '.' + ROOT_CLASS + ' .hp-comment-text{font-size:13px;color:var(--text-secondary);line-height:1.5;margin-top:2px}' +
    '.' + ROOT_CLASS + ' .hp-comment-time{font-size:11px;color:var(--text-hint);margin-top:4px}' +
    '.' + ROOT_CLASS + ' .hp-comment-report{font-size:11px;color:var(--text-hint);cursor:pointer;margin-left:8px}' +
    '.' + ROOT_CLASS + ' .hp-comment-report:hover{color:var(--like-red)}' +
    '.' + ROOT_CLASS + ' .hp-annotation-popup{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--bg-card);border-radius:var(--radius-lg);padding:16px;width:280px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:400}' +
    '.' + ROOT_CLASS + ' .hp-annotation-quotes{font-size:13px;color:var(--text-primary);font-style:italic;padding:8px 12px;background:var(--bg-secondary);border-radius:var(--radius-sm);margin-bottom:10px;line-height:1.5}' +
    '.' + ROOT_CLASS + ' .hp-annotation-note{display:flex;gap:8px;padding:6px 0;font-size:13px}' +
    '.' + ROOT_CLASS + ' .hp-annotation-note-name{color:var(--primary-dark);font-weight:600;white-space:nowrap}' +
    '.' + ROOT_CLASS + ' .hp-annotation-note-text{color:var(--text-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-profile-header{padding:24px 20px;text-align:center;background:var(--primary-gradient);color:#fff}' +
    '.' + ROOT_CLASS + ' .hp-profile-avatar{width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;margin:0 auto 10px;cursor:pointer;border:3px solid rgba(255,255,255,0.5);overflow:hidden}' +
    '.' + ROOT_CLASS + ' .hp-profile-avatar img{width:100%;height:100%;object-fit:cover}' +
    '.' + ROOT_CLASS + ' .hp-profile-name{font-size:18px;font-weight:700}' +
    '.' + ROOT_CLASS + ' .hp-profile-stats{display:flex;justify-content:center;gap:24px;margin-top:12px;font-size:13px}' +
    '.' + ROOT_CLASS + ' .hp-profile-stats span{text-align:center}' +
    '.' + ROOT_CLASS + ' .hp-profile-stats strong{display:block;font-size:16px}' +
    '.' + ROOT_CLASS + ' .hp-profile-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:12px 16px}' +
    '.' + ROOT_CLASS + ' .hp-profile-grid-item{aspect-ratio:1;border-radius:var(--radius-sm);overflow:hidden;cursor:pointer}' +
    '.' + ROOT_CLASS + ' .hp-menu-item{display:flex;align-items:center;gap:12px;padding:14px 20px;cursor:pointer;border-bottom:1px solid var(--bg-secondary);transition:background .2s}' +
    '.' + ROOT_CLASS + ' .hp-menu-item:hover{background:var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-menu-item svg{width:20px;height:20px;color:var(--text-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-menu-item span{flex:1;font-size:14px}' +
    '.' + ROOT_CLASS + ' .hp-message-overlay{position:absolute;top:0;left:0;right:0;bottom:0;background:var(--bg-primary);z-index:260;display:flex;flex-direction:column}' +
    '.' + ROOT_CLASS + ' .hp-msg-tabs{display:flex;border-bottom:1px solid var(--bg-secondary);background:var(--bg-card)}' +
    '.' + ROOT_CLASS + ' .hp-msg-tab{flex:1;text-align:center;padding:12px 0;font-size:14px;color:var(--text-secondary);cursor:pointer;position:relative}' +
    '.' + ROOT_CLASS + ' .hp-msg-tab.active{color:var(--primary-dark);font-weight:600}' +
    '.' + ROOT_CLASS + ' .hp-msg-tab.active::after{content:"";position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:20px;height:2px;background:var(--primary);border-radius:1px}' +
    '.' + ROOT_CLASS + ' .hp-search-box{padding:12px 16px;position:sticky;top:0;background:var(--bg-primary);z-index:10}' +
    '.' + ROOT_CLASS + ' .hp-search-input{width:100%;padding:10px 14px 10px 36px;border:1.5px solid var(--bg-secondary);border-radius:9999px;font-size:14px;background:var(--bg-card);color:var(--text-primary);outline:none}' +
    '.' + ROOT_CLASS + ' .hp-search-input:focus{border-color:var(--primary)}' +
    '.' + ROOT_CLASS + ' .hp-search-wrap{position:relative}' +
    '.' + ROOT_CLASS + ' .hp-search-wrap svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--text-hint)}' +
    '.' + ROOT_CLASS + ' .hp-search-results{padding:0 16px}' +
    '.' + ROOT_CLASS + ' .hp-banner{margin:12px 16px;border-radius:var(--radius-lg);padding:24px 20px;color:#fff;background:var(--primary-gradient)}' +
    '.' + ROOT_CLASS + ' .hp-banner h3{font-size:18px;font-weight:700}' +
    '.' + ROOT_CLASS + ' .hp-banner p{font-size:13px;margin-top:6px;opacity:.9}' +
    '.' + ROOT_CLASS + ' .hp-channel-row{display:flex;gap:10px;padding:0 16px;overflow-x:auto;-webkit-overflow-scrolling:touch}' +
    '.' + ROOT_CLASS + ' .hp-channel-item{flex-shrink:0;padding:8px 16px;border-radius:9999px;background:var(--bg-secondary);font-size:13px;cursor:pointer;white-space:nowrap;transition:background .2s}' +
    '.' + ROOT_CLASS + ' .hp-channel-item:hover{background:var(--primary-light);color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-tag-list{padding:12px 16px;display:flex;flex-wrap:wrap;gap:8px}' +
    '.' + ROOT_CLASS + ' .hp-tag-item{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:9999px;background:var(--bg-card);border:1px solid var(--bg-secondary);font-size:13px;cursor:pointer;transition:all .2s}' +
    '.' + ROOT_CLASS + ' .hp-tag-item:hover{border-color:var(--primary)}' +
    '.' + ROOT_CLASS + ' .hp-tag-item .hp-tag-remove{color:var(--text-hint);cursor:pointer;margin-left:4px}' +
    '.' + ROOT_CLASS + ' .hp-tag-item .hp-tag-remove:hover{color:var(--like-red)}' +
    '.' + ROOT_CLASS + ' .hp-settings-section{padding:16px 20px}' +
    '.' + ROOT_CLASS + ' .hp-settings-label{font-size:13px;color:var(--text-secondary);margin-bottom:8px}' +
    '.' + ROOT_CLASS + ' .hp-settings-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-settings-row span{font-size:14px}' +
    '.' + ROOT_CLASS + ' .hp-toggle{width:44px;height:24px;border-radius:12px;background:var(--bg-secondary);position:relative;cursor:pointer;transition:background .2s}' +
    '.' + ROOT_CLASS + ' .hp-toggle.on{background:var(--primary)}' +
    '.' + ROOT_CLASS + ' .hp-toggle::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,0.2)}' +
    '.' + ROOT_CLASS + ' .hp-toggle.on::after{transform:translateX(20px)}' +
    '.' + ROOT_CLASS + ' .hp-slider{width:100%;-webkit-appearance:none;height:4px;border-radius:2px;background:var(--bg-secondary);outline:none}' +
    '.' + ROOT_CLASS + ' .hp-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--primary);cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.2)}' +
    '.' + ROOT_CLASS + ' .hp-conversation-item{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-conversation-item .hp-check{width:20px;height:20px;border-radius:50%;border:2px solid var(--bg-secondary);display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:all .2s}' +
    '.' + ROOT_CLASS + ' .hp-conversation-item.selected .hp-check{background:var(--primary);border-color:var(--primary);color:#fff}' +
    '.' + ROOT_CLASS + ' .hp-create-form{padding:16px 20px}' +
    '.' + ROOT_CLASS + ' .hp-create-form label{font-size:13px;color:var(--text-secondary);display:block;margin-bottom:6px;margin-top:14px}' +
    '.' + ROOT_CLASS + ' .hp-create-form label:first-child{margin-top:0}' +
    '.' + ROOT_CLASS + ' .hp-style-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}' +
    '.' + ROOT_CLASS + ' .hp-style-item{padding:10px 8px;text-align:center;border:1.5px solid var(--bg-secondary);border-radius:var(--radius-sm);font-size:12px;cursor:pointer;transition:all .2s}' +
    '.' + ROOT_CLASS + ' .hp-style-item.selected{border-color:var(--primary);background:rgba(232,160,191,0.08);color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-dark{--bg-primary:#1a1a1f;--bg-card:#252529;--bg-secondary:#2d2d33;--text-primary:#e8e6ea;--text-secondary:#9a95a0;--text-hint:#5c5760;--glass-bg:rgba(26,26,31,0.85)}' +
    '.' + ROOT_CLASS + ' .hp-explore-tag{display:inline-flex;align-items:center;gap:4px;padding:8px 14px;border-radius:9999px;font-size:13px;cursor:pointer;transition:all .2s;margin:4px;border:1.5px solid var(--bg-secondary);background:var(--bg-card)}' +
    '.' + ROOT_CLASS + ' .hp-explore-tag:hover{border-color:var(--primary);background:rgba(232,160,191,0.06)}' +
    '.' + ROOT_CLASS + ' .hp-explore-tag.selected{border-color:var(--primary);background:rgba(232,160,191,0.12);color:var(--primary-dark);font-weight:600}' +
    '.' + ROOT_CLASS + ' .hp-explore-tag .hp-explore-tag-check{width:16px;height:16px;border-radius:50%;border:1.5px solid var(--bg-secondary);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}' +
    '.' + ROOT_CLASS + ' .hp-explore-tag.selected .hp-explore-tag-check{background:var(--primary);border-color:var(--primary);color:#fff}' +
    '.' + ROOT_CLASS + ' .hp-explore-category{font-size:14px;font-weight:700;padding:16px 16px 8px;color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-explore-category span{font-size:12px;font-weight:400;color:var(--text-hint);margin-left:6px}' +
    '.' + ROOT_CLASS + ' .hp-explore-wrap{display:flex;flex-wrap:wrap;padding:0 12px}' +
    '.' + ROOT_CLASS + ' .hp-refresh-bar{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;font-size:13px;color:var(--text-secondary);cursor:pointer;transition:color .2s}' +
    '.' + ROOT_CLASS + ' .hp-refresh-bar:hover{color:var(--primary-dark)}' +
    '.' + ROOT_CLASS + ' .hp-refresh-bar svg{width:16px;height:16px}' +
    '.' + ROOT_CLASS + ' .hp-pull-indicator{text-align:center;padding:8px 0;font-size:12px;color:var(--text-hint);transition:opacity .3s}' +
    '@keyframes hpSpin{to{transform:rotate(360deg)}}' +
    '@keyframes hpFadeIn{from{opacity:0}to{opacity:1}}' +
    '@keyframes hpSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}' +
    '@media(min-width:768px){' +
      '.' + ROOT_CLASS + ' .hp-card-grid{grid-template-columns:1fr 1fr 1fr;max-width:720px;margin:0 auto}' +
      '.' + ROOT_CLASS + ' .hp-content{max-width:960px;margin-left:auto;margin-right:auto}' +
      '.' + ROOT_CLASS + ' .hp-nav{max-width:960px;left:50%;transform:translateX(-50%);border-radius:var(--radius-lg) var(--radius-lg) 0 0}' +
      '.' + ROOT_CLASS + ' .hp-profile-grid{grid-template-columns:1fr 1fr 1fr 1fr;max-width:720px;margin:0 auto}' +
      '.' + ROOT_CLASS + ' .hp-select-grid{grid-template-columns:1fr 1fr 1fr;max-width:600px;margin:0 auto}' +
      '.' + ROOT_CLASS + ' .hp-explore-wrap{max-width:720px;margin:0 auto}' +
    '}' +
    '@media(min-width:1024px){' +
      '.' + ROOT_CLASS + ' .hp-card-grid{grid-template-columns:1fr 1fr 1fr 1fr;max-width:960px}' +
      '.' + ROOT_CLASS + ' .hp-content{max-width:1200px}' +
      '.' + ROOT_CLASS + ' .hp-nav{max-width:1200px}' +
    '}';
  }

  /* ─── 摘要卡片创建 ─── */
  function createSummaryCard(summary) {
    var card = document.createElement("div");
    card.className = "hp-card";
    var tropeHtml = "";
    if (summary.tropeTags && summary.tropeTags.length > 0) {
      for (var t = 0; t < summary.tropeTags.length; t++) tropeHtml += '<span class="hp-tag">' + escapeHtml(summary.tropeTags[t]) + '</span>';
    }
    card.innerHTML =
      '<div class="hp-card-cover" style="background:' + (summary.coverGradient || randomGradient()) + '"><div class="hp-card-cover-title">' + escapeHtml(summary.title) + '</div></div>' +
      '<div class="hp-card-body"><div class="hp-card-author">' + escapeHtml(summary.author) + '</div>' +
      '<div class="hp-card-excerpt">' + escapeHtml(summary.excerpt) + '</div>' +
      '<div class="hp-card-tags"><span class="hp-tag" onclick="event.stopPropagation();window.__hofter.openTagPageById(\'' + escapeHtml(summary.cpTagId) + '\')">' + escapeHtml(summary.cpTagName) + '</span>' + tropeHtml + '</div>' +
      '<div class="hp-card-stats"><span>' + (summary.likes || randomInt(50,5000)) + '</span><span>' + (summary.comments || randomInt(5,200)) + '</span><span>' + (summary.timeAgo || randomInt(1,48) + "\u5c0f\u65f6\u524d") + '</span></div></div>';
    card.onclick = function() { window.__hofter.openReader(summary.id); };
    return card;
  }

  /* ─── 页面渲染 ─── */
  function renderApp() {
    var el = state.containerEl;
    el.innerHTML = "";
    el.className = ROOT_CLASS;
    if (state.settings.theme === "dark") el.classList.add("hp-dark");
    if (!state.settings.onboardCompleted) { renderOnboarding(); return; }

    var header = document.createElement("div"); header.className = "hp-header"; header.id = "hp-main-header"; renderHeaderContent(header);
    var content = document.createElement("div"); content.className = "hp-content"; content.id = "hp-main-content"; renderPageContent(content);
    var nav = document.createElement("div"); nav.className = "hp-nav"; nav.id = "hp-main-nav"; renderNavContent(nav);
    el.appendChild(header); el.appendChild(content); el.appendChild(nav);
    initPullToRefresh(content);
  }

  function renderHeaderContent(header) {
    var left = '<div class="hp-header-left"></div>', title = "", right = "";
    if (state.currentPage === "home") { title = "hofter"; right = '<div class="hp-icon-btn" onclick="window.__hofter.showMessages()">' + ICONS.bell + '</div><div class="hp-icon-btn" onclick="window.__hofter.closeApp()">' + ICONS.close + '</div>'; }
    else if (state.currentPage === "discover") { title = "\u53d1\u73b0"; }
    else if (state.currentPage === "collection") { title = "\u6536\u85cf"; }
    else if (state.currentPage === "profile") { title = "\u6211\u7684"; right = '<div class="hp-icon-btn" onclick="window.__hofter.showSettings()">' + ICONS.settings + '</div>'; }
    else if (state.currentPage === "tagPage") { title = state.currentTagPage ? state.currentTagPage.name : ""; left = '<div class="hp-header-left"><div class="hp-icon-btn" onclick="window.__hofter.goBackFromTag()">' + ICONS.back + '</div></div>'; }
    header.innerHTML = left + '<div class="hp-header-title">' + escapeHtml(title) + '</div><div class="hp-header-right">' + right + '</div>';
  }

  function renderNavContent(nav) {
    var pages = [{id:"home",name:"\u9996\u9875",icon:ICONS.home},{id:"discover",name:"\u53d1\u73b0",icon:ICONS.discover},{id:"publish",isPublish:true},{id:"collection",name:"\u6536\u85cf",icon:ICONS.bookmark},{id:"profile",name:"\u6211\u7684",icon:ICONS.user}];
    var html = "";
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (p.isPublish) html += '<div class="hp-nav-publish" onclick="window.__hofter.showPublishSheet()">' + ICONS.plus + '</div>';
      else html += '<div class="hp-nav-item ' + (state.currentPage === p.id ? "active" : "") + '" onclick="window.__hofter.switchPage(\'' + p.id + '\')">' + p.icon + '<span>' + p.name + '</span></div>';
    }
    nav.innerHTML = html;
  }

  function renderPageContent(container) {
    container.innerHTML = "";
    if (state.currentPage === "home") renderHomePage(container);
    else if (state.currentPage === "discover") renderDiscoverPage(container);
    else if (state.currentPage === "collection") renderCollectionPage(container);
    else if (state.currentPage === "profile") renderProfilePage(container);
    else if (state.currentPage === "tagPage") renderTagPage(container);
  }

  /* ─── 首页 ─── */
  function renderHomePage(container) {
    var tabs = document.createElement("div"); tabs.className = "hp-tabs";
    tabs.innerHTML = '<div class="hp-tab ' + (state.homeTab==="follow"?"active":"") + '" onclick="window.__hofter.switchHomeTab(\'follow\')">\u5173\u6ce8</div><div class="hp-tab ' + (state.homeTab==="subscribe"?"active":"") + '" onclick="window.__hofter.switchHomeTab(\'subscribe\')">\u8ba2\u9605</div>';
    container.appendChild(tabs);
    if (state.homeTab === "follow") {
      if (state.summaries.length === 0) { container.innerHTML += '<div class="hp-empty">' + ICONS.refresh + '<p>\u4e0b\u62c9\u5237\u65b0\u83b7\u53d6\u540c\u4eba\u6587\u63a8\u8350</p></div>'; return; }
      var grid = document.createElement("div"); grid.className = "hp-card-grid";
      for (var i = 0; i < state.summaries.length; i++) grid.appendChild(createSummaryCard(state.summaries[i]));
      container.appendChild(grid);
    } else {
      var sec = document.createElement("div");
      sec.innerHTML = '<div class="hp-section-title">\u6211\u7684CP</div>';
      var cpList = document.createElement("div"); cpList.className = "hp-tag-list";
      for (var j = 0; j < state.cpTags.length; j++) {
        var tag = state.cpTags[j];
        var tagEl = document.createElement("div"); tagEl.className = "hp-tag-item";
        tagEl.innerHTML = '<span onclick="window.__hofter.openTagPage(\'' + tag.id + '\')">' + escapeHtml(tag.name) + '</span><span class="hp-tag-remove" onclick="event.stopPropagation();window.__hofter.removeCpTag(\'' + tag.id + '\')">' + ICONS.close.replace(/24/g,"14") + '</span>';
        cpList.appendChild(tagEl);
      }
      sec.appendChild(cpList);
      sec.innerHTML += '<div class="hp-section-title">\u6211\u7684\u8bbe\u5b9a\u6807\u7b7e</div>';
      var trList = document.createElement("div"); trList.className = "hp-tag-list";
      for (var k = 0; k < state.tropeTags.length; k++) {
        var tTag = state.tropeTags[k];
        var tEl = document.createElement("div"); tEl.className = "hp-tag-item";
        tEl.innerHTML = '<span onclick="window.__hofter.openTagPage(\'' + tTag.id + '\')">' + escapeHtml(tTag.name) + '</span><span class="hp-tag-remove" onclick="event.stopPropagation();window.__hofter.removeTropeTag(\'' + tTag.id + '\')">' + ICONS.close.replace(/24/g,"14") + '</span>';
        trList.appendChild(tEl);
      }
      sec.appendChild(trList);
      container.appendChild(sec);
    }
  }

  /* ─── 发现页 ─── */
  function renderDiscoverPage(container) {
    var tabs = document.createElement("div"); tabs.className = "hp-tabs";
    tabs.innerHTML = '<div class="hp-tab ' + (state.discoverTab==="recommend"?"active":"") + '" onclick="window.__hofter.switchDiscoverTab(\'recommend\')">\u63a8\u8350</div><div class="hp-tab ' + (state.discoverTab==="hot"?"active":"") + '" onclick="window.__hofter.switchDiscoverTab(\'hot\')">\u70ed\u95e8</div><div class="hp-tab ' + (state.discoverTab==="explore"?"active":"") + '" onclick="window.__hofter.switchDiscoverTab(\'explore\')">\u6807\u7b7e\u63a2\u7d22</div>';
    container.appendChild(tabs);
    if (state.discoverTab === "recommend") {
      container.innerHTML += '<div class="hp-search-box"><div class="hp-search-wrap">' + ICONS.search + '<input class="hp-search-input" placeholder="\u641c\u7d22\u89d2\u8272\u3001\u6807\u7b7e..." oninput="window.__hofter.handleSearch(this.value)"></div></div><div class="hp-search-results" id="hp-search-results"></div>';
      container.innerHTML += '<div class="hp-banner"><h3>\u53d1\u73b0\u65b0\u7684\u540c\u4eba\u6545\u4e8b</h3><p>\u5728\u8fd9\u91cc\u63a2\u7d22\u4f60\u559c\u6b22\u7684\u89d2\u8272\u548c\u4e16\u754c</p></div>';
      container.innerHTML += '<div class="hp-section-title">\u5206\u7c7b\u9891\u9053</div>';
      var chRow = document.createElement("div"); chRow.className = "hp-channel-row";
      var chNames = ["\u6e29\u99a8\u65e5\u5e38","\u8650\u5fc3\u5267\u60c5","\u641e\u7b11\u6c99\u96d5","\u60ac\u7591\u63a8\u7406","\u70ed\u8840\u6218\u6597","\u6d6a\u6f2b\u552f\u7f8e","ABO","\u6821\u56edAU","\u8d5b\u535a\u670b\u514b"];
      for (var i = 0; i < chNames.length; i++) { var ch = document.createElement("div"); ch.className = "hp-channel-item"; ch.textContent = chNames[i]; chRow.appendChild(ch); }
      container.appendChild(chRow);
      if (state.summaries.length > 0) {
        container.innerHTML += '<div class="hp-section-title">\u63a8\u8350\u9605\u8bfb</div>';
        var grid = document.createElement("div"); grid.className = "hp-card-grid";
        for (var j = 0; j < Math.min(state.summaries.length, 6); j++) grid.appendChild(createSummaryCard(state.summaries[j]));
        container.appendChild(grid);
      }
    } else if (state.discoverTab === "hot") {
      container.innerHTML += '<div class="hp-section-title">\u70ed\u95e8\u6807\u7b7e</div>';
      var tagList = document.createElement("div"); tagList.className = "hp-tag-list";
      var allTags = state.cpTags.concat(state.tropeTags);
      for (var k = 0; k < allTags.length; k++) {
        var tEl = document.createElement("div"); tEl.className = "hp-tag-item";
        tEl.innerHTML = ICONS.trending.replace(/24/g,"14") + '<span>' + escapeHtml(allTags[k].name) + '</span>';
        tEl.onclick = (function(tid) { return function() { window.__hofter.openTagPage(tid); }; })(allTags[k].id);
        tagList.appendChild(tEl);
      }
      container.appendChild(tagList);
    } else if (state.discoverTab === "explore") {
      renderExploreTab(container);
    }
  }

  function renderExploreTab(container) {
    container.innerHTML += '<div class="hp-pull-indicator" id="hp-explore-hint">\u70b9\u51fb\u4e0b\u65b9\u6309\u94ae\u63a2\u7d22\u65b0\u6807\u7b7e</div>';
    container.innerHTML += '<div class="hp-refresh-bar" onclick="window.__hofter.loadExploreTags()">' + ICONS.sparkle.replace(/24/g,"16") + ' <span>\u63a2\u7d22\u65b0\u6807\u7b7e</span></div>';
    var exploreArea = document.createElement("div"); exploreArea.id = "hp-explore-area";
    container.appendChild(exploreArea);
    if (state.exploreTagsCache && state.exploreTagsCache.length > 0) {
      renderExploreTagsList(exploreArea, state.exploreTagsCache);
    }
  }

  function renderExploreTagsList(container, tags) {
    var categories = {trope: "\u540c\u4eba\u6897", style: "\u98ce\u683c\u7c7b\u578b", literary: "\u6587\u5b66\u5f15\u7528"};
    var grouped = {};
    for (var i = 0; i < tags.length; i++) {
      var cat = tags[i].category || "trope";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(tags[i]);
    }
    var html = "";
    var catKeys = ["trope", "style", "literary"];
    for (var c = 0; c < catKeys.length; c++) {
      var key = catKeys[c];
      if (!grouped[key] || grouped[key].length === 0) continue;
      html += '<div class="hp-explore-category">' + (categories[key] || key) + '<span>' + grouped[key].length + '\u4e2a</span></div>';
      html += '<div class="hp-explore-wrap">';
      for (var j = 0; j < grouped[key].length; j++) {
        var tag = grouped[key][j];
        var isSelected = false;
        for (var t = 0; t < state.tropeTags.length; t++) { if (state.tropeTags[t].name === tag.name) { isSelected = true; break; } }
        html += '<div class="hp-explore-tag' + (isSelected ? " selected" : "") + '" data-explore-name="' + escapeHtml(tag.name) + '" data-explore-cat="' + key + '" onclick="window.__hofter.toggleExploreTag(this)"><div class="hp-explore-tag-check">' + (isSelected ? ICONS.check.replace(/24/g,"10").replace("currentColor","#fff") : "") + '</div><span>' + escapeHtml(tag.name) + '</span></div>';
      }
      html += '</div>';
    }
    if (tags.length > 0) {
      html += '<div style="padding:16px 20px"><button class="hp-btn hp-btn-primary" style="width:100%" onclick="window.__hofter.addSelectedExploreTags()">\u6dfb\u52a0\u9009\u4e2d\u7684\u6807\u7b7e</button></div>';
    }
    container.innerHTML = html;
  }

  /* ─── 收藏页 ─── */
  function renderCollectionPage(container) {
    var tabs = document.createElement("div"); tabs.className = "hp-tabs";
    tabs.innerHTML = '<div class="hp-tab ' + (state.collectionTab==="favorites"?"active":"") + '" onclick="window.__hofter.switchCollectionTab(\'favorites\')">\u6536\u85cf</div><div class="hp-tab ' + (state.collectionTab==="history"?"active":"") + '" onclick="window.__hofter.switchCollectionTab(\'history\')">\u5386\u53f2</div><div class="hp-tab ' + (state.collectionTab==="later"?"active":"") + '" onclick="window.__hofter.switchCollectionTab(\'later\')">\u7a0d\u540e\u8bfb</div>';
    container.appendChild(tabs);
    var data = state.collectionTab === "favorites" ? state.favorites : state.collectionTab === "history" ? state.readHistory : state.readLater;
    if (data.length === 0) { container.innerHTML += '<div class="hp-empty">' + ICONS.bookmark + '<p>\u6682\u65e0\u5185\u5bb9</p></div>'; return; }
    var grid = document.createElement("div"); grid.className = "hp-card-grid";
    for (var i = 0; i < data.length; i++) { var item = data[i]; if (item && item.title) grid.appendChild(createSummaryCard(item)); }
    container.appendChild(grid);
  }

  /* ─── 我的页 ─── */
  function renderProfilePage(container) {
    var persona = state.activePersona;
    var dName = persona ? (persona.handle || persona.name || "\u672a\u77e5") : "\u672a\u77e5";
    var dAvatar = persona && persona.avatar ? '<img src="' + persona.avatar + '">' : dName[0];
    container.innerHTML = '<div class="hp-profile-header"><div class="hp-profile-avatar" onclick="window.__hofter.showPersonaSwitcher()">' + dAvatar + '</div><div class="hp-profile-name">' + escapeHtml(dName) + '</div><div class="hp-profile-stats"><span><strong>' + state.publishedWorks.length + '</strong>\u53d1\u5e03</span><span><strong>' + state.favorites.length + '</strong>\u6536\u85cf</span><span><strong>' + randomInt(100,9999) + '</strong>\u83b7\u8d5e</span></div></div>';
    var tabs = document.createElement("div"); tabs.className = "hp-tabs";
    tabs.innerHTML = '<div class="hp-tab ' + (state.profileTab==="works"?"active":"") + '" onclick="window.__hofter.switchProfileTab(\'works\')">\u4f5c\u54c1</div><div class="hp-tab ' + (state.profileTab==="fav"?"active":"") + '" onclick="window.__hofter.switchProfileTab(\'fav\')">\u6536\u85cf</div><div class="hp-tab ' + (state.profileTab==="col"?"active":"") + '" onclick="window.__hofter.switchProfileTab(\'col\')">\u5408\u96c6</div>';
    container.appendChild(tabs);
    if (state.profileTab === "works" && state.publishedWorks.length > 0) {
      var grid = document.createElement("div"); grid.className = "hp-profile-grid";
      for (var i = 0; i < state.publishedWorks.length; i++) { var w = state.publishedWorks[i]; var item = document.createElement("div"); item.className = "hp-profile-grid-item"; item.style.background = randomGradient(); item.innerHTML = '<div style="padding:10px;color:#fff;font-size:12px;font-weight:600">' + escapeHtml(w.title) + '</div>'; item.onclick = (function(wid) { return function() { window.__hofter.openReader(wid, true); }; })(w.id); grid.appendChild(item); }
      container.appendChild(grid);
    } else if (state.profileTab !== "works" || state.publishedWorks.length === 0) {
      container.innerHTML += '<div class="hp-empty">' + ICONS.fileText + '<p>\u6682\u65e0\u5185\u5bb9</p></div>';
    }
    var menuItems = [{icon:ICONS.switchIcon,name:"\u5207\u6362\u8eab\u4efd",act:"showPersonaSwitcher"},{icon:ICONS.settings,name:"\u8bbe\u7f6e",act:"showSettings"},{icon:ICONS.tag,name:"\u7ba1\u7406\u6807\u7b7e",act:"showTagManager"},{icon:ICONS.trash,name:"\u6e05\u9664\u7f13\u5b58",act:"clearCache"}];
    for (var m = 0; m < menuItems.length; m++) { var mi = menuItems[m]; container.innerHTML += '<div class="hp-menu-item" onclick="window.__hofter.' + mi.act + '()">' + mi.icon + '<span>' + mi.name + '</span>' + ICONS.chevronRight.replace(/24/g,"16").replace("currentColor","var(--text-hint)") + '</div>'; }
  }

  /* ─── Tag 专属页 ─── */
  function renderTagPage(container) {
    var tag = state.currentTagPage; if (!tag) return;
    container.innerHTML = '<div class="hp-section-title">' + escapeHtml(tag.name) + ' \u7684\u540c\u4eba\u6587</div>';
    state.roche.storage.get("tag_page_cache_" + tag.id).then(function(cached) {
      var items = cached || [];
      if (items.length === 0) { container.innerHTML += '<div class="hp-empty">' + ICONS.refresh + '<p>\u4e0b\u62c9\u5237\u65b0\u83b7\u53d6\u5185\u5bb9</p></div>'; return; }
      var grid = document.createElement("div"); grid.className = "hp-card-grid";
      for (var i = 0; i < items.length; i++) grid.appendChild(createSummaryCard(items[i]));
      container.appendChild(grid);
    });
  }

  /* ─── 开屏引导 ─── */
  function renderOnboarding() {
    var el = state.containerEl; el.innerHTML = ""; el.className = ROOT_CLASS;
    var ob = document.createElement("div"); ob.className = "hp-onboarding";
    var header = document.createElement("div"); header.className = "hp-onboarding-header";
    var body = document.createElement("div"); body.className = "hp-onboarding-body";
    var footer = document.createElement("div"); footer.className = "hp-onboarding-footer";
    var step = state.onboardingStep;

    if (step === 0) {
      header.innerHTML = '<h1>hofter</h1><p>\u6c89\u6d78\u5f0f\u540c\u4eba\u5c0f\u8bf4\u793e\u533a</p>';
      body.innerHTML = '<div style="text-align:center;padding:40px 0"><div style="font-size:48px;margin-bottom:20px">' + ICONS.sparkle.replace(/24/g,"48").replace("currentColor","var(--primary)") + '</div><p style="color:var(--text-secondary);line-height:1.8">\u4ee5\u4f60\u7684\u89c6\u89d2\uff0c\u770b\u4e16\u754c\u600e\u4e48\u55d1\u4f60\u548cTA<br>\u9009\u62e9\u4f60\u7684\u8eab\u4efd\uff0c\u5f00\u59cb\u4f60\u7684\u540c\u4eba\u65c5\u7a0b</p></div>';
      footer.innerHTML = '<button class="hp-btn hp-btn-primary" style="width:100%" onclick="window.__hofter.nextOnboardingStep()">\u5f00\u59cb</button>';
    } else if (step === 1) {
      header.innerHTML = '<h1>\u9009\u62e9\u4f60\u7684\u8eab\u4efd</h1><p>\u5728\u540c\u4eba\u4e16\u754c\u4e2d\uff0c\u4f60\u662f\u8c01\uff1f</p>';
      var pg = document.createElement("div"); pg.className = "hp-select-grid";
      for (var i = 0; i < state.personas.length; i++) { var p = state.personas[i]; var item = document.createElement("div"); item.className = "hp-select-item" + (state.selectedPersonaId===p.id?" selected":""); item.innerHTML = '<div class="hp-avatar">' + (p.avatar ? '<img src="'+p.avatar+'">' : (p.name||p.handle||"?")[0]) + '</div><div><div class="hp-name">' + escapeHtml(p.name||p.handle) + '</div><div class="hp-desc">' + escapeHtml((p.bio||"").substring(0,30)) + '</div></div>'; item.onclick = (function(pid) { return function() { state.selectedPersonaId = pid; renderOnboarding(); }; })(p.id); pg.appendChild(item); }
      body.appendChild(pg);
      footer.innerHTML = '<button class="hp-btn hp-btn-primary" style="width:100%" ' + (!state.selectedPersonaId ? 'disabled' : '') + ' onclick="window.__hofter.nextOnboardingStep()">\u4e0b\u4e00\u6b65</button>';
    } else if (step === 2) {
      header.innerHTML = '<h1>\u9009\u62e9\u4f60\u60f3\u548c\u8c01\u7ec4CP</h1><p>\u53ef\u591a\u9009\uff0c\u4e4b\u540e\u4e5f\u53ef\u4ee5\u6dfb\u52a0</p>';
      var cg = document.createElement("div"); cg.className = "hp-select-grid";
      for (var j = 0; j < state.characters.length; j++) { var c = state.characters[j]; var isSel = state.selectedCharIds.indexOf(c.id) >= 0; var ci = document.createElement("div"); ci.className = "hp-select-item" + (isSel?" selected":""); ci.innerHTML = '<div class="hp-avatar">' + (c.avatar ? '<img src="'+c.avatar+'">' : (c.name||c.handle||"?")[0]) + '</div><div><div class="hp-name">' + escapeHtml(c.name||c.handle) + '</div><div class="hp-desc">' + escapeHtml((c.bio||"").substring(0,30)) + '</div></div>'; ci.onclick = (function(cid) { return function() { var idx = state.selectedCharIds.indexOf(cid); if (idx>=0) state.selectedCharIds.splice(idx,1); else state.selectedCharIds.push(cid); renderOnboarding(); }; })(c.id); cg.appendChild(ci); }
      body.appendChild(cg);
      footer.innerHTML = '<button class="hp-btn hp-btn-primary" style="width:100%" ' + (state.selectedCharIds.length===0?'disabled':'') + ' onclick="window.__hofter.nextOnboardingStep()">\u4e0b\u4e00\u6b65</button>';
    } else if (step === 3) {
      header.innerHTML = '<h1>\u786e\u8ba4CP\u914d\u5bf9</h1><p>\u9009\u62e9\u653b\u53d7\u987a\u5e8f\uff08A\u00d7B\uff0cA=\u653b\uff0cB=\u53d7\uff09</p>';
      var persona = getPersonaById(state.selectedPersonaId); var pName = persona ? (persona.name||persona.handle) : "\u672a\u77e5";
      for (var k = 0; k < state.selectedCharIds.length; k++) { var ch = getCharById(state.selectedCharIds[k]); if (!ch) continue; var cName = ch.name||ch.handle; var choice = state.cpOrderChoices[ch.id]||"charFirst";
        var cpDiv = document.createElement("div"); cpDiv.className = "hp-cp-order";
        cpDiv.innerHTML = '<div class="hp-cp-order-label">\u8eab\u4efd: ' + escapeHtml(pName) + ' \u00d7 \u5bf9\u8c61: ' + escapeHtml(cName) + '</div><div class="hp-cp-order-options"><div class="hp-cp-order-opt ' + (choice==="charFirst"?"selected":"") + '" onclick="window.__hofter.setCpOrder(\'' + ch.id + '\',\'charFirst\')">' + escapeHtml(cName) + ' \u00d7 ' + escapeHtml(pName) + '</div><div class="hp-cp-order-opt ' + (choice==="personaFirst"?"selected":"") + '" onclick="window.__hofter.setCpOrder(\'' + ch.id + '\',\'personaFirst\')">' + escapeHtml(pName) + ' \u00d7 ' + escapeHtml(cName) + '</div></div>';
        body.appendChild(cpDiv); }
      footer.innerHTML = '<button class="hp-btn hp-btn-primary" style="width:100%" onclick="window.__hofter.nextOnboardingStep()">\u4e0b\u4e00\u6b65</button>';
    } else if (step === 4) {
      header.innerHTML = '<h1>\u6dfb\u52a0\u5174\u8da3\u6807\u7b7e</h1><p>\u4e16\u754c\u89c2\u3001\u6897\u3001\u8bbe\u5b9a\uff08\u53ef\u9009\uff09</p>';
      body.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:12px"><input class="hp-input" id="hp-trope-input" placeholder="\u8f93\u5165\u6807\u7b7e\u540d\uff0c\u5982\u8d5b\u535a\u670b\u514b\u3001ABO..." style="flex:1"><button class="hp-btn hp-btn-outline hp-btn-sm" onclick="window.__hofter.addOnboardingTrope()">\u6dfb\u52a0</button></div><div id="hp-onboarding-tropes" class="hp-tag-list"></div>';
      footer.innerHTML = '<button class="hp-btn hp-btn-primary" style="width:100%" onclick="window.__hofter.finishOnboarding()">\u5f00\u59cb\u63a2\u7d22</button>';
      setTimeout(function() { var tc = document.getElementById("hp-onboarding-tropes"); if (tc) { tc.innerHTML = ""; for (var t = 0; t < state.tropeTags.length; t++) tc.innerHTML += '<div class="hp-tag-item">' + escapeHtml(state.tropeTags[t].name) + '<span class="hp-tag-remove" onclick="window.__hofter.removeOnboardingTrope(' + t + ')">' + ICONS.close.replace(/24/g,"14") + '</span></div>'; } }, 50);
    }
    ob.appendChild(header); ob.appendChild(body); ob.appendChild(footer); el.appendChild(ob);
  }

  /* ─── 下拉刷新 ─── */
  function initPullToRefresh(el) {
    var startY = 0, pulling = false;
    function onTS(e) { if (el.scrollTop === 0) { startY = e.touches[0].clientY; pulling = true; } }
    function onTM(e) { if (!pulling) return; }
    function onTE(e) { if (!pulling) return; pulling = false; var diff = (e.changedTouches[0]||{}).clientY - startY; if (diff > 80 && el.scrollTop === 0) doRefresh(); }
    el.addEventListener("touchstart", onTS, {passive:true}); el.addEventListener("touchmove", onTM, {passive:true}); el.addEventListener("touchend", onTE, {passive:true});
    state.eventListeners.push({el:el,type:"touchstart",fn:onTS},{el:el,type:"touchmove",fn:onTM},{el:el,type:"touchend",fn:onTE});
    var mStartY = 0, mPulling = false;
    function onMD(e) { if (el.scrollTop === 0) { mStartY = e.clientY; mPulling = true; } }
    function onMU(e) { if (!mPulling) return; mPulling = false; if (e.clientY - mStartY > 80 && el.scrollTop === 0) doRefresh(); }
    el.addEventListener("mousedown", onMD); el.addEventListener("mouseup", onMU);
    state.eventListeners.push({el:el,type:"mousedown",fn:onMD},{el:el,type:"mouseup",fn:onMU});
  }

  function doRefresh() {
    if (state.isLoading) return; showLoading();
    var lockTag = state.currentTagPage || null;
    generateLayer1Summaries(lockTag, function(summaries) {
      hideLoading();
      if (summaries && summaries.length > 0) {
        for (var i = 0; i < summaries.length; i++) summaries[i].id = summaries[i].id || generateId();
        if (lockTag) state.roche.storage.set("tag_page_cache_" + lockTag.id, summaries);
        else saveSummariesCache(summaries);
        renderApp();
        showToast("\u5237\u65b0\u6210\u529f\uff0c\u83b7\u53d6" + summaries.length + "\u6761\u65b0\u5185\u5bb9");
      } else { showToast("\u5237\u65b0\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5"); }
    });
  }

  /* ─── 发布弹窗 ─── */
  function showPublishSheet() {
    var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "publish-sheet";
    overlay.onclick = function(e) { if (e.target === overlay) closeSheet("publish-sheet"); };
    var sheet = document.createElement("div"); sheet.className = "hp-sheet";
    sheet.innerHTML = '<div class="hp-sheet-handle"></div><div class="hp-sheet-item" onclick="window.__hofter.closeSheet(\'publish-sheet\');window.__hofter.showCreatePage(\'inspire\')">' + ICONS.sparkle + '<span>\u7075\u611f\u521b\u4f5c</span></div><div class="hp-sheet-item" onclick="window.__hofter.closeSheet(\'publish-sheet\');window.__hofter.showCreatePage(\'write\')">' + ICONS.edit + '<span>\u5199\u6587\u7ae0</span></div><div class="hp-sheet-item" style="opacity:.5">' + ICONS.image + '<span>\u53d1\u56fe\u7247\uff08\u5373\u5c06\u4e0a\u7ebf\uff09</span></div><div class="hp-sheet-item" style="opacity:.5">' + ICONS.video + '<span>\u53d1\u89c6\u9891\uff08\u5373\u5c06\u4e0a\u7ebf\uff09</span></div><div class="hp-sheet-item" onclick="window.__hofter.closeSheet(\'publish-sheet\');window.__hofter.showCreatePage(\'dynamic\')">' + ICONS.comment + '<span>\u53d1\u52a8\u6001</span></div>';
    overlay.appendChild(sheet); state.containerEl.appendChild(overlay);
  }

  /* ─── 创作页 ─── */
  function showCreatePage(mode) {
    var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "create-page"; overlay.style.alignItems = "stretch";
    var page = document.createElement("div"); page.style.cssText = "background:var(--bg-primary);width:100%;height:100%;display:flex;flex-direction:column";
    var header = document.createElement("div"); header.className = "hp-header";
    header.innerHTML = '<div class="hp-icon-btn" onclick="window.__hofter.closeSheet(\'create-page\')">' + ICONS.back + '</div><div class="hp-header-title">' + (mode==="inspire"? "\u7075\u611f\u521b\u4f5c" : mode==="write"? "\u5199\u6587\u7ae0" : "\u53d1\u52a8\u6001") + '</div><div class="hp-header-right"><div class="hp-icon-btn" onclick="window.__hofter.submitCreate(\'' + mode + '\')">' + ICONS.check + '</div></div>';
    page.appendChild(header);
    var body = document.createElement("div"); body.style.cssText = "flex:1;overflow-y:auto;padding:16px 20px";
    if (mode === "inspire") {
      body.innerHTML = '<div class="hp-create-form"><label>\u9009\u62e9CP</label><div id="hp-create-cp-list"></div><label>\u9009\u62e9\u8bbe\u5b9a/\u6897\uff08\u53ef\u9009\uff09</label><div id="hp-create-trope-list"></div><label>\u5199\u4e00\u53e5\u7075\u611f\u63d0\u793a\uff08\u53ef\u9009\uff09</label><textarea class="hp-textarea" id="hp-create-prompt" placeholder="\u4f8b\uff1a\u4ed6\u4eec\u5728\u96e8\u591c\u91cd\u9022\u7684\u6545\u4e8b..." rows="3"></textarea></div>';
      setTimeout(function() {
        var cpList = document.getElementById("hp-create-cp-list");
        if (cpList) { cpList.innerHTML = ""; for (var i = 0; i < state.cpTags.length; i++) { var t = state.cpTags[i]; cpList.innerHTML += '<div class="hp-tag-item" style="margin:4px 0;cursor:pointer" onclick="this.classList.toggle(\'selected\')" data-cp-id="' + t.id + '"><span>' + escapeHtml(t.name) + '</span></div>'; } }
        var trList = document.getElementById("hp-create-trope-list");
        if (trList) { trList.innerHTML = ""; for (var j = 0; j < state.tropeTags.length; j++) { var tr = state.tropeTags[j]; trList.innerHTML += '<div class="hp-tag-item" style="margin:4px 0;cursor:pointer" onclick="this.classList.toggle(\'selected\')" data-trope-id="' + tr.id + '"><span>' + escapeHtml(tr.name) + '</span></div>'; } }
      }, 50);
    } else if (mode === "write") {
      body.innerHTML = '<div class="hp-create-form"><label>\u6807\u9898</label><input class="hp-input" id="hp-create-title" placeholder="\u8f93\u5165\u6807\u9898"><label>\u9009\u62e9CP</label><div id="hp-create-cp-list"></div><label>\u6b63\u6587</label><textarea class="hp-textarea" id="hp-create-content" placeholder="\u5f00\u59cb\u5199\u4f5c..." rows="8" style="min-height:200px"></textarea><div style="text-align:right;margin-top:8px"><button class="hp-btn hp-btn-outline hp-btn-sm" onclick="window.__hofter.aiComplete()">' + ICONS.sparkle.replace(/24/g,"14") + ' \u7075\u611f\u8865\u5168</button></div></div>';
      setTimeout(function() {
        var cpList = document.getElementById("hp-create-cp-list");
        if (cpList) { cpList.innerHTML = ""; for (var i = 0; i < state.cpTags.length; i++) { var t = state.cpTags[i]; cpList.innerHTML += '<div class="hp-tag-item" style="margin:4px 0;cursor:pointer" onclick="this.classList.toggle(\'selected\')" data-cp-id="' + t.id + '"><span>' + escapeHtml(t.name) + '</span></div>'; } }
      }, 50);
    } else {
      body.innerHTML = '<div class="hp-create-form"><textarea class="hp-textarea" id="hp-create-dynamic" placeholder="\u5206\u4eab\u4f60\u7684\u60f3\u6cd5..." rows="4"></textarea></div>';
    }
    page.appendChild(body); overlay.appendChild(page); state.containerEl.appendChild(overlay);
  }

  /* ─── 设置页 ─── */
  function showSettings() {
    var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "settings-page"; overlay.style.alignItems = "stretch";
    var page = document.createElement("div"); page.style.cssText = "background:var(--bg-primary);width:100%;height:100%;display:flex;flex-direction:column";
    var header = document.createElement("div"); header.className = "hp-header";
    header.innerHTML = '<div class="hp-icon-btn" onclick="window.__hofter.closeSheet(\'settings-page\')">' + ICONS.back + '</div><div class="hp-header-title">\u8bbe\u7f6e</div><div class="hp-header-right"></div>';
    page.appendChild(header);
    var body = document.createElement("div"); body.style.cssText = "flex:1;overflow-y:auto";
    var s = getSettings();
    body.innerHTML = '<div class="hp-settings-section"><div class="hp-section-title">\u5e38\u89c4</div>' +
      '<div class="hp-settings-row"><span>\u6df1\u8272\u6a21\u5f0f</span><div class="hp-toggle ' + (s.theme==="dark"?"on":"") + '" onclick="window.__hofter.toggleTheme()"></div></div>' +
      '<div class="hp-settings-row"><span>\u5b57\u53f7\uff1a' + s.fontSize + 'px</span><input type="range" class="hp-slider" min="14" max="24" value="' + s.fontSize + '" oninput="window.__hofter.setFontSize(this.value)"></div></div>' +
      '<div class="hp-settings-section"><div class="hp-section-title">CP\u6a21\u5f0f</div>' +
      '<div class="hp-settings-row"><span>\u65e0\u9650\u5236\u6a21\u5f0f\uff08\u5141\u8bb8Char\u00d7Char\uff09</span><div class="hp-toggle ' + (s.cpMode==="unrestricted"?"on":"") + '" onclick="window.__hofter.toggleCpMode()"></div></div></div>' +
      '<div class="hp-settings-section"><div class="hp-section-title">\u8bb0\u5fc6\u6302\u8f7d</div>' +
      '<div class="hp-settings-row"><span>\u4f20\u5165\u6982\u7387\uff1a' + s.memoryAttachProbability + '%</span><input type="range" class="hp-slider" min="0" max="100" value="' + s.memoryAttachProbability + '" oninput="window.__hofter.setMemoryProb(this.value)"></div>' +
      '<div class="hp-menu-item" onclick="window.__hofter.showMemoryMount()">' + ICONS.fileText + '<span>\u7ba1\u7406\u6302\u8f7d\u4f1a\u8bdd</span>' + ICONS.chevronRight.replace(/24/g,"16").replace("currentColor","var(--text-hint)") + '</div></div>' +
      '<div class="hp-settings-section"><div class="hp-section-title">\u5176\u4ed6</div>' +
      '<div class="hp-menu-item" onclick="window.__hofter.clearCache()">' + ICONS.trash + '<span>\u6e05\u9664\u7f13\u5b58</span></div></div>';
    page.appendChild(body); overlay.appendChild(page); state.containerEl.appendChild(overlay);
  }

  /* ─── 人设切换 ─── */
  function showPersonaSwitcher() {
    var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "persona-switcher";
    overlay.onclick = function(e) { if (e.target === overlay) closeSheet("persona-switcher"); };
    var sheet = document.createElement("div"); sheet.className = "hp-sheet";
    var html = '<div class="hp-sheet-handle"></div><div style="font-size:16px;font-weight:700;padding:0 8px 12px">\u5207\u6362\u8eab\u4efd</div>';
    for (var i = 0; i < state.personas.length; i++) {
      var p = state.personas[i]; var isActive = state.activePersona && state.activePersona.id === p.id;
      html += '<div class="hp-list-item" style="' + (isActive?"background:rgba(232,160,191,0.08)":"") + '" onclick="window.__hofter.switchPersona(\'' + p.id + '\')"><div class="hp-list-item-avatar">' + (p.avatar ? '<img src="'+p.avatar+'">' : (p.name||p.handle||"?")[0]) + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(p.name||p.handle) + '</div><div class="hp-list-item-desc">' + escapeHtml((p.bio||"").substring(0,40)) + '</div></div>' + (isActive ? ICONS.check.replace("currentColor","var(--primary)") : "") + '</div>';
    }
    sheet.innerHTML = html; overlay.appendChild(sheet); state.containerEl.appendChild(overlay);
  }

  /* ─── 记忆挂载管理 ─── */
  function showMemoryMount() {
    var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "memory-mount"; overlay.style.alignItems = "stretch";
    var page = document.createElement("div"); page.style.cssText = "background:var(--bg-primary);width:100%;height:100%;display:flex;flex-direction:column";
    var header = document.createElement("div"); header.className = "hp-header";
    header.innerHTML = '<div class="hp-icon-btn" onclick="window.__hofter.closeSheet(\'memory-mount\')">' + ICONS.back + '</div><div class="hp-header-title">\u7ba1\u7406\u8bb0\u5fc6\u6302\u8f7d</div><div class="hp-header-right"></div>';
    page.appendChild(header);
    var body = document.createElement("div"); body.style.cssText = "flex:1;overflow-y:auto;padding:16px 20px";
    body.innerHTML = '<p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px">\u9009\u62e9\u8981\u6302\u8f7d\u7684\u4f1a\u8bdd\uff0c\u88ab\u6302\u8f7d\u7684\u4f1a\u8bdd\u8bb0\u5fc6\u5c06\u6309\u6982\u7387\u968f\u673a\u4f20\u5165AI\u521b\u4f5c\u4e2d</p><div id="hp-conversation-list"></div>';
    page.appendChild(body); overlay.appendChild(page); state.containerEl.appendChild(overlay);
    if (state.roche && state.roche.conversation) {
      state.roche.conversation.list().then(function(convs) {
        state.conversations = convs || [];
        var listEl = document.getElementById("hp-conversation-list");
        if (!listEl) return;
        listEl.innerHTML = "";
        var mounted = state.settings.mountedConversationIds || [];
        for (var i = 0; i < convs.length; i++) {
          var c = convs[i]; var isMounted = mounted.indexOf(c.id) >= 0;
          var item = document.createElement("div"); item.className = "hp-conversation-item" + (isMounted?" selected":"");
          item.innerHTML = '<div class="hp-check">' + (isMounted?ICONS.check.replace(/24/g,"14").replace("currentColor","#fff"):"") + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(c.name||c.title||("\u4f1a\u8bdd"+(i+1))) + '</div><div class="hp-list-item-desc">' + escapeHtml((c.lastMessage||"").substring(0,40)) + '</div></div>';
          item.onclick = (function(cid) { return function() {
            var s = getSettings(); var idx = s.mountedConversationIds.indexOf(cid);
            if (idx >= 0) s.mountedConversationIds.splice(idx,1); else s.mountedConversationIds.push(cid);
            saveSettings(s); showMemoryMount();
          }; })(c.id);
          listEl.appendChild(item);
        }
      }).catch(function() {});
    }
  }

  /* ─── 搜索 ─── */
  function handleSearch(query) {
    var resultsEl = document.getElementById("hp-search-results");
    if (!resultsEl) return;
    if (!query || query.length === 0) { resultsEl.innerHTML = ""; return; }
    var q = query.toLowerCase(); var results = [];
    for (var i = 0; i < state.characters.length; i++) {
      var c = state.characters[i]; var name = (c.name||c.handle||"").toLowerCase();
      if (name.indexOf(q) >= 0) results.push({type:"char", data:c});
    }
    for (var j = 0; j < state.personas.length; j++) {
      var p = state.personas[j]; var pname = (p.name||p.handle||"").toLowerCase();
      if (pname.indexOf(q) >= 0) results.push({type:"persona", data:p});
    }
    for (var k = 0; k < state.cpTags.length; k++) {
      var tag = state.cpTags[k]; if (tag.name.toLowerCase().indexOf(q) >= 0) results.push({type:"cpTag", data:tag});
    }
    for (var m = 0; m < state.tropeTags.length; m++) {
      var ttag = state.tropeTags[m]; if (ttag.name.toLowerCase().indexOf(q) >= 0) results.push({type:"tropeTag", data:ttag});
    }
    if (results.length === 0) {
      resultsEl.innerHTML = '<div style="padding:12px;color:var(--text-hint);font-size:13px">\u672a\u627e\u5230\u5339\u914d\uff0c\u70b9\u51fb\u521b\u5efa\u65b0\u6807\u7b7e</div><div class="hp-menu-item" onclick="window.__hofter.createTropeFromSearch(\'' + escapeHtml(query) + '\')">' + ICONS.addCircle + '<span>\u521b\u5efa\u6807\u7b7e: ' + escapeHtml(query) + '</span></div>';
      return;
    }
    var html = "";
    for (var r = 0; r < results.length; r++) {
      var res = results[r];
      if (res.type === "char") {
        html += '<div class="hp-list-item" onclick="window.__hofter.createCpWithChar(\'' + res.data.id + '\')"><div class="hp-list-item-avatar">' + (res.data.avatar ? '<img src="'+res.data.avatar+'">' : (res.data.name||"?")[0]) + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(res.data.name||res.data.handle) + '</div><div class="hp-list-item-desc">\u89d2\u8272 \u00b7 \u70b9\u51fb\u7ec4CP</div></div></div>';
      } else if (res.type === "persona") {
        html += '<div class="hp-list-item"><div class="hp-list-item-avatar">' + (res.data.avatar ? '<img src="'+res.data.avatar+'">' : (res.data.name||"?")[0]) + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(res.data.name||res.data.handle) + '</div><div class="hp-list-item-desc">\u4eba\u8bbe</div></div></div>';
      } else if (res.type === "cpTag") {
        html += '<div class="hp-list-item" onclick="window.__hofter.openTagPageById(\'' + res.data.id + '\')"><div class="hp-list-item-avatar" style="background:var(--primary-gradient)">' + ICONS.heart.replace(/24/g,"18").replace("currentColor","#fff") + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(res.data.name) + '</div><div class="hp-list-item-desc">CP\u6807\u7b7e</div></div></div>';
      } else {
        html += '<div class="hp-list-item" onclick="window.__hofter.openTagPageById(\'' + res.data.id + '\')"><div class="hp-list-item-avatar" style="background:linear-gradient(135deg,#43e97b,#38f9d7)">' + ICONS.tag.replace(/24/g,"18").replace("currentColor","#fff") + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(res.data.name) + '</div><div class="hp-list-item-desc">\u8bbe\u5b9a\u6807\u7b7e</div></div></div>';
      }
    }
    resultsEl.innerHTML = html;
  }

  function createCpWithChar(charId) {
    var ch = getCharById(charId); if (!ch || !state.activePersona) { showToast("\u8bf7\u5148\u9009\u62e9\u8eab\u4efd"); return; }
    var pName = state.activePersona.name || state.activePersona.handle || "\u672a\u77e5";
    var cName = ch.name || ch.handle || "\u672a\u77e5";
    var tagName = cName + " \u00d7 " + pName;
    var existing = null;
    for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].name === tagName) { existing = state.cpTags[i]; break; } }
    if (existing) { openTagPage(existing.id); return; }
    var newTag = { id: generateId(), name: tagName, attackSide: { id: ch.id, name: cName, persona: ch.persona || ch.bio || "", avatar: ch.avatar || "" }, defenseSide: { id: state.activePersona.id, name: pName, persona: state.activePersona.persona || state.activePersona.bio || "", avatar: state.activePersona.avatar || "" }, fandomTags: [], createdBy: "user" };
    state.cpTags.push(newTag); saveCpTags(state.cpTags);
    showToast("CP\u6807\u7b7e\u5df2\u521b\u5efa: " + tagName);
    renderApp();
  }

  function createTropeFromSearch(name) {
    var existing = null;
    for (var i = 0; i < state.tropeTags.length; i++) { if (state.tropeTags[i].name === name) { existing = state.tropeTags[i]; break; } }
    if (existing) { openTagPage(existing.id); return; }
    var newTag = { id: generateId(), name: name, description: "", createdBy: "user" };
    state.tropeTags.push(newTag); saveTropeTags(state.tropeTags);
    showToast("\u6807\u7b7e\u5df2\u521b\u5efa: " + name);
  }

  /* ─── 消息中心 ─── */
  function showMessages() {
    var overlay = document.createElement("div"); overlay.className = "hp-message-overlay"; overlay.id = "messages-page";
    var header = document.createElement("div"); header.className = "hp-header";
    header.innerHTML = '<div class="hp-icon-btn" onclick="window.__hofter.closeMessages()">' + ICONS.back + '</div><div class="hp-header-title">\u6d88\u606f</div><div class="hp-header-right"></div>';
    overlay.appendChild(header);
    var tabs = document.createElement("div"); tabs.className = "hp-msg-tabs";
    tabs.innerHTML = '<div class="hp-msg-tab ' + (state.messageTab==="activity"?"active":"") + '" onclick="window.__hofter.switchMessageTab(\'activity\')">\u52a8\u6001</div><div class="hp-msg-tab ' + (state.messageTab==="comment"?"active":"") + '" onclick="window.__hofter.switchMessageTab(\'comment\')">\u8bc4\u8bba</div><div class="hp-msg-tab ' + (state.messageTab==="like"?"active":"") + '" onclick="window.__hofter.switchMessageTab(\'like\')">\u8d5e</div>';
    overlay.appendChild(tabs);
    var body = document.createElement("div"); body.style.cssText = "flex:1;overflow-y:auto"; body.id = "hp-message-body";
    renderMessageTabContent(body);
    overlay.appendChild(body); state.containerEl.appendChild(overlay);
  }

  function closeMessages() { var el = document.getElementById("messages-page"); if (el) el.remove(); }

  function renderMessageTabContent(container) {
    var items = [];
    if (state.messageTab === "activity") {
      for (var i = 0; i < Math.min(state.summaries.length, 5); i++) {
        var s = state.summaries[i]; items.push({name: s.author || randomAuthorName(), text: "\u53d1\u5e03\u4e86\u300a" + s.title + "\u300b", time: s.timeAgo || randomInt(1,24)+"\u5c0f\u65f6\u524d"});
      }
    } else if (state.messageTab === "comment") {
      var works = state.publishedWorks;
      for (var j = 0; j < Math.min(works.length, 8); j++) {
        items.push({name: randomAuthorName(), text: "\u8bc4\u8bba\u4e86\u4f60\u7684\u300a" + (works[j].title||"\u4f5c\u54c1") + "\u300b\uff1a\u597d\u559c\u6b22\u8fd9\u7bc7\uff01", time: randomInt(1,48)+"\u5c0f\u65f6\u524d"});
      }
    } else {
      for (var k = 0; k < 6; k++) {
        items.push({name: randomAuthorName(), text: "\u8d5e\u4e86\u4f60\u7684\u4f5c\u54c1", time: randomInt(1,72)+"\u5c0f\u65f6\u524d"});
      }
    }
    if (items.length === 0) { container.innerHTML = '<div class="hp-empty">' + ICONS.bell + '<p>\u6682\u65e0\u6d88\u606f</p></div>'; return; }
    var html = "";
    for (var m = 0; m < items.length; m++) {
      var it = items[m];
      html += '<div class="hp-list-item"><div class="hp-list-item-avatar">' + it.name[0] + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(it.name) + '</div><div class="hp-list-item-desc">' + escapeHtml(it.text) + '</div></div><div style="font-size:11px;color:var(--text-hint);white-space:nowrap">' + it.time + '</div></div>';
    }
    container.innerHTML = html;
  }

  /* ─── 沉浸式阅读页 ─── */
  function openReader(summaryId, isUserWork) {
    var summary = null;
    if (isUserWork) {
      for (var i = 0; i < state.publishedWorks.length; i++) { if (state.publishedWorks[i].id === summaryId) { summary = state.publishedWorks[i]; break; } }
    } else {
      for (var j = 0; j < state.summaries.length; j++) { if (state.summaries[j].id === summaryId) { summary = state.summaries[j]; break; } }
    }
    if (!summary) { showToast("\u672a\u627e\u5230\u4f5c\u54c1"); return; }
    var readerEl = document.createElement("div"); readerEl.className = "hp-reader-page"; readerEl.id = "hp-reader";
    readerEl.innerHTML = '<div class="hp-reader-header"><div class="hp-icon-btn" onclick="window.__hofter.closeReader()">' + ICONS.back + '</div><div style="flex:1;text-align:center;font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + escapeHtml(summary.title) + '</div><div class="hp-icon-btn" onclick="window.__hofter.showReaderSettings()">' + ICONS.textSize + '</div></div><div id="hp-reader-content" style="padding-bottom:60px"><div style="text-align:center;padding:40px 20px;color:var(--text-hint)"><div class="hp-spinner" style="margin:0 auto"></div><p style="margin-top:12px">\u6b63\u5728\u52a0\u8f7d\u5185\u5bb9...</p></div></div>';
    state.containerEl.appendChild(readerEl);
    if (summary.fullContent) {
      renderReaderContent(summary);
    } else {
      showLoading();
      generateLayer2Full(summary, function(result) {
        hideLoading();
        if (result) {
          summary.fullContent = result;
          summary.isByUser = isUserWork;
          if (isUserWork) {
            generateLayer3Comments(JSON.stringify(result.chapters || []), function(comments) {
              if (comments && comments.length > 0) { if (!summary.fullContent.comments) summary.fullContent.comments = []; summary.fullContent.comments = summary.fullContent.comments.concat(comments); }
              renderReaderContent(summary);
            });
          } else {
            renderReaderContent(summary);
          }
        } else {
          showToast("\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5");
          closeReader();
        }
      });
    }
    if (state.readHistory.indexOf(summary) < 0) { state.readHistory.unshift(summary); if (state.readHistory.length > 50) state.readHistory = state.readHistory.slice(0, 50); saveFavoritesData({favorites:state.favorites,readHistory:state.readHistory,readLater:state.readLater}); }
  }

  function renderReaderContent(summary) {
    var contentEl = document.getElementById("hp-reader-content");
    if (!contentEl || !summary || !summary.fullContent) return;
    var fc = summary.fullContent;
    var cpTag = null;
    for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === summary.cpTagId) { cpTag = state.cpTags[i]; break; } }
    var html = '<div class="hp-reader-cover" style="background:' + (summary.coverGradient || randomGradient()) + '"><h1 style="font-size:22px;font-weight:800;line-height:1.4">' + escapeHtml(summary.title) + '</h1><div class="hp-reader-author"><div class="hp-reader-author-avatar">' + (summary.author||"?")[0] + '</div><div><div style="font-size:14px;font-weight:600">' + escapeHtml(summary.author||"\u533f\u540d") + '</div><div style="font-size:12px;opacity:.8">' + escapeHtml(summary.cpTagName||"") + (summary.tropeTags && summary.tropeTags.length > 0 ? " | " + summary.tropeTags.join(", ") : "") + '</div></div></div></div>';
    html += '<div class="hp-reader-body">';
    var chapters = fc.chapters || [];
    var paraIdx = 0;
    for (var c = 0; c < chapters.length; c++) {
      var ch = chapters[c];
      if (ch.title) html += '<div class="hp-reader-chapter-title">' + escapeHtml(ch.title) + '</div>';
      var contents = ch.content || [];
      for (var p = 0; p < contents.length; p++) {
        var para = contents[p];
        var hasAnnotation = false;
        var annotations = fc.annotations || [];
        var annotationForPara = null;
        for (var a = 0; a < annotations.length; a++) { if (annotations[a].paragraphIndex === paraIdx) { hasAnnotation = true; annotationForPara = annotations[a]; break; } }
        var pStyle = "font-size:" + state.fontSize + "px";
        if (para.type === "dialogue") {
          html += '<div class="hp-reader-text" style="' + pStyle + ';padding-left:16px;border-left:3px solid var(--primary-light)">';
        } else {
          html += '<div class="hp-reader-text" style="' + pStyle + '">';
        }
        html += escapeHtml(para.text || "");
        if (hasAnnotation) {
          html += ' <span style="display:inline-flex;align-items:center;cursor:pointer;color:var(--primary);margin-left:4px" onclick="window.__hofter.showAnnotationPanel(' + paraIdx + ')">' + ICONS.comment.replace(/24/g,"14") + '<span style="font-size:10px;margin-left:2px">' + (annotationForPara.notes ? annotationForPara.notes.length : 0) + '</span></span>';
        }
        html += '</div>';
        paraIdx++;
      }
    }
    html += '</div>';
    html += renderComments(fc.comments || [], summary.isByUser);
    html += '<div class="hp-reader-action-bar"><div class="hp-action-btn" onclick="window.__hofter.toggleLike(this)">' + ICONS.heart + '<span>\u8d5e</span></div><div class="hp-action-btn" onclick="window.__hofter.showCommentInput()">' + ICONS.comment + '<span>\u8bc4\u8bba</span></div><div class="hp-action-btn" onclick="window.__hofter.toggleCollect()">' + ICONS.bookmark + '<span>\u6536\u85cf</span></div><div class="hp-action-btn" onclick="window.__hofter.toggleReaderBookmark()">' + ICONS.star + '<span>\u7a0d\u540e\u8bfb</span></div><div class="hp-action-btn">' + ICONS.share + '<span>\u5206\u4eab</span></div></div>';
    contentEl.innerHTML = html;
  }

  function renderComments(comments, isUserWork) {
    var html = '<div class="hp-comment-list"><div style="font-size:16px;font-weight:700;margin-bottom:12px">\u8bc4\u8bba (' + comments.length + ')</div>';
    for (var i = 0; i < comments.length; i++) {
      var c = comments[i];
      html += '<div class="hp-comment-item"><div class="hp-comment-avatar">' + (c.name||"?")[0] + '</div><div class="hp-comment-body"><div class="hp-comment-name">' + escapeHtml(c.name||"\u533f\u540d") + '</div><div class="hp-comment-text">' + escapeHtml(c.text||"") + '</div><div class="hp-comment-time">' + escapeHtml(c.time||"") + '<span class="hp-comment-report" onclick="window.__hofter.reportComment(this)">\u4e3e\u62a5</span></div></div></div>';
    }
    html += '<div style="padding:12px 0"><div style="display:flex;gap:8px"><input class="hp-input" id="hp-comment-input" placeholder="\u5199\u8bc4\u8bba..." style="flex:1"><button class="hp-btn hp-btn-primary hp-btn-sm" onclick="window.__hofter.submitComment()">\u53d1\u9001</button></div></div></div>';
    return html;
  }

  function showAnnotationPanel(paraIdx) {
    var readerContent = document.getElementById("hp-reader-content");
    if (!readerContent) return;
    var currentSummary = null;
    for (var i = 0; i < state.summaries.length; i++) { if (document.getElementById("hp-reader")) { currentSummary = state.summaries[i]; break; } }
    if (!currentSummary || !currentSummary.fullContent) return;
    var annotations = currentSummary.fullContent.annotations || [];
    var annotation = null;
    for (var j = 0; j < annotations.length; j++) { if (annotations[j].paragraphIndex === paraIdx) { annotation = annotations[j]; break; } }
    if (!annotation) return;
    var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "annotation-panel";
    overlay.onclick = function(e) { if (e.target === overlay) closeSheet("annotation-panel"); };
    var popup = document.createElement("div"); popup.className = "hp-annotation-popup";
    var html = '<div class="hp-annotation-quotes">\u300c' + escapeHtml(annotation.quotes || "") + '\u300d</div>';
    var notes = annotation.notes || [];
    for (var k = 0; k < notes.length; k++) {
      html += '<div class="hp-annotation-note"><span class="hp-annotation-note-name">' + escapeHtml(notes[k].name||"") + '</span><span class="hp-annotation-note-text">' + escapeHtml(notes[k].text||"") + '</span></div>';
    }
    popup.innerHTML = html; overlay.appendChild(popup); state.containerEl.appendChild(overlay);
  }

  function closeReader() { var el = document.getElementById("hp-reader"); if (el) el.remove(); }

  function showReaderSettings() {
    var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "reader-settings";
    overlay.onclick = function(e) { if (e.target === overlay) closeSheet("reader-settings"); };
    var sheet = document.createElement("div"); sheet.className = "hp-sheet";
    sheet.innerHTML = '<div class="hp-sheet-handle"></div><div style="font-size:16px;font-weight:700;padding:0 8px 12px">\u9605\u8bfb\u8bbe\u7f6e</div><div class="hp-settings-section"><div class="hp-settings-row"><span>\u5b57\u53f7\uff1a' + state.fontSize + 'px</span><input type="range" class="hp-slider" min="14" max="24" value="' + state.fontSize + '" oninput="window.__hofter.setFontSize(this.value);window.__hofter.refreshReader()"></div><div class="hp-settings-row"><span>\u6df1\u8272\u6a21\u5f0f</span><div class="hp-toggle ' + (state.settings.theme==="dark"?"on":"") + '" onclick="window.__hofter.toggleTheme()"></div></div></div>';
    overlay.appendChild(sheet); state.containerEl.appendChild(overlay);
  }

  function refreshReader() {
    var currentSummary = null;
    for (var i = 0; i < state.summaries.length; i++) {
      if (state.summaries[i].fullContent && document.getElementById("hp-reader")) { currentSummary = state.summaries[i]; break; }
    }
    if (currentSummary) renderReaderContent(currentSummary);
  }

  /* ─── 标签管理 ─── */
  function showTagManager() {
    var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "tag-manager"; overlay.style.alignItems = "stretch";
    var page = document.createElement("div"); page.style.cssText = "background:var(--bg-primary);width:100%;height:100%;display:flex;flex-direction:column";
    var header = document.createElement("div"); header.className = "hp-header";
    header.innerHTML = '<div class="hp-icon-btn" onclick="window.__hofter.closeSheet(\'tag-manager\')">' + ICONS.back + '</div><div class="hp-header-title">\u7ba1\u7406\u6807\u7b7e</div><div class="hp-header-right"></div>';
    page.appendChild(header);
    var body = document.createElement("div"); body.style.cssText = "flex:1;overflow-y:auto";
    var html = '<div class="hp-section-title">CP\u6807\u7b7e</div><div class="hp-tag-list">';
    for (var i = 0; i < state.cpTags.length; i++) {
      var t = state.cpTags[i];
      html += '<div class="hp-tag-item"><span>' + escapeHtml(t.name) + '</span><span class="hp-tag-remove" onclick="window.__hofter.removeCpTag(\'' + t.id + '\')">' + ICONS.close.replace(/24/g,"14") + '</span></div>';
    }
    html += '</div><div class="hp-section-title">\u8bbe\u5b9a\u6807\u7b7e</div><div class="hp-tag-list">';
    for (var j = 0; j < state.tropeTags.length; j++) {
      var tr = state.tropeTags[j];
      html += '<div class="hp-tag-item"><span>' + escapeHtml(tr.name) + '</span><span class="hp-tag-remove" onclick="window.__hofter.removeTropeTag(\'' + tr.id + '\')">' + ICONS.close.replace(/24/g,"14") + '</span></div>';
    }
    html += '</div><div style="padding:16px 20px"><div style="display:flex;gap:8px"><input class="hp-input" id="hp-new-trope" placeholder="\u65b0\u5efa\u8bbe\u5b9a\u6807\u7b7e..." style="flex:1"><button class="hp-btn hp-btn-primary hp-btn-sm" onclick="window.__hofter.addNewTrope()">\u6dfb\u52a0</button></div></div>';
    body.innerHTML = html; page.appendChild(body); overlay.appendChild(page); state.containerEl.appendChild(overlay);
  }

  /* ─── 全局方法注册 ─── */
  window.__hofter = {
    switchPage: function(page) { state.currentPage = page; renderApp(); },
    switchHomeTab: function(tab) { state.homeTab = tab; renderApp(); },
    switchDiscoverTab: function(tab) { state.discoverTab = tab; renderApp(); },
    switchCollectionTab: function(tab) { state.collectionTab = tab; renderApp(); },
    switchProfileTab: function(tab) { state.profileTab = tab; renderApp(); },
    switchMessageTab: function(tab) { state.messageTab = tab; var body = document.getElementById("hp-message-body"); if (body) { var tabs = document.querySelectorAll(".hp-msg-tab"); for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("active"); if (tabs[tab==="activity"?0:tab==="comment"?1:2]) tabs[tab==="activity"?0:tab==="comment"?1:2].classList.add("active"); renderMessageTabContent(body); } },
    nextOnboardingStep: function() {
      if (state.onboardingStep === 1 && !state.selectedPersonaId) return;
      if (state.onboardingStep === 2 && state.selectedCharIds.length === 0) return;
      state.onboardingStep++;
      if (state.onboardingStep <= 4) renderOnboarding();
    },
    setCpOrder: function(charId, order) { state.cpOrderChoices[charId] = order; renderOnboarding(); },
    addOnboardingTrope: function() {
      var input = document.getElementById("hp-trope-input"); if (!input || !input.value.trim()) return;
      var name = input.value.trim();
      for (var i = 0; i < state.tropeTags.length; i++) { if (state.tropeTags[i].name === name) return; }
      state.tropeTags.push({id:generateId(), name:name, description:"", createdBy:"user"});
      saveTropeTags(state.tropeTags); input.value = ""; renderOnboarding();
    },
    removeOnboardingTrope: function(idx) { state.tropeTags.splice(idx, 1); saveTropeTags(state.tropeTags); renderOnboarding(); },
    finishOnboarding: function() {
      var persona = getPersonaById(state.selectedPersonaId);
      if (!persona) { showToast("\u8bf7\u9009\u62e9\u8eab\u4efd"); return; }
      state.activePersona = persona;
      state.settings.activePersonaId = persona.id;
      state.settings.onboardCompleted = true;
      for (var i = 0; i < state.selectedCharIds.length; i++) {
        var ch = getCharById(state.selectedCharIds[i]); if (!ch) continue;
        var pName = persona.name || persona.handle || "\u672a\u77e5";
        var cName = ch.name || ch.handle || "\u672a\u77e5";
        var order = state.cpOrderChoices[ch.id] || "charFirst";
        var attackSide, defenseSide;
        if (order === "charFirst") { attackSide = {id:ch.id, name:cName, persona:ch.persona||ch.bio||"", avatar:ch.avatar||""}; defenseSide = {id:persona.id, name:pName, persona:persona.persona||persona.bio||"", avatar:persona.avatar||""}; }
        else { attackSide = {id:persona.id, name:pName, persona:persona.persona||persona.bio||"", avatar:persona.avatar||""}; defenseSide = {id:ch.id, name:cName, persona:ch.persona||ch.bio||"", avatar:ch.avatar||""}; }
        var tagName = attackSide.name + " \u00d7 " + defenseSide.name;
        var exists = false;
        for (var j = 0; j < state.cpTags.length; j++) { if (state.cpTags[j].name === tagName) { exists = true; break; } }
        if (!exists) state.cpTags.push({id:generateId(), name:tagName, attackSide:attackSide, defenseSide:defenseSide, fandomTags:[], createdBy:"user"});
      }
      saveCpTags(state.cpTags); saveSettings(state.settings);
      renderApp(); showToast("\u6b22\u8fce\u6765\u5230 hofter\uff01\u4e0b\u62c9\u5237\u65b0\u83b7\u53d6\u540c\u4eba\u6587");
    },
    removeCpTag: function(id) {
      for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === id) { state.cpTags.splice(i, 1); break; } }
      saveCpTags(state.cpTags); renderApp();
    },
    removeTropeTag: function(id) {
      for (var i = 0; i < state.tropeTags.length; i++) { if (state.tropeTags[i].id === id) { state.tropeTags.splice(i, 1); break; } }
      saveTropeTags(state.tropeTags); renderApp();
    },
    openTagPage: function(tagId) {
      for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === tagId) { state.currentTagPage = state.cpTags[i]; break; } }
      if (!state.currentTagPage) { for (var j = 0; j < state.tropeTags.length; j++) { if (state.tropeTags[j].id === tagId) { state.currentTagPage = state.tropeTags[j]; break; } } }
      if (state.currentTagPage) { state.currentPage = "tagPage"; renderApp(); }
    },
    openTagPageById: function(tagId) { window.__hofter.openTagPage(tagId); },
    goBackFromTag: function() { state.currentTagPage = null; state.currentPage = "home"; renderApp(); },
    toggleCpMode: function() { state.settings.cpMode = state.settings.cpMode === "unrestricted" ? "default" : "unrestricted"; saveSettings(state.settings); showSettings(); },
    setMemoryProb: function(val) { state.settings.memoryAttachProbability = parseInt(val, 10); saveSettings(state.settings); },
    toggleTheme: function() { state.settings.theme = state.settings.theme === "dark" ? "light" : "dark"; saveSettings(state.settings); renderApp(); },
    setFontSize: function(val) { state.fontSize = parseInt(val, 10); state.settings.fontSize = state.fontSize; saveSettings(state.settings); },
    clearCache: function() {
      state.summaries = []; state.publishedWorks = []; state.favorites = []; state.readHistory = []; state.readLater = [];
      saveSummariesCache([]); savePublishedWorks([]); saveFavoritesData({favorites:[],readHistory:[],readLater:[]});
      if (state.roche && state.roche.storage) { state.roche.storage.delete("summaries_cache"); state.roche.storage.delete("published_works"); }
      showToast("\u7f13\u5b58\u5df2\u6e05\u9664"); renderApp();
    },
    showPublishSheet: showPublishSheet,
    showCreatePage: showCreatePage,
    showSettings: showSettings,
    showPersonaSwitcher: showPersonaSwitcher,
    showMemoryMount: showMemoryMount,
    showMessages: showMessages,
    closeMessages: closeMessages,
    showTagManager: showTagManager,
    handleSearch: handleSearch,
    createCpWithChar: createCpWithChar,
    createTropeFromSearch: createTropeFromSearch,
    openReader: openReader,
    closeReader: closeReader,
    showReaderSettings: showReaderSettings,
    refreshReader: refreshReader,
    showAnnotationPanel: showAnnotationPanel,
    closeSheet: closeSheet,
    submitCreate: function(mode) {
      if (mode === "dynamic") {
        var dynInput = document.getElementById("hp-create-dynamic");
        if (!dynInput || !dynInput.value.trim()) { showToast("\u8bf7\u8f93\u5165\u5185\u5bb9"); return; }
        var work = {id:generateId(), title: "\u52a8\u6001", author: state.activePersona ? (state.activePersona.handle||state.activePersona.name) : "\u6211", cpTagId:"", cpTagName:"", excerpt: dynInput.value.trim(), isByUser: true, timeAgo: "\u521a\u521a"};
        state.publishedWorks.push(work); savePublishedWorks(state.publishedWorks);
        closeSheet("create-page"); showToast("\u53d1\u5e03\u6210\u529f"); renderApp(); return;
      }
      if (mode === "inspire") {
        var promptInput = document.getElementById("hp-create-prompt");
        var promptText = promptInput ? promptInput.value.trim() : "";
        var selectedCps = [];
        var cpItems = document.querySelectorAll("#hp-create-cp-list .tag-item.selected, #hp-create-cp-list .hp-tag-item.selected");
        for (var i = 0; i < cpItems.length; i++) { var cpId = cpItems[i].getAttribute("data-cp-id"); if (cpId) selectedCps.push(cpId); }
        if (selectedCps.length === 0) { showToast("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2aCP"); return; }
        showLoading();
        var lockTag = null;
        for (var j = 0; j < state.cpTags.length; j++) { if (state.cpTags[j].id === selectedCps[0]) { lockTag = state.cpTags[j]; break; } }
        generateLayer2Full({title:promptText||"\u7075\u611f\u521b\u4f5c", cpTagId:selectedCps[0], cpTagName:lockTag?lockTag.name:"", excerpt:promptText, tropeTags:[], fandomTag:""}, function(result) {
          hideLoading();
          if (result) {
            var work = {id:generateId(), title:promptText||"\u7075\u611f\u521b\u4f5c", author:state.activePersona?(state.activePersona.handle||state.activePersona.name):"\u6211", cpTagId:selectedCps[0], cpTagName:lockTag?lockTag.name:"", excerpt:promptText, fullContent:result, isByUser:true, coverGradient:randomGradient(), timeAgo:"\u521a\u521a"};
            state.publishedWorks.push(work); savePublishedWorks(state.publishedWorks);
            closeSheet("create-page"); showToast("\u521b\u4f5c\u5b8c\u6210\uff01"); renderApp();
          } else { showToast("\u521b\u4f5c\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5"); }
        });
        return;
      }
      if (mode === "write") {
        var titleInput = document.getElementById("hp-create-title");
        var contentInput = document.getElementById("hp-create-content");
        if (!contentInput || !contentInput.value.trim()) { showToast("\u8bf7\u8f93\u5165\u6b63\u6587"); return; }
        var writeTitle = titleInput ? titleInput.value.trim() : "\u672a\u547d\u540d\u4f5c\u54c1";
        var writeContent = contentInput.value.trim();
        var writeCpId = "";
        var writeCpItems = document.querySelectorAll("#hp-create-cp-list .hp-tag-item.selected");
        if (writeCpItems.length > 0) writeCpId = writeCpItems[0].getAttribute("data-cp-id") || "";
        var writeCpName = "";
        for (var k = 0; k < state.cpTags.length; k++) { if (state.cpTags[k].id === writeCpId) { writeCpName = state.cpTags[k].name; break; } }
        var work = {id:generateId(), title:writeTitle, author:state.activePersona?(state.activePersona.handle||state.activePersona.name):"\u6211", cpTagId:writeCpId, cpTagName:writeCpName, excerpt:writeContent.substring(0,150), fullContent:{chapters:[{title:"",content:[{type:"p",text:writeContent}]}],comments:[],annotations:[]}, isByUser:true, coverGradient:randomGradient(), timeAgo:"\u521a\u521a"};
        state.publishedWorks.push(work); savePublishedWorks(state.publishedWorks);
        closeSheet("create-page"); showToast("\u53d1\u5e03\u6210\u529f"); renderApp();
      }
    },
    aiComplete: function() {
      var contentInput = document.getElementById("hp-create-content");
      if (!contentInput || !contentInput.value.trim()) { showToast("\u8bf7\u5148\u5199\u4e00\u4e9b\u5185\u5bb9"); return; }
      showLoading();
      state.roche.ai.chat({ messages: [
        {role:"system", content:"\u4f60\u662f\u4e00\u4f4d\u540c\u4eba\u5c0f\u8bf4\u4f5c\u5bb6\u3002\u8bf7\u7eed\u5199\u4ee5\u4e0b\u5185\u5bb9\uff0c\u4fdd\u6301\u98ce\u683c\u4e00\u81f4\uff0c800-1500\u5b57\u3002\u53ea\u8f93\u51fa\u7eed\u5199\u5185\u5bb9\uff0c\u4e0d\u8981\u89e3\u91ca\u3002"},
        {role:"user", content: "\u8bf7\u7eed\u5199\uff1a\n" + contentInput.value}
      ], temperature: 0.8 }).then(function(result) {
        hideLoading();
        if (result && result.text) { contentInput.value += "\n\n" + result.text; showToast("\u7075\u611f\u8865\u5168\u5b8c\u6210"); }
        else { showToast("\u8865\u5168\u5931\u8d25"); }
      }).catch(function() { hideLoading(); showToast("\u8865\u5168\u5931\u8d25"); });
    },
    toggleLike: function(el) {
      if (!el) return;
      var isLiked = el.classList.contains("liked");
      if (isLiked) { el.classList.remove("liked"); el.style.color = ""; }
      else { el.classList.add("liked"); el.style.color = "var(--like-red)"; }
    },
    toggleCollect: function() {
      var isInFav = false;
      if (isInFav) showToast("\u5df2\u53d6\u6d88\u6536\u85cf"); else showToast("\u5df2\u6536\u85cf");
    },
    toggleReaderBookmark: function() { showToast("\u5df2\u52a0\u5165\u7a0d\u540e\u8bfb"); },
    showCommentInput: function() { var input = document.getElementById("hp-comment-input"); if (input) input.focus(); },
    submitComment: function() { var input = document.getElementById("hp-comment-input"); if (input && input.value.trim()) { showToast("\u8bc4\u8bba\u53d1\u5e03\u6210\u529f"); input.value = ""; } },
    reportComment: function(el) { if (el) el.textContent = "\u5df2\u4e3e\u62a5"; el.style.color = "var(--text-hint)"; showToast("\u5df2\u4e3e\u62a5\uff0c\u611f\u8c22\u53cd\u9988"); },
    switchPersona: function(personaId) {
      var p = getPersonaById(personaId);
      if (p) { state.activePersona = p; state.settings.activePersonaId = p.id; saveSettings(state.settings); closeSheet("persona-switcher"); renderApp(); showToast("\u5df2\u5207\u6362\u5230 " + (p.name||p.handle)); }
    },
    addNewTrope: function() {
      var input = document.getElementById("hp-new-trope"); if (!input || !input.value.trim()) return;
      var name = input.value.trim();
      for (var i = 0; i < state.tropeTags.length; i++) { if (state.tropeTags[i].name === name) { showToast("\u6807\u7b7e\u5df2\u5b58\u5728"); return; } }
      state.tropeTags.push({id:generateId(), name:name, description:"", createdBy:"user"});
      saveTropeTags(state.tropeTags); showToast("\u6807\u7b7e\u5df2\u6dfb\u52a0"); showTagManager();
    },
    closeApp: function() { if (state.roche && state.roche.ui) state.roche.ui.closeApp(); },
    loadExploreTags: function() {
      showLoading();
      generateExploreTags(function(tags) {
        hideLoading();
        if (tags && tags.length > 0) {
          state.exploreTagsCache = tags;
          var area = document.getElementById("hp-explore-area");
          if (area) renderExploreTagsList(area, tags);
          else renderApp();
          showToast("\u53d1\u73b0" + tags.length + "\u4e2a\u65b0\u6807\u7b7e");
        } else { showToast("\u6682\u65e0\u65b0\u6807\u7b7e\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5"); }
      });
    },
    toggleExploreTag: function(el) {
      if (!el) return;
      var isSelected = el.classList.contains("selected");
      if (isSelected) {
        el.classList.remove("selected");
        var checkEl = el.querySelector(".hp-explore-tag-check");
        if (checkEl) checkEl.innerHTML = "";
      } else {
        el.classList.add("selected");
        var checkEl2 = el.querySelector(".hp-explore-tag-check");
        if (checkEl2) checkEl2.innerHTML = ICONS.check.replace(/24/g,"10").replace("currentColor","#fff");
      }
    },
    addSelectedExploreTags: function() {
      var selectedEls = document.querySelectorAll(".hp-explore-tag.selected");
      var added = 0;
      for (var i = 0; i < selectedEls.length; i++) {
        var name = selectedEls[i].getAttribute("data-explore-name");
        var cat = selectedEls[i].getAttribute("data-explore-cat");
        if (!name) continue;
        var exists = false;
        for (var j = 0; j < state.tropeTags.length; j++) { if (state.tropeTags[j].name === name) { exists = true; break; } }
        if (!exists) {
          state.tropeTags.push({id:generateId(), name:name, description:cat==="trope"?"\u540c\u4eba\u6897":cat==="style"?"\u98ce\u683c\u7c7b\u578b":"\u6587\u5b66\u5f15\u7528", createdBy:"explore", category:cat});
          added++;
        }
      }
      if (added > 0) {
        saveTropeTags(state.tropeTags);
        showToast("\u5df2\u6dfb\u52a0" + added + "\u4e2a\u6807\u7b7e");
        renderApp();
      } else { showToast("\u672a\u9009\u62e9\u65b0\u6807\u7b7e"); }
    }
  };

  /* ─── 插件注册 ─── */
  window.RochePlugin.register({
    id: "hofter",
    name: "hofter",
    version: "1.0.0",
    apps: [
      {
        id: "hofter-home",
        name: "hofter",
        icon: "extension",
        iconImage: "",
        mount: function(container, roche) {
          state.roche = roche;
          state.containerEl = container;
          state.fontSize = 17;

          var styleEl = document.createElement("style");
          styleEl.textContent = getStyles();
          styleEl.setAttribute("data-hofter-style", "1");
          document.head.appendChild(styleEl);
          state.styleEl = styleEl;

          var loadData = function() {
            var promises = [];
            if (roche.storage) {
              promises.push(roche.storage.get("settings").then(function(v) { if (v) { for (var k in v) { if (v.hasOwnProperty(k)) state.settings[k] = v[k]; } } }).catch(function(){}));
              promises.push(roche.storage.get("cpTags").then(function(v) { if (v) state.cpTags = v; }).catch(function(){}));
              promises.push(roche.storage.get("tropeTags").then(function(v) { if (v) state.tropeTags = v; }).catch(function(){}));
              promises.push(roche.storage.get("fandomTags").then(function(v) { if (v) state.fandomTags = v; }).catch(function(){}));
              promises.push(roche.storage.get("summaries_cache").then(function(v) { if (v) state.summaries = v; }).catch(function(){}));
              promises.push(roche.storage.get("published_works").then(function(v) { if (v) state.publishedWorks = v; }).catch(function(){}));
              promises.push(roche.storage.get("favorites").then(function(v) { if (v) { state.favorites = v.favorites || []; state.readHistory = v.readHistory || []; state.readLater = v.readLater || []; } }).catch(function(){}));
            }
            if (roche.persona) {
              promises.push(roche.persona.getUserPersonas().then(function(list) { state.personas = list || []; }).catch(function(){}));
              promises.push(roche.persona.getActiveUserPersona().then(function(p) { if (p && !state.activePersona) state.activePersona = p; }).catch(function(){}));
            }
            if (roche.character) {
              promises.push(roche.character.list().then(function(list) { state.characters = list || []; }).catch(function(){}));
            }
            Promise.all(promises).then(function() {
              if (state.settings.activePersonaId) {
                for (var i = 0; i < state.personas.length; i++) {
                  if (state.personas[i].id === state.settings.activePersonaId) { state.activePersona = state.personas[i]; break; }
                }
              }
              if (state.settings.fontSize) state.fontSize = state.settings.fontSize;
              renderApp();
            }).catch(function() { renderApp(); });
          };

          loadData();
        },
        unmount: function(container) {
          if (state.styleEl && state.styleEl.parentNode) state.styleEl.parentNode.removeChild(state.styleEl);
          for (var i = 0; i < state.eventListeners.length; i++) {
            var ev = state.eventListeners[i];
            ev.el.removeEventListener(ev.type, ev.fn);
          }
          state.eventListeners = [];
          if (container) container.innerHTML = "";
          delete window.__hofter;
        }
      }
    ]
  });
})();