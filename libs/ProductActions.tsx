import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ref, getStorage, deleteObject } from 'firebase/storage';
import firebaseApp from "../libs/firebase";

interface ProductActionsProps {
    productId: string;
    inStock: boolean;
    images: string[]
}

const ProductActions = ({ productId, inStock, images }: ProductActionsProps) => {
    const router = useRouter();
    const storage = getStorage(firebaseApp);

    function handleToggleStock(id: string, inStock: boolean) {
        axios.put('/api/product', {
            id,
            inStock: !inStock
        })
            .then((res) => {
                toast.success('Product status change');
                router.refresh();
            })
            .catch((err) => {
                toast.error('Something went wrong');
                console.log(err);
            });
    }

    async function handleImageDelete(images: string[]) {
        try {
            for (const imageUrl of images) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
                console.log('Image deleted:', imageUrl);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    }

    async function handleDelete(id: string, images: string[]) {
        toast('Please wait...');
        await handleImageDelete(images);
        axios.delete(`/api/product/${id}`)
            .then((res) => {
                toast.success('Product deleted');
                router.refresh();
            })
            .catch((err) => {
                toast.error('Failed to delete product');
                console.error(err);
            });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(productId)}
                >
                    Copy product ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View product details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleToggleStock(productId, inStock)}>
                    {inStock ? "Out of stock" : "In stock"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete(productId, images)}>Delete product</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProductActions;
