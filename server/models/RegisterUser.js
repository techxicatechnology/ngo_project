import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required:true  },
    address: { type: String, required:true  },
    state: { type: String, required:true  },
    district: { type: String, required:true  },
    taluka: { type: String, required:true  },
    village: { type: String, required:true  },
    mobileNumber: { type: String, required:true  },
    email: { type: String, required:true  },
    dateOfBirth: { type: Date, required:true  },
    image:{type:String},

    // ✅ UUID field
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
