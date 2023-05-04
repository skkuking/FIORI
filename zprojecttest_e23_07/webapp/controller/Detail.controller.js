sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zprojectteste2307.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },

            // oEvent 내에는 parameter 정보가 담겨있다.
            _onPatternMatched : function(oEvent){
                // oEvent.getParameter("arguments");
                var oArgu = oEvent.getParameter("arguments");
                console.log(oArgu);

            },

            onNavButtonPress : function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain", {}, true);
                // navTo(1,2,3)
                // 1 : Route Name
                // 2 : Parameters
                // 3 : Route History Clear
            }
        });
    });
