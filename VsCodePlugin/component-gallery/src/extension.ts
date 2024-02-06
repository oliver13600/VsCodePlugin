import { commands, ExtensionContext } from "vscode";
import { ComponentGalleryPanel } from "./panels/ComponentGalleryPanel";

export function activate(context: ExtensionContext) {
  // Create the show gallery command
  const showGalleryCommand = commands.registerCommand("antora.createModule", () => {
    ComponentGalleryPanel.render(context.extensionUri);
  });

  //Test
  context.subscriptions.push(showGalleryCommand);
}
