import asyncHandler from 'express-async-handler';
import Clipping from '../models/clippingModel.js';

const download = asyncHandler(async (req, res, next) => {
  /* 
  get clippingId from url 
  '/6303a431ec4a82e725031237.docx'.replace('/','').split('.')[0] => '6303a431ec4a82e725031237'
 */
  const clippingId = req.path.replace('/', '').split('.')[0];
  try {
    const clipping = await Clipping.findById(clippingId);

    if (clipping) {
      res.header({
        'Content-Type': 'application/octet-stream; charset=utf-8',
        'Content-Disposition': `attachment; filename=${clipping.originalFilename}; filename*=${clipping.originalFilename}`,
      });
    } else {
      res.status(404);
      throw new Error('Download file not found');
    }
  } catch (err) {
    console.error('Error: ', err);
    res.status(400);
    throw new Error('Download failed');
  }

  next();
});

export { download };
