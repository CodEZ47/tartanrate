import useSWR from "swr";
import { fetcher } from "@/utils/api";

export interface Course {
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
  extra_resources?: string;
  sylabus_url?: string;
  course_image_url?: string;
}

export default function useCourse(id?: string | string[]) {
  const shouldFetch = Boolean(id);
  const { data, error, isLoading } = useSWR<Course>(
    shouldFetch ? `/courses/${id}/` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  return {
    course: data,
    loading: isLoading,
    error,
  };
}
