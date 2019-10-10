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
    document.addEventListener('storageChanged', () => {
        handle();
    });
}

function resetLocalStorageEvent() {
    var originSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
        // custom storage event
        originSetItem.apply(this, arguments);
        var event = new Event('storageChanged');
        document.dispatchEvent(event);
    };
}

export {
    getLocaleStorage,
    addStorageListener,
    resetLocalStorageEvent
};