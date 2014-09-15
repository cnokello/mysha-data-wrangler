Ext.define('ExtMVC.view.portlet.UploadForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.fileuploadform',
	requires: [
		'Ext.form.Panel',
		'Ext.form.field.Text'
	],
	
	title: 'New CIS4 Data Loader Project',
	layout: 'fit',
	autoShow: true,
	autoHeight: true,
	minHeight: 400,
	fileUpload: true,
	isUpload: true,
	enctype: 'multipart/form-data',
	
	initComponent: function() {
		this.items = [
			{
				id: 'newCIS4ProjectForm',
				xtype: 'form',
				padding: '5 5 0 5',
				border: false,
				style: 'background-color: #fff',
				autoScroll: true,
				fileUpload: true,
				isUpload: true,
				enctype: 'multipart/form-data',
				
				fieldDefaults: {
					anchor: '50%',
					labelAlign: 'top',
					allowBlank: false,
					combineErrors: true,
					msgTarget: 'bottom'
					
				},
				
				items: [
					{
						xtype: 'filefield',
						name: 'fileUpload',
						anchor: '50%',
						fieldLabel: 'Batch Files Zip',
						buttonText: 'Select Batch Zip'
					}
				]
			}
		];
		
		this.dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				id: 'buttons',
				ui: 'footer',
				items: [
					'->',
					{
						iconCls: 'icon-save',
						itemId: 'startFileProcessing',
						text: 'Submit for Processing',
						action: 'submitForProcessing'
					}
				]
			}
		];
		
		this.callParent(arguments);
	}
	
	
});
