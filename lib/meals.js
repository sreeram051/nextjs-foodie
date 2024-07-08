import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs'


const db = sql('meals.db');
export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const meals = db.prepare('SELECT * FROM meals').all();
    return meals;
}

export function getMealsSlug(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}


export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instruction = xss(meal.instruction);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.title}.${extension}`;

    const stream = fs.createWriteStream(`./public/images/${fileName}`);
    const bufferedStream = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedStream), (error) => {
        if (error) {
            throw new Error('Something went wrong');
        }
    });

    meal.image = `/images/${fileName}`;
    meal.slug = meal.title; // Assuming slug is derived from title

    db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
}


