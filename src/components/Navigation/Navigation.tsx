import {AppBar, Box, Toolbar, IconButton, Stack, Typography} from '@mui/material';
import Title from '../Title/Title';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DarkMode from '../DarkMode/DarkMode';
import {Link} from "react-router-dom"
const Navigation = () => {
  return (
    <Box>
      <AppBar position="fixed" sx={{backgroundColor: "#fff", color: "#000"}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Link to={"/"}>
            <Title title="M-S"/>
          </Link>
            <Stack direction={"row"} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <DarkMode/>
                <Link to={"/cart"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <IconButton color="inherit">
                    <ShoppingCartIcon color="inherit"/>
                  </IconButton>
                <Typography variant="body2" sx={{cursor: "pointer", display: {xs: "none", sm: "block"}}}>My Cart</Typography>
                </Link>
            </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navigation