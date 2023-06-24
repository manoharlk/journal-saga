import { NextApiRequest, NextApiResponse } from 'next';
import multer, { Options, Multer } from 'multer';
import { Buffer } from 'buffer';

interface MulterRequest extends NextApiRequest {
  file: any;
}

const upload: Multer = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    if (!['text/plain', 'text/csv', 'application/json'].includes(file.mimetype)) {
        // @ts-ignore
      cb(new Error('Invalid file type'), false);
    } else {
      cb(null, true);
    }
  },
} as Options);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFile(req: MulterRequest, res: NextApiResponse) {
    // @ts-ignore
  upload.single('file')(req, res, (err: Error | null) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else if(req.file){
      // Access the uploaded file from req.file.
      const fileContent = (req.file.buffer as Buffer).toString('utf-8');
      console.log(fileContent);

      res.send('File uploaded successfully');
    } else {
      res.status(400).send({ error: "No file uploaded" });
    }
  });
}
