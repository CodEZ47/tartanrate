import { useForm } from "react-hook-form";
import api from "@/utils/api";
import { toast } from "react-hot-toast";
import Button from "./UI/Button";
import { useState } from "react";
import { CircleFadingArrowUp, Plus } from "lucide-react";

interface CourseFormProps {
  mode: "add" | "edit";
  initialValues?: Partial<Course>;
  onSuccess: () => void;
  onCancel: () => void;
}

interface Course {
  id?: number;
  course_name: string;
  course_code?: string;
  professor_name: string;
  rating: number;
  difficulty: number;
  hints: string;
  course_description?: string;
  course_credits?: number;
  course_prerequisites?: string;
  course_semester?: string;
  course_image_url?: string;
  sylabus_url?: string;
  extra_resources?: string;
}

export default function CourseForm({
  mode,
  initialValues,
  onSuccess,
  onCancel,
}: CourseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Course>({
    defaultValues: {
      course_name: initialValues?.course_name || "",
      course_code: initialValues?.course_code || "",
      professor_name: initialValues?.professor_name || "",
      rating: initialValues?.rating || 0,
      difficulty: initialValues?.difficulty || 0,
      hints: initialValues?.hints || "",
      course_description: initialValues?.course_description || "",
      course_credits: initialValues?.course_credits || 0,
      course_prerequisites: initialValues?.course_prerequisites || "",
      course_semester: initialValues?.course_semester || "",
      course_image_url: initialValues?.course_image_url || "",
      sylabus_url: initialValues?.sylabus_url || "",
      extra_resources: initialValues?.extra_resources || "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: Course) => {
    setIsSubmitting(true);
    try {
      if (mode === "add") {
        await api.post("/courses/", data);
        toast.success("Course added successfully!");
      } else {
        await api.put(`/courses/${initialValues?.id}/`, data);
        toast.success("Course updated successfully!");
      }
      reset();
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 mb-8 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">
        {mode === "add" ? "Add a New Course" : "Edit Course"}
      </h2>

      {/* Form fields */}
      <FormField label="Course Name" error={errors.course_name?.message}>
        <input
          {...register("course_name", { required: "Course Name is required" })}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField label="Course Code" error={errors.course_code?.message}>
        <input
          {...register("course_code", { required: "Course Code is required" })}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField label="Course Credits" error={errors.course_credits?.message}>
        <input
          type="number"
          {...register("course_credits", {
            required: "Course Credits are required",
            min: { value: 1, message: "Minimum is 1" },
            max: { value: 16, message: "Maximum is 16" },
          })}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField label="Professor Name" error={errors.professor_name?.message}>
        <input
          {...register("professor_name", {
            required: "Professor Name is required",
          })}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Rating (0-5)" error={errors.rating?.message}>
          <input
            type="number"
            {...register("rating", {
              required: "Rating is required",
              min: { value: 0, message: "Minimum is 0" },
              max: { value: 5, message: "Maximum is 5" },
            })}
            className="w-full border p-2 rounded"
          />
        </FormField>

        <FormField label="Difficulty (0-5)" error={errors.difficulty?.message}>
          <input
            type="number"
            {...register("difficulty", {
              required: "Difficulty is required",
              min: { value: 0, message: "Minimum is 0" },
              max: { value: 5, message: "Maximum is 5" },
            })}
            className="w-full border p-2 rounded"
          />
        </FormField>
      </div>

      <FormField label="Hints" error={errors.hints?.message}>
        <textarea
          {...register("hints")}
          rows={3}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField
        label="Course Description"
        error={errors.course_description?.message}
      >
        <textarea
          {...register("course_description")}
          rows={3}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField
        label="Prerequisites"
        error={errors.course_prerequisites?.message}
      >
        <input
          {...register("course_prerequisites")}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField label="Semester" error={errors.course_semester?.message}>
        <input
          {...register("course_semester")}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField label="Image URL" error={errors.course_image_url?.message}>
        <input
          {...register("course_image_url")}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField label="Syllabus URL" error={errors.sylabus_url?.message}>
        <input
          {...register("sylabus_url")}
          className="w-full border p-2 rounded"
        />
      </FormField>

      <FormField
        label="Extra Resources"
        error={errors.extra_resources?.message}
      >
        <textarea
          {...register("extra_resources")}
          rows={3}
          className="w-full border p-2 rounded"
        />
      </FormField>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <Button
          type="submit"
          text={mode === "add" ? "Add Course" : "Update Course"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          icon={
            isSubmitting ? (
              <div className="loader scale-50" />
            ) : mode === "add" ? (
              <Plus size={16} />
            ) : (
              <CircleFadingArrowUp size={16} />
            )
          }
          onClick={() => {}}
        />

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
