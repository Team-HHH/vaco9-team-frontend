import { combineReducers } from 'redux';

import user from './user';
import campaigns from './campaigns';
import selectedCampaign from './selectedCampaign';

export default combineReducers({
  user,
  campaigns,
  selectedCampaign,
});
