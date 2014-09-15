Ext.define('ExtMVC.model.Customer', {
	extend: 'Ext.data.Model',
	proxy: {
		type: 'ajax',
		storeId: 'Customer',
		url: '/batch-automation/ws/ba/subscribers/report',
		reader: {
			type: 'json',
			root: 'customers',
			totalProperty: 'totalRecords'
		}
	},
	
	fields: [
		{ name: 'debtorType' },
		{ name: 'idNumber' },
		{ name: 'surname' },
		{ name: 'otherNames' },
		{ name: 'sectorListing' },
		{ name: 'otherSectorsListing' },
		{ name: 'presentAddress' },
		{ name: 'postCode' },
		{ name: 'crn' },
		{ name: 'pdfId' }
		
	]
});
