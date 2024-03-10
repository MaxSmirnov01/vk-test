import { Avatar, Card, CardContent, CardHeader, Collapse, IconButton, Typography } from '@mui/material';
import { Group, setSelectedGroupId } from '../store/groupListSlice';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

const GroupCard = ({ group, selectedGroupId }: { group: Group; selectedGroupId: number | null }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    if (selectedGroupId === group.id) {
      dispatch(setSelectedGroupId(null));
    } else {
      dispatch(setSelectedGroupId(group.id));
    }
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '1000px' }} elevation={6}>
      <CardHeader
        sx={{
          '& .MuiCardHeader-title': { fontSize: 40 },
          '& .MuiCardHeader-subheader': { fontSize: 30 },
          '& .MuiCardHeader-avatar': { border: '1px solid', borderRadius: '50%' },
        }}
        avatar={
          <Avatar
            sx={{
              bgcolor: `${group.avatar_color}`,
              height: '100px',
              width: '100px',
            }}
            alt="avatar"
            aria-label="recipe"
          />
        }
        title={group.name}
        subheader={group.closed === true ? 'Закрытая группа' : 'Открытая группа'}
      />
      {group.members_count > 0 && (
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '&. MuiCardContent-root:last-child': { pb: 0 },
          }}
        >
          <Typography>Количество подписчиков: {group.members_count}</Typography>
          {group.friends && group.friends?.length > 0 ? (
            <>
              <Typography>Друзья: {group.friends?.length}</Typography>
              <IconButton onClick={handleClick}>
                {selectedGroupId === group.id ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </>
          ) : null}
        </CardContent>
      )}
      <Collapse in={selectedGroupId === group.id} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {group.friends?.map((friend) => `${friend.first_name} ${friend.last_name}; `)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default GroupCard;
