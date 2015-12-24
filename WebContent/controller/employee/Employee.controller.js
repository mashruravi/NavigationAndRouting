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
					console.log(oEvent.getParameter("employeeId"));
					console.log(oEvent.getParameters());
					
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
				},
				
				onShowResume: function(oEvent) {
					var oCtx = this.getView().getElementBinding().getBoundContext();
					
					this.getRouter().navTo("employeeResume", {
						employeeId: oCtx.getProperty("EmployeeID")
					});
				}
			});
});