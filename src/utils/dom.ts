/**
 * @file dom js
 * @author skykun
 */

function createElement(tag: string, attr: {[key: string]: any}): HTMLElement {
    if (typeof tag !== 'string') {
        return;
    }
    const $dom = document.createElement(tag);
    if (typeof attr === 'object') {
        Object.keys(attr).map(key => {
            $dom.setAttribute(key, attr[key]);
        });
    }
    return $dom;
}

function forEachElement(htmlList: HTMLCollection, cb: (el: HTMLElement) => void): void {
    [].forEach.call(htmlList, (el: HTMLElement) => {
        cb(el);
    });
}

export {createElement, forEachElement};