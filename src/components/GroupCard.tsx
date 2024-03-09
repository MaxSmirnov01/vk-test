import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Typography } from '@mui/material';
import { Group } from '../store/groupListSlice';
import { useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const GroupCard = ({ group }: { group: Group }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card sx={{ width: 360, display: 'flex', flexDirection: 'column', alignItems: 'center' }} elevation={6}>
      <CardHeader
        sx={{ '& .MuiCardHeader-avatar': { marginRight: 0 } }}
        avatar={
          <Avatar
            sx={{
              bgcolor: `${group.avatar_color}`,
              height: '100px',
              width: '100px',
              // borderColor: 'black',
              // border: '1px solid',
            }}
            alt="avatar"
            aria-label="recipe"
          />
        }
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">{group.name}</Typography>
        <Typography variant="h5" component="div" color="text.secondary">
          {group.closed === true ? 'Закрытая группа' : 'Открытая группа'}
        </Typography>
        <Typography>{group.members_count > 0 ? `Количество подписчиков: ${group.members_count}` : null}</Typography>
      </CardContent>
      <CardActions>
        <Typography>Друзья</Typography>
        <IconButton onClick={handleClick}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </CardActions>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default GroupCard;
