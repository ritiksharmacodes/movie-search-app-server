// Build enriched text
function buildEmbeddingText(title, overview, genres, cast, directors, music) {

    // Genre → extra keyword mapping
    const GENRE_SYNONYMS = {
        Action: ["explosions", "fight scenes", "stunts"],
        Drama: ["emotional storytelling", "character-driven plot"],
        "Science Fiction": ["futuristic technology", "space travel", "aliens"],
        Romance: ["love story", "relationship", "passion"],
        Comedy: ["humor", "funny moments", "witty dialogue"],
        Horror: ["jump scares", "creepy atmosphere", "supernatural elements"]
    };

    // Add synonyms from mapping
    let extraSynonyms = [];
    for (const genre of genres) {
        if (GENRE_SYNONYMS[genre]) {
            extraSynonyms = extraSynonyms.concat(GENRE_SYNONYMS[genre]);
        }
    }

    return `${title} starring ${cast.join(", ")} — ${genres.join(", ")} about ${overview}.
        Features ${extraSynonyms.join(", ")}.
        Cast: ${cast.join(", ")}.
        Director: ${directors.join(", ")}.
        Music by ${music.join(", ")}.
        Genres: ${genres.join(", ")}.`;
}

export {
    buildEmbeddingText
};