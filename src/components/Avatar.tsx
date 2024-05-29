import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
    src?: string | null | undefined;
}

const AvatarComponent: React.FC<AvatarProps> = ({ src }) => {
    if (src) {
        return(
        <Avatar>
            <AvatarImage src={src} alt="avatar" />
        </Avatar>
    )}
    return (
        <RxAvatar size={40} />
    )
}

export default AvatarComponent
