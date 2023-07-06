const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors")
require("dotenv").config()


const app = express();
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);


app.post("/ask", async (req, res) => {
  const {word,keyword} = req.body;

  console.log(word,keyword)

  try {
    if (word == null || keyword==null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:`Given this word ${word} generate a ${keyword} love ${word}
        it has that keyword at top and content should be down to it
        `,
        max_tokens:700,
        n:1
    });

    const completion = response.data.choices[0].text

    res.status(200).json({
      success:true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));