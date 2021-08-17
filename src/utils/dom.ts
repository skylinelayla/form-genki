/**
 * @file dom js
 * @author skykun
 */

function createElement(tag: string, attr: {[key: string]: any}) {
    if (typeof tag !== 'string') {
        return;
    }
    let $dom = document.createElement(tag);
    if (typeof attr === 'object') {
        Object.keys(attr).map(key => {
            $dom.setAttribute(key, attr[key]);
        });
    }
    return $dom;
}

function forEachElement(htmlList: HTMLCollection, cb: (el: HTMLElement) => void) {
    [].forEach.call(htmlList, (el: HTMLElement) => {
        cb(el);
    });
}

export {createElement, forEachElement};