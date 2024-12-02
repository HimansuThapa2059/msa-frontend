import { useCallback, useContext, useEffect, useState } from "react";
import Card from "./Card";
import { AppContext } from "@/context/context";
import { CircleX, Loader2 } from "lucide-react";

interface dataType {
  id: number;
  name: string;
  type: "movie" | "anime" | "series" | "other";
  rating: number | null;
  description: string;
  genre: string[];
  updatedAt: string;
  createdAt: string;
}

const All = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<dataType[]>([]);
  const { token } = useContext(AppContext);

  const getData = useCallback(async () => {
    try {
      const res = await fetch("/api/msa", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const fetchedData = await res.json();
        setData(fetchedData.data);
      } else {
        setError("Failed to fetch data.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex items-center justify-center flex-col h-96 gap-3">
          <Loader2 className="h-20 w-20 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center flex-col h-96 gap-3 text-red-600">
          <CircleX className="h-16 w-16" />
          <span className="text-lg">Something went wrong, try again</span>
        </div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <Card
              id={item.id}
              key={item.id}
              description={item.description}
              genre={item.genre}
              type={item.type}
              name={item.name}
              rating={item.rating}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col h-96 gap-3">
          <CircleX className="h-16 w-16" />
          <span className="text-lg font-semibold">
            Nothing here, Add some using{" "}
            <span className="bg-slate-900 p-2 rounded-lg text-white text-sm mx-2">
              + add new
            </span>{" "}
            button
          </span>
        </div>
      )}
    </div>
  );
};

export default All;
