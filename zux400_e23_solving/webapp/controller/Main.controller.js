sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.zux400e23solving.controller.Main", {
            formatter : {
                transformDiscontinued : function(sData){
                    if (sData == true){
                        sData = "Yes";
                    }else{
                        sData = "No";
                    }    
                    return sData;

                    //return value === true ? 'Yes' : 'No';

                }
            },

            onInit: function () {
                this.getView().setModel(new JSONModel({ list : [] }), 'MainModel');  

            },

            onRandomPress: function () {
                // let oControl = this.byId('idInput');
                // let oModel = this.getView().getModel('MainModel');
                // let arr = oModel.getProperty("/list");  // [{num : 4}, {}, {}  ]
                // oControl.setValue(Math.floor(Math.random() * 100 ) + 1 );
                // arr.push( { num : oControl.getValue() });
                // oModel.setProperty("/list", arr);


                var iRandom = Math.floor(Math.random() * 100) + 1;            // 랜덤 값 받아옴.
                var oModel = this.getView().getModel("MainModel");            // 모델 가져옴.
                var aList = oModel.getData().list; // [{rows : 'text'}]       // 모델의 데이터 중 list 가져옴.
                
                this.byId("idInput").setValue(iRandom);                       // 값 세팅
                aList.push({ rows: iRandom });                                // 가져온 데이터에 새 값 push
                oModel.setProperty("/list", aList);                           // oModel에 property 세팅.

            },

            onOpenDialog : function(){
                var oDialog = this.byId("productsDialog");      //Dialog의 ID undefined
                if (oDialog) {                              //기존에 oDialog가 존재하면
                    oDialog.open();                        // 그거 열어라 없으면 아래 생성함수 실행.
                    return;                                //return은 현재 속해있는 함수를 탈출한다.
                }
                //위에 oDialog가 존재하지 않는다면, 처음생성하는거라면!
                this.loadFragment({
                    name: "sap.btp.zux400e23solving.view.fragment.Products"
                }).then(function (oDialog) {
                    oDialog.open();
                }, this)
            },

            onFragmentClose : function(oEvent){
                var oDialog = oEvent.getSource().getParent(); //Dialog 객체

                // var sValue  = oDialog.getContent()[0].getItems()[1].getValue();
                // console.log(sValue);

                // var sValue = this.getView().getModel("root").getProperty("/value");
                // console.log(sValue);
                oDialog.close();

            },
            onValueChange : function(oEvent){
                var iValue = Number(oEvent.getParameters().value);
                var oModel = this.getView().getModel("MainModel");            // 모델 가져옴.
                var aList = oModel.getData().list; // [{rows : 'text'}]       // 모델의 데이터 중 list 가져옴.
                let oControl = this.byId("idInput");
                let iNum = Number(oControl.getValue());
                let isOK = iNum >= 1 && iNum <= 100;
                
                oControl.setValueState(isOK ? 'None' : 'Error');
                oControl.setValueStateText(isOK ? '' : "1과 100사이만 뭐시깽이");
                this.byId("idButton").setEnabled(isOK? true : false);

                if (isOK){
                    aList.push({ rows: iValue });                                // 가져온 데이터에 새 값 push
                    oModel.setProperty("/list", aList);                           // oModel에 property 세팅.
                }else{
                    
                }

                // var iValue = Number(oEvent.getParameters().value);
                // var oModel = this.getView().getModel("MainModel");            // 모델 가져옴.
                // var aList = oModel.getData().list; // [{rows : 'text'}]       // 모델의 데이터 중 list 가져옴.
                // var oInput = this.byId("idInput");
                // if (iValue >= 1 && iValue <= 100){
                //     oInput.setValueState(
                //         "None"
                //     );
                //     this.byId("idInput").setValue();                       // 값 세팅
                //     aList.push({ rows: iValue });                                // 가져온 데이터에 새 값 push
                //     oModel.setProperty("/list", aList);                           // oModel에 property 세팅.
                // }else{
                    
                //     oInput.setValueState(
                //         "Error"
                //     );
                //     oInput.setValueStateText("1이하 뭐시깽이");
                // }

            }
        });
    });
