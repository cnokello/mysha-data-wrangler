Ext.define('ExtMVC.view.portlet.ExceptionReport', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.exceptionreportsgrid',
	
	title: '',
	
	defaults: {
		autoScroll: true,
		bodyPadding: 5
	},
	
	initComponent: function() {
		var exceptionReportsStore = Ext.create('Ext.data.Store', {
			model: 'ExtMVC.model.ExceptionReport',
			storeId: 'ExceptionReport',
			id: 'ExceptionReport',
			pageSize: 30,
			groupField: 'fileName',
			autoLoad: true
		});
		
		var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
			groupHeaderTpl: 'File: {name} ({rows.length}  validation failures)',
			hideGroupedHeader: true,
			startCollapsed: true
		});
		
		this.store = exceptionReportsStore;
		this.id = 'exceptionreportsgrid',
		//this.features = [groupingFeature],
		
		this.columns = [
			{
				text: '<b>DEBTOR TYPE</b>',
				flex: 1,
				dataIndex: 'debtorType'
			},
			{
				text: '<b>ERROR CODE</b>',
				flex: 2,
				dataIndex: 'errorCode',
			},
			{
				text: '<b>NATIONAL ID NO.</b>',
				flex: 1,
				dataIndex: 'idNumber'
			},
			{
				text: '<b>SURNAME</b>',
				flex: 1,
				dataIndex: 'surname',
				renderer: function(value) {
					return '<b>' + value.toUpperCase() + '</b>'
				}
			},
			{
				text: '<b>OTHER NAMES</b>',
				flex: 1,
				dataIndex: 'otherNames'
			},
			{
				text: '<b>DATE OF BIRTH</b>',
				flex: 1,
				dataIndex: 'birthDate'
			},
			{
				text: '<b>PRESENT ADDRESS</b>',
				flex: 2,
				dataIndex: 'presentAddress'
			}
		],
		
		this.dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				items: [
					Ext.create('Ext.PagingToolbar', {
					    store: exceptionReportsStore,
					    displayInfo: true,
					    displayMsg: 'Displaying records {0} - {1} of {2}',
					    emptyMsg: "No records to display",
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
				height: 30,
				items: [
					'->',
					{
						xtype: 'button',
						text: 'Reload',
						icon: './resources/images/refresh.png',
						tooltip: 'Reload data',
						handler: function() {
							var store = Ext.getCmp('exceptionreportsgrid').getStore();
							
							store.getProxy().extraParams = { reload: true };
							store.load();
							
						}
					}
				]
			},
		]
		
		this.callParent(arguments);
	}
});
