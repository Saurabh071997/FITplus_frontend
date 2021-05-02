import { videoList } from "../VideoList";
import { VideoCard } from "./VideoCard";
import { useWindowSize } from "../context/useWindowSize";
import { Link } from "react-router-dom";

export function DesktopHome() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "85%",
        margin: "0rem auto",
        padding: "0rem"
      }}
    >
      {videoList.map((video) => {
        return (
          <Link to={`/video/${video.id}`} key={video.id}>
            <VideoCard video={video} />
          </Link>
        );
      })}
    </div>
  );
}

export function MobileHome() {
  return (
    <div>
      {videoList.map((video) => {
        return (
          <Link to={`/video/${video.id}`} key={video.id}>
            <VideoCard video={video} />
          </Link>
        );
      })}
    </div>
  );
}

export function Home() {
  const [, width] = useWindowSize();

  return <div>{width <= 600 ? <MobileHome /> : <DesktopHome />}</div>;
}
