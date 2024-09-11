import noData from "../../../assets/icons/no_data.jpg";
import "./noData.css";

export default function NoData({ text }) {
  return (
    <div className="w-100 text-center pb-5">
      <img src={noData} alt="No Challenges Found" className="noDataImg" />
      <p className="noDataText">{text}</p>
    </div>
  );
}
