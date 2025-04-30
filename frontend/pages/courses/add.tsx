import CourseForm from "@/components/CourseForm";
import { useRouter } from "next/router";

export default function AddCoursePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <CourseForm
          mode="add"
          onSuccess={() => router.push("/")}
          onCancel={() => router.push("/")}
        />
      </div>
    </div>
  );
}
