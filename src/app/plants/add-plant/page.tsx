"use client";
import { z } from "zod";
import { newPlantSchema } from "../../../zod-schemas/new-plant.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { growthHabitEnum, soilPhEnum, soilTypeEnum, standingEnum } from "../../../db/schema/plants";
import { Button } from "../../../components/ui/button";
import { startTransition, useActionState, useRef } from "react";
import { onAddPlantSubmitAction, FormState } from "@/app/actions";
import { Slider } from "../../../components/ui/slider";
import { polish_month_names } from "../../../lib/const";
import ImageInput from "../../../components/ui/image-input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

export default function AddPlant() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState<FormState, FormData>(onAddPlantSubmitAction, { message: "" });

    const form = useForm<z.infer<typeof newPlantSchema>>({
        resolver: zodResolver(newPlantSchema),
        defaultValues: {
            name: "",
            blooming_month_from: 4,
            blooming_month_to: 10,
            height_from: 25,
            height_to: 40,
            common_names: "",
            description: "",
            slug: "",
            image_url: "",
            growth_habit: "wzniosły",
            growth_rate: 2,
            water_requirement: 2,
            standing: "pełne słońce",
            soil_type: "piaszczysta",
            soil_ph: "obojętne",
            flower_color: "",
            leaf_color: "",
            latin_name: "",
            ...(state?.fields ?? {})
        }
    });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(form.getValues());
        console.log(formRef.current?.dataset);

        form.handleSubmit(() => {
            startTransition(() => formAction(new FormData(formRef.current!)));
        })(event);
    };

    return (
        <div className="grid grid-cols-1 lg:gap-x-4 gap-y-4 lg:grid-cols-3 min-h-full p-2 lg:p-4">
            <Card className="col-span-1 w-full">
                <CardHeader>
                    <CardTitle>Zdjęcia</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full">
                        <ImageInput onFileAdd={console.log} />
                    </div>
                </CardContent>
            </Card>
            <div className="col-span-2">
                <Form {...form}>
                    <form action={formAction} ref={formRef} onSubmit={onSubmit} className="flex flex-col lg:flex-row gap-4 h-full">
                        <Card className="flex-1">
                            <CardHeader>
                                <CardTitle>Główne</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
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
                                    name="slug"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-4 items-center">
                                                <FormLabel>Slug</FormLabel>
                                                <FormMessage />
                                            </div>
                                            <FormControl>
                                                <Input {...field} placeholder="np. rozplenica-japonska" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="image_url"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex gap-4 items-center">
                                                <FormLabel>Image URL</FormLabel>
                                                <FormMessage />
                                            </div>
                                            <FormControl>
                                                <Input {...field} placeholder="..." />
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
                            </CardContent>
                        </Card>
                        <Card className="flex-1">
                            <CardHeader>
                                <CardTitle>Szczegóły</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <FormField
                                    name="growth_habit"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pokrój rośliny</FormLabel>
                                            <FormControl>
                                                <RadioGroup name={field.name} onValueChange={field.onChange} value={field.value}>
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
                                                <RadioGroup name={field.name} onValueChange={field.onChange} value={field.value}>
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
                                                <RadioGroup name={field.name} onValueChange={field.onChange} value={field.value}>
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
                                                <RadioGroup onValueChange={field.onChange} defaultValue="obojętne">
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
                                    name="blooming_month_from"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="max-w-sm">
                                            <div className="flex gap-4 items-center">
                                                <FormLabel>Okres kwitnienia od: {polish_month_names[field.value]}</FormLabel>
                                                <FormMessage />
                                            </div>
                                            <FormControl>
                                                <Slider name={field.name} onValueChange={val => field.onChange(val[0])} min={0} max={11} step={1} defaultValue={[4]} />
                                            </FormControl>
                                            <FormDescription>Kwitnie od miesiąca</FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="blooming_month_to"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="max-w-sm">
                                            <div className="flex gap-4 items-center">
                                                <FormLabel>Okres kwitnienia do: {polish_month_names[field.value]}</FormLabel>
                                                <FormMessage />
                                            </div>
                                            <FormControl>
                                                <Slider name={field.name} onValueChange={val => field.onChange(val[0])} min={0} max={11} step={1} defaultValue={[10]} />
                                            </FormControl>
                                            <FormDescription>Kwitnie do miesiąca</FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="growth_rate"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="max-w-sm">
                                            <div className="flex gap-4 items-center">
                                                <FormLabel>Siła wzrostu {field.value}</FormLabel>
                                                <FormMessage />
                                            </div>
                                            <FormControl>
                                                <Slider name={field.name} onValueChange={val => field.onChange(val[0])} min={1} max={5} step={1} defaultValue={[3]} />
                                            </FormControl>
                                            <FormDescription>Siła wzrostu rośliny w skali 1-5</FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="water_requirement"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="max-w-sm">
                                            <div className="flex gap-4 items-center">
                                                <FormLabel>Zapotrzebowanie na wodę {field.value}</FormLabel>
                                                <FormMessage />
                                            </div>
                                            <FormControl>
                                                <Slider name={field.name} value={[field.value]} onValueChange={val => field.onChange(val[0])} min={1} max={5} step={1} defaultValue={[3]} />
                                            </FormControl>
                                            <FormDescription>Zapotrzebowanie na wodę w skali 1-5</FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Button className="fixed top-1.5 right-8 z-30" type="submit">
                            Dodaj
                        </Button>
                        <p>{state.message && state.message}</p>
                    </form>
                </Form>
            </div>
        </div>
    );
}
