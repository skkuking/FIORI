sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function ( JSONModel , Controller) {
        "use strict";

        return Controller.extend("zprojectteste2307.controller.Main", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                // 패턴이 맞으면 onPatternMatched라는 함수를 실행시키도록 함.
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this)
            },

            onButtonPress : function(){
                // 버튼 클릭 시 Detail 화면으로 이동
                // 라우터 가져오기
                var oRouter = this.getOwnerComponent().getRouter();

                // 라우터 객체에 navTo 메서드 실행.   oRouter.navTo("객체이름",{파라미터});
                oRouter.navTo("RouteDetail",{
                    aa : 'Apple',
                    bb : 'Bamama'
                });
            }
            
        });
    });
