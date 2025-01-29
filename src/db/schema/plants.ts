import { json, pgEnum, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { generateRandomId } from "../../lib/utils";

type IntRange = {
    from: number;
    to: number;
};

export const growthHabitEnum = pgEnum("growth_habit", ["wzniosły", "kępiasty", "płożący"]);
export const standingEnum = pgEnum("light_requirement", ["pełne słońce", "półcień", "cień"]);
export const soilTypeEnum = pgEnum("soil_type", ["piaszczysta", "gliniasta", "próchnicza"]);
export const soilPhEnum = pgEnum("soil_ph", ["kwaśne", "obojętne", "zasadowe"]);

export const PlantTable = pgTable("plants", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => generateRandomId(10)),
    name: text("name").notNull(),
    latin_name: text("latin_name").notNull(),
    common_names: text("common_names").notNull(),
    description: text("description").notNull(),
    image_url: text("image_url").notNull(),
    growth_habit: growthHabitEnum("growth_habit").notNull(),
    growth_rate: smallint("growth_rate").default(2),
    water_requirement: smallint("water_requirement").default(2),
    standing: standingEnum("standing").notNull(),
    soil_type: soilTypeEnum("soil_type").notNull(),
    soil_ph: soilPhEnum("soil_ph").notNull(),
    flower_color: text("flower_color").notNull(),
    leaf_color: text("leaf_color").notNull(),
    blooming_months: json("flowering_months").$type<IntRange>().default({ from: 4, to: 10 }),
    height: json("height").$type<IntRange>().default({ from: 25, to: 40 })
});

export type GrowthHabit = (typeof growthHabitEnum.enumValues)[number];
