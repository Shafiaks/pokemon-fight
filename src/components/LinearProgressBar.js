import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { height } from '@mui/system';

export default function LinearProgressBar({SelectedBase,RandomBase})  {
    const [progress, setProgress] = React.useState(100);
    const [buffer, setBuffer] = React.useState(10);
   
    const progressRef = React.useRef(() => {});
    React.useEffect(() => {
      progressRef.current = () => {
     
          const selectedPokStrength = (SelectedBase.Attack*SelectedBase.Speed)+( SelectedBase.Defense*SelectedBase.HP);
          const randomPokStrength =  (RandomBase.Attack*RandomBase.Speed)+(RandomBase.Defense*RandomBase.HP);
          const difference =(selectedPokStrength-randomPokStrength);
      
          //console.log("diff ",difference)
           setProgress(progress - (selectedPokStrength/1000) -(randomPokStrength/1000));
           setBuffer(progress - (difference/1000)+200);
       
      };
    });

    React.useEffect(() => {
      progressRef.current();

        // const timer = setInterval(() => {
        //   progressRef.current();
        // }, 500);

        // return () => {
        //     clearInterval(timer);
        //   };
        }, []);

  return (
    <div  className='progressBarContainer'>
       <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
      </Box>
    </div>
  )
}



