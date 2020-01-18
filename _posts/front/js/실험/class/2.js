//module.exports = class Animal {
class Animal {
  //constructor(baw) {
  //  this.baw = baw;
  //}
  say() {
    console.log(this.baw);
  }
}

//const Animal = require("./2.js");
var inu = new Animal("わんわん");

inu.say();
