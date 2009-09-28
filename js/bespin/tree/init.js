jQuery(document).ready( function($) {
	
	function resizeTree() {
	    $('#fileTree').height($(window).height());
	    // window.top.console.debug('resize', $(window).width(), $(window).height());
	}
    
    function onFileClick(path) {
        bespin.get("editor").openFile(bespin.get('editSession').project, path, {});
        // bespin.publish("ui:escape", {});
    }

	$('#fileTree').fileTree({ root: '.', script: 'cmd/php/ls/' }, onFileClick);
	$(window).bind('resize', resizeTree);
	
	resizeTree();
});

