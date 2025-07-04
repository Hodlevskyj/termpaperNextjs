import Heading from '@/components/Heading';
import React from 'react'
import moment from 'moment'
import { Rating } from '@mui/material';
import AvatarComponent from '@/components/Avatar';
import HorizontalLine from '@/components/ui/HorizontalLine';


interface ListofRatingprops {
  product: any;
}

const ListOfRating: React.FC<ListofRatingprops> = ({ product }) => {
  if(product.reviews.length ===0) 
    return <p className='font-bold'>No comments yet</p>
  return (
      <div>
        <Heading title="Product Review" />
        <div className='text-sm mt-2'>
          {product.reviews && product.reviews.map((review: any) => {
            return <div key={review.id} className='max-w-[300px]'>
              <div className='flex gap-2 items-center'>
                <AvatarComponent src={review.user.image} />
                <div className='font-semibold'>{review?.user.name}</div>
              </div>

              <div className='mt-2'>
                <Rating value={review.rating} readOnly />
                <div className='ml-2 mt-2'>{review.comment}</div>
                <HorizontalLine />
              </div>

            </div>
          })}
        </div>
      </div>
  )
}

export default ListOfRating
