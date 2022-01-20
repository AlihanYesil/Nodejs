const express = require("express");
const router = express.Router(); 
const blogController  = require("../Controllers/blogController");





router.get('/',blogController.blog_get_all);

router.get('/:id',blogController.blog_get_id);

module.exports = router