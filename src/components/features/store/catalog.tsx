import ProductList from './product-list'
import { Product } from '@/payload-types'

interface CatalogProps {
  products: Product
  // metaData: MetaData
  hidden?: boolean
}

const Catalog = ({ products, hidden }: CatalogProps) => {
  return (
    <>
      <ProductList products={products} />
    </>
  )
}

export default Catalog
