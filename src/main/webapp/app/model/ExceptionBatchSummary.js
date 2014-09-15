Ext.define('ExtMVC.model.ExceptionBatchSummary', {
	extend: 'Ext.data.Model',
	proxy: {
		type: 'ajax',
		storeId: 'ExceptionBatchSummary',
		url: './server/report/exception/getExceptionBatchSummary.php',
		reader: {
			type: 'json',
			root: 'summaries'
		}
	},
	fields: [
		{ name: 'batchNumber' },
		{ name: 'countryCode' },
		{ name: 'fileSubmissionDate' },
		{ name: 'totalRecords' },
		{ name: 'subscriberId' }
	]
	
});
