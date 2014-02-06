define( function( require ){

  'use strict';

  var $         = require('jquery');

  return notify;

  /**
   * notify - a small notification handler
   *
   * @param {String} type [error,info]
   * @param {String} msg the message
   * @param {Object} options
   * @param {Function} options.undo a function that will be triggered when user clicks on 'undo'
   * @param {Boolean} options.clearAll removes all current notifications before showing the new one
   */
  function notify( type, msg, options ){
    options = options || {};

    if( arguments.length === 1 && typeof(type) === 'object' ){
      options = type;
      type = msg = null;
    }
    if( options.clearAll )
      $('#notifications .notifications-collection').html('');

    if( !type )
      return;
    
    var $notification = $('<section/>');
    checkNotificationCollection();
    $notification
      .addClass('notification notification-'+type)
      .html(msg);

    if( options.undo )
      $notification.append( renderUndo(options.undo) );

    $notification.append( renderClose() );

    $('#notifications .notifications-collection').append( $notification );
    $notification.slideDown();
  }

  function checkNotificationCollection(){
    if( $('#notifications .notifications-collection').length )
      return;
    $('#notifications').html(
      $('<div/>').addClass('notifications-collection')
    );
  }

  function renderUndo( action ){

    if( typeof(action) !== 'function' )
      throw new Error('options.undo must be a function');

    var $undo = $('<a/>').addClass('undo').attr('href','#');
    $undo
      .html('<div class="text">'+$.i18n.t('undo')+'</div>')
      .on('click', action);
    return $undo;
  }

  function renderClose(){
    var $close = $('<a/>').addClass('close').attr('href','#');
    $close.html('<span class="hide">'+$.i18n.t('close')+'</span>');
    $close.on('click', function closeNotification(e){
      $(this).closest('.notification').remove();
    });
    return $close;
  }

});