import pikachu from '@/assets/images/pikachu.png'
import Image from 'next/image'
import { Box, Button, IconButton } from '@mui/material'
import { AccountCircle, DarkMode, LightMode } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggle } from '@/store/themeSlice'
const Header = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme)
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
          <IconButton onClick={() => dispatch(toggle())}>
            {theme.isDark ? <LightMode /> : <DarkMode />}
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
