import { Button } from "@mui/material";

export enum Filter {
  All = "All",
  Completed = "Completed",
  Pending = "Pending",
}

interface FilterButtonProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const FilterButton = ({ filter, setFilter }: FilterButtonProps) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => setFilter(filter)}
    >
      {filter}
    </Button>
  );
};
