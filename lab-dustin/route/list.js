'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('app:route/list');
const List = require('../model/list');

const router = module.exports = new Router();

router.post('/api/list',jsonParser,function(){

})

//router.get()

//router.put()

//router.delete()
