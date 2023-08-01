import pikachu from '@/assets/images/pikachu.png'
import Image from 'next/image'
import { Box, Button, IconButton } from '@mui/material'
import { AccountCircle, LightMode } from '@mui/icons-material'
const Header = () => {
  return (
    <header>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '15px',
        }}
      >
        <Image src={pikachu} alt={'Pikachuu~~'} width={40} height={40} />
        <Box>
          <IconButton>
            <LightMode />
          </IconButton>
          <IconButton>
            <AccountCircle />
          </IconButton>
        </Box>
      </Box>
    </header>
  )
}

export default Header
