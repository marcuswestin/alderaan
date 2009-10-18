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
        this.element.style.right = '25px';

        var copyButton = this.element.appendChild(document.createElement('button'));
        dojo.connect(copyButton, 'click', dojo.hitch(this, 'onCopyButtonClick'));
        copyButton.innerHTML = 'Copy';
        
        bespin.util.css.addClassName(this.element, 'ThemeEditor');
        
        this.createThemeAttributeList();
        
    	jQuery(window).bind('resize', dojo.hitch(this, 'onResize'));
        this.onResize();

		this.element.style.backgroundColor = bespin.get('editor').theme['backgroundStyle'];
    },
    
    onResize: function() {
        $(this.element).height($(window).height() - 40);
    },
    
    createThemeAttributeList: function() {
        var theme = bespin.get('editor').theme;
        var table = this.attributesTable = this.element.appendChild(document.createElement('table'));
        for (var key in theme) {
            var row = table.appendChild(document.createElement('tr'));
            row.className = 'attribute'
            row.innerHTML = '<td class="name"> '+ key +' </td><td class="value">' + theme[key] + '</td>';
            var valueCell = row.getElementsByTagName('td')[1];
            if (this.isColor(theme[key])) {
                valueCell.style.color = theme[key];
            }
            dojo.connect(valueCell, 'click', row, dojo.hitch(this, 'onClickAttribute', key, row));
        }
    },
    
    isColor: function(string) {
        return string.match(/^[\#|rgb]/);
    },
    
    onClickAttribute: function(attribute, element) {
        var value = bespin.get('editor').theme[attribute];
        var valueCell = element.getElementsByTagName('td')[1];
        if (this.isColor(value)) {
            jQuery(valueCell)
                .ColorPicker({ onChange: dojo.hitch(this, 'onColorChange', attribute, valueCell) })
                .ColorPickerSetColor(value)
                .ColorPickerShow();
        } else {
            bespin.util.inlineEdit.getValueFor(valueCell, dojo.hitch(this, 'onTextValueChange', attribute, valueCell));
        }
    },
    
    onColorChange: function(attribute, valueCell, hsbValue, hexValue, rgbValue) {
        if (attribute == 'backgroundStyle') {
			this.element.style.backgroundColor = '#' + hexValue;
			var brightness = hsbValue.b > 50 ? hsbValue.b - 30 : hsbValue.b + 30;
            var rgb = jQuery.fn.ColorPickerHSBtoRGB({ h: hsbValue.h, s: hsbValue.s, b: brightness });
            var rgbArr = [rgb.r, rgb.g, rgb.b];
            valueCell.style.backgroundColor = 'rgb(' + rgbArr.join(',') + ')';
		}
		jQuery(valueCell)
            .text('#' + hexValue)
            .css({ color: '#' + hexValue })
        bespin.get('editor').theme[attribute] = '#' + hexValue;
    },
    
    onTextValueChange: function(attribute, valueCell, value) {
        jQuery(valueCell).text(value);
        bespin.get('editor').theme[attribute] = value;
    },
    
    onCopyButtonClick: function() {
        var theme = bespin.get('editor').theme;
        var jsonString = JSON.stringify(theme);
        jsonString = jsonString.substring(1, jsonString.length - 1); // remove { and }
        jsonString = jsonString.replace(/","/g, '",\n\t"'); // newlines and indentations
        jsonString = jsonString.replace(/":"/g, '": "'); // add space between key and value
        jsonString = "{\n\t" + jsonString + "\n}"; // add { and }, with proper indentation
        bespin.get('editor').model.insertDocument(jsonString);
    }
})