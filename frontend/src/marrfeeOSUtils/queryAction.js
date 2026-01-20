

export const dictExistsInList = ( existingData, newData, checkFor ) => {
    if ( !(existingData && newData && checkFor)) return true;
    return existingData.some(data => data?.[checkFor] === newData[checkFor])
}

export const hasRequiredAppFields = ( app ) => {
  return Boolean(app?.appName && app?.appLogo && app?.path && app?.id);
};

export const filterListBy = (list, key, value) =>
  list.filter(item => item?.[key] === value);

export const filterOutFromList = (list, key, value) =>
  list.filter(item => item?.[key] !== value);

