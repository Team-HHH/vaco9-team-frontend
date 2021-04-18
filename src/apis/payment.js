export function fetchNewCampaign(data) {
  const url = 'http://localhost:5000/campaign';
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

export function fetchPaymentResult(data) {
  const url = 'http://localhost:5000/campaign/verify';
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}
