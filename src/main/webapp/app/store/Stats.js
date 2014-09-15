Ext.define('ExtMVC.store.Stats', {
	extend: 'Ext.data.Store',
	requires: [
		'ExtMVC.model.Stock',
		'Ext.data.proxy.JsonP'
	],
	autoLoad: false,
	
	proxy: {
		type: 'jsonp',
		model: 'ExtMVC.model.Stock',
		url: 'http://localhost:9000/consolidatedstats.json',
		reader: {
			type: 'json'
		}
	}

});
