// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {CreateModulePanel} from "./webview/CreateModulePanel";

const fs = require('fs');
const path = require('path');


let masterDocument = null;


function setAsMasterDocument(uri: any) {
    masterDocument = uri;
    // Additional logic to handle the master document
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "asciidocextension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('asciidocextension.helloWorld', () => {
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from AsciiDocExtension! By Oliver');
    
        // Define the file path and content
    
        const filePath = "/mnt/d/wsl/newAdocFile.adoc"; // Specify your specific directory and file name
        const fileContent = "this is a adoc file";
    
        // Check if the directory exists, if not, create it
        const dirPath = path.dirname(filePath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Write the file
        fs.writeFile(filePath, fileContent, (writeErr: NodeJS.ErrnoException | null) => {
            if (writeErr) {
                vscode.window.showErrorMessage('Failed to create the file: ' + writeErr.message);
            } else {
                vscode.window.showInformationMessage('File created successfully at ' + filePath);
            }
    
        });
    });

	context.subscriptions.push(disposable);

	// New command for marking a Master Document
    let disposableMarkAsMaster = vscode.commands.registerCommand('asciidocextension.markAsMaster', () => {
        // Implementation of the Master Document functionality
        
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			setAsMasterDocument(editor.document.uri);
			vscode.window.showInformationMessage(`Set ${editor.document.fileName} as Master Document new`);
		}
    });
    context.subscriptions.push(disposableMarkAsMaster);

	// New command for editing an AsciiDoc table
    let editTableDisposable = vscode.commands.registerCommand('asciidocextension.editAsciiDocTable', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active text editor found');
            return; // No active text editor
        }

        const document = editor.document;
        const selection = editor.selection;

        // Placeholder for the logic 
        // Implement table detection and editing logic here

        vscode.window.showInformationMessage('AsciiDoc table editing functionality is not yet implemented. Test');

    });

    context.subscriptions.push(editTableDisposable);

    //New Command for Create Module

    let createModuleDisposable = vscode.commands.registerCommand('asciidocextension.createModule', () => {
        // Implementation of the Master Document functionality
        
		vscode.window.showInformationMessage("Create Module Test");

        CreateModulePanel.render(context.extensionUri);
    });
    context.subscriptions.push(createModuleDisposable);
}



// This method is called when your extension is deactivated
export function deactivate() {}
