const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../data');

let knowledgeBase = [];

const loadKnowledgeBase = () => {
    try {
        if (!fs.existsSync(dataDir)) {
            console.error(`[KnowledgeService] Data directory not found: ${dataDir}`);
            return;
        }

        const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.xlsx') || file.endsWith('.txt'));
        knowledgeBase = []; // Reset

        files.forEach(file => {
            const filePath = path.join(dataDir, file);

            if (file.endsWith('.xlsx')) {
                const workbook = xlsx.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const data = xlsx.utils.sheet_to_json(sheet);

                data.forEach(item => {
                    // This looks for ANY common variation of your headers
                    const q = item.Question || item.Field || item["Service Name"] || "";
                    const a = item.Answer || item.Content || item.Details || item["Details/Description"] || "";
                    const category = item.Category || "";

                    const combinedText = `${category} ${q} ${a}`.trim();

                    if (combinedText.length > 0) {
                        knowledgeBase.push({
                            question: q,
                            answer: a,
                            source: file,
                            text: combinedText.toLowerCase()
                        });
                    }
                });
            } else if (file.endsWith('.txt')) {
                const content = fs.readFileSync(filePath, 'utf-8');
                const chunks = content.split('## ').slice(1);
                chunks.forEach(chunk => {
                    const lines = chunk.split('\n');
                    const title = lines[0].trim();
                    const body = lines.slice(1).join('\n').trim();
                    knowledgeBase.push({
                        Category: "Website Content",
                        question: title,
                        answer: body,
                        source: file,
                        text: `${title} ${body}`.toLowerCase()
                    });
                });
            }
        });
        console.log(`[KnowledgeService] Loaded ${knowledgeBase.length} entries from ${files.length} files.`);
    } catch (error) {
        console.error("[KnowledgeService] Error loading files:", error);
    }
};

const searchKnowledge = (query) => {
    if (!query) return [];

    const stopWords = ['is', 'are', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'and', 'or', 'what', 'where', 'when', 'who', 'how', 'do', 'you', 'your', 'my', 'i', 'we', 'does'];

    // Tokenize and clean query
    // Split by any non-word character (punctuation, spaces, etc.)
    const keywords = query.toLowerCase()
        .split(/[^a-z0-9]+/g)
        .filter(word => !stopWords.includes(word) && word.length > 2);

    if (keywords.length === 0) return [];

    // Score entries with weights
    console.log(`[KnowledgeService] Searching for: "${query}"`);
    console.log(`[KnowledgeService] Keywords: [${keywords.join(', ')}]`);

    const scoredResults = knowledgeBase.map(item => {
        let score = 0;
        const itemText = (item.text || "").toLowerCase();
        const itemQuestion = (item.question || "").toLowerCase();

        keywords.forEach(keyword => {
            // Priority 1: Match in the 'Question' or 'Field' column (Weight: 5)
            if (itemQuestion.includes(keyword)) {
                score += 5;
            }
            // Priority 2: Match in the general text/details (Weight: 1)
            if (itemText.includes(keyword)) {
                score += 1;
            }
        });

        return { ...item, score };
    });

    // Filter results that have no matches, sort by highest score first
    const results = scoredResults
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    console.log(`[KnowledgeService] Query: "${query}" | Keywords: [${keywords}] | Matches: ${results.length}`);
    return results;
};

// Initial load
loadKnowledgeBase();

module.exports = {
    loadKnowledgeBase,
    searchKnowledge
};