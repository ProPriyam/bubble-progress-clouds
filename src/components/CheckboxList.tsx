
import React from 'react';
import { Check } from 'lucide-react';

type CheckboxItemProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
};

const CheckboxItem: React.FC<CheckboxItemProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-3 py-2 transition-all duration-200 hover:bg-secondary/30 rounded-md px-2">
      <button
        type="button"
        onClick={onChange}
        className={`w-5 h-5 rounded flex items-center justify-center transition-colors duration-200 ${
          checked ? 'bg-primary text-primary-foreground' : 'bg-white/80 border border-gray-300'
        }`}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && <Check size={14} />}
      </button>
      <label 
        htmlFor={id} 
        className="text-sm font-medium cursor-pointer"
        onClick={onChange}
      >
        {label}
      </label>
    </div>
  );
};

type CheckboxListProps = {
  items: {
    id: string;
    name: string;
    completed: boolean;
  }[];
  onToggle: (id: string) => void;
  title?: string;
};

const CheckboxList: React.FC<CheckboxListProps> = ({ items, onToggle, title }) => {
  return (
    <div className="bubble-checkbox-container animate-scale-in">
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      <div className="space-y-1">
        {items.map((item) => (
          <CheckboxItem
            key={item.id}
            id={item.id}
            label={item.name}
            checked={item.completed}
            onChange={() => onToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckboxList;
