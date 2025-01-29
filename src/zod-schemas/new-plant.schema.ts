import { z } from "zod";
import { growthHabitEnum, soilPhEnum, soilTypeEnum, standingEnum } from "../db/schema/plants";

export const newPlantSchema = z.object({
    name: z.string().min(1, { message: "Wprowadź nazwę rośliny." }),
    latin_name: z.string().min(1, { message: "Wprowadź nazwę rośliny." }),
    common_names: z.string().min(1, { message: "Wprowadź nazwę rośliny." }),
    description: z.string().min(1, { message: "Wprowadź nazwę rośliny." }),
    image_url: z.string().min(1, { message: "Wprowadź nazwę rośliny." }),
    growth_habit: z.enum(growthHabitEnum.enumValues),
    growth_rate: z.number().min(1, { message: "Minimum 1" }).max(5, { message: "Maximum 5" }),
    water_requirement: z.number().min(1, { message: "Minimum 1" }).max(5, { message: "Maximum 5" }),
    standing: z.enum(standingEnum.enumValues),
    soil_type: z.enum(soilTypeEnum.enumValues),
    soil_ph: z.enum(soilPhEnum.enumValues),
    height_from: z.coerce.number().min(1, { message: "Minimum 1" }),
    height_to: z.coerce.number().min(1, { message: "Minimum 1" }),
    flower_color: z.string(),
    leaf_color: z.string(),
    blooming_months: z.array(z.number().min(1).max(12)).length(2).default([4, 10])
});
