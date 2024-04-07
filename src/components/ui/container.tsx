interface ContainerProps{
    children:React.ReactNode;
}

const Contaner:React.FC<ContainerProps>=({children})=>{
    return(
        <div className="mx-auto w-full max-w-7xl">
            {children}
        </div>
    )
}

export default Contaner;