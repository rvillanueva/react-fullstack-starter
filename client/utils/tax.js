import moment from 'moment';

export function getRelevantTaxYear() {
  const isJanuary = moment().month() === 0;
  const lastYear = moment().year() - 1;
  const thisYear = moment().year();
  if(isJanuary) return lastYear;
  return thisYear;
}
