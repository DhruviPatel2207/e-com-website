import { Empty } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { IProduct } from '../../../types/types';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';

const ProductList = ({ productData }: { productData: IProduct[] }) => {
  return (
    <div>
      {productData.length === 0 ? (
        <Empty style={{ marginTop: '20%' }} />
      ) : (
        <div className='buyer-card-container'>
          <AnimatePresence mode='popLayout'>
            {productData.map((data) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: 'spring',
                  delay: data.id * 0.1,
                  damping: 13,
                }}
                key={data.id}
              >
                <ProductCard {...data} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ProductList;
