import { combineReducers } from 'redux';
import user from './user';
import campaigns from './campaign';

export default combineReducers({
  user,
  campaigns,
});
