
export function deleteItem<T>(list:T[], item: T): T[] {
    const idxToRemove = list.indexOf(item);
    if (idxToRemove === -1) {
        return list;
    }
    return [...list.slice(0, idxToRemove), ...list.slice(idxToRemove + 1)];
}

export function customizeItem<T>(list: T[], reqItem: T | ((t:T)=>boolean) | number, modifier: (t:T|null)=>T): T[] {
    let checker: (t:T, idx: number)=>boolean;
    if (reqItem instanceof Function) {
        checker = reqItem;
    } else if (typeof reqItem === 'number') {
        checker = (item, queryIdx) => queryIdx === reqItem;
    } else {
        checker = (item) => item === reqItem;
    }
    let modifiedList = [...list];
    if (typeof reqItem === 'number' && (modifiedList.length - 1 < reqItem)) {
        modifiedList[reqItem] = modifier(null);
        return modifiedList;
    }
    return list.map((item: T, idx: number) => {
        if (checker(item, idx)) {
            return modifier(item);
        }
        return item;
    });
}