Ext.define('ExtMVC.view.portal.NavigationMenu', {
    extend: 'Ext.window.Window',    
    
    alias: 'widget.processdetail',
    width: 250,
    autoHeight: true,
    minHeight: 500,
    bodyStyle: 'background-color: #f6f6fb',
    
    initComponent: function() {
        
        Ext.apply(this, {

            title:'PROCESSING DETAILS AND OPERATIONS',
            id: 'dtlPanel2',
            autoScroll: true,
            border: false,
            collapsible: true,
            collapsed: true,
            iconCls: 'nav',
            
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
		 },
		 {
		 	 xtype: 'toolbar',
		 	 dock: 'bottom',
		 	 items: [
		 	 	 {
		 	 	 	 icon: './resources/images/information.png',
		 	 	 	 text: 'Help Center'
		 	 	 }
		 	 ]
		 }
            ],
            items: [
            	    {
            	    	    id: 'testMorePlaceHolder',
            	    	    html: '',
            	    	    bodyPadding: 5,
            	    	    bodyStyle: 'background-color: #f6f6f9'
            	    }
            ]
            
        });
                
        this.callParent(arguments);
    }
});