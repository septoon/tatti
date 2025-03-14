'use client'
import * as React from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const actions = [
  { icon: <PhoneIcon />, name: 'Позвонить', url: 'tel:+79785103520' },
  { icon: <WhatsAppIcon />, name: 'WhatsApp', url: 'https://wa.me/79785103520' },
  { icon: <TelegramIcon />, name: 'Telegram', url: 'https://t.me/' },
  { icon: <FontAwesomeIcon icon={faVk} size='xl' style={{color: "#535353",}} />, name: 'Messenger', url: 'https://vk.com/tatti_shef' },
];

export default function ChatButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <SpeedDial
      ariaLabel="Чат с нами"
      sx={{ position: 'fixed', bottom: 16, right: 16, '& .MuiFab-primary': { backgroundColor: '#535353', '&:hover': { backgroundColor: '#3a3a3a' } } }}
      icon={
        <motion.div animate={{ rotate: open ? 90 : 0 }}>
          {open ? <CloseIcon /> : <ChatIcon />}
        </motion.div>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => window.open(action.url, '_blank')}
        />
      ))}
    </SpeedDial>
  );
}