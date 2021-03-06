dojo.declare("bespin.editor.TabManager", null, {
	
	constructor: function(editor) {
		this.editor = editor;
		bespin.subscribe("editor:openfile:opensuccess", dojo.hitch(this, 'onFileOpened'));
		bespin.subscribe("editor:openfile:openbefore", dojo.hitch(this, 'onBeforeFileOpen'));
		this.tabs = []
		this.element = document.createElement('div');
		bespin.util.css.addClassName(this.element, 'Tabs')
		
		bespin.subscribe("editor:savefile:after", dojo.hitch(this, 'onFileSaved'));
	},
	
	onBeforeFileOpen: function(properties) {
        if (!this.currentTab || this.currentTab.file.name == properties.filename) { return; }
        // Right now the tab manager is responsible for transition between files. Update the contents of the file and mark it as dirty
		if (bespin.get('editor').model.hasBeenModified()) {
			this.currentTab.markAsDirty();
		}        
		this.currentTab.file.content = bespin.get('editor').model.getDocument();
	},
	
	onFileOpened: function(event) {
		var file = event.file;
		var tab = this.getTabByFilename(file.name);
		if (!tab) {
			var newTab = new bespin.editor.Tab(file);
			this.tabs.push(newTab);
			this.element.appendChild(newTab.element);
			newTab.subscribe('Click', dojo.hitch(this, 'onClickTab', file.name));
			newTab.subscribe('Close', dojo.hitch(this, 'closeTab', file.name));
		}
		this.selectTabForFile(file.name);
	},

	getTabByFilename: function(filename) {
		for (var i=0, tab; tab = this.tabs[i]; i++) {
			if (tab.file.name == filename) { return tab; }
		}
	},

	onFileSaved: function(file) {
		this.getTabByFilename(file.name).markAsClean();
	}, 

	hasTabForFile: function(filename) {
		return !!this.getTabByFilename(filename);
	},
	
	onClickTab: function(filename) {
        this.onBeforeFileOpen({ filename: filename });
		this.selectTabForFile(filename);
	},
	
	closeTab: function(filename) {
		var closingTab = this.getTabByFilename(filename);
		
		var nextTab;
        for (var i=0, tab; tab = this.tabs[i]; i++) {
			if (tab.file.name == filename) {
				nextTab = this.tabs[i + 1] || this.tabs[i - 1];
				tab.element.parentNode.removeChild(tab.element);
				this.tabs.splice(i, 1);
			}
		}
		
		bespin.publish('tabmanager:closeTab', closingTab.file);
		
		if (nextTab) { 
			this.selectTabForFile(nextTab.file.name); 
		} else {
			this.editor.setFile(null, null, {content: ''});
			this.editor.model.markAsClean();
		}
	},
	
	closeCurrentTab: function() {
		this.closeTab(this.currentTab.file.name);
	},
	
	selectTabForFile: function(filename) {
		var tab = this.getTabByFilename(filename);
		if (tab == this.currentTab) { return; }
		
		if (this.currentTab) { 
			bespin.util.css.removeClassName(this.currentTab.element, 'selected'); 
        }
		
		bespin.util.css.addClassName(tab.element, 'selected');
		this.currentTab = tab;
		
		var file = tab.file;
		this.editor.setFile(file.project, file.name, file, false);
		if (!tab.isDirty()) { 
			this.editor.model.markAsClean();
		}
		
		bespin.publish('tabmanager:selectTab', file);
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
		var label = this.element.appendChild(document.createElement('div'));
		label.innerHTML = file.name.split('/').pop();
		label.className = 'label';
		
		var close = this.element.appendChild(document.createElement('div'));
		close.innerHTML = 'x';
		close.className = 'closeButton';
		dojo.connect(close, 'click', this, 'onClickClose');
		dojo.connect(this.element, 'click', this, 'onClick');
	},
	
	onClick: function() {
		this.publish('Click');
	},
	
	onClickClose: function(e) {
		this.publish('Close');
		dojo.stopEvent(e);
	},

	markAsClean: function() { this._dirty = false; },
	markAsDirty: function() { this._dirty = true; },
	isDirty: function() { return this._dirty; }
	
})



