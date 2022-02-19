const express = require('express');
const router = express.Router();

const newApiController = require('../../api/NewsApi');

router.get('/', newApiController.getNews);
router.get('/:newId', newApiController.getNewsByID);
router.post('/', newApiController.createNews);
router.put('/:newId', newApiController.updateNews);
router.delete('/:newId', newApiController.deleteNews);

module.exports = router;