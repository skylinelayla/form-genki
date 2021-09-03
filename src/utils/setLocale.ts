/**
 * @file set locale: i18n
 * @author skykun
 */

function getLocaleStorage(locale?: string) {
    if (locale) {
        return locale;
    }
    return window.localStorage.getItem('LANG') || 'zh-CN';
}

function addStorageListener(handle: () => void) {
    document.addEventListener('storageChanged', () => {
        handle();
    });
}

function resetLocalStorageEvent(...args: any) {
    const originSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
        // custom storage event
        originSetItem.apply(this, args);
        const event = new Event('storageChanged');
        document.dispatchEvent(event);
    };
}

export {
    getLocaleStorage,
    addStorageListener,
    resetLocalStorageEvent
};