sap.ui.define([ "sap/ui/core/UIComponent" ], function(UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.nav.Component", {

		metadata : {
			manifest : "json"
		},
		
		// Override the init function
		init: function(){
			
			// Call the init function of the parent
			UIComponent.prototype.init.apply(this,arguments);
			
			// Initialize the router
			this.getRouter().initialize();
		}

	});

});
