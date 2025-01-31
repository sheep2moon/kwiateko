"use server";
import { FormState } from ".";

export async function onAddPlantSubmitAction(prevState: FormState, data: FormData) {
    const formData = Object.fromEntries(data);
    console.log(data);
    console.log(formData.standing);
    return { message: "Plant został dodany" };
}
