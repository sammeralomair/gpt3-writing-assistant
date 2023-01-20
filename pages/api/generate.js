import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: Write a conversation between ${req.body.writer} and me about ${req.body.userInput}.`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `I want to ask a book called ${req.body.writer} a question. The question I'm asking the previously mentioned book is: ${req.body.userInput}. Please give a concise TLDR at the beginning of your response, followed by a detailed answer.\n`,
    temperature: 0.85,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;