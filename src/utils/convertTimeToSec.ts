const convertTimeToSec = (timeString: string) => {
  const timeParts = timeString.split(':');
  let seconds = 0;
  if (timeParts.length === 3) {
    seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
  } else if (timeParts.length === 2) {
    seconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
  } else if (timeParts.length === 1) {
    seconds = parseInt(timeParts[0]);
  }
  return seconds;
};

export default convertTimeToSec;
