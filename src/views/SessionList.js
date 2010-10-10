app.SessionListView = Ext.extend(Ext.List, {
  name:'SessionListView',
  cls: 'sessionlist-view',
  itemSelector: 'div.sessionlist-item',
  singleSelect: true,
  loadingText: G_LOADING,
  emptyText: G_EMPTY,
  initComponent: function() {
    this.user_id;
    this.dataUpdated = false;
    
    this.store = new Ext.data.Store({
      model: 'Session',
      proxy: 'CodebitsProxy',
      autoload: false
    });
    this.tpl = Ext.XTemplate.from('sessionlist');
    this.tpl.compile();
    
    this.addEvents('updateData');
    this.on('updateData', this.onUpdateData, this);
    
    this.on('itemtap', this.onListItemTap);
    
    app.SessionListView.superclass.initComponent.call(this);
  },
  onUpdateData: function(user_id, refresh) {
    if (this.dataUpdated === true && refresh !== true)
      return false;
      
    this.scroller.scrollTo({x: 0, y: 0});
    this.store.read({
      params:{
        url: 'usersessions/' + user_id,
        token: localStorage['token']
      },
      callback: function(records, operation, success) {
        //console.log(operation.response.responseText, success);
        /*if(!result.error){
          console.log('updateSessionListView', result); 
          console.log(result, success, response);
          console.log(this.response.responseText);
        }
        else {
          console.log('TOKEN EXPIRED!');
        }*/
      }
    });
    
    this.user_id = user_id;
    this.dataUpdated = true;
  },
  onListItemTap: function(item, index, el, e){
    var store   = item.getStore(),
        record  = store.getAt(index);
        
    console.log(record.data.id);
    this.fireEvent('setCard', 'SessionDetailView', record.data.id, 'slide');
  }
});

Ext.reg('SessionListView', app.SessionListView);