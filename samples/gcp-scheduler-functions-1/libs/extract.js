const fs = require("fs");
const path = require("path");
const targetFiles = ["package.json", "yarn.lock", "dist/index.js"];
const artifactsFolder = "__artifacts";

const projectDirs = () => {
  return fs
    .readdirSync(".", { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => name !== artifactsFolder);
};

const main = () => {
  const targetDirs = projectDirs();

  targetDirs.forEach((dir) => {
    const artifactPath = `${artifactsFolder}/${dir}`;
    fs.rm(artifactPath, () => null);
    fs.mkdirSync(artifactPath, { recursive: true });

    targetFiles.forEach((fileName) => {
      const src = `${dir}/${fileName}`;
      const dst = `${artifactPath}/${fileName}`;
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(src, dst);
    });
  });
};

main();
