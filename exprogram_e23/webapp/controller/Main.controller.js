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

        return Controller.extend("exprograme23.controller.Main", {
            onInit: function () {
                let datas = {
                    curr:
                        [
                            { type: 'USD' },
                            { type: 'EUR' },
                            { type: 'KRW' }
                        ]
                };

                this.getView().setModel(new JSONModel(datas), 'currList');

                this._defaultSet();
            },
            _defaultSet: function () {
                // // odata Model 변수 세팅
                // this.oModel = new JSONModel();
                // // json model 변수 세팅"
                // this.oMainModel = this.getView().getModel("main");
                // table 객체
                // this.oTable = this.byId("idTable");
            },
            onButtonPress: function (oEvent) {
                var sSelectedCurr = this.byId("idCurrcode").getSelectedKey(); // EUR
                var sTypedCarr = this.byId('idCarrier').getValue();        // Air
                let oDataset = this.byId("idCarrierTable");
                let aFilter = [];

                if (sSelectedCurr) {
                    this.byId("idCurrcode").setValueState("None");
                    var curr = new Filter({ path: "Currcode", operator: "EQ", value1: sSelectedCurr });
                    aFilter.push(curr);

                };

                if (sTypedCarr) {
                    this.byId("idCarrier").setValueState("None");
                    var carr = new Filter({ path: "Carrname", operator: "Contains", value1: sTypedCarr });
                    aFilter.push(carr);
                };
                let oFilter = new Filter({
                    filters: aFilter,
                    and: true
                });
                oDataset.getBinding("items").filter(oFilter);

            },


            onReservation: function (oEvent) {
                var oModel = oEvent.getSource().getModel();
                var oData = oModel.oData;
                var sCarr  = oEvent.getSource().getBindingContext().getObject().Carrid;
                var oContext = oEvent.getSource().getBindingContext();
                var sPath = oContext.sPath;
                var oProperty = oModel.getProperty("/");
                let aFilter = [];


                // oModel.read(sPath, {
                //     urlParameters: { $expand: "to_Item" },
                //     success: function (oReturn) {   
                //         var carr = new Filter({ path: "Carrname", operator: "EQ", value1: sCarr });
                //         aFilter.push(carr);
                //     }.bind(this),
                // });
                // oData.getBinding("items").filter(oFilter);
                // oModel.setModel(new jsonModeldata=oData )
                // debugger;
                // })); //fragmentLoad가 끝나면 then. 함수 실행
                var oDialog = this.byId("getDialog");      //Dialog의 ID undefined
                if (oDialog) {                              //기존에 oDialog가 존재하면
                    oDialog.open();                        // 그거 열어라 없으면 아래 생성함수 실행.
                    return;                                //return은 현재 속해있는 함수를 탈출한다.
                } else {
                    this.loadFragment({
                        name: "exprograme23.view.fragment.getDialog"
                    }).then(function (oDialog) {
                        oDialog.open();
                    }, this)
                };

            }
        });
    });
