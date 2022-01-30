const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}.${file.mimetype.split('/')[1]}`);
  },
});
const upload = multer({ storage });

const uploadSingle = (name) => upload.single(name);
const uploadArray = (name, maxCount) => upload.array(name, maxCount);

module.exports = {
  uploadSingle,
  uploadArray,
};
