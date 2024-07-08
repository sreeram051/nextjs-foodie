import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';




export const metadata = {
    title: 'All Meals',
    description: 'Delicious meals, shared by a food-loving community.',
  };

async function MealsPage() {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />
}


export default async function Meals() {
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals created <span className={classes.highlight}>by you</span></h1>
                <p>Choose your favorite recipe and cook yourself</p>
                <p className={classes.cta}>
                    <Link href='/meals/share'>Share your favorite recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<h4 className={classes.loading}>Loadig recipes...</h4>}>
                    <MealsPage />
                </Suspense>
                
            </main>
        </>
    );
}
 