const { body, check } = require('express-validator');

module.exports = [
  //add y edit
  body('title')
    .notEmpty()
    .withMessage('Campo obligatorio'),
  body('rating')
    .notEmpty()
    .withMessage('Campo obligatorio'),
  body('awards')
    .notEmpty()
    .withMessage('Campo obligatorio'),
  body('release_date')
    .notEmpty()
    .withMessage('Campo obligatorio')
    .isDate()
    .withMessage('Campo obligatorio'),
  body('length').notEmpty().withMessage('Campo obligatorio'),
];
