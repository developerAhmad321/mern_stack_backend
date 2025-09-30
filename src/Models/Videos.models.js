import mongoose, {Schema} from "mongoose";
import mongooseAggredatePipeline from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema ({
    videFile: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
    },
    thumbnail: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },





}, {timestamps:true});

videoSchema.plugin(mongooseAggredatePipeline);

export const Video = mongoose.model("Video", videoSchema)