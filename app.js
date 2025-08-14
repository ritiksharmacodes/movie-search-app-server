import "dotenv/config";
import express from "express";
import cors from "cors";
import { buildEmbeddingText } from "./services/important functions.js";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { createClient } from '@supabase/supabase-js';

const app = express();
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(process.env.SUPABASE_URL, supabaseKey);

app.use(cors());
app.use(express.json({ limit: '100mb' }));

console.log(supabase);

app.post('/addMovie', async (req, res) => {
    try {
        const title = req.body.mainObject.original_title;
        const description = req.body.mainObject.overview;
        const credits_cast = req.body.credits.cast?.filter((cur, index) => index <= 6).map((cur) => cur.name); // only top 7 people chosen
        const directors = req.body.credits.crew?.filter((cur) => cur.known_for_department === 'Directing' && cur.job === 'Director')?.map((cur) => cur.name);
        const music_directors = req.body.credits.crew?.filter((cur) => cur.known_for_department === 'Sound' && cur.job === 'Original Music Composer')?.map((cur) => cur.name);;
        const genres = req.body.details.genres?.map((cur) => cur.name);

        // console.log(title); console.log(description); console.log(credits_cast); console.log(directors); console.log(music_directors); console.log(genres);
        // const final_string = buildEmbeddingText(title, description, genres, credits_cast, directors, music_directors);
        // console.log(final_string);

        const mainObject = req.body.mainObject;


        const { data, error } = await supabase
            .from('movies')
            .insert([
                { some_column: 'someValue', other_column: 'otherValue' },
            ])
            .select();


        console.log(mainObject);

        // const model = new HuggingFaceTransformersEmbeddings({
        //     model: "Xenova/all-MiniLM-L6-v2",
        // });

        // /* Embed queries */
        // const res = await model.embedQuery(
        //     "What would be a good company name for a company that makes colorful socks?"
        // );
        // console.log({ res });



    } catch (error) {
        console.error(error);
    }
});

app.listen(3000, () => console.log(`The server is listening on port: 3000`));





