import { useState } from "react";
import useCourses from "./useCourses";
import { Course } from "./useCourses";

export default function useCoursesManager() {
  const { courses, loading, error, mutate } = useCourses();
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const startAdding = () => {
    setEditingCourse(null);
    setFormVisible(true);
  };

  const startEditing = (course: Course) => {
    setEditingCourse(course);
    setFormVisible(true);
  };

  const finishForm = () => {
    setFormVisible(false);
    setEditingCourse(null);
    mutate();
  };

  return {
    courses,
    loading,
    error,
    isFormVisible,
    editingCourse,
    startAdding,
    startEditing,
    finishForm,
  };
}
