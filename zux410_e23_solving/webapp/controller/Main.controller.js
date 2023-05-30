sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/controls/VizFrame",
    "sap/viz/ui5/data/FlattenedDataset",
  "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel,VizFrame, FlattenedDataset, FeedItem) {
        "use strict";

        return Controller.extend("sap.btp.zux410e23solving.controller.Main", {
            onInit: function () {
                this.byId("idComboBox2").setValue("bar");
                let datas = {
                    list:
                        [
                            { type: 'bar' },
                            { type: 'column' },
                            { type: 'line' },
                            { type: 'donut' }
                        ]
                };

                this.getView().setModel(new JSONModel(datas), 'typeList');

                debugger;

                var oVizFrame = this.byId("vizFrame");
                var oChart = oVizFrame.getVizProperties();
                oChart.plotArea = {
                    dataLabel: {
                      visible: true
                    }
                  };
                  oVizFrame.setVizProperties(oChart);
            },

            onSearch: function (oEvent) {
                // 상대 경로로 값 가져오기 연습
                const oFilterItems = oEvent.getParameter("selectionSet"),
                        oComboBox = oFilterItems[0],
                        sSelectedKey = oComboBox.getSelectedKey();
                const oComboBox2 = oFilterItems[1],
                        sSelectedType = oComboBox2.getSelectedKey();
   
                let oFlattendDataset = this.byId("idFlattendDataset");
                var oVizFrame = oEvent.getParameter("selectionSet");

                let oFilter = new Filter({
                    filters: [
                        new Filter({ path: 'OrderID', operator: 'EQ', value1: sSelectedKey })
                    ]
                });


                var result = this._onChangeBox(oFlattendDataset,sSelectedKey, sSelectedType, oFilter);

                this.byId("idVizFrame").setVizType(sSelectedType);

            },

            _onChangeBox: function ( oFlattendDataset, sSelectedKey, sSelectedType, oFilter) {
                var test = '33';
                if(!sSelectedType) {       // type값이 없으면 에러처리 후 return
                    this.byId("idComboBox2").setValueState("Error");
                    return;
                };

                if (sSelectedKey) {
                    this.byId("idComboBox2").setValueState("None");
                    oFilter = new Filter("OrderID", "EQ", sSelectedKey);
                    oFlattendDataset.getBinding("data").filter(oFilter);
                }else{
                    
                };
                
                return test;

            },

            onChartSelectData: function (oEvent) {
                const oComponent = this.getOwnerComponent(),
                    oRouter = oComponent.getRouter(),
                    // debugger 해서 oEvent.getParameter 확인. 선택한 데이터 정보 얻기.
                    oData = oEvent.getParameter("data")[0].data,
                    oVizFrame = this.byId('idVizFrame'); 

                oVizFrame.vizSelection(oData, { clearSelection: true });  //차트 선택된거 초기화

                oRouter.navTo("RouteDetail", {    // Detail로 이동
                    OrderID: oData.OrderID,
                    ProductID: oData.ProductID,
                });

            }
        });
    });
        // getBinding('프로퍼티 또는 어그리게이션의 이름')
        // Table의 경우 'items'    ,  FlattendDataset의 경우 data.
        // let oFlattenedDataset = this.byId("dataSet");
        // let oFilter;
        // if (sSelectedKey){
        // oFilter = new Filter("OrderID", "EQ", sSelectedKey);
        // oFlattenedDataset.getBinding("data").filter(oFilter);