Ext.define('ExtMVC.view.portlet.Stat', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.statsportlet',
    
    
    autoHeight: true,
    minHeight: 400,
    title: 'STATUS',
    defaults: {
    	    bodyPadding: 5,
    	    autoScroll: true
    },
    
    viewConfig: {
	    stripeRows: true,
	    columnLines: true,
	    listeners: {
	    	    itemdblclick: function(dataview, record, item, index, e) {
	    	    	var fileName = record.get('fileName');
	    	    	console.log( "I wish to download ...." + fileName );
	    	    }
	    }
    },

    initComponent: function(){
    	    
    	    var statsStore = Ext.create('Ext.data.Store', {
				model: 'ExtMVC.model.Stat',
				storeId: 'StatsStore',
				autoLoad: true
		    });
	    
	    this.store = statsStore; //'Stats';
	    this.id = 'statsportlet_id';
	    
	    this.dockedItems = [
		   {
			   dock: 'top',
			   xtype: 'toolbar',
			   height: 40,
			   items: [
				  {
					  xtype: 'button',
					  icon: './resources/images/refresh.png',
					  text: 'Reload',
					  action: 'reloadStats',
					  handler: function() {
						  var store = Ext.getCmp('statsportlet_id').getStore();
							/*store.getProxy().extraParams = {
								search: false
							};*/
							store.load();
					  }
				  }
			   ]
		   }
	    ],
	    
	    this.columns = [
			{
				text: '<b>TIME</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'statTime',
				renderer: function(value, metadata, record) {
					return '<span><img src="./resources/images/point.png" />' + value + '</span>'
				}
			},
		    {
				text: '<b>FILE NAME</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'fileName',
				
				/*renderer: function(value, metadata, record) {
					return '<span><img src="./resources/images/point.png" />' + value + '</span>'
				}*/
		    },
		    {
				text: '<b>TOTAL RECORDS</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'totalRecords',
				renderer: function(value) {
					return Ext.util.Format.number(value, '0,000')
				}
		    },
		    {
				text: '<b>PROCESSED</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'processed',
		    },
		    {
				text: '<b>ERRORS</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'processedError',
		    },
		    {
				text: '<b>COMPLETED</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'complete',
		    }
		    
	    ]
		
	    this.callParent(arguments);
    }
});
