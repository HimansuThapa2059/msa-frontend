import { Button } from "@/components/ui/button"; // Keep your button as is.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext, useState } from "react";
import { AppContext } from "@/context/context";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const formSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(50, { message: "Name must be between 2 and 50 characters." }),
  rating: z
    .string()
    .optional()
    .refine((val) => !val || (parseFloat(val) >= 1 && parseFloat(val) <= 10), {
      message: "Rating must be between 1 and 10",
    }),
  genre: z.string().refine((val) => val.trim().length > 0, {
    message: "At least one genre must be provided",
  }),
  type: z.enum(["movie", "anime", "series", "other"], {
    errorMap: () => ({ message: "Please select a valid option" }),
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
});

type UpdateFormProps = {
  id: number;
  name: string;
  rating: null | number;
  description: string;
  genre: string[];
  type?: "movie" | "series" | "anime" | "other";
};

const UpdateForm: React.FC<UpdateFormProps> = ({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      rating: rating ? String(rating) : "",
      genre: genre.join(","),
      type: type,
      description,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const formData = {
        name: values.name,
        type: values.type,
        rating: Number(values.rating) || null,
        genre: values.genre
          .split(",")
          .map((item) => item.trim())
          .filter((value, index, self) => self.indexOf(value) === index),
        description: values.description,
      };

      const res = await fetch(`/api/msa/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      if (res.ok) {
        form.reset();
        navigate(0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="max-w-[90%] rounded-xl overflow-y-scroll">
      <DialogHeader>
        <DialogTitle>Update Information</DialogTitle>
        <DialogDescription>Please update the details below.</DialogDescription>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-8"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm">
            Name:
          </label>
          <input
            id="name"
            placeholder="Enter name here"
            className="border border-slate-300 p-2 rounded-md text-sm"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="rating" className="mb-1 text-sm">
            Rating (optional)
          </label>
          <input
            id="rating"
            placeholder="Rating out of 10"
            className="border border-slate-300 p-2 rounded-md text-sm"
            {...form.register("rating")}
          />
          {form.formState.errors.rating && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.rating.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="genre" className="mb-1 text-sm">
            Genre:
          </label>
          <input
            id="genre"
            placeholder="Comedy, Thriller"
            className="border border-slate-300 p-2 rounded-md text-sm"
            {...form.register("genre")}
          />
          {form.formState.errors.genre && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.genre.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="type" className="mb-1 text-sm">
            Type
          </label>
          <select
            id="type"
            className="border border-slate-300 p-2 rounded-md text-sm"
            {...form.register("type")}
          >
            <option value="movie">Movie</option>
            <option value="anime">Anime</option>
            <option value="series">Series</option>
            <option value="other">Other</option>
          </select>
          {form.formState.errors.type && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.type.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-sm">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            placeholder="Enter description here..."
            className="border border-slate-300 p-2 rounded-md text-sm"
            {...form.register("description")}
          />
          {form.formState.errors.description && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.description.message}
            </span>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isLoading}>
              Close
            </Button>
          </DialogClose>
          <Button type="submit" className="px-8 text-sm">
            {isLoading ? (
              <Loader2 className="animate-spin h-3 w-3 " />
            ) : (
              <span>Save Changes</span>
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default UpdateForm;
