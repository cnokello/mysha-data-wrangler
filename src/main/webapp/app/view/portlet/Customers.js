Ext.define('ExtMVC.view.portlet.Customers', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.customersgrid',
	
	title: '',
	
	initComponent: function() {
		var customerStore = Ext.create('Ext.data.Store', {
			model: 'ExtMVC.model.Customer',
			storeId: 'Customer',
			pageSize: 25,
			groupField: 'transactionType',
			autoLoad: true
		});
		
		this.store = customerStore;
		this.id = "customersgrid";
		
		this.dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				items: [
					Ext.create('Ext.PagingToolbar', {
					    store: customerStore,
					    displayInfo: true,
					    displayMsg: 'Displaying contacts {0} - {1} of {2}',
					    emptyMsg: "No contacts to display",
					    items:[
						'-', {
						text: 'Show Preview',
						pressed: true,
						action: 'showPreview',
						enableToggle: true
					    }
					    ]
					})
				]
			},
			{
				xtype: 'toolbar',
				dock: 'top',
				//height: 80,
				items: [
					/*{
						xtype: 'textfield', 
						id: 'batchNumber', 
						name: 'batchNumber',
						fieldLabel: 'Batch No.',
						labelAlign: 'top',
						
					},
					{
						xtype: 'textfield', 
						id: 'infinityCode', 
						name: 'infinityCode',
						fieldLabel: 'InfinityCode',
						labelAlign: 'top',
					},
					{
						xtype: 'textfield', 
						id: 'subscriberId', 
						name: 'subscriberId',
						fieldLabel: 'Subscriber ID',
						labelAlign: 'top',
					}, 
					{
						xtype: 'textfield', 
						id: 'productCode', 
						name: 'productCode',
						fieldLabel: 'Product Code',
						labelAlign: 'top',
					},
					{
						xtype: 'textfield', 
						id: 'reportReasonCode', 
						name: 'reportReasonCode',
						fieldLabel: 'Reason Code',
						labelAlign: 'top',
					},
					{
						xtype: 'textfield', 
						id: 'requestSector', 
						name: 'requestSector',
						fieldLabel: 'Request Sector',
						labelAlign: 'top',
					},
					{
						id: 'btnDownloadReport',
						xtype: 'button',
						icon: './resources/images/download.png',
						scale: 'medium',
						tooltip: 'Download Report',
						height: 33,
						handler: function() {
							document.location = '/batch-automation/ws/ba/subscribers/download?subscriberId=1329';
						}
					},
					{
						id: 'btnFilterReport',
						xtype: 'button',
						icon: './resources/images/find.png',
						scale: 'medium',
						tooltip: 'Filter',
						height: 33,
						handler: function() {
							var store = Ext.getCmp('customersgrid').getStore();
							store.getProxy().extraParams = {
								batchNumber: Ext.getCmp("batchNumber").getValue(),
								subscriberId: Ext.getCmp("subscriberId").getValue(),
								infinityCode: Ext.getCmp("infinityCode").getValue(),
								productCode: Ext.getCmp("productCode").getValue(),
								reportReasonCode: Ext.getCmp("reportReasonCode").getValue(),
								requestSector: Ext.getCmp("requestSector").getValue()
							};
							store.load();
						}
					},*/
					'->',
					{
						xtype: 'button',
						text: 'Reload',
						icon: './resources/images/refresh.png',
						tooltip: 'Reload data',
						handler: function() {
							var store = Ext.getCmp('customersgrid').getStore();
							store.getProxy().extraParams = {
								search: false
							};
							store.load();
							
						}
					}
				]
			}
		];
		
		this.columns = [
			{ text: '<b>CRN</b>', flex: 1, dataIndex: 'crn' },
			{ text: '<b>PDF ID</b>', flex: 2, dataIndex: 'pdfId' },
			{ text: '<b>DEBTOR TYPE</b>', flex: 1, dataIndex: 'debtorType' },
			{ text: '<b>NATIONAL ID NO.</b>', flex: 1, dataIndex: 'idNumber' },
			{ text: '<b>SURNAME</b>', flex: 1, dataIndex: 'surname' },
			{ text: '<b>OTHER NAMES</b>', flex: 1, dataIndex: 'otherNames' },
			{ text: '<b>SECTOR LISTING</b>', flex: 1, dataIndex: 'sectorListing' },
			{ text: '<b>OTHER SECTORS LISTING</b>', flex: 1, dataIndex: 'otherSectorsListing' },
			{ text: '<b>PRESENT ADDRESS</b>', flex: 1, dataIndex: 'presentAddress' },
			{ text: '<b>POST CODE</b>', flex: 1, dataIndex: 'postCode' }
		];
		
		this.callParent(arguments);
	}
});
