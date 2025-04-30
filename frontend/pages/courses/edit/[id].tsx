import { useRouter } from "next/router";
import useCourse from "@/hooks/useCourse";
import CourseForm from "@/components/CourseForm";

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const { course, loading, error } = useCourse(id);

  if (loading) return <div>Loading...</div>;
  if (error || !course) return <div>Failed to load course data.</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <CourseForm
          mode="edit"
          initialValues={course}
          onSuccess={() => router.push("/")}
          onCancel={() => router.push("/")}
        />
      </div>
    </div>
  );
}
