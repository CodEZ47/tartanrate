import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import CourseForm from "@/components/CourseForm";

interface Course {
  id: number;
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

export default function EditCoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get<Course>(`/courses/${id}/`);
      setCourse(response.data);
    } catch (error) {
      console.error("Failed to fetch course data", error);
    }
  };

  if (!course) return <div>Loading...</div>;

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
