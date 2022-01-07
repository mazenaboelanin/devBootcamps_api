const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utlis/geocoder');

const BootcampSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description:{
        type: String,
        required: [true, 'Please add a description '],
        maxlength: [500, 'description can not be more than 500 characters']
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please use a vailed URL with Http or Https'
        ]
    },
    phone:{
        type: String,
        maxlength: [20, ' Phone Number can not be loger than 20 characters']
    },
    email: {
        type: String,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a vailed email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please Add an address']
    },

    location:{
        //GeoJSON Point
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point']// 'location.type' must be 'Point'
          },
          coordinates: {
            type: [Number],
            index:'2dsphere'
          },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers:{
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business', 
            'Other'
        ]
    },
    averageRating: {
        type: Number,
        min : [1, 'Rating must be at least 1'],
        max : [10,' Rating must can not be more than 10'],
    },
    averageCost: Number,
    // name of the photo
    photo: {
        type: String,
        default:'no-photo.jpg'
    },
    housing:{
        type:Boolean,
        default: false
    },
    jobAssistance:{
        type:Boolean,
        default: false
    },
    jobGuarantee:{
        type:Boolean,
        default: false
    },
    acceptGi:{
        type:Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});


// *Pre middleware* Bootcamp slug from the name
BootcampSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
  });


  //  *Pre middleware* Bootcamp Geocoder and create location field
BootcampSchema.pre('save', async function(next){

const loc = await geocoder.geocode(this.address);
console.log(loc[0]);
this.location = {
    type: 'Point',
    coordinates:[loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street:  loc[0].streetName,
    city:  loc[0].city,
    state:  loc[0].stateCode,
    zipcode:  loc[0].zipcode,
    country: loc[0].countryCode,
};

// remove address field
this.address = undefined;

next();
});

// cascade delete courses when bootcamp is deleted

BootcampSchema.pre('remove', async function(next){
    console.log(`courses being removed from bootcamp of id ${this._id}`);
    await this.model('Course').deleteMany({bootcamp: this._id});
    next();
});


// reverse populate with virtuals
BootcampSchema.virtual('courses', {
    ref: 'Course',
    localField:'_id',
    foreignField: 'bootcamp',
    justOne: false
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);