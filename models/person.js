const mongoose = require('mongoose');
const brcypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    work: {
        type:String,
        enum:['chef','waiter','developer'],
        required:true
    },
    mobile: {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    Address: {
        type:String,
        required:true
    },
    salary: {
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }

})

personSchema.pre('save',async function(next){
    const person = this;


    // hash the password if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try {
        const salt =  await brcypt.genSalt(10);
        const hashedPassword = await brcypt.hash(person.password,salt);
        // override the plain password with the plain password
        person.password = hashedPassword;
    } catch (error) {
        
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        // use bcypt to compare the password 
        const isMatch = await brcypt.compare(candidatePassword,this.password);
        return isMatch; 
    } catch (error) {
        throw error;
}
}


// create model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;