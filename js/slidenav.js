/*
 * slidenav
 *
 * Copyright (c) 2012 Filament Group
 * Licensed under the MIT, GPL licenses.
 */

(function($) {
  var pluginName = "slidenav",
    dataAttr = "data-slidenav",
    pageClass = "ui-page",
    activeClass = "ui-nav-open",
    transitionClass = "ui-transition",
    initSelector = "[" + dataAttr + "]",
    methods = {
     _create: function() {
      return $( this ).each(function() {
        var init = $( this ).data( "init" );

        if( init ) {
          return false;
        }

        $( this )
          .data( "init", true )
          .trigger( "beforecreate." + pluginName )
          [ pluginName ]( "_init" )
          .trigger( "create." + pluginName );
      });
    },
    _init: function() {
      var $el = $(this),
        target = $el.attr( "href" ),
        $tEl = $( target ),
        opt = $el.attr( "data-slidenav" ).split("-");

      $el[ pluginName ]( "_bindEventListeners" );

      $tEl
        .addClass( "slidenav" )
        .parent() // TODO: This shouldn’t depend on the element’s position in source.
          .addClass( pageClass + ( opt[ 0 ] ? " method-" + opt[ 0 ] : "" ) + ( opt[ 1 ] ? " dir-" + opt[ 1 ] : "" ) );

      return this;
    },

    _bindEventListeners: function( ){
        $( this ).bind( "click", function( e ){
          $( this )[ pluginName ]( "toggle", e );
        });
      return this;
    },
    toggle: function( e ) {
      var $page = $( "." + pageClass );

      $( e.target )[ $( e.target ).attr( "class" ).indexOf( "ui-active" ) > -1 ?  "removeClass" : "addClass" ]( "ui-active" ); // TODO: Gross.

      $page
        .addClass( transitionClass )
        [ $page.attr( "class" ).indexOf( activeClass ) > -1 ?  "removeClass" : "addClass" ]( activeClass )
        .one( navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ? "webkitTransitionEnd" : "transitionend otransitionend", function(){ // TODO: Ultragross.
          $page.removeClass( transitionClass );
        });

      e.preventDefault();
      return this;
    }
  };

  // Collection method.
  $.fn[ pluginName ] = function( arrg, a, b, c ) {
    return this.each(function() {

    // if it's a method
    if( arrg && typeof( arrg ) === "string" ){
      return $.fn[ pluginName ].prototype[ arrg ].call( this, a, b, c );
    }

    // don't re-init
    if( $( this ).data( pluginName + "data" ) ){
      return $( this );
    }

    // otherwise, init
    $( this ).data( pluginName + "active", true );
      $.fn[ pluginName ].prototype._create.call( this );
    });
  };

  // add methods
  $.extend( $.fn[ pluginName ].prototype, methods );

  // DOM-ready auto-init
  $( function(){
    $( initSelector )[ pluginName ]();
  });
}( shoestring ));
