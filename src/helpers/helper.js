/* 
    convert date time use format: DD-MM-YYYY HH:mm:ss
    GMT+7
*/
export function convertToWIB(utcDateString) {
  const utcDate = new Date(utcDateString);

  if (isNaN(utcDate)) {
    console.error("Invalid date:", utcDateString);
    return "Invalid date";
  }

  const options = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  try {
    const formatter = new Intl.DateTimeFormat("id-ID", options);
    const parts = formatter.formatToParts(utcDate);

    const day = parts.find((p) => p.type === "day").value;
    const month = parts.find((p) => p.type === "month").value;
    const year = parts.find((p) => p.type === "year").value;
    const hour = parts.find((p) => p.type === "hour").value;
    const minute = parts.find((p) => p.type === "minute").value;
    const second = parts.find((p) => p.type === "second").value;

    return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
}
