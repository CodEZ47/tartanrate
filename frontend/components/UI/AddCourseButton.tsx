import { useRouter } from "next/router";

export default function AddCourseButton() {
  const router = useRouter();
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={() => router.push("/courses/add")}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Add Course
      </button>
    </div>
  );
}
