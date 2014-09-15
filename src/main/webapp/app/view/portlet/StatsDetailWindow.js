Ext.define('ExtMVC.view.portlet.StatsDetailWindow', {
	extend: 'Ext.window.Window',
	alias: 'widget.statsdetailwindow',
	id: 'statsdetailwindow',
	
	title: 'Stats Details',
	width: 400,
	height: 600,
	//x: 400,
	//y: 200,
	headerPosition: 'bottom',
	layout: 'fit',
	modal: true,
	constrain: true,
	//autoScroll: true,
	items: {
		border: false
	},
	
	dockedItems: [
		{
		    xtype: 'toolbar',
		    dock: 'top',
		    items: [
			    {
				    xtype: 'button',
				    icon: './resources/images/toggle.png',
				    text: 'Toggle Processing',
				    action: 'toggleProcessing',
				    menu: [
					    {
						    id: 'toggleParsing',
						    icon: './resources/images/parse.png',
						    text: 'Suspend Parsing',
						    action: 'TOGGLE_PARSING',
						    event: 'toggleparsing',
						    routeType: 'PARSING'
					    },
					    {
						    id: 'toggleValidation',
						    icon: './resources/images/validate.png',
						    text: 'Suspend Validation',
						    action: 'TOGGLE_VALIDATION',
						    event: 'togglevalidation',
						    routeType: 'VALIDATION'
					    },
					    {
						    id: 'toggleDbLoading',
						    icon: './resources/images/db.png',
						    text: 'Suspend DB Loading',
						    action: 'TOGGLE_DB_LOADING',
						    event: 'toggledbloading',
						    routeType: 'DBLOADING'
					    }
				    ]
			    }
	    ]
	 }
	]
});
