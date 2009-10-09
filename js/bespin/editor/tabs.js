dojo.declare("bespin.editor.TabManager", null, {
	
	constructor: function() {
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
			newTab.subscribe('Click', dojo.hitch(this, 'selectTab', newTab));
		}
		this.selectTab(this.tabs[file.name]);
	},
	
	selectTab: function(tab) {
		if (this.currentTab) {
			bespin.util.css.removeClassName(this.currentTab.element, 'selected');
		}
		bespin.util.css.addClassName(tab.element, 'selected');
		this.currentTab = tab;
		bespin.get('editor').openFile(tab.file.project, tab.file.name, {})
	}
	
})

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



