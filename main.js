/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, browser: true */
/*global $, define, brackets */

define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
        EditorManager      = brackets.getModule("editor/EditorManager"),
        CommandManager     = brackets.getModule("command/CommandManager"),
        KeyBindingManager  = brackets.getModule("command/KeyBindingManager"),     
        NodeDomain     = brackets.getModule("utils/NodeDomain");

    var simpleDomain = new NodeDomain("simple", ExtensionUtils.getModulePath(module, "node/SimpleDomain"));
    // Helper function that runs the simple.getMemory command and
    // logs the result to the console
    function logMemory() {
        simpleDomain.exec("getMemory", false)
            .done(function (memory) {
                console.log(
                    "[brackets-simple-node] Memory: %d bytes free",
                    memory
                );
            }).fail(function (err) {
                console.error("[brackets-simple-node] failed to run simple.getMemory", err);
            });
    }
    function SQL_format() {
      var editor = EditorManager.getFocusedEditor();
      var start = editor.getCursorPos(true, "start");
      var end = editor.getCursorPos(true, "end");
      var space = " ".repeat(start.ch);
      console.log(space.length)
      simpleDomain.exec("formatSQL", editor.getSelectedText())
          .done(function (result) {
              var indentedResult = result.replace(/\n/g, "\n"+space);
              editor.document.replaceRange(indentedResult, start, end);
          }).fail(function (err) {
              console.error(err);
          });
    }
    var MY_COMMAND_ID = "sqlformatter.format";   // package-style naming to avoid collisions
    CommandManager.register("Format SQL", MY_COMMAND_ID, SQL_format);    
    KeyBindingManager.addBinding(MY_COMMAND_ID, "Ctrl-Shift-Q");
});