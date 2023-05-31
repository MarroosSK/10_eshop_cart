import { Grid } from '@mui/material'
import { Products, ProductsFilter } from '../../components'

const Home = () => {
  return (
    <Grid container sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row"
        },
        justifyContent: "center",
        alignItems: {
          xs: "center",
          sm: "center",
          md: "normal"
        }
        
      }}>
        <ProductsFilter />
        <Products />
      </Grid>
  )
}

export default Home