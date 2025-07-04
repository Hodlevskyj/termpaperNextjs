'use client'
import { Order, Product, Review } from "@prisma/client";
import { SafeUser } from "../../../../types";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "@/components/Heading";
import { Rating } from "@mui/material";
import { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps {
    product: Product & {
        reviews: Review[]
    }
    user: (SafeUser & {
        orders: Order[];
    }) | null
}

const AddRating = ({ product, user }: AddRatingProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0
        }
    });

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        if (data.rating === 0) {
            setIsLoading(false);
            return toast.error('No rating selected');
        }

        const ratingData = { ...data, userId: user?.id, product: product };
        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Rating submitted');
            router.refresh();
            reset();
        }).catch((err) => {
            toast.error('Something went wrong');
        }).finally(() => {
            setIsLoading(false);
        });
    };

    if (!user || !product) return null;

    const deliveredOrder = user?.orders.some(
        order => order.products.find(item => item.id === product.id) && order.deliveryStatus === 'delivered'
    );

    const userReview = product?.reviews.find((review: Review) => {
        return review.userId === user.id;
    });

    if (userReview || !deliveredOrder) return null;

    return (
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Heading title='Rate this product' />
            <Rating onChange={(event, newValue) => {
                setCustomValue('rating', newValue);
            }} />
            <CustomInput id='comment' placeholder="Comment" register={register} errors={errors} required />
            <Button onClick={handleSubmit(onSubmit)}>{isLoading ? 'Loading' : 'Rate Product'}</Button>
        </div>
    );
};

export default AddRating;
