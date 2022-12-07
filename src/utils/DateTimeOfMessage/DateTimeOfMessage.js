import styled from "styled-components";
import moment from "moment";

const DateTime = styled("span")(({ theme }) => ({
    fontWeight: 700,
    fontSize: 12,
    color: "#555555",
}));

export default function DateTimeOfMessage({ dateTime, style }) {
  

  var start = moment(dateTime);
  var end = moment();
  var result = start.from(end);

  result = result.replace(/^in a few seconds/, "Vài giây trước");
  result = result.replace(/^a few/, "Vài");
  result = result.replace(/^a/, "1");
  result = result.replace(/seconds|second/, "giây");
  result = result.replace(/minutes|minute/, "phút");
  result = result.replace(/hours|hour/, "giờ");
  result = result.replace(/days|day/, "ngày");
  result = result.replace(/days|day/, "ngày");
  result = result.replace(/months|month/, "tháng");
  result = result.replace(/years|year/, "năm");
  result = result.replace(/ago/, "trước");

  return <DateTime style={style}>{result}</DateTime>;
}
