var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var reservations = [];
var waitlist = [];

app.get("/", (req, response)=>{
	response.sendFile(path.join(__dirname, "home.html"));
});

app.get("/make", (req, response) =>{
	response.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", (req, response) =>{
	response.sendFile(path.join(__dirname, "view.html"));
});


app.get("/api/:reservations?", (req, response) =>{
	var res = req.params.reservations;

	if(res){
		console.log(res);
		let size = res.length;
		for(var i = 0; i < size; i++){
			if(res === reservations[i].routeName){
				return response.json(reservations[i]);
			}
		}
		return response.json(false);
	}
	return response.json(reservations);
});

//keys: name phoneNumber uniqueID email

app.post("/api/new", (req, response) =>{
	var newReservation = req.body;
	newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

	console.log(newReservation);

	reservations.push(newReservation);

	response.json(newReservation);
});


app.listen(PORT, () => console.log("App listening on port " + PORT));
