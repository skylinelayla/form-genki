/**
 * @file plugin
 * @author skykun
 */

export default class Plugin {
    constructor(data) {
    }

    /**
     * install plugin to host
     * plugin mount after form render finished
     * @param el {htmlNode}
     * @param evt {string}
     * @param cb {function}
     */
    install(el, evt, cb) {
        if (!el.nodeName || typeof evt !== 'string') {
            throw new Error('can not bind plugin to host!');
        }
        this.el = el;
        this.evt = evt;
        var me = this;

        this.el.addEventListener(this.evt, function () {
            (cb && typeof cb === 'function') ? cb() : me.dispatch();
        });
    }

    /**
     * remove plugin from host
     */
    dispose() {
        this.el.removeEventListener(this.evt);
        this.el = null;
        this.evt = null;
    }

    /**
     * function logic
     */
    dispatch() {
    }
}