sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";
        return Controller.extend("exprograme23.controller.getDialog", {
            onInit: function (oEvent) {
                    this._loadMyFirstFragment();


            },

            _loadMyFirstFragment:function(){
                // if (!this.oMyFirstDialog) {
                //     this.oMyFirstDialog = Fragment.load({
                //     name: "com.nathan.hand.fragment.bindings.view.fragments.myFirstFragment"
                //     }).then(function (oMyFirstDialog) {
                //         return oMyFirstDialog;
                //     });
                // }

            },

            onCloseDialog : function(oEvent){
                oEvent.getSource();
                this.byId("getDialog").close();
                debugger;
            }


        });
    });
