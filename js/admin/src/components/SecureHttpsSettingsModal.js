import app from 'flarum/app';
import { extend } from 'flarum/extend';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class SecureHttpsSettingsModal extends SettingsModal {
  init() {
    super.init();
    
    if(this.setting('davis-securehttps.replace')() == undefined) {
      this.setting('davis-securehttps.replace')('true');
    }
  }
  className() {
    return 'SecureHttpsSettingsModal Modal--small';
  }

  title() {
    return app.translator.trans('davis-securehttps.admin.settings.title');
  }

  form() {
    return [
      <div className="Form-group">
        {Switch.component({
          state: this.setting('davis.securehttps.replace')(),
          children: app.translator.trans('davis-securehttps.admin.settings.replace'),
          onchange: this.setting('davis.securehttps.replace')
        })}
      </div>
    ];
  }
}
