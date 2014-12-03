/*----------------------------------------------------------- 
 togglemenu - hotcss
 -----------------------------------------------------------*/
jQuery( document ).ready( function( $ ) {		
      var $menu = $('#hotmenu'),
              $menulink = $('.togglemenu'),
              $menuTrigger = $('.li-submenu > a');

    $menulink.click(function(e) {
            e.preventDefault();
            $menulink.toggleClass('active');
            $menu.toggleClass('active');
    });

    $menuTrigger.click(function(e) {
            e.preventDefault();
            var $this = $(this);
            $this.toggleClass('active').next('ul').toggleClass('active');
    });		
});

