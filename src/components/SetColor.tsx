import React from 'react'
import { CartProductType, SelectedImgType } from './ProductDetails'

interface SetColorProps{
    images:SelectedImgType[],
    cartProduct:CartProductType,
    handleColorSelect:(value:SelectedImgType)=>void
}

const SetColor:React.FC<SetColorProps> = ({
    images,cartProduct,handleColorSelect
}) => {
  return (
    <div>
      
    </div>
  )
}

export default SetColor
