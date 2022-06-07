const {
  VALID_PARAMS,
  DEFAULT_DIRECTION,
  DEFAULT_SORTBY,
  BASE_URL,
} = require('../Constants/constants');

const blogPostsEndpointBuilder = (
  tag,
  sortBy = DEFAULT_SORTBY,
  direction = DEFAULT_DIRECTION
) => {
  let tagParam = `?${VALID_PARAMS.tag}=${tag}`;
  let sortByParam = `&${VALID_PARAMS.sortBy}=${sortBy}`;
  let directionParam = `&${VALID_PARAMS.direction}=${direction}`;

  let endpoint = BASE_URL + tagParam + sortByParam + directionParam;
  return endpoint;
};

module.exports = {
  blogPostsEndpointBuilder,
};
