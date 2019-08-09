const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ews = express();
const port = 5000;

var people = null;
var addresses = null;

//No streaming, upper limit on flat file size, application will crash if exceeded
fs.readFile('./data/people.json', (err, data) => {
    if (err) throw err;
    people = JSON.parse(data);
    fs.readFile('./data/addresses.json', (err, data) => {
        if (err) throw err;
        addresses = JSON.parse(data);
        ews.use(express.static('public'));
        ews.use(bodyParser.json());
        ews.get('/api/people', (req, res) => {
            var pL = [];
            people.forEach(function(p){
                let person = {};
                let addressList = [];
                person.key = p.key;
                person.FirstName = p.FirstName;
                person.LastName = p.LastName;
                person.NickName = p.NickName;
                person.DOB = p.DOB;
                addresses.forEach(function(a){
                    if(p.AddressKeys.includes(a.key)){
                        addressList.push(a);
                    }
                });
                let x = {
                    "key": p.key,
                    "Person": person,
                    "Addresses": addressList
                };
                pL.push(x);
            });
            const metadata = { total_count: pL.length };
            res.json({ _metadata: metadata, records: pL });
        });
        ews.get('/api/person/:id', (req, res) => {
            let p={}
            for(let i = 0; i < people.length; i++){
                if(people[i].key == req.params.id){
                    p = people[i];
                    break;
                }
            }
            res.json({ person: p });
        });
        ews.get('/api/address/:id', (req, res) => {
            let a={}
            for(let i = 0; i < addresses.length; i++){
                if(addresses[i].key == req.params.id){
                    a = addresses[i];
                    break;
                }
            }
            res.json({ address: a });
        });
        ews.post('/api/person', (req, res) => {
            const newPerson = req.body;
            console.log(newPerson);
            newPerson.key = people.length + 1;
            newPerson.AddressKeys = [];

            const err = validatePerson(newPerson);
            
            if (err) {
                console.log(err);
                res.json({ error: `Error: ${err}` });
                return;
            }
            people.push(newPerson);
            fs.writeFile('./data/people.json', JSON.stringify(people, null, 2), (err) => {
                if (err) throw err;
                console.log('people data written to file');
            });
            res.json(newPerson);
        });
        ews.delete('/api/person/:id', (req, res) => {
            let i=0;
            let index=null;
            let p=null;
            for(i = 0; i < people.length; i++){
                if(people[i].key == req.params.id){
                    p = people[i];
                    index=i;
                    break;
                }
            }
            people.splice(index,1);
            fs.writeFile('./data/people.json', JSON.stringify(people, null, 2), (err) => {
                if (err) throw err;
                console.log('people data written to file');
            });
            res.json(p);
        });
        ews.post('/api/person/:id', (req, res) => {
            let p={};
            const editedPerson = req.body;
            let index = -1;
            for(let i = 0; i < people.length; i++){
                if(people[i].key == req.params.id){
                    p = people[i];
                    p.key = parseInt(req.params.id, 10);
                    p.FirstName = editedPerson.FirstName;
                    p.LastName = editedPerson.LastName;
                    p.DOB = editedPerson.DOB;
                    p.NickName = editedPerson.NickName;
                    index = i;
                    break;
                }
            }

            const err = validatePerson(p);
            if (err) {
                console.log(err);
                res.json({ error: `Error: ${err}` });
                return;
            }
            people[index] = p;
            fs.writeFile('./data/people.json', JSON.stringify(people, null, 2), (err) => {
                if (err) throw err;
                console.log('people data written to file');
            });
            res.json(p);
        });
        ews.post('/api/address', (req, res) => {

            const personId = req.body.personId;
            const newAddress = req.body.address;

            let isExistingAddress = false;
            let existingAddressIndex = -1;
            newAddress.key = addresses.length + 1;
            for(let i = 0; i < addresses.length; i++){
                if(newAddress.Line1.toLowerCase() == addresses[i].Line1.toLowerCase() && newAddress.Line2.toLowerCase()==addresses[i].Line2.toLowerCase() && newAddress.Country == addresses[i].Country && newAddress.PostCode.toLowerCase()==addresses[i].PostCode.toLowerCase()){
                    isExistingAddress = true;
                    existingAddressIndex = i;
                    break;
                }
            }
            for(let i = 0; i < people.length; i++){
                if(isExistingAddress && people[i].key == req.body.personId && people[i].AddressKeys.includes(addresses[existingAddressIndex].key)){
                    res.json({ error: "Error: Cannot add duplicate address for person" });
                    return;
                }
                if(isExistingAddress && people[i].key == req.body.personId){
                    people[i].AddressKeys.push(addresses[existingAddressIndex].key);
                    res.json(addresses[existingAddressIndex]);
                    fs.writeFile('./data/people.json', JSON.stringify(people, null, 2), (err) => {
                        if (err) throw err;
                        console.log('people data written to file');
                    });
                    return;
                }
            }

            const err = validateAddress(newAddress);
            
            if (err) {
                console.log(err);
                res.json({ error: `Error: ${err}` });
                return;
            }
            for(let i = 0; i < people.length; i++){
                if(people[i].key == personId){
                    people[i].AddressKeys.push(newAddress.key);
                }
            }
            addresses.push(newAddress);
            fs.writeFile('./data/people.json', JSON.stringify(people, null, 2), (err) => {
                if (err) throw err;
                console.log('people data written to file');
            });
            fs.writeFile('./data/addresses.json', JSON.stringify(addresses, null, 2), (err) => {
                if (err) throw err;
                console.log('address data written to file');
            });
            res.json(newAddress);
        });
        ews.post('/api/address/:id', (req, res) => {
            let a={};
            const editedAddress = req.body;
            let index = -1;
            for(let i = 0; i < addresses.length; i++){
                if(addresses[i].key == req.params.id){
                    a = addresses[i];
                    a.Line1 = editedAddress.Line1;
                    a.Line2 = editedAddress.Line2;
                    a.Country = editedAddress.Country;
                    a.PostCode = editedAddress.PostCode;
                    index = i;
                    break;
                }
            }
            const err = validateAddress(a);
            if (err) {
                console.log(err);
                res.json({ error: `Error: ${err}` });
                return;
            }
            addresses[index] = a;
            fs.writeFile('./data/addresses.json', JSON.stringify(addresses, null, 2), (err) => {
                if (err) throw err;
                console.log('address data written to file');
            });
            res.json(a);
        });
        ews.delete('/api/person/:id', (req, res) => {
            let i=0;
            let index=null;
            let p=null;
            for(i = 0; i < people.length; i++){
                if(people[i].key == req.params.id){
                    p = people[i];
                    index=i;
                    break;
                }
            }
            people.splice(index,1);
            fs.writeFile('./data/people.json', JSON.stringify(people, null, 2), (err) => {
                if (err) throw err;
                console.log('people data written to file');
            });
            res.json(p);
        });
        ews.delete('/api/address/:id/:personId', (req, res) => {
            let i=0;
            let index=null;
            let a=null;
            for(i = 0; i < people.length; i++){
                if(people[i].key == req.params.personId){
                    let temp = people[i].AddressKeys;
                    let ix = temp.indexOf(parseInt(req.params.id, 10));
                    console.log(temp.splice(ix, 1));
                    console.log(temp);
                    people[i].AddressKeys = temp;
                    break;
                }
            }
            fs.writeFile('./data/people.json', JSON.stringify(people, null, 2), (err) => {
                if (err) throw err;
                console.log('people data written to file');
            });
            fs.writeFile('./data/addresses.json', JSON.stringify(addresses, null, 2), (err) => {
                if (err) throw err;
                console.log('address data written to file');
            });
            res.json(a);
        });
        function validatePerson(p){
            if(p.FirstName == ""){
                return "First name cannot be empty";
            }
            if(new RegExp(/[^a-zA-Z]/).test(p.FirstName)){
                return "First name has invalid characters";
            }
            if(p.FirstName.length > 20){
                return "First name cannot have more than 20 characters";
            }
            if(p.LastName == ""){
                return "Last name cannot be empty";
            }
            if(new RegExp(/[^a-zA-Z]/).test(p.LastName)){
                return "Last name has invalid characters";
            }
            if(p.LastName.length > 20){
                return "Last name cannot have more than 20 characters";
            }
            if(p.DOB == ""){
                return "Date of Birth is required";
            }
            if(new Date(p.DOB) > new Date()){
                return "Date of Birth cannot be in the future";
            }
            if(new RegExp(/[^a-zA-Z0-9]/).test(p.NickName)){
                return "Nick name has invalid characters";
            }
            for(let i = 0; i < people.length; i++){
                if(p.key == people[i].key){
                    continue;
                }
                if(p.FirstName == people[i].FirstName && p.LastName==people[i].LastName){
                    return "Person with the same name already exists";
                }
            }
        }
        function validateAddress(a){
            if(!a.Line1 || a.Line1 == ""){
                return "Address Line 1 cannot be empty";
            }
            if(a.Line2.length > 0 && new RegExp(/[^a-zA-Z ]/).test(a.Line2)){
                return "Address Line 2 has invalid characters";
            }
            if(a.Line2.length > 20 || a.Line1.length > 20){
                return "Address lines can have maximum 20 characters"
            }
            if(a.PostCode && new RegExp(/[^a-zA-Z0-9]/).test(a.PostCode)){
                return "PostCode has invalid characters";
            }
            if(a.PostCode.length > 10){
                return "PostCode can have maximum 10 characters";
            }
            for(let i = 0; i < addresses.length; i++){
                if(a.key == addresses[i].key){
                    continue;
                }
                if(a.Line1.toLowerCase() == addresses[i].Line1.toLowerCase() && a.Line2.toLowerCase()==addresses[i].Line2.toLowerCase() && a.Country == addresses[i].Country && a.PostCode.toLowerCase()==addresses[i].PostCode.toLowerCase()){
                    return "This address already exists";
                }
            }
        }
        ews.listen(port, () => console.log(`express server started at port ${port}`));
    });
});