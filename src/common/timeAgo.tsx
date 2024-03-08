export function timeAgo(dateString: string): string {
  if (!dateString) {
    return '';
  }

  const secondsPerMinute = 60;
  const secondsPerHour = 3600;
  const secondsPerDay = 86400;
  const secondsPerWeek = 604800;
  const secondsPerMonth = 2592000;
  const secondsPerYear = 31536000;

  const date = new Date(dateString);
  const now = new Date();
  const elapsedSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const pluralize = (quantity: number, unit: string): string => {
    return `${quantity} ${unit}${quantity > 1 ? 's' : ''} ago`;
  };

  if (elapsedSeconds < secondsPerMinute) {
    return elapsedSeconds <= 5 ? 'just now' : pluralize(elapsedSeconds, 'second');
  } else if (elapsedSeconds < secondsPerHour) {
    return pluralize(Math.floor(elapsedSeconds / secondsPerMinute), 'minute');
  } else if (elapsedSeconds < secondsPerDay) {
    return pluralize(Math.floor(elapsedSeconds / secondsPerHour), 'hour');
  } else if (elapsedSeconds < secondsPerWeek) {
    return pluralize(Math.floor(elapsedSeconds / secondsPerDay), 'day');
  } else if (elapsedSeconds < secondsPerMonth) {
    return pluralize(Math.floor(elapsedSeconds / secondsPerWeek), 'week');
  } else if (elapsedSeconds < secondsPerYear) {
    return pluralize(Math.floor(elapsedSeconds / secondsPerMonth), 'month');
  } else {
    return pluralize(Math.floor(elapsedSeconds / secondsPerYear), 'year');
  }
}
