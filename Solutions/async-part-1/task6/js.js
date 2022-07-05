const fs = require("fs");
const path = require("path");

async function parseDir(dirLink, history) {
    // get item list from dir
    const dirItemList = await fs.readdirSync(dirLink);

    // go over each item
    dirItemList.forEach((item) => {
        try {
            if (item.endsWith("json")) {
                const fileContent = await fs.readFileSync(dirLink + item, "utf-8");
                if (!fileContent.endsWith("decoy")) {
                    const parsedContent =  JSON.parse(fileContent);
                    if (parsedContent.clue) {
                        if (!parsedContent.clue.includes("bad")) {
                            parseDir(parsedContent.clue + "/", [...history, parsedContent.clue.replaceAll('C:\\Users\\itay-\\Desktop\\Test\\mazeGenerator/dist/', '')]);
                        }
                    } else if (parsedContent.treasure) {
                        fs.writeFileSync('map.txt', "treasure at: " + [...history, ' treasure file: ' + item]);
                        console.log("treasure at: " + [...history, ' treasure file: ' + item]);
                    } else {
                        parseDir(dirLink + item + "/", [...history, item]);
                    }
                }
            }
        } catch (err) {
            console.error('Error occured while reading directory!', err);
        }
    });
}
parseDir("mazeGenerator/dist/", []);
