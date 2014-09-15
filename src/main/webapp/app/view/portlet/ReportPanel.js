Ext.define('ExtMVC.view.portlet.ReportPanel', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.reportpanel',
	defaults: {
		//autoScroll: true,
		bodyPadding: 3
	},
	
	initComponent: function() {
		this.id = 'reportpanel';
		this.activeTab =  0;
		this.items = [
			{
				xtype: 'newprojectwindow',
				itemId: 'newprojecttab',
				title: 'NEW BATCH AUTOMATION PROJECT',
				closable: false,
			},
			{
				title: 'STATUS',
				xtype: 'statsportlet',
				itemId: 'statstab',
				closable: false,
				hidden: true,
			},
			{
				xtype: 'gridportlet',
				itemId: 'ongoingtab',
				closable: false,
				hidden: false,
			},
			{
				xtype: 'pendingprojectstree',
				itemId: 'pendingprojectstab',
				closable: false,
				hidden: true,
			},
			{
				xtype: 'panel',
				itemId: 'exceptiontab',
				id: 'exceptiontab',
				title: 'FAILED REPORT REQUESTS',
				closable: false,
				hidden: true,
				layout: {
					type: 'vbox',
					align: 'stretch',
					pack: 'start'
				},
				items: [
					{
						xtype: 'exceptionreportsgrid',
						id: 'exceptionreportsgriddtl',
						title: '',
						autoScroll: true,
						flex: 1,
					}
				]
			},
			{
				title: 'SUCCESSFUL REPORT REQUESTS',
				xtype: 'customersgrid',
				itemId: 'customerstab',
				closable: false,
				hidden: true,
			},
			{
				title: 'USERS & SUBSCRIBERS SETUP',
				xtype: 'adminpanel',
				itemId: 'admintab',
				closable: false,
				hidden: true,
			}
		];
		
		this.callParent(arguments);
	}
	
	
});
