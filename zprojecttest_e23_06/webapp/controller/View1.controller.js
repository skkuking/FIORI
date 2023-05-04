sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("zprojectteste2306.controller.View1", {
            onInit: function () {
                let datas = {
                    title: { subTitle: 'Json SubTitle' },                  //JSON모델의 포맷에 맞춰 데이터 생성.
                    list: [
                        { num1: 33, oper: '+', num2: 10, result: 43 }
                    ],
                    todo: [
                        { content: 'test' },
                        { content: '1' },
                        { content: '2' },
                        { content: '3' },
                        { content: '4' },
                        { content: '5' }
                    ]
                };
                var oModel = new JSONModel();
                oModel.loadData(sap.ui.require.toUrl("zprojectteste2306/model/data.json"))

                this.getView().setModel(new JSONModel(datas), 'MainModel');  // this컨트롤러에 view에 모델을 세팅함.

            },
            onAdd: function () {
                var oDialog = this.byId("addDialog");      //Dialog의 ID undefined
                if (oDialog) {                              //기존에 oDialog가 존재하면
                    oDialog.open();                        // 그거 열어라 없으면 아래 생성함수 실행.
                    return;                                //return은 현재 속해있는 함수를 탈출한다.
                }
                //위에 oDialog가 존재하지 않는다면, 처음생성하는거라면!
                this.loadFragment({
                    name: "zprojectteste2306.view.fragment.addDialog"
                }).then(function (oDialog) {
                    oDialog.open();
                }, this)

            },
            onDelete: function () {
                var oTable = this.byId('todoTable'); //Table에 이름 설정 해주고, byId로 가져옴.
                var oModel = this.getView().getModel("MainModel"); //MainModel이름을 갖는 JSON 모델 가져옴.

                var aSelectedIndices = oTable.getSelectedIndices();  //변수에 oTable객체의 선택된 인덱스들 가져옴.
                var aDatas = oModel.getProperty("/todo");
                let sMsg = '정말 삭제하시겠습니까?';   // 문자열 변수

                MessageBox.confirm(
                    sMsg, {
                    icon: MessageBox.Icon.INFORMATION,
                    title: "Delete 팡션",
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (oAction) {

                        if (oAction === 'YES') {
                            for (var i = aSelectedIndices.length - 1; i >= 0; i--) {
                                console.log(aSelectedIndices[i]);
                                aDatas.splice(aSelectedIndices[i], 1);   // ()안에 (배열[인덱스], 1 ) 들어감.  
                                // oModel.setProperty("/todo", aDatas);
                            };
                            oModel.setProperty("/todo", aDatas);
                        }

                    }
                });


            },

            onConfirm: function (oEvent) {
                var sText = this.byId('idTodo1').getValue();
                var oModelT = this.getView().getModel('MainModel');               //모델을 불러오는 변수 선언
                var aTodo = oModelT.getData().todo; // [{}, {}, {}]
                var oDialog = oEvent.getSource().getParent(); //Dialog 객체
                var sValue = this.getView().getModel("root").getProperty("/value");

                if (sValue) {
                    aTodo.unshift({
                        content: sText
                    });
                    oModelT.setProperty("/todo", aTodo);

                };
                oDialog.close();
                // oEvent.getSource().getParent().close();
            },
            
            onClose: function (oEvent) {
                var oDialog = oEvent.getSource().getParent(); //Dialog 객체

                // var sValue  = oDialog.getContent()[0].getItems()[1].getValue();
                // console.log(sValue);

                var sValue = this.getView().getModel("root").getProperty("/value");
                console.log(sValue);
                oDialog.close();
            },

            beforeOpen: function (oEvent) {
                // this.byId('idTodo1').setProperty('');
                // this.getView().getModel("root").setProperty("/value",'');
                this.byId("idTodo1").setValue();
            },
            onRowDelete: function (oEvent) {
                var oModel = this.getView().getModel("MainModel");            // MainModel이름을 갖는 JSON 모델 가져옴.
                var aDatas = oModel.getProperty("/todo");                     // MainModel의 todo 프로퍼티를 가져옴./
                var iWillDeleteIndex = oEvent.getParameters().row.getIndex(); // t:RowActionItem의 파라미터에서 row의 메소드로 인덱스를 가져와 변수에 담음.
                debugger;
                aDatas.splice(iWillDeleteIndex, 1);                          // aDatas에서 인덱스에 해당하는 데이터를 잘라냄.
                oModel.setProperty("/todo", aDatas);                          // oModel의 프로퍼티를 세팅함.ㄴ

            }
        });
    });
