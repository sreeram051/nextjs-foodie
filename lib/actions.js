'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";


function isInvaildText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(formData) {
     const meal = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      image: formData.get('image'),
      instructions: formData.get('instructions'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
     };

     if(isInvaildText(meal.title) || 
     isInvaildText(meal.summary) || 
     isInvaildText(meal.image) || 
     isInvaildText(meal.instructions) || 
     isInvaildText(meal.creator) || 
     isInvaildText(meal.creator_email) ||
     !meal.creator_email.includes('@') ||
     !meal.image || meal.image.size === 0
    ) 
    {
      throw new Error('All fields are required');
     }

     await saveMeal(meal);
     revalidatePath('/meals');
     redirect('/meals');
   }