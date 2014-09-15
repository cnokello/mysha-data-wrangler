Ext.define('ExtMVC.store.ErrorCode', {
	extend: 'Ext.data.Store',
	
	fields: ['id', 'errorMessage'],
	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		url: './server/report/exception/errorCodes.php',
		reader: {
			type: 'json',
			root: 'errorCodes',
			totalProperty: 'totalRecords'
		}
	}
});
