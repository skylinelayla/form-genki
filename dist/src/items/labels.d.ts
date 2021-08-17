/**
 * @file label
 * @author skykun
 */
import Form, { FormType } from './form';
declare class Label extends Form<string> {
    constructor(data: FormType);
    getHtml(): string;
}
export default Label;
