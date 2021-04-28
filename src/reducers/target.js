import { fetchEstimate } from '../apis/campaigns';

const GET_ESTIMATE_REQUEST = 'GET_ESTIMATE';
export const GET_ESTIMATE_SUCCESS = 'GET_ESTIMATE_SUCCESS';
export const GET_ESTIMATE_ERROR = 'GET_ESTIMATE_ERROR';

const actionCreator = (actionType, data) => {
  return {
    type: actionType,
    payload: {
      ...data,
    },
  };
};


export const getEstimate = () => async (dispatch) => {
  dispatch(actionCreator(GET_ESTIMATE_REQUEST));
  try {
    const response = await fetchEstimate();
    const responseBody = await response.json();
    const { estimate } = responseBody.data;
    const formatedTargetStats = formatCampaigns(estimate);

    dispatch(actionCreator(GET_ESTIMATE_SUCCESS, formatedTargetStats));
  } catch (error) {
    dispatch(actionCreator(GET_ESTIMATE_ERROR, { error }));
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_ESTIMATE_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_ESTIMATE_SUCCESS: {
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

function formatCampaigns(estimate) {

  return estimate;
}
