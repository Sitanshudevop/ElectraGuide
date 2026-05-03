export interface EntityResult {
  name: string;
  type: string;
  salience: number;
}

export interface SentimentResult {
  score: number;
  magnitude: number;
  label: 'positive' | 'negative' | 'neutral' | 'mixed';
}

export interface NlpAnalysisResult {
  sentiment: SentimentResult;
  entities: EntityResult[];
}

/**
 * Analyzes text using Google Cloud Natural Language API.
 * 
 * @param {string} text - The text to analyze.
 * @returns {Promise<NlpAnalysisResult>} The analysis result containing sentiment and entities.
 */
export async function analyzeWithNLP(text: string): Promise<NlpAnalysisResult> {
  const apiKey = process.env.NEXT_PUBLIC_NL_API_KEY;
  if (!apiKey) {
    throw new Error('Missing NEXT_PUBLIC_NL_API_KEY');
  }

  const document = {
    type: 'PLAIN_TEXT',
    content: text,
  };

  const [sentimentRes, entitiesRes] = await Promise.all([
    fetch(`https://language.googleapis.com/v2/documents:analyzeSentiment?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document }),
    }).then(res => res.json()),
    fetch(`https://language.googleapis.com/v2/documents:analyzeEntities?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document }),
    }).then(res => res.json()),
  ]);

  if (sentimentRes.error) {
    throw new Error(sentimentRes.error.message);
  }
  if (entitiesRes.error) {
    throw new Error(entitiesRes.error.message);
  }

  const score = sentimentRes.documentSentiment?.score || 0;
  const magnitude = sentimentRes.documentSentiment?.magnitude || 0;
  
  let label: 'positive' | 'negative' | 'neutral' | 'mixed' = 'neutral';
  if (score > 0.25) label = 'positive';
  else if (score < -0.25) label = 'negative';
  else if (magnitude > 2.0) label = 'mixed';

  return {
    sentiment: {
      score,
      magnitude,
      label,
    },
    entities: (entitiesRes.entities || []).map((e: { name: string; type: string; salience: number }) => ({
      name: e.name,
      type: e.type,
      salience: e.salience,
    })),
  };
}
