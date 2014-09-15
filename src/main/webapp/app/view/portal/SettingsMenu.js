Ext.define('ExtMVC.view.portal.SettingsMenu', {
    extend: 'Ext.panel.Panel',    
    
    alias: 'widget.settings',
    
    initComponent: function() {
        
        Ext.apply(this, {

            title:'Status',
            html: 'Actions placeholder',
            border: false,
            autoScroll: true,
            iconCls: 'settings'
            
        });
                
        this.callParent(arguments);
    }
});