import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Make sure to import or define a Textarea component

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address."),
  phone: z.string(),
  address: z.string(),
  subject: z.string(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="col-span-12 rounded-md bg-slate-50 p-1 md:col-span-8 md:p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-x-3 md:grid"
        >
          {(["name", "email", "phone", "subject"] as const).map((fieldKey) => (
            <FormField
              key={fieldKey}
              control={form.control}
              name={fieldKey}
              render={({ field }) => (
                <FormItem
                  className={`mb-3 space-y-0 ${
                    fieldKey === "name" || fieldKey === "email"
                      ? "col-span-1"
                      : "col-span-2"
                  }`}
                >
                  <FormLabel className="px-2 capitalize text-dark-blue">
                    {fieldKey}
                  </FormLabel>
                  <FormControl className="">
                    <Input
                      placeholder={fieldKey}
                      {...field}
                      className="capitalize"
                    />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-2 space-y-0">
                <FormLabel className="px-2 text-dark-blue">Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your message" {...field} />
                </FormControl>
                <FormMessage className="text-danger" />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-2 mt-3 w-full bg-primary">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="col-span-12 grid rounded-xl bg-dark-blue p-4 shadow md:col-span-4 md:items-center">
      <div className="flex flex-col gap-5 md:gap-16 md:text-center lg:p-10">
        <div className="flex items-center gap-4 md:flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-9 w-9 text-primary md:h-14 md:w-14"
          >
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
          <a
            href="mailto:janbapdx2024@gmail.com"
            className="text-sm font-bold text-slate-50 md:text-base"
          >
            janbapdx2024@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-4 md:flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-9 w-9 text-primary md:h-14 md:w-14"
          >
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clipRule="evenodd"
            />
          </svg>
          <a
            href="tel:+15037083894"
            className="text-sm font-bold text-slate-50 md:text-base"
          >
            503-708-3894
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <h1
        id="contact"
        className="my-10 text-center text-2xl font-bold uppercase text-slate-50 xl:text-5xl"
      >
        Contact Us
      </h1>
      <div className="my-5 grid grid-cols-12 gap-y-4 rounded-xl bg-slate-50 p-1">
        <ContactCard />
        <ContactForm />
      </div>
    </>
  );
}
