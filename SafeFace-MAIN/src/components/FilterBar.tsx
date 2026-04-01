import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, sortOptions, CategoryFilter, SortOption } from "@/data/mockCommunityPosts";

interface FilterBarProps {
  selectedCategory: CategoryFilter;
  selectedSort: SortOption;
  onCategoryChange: (category: CategoryFilter) => void;
  onSortChange: (sort: SortOption) => void;
}

export const FilterBar = ({
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={selectedCategory}
        onValueChange={(value) => onCategoryChange(value as CategoryFilter)}
      >
        <SelectTrigger className="w-[140px] bg-card font-medium">
          <SelectValue placeholder="Filter By" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category === "All" ? "All Categories" : category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedSort}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="w-[180px] bg-card font-medium">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
