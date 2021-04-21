import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import campaigns from './campaignsReducer';

export default combineReducers({
  loginReducer,
  campaigns,
});
