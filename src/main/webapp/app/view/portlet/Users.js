Ext.define('ExtMVC.view.portlet.Users', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.usersgrid',
	
	title: '',
	defaults: {
		bodyPadding: 5,
		autoScroll: true
	},
	
	initComponent: function() {
		var userStore = Ext.create('Ext.data.Store', {
			model: 'ExtMVC.model.User',
			storeId: 'User',
			autoLoad: true
		});
		
		this.store = userStore;
		this.id = "usersgrid",
		
		this.dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				height: 40,
				items: [
					{
						xtype: 'button',
						icon: './resources/images/user_add.png',
						scale: 'medium',
						text: 'Create User Account',
						action: 'showCreateUserWindow'
					}, '-',
					{
						xtype: 'button',
						icon: './resources/images/refresh.png',
						scale: 'medium',
						text: 'Reload',
						handler: function() {
							Ext.getCmp('usersgrid').getStore().load();
						}
					},
				]
			}
		];
		
		this.columns = [
			{
				text: '<b>FULL NAME</b>',
				flex: 1,
				dataIndex: 'fullName'
			},
			{
				text: '<b>USERNAME</b>',
				flex: 1,
				dataIndex: 'username'
			},
			{
				text: '<b>ROLE</b>',
				flex: 1,
				dataIndex: 'role'
			},
			{
				text: '<b>SUBSCRIBER ID/HASP CODE</b>',
				flex: 1,
				dataIndex: 'subscriberId'
			},
			{
				text: '<b>PASSWORD</b>',
				flex: 1,
				dataIndex: 'password',
				renderer: function(value) {
					return '****************';
				}
			},
			
		]
		
		this.callParent(arguments);
	}
	
	
});
