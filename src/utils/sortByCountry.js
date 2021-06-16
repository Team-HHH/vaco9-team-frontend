const sortByProperty = (countryData, property) => {
  const arr = [];
  for (let key in countryData) {
    const tmp = {
      country: key,
      reach: countryData[key].reach,
      click: countryData[key].click,
    };

    arr.push(tmp);
  }

  arr.sort((a, b) => {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;
    return 0;
  });

  return arr.map(el => el.country);
}

export default sortByProperty;
