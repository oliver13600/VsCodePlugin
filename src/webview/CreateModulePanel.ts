import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn } from "vscode";

export class CreateModulePanel {
    public static currentPanel: CreateModulePanel | undefined;
    private readonly _panel: WebviewPanel;
    private _disposables: Disposable[] = [];

    /**
     * The ComponentGalleryPanel class private constructor (called only from the render method).
     *
     * @param panel A reference to the webview panel
     * @param extensionUri The URI of the directory containing the extension
     */
    private constructor(panel: WebviewPanel, extensionUri: Uri) {
        this._panel = panel;

        // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
        // the panel or when the panel is closed programmatically)
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Set the HTML content for the webview panel
        this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
    }

    /**
     * Renders the current webview panel if it exists otherwise a new webview panel
     * will be created and displayed.
     *
     * @param extensionUri The URI of the directory containing the extension.
     */
    public static render(extensionUri: Uri) {
        if (CreateModulePanel.currentPanel) {
            // If the webview panel already exists reveal it
            CreateModulePanel.currentPanel._panel.reveal(ViewColumn.One);
        } else {
            // If a webview panel does not already exist create and show a new one
            const panel = window.createWebviewPanel(
                // Panel view type
                "createModule",
                // Panel title
                "Create Module",
                // The editor column the panel should be displayed in
                ViewColumn.One,
                // Extra panel configurations
                {
                    // Enable JavaScript in the webview
                    enableScripts: true,
                    // Restrict the webview to only load resources from the `out` directory
                    localResourceRoots: [Uri.joinPath(extensionUri, "out")],
                }
            );

            CreateModulePanel.currentPanel = new CreateModulePanel(panel, extensionUri);
        }
    }

    /**
     * Cleans up and disposes of webview resources when the webview panel is closed.
     */
    public dispose() {
        CreateModulePanel.currentPanel = undefined;

        // Dispose of the current webview panel
        this._panel.dispose();

        // Dispose of all disposables (i.e. commands) associated with the current webview panel
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }

    /**
     * Defines and returns the HTML that should be rendered within the webview panel.
     *
     * @remarks This is also the place where *references* to CSS and JavaScript files
     * are created and inserted into the webview HTML.
     *
     * @param webview A reference to the extension webview
     * @param extensionUri The URI of the directory containing the extension
     * @returns A template string literal containing the HTML that should be
     * rendered within the webview panel
     */
    private _getWebviewContent(webview: Webview, extensionUri: Uri) {
        //const webviewUri = getUri(webview, extensionUri, ["out", "webview.js"]);
        //const styleUri = getUri(webview, extensionUri, ["out", "style.css"]);
        //const codiconUri = getUri(webview, extensionUri, ["out", "codicon.css"]);
        //const nonce = getNonce();

        // Note: Since the below HTML is defined within a JavaScript template literal, all of
        // the HTML for each component demo can be defined elsewhere and then imported/inserted
        // into the below code. This can help with code readability and organization.
        //
        // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
        return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; font-src ${webview.cspSource};>
          
          <title>Create Module</title>
        </head>
        <body>
          <h1>Create Module</h1>
          <section class="component-row">
            
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
            </section>
        </body>
      </html>
    `;
    }
}