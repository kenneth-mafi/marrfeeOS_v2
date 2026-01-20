

export const capitalize = (str) =>{
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
};
