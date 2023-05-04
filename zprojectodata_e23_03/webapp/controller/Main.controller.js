sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter) {
        "use strict";

        return Controller.extend("nt.zprojectodatae2303.controller.Main", {
            formatter : {
                onSum : function(a, b){
                    return a+b;
                    debugger;
                },
                dateTime : function(oDate){
                    // console.log(oDate);
                    let oDateTimeInstance;
                    oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern : 'yyyy-MM-dd HH:mm:ss'
                    });
                    return oDateTimeInstance.format(oDate);
                }
            },
            onInit: function () {

            },
            onSearch : function() {
                // 값 가져오기
                let oOrderdate = this.byId("idOrderDate").getDateValue();
                let sInputValue = Number(this.byId("idOrderID").getValue());

                let oFilter = new Filter( { 
                    filters : [
                      new Filter({path : 'OrderID', operator : 'EQ', value1 : sInputValue }),
                      new Filter({path : 'OrderDate', operator : 'GE', value1 : oOrderdate})
                    ],
                    and: false
                });

                this.byId('idProductsTable').getBinding('items').filter([oFilter]);
                
                // // 필터 객체 생성  new sap.ui.model.Filter(경로, 조건, 값);
                // oFilter = new sap.ui.model.Filter("OrderID", "EQ", sInputValue ),
                // // 빈 배열 생성
                // aFilter = [];

                // let oFilter2 =  new sap.ui.model.Filter("OrderDate", 'GE' , oOrderDate.getDateValue() );

                // // 배열에 객체 데이터 넣어주기
                // aFilter.push(oFilter);
                // // this.byId(테이블).getBinding("items").filter(필터객체들)
                // this.byId('idProductsTable').getBinding("items").filter(aFilter);
            }
        });
    });
