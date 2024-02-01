import * as OpenApiValidator from "express-openapi-validator";

export default (options : { filePath : string, ignorePaths?: RegExp}) => {
   return OpenApiValidator.middleware({
        // apiSpec: path.join(__dirname, "./docs/swagger.json"),
        apiSpec: options.filePath,
        validateRequests: true, 
        validateResponses: {
          removeAdditional: "all",
        },
        validateFormats: "fast",
        unknownFormats: ["uuid"],
        ignorePaths: options.ignorePaths
      });
};