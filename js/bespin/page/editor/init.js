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

dojo.provide("bespin.page.editor.init");

// = Bootstrap =
//
// This file is the editor bootstrap code that is loaded via script src
// from /editor.html.
//
// It handles setting up the objects that are to be used on the editor
// and deals with layout changes.

// ** {{{ Globals }}}
//
// One day we will get rid of all of these bar the core bespin object.

// pieces in the scene
(function() {
    var statusScene;

    dojo.mixin(bespin.page.editor, {
        // ** {{{ recalcLayout() }}} **
        //
        // When a change to the UI is needed due to opening or closing a feature
        // (e.g. file view, session view) move the items around
        recalcLayout: function() {
            //var subheader = dojo.byId("subheader");
            var footer = dojo.byId("footer");
            var editor = dojo.byId("editor");
            var files = dojo.byId("files");
            var collab = dojo.byId("collab");
            var target = dojo.byId("target_browsers");

            var move = [ editor ];

            // if the footer is displayed, then move it too.
            if (footer.style.display == "block") {
                move.push(footer);
            }

            // This should really move into a debugger plugin!
            // note also that this interferes with collab below.
            var debugbar = dojo.byId("debugbar");
            if (debugbar.style.display == "block") {
                dojo.forEach(move, function(item) { item.style.right = "201px"; });
            }


            if (bespin.get('toolbar').showCollab) {
                collab.style.display = "block";
                dojo.forEach(move, function(item) { item.style.right = "201px"; });
            } else {
                collab.style.display = "none";
                dojo.forEach(move, function(item) { item.style.right = "0"; });
            }

            if (bespin.get('toolbar').showTarget) {
                target.style.display = "block";
            } else {
                target.style.display = "none";
            }

            this.doResize();
        },

        // ** {{{ doResize() }}} **
        //
        // When a user resizes the window, deal with resizing the canvas and repaint
        doResize: function() {

            // Repaint the various canvas'
            bespin.get('editor').paint();
        }
    });

    // ** {{{ window.load time }}} **
    //
    // Loads and configures the objects that the editor needs
    dojo.addOnLoad(function() {
        var editor = bespin.register('editor', new bespin.editor.API('editor'));
        var editSession = bespin.register('editSession', new bespin.client.session.EditSession(editor));
        var server = bespin.register('server', new bespin.client.Server());
        var files = bespin.register('files', new bespin.client.FileSystem());

        bespin.register('actions', editor.ui.actions);
        //bespin.register('filesearch', new bespin.editor.filesearch.API());
        bespin.register('toolbar', new bespin.editor.Toolbar(editor, { setupDefault: true }));
        bespin.register('quickopen', new bespin.editor.quickopen.API());

        // Get going when settings are loaded
        bespin.subscribe("settings:loaded", function(event) {
            bespin.get('settings').loadSession();  // load the last file or what is passed in
            bespin.page.editor.doResize();
        });

        // var whenLoggedIn = function(userinfo) {
        //     bespin.get('editSession').setUserinfo(userinfo);
        // 
        //     bespin.register('settings', new bespin.client.settings.Core());
        //     
        //     if (userinfo.serverCapabilities) {
        //         var sc = userinfo.serverCapabilities;
        //         bespin.register("serverCapabilities", sc.capabilities);
        // 
        //         for (var packagename in sc.dojoModulePath) {
        //             dojo.registerModulePath(packagename, sc.dojoModulePath[packagename]);
        //         }
        // 
        //         // this is done to trick the build system which would
        //         // try to find a module called "plugin" below.
        //         var re = dojo.require;
        //         sc.javaScriptPlugins.forEach(function(plugin) {
        //             re.call(dojo, plugin);
        //         });
        //     }
        //     
        // 
        //     bespin.publish("authenticated");
        // };
        // 
        // var whenNotLoggedIn = function() {
        //     bespin.util.navigate.home(); // go back
        // };
        // 
        // // Force a login just in case the user session isn't around
        // server.currentuser(whenLoggedIn, whenNotLoggedIn);
		bespin.register('settings', new bespin.client.settings.Core());
		
		// Set the version info
        bespin.displayVersion();

        dojo.connect(window, 'resize', bespin.page.editor, "doResize");

        // -- Deal with the project label (project, filename, dirty flag)
        bespin.publish("bespin:editor:initialized", {});
        
    });

})();
