const CAMPAIGN_SELECTED = 'CAMPAIGN_SELECTED';

export const selectCampaign = (campaignId) => ({
  type: CAMPAIGN_SELECTED,
  payload: {
    campaignId,
  },
});

export default function reducer(state = '', action) {
  switch (action.type) {
  case CAMPAIGN_SELECTED:
    return action.payload.campaignId;
  default:
    return state;
  }
}
