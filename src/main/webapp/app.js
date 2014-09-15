Ext.Loader.setConfig({
	enabled:true,
	paths: {
    	    'Ext.ux': 'extjs/src/ux',
    	    'Ext.ux.upload': 'extjs/src/ux/upload'
    	}
});

Ext.require([
	'Ext.ux.data.proxy.WebSocket'
]);

Ext.application({
    name: 'ExtMVC',
    
    controllers: [
    	'Portal'
    ],
    
    autoCreateViewport: true
    
});