import mongoose, {Schema} from "mongoose";
const projectSchema = new Schema(
    {
        id:{
            type: Number,
            required: true,
            unique: true
        },
        img:{
            type: [String],
            required: false,
            default: []
        },
        name:{
            type: String,
            required: true
        },
        desc:{
            type: String,
            required: true  
        },
        techStack:{
            type: [String],
            required: false
        }

    },
    {
        timestamps: true
    }
)



export const Project = mongoose.model("Project", projectSchema)