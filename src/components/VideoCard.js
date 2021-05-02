import card_logo from "../images/card-logo.jpg";

export function VideoCard({
  video: { id, title, dateOfUpload, description, thumbnail }
}) {
  return (
    <div className="card-layout">
      <div className="card-container">
        <img src={thumbnail} className="card-img" alt="img" />
        <div className="card-flex">
          <img src={card_logo} className="card-logo-img" alt="img" />
          <div className="card-detail">
            <div className="card-title">{title}</div>
            <div className="card-info">{dateOfUpload}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
