'use client';

import QuickFilters from './QuickFilters';

export default function QuickFiltersWrapper() {
  return (
    <QuickFilters 
      onFilterChange={(type, value) => {
        // This will be handled client-side via URL params or state
        console.log('Filter:', type, value);
      }} 
    />
  );
}
