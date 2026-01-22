

export const dictExistsInList = ( existingData, newData, checkFor ) => {
    if ( !(existingData && newData && checkFor)) return true;
    return existingData.some(data => data?.[checkFor] === newData[checkFor])
}

export const hasRequiredAppFields = (app) => {
  return Boolean(
    app &&
    app.id &&
    app.appName &&
    app.path &&
    app.color &&
    app.appLogo &&
    app.size &&
    app.allowedDevices.length > 0
  );
};


export const filterListBy = (list, key, value) =>
  list.filter(item => item?.[key] === value);

export const filterOutFromList = (list, key, value) =>
  list.filter(item => item?.[key] !== value);

export const findDictInList = (list, key, value) => {
    if (!(list && key && value)) return null;
    const dict = list.find(d => d?.[key] === value);
    if (!dict) return null;
    return dict;
}

export const existsInList = (list, key, value) => {
    if (!(list && key && value)){ 
      console.error("⚠️ Incomplete or Invalid parameters");
      return; }
    return list.some(itm => itm?.[key]=== value)
}