import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../context/CourseContext";
import { ImSpinner2 } from "react-icons/im";
import { FaPlayCircle } from "react-icons/fa";

const CourseLearn = () => {
  const { id } = useParams();
  const { getCourseWithLessons } = useContext(CourseContext);

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourseWithLessons(id);

      if (data) {
        setCourse(data);
        if (data.lessons.length > 0) {
          setCurrentLesson(data.lessons[0]);
        }
      }

      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <ImSpinner2 className="animate-spin text-5xl text-[#C586A5]" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 text-gray-600 dark:text-gray-300">
        Cours introuvable
      </div>
    );
  }

  return (
    <div className="bg-[#ffebf5] dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">

      {/* HEADER */}
      <div className="bg-[#f8f8f8] dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold">
            {course.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {course.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* VIDEO SECTION */}
          <div className="lg:col-span-2 space-y-4">

            <div className="bg-black rounded-xl overflow-hidden shadow-md">
              {currentLesson ? (
                <video
                  src={currentLesson.video}
                  controls
                  className="w-full aspect-video"
                />
              ) : (
                <div className="p-10 text-center text-white">
                  Aucune leçon disponible
                </div>
              )}
            </div>

            {currentLesson && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <h2 className="text-base md:text-lg font-semibold mb-2">
                  {currentLesson.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {currentLesson.description}
                </p>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 h-fit lg:sticky lg:top-6">

            <h2 className="font-semibold mb-3 text-sm md:text-base">
              Contenu du cours ({course.lessons.length})
            </h2>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`p-3 rounded-lg cursor-pointer transition flex items-start gap-3 text-sm
                  ${
                    currentLesson?.id === lesson.id
                      ? "bg-[#C586A5] text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <FaPlayCircle className="mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">
                      {index + 1}. {lesson.title}
                    </p>
                    <p className="text-xs opacity-70">
                      {lesson.duration} min
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearn;
