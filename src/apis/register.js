export async function saveRegistrationData(data) {
  const url = 'http://localhost:5000/auth/register/advertiser';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}
