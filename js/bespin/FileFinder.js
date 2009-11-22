dojo.declare("bespin.FileFinder", null, {
	
	_maxLines: 20,

	constructor: function() {
		this._currentLine = 0;
	},
	
	show: function() {
		if (!this._element) { this.createDom(); }
		document.body.appendChild(this._element);
		
		this._input.value = 'loading files...';
		bespin.util.css.addClassName(this._input, 'defaultValue');
		
		this.resize();
		bespin.get('server').getAllFiles(dojo.hitch(this, 'onFiles'));
	},
	
	onFiles: function(data) {
		this._files = data;

		this._input.value = '';
		bespin.util.css.removeClassName(this._input, 'defaultValue');
		this._input.focus();
	},
	
	createDom: function() {
		this._element = document.createElement('div');
		this._element.className = 'FileFinder';
		
		this._container = this._element.appendChild(document.createElement('div'));
		this._container.className = 'container';
		
		this._input = this._container.appendChild(document.createElement('input'));
		this._input.className = 'input';
		
		this._output = this._container.appendChild(document.createElement('div'));
		this._output.className = 'output';
		
		dojo.connect(this._input, "onkeypress", dojo.hitch(this, 'onInputKeyPress'), true);
		dojo.connect(this._input, "onkeydown", dojo.hitch(this, 'onInputKeyDown'), true);
		
		jQuery(window).resize(dojo.hitch(this, 'resize'));
	},
	
	onInputKeyDown: function(e) {
		var key = bespin.util.keys.Key;
		switch(e.keyCode) {
			case key.UP_ARROW:
				if (this._currentLine > 0) {
					this.setCurrentLine(this._currentLine - 1);
				}
				dojo.stopEvent(e);
				break;

			case key.DOWN_ARROW:
				if (this._currentLine < this._maxLines) {
					this.setCurrentLine(this._currentLine + 1);
				}
				dojo.stopEvent(e);
				break;
				
			case key.ENTER:
				this.onClickFile(this._results[this._currentLine])
				dojo.stopEvent(e);
				break;
		}
	},
	
	onInputKeyPress: function(e) {
		var key = bespin.util.keys.Key;
		switch(e.keyCode) {
			case key.UP_ARROW:
			case key.DOWN_ARROW:
			case key.ENTER:
				dojo.stopEvent(e);
				return;
		}
		
		this._results = [];
		for (var i=0, file; file = this._files[i]; i++) {
			if (file.name.match(this._input.value)) {
				this._results.push(file);
				if (this._results.length > this._maxLines) { break; }
			}
		}

		this._output.innerHTML = '';
		for (var i=0, result; result = this._results[i]; i++) {
			this.renderOutput(result);
		}
		this.setCurrentLine(0);
	},
	
	setCurrentLine: function(index) {
		var lines = this._output.getElementsByTagName('span');
		bespin.util.css.removeClassName(lines[this._currentLine], 'selected');
		bespin.util.css.addClassName(lines[index], 'selected');
		this._currentLine = index;
	},
	
	renderOutput: function(file) {
		var line = this._output.appendChild(document.createElement('span'));
		line.className = 'line';
		line.innerHTML = file.name + ' - ' + file.dir + '<br />';
		
		dojo.connect(line, 'onclick', dojo.hitch(this, 'onClickFile', file));
	},
	
	onClickFile: function(file){
		bespin.get("editor").openFile(bespin.get('editSession').project, file.dir + '/' + file.name, {});
		this.hide();
	},
	
	hide: function() {
		document.body.removeChild(this._element);
		this._output.innerHTML = '';
	},
	
	resize: function() {
		var width = jQuery(window).width();
		var height = jQuery(window).height();

		this._element.width = width + 'px';
		this._element.height = height + 'px';
		
		this._container.style.left = (width - jQuery(this._container).width()) / 2 + 'px';
		this._container.style.top = '50px';

		this._output.style.height = height - 100 + 'px';
	}
})	
