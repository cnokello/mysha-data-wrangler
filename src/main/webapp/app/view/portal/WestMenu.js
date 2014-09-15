Ext.define('ExtMVC.view.portal.WestMenu', {
    extend: 'Ext.panel.Panel',    
    
    alias: 'widget.westmenu',

    requires: [
        'ExtMVC.view.portal.NavigationMenu',
        'ExtMVC.view.portal.SettingsMenu'
    ],
    
    initComponent: function() {
        
        Ext.apply(this, {

            id: 'dtlPanel',
            title: '',
            animCollapse: true,
            collapsed: false,
            width: 300,
            minWidth: 150,
            maxWidth: 400,
            split: true,
            collapsible: true,
            layout:{
                type: 'accordion',
                animate: true
            },
            
            items: [{
                xtype: 'navigation'
            },{
                xtype: 'settings'
            }]
        });
                
        this.callParent(arguments);
    }
});