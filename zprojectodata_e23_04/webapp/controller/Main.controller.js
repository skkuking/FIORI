sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter ) {
        "use strict";


        return Controller.extend("zprojectodatae2304.controller.Main", {
            formatter: {

                dateTime: function (oDate) {
                    // console.log(oDate);
                    let oDateTimeInstance;
                    oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern: 'yyyy-MM-dd HH:mm:ss'
                    });
                    return oDateTimeInstance.format(oDate);
                }
            },
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                // oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);

            },
            onSelectionChange: function (oEvent) {
                // 버튼 클릭 시 Detail 화면으로 이동
                // 라우터 가져오기
                var oRouter = this.getOwnerComponent().getRouter();
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                var sKey = this.getView().getModel().getProperty(sPath + '/OrderID');

                // 라우터 객체에 navTo메서드 실행,  oRouter.navTo("객체이름",{파라미터});
                oRouter.navTo("RouteDetail", {
                    'key': sKey
                });
            },
            onValueHelpRequest: function () {
                /*
                CustomerDialog.fragment.xml 오픈
                해당 Dialog 안에 sap.ui.table.Table 세팅 후,
                /Customer 바인딩한다. 표시할 필드는 CustomerID, CompanyName
                팝업에 close 버튼을 구성하여 클릭 시 팝업이 닫히도록 한다.
                */
                // sap.ui.core.Fragment.load({
                //     name : "/zprojectteste2303.view.fragment.HelloDialog",       //경로
                //     type : "XML",    //타입
                //     controller : this
                // }.then(function(oDialog){
                //     oDialog.open();
                // })); //fragmentLoad가 끝나면 then. 함수 실행
                var oDialog = this.byId("customerDialog");      //Dialog의 ID undefined
                if (oDialog) {                              //기존에 oDialog가 존재하면
                    oDialog.open();                        // 그거 열어라 없으면 아래 생성함수 실행.
                    return;                                //return은 현재 속해있는 함수를 탈출한다.
                }
                this.loadFragment({
                    name: "zprojectodatae2304.view.fragment.CustomerDialog"
                }).then(function (oDialog) {
                    oDialog.open();
                }, this)
                sap.m.MessageToast.show('input value help 실행!!');

            },
            onClose: function (oEvent) {
                var oDialog = this.byId("customerDialog"); //Dialog 객체
                oDialog.close();
            },
            onChange: function (oEvent) {
                var aData = oEvent.getParameters();
                var sPath = aData.rowContext.sPath;
                let sKey = this.getView().getModel().getProperty(sPath + '/CustomerID');   // 'ALFKI'
                
                this.byId('idInput01').setValue(sKey);

                this._search();
                this.onClose();
            },
            _search: function () {
                // 값 가져오기
                let sCustomerID = this.byId("idInput01").getValue();

                let oFilter = new Filter({
                    filters: [
                        new Filter({ path: 'CustomerID', operator: 'EQ', value1: sCustomerID })
                    ],
                    and: false
                });

                this.byId('idCustomersTable').getBinding('items').filter([oFilter]);
                // // 필터 객체 생성  new sap.ui.model.Filter(경로, 조건, 값);
                // oFilter = new sap.ui.model.Filter("OrderID", "EQ", sInputValue ),
                // // 빈 배열 생성
                // aFilter = [];

                // let oFilter2 =  new sap.ui.model.Filter("OrderDate", 'GE' , oOrderDate.getDateValue() );

                // // 배열에 객체 데이터 넣어주기
                // aFilter.push(oFilter);
                // // this.byId(테이블).getBinding("items").filter(필터객체들)
                // this.byId('idProductsTable').getBinding("items").filter(aFilter);

            },
            onEnter : function(){
                this._search(Number(this.byId("idInput01").getValue()));
            }


            // onAfterClose : function(oEvent){
            //     // var oTable = this.byId('idCustomer'); //Table에 이름 설정 해주고, byId로 가져옴.
            //     // var oModel = this.getView().getModel(); //MainModel이름을 갖는 JSON 모델 가져옴.

            //     // var aSelectedIndices = oTable.getSelectedIndices();  //변수에 oTable객체의 선택된 인덱스들 가져옴.
            //     // // oTable[aSelectedIndices]
            //     // var aDatas = oModel.getProperty("/Customers");
            //     // debugger;

            // }
        });
    });
