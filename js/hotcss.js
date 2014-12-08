/*----------------------------------------------------------- 
 jquery ui custom - hotcss
 -----------------------------------------------------------*/
$(function() {    
    $( ".hottabs" ).tabs(); 
    $( ".hotaccordion" ).accordion({ heightStyle: "content", collapsible: true });    
    $( ".hottogglepanel" ).accordion({
        heightStyle: "content",
        collapsible:true,                    
        beforeActivate: function(event, ui) {            
            if (ui.newHeader[0]) {
                var currHeader  = ui.newHeader;
                var currContent = currHeader.next('.ui-accordion-content');             
            } else {
                var currHeader  = ui.oldHeader;
                var currContent = currHeader.next('.ui-accordion-content');
            }            
            var isPanelSelected = currHeader.attr('aria-selected') == 'true';            
            currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));            
            currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
            currContent.toggleClass('accordion-content-active',!isPanelSelected)    
            if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
            return false; 
        }
    });    
    // event handler for window resize
    $(window).resize(function(e){ updateUI(); });
    updateUI();
});


/*----------------------------------------------------------- 
 jquery ui custom functions - hotcss
 -----------------------------------------------------------*/

// event handler for window resize
function updateUI(){
    if($(window).width() <= 767){
        // mobile view instructions
        tabsToAccordions();
    } else {
        // desktop view instructions
        accordionsToTabs();
    }
}
// changes tabs to accordions (jquery ui)
function tabsToAccordions(){
    $(".hottabs").each(function(){var e=$('<div class="tabtoaccordion">');var t=new Array;$(this).find(">ul>li").each(function(){t.push("<h3>"+$(this).html()+"</h3>")});var n=new Array;$(this).find(">div").each(function(){n.push("<div>"+$(this).html()+"</div>")});for(var r=0;r<t.length;r++){e.append(t[r]).append(n[r])}$(this).before(e);$(this).remove()});$(".tabtoaccordion").accordion({ heightStyle: "content", collapsible: true });
}
// changes accordions to tabs (jquery ui)
function accordionsToTabs(){
    $(".tabtoaccordion").each(function(){var e=$('<div class="hottabs">');var t=0;var n=$("<ul>");$(this).find(">h3").each(function(){t++;n.append('<li><a href="#tabs-'+t+'">'+$(this).text()+"</a></li>")});var t=0;var r=$("");$(this).find(">div").each(function(){t++;r=r.add('<div id="tabs-'+t+'">'+$(this).html()+"</div>")});e.append(n).append(r);$(this).before(e);$(this).remove()});$(".hottabs").tabs();
}