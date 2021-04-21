export async function fetchCampaigns() {
  const url = 'http://localhost:5000/campaign';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
    },
  });

  return response;
}

export async function fetchNewCampaign(data) {
  const url = 'http://localhost:5000/campaign';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(data),
  });

  return response;
}
