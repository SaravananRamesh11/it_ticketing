import React, { useState } from 'react';
import EmployeeRegistrationForm from './addusers'; 
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Container,
  Paper,
  Grid
} from '@mui/material';
import {
  Menu as MenuIcon,
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  PieChart as PieChartIcon,
  Assignment as AssignmentIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AdminPage = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('createUser');

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { id: 'createUser', text: 'Create User', icon: <PersonAddIcon /> },
    { id: 'deleteEmployee', text: 'Delete Employee', icon: <PersonRemoveIcon /> },
    { id: 'pieChart', text: 'Pie Chart', icon: <PieChartIcon /> },
    { id: 'openTickets', text: 'Current Open Tickets', icon: <AssignmentIcon /> },
    { id: 'deleteClosedTickets', text: 'Delete Closed Tickets', icon: <DeleteIcon /> },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'createUser':
        return (
           <Paper elevation={3} sx={{ p: 3 }}>
            {/* <Typography variant="h5" gutterBottom>Create New User</Typography> */}
            <EmployeeRegistrationForm />
           </Paper>
        );
      case 'deleteEmployee':
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Delete Employee</Typography>
            {/* Add delete employee interface here */}
          </Paper>
        );
      case 'pieChart':
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Ticket Statistics</Typography>
            {/* Add pie chart component here */}
          </Paper>
        );
      case 'openTickets':
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Current Open Tickets</Typography>
            {/* Add open tickets list here */}
          </Paper>
        );
      case 'deleteClosedTickets':
        return (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Delete Closed Tickets</Typography>
            {/* Add closed tickets management interface here */}
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
                      <ListItem
          button="true"  // Changed from boolean to string
          key={item.id}
          onClick={() => setSelectedMenu(item.id)}
          selected={selectedMenu === item.id}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {renderContent()}
        </Container>
      </Main>
    </Box>
  );
};

export default AdminPage;
