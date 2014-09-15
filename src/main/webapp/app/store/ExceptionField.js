Ext.define('ExtMVC.store.ExceptionField', {
	extend: 'Ext.data.Store',
	autoLoad: true,
	
	fields: ['name', 'displayName'],
	data: [
		{name: 'affectedfield', displayName: 'Affected Field'},
		{name: 'filename', displayName: 'File Name'},
		{name: 'fieldvalue', displayName: 'Field Value'},
		{name: 'recnumber', displayName: 'Record Number'},
		{name: 'errormessage', displayName: 'Error Message'}
	]
});
