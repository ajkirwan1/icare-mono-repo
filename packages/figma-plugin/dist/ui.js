"use strict";
(() => {
  // src/ui.ts
  var tokensData = null;
  var componentsData = null;
  var screensData = [];
  var logOutput = document.getElementById("log-output");
  var fileTokens = document.getElementById("file-tokens");
  var fileComponents = document.getElementById("file-components");
  var fileScreens = document.getElementById("file-screens");
  var btnImportTokens = document.getElementById("btn-import-tokens");
  var btnGenerateComponents = document.getElementById("btn-generate-components");
  var btnGenerateScreens = document.getElementById("btn-generate-screens");
  var progressTokens = document.getElementById("progress-tokens");
  var progressComponents = document.getElementById("progress-components");
  var progressScreens = document.getElementById("progress-screens");
  var uploadStatus = document.getElementById("upload-status");
  var uploadError = document.getElementById("upload-error");
  fileTokens.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file)
      return;
    try {
      tokensData = JSON.parse(await file.text());
      appendLog(`Loaded tokens.json (${file.size} bytes)`);
      checkUploadState();
    } catch (err) {
      showUploadError(`Invalid tokens.json: ${err}`);
    }
  });
  fileComponents.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file)
      return;
    try {
      componentsData = JSON.parse(await file.text());
      appendLog(`Loaded components.json (${file.size} bytes)`);
      checkUploadState();
    } catch (err) {
      showUploadError(`Invalid components.json: ${err}`);
    }
  });
  fileScreens.addEventListener("change", async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0)
      return;
    try {
      screensData = [];
      for (let i = 0; i < files.length; i++) {
        const json = JSON.parse(await files[i].text());
        screensData.push(json);
        appendLog(`Loaded ${files[i].name} (${files[i].size} bytes)`);
      }
      checkUploadState();
    } catch (err) {
      showUploadError(`Invalid screen JSON: ${err}`);
    }
  });
  function checkUploadState() {
    const allLoaded = tokensData && componentsData && screensData.length > 0;
    const tokensOnly = !!tokensData;
    btnImportTokens.disabled = !tokensOnly;
    uploadStatus.textContent = allLoaded ? `All files loaded (${screensData.length} screens)` : tokensOnly ? "Tokens loaded. Upload components and screens to continue." : "Upload JSON files to begin.";
    uploadError.style.display = "none";
    if (tokensOnly) {
      document.getElementById("step-tokens").classList.add("active");
    }
  }
  function showUploadError(msg) {
    uploadError.textContent = msg;
    uploadError.style.display = "block";
  }
  btnImportTokens.addEventListener("click", () => {
    btnImportTokens.disabled = true;
    progressTokens.parentElement.style.display = "block";
    parent.postMessage(
      { pluginMessage: { type: "import-tokens", payload: tokensData } },
      "*"
    );
  });
  btnGenerateComponents.addEventListener("click", () => {
    btnGenerateComponents.disabled = true;
    progressComponents.parentElement.style.display = "block";
    parent.postMessage(
      { pluginMessage: { type: "generate-components", payload: componentsData } },
      "*"
    );
  });
  btnGenerateScreens.addEventListener("click", () => {
    btnGenerateScreens.disabled = true;
    progressScreens.parentElement.style.display = "block";
    parent.postMessage(
      {
        pluginMessage: {
          type: "generate-screens",
          payload: { screens: screensData, tokens: tokensData }
        }
      },
      "*"
    );
  });
  window.onmessage = (event) => {
    const msg = event.data.pluginMessage;
    if (!msg)
      return;
    switch (msg.type) {
      case "progress": {
        const { step, message, percent } = msg.payload;
        appendLog(message);
        updateProgress(step, percent);
        break;
      }
      case "log": {
        appendLog(msg.payload.message);
        break;
      }
      case "complete": {
        const { step, message, stats } = msg.payload;
        appendLog(`COMPLETE: ${message}`);
        updateProgress(step, 100);
        markStepComplete(step);
        if (stats) {
          appendLog(`  Stats: ${JSON.stringify(stats)}`);
        }
        break;
      }
      case "error": {
        appendLog(`ERROR [${msg.payload.step}]: ${msg.payload.message}`);
        enableStepButton(msg.payload.step);
        break;
      }
    }
  };
  function appendLog(message) {
    const line = document.createElement("div");
    const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    line.textContent = `[${time}] ${message}`;
    logOutput.appendChild(line);
    logOutput.scrollTop = logOutput.scrollHeight;
  }
  function updateProgress(step, percent) {
    const bar = getProgressBar(step);
    if (bar)
      bar.style.width = `${percent}%`;
  }
  function getProgressBar(step) {
    switch (step) {
      case "import-tokens":
        return progressTokens;
      case "generate-components":
        return progressComponents;
      case "generate-screens":
        return progressScreens;
      default:
        return null;
    }
  }
  function markStepComplete(step) {
    switch (step) {
      case "import-tokens":
        document.getElementById("step-tokens").classList.add("complete");
        document.getElementById("step-tokens").classList.remove("active");
        btnGenerateComponents.disabled = !componentsData;
        document.getElementById("step-components").classList.add("active");
        break;
      case "generate-components":
        document.getElementById("step-components").classList.add("complete");
        document.getElementById("step-components").classList.remove("active");
        btnGenerateScreens.disabled = screensData.length === 0;
        document.getElementById("step-screens").classList.add("active");
        break;
      case "generate-screens":
        document.getElementById("step-screens").classList.add("complete");
        document.getElementById("step-screens").classList.remove("active");
        appendLog("All steps complete! Review the generated pages in Figma.");
        break;
    }
  }
  function enableStepButton(step) {
    switch (step) {
      case "import-tokens":
        btnImportTokens.disabled = false;
        break;
      case "generate-components":
        btnGenerateComponents.disabled = false;
        break;
      case "generate-screens":
        btnGenerateScreens.disabled = false;
        break;
    }
  }
})();
