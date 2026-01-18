export const dictExistsInList = ( existingData, newData, checkFor ) => {
    if ( !(existingData && newData && checkFor)) return true;
    return existingData.some(data => data?.[checkFor] === newData[checkFor])
}

export const hasRequiredAppFields = ( app ) => {
  return Boolean(app?.appName && app?.appLogo && app?.path && app?.id);
};
