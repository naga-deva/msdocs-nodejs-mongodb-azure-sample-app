/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require("axios");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
const glob = require("glob");
const YAML = require("yaml-js");
const extendify = require("extendify");

console.log("API Document sync inprogress");
const hubDocumentUrl = "https://clickilink.yaml";
const appDocumentUrl = "https://clickilink.yaml";

axios.get(appDocumentUrl)
    .then(function (response) {
        const jsonDoc = yaml.load(response.data);
        fs.writeFileSync(path.join(__dirname, "../src/docs/swagger-app.json"), JSON.stringify(jsonDoc), "utf8");
        fs.writeFileSync(path.join(__dirname, "../src/docs/swagger-app.yaml"), response.data, "utf8");
        console.log("App API Document sync completed");
        axios.get(hubDocumentUrl)
            .then(function (response) {
                const jsonDoc = yaml.load(response.data);
                fs.writeFileSync(path.join(__dirname, "../src/docs/swagger-hub.json"), JSON.stringify(jsonDoc), "utf8");
                fs.writeFileSync(path.join(__dirname, "../src/docs/swagger-hub.yaml"), response.data, "utf8");
                console.log("Hub API Document sync completed");

                glob("src/docs/swagger-app.yaml", function (er, files1) {
                    glob("src/docs/swagger-hub.yaml", function (er, files2) {
                        const files = files1.concat(files2);
                        const contents = files.map((f) => {
                            console.log(`Processing ${f} file`);
                            return YAML.load(fs.readFileSync(f).toString());
                        });
                        const extend = extendify({
                            inPlace: false,
                            isDeep: true,
                        });
                        const merged = contents.reduce(extend);
                        console.log("Generating swagger.yaml, swagger.json for API Validation");
                        fs.existsSync("src/docs") || fs.mkdirSync("src/docs");
                        fs.writeFileSync("src/docs/swagger.yaml", YAML.dump(merged));
                        let stringDocs = JSON.stringify(merged, null, 2).replace("./nova-a-user-v1.yaml", "");
                        stringDocs = stringDocs.replace("./nova-a-user-v1.yaml", "");
                        fs.writeFileSync(
                            "src/docs/swagger.json",
                            stringDocs
                        );
                        process.exit(0);
                    });
                });
            });
    });