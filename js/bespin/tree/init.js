jQuery(document).ready( function($) {
	
	function resizeTree() {
	    $('#fileTree').height($(window).height());
	}
    
    function onFileClick(path) {
        bespin.get("editor").openFile(bespin.get('editSession').project, path, {});
    }

	$('#fileTree').fileTree({ root: '.', script: 'cmd/php/ls/' }, onFileClick);
	$(window).bind('resize', resizeTree);
	
	resizeTree();
});

