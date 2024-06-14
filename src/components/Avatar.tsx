import React from 'react'
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
    src?: string | null | undefined;
}

const AvatarComponent: React.FC<AvatarProps> = ({ src }) => {
    if (src) {
        return (
            <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img src={src} alt="avatar" className="h-full w-full object-cover" />
            </div>
        );
    }
    return <RxAvatar size={40} />;
}

export default AvatarComponent;
