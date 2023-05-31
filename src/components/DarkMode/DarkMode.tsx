import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import {IconButton} from "@mui/material";
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../features/darkModeSlice';

const DarkMode = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state: RootState) => state.darkMode.mode === "dark");
  
    const handleDark = () => {
      dispatch(toggleDarkMode());
    };
    
  return (

        <IconButton sx={{
            marginRight: {
                xs: "0",
                sm: "50px"
            }
        }}
         onClick={handleDark}
        >
            {darkMode ? <ModeNightIcon/> : <LightModeIcon style={{color: "yellow"}}/>} 
        </IconButton>
  )
}

export default DarkMode