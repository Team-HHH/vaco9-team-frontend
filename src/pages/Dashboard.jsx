import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCampaigns } from '../reducers/campaign';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  return (
    <div>
      dashboard page.
    </div>
  );
}
