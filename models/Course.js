const mongoose = require('mongoose');

const {Schema, Types} = require('mongoose');

const CourseSchema = new Schema({
    title:{
        type: String,
        trim:true,
        required: [true, 'Pleasse add a course title']
    },
    description:{
        type:String,
        required: [true, 'Please add a description']
    },
    weeks:{
        type:String,
        required: [true, 'Please add number of weeks']
    },
    tuition:{
        type:Number,
        required: [true, 'Please add Tuition cost']
    },
    minimumSkill:{
        type:String,
        required: [true, 'Please add Minimum Skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scolarshipAvailable:{
        type:Boolean,
       default:false
    },
    createdAt:{
        type: Date,
       default: Date.now
    },
    bootcamp: {
        type: Types.ObjectId,
        ref:'Bootcamp',
        required: true
    }
},{});


// Static Method to calculate average of course cost
CourseSchema.statics.getAverageCost = async function(bootcampId){
    console.log('calculating avg cost');

    const obj = await this.aggregate([
        {
            $match: {bootcamp: bootcampId}
        },{
            $group: {
                _id: '$bootcamp',
                averageCost: {$avg: '$tuition'}
            }
        }
    ]);

    //console.log(obj);

    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
            averageCost: Math.ceil(obj[0].averageCost / 10) *10
        });
    } catch (error) {
        console.error(error);
    }
};


// call getAverageCost After Save
CourseSchema.post('save', function(){
    this.constructor.getAverageCost(this.bootcamp);
});

// call getAverageCost Before Remove
CourseSchema.pre('remove', function(){
    this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model('Course', CourseSchema);