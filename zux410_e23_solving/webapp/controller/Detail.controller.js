sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.zux410e23solving.controller.Detail", {
            onInit: function () {
                const oComponent = this.getOwnerComponent(),
                    oRouter = oComponent.getRouter();
                    // 라우터 패턴이 일치할 때마다 _onRoutePatternMatched() 실행.
                oRouter
                    .getRoute("RouteDetail")
                    .attachPatternMatched(this._onRoutePatternMatched, this);
 
            },

            _onRoutePatternMatched : function (oEvent){
                const oView = this.getView(),
                oModel = oView.getModel(),
                oArgs = oEvent.getParameter('arguments');  // 이벤트 객체에 파라미터 정보가 있음.

                // '/Order_Details(OrderID=10248,ProductID=72)' 를 sBindPath변수에 담는다.
                let sBindPath = oModel.createKey("/Order_Details", {
                    OrderID : oArgs.OrderID,
                    ProductID : oArgs.ProductID,

                });

                oView.bindElement(sBindPath);   // View 에다가 해당 데이터 세팅
                // 위 Binding 방법을 Element Binding또는 Context Binding 이라고 부릅니다.

                // oModel.read(sBindPath, {
                //     success : function(oReturn){

                        
                //         // oDetailModel.setData({
                //         //     Order_Details : [{}, {}..]
                //         // })
                //         // oReturn 안에 조회데이터가 JSON 형태로 들어오게 됨.
                //         // 해당 데이터를 가지고 데이터 가공을 할 수 있음.

                //         // 여기에서 데이터를 받아와서 데이터 핸들링!
                //     }
                // });
                // 여기다가 데이터 핸들링 하면 오류 발생.

            }

        });
    });
