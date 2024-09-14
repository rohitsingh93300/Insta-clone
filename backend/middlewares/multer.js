import multer from "multer";
// const upload = multer({
//     storage:multer.memoryStorage(),
// });

// Memory storage keeps the files in memory
const storage = multer.memoryStorage();


// Set up multer with memory storage, file filtering, and limits
const upload = multer({
  storage
//   fileFilter,
//   limits,
});

export default upload;