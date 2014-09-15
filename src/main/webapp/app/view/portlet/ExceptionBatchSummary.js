Ext.define('ExtMVC.view.portlet.ExceptionBatchSummary', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.exceptionbatchsummarygrid',
	
	title: '',
	defaults: {
		autoScroll: true
	},
	
	initComponent: function() {
		var exceptionSummaryStore = Ext.create('Ext.data.Store', {
			model: 'ExtMVC.model.ExceptionBatchSummary',
			storeId: 'ExceptionBatchSummary',
			autoLoad: true
		});
		
		this.store = exceptionSummaryStore;
		this.id = 'exceptionbatchsummarygrid';
		this.columns = [
			{
				text: '<b>BATCH NUMBER</b>',
				flex: 1,
				dataIndex: 'batchNumber',
				renderer: function(value) {
					return "<span><img src='./resources/images/batch.png' /> " + value + "</span>"
				}
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
						text: 'View summary by files',
						action: 'summarizeByFileNames',
						handler: function() {
							Ext.getCmp('exceptionbatchsummarygrid').hide();
							Ext.getCmp('exceptionsummarygrid').show();
							Ext.getCmp('cboFileName').reset();
						}
					},
					'->',
					{
						xtype: 'button',
						icon: './resources/images/information.png',
						text: 'Double click a row to view validation errors'
					}, '-',
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
