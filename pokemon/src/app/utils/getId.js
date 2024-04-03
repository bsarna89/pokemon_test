export default function getId(url) {
  const regex = /\/(\d+)\/[^/]*$/;
  const matchUrl = url.match(regex);
  return matchUrl && matchUrl[1];
}
