import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { setFilter } from '../store/groupListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Group } from '../types/api';

const Filters = ({ data }: { data: Group[] }) => {
  const dispatch: AppDispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.groupList);

  const colors = [...new Set(data.map((group) => group.avatar_color))];

  const handleFilterChange = (filterName: string, value: string) => {
    dispatch(setFilter({ [filterName]: value }));
  };

  return (
    <>
      <FormControl sx={{ width: '150px' }}>
        <InputLabel id="type-select-label">closed</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          autoWidth
          value={filters.closed}
          label="closed"
          onChange={(e) => handleFilterChange('closed', e.target.value)}
        >
          <MenuItem value={'all'}>all</MenuItem>
          <MenuItem value={'true'}>true</MenuItem>
          <MenuItem value={'false'}>false</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '150px' }}>
        <InputLabel id="color-select-label">color</InputLabel>
        <Select
          labelId="color-select-label"
          id="color-select"
          autoWidth
          value={filters.avatar_color}
          label="color"
          onChange={(e) => handleFilterChange('avatar_color', e.target.value)}
        >
          <MenuItem value={'all'}>all</MenuItem>
          {colors.map(
            (color) =>
              color && (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ),
          )}
        </Select>
      </FormControl>
      <FormControl sx={{ width: '150px' }}>
        <InputLabel id="friends-select-label">friends</InputLabel>
        <Select
          labelId="friends-select-label"
          id="friends-select"
          autoWidth
          value={filters.friends}
          label="friends"
          onChange={(e) => handleFilterChange('friends', e.target.value)}
        >
          <MenuItem value={'all'}>all</MenuItem>
          <MenuItem value={'yes'}>yes</MenuItem>
          <MenuItem value={'no'}>no</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Filters;
