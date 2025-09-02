import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudnary link
      required: true,
    },
    coveredImage: {
      type: String, //cloudnary link
    },
    watchHistory: [{ type: mongoose.Schema.Types.ObjectId }],
    ref: "Video",
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method.isCorrectPassoword = async function name(password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
