/**
 * @file input file
 * @author skykun
 */
import Form from './form';
import Label from './labels';

export default class Input extends Form {
    constructor(data) {
        super(data);
    }

    /**
     * @override
     */
    getHtml() {
        let labelRaw = '';
        if (this.metaData.label && this.metaData.label['zh-CN']) {
            labelRaw = new Label(this.metaData);
        }
        let inputStr = `${labelRaw && labelRaw.getHtml()}<input for="${this.metaData.name}" type="${this.metaData.type}" 
            id="${this.uuid}"
            name="${this.metaData.name}"
            placeholder="${this.metaData.hintText['zh-CN']}">`;
        let $wrapperContainer = this.setWrapper();
        $wrapperContainer.innerHTML = inputStr;
        return $wrapperContainer.outerHTML;
    }

    getData() {
    }
    /**
     * @override
     */
    setStyle() {
        
    }

    /**
     * set text
     */
    setTxt() {
    }
}