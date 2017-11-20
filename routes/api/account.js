/**
 * Created by HP on 17/11/2017.
 */
var express = require('express');
var router = express.Router();
var Account = require("../../models/account");

/* GET home page. */
router.post('/register', function(req, res, next) {
    var newAccount = new Account({
        username: req.body.username,
        password: req.body.password,
        balance: 2000
    });
    newAccount.save(function (err) {
        if(err) {
            res.sendStatus(404);
        }else{

            var id = Account.findOne({'username': newAccount.username}, function (err, doc) {
                if(err) res.sendStatus(404);
                else{
                    res.json({
                        status:'success',
                        message: doc.id});
                }
            });
        }
    });
});
router.post('/register', function(req, res, next) {
    var newAccount = new Account({
        username: req.body.username,
        password: req.body.password,
        balance: 2000
    });
    newAccount.save(function (err) {
        if(err) {
            res.sendStatus(404);
        }else{

            var id = Account.findOne({'username': newAccount.username}, function (err, doc) {
                if(err) res.sendStatus(404);
                else{
                    res.json({
                        status:'success',
                        message: doc.id});
                }
            });
        }
    });
});
router.post('/login', function(req, res, next) {
    var userAccount = {
        username: req.body.username,
        password: req.body.password,
    };
    Account.findOne({'username' : userAccount.username},function (err,account) {
        if(err) return res.sendStatus(404);
        else{
            if(account !== null) {
                account.comparePassword(userAccount.password, function (err, isMath) {
                    if (err) return res.sendStatus(404);
                    if (isMath)
                        res.json({
                            status: 'success',
                            message: account.id
                        });
                    else
                        res.json({
                            status: 'fail',
                            message: "username or password uncorrect"
                        });
                });
            }else{
                res.json({
                    status: 'fail',
                    message: "username or password uncorrect"
                });
            }
        }
    });
});
router.post('/search', function(req, res, next) {
    var id = Account.findById(req.body.userId, function (err, doc) {
        if(err) res.sendStatus(404);
        else{
            res.json({
                status:'success',
                message: doc.balance});
        }
    });
});

module.exports = router;
