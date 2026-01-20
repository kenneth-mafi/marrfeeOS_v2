export const generateId = () =>{
  return Date.now().toString() + Math.random().toString(36).slice(2);
}


export const capitalize = (str) =>{
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}