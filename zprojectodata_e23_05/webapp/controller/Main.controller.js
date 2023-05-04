sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("zprojectodatae2305.controller.Main", {
            onInit: function () {

                // 'main'이름을 갖는 JSON모델 생성
                this.getView().setModel(new JSONModel(), "main");

                this._defaultSet();
            },
            _defaultSet: function () {
                // odata Model 변수 세팅
                this.oModel = this.getOwnerComponent().getModel();
                // json model 변수 세팅"
                this.oMainModel = this.getView().getModel("main");
                // table 객체
                this.oTable = this.byId("idTable");
            },
            onCreate: function () {
                let oData = this.oMainModel.getData();

                oData.Productno = Number(oData.Productno);

                // this.oModel.create("경로", 객체);
                this.oModel.create("/Products", oData, {
                    success: function () {
                        sap.m.MessageToast.show("Create Success!!");

                    },
                    error: function () {
                        sap.m.MessageToast.show("Error Success!!");

                    }
                });
                // let oMainModel = this.getView().getModel('main');
            },
            onUpdate: function () {
                let jsonData = this.oMainModel.getProperty('/');
                let sFullPath = this.oModel.createKey("/Products", {
                    Productno: jsonData.Productno
                });

                // this.oModel.update("sPath","")
                this.oModel.update(sFullPath, jsonData, {
                    success : function(){
                        sap.m.MessageToast.show("변경되었습니다.");
                    },
                    error : function(){
                        sap.m.MessageToast.show("Error가 났어요!");
                    }
                });

            },

            onDelete: function () {
                let index = this.oMainModel.getProperty('/Productno');
                let sFullPath = this.oModel.createKey("/Products", {
                    Productno: Number(index)

                });
                this.oModel.remove(sFullPath, {
                    success: function () {
                        sap.m.MessageToast.show("삭제되었습니다.")
                    }
                });

            },

            onReadEntity: function () {

                // 경로를 구성하는 방식. 인덱스 추출하고 인덱스 기반으로 컨텍스트에서 path 추출.
                let index = this.oTable.getSelectedIndex();
                let sPath = this.oTable.getContextByIndex(index).getPath();

                // 위에서 정의한 detail이름을 갖는 모델의 포매슬 갖는 객체를 생성
                // Local Json Model을 생성한것.
                // var oMainModel = this.getView().getModel('main');

                // let sFullPath = this.oModel.createKey("/Products",{
                //      Productno : 2
                // })

                this.oModel.read(sPath, {
                    success: function(oReturn) {
                        console.log("READ :", oReturn);
                    this.oMainModel.setProperty("/", oReturn);
                    }.bind(this)
            });

        },
        onRefresh : function(){
            this.oModel.refresh(true);

        }

    });
    });
