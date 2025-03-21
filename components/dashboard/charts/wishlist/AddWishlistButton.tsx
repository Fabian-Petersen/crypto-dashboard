import React from "react";
import { Plus } from "lucide-react";

function AddWishlistButton() {
  return (
    <button className="hover:cursor-pointer hover:scale-[101%] flex items-center justify-center gap-8 text-gray-500 w-[full] border border-gray-300 py-2 rounded-md">
      <Plus size={20} />
      Add to watchlist
    </button>
  );
}

export default AddWishlistButton;
