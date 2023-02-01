import fs from "node:fs";
import readFile from "node:readline";

const csvPath = new URL("../../../../uploads/tasks.csv", import.meta.url);

export function createTasksByCSV() {
  const stream = fs.createReadStream(csvPath);
  const rl = readFile.createInterface({
    input: stream,
  });

  let counter = 0;

  rl.on("line", async (ln) => {
    const line = ln.toString().replace("\r\n", " ");
    const [title, description] = line.split(";");
    const skipFirstLine = description === "description";

    if (!skipFirstLine) {
      setTimeout(async () => {
        await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              title,
              description,
            },
            null,
            2
          ),
        });
      }, 1000 * counter);

      counter++;
    }
  });
}

createTasksByCSV();
