//@state is the state object to walk through to map new state object from
//@newValues object that contains new values that should be mapped from. 
//@useDefault if newValue doesn't exist use default value for type

export const deepMerge = (state, newValues) => {
    let newState = {}
    Object.keys(state).forEach((key) => {
        if(typeof newValues[key] === 'object' && Array.isArray(newValues[key]) === false){
            if(newValues.defaults){newValues[key].defaults = newValues.defaults;}
            newState[key] = deepMerge(state[key], newValues[key]);
        }else if(key in newValues){
            newState[key] = newValues[key];
        }else if('defaults' in newValues){
            const type = (Array.isArray(state[key]) === true)? 'array' : typeof state[key];
            if(type in newValues.defaults){
                newState[key] = newValues.defaults[type]
            } else {
                newState[key] = deepMerge(state[key], {defaults: newValues.defaults})
            }
        }
        return;
    })
    return newState;
}

export const deepCopyObject = (sourceObj) => {
    return JSON.parse(JSON.stringify(sourceObj));
}