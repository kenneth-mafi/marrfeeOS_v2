const API = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "");

export const sendAPIRequest = async (endPoint, dataObj = {}, method = "POST") => {
  if (!endPoint) return { success: false, error: "No endpoint" };

  const cleanEndPoint = String(endPoint).replace(/^\/+/, ""); // remove leading /

  const reqObj = {
    method,
    headers: { "Content-Type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(dataObj),
  };

  const res = await fetch(`${API}/api/${cleanEndPoint}`, reqObj);

  // If backend returns non-JSON error, don't crash
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { success: false, error: text }; }

  if (!res.ok) {
    return { success: false, status: res.status, ...json };
  }
  
  return json;
};

