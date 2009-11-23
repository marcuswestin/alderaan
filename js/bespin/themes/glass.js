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

dojo.provide("bespin.themes.glass");

/**
 * Glass Theme
 */
bespin.themes.glass = {
	"backgroundStyle": "#FFFFFF",
	"gutterStyle": "#adadad",
	"lineNumberColor": "#ffffff",
	"lineNumberFont": "10pt Monaco, Lucida Console, monospace",
	"lineMarkerErrorColor": "#CC4444",
	"lineMarkerWarningColor": "#B8860B",
	"lineMarkerMessageColor": "green",
	"zebraStripeColor": "#FFFFFF",
	"highlightCurrentLineColor": "#DDDDDD",
	"editorTextFont": "10pt Monaco, Lucida Console, monospace",
	"editorTextColor": "#666666",
	"editorSelectedTextColor": "#787878",
	"editorSelectedTextBackground": "#bdd9ff",
	"cursorStyle": "#738fff",
	"cursorType": "ibeam",
	"unfocusedCursorStrokeStyle": "#4a61b3",
	"unfocusedCursorFillStyle": "#ccd8ff",
	"partialNibStyle": "rgba(100, 100, 100, 0.3)",
	"partialNibArrowStyle": "rgba(255, 255, 255, 0.3)",
	"partialNibStrokeStyle": "rgba(150, 150, 150, 0.3)",
	"fullNibStyle": "rgb(100, 100, 100)",
	"fullNibArrowStyle": "rgb(255, 255, 255)",
	"fullNibStrokeStyle": "rgb(150, 150, 150)",
	"scrollTrackFillStyle": "rgba(50, 50, 50, 0.8)",
	"scrollTrackStrokeStyle": "rgb(150, 150, 150)",
	"scrollBarFillStyle": "rgba(0, 0, 0, %a)",
	"scrollBarFillGradientTopStart": "rgba(90, 90, 90, %a)",
	"scrollBarFillGradientTopStop": "rgba(40, 40, 40, %a)",
	"scrollBarFillGradientBottomStart": "rgba(22, 22, 22, %a)",
	"scrollBarFillGradientBottomStop": "rgba(44, 44, 44, %a)",
	"tabSpace": "#ab581d",
	"searchHighlight": "#bdbbbd",
	"searchHighlightSelected": "#9cceff",
	"plain": "#4a424a",
	"keyword": "#1b1bbd",
	"string": "#4c73ff",
	"comment": "#b3b3b3",
	"c-comment": "#b3b3b3",
	"punctuation": "#54005c",
	"attribute": "#BF9464",
	"test": "rgb(255,0,0)",
	"cdata": "#bdae9d",
	"attribute-value": "#403485",
	"tag": "#bdae9d",
	"tag-name": "#BDAE9F",
	"value": "#BF9464",
	"important": "#990000",
	"cssclass": "#BF9464",
	"cssid": "#BDAE9D",
	"undefined": "#777777",
	"attname": "#777777",
	"color": "#403485"
}

// ** Glass Zebra Theme **
bespin.themes.glasszebra = {};
dojo.mixin(bespin.themes.glasszebra, bespin.themes.glass);
bespin.themes.glasszebra.zebraStripeColor = '#FFFFFF';