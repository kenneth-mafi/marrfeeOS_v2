const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

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


export const sendAPIRequest = async (endPoint, dataObj = {}, method = "POST") => {
  if (!endPoint) return { success: false, error: "No endpoint" };

  const reqObj = {
    method,
    headers: { "Content-Type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(dataObj),
  };

  const res = await fetch(`${API}/api/apps/${endPoint}`, reqObj);
  return await res.json();
};
