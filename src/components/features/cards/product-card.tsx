import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const ProductCard = ({ product }: any) => {
  return (
    <Card className="pt-2 space-y-4 border hover:border-black rounded-lg relative flex flex-col justify-between min-w-[300px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        {product.isUsed && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="absolute right-2 top-2 bg-blue-200 p-2 rounded-full">
                <Image
                  alt={'test Icon'}
                  src="/icons/open-box.png"
                  width={20}
                  height={20}
                  className=""
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{product.condition}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <Link href={`/boardgames/${product.id}`} className="w-full">
          {product.image && (
            <Image
              alt={product.name}
              className="mx-auto object-contain max-h-[300px] h-[300px]"
              src={product.image}
              width={300}
              height={300}
            />
          )}
        </Link>
      </CardHeader>
      <CardContent>
        <small className="font-semibold text-lg md:text-xl text-blue-600">
          {product.salePrice ? (
            <>
              <span className="line-through text-red-800 mr-2 text-sm">{product.price}</span>
              <span className="text-md">{product.price}</span>
            </>
          ) : (
            <span className="font-bold">${(product.price / 100).toFixed(2)}</span>
          )}
        </small>
        <Link href={`/boardgames/${product.id}`} className="group">
          <h3 className="font-bold text-xl line-clamp-2 group-hover:text-slate-700 mb-2">
            {product.name}
          </h3>
          <h4 className="text-sm text-wrap group-hover:opacity-80 line-clamp-7">
            {product.description}
          </h4>
        </Link>
      </CardContent>
      <CardFooter className="p-0">
        {/*<CartButton*/}
        {/*  productId={product.id}*/}
        {/*  quantity={1}*/}
        {/*  method="POST"*/}
        {/*  cookie={true}*/}
        {/*  className="hover:bg-blue-600"*/}
        {/*>*/}
        {/*  Add to Cart*/}
        {/*</CartButton>*/}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
