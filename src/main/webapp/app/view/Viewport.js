Ext.define('ExtMVC.view.Viewport', {
    alias: 'widget.mainviewport',
    extend: 'Ext.container.Viewport',
   
    uses: [
        'ExtMVC.view.app.PortalPanel', 
        'ExtMVC.view.app.PortalColumn',
        'ExtMVC.view.portal.PortletPanel',
        'ExtMVC.view.portal.WestMenu',
        'ExtMVC.view.portal.MainNav',
        'ExtMVC.view.portlet.GridPortlet', 
        'ExtMVC.view.portlet.ChartPortlet',
        'ExtMVC.util.Constants'
    ],

    initComponent: function(){

        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 0 0 0'
            },
            items: [
            {
                id: 'app-header',
                xtype: 'box',
                region: 'north',
                height: 50,
                html: "<img src='./resources/images/logo2.gif' />",
                style: 'background-color: FFF; font-size: 12px;'
            },
            {
                id: 'app-footer',
                xtype: 'box',
                region: 'south',
                height: 30,
                html: '<center>CIS4 Batch Automation Console</center>',
                style: 'background-color: #368064; font-size: 12px; padding-top: 3; color: #fff'
            },
            {
                xtype: 'container',
                region: 'center',
                layout: 'border',
                style: 'padding-top: 10; background-color: #368064;',
                items: [
			{
			    id: 'mainnav-left',
			    xtype: 'mainnav',
			    region: 'west',
			    hidden: true,
			},
			{
				id: 'loginportlet',
				xtype: 'loginpanel',
				region: 'center',
			},
			{
				id: 'adminpanelportlet',
				xtype: 'adminpanel',
				region: 'center',
				hidden: true
			},
			{
				id: 'reportpanelportlet',
				xtype: 'reportpanel', 
				region: 'center',
				hidden: true
			}
                ]
            }]
        });
        this.callParent(arguments);
    }
});