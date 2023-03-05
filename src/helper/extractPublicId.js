const extractPublicId = (url) => {
  const parts = url.split(",");
  return parts[0];
};

module.exports = { extractPublicId };
