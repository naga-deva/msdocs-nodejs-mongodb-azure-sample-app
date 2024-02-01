// logger.ts
import morgan from 'morgan';
import { Request, Response } from 'express';

const customColors = {
  info: '\x1b[36m',  // Cyan
  success: '\x1b[32m',  // Green
  error: '\x1b[31m',  // Red
  warn: '\x1b[33m',  // Yellow
  magenta: '\x1b[35m', // Magenta
  blue: '\x1b[34m',
};
let morganLogger;
let apiDetails 
morgan.token('colorStatus', (req: Request, res: Response) => {
  const status = res.statusCode;

  return status >= 400    
    ? customColors.error + status + '\x1b[0m'
    : status >= 300
    ? customColors.info + status + '\x1b[0m'
    : customColors.success + status + '\x1b[0m';
});

morgan.token('colorMethod', (req: Request) => {
  return customColors.magenta + req.method + '\x1b[0m';
});

morgan.token('url', (req: Request,res) => {
  return customColors.warn + req.url + '\x1b[0m';
});
morgan.token('date', (req, res, tz) => { 

  const currentDate = new Date();

  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

  return formattedDate;
});

morgan.token('apiDetails', (req, res, tz) => {
  const status = res.statusCode;
  const apiDetails= status >= 400    
  ? customColors.error + "ERROR" + '\x1b[0m'
  : status >= 300
  ? customColors.warn + "INFO" + '\x1b[0m'
  : customColors.success + "INFO" + '\x1b[0m';
  

  return apiDetails;
});
morgan.token('req-body', (req:any) => JSON.stringify(req.body));

if (process.env.NODE_ENV !== "production") {
   morganLogger = morgan(':date[web] :apiDetails: :colorMethod :url :colorStatus \x1B[30m @\x1b[34m:response-time ms\x1b[33m - content-length : :res[content-length] :req-body \x1b[0m');
}
else{
  morganLogger = morgan("combined");
}
export default morganLogger;