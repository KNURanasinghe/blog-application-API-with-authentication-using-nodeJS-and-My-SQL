const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG'), false)
    }
}

const upload =multer({storage: storage, 
    limits: { 
        fileSize: 1024 * 1024 * 10      ////file upload size is less than 10 MB
     }, 
    fileFilter: fileFilter
})


module.exports = {
    upload : upload
}