"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('public'));

var users = [{forename:"Sophie", surname:"McFarlane", username: "sophieMcF", password: "123", access_token: "concertina", court: "yes"},{"username":"doctorwhocomposer", "forename":"Delia", "surname":"Derbyshire", "password":"concertina", "access_token": 'concertina'}];

app.get('/court', function(req, resp){
	var people = "";
	for (const key of Object.keys(users)){
		if(users[key]["court"] === "yes"){
			people = users[key]["username"] + "\n" + people;
		}
	}

	resp.send(people);
})


app.get('/people', function(req, resp){
	resp.send(users);
})

app.get('/people/:username', function(req, resp){
	for (const key of Object.keys(users)){
		if (req.params.username === users[key]["username"])
			resp.send(users[key])
	}
})

app.post('/people', function(req, resp){
	var index = -1;
	for(const key of Object.keys(users)){
		console.log("req: " + req.body.username);
		console.log("users[key]: " + users[key]["username"]);
		if (req.body.username === users[key]["username"]){
			console.log("it is equal");
			console.log("index before: " + index);
			console.log("has access token");
			index = 1;
			console.log("index after: " + index);
		}
	}
	console.log(index);
	if(index === -1){
		for(const key of Object.keys(users)){
			if(req.body.access_token === "concertina"){
				console.log("has access_token");
				users.push = {forename:req.body.forename, surname:req.body.surname, username:req.body.username, password: req.body.password, court: "yes"};
				console.log("pushed");
				resp.send("Logged in as: " + req.body.forename);
			}else{
				resp.status(403).send({message: "no access_token"});
			}
		}
	}else{
		console.log("you cant do that");
		resp.status(400).send({message: "user already exists"});
	}
})

app.post('/login', function(req, resp){
	for(const key of Object.keys(users)){
		console.log("req: " + req.body.username);
		console.log("users[key]: " + users[key]["username"]);
		if (req.body.username === users[key]["username"]){
			resp.send("Logged in as: " + req.body.forename);
		}else{
			console.log("reached the else statement");
			resp.status(400).send({message:"Not a valid user"});
		}
	}
	// for(const key of Object.keys(users)){
	// 	console.log(req.body.username);
	// 	console.log(users[key]["username"]);
	// 	if(req.body.username === users[key]["username"]){
	// 		resp.send("hello");
	// 	}else{
	// 		resp.send("not a valid user");
	// 	}
	// }
})

module.exports = app;