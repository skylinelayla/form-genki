/**
 * @file handle data
 * @author skykun
 */
import { ConfigDataType } from "../types";
declare class HandleData<T> {
    formatData: {
        type: string;
        defaultValue: T | T[];
        clazz: string;
        label: string;
        span: number;
        hint: string;
    };
    originData: ConfigDataType<T>;
    constructor(data: ConfigDataType<T>);
    convertor(): void;
    getType(): string;
    getDefaultValue(): T | T[];
    getLabel(): string;
    getHint(): string;
    getOriginData(): ConfigDataType<T>;
}
export default HandleData;
