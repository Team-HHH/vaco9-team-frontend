export async function fetchImageUrl(file) {
  const url = 'http://localhost:5000/uploads';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('accessToken'),
    },
    body: file,
  });

  return response;
}
