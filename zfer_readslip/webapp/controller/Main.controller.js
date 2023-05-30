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

        return Controller.extend("ER.zferreadslip.controller.Main", {
            
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

            onInit: function () {
                this.getView().setModel(new JSONModel(), 'main');
                // this.getOwnerComponent().getModel().read('/SLIPHSet/Slipdesc',{
                //     success: function(oReturn) {
                //         this.getView().getModel('main').setProperty('/Slipdesc', oReturn.results);
                //     }
                // })
              

            },
           
            filterTable: function (oEvent) {
                debugger;
                const oFilterItems = oEvent.getParameter('selectionSet');
                const oSliph = oFilterItems[0];
                const sSliph = oSliph.getValue();

                const oDocnum = oFilterItems[1],
                    sDocnum = oDocnum.getValue(), 
                    oTypeCombo = oFilterItems[2],
                    sTypeCombo = oTypeCombo.getSelectedKey(),
                     oPrfdat = oFilterItems[3],
                    sPrfdat = oPrfdat.getValue(),
                    oPstdat = oFilterItems[4],
                    sPstdat = oPstdat.getValue(), 
                    oManagerid = oFilterItems[5],
                    sManagerid = oManagerid.getValue(),
                    oPartid = oFilterItems[6],
                    sPartid = oPartid.getValue();

                let oDataset = this.byId("idSlipTable");
                let aFilter = [];

                if (sSliph) {
                    this.byId("idSliph").setValueState("None");
                    var Sliph = new Filter({ path: "Slipid", operator: "EQ", value1: sSliph });
                    aFilter.push(Sliph);

                };

                if (sDocnum) {
                    console.log('Docnum funcion');
                    this.byId("idDocnum").setValueState("None");
                    var Docnum = new Filter({ path: "Docnum", operator: "EQ", value1: sDocnum });
                    aFilter.push(Docnum);
                };

                if (sTypeCombo) {
                    console.log('TypeCombo funcion');
                    this.byId("idTypeCombo").setValueState("None");
                    var Type = new Filter({ path: "Sliptype", operator: "EQ", value1: sTypeCombo });
                    aFilter.push(Type);
                };

                if (sPrfdat) {
                    this.byId("idPrfdat").setValueState("None");
                    var Prfdat = new Filter({ path: "Prfdate", operator: "EQ", value1: sPrfdat });
                    aFilter.push(Prfdat);
                };

                if (sPstdat) {
                    this.byId("idPstdat").setValueState("None");
                    var Pstdat = new Filter({ path: "Pstdate", operator: "EQ", value1: sPstdat });
                    aFilter.push(Pstdat);
                };

                if (sManagerid) {
                    this.byId("idManagerid").setValueState("None");
                    var Managerid = new Filter({ path: "Managerid", operator: "EQ", value1: sManagerid });
                    aFilter.push(Managerid);
                };

                if (sPartid) {
                    this.byId("idPartid").setValueState("None");
                    var Partid = new Filter({ path: "Partid", operator: "EQ", value1: sPartid });
                    aFilter.push(Partid);
                };

                let oFilter = new Filter({
                    filters: aFilter,
                    and: true
                });
                
                this.byId("idSlipTable").getBinding("items").filter(oFilter);
                debugger;
               
            },

            onSearch: function (oEvent) {
                var oFromDate = this.byId('idPrfdat').getFrom();
                var oToDate =  this.byId('idPrfdat').getTo();
                var oFromPst = this.byId('idPstdat').getFrom();
                var oToPSt =  this.byId('idPstdat').getTo();
                console.log(oFromDate, oToDate, oFromPst, oToPSt);
                this._oGlobalFilter = null;

                const oFilterItems = oEvent.getParameter('selectionSet');
                const oSliph = oFilterItems[0];
                const sSlipid = oSliph.getValue();

                const oDocnum = oFilterItems[1],
                    sDocnum = oDocnum.getValue();

                const oTypeCombo = oFilterItems[2],
                    sSliptype = oTypeCombo.getSelectedKey();

                const oPrfdat = oFilterItems[3],
                    sPrfdate = oPrfdat.getValue();

                const oPstdat = oFilterItems[4],
                    sPstdate = oPstdat.getValue();

                const oManagerid = oFilterItems[5],
                    sManagerid = oManagerid.getValue();

                const oPartid = oFilterItems[6],
                    sPartid = oPartid.getValue();

                let oDataset = this.byId("idSlipTable");
                let aFilter = [];

                if (sSlipid) {
                    this.byId("idSliph").setValueState("None");
                    var fSlipid = new Filter({ path: "Slipid", operator: "EQ", value1: sSlipid });
                    aFilter.push(fSlipid);

                };

                if (sDocnum) {
                    console.log('Docnum funcion');
                    this.byId("idDocnum").setValueState("None");
                    var fDocnum = new Filter({ path: "Docnum", operator: "EQ", value1: sDocnum });
                    aFilter.push(fDocnum);
                };

                if (sSliptype) {
                    console.log('TypeCombo funcion');
                    this.byId("idTypeCombo").setValueState("None");
                    var fType = new Filter({ path: "Sliptype", operator: "EQ", value1: sSliptype });
                    aFilter.push(fType);
                };

                if (oFromDate&&oToDate) {
                    var fPrfdate = new Filter({ path: "Prfdate", operator: "BT", value1: oFromDate, value2 : oToDate });
                    aFilter.push(fPrfdate);
                };

                if (oFromPst&&oToPSt) {
                    var fPstdate = new Filter({ path: "Pstdate", operator: "BT", value1: oFromPst, value2 : oToPSt });
                    aFilter.push(fPstdate);
                };

                if (sManagerid) {
                    this.byId("idManagerid").setValueState("None");
                    var fManagerid = new Filter({ path: "Managerid", operator: "EQ", value1: sManagerid });
                    aFilter.push(fManagerid);
                };

                if (sPartid) {
                    var fPartid = new Filter({ path: "Partid", operator: "EQ", value1: sPartid });
                    console.log(fPartid);
                    aFilter.push(fPartid);
                    console.log(sPartid);
                };


                let oFilter = new Filter({
                    filters: aFilter,
                    and: true
                });


                this.byId("idSlipTable").getBinding("rows").filter(oFilter);

            },
            onGenerate : function (oEvent){
                this._aSelectedid = [] ;
                // var oItem = oEvent.getSource();
                var oRouter = this.getOwnerComponent().getRouter();
                var oTable = this.getView().byId('idSlipTable');
                var aSelectedindices = oTable.getSelectedIndices();

                if (aSelectedindices.length == 0 ) {
                    return;
                }
                // var oModel = this.getView().getModel();
                var aSelectedData = [];

                aSelectedindices.forEach(function(iIndex) {
                    var oContext = oTable.getContextByIndex(iIndex);
                    var oData = oContext.getObject();
                    var sSlipid = oData.Slipid;
                    aSelectedData.push(sSlipid);

                });
                
                this._aSelectedid = aSelectedData;
                this.getView().getModel("local").setProperty("/Headers", aSelectedData);
 
                oRouter.navTo("RouteSecond", {
                });

            }

        });
    });
