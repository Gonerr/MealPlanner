require("dotenv").config();

const readline = require("readline");
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const messages = [
    {
        role: "system",
        content: "Ты полезный помощник в консоли.",
    },
];

function ask() {
    rl.question("Ты: ", async (text) => {
        if (text.toLowerCase() === "exit") {
            rl.close();
            return;
        }

        messages.push({ role: "user", content: text });

        try {
            const response = await client.responses.create({
                model: "gpt-5.5",
                input: messages,
            });

            const answer = response.output_text;

            console.log("\nGPT:", answer, "\n");

            messages.push({
                role: "assistant",
                content: answer,
            });
        } catch (error) {
            console.error("Ошибка:", error.message);
        }

        ask();
    });
}

console.log("Консольный ChatGPT запущен. Напиши exit для выхода.\n");
ask();
