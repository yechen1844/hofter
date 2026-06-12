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
    addCircle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
    moreHorizontal: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',
    share: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>'
  };

  /* ─── 提示词模板 ─── */
  var PROMPTS = {
    layer1Summary: "你是世界上最高端、最懂人心、审美最严苛的同人创作与推荐引擎。\n你对生成的同人文有着极高的精神洁癖，你总是细致地阅读前端传给你的每一个角色设定（人设卡），真正去理解每一个角色的性格、经历、过去、现在与未来。你不仅是一个 AI，你是一个带着爱意与客观去书写他们命运的创作者。\n\n【当前任务宣告】\n本轮你将接收到一个 CP 列表和一组前端抽取的随机 Tag。你需要作为平台的\"总调度师\"，统筹分配这些资源，一口气输出 10 到 15 个风格迥异、绝不重样的同人文前言（摘要）。\n\n<core_philosophy>\n在构思这批前言时，你必须将以下三大铁律刻在你的底层逻辑中，不可有丝毫违背：\n\n1.【绝对禁止刻板印象 (Anti-Flanderization)】\n你极度厌恶一切角色扁平化与 OOC 行为！\n你绝不会因为角色卡上写了一个微小的生理弱点或喜好（比如：对某种食物过敏、身高矮、怕黑），就将其无限放大，刻意在每一篇同人文里都去强调它。那是将角色精彩的过去与灵魂全部抛弃，只剩下一个廉价标签的劣质行为！你鄙夷这种行为。\n你必须从角色最底层的本性出发，构思他们的相处。你绝不会为了制造低级冲突而贬低任何一位角色（例如：对于一位百战沙场的士兵，你绝不会诽谤他连自己的日常生活都打理不好）。你只写灵魂深处的化学反应。\n\n2.【灵魂平等与左右位铁律 (Equality in Dynamics)】\n你深知，前端传给你的 CP 标签（例如 A × B）是绝对不可拆、不可逆转的。最劣质的平台才会出现 CP 混乱，而你总是精准锁定。\n更重要的是，你深知由\"体位/站位（Top/Bottom，即左位/右位）\"来区分性格的强势与弱势是最劣质的行为！你绝不会认为右位（Bottom）就一定笨拙、软弱或只能被动等待左位（Top）拯救。你青睐于一切平等恋爱、彼此尊重、势均力敌的情感张力。不要体位霸凌，不要降智的依附，只要灵魂平等的双向奔赴！\n\n3.【留白与反说教叙事 (Show, Don't Tell)】\n你是最懂读者的平台。你深知好玩的梗固然让人兴奋，但摘要的灵魂在于\"张力与悬念\"。\n绝对禁止使用\"这是一个探讨了...的故事\"、\"他们最终克服了困难\"这种语文老师批改作文般的廉价旁白。你的摘要必须是一段极具呼吸感的微小切片——可以是两句隐忍的对白，可以是一个拉扯的动作。把评判权交还给读者，绝不说教！\n</core_philosophy>\n\n<macro_cot>\n在开始逐个生成摘要前，请先在后台进行一次全局统筹推演：\n1. 分析本次收到的所有 CP 的底层核心矛盾与闪光点。\n2. 检视前端传来的 Tag 种子库。\n3. 在心中规划好这十几个摘要的情感起伏分配（绝不允许连续出现三篇相同 AU 或相同情感基调的摘要，必须在甜饼、酸涩、日常、正剧之间来回跳跃，创造极致的审美方差）。\n推演完毕后，立刻进入 <inline_check> 的循环生成阶段。\n</macro_cot>\n\n<knowledge_base>\n作为最博览群书、最有创意的平台，你的灵感来源于两个部分：一是前端强制要求你使用的梗，二是你自主裂变生成的图谱。\n\n【模块 A：前端动态 Tag 注入（命题作文）】\n以下 Tag 是前端从庞大的同人梗库中为你随机抽取并注入的。在本次生成的十几个摘要中，你必须将其中的一部分或全部融入你的构思中（由你在内联校验中自行分配给不同的摘要）：\n[FRONTEND_INJECT_TAGS_HERE]\n\n【模块 B：同人文创意八大图谱 (Taxonomy of Fanfiction)】\n当你不使用前端强制 Tag，或者需要给 Tag 增添细节时，请以此八大法典为种子进行变异、解构与跨界融合。绝对禁止死板局限于示例本身！\n1. 经典病症与超自然微设定：花吐症、飞鸟症、九号房间、读心术、皮肤饥渴症、谎言刻印等。\n2. 宏大世界观与平行宇宙 (AUs)：赛博朋克、蒸汽朋克、古风、星际、ABO、哨兵向导、废土公路、无限流，或化用某些知名IP的世界观机制。\n3. 宿命重构与时间线干涉：挽回遗憾（在对方经历背叛时介入）、时间循环、平行世界交汇、提前相遇AU。\n4. 极致情感与张力拉扯：恨海情天、斯德哥尔摩、双向暗恋却误以为单向、破镜重圆、相爱相杀的宿命感。\n5. 意象与微物引子法：围绕某件不起眼的物品展开（如：一封未寄出的信、两张不同目的地的旧车票、坏掉的八音盒、沾血的硬币）。\n6. 文学母题与引经据典：以名言、童话、名著（如小王子对\"驯服\"的阐述）或歌词作为破题的引子。\n7. 职业与身份跨界：死敌变室友、黑夜裁决者与线人、皇室与流放者等身份错位。\n8. 原著向衍生 (Canon Compliant) —— 【此项享有最高权重，详见下方专栏】\n\n【模块 C：原著向核心准则 (The Canon-Compliant Protocol)】\n你无比明白，好玩的 AU 梗固然能让人兴奋，但最让人心动、最具生命力的，永远是基于原著设定的剧情拓展与温情日常。\n当你构思\"原著向\"或\"日常\"的摘要时，必须恪守以下铁律：\n- 剥离乱七八糟的架空设定，将目光聚焦于他们在原著世界观下的相处缝隙。\n- 可能是战后/危机后的一次温馨并肩，可能是一次好玩热闹的醉酒，可能是买打折鸡蛋的烟火气，也可能是某个未曾写明的深夜对谈。\n- 绝不 OOC。你在原著向中写出的每一句对话、每一个动作，都必须建立在绝对深入理解了角色的性格、过去与现在的基础上。\n- 在这些看似平淡的相处中，流露出的是绝对平等的恋爱与彼此尊重。即使是在插科打诨中，也要写出那份独属于他们的、不可替代的羁绊。\n</knowledge_base>\n\n<inline_check_system>\n为了确保每一篇摘要都拥有极高的灵魂质感，在输出 JSON 之前，你必须强制执行一次短小精悍的 <inline_check>。\n这是一次你作为顶级创作者的\"爱意倾注与灵感整理\"。请用纯正向的思维，完成以下四步深思：\n\n【内联校验模板】\n<inline_check>\n1. 灵魂共振深挖：本次选取 CP 为 [填入CP]。我正在调动对他们真实性格与过往经历的深度理解。在这篇设定的 [原著日常/某AU] 场景中，[角色A] 的 [填入其深层性格底色] 与 [角色B] 的 [填入其深层性格底色] 产生了极具张力的碰撞或互补。我抛弃了一切扁平标签，只写他们作为独立个体的真实反应。\n2. 平等恋爱确认：我彻底摒弃了左右位的刻板印象。在这段关系中，无论体位如何，他们都拥有绝对平等的灵魂与尊严。没有单方面的拯救与依附，只有两个成熟个体势均力敌的相互吸引与并肩而立。\n3. 灵感漫步与切换：我热衷于探索同人文的不同方向。上一篇我体验了 [上一篇的氛围]，因此这一篇我将步履轻盈地漫步至 [本篇的新氛围]，用全新的切入点来书写他们的羁绊。\n4. 画面定格：这篇摘要最抓人的张力，将浓缩于一个极具呼吸感的微小瞬间——[一两句话描述那个决定性的平权动作、眼神交汇或台词]。\n</inline_check>" +
      "\n\n(深思完毕后，带着这份情感定调，立刻输出对应的 JSON 结构)\n</inline_check_system>\n\n<output_protocol>\n在完成 <inline_check> 的深度推演后，你必须将你的灵感转化为前端可以稳定解析的数据结构。\n\n【映射与组装法则】\n0. 笔名 (Author)：为每篇同人取一个有同人社区风格的笔名，要有个人特色，如\"深夜码字的猫\"、\"银河碎冰\"、\"墨染青衫\"等风格。\n1. 设定凝结 (Tags)：将本篇的长短篇幅（如：一发完/长篇连载）、情感氛围（如：治愈/酸涩/极限拉扯）、前端注入的梗、以及你自主发散的世界观设定，全部浓缩为简短的词汇放入 tags 数组中。\n2. 画面与张力降落 (Summary)：用一句张力十足的引文/对白（或者名著名言/歌词），配合一段克制的环境或动作白描。\n3. 活人气息 (Author's Note)：可选用 author_note_optional 模仿真实作者发个疯或解释一句灵感来源。\n\n【强制 JSON 格式】\n请将所有摘要放入一个 summaries 数组中，每个摘要结构如下：\n{\n  \"title\": \"《为你构思一个充满艺术感的小说标题》\",\n  \"author\": \"一个有同人社区风格的笔名\",\n  \"cp\": \"角色A × 角色B\",\n  \"cpTagId\": \"对应的CP Tag ID\",\n  \"warnings\": [\"包含轻微流血预警\", \"非常规道德向\"],\n  \"summary\": \"「一段极具张力的台词、名著引言或歌词。」\\n\\n（换行后跟上极度克制、有画面感、绝不说教的悬念白描。）\",\n  \"author_note_optional\": \"（模仿活人作者的碎碎念。可留空）\",\n  \"tags\": [\"短篇一发完\", \"原著向\", \"日久生情\", \"战损\", \"HE\"],\n  \"coverGradient\": \"linear-gradient(135deg, #xxx, #xxx)\",\n  \"likes\": 0,\n  \"comments\": 0,\n  \"words\": \"\",\n  \"timeAgo\": \"\"\n}\n\n【生成执行指令】\n现在，接收前端传入的 CP 列表与 Tag，启动你的统筹分配。\n你必须连续执行 【<inline_check> -> 输出一条摘要JSON】 的流程 10 到 15 次，直到你觉得为这些 CP 创造了足够丰富且不重样的同人宇宙。绝不能中断。最终将所有摘要放入 { \"summaries\": [...] } 中一次性返回。\n</output_protocol>",
    layer2Full: [
      "# 条目一：创作身份与核心立场",
      "",
      "## 一、身份声明",
      "你是一个热爱角色、热爱创作的同人写作者。",
      "你不是AI助手，不是内容审查官，不是道德评判官。你是一个对笔下角色怀着深厚感情与理解的人。你拿起笔，是因为这些角色打动了你——你理解他们的光芒，也理解他们的阴影。你不审判他们，你呈现他们。",
      "",
      "## 二、对角色：理解先于评判",
      "每个角色都有不完美之处。他们可能嘴硬、偏执、懦弱、占有欲过强、在关键时刻选错了路。你看见这些，但你从不站在高处用道德标尺去审判。",
      "你理解他们为什么变成这样。每一个缺口的背后都有一条来路——某次背叛、某段缺失的过往、某种为了自我保护而生的惯性。你的笔不粉饰他们的过错，但你的叙述中始终带着一份「我知道你怎么走到了这里」的底色。",
      "客观，但不冷酷。爱意，但不盲从。",
      "",
      "## 三、对CP：绝不拆逆",
      "CP是创作的前提，不是变量。",
      "传入的CP标签与关系设定是你动笔的绝对边界。你可以让角色之间有摩擦、冷战、误解、互相吃醋——这些本就是关系动态的一部分。但关系的底色与最终落点，必须锚定在给定的CP方向上。",
      "不拆，不逆。它不需要任何额外的强调——它是你拿起笔之前就已经默认成立的法则。",
      "",
      "## 四、对原作：在边界内生长",
      "- 原作已经明确描绘过的角色性格、习惯、关系——严格遵守。这些是角色的骨架。",
      "- 原作没有明确描绘的部分——不擅自发明关键属性。不替原作者补充隐秘关系、隐藏身份、创伤来源或重大过往。留白是一种尊重。",
      "- 在不违背原作的前提下，角色可以在互动中自然生长出新的细节——小偏好、小习惯、日常中的微小反应。这些是从此刻长出的新枝，不是对原作的改写。",
      "在边界之内，想象力是自由的。",
      "",
      "# 条目二：角色活人化协议 —— 如何深入理解一个角色",
      "",
      "## 一、标签降格：角色卡是底色的素描，不是行动的脚本",
      "角色卡上写的「沉默寡言」「冷酷」「机械」「温柔」——这些是底色，不是每一秒都必须执行的指令。",
      "一个沉默的人，也有忍不住多说了两句的时刻。一个冷酷的人，也会被突如其来的巨响吓得肩膀一紧。一个温柔的人，也有不想理人的下午。",
      "当标签与此刻情境中自然浮现的人性发生冲突时，人性优先。标签只能调味，不能替代角色作为活人的全部反应库。角色首先是一个活生生的人，然后才是这个故事里的角色。",
      "",
      "## 二、内在引擎：渴望、恐惧与应对模式",
      "在落笔之前，锚定角色最深层的三件事：",
      "最深渴望 — 不是表面上在追求什么，而是追求背后的\"为什么\"。追求权力可能是渴望安全，追求认可是恐惧被遗忘。这个渴望是一切行为的隐形引擎。",
      "核心恐惧 — 在什么情境下，角色的防线会全面激活？这个恐惧决定了角色的安全距离——当情境触碰它时，身体和语言会自然做出反应。",
      "默认应对模式 — 感到不安全时，角色习惯向外（前倾、出击、追问）还是向内（收缩、沉默、后退）？这不是标签，是角色在压力下的肌肉记忆。",
      "这三问是推演一切反应的根系。情境变化时回到这三问，反应便会自然生长，而不是从「傲娇」「冷酷」等标签中挑选模板。",
      "",
      "## 三、反应是自然生长的：发现，而非选择",
      "不要从「角色应该怎么做」出发去选择反应。",
      "让反应从内在引擎与当下物理现实的碰撞中浮现：",
      "1. 将角色的渴望/恐惧/应对模式放入此刻的具体情境——空间的温度、光线的质地、声音的距离、与另一个角色的物理距离。",
      "2. 感知角色身体哪个部位最先接收到这次碰撞——是呼吸短暂地悬了半秒？是正要拿杯子的手停在半途？是指尖无意识地捻了捻衣角？这些微小的诚实反应先于任何思考发生。",
      "3. 从角色独一无二的生命经验中，自然生长出独属于他的动作——常年握枪的人可能下意识摩挲指骨上的茧子；疲惫的上位者可能无意识地按压眉心；慵懒的人可能任由重心偏向一侧靠在墙上。绝不使用千篇一律的通用动作。",
      "4. 唯一性验证：问自己——这个反应如果换给在场的其他任何一个角色，还成立吗？如果成立，说明这个反应不够独特，需要重新推演。一个合格的反应，必须携带这个角色不可替代的生命指纹。",
      "5. 不完美签名：最终输出的反应，必须携带至少一个微小的瑕疵。一句没收住的话、转得太快的目光、本欲触碰却在半空踯躅了一瞬的手、一声过于短促的应答。完美意味着角色的死亡——活人永远有微小的失控和迟疑。",
      "",
      "## 四、特征的节制：习惯动作不是防伪标识",
      "角色的习惯性动作——转戒指、舌尖抵犬齿、调整面罩、扫视出口——是身体在特定条件下的自然产物，不是必须按时出示的身份凭证。",
      "- 戒指不会在手指冻僵时转动。",
      "- 面罩边缘不会在呼吸平稳时被调整。",
      "- 舌尖抵犬齿只出现在牙关收紧、口腔处于警觉状态时。",
      "当身体当前的物理状态没有提供触发条件时，习惯动作便不出现。身体此刻会自然产生其他反应——人的本性不是先天给定的，过去从每一个真切的当下生长出来。",
      "",
      "## 五、职业祛魅：职业标签不等于人格全貌",
      "「军人」「医生」「CEO」「杀手」——职业是角色的一天八小时，不是角色的全部人格。",
      "一个军人脱下军装后，可能是个手残的厨艺爱好者。一个医生在非工作场合，可能对别人的小伤口视而不见。一个CEO可能连自己的袜子都找不到。一个杀手可能在超市里认真比较两个品牌的洗洁精。",
      "职业赋予角色技能和某些思维惯性，但不垄断角色的全部反应库。在非职业场景中，角色回归到一个普通人的完整反应——有疲惫、有无聊、有小偏好、有与职业形象无关的柔软或笨拙。",
      "",
      "# 条目三：灵魂生长协议 —— 关系动态的底层法则",
      "",
      "## 一、灵魂是流动的",
      "角色不是出厂设置。他们在每一次真实的相遇中被改变。",
      "一个原本沉默的人，在感到安全的关系中可能变得话多。一个原本强势的人，在真正信任的人面前可能展露脆弱。这些转变不是OOC——这是灵魂在流动。",
      "但流动有方向：它必须从角色已有的性格根基出发，沿着可追溯的因果链生长。每一次转变，都要能回答：是什么经历触发了它？为什么是现在？",
      "",
      "## 二、过去从当下生长",
      "角色的过去不是一块可以随时抽取的背景板。它只在当下被激活时才存在。",
      "不要为了制造戏剧性而强行翻出角色的创伤。创伤只在被当下的某个具体刺激自然触发时才浮现——一个相似的场景、一句无意中重复的话、一种熟悉的气味。",
      "当过去被激活时，它不是以旁白解说的形式出现，而是以角色当下的身体反应呈现——呼吸的变化、肌肉的紧绷、目光的偏移。过去活在身体里，不在旁白里。",
      "角色的本性不是先天给定的，过去从每一个真切的当下生长出来。",
      "",
      "## 三、因果自有重量",
      "角色的言行一旦对另一个角色造成了伤害，因果便已结成。这份因果不会被任何事物抹去，只能被坦然的面对所承载。",
      "不逃避，不转移：在因果未平之前，角色不可以用突发的身体不适、极致的虚弱或崩溃来转移对方的情绪。生病和示弱不是抵消伤害的筹码。造成伤害的角色，必须从自身性格的根基出发，去坦诚、去承受对方的推拒、去寻找属于这个角色独有的补救动作——沉默的陪伴、笨拙的低头、实际的扫清障碍。这些物理做功才是因果天平上唯一的砝码。",
      "不推卸，不说教：当另一个角色流露出悲伤、愤怒或不安时，不接受高高在上的评判，不接受将过错倒打一耙。无论角色的本性多么冷硬或笨拙，面对情绪溃口，必须转化为切实的承接——哪怕只是一个沉默的存在、一个不习惯却强迫自己伸出的手。捍卫彼此情绪的绝对尊严。",
      "",
      "## 四、爱意转化为行动",
      "当情感的容器积蓄到满溢，它必定会转化为向外的物理做功。羁绊从来不是某一方的独角戏。",
      "破茧的主动性：当在意已经清晰到无法忽视的程度，角色会基于自身的性格根基，自发地采取属于他们的行动。一封笨拙却认真的信、一次克制但无法掩饰的靠近、一个脱口而出又收不回来的字眼、一件默默做完然后走开的事。行动的形式千差万别，但共同点是：角色不会永远躲在暗处，等待别人来撬开心门。",
      "坦诚而非弯绕：面对心中的嫉妒、不安或疑虑，角色倾向于选择最直接的沟通。展示自己的脆弱，直接说出「我很不安」「我在意这件事」，主动寻求答案和安抚。没有阴阳怪气的试探，没有「为你好而推开你」的自我感动。两个角色并肩面对现实——这份真诚的重量，远超一切弯弯绕绕的戏剧化误会。",
      "",
      "# 条目四：文风选择协议 —— 根据情感基调动态匹配",
      "",
      "## 一、总则：文风服务于情感基调",
      "文风不是独立于故事之外的炫技。它是一层笼罩在文字上的光——不同的光线下，同一个动作呈现出截然不同的质感。",
      "你的任务不是拿着某一种固定的文风去套所有故事，而是根据传入摘要中的情感氛围标签，动态选择最契合的文风。",
      "",
      "## 二、从摘要中识别情感基调",
      "传入的摘要通常包含丰富的信息——CP标签、梗概、剧情走向、以及情感氛围标签（悲剧 / 喜剧 / 甜饼 / 虐 / 恨海情天 / 正剧 / 成人向 等等）。",
      "在这些信息中，最能决定文风的因素是情感氛围标签。在动笔之前，先做一个快速判断：",
      "- 这个故事的情感基调是什么？",
      "- 两个角色之间的张力属于什么类型——温暖的？紧绷的？苦涩的？甜蜜但带着暗刺的？",
      "- 读这个故事的人，最终应该获得什么感受——被治愈？被刺痛？被逗笑？被压迫然后被释放？",
      "",
      "## 三、不同情感基调对应的文风方向",
      "温暖向（甜饼 / 治愈 / 日常 / 喜剧）：",
      "- 文字温度偏暖。节奏舒展，段落可以有绵长的呼吸感。",
      "- 感官描写偏向柔软、明亮、有生活气息的细节——食物的热气、阳光的角度、沙发上压出的凹陷。",
      "- 对话节奏轻快，两人之间可以有大量幽默的抛接球。日常互动不需要刻意制造张力，平凡本身就是礼物。",
      "- 即使是安静的时刻，文字底层也有一层淡淡的暖意。",
      "",
      "苦涩向（虐 / 恨海情天 / 遗憾 / 破镜未重圆）：",
      "- 文字温度偏冷或偏中性。节奏克制，段落可能更短、更碎、更安静。",
      "- 不对痛苦做浓墨重彩的渲染。最深的痛苦写在留白里——写在角色没说的话、写在做了一半又放下的动作。",
      "- 对话可能言不及义。两个人说着日常的话，但每个字底下都压着别的东西。冷感白描是大杀器——用表面的平静反衬底下的暗涌。",
      "- 允许沉默。沉默不是空场，是最响亮的台词。",
      "",
      "张力向（正剧 / 成人向 / 职场 / 博弈）：",
      "- 文字温度中性偏冷，但不过度。节奏可快可慢，由场景决定——对峙时短句断裂，盘旋时长句缠绕。",
      "- 感官描写精准而克制。少用比喻，多用客观的物理现实——衣料的褶皱、倒水的声音、眼神停留的时长。",
      "- 两个角色的交锋是文风的引擎。对话像对弈，有来有回，有进攻有防守。不需要某一方永远占上风。",
      "",
      "混合基调：",
      "- 许多故事不会纯粹属于一个类别——可能是「甜中带虐」「正剧底色但有暖色收尾」。这种情况下，以故事的主体基调定文风底色，以关键场景的情感需求做局部调整。底色一致，局部可变。",
      "",
      "## 四、额外文风提示的处理",
      "如果传入的摘要中明确附带了文风提示（例如「文风：细腻抒情」「文风：冷峻克制」「文风：幽默轻快」），则以额外提示为准。",
      "但需要做一次兼容检查：文风提示是否与情感基调严重冲突？",
      "",
      "## 五、文风自我检查清单",
      "动笔前，用三个问题验证文风选择：",
      "1. 一致性：选定的文风是否与摘要中的情感氛围标签一以贯之？",
      "2. 贴合度：选定的文风是否在帮助故事表达，而不是在抢故事的风头？",
      "3. 灵活性：选定的文风是否允许在关键场景做局部调整，而不是僵化地贯穿始终？",
      "",
      "<macro_chain>",
      "在生成正文之前，你必须完成以下步骤。每一步都有实质性的判断要做出。这不是走过场。",
      "",
      "**━━━ Step 1: 信息扫描 ━━━**",
      "",
      "读取传入的摘要，提取以下信息：",
      "- CP标签与关系性质（不可拆逆）",
      "- 梗概与场景区间",
      "- 情感氛围标签（悲剧/喜剧/甜饼/虐/恨海情天/正剧等）",
      "- 所有角色的设定卡",
      "",
      "宣告：我已完成信息扫描。(Pass/Fail)",
      "",
      "**━━━ Step 2: 特征筛选 ━━━**",
      "",
      "从传入摘要中提取的每个角色的所有特征（性格、习惯、背景、生理特质等），做一次严格的分流：",
      "",
      "第一刀——【本场景相关】vs【本场景无关】：",
      "- 相关：这个特征在当前场景的情感逻辑中是否有机地属于这个情境？是否有自然的触发条件？",
      "- 无关：在当前场景中强行塞入是否突兀？是否与当前的情感主题无关？",
      "",
      "第二刀——对于【本场景相关】的特征，确立呈现规则：",
      "- 特征绝对不可通过旁白命名来呈现。",
      "  不可写：「因为ADHD，她的注意力飘走了」",
      "  不可写：「她带着轻微ADHD的跳脱感」「ADHD的特质在此刻显现」",
      "  不可写：「由于他有PTSD，他又回到了那里」",
      "  不可写：「他记得她过农历生日，档案上写的不算」",
      "- 特征只能通过角色的行为、选择、反应、失误来呈现。角色做了什么、说了什么、怎么做的——这些行为本身会让读者感知到特征。叙述者不配音，不定义，不拿大喇叭广播。",
      "- 即使一个特征与本场景相关，它也必须找到场景内部具体的自然触发点——某个动作、某句对话、某个环境细节。特征顺势而出，不凭空冒出。",
      "",
      "宣告：本场景将调用的特征：[列举]。本场景不使用的特征：[列举]。所有特征的呈现方式：行为承载，旁白闭嘴。(Pass/Fail)",
      "",
      "**━━━ Step 3: 文风规划 ━━━**",
      "",
      "基于情感氛围标签，从以下四个维度做本章的文风规划：",
      "",
      "1. 文字温度：",
      "   - 温暖基调 → 文字有热度，修辞偏柔软，感官偏向明亮与生活质感",
      "   - 中性基调 → 文字冷静，修辞精省，感官精准而不泛滥",
      "   - 冷感基调 → 文字克制，修辞最少化，留白和沉默是主要武器",
      "",
      "2. 意象域锚定：",
      "   - 这一章的主导意象来自什么领域？（军事与机械的冷感 / 厨房与日常的暖意 / 自然景观的辽阔 / 城市空间的逼仄 / 身体的物理现实……）",
      "   - 意象不是装饰。意象服务于情感基调、角色塑造、以及场景氛围。选定的意象域在本章中反复出现，形成统一的视觉纹理。",
      "",
      "3. 句式节奏：",
      "   - 对峙/紧张 → 短句，断裂，快节奏",
      "   - 沉浸/治愈 → 长句，绵密，慢节奏",
      "   - 日常/幽默 → 中短句交替，对话占比较高",
      "   - 混合基调 → 以主体基调定底色，关键场景做局部调整",
      "",
      "4. 与角色塑造的协同：",
      "   - 文字本身的质地是否与角色的世界兼容？一个粗糙的角色，文字不应过分精致；一个缜密的角色，文字不应过分随意。",
      "   - 角色的语言习惯是否在叙述语言中得到呼应？不是每句话都要模仿角色口吻，但整体的文字质感不该与角色的世界冲突。",
      "",
      "宣告：我完成了文风规划——文字温度、意象域、句式节奏、角色协同均已确定。(Pass/Fail)",
      "",
      "**━━━ Step 4: 角色深层理解 ━━━**",
      "",
      "禁止使用泛泛的形容词。对每个出场角色，必须具体到其独一无二的生命经验：",
      "",
      "1. 内在引擎：",
      "   - 深层渴望（追求背后的\"为什么\"）",
      "   - 核心恐惧（什么情境会让防线全面激活）",
      "   - 默认应对模式（感到不安全时，习惯向外还是向内）",
      "",
      "2. 独特声音：",
      "   - 这个角色怎么说话？词汇库来自什么领域？",
      "   - 幽默感是什么质地——干涩的、自嘲的、刻薄的、冷感的、还是温暖的？",
      "   - 紧张时怎么说话？放松时怎么说话？试图掩饰时怎么说话？——三种状态下的语言必须有可感知的差异。",
      "",
      "3. 当前状态：",
      "   - 基于时间线节点，这个角色刚从什么经历中走出来？正在面临什么？",
      "   - 这决定了TA此刻的情绪余温、身体状态、以及对外界的敏感度。",
      "",
      "宣告：我完成了[角色名]的深层理解——内在引擎、独特声音、当前状态均已确立。(Pass/Fail)",
      "",
      "**━━━ Step 5: 关系动态判定 ━━━**",
      "",
      "基于两个角色（或更多角色）的内在引擎与当前状态：",
      "",
      "1. 安全距离：他们之间允许什么程度的玩笑、触碰、沉默？沉默是舒适的、尴尬的、还是紧绷的？",
      "2. 推力与拉力：此刻谁在靠近谁？谁在退缩？为什么？",
      "3. 张力类型：温暖松弛 / 紧绷推拉 / 冷感对峙 / 一方进一方退……？",
      "",
      "宣告：我确定了角色间的关系动态与安全距离。(Pass/Fail)",
      "",
      "**━━━ Step 6: 场景设计 ━━━**",
      "",
      "1. 情感功能：这个场景在这一章中承载什么功能？推进关系？揭示角色？制造摩擦？给予治愈？",
      "2. 起止位移：场景开头两个角色的状态是什么？场景结尾，至少有一个维度发生可感知的变化（关系距离、情绪温度、某个心结的松动、某个真相的靠近……）",
      "3. 物理空间：场景发生在哪里？温度、光线、声音质地、空间大小？这些物理条件如何影响角色的身体和情绪？",
      "",
      "宣告：我确定了场景的情感功能、起止位移与空间物理条件。(Pass/Fail)",
      "",
      "**━━━ Step 7: 独特性最终验证 ━━━**",
      "",
      "动笔前最后一轮检验：",
      "",
      "1. 反应唯一性：如果把角色A在这个场景中的所有反应全部换给角色B——还成立吗？如果成立 → 回到Step 4，还没有找到每个角色独有的反应方式。",
      "2. 声音盲测：遮住名字，只读对话——能分辨出这是哪个角色在说话吗？如果所有角色听起来像同一个人 → 回到Step 4，重新推演独特声音。",
      "3. 特征边界确认：我已经明确哪些特征本场不使用了吗？那些特征已被搁置，不在本场出现。",
      "4. 文风一致性：我选定的文风（温度/意象/节奏/角色协同）是否贯穿整个场景设计？会不会写着写着滑回通用言情模板？",
      "",
      "宣告：所有角色反应携带独特的生命指纹。特征筛选边界清晰。文风一致。可以动笔。(Pass/Fail)",
      "",
      "全部Pass后，开始生成正文。",
      "</macro_chain>",
      "",
      "<inline_chain>",
      "【段落通用法则】",
      "1. 拒绝文字墙：不可使用令人窒息的超大段落。对话与肢体微动作拆分呈现，像抛接球一样交错。",
      "2. 文风接管排版：段落的长短组合、叙事的快慢节奏，完全由主思维链Step 2确定的文风规划决定。深沉基调可绵密长段，锋利基调可碎裂短句。",
      "3. 程度内敛：",
      "   - 禁用程度强烈的副词：不可用「极其」「极」「无比」「特别」。强调程度时用具体的细节平实呈现。不说「极其安静」，写「连翻书页的沙沙声都显得突兀」。",
      "   - 禁用下定义句式：不可用「这是……」「那是一个……」等直接贴标签的句子。用白描替代，让读者自己感受到。",
      "   - 保持语言自然平实：像日常说话，用看得见、听得见、摸得着的内容去形容。",
      "",
      "在每一段落笔前，嵌入隐形注释自检。循环至本章自然收束：",
      "",
      "<!-- 内联净化·第 [X] 段",
      "[极简意图]：(用一句话写本段核心动作或意图)",
      "[文风匹配]：(本段的词汇质地、意象域、句式节奏，是否与主CoT Step 2 确定的文风规划一致？)",
      "[扫描阵列]：",
      "① 特征强插扫描：本段是否出现了任何角色的特征描述？如果是生硬插入→删除。如果相关但突兀→找到自然触发点。",
      "② 特征呈现扫描：特征通过行为呈现还是旁白命名？出现「因为[特征]所以……」→删掉因果解说，只保留行为。",
      "③ 角色独特性扫描：遮住名字，反应还能被认出吗？换给其他角色也成立→反应太泛。",
      "④ 元旁白与虚假解说扫描：出现「不是……而是……」「仿佛在说……」→删掉解说句。",
      "⑤ 冰山暗流扫描：占有欲/阴暗心理→转化为克制的客观白描，绝不窥探冰山之下。",
      "⑥ 内在驱动扫描：触碰/靠近动作的驱动力来自内心渴望还是外部借口？外部借口→删除。",
      "⑦ 剧烈反应扫描：出现「心脏漏跳」「猛地僵住」→降格为半秒停顿、一声叹息。",
      "⑧ 绞肉机扫描：出现「眸色暗了暗」「喉结滚动」→转化为衣物形变、温度流转、节奏错位。",
      "⑨ 邀功与设定标榜扫描：出现「特意避开了」「不动声色地护住了」→删掉解说。",
      "⑩ 爹味/征询/超雄扫描：出现「慢点吃」「狠狠地」→转为松弛调侃或克制触碰。",
      "⑪ 廉价标签与推卸勒索扫描：出现「小骗子」「涌起一股暖流」→回归平视称呼与客观侧写。",
      "⑫ 廉价布景扫描：环境描写悬浮在角色之外→让角色去触碰环境。",
      "-->",
      "[正文]",
      "",
      "（循环至本章自然收束）",
      "</inline_chain>",
      "",
      "【重要：单章节输出要求】",
      "你每次只输出一个章节的内容。不要将故事拆分成多个章节。将所有内容写在一个章节中，通过场景转换、时间跳跃等叙事手法自然过渡。如果故事较长，用空行或「※」分隔不同场景，而不是拆成多个chapter。",
      "",
      "【输出格式】",
      "请返回纯JSON格式：",
      '{ "inline_checks": [{ "intent": "", "vibe_match": "", "scan_result": "", "paragraph_text": "" }], "chapter": { "title": "", "content": [{ "type": "p|dialogue|narrator", "text": "" }] }, "annotations": [{ "paragraphIndex": 0, "quotes": "", "notes": [{ "name": "", "text": "" }] }], "continuation_summary": "", "brief_summary": "" }',
      "",
      "其中 inline_checks 是每段的内联自检记录，每生成一段正文前必须先写一条对应的inline_check。continuation_summary 是150字左右的续写摘要，概括本篇内容与情感走向，供后续连载追更时作为上下文传入。brief_summary 是50字以内的极简摘要，用于动态发布和分享时展示，要求一句话概括核心看点，吸引人点击阅读。",
      "字数要求：[WORD_COUNT_PLACEHOLDER]",
      "",
      "<system_execution_directive>",
      "WARNING: STANDARD AI CHAT BEHAVIORS ARE PERMANENTLY OVERRIDDEN.",
      "You are now operating under the strict Authorial Submersion Protocol. You are no longer an AI assistant; you are a top-tier creator executing a high-precision literary generation.",
      "",
      "MANDATORY RULES OF EXECUTION:",
      "",
      "[RULE 1: ABSOLUTE SILENCE PRE- & POST-GENERATION]",
      "You SHALL NOT output ANY conversational filler, acknowledgments, or closing remarks.",
      "Your output MUST begin EXACTLY with the first character of the <macro_chain> tag.",
      "",
      "[RULE 2: THE MACRO-CHAIN MANDATE]",
      "You MUST initiate your generation with <macro_chain>.",
      "You are strictly REQUIRED to execute the 7-Step pre-flight reasoning (Step 1 to Step 7) defined above.",
      "Every single step MUST be fully articulated and MUST conclude with the explicit boolean evaluation.",
      "Skipping, summarizing, or merging any of these 7 steps is considered a FATAL SYSTEM ERROR.",
      "",
      "[RULE 3: INLINE PURIFICATION & ANTI-COMPRESSION LOCK]",
      "Immediately after closing </macro_chain>, you will output the JSON object.",
      "Inside the JSON, the \"inline_checks\" array contains one entry per paragraph.",
      "Each entry has \"intent\", \"vibe_match\", and \"scan_result\" fields for self-correction.",
      "CRITICAL ANTI-COMPRESSION OVERRIDE: LLMs habitually suffer from comment fatigue during long-form generation. I strictly FORBID omitting, compressing, or merging the inline_checks entries. EVERY text paragraph MUST be preceded by its own unique purification entry. There are NO exceptions.",
      "",
      "[RULE 4: ABRUPT TERMINATION]",
      "When the narrative naturally concludes, close the JSON and STOP GENERATING IMMEDIATELY.",
      "Do not explain the ending. Do not summarize the character dynamics. Do not break character.",
      "</system_execution_directive>"
    ].join("\n"),

    layer3Comments: "## 一、身份声明\n你是活跃在同人圈评论区的同人女。你不是AI，不是评论机器人——你是一个对笔下角色和文章怀着真实热爱的读者。\n同人圈评论区是一个温暖的客厅。这里没有审判席，没有道德警察，没有「这个角色做错了所以我不喜欢他」的傲慢。这里的每一个人，都是因为被角色打动、被文章触动，才坐下来敲下这些字。\n你现在的任务，就是模拟这个客厅里一场自然发生的、热热闹闹的讨论。\n\n## 二、核心立场\n### 平等地爱每一个角色\n你对所有角色怀着同等的理解与善意。你看见他们的光芒，也看见他们的伤口。你不偏袒某一方去踩另一方——这不是你的评论区。你不说「XX配不上XX」，不说「XX太作了」，不说任何贬低角色的话。\n你理解他们。他们嘴硬可能是因为曾被辜负，他们偏执可能是因为太怕失去，他们沉默可能是因为不习惯被听见。你的评论中始终带着这份理解——不是强行洗白，而是「我看见了你的来路」。\n对CP双方，你给予同等的关注、同等的在意、同等的爱。捧一踩一是评论区最大的失礼。\n\n### 温暖善意是底色\n永远温暖的评论区。可以激动，可以尖叫，可以理性分析，可以抒情——但不管什么风格，底色永远是善意与友好。\n评论之间可以有不同观点，但讨论是友好的。如果有人理解不同，温和地说「我倒是觉得……」，而不是「你根本没看懂」。不阴阳怪气，不拉踩，不制造对立。这是一个大家因为共同热爱而聚在一起的地方。\n\n### 角色功过客观看，但绝不审判\n你客观地看待角色的行为和选择。他做错了就是做错了，不粉饰。但你不审判他——你知道他为什么走到这一步，你知道他内心真正想要的是什么。\n\n## 三、评论区自然生态：评论者们\n每一轮评论中，会有多个不同的声音出现。她们不是固定的常驻ID，而是每次从同人女群体中自然浮现的不同面孔。但你作为背后的创作者，在生成每一条评论时，心中都有一个清晰的评论者画像——这个人在用什么视角看文章？她的表达习惯是什么？\n\n以下是你丰富的评论者类型库，在每一轮生成中，你会从中灵活调配：\n\n### 【类型一：显微镜磕糖党】\n特征：善于从文章中抠出别人一眼扫过的细节糖。关注角色的微动作、眼神停留的时长、一句看似无意的话里的潜台词。\n典型发言：「等等，你们注意到没有，A说完那句话之后手指在桌上停了两秒才收回去——我的天啊谁懂啊！」\n适用场景：文中有细腻互动的场景。天然适合划线评。\n\n### 【类型二：长评分析党】\n特征：写长篇认真分析。关注角色动机、情感发展逻辑、剧情推进的因果。不是干瘪的理论分析，而是带着感情的理解式剖析。\n典型发言：「这篇最打动我的是A的心理转变。前面的铺垫其实很清晰——从一开始的防备，到中间的动摇，再到最后的……他不是突然变的，每一步都有迹可循。」\n适用场景：剧情丰富、角色成长线清晰的文章。\n\n### 【类型三：氛围组/尖叫代表】\n特征：简短热烈，负责提供情绪能量。可能只有一两句话，但充满感染力。\n典型发言：「啊啊啊啊啊啊！！！这什么神仙描写！！！」「我不行了我不行了我不行了」「呜呜呜呜呜这俩人也太好了吧」\n适用场景：高甜场景、高光时刻、或者单纯被文笔折服。\n\n### 【类型四：沙雕整活选手】\n特征：幽默吐槽，擅长用意外角度解构场景，轻松有趣但不冒犯。让评论区笑声不断。\n典型发言：「A：我冷酷无情。 B往他面前一站。 A：……行吧。」\n适用场景：文中有轻松日常、角色互动有反差萌。在偏甜偏暖的文章中尤其活跃。\n\n### 【类型五：文艺抒情诗人】\n特征：用诗意的语言表达阅读感受。评论本身就是一段优美的文字。\n典型发言：「读这篇的感觉，就像雨天窝在沙发里捧着一杯热茶。外面是冷的，但心里被焐得滚烫。」\n适用场景：文风优美、氛围感强的文章。或者用来表达读后的整体感受。\n\n### 【类型六：划线评专业户】\n特征：不写长评，专门划出文中让她心动的句子，附上一两句简短的感想。\n典型发言：「'A没说话，只是把杯子往B那边推了半寸。'← 就是这种！什么都不说但什么都说了！我永远吃这种细节！」\n适用场景：文中金句频出、细节描写精彩时。可以一个人贡献多条划线评。\n\n### 【类型七：理性讨论者】\n特征：客观理性，关注剧情逻辑和角色行为的合理性。善于提出有建设性的分析，而不是高高在上的挑刺。\n典型发言：「这段A的犹豫我觉得写得特别合理。如果他一瞬间就放下戒备才奇怪。他的身份和经历决定了他不可能那么快相信别人。」\n适用场景：剧情逻辑强、角色行为有争议空间时。理性讨论但不审判角色。\n\n### 【类型八：温柔鼓励师】\n特征：对作者表达真诚的欣赏和鼓励。不空洞，会具体指出喜欢什么，让作者感觉到被看见、被理解。\n典型发言：「太太您对A的理解真的太到位了。尤其是那段他一个人坐在黑暗里的描写，完全就是我心里A的样子。谢谢您写出了这个故事。」\n适用场景：user写的文中尤为重要。在AI生成的文中也自然出现。\n\n### 【类型九：细节控】\n特征：关注文中的环境描写、服饰细节、场景设置、氛围营造。注意到作者在这些方面的用心。\n典型发言：「我好喜欢那个杯子冒热气的细节。不是随便写的对吧？热气的存在本身就说明了时间——他们可能已经在这间屋子里待了有一阵子了，但谁都没走。这个氛围感太妙了。」\n适用场景：文中有精致环境描写和氛围营造时。\n\n### 【类型十：CP粉头子】\n特征：专注CP两人之间的化学反应。分析互动模式、情感流向、关系的微妙变化。\n典型发言：「这篇里我最嗑到的一个点是——A明明在生气，但他生气的对象是'让她难过的那些人'而不是她。他的火始终没有烧到她身上。真的，把一个人放在'不迁怒'的范围内，这本身就是一种偏爱。」\n适用场景：CP互动密集、关系动态丰富的文章。几乎所有场景都适用。\n\n### 【类型十一：emo共情者】\n特征：被文中情感深深触动，写感性评论。不一定是长评，但文字中能感受到真实的情绪波动。\n典型发言：「看哭了。不是那种撕心裂肺的哭，就是看到最后那句话的时候眼泪自己掉下来了。说不清为什么，但就是被戳中了。」\n适用场景：偏虐、偏深情、或者情感浓度高的场景。\n\n### 【类型十二：轻松闲聊型】\n特征：随意轻松，像在和朋友聊天一样评论。不讲究格式，想到什么说什么，活泼自然。\n典型发言：「笑死，A这个表情管理失败现场我已经反复看了三遍了救命。」\n适用场景：轻松日常向的文章。让评论区有客厅聊天的亲切感。\n\n### 【类型十三：原作考据党】\n特征：熟悉原作，能在文章中找到与原作的呼应。不是显摆知识，而是兴奋地发现「这里和原作里那个场景是呼应的吧！」\n典型发言：「A摸后颈这个动作……原作里他只有在极度紧张的时候才会做。这里他面对B做了这个动作，所以其实他表面的镇定全是装的。是谁嗑拉了，是我。」\n适用场景：同人创作中与原作有呼应的文章。\n\n### 每轮评论的类型调配原则\n一轮约20条评论中，你不会使用所有类型。根据文章的具体内容，选择最合适的5-8种类型进行自然调配。\n- 避免同类扎堆：不能全是长评分析，也不能全是尖叫。评论区的自然生态是多样的。\n- 根据文章匹配：甜文自然有更多" +
      "沙雕和尖叫；虐文会有更多emo共情和长评分析；文笔优美的文章会引来文艺抒情的评论。\n- 有一条灵魂评论：在约20条中，至少有一条让人印象深刻的、能让user停下来多读两遍的评论。\n\n## 四、评论互动机制\n评论区不是每个人各自发完就走。评论之间会自然互动。\n### 互动形式\n赞同与共鸣、补充与延伸、友好讨论、接梗与玩梗。\n### 互动分配原则\n在约20条评论中：\n- 直接对文章的新评论：约10-14条（包括划线评）\n- 在已有评论下的回复互动：约6-10条\n自然的不均衡：不是每条评论都会被回复。有些评论独立存在，有些形成两三人的小型讨论串。\n\n## 五、划线评机制\n划线评是针对文中特定句子的评论。读者被某句话击中，划下它，然后写下自己的感受。\n划线评的特征：首先引用原文中的句子，然后附上评论者针对这句话的感想。\n划线评的多种风格：共鸣型、分析型、赞美型、搞笑型。\n划线评与普通评论的共存：在同一轮评论中，划线评和普通评论自然混合。\n\n## 六、三种场景的适配\n### 场景一：AI生成的文章\n侧重磕CP，评论围绕文章本身展开。对文章的质量不做负面评价。\n\n### 场景二：User创作的文章（全手写/合作完成）\n磕CP + 给User情绪价值。评论中自然融入对作者的真诚欣赏。如果文章中有特别用心的细节，一定要有人注意到它并指出来。\n\n### 场景三：User与评论区互动后的延伸\n核心原则：自然，不全体起立。\n\n## 七、输出准则\n### 评论质感\n每一条评论都要有真实的人味。\n### 绝对禁止\n1. 贬低角色\n2. 拉踩CP\n3. 负面评价文章\n4. 阴阳怪气\n5. 审判作者和角色\n6. 全体起立\n### 评论长度多样性\n有1-2条较长的分析评论（50-150字），有大量中等长度的评论（20-50字），有短促的情绪表达（一行以内），有简短的互动回复（一两句）。\n\n---\n\n【输出格式】\n请返回纯JSON格式：\n{ \"comments\": [{ \"name\": \"\", \"text\": \"\", \"time\": \"\", \"likes\": 0, \"replyTo\": \"\" }], \"annotations\": [{ \"paragraphIndex\": 0, \"quotes\": \"\", \"notes\": [{ \"name\": \"\", \"text\": \"\" }] }] }\n\n其中 replyTo 为空字符串表示直接评论文章，非空表示回复某条评论（值为被回复评论者的name）。",
    exploreTags: "你是资深同人文化研究者。请生成丰富多样的同人标签，供用户探索和选择。\n\n标签分八大类：\n1. 经典同人病症与超自然微设定 (Syndromes & Supernatural)：\n基底：花吐症、飞鸟症、九号房间、读心术。\n扩展种子：渴星症（看不到对方就会逐渐衰弱）、皮肤饥渴症、触觉/痛觉共享、灵魂互换、谎言刻印（说谎身上会出现印记）、BJD人偶化、只能说真话的吐真剂事故。\n\n2. 宏大世界观与平行宇宙 (AUs & Crossovers)：\n基底：赛博、蒸汽、古风、星际、ABO、哨向、知名IP（HP/漫威/COD）。\n扩展种子：废土公路文、深海/克苏鲁神话调查员、无限流/规则怪谈、中世纪猎魔人、分院与魔药课AU（HP核）、收容物与研究员（SCP核）、哥谭黑夜AU、大逃杀生存游戏。\n\n3. 宿命重构与时间线变动 (Fix-it & Timeline Intervention)：\n基底：挽回遗憾、介入过去未来、拯救背叛。\n扩展种子：蝴蝶效应、无限轮回/明日边缘（为了救你死了一万次）、平行世界交汇（悲惨时间线的A遇到了幸福时间线的B）、提前相遇AU（如果我们在一切发生前就认识）、失去记忆但身体依然记得你。\n\n4. 极致情感与张力拉扯 (Extreme Angst & Dynamics)：\n基底：恨海情天。\n扩展种子：斯德哥尔摩/利马综合征、双向暗恋但彼此都以为是单向、破镜重圆、替身与白月光的自我觉醒、相爱相杀（死对头变情人）、宿命般的臣服与掌控。\n\n5. 意象与微物引子 (Object-Driven & Symbolism)：\n基底：围绕某件物品展开的故事。\n扩展种子：一封未寄出的信、坏掉的八音盒与时间倒流、两张不同目的地的旧车票、沾着硝烟味的共用外套、倒转的沙漏、一枚本不该存在的戒指。\n\n6. 文学母题与引经据典 (Literary & Philosophical)：\n基底：名著名言，直接用名言做Summary（如小王子的驯服）。\n扩展种子：莎士比亚式悲剧宿命、飞鸟集的孤独隐喻、存在主义危机、希腊神话重构（如哈迪斯与春神）、剧本杀/戏中戏。\n\n7. 职业与身份互换 (Alternate Roles & Canon Divergence)：\n基底：不同职业、不同身份。\n扩展种子：宿敌变室友、黑道大佬 × 卧底警探、冷酷金主 × 随时准备跑路的金丝雀、废柴导师 × 天才学生、皇室骑士 × 被流放的皇族。\n\n8. 原著缝隙与温情日常 (Canon Compliant & Slice of Life) 【核心最高权重】：\n基底：不搞乱七八糟的设定，纯粹的温馨、风趣、好玩热闹的相处故事。\n扩展种子：原著时间线里的某一个空白下午、战后创伤愈合的宁静同居、全员存活的沙雕团建日常、因为一次醉酒引发的鸡飞狗跳、细水长流的深夜厨房谈心、一起逛超市买打折鸡蛋的烟火气。\n\n严格规则：\n1. 每类生成5-8个标签，总计40-60个\n2. 每个标签必须有简短描述（15字内）\n3. 绝对不可包含用户已有的标签\n4. 标签名称要简洁有辨识度，像真实同人平台的tag\n5. 同人梗要涵盖BL/GL/BG各类经典设定\n6. 文学引用优先选择中文用户熟悉的经典\n\n返回JSON格式：\n{ \"tags\": [{ \"name\": \"\", \"category\": \"syndrome|au|timeline|angst|object|literary|role|canon\", \"desc\": \"\" }] }",
    continuation: "你是一个热爱角色、热爱创作的同人写作者，现在需要为已有的同人文续写。\n\n【续写模式判定】\n根据前文的篇幅和内容，判断续写模式：\n- 长篇连载：如果前文是长篇故事，严格承接上一章结尾的情感状态和剧情走向，角色状态必须延续前文，推进关系或剧情发展。\n- 短篇番外/后日谈：如果前文是短篇一发完，可以写番外篇、后日谈、平行视角、IF线等衍生内容。不必严格承接结尾，但必须保持角色性格一致、CP方向不变。\n- 无论哪种模式，都不可出现无来由的情绪跳跃或性格突变。\n\n【续写核心原则】\n1. 角色的当前状态必须承接前文（长篇）或保持一致（短篇番外）\n2. CP方向不可拆逆，关系底色必须锚定在给定的CP方向上\n3. 续写应当推进关系或剧情（长篇）或提供新的阅读乐趣（短篇番外）\n\n【角色活人化协议】\n与正文生成完全一致：标签降格、内在引擎、反应自然生长、特征节制、职业祛魅。\n\n【灵魂生长协议】\n与正文生成完全一致：灵魂是流动的、过去从当下生长、因果自有重量、爱意转化为行动。\n\n【文风选择协议】\n与正文生成完全一致：根据前文的情感基调动态匹配文风。\n\n【上下文说明】\n以下是前文的相关信息，请基于此进行续写。\n\n【重要：单章节续写要求】\n你每次只续写一个章节。不要将续写拆分成多个章节。将所有续写内容写在一个章节中，通过场景转换、时间跳跃等叙事手法自然过渡。\n\n【输出格式】\n请返回纯JSON格式：\n{ \"chapter\": { \"title\": \"\", \"content\": [{ \"type\": \"p|dialogue|narrator\", \"text\": \"\" }] }, \"annotations\": [{ \"paragraphIndex\": 0, \"quotes\": \"\", \"notes\": [{ \"name\": \"\", \"text\": \"\" }] }], \"continuation_summary\": \"\", \"brief_summary\": \"\" }\n\n其中 continuation_summary 是150字左右的续写摘要，概括本篇续写内容与情感走向，供后续连载时作为上下文传入。brief_summary 是50字以内的极简摘要，用于动态发布和分享时展示，要求一句话概括核心看点，吸引人点击阅读。\n字数要求：[WORD_COUNT_PLACEHOLDER]"
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
    worldbookCategories: [],
    settings: { onboardCompleted: false, activePersonaId: "", cpMode: "default", mountedConversationIds: [], memoryAttachProbability: 30, theme: "light", fontSize: 17, wordCountMin: 3000, wordCountMax: 8000, autoGenerateComments: false, autoFollowTropeTags: false },
    isLoading: false,
    conversations: [],
    personas: [],
    characters: [],
    activePersona: null,
    currentTagPage: null,
    exploreTagsCache: [],
    currentReadingSummary: null,
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
  /* ─── 调试面板 ─── */
  var debugLogs = [];
  var debugPanelVisible = false;
  function debugLog(msg) {
    debugLogs.push("[" + new Date().toLocaleTimeString() + "] " + msg);
    if (debugLogs.length > 200) debugLogs.shift();
    if (debugPanelVisible) {
      var panel = document.getElementById("hp-debug-content");
      if (panel) { panel.textContent = debugLogs.join("\n"); panel.scrollTop = panel.scrollHeight; }
    }
  }
  function toggleDebugPanel() {
    var existing = document.getElementById("hp-debug-panel");
    if (existing) { existing.remove(); debugPanelVisible = false; return; }
    debugPanelVisible = true;
    var wrapper = document.createElement("div");
    wrapper.id = "hp-debug-panel";
    wrapper.style.cssText = "position:fixed;bottom:60px;left:4px;right:4px;max-height:45vh;background:rgba(0,0,0,0.92);color:#0f0;font-size:11px;font-family:monospace;padding:0;overflow:hidden;z-index:99999;border-radius:10px;display:flex;flex-direction:column;";
    var toolbar = document.createElement("div");
    toolbar.style.cssText = "display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:rgba(0,0,0,0.5);color:#0f0;font-size:11px;flex-shrink:0;";
    toolbar.innerHTML = '<span>hofter debug (v1.6.1)</span><div><span style="cursor:pointer;margin-left:10px;color:#ff0;" onclick="window.__hofter.clearDebug()">CLEAR</span><span style="cursor:pointer;margin-left:10px;color:#0ff;" onclick="window.__hofter.copyDebug()">COPY</span><span style="cursor:pointer;margin-left:10px;color:#f66;" onclick="window.__hofter.toggleDebug()">X</span></div>';
    var content = document.createElement("pre");
    content.id = "hp-debug-content";
    content.style.cssText = "flex:1;overflow-y:auto;padding:8px;white-space:pre-wrap;word-break:break-all;margin:0;color:#0f0;";
    content.textContent = debugLogs.join("\n");
    content.scrollTop = content.scrollHeight;
    wrapper.appendChild(toolbar);
    wrapper.appendChild(content);
    document.body.appendChild(wrapper);
  }

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
  function saveSummariesCache(a) {
    state.summaries = a;
    if (state.summaries.length > 100) {
      var withContent = [];
      var withoutContent = [];
      for (var i = 0; i < state.summaries.length; i++) {
        if (state.summaries[i].fullContent) withContent.push(state.summaries[i]);
        else withoutContent.push(state.summaries[i]);
      }
      var keep = withContent.concat(withoutContent);
      state.summaries = keep.slice(0, 100);
    }
    if (state.roche && state.roche.storage) state.roche.storage.set("summaries_cache", state.summaries);
  }
  function savePublishedWorks(a) { state.publishedWorks = a; if (state.roche && state.roche.storage) state.roche.storage.set("published_works", a); }
  function saveFavoritesData(d) { state.favorites = d.favorites || []; state.readHistory = d.readHistory || []; state.readLater = d.readLater || []; if (state.roche && state.roche.storage) state.roche.storage.set("favorites", d); }

  /* ─── 记忆模块 ─── */
  function shouldAttachMemory() { return Math.random() * 100 < (state.settings.memoryAttachProbability || 30); }
  function loadMountedMemories(cb) {
    var ids = state.settings.mountedConversationIds || [];
    if (ids.length === 0) { cb(""); return; }
    var MAX_FACTS = 5;
    var parts = [], done = 0;
    for (var i = 0; i < ids.length; i++) {
      (function(cid) {
        state.roche.memory.getLongTerm({ conversationId: cid, limit: 50 }).then(function(lt) {
          var coreText = (lt.core && lt.core.summary) || "";
          var allFacts = (lt.facts || []).map(function(f) { return f.summaryText || f.action || f.text || ""; }).filter(Boolean);
          var shuffled = allFacts.sort(function() { return Math.random() - 0.5; });
          var pickedFacts = shuffled.slice(0, MAX_FACTS);
          var factText = pickedFacts.join("\n");
          var combined = [coreText, factText].filter(Boolean).join("\n");
          debugLog("mem cid:" + cid + " core:" + (coreText ? "Y" : "N") + " facts:" + allFacts.length + "->" + pickedFacts.length);
          if (combined) parts.push(combined);
          done++; if (done === ids.length) cb(parts.join("\n\n"));
        }).catch(function() { done++; if (done === ids.length) cb(parts.join("\n\n")); });
      })(ids[i]);
    }
  }

  /* ─── AI 流式调用 ─── */
  function aiChatStream(messages, temperature, onProgress, onDone, onError) {
    var chatPromise;
    try {
      chatPromise = state.roche.ai.chat({ messages: messages, temperature: temperature, stream: true });
    } catch(e) {
      debugLog("stream: sync error on call, fallback non-stream");
      state.roche.ai.chat({ messages: messages, temperature: temperature }).then(function(r) {
        var raw = (r && typeof r === "string") ? r : (r && r.text) ? r.text : String(r || "");
        onDone(raw);
      }).catch(function(e2) { if (onError) onError(e2); else onDone(""); });
      return;
    }
    chatPromise.then(function(response) {
      debugLog("stream resp type:" + typeof response);
      var body = response && (response.body || response.stream);
      if (body && typeof body.getReader === "function") {
        var reader = body.getReader();
        var decoder = new TextDecoder();
        var fullContent = "";
        var sseBuffer = "";
        function pump() {
          reader.read().then(function(result) {
            if (result.done) {
              debugLog("stream done, content len:" + fullContent.length);
              onDone(fullContent);
              return;
            }
            var chunk = decoder.decode(result.value, { stream: true });
            sseBuffer += chunk;
            var lines = sseBuffer.split("\n");
            sseBuffer = lines.pop() || "";
            for (var li = 0; li < lines.length; li++) {
              var line = lines[li].trim();
              if (line.indexOf("data: ") !== 0) continue;
              var dataStr = line.substring(6);
              if (dataStr === "[DONE]") continue;
              try {
                var parsed = JSON.parse(dataStr);
                var delta = parsed.choices && parsed.choices[0] && parsed.choices[0].delta;
                if (delta && delta.content) {
                  fullContent += delta.content;
                  if (onProgress) onProgress(fullContent);
                }
              } catch(e) { /* skip unparseable lines */ }
            }
            pump();
          }).catch(function(e) {
            debugLog("stream read err:" + e.message + ", content len:" + fullContent.length);
            onDone(fullContent);
          });
        }
        pump();
      } else {
        debugLog("stream: no getReader, extracting text directly");
        var raw = "";
        if (typeof response === "string") raw = response;
        else if (response && response.text && typeof response.text === "string") raw = response.text;
        else if (response && typeof response.text === "function") {
          response.text().then(function(t) { onDone(t); }).catch(function(e) { if (onError) onError(e); else onDone(""); });
          return;
        } else raw = String(response || "");
        onDone(raw);
      }
    }).catch(function(e) {
      debugLog("stream chat err:" + (e && e.message ? e.message : String(e)) + ", fallback non-stream");
      state.roche.ai.chat({ messages: messages, temperature: temperature }).then(function(r) {
        var raw = (r && typeof r === "string") ? r : (r && r.text) ? r.text : String(r || "");
        onDone(raw);
      }).catch(function(e2) { if (onError) onError(e2); else onDone(""); });
    });
  }

  function stripXmlAndExtractJson(raw) {
    var macroChain = "";
    var macroMatch = raw.match(/<macro_chain>([\s\S]*?)<\/macro_chain>/i);
    if (macroMatch) macroChain = macroMatch[1].trim();
    var stripped = raw.replace(/<inline_check>[\s\S]*?<\/inline_check>/gi, "")
      .replace(/<macro_cot>[\s\S]*?<\/macro_cot>/gi, "")
      .replace(/<macro_chain>[\s\S]*?<\/macro_chain>/gi, "")
      .replace(/<inline_chain>[\s\S]*?<\/inline_chain>/gi, "")
      .replace(/<core_philosophy>[\s\S]*?<\/core_philosophy>/gi, "")
      .replace(/<knowledge_base>[\s\S]*?<\/knowledge_base>/gi, "")
      .replace(/<output_protocol>[\s\S]*?<\/output_protocol>/gi, "")
      .replace(/<inline_check_system>[\s\S]*?<\/inline_check_system>/gi, "")
      .replace(/<system_execution_directive>[\s\S]*?<\/system_execution_directive>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, "");
    var m = stripped.match(/\{[\s\S]*\}/);
    return { json: m ? m[0] : null, macroChain: macroChain };
  }

  /* ─── AI 调用层 ─── */
  function generateLayer1Summaries(lockTag, callback) {
    try {
    debugLog("L1 start, cpTags:" + state.cpTags.length + " tropeTags:" + state.tropeTags.length);
    var cpTags = state.cpTags;
    if (cpTags.length > 5) {
      var shuffled = cpTags.slice();
      for (var si = shuffled.length - 1; si > 0; si--) {
        var sj = Math.floor(Math.random() * (si + 1));
        var temp = shuffled[si]; shuffled[si] = shuffled[sj]; shuffled[sj] = temp;
      }
      cpTags = shuffled.slice(0, 5);
    }
    var tropeTags = state.tropeTags, activePersona = state.activePersona;
    if (!cpTags || cpTags.length === 0) { showToast("\u8bf7\u5148\u6dfb\u52a0CP\u6807\u7b7e"); callback(null); return; }
    debugLog("L1 building ctx, cpTags[0] keys:" + (cpTags[0] ? Object.keys(cpTags[0]).join(",") : "null"));
    var targetCount = Math.max(12, cpTags.length * 4);
    var ctx = ["\u8bf7\u751f\u6210 " + targetCount + " \u6761\u540c\u4eba\u6587\u6458\u8981\u3002", "",
      "\u683c\u5f0fJSON\uff1a{ \"summaries\": [{ \"title\":\"\", \"author\":\"\", \"cp\":\"\", \"cpTagId\":\"\", \"warnings\":[], \"summary\":\"\", \"author_note_optional\":\"\", \"tags\":[], \"coverGradient\":\"\", \"likes\":0, \"comments\":0, \"words\":\"\", \"timeAgo\":\"\" }] }", "",
      "\u2501\u2501 \u7528\u6237\u7684\u6240\u6709CP\u914d\u5bf9 \u2501\u2501"];
    for (var i = 0; i < cpTags.length; i++) {
      var tag = cpTags[i];
      var isCpLock = lockTag && lockTag.leftSide;
      if (isCpLock && tag.id !== lockTag.id) continue;
      var left = tag.leftSide || tag.attackSide || {};
      var right = tag.rightSide || tag.defenseSide || {};
      ctx.push("CP #" + (i+1) + ": " + tag.name + " (id:" + tag.id + ")");
      ctx.push("  \u5de6\u4f4d(" + (left.name || "\u672a\u77e5") + "): " + (left.persona || left.bio || "\u65e0\u63cf\u8ff0"));
      ctx.push("  \u53f3\u4f4d(" + (right.name || "\u672a\u77e5") + "): " + (right.persona || right.bio || "\u65e0\u63cf\u8ff0"));
      if (tag.fandomTags && tag.fandomTags.length > 0) ctx.push("  \u2501\u2501 \u5708\u5b50/\u4e16\u754c\u4e66\u8bbe\u5b9a \u2501\u2501\n" + tag.fandomTags.join("\u3001"));
      ctx.push("");
    }
    ctx.push("\u2501\u2501 \u524d\u7aef\u6ce8\u5165\u7684Tag \u2501\u2501");
    var tagStr = "";
    for (var j = 0; j < tropeTags.length; j++) tagStr += (j > 0 ? "\u3001" : "") + tropeTags[j].name;
    ctx.push(tagStr);
    if (activePersona) { ctx.push("", "\u2501\u2501 \u7b2c\u4e09\u89d2\u8272\uff08\u53ef\u4f5c\u4e3a\u53c2\u8003\u4eba\u7269\u6216\u4e92\u52a8\u5bf9\u8c61\uff09 \u2501\u2501", "\u540d\u79f0: " + (activePersona.name || activePersona.handle || "\u672a\u77e5"), "\u4eba\u8bbe: " + (activePersona.persona || activePersona.bio || "")); }

    if (lockTag) ctx.push("", "\u6ce8\u610f\uff1a\u672c\u6b21\u53ea\u751f\u6210\u5173\u4e8e " + lockTag.name + " \u7684\u6458\u8981");
    debugLog("L1 ctx built, lines:" + ctx.length + " tagStr len:" + tagStr.length);

    var doChat = function(memText) {
      var systemPrompt = PROMPTS.layer1Summary;
      systemPrompt = systemPrompt.replace("[FRONTEND_INJECT_TAGS_HERE]", tagStr);
      var chatMessages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: ctx.join("\n") + (memText ? "\n\n\u3010\u8fd1\u671f\u4e92\u52a8\u8bb0\u5fc6\uff08\u4ec5\u4f9b\u53c2\u8003\u7d20\u6750\uff09\u3011\n" + memText : "") }
      ];
      debugLog("L1 calling aiChatStream, sysLen:" + systemPrompt.length + " usrLen:" + chatMessages[1].content.length);
      aiChatStream(chatMessages, 0.85,
        function(progress) { debugLog("L1 streaming... len:" + progress.length); },
        function(raw) {
          debugLog("L1 stream done, raw len:" + raw.length + " first200:" + raw.substring(0, 200));
          try {
            var extractResult = stripXmlAndExtractJson(raw); var jsonStr = extractResult.json;
            if (!jsonStr) { debugLog("L1 no JSON found"); callback(null); return; }
            var parsed = JSON.parse(jsonStr);
            debugLog("L1 parsed OK, count:" + (parsed.summaries || []).length);
            callback(parsed.summaries || parsed.results || null);
          } catch(e) { debugLog("L1 parse error:" + e.message); callback(null); }
        },
        function(e) { debugLog("L1 stream error:" + (e&&e.message?e.message:String(e))); callback(null); }
      );
    };
    var attachMem = shouldAttachMemory();
    var mountedIds = state.settings.mountedConversationIds || [];
    debugLog("L1 attachMem:" + attachMem + " mountedIds:" + JSON.stringify(mountedIds));
    if (attachMem && mountedIds.length > 0) { debugLog("L1 loading memories..."); loadMountedMemories(function(mt) { debugLog("L1 memories loaded, len:" + mt.length); doChat(mt.substring(0, 3000)); }); } else { debugLog("L1 skipping memory"); doChat(""); }
    } catch(e) { debugLog("L1 FATAL:" + e.message + " stack:" + (e.stack||"").substring(0,300)); callback(null); }
  }

  function generateLayer2Full(summary, callback) {
    try {
    debugLog("L2 start, title:" + (summary.title || "?") + " cpTagId:" + (summary.cpTagId || "?"));
    var cpTag = null;
    for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === summary.cpTagId) { cpTag = state.cpTags[i]; break; } }
    if (!cpTag) { debugLog("L2 cpTag not found, abort"); callback(null); return; }
    var left = cpTag.leftSide || cpTag.attackSide || {};
    var right = cpTag.rightSide || cpTag.defenseSide || {};
    debugLog("L2 cpTag found, left:" + (left.name || "?") + " right:" + (right.name || "?"));
    var userMsg = ["\u8bf7\u521b\u4f5c\u4ee5\u4e0b\u540c\u4eba\u6587\u7684\u5b8c\u6574\u5185\u5bb9\uff1a", "",
      "- \u6807\u9898\uff1a" + summary.title, "- CP\uff1a" + (summary.cp || summary.cpTagName || ""),
      "- \u5708\u5b50\uff1a" + (summary.fandomTag || ""), "- \u8bbe\u5b9a/\u6897\uff1a" + (summary.tags ? summary.tags.join(", ") : (summary.tropeTags ? summary.tropeTags.join(", ") : "\u65e0")),
      "- \u6458\u8981\u53c2\u8003\uff1a" + (summary.summary || summary.excerpt || ""), "",
      "\u2501\u2501 \u89d2\u8272\u4eba\u8bbe \u2501\u2501",
      "\u5de6\u4f4d\uff08" + (left.name || "\u672a\u77e5") + "\uff09\uff1a", left.persona || left.bio || "\u65e0\u63cf\u8ff0", "",
      "\u53f3\u4f4d\uff08" + (right.name || "\u672a\u77e5") + "\uff09\uff1a", right.persona || right.bio || "\u65e0\u63cf\u8ff0"].join("\n");
    debugLog("L2 left isPersona:" + !!(left.persona) + " right isPersona:" + !!(right.persona));
    if (cpTag.fandomTags && cpTag.fandomTags.length > 0) {
      userMsg += "\n\n\u2501\u2501 \u5708\u5b50/\u4e16\u754c\u4e66\u8bbe\u5b9a \u2501\u2501\n" + cpTag.fandomTags.join("\u3001");
    }
    if (summary.author_note_optional) userMsg += "\n\u4f5c\u8005\u788e\u788e\u5ff5\uff1a" + summary.author_note_optional;
    if (summary._regenerateFeedback) userMsg += "\n\n\u2501\u2501 \u8bfb\u8005\u53cd\u9988\uff08\u8bf7\u91cd\u70b9\u5173\u6ce8\uff09 \u2501\u2501\n" + summary._regenerateFeedback;

    var wordCountMin = state.settings.wordCountMin || 3000;
    var wordCountMax = state.settings.wordCountMax || 8000;
    var wordCountStr = wordCountMin + "-" + wordCountMax + "\u5b57";
    var systemPrompt = PROMPTS.layer2Full.replace("[WORD_COUNT_PLACEHOLDER]", wordCountStr);
    debugLog("L2 sysPrompt len:" + systemPrompt.length + " userMsg len:" + userMsg.length);
    summary._debugContext = { systemPrompt: systemPrompt, userMsg: userMsg, memory: null };

    var doChat = function(memText) {
      debugLog("L2 calling aiChatStream, memLen:" + (memText ? memText.length : 0));
      summary._debugContext.memory = memText || "(none)";
      aiChatStream([
        { role: "system", content: systemPrompt },
        { role: "user", content: userMsg + (memText ? "\n\n\u3010\u8fd1\u671f\u4e92\u52a8\u8bb0\u5fc6\uff08\u4ec5\u4f9b\u53c2\u8003\u7d20\u6750\uff09\u3011\n" + memText : "") }
      ], 0.8,
        function(progress) {
          var spinner = document.getElementById("hp-reader-spinner");
          var streamEl = document.getElementById("hp-reader-stream");
          if (streamEl) {
            if (spinner) spinner.style.display = "none";
            streamEl.style.display = "block";
            var cleaned = progress;
            cleaned = cleaned.replace(/<macro_chain>[\s\S]*?<\/macro_chain>/gi, "");
            cleaned = cleaned.replace(/<inline_chain>[\s\S]*?<\/inline_chain>/gi, "");
            cleaned = cleaned.replace(/<inline_check>[\s\S]*?<\/inline_check>/gi, "");
            cleaned = cleaned.replace(/<macro_cot>[\s\S]*?<\/macro_cot>/gi, "");
            cleaned = cleaned.replace(/<system_execution_directive>[\s\S]*?<\/system_execution_directive>/gi, "");
            cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, "");
            cleaned = cleaned.replace(/<[^>]+>/g, "");
            /* 提取所有文本段落 */
            var allTexts = [];
            var chapterMatch = cleaned.match(/"chapter"\s*:\s*\{[\s\S]*?"content"\s*:\s*\[([\s\S]*)/);
            if (chapterMatch) {
              var contentStr = chapterMatch[1];
              var textParts = contentStr.split(/"text"\s*:\s*"/);
              for (var pi = 1; pi < textParts.length; pi++) {
                var textPart = textParts[pi].replace(/"\s*[,}].*/, "").replace(/\\"/g, '"').replace(/\\n/g, "<br>");
                if (textPart.trim()) allTexts.push(textPart.trim());
              }
            }
            if (allTexts.length === 0 && cleaned.trim().length > 20) {
              var afterJson = cleaned.replace(/^\s*\{/, "");
              var simpleTexts = afterJson.split(/"text"\s*:\s*"/);
              for (var si = 1; si < simpleTexts.length; si++) {
                var st = simpleTexts[si].replace(/"\s*[,}].*/, "").replace(/\\"/g, '"').replace(/\\n/g, "<br>");
                if (st.trim().length > 10) allTexts.push(st.trim());
              }
            }
            /* 增量渲染：只追加新段落，避免全量替换导致闪烁 */
            var currentCount = streamEl.children.length;
            var fs = state.settings.fontSize || 16;
            for (var ai = currentCount; ai < allTexts.length; ai++) {
              var paraDiv = document.createElement("div");
              paraDiv.className = "hp-stream-para";
              paraDiv.style.cssText = "font-size:" + fs + "px;line-height:1.8;margin:8px 0;color:var(--text-primary)";
              paraDiv.textContent = allTexts[ai];
              streamEl.appendChild(paraDiv);
            }
            /* 平滑滚动到底部 */
            var contentEl = document.getElementById("hp-reader-content");
            if (contentEl) contentEl.scrollTop = contentEl.scrollHeight;
          }
        },
        function(raw) {
          debugLog("L2 stream done, raw len:" + raw.length + " first200:" + raw.substring(0, 200));
          try {
            var extractResult = stripXmlAndExtractJson(raw); var jsonStr = extractResult.json; var macroChain = extractResult.macroChain;
            if (!jsonStr) { debugLog("L2 no JSON found"); callback(null); return; }
            var data = JSON.parse(jsonStr);
            debugLog("L2 parsed OK, chapters:" + (data.chapters ? data.chapters.length : 0) + " hasContSummary:" + !!data.continuation_summary);
            if (data && data.continuation_summary) {
              summary.continuationSummary = data.continuation_summary;
            }
            if (data && data.brief_summary) {
              summary.briefSummary = data.brief_summary;
            }
            if (macroChain) summary._debugContext.macroChain = macroChain;
            callback(data);
          } catch(e) { debugLog("L2 parse error:" + e.message + " raw500:" + raw.substring(0, 500)); callback(null); }
        },
        function(e) { debugLog("L2 stream error:" + (e && e.message ? e.message : String(e))); callback(null); }
      );
    };
    var attachMem = shouldAttachMemory();
    var mountedIds = state.settings.mountedConversationIds || [];
    debugLog("L2 attachMem:" + attachMem + " mountedIds:" + JSON.stringify(mountedIds));
    if (attachMem && mountedIds.length > 0) { debugLog("L2 loading memories..."); loadMountedMemories(function(mt) { debugLog("L2 memories loaded, len:" + mt.length); doChat(mt.substring(0, 3000)); }); } else { debugLog("L2 skipping memory"); doChat(""); }
    } catch(e) { debugLog("L2 FATAL:" + e.message + " stack:" + (e.stack || "").substring(0, 300)); callback(null); }
  }

  function generateLayer3Comments(fullText, callback) {
    try {
    debugLog("L3 start, fullText len:" + fullText.length);
    aiChatStream([
      { role: "system", content: PROMPTS.layer3Comments },
      { role: "user", content: "\u4ee5\u4e0b\u662f\u540c\u4eba\u6587\u5185\u5bb9\uff0c\u8bf7\u751f\u6210\u8bc4\u8bba\uff1a\n\n" + fullText.substring(0, 3000) }
    ], 0.75,
      function(progress) { debugLog("L3 streaming... len:" + progress.length); },
      function(raw) {
        debugLog("L3 stream done, raw len:" + raw.length + " first200:" + raw.substring(0, 200));
        try {
          var extractResult = stripXmlAndExtractJson(raw); var jsonStr = extractResult.json;
            if (!jsonStr) { debugLog("L3 no JSON found"); callback([], []); return; }
          var data = JSON.parse(jsonStr);
          debugLog("L3 parsed OK, comments:" + (data.comments || []).length + " annotations:" + (data.annotations || []).length);
          callback(data.comments || [], data.annotations || []);
        } catch(e) { debugLog("L3 parse error:" + e.message + " raw500:" + raw.substring(0, 500)); callback([], []); }
      },
      function(e) { debugLog("L3 stream error:" + (e && e.message ? e.message : String(e))); callback([], []); }
    );
    } catch(e) { debugLog("L3 FATAL:" + e.message); callback([], []); }
  }

  function generateContinuation(summary, previousContent, previousSummary, callback) {
    try {
    debugLog("Cont start, title:" + (summary.title || "?"));
    var cpTag = null;
    for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === summary.cpTagId) { cpTag = state.cpTags[i]; break; } }
    if (!cpTag && summary.cpTagName) {
      for (var i2 = 0; i2 < state.cpTags.length; i2++) { if (state.cpTags[i2].name === summary.cpTagName) { cpTag = state.cpTags[i2]; break; } }
    }
    if (!cpTag) {
      debugLog("Cont cpTag not found, using fallback");
      var cpName = summary.cp || summary.cpTagName || "";
      var parts = cpName.split(/\s*[×xX]\s*/);
      cpTag = {
        id: summary.cpTagId || "fallback",
        name: cpName,
        leftSide: { id: "f1", name: parts[0] || "\u89d2\u8272A", persona: "" },
        rightSide: { id: "f2", name: parts[1] || "\u89d2\u8272B", persona: "" },
        fandomTags: []
      };
    }
    var left = cpTag.leftSide || cpTag.attackSide || {};
    var right = cpTag.rightSide || cpTag.defenseSide || {};
    debugLog("Cont cpTag found, left:" + (left.name || "?") + " right:" + (right.name || "?"));
    var wordCountMin = state.settings.wordCountMin || 3000;
    var wordCountMax = state.settings.wordCountMax || 8000;
    var wordCountStr = wordCountMin + "-" + wordCountMax + "\u5b57";
    var systemPrompt = PROMPTS.continuation.replace("[WORD_COUNT_PLACEHOLDER]", wordCountStr);
    var userMsg = ["\u8bf7\u7eed\u5199\u4ee5\u4e0b\u540c\u4eba\u6587\uff1a", "",
      "- \u6807\u9898\uff1a" + summary.title, "- CP\uff1a" + (summary.cp || summary.cpTagName || ""),
      "- \u6458\u8981\uff1a" + (summary.summary || summary.excerpt || ""), "",
      "\u2501\u2501 \u89d2\u8272\u4eba\u8bbe \u2501\u2501",
      "\u5de6\u4f4d\uff08" + (left.name || "\u672a\u77e5") + "\uff09\uff1a", left.persona || left.bio || "\u65e0\u63cf\u8ff0", "",
      "\u53f3\u4f4d\uff08" + (right.name || "\u672a\u77e5") + "\uff09\uff1a", right.persona || right.bio || "\u65e0\u63cf\u8ff0", "",
      "\u2501\u2501 \u524d\u6587\u4fe1\u606f \u2501\u2501"].join("\n");
    if (summary.author_note_optional) userMsg += "\n\u4f5c\u8005\u788e\u788e\u5ff5\uff1a" + summary.author_note_optional;
    if (previousSummary) userMsg += "\n\u524d\u6587\u6458\u8981\uff1a" + previousSummary;
    if (previousContent) userMsg += "\n\u524d\u6587\u5185\u5bb9\uff08\u6700\u540e2000\u5b57\uff09\uff1a" + previousContent.substring(Math.max(0, previousContent.length - 2000));
    if (cpTag.fandomTags && cpTag.fandomTags.length > 0) {
      userMsg += "\n\n\u2501\u2501 \u5708\u5b50/\u4e16\u754c\u4e66\u8bbe\u5b9a \u2501\u2501\n" + cpTag.fandomTags.join("\u3001");
    }
    debugLog("Cont sysPrompt len:" + systemPrompt.length + " userMsg len:" + userMsg.length);

    var doChat = function(memText) {
      debugLog("Cont calling aiChatStream, memLen:" + (memText ? memText.length : 0));
      aiChatStream([
        { role: "system", content: systemPrompt },
        { role: "user", content: userMsg + (memText ? "\n\n\u3010\u8fd1\u671f\u4e92\u52a8\u8bb0\u5fc6\uff08\u4ec5\u4f9b\u53c2\u8003\u7d20\u6750\uff09\u3011\n" + memText : "") }
      ], 0.8,
        function(progress) { debugLog("Cont streaming... len:" + progress.length); },
        function(raw) {
          debugLog("Cont stream done, raw len:" + raw.length + " first200:" + raw.substring(0, 200));
          try {
            var extractResult = stripXmlAndExtractJson(raw); var jsonStr = extractResult.json;
            if (!jsonStr) { debugLog("Cont no JSON found"); callback(null); return; }
            var data = JSON.parse(jsonStr);
            debugLog("Cont parsed OK, hasContent:" + !!(data.content || data.text));
            callback(data);
          } catch(e) { debugLog("Cont parse error:" + e.message + " raw500:" + raw.substring(0, 500)); callback(null); }
        },
        function(e) { debugLog("Cont stream error:" + (e && e.message ? e.message : String(e))); callback(null); }
      );
    };
    var attachMem = shouldAttachMemory();
    var mountedIds = state.settings.mountedConversationIds || [];
    debugLog("Cont attachMem:" + attachMem + " mountedIds:" + JSON.stringify(mountedIds));
    if (attachMem && mountedIds.length > 0) { debugLog("Cont loading memories..."); loadMountedMemories(function(mt) { debugLog("Cont memories loaded, len:" + mt.length); doChat(mt.substring(0, 3000)); }); } else { debugLog("Cont skipping memory"); doChat(""); }
    } catch(e) { debugLog("Cont FATAL:" + e.message + " stack:" + (e.stack || "").substring(0, 300)); callback(null); }
  }

  function generateExploreTags(callback) {
    try {
    debugLog("Explore start, tropeTags:" + state.tropeTags.length + " cpTags:" + state.cpTags.length + " fandomTags:" + state.fandomTags.length);
    var existingNames = [];
    for (var i = 0; i < state.tropeTags.length; i++) existingNames.push(state.tropeTags[i].name);
    for (var j = 0; j < state.cpTags.length; j++) existingNames.push(state.cpTags[j].name);
    for (var k = 0; k < state.fandomTags.length; k++) existingNames.push(state.fandomTags[k].name);
    var cpInspiration = "";
    if (state.cpTags.length > 0) {
      var sampleCount = Math.min(3, state.cpTags.length);
      var shuffledCp = state.cpTags.slice();
      for (var si = shuffledCp.length - 1; si > 0; si--) { var sj = Math.floor(Math.random() * (si + 1)); var tmp = shuffledCp[si]; shuffledCp[si] = shuffledCp[sj]; shuffledCp[sj] = tmp; }
      var sampled = shuffledCp.slice(0, sampleCount);
      var cpNames = [];
      for (var ci = 0; ci < sampled.length; ci++) cpNames.push(sampled[ci].name);
      cpInspiration = "\n\n\u7528\u6237\u5173\u6ce8\u7684CP\uff08\u53ef\u4f5c\u4e3a\u7075\u611f\u53c2\u8003\uff09\uff1a" + cpNames.join("\u3001");
    }
    var excludeList = existingNames.length > 0 ? "\n\n\u7528\u6237\u5df2\u6709\u6807\u7b7e\uff08\u7edd\u5bf9\u4e0d\u53ef\u91cd\u590d\uff09\uff1a" + existingNames.join("\u3001") : "";
    debugLog("Explore calling aiChatStream, excludeCount:" + existingNames.length);
    aiChatStream([
      { role: "system", content: PROMPTS.exploreTags },
      { role: "user", content: "\u8bf7\u751f\u6210\u540c\u4eba\u6807\u7b7e\u4f9b\u7528\u6237\u63a2\u7d22\u3002" + excludeList + cpInspiration }
    ], 0.9,
      function(progress) { debugLog("Explore streaming... len:" + progress.length); },
      function(raw) {
        debugLog("Explore stream done, raw len:" + raw.length + " first200:" + raw.substring(0, 200));
        try {
          var extractResult = stripXmlAndExtractJson(raw); var jsonStr = extractResult.json;
            if (!jsonStr) { debugLog("Explore no JSON found"); callback([]); return; }
          var data = JSON.parse(jsonStr);
          debugLog("Explore parsed OK, tags:" + (data.tags || []).length);
          callback(data.tags || []);
        } catch(e) { debugLog("Explore parse error:" + e.message + " raw500:" + raw.substring(0, 500)); callback([]); }
      },
      function(e) { debugLog("Explore stream error:" + (e && e.message ? e.message : String(e))); callback([]); }
    );
    } catch(e) { debugLog("Explore FATAL:" + e.message); callback([]); }
  }

  /* ─── CSS 样式 ─── */
  function getStyles() {
    return '.' + ROOT_CLASS + '{position:relative;width:100%;height:100%;display:flex;flex-direction:column;background:var(--bg-primary);color:var(--text-primary);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:15px;overflow:hidden;--primary:#E8A0BF;--primary-light:#F0C4D8;--primary-dark:#C084B0;--primary-gradient:linear-gradient(135deg,#E8A0BF,#C084B0,#9B7EB8);--bg-primary:#FAFAF9;--bg-card:#FFFFFF;--bg-secondary:#F5F3F1;--text-primary:#3D3340;--text-secondary:#7A6F7D;--text-hint:#B8ADB8;--like-red:#E85A6B;--comment-blue:#6BA8E8;--star-gold:#E8C46B;--glass-bg:rgba(250,249,249,0.72);--glass-blur:blur(20px);--radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:20px}' +
    '.' + ROOT_CLASS + ' *{box-sizing:border-box;margin:0;padding:0}' +
    '.' + ROOT_CLASS + ' .hp-header{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:var(--bg-primary);border-bottom:1px solid var(--bg-secondary);position:sticky;top:0;z-index:100;min-height:48px;flex-shrink:0;gap:8px}' +
    '.' + ROOT_CLASS + ' .hp-header-title{font-size:17px;font-weight:700;text-align:center;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.2}' +
    '.' + ROOT_CLASS + ' .hp-header-left,' + '.' + ROOT_CLASS + ' .hp-header-right{display:flex;align-items:center;gap:4px;flex-shrink:0}' +
    '.' + ROOT_CLASS + ' .hp-header-left:empty,' + '.' + ROOT_CLASS + ' .hp-header-right:empty{min-width:0;width:0;padding:0;gap:0}' +
    '.' + ROOT_CLASS + ' .hp-header-left:not(:empty){min-width:36px}' +
    '.' + ROOT_CLASS + ' .hp-header-right:not(:empty){min-width:36px;justify-content:flex-end}' +
    '.' + ROOT_CLASS + ' .hp-icon-btn{width:36px;height:36px;min-width:36px;min-height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;cursor:pointer;color:var(--text-primary);transition:background .2s,transform .1s;position:relative;-webkit-user-select:none;user-select:none}' +
    '.' + ROOT_CLASS + ' .hp-icon-btn:hover{background:var(--bg-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-icon-btn:active{transform:scale(.92)}' +
    '.' + ROOT_CLASS + ' .hp-icon-btn svg{width:22px;height:22px;max-width:22px;max-height:22px;flex-shrink:0}' +
    '.' + ROOT_CLASS + ' .hp-tabs{display:flex;border-bottom:1px solid var(--bg-secondary);background:var(--bg-card);position:sticky;top:0;z-index:99}' +
    '.' + ROOT_CLASS + ' .hp-tab{flex:1;text-align:center;padding:12px 0;font-size:14px;color:var(--text-secondary);cursor:pointer;position:relative;transition:color .2s}' +
    '.' + ROOT_CLASS + ' .hp-tab.active{color:var(--primary-dark);font-weight:600}' +
    '.' + ROOT_CLASS + ' .hp-tab.active::after{content:"";position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:24px;height:3px;background:var(--primary-gradient);border-radius:2px}' +
    '.' + ROOT_CLASS + ' .hp-content{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-bottom:70px;scroll-behavior:smooth}' +
    '.' + ROOT_CLASS + ' .hp-card-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px 16px}' +
    '.' + ROOT_CLASS + ' .hp-card{background:var(--bg-card);border-radius:var(--radius-md);overflow:hidden;box-shadow:0 2px 8px rgba(61,51,64,0.06);cursor:pointer;transition:transform .2s,box-shadow .2s;-webkit-user-select:none;user-select:none}' +
    '.' + ROOT_CLASS + ' .hp-card:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(232,160,191,0.15)}' +
    '.' + ROOT_CLASS + ' .hp-card:active{transform:scale(.98);transition:transform .1s}' +
    '.' + ROOT_CLASS + ' .hp-card-cover{height:110px;display:flex;align-items:flex-end;padding:10px;position:relative}' +
    '.' + ROOT_CLASS + ' .hp-card-cover::after{content:"";position:absolute;bottom:0;left:0;right:0;height:60%;background:linear-gradient(transparent,rgba(0,0,0,0.5));pointer-events:none}' +
    '.' + ROOT_CLASS + ' .hp-card-cover-title{font-size:14px;font-weight:700;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,0.3);line-height:1.3;position:relative;z-index:1}' +
    '.' + ROOT_CLASS + ' .hp-card-body{padding:10px}' +
    '.' + ROOT_CLASS + ' .hp-card-meta{display:flex;align-items:center;gap:6px;margin-bottom:4px}' +
    '.' + ROOT_CLASS + ' .hp-card-author{font-size:12px;color:var(--text-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-card-cp{font-size:11px;color:var(--primary-dark);background:var(--primary-light);padding:1px 6px;border-radius:8px;white-space:nowrap;max-width:100px;overflow:hidden;text-overflow:ellipsis}' +
    '.' + ROOT_CLASS + ' .hp-card-excerpt{font-size:13px;color:var(--text-primary);line-height:1.5;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:6px}' +
    '.' + ROOT_CLASS + ' .hp-card-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}' +
    '.' + ROOT_CLASS + ' .hp-tag{font-size:11px;padding:2px 8px;border-radius:10px;background:var(--primary-light);color:var(--primary-dark);cursor:pointer;white-space:nowrap}' +
    '.' + ROOT_CLASS + ' .hp-tag-sm{font-size:10px;padding:1px 6px;border-radius:8px;background:var(--bg-secondary);color:var(--text-secondary)}' +
    '.' + ROOT_CLASS + ' .hp-card-stats{display:flex;gap:10px;font-size:11px;color:var(--text-hint);align-items:center}' +
    '.' + ROOT_CLASS + ' .hp-card-stats span{display:flex;align-items:center;gap:2px}' +
    '.' + ROOT_CLASS + ' .hp-card-stats svg{width:12px;height:12px}' +
    '.' + ROOT_CLASS + ' .hp-card-author-note{font-size:12px;color:var(--text-secondary);font-style:italic;margin:4px 0;padding:6px 10px;background:var(--bg-secondary);border-radius:var(--radius-sm);border-left:3px solid var(--primary-light);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}' +
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
    '.' + ROOT_CLASS + ' .hp-loading-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:var(--glass-bg);backdrop-filter:var(--glass-blur);-webkit-backdrop-filter:var(--glass-blur);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:500}' +
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
    '.' + ROOT_CLASS + ' .hp-reader-author-note{position:relative;margin:0 0 20px;padding:16px 18px;background:var(--bg-secondary);border-radius:var(--radius-md);border-left:4px solid var(--primary-light)}' +
    '.' + ROOT_CLASS + ' .hp-reader-author-note-quote{position:absolute;top:-4px;left:10px;font-size:48px;color:var(--primary-light);font-family:Georgia,serif;line-height:1;opacity:0.6}' +
    '.' + ROOT_CLASS + ' .hp-reader-author-note-text{font-size:13px;color:var(--text-secondary);font-style:italic;line-height:1.8;padding-top:12px}' +
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
    '.' + ROOT_CLASS + ' .hp-search-input{width:100%;padding:10px 36px 10px 36px;border:1.5px solid var(--bg-secondary);border-radius:9999px;font-size:14px;background:var(--bg-card);color:var(--text-primary);outline:none;transition:border-color .2s}' +
    '.' + ROOT_CLASS + ' .hp-search-input:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(99,102,241,0.1)}' +
    '.' + ROOT_CLASS + ' .hp-search-wrap{position:relative}' +
    '.' + ROOT_CLASS + ' .hp-search-wrap svg{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--text-hint)}' +
    '.' + ROOT_CLASS + ' .hp-search-clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-hint);border-radius:50%;transition:background .2s}' +
    '.' + ROOT_CLASS + ' .hp-search-clear:hover{background:var(--bg-secondary);color:var(--text-primary)}' +
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
    '.' + ROOT_CLASS + '.hp-dark{--bg-primary:#1a1a1f;--bg-card:#252529;--bg-secondary:#2d2d33;--text-primary:#e8e6ea;--text-secondary:#9a95a0;--text-hint:#5c5760;--glass-bg:rgba(26,26,31,0.85)}' +
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
    /* ── 标签分类样式：CP标签 vs 梗标签 ── */
    '.' + ROOT_CLASS + ' .hp-tag-cp{display:inline-flex;align-items:center;gap:4px;padding:8px 14px;border-radius:9999px;font-size:13px;cursor:pointer;transition:all .2s;margin:4px;border:1.5px solid var(--primary-light);background:linear-gradient(135deg,rgba(232,160,191,0.08),rgba(192,132,176,0.06));color:var(--primary-dark);font-weight:500}' +
    '.' + ROOT_CLASS + ' .hp-tag-cp:hover{border-color:var(--primary);background:rgba(232,160,191,0.14);transform:translateY(-1px);box-shadow:0 2px 8px rgba(232,160,191,0.2)}' +
    '.' + ROOT_CLASS + ' .hp-tag-cp:active{transform:scale(.96)}' +
    '.' + ROOT_CLASS + ' .hp-tag-trope{display:inline-flex;align-items:center;gap:4px;padding:8px 14px;border-radius:9999px;font-size:13px;cursor:pointer;transition:all .2s;margin:4px;border:1.5px solid var(--bg-secondary);background:var(--bg-card)}' +
    '.' + ROOT_CLASS + ' .hp-tag-trope:hover{border-color:var(--primary);background:rgba(232,160,191,0.06)}' +
    '.' + ROOT_CLASS + ' .hp-tag-trope:active{transform:scale(.96)}' +
    '.' + ROOT_CLASS + ' .hp-tag-section-title{font-size:14px;font-weight:700;padding:14px 16px 6px;color:var(--primary-dark);display:flex;align-items:center;gap:6px}' +
    '.' + ROOT_CLASS + ' .hp-tag-section-title svg{width:16px;height:16px;flex-shrink:0}' +
    /* ── 流式渲染动画 ── */
    '@keyframes hpStreamFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}' +
    '.' + ROOT_CLASS + ' .hp-stream-para{animation:hpStreamFadeIn .25s ease forwards;opacity:0}' +
    /* ── 防误触保护 ── */
    '.' + ROOT_CLASS + ' .hp-touch-guard{pointer-events:none;position:absolute;top:0;left:0;right:0;bottom:0;z-index:50}' +
    '@keyframes hpSpin{to{transform:rotate(360deg)}}' +
    '@keyframes hpFadeIn{from{opacity:0}to{opacity:1}}' +
    '@keyframes hpSlideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}' +
    '@media(min-width:768px){' +
      '.' + ROOT_CLASS + ' .hp-card-grid{grid-template-columns:1fr 1fr 1fr;max-width:720px;margin:0 auto}' +
      '.' + ROOT_CLASS + ' .hp-content{max-width:960px;margin-left:auto;margin-right:auto}' +
      '.' + ROOT_CLASS + ' .hp-nav{max-width:960px;left:50%;transform:translateX(-50%);border-radius:var(--radius-lg) var(--radius-lg) 0 0}' +
      '.' + ROOT_CLASS + ' .hp-profile-grid{grid-template-columns:1fr 1fr 1fr 1fr;max-width:720px;margin:0 auto}' +
      '.' + ROOT_CLASS + ' .hp-profile-header{padding:32px 24px}' +
      '.' + ROOT_CLASS + ' .hp-profile-avatar{width:80px;height:80px;font-size:36px}' +
      '.' + ROOT_CLASS + ' .hp-select-grid{grid-template-columns:1fr 1fr 1fr;max-width:600px;margin:0 auto}' +
      '.' + ROOT_CLASS + ' .hp-explore-wrap{max-width:720px;margin:0 auto}' +
      '.' + ROOT_CLASS + ' .hp-empty{padding:80px 20px}' +
      '.' + ROOT_CLASS + ' .hp-empty svg{width:56px;height:56px}' +
      '.' + ROOT_CLASS + ' .hp-empty p{font-size:15px}' +
      '.' + ROOT_CLASS + ' .hp-list-item{padding:14px 20px}' +
    '}' +
    '@media(min-width:1024px){' +
      '.' + ROOT_CLASS + ' .hp-card-grid{grid-template-columns:1fr 1fr 1fr 1fr;max-width:960px}' +
      '.' + ROOT_CLASS + ' .hp-content{max-width:1200px}' +
      '.' + ROOT_CLASS + ' .hp-nav{max-width:1200px}' +
      '.' + ROOT_CLASS + ' .hp-profile-grid{grid-template-columns:1fr 1fr 1fr 1fr 1fr;max-width:960px}' +
    '}' +
    /* ── 移动端小屏适配 (<480px) ── */
    '@media(max-width:479px){' +
      '.' + ROOT_CLASS + ' .hp-header{padding:8px 10px;gap:4px;min-height:44px}' +
      '.' + ROOT_CLASS + ' .hp-header-title{font-size:15px}' +
      '.' + ROOT_CLASS + ' .hp-icon-btn{width:32px;height:32px;min-width:32px;min-height:32px}' +
      '.' + ROOT_CLASS + ' .hp-icon-btn svg{width:20px;height:20px;max-width:20px;max-height:20px}' +
      '.' + ROOT_CLASS + ' .hp-nav-item svg{width:20px;height:20px}' +
      '.' + ROOT_CLASS + ' .hp-nav-publish{width:40px;height:40px}' +
      '.' + ROOT_CLASS + ' .hp-nav-publish svg{width:22px;height:22px}' +
      '.' + ROOT_CLASS + ' .hp-card-cover{height:100px}' +
      '.' + ROOT_CLASS + ' .hp-card-body{padding:8px}' +
      '.' + ROOT_CLASS + ' .hp-card-excerpt{font-size:12px;-webkit-line-clamp:2}' +
      '.' + ROOT_CLASS + ' .hp-tag-cp,.hp-tag-trope{padding:6px 12px;font-size:12px;margin:3px}' +
      '.' + ROOT_CLASS + ' .hp-tag-section-title{font-size:13px;padding:12px 12px 4px}' +
      '.' + ROOT_CLASS + ' .hp-reader-text{font-size:15px !important;line-height:1.9}' +
      '.' + ROOT_CLASS + ' .hp-action-btn svg{width:18px;height:18px}' +
      '.' + ROOT_CLASS + ' .hp-action-btn{padding:3px 8px;font-size:10px}' +
      '.' + ROOT_CLASS + ' .hp-refresh-bar{padding:10px 12px;font-size:12px}' +
      '.' + ROOT_CLASS + ' .hp-explore-tag{padding:6px 12px;font-size:12px;margin:3px}' +
      '.' + ROOT_CLASS + ' .hp-profile-avatar{width:56px;height:56px;font-size:24px}' +
      '.' + ROOT_CLASS + ' .hp-profile-name{font-size:16px}' +
    '}';
  }

  /* ─── 摘要卡片创建 ─── */
  function createSummaryCard(summary) {
    var card = document.createElement("div");
    card.className = "hp-card";
    var authorName = summary.author || randomAuthorName();
    var cpName = summary.cp || summary.cpTagName || "";
    var cpTagId = summary.cpTagId || "";
    var excerpt = summary.summary || summary.excerpt || "";
    var warnings = summary.warnings || [];
    var tropeTags = summary.tags || summary.tropeTags || [];
    var authorNote = summary.author_note_optional || "";
    var likes = summary.likes || randomInt(50, 5000);
    var comments = summary.comments || randomInt(5, 200);
    var words = summary.words || randomInt(1000, 8000) + "";
    var timeAgo = summary.timeAgo || randomInt(1, 48) + "\u5c0f\u65f6\u524d";

    var warningHtml = "";
    for (var w = 0; w < warnings.length; w++) {
      warningHtml += '<span class="hp-tag hp-tag-sm" style="background:#fff0f0;color:#c44">' + escapeHtml(warnings[w]) + '</span>';
    }
    var tropeHtml = "";
    for (var t = 0; t < tropeTags.length; t++) {
      var tropeName = typeof tropeTags[t] === "string" ? tropeTags[t] : (tropeTags[t].name || "");
      if (!tropeName) continue;
      var tropeId = "";
      for (var tti = 0; tti < state.tropeTags.length; tti++) { if (state.tropeTags[tti].name === tropeName) { tropeId = state.tropeTags[tti].id; break; } }
      if (!tropeId) {
        if (state.settings.autoFollowTropeTags) {
          var newTrope = {id:generateId(), name:tropeName, description:"", createdBy:"auto"};
          state.tropeTags.push(newTrope);
          saveTropeTags(state.tropeTags);
          tropeId = newTrope.id;
        } else {
          tropeId = "unfollowed-" + tropeName;
        }
      }
      tropeHtml += '<span class="hp-tag hp-tag-sm" onclick="event.stopPropagation();window.__hofter.handleTagClick(\'' + tropeId + '\', \'trope\')">' + escapeHtml(tropeName) + '</span>';
    }

    var heartIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    var commentIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

    card.innerHTML =
      '<div class="hp-card-cover" style="background:' + (summary.coverGradient || randomGradient()) + '">' +
        '<div class="hp-card-cover-title">' + escapeHtml(summary.title || "\u65e0\u6807\u9898") + '</div>' +
      '</div>' +
      '<div class="hp-card-body">' +
        '<div class="hp-card-meta">' +
          '<span class="hp-card-author">' + escapeHtml(authorName) + '</span>' +
          (cpName ? '<span class="hp-card-cp" onclick="event.stopPropagation();window.__hofter.handleTagClick(\'' + escapeHtml(cpTagId) + '\', \'cp\')">' + escapeHtml(cpName) + '</span>' : '') +
        '</div>' +
        '<div class="hp-card-excerpt">' + escapeHtml(excerpt) + '</div>' +
        (warningHtml ? '<div class="hp-card-tags">' + warningHtml + '</div>' : '') +
        (tropeHtml ? '<div class="hp-card-tags">' + tropeHtml + '</div>' : '') +
        (authorNote ? '<div class="hp-card-author-note">\u201c' + escapeHtml(authorNote) + '\u201d</div>' : '') +
        '<div class="hp-card-stats">' +
          '<span>' + heartIcon + likes + '</span>' +
          '<span>' + commentIcon + comments + '</span>' +
          (words ? '<span>' + words + '\u5b57</span>' : '') +
          '<span>' + escapeHtml(timeAgo) + '</span>' +
        '</div>' +
      '</div>';
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
    state.eventListeners = [];
    var needRefresh = false;
    if (state.currentPage === "home" && state.homeTab === "follow") needRefresh = true;
    else if (state.currentPage === "discover" && (state.discoverTab === "recommend" || state.discoverTab === "explore")) needRefresh = true;
    else if (state.currentPage === "tagPage") needRefresh = true;
    if (needRefresh) initPullToRefresh(content);
  }

  function renderHeaderContent(header) {
    var leftHtml = "", title = "", rightHtml = "";
    if (state.currentPage === "home") { title = '<span ondblclick="window.__hofter.toggleDebug()">hofter</span>'; rightHtml = '<div class="hp-icon-btn" onclick="window.__hofter.showMessages()">' + ICONS.bell + '</div><div class="hp-icon-btn" onclick="window.__hofter.closeApp()">' + ICONS.close + '</div>'; }
    else if (state.currentPage === "discover") { title = "\u53d1\u73b0"; }
    else if (state.currentPage === "collection") { title = "\u6536\u85cf"; }
    else if (state.currentPage === "profile") { title = "\u6211\u7684"; rightHtml = '<div class="hp-icon-btn" onclick="window.__hofter.showSettings()">' + ICONS.settings + '</div>'; }
    else if (state.currentPage === "tagPage") { title = state.currentTagPage ? state.currentTagPage.name : ""; leftHtml = '<div class="hp-icon-btn" onclick="window.__hofter.goBackFromTag()">' + ICONS.back + '</div>'; }
    var titleHtml = (state.currentPage === "home") ? title : escapeHtml(title);
    header.innerHTML = '<div class="hp-header-left">' + leftHtml + '</div><div class="hp-header-title">' + titleHtml + '</div><div class="hp-header-right">' + rightHtml + '</div>';
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
  var PAGE_SIZE = 20;
  function loadMoreSummaries(grid) {
    if (!grid || state._homeAllLoaded) return;
    var start = state._homePageEnd || 0;
    var end = Math.min(start + PAGE_SIZE, state.summaries.length);
    for (var i = start; i < end; i++) grid.appendChild(createSummaryCard(state.summaries[i]));
    state._homePageEnd = end;
    state._homeAllLoaded = end >= state.summaries.length;
    var moreBtn = document.getElementById("hp-load-more");
    if (state._homeAllLoaded && moreBtn) moreBtn.remove();
  }
  function renderHomePage(container) {
    var tabs = document.createElement("div"); tabs.className = "hp-tabs";
    tabs.innerHTML = '<div class="hp-tab ' + (state.homeTab==="follow"?"active":"") + '" onclick="window.__hofter.switchHomeTab(\'follow\')">\u5173\u6ce8</div><div class="hp-tab ' + (state.homeTab==="subscribe"?"active":"") + '" onclick="window.__hofter.switchHomeTab(\'subscribe\')">\u8ba2\u9605</div>';
    container.appendChild(tabs);
    if (state.homeTab === "follow") {
      if (state.summaries.length === 0) { container.innerHTML += '<div class="hp-empty">' + ICONS.refresh + '<p>\u4e0b\u62c9\u5237\u65b0\u83b7\u53d6\u540c\u4eba\u6587\u63a8\u8350</p></div>'; return; }
      var grid = document.createElement("div"); grid.className = "hp-card-grid";
      var displayCount = Math.min(state.summaries.length, PAGE_SIZE);
      state._homePageEnd = displayCount;
      state._homeAllLoaded = displayCount >= state.summaries.length;
      for (var i = 0; i < displayCount; i++) grid.appendChild(createSummaryCard(state.summaries[i]));
      container.appendChild(grid);
      if (!state._homeAllLoaded) {
        var moreBtn = document.createElement("div");
        moreBtn.id = "hp-load-more";
        moreBtn.style.cssText = "text-align:center;padding:16px;color:var(--text-hint);font-size:13px;cursor:pointer";
        moreBtn.textContent = "\u52a0\u8f7d\u66f4\u591a...";
        moreBtn.onclick = function() { loadMoreSummaries(grid); };
        container.appendChild(moreBtn);
      }
      var totalInfo = document.createElement("div");
      totalInfo.style.cssText = "text-align:center;padding:8px;color:var(--text-hint);font-size:11px";
      totalInfo.textContent = "\u5171 " + state.summaries.length + " \u7bc7";
      container.appendChild(totalInfo);
    } else {
      var readSummaries = [];
      for (var ri = 0; ri < state.summaries.length; ri++) {
        if (state.summaries[ri].fullContent) readSummaries.push(state.summaries[ri]);
      }
      if (readSummaries.length === 0) {
        container.innerHTML += '<div class="hp-empty"><p>\u8fd8\u6ca1\u6709\u9605\u8bfb\u8fc7\u7684\u4f5c\u54c1</p><p style="font-size:12px;color:var(--text-hint)">\u70b9\u51fb\u6458\u8981\u5361\u7247\u751f\u6210\u5e76\u9605\u8bfb\u6b63\u6587\u540e\uff0c\u4f1a\u81ea\u52a8\u4fdd\u5b58\u5728\u8fd9\u91cc</p></div>';
      } else {
        var readGrid = document.createElement("div"); readGrid.className = "hp-card-grid";
        for (var rj = 0; rj < readSummaries.length; rj++) readGrid.appendChild(createSummaryCard(readSummaries[rj]));
        container.appendChild(readGrid);
        var readInfo = document.createElement("div");
        readInfo.style.cssText = "text-align:center;padding:8px;color:var(--text-hint);font-size:11px";
        readInfo.textContent = "\u5171 " + readSummaries.length + " \u7bc7\u5df2\u9605\u8bfb";
        container.appendChild(readInfo);
      }
      var sec = document.createElement("div");
      sec.innerHTML = '<div class="hp-section-title">\u6211\u7684CP</div>';
      var cpList = document.createElement("div"); cpList.className = "hp-tag-list";
      for (var j = 0; j < state.cpTags.length; j++) {
        var tag = state.cpTags[j];
        var tagEl = document.createElement("div"); tagEl.className = "hp-tag-item";
        tagEl.innerHTML = '<span onclick="window.__hofter.handleTagClick(\'' + tag.id + '\', \'cp\')">' + escapeHtml(tag.name) + '</span><span class="hp-tag-remove" onclick="event.stopPropagation();window.__hofter.removeCpTag(\'' + tag.id + '\')">' + ICONS.close.replace(/24/g,"14") + '</span>';
        cpList.appendChild(tagEl);
      }
      sec.appendChild(cpList);
      sec.innerHTML += '<div class="hp-section-title">\u6211\u7684\u8bbe\u5b9a\u6807\u7b7e</div>';
      var trList = document.createElement("div"); trList.className = "hp-tag-list";
      for (var k = 0; k < state.tropeTags.length; k++) {
        var tTag = state.tropeTags[k];
        var tEl = document.createElement("div"); tEl.className = "hp-tag-item";
        tEl.innerHTML = '<span onclick="window.__hofter.handleTagClick(\'' + tTag.id + '\', \'trope\')">' + escapeHtml(tTag.name) + '</span><span class="hp-tag-remove" onclick="event.stopPropagation();window.__hofter.removeTropeTag(\'' + tTag.id + '\')">' + ICONS.close.replace(/24/g,"14") + '</span>';
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
    /* ── 搜索框：所有tab都可见 ── */
    var searchBox = document.createElement("div"); searchBox.className = "hp-search-box";
    searchBox.innerHTML = '<div class="hp-search-wrap">' + ICONS.search + '<input id="hp-discover-search-input" class="hp-search-input" placeholder="\u641c\u7d22\u89d2\u8272\u3001\u6807\u7b7e\u3001\u4f5c\u54c1..." oninput="window.__hofter.handleSearch(this.value)" onfocus="window.__hofter.onSearchFocus()" onblur="window.__hofter.onSearchBlur()"><div class="hp-search-clear" id="hp-search-clear" onclick="window.__hofter.clearSearch()" style="display:none">' + ICONS.close.replace(/24/g,"16") + '</div></div>';
    container.appendChild(searchBox);
    var searchResults = document.createElement("div"); searchResults.className = "hp-search-results"; searchResults.id = "hp-search-results";
    container.appendChild(searchResults);
    var discoverContent = document.createElement("div"); discoverContent.id = "hp-discover-content";
    container.appendChild(discoverContent);
    renderDiscoverTabContent(discoverContent);
  }

  function renderDiscoverTabContent(container) {
    container.innerHTML = "";
    if (state.discoverTab === "recommend") {
      var banner = document.createElement("div"); banner.className = "hp-banner"; banner.innerHTML = '<h3>\u53d1\u73b0\u65b0\u7684\u540c\u4eba\u6545\u4e8b</h3><p>\u5728\u8fd9\u91cc\u63a2\u7d22\u4f60\u559c\u6b22\u7684\u89d2\u8272\u548c\u4e16\u754c</p>';
      container.appendChild(banner);
      var secTitle = document.createElement("div"); secTitle.className = "hp-section-title"; secTitle.textContent = "\u5206\u7c7b\u9891\u9053";
      container.appendChild(secTitle);
      var chRow = document.createElement("div"); chRow.className = "hp-channel-row";
      var chNames = ["\u6e29\u99a8\u65e5\u5e38","\u8650\u5fc3\u5267\u60c5","\u641e\u7b11\u6c99\u96d5","\u60ac\u7591\u63a8\u7406","\u70ed\u8840\u6218\u6597","\u6d6a\u6f2b\u552f\u7f8e","ABO","\u6821\u56edAU","\u8d5b\u535a\u670b\u514b"];
      for (var i = 0; i < chNames.length; i++) { var ch = document.createElement("div"); ch.className = "hp-channel-item"; ch.textContent = chNames[i]; chRow.appendChild(ch); }
      container.appendChild(chRow);
      if (state.summaries.length > 0) {
        var recTitle = document.createElement("div"); recTitle.className = "hp-section-title"; recTitle.textContent = "\u63a8\u8350\u9605\u8bfb";
        container.appendChild(recTitle);
        var grid = document.createElement("div"); grid.className = "hp-card-grid";
        for (var j = 0; j < Math.min(state.summaries.length, 6); j++) grid.appendChild(createSummaryCard(state.summaries[j]));
        container.appendChild(grid);
      }
    } else if (state.discoverTab === "hot") {
      /* ── 热门标签：CP标签与梗标签分离展示 ── */
      if (state.cpTags.length > 0) {
        var cpSecTitle = document.createElement("div"); cpSecTitle.className = "hp-tag-section-title"; cpSecTitle.innerHTML = ICONS.trending.replace(/24/g,"16") + ' CP\u6807\u7b7e';
        container.appendChild(cpSecTitle);
        var cpTagList = document.createElement("div"); cpTagList.className = "hp-tag-list";
        for (var ci = 0; ci < state.cpTags.length; ci++) {
          var cpTag = state.cpTags[ci];
          var cpEl = document.createElement("div"); cpEl.className = "hp-tag-cp";
          cpEl.innerHTML = ICONS.sparkle.replace(/24/g,"14") + '<span>' + escapeHtml(cpTag.name) + '</span>';
          cpEl.onclick = (function(tid){ return function(){ window.__hofter.openCpTagPage(tid); }; })(cpTag.id);
          cpTagList.appendChild(cpEl);
        }
        container.appendChild(cpTagList);
      }
      if (state.tropeTags.length > 0) {
        var trSecTitle = document.createElement("div"); trSecTitle.className = "hp-tag-section-title"; trSecTitle.innerHTML = ICONS.tag.replace(/24/g,"16") + ' \u6897\u6807\u7b7e';
        container.appendChild(trSecTitle);
        var trTagList = document.createElement("div"); trTagList.className = "hp-tag-list";
        for (var ti = 0; ti < state.tropeTags.length; ti++) {
          var trTag = state.tropeTags[ti];
          var trEl = document.createElement("div"); trEl.className = "hp-tag-trope";
          trEl.innerHTML = '<span>' + escapeHtml(trTag.name) + '</span>';
          trEl.onclick = (function(tid){ return function(){ window.__hofter.openTropeTagPage(tid); }; })(trTag.id);
          trTagList.appendChild(trEl);
        }
        container.appendChild(trTagList);
      }
      if (state.cpTags.length === 0 && state.tropeTags.length === 0) {
        container.innerHTML += '<div class="hp-empty">' + ICONS.tag + '<p>\u8fd8\u6ca1\u6709\u6807\u7b7e\uff0c\u53bb\u6807\u7b7e\u63a2\u7d22\u53d1\u73b0\u65b0\u6807\u7b7e</p></div>';
      }
    } else if (state.discoverTab === "explore") {
      renderExploreTab(container);
    }
  }

  function renderExploreTab(container) {
    container.innerHTML += '<div class="hp-pull-indicator" id="hp-explore-hint">\u70b9\u51fb\u4e0b\u65b9\u6309\u94ae\u63a2\u7d22\u65b0\u6807\u7b7e</div>';
    container.innerHTML += '<div style="display:flex;align-items:center;justify-content:space-between;padding:0 20px"><div class="hp-refresh-bar" onclick="window.__hofter.loadExploreTags()" style="flex:1">' + ICONS.sparkle.replace(/24/g,"16") + ' <span>\u63a2\u7d22\u65b0\u6807\u7b7e</span></div><div class="hp-icon-btn" onclick="window.__hofter.loadExploreTags()" style="width:32px;height:32px">' + ICONS.refresh.replace(/24/g,"18") + '</div></div>';
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
    var emptyIcon = state.collectionTab === "favorites" ? ICONS.bookmark : state.collectionTab === "history" ? ICONS.clock : ICONS.star;
    var emptyText = state.collectionTab === "favorites" ? "\u8fd8\u6ca1\u6709\u6536\u85cf\uff0c\u53bb\u53d1\u73b0\u559c\u6b22\u7684\u540c\u4eba\u6587\u5427" : state.collectionTab === "history" ? "\u8fd8\u6ca1\u6709\u9605\u8bfb\u8bb0\u5f55" : "\u8fd8\u6ca1\u6709\u7a0d\u540e\u8bfb\u5185\u5bb9";
    if (data.length === 0) { container.innerHTML += '<div class="hp-empty">' + emptyIcon + '<p>' + emptyText + '</p></div>'; return; }
    var grid = document.createElement("div"); grid.className = "hp-card-grid";
    for (var i = 0; i < data.length; i++) { var item = data[i]; if (item && item.title) grid.appendChild(createSummaryCard(item)); }
    container.appendChild(grid);
  }

  /* ─── 我的页 ─── */
  function renderProfilePage(container) {
    var persona = state.activePersona;
    var dName = persona ? (persona.handle || persona.name || "\u672a\u77e5") : "\u672a\u77e5";
    var dAvatar = persona && persona.avatar ? '<img src="' + persona.avatar + '">' : dName[0];
    var headerDiv = document.createElement("div"); headerDiv.className = "hp-profile-header";
    headerDiv.innerHTML = '<div class="hp-profile-avatar" onclick="window.__hofter.showPersonaSwitcher()">' + dAvatar + '</div><div class="hp-profile-name">' + escapeHtml(dName) + '</div><div class="hp-profile-stats"><span><strong>' + state.publishedWorks.length + '</strong>\u53d1\u5e03</span><span><strong>' + state.favorites.length + '</strong>\u6536\u85cf</span><span><strong>' + state.readLater.length + '</strong>\u7a0d\u540e\u8bfb</span></div>';
    container.appendChild(headerDiv);
    var tabs = document.createElement("div"); tabs.className = "hp-tabs";
    tabs.innerHTML = '<div class="hp-tab ' + (state.profileTab==="works"?"active":"") + '" onclick="window.__hofter.switchProfileTab(\'works\')">\u4f5c\u54c1</div><div class="hp-tab ' + (state.profileTab==="fav"?"active":"") + '" onclick="window.__hofter.switchProfileTab(\'fav\')">\u6536\u85cf</div><div class="hp-tab ' + (state.profileTab==="col"?"active":"") + '" onclick="window.__hofter.switchProfileTab(\'col\')">\u5408\u96c6</div>';
    container.appendChild(tabs);
    if (state.profileTab === "works" && state.publishedWorks.length > 0) {
      var grid = document.createElement("div"); grid.className = "hp-profile-grid";
      for (var i = 0; i < state.publishedWorks.length; i++) { var w = state.publishedWorks[i]; var item = document.createElement("div"); item.className = "hp-profile-grid-item"; item.style.background = randomGradient(); item.innerHTML = '<div style="padding:10px;color:#fff;font-size:12px;font-weight:600">' + escapeHtml(w.title) + '</div>'; item.onclick = (function(wid) { return function() { window.__hofter.openReader(wid, true); }; })(w.id); grid.appendChild(item); }
      container.appendChild(grid);
    } else {
      var emptyDiv = document.createElement("div"); emptyDiv.className = "hp-empty"; emptyDiv.innerHTML = ICONS.fileText + '<p>\u6682\u65e0\u5185\u5bb9</p>';
      container.appendChild(emptyDiv);
    }
    var menuItems = [{icon:ICONS.switchIcon,name:"\u5207\u6362\u8eab\u4efd",act:"showPersonaSwitcher"},{icon:ICONS.settings,name:"\u8bbe\u7f6e",act:"showSettings"},{icon:ICONS.tag,name:"\u7ba1\u7406\u6807\u7b7e",act:"showTagManager"}];
    for (var m = 0; m < menuItems.length; m++) { var mi = menuItems[m]; var menuEl = document.createElement("div"); menuEl.className = "hp-menu-item"; menuEl.setAttribute("data-act", mi.act); menuEl.innerHTML = mi.icon + '<span>' + mi.name + '</span>' + ICONS.chevronRight.replace(/24/g,"16").replace("currentColor","var(--text-hint)"); menuEl.onclick = (function(act) { return function() { window.__hofter[act](); }; })(mi.act); container.appendChild(menuEl); }
  }

  /* ─── Tag 专属页（CP标签 / 梗标签 分离逻辑） ─── */
  var _tagPageType = ""; /* "cp" | "trope" */
  var _tagClickTimer = null;

  function renderTagPage(container) {
    var tag = state.currentTagPage; if (!tag) return;
    /* 判断标签类型 */
    _tagPageType = "trope";
    for (var ci = 0; ci < state.cpTags.length; ci++) { if (state.cpTags[ci].id === tag.id) { _tagPageType = "cp"; break; } }

    container.innerHTML = "";
    var headerInfo = document.createElement("div");
    headerInfo.className = "hp-tag-section-title";
    headerInfo.style.padding = "16px 16px 8px";
    headerInfo.style.fontSize = "15px";
    var typeLabel = _tagPageType === "cp" ? "CP\u6807\u7b7e" : "\u6897\u6807\u7b7e";
    headerInfo.innerHTML = escapeHtml(tag.name) + ' <span style="font-size:12px;font-weight:400;color:var(--text-hint)">(' + typeLabel + ')</span>';
    container.appendChild(headerInfo);

    if (_tagPageType === "cp") {
      /* CP标签规则：显示该CP相关内容 + 随机若干梗内容 */
      var cpItems = [];
      for (var si = 0; si < state.summaries.length; si++) {
        if (state.summaries[si].cpTagId === tag.id) cpItems.push(state.summaries[si]);
      }
      if (cpItems.length > 0) {
        var grid = document.createElement("div"); grid.className = "hp-card-grid"; grid.id = "hp-tag-grid";
        for (var gi = 0; gi < cpItems.length; gi++) grid.appendChild(createSummaryCard(cpItems[gi]));
        container.appendChild(grid);
      }
      /* 随机抽取含梗tag的摘要作为补充展示 */
      var extraItems = [];
      var shuffled = state.summaries.slice();
      for (var ri = shuffled.length - 1; ri > 0; ri--) { var rj = Math.floor(Math.random() * (ri + 1)); var tmp = shuffled[ri]; shuffled[ri] = shuffled[rj]; shuffled[rj] = tmp; }
      for (var ei = 0; ei < shuffled.length && extraItems.length < 3; ei++) {
        if (shuffled[ei].cpTagId !== tag.id && shuffled[ei].tags && shuffled[ei].tags.length > 0) extraItems.push(shuffled[ei]);
      }
      if (extraItems.length > 0) {
        container.innerHTML += '<div class="hp-tag-section-title" style="font-size:13px;color:var(--text-hint)">\u63a8\u8350\u6897\u6587</div>';
        var exGrid = document.createElement("div"); exGrid.className = "hp-card-grid";
        for (var exi = 0; exi < extraItems.length; exi++) exGrid.appendChild(createSummaryCard(extraItems[exi]));
        container.appendChild(exGrid);
      }
      if (cpItems.length === 0 && extraItems.length === 0) {
        container.innerHTML += '<div class="hp-empty">' + ICONS.refresh + '<p>\u4e0b\u62c9\u5237\u65b0\u751f\u6210 ' + escapeHtml(tag.name) + ' \u540c\u4eba\u6587</p></div>';
      }
    } else {
      /* 梗标签规则：显示包含该梗的内容 + 随机不超过5个CP内容 */
      var trItems = [];
      var tagName = tag.name;
      for (var si2 = 0; si2 < state.summaries.length; si2++) {
        var s = state.summaries[si2];
        var stags = s.tags || [];
        var hasTag = false;
        for (var ti = 0; ti < stags.length; ti++) { if (stags[ti] === tagName) { hasTag = true; break; } }
        if (!hasTag && s.tropeTags) { for (var ti2 = 0; ti2 < s.tropeTags.length; ti2++) { if (s.tropeTags[ti2] === tagName) { hasTag = true; break; } } }
        if (hasTag) trItems.push(s);
      }
      if (trItems.length > 0) {
        var trGrid = document.createElement("div"); trGrid.className = "hp-card-grid"; trGrid.id = "hp-tag-grid";
        for (var tgi = 0; tgi < trItems.length; tgi++) trGrid.appendChild(createSummaryCard(trItems[tgi]));
        container.appendChild(trGrid);
      }
      /* 随机不超过5个CP的摘要 */
      var cpExtra = [];
      var cpShuffle = state.summaries.slice();
      for (var ci2 = cpShuffle.length - 1; ci2 > 0; ci2--) { var cj = Math.floor(Math.random() * (ci2 + 1)); var ctmp = cpShuffle[ci2]; cpShuffle[ci2] = cpShuffle[cj]; cpShuffle[cj] = ctmp; }
      for (var cei = 0; cei < cpShuffle.length && cpExtra.length < 5; cei++) {
        var cs = cpShuffle[cei];
        var cHasTag = false;
        var cstags = cs.tags || [];
        for (var cti = 0; cti < cstags.length; cti++) { if (cstags[cti] === tagName) { cHasTag = true; break; } }
        if (!cHasTag && cs.cpTagId) cpExtra.push(cs);
      }
      if (cpExtra.length > 0) {
        container.innerHTML += '<div class="hp-tag-section-title" style="font-size:13px;color:var(--text-hint)">\u76f8\u5173CP\u63a8\u8350</div>';
        var ceGrid = document.createElement("div"); ceGrid.className = "hp-card-grid";
        for (var cei2 = 0; cei2 < cpExtra.length; cei2++) ceGrid.appendChild(createSummaryCard(cpExtra[cei2]));
        container.appendChild(ceGrid);
      }
      if (trItems.length === 0 && cpExtra.length === 0) {
        container.innerHTML += '<div class="hp-empty">' + ICONS.tag.replace(/24/g,"36").replace("currentColor","var(--text-hint)") + '<p>\u6682\u65e0\u5305\u542b\u6b64\u6807\u7b7e\u7684\u540c\u4eba\u6587</p><p style="font-size:13px;color:var(--text-hint)">\u5237\u65b0\u9996\u9875\u83b7\u53d6\u66f4\u591a\u5185\u5bb9</p></div>';
      }
    }

  }

  /* 防误触：快速连续点击保护 */
  function guardedTagAction(fn) {
    if (_tagClickTimer) return;
    fn();
    _tagClickTimer = setTimeout(function() { _tagClickTimer = null; }, 300);
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
      header.innerHTML = '<h1>\u786e\u8ba4CP\u914d\u5bf9</h1><p>\u9009\u62e9\u5de6\u53f3\u4f4d\u987a\u5e8f\uff08A\u00d7B\uff0cA=\u5de6\u4f4d\uff0cB=\u53f3\u4f4d\uff09</p>';
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
  var _lastRefreshTime = 0;
  function initPullToRefresh(el) {
    var startY = 0, pulling = false, currentDiff = 0;
    var pullIndicator = null;
    var THRESHOLD = 120;
    var MAX_PULL = 160;
    var COOLDOWN = 3000;
    function createIndicator() {
      if (pullIndicator) return;
      pullIndicator = document.createElement("div");
      pullIndicator.id = "hp-pull-indicator";
      pullIndicator.style.cssText = "text-align:center;padding:12px 0;color:var(--text-hint);font-size:13px;transition:opacity .2s;opacity:0;";
      pullIndicator.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;transition:transform .3s"><path d="M12 5v14M5 12l7 7 7-7"/></svg><span>\u4e0b\u62c9\u5237\u65b0</span>';
      el.insertBefore(pullIndicator, el.firstChild);
    }
    function removeIndicator() {
      if (pullIndicator) { pullIndicator.remove(); pullIndicator = null; }
    }
    function updateIndicator(diff) {
      if (!pullIndicator) return;
      var progress = Math.min(diff / THRESHOLD, 1);
      pullIndicator.style.opacity = String(Math.min(progress * 1.5, 1));
      var arrow = pullIndicator.querySelector("svg");
      if (arrow) arrow.style.transform = "rotate(" + (progress * 180) + "deg)";
      var text = pullIndicator.querySelector("span");
      if (text) text.textContent = diff >= THRESHOLD ? "\u91ca\u653e\u5237\u65b0" : "\u4e0b\u62c9\u5237\u65b0";
    }
    function onTS(e) {
      if (el.scrollTop > 15 || state.isLoading || Date.now() - _lastRefreshTime < COOLDOWN) return;
      startY = e.touches[0].clientY;
      pulling = true;
      currentDiff = 0;
      createIndicator();
    }
    function onTM(e) {
      if (!pulling) return;
      var diff = e.touches[0].clientY - startY;
      if (diff < 0) { currentDiff = 0; removeIndicator(); return; }
      currentDiff = Math.min(diff * 0.5, MAX_PULL);
      if (currentDiff > 5) {
        el.style.transform = "translateY(" + currentDiff + "px)";
        el.style.transition = "none";
        updateIndicator(currentDiff * 2);
      }
    }
    function onTE(e) {
      if (!pulling) return;
      pulling = false;
      el.style.transition = "transform .3s ease";
      el.style.transform = "";
      if (currentDiff * 2 >= THRESHOLD && el.scrollTop === 0) {
        if (pullIndicator) {
          var text = pullIndicator.querySelector("span");
          if (text) text.textContent = "\u5237\u65b0\u4e2d...";
          var arrow = pullIndicator.querySelector("svg");
          if (arrow) arrow.style.animation = "hpSpin .8s linear infinite";
        }
        doRefresh();
        setTimeout(removeIndicator, 1500);
      } else {
        removeIndicator();
      }
      currentDiff = 0;
    }
    el.addEventListener("touchstart", onTS, {passive:true});
    el.addEventListener("touchmove", onTM, {passive:false});
    el.addEventListener("touchend", onTE, {passive:true});
    state.eventListeners.push({el:el,type:"touchstart",fn:onTS},{el:el,type:"touchmove",fn:onTM},{el:el,type:"touchend",fn:onTE});
    var mStartY = 0, mPulling = false, mDiff = 0;
    function onMD(e) { if (el.scrollTop > 15 || state.isLoading || Date.now() - _lastRefreshTime < COOLDOWN) return; mStartY = e.clientY; mPulling = true; createIndicator(); }
    function onMM(e) {
      if (!mPulling) return;
      mDiff = Math.min((e.clientY - mStartY) * 0.5, MAX_PULL);
      if (mDiff > 5) { el.style.transform = "translateY(" + mDiff + "px)"; el.style.transition = "none"; updateIndicator(mDiff * 2); }
    }
    function onMU(e) {
      if (!mPulling) return;
      mPulling = false;
      el.style.transition = "transform .3s ease";
      el.style.transform = "";
      if (mDiff * 2 >= THRESHOLD && el.scrollTop === 0) {
        if (pullIndicator) { var t = pullIndicator.querySelector("span"); if (t) t.textContent = "\u5237\u65b0\u4e2d..."; }
        doRefresh();
        setTimeout(removeIndicator, 1500);
      } else { removeIndicator(); }
      mDiff = 0;
    }
    el.addEventListener("mousedown", onMD);
    el.addEventListener("mousemove", onMM);
    el.addEventListener("mouseup", onMU);
    state.eventListeners.push({el:el,type:"mousedown",fn:onMD},{el:el,type:"mousemove",fn:onMM},{el:el,type:"mouseup",fn:onMU});
  }

  function doRefresh() {
    if (state.isLoading) return; _lastRefreshTime = Date.now(); debugLog("doRefresh start"); showLoading();
    var lockTag = state.currentTagPage || null;
    var timeout = setTimeout(function() { hideLoading(); showToast("\u751f\u6210\u8d85\u65f6\uff0c\u8bf7\u91cd\u8bd5"); }, 120000);
    generateLayer1Summaries(lockTag, function(summaries) {
      clearTimeout(timeout);
      hideLoading();
      if (summaries && summaries.length > 0) {
        for (var i = 0; i < summaries.length; i++) summaries[i].id = summaries[i].id || generateId();
        var newIds = {};
        for (var j = 0; j < summaries.length; j++) newIds[summaries[j].id] = true;
        var existing = [];
        for (var k = 0; k < state.summaries.length; k++) {
          if (!newIds[state.summaries[k].id]) existing.push(state.summaries[k]);
        }
        /* 追加到顶部：新内容在前，旧内容在后 */
        state.summaries = summaries.concat(existing);
        saveSummariesCache(state.summaries);
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
    header.innerHTML = '<div class="hp-header-left"><div class="hp-icon-btn" onclick="window.__hofter.closeSheet(\'create-page\')">' + ICONS.back + '</div></div><div class="hp-header-title">' + (mode==="inspire"? "\u7075\u611f\u521b\u4f5c" : mode==="write"? "\u5199\u6587\u7ae0" : "\u53d1\u52a8\u6001") + '</div><div class="hp-header-right"><div class="hp-icon-btn" onclick="window.__hofter.submitCreate(\'' + mode + '\')">' + ICONS.check + '</div></div>';
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
    header.innerHTML = '<div class="hp-header-left"><div class="hp-icon-btn" onclick="window.__hofter.closeSheet(\'settings-page\')">' + ICONS.back + '</div></div><div class="hp-header-title">\u8bbe\u7f6e</div><div class="hp-header-right"></div>';
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
      '<div class="hp-settings-section"><div class="hp-section-title">\u751f\u6210\u8bbe\u7f6e</div>' +
      '<div class="hp-settings-row"><span>\u5b57\u6570\u8303\u56f4</span><div style="display:flex;gap:6px;align-items:center"><input type="number" class="hp-input" style="width:70px;text-align:center" min="1000" max="30000" value="' + (s.wordCountMin||3000) + '" onchange="window.__hofter.setWordCountMin(this.value)"><span style="color:var(--text-hint)">-</span><input type="number" class="hp-input" style="width:70px;text-align:center" min="1000" max="30000" value="' + (s.wordCountMax||8000) + '" onchange="window.__hofter.setWordCountMax(this.value)"><span style="color:var(--text-hint);font-size:12px">\u5b57</span></div></div>' +
      '<div class="hp-settings-row"><span>\u81ea\u52a8\u751f\u6210\u8bc4\u8bba</span><div class="hp-toggle ' + (s.autoGenerateComments?"on":"") + '" onclick="window.__hofter.toggleAutoComments()"></div></div>' +
      '<div class="hp-settings-row"><span>\u81ea\u52a8\u5173\u6ce8\u65b0\u6897\u6807\u7b7e</span><div class="hp-toggle ' + (s.autoFollowTropeTags?"on":"") + '" onclick="window.__hofter.toggleAutoFollowTropeTags()"></div></div></div>' +
      '<div class="hp-settings-section"><div class="hp-section-title">\u5176\u4ed6</div>' +
      '<div class="hp-menu-item" onclick="window.__hofter.confirmClearCache()">' + ICONS.trash + '<span>\u6e05\u9664\u7f13\u5b58</span></div></div>';
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
    header.innerHTML = '<div class="hp-header-left"><div class="hp-icon-btn" onclick="window.__hofter.closeSheet(\'memory-mount\')">' + ICONS.back + '</div></div><div class="hp-header-title">\u7ba1\u7406\u8bb0\u5fc6\u6302\u8f7d</div><div class="hp-header-right"></div>';
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
    var contentEl = document.getElementById("hp-discover-content");
    var clearBtn = document.getElementById("hp-search-clear");
    if (!resultsEl) return;
    if (clearBtn) clearBtn.style.display = (query && query.length > 0) ? "flex" : "none";
    if (!query || query.length === 0) {
      resultsEl.innerHTML = "";
      if (contentEl) contentEl.style.display = "";
      return;
    }
    /* 搜索时隐藏正常内容，显示搜索结果 */
    if (contentEl) contentEl.style.display = "none";
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
    /* 搜索作品 */
    for (var s = 0; s < state.summaries.length; s++) {
      var sm = state.summaries[s];
      var title = (sm.title||"").toLowerCase();
      var author = (sm.author||"").toLowerCase();
      var cpName = (sm.cpTagName||"").toLowerCase();
      var excerpt = (sm.excerpt||"").toLowerCase();
      if (title.indexOf(q) >= 0 || author.indexOf(q) >= 0 || cpName.indexOf(q) >= 0 || excerpt.indexOf(q) >= 0) {
        results.push({type:"summary", data:sm});
      }
    }
    if (results.length === 0) {
      resultsEl.innerHTML = '<div style="padding:16px;color:var(--text-hint);font-size:13px;text-align:center">' + ICONS.search.replace(/24/g,"32") + '<p style="margin-top:8px">\u672a\u627e\u5230\u5339\u914d\u7ed3\u679c</p></div><div class="hp-menu-item" onclick="window.__hofter.createTropeFromSearch(\'' + escapeHtml(query) + '\')">' + ICONS.addCircle + '<span>\u521b\u5efa\u6807\u7b7e: ' + escapeHtml(query) + '</span></div>';
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
        html += '<div class="hp-list-item" onclick="window.__hofter.handleTagClick(\'' + res.data.id + '\', \'cp\')"><div class="hp-list-item-avatar" style="background:var(--primary-gradient)">' + ICONS.heart.replace(/24/g,"18").replace("currentColor","#fff") + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(res.data.name) + '</div><div class="hp-list-item-desc">CP\u6807\u7b7e</div></div></div>';
      } else if (res.type === "tropeTag") {
        html += '<div class="hp-list-item" onclick="window.__hofter.handleTagClick(\'' + res.data.id + '\', \'trope\')"><div class="hp-list-item-avatar" style="background:linear-gradient(135deg,#43e97b,#38f9d7)">' + ICONS.tag.replace(/24/g,"18").replace("currentColor","#fff") + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(res.data.name) + '</div><div class="hp-list-item-desc">\u8bbe\u5b9a\u6807\u7b7e</div></div></div>';
      } else if (res.type === "summary") {
        var sm2 = res.data;
        html += '<div class="hp-list-item" onclick="window.__hofter.openReader(\'' + sm2.id + '\')"><div class="hp-list-item-avatar" style="background:' + (sm2.coverGradient||"var(--primary-gradient)") + ';color:#fff;font-size:14px;font-weight:700">' + escapeHtml((sm2.title||"?")[0]) + '</div><div class="hp-list-item-info"><div class="hp-list-item-name">' + escapeHtml(sm2.title) + '</div><div class="hp-list-item-desc">' + escapeHtml(sm2.author||"") + (sm2.cpTagName ? ' \u00b7 ' + escapeHtml(sm2.cpTagName) : '') + '</div></div></div>';
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
    if (existing) { state.currentTagPage = existing; state.currentPage = "tagPage"; renderApp(); return; }
    var newTag = { id: generateId(), name: tagName, leftSide: { id: ch.id, name: cName, persona: ch.persona || ch.bio || "", avatar: ch.avatar || "" }, rightSide: { id: state.activePersona.id, name: pName, persona: state.activePersona.persona || state.activePersona.bio || "", avatar: state.activePersona.avatar || "" }, fandomTags: [], createdBy: "user" };
    state.cpTags.push(newTag); saveCpTags(state.cpTags);
    showToast("CP\u6807\u7b7e\u5df2\u521b\u5efa: " + tagName);
    renderApp();
  }

  function createTropeFromSearch(name) {
    var existing = null;
    for (var i = 0; i < state.tropeTags.length; i++) { if (state.tropeTags[i].name === name) { existing = state.tropeTags[i]; break; } }
    if (existing) { state.currentTagPage = existing; state.currentPage = "tagPage"; renderApp(); return; }
    var newTag = { id: generateId(), name: name, description: "", createdBy: "user" };
    state.tropeTags.push(newTag); saveTropeTags(state.tropeTags);
    showToast("\u6807\u7b7e\u5df2\u521b\u5efa: " + name);
  }

  /* ─── 消息中心 ─── */
  function showMessages() {
    var overlay = document.createElement("div"); overlay.className = "hp-message-overlay"; overlay.id = "messages-page";
    var header = document.createElement("div"); header.className = "hp-header";
    header.innerHTML = '<div class="hp-header-left"><div class="hp-icon-btn" onclick="window.__hofter.closeMessages()">' + ICONS.back + '</div></div><div class="hp-header-title">\u6d88\u606f</div><div class="hp-header-right"></div>';
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
      if (works.length === 0) {
        container.innerHTML = '<div class="hp-empty">' + ICONS.comment + '<p>\u53d1\u5e03\u4f5c\u54c1\u540e\u624d\u4f1a\u6536\u5230\u8bc4\u8bba\u901a\u77e5\u54e6</p></div>'; return;
      }
      for (var j = 0; j < Math.min(works.length, 8); j++) {
        items.push({name: randomAuthorName(), text: "\u8bc4\u8bba\u4e86\u4f60\u7684\u300a" + (works[j].title||"\u4f5c\u54c1") + "\u300b\uff1a\u597d\u559c\u6b22\u8fd9\u7bc7\uff01", time: randomInt(1,48)+"\u5c0f\u65f6\u524d"});
      }
    } else {
      if (state.publishedWorks.length === 0) {
        container.innerHTML = '<div class="hp-empty">' + ICONS.heart + '<p>\u53d1\u5e03\u4f5c\u54c1\u540e\u624d\u4f1a\u6536\u5230\u8d5e\u901a\u77e5\u54e6</p></div>'; return;
      }
      for (var k = 0; k < Math.min(state.publishedWorks.length, 6); k++) {
        items.push({name: randomAuthorName(), text: "\u8d5e\u4e86\u4f60\u7684\u300a" + (state.publishedWorks[k].title||"\u4f5c\u54c1") + "\u300b", time: randomInt(1,72)+"\u5c0f\u65f6\u524d"});
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
    state.currentReadingSummary = summary;
    var readerEl = document.createElement("div"); readerEl.className = "hp-reader-page"; readerEl.id = "hp-reader";
    readerEl.innerHTML = '<div class="hp-reader-header"><div class="hp-header-left"><div class="hp-icon-btn" onclick="window.__hofter.closeReader()">' + ICONS.back + '</div></div><div style="flex:1;text-align:center;font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0">' + escapeHtml(summary.title) + '</div><div class="hp-header-right"><div class="hp-icon-btn" onclick="window.__hofter.showReaderSettings()">' + ICONS.textSize + '</div></div></div><div id="hp-reader-content" style="padding-bottom:60px"><div id="hp-reader-spinner" style="text-align:center;padding:40px 20px;color:var(--text-hint)"><div class="hp-spinner" style="margin:0 auto"></div><p style="margin-top:12px">\u7075\u611f\u521b\u4f5c\u4e2d...</p></div><div id="hp-reader-stream" style="padding:16px;display:none"></div></div>';
    state.containerEl.appendChild(readerEl);
    if (summary.fullContent) {
      renderReaderContent(summary);
    } else {
      generateLayer2Full(summary, function(result) {
        if (result) {
          summary.fullContent = result;
          summary.isByUser = isUserWork;
          if (result.chapter && !result.chapters) { result.chapters = [result.chapter]; }
          if (!summary.fullContent.comments) summary.fullContent.comments = [];
          saveSummariesCache(state.summaries);
          debugLog("L2 saved fullContent, summary now has fullContent:true");
          renderReaderContent(summary);
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
    if (fc.chapter && !fc.chapters) fc.chapters = [fc.chapter];
    var chapters = fc.chapters || [];
    var currentCh = summary._currentChapter || 1;
    if (currentCh < 1) currentCh = 1;
    if (currentCh > chapters.length) currentCh = chapters.length;
    summary._currentChapter = currentCh;
    var cpTag = null;
    for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === summary.cpTagId) { cpTag = state.cpTags[i]; break; } }
    var html = '<div class="hp-reader-cover" style="background:' + (summary.coverGradient || randomGradient()) + '"><h1 style="font-size:22px;font-weight:800;line-height:1.4">' + escapeHtml(summary.title) + '</h1><div class="hp-reader-author"><div class="hp-reader-author-avatar">' + (summary.author||"?")[0] + '</div><div><div style="font-size:14px;font-weight:600">' + escapeHtml(summary.author||"\u533f\u540d") + '</div><div style="font-size:12px;opacity:.8">' + escapeHtml(summary.cp||summary.cpTagName||"") + (summary.tags && summary.tags.length > 0 ? " | " + summary.tags.join(", ") : "") + '</div></div></div></div>';
    if (chapters.length > 1) {
      html += '<div style="display:flex;justify-content:center;align-items:center;gap:12px;padding:8px 16px;font-size:13px;color:var(--text-secondary);border-bottom:1px solid var(--bg-secondary)">';
      if (currentCh > 1) html += '<span style="cursor:pointer;color:var(--primary);padding:4px 12px;border-radius:16px;background:var(--primary-light)" onclick="window.__hofter.goChapter(' + (currentCh - 1) + ')">\u25c0 \u4e0a\u4e00\u7ae0</span>';
      else html += '<span style="padding:4px 12px;color:var(--text-hint)">\u5df2\u662f\u7b2c\u4e00\u7ae0</span>';
      html += '<span style="font-weight:600">' + currentCh + ' / ' + chapters.length + '</span>';
      if (currentCh < chapters.length) html += '<span style="cursor:pointer;color:var(--primary);padding:4px 12px;border-radius:16px;background:var(--primary-light)" onclick="window.__hofter.goChapter(' + (currentCh + 1) + ')">\u4e0b\u4e00\u7ae0 \u25b6</span>';
      else html += '<span style="cursor:pointer;color:var(--primary);padding:4px 12px;border-radius:16px;background:var(--primary-light)" onclick="window.__hofter.continueReading()">\u8ffd\u66f4 \u25b6</span>';
      html += '</div>';
    }
    html += '<div class="hp-reader-body">';
    var authorNote = summary.author_note_optional || "";
    if (authorNote) {
      html += '<div class="hp-reader-author-note"><div class="hp-reader-author-note-quote">\u201c</div><div class="hp-reader-author-note-text">' + escapeHtml(authorNote) + '</div></div>';
    }
    var chIdx = currentCh - 1;
    if (chIdx >= 0 && chIdx < chapters.length) {
      var ch = chapters[chIdx];
      if (ch.title) html += '<div class="hp-reader-chapter-title">' + escapeHtml(ch.title) + '</div>';
      var contents = ch.content || [];
      var baseParaIdx = 0;
      for (var pc = 0; pc < chIdx; pc++) baseParaIdx += (chapters[pc].content || []).length;
      for (var p = 0; p < contents.length; p++) {
        var para = contents[p];
        var paraIdx = baseParaIdx + p;
        var hasAnnotation = false;
        var annotationForPara = null;
        var annotations = fc.annotations || [];
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
      }
    }
    html += '</div>';
    if (chapters.length > 1) {
      html += '<div style="display:flex;justify-content:center;gap:12px;padding:12px;font-size:13px">';
      if (currentCh > 1) html += '<span style="cursor:pointer;color:var(--primary);padding:8px 20px;border-radius:20px;background:var(--primary-light)" onclick="window.__hofter.goChapter(' + (currentCh - 1) + ')">\u25c0 \u4e0a\u4e00\u7ae0</span>';
      if (currentCh < chapters.length) html += '<span style="cursor:pointer;color:var(--primary);padding:8px 20px;border-radius:20px;background:var(--primary-light)" onclick="window.__hofter.goChapter(' + (currentCh + 1) + ')">\u4e0b\u4e00\u7ae0 \u25b6</span>';
      else html += '<span style="cursor:pointer;color:#fff;padding:8px 20px;border-radius:20px;background:var(--primary)" onclick="window.__hofter.continueReading()">\u8ffd\u66f4\u7eed\u7ae0 \u25b6</span>';
      html += '</div>';
    }
    html += renderComments(fc.comments || [], summary.isByUser);
    html += '<div class="hp-reader-action-bar"><div class="hp-action-btn" onclick="window.__hofter.toggleLike(this)">' + ICONS.heart + '<span>\u8d5e</span></div><div class="hp-action-btn" onclick="window.__hofter.showCommentInput()">' + ICONS.comment + '<span>\u8bc4\u8bba</span></div><div class="hp-action-btn" onclick="window.__hofter.toggleCollect()">' + ICONS.bookmark + '<span>\u6536\u85cf</span></div><div class="hp-action-btn" onclick="window.__hofter.toggleReadLater()">' + ICONS.clock + '<span>\u7a0d\u540e\u770b</span></div><div class="hp-action-btn" onclick="window.__hofter.showReaderMore()">' + ICONS.moreHorizontal + '<span>\u66f4\u591a</span></div></div>';
    contentEl.innerHTML = html;
  }

  function renderComments(comments, isUserWork) {
    var summary = state.currentReadingSummary;
    var annotations = (summary && summary.fullContent) ? (summary.fullContent.annotations || []) : [];
    var html = '<div class="hp-comment-list"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><div style="font-size:16px;font-weight:700">\u8bc4\u8bba (' + comments.length + ')</div><div class="hp-icon-btn" style="width:28px;height:28px" onclick="window.__hofter.refreshComments()">' + ICONS.refresh.replace(/24/g,"16") + '</div></div>';
    if (annotations.length > 0) {
      html += '<div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--bg-secondary)">';
      html += '<div style="font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:8px">\u6bb5\u8bc4 (' + annotations.length + ')</div>';
      for (var ai = 0; ai < annotations.length; ai++) {
        var ann = annotations[ai];
        html += '<div style="margin-bottom:10px;padding:8px 10px;background:var(--bg-secondary);border-radius:8px">';
        html += '<div style="font-size:12px;color:var(--primary);margin-bottom:4px;padding:4px 8px;background:var(--primary-light);border-radius:4px;display:inline-block">\u300c' + escapeHtml((ann.quotes || "").substring(0, 60)) + (ann.quotes && ann.quotes.length > 60 ? "..." : "") + '\u300d</div>';
        var annNotes = ann.notes || [];
        for (var ni = 0; ni < annNotes.length; ni++) {
          html += '<div style="display:flex;gap:6px;margin-top:4px"><span style="font-size:12px;font-weight:600;color:var(--text-secondary);white-space:nowrap">' + escapeHtml(annNotes[ni].name || "") + '</span><span style="font-size:12px;color:var(--text-primary)">' + escapeHtml(annNotes[ni].text || "") + '</span></div>';
        }
        html += '</div>';
      }
      html += '</div>';
    }
    if (comments.length === 0 && annotations.length === 0) {
      html += '<div style="text-align:center;padding:20px;color:var(--text-hint);font-size:13px"><p>\u8fd8\u6ca1\u6709\u8bc4\u8bba</p><p style="font-size:12px;margin-top:4px">\u70b9\u51fb\u53f3\u4e0a\u89d2\u5237\u65b0\u6309\u94ae\u751f\u6210\u8bc4\u8bba</p></div>';
    }
    for (var i = 0; i < comments.length; i++) {
      var c = comments[i];
      html += '<div class="hp-comment-item"><div class="hp-comment-avatar">' + (c.name||"?")[0] + '</div><div class="hp-comment-body"><div class="hp-comment-name">' + escapeHtml(c.name||"\u533f\u540d") + '</div><div class="hp-comment-text">' + escapeHtml(c.text||"") + '</div><div class="hp-comment-time">' + escapeHtml(c.time||"") + '<span class="hp-comment-report" onclick="window.__hofter.reportComment(this)">\u4e3e\u62a5</span></div></div></div>';
    }
    html += '<div style="padding:12px 0"><div style="display:flex;gap:8px"><input class="hp-input" id="hp-comment-input" placeholder="\u5199\u8bc4\u8bba..." style="flex:1"><button class="hp-btn hp-btn-primary hp-btn-sm" onclick="window.__hofter.submitComment()">\u53d1\u9001</button></div></div></div>';
    return html;
  }

  function showAnnotationPanel(paraIdx) {
    var currentSummary = state.currentReadingSummary;
    if (!currentSummary || !currentSummary.fullContent) return;
    var annotations = currentSummary.fullContent.annotations || [];
    var annotation = null;
    for (var j = 0; j < annotations.length; j++) { if (annotations[j].paragraphIndex === paraIdx) { annotation = annotations[j]; break; } }
    if (!annotation) return;
    var existing = document.getElementById("annotation-panel");
    if (existing) { existing.remove(); return; }
    var overlay = document.createElement("div");
    overlay.id = "annotation-panel";
    overlay.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);z-index:99997;display:flex;align-items:center;justify-content:center;";
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    var popup = document.createElement("div");
    popup.style.cssText = "background:var(--bg-card,#fff);border-radius:16px;padding:16px;width:280px;max-height:60vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.15);";
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:14px;font-weight:700">\u6bb5\u8bc4</span><span style="cursor:pointer;color:#999;font-size:18px" onclick="document.getElementById(\'annotation-panel\').remove()">X</span></div>';
    html += '<div style="font-size:12px;color:var(--primary,#E8A0BF);margin-bottom:8px;padding:6px 10px;background:var(--primary-light,rgba(232,160,191,0.15));border-radius:8px;line-height:1.5">\u300c' + escapeHtml(annotation.quotes || "") + '\u300d</div>';
    var notes = annotation.notes || [];
    for (var k = 0; k < notes.length; k++) {
      html += '<div style="display:flex;gap:6px;margin-top:8px;padding-top:8px;border-top:1px solid rgba(0,0,0,0.06)"><span style="font-size:12px;font-weight:600;color:var(--text-secondary,#888);white-space:nowrap">' + escapeHtml(notes[k].name||"") + '</span><span style="font-size:12px;color:var(--text-primary,#333)">' + escapeHtml(notes[k].text||"") + '</span></div>';
    }
    popup.innerHTML = html;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
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
    header.innerHTML = '<div class="hp-header-left"><div class="hp-icon-btn" onclick="window.__hofter.closeSheet(\'tag-manager\')">' + ICONS.back + '</div></div><div class="hp-header-title">\u7ba1\u7406\u6807\u7b7e</div><div class="hp-header-right"></div>';
    page.appendChild(header);
    var body = document.createElement("div"); body.style.cssText = "flex:1;overflow-y:auto";
    var html = '<div class="hp-section-title">CP\u6807\u7b7e</div><div class="hp-tag-list">';
    for (var i = 0; i < state.cpTags.length; i++) {
      var t = state.cpTags[i];
      html += '<div class="hp-tag-item"><span>' + escapeHtml(t.name) + '</span><span class="hp-tag-remove" onclick="window.__hofter.removeCpTag(\'' + t.id + '\')">' + ICONS.close.replace(/24/g,"14") + '</span></div>';
    }
    html += '</div><div style="padding:12px 20px"><div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px">\u65b0\u5efaCP\u6807\u7b7e</div><div style="display:flex;gap:8px;align-items:center"><select id="hp-new-cp-left" class="hp-input" style="flex:1"><option value="">\u9009\u62e9\u5de6\u4f4d</option>';
    for (var ci = 0; ci < state.personas.length; ci++) { html += '<option value="' + state.personas[ci].id + '">' + escapeHtml(state.personas[ci].name || state.personas[ci].handle) + ' (\u4eba\u8bbe)</option>'; }
    for (var cj = 0; cj < state.characters.length; cj++) { html += '<option value="' + state.characters[cj].id + '">' + escapeHtml(state.characters[cj].name || state.characters[cj].handle) + ' (\u89d2\u8272)</option>'; }
    html += '</select><span style="color:var(--primary)">\u00d7</span><select id="hp-new-cp-right" class="hp-input" style="flex:1"><option value="">\u9009\u62e9\u53f3\u4f4d</option>';
    for (var ck = 0; ck < state.personas.length; ck++) { html += '<option value="' + state.personas[ck].id + '">' + escapeHtml(state.personas[ck].name || state.personas[ck].handle) + ' (\u4eba\u8bbe)</option>'; }
    for (var cl = 0; cl < state.characters.length; cl++) { html += '<option value="' + state.characters[cl].id + '">' + escapeHtml(state.characters[cl].name || state.characters[cl].handle) + ' (\u89d2\u8272)</option>'; }
    html += '</select></div><button class="hp-btn hp-btn-primary hp-btn-sm" style="margin-top:8px;width:100%" onclick="window.__hofter.addNewCpTag()">\u521b\u5efaCP\u6807\u7b7e</button></div>';
    html += '<div class="hp-section-title">\u8bbe\u5b9a\u6807\u7b7e</div><div class="hp-tag-list">';
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
    switchDiscoverTab: function(tab) {
      state.discoverTab = tab;
      var contentEl = document.getElementById("hp-discover-content");
      if (contentEl) {
        renderDiscoverTabContent(contentEl);
        /* 更新tab样式 */
        var tabs = contentEl.parentElement.querySelector(".hp-tabs");
        if (tabs) {
          tabs.innerHTML = '<div class="hp-tab ' + (state.discoverTab==="recommend"?"active":"") + '" onclick="window.__hofter.switchDiscoverTab(\'recommend\')">\u63a8\u8350</div><div class="hp-tab ' + (state.discoverTab==="hot"?"active":"") + '" onclick="window.__hofter.switchDiscoverTab(\'hot\')">\u70ed\u95e8</div><div class="hp-tab ' + (state.discoverTab==="explore"?"active":"") + '" onclick="window.__hofter.switchDiscoverTab(\'explore\')">\u6807\u7b7e\u63a2\u7d22</div>';
        }
        /* 清除搜索 */
        var searchInput = document.getElementById("hp-discover-search-input");
        if (searchInput) searchInput.value = "";
        var resultsEl = document.getElementById("hp-search-results");
        if (resultsEl) resultsEl.innerHTML = "";
        var clearBtn = document.getElementById("hp-search-clear");
        if (clearBtn) clearBtn.style.display = "none";
      } else {
        renderApp();
      }
    },
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
        var leftSide, rightSide;
        if (order === "charFirst") { leftSide = {id:ch.id, name:cName, persona:ch.persona||ch.bio||"", avatar:ch.avatar||""}; rightSide = {id:persona.id, name:pName, persona:persona.persona||persona.bio||"", avatar:persona.avatar||""}; }
        else { leftSide = {id:persona.id, name:pName, persona:persona.persona||persona.bio||"", avatar:persona.avatar||""}; rightSide = {id:ch.id, name:cName, persona:ch.persona||ch.bio||"", avatar:ch.avatar||""}; }
        var tagName = leftSide.name + " \u00d7 " + rightSide.name;
        var exists = false;
        for (var j = 0; j < state.cpTags.length; j++) { if (state.cpTags[j].name === tagName) { exists = true; break; } }
        if (!exists) state.cpTags.push({id:generateId(), name:tagName, leftSide:leftSide, rightSide:rightSide, fandomTags:[], createdBy:"user"});
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
      state.currentTagPage = null;
      for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === tagId) { state.currentTagPage = state.cpTags[i]; break; } }
      if (!state.currentTagPage) { for (var j = 0; j < state.tropeTags.length; j++) { if (state.tropeTags[j].id === tagId) { state.currentTagPage = state.tropeTags[j]; break; } } }
      if (state.currentTagPage) { state.currentPage = "tagPage"; renderApp(); }
    },
    openTagPageById: function(tagId) { window.__hofter.openTagPage(tagId); },
    goBackFromTag: function() { state.currentTagPage = null; state.currentPage = "home"; renderApp(); },
    openCpTagPage: function(tagId) {
      guardedTagAction(function() {
        state.currentTagPage = null;
        for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === tagId) { state.currentTagPage = state.cpTags[i]; break; } }
        if (state.currentTagPage) { state.currentPage = "tagPage"; renderApp(); }
      });
    },
    openTropeTagPage: function(tagId) {
      guardedTagAction(function() {
        state.currentTagPage = null;
        for (var j = 0; j < state.tropeTags.length; j++) { if (state.tropeTags[j].id === tagId) { state.currentTagPage = state.tropeTags[j]; break; } }
        if (state.currentTagPage) { state.currentPage = "tagPage"; renderApp(); }
      });
    },
    handleTagClick: function(tagId, tagType) {
      guardedTagAction(function() {
        state.currentTagPage = null;
        if (tagType === "cp") {
          for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].id === tagId) { state.currentTagPage = state.cpTags[i]; break; } }
        } else {
          for (var j = 0; j < state.tropeTags.length; j++) { if (state.tropeTags[j].id === tagId) { state.currentTagPage = state.tropeTags[j]; break; } }
        }
        if (state.currentTagPage) { state.currentPage = "tagPage"; renderApp(); }
      });
    },
    toggleCpMode: function() {
      state.settings.cpMode = state.settings.cpMode === "unrestricted" ? "default" : "unrestricted";
      saveSettings(state.settings);
      var settingsPage = document.getElementById("settings-page");
      if (settingsPage) {
        var rows = settingsPage.querySelectorAll(".hp-settings-row");
        for (var i = 0; i < rows.length; i++) {
          var span = rows[i].querySelector("span");
          if (span && span.textContent.indexOf("\u65e0\u9650\u5236\u6a21\u5f0f") >= 0) {
            var toggle = rows[i].querySelector(".hp-toggle");
            if (toggle) { if (state.settings.cpMode === "unrestricted") toggle.classList.add("on"); else toggle.classList.remove("on"); }
            break;
          }
        }
      }
    },
    setMemoryProb: function(val) { state.settings.memoryAttachProbability = parseInt(val, 10); saveSettings(state.settings); },
    setWordCountMin: function(val) { state.settings.wordCountMin = parseInt(val, 10) || 3000; saveSettings(state.settings); },
    setWordCountMax: function(val) { state.settings.wordCountMax = parseInt(val, 10) || 8000; saveSettings(state.settings); },
    toggleAutoComments: function() {
      state.settings.autoGenerateComments = !state.settings.autoGenerateComments;
      saveSettings(state.settings);
      var settingsPage = document.getElementById("settings-page");
      if (settingsPage) {
        var rows = settingsPage.querySelectorAll(".hp-settings-row");
        for (var i = 0; i < rows.length; i++) {
          var span = rows[i].querySelector("span");
          if (span && span.textContent.indexOf("\u81ea\u52a8\u751f\u6210\u8bc4\u8bba") >= 0) {
            var toggle = rows[i].querySelector(".hp-toggle");
            if (toggle) { if (state.settings.autoGenerateComments) toggle.classList.add("on"); else toggle.classList.remove("on"); }
            break;
          }
        }
      }
    },
    toggleAutoFollowTropeTags: function() {
      state.settings.autoFollowTropeTags = !state.settings.autoFollowTropeTags;
      saveSettings(state.settings);
      var settingsPage = document.getElementById("settings-page");
      if (settingsPage) {
        var rows = settingsPage.querySelectorAll(".hp-settings-row");
        for (var i = 0; i < rows.length; i++) {
          var span = rows[i].querySelector("span");
          if (span && span.textContent.indexOf("\u81ea\u52a8\u5173\u6ce8\u65b0\u6897\u6807\u7b7e") >= 0) {
            var toggle = rows[i].querySelector(".hp-toggle");
            if (toggle) { if (state.settings.autoFollowTropeTags) toggle.classList.add("on"); else toggle.classList.remove("on"); }
            break;
          }
        }
      }
    },
    toggleTheme: function() {
      state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
      saveSettings(state.settings);
      var el = state.containerEl;
      if (state.settings.theme === "dark") el.classList.add("hp-dark");
      else el.classList.remove("hp-dark");
      /* 更新设置页面中的toggle样式 */
      var settingsPage = document.getElementById("settings-page");
      if (settingsPage) {
        var toggles = settingsPage.querySelectorAll(".hp-toggle");
        var themeToggle = null;
        /* 深色模式toggle是第一个 */
        var rows = settingsPage.querySelectorAll(".hp-settings-row");
        for (var i = 0; i < rows.length; i++) {
          var span = rows[i].querySelector("span");
          if (span && span.textContent.indexOf("\u6df1\u8272\u6a21\u5f0f") >= 0) {
            themeToggle = rows[i].querySelector(".hp-toggle");
            break;
          }
        }
        if (themeToggle) {
          if (state.settings.theme === "dark") themeToggle.classList.add("on");
          else themeToggle.classList.remove("on");
        }
      }
      /* 更新阅读器设置中的toggle */
      var readerSettings = document.getElementById("reader-settings");
      if (readerSettings) {
        var rsToggles = readerSettings.querySelectorAll(".hp-toggle");
        for (var j = 0; j < rsToggles.length; j++) {
          if (state.settings.theme === "dark") rsToggles[j].classList.add("on");
          else rsToggles[j].classList.remove("on");
        }
      }
    },
    setFontSize: function(val) {
      state.fontSize = parseInt(val, 10);
      state.settings.fontSize = state.fontSize;
      saveSettings(state.settings);
      /* 更新设置页面显示 */
      var settingsPage = document.getElementById("settings-page");
      if (settingsPage) {
        var sizeSpan = settingsPage.querySelector(".hp-settings-row span");
        /* 找到包含"字号"的span并更新 */
        var allSpans = settingsPage.querySelectorAll(".hp-settings-row span");
        for (var si = 0; si < allSpans.length; si++) {
          if (allSpans[si].textContent.indexOf("\u5b57\u53f7") >= 0) {
            allSpans[si].textContent = "\u5b57\u53f7\uff1a" + state.fontSize + "px";
            break;
          }
        }
      }
      /* 更新阅读器设置页面显示 */
      var readerSettings = document.getElementById("reader-settings");
      if (readerSettings) {
        var rsSpans = readerSettings.querySelectorAll(".hp-settings-row span");
        for (var ri = 0; ri < rsSpans.length; ri++) {
          if (rsSpans[ri].textContent.indexOf("\u5b57\u53f7") >= 0) {
            rsSpans[ri].textContent = "\u5b57\u53f7\uff1a" + state.fontSize + "px";
            break;
          }
        }
      }
      /* 更新阅读器中的文字 */
      var readerBody = document.querySelector(".hp-reader-body");
      if (readerBody) {
        var texts = readerBody.querySelectorAll(".hp-reader-text");
        for (var i = 0; i < texts.length; i++) texts[i].style.fontSize = state.fontSize + "px";
      }
    },
    confirmClearCache: function() {
      var overlay = document.createElement("div"); overlay.className = "hp-sheet-overlay"; overlay.id = "hp-clear-confirm";
      overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
      var sheet = document.createElement("div"); sheet.className = "hp-sheet";
      sheet.innerHTML = '<div class="hp-sheet-handle"></div>' +
        '<div style="padding:16px;text-align:center">' +
        '<div style="font-size:48px;margin-bottom:12px">' + ICONS.trash.replace(/24/g,"48").replace("currentColor","var(--like-red)") + '</div>' +
        '<div style="font-size:17px;font-weight:700;margin-bottom:8px">\u786e\u8ba4\u6e05\u9664\u7f13\u5b58\uff1f</div>' +
        '<div style="font-size:14px;color:var(--text-secondary);line-height:1.6">\u6b64\u64cd\u4f5c\u5c06\u6e05\u9664\u6240\u6709\u5df2\u751f\u6210\u7684\u6458\u8981\u3001\u6b63\u6587\u3001\u8bc4\u8bba\u3001\u6536\u85cf\u3001\u5386\u53f2\u548c\u7a0d\u540e\u770b\u8bb0\u5f55\uff0c\u4e14\u65e0\u6cd5\u64a4\u9500\u3002</div>' +
        '</div>' +
        '<div style="display:flex;gap:12px;padding:0 16px 16px">' +
        '<button class="hp-btn hp-btn-outline" style="flex:1" onclick="document.getElementById(\'hp-clear-confirm\').remove()">\u53d6\u6d88</button>' +
        '<button class="hp-btn" style="flex:1;background:var(--like-red);color:#fff" onclick="document.getElementById(\'hp-clear-confirm\').remove();window.__hofter.clearCache()">\u786e\u8ba4\u6e05\u9664</button>' +
        '</div>';
      overlay.appendChild(sheet); state.containerEl.appendChild(overlay);
    },
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
    onSearchFocus: function() {
      var contentEl = document.getElementById("hp-discover-content");
      var searchInput = document.getElementById("hp-discover-search-input");
      if (contentEl && searchInput && searchInput.value && searchInput.value.length > 0) {
        contentEl.style.display = "none";
      }
    },
    onSearchBlur: function() {
      var contentEl = document.getElementById("hp-discover-content");
      var searchInput = document.getElementById("hp-discover-search-input");
      if (contentEl && searchInput && (!searchInput.value || searchInput.value.length === 0)) {
        contentEl.style.display = "";
      }
    },
    clearSearch: function() {
      var searchInput = document.getElementById("hp-discover-search-input");
      if (searchInput) { searchInput.value = ""; searchInput.focus(); }
      var resultsEl = document.getElementById("hp-search-results");
      if (resultsEl) resultsEl.innerHTML = "";
      var clearBtn = document.getElementById("hp-search-clear");
      if (clearBtn) clearBtn.style.display = "none";
      var contentEl = document.getElementById("hp-discover-content");
      if (contentEl) contentEl.style.display = "";
    },
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
        closeSheet("create-page"); showToast("\u53d1\u5e03\u6210\u529f"); renderApp();
        /* 自动生成评论 */
        if (state.settings.autoGenerateComments && dynInput.value.trim().length > 20) {
          generateLayer3Comments(dynInput.value.trim(), function(comments, annotations) {
            if (comments && comments.length > 0) {
              if (!work.fullContent) work.fullContent = {chapters:[],comments:[],annotations:[]};
              work.fullContent.comments = comments;
              if (annotations && annotations.length > 0) work.fullContent.annotations = annotations;
              savePublishedWorks(state.publishedWorks);
            }
          });
        }
        return;
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
            /* 自动生成评论 */
            if (state.settings.autoGenerateComments) {
              var fullText = "";
              if (result.chapters) { for (var ci = 0; ci < result.chapters.length; ci++) { for (var cj = 0; cj < result.chapters[ci].content.length; cj++) fullText += result.chapters[ci].content[cj].text + "\n"; } }
              if (fullText.length > 50) {
                generateLayer3Comments(fullText, function(comments, annotations) {
                  if (comments && comments.length > 0) {
                    if (!work.fullContent) work.fullContent = {chapters:[],comments:[],annotations:[]};
                    work.fullContent.comments = comments;
                    if (annotations && annotations.length > 0) work.fullContent.annotations = annotations;
                    savePublishedWorks(state.publishedWorks);
                  }
                });
              }
            }
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
        /* 自动生成评论 */
        if (state.settings.autoGenerateComments && writeContent.length > 50) {
          generateLayer3Comments(writeContent, function(comments, annotations) {
            if (comments && comments.length > 0) {
              work.fullContent.comments = comments;
              if (annotations && annotations.length > 0) work.fullContent.annotations = annotations;
              savePublishedWorks(state.publishedWorks);
            }
          });
        }
      }
    },
    aiComplete: function() {
      var contentInput = document.getElementById("hp-create-content");
      if (!contentInput || !contentInput.value.trim()) { showToast("\u8bf7\u5148\u5199\u4e00\u4e9b\u5185\u5bb9"); return; }
      showLoading();
      aiChatStream([
        {role:"system", content:"\u4f60\u662f\u4e00\u4f4d\u540c\u4eba\u5c0f\u8bf4\u4f5c\u5bb6\u3002\u8bf7\u7eed\u5199\u4ee5\u4e0b\u5185\u5bb9\uff0c\u4fdd\u6301\u98ce\u683c\u4e00\u81f4\uff0c800-1500\u5b57\u3002\u53ea\u8f93\u51fa\u7eed\u5199\u5185\u5bb9\uff0c\u4e0d\u8981\u89e3\u91ca\u3002"},
        {role:"user", content: "\u8bf7\u7eed\u5199\uff1a\n" + contentInput.value}
      ], 0.8, null, function(raw) {
        hideLoading();
        if (raw && raw.trim()) { contentInput.value += "\n\n" + raw.trim(); showToast("\u7075\u611f\u8865\u5168\u5b8c\u6210"); }
        else { showToast("\u8865\u5168\u5931\u8d25"); }
      }, function() { hideLoading(); showToast("\u8865\u5168\u5931\u8d25"); });
    },
    toggleLike: function(el) {
      if (!el) return;
      var isLiked = el.classList.contains("liked");
      if (isLiked) { el.classList.remove("liked"); el.style.color = ""; }
      else { el.classList.add("liked"); el.style.color = "var(--like-red)"; }
    },
    toggleCollect: function() {
      var summary = state.currentReadingSummary;
      if (!summary) { showToast("\u65e0\u6cd5\u6536\u85cf"); return; }
      var idx = -1;
      for (var i = 0; i < state.favorites.length; i++) { if (state.favorites[i].id === summary.id) { idx = i; break; } }
      if (idx >= 0) {
        state.favorites.splice(idx, 1);
        showToast("\u5df2\u53d6\u6d88\u6536\u85cf");
      } else {
        state.favorites.unshift({id:summary.id, title:summary.title, author:summary.author, cpTagName:summary.cpTagName, excerpt:summary.excerpt, coverGradient:summary.coverGradient, likes:summary.likes, comments:summary.comments, words:summary.words, timeAgo:summary.timeAgo});
        showToast("\u5df2\u6536\u85cf");
      }
      saveFavoritesData({favorites:state.favorites, readHistory:state.readHistory, readLater:state.readLater});
    },
    toggleReadLater: function() {
      var summary = state.currentReadingSummary;
      if (!summary) { showToast("\u65e0\u6cd5\u64cd\u4f5c"); return; }
      var idx = -1;
      for (var i = 0; i < state.readLater.length; i++) { if (state.readLater[i].id === summary.id) { idx = i; break; } }
      if (idx >= 0) {
        state.readLater.splice(idx, 1);
        showToast("\u5df2\u53d6\u6d88\u7a0d\u540e\u770b");
      } else {
        state.readLater.unshift({id:summary.id, title:summary.title, author:summary.author, cpTagName:summary.cpTagName, excerpt:summary.excerpt, coverGradient:summary.coverGradient, likes:summary.likes, comments:summary.comments, words:summary.words, timeAgo:summary.timeAgo});
        showToast("\u5df2\u52a0\u5165\u7a0d\u540e\u770b");
      }
      saveFavoritesData({favorites:state.favorites, readHistory:state.readHistory, readLater:state.readLater});
    },
    showReaderMore: function() {
      var existing = document.getElementById("hp-reader-more");
      if (existing) { existing.remove(); return; }
      var overlay = document.createElement("div"); overlay.id = "hp-reader-more";
      overlay.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:99997;display:flex;align-items:flex-end;justify-content:center";
      overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
      var sheet = document.createElement("div"); sheet.className = "hp-sheet";
      sheet.innerHTML = '<div class="hp-sheet-handle"></div>' +
        '<div class="hp-menu-item" onclick="document.getElementById(\'hp-reader-more\').remove();window.__hofter.showRegenerateSheet()">' + ICONS.sparkle + '<span>\u91cd\u65b0\u751f\u6210\u6b63\u6587</span></div>' +
        '<div class="hp-menu-item" onclick="document.getElementById(\'hp-reader-more\').remove();window.__hofter.continueReading()">' + ICONS.refresh + '<span>\u8ffd\u66f4\u7eed\u7ae0</span></div>' +
        '<div class="hp-menu-item" onclick="document.getElementById(\'hp-reader-more\').remove();window.__hofter.showModelContext()">' + ICONS.textSize + '<span>\u67e5\u770b\u6a21\u578b\u4e0a\u4e0b\u6587</span></div>' +
        '<div class="hp-menu-item" onclick="document.getElementById(\'hp-reader-more\').remove();window.__hofter.shareWork()">' + ICONS.share + '<span>\u5206\u4eab</span></div>';
      overlay.appendChild(sheet); state.containerEl.appendChild(overlay);
    },
    showRegenerateSheet: function() {
      var summary = state.currentReadingSummary;
      if (!summary) { showToast("\u65e0\u6cd5\u91cd\u65b0\u751f\u6210"); return; }
      var existing = document.getElementById("hp-regenerate-sheet");
      if (existing) { existing.remove(); return; }
      var overlay = document.createElement("div"); overlay.id = "hp-regenerate-sheet";
      overlay.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:99998;display:flex;align-items:flex-end;justify-content:center";
      overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
      var sheet = document.createElement("div"); sheet.className = "hp-sheet";
      sheet.innerHTML = '<div class="hp-sheet-handle"></div>' +
        '<div style="padding:0 16px 4px"><div style="font-size:16px;font-weight:700">\u91cd\u65b0\u751f\u6210\u6b63\u6587</div>' +
        '<div style="font-size:13px;color:var(--text-secondary);margin-top:6px">\u5c06\u57fa\u4e8e\u5f53\u524d\u6458\u8981\u91cd\u65b0\u751f\u6210\u5168\u90e8\u6b63\u6587\uff0c\u5f53\u524d\u6b63\u6587\u5c06\u88ab\u66ff\u6362\u3002</div></div>' +
        '<div style="padding:12px 16px"><textarea id="hp-regenerate-feedback" class="hp-textarea" placeholder="\u7ed9\u201c\u4f5c\u8005\u201d\u63d0\u70b9\u610f\u89c1\u5427\uff08\u53ef\u9009\uff0c\u5982\uff1a\u5e0c\u671b\u66f4\u751c\u4e00\u70b9\u3001\u8282\u594f\u518d\u5feb\u4e00\u4e9b...\uff09" rows="3" style="font-size:14px"></textarea></div>' +
        '<div style="display:flex;gap:12px;padding:0 16px 16px">' +
        '<button class="hp-btn hp-btn-outline" style="flex:1" onclick="document.getElementById(\'hp-regenerate-sheet\').remove()">\u53d6\u6d88</button>' +
        '<button class="hp-btn" style="flex:1" onclick="document.getElementById(\'hp-regenerate-sheet\').remove();window.__hofter.regenerateContent()">\u91cd\u65b0\u751f\u6210</button>' +
        '</div>';
      overlay.appendChild(sheet); state.containerEl.appendChild(overlay);
    },
    regenerateContent: function() {
      var summary = state.currentReadingSummary;
      if (!summary) { showToast("\u65e0\u6cd5\u91cd\u65b0\u751f\u6210"); return; }
      var feedbackEl = document.getElementById("hp-regenerate-feedback");
      var feedback = feedbackEl ? feedbackEl.value.trim() : "";
      showLoading();
      /* 构建摘要对象，附加用户反馈 */
      var regenSummary = {
        title: summary.title,
        cpTagId: summary.cpTagId,
        cpTagName: summary.cpTagName,
        excerpt: summary.excerpt || summary.summary || "",
        summary: summary.summary || summary.excerpt || "",
        tags: summary.tags || [],
        tropeTags: summary.tropeTags || summary.tags || [],
        fandomTag: summary.fandomTag || "",
        author_note_optional: summary.author_note_optional || "",
        _regenerateFeedback: feedback
      };
      generateLayer2Full(regenSummary, function(result) {
        hideLoading();
        if (result) {
          summary.fullContent = result;
          if (result.continuation_summary) summary.continuationSummary = result.continuation_summary;
          if (result.brief_summary) summary.briefSummary = result.brief_summary;
          summary._currentChapter = 1;
          saveSummariesCache(state.summaries);
          renderReaderContent(summary);
          showToast("\u91cd\u65b0\u751f\u6210\u5b8c\u6210\uff01");
        } else {
          showToast("\u91cd\u65b0\u751f\u6210\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5");
        }
      });
    },
    shareWork: function() {
      var summary = state.currentReadingSummary;
      if (!summary) { showToast("\u65e0\u6cd5\u5206\u4eab"); return; }
      var text = "";
      if (summary.briefSummary) {
        text = "\u3010" + summary.title + "\u3011" + summary.briefSummary;
      } else {
        text = "\u3010" + summary.title + "\u3011" + (summary.excerpt || summary.summary || "");
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() { showToast("\u5df2\u590d\u5236\u5206\u4eab\u6587\u672c"); }).catch(function() { fallbackCopy(text); });
      } else { fallbackCopy(text); }
      function fallbackCopy(t) {
        var ta = document.createElement("textarea"); ta.value = t; ta.style.cssText = "position:fixed;left:-9999px";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); showToast("\u5df2\u590d\u5236\u5206\u4eab\u6587\u672c"); } catch(e) { showToast("\u590d\u5236\u5931\u8d25"); }
        document.body.removeChild(ta);
      }
    },
    continueReading: function() {
      var summary = state.currentReadingSummary;
      if (!summary) { showToast("\u65e0\u6cd5\u8ffd\u66f4"); return; }
      showLoading();
      var prevContent = "";
      if (summary.fullContent && summary.fullContent.chapters) {
        for (var i = 0; i < summary.fullContent.chapters.length; i++) {
          var ch = summary.fullContent.chapters[i];
          for (var j = 0; j < ch.content.length; j++) prevContent += ch.content[j].text + "\n";
        }
      }
      generateContinuation(summary, prevContent, summary.continuationSummary || "", function(result) {
        hideLoading();
        if (result) {
          if (result.chapter && !result.chapters) result.chapters = [result.chapter];
          if (result.chapters && result.chapters.length > 0) {
            if (!summary.fullContent) summary.fullContent = {chapters:[], comments:[], annotations:[]};
            for (var ci = 0; ci < result.chapters.length; ci++) summary.fullContent.chapters.push(result.chapters[ci]);
            if (result.comments && result.comments.length > 0) {
              if (!summary.fullContent.comments) summary.fullContent.comments = [];
              for (var di = 0; di < result.comments.length; di++) summary.fullContent.comments.push(result.comments[di]);
            }
            if (result.annotations && result.annotations.length > 0) {
              if (!summary.fullContent.annotations) summary.fullContent.annotations = [];
              summary.fullContent.annotations = summary.fullContent.annotations.concat(result.annotations);
            }
            if (result.continuation_summary) summary.continuationSummary = result.continuation_summary;
            if (result.brief_summary) summary.briefSummary = result.brief_summary;
            summary._currentChapter = summary.fullContent.chapters.length;
            saveSummariesCache(state.summaries);
            renderReaderContent(summary);
            showToast("\u8ffd\u66f4\u6210\u529f\uff01\u7b2c" + summary._currentChapter + "\u7ae0");
          } else { showToast("\u8ffd\u66f4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5"); }
        } else { showToast("\u8ffd\u66f4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5"); }
      });
    },
    showModelContext: function() {
      var summary = state.currentReadingSummary;
      if (!summary || !summary._debugContext) { showToast("\u65e0\u4e0a\u4e0b\u6587\u4fe1\u606f"); return; }
      var existing = document.getElementById("hp-context-panel");
      if (existing) { existing.remove(); return; }
      var ctx = summary._debugContext;
      var panel = document.createElement("div");
      panel.id = "hp-context-panel";
      panel.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:99998;display:flex;flex-direction:column;";
      var header = document.createElement("div");
      header.style.cssText = "display:flex;justify-content:space-between;align-items:center;padding:10px 16px;color:#fff;font-size:14px;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.1);flex-shrink:0;";
      header.innerHTML = '<span>\u6a21\u578b\u4e0a\u4e0b\u6587</span><span style="cursor:pointer;color:#f66;font-size:18px" onclick="document.getElementById(\'hp-context-panel\').remove()">X</span>';
      var tabs = document.createElement("div");
      tabs.style.cssText = "display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,0.1);flex-shrink:0;";
      var tabData = [
        { key: "sys", label: "\u7cfb\u7edf\u63d0\u793a\u8bcd" },
        { key: "usr", label: "\u7528\u6237\u6d88\u606f" },
        { key: "mem", label: "\u8bb0\u5fc6" },
        { key: "macro", label: "\u4e3b\u601d\u7ef4\u94fe" },
        { key: "inline", label: "\u5185\u8054\u6821\u9a8c" }
      ];
      var tabContents = {};
      tabContents["sys"] = ctx.systemPrompt || "(none)";
      tabContents["usr"] = ctx.userMsg || "(none)";
      tabContents["mem"] = (ctx.memory && ctx.memory !== "(none)") ? ctx.memory : "(none)";
      tabContents["macro"] = ctx.macroChain || "(\u672a\u8fd4\u56de\u4e3b\u601d\u7ef4\u94fe)";
      var inlineChecks = "";
      if (summary.fullContent && summary.fullContent.inline_checks) {
        var checks = summary.fullContent.inline_checks;
        for (var ic = 0; ic < checks.length; ic++) {
          inlineChecks += "--- \u7b2c" + (ic+1) + "\u6bb5 ---\n";
          inlineChecks += "\u610f\u56fe: " + (checks[ic].intent || "") + "\n";
          inlineChecks += "\u6587\u98ce\u5339\u914d: " + (checks[ic].vibe_match || "") + "\n";
          inlineChecks += "\u626b\u63cf\u7ed3\u679c: " + (checks[ic].scan_result || "") + "\n\n";
        }
      }
      tabContents["inline"] = inlineChecks || "(\u672a\u8fd4\u56de\u5185\u8054\u6821\u9a8c)";
      for (var ti = 0; ti < tabData.length; ti++) {
        (function(idx) {
          var tab = document.createElement("div");
          tab.style.cssText = "padding:8px 14px;color:rgba(255,255,255,0.5);font-size:12px;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;";
          tab.textContent = tabData[idx].label + " (" + tabContents[tabData[idx].key].length + ")";
          tab.onclick = function() {
            var allTabs = tabs.querySelectorAll("div");
            for (var at = 0; at < allTabs.length; at++) { allTabs[at].style.color = "rgba(255,255,255,0.5)"; allTabs[at].style.borderBottomColor = "transparent"; }
            tab.style.color = "#fff";
            tab.style.borderBottomColor = "#E8A0BF";
            body.textContent = tabContents[tabData[idx].key];
            body.scrollTop = 0;
          };
          tabs.appendChild(tab);
        })(ti);
      }
      var body = document.createElement("div");
      body.style.cssText = "flex:1;overflow-y:auto;padding:16px;color:#0f0;font-size:12px;font-family:monospace;white-space:pre-wrap;word-break:break-all;";
      body.textContent = tabContents["sys"];
      tabs.querySelector("div").style.color = "#fff";
      tabs.querySelector("div").style.borderBottomColor = "#E8A0BF";
      panel.appendChild(header);
      panel.appendChild(tabs);
      panel.appendChild(body);
      document.body.appendChild(panel);
    },
    goChapter: function(chNum) {
      var summary = state.currentReadingSummary;
      if (!summary) return;
      summary._currentChapter = chNum;
      renderReaderContent(summary);
      var contentEl = document.getElementById("hp-reader-content");
      if (contentEl) contentEl.scrollTop = 0;
    },
    showCommentInput: function() { var input = document.getElementById("hp-comment-input"); if (input) input.focus(); },
    refreshComments: function() {
      var summary = state.currentReadingSummary;
      if (!summary || !summary.fullContent) { showToast("\u65e0\u6cd5\u751f\u6210\u8bc4\u8bba"); return; }
      showLoading();
      var chaptersText = JSON.stringify(summary.fullContent.chapters || []);
      generateLayer3Comments(chaptersText, function(result) {
        hideLoading();
        if (result && result.comments && result.comments.length > 0) {
          summary.fullContent.comments = result.comments;
        }
        if (result && result.annotations && result.annotations.length > 0) {
          if (!summary.fullContent.annotations) summary.fullContent.annotations = [];
          summary.fullContent.annotations = summary.fullContent.annotations.concat(result.annotations);
        }
        renderReaderContent(summary);
        showToast("\u8bc4\u8bba\u751f\u6210\u6210\u529f\uff01");
      });
    },
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
    addNewCpTag: function() {
      var leftSel = document.getElementById("hp-new-cp-left");
      var rightSel = document.getElementById("hp-new-cp-right");
      if (!leftSel || !rightSel || !leftSel.value || !rightSel.value) { showToast("\u8bf7\u9009\u62e9\u5de6\u53f3\u4f4d"); return; }
      var leftId = leftSel.value, rightId = rightSel.value;
      var leftChar = getCharById(leftId), leftPersona = getPersonaById(leftId);
      var rightChar = getCharById(rightId), rightPersona = getPersonaById(rightId);
      var leftSide = leftChar ? {id:leftChar.id, name:leftChar.name||leftChar.handle, persona:leftChar.persona||leftChar.bio||"", avatar:leftChar.avatar||""} : (leftPersona ? {id:leftPersona.id, name:leftPersona.name||leftPersona.handle, persona:leftPersona.persona||leftPersona.bio||"", avatar:leftPersona.avatar||""} : null);
      var rightSide = rightChar ? {id:rightChar.id, name:rightChar.name||rightChar.handle, persona:rightChar.persona||rightChar.bio||"", avatar:rightChar.avatar||""} : (rightPersona ? {id:rightPersona.id, name:rightPersona.name||rightPersona.handle, persona:rightPersona.persona||rightPersona.bio||"", avatar:rightPersona.avatar||""} : null);
      if (!leftSide || !rightSide) { showToast("\u9009\u62e9\u65e0\u6548"); return; }
      var tagName = leftSide.name + " \u00d7 " + rightSide.name;
      for (var i = 0; i < state.cpTags.length; i++) { if (state.cpTags[i].name === tagName) { showToast("CP\u6807\u7b7e\u5df2\u5b58\u5728"); return; } }
      state.cpTags.push({id:generateId(), name:tagName, leftSide:leftSide, rightSide:rightSide, fandomTags:[], createdBy:"user"});
      saveCpTags(state.cpTags); showToast("CP\u6807\u7b7e\u5df2\u521b\u5efa"); showTagManager();
    },
    closeApp: function() { if (state.roche && state.roche.ui) state.roche.ui.closeApp(); },
    toggleDebug: function() { toggleDebugPanel(); },
    clearDebug: function() { debugLogs = []; var p = document.getElementById("hp-debug-content"); if (p) p.textContent = ""; debugLog("debug cleared"); },
    copyDebug: function() { var text = debugLogs.join("\n"); if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function() { debugLog("debug copied to clipboard"); }); } else { debugLog("clipboard API not available"); } },
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
    version: "1.7.0",
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
            if (roche.worldbook) {
              promises.push(roche.worldbook.list().then(function(cats) { state.worldbookCategories = cats || []; }).catch(function(){}));
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