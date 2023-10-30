import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function BowlerInfoForm() {
  // Define an enum for Gender, to match your server-side enum
  enum Gender {
    M = "M",
    F = "F",
  }

  // Create the Zod schema
  const BowlerFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(64, "Name is too long"),
    gender: z.nativeEnum(Gender),
    average: z.number().min(0, "Average must be positive"),
    is_senior: z.boolean().default(false),
    is_vet: z.boolean().default(false),
    is_in_all_events: z.boolean().default(false),
    is_in_senior_all_events: z.boolean().default(false),
  });

  // Type for convenience
  type BowlerFormType = z.infer<typeof BowlerFormSchema>;

  const form = useForm<BowlerFormType>({
    resolver: zodResolver(BowlerFormSchema),
    defaultValues: {
      name: "",
      gender: "",
      average: 0,
      is_senior: false,
      is_vet: false,
      is_in_all_events: false,
      is_in_senior_all_events: false,
    },
  });

  function onSubmit(values: BowlerFormType) {
    values.average = Number(values.average);
    console.log(values);
  }

  const watchedValues = form.watch();

  function testLog() {
    watchedValues.average = Number(watchedValues.average);
    console.log("Test Log:", watchedValues);
  }
  return (
    <>
      <Form {...form} className="">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid h-12 grid-cols-[1fr_2fr] items-center">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="average"
            render={({ field }) => (
              <FormItem className="grid h-12 grid-cols-[1fr_2fr] items-center">
                <FormLabel className="">Average</FormLabel>
                <FormControl>
                  <Input placeholder="" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="grid h-12 grid-cols-[1fr_2fr] items-center">
                <FormLabel className="">Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-5"
                  >
                    <FormItem className="flex items-center gap-1">
                      <FormControl>
                        <RadioGroupItem value="M" id="male" />
                      </FormControl>
                      <FormLabel htmlFor="male">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-1">
                      <FormControl>
                        <RadioGroupItem value="F" id="female" />
                      </FormControl>
                      <FormLabel htmlFor="female">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="grid grid-cols-2 grid-rows-[3rem_3rem] place-items-center justify-items-start">
            <FormField
              control={form.control}
              name="is_vet"
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse items-center gap-2">
                  <FormLabel htmlFor="vet" className="">
                    JANBA Vet
                  </FormLabel>
                  <FormControl>
                    <input type="checkbox" id="vet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="is_senior"
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse items-center gap-2">
                  <FormLabel htmlFor="senior" className="">
                    Senior
                  </FormLabel>
                  <FormControl>
                    <input type="checkbox" id="senior" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="is_in_all_events"
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse items-center gap-2">
                  <FormLabel htmlFor="all_events" className="">
                    All Events
                  </FormLabel>
                  <FormControl>
                    <input type="checkbox" id="all_events" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="is_in_senior_all_events"
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse items-center gap-2">
                  <FormLabel htmlFor="senior_all_events" className="">
                    Senior All Events
                  </FormLabel>
                  <FormControl>
                    <input
                      type="checkbox"
                      id="senior_all_events"
                      className=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={testLog}>
            Test Log
          </Button>
        </form>
      </Form>
    </>
  );
}
