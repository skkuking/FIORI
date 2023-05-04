sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",         // 추가함.
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {           // 이렇게 등록해야 함수안에서 사용가능
        "use strict";
        var text = 'Hello';
        return Controller.extend("C05.zprojectteste2302.controller.View1", {
            onInit: function () {
                this.byId('idInput').setValue('Hello');
            },
            onSubmit : function() {
                let sValue = this.byId('idInput').getValue();
                this.byId('idText').setText(sValue);
                // this.byId("idText").setText(this.byId("idInput").getValue());
                // this.byId('idText').setText(oInput);
                // this.byId('idText').setValue(thist.byId('idInput').getValue())
                /*
                let sValue = this.byId('idInput1').getValue();  //input값 가져오기, this는 컨트롤러를 가리킴.
                alert(sValue)
                */            
            },
            onBtnPress: function(){
                let oSelect = this.byId('idSelect1').getSelectedItem(),
                    iNum1 = Number(this.byId('idInput1').getValue()),
                    iNum2 = Number(this.byId('idInput2').getValue()),
                    result = 0;
                    let sMsg = '';   // 문자열 변수
                debugger;
                /* 계산기 로직 작성 */
                switch (oSelect.getKey()) {
                    case 'plus':
                        result = iNum1 + iNum2;
                      break;
                    case 'minus':
                        result = iNum1 - iNum2;
                      break;
                    case 'multiply':
                        result = iNum1 * iNum2;
                      break;
                    case 'divide':
                        result = iNum1 / iNum2;
                        break;
                    default:
                      // 위의 모든 case에 해당하지 않을 때 실행할 코드 블록
                      break;
                  }
                  sMsg =  `${iNum1}  ${oSelect.getText()} ${iNum2}  =  ${result}` ;

                MessageToast.show(sMsg);
                MessageBox.show(
                    sMsg, {
                        icon: MessageBox.Icon.INFORMATION,
                        title: "My message box title",
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        emphasizedAction: MessageBox.Action.YES,
                        onClose: function (oAction) { / * do something * / }
                    } );
            }
        });
    });
