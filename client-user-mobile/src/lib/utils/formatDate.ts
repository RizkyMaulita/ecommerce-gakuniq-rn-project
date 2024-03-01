import moment from "moment";

export default function formatDate(val: Date | string) {
  const isDate = moment(new Date(val)).isValid();
  const convertMoment = isDate
    ? moment(new Date(val))
    : moment.unix(Number(val) / 1000);

  return convertMoment.format("DD-MM-YYYY HH:mm");
}
