import natural from 'natural';

export const printError = async (error:any) => 
{
    if (error instanceof Error) 
    {
        throw new Error(error.message);
    } 
    else 
    {
        throw new Error('An unknown error occurred');
    }
}

export const lookupAndUnwind = (from:string, localField:string, foreignField:string, asField:string) => 
(
    [
        { $lookup: { from, localField, foreignField, as: asField } },
        { $unwind: { path: `$${asField}`, preserveNullAndEmptyArrays: true } }
    ]
);

type ScoreType = { id: string; score: number }[];
type BookCorpusType = { id: string; metadata: string }[];

export const calculateTFIDF = (corpus: string[], allBooksCorpus: BookCorpusType): ScoreType => 
{
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();
    const scores: ScoreType = [];

    corpus.forEach(doc => tfidf.addDocument(doc));

    allBooksCorpus.forEach(book => 
    {
        let score = 0;
        tfidf.tfidfs(book.metadata, (i, measure) => 
        {
            score += measure;
        });
        scores.push({ id: book.id, score });
    });

    return scores.sort((a, b) => b.score - a.score);
};