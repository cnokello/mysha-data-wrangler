Ext.define('ExtMVC.view.portlet.GridPortlet', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridportlet',
    
    
    autoHeight: true,
    minHeight: 400,
    title: 'DOWNLOAD REPORTS',
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
	    	    	document.location = '/batch-automation/ws/ba/subscribers/files/download?fileName=' + fileName;
	    	    }
	    }
    },

    initComponent: function(){
    	    
    	    var statsStore = Ext.create('Ext.data.Store', {
				model: 'ExtMVC.model.Stock',
				storeId: 'StatsWebSocket',
				autoLoad: true
		    });
	    
	    this.store = statsStore; //'Stats';
	    this.id = 'gridportlet_id';
	    
	    this.dockedItems = [
		   {
			   dock: 'top',
			   xtype: 'toolbar',
			   height: 40,
			   items: [
				  {
					  xtype: 'button',
					  icon: './resources/images/send.png',
					  text: 'Double click on a file to download',
					  tooltip: 'Double click on a row to download',
					  action: 'downloadFile'
				  }
			   ]
		   }
	    ],
	    
	    this.columns = [
		    {
				text: '<b>FILE NAME</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'fileName',
				renderer: function(value, metadata, record) {
					return '<span><img src="./resources/images/point.png" />' + value + '</span>'
				}
		    },
		    {
				text: '<b>FILE SIZE (bytes)</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'fileSize',
				renderer: function(value) {
					return Ext.util.Format.number(value, '0,000')
				}
		    },
		    {
				text: '<b>SUBSCRIBER ID</b>',
				flex: 1,
				sortable: true,
				dataIndex: 'subscriberId',
		    },
		    
	    ]
		
	    this.callParent(arguments);
    }
});
