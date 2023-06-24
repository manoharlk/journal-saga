// import { NextApiRequest, NextApiResponse } from 'next';
// import multer from 'multer';
// import { Buffer } from 'buffer';

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 1024 * 1024 }, // 1MB limit
//   fileFilter: function (req, file, cb) {
//     if (!['text/plain', 'text/csv', 'application/json'].includes(file.mimetype)) {
//       return cb(new Error('Invalid file type'), false);
//     }
//     cb(null, true);
//   },
// });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
//   upload.single('file')(req, res, function (err: any) {
//     if (err) {
//       res.status(400).send({ error: err.message });
//       return;
//     }

//     // Access the uploaded file from req.file.
//     const fileContent = (req.file.buffer as Buffer).toString();
//     console.log(fileContent);

//     res.send('File uploaded successfully');
//   });
// }
