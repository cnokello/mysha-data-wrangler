Ext.define('ExtMVC.view.portal.MainNav', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.mainnav',
	
	autoWidth: true,
	maxWidth: 100,
	bodyStyle: 'background-color: #f6f6f6',
	
	initComponent: function() {
        
        Ext.apply(this, {

            title:'MAIN',
            id: 'mainNavLeft',
            autoScroll: true,
            border: false,
            iconCls: 'nav',
            collapsible: false,
            
            dockedItems: [
            	    {
		 	 xtype: 'toolbar',
		 	 dock: 'bottom',
		 	 items: []
		 }
            ],
            
            items: [
            	    {
            	    	    id: 'newDataLoaderProject',
            	    	    xtype: 'buttongroup',
            	    	    width: 100,
            	    	    items: [
            	    	    	    {
            	    	    	    	    xtype: 'button',
            	    	    	    	    width: 95,
            	    	    	    	    height: 80,
            	    	    	    	    icon: './resources/images/newproject.png',
            	    	    	    	    iconAlign: 'top',
            	    	    	    	    scale: 'large',
            	    	    	    	    text: '<B>NEW</b>',
            	    	    	    	    tooltip: 'Create a new data loading project',
            	    	    	    	    //action: 'newDataLoaderProject',
            	    	    	    	    handler: function() {
            	    	    	    	    	var tab = Ext.getCmp('reportpanel').child('#newprojecttab');
            	    	    	    	    	tab.tab.show();
            	    	    	    	    	Ext.getCmp('reportpanel').setActiveTab(tab);
            	    	    	    	    	
            	    	    	    	    }
            	    	    	    }
            	    	    ]
            	    },
            	    {
        	    	    id: 'statusDataLoaderProject',
        	    	    xtype: 'buttongroup',
        	    	    width: 100,
        	    	    items: [
        	    	    	    {
        	    	    	    	    xtype: 'button',
        	    	    	    	    width: 95,
        	    	    	    	    height: 80,
        	    	    	    	    icon: './resources/images/status.png',
        	    	    	    	    iconAlign: 'top',
        	    	    	    	    scale: 'large',
        	    	    	    	    text: '<B>STATUS</b>',
        	    	    	    	    tooltip: 'View status of currently running batches',
        	    	    	    	    handler: function() {
        	    	    	    	    	var tab = Ext.getCmp('reportpanel').child('#statstab');
        	    	    	    	    	tab.tab.show();
        	    	    	    	    	Ext.getCmp('reportpanel').setActiveTab(tab);
        	    	    	    	    	
        	    	    	    	    }
        	    	    	    }
        	    	    ]
            	    },
            	    {
            	    	    id: 'reportBlock',
            	    	    xtype: 'buttongroup',
            	    	    width: 100,
            	    	    items: [
            	    	    	    {
            	    	    	    	    xtype: 'button',
            	    	    	    	    width: 95,
            	    	    	    	    height: 80,
            	    	    	    	    icon: './resources/images/invalid.png',
            	    	    	    	    iconAlign: 'top',
            	    	    	    	    scale: 'large',
            	    	    	    	    text: '<B>FAILED</b>',
            	    	    	    	    tooltip: 'Invalid records report',
            	    	    	    	    //action: 'showReportPanel'
            	    	    	    	    handler: function() {
            	    	    	    	    	var tab = Ext.getCmp('reportpanel').child('#exceptiontab');
            	    	    	    	    	tab.tab.show();
            	    	    	    	    	Ext.getCmp('reportpanel').setActiveTab(tab);
            	    	    	    	    	
            	    	    	    	    }
            	    	    	    }
            	    	    ]
            	    },
            	    
            	    {
            	    	    id: 'browseBlock',
            	    	    xtype: 'buttongroup',
            	    	    width: 100,
            	    	    items: [
            	    	    	    {
            	    	    	    	    xtype: 'button',
            	    	    	    	    width: 95,
            	    	    	    	    height: 80,
            	    	    	    	    icon: './resources/images/valid.png',
            	    	    	    	    iconAlign: 'top',
            	    	    	    	    scale: 'large',
            	    	    	    	    text: '<b>BROWSE</b>',
            	    	    	    	    tooltip: 'Valid records report',
            	    	    	    	    //action: 'showReportPanel'
            	    	    	    	    handler: function() {
            	    	    	    	    	var tab = Ext.getCmp('reportpanel').child('#customerstab');
            	    	    	    	    	tab.tab.show();
            	    	    	    	    	Ext.getCmp('reportpanel').setActiveTab(tab);
            	    	    	    	    	
            	    	    	    	    }
            	    	    	    }
            	    	    ]
            	    },
            	    {
        	    	    id: 'downloadBlock',
        	    	    xtype: 'buttongroup',
        	    	    width: 100,
        	    	    items: [
        	    	    	    {
        	    	    	    	    xtype: 'button',
        	    	    	    	    width: 95,
        	    	    	    	    height: 80,
        	    	    	    	    icon: './resources/images/download32.png',
        	    	    	    	    iconAlign: 'top',
        	    	    	    	    scale: 'large',
        	    	    	    	    text: '<b>DOWNLOAD</b>',
        	    	    	    	    tooltip: 'Valid records report',
        	    	    	    	    //action: 'showReportPanel'
        	    	    	    	    handler: function() {
        	    	    	    	    	var tab = Ext.getCmp('reportpanel').child('#ongoingtab');
        	    	    	    	    	tab.tab.show();
        	    	    	    	    	Ext.getCmp('reportpanel').setActiveTab(tab);
        	    	    	    	    	
        	    	    	    	    }
        	    	    	    }
        	    	    ]
        	    },
            	    
            	    {
            	    	    id: 'administrationBlock',
            	    	    xtype: 'buttongroup',
            	    	    width: 100,
            	    	    items: [
            	    	    	    {
            	    	    	    	    xtype: 'button',
            	    	    	    	    width: 95,
            	    	    	    	    height: 80,
            	    	    	    	    icon: './resources/images/config.png',
            	    	    	    	    iconAlign: 'top',
            	    	    	    	    scale: 'large',
            	    	    	    	    text: '<b>SUBSCRIBERS</b>',
            	    	    	    	    //action: 'showAdminPanel',
            	    	    	    	    handler: function() {
            	    	    	    	    	var tab = Ext.getCmp('reportpanel').child('#admintab');
            	    	    	    	    	tab.tab.show();
            	    	    	    	    	Ext.getCmp('reportpanel').setActiveTab(tab);
            	    	    	    	    	
            	    	    	    	    }
            	    	    	    }
            	    	    ]
            	    },
		    {
            	    	    id: 'logoutBlock',
            	    	    xtype: 'buttongroup',
            	    	    width: 100,
            	    	    items: [
            	    	    	    {
            	    	    	    	    xtype: 'button',
            	    	    	    	    width: 95,
            	    	    	    	    height: 50,
            	    	    	    	    icon: './resources/images/logout.png',
            	    	    	    	    iconAlign: 'top',
            	    	    	    	    scale: 'medium',
            	    	    	    	    text: '<b>LOGOUT</b>',
            	    	    	    	    //action: 'showAdminPanel',
            	    	    	    	    handler: function() {
            	    	    	    	    	location.href = "index.html"
            	    	    	    	    	
            	    	    	    	    }
            	    	    	    }
            	    	    ]
            	    },
            ]
            
        });
                
        this.callParent(arguments);
    }
	
});
