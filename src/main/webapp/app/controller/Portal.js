Ext.define('ExtMVC.controller.Portal', {
    extend: 'Ext.app.Controller',

    ws_url: 'ws://crb12.crbafrica.com:8087/ws',
    
    stores: [
    	'Stats',
    	'ExceptionField',
    	'File',
    	'ErrorCode'
    ],

    models: [
    	'Stock',
    	'User',
    	'ExceptionReport',
    	'ExceptionSummary',
    	'ExceptionBatchSummary',
    	'Customer',
    	'Stat'
    ],

    views: [    
    	'Viewport', 
    	'portal.MainNav',
    	//'portal.NavigationMenu',
    	'portlet.StatsDetailWindow',
    	'portal.WestMenu',
    	'portlet.GridPortlet',
    	'portlet.Upload',
    	'portlet.UploadForm',
    	'portlet.Admin',
    	'portlet.Users',
    	'portlet.Customers',
    	'portlet.NewUser',
    	'portlet.Login',
    	'portlet.ExceptionReport',
    	'portlet.ExceptionSummary',
    	'portlet.ExceptionBatchSummary',
    	'portlet.PendingProjects',
    	//'portlet.TreeGridPortlet',
    	'portlet.ReportPanel',
    	'portlet.Monitor',
    	'Ext.ux.upload.ItemGridPanel',
    	'portlet.Stat'
    	//'Ext.ux.upload.Dialog'
    ],
    
    refs: [],

    init: function() {
    	this.control({
	       'gridportlet': {
	       	       itemdblclick: this.showStatDetails
	       },
	       
	       'gridportlet button[action=sendStats]': {
	       	       click: this.sendStats
	       },      
	       
	       'gridportlet button[action=TOGGLE_SERVER]': {
	       	       click: this.toggleServerProcessing
	       },
	       
	       'gridportlet button[action=CLEAR_QUEUES]': {
	       	       click: this.toggleServerProcessing
	       },
	       
	       'mainnav buttongroup button[action=ongoingDataLoaderProject]': {
	       	       click: this.showOngoingDataLoaderProject
	       },
	       'mainnav buttongroup button[action=newDataLoaderProject]': {
	       	       click: this.showNewDataLoaderProjectWindow
	       },
	       'mainnav buttongroup button[action=showPendingDataLoaderProjects]': {
	       	       click: this.showPendingDataLoaderProjects
	       },
	       'mainnav buttongroup button[action=showAdminPanel]': {
	       	       click: this.showAdminPanel
	       },
	       'mainnav buttongroup button[action=showReportPanel]': {
	       	       click: this.showReportPanel
	       },
	       'exceptionreportsgrid': {
	       	       itemdblclick: this.showOriginalRecord
	       },
	       'exceptionsummarygrid': {
	       	       itemdblclick: this.filterValidationErrorsByFileName 
	       },
	       'exceptionbatchsummarygrid': {
	       	       itemdblclick: this.filterValidationErrorsByBatchNumber 
	       },
	       
	       'statsdetailwindow button menu menuitem[action=TOGGLE_PARSING]': {
	       	       click: this.toggleParsing
	       },
	       'statsdetailwindow button menu menuitem[action=TOGGLE_VALIDATION]': {
	       	       click: this.toggleParsing
	       },
	       'statsdetailwindow button menu menuitem[action=TOGGLE_DB_LOADING]': {
	       	       click: this.toggleParsing
	       },
	       
	       'fileuploadform button[action=submitForProcessing]': {
	       	       click: this.submitFileForProcessing
	       },
	       
	       'usersgrid button[action=showCreateUserWindow]': {
	       	       click: this.showCreateUserWindow
	       },
	       
	       'loginpanel button[action=login]': {
	       	       click: this.login
	       }
	       
	       
	});
	
	this.application.on({
	
	});
    },
    
    showStatDetails: function(dataview, record, item, index, e) {
    	    console.log('Parsing Status: ' + record.get('statusParsing'));
    	    
    	    var parsingMenu = Ext.getCmp('toggleParsing');
    	    var validationMenu = Ext.getCmp('toggleValidation');
    	    var dbLoadingMenu = Ext.getCmp('toggleDbLoading');
    	    
    	    if(record.get('statusParsing') == 'Started') {
    	    	    parsingMenu.setText('Suspend Parsing');
    	    } else {
    	    	    parsingMenu.setText('Resume Parsing');
    	    }
    	    
    	    if(record.get('statusValidation') == 'Started') {
    	    	    validationMenu.setText('Suspend Validation');
    	    } else {
    	    	    validationMenu.setText('Resume Validation');
    	    }
    	    
    	    if(record.get('statusDBLoading') == 'Started') {
    	    	    dbLoadingMenu.setText('Suspend DB Loading');
    	    } else {
    	    	    dbLoadingMenu.setText('Resume DB Loading');
    	    }
    	    
    	    
    },
    
    showOngoingDataLoaderProject: function() {
    	var tabs = Ext.getCmp('reportpanel');
    	tabs.child('#ongoingtab').tab.show();
    },
    
    showNewDataLoaderProjectWindow: function() {
	Ext.getCmp('newProjectGrid').show();
	Ext.getCmp('gridportlet_id').hide();
	Ext.getCmp('adminpanelportlet').hide();
	Ext.getCmp('reportpanelportlet').hide();
	
    	    
    },
    
    showPendingDataLoaderProjects: function() {
    	    console.log('I see you want to view pending data loader projects.');
    },
    
    showAdminPanel: function() {
    	Ext.getCmp('adminpanelportlet').show();
  	Ext.getCmp('newProjectGrid').hide();
	Ext.getCmp('gridportlet_id').hide();
	Ext.getCmp('reportpanelportlet').hide();
    },
    
    showReportPanel: function() {
    	    Ext.getCmp('reportpanelportlet').show();
    	    
    	    Ext.getCmp('adminpanelportlet').hide();
    	    Ext.getCmp('newProjectGrid').hide();
    	    Ext.getCmp('gridportlet_id').hide();
    },
    
    sendStats: function() {
    	    
    },
    
    uploadFiles: function() {
    	    console.log('Wish to upload the files.');
    	    var grid = Ext.getCmp('filegridpanel');
    	    var selectedFiles = grid.getSelectionModel().getSelection();
    	    var rs = grid.getStore().getRange();
    	    Ext.each(rs, function(item) {
		   //console.log(item.data);
    	    });
    },
    
    toggleServerProcessing: function(button) {
    	  console.log('Starting CIS4 Data Loader Server...');
    	  var id = button.id;
    	  var action = button.action;
    	  var event = button.event;
    	  var label = button.text;
    	  
    	  Ext.MessageBox.confirm('Confirm', 'Are you sure you want to toggle all processing?', function(button) {
		    if(button.toUpperCase() == 'YES') {
		    	    console.log('Good. We will toggle it right away.');
		    	    var ws = Ext.create('Ext.ux.WebSocket', {
				    url: 'ws://crb12.crbafrica.com:8087/ws',
				    listeners: {
				    	    open: function(ws) {
				    	    	    console.log('Websocket ready for use.');
				    	    	    ws.send(event, {
				    	    	    	'action': 'start', 
				    	    	    	'fileTypeCode': 'ALL',
				    	    	    	'routeType': 'GatewayRoute'
				    	    	    });
				    	    },
				    	    close: function(ws) {
				    	    	    console.log('Websocket closed.');
				    	    }
				    }
		    	    });
		    	    /*
		    	    var ws = Ext.create('Ext.ux.WebSocket', {
				    url: 'ws://crb12.crbafrica.com:9292/dlController',
				    listeners: {
				    	    open: function(ws) {
				    	    	    console.log('Websocket ready for use.');
				    	    	    ws.send(action, {
				    	    	    	'action': action,
				    	    	    	actionString: label
				    	    	    });
				    	    },
				    	    close: function(ws) {
				    	    	    console.log('Websocket closed.');
				    	    }
				    }
		    	    });
		    	    */
		    	    
		    	    var newLabel = '';
		    	    var newIcon = '';
		    	    var newAction = '';
		    	    var newEvent = '';
		    	    if(new RegExp('Start').test(label)) {
		    	    	    newLabel = label.replace("Start", "Stop");
		    	    	    newIcon = './resources/images/shutdown.png';
		    	    	    newAction = 'STOP_SERVER';
		    	    	    newEvent = 'stopserver';
		    	    } else {
		    	    	    newLabel = label.replace("Stop", "Start");
		    	    	    newIcon = './resources/images/start.png';
		    	    	    newAction = 'START_SERVER';
		    	    	    newEvent = 'startserver';
		    	    }
		    	    
		    	    if(label != 'Clear Queues') {
				    Ext.getCmp(id).setText(newLabel);
				    Ext.getCmp(id).setIcon(newIcon);
				    //Ext.getCmp(id).setAction(newAction);
				   // Ext.getCmp(id).setEvent(newEvent);
		    	    }
		    	    
		    } else {
		    	    console.log('Too bad. We were really itching to pause something.');
		    }
    	     });
    },
    
    toggleParsing: function(menuitem) {
    	    var id = menuitem.id;
    	    var event = menuitem.event;
    	    var action = menuitem.action;
    	    var label = menuitem.text;
    	    var routeType = menuitem.routeType;
    	    
    	    console.log('Action chosen: ' + action);
    	    var grid = Ext.getCmp('gridportlet_id');
    	    var r = grid.getSelectionModel().getSelection()[0];
    	    var fileTypeCode = r.data.fileTypeCode;
    	    
    	    if(new RegExp('Parsing').test(label)) {
    	    	    var currentStatus = r.data.statusParsing;
    	    	    if(currentStatus == 'Started') {
    	    	    	    action = "suspend";
    	    	    } else {
    	    	    	    action = "resume";
    	    	    }
		    
	    } else if(new RegExp('Validation').test(label)) {
		    var currentStatus = r.data.statusValidation;
    	    	    if(currentStatus == 'Started') {
    	    	    	    action = "suspend";
    	    	    } else {
    	    	    	    action = "resume";
    	    	    }
	    } else if(new RegExp('DB').test(label)) {
	    	    var currentStatus = r.data.statusDBLoading;
    	    	    if(currentStatus == 'Started') {
    	    	    	    action = "suspend";
    	    	    } else {
    	    	    	    action = "resume";
    	    	    }
	    }
    	    
    	     Ext.MessageBox.confirm('Confirm', 'Are you sure you want to pause parsing of ' + fileTypeCode + '?', function(button) {
		    if(button.toUpperCase() == 'YES') {
		    	    console.log('Good. We will pause it right away.');
		    	    var ws = Ext.create('Ext.ux.WebSocket', {
				    url: 'ws://crb12.crbafrica.com:8087/ws',
				    listeners: {
				    	    open: function(ws) {
				    	    	    console.log('Websocket ready for use.');
				    	    	    ws.send(event, {
				    	    	    	'action': action, 
				    	    	    	'fileTypeCode': fileTypeCode,
				    	    	    	'routeType': routeType
				    	    	    });
				    	    },
				    	    close: function(ws) {
				    	    	    console.log('Websocket closed.');
				    	    }
				    }
		    	    });
		    	    
		    	    
		    } else {
		    	    console.log('Too bad. We were really itching to pause something.');
		    }
    	     });
    },
    
    submitFileForProcessing: function(button) {
    	    
    },
    
    showCreateUserWindow: function() {
    	    console.log('I see you wish to create a new user. Great. Give me a moment.');
    	    Ext.create('ExtMVC.view.portlet.NewUser', {}).show();
    },
    
    filterValidationErrorsByBatchNumber: function() {
    	    var grid = Ext.getCmp('exceptionbatchsummarygrid');
    	    var row = grid.getView().getSelectionModel().getSelection()[0];
    	    var batchNumber = row.get('batchNumber');
    	    
    	    console.log('I see you wish to filter. A moment as I filter using batchNumber = ' + batchNumber);
    	    
    	    Ext.getCmp('cboBatchNumber').setValue(batchNumber);
    	    var store = Ext.getCmp('exceptionreportsgrid').getStore();
    	    store.getProxy().extraParams = {
			search: true,
			batchNumber: batchNumber
	    };
		
	    store.load();
    },
    
    filterValidationErrorsByFileName: function() {
    	    var grid = Ext.getCmp('exceptionsummarygrid');
    	    var row = grid.getView().getSelectionModel().getSelection()[0];
    	    var fileName = row.get('fileName');
    	    
    	    console.log('I see you wish to filter. A moment as I filter using fileName = ' + fileName);
    	    
    	    Ext.getCmp('cboFileName').setValue(fileName);
    	    var store = Ext.getCmp('exceptionreportsgrid').getStore();
    	    store.getProxy().extraParams = {
			search: true,
			fileName: fileName
	    };
		
	    store.load();
    	    
    },
    
    showOriginalRecord: function() {
    	    console.log('I see you wish to view the original record! Plz wait...');
    	    var grid = Ext.getCmp('exceptionreportsgrid');
    	    var row = grid.getView().getSelectionModel().getSelection()[0];
    	    var details_ = row.get('originalRecord');
    	    
    	    var find = "#";
    	    var re = new RegExp(find, 'g');
    	    var details = details_.replace(re, "<br />");
    	    console.log('Record: ' + row.get('originalRecord'));
    	    var win = Ext.create('Ext.Window', {
		    title: 'Original Record',
		    //autoScroll: true,
		    width: 400,
		    height: 550,
		    //x: 400,
		    //y: 200,
		    modal: true,
		    plain: true,
		    headerPosition: 'right',
		    layout: 'border',
		    bodyStyle: 'padding: 0px;',
		    items: [{
		    	    region: 'center',
		    	    xtype: 'tabpanel',
		    	    items: [
		    	    	    {
					    title: 'Record',
					    bodyStyle: 'padding: 5px;',
					    html: details,
					    autoScroll: true
		    	    	    }
		    	    ]
		    }]
    	    });
    	    
    	    win.show();
    },
    
    login: function() {
    	    var username = Ext.getCmp('login_username').getValue();
    	    var password = Ext.getCmp('login_password').getValue();
    	    
    	    console.log('Attempting to log you in...' + username + '/' + password);
    	    
    	    Ext.Ajax.request({
		waitMsg: 'Login in progress...',
		url: '/batch-automation/ws/ba/subscribers/login',
		method: 'POST',
		params: {
			username: username,
			password: password
		},
		
		success: function(response) {
			var res = Ext.decode(response.responseText);
			
			if(res.success == true ) {
				Ext.MessageBox.alert("Success", res.message);

				if(res.message == "Login failed") {
					Ext.getCmp('loginportlet').show();
					Ext.getCmp('reportpanel').hide();
					Ext.getCmp('mainNavLeft').hide();
				} else {
				
					Ext.getCmp('reportpanel').show();
					Ext.getCmp('mainNavLeft').show();
					//Ext.getCmp('dtlPanel2').show();
					Ext.getCmp('loginportlet').hide();
				}
				
				//Ext.getCmp('userAccount').setText('My Account (' + res.message + ')')
			} else {
				Ext.MessageBox.alert("Error", res.message);
				Ext.getCmp('loginportlet').show();
				Ext.getCmp('reportpanel').hide();
				Ext.getCmp('mainNavLeft').hide();
			}
			
		},

		failure: function() {
			Ext.MessageBox.alert("Error", "User creation failed.");
		}
	});
    	    
    }
    
});
