jQuery(document).ready( function($) {
	
	$('#fileTree').fileTree({ root: '.', script: 'cmd/php/ls/' }, function(path) { 
        bespin.get("editor").openFile(bespin.get('editSession').project, path, {});
        // bespin.publish("ui:escape", {});
	});
	
	$(window).bind('resize', function(){
        $('#fileTree').height($(window).height());
        // window.top.console.debug('resize', $(window).width(), $(window).height());
	})
});

