import { Schema,model } from "mongoose";

const userSchema = new Schema({
  full_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "operator"],
    default: "operator",
  },
  is_active: { type: Boolean, default: true },
},
{timestamps:true}
);

const User = model('User',userSchema)
export default User;