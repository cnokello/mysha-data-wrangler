Ext.define('ExtMVC.view.portlet.Upload', {
	extend: 'Ext.ux.upload.Dialog',
	alias: 'widget.newprojectwindow',
	id: 'newprojectwindow',
	url: './server/upload.php',
	
	dialogTitle: 'NEW BATCH AUTOMATION PROJECT',
	uploadUrl: 'ws://localhost:8087/ws'
	
});
