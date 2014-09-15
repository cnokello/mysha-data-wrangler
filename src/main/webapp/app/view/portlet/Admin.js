Ext.define('ExtMVC.view.portlet.Admin', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.adminpanel',
	id: 'adminpanel',
	title: 'Administration',
	
	activeTab: 0,
	defaults: {
		autoScroll: true,
		bodyPadding: 10
	},
	
	items: [
		{
			xtype: 'usersgrid',
			title: 'Users',
			closable: true
		},
		{
			title: 'User Log',
			html: 'Logging placeholder'
		}
	]
});
