/*
 * Kitchen Timer: Gnome Shell Kitchen Timer Extension
 * Copyright (C) 2021 Steeve McCauley
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/* exported init */

const GETTEXT_DOMAIN = 'kitchen-timer-blackjackshellac';

const { GObject, St } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Utils = Me.imports.utils;
const Settings = Me.imports.settings.Settings;
const Menus = Me.imports.menus;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const KitchenTimerIndicator = GObject.registerClass(
class KitchenTimerIndicator extends PanelMenu.Button {
    _init() {
        this._settings = new Settings();
        this._logger = new Utils.Logger(this._settings);
        this._logger.info('Initializing extension');

        super._init(0.0, _('Kitchen Timer'));

        let box = new St.BoxLayout({ style_class: 'panel-status-menu-box' });
        box.add_child(new St.Icon({
            icon_name: 'kitchen-timer-blackjackshellac-symbolic',
            style_class: 'system-status-icon',
        }));
        box.add_child(PopupMenu.arrowIcon(St.Side.BOTTOM));
        this.add_child(box);

        this._pmbuilder = new Menus.PanelMenuBuilder(this.menu);
        this._pmbuilder.build();


        // let item = new PopupMenu.PopupMenuItem(_('Show Notification'));
        // item.connect('activate', () => {
        //     Main.notify(_('Whatʼs up, folks?'));
        // });
        // this.menu.addMenuItem(item);
    }
});

class Extension {
    constructor(uuid) {
      this._uuid = uuid;

      ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._indicator = new KitchenTimerIndicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
  return new Extension(meta.uuid);
}
