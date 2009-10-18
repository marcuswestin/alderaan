dojo.declare("bespin.editor.ThemeEditor", null, {
    
    constructor: function(editor) {
		this.editor = editor;
	},
	
    toggleShow: function() {
        if (this.element && this.element.parentNode) {
            this.hide();
        } else {
            this.show();
        }
    },
    
    show: function() {
        this.create();
        document.body.appendChild(this.element);
    },
    
    hide: function() {
        document.body.removeChild(this.element);
    },
    
    create: function() {
        if (this.element) { return; }
        
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';

        this.element.style.top = '22px';
        this.element.style.right = '20px';

        bespin.util.css.addClassName(this.element, 'ThemeEditor');
        
        this.createThemeAttributeList();
        
    	jQuery(window).bind('resize', dojo.hitch(this, 'onResize'));
        this.onResize();
    },
    
    onResize: function() {
        $(this.element).height($(window).height() - 40);
    },
    
    createThemeAttributeList: function() {
        var theme = bespin.get('editor').theme;
        var table = this.attributesTable = this.element.appendChild(document.createElement('table'));
        for (var key in theme) {
            var row = table.appendChild(document.createElement('tr'));
            row.className = 'attributeRow'
            row.innerHTML = '<td class="name"> '+ key +' </td><td class="value">' + theme[key] + '</td>';
            if (this.isColor(theme[key])) {
                row.getElementsByTagName('td')[1].style.color = theme[key];
            }
            dojo.connect(row, 'click', row, dojo.hitch(this, 'onClickAttribute', key, row));
        }
    },
    
    isColor: function(string) {
        return string.match(/^[\#|rgb]/);
    },
    
    onClickAttribute: function(attribute, element) {
        var value = bespin.get('editor').theme[attribute];
        var valueCell = element.getElementsByTagName('td')[1];
        if (this.isColor(value)) {
            jQuery(element)
                .ColorPicker({ onChange: dojo.hitch(this, 'onColorChange', attribute, valueCell) })
                .ColorPickerSetColor(value)
                .ColorPickerShow();
        } else {
            bespin.util.inlineEdit.getValueFor(valueCell, dojo.hitch(this, 'onTextValueChange', attribute, valueCell));
        }
    },
    
    onColorChange: function(attribute, valueCell, bhsValue, hexValue, rgbValue) {
        jQuery(valueCell)
            .text('#' + hexValue)
            .css({ color: '#' + hexValue })
        bespin.get('editor').theme[attribute] = '#' + hexValue;
    },
    
    onTextValueChange: function(attribute, valueCell, value) {
        jQuery(valueCell).text(value);
        bespin.get('editor').theme[attribute] = value;
    }
})