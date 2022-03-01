import {generate} from "shortid";

export function generateIdForItems(list) {
    if (list && Array.isArray(list)) {
        return list.map(item => {
            return (
                { id: generate() , ...{item} }
            )
        })
    }
}

