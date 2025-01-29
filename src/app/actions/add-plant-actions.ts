"use server";
import { FormState } from ".";

export async function onAddPlantSubmitAction(prevState: FormState, data: FormData) {
    const formData = Object.fromEntries(data);
    console.log(formData);
    return { message: "Plant został dodany" };
}
