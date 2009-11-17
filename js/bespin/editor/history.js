/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and
 * limitations under the License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * ***** END LICENSE BLOCK ***** */

dojo.provide("bespin.editor.history");

// = Undo Handling =
//
// Handle the undo/redo queues for the editor

// ** {{{ bespin.editor.HistoryManager }}} **
//
// Run the undo/redo stack
dojo.declare("bespin.editor.HistoryManager", null, {
    constructor: function(){
        
		// indexed by file name
		this.histories = {};

        bespin.subscribe('tabmanager:selectTab', dojo.hitch(this, 'onSelectTab'));
        bespin.subscribe('tabmanager:closeTab', dojo.hitch(this, 'onCloseTab'));
    },

	onSelectTab: function(file){
		this.currentFile = file.name;
		if (!this.histories[this.currentFile]) { this.histories[this.currentFile] = { position: -1, actions: [] }; }
	},

	onCloseTab: function(file){
		delete this.histories[this.currentFile];
		this.currentFile = null;
	},

	getCurrent: function() { return this.histories[this.currentFile].position },
	
    // truncate: removes every entry AFTER the given entry (keeps that entry)
    truncate: function(keepUntil) {
        var history = this.histories[this.currentFile];
        history.actions.length = keepUntil + 1;
		history.position = Math.min(history.position, history.actions.length - 1);
    },
        
    undo: function() {
        if (this.getCurrent() < 0) { return; }
        
        var history = this.histories[this.currentFile];
        this.disableAdding = true;
        // try {
            history.actions[history.position].undo();
        // } catch (e) {
        //    console.error("There was an error in an undo action: ");
        //    console.error(e);
        //}
        this.disableAdding = false;
        history.position--;
    },
    
    redo: function() {
		var history = this.histories[this.currentFile];
		if (history.position >= history.actions.length - 1) { return; }
        
        this.disableAdding = true;
        //try {
            history.actions[history.position + 1].redo();
        //} catch (e) {
        //    console.error("There was an error in an undo action: ");
        //    console.error(e);
        //}
        this.disableAdding = false;
	    history.position++;
    },
    
    add: function(item) {
        if (this.disableAdding) //don't do anything we shouldn't!
            return;
        
        // make sure we truncate any newer actions
        var history = this.histories[this.currentFile];
		if (!history) { debugger };
		history.actions.length = history.position + 1;
        history.actions.push(item);
        history.position++;
    },

	goToPosition: function(targetPosition) {
		var history = this.histories[this.currentFile];
		
		var funcName = this.histories[this.currentFile].position < targetPosition ? 'redo' : 'undo';
		while (targetPosition != this.histories[this.currentFile].position) {
			this[funcName].apply(this);
		}
	}
});

// ** {{{ bespin.editor.HistoryManager }}} **
//
// This is a reference implementation of a history item.
dojo.declare("bespin.editor.HistoryItem", null, {
    constructor: function() {
    },

    undo: function() {
    },

    redo: function() {
    }
});