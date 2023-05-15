import multer from 'multer'
import { callNodeListener } from 'h3'

const storage = multer.diskStorage({
  // ファイルの保存先を指定
  destination: function (_, __, cb) {
    cb(null, 'upload')
  },
  // ファイル名を指定(オリジナルのファイル名を保持)
  filename: function (_, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    // 画像ファイルに制限
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, true)
    } else {
      cb(new Error('MIMEタイプが不正です'))
    }
  }
})

export default defineEventHandler(async (event) => {
  try {
    await callNodeListener(upload.single('image'), event.node.req, event.node.res)
    return { success: true }
  } catch (e) {
    return createError({
      message: e.message,
      statusCode: 422,
      statusMessage: 'Unprocessable Entity'
    })
  }
})
