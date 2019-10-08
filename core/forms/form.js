/**
 * @file form base class
 * @author skykun
 */

export default class Form {
    constructor(data) {
        this.metaData = data;
    }
    /** render form */
    render() {
        this.mount();
    }
    /** mount dom in container */
    mount() {
    }
    /** value validation */
    checkValue() {

    }
    /** get form value */
    getValue() {

    }
    /** refresh form dom */
    refresh() {
    }
    /** set defaultValue for form */
    setValue() {
    }
    /** get form html */
    getHtml() {
    }
}
