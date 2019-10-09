/**
 * @file set locale: i18n
 * @author skykun
 */

function getLocaleStorage(locale) {
    if (locale) {
        return locale;
    }
    return window.localStorage.getItem('LANG') || 'zh-CN';
}

function addStorageListener(handle) {
    document.addEventListener('storage', (evt) => {
        handle();
    });
}

function resetLocalStorageEvent() {
    var originSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
        // custom storage event
        var event = new Event('storageChanged');
        document.dispatchEvent(event);
        originSetItem.apply(this, arguments);
    };
}

export {
    getLocaleStorage,
    addStorageListener,
    resetLocalStorageEvent
};