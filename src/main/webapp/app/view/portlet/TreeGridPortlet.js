Ext.define('ExtMVC.view.portlet.TreeGridPortlet', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.treegridportlet',	
	
	initComponent: function() {
		Ext.apply(this, {
			id: 'treegridportlet',
			title: 'Exeption Report',
			rootVisible:  false,
			multiSelect: true,
			singleExpand: true,
			useArrows: true,
			store: {
				model: 'ExtMVC.model.ExceptionReport',
				folderSort: true,
				proxy: {
					type: 'ajax',
					url: './server/report/exception/tree.php'
				}
			},
			
				
			columns: [
				{
					xtype: 'treecolumn',
					text: '<b>File Name</b>',
					flex: 2,
					sortable: true,
					dataIndex: 'fileName',
					renderer: function(value) {
						return '<b>' + value.toUpperCase() + '</b>'
					}
				},
				{
					text: '<b>Record No.</b>',
					flex: 1,
					dataIndex: 'recNumber'
				},
				{
					text: '<b>Affected Field</b>',
					flex: 1,
					dataIndex: 'affectedField',
					renderer: function(value) {
						return '<b>' + value.toUpperCase() + '</b>'
					}
				},
				{
					text: '<b>Field Value</b>',
					flex: 1,
					dataIndex: 'fieldValue'
				},
			]
			
			
		});
		
		this.callParent(arguments);
	}
});
