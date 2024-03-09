import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupList } from '../store/groupListSlice';
import { AppDispatch, RootState } from '../store/store';
import GroupCard from './GroupCard';
import { Container } from '@mui/material';

const GroupList = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.groupList);

  console.log(data.data);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getGroupList());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <Container sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, my: 3 }}>
      {data.data && data.data.map((group) => <GroupCard key={group.id} group={group} />)}
    </Container>
  );
};

export default GroupList;
