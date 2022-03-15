const multer = require('multer');
const path = require('path');

const upload = (folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../uploads/${folder}/`));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const extension = file.originalname.split('.').pop();
      cb(null, `${uniqueSuffix}.${extension}`);
    }
  });
  return multer({ storage });
}


module.exports = upload;
