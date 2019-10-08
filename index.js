/**
 * @file index
 */
import Input from './core/forms/input';
(function (window) {
    let _init = () => {
        console.log('tt');
    };
    window.FormGen = {
        init: _init,
        input: Input
    };
})(window)