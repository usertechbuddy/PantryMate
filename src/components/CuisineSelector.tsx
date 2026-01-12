import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CuisineSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const cuisines = [
  "Any",
  "Italian",
  "Asian",
  "Mexican",
  "Mediterranean",
  "Indian",
  "American",
  "French",
  "Thai",
  "Middle Eastern",
];

export const CuisineSelector = ({ value, onChange }: CuisineSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select cuisine preference" />
      </SelectTrigger>
      <SelectContent>
        {cuisines.map((cuisine) => (
          <SelectItem key={cuisine} value={cuisine}>
            {cuisine}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
