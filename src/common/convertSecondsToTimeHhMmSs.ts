function convertSecondsToTimeHhMmSs(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  // Padding single digits with leading zero
  const paddedHours = String(hours).padStart(2, '0');

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');
  const string_dur    = `${paddedMinutes}:${paddedSeconds}`;

  if (hours > 0)
    return `${paddedHours}:${string_dur}`;
  else
    return string_dur;
}

export default convertSecondsToTimeHhMmSs;