import { format, add, sub, formatDistance, differenceInHours } from "date-fns";

type AddObject = {
  days?: number;
  months?: number;
  weeks?: number;
};

export function formatDate(date: Date, formatString: string) {
  return format(new Date(date), formatString);
}

export function addToDate(date: Date, daysObject: AddObject) {
  return add(new Date(date), daysObject);
}

export function subFromDate(date: Date, daysObject: AddObject) {
  return sub(new Date(date), daysObject);
}

export function _formatDistance(date: Date) {
  const timeStamp = date ? new Date(date) : new Date();
  return formatDistance(timeStamp, new Date(), { addSuffix: true });
}

export function _differenceInHours(date: Date) {
  const timeStamp = date ? new Date(date) : new Date();
  return differenceInHours(new Date(), timeStamp);
}

export function createDateAsUTC(date: Date) {
  if (date) {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ),
    );
  }
}
