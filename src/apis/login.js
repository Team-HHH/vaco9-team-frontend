export async function requestLoginToServer(loginInput) {
  const response = await fetch(
    'http://localhost:5000/auth/login/advertiser', {
      method: 'POST',
      body: JSON.stringify(loginInput),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }
  );

  return await response.json();
}
