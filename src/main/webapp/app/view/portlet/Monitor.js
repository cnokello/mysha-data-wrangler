Ext.define('ExtMVC.view.portlet.Monitor', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.monitorpanel',
	
	id: 'monitorpanel',
	title: '',
	
	layout: {
		type: 'border',
	},
	
	items: [
		{
			xtype: 'gridportlet',
			region: 'north'
		},
		{
			xtype: 'panel',
			region: 'south'
		}
	]
});
