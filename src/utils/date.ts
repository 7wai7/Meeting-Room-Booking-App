export const formatDateInput = (date?: string) =>
  date ? date.slice(0, 10) : "";

export const formatTimeInput = (date?: string) =>
  date ? date.slice(11, 16) : "";

export const buildLocalISO = (date: string, time: string) => {
  // YYYY-MM-DD + HH:mm → YYYY-MM-DDTHH:mm:00
  return `${date}T${time}:00`;
};
