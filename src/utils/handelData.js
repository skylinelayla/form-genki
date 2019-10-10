/**
 * @file handle data 
 * @author skykun
 */

const TYPE = ['TEXT', 'TEXTAREA', 'CHECK', 'RADIO', 'SELECT', 'SUBMIT']

class HandleData {
    constructor(data) {
        /**
         * type: form item type
         * defaultValue: form item default value
         * clazz: form item default css class,
         * label: form item label
         * span: form item span width
         */
        this.formatData = {
            type: '',
            defaultValue: '',
            clazz: '',
            label: '',
            span: '',
            hint: ''
        };
        this.originData = data;
        this.convertor();
    }

    convertor() {
        /**
         * todo: api user custom convertor
         */
        if (!this.originData.type || !this.originData.columnSize) {
            throw new Error('please check properties')
        }
        this.formatData.type = this.originData.type;
        this.formatData.defaultValue = this.originData.defaultValue;
        this.formatData.clazz = this.originData.class;
        this.formatData.span = this.originData.columnSize;
        this.formatData.hint = this.originData.hintText;
    }

    getType() {
        return this.formatData.type;
    }

    getDefaultValue() {
        return this.formatData.defaultValue;
    }

    getLabel() {
        return this.formatData.label;
    }

    getHint() {
        return this.formatData.hint;
    }

    getOriginData() {
        return this.originData;
    }
}

export default HandleData;