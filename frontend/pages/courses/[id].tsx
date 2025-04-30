import { useRouter } from "next/router";
import useCourse from "@/hooks/useCourse";
import Image from "next/image";
import Button from "@/components/UI/Button";
import {
  ChevronLeft,
  FilePenLine,
  Star,
  BookOpen,
  Calendar,
  Link as LinkIcon,
  Users,
  FileText,
  BookType,
  GraduationCap,
  FileQuestion,
} from "lucide-react";

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { course, loading, error } = useCourse(id);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>Failed to load course details.</div>;
  if (!course) return <div>No course found.</div>;

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={20}
        className={index < count ? "text-yellow-500" : "text-gray-300"}
        fill={index < count ? "currentColor" : "none"}
      />
    ));
  };

  const renderGauge = (value: number) => {
    const percent = (value / 5) * 100;
    let gaugeColor = "bg-green-500";
    if (value >= 4) gaugeColor = "bg-red-500";
    else if (value >= 3) gaugeColor = "bg-orange-400";
    else if (value >= 2) gaugeColor = "bg-yellow-400";

    return (
      <div className="w-full max-w-xs h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${gaugeColor}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        {/* Course Image */}
        {course.course_image_url && (
          <div className="mb-6 flex justify-center">
            <Image
              src={course.course_image_url}
              alt={course.course_name}
              width={600}
              height={400}
              className="rounded-lg shadow-md object-cover max-w-full h-auto"
              priority={false}
            />
          </div>
        )}

        {/* Course Title */}
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          <BookOpen className="mr-2" />
          {course.course_name}
        </h1>

        <div className="flex flex-row mt-6 mb-6 justify-between">
          {/* Professor */}
          <p className="text-gray-600 mb-2 flex items-center">
            <Users className="mr-2" />
            <strong>Professor:</strong>&nbsp;{course.professor_name}
          </p>

          {/* Course Code */}
          {course.course_code && (
            <p className="text-gray-600 mb-2 flex items-center">
              <BookType className="mr-2" />
              <strong>Course Code:</strong>&nbsp;{course.course_code}
            </p>
          )}
        </div>

        {/* Rating and Difficulty */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <strong>Rating:</strong>
            {renderStars(course.rating)}
          </div>
          <div className="flex items-center space-x-2">
            <strong>Difficulty:</strong>
            {renderGauge(course.difficulty)}
          </div>
        </div>

        {/* Description */}
        {course.course_description && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <FileText className="mr-2" />
              Description
            </h2>
            <p>{course.course_description}</p>
          </div>
        )}

        {/* Hints */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FileQuestion className="mr-2" />
            Hints
          </h2>
          <p>{course.hints}</p>
        </div>

        {/* Other Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {course.course_credits && (
            <p className="text-gray-600 flex items-center">
              <GraduationCap className="mr-2" />
              <strong>Credits:</strong>&nbsp;{course.course_credits}
            </p>
          )}
          {course.course_prerequisites && (
            <p className="text-gray-600 flex items-center">
              <FileText className="mr-2" />
              <strong>Prerequisites:</strong>&nbsp;{course.course_prerequisites}
            </p>
          )}
          {course.course_semester && (
            <p className="text-gray-600 flex items-center">
              <Calendar className="mr-2" />
              <strong>Semester:</strong>&nbsp;{course.course_semester}
            </p>
          )}
        </div>

        {/* Resources */}
        <div className="mt-6">
          {course.extra_resources && course.extra_resources.trim() !== "" && (
            <div className="mb-2">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <LinkIcon className="mr-2" />
                Extra Resources
              </h2>
              {course.extra_resources
                .split(/\n|,/) // support newline or comma-separated
                .map((url, i) => (
                  <a
                    key={i}
                    href={url.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline block"
                  >
                    {url.trim()}
                  </a>
                ))}
            </div>
          )}

          {course.sylabus_url && (
            <a
              href={course.sylabus_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center"
            >
              <LinkIcon className="mr-2" />
              Syllabus
            </a>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between items-center">
          <Button
            onClick={() => router.push(`/courses/edit/${course.id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 rounded transition"
            text="Edit Course"
            icon={<FilePenLine size={16} />}
          />
          <Button
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded transition"
            text="Back to Courses"
            icon={<ChevronLeft size={16} />}
          />
        </div>
      </div>
    </div>
  );
}
