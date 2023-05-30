sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
    "sap/ui/core/UIComponent",
    'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
	'sap/ui/model/odata/v2/ODataModel'

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel, Sorter, UIComponent, exportLibrary, Spreadsheet, ODataModel ) {
        "use strict";

        return Controller.extend("ER.zferreadslip.controller.Second", {
            formatter: {

                dateTime: function (oDate) {
                    // console.log(oDate);
                    let oDateTimeInstance;
                    oDateTimeInstance = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern: 'yyyy-MM-dd'
                    });

                    return oDateTimeInstance.format(oDate);
                }
            },

            onInit: function (oEvent) {

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteSecond").attachPatternMatched(this._onObjectMatched, this);
                    
            },
    
            _onObjectMatched: function (oEvent) {
                let aHeaders = this.getOwnerComponent().getModel('local').oData['Headers'];
                let aFilter = [];

                if (aHeaders) {
                    aHeaders.forEach(function (atom, index, arr2) {
                        console.log(atom, index, arr2);
                        aFilter.push( new Filter({ path : 'Slipid', operator : 'EQ', value1: atom} ) );
                        }
                    );
                };
           
                this.byId("idSlipitemTable").getBinding("items").filter(aFilter);
                
            },

            createColumnConfig: function() {
                var aCols = [];
    
                aCols.push({
                    label: '전표ID',
                    property: 'Slipid',
                    type: 'string'
                });

                aCols.push({
                    label: '순번',
                    property: 'Prnum',
                    type: 'string'
                });
    
                aCols.push({
                    label: '협력사ID',
                    type: 'number',
                    property: 'Partid'
                });

                aCols.push({
                    label: '협력사이름',
                    type: 'string',
                    property: 'Pname'
                });

                aCols.push({
                    label: '전표유형',
                    type: 'string',
                    property: 'Sliptype'
                });
    
                aCols.push({
                    label: '전표유형상세',
                    type: 'string',
                    property: 'Typedesc'
                });

                aCols.push({
                    label: '증빙문서번호',
                    type: 'string',
                    property: 'Docnum'
                });

                aCols.push({
                    label: '담당자ID',
                    type: 'string',
                    property: 'Managerid'
                });

                aCols.push({
                    label: '담당자이름',
                    type: 'string',
                    property: 'Ename'
                });

                aCols.push({
                    label: '계정과목코드',
                    type: 'string',
                    property: 'Accocode'
                });

                aCols.push({
                    label: '계정과목명',
                    type: 'string',
                    property: 'Acconm'
                });

                aCols.push({
                    label: '차변',
                    type: 'string',
                    property: 'Debit'
                    // expression: "{= ${item>Dcindicator} === '3' ? (Number(${item>Amt}) + Number(${item>Tax})) * 100 : '0' }"
                  });
                
                  aCols.push({
                    label: '대변',
                    type: 'string',
                    property: 'Credit'
                    // expression: "{= ${item>Dcindicator} === '4' ? (Number(${item>Amt}) + Number(${item>Tax})) * 100 : '0' }"
                  });

                aCols.push({
                    label: '통화',
                    type: 'string',
                    property: 'Curkey'
                });

                aCols.push({
                    label: '사업자번호',
                    type: 'string',
                    property: 'Partnum'
                });
    
                return aCols;
            },
            
            onExport: function() {
                var aCols, oRowBinding, oSettings, oSheet, oTable;
    
                if (!this._oTable) {
                    this._oTable = this.byId('idSlipitemTable');
                }
    
                oTable = this._oTable;
                oRowBinding = oTable.getBinding('items');
                aCols = this.createColumnConfig();

                oRowBinding.oModel.read(oRowBinding.getPath(), {
                    filters : oRowBinding.aFilters,
                    success: function(oReturn) {
                        var results = oReturn.results.map(function(item) {
                            item.Debit = item.Dcindicator === '3' ? (Number(item.Amt) + Number(item.Tax)) * 100 : '0'
                            item.Credit = item.Dcindicator === '4' ? (Number(item.Amt) + Number(item.Tax)) * 100 : '0'
                            return item;
                        })
                        
                        oSettings = {
                            workbook: {
                                columns: aCols,
                            },
                            dataSource: results,
                            fileName: 'Table export sample.xlsx',
                            worker: false // We need to disable worker because we are using a MockServer as OData Service
                        };
                        
            
                        oSheet = new Spreadsheet(oSettings);
                        oSheet.build().finally(function() {
                            oSheet.destroy();
                        });
                    }
                })

    
                // oSettings = {
                //     workbook: {
                //         columns: aCols,
                //     },
                //     dataSource: oRowBinding,
                //     fileName: 'Table export sample.xlsx',
                //     worker: false // We need to disable worker because we are using a MockServer as OData Service
                // };
    
                // oSheet = new Spreadsheet(oSettings);
                // oSheet.build().finally(function() {
                //     oSheet.destroy();
                // });
            }
            // onNavButtonPress: function () {
            //     debugger;
            //     var oRouter = this.getOwnerComponent().getRouter();
            //     oRouter.navTo("RouteMain", {}, true);
            // }

        });
    });
