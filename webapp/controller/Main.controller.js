sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("sapips.training.project2.controller.Main", {
        onInit() {

          this.oFilter =  null;
          this.oDFilter =  null;
        },
        _onSearch: function (oEvent) {
            let sQuery = oEvent.getParameter("newValue").toLowerCase() || oEvent.getParameter("query");

            if (sQuery) {
                this.oFilter = new Filter({
                path: "ProductName",
                operator: FilterOperator.Contains,
                value1: sQuery
            });
            } else {
              this.oFilter =  null;
            }
            this._applyCombinedFilters();
          },

          _onPressDiscontinued: function (oEvent) {
            let bPressed = oEvent.getParameter("pressed");
    
            if (bPressed) {
                    this.oDFilter = new Filter({
                    path: "Discontinued",
                    operator: FilterOperator.EQ,
                    value1: bPressed
                });
            } else {
              this.oDFilter =  null;
            }
            this._applyCombinedFilters();
          },

          _applyCombinedFilters: function() {
            let oTable = this.byId("idTables1");
            let oBinding = oTable.getBinding("items");
          
            // Combine all active filters using AND
            var aAllFilters = []
            .concat(this.oFilter ? [this.oFilter] : [])
            .concat(this.oDFilter ? [this.oDFilter] : []);
          
            if (aAllFilters.length > 0) {
              let oCombinedFilter = new Filter(aAllFilters, true); 
              oBinding.filter(oCombinedFilter);
            } else {
              oBinding.filter([]);
            }
          }
    });
});