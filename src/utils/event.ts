/**
 * @file event js
 * @author skykun
 */

interface EventsType {
    [key: string]: ((params: any) => void)[];
}

class EventStore {
    private events: EventsType;
    constructor() {
        this.events = {};
    }

    $on(type: string, cb: () => void) {
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push(cb);
    }

    $emit(type: string, ...payload: any) {
        const fns = this.events[type];
        if (!fns) return;
        fns.forEach(fn => {
            fn.apply(this, payload);
        })
    }

    $off(type: string, cb: () => void) {
        const fns = this.events[type];
        if (!fns) return;
        if (fns.indexOf(cb) === -1) return;
        fns.splice(fns.indexOf(cb), 1);
    }    
}

const eventStore = new EventStore();

export {
    eventStore,
}
