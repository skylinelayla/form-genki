/**
 * @file event js
 * @author skykun
 */
declare class EventStore {
    private events;
    constructor();
    $on(type: string, cb: () => void): void;
    $emit(type: string, ...payload: any): void;
    $off(type: string, cb: () => void): void;
}
declare const eventStore: EventStore;
export { eventStore, };
