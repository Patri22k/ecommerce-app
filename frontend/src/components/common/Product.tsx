import Image from "next/image";

interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function Product(props: ProductProps) {
  const { name, price, imageUrl } = props;

  return (
    <div className="flex flex-col justify-center items-center text-center text-xs w-full border rounded pt-2 gap-y-2">
      <Image
        src={imageUrl}
        alt="Product Image"
        width={100}
        height={100}
      />
      <span>{name}</span>
      <span className={"text-sm font-bold"}>{price} €</span>
      <button className={"border-t w-full py-1 font-semibold"}>To Cart</button>
    </div>
  );
}