Ext.define('ExtMVC.view.portlet.Login', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.loginpanel',
		
	bodyStyle: 'background-color: #f6f6f6',
	labelWidth : 80,
	frame : true,
	id : 'login_form',
	title : '',
	defaultType : 'textfield',
	labelAlign : 'top',
	layout : {
		type: 'table',
		columns: 1,
		bodyStyle: 'background-color: #f6f6f6',
		tableAttrs: {
			style: {
				width: '100%',
				height: '100%',

			}
		},
		tdAttrs: {
			align: 'center',
			valign: 'middle'

		}
	},
	items : [
		{
			xtype: 'fieldset',
			title: '',
			defaultType: 'textfield',
			layout: 'anchor',
			width: 400,
			height: 220,
			style: 'padding-top: 20',
			defaults: {
				anchor: '100%'
			},
			items: [
				{
					name : 'loginUsername',
					id : 'login_username',
					fieldLabel: '<b>Username</b>',
					labelAlign: 'top',
					height: 60,
					anchor: '80%',
				}, 
				{
					name : 'loginPassword',
					id: 'login_password',
					inputType : 'password',
					height: 60,
					anchor: '80%',
					fieldLabel: '<b>Password</b>',
					labelAlign: 'top',
				}, 
				{
					xtype : 'button',
					id : 'login_button',
					text : 'Sign In',
					width : 80,
					anchor: '30%',
					height: 28,
					action: 'login',
				}
			]

		}		
	]
});