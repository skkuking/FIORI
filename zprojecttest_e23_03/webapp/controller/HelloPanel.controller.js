sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";
        return Controller.extend("zprojectteste2303.controller.HelloPanel", {
            onInit: function () {
            },
            onHelloPress: function(){
                // sap.ui.core.Fragment.load({
                //     name : "/zprojectteste2303.view.fragment.HelloDialog",       //경로
                //     type : "XML",    //타입
                //     controller : this
                // }.then(function(oDialog){
                //     oDialog.open();
                // })); //fragmentLoad가 끝나면 then. 함수 실행
                var oDialog = this.byId("helloDialog");      //Dialog의 ID undefined
                if (oDialog){                              //기존에 oDialog가 존재하면
                    oDialog.open();                        // 그거 열어라 없으면 아래 생성함수 실행.
                    return;                                //return은 현재 속해있는 함수를 탈출한다.
                }
                this.loadFragment({
                    name : "zprojectteste2303.view.fragment.HelloDialog"
                }).then(function(oDialog){
                    oDialog.open();
                }, this)
            },
            onClose: function(oEvent){
                var oDialog = oEvent.getSource().getParent(); //Dialog 객체
                oDialog.close();
            }
        });
    });
