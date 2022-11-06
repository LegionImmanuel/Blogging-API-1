const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    firstname: {
        type: String,
        // required: [true, "Input cannot be blank"],
    },
    lastname: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
        // required: true
    },
},{timestamps:true}
);



UserSchema.pre(
    'save',
    async function (next) {
        const user = this;
        console.log(user);
        const hash = await bcrypt.hash(user.password, 10);

        user.password = hash;
        next();
    }
);

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    console.log(user)
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;