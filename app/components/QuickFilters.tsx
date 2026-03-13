'use client';

interface QuickFiltersProps {
  onFilterChange: (type: string, value: string) => void;
}

export default function QuickFilters({ onFilterChange }: QuickFiltersProps) {
  const filters = [
    {
      title: 'Budget Friendly',
      icon: '💰',
      options: [
        { label: 'Under $500', value: '0-500' },
        { label: 'Under $1,000', value: '0-1000' },
        { label: 'Best Value', value: 'value' },
      ],
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Popular Sizes',
      icon: '📐',
      options: [
        { label: '55" TVs', value: '55' },
        { label: '65" TVs', value: '65' },
        { label: '75"+ TVs', value: '75+' },
      ],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Panel Types',
      icon: '🎨',
      options: [
        { label: 'OLED', value: 'OLED' },
        { label: 'Mini-LED', value: 'Mini-LED' },
        { label: 'QLED', value: 'QLED' },
      ],
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Features',
      icon: '✨',
      options: [
        { label: '120Hz+', value: '120hz' },
        { label: 'HDMI 2.1', value: 'hdmi21' },
        { label: 'Bright (1500nits+)', value: 'bright' },
      ],
      color: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-2">Quick Filters</h2>
        <p className="text-gray-400 mb-6">Jump to popular categories</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filters.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-xl p-5 hover:bg-gray-750 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-white mb-3">{category.title}</h3>
              <div className="space-y-2">
                {category.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => onFilterChange(category.title, option.value)}
                    className="block w-full text-left text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 px-3 py-2 rounded-lg transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
