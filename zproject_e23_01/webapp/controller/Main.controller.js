sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var test = 'hihi';  //클로저 변수 전역변수로 이해하면 좋음.

        return Controller.extend("zprojecte2301.controller.Main", {
            iNumber : 20,   //중괄호로 닫혀있으니, 객체형태로 키 밸류라고 보면 됨. let이나 var 필요없음.
            onInit: function () {   //아묻따 실행됨. 초기값 설정 많이 함
                this.test2 = 'hihi';
                this.iNumber = 20 ;
        /*
        this.byId('idInput1').setValue(10);
        this.byId('idInput2').setValue(20);
        this.byId('idSelect1').setSelectedKey('multiply')
        */    
            },
            Submit : function(oEvent) {
                test   // 클로저변수
                this.test2
                this.iNumber
                /*
                let sValue = this.byId('idInput1').getValue();  //input값 가져오기, this는 컨트롤러를 가리킴.
                alert(sValue)
                */
                this._setSum(10 , 20, 30);             
            },
            _setSum : function(a,b,c) {
                return a+ b + c ;

            },

            onClick : function() {
                var oInput = this.byId('idCustomer');  // Input 객체
                var oLabel = oInput.getLabels()[0];                 // Label 객체

                oLabel.getText();    // 'Customer'
                console.log(oLabel.getText());
            }
        });
    });
