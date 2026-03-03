
"use client";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { InputGroup, InputGroupLabel, InputGroupContent, InputGroupError
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { getCategories, InsertProducts, uploadImageToServer } from "@/lib/data/product";
import { Category, ProductRequest } from "@/lib/type/product-response";

const formSchema = z.object({
    title: z.string(),
    price: z.preprocess(
      (v) => Number(v),
      z.number().positive({ message: "Price must be a positive number" }),
    ),
    description: z.string().optional().default(""),
    categoryId: z.preprocess(
      (v) => Number(v),
      z.number().int().positive("Category is required"),
    ),
    images: z
      .custom<FileList | null>()
      .refine((files) => files && files.length > 0, "Please choose an image"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0 as unknown as number, // (input will provide string; zod preprocess fixes it)
      description: "",
      categoryId: 0 as unknown as number, // (input will provide string; zod preprocess fixes it)
      images: null,
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const files = values.images!;
      const filesArray = Array.from(files);

      // 1) upload all selected images → get URLs
      const uploaded = await Promise.all(
        filesArray.map((f) => uploadImageToServer(f))
      );
      const imageUrls = uploaded.map((u) => u.location);

      // 2) create product with these image URLs
      const payload: ProductRequest = {
        title: values.title,
        price: values.price,
        description: values.description ?? "",
        categoryId: values.categoryId,
        images: imageUrls,
      };
      const created = await InsertProducts(payload);
      console.log("Created product:", created);
      alert(JSON.stringify(created, null, 2));
      form.reset();
      setFileInputKey((current) => current + 1);
    } 
    catch (err) {
      console.error(err);
    }
  }

  function onReset() {
    form.reset();
    form.clearErrors();
    setFileInputKey((current) => current + 1);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      onReset={onReset}
      className="space-y-8 @container"
    >
      <div className="grid grid-cols-12 gap-4">
        <div key="text-0" id="text-0" className=" col-span-12 col-start-auto">
          <p className="not-first:mt-6">Product Form</p>
        </div>

        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Product Title</FieldLabel>

              <Input
                key="title"
                placeholder="Macbook pro M4"
                type="text"
                className=""
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="price"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Price</FieldLabel>

              <Input
                placeholder="200 USD"
                type="number"
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Description</FieldLabel>

              <Input
                key="description"
                placeholder="Product Description"
                type="text"
                {...field}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* <Controller
          control={form.control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Category</FieldLabel>

              <Select
                key="select-0"
                value={field.value}
                name={field.name}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full ">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {loadingCategories ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        /> */}

        <Controller
          control={form.control}
          name="categoryId"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 flex flex-col gap-2"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel>Category</FieldLabel>

              <Select
                value={String(field.value || "")}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="images"
          render={({ field, fieldState }) => (
            <Field
              className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel className="flex w-auto!">Choose Images</FieldLabel>

              <Input
                key={fileInputKey}
                type="file"
                multiple
                onChange={(e) => field.onChange(e.target.files)}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
          <FieldLabel className="hidden w-auto!">Submit</FieldLabel>

          <Button
            key="submit"
            id="submit"
            name="submit"
            className="w-full"
            type="submit"
            variant="default"
          >
            Submit
          </Button>
        </Field>
        <Field className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
          <FieldLabel className="hidden w-auto!">Reset</FieldLabel>

          <Button
            key="reset"
            id="reset"
            name="reset"
            className="w-full"
            type="reset"
            variant="outline"
          >
            Reset
          </Button>
        </Field>
      </div>
      
    </form>
  );
}
