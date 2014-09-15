Ext.define('ExtMVC.view.portlet.PendingProjects', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.pendingprojectstree',
	
	defaults: {
		autoScroll: true,
		bodyPadding: 10
	},
	
	initComponent: function() {
		var store = Ext.create('Ext.data.TreeStore', {
			proxy: {
				type: 'ajax',
				url: './server/projects/get.php'
			},
			root: {
				text: 'Pending Projects',
				id: 'input',
				expanded: true
			},
			
			folderSort: true,
			sorters: [{
				property: 'text',
				direction: 'ASC'
			}]
		});
		
		this.store = store;
		this.title = 'Pending Projects';
		this.height = 300;
		this.width = 250;
		this.useArrows = true;
		this.rootVisible = false;
		
		this.dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				height: 40,
				items: [
					{
						text: 'Process Selected Batch(es)',
						icon: './resources/images/process.png',
						scale: 'medium',
					}, '-',
					{
						text: 'Reverse Batch(es)',
						icon: './resources/images/reverse.png',
						scale: 'medium',
					}
				]
			}
		]
	
		this.callParent(arguments);
	}
	
	
});
