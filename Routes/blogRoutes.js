const express = require('express');
const { check } = require('express-validator');
const blogController = require('../Controller/blogController');

const {
  VALID_SORTBY,
  VALID_DIRECTION,
  VALID_PARAMS,
  ERROR,
  VALID_ERROR_KEYS,
} = require('../Constants/constants');

const router = express.Router();

router.get(
  '/posts',
  [
    check(VALID_PARAMS.tag)
      .isString()
      .notEmpty()
      .withMessage(ERROR[VALID_PARAMS.tag][VALID_ERROR_KEYS.error]),
    check(VALID_PARAMS.sortBy)
      .optional()
      .isString()
      .isIn(VALID_SORTBY)
      .withMessage(ERROR[VALID_PARAMS.sortBy][VALID_ERROR_KEYS.message]),
    check(VALID_PARAMS.direction)
      .optional()
      .isString()
      .isIn(VALID_DIRECTION)
      .withMessage(ERROR[VALID_PARAMS.direction][VALID_ERROR_KEYS.message]),
  ],
  blogController.getPosts
);

module.exports = router;
