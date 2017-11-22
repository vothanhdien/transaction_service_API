/**
 * Created by HP on 17/11/2017.
 */
var express = require('express');
var router = express.Router();
var Transaction = require('../../models/transaction');
var Account = require('../../models/account');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendStatus(200);
});
router.get('/search',function (req, res, next) {
    // console.log(req.query);
    //cung cap tat ca cac kieu seach
    //search ban Id
    if(req.query.id !== undefined){
        Transaction.findById(req.query.id,function (err, doc) {
            if(err) return res.sendStatus(404);
            return res.json(doc);
        });
    }
    //search nguoi gui
    else if(req.query.sender!== undefined){
        Transaction.find({'sender': req.query.sender},[],{skip:0,limit:5,sort:{time: -1}}, function (err, docs) {
            if(err) return res.sendStatus(404);
            return res.json(docs);
        });

    }
    //search nguoi nhan
    else if(req.query.receiver !== undefined){
        Transaction.find({'receiver': req.query.receiver},[],{skip:0,limit:5,sort:{time: -1}}, function (err, docs) {
            if(err) return res.sendStatus(404);
            return res.json(docs);
        });
    }else{
        return res.sendStatus(404);
    }
});
//lay het danh sach
router.get('/search/all',function (req, res, next) {
    //search nguoi gui
    if(req.query.sender!== undefined){
        Transaction.find({'sender': req.query.sender},[],{sort:{time: -1}}, function (err, docs) {
            if(err) throw err;
            return res.json(docs);
        });
    }
    //search nguoi nhan
    else if(req.query.receiver !== undefined){
        Transaction.find({'receiver': req.query.receiver},[],{sort:{time: -1}}, function (err, docs) {
            if(err) return res.sendStatus(404);
            return res.json(docs);
        });
    }else{
        return res.sendStatus(404);
    }
});
router.post('/transact', function (req, res, next) {
    var newTransaction =  new Transaction({
        sender: req.body.sender,
        receiver: req.body.receiver,
        value: req.body.value,
        time: new Date()
    });
    var response_json = {
        status: "",
        message: ""
    };
    //tim nguoi nhan
    Account.findById(newTransaction.receiver, function (err, receiver) {
        if(err) {
            res.status(404);
        }
        else if(receiver === null){
            response_json.status = "error";
            response_json.message = "receiver not found";
            return res.send(response_json);
        }else{
            //tim nguoi gui
            Account.findById(req.body.sender, function (err, sender) {
                if (err || sender === null) return res.sendStatus(404);
                else {
                    var newBalance = sender.balance - newTransaction.value;
                    if (newBalance < 0) {
                        response_json.status = "error";
                        response_json.message = "You don't have enough money";
                        res.json(response_json);
                    }else {
                        //tru tien nguoi gui
                        sender.set({balance: newBalance});
                        sender.save(function (err) {
                            if (err) {
                                return res.sendStatus(404);
                            }
                            else {
                                //cong tien cho nguoi gui
                                receiver.set({balance: receiver.balance + newTransaction.value});
                                receiver.save(function (err) {
                                    if (err) {
                                        sender.set({balance: sender.balance + newTransaction.value});
                                        sender.save(function (err) {
                                            if (err) return res.sendStatus(404);
                                        });
                                        return res.status(404);
                                    } else {
                                        //ghi lai giao dich

                                        newTransaction.receiver = receiver.id;
                                        newTransaction.save(function (err) {
                                            if (err) return res.sendStatus(404);
                                            else {
                                                response_json.status = "success";
                                                response_json.message = "";
                                                res.json(response_json);
                                            }
                                        });
                                    }
                                });

                            }
                        });
                    }
                }
            });
        }
    });
});

module.exports = router;
