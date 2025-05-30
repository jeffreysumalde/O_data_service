sap.ui.define([
    "sap/ui/core/mvc/Controller",
"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("sapips.training.project2.controller.Main", {
        onInit() {
        },
        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue") || oEvent.getParameter("query");
            var oTable = this.byId("idTables1"); 
            var oBinding = oTable.getBinding("items");
          
            if (sQuery) {
              var oFilter = new Filter({
                path: "ProductName",
                operator: FilterOperator.EQ,
                value1: sQuery
            });
              oBinding.filter([oFilter]);
            } else {
              oBinding.filter([]); 
            }
          },

          _onPressDiscontinued: function (oEvent) {
            var bPressed = oEvent.getParameter("pressed");
            var oTable = this.byId("idTables1");
            var oBinding = oTable.getBinding("items");
          
            if (bPressed) {
                var oFilter = new Filter({
                    path: "Discontinued",
                    operator: FilterOperator.EQ,
                    value1: bPressed
                });
              oBinding.filter([oFilter]);
            } else {
              oBinding.filter([]); 
            }
          }
    });
});