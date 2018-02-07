import  {
  RECEIVE_GAMES,
  RECEIVE_ONE_GAME
} from '../actions/games';
import {
  RECEIVE_ONE_COLLECTION,
  RECEIVE_COLLECTIONS
} from '../actions/collections';
import {
  RECEIVE_ONE_REVIEW,
  RECEIVE_REVIEWS
} from '../actions/reviews';
import {
  RECEIVE_STREAMS,
} from '../actions/twitch';
import { merge } from 'lodash';

export default (state = {}, action) => {
  let newState;
  switch(action.type) {
    case RECEIVE_ONE_GAME:
    newState = merge({}, state, action.games);
    return newState;
    case RECEIVE_GAMES:
      newState = merge({}, state, action.games);
      return newState;
    case RECEIVE_ONE_COLLECTION:
      newState = merge({}, state, action.games);
      return newState;
    case RECEIVE_COLLECTIONS:
      newState = merge({}, state, action.games);
      return newState;
    case RECEIVE_REVIEWS:
      newState = merge({}, state, action.games);
      return newState;
    case RECEIVE_ONE_REVIEW:
      newState = merge({}, state);
      if (newState[action.game.id] && newState[action.game.id].streams)
      action.game.streams = newState[action.game.id].streams;
      newState[action.game.id] = action.game;
      return newState;
    case RECEIVE_STREAMS:
      newState = merge({}, state);
      if (action.streams) {
        newState[action.gameId].streams = action.streams.map(stream => stream._id);
      }
      return newState;
    default:
      return state;
  }
};
