Ext.define('ExtMVC.model.Stock', {
	extend: 'Ext.data.Model',
	
	proxy: {
		type: 'ajax',
		storeId: 'StatsWebSocket',
		url: '/batch-automation/ws/ba/subscribers/files',
		reader: {
			type: 'json',
			root: 'stats'
		}
	},
	
	fields: [
		{
			name: 'fileSize'
		},
		{
			name: 'fileName'
		},
		{
			name: 'subscriberId'
		}
	]
});
