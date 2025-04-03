import { TextField, MenuItem, Box, Select, FormControl, InputLabel } from '@mui/material';
import { useFilter } from '../context/FilterContext';

const SearchFilter = () => {
  const { 
    searchQuery, 
    setSearchQuery,
    category,
    setCategory,
    categories,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    priceRange
  } = useFilter();

  return (
    <Box sx={{ 
      p: 2,
      mb: 2,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      backgroundColor: 'background.paper',
      boxShadow: 1,
      borderRadius: 1
    }}>
      <TextField
        label="Search products"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ minWidth: 200 }}
      />

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label={`Min Price (${priceRange.min})`}
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(Math.max(priceRange.min, Number(e.target.value)))}
        InputProps={{ inputProps: { min: priceRange.min, max: priceRange.max } }}
        sx={{ width: 150 }}
      />

      <TextField
        label={`Max Price (${priceRange.max})`}
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Math.min(priceRange.max, Number(e.target.value)))}
        InputProps={{ inputProps: { min: priceRange.min, max: priceRange.max } }}
        sx={{ width: 150 }}
      />
    </Box>
  );
};

export default SearchFilter;