import { useSearchParams,useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import queryString from 'query-string'

interface CategoryProps{
    label:string;
    selected?:boolean
}

const Category = ({label,selected}:CategoryProps) => {
    const router = useRouter()
    const params= useSearchParams()
    const handleClick=useCallback(()=>{
        if(label=='All'){
            router.push('/')
        }else{
            let currentQuery={}

            if(params){
                currentQuery=queryString.parse(params.toString())
            }
            const updatedQuery:any={
                ...currentQuery,
                category:label
            }
            const url=queryString.stringifyUrl({
                url:'/',
                query:updatedQuery
            },{
                skipNull:true
            })

            router.push(url);
        }
    },[label,params,router])
  return (
    <div onClick={handleClick} className={`${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500' }`}>
      <div className='font-medium text-sm'>{label}</div>
    </div>
  )
}

export default Category
