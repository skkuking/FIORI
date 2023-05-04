sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (  Controller , JSONModel ) {
        "use strict";

        return Controller.extend("zprojectodatae2304.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
                
                // detail 이름을 갖는 모델을 생성.
                this.getView().setModel(new JSONModel(), 'detail');  // this컨트롤러에 view에 모델을 세팅함.
                /*
                var data = {key : value , ...}
                */

            },

            _onPatternMatched : function(oEvent){
                // oEvent.getParameter("arguments");
                var oView = this.getView();
                var oArgu = oEvent.getParameter("arguments");
                var oModel = oView.getModel();   // Northwind Odata Model.
                
                // 위에서 정의한 detail이름을 갖는 모델의 포매슬 갖는 객체를 생성
                // Local Json Model을 생성한것.
                var oDetailModel = oView.getModel('detail');
                
                // var oFilter = new sap.ui.model.Filter('필드이름', '조건', '값');
                var oFilter = new sap.ui.model.Filter('OrderID', 'EQ', oArgu.key);

                // var odata = this.getView().getModel('detail');
                console.log(oArgu);   // { key : 10248 }


                oView.setBusy(true);
                // GET : /iwfnd/gw_client
                // .../northwind.svc/Orders?$filter=OrderID eq 10248
                //객체.read("경로", {})
                oModel.read('/Orders', {
                    urlParameters : {
                        '$expand' : 'Customer,Employee'
                    },
                    filters : [oFilter],
                    success : function(oReturn) {
                        oView.setBusy(false);
                        console.log(oReturn.results[0]);
                        
                        // /data 라는 경로는 설정해주진 않았지만 1레벨까지는 알아서 집어넣어준다.
                        oDetailModel.setProperty("/data", oReturn.results[0]);
                        /* 
                            {OrderID : 10248, CustomID : '', Customers : {...}, ...}
                        */
                        console.log("read success");
                    }.bind(this),

                    error : function(){
                        oView.setBusy(false);
                        sap.m.MessageToast.show('에러 발생');
                    }

                });
                
                console.log("pattern matched function");

            }

        });
    });