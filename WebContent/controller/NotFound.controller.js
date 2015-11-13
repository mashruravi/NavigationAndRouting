sap.ui.define([ "sap/ui/demo/nav/controller/BaseController" ], function(
		BaseController) {

	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.NotFound", {

		onInit : function() {
			var oRouter, oTarget;
			oRouter = this.getRouter();
			oTarget = oRouter.getTarget("notFound");
			oTarget.attachDisplay(function(oEvent) {
				this._oData = oEvent.getParameter("data"); // store the data
			}, this);
		},

		// Override the parent's onNavBack inherited from BaseController
		onNavBack : function(oEvent) {
			var oHistory, sPreviousHash, oRouter;

			// If this target was displayed from a previous
			// target without changing the hash
			if (this._oData && this._oData.fromTarget) {
				this.getRouter().getTargets().display(this._oData.fromTarget);
				delete this._oData.formTarget;
				return;
			}
			
			// Call parent onNavBack method
			BaseController.prototype.onNavBack.apply(this, arguments);
		}
	});
});