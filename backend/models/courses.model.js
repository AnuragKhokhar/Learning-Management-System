import {model, Schema} from 'mongoose';

const courseSchema = new Schema({
    title:{
        type: String,
        required:[true, 'Title is required'],
        minLength: [8, 'Title must be atleast 8 characters'],
        maxLength: [59, "Title should be less than 60 characters"],
        trim: true

    },
    description: {
        type: String,
        required:[true, 'Descrition is required'],
        minLength: [8, 'Descrition must be atleast 8 characters'],
        maxLength: [200, "Descrition should be less than 60 characters"]
    },
    category: {
        type: String,
        required:[true, 'Category is required'],
    },
    thumbnail:{
        public_id:{
            type: String,
            required: true
        },
        secure_url:{
            type:String,
            required: true
        }
    },

    lectures: [
        {
            title:String,
            description:String,
            lecture: {
                public_id: {
                    type: String
                },
                secure_url: {
                    type:String
                }
            }
        }
    ],
    numbersOfLectures : {
        type:Number,
        defaul:0
    },
    createdBy: {
        type: String,
        required:true
    }
}, {
    timestamps: true
});

const Course = model('courses', courseSchema);

export default Course;