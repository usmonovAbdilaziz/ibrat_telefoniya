import { Schema, Types, model } from "mongoose";

const leadSchema = new Schema(
  {
    phone_number: { type: String, required: true, unique: true },
    source: { type: String }, // qayerdan keldi (reklama, telegram, boshqalar)
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "rejected"],
      default: "new",
    },
    created_by: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Lead = model("Lead",leadSchema);
export default Lead;
