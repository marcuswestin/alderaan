dojo.declare("bespin.editor.TabManager", null, {
	
	constructor: function(editor) {
		this.editor = editor;
		bespin.subscribe("editor:openfile:opensuccess", dojo.hitch(this, 'onFileOpened'));
		this.tabs = {}
		this.element = document.createElement('div');
		bespin.util.css.addClassName(this.element, 'Tabs')
	},
	
	onFileOpened: function(event) {
		var file = event.file;
		if (!this.tabs[file.name]) {
			var newTab = this.tabs[file.name] = new bespin.editor.Tab(file);
			this.element.appendChild(newTab.element);
			newTab.subscribe('Click', dojo.hitch(this, 'selectTabForFile', file.name));
		}
		this.selectTabForFile(file.name);
	},

	hasTabForFile: function(filename) {
		return !!this.tabs[filename];
	},

	selectTabForFile: function(filename) {
		var tab = this.tabs[filename];
		if (tab == this.currentTab) { return; }
		
		if (this.currentTab) { 
			bespin.util.css.removeClassName(this.currentTab.element, 'selected'); 
		}
		
		bespin.util.css.addClassName(tab.element, 'selected');
		this.currentTab = tab;
		
		var file = tab.file;
		this.editor.setFile(file.project, file.name, file, false);
	}
});

dojo.declare("bespin.editor.Tab", bespin.lib.Publisher, {
	
	constructor: function(file) {
		this.file = file;
		this.element = document.createElement('div');
		bespin.util.css.addClassName(this.element, 'Tab');
		this.element.innerHTML = file.name.split('/').pop();
		dojo.connect(this.element, 'click', this, 'onClick');
	},
	
	onClick: function() {
		this.publish('Click');
	}
	
})



