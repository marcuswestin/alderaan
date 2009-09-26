jQuery(document).ready( function($) {
	
	$('#fileTree').fileTree({ root: '.', script: 'cmd/php/ls/' }, function(path) { 
        bespin.get("editor").openFile(bespin.get('editSession').project, path, {});
        // bespin.publish("ui:escape", {});
	});
});

