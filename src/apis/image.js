export async function fetchImageFile(data) {
  const url = 'http://localhost:5000/uploads';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': localStorage.getItem('accessToken'),
    },
    body: data,
  });

  return response;
}
