const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teamScheam = new Schema({

    name:{
        type:String,
        unique:true,
        require:true,
        trim:true
    },
    description:{
        type:String,
        required:false,
        default:'This team does not have any description'
    },
    image:{
        type:String,
        required:false,
        default:'team.png'
    },
    admin:{
        type:Schema.Types.ObjectId,
        required:false
    },
    status:{
        type:String,
        required:false,
        enum:['active','expired','banned','deleted'],
        default:'active'
    }

},{
    timestamps:true
});

module.exports = new mongoose.model('Team',teamScheam,'teams');