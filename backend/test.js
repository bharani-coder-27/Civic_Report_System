import axios from "axios";
import fs from "fs";

async function downloadImage(imageUrl, savePath) {
  try {
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "stream", // important for binary
    });

    // Pipe the stream to file
    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log("Image downloaded successfully:", savePath);
    });
    writer.on("error", (err) => {
      console.error("Error writing file:", err);
    });
  } catch (error) {
    console.error("Error downloading image:", error.message);
  }
}

// Example usage
const imageUrl = "https://res.cloudinary.com/de9pm2ofe/image/upload/v1758092379/IMG-20250917-WA0004_epiqub.jpg";
downloadImage(imageUrl, "../Project_Media/report.jpg");
