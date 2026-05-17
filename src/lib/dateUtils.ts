export const getEventDisplayDate = (event: any) => {
  const { start_date, end_date, event_date, month_year } = event;

  if (!start_date) {
    return {
      top: event_date || '',
      bottom: month_year || ''
    };
  }

  const start = new Date(start_date);
  const end = end_date ? new Date(end_date) : null;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const startDay = start.getDate().toString();
  const startMonthStr = months[start.getMonth()];
  const startYearStr = start.getFullYear().toString();
  const startYearShort = startYearStr.substring(2);

  if (!end || start.getTime() === end.getTime()) {
    return {
      top: startDay,
      bottom: `${startMonthStr} ${startYearShort}`
    };
  }

  const endDay = end.getDate().toString();
  const endMonthStr = months[end.getMonth()];
  const endYearStr = end.getFullYear().toString();
  const endYearShort = endYearStr.substring(2);

  // Same month and year
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return {
      top: `${startDay} - ${endDay}`,
      bottom: `${startMonthStr} ${startYearShort}`
    };
  }

  // Different month, same year
  if (start.getFullYear() === end.getFullYear()) {
    return {
      top: `${startDay} ${startMonthStr} - ${endDay} ${endMonthStr}`,
      bottom: startYearStr
    };
  }

  // Different year
  return {
    top: `${startDay} ${startMonthStr} '${startYearShort} - ${endDay} ${endMonthStr} '${endYearShort}`,
    bottom: ''
  };
};
