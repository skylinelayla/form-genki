/**
 * @file gen UUID
 * @author skykun
 */
import shortid from 'shortid';

function generateID() {
    return shortid.generate();
}

export {generateID};