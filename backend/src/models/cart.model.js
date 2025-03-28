import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId:
   { type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true
   },
  productId:
   { type: String,
     required: true 
    },
  name: 
  { type: String, 
    required: true 
  },
  price:
   { type: Number,
     required: true 
    },
  quantity: 
  { type: Number,  
    default: 1, 
  },
  image: 
  { type: String,
    default:""

   },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
