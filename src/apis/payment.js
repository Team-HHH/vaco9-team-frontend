export async function fetchNewCampaign(data) {
  const url = 'http://localhost:5000/campaign';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function fetchPaymentResult(data) {
  const url = 'http://localhost:5000/payment/verify';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}
