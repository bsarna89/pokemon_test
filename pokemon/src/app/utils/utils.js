export function getIdFromUrl(url) {
  const regex = /\/(\d+)\/[^/]*$/;
  const matchUrl = url.match(regex);
  return matchUrl && matchUrl[1];
}

export function sortByName(array) {
  const copyArray = [...array].sort((a, b) => {
    const nA = a.name.toLowerCase();
    const nB = b.name.toLowerCase();

    if (nA < nB) return -1;
    if (nA > nB) return 1;
    return 0;
  });
  return copyArray;
}
