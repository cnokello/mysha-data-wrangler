Ext.define('ExtMVC.model.ExceptionReport', {
	extend: 'Ext.data.Model',
	

	proxy: {
		type: 'ajax',
		storeId: 'ExceptionReport',
		url: '/batch-automation/ws/ba/subscribers/report/failed',
		reader: {
			type: 'json',
			root: 'reports',
			totalProperty: 'totalRecords'
		}
	},

	fields: [
		{
			name: 'errorCode'
		},
		{
			name: 'debtorType'
		},
		{
			name: 'presentAddress'
		},
		{
			name: 'surname'
		},
		{
			name: 'otherNames'
		}
		,
		{
			name: 'idNumber'
		},
		{
			name: 'birthDate'
		}
	]
});
