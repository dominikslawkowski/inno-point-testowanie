const getCode = text => {
  return text.slice(text.indexOf("code=") + 5, text.indexOf("&"));
};

const getState = text => {
  return text.slice(text.indexOf("state=") + 6, text.length);
};

const getToken = text => {
  return text.slice(text.indexOf("access_token=") + 13, text.indexOf("&"));
};

module.exports = { getCode, getState, getToken };
