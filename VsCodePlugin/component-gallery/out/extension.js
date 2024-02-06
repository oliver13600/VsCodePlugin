"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(extension_exports);
var import_vscode3 = require("vscode");

// src/panels/ComponentGalleryPanel.ts
var import_vscode2 = require("vscode");

// src/utilities/getUri.ts
var import_vscode = require("vscode");
function getUri(webview, extensionUri, pathList) {
  return webview.asWebviewUri(import_vscode.Uri.joinPath(extensionUri, ...pathList));
}

// src/utilities/getNonce.ts
function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// src/panels/demos/template.ts
var dropdownDemo = `
  <section class="component-container">
    <h2>Template</h2>
    <section class="component-example">
      <p>Default Dropdown</p>
      <vscode-dropdown position="below">
        <vscode-option>Template #1</vscode-option>
        <vscode-option>Template #2</vscode-option>
        <vscode-option>Template #3</vscode-option>
      </vscode-dropdown>
      <h2>Text</h2>
    <section class="component-example">
      <vscode-text-field>Text Field Label</vscode-text-field>
    </section>
    <section class="component-example">
      <p>Default Radio Group</p>
      <vscode-radio-group>
        <label slot="label">Group Label</label>
        <vscode-radio value="value-1">Label</vscode-radio>
        <vscode-radio value="value-2">Label</vscode-radio>
        <vscode-radio value="value-3">Label</vscode-radio>
      </vscode-radio-group>
    </section>
    <section class="component-example">
      <vscode-button appearance="primary">Create</vscode-button>
    </section>
    

    </section>

  </section>
`;

// src/panels/ComponentGalleryPanel.ts
var ComponentGalleryPanel = class {
  constructor(panel, extensionUri) {
    this._disposables = [];
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
  }
  static render(extensionUri) {
    if (ComponentGalleryPanel.currentPanel) {
      ComponentGalleryPanel.currentPanel._panel.reveal(import_vscode2.ViewColumn.One);
    } else {
      const panel = import_vscode2.window.createWebviewPanel(
        "createModule",
        "Create Module",
        import_vscode2.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [import_vscode2.Uri.joinPath(extensionUri, "out")]
        }
      );
      ComponentGalleryPanel.currentPanel = new ComponentGalleryPanel(panel, extensionUri);
    }
  }
  dispose() {
    ComponentGalleryPanel.currentPanel = void 0;
    this._panel.dispose();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
  _getWebviewContent(webview, extensionUri) {
    const webviewUri = getUri(webview, extensionUri, ["out", "webview.js"]);
    const styleUri = getUri(webview, extensionUri, ["out", "style.css"]);
    const codiconUri = getUri(webview, extensionUri, ["out", "codicon.css"]);
    const nonce = getNonce();
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" href="${styleUri}">
          <link rel="stylesheet" href="${codiconUri}">
          <title>Create Module</title>
        </head>
        <body>
          <h1>Create Module</h1>
          <section class="component-row">
            ${dropdownDemo}
          </section>
          
          <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
        </body>
      </html>
    `;
  }
};

// src/extension.ts
function activate(context) {
  const showGalleryCommand = import_vscode3.commands.registerCommand("antora.createModule", () => {
    ComponentGalleryPanel.render(context.extensionUri);
  });
  context.subscriptions.push(showGalleryCommand);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
//# sourceMappingURL=extension.js.map
