const passport  =  require('passport')
const LocalStratergy  =  require('passport-local').Strategy;
const Person  = require('./models/person');


passport.use(new LocalStratergy(
    async(username,password,done) => {
        // auth logic here
        try {
            console.log('received ceredentuals:',username,password);
            const user = await Person.findOne({username:username});
            if(!user)
            return done(null,false,{message:'Incorrect username'});
        
        const isPasswordMatch = await user.comparePassword(password)
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incoorect password'});
        }
        
    } catch (error) {
        return done(err);
        
    }
}
));

module.exports = passport;