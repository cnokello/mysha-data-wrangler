Ext.define('ExtMVC.view.portlet.NewUser', {
	extend: 'Ext.window.Window',
	alias: 'widget.newuserwindow',
	id: 'newuserwindow',
	
	title: 'New User',
	closable: true,
	modal: true,
	closeAction: 'destroy',
	width: 400,
	height: 320,
	layout: {
		type: 'border',
		padding: 5
	},
	bodyStyle: 'background: #f6f6f6;',
	
	items: [
		{
			xtype: 'form',
			id: 'newuserform',
			url: '/batch-automation/ws/ba/subscribers/user/create',
			title: '',
			bodyStyle: 'padding: 5px 5px 0',
			width: 380,
			height: 270,
			frame: true,
			fieldDefaults: {
				msgTarget: 'side',
				labelWidth: 75
			},
			
			defaultType: 'textfield',
			defaults: {
				anchor: '100%'
			},
		
		items: [
			{
				fieldLabel: 'Full Name',
				id: 'fullName',
				name: 'fullName',
				allowBlank: false,
				inputAttrTpl: 'data-qtip="Full Name of user OR Subscriber Name"',
				listeners: {
					blur: function() {
						Ext.getCmp('fullName').setValue(Ext.getCmp('fullName').getValue().toLowerCase().capitalize());
					}
				}
			},
			{
				fieldLabel: 'Username',
				id: 'username',
				name: 'username',
				inputAttrTpl: 'data-qtip="Must match subscriber auto user username if subscriber."',
				allowBlank: false,
				listeners: {
					focus: function() {
						console.log('I just got focus, man! How cool is that?!!?!');
						var username = Ext.getCmp('fullName').getValue().toLowerCase();
						username = username.replace(' ', '.');
						Ext.getCmp('username').setValue(username);
					}
				}
			},
			{
				fieldLabel: 'Role',
				id: 'role',
				name: 'role',
				inputAttrTpl: 'data-qtip="Either USER or SUBSCRIBER"',
				allowBlank: false,
				listeners: {
					blur: function() {
						Ext.getCmp('role').setValue(Ext.getCmp('role').getValue().toUpperCase());
					}
				}
				
			},
			{
				fieldLabel: 'Subscriber ID',
				id: 'subscriberId',
				name: 'subscriberId',
				inputAttrTpl: 'data-qtip="Internal subscriber ID"',
				allowBlank: false,
				/*
				listeners: {
					blur: function() {
						Ext.getCmp('department').setValue(Ext.getCmp('department').getValue().toUpperCase());
					}
				}
				*/
			},
			{
				fieldLabel: 'Password',
				id: 'password',
				name: 'password',
				inputAttrTpl: 'data-qtip="Must match the subscriber auto user password if Subscriber"',
				inputType: 'password',
				allowBlank: false
			},
			{
				fieldLabel: 'Confirm Password',
				id: 'password2',
				name: 'password2',
				inputType: 'password',
				allowBlank: false
			}
		],
		
		buttons: [
			{
				text: 'Create User Account',
				action: 'createUser',
				handler: function() {
					
					var username = Ext.getCmp('username').getValue();
					if(username.length < 5) {
						Ext.MessageBox.alert('Invalid Username', 'A username must be more than 4 characters.');
						Ext.getCmp('username').focus(false, 200);
						return;
					}
					
					var dept = Ext.getCmp('subscriberId').getValue();
					if(dept.length < 2) {
						Ext.MessageBox.alert('Invalid Department', 'Department provided is invalid.');
						Ext.getCmp('subscriberId').focus(false, 200);
						return;
					}
					
					var pass = Ext.getCmp('password').getValue();
					if(pass.length < 8) {
						Ext.MessageBox.alert('Invalid Password', 'Password length must be 8 or more characters');
						Ext.getCmp('password').focus(false, 200);
						return;
					}
					
					var pass = Ext.getCmp('password').getValue();
					var pass2 = Ext.getCmp('password2').getValue();
					if(pass != pass2) {
						Ext.MessageBox.alert('Invalid Password', 'Passwords do not match.');
						Ext.getCmp('password2').focus(false, 200);
						return;
					}
						
					console.log('Creating user...');
					var form = Ext.getCmp('newuserform').getForm();
					form.submit();
					Ext.getCmp('usersgrid').getStore().load();
					
				}
			},
			{
				text: 'Close',
				action: 'closeCreateUser',
				handler: function() {
					Ext.getCmp('newuserwindow').destroy();
				}
			},
			{
				text: 'Cancel',
				action: 'cancelCreateUser',
				handler: function() {
					Ext.getCmp('newuserwindow').destroy();
				}
			}
		]
		}	
	]
	
});
