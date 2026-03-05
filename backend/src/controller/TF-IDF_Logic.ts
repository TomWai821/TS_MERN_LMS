type ScoreType = { id: string; score: number }[];
type BookCorpusType = { id: string; metadata: string }[];

// Calculate TF
const termFrequency = (term: string, doc: string[]): number =>
{
    const count = doc.filter(t => t === term).length;
    return count / doc.length;
}

// Calcuate IDF
const inverseDocumentFrequency = (term: string, docs: string[][]): number =>
{
    const numDocsWithTerm = docs.filter(doc => doc.includes(term)).length;
    return Math.log(docs.length / (1 + numDocsWithTerm));
}

// Calculate Cosine Similarity
const cosineSimilarity = (vecA: number[], vecB: number[]): number =>
{
    const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return magA && magB ? dot / (magA * magB) : 0;
}

export const calculateTFIDF = (loanCorpus: string[], allBooksCorpus: BookCorpusType, preferredGenres: string[]): ScoreType => 
{
  const userDoc = loanCorpus.join(" ").split(/\s+/);
  const docs = [userDoc, ...allBooksCorpus.map(b => b.metadata.split(/\s+/))];

  const vocab = Array.from(new Set(docs.flat()));

  const userVector = vocab.map(term => termFrequency(term, userDoc) * inverseDocumentFrequency(term, docs));

  const scores: ScoreType = allBooksCorpus.map((book, i) => 
  {
      const doc = book.metadata.split(/\s+/);
      const docVector = vocab.map(term => termFrequency(term, doc) * inverseDocumentFrequency(term, docs));
      const tfidfScore = cosineSimilarity(userVector, docVector);

      // genre similarity: 如果書籍 genre 在使用者偏好裡，加分
      const genreScore = preferredGenres.includes(book.metadata.split(/\s+/)[1]) ? 1 : 0;

      // Final score = TF-IDF + genre 加權
      const finalScore = 0.7 * tfidfScore + 0.3 * genreScore;

      return { id: book.id, score: finalScore };
    });

    return scores.sort((a, b) => b.score - a.score);
};

