import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import { Edit, Loader2, Trash } from "lucide-react";
import { AppContext } from "@/context/context";
import { useNavigate } from "react-router";
import UpdateForm from "./UpdateForm";

type CardProps = {
  id: number;
  name: string;
  rating: null | number;
  description: string;
  genre: string[];
  type?: "movie" | "series" | "anime" | "other";
};

const Card: React.FC<CardProps> = ({
  id,
  name,
  rating,
  description,
  genre,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/msa/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        navigate(0);
      }
    } catch (error) {
      console.log("error deleting item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 flex flex-col max-h-64 overflow-hidden relative">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg text-gray-900 truncate">{name}</p>
        <div className="flex items-center">
          <Dialog>
            <DialogTrigger>
              <Edit size={18} />
            </DialogTrigger>
            <UpdateForm
              id={id}
              name={name}
              description={description}
              genre={genre}
              rating={rating}
              type={type ?? "other"}
            />
          </Dialog>
          <button
            className="ml-3 lg:ml-2 rounded-md text-gray-700 hover:text-red-600 "
            onClick={handleDelete}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Trash size={18} />
            )}
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        <span className="font-semibold">Genre: </span>
        {genre.length > 0 ? genre.slice(0, 4).join(", ") : "N/A"}
      </p>
      {type ? (
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Type: {type}</span>
        </p>
      ) : null}
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Rating: </span>
        {rating ?? "N/A"}
      </p>
      <p className="text-sm text-gray-700 mt-2 overflow-hidden text-ellipsis line-clamp-5">
        {description}
      </p>
    </div>
  );
};

export default Card;
