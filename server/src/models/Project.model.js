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
            required: true
        },
        name:{
            type: String,
            required: true
        },
        desc:{
            type: String,
            required: true  
        }

    },
    {
        timestamps: true
    }
)



export const Project = mongoose.model("Project", projectSchema)