// Dependencies
// ===========================================================
var express = require("express");
var path = require("path");
var app = express();
var userData = require("../data/friends.js");

// Routes
// ===========================================================
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        return res.json(userData);
    });


    app.post("/api/friends", function(req, res) {
        var newuser = req.body;

        var closestDifference = 100;
        var difference = 0;
        var match;

        userData.forEach(function(friend) {
            console.log(friend);
            console.log(req.body);

            difference = eval(friend.scores.map(function(num, index) {
                return Math.abs(num - req.body.scores[index]);
            }).join('+'));

            if (difference <= closestDifference) {
                closestDifference = difference;
                match = friend;
            }
        });
        res.json(match);

        userData.push(newuser)
    })

};