import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';

type SearchInputProps = {
  placeholder: string;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const { placeholder, onChange, onKeyDown } = props;

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        maxWidth: '70vw',
        justifyContent: 'flex-start',
        direction: 'column',
        alignSelf: 'flex-start',
      }}
    >
      <TextField
        sx={{
          fontSize: '14px',
          '& fieldset': {
            borderRadius: 8,
          },
          input: {
            color: 'primary.main',
          },
          backgroundColor: 'white',
          borderRadius: 8,
        }}
        fullWidth
        id="input-with-icon-textfield"
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => onKeyDown(event)}
      />
    </Box>
  );
};

export default SearchInput;
