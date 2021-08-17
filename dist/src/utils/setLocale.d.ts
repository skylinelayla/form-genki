/**
 * @file set locale: i18n
 * @author skykun
 */
declare function getLocaleStorage(locale?: string): string;
declare function addStorageListener(handle: () => void): void;
declare function resetLocalStorageEvent(): void;
export { getLocaleStorage, addStorageListener, resetLocalStorageEvent };
