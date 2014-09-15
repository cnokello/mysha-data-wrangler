Ext.define('ExtMVC.store.File', {
	extend: 'Ext.data.Store',
	
	fields: ['id', 'fileName'],
	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		url: './server/report/exception/files.php',
		reader: {
			type: 'json',
			root: 'files',
			totalProperty: 'totalRecords'
		}
	}
});
