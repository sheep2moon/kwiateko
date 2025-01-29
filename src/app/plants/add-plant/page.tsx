"use client";
import { z } from "zod";
import { newPlantSchema } from "../../../zod-schemas/new-plant.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { Textarea } from "../../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { growthHabitEnum, soilPhEnum, soilTypeEnum, standingEnum } from "../../../db/schema/plants";
import { Button } from "../../../components/ui/button";
import { useActionState, useRef } from "react";
import { onAddPlantSubmitAction, FormState } from "@/app/actions";
import { Slider } from "../../../components/ui/slider";
import { polish_month_names } from "../../../lib/const";

export default function AddPlant() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState<FormState, FormData>(onAddPlantSubmitAction, { message: "" });

    const form = useForm<z.infer<typeof newPlantSchema>>({
        resolver: zodResolver(newPlantSchema),
        defaultValues: {
            name: "",
            blooming_months: [4, 10],
            height_from: 25,
            height_to: 40,
            common_names: "",
            description: "",
            image_url: "",
            growth_habit: "wzniosły",
            growth_rate: 2,
            water_requirement: 2,
            standing: "pełne słońce",
            soil_type: "piaszczysta",
            soil_ph: "kwaśne",
            flower_color: "",
            leaf_color: "",
            latin_name: "",
            ...(state?.fields ?? {})
        }
    });

    return (
        <div className="container-wrapper p-4">
            <h1 className="font-bold text-3xl">Dodawanie nowej rośliny</h1>
            <Separator className="my-4" />
            <Form {...form}>
                <form
                    action={formAction}
                    ref={formRef}
                    onSubmit={event => {
                        event.preventDefault();
                        form.handleSubmit(() => formRef.current?.submit())(event);
                    }}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-4 items-center">
                                    <FormLabel>Nazwa</FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Input {...field} placeholder="Nazwa rośliny" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="latin_name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-4 items-center">
                                    <FormLabel>Nazwa łacińska</FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Input {...field} placeholder="Nazwa łacińskie" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="flower_color"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-4 items-center">
                                    <FormLabel>Kolor kwiatów</FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Input {...field} placeholder="Kolor kwiatów" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="leaf_color"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-4 items-center">
                                    <FormLabel>Kolor liści</FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Input {...field} placeholder="Kolor liści" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="common_names"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-4 items-center">
                                    <FormLabel>Nazwy potoczne</FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Input {...field} placeholder="Nazwy roślin" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex gap-4 items-center">
                                    <FormLabel>Opis</FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Textarea {...field} placeholder="Opis rośliny" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="growth_habit"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pokrój rośliny</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                                        {growthHabitEnum.enumValues.map(value => (
                                            <FormItem key={value} className="flex gap-2 items-center">
                                                <FormControl>
                                                    <RadioGroupItem value={value} />
                                                </FormControl>
                                                <FormLabel className="capitalize">{value}</FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="standing"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preferowane stanowisko</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                                        {standingEnum.enumValues.map(value => (
                                            <FormItem key={value} className="flex gap-2 items-center">
                                                <FormControl>
                                                    <RadioGroupItem value={value} />
                                                </FormControl>
                                                <FormLabel className="capitalize">{value}</FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="soil_type"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preferowany rodzaj gleby</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                                        {soilTypeEnum.enumValues.map(value => (
                                            <FormItem key={value} className="flex gap-2 items-center">
                                                <FormControl>
                                                    <RadioGroupItem value={value} />
                                                </FormControl>
                                                <FormLabel className="capitalize">{value}</FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="soil_ph"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preferowane ph gleby</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                                        {soilPhEnum.enumValues.map(value => (
                                            <FormItem key={value} className="flex gap-2 items-center">
                                                <FormControl>
                                                    <RadioGroupItem value={value} />
                                                </FormControl>
                                                <FormLabel className="capitalize">{value}</FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-2">
                        <FormField
                            name="height_from"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wysokość od</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="Wysokość od" />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription>Podawana w cm</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="height_to"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wysokość do</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} placeholder="Wysokość do" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="blooming_months"
                        control={form.control}
                        render={({ field: { value, onChange } }) => (
                            <FormItem className="max-w-sm">
                                <div className="flex gap-4 items-center">
                                    <FormLabel>
                                        Okres kwitnienia
                                        <span className="ml-4 font-normal">
                                            {polish_month_names[value[0]]} - {polish_month_names[value[1]]}
                                        </span>{" "}
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Slider value={value} onValueChange={val => onChange(val)} min={1} max={12} minStepsBetweenThumbs={1} step={1} defaultValue={[4, 10]} />
                                </FormControl>
                                <FormDescription>Okres kwitnienia - miesiące</FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="growth_rate"
                        control={form.control}
                        render={({ field: { value, onChange } }) => (
                            <FormItem className="max-w-sm">
                                <div className="flex gap-4 items-center">
                                    <FormLabel>Siła wzrostu {value}</FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Slider value={[value]} onValueChange={val => onChange(val[0])} min={1} max={5} step={1} defaultValue={[3]} />
                                </FormControl>
                                <FormDescription>Siła wzrostu rośliny w skali 1-5</FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="water_requirement"
                        control={form.control}
                        render={({ field: { value, onChange } }) => (
                            <FormItem className="max-w-sm">
                                <div className="flex gap-4 items-center">
                                    <FormLabel>Zapotrzebowanie na wodę {value}</FormLabel>
                                    <FormMessage />
                                </div>
                                <FormControl>
                                    <Slider value={[value]} onValueChange={val => onChange(val[0])} min={1} max={5} step={1} defaultValue={[3]} />
                                </FormControl>
                                <FormDescription>Zapotrzebowanie na wodę w skali 1-5</FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Dodaj</Button>
                    <p>{state.message && state.message}</p>
                </form>
            </Form>
        </div>
    );
}
