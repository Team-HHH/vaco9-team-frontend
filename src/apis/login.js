export async function requestLoginToServer(loginInput) {
  const response = await fetch(
    'http://localhost:5000/auth/login/advertiser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(loginInput),
    }
  );

  return response;
}
