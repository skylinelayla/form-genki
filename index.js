/**
 * @file index
 * @author skykun
 */
import Input from './core/forms/input';

(function (window) {
    // const container  = document.getElementById('form-container');
    // if (!container) {
    //     throw new Error('please check container is provided');
    // }
    window.FormGen = {
        input: Input
    };
})(window)