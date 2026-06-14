import { GoogleGenerativeAI } from '@google/generative-ai';
import { MockExamQuestion, StudyUnit } from '../types';

function getClient(apiKey: string) {
  return new GoogleGenerativeAI(apiKey);
}

export async function generateMockExam(
  units: StudyUnit[],
  apiKey: string
): Promise<MockExamQuestion[]> {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const unitsSummary = units
    .map(u => `- ${u.title} (Ch${u.chapter}): ${u.topics.map(t => t.title).join(', ')}`)
    .join('\n');

  const prompt = `You are a university exam paper setter for CMPG213 (Systems Analysis and Design).

Generate a 100-mark mock exam paper based on these study units:
${unitsSummary}

CRITICAL requirements:
- Study Units 7 (Use Cases), 8 (Data Modeling), and 9 (Process Modeling/DFDs) are marked "Very Important" — assign them the MOST marks (15-20 marks each)
- Study Units 4 (PERT/Gantt) and 10 (Cost-Benefit Analysis) — assign 10-15 marks each
- Remaining units (1, 2, 3, 5, 6) — 5-8 marks each
- Total must equal exactly 100 marks
- Mix question types: theory/explain (short answer), practical (draw/apply), calculation

Return ONLY valid JSON array in this exact format:
[
  {
    "id": "q1",
    "unitId": "su7",
    "question": "Full question text here. For practical questions, describe exactly what to draw or apply.",
    "marks": 10,
    "type": "practical",
    "modelAnswer": "Detailed model answer that could score full marks"
  }
]

Make questions realistic for a South African university exam. Include at least one scenario-based question for use cases, data modeling, and DFDs. Include a calculation question for cost-benefit analysis and PERT.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('AI did not return valid JSON');

  const questions = JSON.parse(jsonMatch[0]) as MockExamQuestion[];
  return questions.map((q, i) => ({ ...q, id: q.id || `q${i + 1}` }));
}

export async function gradeExamAnswers(
  questions: MockExamQuestion[],
  apiKey: string
): Promise<MockExamQuestion[]> {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const answeredQuestions = questions.filter(q => q.userAnswer && q.userAnswer.trim().length > 0);

  if (answeredQuestions.length === 0) return questions;

  const gradingPayload = answeredQuestions.map(q => ({
    id: q.id,
    question: q.question,
    marks: q.marks,
    modelAnswer: q.modelAnswer || '',
    userAnswer: q.userAnswer || '',
  }));

  const prompt = `You are a university lecturer grading a CMPG213 (Systems Analysis and Design) exam.

Grade each student answer fairly based on the model answer. Be fair but rigorous.

Questions to grade:
${JSON.stringify(gradingPayload, null, 2)}

Return ONLY valid JSON array in this exact format:
[
  {
    "id": "q1",
    "score": 8,
    "feedback": "Specific feedback: what they got right, what was missing, how to improve."
  }
]

- score must be between 0 and the question's marks value
- Give partial credit where earned
- Feedback must be specific and educational (2-3 sentences)`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('AI grading did not return valid JSON');

  const grades = JSON.parse(jsonMatch[0]) as { id: string; score: number; feedback: string }[];

  return questions.map(q => {
    const grade = grades.find(g => g.id === q.id);
    if (!grade) return q;
    return { ...q, score: grade.score, feedback: grade.feedback };
  });
}

export async function askAIQuestion(
  question: string,
  context: string,
  apiKey: string
): Promise<string> {
  const client = getClient(apiKey);
  const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are a helpful CMPG213 (Systems Analysis and Design) tutor.

Context: ${context}

Student question: ${question}

Answer concisely and clearly, as if tutoring a student who has 3 days until their exam. Focus on exam-relevant knowledge. Keep your answer under 200 words.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
