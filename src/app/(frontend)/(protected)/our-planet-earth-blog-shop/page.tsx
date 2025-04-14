import { RedirectToSignIn } from '@/components/features/auth/redirect-to-sign-in'
import Catalog from '@/components/features/store/catalog'
import products from './dummyProducts.json'

export const metadata = {
  title: 'Our Planet Earth Shop | Our Planet Earth',
  description: 'Order Our Planet Earth merchandise through our store page',
}

const StorePage = () => {
  return (
    <div>
      {/*<RedirectToSignIn />*/}
      {/*<Catalog products={products} />*/}
    </div>
  )
}

export default StorePage
