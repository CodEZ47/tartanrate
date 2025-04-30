import AddCourseButton from "@/components/UI/AddCourseButton";
import CourseList from "@/components/CourseList";
import { Toaster } from "react-hot-toast";

export default function Home() {

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 TartanRate - Course Insights</h1>
        <AddCourseButton />
      </div>

      <CourseList />

      <Toaster />
    </div>
  );
}
