import { fetchCampaigns } from '../apis/campaigns';

const GET_CAMPAIGNS = 'GET_CAMPAIGNS';
const GET_CAMPAIGNS_SUCCESS = 'GET_CAMPAIGNS_SUCCESS';
const GET_CAMPAIGNS_ERROR = 'GET_CAMPAIGNS_ERROR';

const actionCreator = (actionType, data) => {
  return {
    type: actionType,
    payload: {
      ...data,
    },
  };
};

export const getCampaigns = () => async (dispatch) => {
  dispatch(actionCreator(GET_CAMPAIGNS));
  try {
    const response = await fetchCampaigns();
    const responseBody = await response.json();
    const { campaigns } = responseBody.data;
    const formatedCampaigns = formatCampaigns(campaigns);

    dispatch(actionCreator(GET_CAMPAIGNS_SUCCESS, formatedCampaigns));
  } catch (error) {
    dispatch(actionCreator(GET_CAMPAIGNS_ERROR, { error }));
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
  case GET_CAMPAIGNS:
    return {
      ...state,
    };
  case GET_CAMPAIGNS_SUCCESS:
    return {
      ...action.campaigns,
    };
  case GET_CAMPAIGNS_ERROR:
    return {
      ...state,
    };
  default:
    return state;
  }
}

function formatCampaigns (campaigns) {
  const byId = {};
  const allIds = [];

  campaigns.forEach((campaign) => {
    byId[campaign._id] = campaign;
    allIds.push(campaign._id);
  });

  return { byId, allIds };
}
