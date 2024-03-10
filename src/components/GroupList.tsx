import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList } from '../store/groupListSlice';
import { AppDispatch, RootState } from '../store/store';
import GroupCard from './GroupCard';
import { Box, CircularProgress, Container } from '@mui/material';

const GroupList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, selectedGroupId, status } = useSelector((state: RootState) => state.groupList);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getGroupList());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <>
      {status === 'pending' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container component="main" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, my: 3 }}>
          {data && data.map((group) => <GroupCard key={group.id} group={group} selectedGroupId={selectedGroupId} />)}
        </Container>
      )}
    </>
  );
};

export default GroupList;
