import cors from "cors";

const corsOptions = {
  origin: "*",
};

const c = () : any => cors(corsOptions);
export default c;
