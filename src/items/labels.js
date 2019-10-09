/**
 * @file label
 * @author skykun
 */

class Label {
    constructor(data) {
        this.name = data.name;
        this.text = data.label['zh-CN'];
    }

    getHtml() {
        return `<label for="${this.name}">${this.text}</label> `;
    }
}

export default Label;