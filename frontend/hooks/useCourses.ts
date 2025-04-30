import useSWR from "swr";
import { fetcher } from "@/utils/api";

export interface Course {
  id: number;
  course_name: string;
  professor_name: string;
  rating: number;
  difficulty: number;
  hints: string;
}

export default function useCourses() {
  const { data, error, isLoading, mutate } = useSWR<Course[]>("/courses/", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  return {
    courses: data || [],
    loading: isLoading,
    error,
    mutate,
  };
}
