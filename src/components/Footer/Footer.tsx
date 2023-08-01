import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <footer>
      <Box
        height={60}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography textAlign={'center'} m={2}>
          © Sosedov S., 2023
        </Typography>
      </Box>
    </footer>
  )
}

export default Footer
