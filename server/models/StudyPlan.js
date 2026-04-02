import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        default: "medium"
    },
    plan: [
        {
            day: Number,
            task: String,
            completed: {
                type: Boolean,
                default: false
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);
export default StudyPlan;
