sap.ui.define([ "sap/ui/demo/nav/controller/BaseController" ], function(
		BaseController) {

	"use strict";

	return BaseController.extend(
			"sap.ui.demo.nav.controller.employee.Employee", {
				
				onInit: function() {
					var oRouter = this.getRouter();
					oRouter.getRoute("employee").attachMatched(this._oRouteMatched, this);
				},
				
				_oRouteMatched: function(oEvent) {
					var oArgs, oView;
					oView = this.getView();
					oArgs = oEvent.getParameter("arguments");
					
					oView.bindElement({
						path: "/Employees("+ oArgs.employeeId +")",
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
				},
				
				_onBindingChange: function(oEvent) {
					// If there is no data for binding
					if(!this.getView().getBindingContext()) {
						this.getRouter().getTargets().display("notFound");
					}
				}
			});
});