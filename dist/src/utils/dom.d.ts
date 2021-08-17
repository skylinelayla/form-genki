/**
 * @file dom js
 * @author skykun
 */
declare function createElement(tag: string, attr: {
    [key: string]: any;
}): HTMLElement;
declare function forEachElement(htmlList: HTMLCollection, cb: (el: HTMLElement) => void): void;
export { createElement, forEachElement };
