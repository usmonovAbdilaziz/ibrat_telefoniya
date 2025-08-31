import { Schema, Types, model } from "mongoose";

const callSchema = new Schema(
  {
    client: { type: Types.ObjectId, ref: "Client", required: true },
    operator: { type: Types.ObjectId, ref: "User", required: true },
    call_type: {
      type: String,
      enum: ["incoming", "outgoing"],
      required: true,
    },
    duration: { type: Number }, // soniyada
    status: {
      type: String,
      enum: ["answered", "missed", "rejected"],
      default: "answered",
    },
    notes: { type: String }, // qo‘ng‘iroq haqida izoh
  },
  { timestamps: true }
);

const Call = model("Call", callSchema);
export default Call;
