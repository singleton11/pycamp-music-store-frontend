import { TOKEN_GETTER, AUTHENTICATED_GETTER, TRACK_GETTER, ALBUM_GETTER } from './getter-types'

export default {
  /**
   * Returns auth.token.
   */
  [TOKEN_GETTER]: state => state.auth.token,

  /**
   * Returns true if user is authenticated.
   */
  [AUTHENTICATED_GETTER]: state => state.auth.authenticated,

  [TRACK_GETTER]: state => trackId => state.tracks[trackId],
  [ALBUM_GETTER]: state => albumId => state.albums[albumId]
}
