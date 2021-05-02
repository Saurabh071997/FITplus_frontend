import { useState } from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryProvider";
import { ACTIONS } from "../context/LibraryReducerFunction";
import plus_icon from "../images/plus.svg";
import video_icon from "../images/video.svg";
import cross_color_icon from "../images/cross-color.svg";

export function Playlist() {
  const {
    libraryState: { playlist },
    libraryDispatch
  } = useLibrary();

  const [showModal, setShowModal] = useState(false);

  function PlaylistCreationModal() {
    const [newPlaylist, setNewPlayList] = useState(null);
    const errorMsg =
      "Playlist with this name already Exist !! Try something else. ";
    const [showErrorMsg, setErrorMsg] = useState(false);

    return (
      <div className="modal-div">
        <div className="modal-sub-div">
          <div className="modal-head"> Create New Playlist </div>
          <input
            className="modal-input"
            onChange={(e) => {
              const inputName = e.target.value;
              if (playlist.find(({ name }) => name === inputName)) {
                setErrorMsg(true);
              } else {
                setErrorMsg(false);
                setNewPlayList(inputName);
              }
            }}
          ></input>

          {showErrorMsg && (
            <div style={{ color: "red", fontSize: "1rem" }}>{errorMsg}</div>
          )}

          <div className="modal-btn-flex">
            <button
              disabled={
                showErrorMsg || newPlaylist === null || newPlaylist.length === 0
              }
              className="modal-btn"
              onClick={() => {
                libraryDispatch({
                  TYPE: ACTIONS.CREATE_NEW_PLAYLIST,
                  payload: { name: newPlaylist }
                });
                setShowModal(false);
              }}
            >
              Create
            </button>
            <button className="modal-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-width">
      {showModal && <PlaylistCreationModal />}
      <div>
        <div className="page-head">PlayLists</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0ren auto"
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "0.5rem 1rem",
              marginBottom: "1rem"
            }}
          >
            <button className="btn-add" onClick={() => setShowModal(true)}>
              <img src={plus_icon} alt="img" className="btn-img" />
            </button>
            <div className="btn-txt"> Create Playlist </div>
          </div>

          {playlist.map(({ id, name }) => {
            return (
              <div key={id} className="item-playlist">
                <div style={{ display: "flex" }}>
                  <img src={video_icon} alt="img" className="img-play" />

                  <Link to={`/playlist/${id}`}>
                    <div className="txt-play">{name}</div>
                  </Link>
                </div>

                <div style={{ display: "flex" }}>
                  <button
                    className="btn-delete"
                    onClick={() =>
                      libraryDispatch({
                        TYPE: ACTIONS.DELETE_PLAYLIST,
                        payload: { id }
                      })
                    }
                  >
                    <img
                      src={cross_color_icon}
                      alt="img"
                      className="img-delete"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
