import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface OrderActionsProps {
    orderId: string;
    deliveryStatus: string;
}

const OrderActions = ({ orderId, deliveryStatus }: OrderActionsProps) => {
    const router = useRouter();

    function handleDispatch(id: string) {
        axios.put('/api/order', {
            id,
            deliveryStatus: "dispatched"
        })
            .then((res) => {
                toast.success('Order dispatched');
                router.refresh();
            })
            .catch((err) => {
                toast.error('Something went wrong');
                console.log(err);
            });
    }

    function handleDelivery(id: string) {
        axios.put('/api/order', {
            id,
            deliveryStatus: deliveryStatus === 'delivered' ? 'pending' : 'delivered'
        })
            .then((res) => {
                toast.success(deliveryStatus === 'delivered' ? 'Order marked as pending' : 'Order delivered');
                router.refresh();
            })
            .catch((err) => {
                toast.error('Something went wrong');
                console.log(err);
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
                    onClick={() => navigator.clipboard.writeText(orderId)}
                >
                    Copy order ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <Link href={`/order/${id}`}><DropdownMenuItem>View order details</DropdownMenuItem></Link> */}
                <DropdownMenuItem onClick={()=>{router.push(`/order/${orderId}`)}}>View order details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelivery(orderId)}>
                    {deliveryStatus === 'delivered' ? "Mark as Pending" : "Mark as Delivered"}
                </DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default OrderActions;
