import { FormSchema } from './types';
import Form from './items/form';
declare class Render {
    data: any;
    locale: string;
    itemInstance: Form<any>[];
    $container: HTMLElement;
    resultValue: any;
    formId: string;
    containerId: string;
    $formWrapper: HTMLElement;
    constructor(data: FormSchema);
    render(): void;
    mount(): void;
    attachEvent(): void;
    detachEvent(): void;
    getFormData(): any;
    /**
     * set form data by data
     * @param {object} data {key: value}
     */
    setFormValue(data: {
        [key: string]: any;
    }): void;
    validateForm(): void;
    destroy(): void;
    refresh(): void;
    getFormWrapper(): HTMLElement;
    getRawHtml(data: FormSchema): string;
}
export default Render;
