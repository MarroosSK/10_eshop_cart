import { useEffect, useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterBySize, clearFilter } from '../../features/productsSlice';

const ProductsFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, data} = useSelector((state: RootState) => state.products);
  const [filterSize, setFilterSize] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (filterSize.length === 1) {
      dispatch(filterBySize(filterSize[0]));
    } else if (filterSize.length === 0) {
      dispatch(clearFilter());
    }
  }, [filterSize, dispatch]);

  const handleFilter = (size: string) => {
    setFilterSize([size]);
  };

  const handleClearFilter = () => {
    setFilterSize([]);
  };

  if (isLoading) {
    return <Box sx={{
      marginTop: '20rem',
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'column',
      },
      justifyContent: 'center',
    }}></Box>;
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
    }}>Error: </Box>;
  }

  // map all available sizes from products and create a set of unique sizes
  const availableSizes = Array.from(new Set(data.flatMap((product) => product.availableSizes.map(size => size.sizeSize))));

  return (
    <Grid item xs={12} md={4} sx={{ marginTop: '12rem' }}>
      <Box sx={{ width: '15rem' }}>
        <Typography variant="h6">Pick Size</Typography>
        {availableSizes.map((size) => (
          <Button
            key={size}
            variant={filterSize.includes(size) ? 'contained' : 'outlined'}
            onClick={() => handleFilter(size)}
            sx={{ margin: '0.5rem' }}
            disabled={isLoading}
          >
            {size}
          </Button>
        ))}
        {filterSize.length > 0 && (
          <Button variant="contained" onClick={handleClearFilter} sx={{ margin: '0.5rem' }} disabled={isLoading}>
            Clear Filter
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default ProductsFilter;