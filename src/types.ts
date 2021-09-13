export type TYPE = 'TEXT' | 'TEXTAREA' | 'CHECK' | 'RADIO' | 'SELECT' | 'SUBMIT' | 'DATE';
export type Locals = 'zh-CN' | 'en-US';

export interface ConfigDataType<T> {
    /** form type */
    type: TYPE;
    /** form column size */
    columnSize: number;
    /** form item default value */
    defaultValue: T | T[];
    /** form item style class name */
    class: string;
    /**  form item hint */
    hintText: string;
}

export interface FormSchemaProperty {
    /** form item name */
    name: string;
    /** form item variable */
    variable: string;
    /** form item type */
    type: TYPE;
    /** form item default value */
    defaultValue?: any;
    /** form ？？ */
    defaultValueFrom: any;
    /** block id ?? */
    blockId?: number;
    /** column size number */
    columnSize?: number;
    /** form item class name */
    styleClass?: string;
    /** label text, support i18n */
    labelText: {
      [K in Locals]: string
    } | string,
    /** form item hint text, support i18n */
    hintText?: {
      [K in Locals]: string;
    } | string,
    /** form item dom content */
    labelHtml?: string;
    /** form items for multiple form type, eg: select/radio */
    items?: {
      /** select item key name */
      value: string;
      /** select item key value */
      text: string;
    }[];
    /** if call api */
    callApi?: any;
    /** if required */
    required?: boolean;
    /** if can be seen on screen */
    visible?: boolean;
    /** if can be disabled */
    readonly?: boolean;
}

export interface FormSchema {
  /** form dom container id if your want decide by yourself */
  containerId?: string;
  /** form config list */
  properties: FormSchemaProperty[];
}