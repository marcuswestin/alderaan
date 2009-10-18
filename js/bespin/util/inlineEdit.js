dojo.provide("bespin.util.inlineEdit");

/**
 * URLBar watches the browser URL navigation bar for changes.
 * If it sees a change it tries to open the file
 * The common case is using the back/forward buttons
 */
bespin.util.inlineEdit = {

    getValueFor: function(element, callback) {
        this.create();
        var offset = jQuery(element).offset();
        this.element.value = jQuery(element).text();
        jQuery(this.element).css({
            position: 'absolute',
            top: offset.top,
            left: offset.left,
            width: jQuery(element).width(),
            height: jQuery(element).height()
        })
        .bind('keypress', dojo.hitch(this, 'onKeyPress', element, callback))
        .appendTo(document.body);
        this.element.focus();
    },
    
    create: function() {
        if (this.element) { return; }
        this.element = document.createElement('input');
        this.element.type = 'text';
    },
    
    onKeyPress: function(element, callback, e) {
        var value = this.element.value;
        switch (e.keyCode) {
            case bespin.util.keys.Key.ENTER:
                callback(value);
                break;
            case bespin.util.keys.Key.ESCAPE:
                callback(jQuery(element).text())
                break;
            default:
                // Don't do anything else
                return;
        }
        document.body.removeChild(this.element);
    }
};