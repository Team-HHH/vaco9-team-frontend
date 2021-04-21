export async function getCampaigns() {
  const url = 'http://localhost:5000/campaign';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
    },
  });

  return response;
}
