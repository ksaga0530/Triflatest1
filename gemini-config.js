
const GEMINI_API_KEY = "AIzaSyAKFFyvFF_wlr86Jzi93hc91U4_my446Ys";
const GEMINI_API_URL = "<https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent>";

async function generateQuiz(keywords) {
  const prompt = `
    以下の3つのキーワードから単語帳用の問題を5問作成してください。
    問題形式: 問題キーワード(1つまたは2つ)をヒントに、答えキーワード(1つ)を推測させる形式
    キーワード: ${keywords.join(', ')}

    出力形式は以下のJSON形式でお願いします:
    {
      "questions": [
        {
          "hints": ["ヒントキーワード1", "ヒントキーワード2(オプション)"],
          "answer": "答えキーワード"
        },
        ...
      ]
    }
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    return JSON.parse(textResponse.trim());
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}

export { generateQuiz };
