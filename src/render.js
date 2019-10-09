/**
 * @file render js
 * @author skykun
 */
import Input from './items/input';
import Select from './items/select';
import Button from './items/button';
import './css/main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {addStorageListener, getLocaleStorage} from './utils/setLocale';

class Render {
    constructor(data) {
        this.data = data;
        this.locale = getLocaleStorage();
        this.$container = null;
        var me = this;
        // reset locale while local storage changed
        addStorageListener(function () {
            me.locale = getLocaleStorage();
            me.refresh();
        });
    }

    render() {
        this.mount();
    }

    mount() {
        this.$container = document.getElementById('form-container');
        if (!this.$container) {
            throw new Error('please check form container is provided');
        }
        this.$container.innerHTML = this.getRawHtml(this.data);
    }

    refresh() {
        if (!this.$container) {
            return;
        }
        this.$container.innerHTML = this.getRawHtml(this.data);
    }

    getRawHtml(data) {
        let item = null;
        let htmlRaw = '';
        data.properties.forEach(property => {
            let param = {
                ...property,
                localeKey: this.locale
            };
            switch(property.type) {
                case 'TEXT':
                    item = new Input(param);
                    break;
                case 'SELECT':
                    item = new Select(param);
                    break;
                case 'BUTTON':
                    item = new Button(param);
                    break;
            }
            htmlRaw += item.getHtml();
        });
        return htmlRaw;
    }
}

export default Render;