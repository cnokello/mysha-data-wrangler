Ext.define('ExtMVC.model.ExceptionSummary', {
	extend: 'Ext.data.Model',
	proxy: {
		type: 'ajax',
		storeId: 'ExceptionSummary',
		url: './server/report/exception/getExceptionSummary.php',
		reader: {
			type: 'json',
			root: 'summaries'
		}
	},
	
	fields: [
		{ name: 'fileName' },
		{ name: 'batchNumber' },
		{ name: 'subscriberId' },
		{ name: 'fileSubmissionDate' },
		{ name: 'countryCode' },
		{ name: 'totalRecords' }
		
	]
});
