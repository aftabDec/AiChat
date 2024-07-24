import axios from "axios";

export const generateAIResponse = async (message, characterProfile) => {
  try {
    // Prepare the prompt for the AI model
    const prompt = `You are ${
      characterProfile.name
    }, a character with the following traits:\n\nDescription: ${
      characterProfile.description
    }\nPersonality: ${characterProfile?.personality}\nGreetings: ${
      characterProfile.greetings
    }\nTagline: ${characterProfile?.tagline}\nCatchphrases: ${
      characterProfile.catchphrases
    }\n\nUser: ${message}\n${characterProfile.name}:`;

    // Make a request to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 150,
        n: 1,
        stop: ["\n", "User:", `${characterProfile.name}:`],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract the AI's response from the API response
    const aiResponse = response.data.choices[0].text.trim();
    return aiResponse;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response");
  }
};
