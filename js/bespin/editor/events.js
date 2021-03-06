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

dojo.require("bespin.util.util");

dojo.provide("bespin.editor.events");

/**
 * Handle custom events aimed at, and for the editor
 */
dojo.declare("bespin.editor.Events", null, {
    constructor: function(editor) {
        /**
         * When a file is opened successfully change the project and file status
         * area, then change the window title, and change the URL hash area
         */
        bespin.subscribe("tabmanager:selectTab", function(file) {
            var project = bespin.get('editSession').project;
            var filename = file.name;
			
            try {
                // reset the state of the editor based on saved cookie
                var data = editor.loadViewState(filename)
				if (data) {
                    bespin.get('editor').resetView(dojo.fromJson(data));
                } else {
                    bespin.get('editor').basicView();
                }
            } catch (e) {
                console.log("Error setting in the view: ", e);
            }

            document.title = filename + ' - editing with Alderaan';

            bespin.publish("url:change", { project: project, path: filename });
        });

        /**
         * Observe a urlchange event and then... change the location hash
         */
        bespin.subscribe("url:change", function(event) {
			window.location.hash = '#' + event.path;
        });

        /**
         * Observe a request for session status
         * This should kick in when the user uses the back button, otherwise
         * editor.openFile will check and see that the current file is the same
         * as the file from the urlbar
         */
        bespin.subscribe("url:changed", function(event) {
            editor.openFile(null, event.now.get('path'));
        });

        /**
         * If the command line is in focus, unset focus from the editor
         */
        bespin.subscribe("cmdline:focus", function(event) {
            editor.setFocus(false);
        });

        /**
         * If the command line is blurred, take control in the editor
         */
        bespin.subscribe("cmdline:blur", function(event) {
            editor.setFocus(true);
        });

        /**
         * Track whether a file is dirty (hasn't been saved)
         */
        bespin.subscribe("editor:document:changed", function(event) {
            bespin.publish("editor:dirty");
        });

        /**
         *
         */
        bespin.subscribe("editor:dirty", function(event) {
            editor.dirty = true;
        });

        /**
         *
         */
        bespin.subscribe("editor:clean", function(event) {
            editor.dirty = false;
        });
    }
});
