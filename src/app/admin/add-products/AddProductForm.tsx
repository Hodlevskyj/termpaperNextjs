"use client"

import Heading from "@/components/Heading";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/utils/categories";
import CategoryCard from "@/components/CategoryCard";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import firebaseApp from "../../../../libs/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ImageFile {
  file: File;
  name: string;
}

export type ImageType = {
  images: File[];
}
export type UploadedImageType = {
  image: FileList;
}

interface SelectedImageProps {
  item?: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const AddProductForm = () => {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    brand: z.string().min(1, "Brand is required"),
    price: z.string().min(0, "Price must be a positive number"),
    inStock: z.boolean(),
    // images: z.array(
    //   z.object({
    //     file: z.instanceof(File),
    //     name: z.string(),
    //   })
    // ),
    images: z.array(z.string()),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
    // resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    }
  });

  const [file, setFile] = useState<File | null>(null);


  useEffect(() => {
    setCustomValue('images', images);
  }, [images]);

  useEffect(() => {
    reset();
    setImages(null);
    setIsProductCreated(false);
  }, [isProductCreated]);



  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const selectedImages: ImageFile[] = files.map((file) => ({
      file: file,
      name: file.name,
    }));

    const invalidImages = selectedImages.filter(
      (image) => !["image/jpeg", "image/png"].includes(image.file.type)
    );

    if (invalidImages.length > 0) {
      alert("Дозволяються тільки файли з розширенням .jpg або .png.");
      return;
    }

    const previousImages = watch("images") as ImageFile[];
    const allImages = previousImages.concat(selectedImages);
    setValue("images", allImages);

    console.log("Імена зображень:", allImages.map((image) => image.name));
  };

  const handleImageRemoval = (imageName: string) => {
    const updatedImages = (watch("images") as ImageFile[]).filter((image) => image.name !== imageName);
    setValue("images", updatedImages);

    console.log("Імена зображень:", updatedImages.map((image) => image.name));
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value]
      }
      return [...prev, value];
    })
  }, []);

 



  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product Data->>> ", data); 

    setIsLoading(true);
    let uploadedImages: string[] = []; 

    if (!data.category) {
      setIsLoading(false);
      return toast.error('Category is not selected');
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error('No selected image');
    }

    const handleImageUploads = async () => {
      toast('Creating product, please wait...');

      try {
        for (const item of data.images) {
          const imageFile = item.file; 

          const fileName = new Date().getTime() + '-' + imageFile.name;
          const storage = getStorage(firebaseApp);
          const storageRef = ref(storage, `products/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);

          await new Promise<void>((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },
              (error) => {
                console.log("Error uploading image ", error);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  uploadedImages.push(downloadURL); 
                  console.log('File available at', downloadURL);
                  resolve();
                }).catch((error) => {
                  console.log("Error getting the download URL ", error);
                  reject(error);
                });
              }
            );
          });
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads ", error);
        return toast.error("Error handling image uploads");
      }
    };

    await handleImageUploads();

    const productData = { ...data, images: uploadedImages }; 
    console.log("ProductData ", productData);

    axios.post('/api/product', productData).then(() => {
      toast.success('Product created');
      setIsProductCreated(true);
      router.refresh();
    }).catch((error) => {
      toast.error("Something went wrong", error);
    }).finally(() => {
      setIsLoading(false);
    });
  };


  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <Card className="mx-auto max-w-sm w-96">
        <CardHeader>
          <CardTitle className="text-xl">Add Product</CardTitle>
          <CardDescription>
            Enter your information to create a product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter product name"
                {...register("name")}
                className={errors.name ? "border-rose-400" : ""}
              />
              {errors.name && <p className="text-rose-400">{(errors.name.message as string)}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register("description")} placeholder="Type your description here." />
              {errors.description && <p className="text-rose-400">{(errors.description.message as string)}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                {...register("brand")}
                className={errors.password ? "border-rose-400" : ""}
              />
              {errors.password && <p className="text-rose-400">{(errors.password.message as string)}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="brand">Price</Label>
              <Input
                id="price"
                type="number"
                {...register("price")}
                className={errors.price ? "border-rose-400" : ""}
              />
              {errors.price && <p className="text-rose-400">{(errors.price.message as string)}</p>}
            </div>
            <div className="flex items-center space-x-2">
              {/* <Checkbox id="inStock" {...register("inStock")} /> */}
              <input type="checkbox" id="inStock" {...register("inStock")} />
              <label
                htmlFor="inStock"
                className={errors.inStock ? "border-rose-400" : ""}
              >
                In Stock
              </label>
              {errors.inStock && <p className="text-rose-400">{(errors.inStock.message as string)}</p>}
            </div>
            <div className="w-full font-medium">
              <div className="mb-2 font-semibold">Select a category</div>
              <div className="grid grid-cols-2 md:grid:cols-3 gap-3 max-h[50vh] overflow-y-auto">
                {categories.map((item) => {
                  if (item.label === "All") return null;
                  return (
                    <div key={item.label} className="col-span">
                      <CategoryCard
                        onClick={(category) => setCustomValue("category", category)}
                        selected={category === item.label}
                        label={item.label}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="images">Зображення (.jpg або .png)</Label>
              <Input
                id="images"
                type="file"
                accept=".jpg,.png"
                multiple
                onChange={handleImageSelection}
                className={errors.images ? "border-rose-400" : ""}
              />
              {errors.images && <p className="text-rose-400">{errors.images.message as string}</p>}
            </div>
            <ul>
              {(watch("images") || []).map((image: any) => (
                <li key={image.name}>
                  <span>{image.name}</span>
                  <Button type="button" onClick={() => handleImageRemoval(image.name)}>Видалити</Button>
                </li>
              ))}
            </ul>
            <Button type="submit"
              className="w-full"
              onClick={handleSubmit(onSubmit)}>
              Add product
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default AddProductForm;
