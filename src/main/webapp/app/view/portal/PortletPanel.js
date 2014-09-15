Ext.define('ExtMVC.view.portal.PortletPanel', {
    extend: 'ExtMVC.view.app.PortalPanel',    
    alias: 'widget.portletpanel',
    
    layout: 'vbox',

    uses: ['ExtMVC.util.Constants'],
    
    initComponent: function() {
    	    this.items = [
		    {
			id: 'col-1',
			items: [
				{
				    id: 'portlet-1',
				    title: 'Monitor Statistics',
				    hidden: true,
				    
				    items: [
				    	    {
				    	    	    xtype: 'gridportlet',
				    	    	    id: 'statsGrid',
				    	    }
				    ]//
				}
			]
		    }
            ]
                
        this.callParent(arguments);
    }
});
