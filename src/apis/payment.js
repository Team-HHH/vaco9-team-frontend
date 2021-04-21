export async function fetchPaymentResult(data) {
  const url = 'http://localhost:5000/payment/verify';
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
