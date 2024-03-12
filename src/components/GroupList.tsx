import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList } from '../store/groupListSlice';
import { AppDispatch, RootState } from '../store/store';
import GroupCard from './GroupCard';
import Filters from './Filters';
import { Box, CircularProgress, Container } from '@mui/material';

const GroupList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, filters, selectedGroupId, status, error } = useSelector((state: RootState) => state.groupList);

  // ошибку можно в какую-нибудь всплывашку вывести
  console.log(error);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getGroupList());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  const filteredGroups = useMemo(() => {
    return data.filter((group) => {
      return (
        (filters.closed === 'all' || String(group.closed) === filters.closed) &&
        (filters.avatar_color === 'all' || group.avatar_color === filters.avatar_color) &&
        (filters.friends === 'all' ||
          (filters.friends === 'yes' && group.friends) ||
          (filters.friends === 'no' && !group.friends))
      );
    });
  }, [data, filters]);

  return (
    <>
      {status === 'pending' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component="main" sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Container sx={{ display: 'flex', justifyContent: 'center', my: 3, gap: 3 }}>
            <Filters data={data} />
          </Container>
          <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, my: 3 }}>
            {data &&
              filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} selectedGroupId={selectedGroupId} />
              ))}
          </Container>
        </Box>
      )}
    </>
  );
};

export default GroupList;
