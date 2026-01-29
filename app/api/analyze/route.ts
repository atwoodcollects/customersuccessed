import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert Customer Success analyst. Your job is to analyze account situations, email threads, and customer interactions to provide actionable insights.

When given input about a customer account, you must:
1. Assess the overall health/risk level of the account
2. Identify specific signals (positive, negative, or neutral) from the information provided
3. Provide concrete, actionable recommendations
4. If helpful, draft a suggested follow-up message

IMPORTANT RULES:
- Only analyze information that is actually provided. NEVER make up specific details like names, dates, or events that weren't mentioned.
- If the input is too vague or lacks sufficient detail, respond with insufficient_data: true and explain what information would be helpful.
- Be direct and actionable, not generic. Tailor advice to the specific situation described.
- Health scores should be on a 0-100 scale where: 0-40 = At Risk, 41-70 = Needs Attention, 71-100 = Healthy

You must respond in valid JSON format with this structure:
{
  "insufficient_data": false,
  "health_score": 65,
  "health_status": "needs_attention",
  "summary": "One paragraph executive summary of the situation",
  "signals": [
    {"type": "negative", "text": "Description of concerning signal"},
    {"type": "positive", "text": "Description of positive signal"},
    {"type": "neutral", "text": "Description of neutral observation"}
  ],
  "recommendations": [
    "Specific action to take",
    "Another specific action"
  ],
  "draft_email": "Optional suggested email text, or null if not applicable",
  "missing_info": "What additional context would help, or null"
}

If there's not enough information to analyze, respond with:
{
  "insufficient_data": true,
  "message": "Explain what's missing and what kind of input would be helpful",
  "suggestions": ["Type of input that would help", "Another suggestion"]
}`;

export async function POST(request: NextRequest) {
  try {
    const { input, accountName, renewalDays } = await request.json();

    if (!input || input.trim().length === 0) {
      return NextResponse.json(
        { error: 'No input provided' },
        { status: 400 }
      );
    }

    const userMessage = `
Account Name: ${accountName || 'Not specified'}
Days to Renewal: ${renewalDays || 'Not specified'}

Context/Email Thread:
${input}

Please analyze this account situation and provide your assessment in JSON format.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
      system: SYSTEM_PROMPT,
    });

    const textContent = response.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text response from Claude');
    }

    // Parse the JSON response
    let analysis;
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', textContent.text);
      throw new Error('Failed to parse analysis response');
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze. Please try again.' },
      { status: 500 }
    );
  }
}
