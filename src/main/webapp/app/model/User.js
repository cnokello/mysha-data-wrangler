Ext.define('ExtMVC.model.User', {
	extend: 'Ext.data.Model',
	
	proxy: {
		type: 'ajax',
		storeId: 'User',
		url: '/batch-automation/ws/ba/subscribers/users',
		reader: {
			type: 'json',
			root: 'users'
		}
	},
	
	fields: [
		{
			name: 'fullName'
		},
		{
			name: 'username'
		},
		{
			name: 'password'
		},
		{
			name: 'subscriberId'
		},
		{
			name: 'role'
		}
	]
});
