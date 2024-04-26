const ffmpegStatic = require("ffmpeg-static");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegStatic);
const videoTemp = "./www/temp/";
const videoPath =
  "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4";

let videoHelper = {
  stream: () => {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath, { timeout: 432000 })
        .addOptions([
          "-profile:v baseline", // baseline profile (level 3.0) for H264 video codec
          "-level 3.0",
          "-s 640x360", // 640px width, 360px height output video dimensions
          "-start_number 0", // start the first .ts segment at index 0
          "-hls_time 10", // 10 second segment duration
          "-hls_list_size 0", // Maxmimum number of playlist entries (0 means all entries/infinite)
          "-f hls", // HLS format
        ])
        .output("./www/temp/output.m3u8")
        .on("start", function (commandLine) {
          console.log("Spawned Ffmpeg with command: " + commandLine);
          resolve();
        })
        .on("error", function (err, stdout, stderr) {
          console.log("An error occurred: " + err.message, err, stderr);
          reject();
        })
        .on("progress", function (progress) {
          console.log("Processing: " + progress.percent + "% done");
          //   if (progress.percent > 1) {
          //     resolve();
          //   }
          //   def.resolve();
        })
        .on("end", function (err, stdout, stderr) {
          console.log("Finished processing!" /*, err, stdout, stderr*/);
          resolve();
        })
        .run();
    });
  },
  getImage: () => {
    ffmpeg(videoPath)
      .format("mjpeg")
      .frames(1)
      .size("640x360")
      .saveToFile("./www/temp/frame.png")
      .toFormat("image2");
  },
};

module.exports = { videoHelper };
