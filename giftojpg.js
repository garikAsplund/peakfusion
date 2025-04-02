import fs from "fs/promises"; // Use promise-based fs
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url"; // To get __dirname in ES modules

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory containing your GIF files (relative to the script location)
const INPUT_DIR = path.resolve(__dirname, "input_gifs");

// Directory where JPG files will be saved (relative to the script location)
const OUTPUT_DIR = path.resolve(__dirname, "output_jpgs");

// JPG quality setting (0-100, higher is better quality/larger file size)
const JPG_QUALITY = 90;
// --- End Configuration ---

async function convertGifsToJpg() {
  console.log(`Input directory:  ${INPUT_DIR}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`JPG Quality:      ${JPG_QUALITY}`);
  console.log("---");

  try {
    // 1. Check if input directory exists
    try {
      await fs.access(INPUT_DIR);
    } catch (err) {
      console.error(`Error: Input directory not found: ${INPUT_DIR}`);
      console.error(
        "Please create the input directory and place your GIF files inside.",
      );
      return; // Stop execution
    }

    // 2. Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // 3. Read files from input directory
    const files = await fs.readdir(INPUT_DIR);

    let gifCount = 0;
    const conversionPromises = [];

    // 4. Filter for GIF files and start conversion
    for (const file of files) {
      const inputFile = path.join(INPUT_DIR, file);
      const fileExtension = path.extname(file).toLowerCase();

      if (fileExtension === ".gif") {
        gifCount++;
        const baseName = path.basename(file, ".gif"); // Get name without extension
        const outputFile = path.join(OUTPUT_DIR, `${baseName}.jpg`);

        console.log(`Processing: ${file} -> ${path.basename(outputFile)}`);

        // Add the sharp conversion promise to the array
        conversionPromises.push(
          sharp(inputFile)
            // For animated GIFs, sharp processes the first frame by default
            // which is usually what you want for a static JPG.
            // If you needed all frames, it would be more complex.
            .jpeg({ quality: JPG_QUALITY }) // Set format and quality
            .toFile(outputFile)
            .then(() => console.log(`  ✅ Converted: ${path.basename(outputFile)}`))
            .catch((err) =>
              console.error(`  ❌ Error converting ${file}:`, err.message),
            ),
        );
      }
    }

    if (gifCount === 0) {
      console.log("No GIF files found in the input directory.");
      return;
    }

    console.log(`\nFound ${gifCount} GIF file(s). Starting conversions...`);

    // 5. Wait for all conversions to complete
    await Promise.all(conversionPromises);

    console.log("\n---");
    console.log("Conversion process finished.");
  } catch (err) {
    console.error("\n---");
    console.error("An unexpected error occurred:", err);
  }
}

// Run the conversion function
convertGifsToJpg();
