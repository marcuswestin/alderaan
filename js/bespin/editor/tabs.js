dojo.declare("bespin.editor.TabManager", null, {
	
	constructor: function(editor) {
		this.editor = editor;
		bespin.subscribe("editor:openfile:opensuccess", dojo.hitch(this, 'onFileOpened'));
		bespin.subscribe("editor:openfile:openbefore", dojo.hitch(this, 'onBeforeFileOpen'));
		this.tabs = []
		this.element = document.createElement('div');
		bespin.util.css.addClassName(this.element, 'Tabs')
	},
	
	onBeforeFileOpen: function(properties) {
        if (!this.currentTab || this.currentTab.file.name == properties.filename) { return; }
        var content = bespin.get('editor').model.getDocument().substr(0, 16)
        // Right now the tab manager is responsible for transition between files. Update the contents of the file and mark it as dirty
        this.currentTab.file.content = bespin.get('editor').model.getDocument();
	},
	
	onFileOpened: function(event) {
		var file = event.file;
		if (!this.tabs[file.name]) {
			var newTab = this.tabs[file.name] = new bespin.editor.Tab(file);
			this.tabs.push(newTab);
			this.element.appendChild(newTab.element);
			newTab.subscribe('Click', dojo.hitch(this, 'onClickTab', file.name));
		}
		this.selectTabForFile(file.name);
	},

	hasTabForFile: function(filename) {
		return !!this.tabs[filename];
	},
	
	onClickTab: function(filename) {
        this.onBeforeFileOpen({ filename: filename });
        this.selectTabForFile(filename);
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
	},
	
	selectTabByTabIndex: function(tabIndex) {
		if (!this.tabs[tabIndex]) { return; }
		var filename = this.tabs[tabIndex].file.name;
		this.onBeforeFileOpen({ filename: filename })
		this.selectTabForFile(filename);
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



