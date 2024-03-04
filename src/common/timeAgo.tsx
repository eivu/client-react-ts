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

  if (elapsedSeconds < secondsPerMinute) {
    return elapsedSeconds <= 5 ? 'just now' : `${elapsedSeconds} seconds ago`;
  } else if (elapsedSeconds < secondsPerHour) {
    return `${Math.floor(elapsedSeconds / secondsPerMinute)} minutes ago`;
  } else if (elapsedSeconds < secondsPerDay) {
    return `${Math.floor(elapsedSeconds / secondsPerHour)} hours ago`;
  } else if (elapsedSeconds < secondsPerWeek) {
    return `${Math.floor(elapsedSeconds / secondsPerDay)} days ago`;
  } else if (elapsedSeconds < secondsPerMonth) {
    return `${Math.floor(elapsedSeconds / secondsPerWeek)} weeks ago`;
  } else if (elapsedSeconds < secondsPerYear) {
    return `${Math.floor(elapsedSeconds / secondsPerMonth)} months ago`;
  } else {
    return `${Math.floor(elapsedSeconds / secondsPerYear)} years ago`;
  }
}
