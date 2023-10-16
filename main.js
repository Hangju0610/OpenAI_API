const express = require('express');
const openAI = require('openai');
require('dotenv').config();

const app = express();

const openai = new openAI({
  apiKey: process.env.OPENAI
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/chatGPT', async (req, res) => {
  console.log('입력 하나 받았다.')
  const { category, text } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature : 0.5,
    messages: [
      {
        role: 'system',
        content:
          'assistant는 user의 content를 기반으로 포트폴리오를 만들어준다. assistant는 user의 content를 HTML Body 형태의 폼으로 이쁘게 변형해준다.',
      },
      {
        role: 'system',
        content:
          '기술 스택의 경우 li 형태가 아니라 Text 형태 혹은 `Example` 형태로 출력한다.',
      },
      {
        role: 'user',
        content: text,
      }
    ]
  })
  res.json(completion.choices[0].message.content);
});

app.listen(3000, () => {
  console.log('서버 동작한다잉?');
});