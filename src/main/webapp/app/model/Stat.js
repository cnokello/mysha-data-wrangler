Ext.define('ExtMVC.model.Stat', {
	extend: 'Ext.data.Model',
	proxy: {
		type: 'ajax',
		storeId: 'StatsStore',
		url: '/batch-automation/ws/ba/subscribers/statistics',
		reader: {
			type: 'json'
			//root: 'statistics',
			//totalProperty: 'totalRecords'
		}
	},
	
	fields: [
	    { name: 'statTime'},
		{ name: 'fileName' },
		{ name: 'totalRecords' },
		{ name: 'processed' },
		{ name: 'processedError' },
		{ name: 'complete' }
		
	]
});
