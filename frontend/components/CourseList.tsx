import { useState } from "react";
import useCoursesManager from "@/hooks/useCoursesManager";
import useCourses from "@/hooks/useCourses";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Button from "./UI/Button";
import api from "../utils/api";
import {
  BookOpenText,
  Eye,
  Gauge,
  GraduationCap,
  Star,
  Trash2,
  Search,
} from "lucide-react";

export default function CourseList() {
  const { courses, loading, error } = useCoursesManager();
  const router = useRouter();
  const { mutate } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterRating, setFilterRating] = useState(0);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this course?");
    if (!confirm) return;

    try {
      await api.delete(`/courses/${id}/`);
      toast.success("Course deleted successfully!");
      mutate();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete course.");
    }
  };

  const filteredCourses = courses
    .filter(course => course.course_name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(course => filterRating === 0 || course.rating >= filterRating)
    .sort((a, b) => {
      if (sortBy === "name") return a.course_name.localeCompare(b.course_name);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  if (error) return <div>Failed to load courses.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Available Courses</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          <div>
            <select
              onChange={(e) => setFilterRating(Number(e.target.value))}
              className="text-sm px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="0">All Ratings</option>
              <option value="1">Rating 1+</option>
              <option value="2">Rating 2+</option>
              <option value="3">Rating 3+</option>
              <option value="4">Rating 4+</option>
              <option value="5">Rating 5</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="loader"></div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Course Name
                  <BookOpenText size={16} className="ml-2" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Professor
                  <GraduationCap size={16} className="ml-2" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Rating
                  <Star size={16} className="ml-2" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Difficulty
                  <Gauge size={16} className="ml-2" />
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredCourses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {course.course_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {course.professor_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {course.rating}/5
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {course.difficulty}/5
                </td>
                <td className="px-6 py-4 text-right space-x-2 flex">
                  <Button
                    onClick={() => router.push(`/courses/${course.id}`)}
                    text="View"
                    icon={<Eye size={16} />}
                  />
                  <Button
                    onClick={() => handleDelete(course.id)}
                    text="Delete"
                    icon={<Trash2 size={16} />}
                    className="bg-red-500 hover:bg-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
