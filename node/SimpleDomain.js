/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global */

(function () {
  "use strict";
  // var sqlFormatter = require("sql-formatter");
  var os = require("os");
  var sqlFormatter =  require("sql-formatter");
  /**
   * @private
   * Handler function for the simple.sql_format command.
   * @param {string} Input.
   * @return {string} Formatted SQL.
   */
  function sql_format(input) {
    return sqlFormatter.format(input);
  }

  /**
   * Initializes the test domain with several test commands.
   * @param {DomainManager} domainManager The DomainManager for the server
   */
  function init(domainManager) {
    if (!domainManager.hasDomain("simple")) {
      domainManager.registerDomain("simple", { major: 0, minor: 1 });
    }
    domainManager.registerCommand(
      "simple", // domain name
      "formatSQL", // command name
      sql_format, // command handler function
      false, // this command is synchronous in Node
      "Format seleted SQL statement",
      [{
        name: "input", // parameters
        type: "string",
        description: "SQL statement to be formatted"
      }],
      [{
        name: "output", // return values
        type: "string",
        description: "Formatted SQL statement"
      }]
    );
  }

  exports.init = init;

}());