const VALID_SORTBY = ['id', 'reads', 'likes', 'popularity'];
const VALID_DIRECTION = ['desc', 'asc'];

const VALID_PARAMS = {
  sortBy: 'sortBy',
  tag: 'tag',
  direction: 'direction',
};

const VALID_ERROR_KEYS = {
  error: 'error',
};

const VALID_RESPONSE_KEYS = {
  posts: 'posts',
};

const ERROR = {
  [VALID_PARAMS.tag]: {
    [VALID_ERROR_KEYS.error]: 'Tags parameter is required',
    status: 400,
  },
  [VALID_PARAMS.sortBy]: {
    [VALID_ERROR_KEYS.error]: 'sortBy parameter is invalid',
    status: 400,
  },
  [VALID_PARAMS.direction]: {
    [VALID_ERROR_KEYS.error]: 'sortBy parameter is invalid',
    status: 400,
  },
};

const DEFAULT_SORTBY = 'id';
const DEFAULT_DIRECTION = 'asc';

const BASE_URL = 'https://api.hatchways.io/assessment/blog/posts';

module.exports = {
  VALID_SORTBY,
  VALID_DIRECTION,
  VALID_PARAMS,
  VALID_ERROR_KEYS,
  ERROR,
  DEFAULT_SORTBY,
  DEFAULT_DIRECTION,
  BASE_URL,
  VALID_RESPONSE_KEYS
};
