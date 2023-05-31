import  { useEffect } from 'react';
import { Box,  Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { ProductType } from '../../types/types';
import { fetchProducts} from '../../features/productsSlice';
import Title from '../Title/Title';
import ProductItems from './ProductItems';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data, filteredData, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Box sx={{
      marginTop: '20rem',
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'column',
      },
      justifyContent: 'center',
    }}>Loading...</Box>;
  }

  if (error) {
    return <Box sx={{
      marginTop: '5rem',
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'column',
      },
      justifyContent: 'center',
    }}>{error}</Box>;
  }

  return (
    <Grid item xs={12} md={8} sx={{ marginTop: '5rem', display: 'flex', flexDirection: { xs: 'column', sm: 'column' }, justifyContent: 'center' }}>
      <Title title="Products" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          flexWrap: 'wrap',
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((product: ProductType) => <ProductItems key={product.id} singleProduct={product} />)
        ) : (
          <Box         sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            flexWrap: 'wrap',
          }}>
            {data.map((product: ProductType) => (
              <ProductItems key={product.id} singleProduct={product} />
            ))}
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default Products;
