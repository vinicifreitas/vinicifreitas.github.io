(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    toggleState.textContent = isOff ? "OFF" : "ON";
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

  var sections = {
    sobre: "sobre",
    projetos: "projetos",
    skills: "skills",
    contato: "contato"
  };

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
    printLine("> modo matrix ativado por 4s...");
    setTimeout(function () {
      rainColor = original;
    }, 4000);
  }

  function handleCommand(raw) {
    var cmd = raw.trim().toLowerCase();
    if (cmd === "") return;

    printLine("guest@vinicius:~$ " + raw);

    if (cmd === "help") {
      printLine(
        "comandos: help, whoami, about, projetos, skills, contato, date, clear, matrix"
      );
    } else if (cmd === "whoami") {
      printLine("guest (você). host: vinicius_freitas");
    } else if (cmd === "clear") {
      output.textContent = "";
    } else if (cmd === "date") {
      printLine(new Date().toString());
    } else if (cmd === "matrix") {
      runMatrixEasterEgg();
    } else if (sections[cmd] || cmd === "about") {
      var target = cmd === "about" ? "sobre" : cmd;
      goTo(target);
      printLine("> abrindo ./" + target + "/");
    } else {
      printLine("comando não encontrado: " + raw + " — digite 'help'");
    }
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleCommand(input.value);
      input.value = "";
    }
  });
})();
