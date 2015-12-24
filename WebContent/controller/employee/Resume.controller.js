sap.ui.define(["sap/ui/demo/nav/controller/BaseController",
               "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	
	var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"]
	"use strict";
	
	return BaseController.extend("sap.ui.demo.nav.controller.employee.Resume", {
		
		onInit: function() {
			var oRouter = this.getRouter();
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
			this.getView().setModel(new JSONModel(), "view");
		},
		
		_onRouteMatched: function(oEvent) {
			var oArgs, oView, oQuery;
			oView = this.getView();
			oArgs = oEvent.getParameters("arguments");
			
			oView.bindElement({
				path: "/Employees("+ oArgs.arguments.employeeId +")",
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function(oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function(oEvent) {
						oView.setBusy(false);
					}
				}
			});
			
			oQuery = oArgs.arguments["?query"];
			
			if ( oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1 ) {
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				oView.getModel("view").setProperty("/selectedTabKey", _aValidTabKeys[0]);
			}


		},
		
		_onBindingChange: function(oEvent) {
			// If there is no data for binding
			if(!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		
		// Tab select even handler
		// Used to update hash when new tab is selected
		onTabSelect: function(oEvent) {
			var oCtx = this.getView().getBindingContext();
			this.getRouter().navTo("employeeResume", {
				employeeId: oCtx.getProperty("EmployeeID"),
				query: {
					tab: oEvent.getParameter("selectedKey")
				}
			}, true);
		}
	});
});