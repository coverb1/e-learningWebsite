#Online Course Platform

 Features
View courses with details (title, description, price)
Courses structured into:
Chapters
Lectures (videos)
 Course ratings system
Enroll in courses
Educator dashboard
Student enrollment tracking
Authentication (using clerk)
Responsive UI

Project Structure
Course Data Structure

Each course contains:
{
  "_id": "unique-id",
  "courseTitle": "Course name",
  "courseDescription": "HTML description",
  "coursePrice": 49.99,
  "discount": 20,
  "isPublished": true,
  "courseThumbnail": "image-url",
  "educator": "educator-id",
  "enrolledStudents": [],
  "courseRatings": [],
  "createdAt": "date",
  "updatedAt": "date",
  "__v": 0
}

Course Content Structure
Each course contains chapters, and each chapter contains lectures:

"courseContent": [
  {
    "chapterId": "chapter1",
    "chapterTitle": "Chapter Name",
    "chapterOrder": 1,
    "chapterContent": [
      {
        "lectureId": "lecture1",
        "lectureTitle": "Lecture Name",
        "lectureDuration": 10,
        "lectureUrl": "video-link",
        "isPreviewFree": true,
        "lectureOrder": 1
      }
    ]
  }
]

Ratings Structure
"courseRatings": [
  {
    "userId": "user_id",
    "rating": 5
  }
]

Enrolled Students
"enrolledStudents": [
  "user_id_1",
  "user_id_2"
]

Educator Data
{
  "_id": "educator_id",
  "name": "Educator Name",
  "email": "email@example.com",
  "imageUrl": "profile-image-url"
}
