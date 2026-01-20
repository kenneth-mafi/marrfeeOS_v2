const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export const sendAPIRequest = async (endPoint, dataObj = {}, method = "POST") => {
  if (!endPoint) return { success: false, error: "No endpoint" };

  const reqObj = {
    method,
    headers: { "Content-Type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(dataObj),
  };

  const res = await fetch(`${API}/api/${endPoint}`, reqObj);
  return await res.json();
};
