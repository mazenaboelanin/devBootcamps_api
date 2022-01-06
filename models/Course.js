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

module.exports = mongoose.model('Course', CourseSchema);