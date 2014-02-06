define( function(require) {

  return TypeNumber;

  function TypeNumber( name, ko ){

    this['_'+name] = ko.observable();

    return ko.computed({
      read: function(){
        return this['_'+name]();
      },
      write: function(newValue){
        if( isNaN(newValue) )
          return;
        this['_'+name](parseInt(newValue));
      },
      owner: this
    });

  }


});