# Smart Attendance System

A Flask web app that takes classroom attendance with face recognition. An admin enrolls students
by uploading reference photos for each class. A teacher then uploads classroom photos, and the app
marks each enrolled student present or absent and exports the result as an Excel sheet.

**Stack:** Python · Flask · OpenCV · face_recognition (dlib) · openpyxl · MySQL

## How it works

1. **Login.** Users are checked against a MySQL `users` table, and admins and teachers get different pages.
2. **Enrollment (admin).** Create a folder per class (e.g. `CSE-A`) and upload one photo per student,
   named after the student. `PhotoCaturing.py` can capture these photos from a webcam.
3. **Attendance (teacher).** Upload classroom photos and start attendance for a class and subject.
   Face encodings for the class are computed once and cached as CSV. Faces in the classroom photos
   are then matched against them.
4. **Report.** An `attendance_excel_<CLASS>_<SUBJECT>.xlsx` sheet is generated with present/absent
   status and attendance percentages, and can be downloaded from the app.

## Running locally

```bash
pip install -r requirements.txt   # face_recognition needs CMake and a C++ toolchain for dlib
export MYSQL_PASSWORD=...         # password for the MySQL user configured in app.py
python app.py                     # http://localhost:5000
```

The app expects a MySQL database with a `users(username, password, is_admin)` table, where
`is_admin` is `'Y'` for admins.

> [!IMPORTANT]
> The storage paths in `app.py` and `PhotoCaturing.py` are hard-coded for the original Windows
> machine (`C:/Users/HP/Desktop/FRS/...`). Point them at local folders before running.

## Data and privacy

Enrollment photos, cached face encodings and generated attendance sheets contain personal and
biometric data. They were removed from this repository and its history during the migration, so
you need to provide your own enrollment photos.
