/**
 * @file dom js
 * @author skykun
 */

function createElement(tag, attr) {
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

function forEachElement(htmlList, cb) {
    [].forEach.call(htmlList, el => {
        cb(el);
    });
}

export {createElement, forEachElement};