/* 
Request:
Route: /api/posts
Method: GET Query Parameters:
tags - string (required),
sortBy - string(optional),
direction - string(optional)
*/

const axios = require('axios');
const { validationResult } = require('express-validator');
const {
  VALID_ERROR_KEYS,
  VALID_RESPONSE_KEYS,
} = require('../Constants/constants');
const { blogPostsEndpointBuilder, sortPosts } = require('../Util/apiHelper');

const getPosts = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (let error of errors.errors) {
      res.status(400).json({ [VALID_ERROR_KEYS.error]: error.msg });
      return;
    }
  }
  let { tag, sortBy, direction } = req.query;
  tagsArr = tag.split(',');
  let endPoints = [];
  for (let tag of tagsArr) {
    endPoints.push(blogPostsEndpointBuilder(tag, sortBy, direction));
  }

  axios
    .all(
      endPoints.map((endpoint) => {
        return axios.get(endpoint);
      })
    )
    .then((results) => {
      let data = results.map((data) => data.data.posts);
      let responsePosts = [...new Set(data.flat())];
      responsePosts = sortPosts(responsePosts, sortBy, direction);
      let responseObject = { [VALID_RESPONSE_KEYS.posts]: responsePosts };
      res.status(200).json({ ...responseObject });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getPosts,
};
