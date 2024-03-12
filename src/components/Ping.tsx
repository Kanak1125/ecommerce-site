import { useCartStore } from "@/state/store";
import './ping.scss';

const Ping = () => {
    const cartItems = useCartStore((set) => set.cartItems);
    console.log(cartItems);
    const totalCartQuantity = cartItems.reduce((acc, currentItem) => {
        return acc + currentItem.quantity;
    }, 0)
  return (
    <span className="absolute flex h-5 w-5 top-[-10px] right-[-10px]">
        <span className="ping-ring"></span>
        <span className="ping-data">{totalCartQuantity}</span>
    </span>
  )
}

export default Ping