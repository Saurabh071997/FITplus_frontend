import watch from "../images/watch_later.svg";
import watch_color_icon from "../images/watch-color.svg";
import wish_icon from "../images/wishlist.svg";
import wish_color_icon from "../images/wish-color.svg";
import lib_icon from "../images/playlist-add.svg";
import cross from "../images/cross-icon.svg";
import { useWindowSize } from "../context/useWindowSize";
import { useParams } from "react-router-dom";
import { videoList } from "../VideoList";
import { useState, useReducer } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryProvider";
import { ACTIONS } from "../context/LibraryReducerFunction";

function modalReducer(state, action) {
  switch (action.TYPE) {
    case "SHOW_LOGIN_MODAL":
      return { ...state, showLoginModal: true };
    case "HIDE_LOGIN_MODAL":
      return { ...state, showLoginModal: false };
    case "SHOW_PLAYLIST_MODAL":
      return { ...state, showPlaylistModal: true };
    case "HIDE_PLAYLIST_MODAL":
      return { ...state, showPlaylistModal: false };
    default:
      return state;
  }
}

export function VideoOptions({ videoId }) {
  const {
    authState: { userLoggedIn }
  } = useAuth();

  const {
    libraryState: { playlist, likedVideos, watchLaterVideos },
    libraryDispatch
  } = useLibrary();

  const [modalState, modalDispatch] = useReducer(modalReducer, {
    showLoginModal: false,
    showPlaylistModal: false
  });

  function PlaylistModal() {
    const [playlistType, setPlaylistType] = useState(null);
    const playlistErrorMsg = "Please select a playlist !!";
    const [playlistError, setPlaylistError] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState({
      playlistId: undefined,
      playlistName: undefined
    });
    return (
      <div className="modal-div">
        <div className="modal-sub-div">
          <div className="modal-head"> Add to Playlist</div>
          <div className="modal-btn-flex">
            <button
              className="modal-btn"
              onClick={() => {
                setPlaylistType("NEW");
                setCurrentPlaylist({
                  ...currentPlaylist,
                  playlistId: undefined,
                  playlistName: undefined
                });
              }}
            >
              Create New
            </button>
            <button
              className="modal-btn"
              onClick={() => {
                setPlaylistType("OLD");
                setCurrentPlaylist({
                  ...currentPlaylist,
                  playlistId: undefined,
                  playlistName: undefined
                });
              }}
            >
              Add to Existing
            </button>
          </div>

          {playlistType === "NEW" && (
            <input
              className="modal-input"
              onChange={(e) => {
                setCurrentPlaylist({
                  ...currentPlaylist,
                  playlistId: "p17765",
                  playlistName: e.target.value
                });
              }}
            ></input>
          )}

          {playlistType === "OLD" && (
            <div className="modal-flex-col">
              {playlist.map(({ id, name }) => {
                return (
                  <div key={id}>
                    <button
                      className="modal-btn-playlist"
                      onClick={() => {
                        setCurrentPlaylist({
                          ...currentPlaylist,
                          playlistId: id,
                          playlistName: name
                        });
                      }}
                    >
                      {name}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {playlistError && (
            <div style={{ color: "red", fontSize: "1rem" }}>
              {playlistErrorMsg}
            </div>
          )}

          <div className="modal-btn-flex" style={{ marginTop: "1.5rem" }}>
            <button
              className="modal-btn"
              onClick={() => {
                if (
                  currentPlaylist.playlistId === undefined &&
                  currentPlaylist.playlistName === undefined
                ) {
                  setPlaylistError(true);
                } else {
                  libraryDispatch({
                    TYPE: ACTIONS.ADD_TO_PLAYLIST,
                    payload: {
                      playlist: {
                        id: currentPlaylist.playlistId,
                        name: currentPlaylist.playlistName
                      },
                      videoId: videoId
                    }
                  });
                  modalDispatch({ TYPE: "HIDE_PLAYLIST_MODAL" });
                }
              }}
            >
              {" "}
              ADD{" "}
            </button>

            <button
              className="modal-btn"
              onClick={() => modalDispatch({ TYPE: "HIDE_PLAYLIST_MODAL" })}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  }

  function LoginModal() {
    return (
      <div className="modal-div">
        <div className="modal-sub-div">
          <div
            style={{
              color: "black",
              fontSize: "1.5rem",
              padding: "0.5rem",
              margin: "0rem auto"
            }}
          >
            Login to continue with this action
          </div>
          <Link to="/login">
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "1.15rem",
                  padding: "0.5rem",
                  margin: "0rem auto",
                  border: "none",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                Login
              </button>
            </div>
          </Link>
          <button
            style={{
              position: "absolute",
              right: "0.5em",
              top: "0.5em",
              border: "none",
              outline: "none",
              cursor: "pointer"
            }}
            onClick={() => modalDispatch({ TYPE: "HIDE_LOGIN_MODAL" })}
          >
            <img
              src={cross}
              alt="img"
              style={{
                height: "1rem",
                width: "1rem"
              }}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {modalState.showLoginModal && <LoginModal />}
      {modalState.showPlaylistModal && <PlaylistModal />}

      <div
        className="card-btn-flex"
        style={{ position: "absolute", right: "0em" }}
      >
        <button
          type="button"
          title="Add to Playlist"
          className="btn-icon margin-025"
          onClick={() => {
            if (userLoggedIn) {
              modalDispatch({ TYPE: "SHOW_PLAYLIST_MODAL" });
            } else {
              modalDispatch({ TYPE: "SHOW_LOGIN_MODAL" });
            }
          }}
        >
          <img src={lib_icon} className="img25x25" alt="category_icon" />
        </button>

        {userLoggedIn && watchLaterVideos?.find((id) => id === videoId) ? (
          <button
            type="button"
            className="btn-icon margin-025"
            title="watch later"
            onClick={() => {
              if (userLoggedIn) {
                libraryDispatch({
                  TYPE: ACTIONS.REMOVE_FROM_WATCHLATER,
                  payload: { videoId }
                });
              } else {
                modalDispatch({ TYPE: "SHOW_LOGIN_MODAL" });
              }
            }}
          >
            <img
              src={watch_color_icon}
              className="img25x25"
              alt="category_icon"
            />
          </button>
        ) : (
          <button
            type="button"
            className="btn-icon margin-025"
            title="watch later"
            onClick={() => {
              if (userLoggedIn) {
                libraryDispatch({
                  TYPE: ACTIONS.ADD_TO_WATCHLATER,
                  payload: { videoId }
                });
              } else {
                modalDispatch({ TYPE: "SHOW_LOGIN_MODAL" });
              }
            }}
          >
            <img src={watch} className="img25x25" alt="category_icon" />
          </button>
        )}

        {userLoggedIn && likedVideos.find((id) => id === videoId) ? (
          <button
            type="button"
            className="btn-icon margin-025"
            title="liked"
            onClick={() => {
              if (userLoggedIn) {
                libraryDispatch({
                  TYPE: ACTIONS.REMOVE_FROM_LIKED,
                  payload: { videoId }
                });
              } else {
                modalDispatch({ TYPE: "SHOW_LOGIN_MODAL" });
              }
            }}
          >
            <img
              src={wish_color_icon}
              className="img25x25"
              alt="category_icon"
            />
          </button>
        ) : (
          <button
            type="button"
            className="btn-icon margin-025"
            title="liked"
            onClick={() => {
              if (userLoggedIn) {
                libraryDispatch({
                  TYPE: ACTIONS.ADD_TO_LIKED_VIDEOS,
                  payload: { videoId }
                });
              } else {
                modalDispatch({ TYPE: "SHOW_LOGIN_MODAL" });
              }
            }}
          >
            <img src={wish_icon} className="img25x25" alt="category_icon" />
          </button>
        )}
      </div>
    </>
  );
}

export function VideoPage({
  video: { id, title, dateOfUpload, duration, description, url }
}) {
  return (
    <div>
      <div className="video-block">
        <iframe
          src={url}
          title={title}
          frameBorder="0"
          showinfo="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          className="video-responsive"
        ></iframe>

        <div className="video-page-block">
          <div className="video-title">{title}</div>
          <div className="display-flex">
            <div className="video-info">{dateOfUpload}</div>
            <VideoOptions videoId={id} />
          </div>

          <div className="video-desc">{description}</div>
        </div>
      </div>
    </div>
  );
}

export function VideoPageInDesktop({ video }) {
  return (
    <div
      style={{
        width: "60%",
        margin: "1rem auto"
      }}
    >
      <VideoPage video={video} />
      <div style={{ height: "10vh" }}></div>
    </div>
  );
}

export function VideoDisplay() {
  const [, width] = useWindowSize();
  const { videoId } = useParams();
  // const videoId = "v001";

  const video = videoList.find(({ id }) => id === videoId);

  return (
    <div>
      {width <= 600 ? (
        <VideoPage video={video} />
      ) : (
        <VideoPageInDesktop video={video} />
      )}
    </div>
  );
}
