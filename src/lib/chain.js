import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

const outputSchema = z.object({
  summary: z.string().min(1).describe("A concise 2-3 sentence overview of what this repository is about"),
  cool_facts: z.array(z.string()).min(3).max(5).describe("3-5 interesting or notable things about this repository")
});

export async function summarizeReadme(readmeContent) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  const parser = StructuredOutputParser.fromZodSchema(outputSchema);

  const chat = new ChatOpenAI({
    temperature: 0.7,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY
  });

  const prompt = ChatPromptTemplate.fromTemplate(`
    You are a GitHub repository analyzer. Analyze the provided README content and return a structured response.
    
    {format_instructions}
    
    README Content:
    {readme}
  `);

  const chain = RunnableSequence.from([
    {
      format_instructions: async () => parser.getFormatInstructions(),
      readme: (input) => input.readme
    },
    prompt,
    chat,
    parser
  ]);

  try {
    const result = await chain.invoke({
      readme: readmeContent
    });
    
    return result;
  } catch (error) {
    console.error('Error processing README:', error);
    throw new Error('Failed to analyze repository content: ' + error.message);
  }
} 