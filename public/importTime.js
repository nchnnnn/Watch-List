function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTime() {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const manilaTime = new Date(utc + 3600000 * 8); // UTC+8

  const hours = String(manilaTime.getHours()).padStart(2, "0");
  const minutes = String(manilaTime.getMinutes()).padStart(2, "0");
  const seconds = String(manilaTime.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export {getDate, getTime};
