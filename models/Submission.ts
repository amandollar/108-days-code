import mongoose from "mongoose"

const SubmissionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    hours: { type: Number, required: true },
    link: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

SubmissionSchema.index({ userId: 1, date: 1 }, { unique: true })

export default mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema)
