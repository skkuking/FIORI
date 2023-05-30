/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapbtp/zux400_e23_solving/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
