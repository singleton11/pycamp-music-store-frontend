import trackApi from '../api/track';

export default {
  /**
   * Method for send info about listening track
   *
   * @param {(object|number)} track - the track which user listen
   * @returns {Promise}
   */
  listen({ track, }) {
    trackApi.listen({ track, });
  },
};
