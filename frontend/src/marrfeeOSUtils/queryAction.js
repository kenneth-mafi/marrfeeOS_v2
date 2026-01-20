

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

