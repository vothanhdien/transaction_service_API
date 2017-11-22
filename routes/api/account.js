/**
 * Created by HP on 17/11/2017.
 */
var express = require('express');
var router = express.Router();
var Account = require("../../models/account");

/* GET home page. */
router.post('/register', function(req, res, next) {
    var newAccount = new Account({
        email: req.body.email,
        password: req.body.password,
        balance: 2000
    });
    if(newAccount.email.indexOf("@") < 0 || newAccount.email.indexOf("@") !== newAccount.email.lastIndexOf("@")){
        res.json({
            status: 'fail',
            message: "email not correct"
        })
    }else {
        newAccount.save(function (err) {
            if (err) {
                res.json({
                    status: 'fail',
                    message: "email already exist"
                })
            } else {

                var id = Account.findOne({'email': newAccount.email}, function (err, doc) {
                    if (err) res.sendStatus(404);
                    else {
                        res.json({
                            status: 'success',
                            message: doc.id
                        });
                    }
                });
            }
        });
    }
});
// router.post('/register', function(req, res, next) {
//     var newAccount = new Account({
//         username: req.body.username,
//         password: req.body.password,
//         balance: 2000
//     });
//     newAccount.save(function (err) {
//         if(err) {
//             res.sendStatus(404);
//         }else{
//
//             var id = Account.findOne({'username': newAccount.username}, function (err, doc) {
//                 if(err) res.sendStatus(404);
//                 else{
//                     res.json({
//                         status:'success',
//                         message: doc.id});
//                 }
//             });
//         }
//     });
// });
router.post('/login', function(req, res, next) {
    var userAccount = {
        userId: req.body.username,
        password: req.body.password
    };
    Account.findById(userAccount.userId,function (err,account) {
        if(err) {
            res.json({
                status: 'fail',
                message: 'Wallet ID not found'
            });
        }
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
                            message: "your ID or password uncorrect"
                        });
                });
            }else{
                res.json({
                    status: 'fail',
                    message: "your ID or password uncorrect"
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
