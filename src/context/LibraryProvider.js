import { createContext, useContext, useEffect, useReducer } from "react";
import { ACTIONS, libraryReducerFunc } from "./LibraryReducerFunction";

export const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [libraryState, libraryDispatch] = useReducer(libraryReducerFunc, {
    watchLaterVideos: [],
    likedVideos: [],
    playlistIdVal: 100,
    playlist: []
  });

  useEffect(() => {
    let userPlaylist = JSON.parse(localStorage?.getItem("playlist"));
    userPlaylist !== null &&
      libraryDispatch({
        TYPE: ACTIONS.SET_PLAYLIST,
        payload: { userPlaylist }
      });

    let userLikedVids = JSON.parse(localStorage?.getItem("likedVids"));
    userLikedVids !== null &&
      libraryDispatch({
        TYPE: ACTIONS.SET_LIKED_VIDEOS,
        payload: { userLikedVids }
      });

    let userWatchLaterVids = JSON.parse(
      localStorage?.getItem("watchLaterVids")
    );
    userWatchLaterVids !== null &&
      libraryDispatch({
        TYPE: ACTIONS.SET_WATCH_LATER_VIDEOS,
        payload: { userWatchLaterVids }
      });

    let idVal = JSON.parse(localStorage?.getItem("playlistId"));
    idVal !== null &&
      libraryDispatch({ TYPE: ACTIONS.SET_ID_VAL, payload: { idVal } });
  }, []);

  return (
    <LibraryContext.Provider value={{ libraryState, libraryDispatch }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}
