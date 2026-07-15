(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- i18n ---------------- */

  var htmlLangAttr = { en: "en", pt: "pt-BR", zh: "zh-CN" };

  var translations = {
    en: {
      skip_link: "Skip to content",
      nav_aria: "Quick navigation",
      effects_label: "effects:",
      effects_on: "ON",
      effects_off: "OFF",
      nav_sobre: "cd about",
      nav_projetos: "cd projects",
      nav_skills: "cd skills",
      nav_contato: "cd contact",
      hero_loc_label: "located in:",
      hero_loc_country: "Brazil",
      sobre_prompt: "cat about.txt",
      sobre_text: "Founder of Vértice On - Growth Systems & AI, building growth systems and AI-powered products from the ground up — from architecture to growth.",
      projetos_prompt: "ls -la ./projects/",
      proj1_tag: "active",
      proj1_desc: "We take care of your business growth infrastructure with AI",
      proj1_meta: "Founder · Jul 2023 – present",
      proj2_tag: "open source",
      proj2_desc: "Marketing campaign management — manage, analyze, and optimize in one place.",
      proj2_link: "[ View on GitHub ]",
      skills_prompt: "skills --list",
      skill_1: "Entrepreneurship",
      skill_2: "Product creation",
      skill_3: "Security & Pentesting",
      skills_note: "> +7 skills listed on LinkedIn",
      lang_prompt: "lang --list",
      lang_pt_name: "Portuguese",
      lang_pt_level: "— native/fluent",
      lang_en_name: "English",
      lang_en_level: "— advanced",
      lang_zh_name: "Chinese",
      lang_zh_level: "— basic",
      contato_prompt: "cat contact.txt",
      contact_whatsapp_label: "Message me on WhatsApp",
      console_placeholder: "type 'help'",
      console_aria: "Command terminal. Type help to see available commands.",
      cmd_help: "commands: help, whoami, about, projects, skills, contact, date, clear, matrix",
      cmd_whoami: "guest (you). host: vinicius_freitas",
      cmd_not_found: "command not found: {cmd} — type 'help'",
      cmd_opening: "> opening ./{target}/",
      cmd_matrix: "> matrix mode activated for 4s...",
      date_locale: "en-US",
      section_labels: { sobre: "about", projetos: "projects", skills: "skills", contato: "contact" }
    },
    pt: {
      skip_link: "Pular para o conteúdo",
      nav_aria: "Navegação rápida",
      effects_label: "efeitos:",
      effects_on: "ON",
      effects_off: "OFF",
      nav_sobre: "cd sobre",
      nav_projetos: "cd projetos",
      nav_skills: "cd skills",
      nav_contato: "cd contato",
      hero_loc_label: "localizado em:",
      hero_loc_country: "Brasil",
      sobre_prompt: "cat sobre.txt",
      sobre_text: "Founder da Vértice On - Growth Systems & AI, construindo sistemas de crescimento e produtos com IA do zero — da arquitetura ao growth.",
      projetos_prompt: "ls -la ./projetos/",
      proj1_tag: "ativo",
      proj1_desc: "Cuidamos da sua infraestrutura de crescimento de negócios com IA",
      proj1_meta: "Founder · jul de 2023 – atual",
      proj2_tag: "open source",
      proj2_desc: "Gestão de campanhas de marketing — gerenciamento, análise e otimização em um só lugar.",
      proj2_link: "[ Ver no GitHub ]",
      skills_prompt: "skills --list",
      skill_1: "Empreendedorismo",
      skill_2: "Criação de produtos",
      skill_3: "Segurança e Pentest",
      skills_note: "> +7 competências listadas no LinkedIn",
      lang_prompt: "lang --list",
      lang_pt_name: "Português",
      lang_pt_level: "— nível nativo/fluente",
      lang_en_name: "Inglês",
      lang_en_level: "— nível avançado",
      lang_zh_name: "Chinês",
      lang_zh_level: "— nível básico",
      contato_prompt: "cat contato.txt",
      contact_whatsapp_label: "Fale comigo pelo WhatsApp",
      console_placeholder: "digite 'help'",
      console_aria: "Terminal de comandos. Digite help para ver os comandos disponíveis.",
      cmd_help: "comandos: help, whoami, sobre, projetos, skills, contato, date, clear, matrix",
      cmd_whoami: "guest (você). host: vinicius_freitas",
      cmd_not_found: "comando não encontrado: {cmd} — digite 'help'",
      cmd_opening: "> abrindo ./{target}/",
      cmd_matrix: "> modo matrix ativado por 4s...",
      date_locale: "pt-BR",
      section_labels: { sobre: "sobre", projetos: "projetos", skills: "skills", contato: "contato" }
    },
    zh: {
      skip_link: "跳转到内容",
      nav_aria: "快速导航",
      effects_label: "特效:",
      effects_on: "开",
      effects_off: "关",
      nav_sobre: "cd 关于",
      nav_projetos: "cd 项目",
      nav_skills: "cd 技能",
      nav_contato: "cd 联系",
      hero_loc_label: "位于:",
      hero_loc_country: "巴西",
      sobre_prompt: "cat 关于.txt",
      sobre_text: "Vértice On - Growth Systems & AI 的 Founder,从零开始打造增长系统与 AI 产品——从架构到增长。",
      projetos_prompt: "ls -la ./项目/",
      proj1_tag: "进行中",
      proj1_desc: "我们借助人工智能为您打理业务增长的基础设施",
      proj1_meta: "Founder · 2023年7月至今",
      proj2_tag: "开源",
      proj2_desc: "营销活动管理工具——集管理、分析与优化于一体。",
      proj2_link: "[ 在 GitHub 上查看 ]",
      skills_prompt: "skills --list",
      skill_1: "创业",
      skill_2: "产品创造",
      skill_3: "安全与渗透测试",
      skills_note: "> LinkedIn 上还有 +7 项技能",
      lang_prompt: "lang --list",
      lang_pt_name: "葡萄牙语",
      lang_pt_level: "——母语/流利",
      lang_en_name: "英语",
      lang_en_level: "——高级",
      lang_zh_name: "中文",
      lang_zh_level: "——基础",
      contato_prompt: "cat 联系方式.txt",
      contact_whatsapp_label: "通过 WhatsApp 联系我",
      console_placeholder: "输入 'help'",
      console_aria: "命令终端。输入 help 查看可用命令。",
      cmd_help: "命令: help, whoami, 关于, 项目, 技能, 联系, date, clear, matrix",
      cmd_whoami: "guest(你)。host: vinicius_freitas",
      cmd_not_found: "未找到命令: {cmd} — 输入 'help'",
      cmd_opening: "> 正在打开 ./{target}/",
      cmd_matrix: "> matrix 模式已激活 4 秒...",
      date_locale: "zh-CN",
      section_labels: { sobre: "关于", projetos: "项目", skills: "技能", contato: "联系" }
    }
  };

  var sectionAliases = {
    sobre: "sobre", about: "sobre", "关于": "sobre",
    projetos: "projetos", projects: "projetos", "项目": "projetos",
    skills: "skills", "技能": "skills",
    contato: "contato", contact: "contato", "联系": "contato"
  };

  var currentLang = "en";
  var langButtons = Array.prototype.slice.call(document.querySelectorAll(".lang-btn"));

  function applyLanguage(lang) {
    var dict = translations[lang];
    if (!dict) return;
    currentLang = lang;

    document.documentElement.lang = htmlLangAttr[lang];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    var effectsState = document.getElementById("effects-state");
    if (effectsState) {
      effectsState.textContent = document.body.classList.contains("fx-off") ? dict.effects_off : dict.effects_on;
    }

    langButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLanguage(btn.dataset.lang);
    });
  });

  /* ---------------- boot sequence ---------------- */

  var bootScreen = document.getElementById("boot-screen");
  var bootLog = document.getElementById("boot-log");
  var bootLines = [
    "INITIALIZING TERMINAL...",
    "LOADING PROFILE: vinicius_freitas.dat",
    "CONNECTING TO LINKEDIN://in/vinicifreitas ... OK",
    "ESTABLISHING SESSION ... OK",
    "WELCOME."
  ];

  function skipBoot() {
    bootScreen.classList.add("hidden");
  }

  function runBoot() {
    var alreadyBooted = sessionStorage.getItem("booted") === "1";
    if (reduceMotion || alreadyBooted) {
      skipBoot();
      return;
    }
    sessionStorage.setItem("booted", "1");
    var i = 0;
    var interval = setInterval(function () {
      bootLog.textContent += bootLines[i] + "\n";
      i++;
      if (i >= bootLines.length) {
        clearInterval(interval);
        setTimeout(skipBoot, 350);
      }
    }, 220);
  }

  runBoot();
  bootScreen.addEventListener("click", skipBoot);

  /* ---------------- footer year ---------------- */

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- effects toggle ---------------- */

  var toggleBtn = document.getElementById("effects-toggle");
  var toggleState = document.getElementById("effects-state");

  toggleBtn.addEventListener("click", function () {
    var isOff = document.body.classList.toggle("fx-off");
    toggleBtn.setAttribute("aria-pressed", String(!isOff));
    var dict = translations[currentLang];
    toggleState.textContent = isOff ? dict.effects_off : dict.effects_on;
  });

  /* ---------------- digital rain (amber, subtle) ---------------- */

  var canvas = document.getElementById("rain");
  var ctx = canvas.getContext("2d");
  var glyphs = "01アイウエオカキクケコサシスセソ$#&%+=-<>/\\";
  var fontSize = 16;
  var columns = 0;
  var drops = [];
  var rainColor = "#ffb000";
  var rafId = null;
  var lastFrame = 0;
  var frameInterval = 1000 / 18; // slow, cheap on battery

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(function () {
      return Math.floor(Math.random() * -50);
    });
  }

  function drawRain(timestamp) {
    rafId = requestAnimationFrame(drawRain);
    if (timestamp - lastFrame < frameInterval) return;
    lastFrame = timestamp;

    ctx.fillStyle = "rgba(12, 9, 0, 0.18)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = rainColor;
    ctx.font = fontSize + "px monospace";

    for (var i = 0; i < drops.length; i++) {
      var char = glyphs[Math.floor(Math.random() * glyphs.length)];
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function startRain() {
    if (rafId) return;
    lastFrame = 0;
    rafId = requestAnimationFrame(drawRain);
  }

  function stopRain() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  if (!reduceMotion) {
    startRain();
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopRain();
    } else if (!reduceMotion && !document.body.classList.contains("fx-off")) {
      startRain();
    }
  });

  toggleBtn.addEventListener("click", function () {
    if (document.body.classList.contains("fx-off")) {
      stopRain();
    } else if (!reduceMotion) {
      startRain();
    }
  });

  /* ---------------- interactive command line ---------------- */

  var input = document.getElementById("cmd-input");
  var output = document.getElementById("cmd-output");

  function printLine(text) {
    output.textContent += (output.textContent ? "\n" : "") + text;
  }

  function goTo(id) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  function runMatrixEasterEgg() {
    var original = rainColor;
    rainColor = "#39ff6a";
    printLine(translations[currentLang].cmd_matrix);
    setTimeout(function () {
      rainColor = original;
    }, 4000);
  }

  function handleCommand(raw) {
    var cmd = raw.trim().toLowerCase();
    if (cmd === "") return;

    var dict = translations[currentLang];
    printLine("guest@vinicius:~$ " + raw);

    if (cmd === "help") {
      printLine(dict.cmd_help);
    } else if (cmd === "whoami") {
      printLine(dict.cmd_whoami);
    } else if (cmd === "clear") {
      output.textContent = "";
    } else if (cmd === "date") {
      printLine(new Date().toLocaleString(dict.date_locale));
    } else if (cmd === "matrix") {
      runMatrixEasterEgg();
    } else if (sectionAliases[cmd]) {
      var canonical = sectionAliases[cmd];
      goTo(canonical);
      printLine(dict.cmd_opening.replace("{target}", dict.section_labels[canonical]));
    } else {
      printLine(dict.cmd_not_found.replace("{cmd}", raw));
    }
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleCommand(input.value);
      input.value = "";
    }
  });
})();
