Ext.define('ExtMVC.view.portlet.ExceptionSummary', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.exceptionsummarygrid',
	
	title: '',
	defaults: {
		autoScroll: true
	},
	
	initComponent: function() {
		var exceptionSummaryStore = Ext.create('Ext.data.Store', {
			model: 'ExtMVC.model.ExceptionSummary',
			storeId: 'ExceptionSummary',
			autoLoad: true
		});
		
		this.store = exceptionSummaryStore;
		this.id = 'exceptionsummarygrid';
		this.columns = [
			{
				text: '<b>FILE NAME</b>',
				flex: 2,
				dataIndex: 'fileName',
				renderer: function(value) {
					return "<span><img src='./resources/images/file.png' /> " + value + "</span>"
				}
			},
			{
				text: '<b>BATCH NUMBER</b>',
				flex: 1,
				dataIndex: 'batchNumber',
			},
			{
				text: '<b>SUBSCRIBER ID</b>',
				flex: 1,
				dataIndex: 'subscriberId',
			},
			{
				text: '<b>COUNTRY CODE</b>',
				flex: 1,
				dataIndex: 'countryCode',
			},
			{
				text: '<b>FILE SUBMISSION DATE</b>',
				flex: 1,
				dataIndex: 'fileSubmissionDate',
			},
			{
				text: '<b>VALIDATION ERRORS</b>',
				flex: 1,
				dataIndex: 'totalRecords',
			}
		];
		
		this.dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				height: 40,
				items: [
					{
						xtype: 'button',
						icon: './resources/images/sum.png',
						scale: 'medium',
						text: 'View summary by batch numbers',
						action: 'summarizeByBatchNumbers',
						handler: function() {
							Ext.getCmp('exceptionsummarygrid').hide();
							Ext.getCmp('exceptionbatchsummarygrid').show();
							Ext.getCmp('cboBatchNumber').reset();
						}
					}, '-',
					'->',
					{
						xtype: 'button',
						icon: './resources/images/information.png',
						text: 'Double click a row to view validation errors'
					},
					{
						xtype: 'button',
						text: 'Reload',
						icon: './resources/images/refresh.png',
						tooltip: 'Reload data',
						handler: function() {
							var store = Ext.getCmp('exceptionreportsgrid').getStore();
							var summaryStore = Ext.getCmp('exceptionsummarygrid').getStore();
							var batchSummaryStore = Ext.getCmp('exceptionbatchsummarygrid').getStore();
							
							store.getProxy().extraParams = { reload: true };
							store.load();
							
							summaryStore.getProxy().extraParams = { reload: true };
							summaryStore.load();
							
							batchSummaryStore.getProxy().extraParams = { reload: true };
							batchSummaryStore.load();
							
							// Clear fields
							Ext.getCmp('cboBatchNumber').reset();
							Ext.getCmp('cboFileName').reset();
						}
					},'-',
					{
						xtype: 'button',
						icon: './resources/images/export.png',
						text: 'Export Report',
						menu: [
							{
								icon: './resources/images/excel.png',
								text: 'CSV',
								action: 'exportExceptionCSV'
							},
							{
								icon: './resources/images/pdf.png',
								text: 'PDF',
								action: 'exportExceptionPDF'
							}
						]
					}
				]
			}
		];
		
		this.callParent(arguments);
	}
});
