import { LIST_ROOM, CHANGE_ROOM } from '../actions/types';

export default function(state = { currentRoom: '', roomList: [] }, action) {
  switch (action.type) {
    case LIST_ROOM:
      return { ...state, roomList: action.payload };
    case CHANGE_ROOM:
      return { ...state, currentRoom: action.payload };

    default:
      return state;
  }
}
