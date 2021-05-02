export const ACTIONS = {
  SET_LIKED_VIDEOS: "SET_LIKED_VIDEOS",
  SET_WATCH_LATER_VIDEOS: "SET_WATCH_LATER_VIDEOS",
  SET_PLAYLIST: "SET_PLAYLIST",
  SET_ID_VAL: "SET_ID_VAL",
  ADD_TO_LIKED_VIDEOS: "ADD_TO_LIKED_VIDEOS",
  ADD_TO_WATCHLATER: "ADD_TO_WATCHLATER",
  ADD_TO_PLAYLIST: "ADD_TO_PLAYLIST",
  REMOVE_FROM_LIKED: "REMOVE_FROM_LIKED",
  REMOVE_FROM_WATCHLATER: "REMOVE_FROM_WATCHLATER",
  CREATE_NEW_PLAYLIST: "CREATE_NEW_PLAYLIST",
  DELETE_PLAYLIST: "DELETE_PLAYLIST"
};

export function libraryReducerFunc(state, action) {
  switch (action.TYPE) {
    case "SET_LIKED_VIDEOS":
      return { ...state, likedVideos: action.payload.userLikedVids };

    case "SET_WATCH_LATER_VIDEOS":
      return { ...state, watchLaterVideos: action.payload.userWatchLaterVids };

    case "SET_PLAYLIST":
      return { ...state, playlist: action.payload.userPlaylist };

    case "SET_ID_VAL":
      return { ...state, playlistIdVal: action.payload.idVal };

    case "ADD_TO_LIKED_VIDEOS":
      state = {
        ...state,
        likedVideos: [...state.likedVideos, action.payload.videoId]
      };

      localStorage?.setItem("likedVids", JSON.stringify(state.likedVideos));
      return state;

    case "REMOVE_FROM_LIKED":
      state = {
        ...state,
        likedVideos: state.likedVideos.filter(
          (id) => id !== action.payload.videoId
        )
      };
      localStorage?.setItem("likedVids", JSON.stringify(state.likedVideos));
      return state;

    case "ADD_TO_WATCHLATER":
      state = {
        ...state,
        watchLaterVideos: [...state.watchLaterVideos, action.payload.videoId]
      };
      localStorage?.setItem(
        "watchLaterVids",
        JSON.stringify(state.watchLaterVideos)
      );
      return state;

    case "REMOVE_FROM_WATCHLATER":
      state = {
        ...state,
        watchLaterVideos: state.watchLaterVideos.filter(
          (id) => id !== action.payload.videoId
        )
      };
      localStorage?.setItem(
        "watchLaterVids",
        JSON.stringify(state.watchLaterVideos)
      );
      return state;

    case "CREATE_NEW_PLAYLIST":
      state = {
        ...state,
        playlist: [
          ...state.playlist,
          {
            id: "p" + state.playlistIdVal,
            name: action.payload.name,
            videos: []
          }
        ],
        playlistIdVal: state.playlistIdVal + 1
      };

      localStorage?.setItem("playlist", JSON.stringify(state.playlist));
      localStorage?.setItem("playlistId", JSON.stringify(state.playlistIdVal));

      return state;

    case "ADD_TO_PLAYLIST":
      if (state.playlist.find(({ id }) => id === action.payload.playlist.id)) {
        state = {
          ...state,
          playlist: state.playlist.map((selectedPlaylist) =>
            selectedPlaylist.id === action.payload.playlist.id
              ? {
                  ...selectedPlaylist,
                  videos:
                    selectedPlaylist.videos.filter(
                      (id) => id === action.payload.videoId
                    ).length === 1
                      ? selectedPlaylist.videos
                      : [...selectedPlaylist.videos, action.payload.videoId]
                  // videos: [...selectedPlaylist.videos, action.payload.videoId]
                }
              : selectedPlaylist
          )
        };
      } else {
        state = {
          ...state,
          playlist: [
            ...state.playlist,
            {
              id: "p" + state.playlistIdVal,
              name: action.payload.playlist.name,
              videos: [action.payload.videoId]
            }
          ],
          playlistIdVal: state.playlistIdVal + 1
        };
      }

      localStorage?.setItem("playlist", JSON.stringify(state.playlist));
      localStorage?.setItem("playlistId", JSON.stringify(state.playlistIdVal));
      return state;

    case "DELETE_PLAYLIST":
      state = {
        ...state,
        playlist: state.playlist.filter(({ id }) => id !== action.payload.id)
      };

      localStorage?.setItem("playlist", JSON.stringify(state.playlist));
      return state;

    default:
      return state;
  }
}
