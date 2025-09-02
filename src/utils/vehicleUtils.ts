/**
 * Vehicle utility functions for driving license categories
 */

export type VehicleType = {
  bg: string;
  overlay: string;
  vehicle: string;
};

/**
 * Get vehicle types based on driving license category
 */
export const getVehicleTypes = (category: string): string[] => {
  const lowerCat = category.toLowerCase();
  switch (lowerCat) {
    case 'b':
      return ['sedan', 'hatchback', 'suv'];
    case 'a':
      return ['sport', 'naked', 'touring'];
    case 'c':
      return ['medium', 'box', 'flatbed'];
    case 'd':
      return ['city', 'intercity', 'minibus'];
    case 't':
      return ['agricultural', 'construction', 'forestry'];
    default:
      return ['sedan', 'hatchback', 'suv'];
  }
};

/**
 * Get color schemes for vehicles based on category
 */
export const getVehicleColors = (category: string): VehicleType[] => {
  const lowerCat = category.toLowerCase();
  const colorSchemes: Record<string, VehicleType[]> = {
    'b': [
      { bg: 'from-gray-100 to-gray-200', overlay: 'from-gray-300 via-gray-400 to-gray-500', vehicle: 'bg-gray-600' },
      { bg: 'from-blue-100 to-blue-200', overlay: 'from-blue-300 via-blue-400 to-blue-600', vehicle: 'bg-blue-700' },
      { bg: 'from-gray-50 to-gray-100', overlay: 'from-gray-200 via-gray-300 to-gray-400', vehicle: 'bg-gray-500' }
    ],
    'a': [
      { bg: 'from-red-100 to-red-200', overlay: 'from-red-300 via-red-400 to-red-600', vehicle: 'bg-red-700' },
      { bg: 'from-orange-100 to-orange-200', overlay: 'from-orange-300 via-orange-400 to-orange-600', vehicle: 'bg-orange-700' },
      { bg: 'from-yellow-100 to-yellow-200', overlay: 'from-yellow-300 via-yellow-400 to-yellow-600', vehicle: 'bg-yellow-700' }
    ],
    'c': [
      { bg: 'from-green-100 to-green-200', overlay: 'from-green-300 via-green-400 to-green-600', vehicle: 'bg-green-700' },
      { bg: 'from-teal-100 to-teal-200', overlay: 'from-teal-300 via-teal-400 to-teal-600', vehicle: 'bg-teal-700' },
      { bg: 'from-cyan-100 to-cyan-200', overlay: 'from-cyan-300 via-cyan-400 to-cyan-600', vehicle: 'bg-cyan-700' }
    ],
    'd': [
      { bg: 'from-purple-100 to-purple-200', overlay: 'from-purple-300 via-purple-400 to-purple-600', vehicle: 'bg-purple-700' },
      { bg: 'from-indigo-100 to-indigo-200', overlay: 'from-indigo-300 via-indigo-400 to-indigo-600', vehicle: 'bg-indigo-700' },
      { bg: 'from-pink-100 to-pink-200', overlay: 'from-pink-300 via-pink-400 to-pink-600', vehicle: 'bg-pink-700' }
    ],
    't': [
      { bg: 'from-amber-100 to-amber-200', overlay: 'from-amber-300 via-amber-400 to-amber-600', vehicle: 'bg-amber-700' },
      { bg: 'from-lime-100 to-lime-200', overlay: 'from-lime-300 via-lime-400 to-lime-600', vehicle: 'bg-lime-700' },
      { bg: 'from-emerald-100 to-emerald-200', overlay: 'from-emerald-300 via-emerald-400 to-emerald-600', vehicle: 'bg-emerald-700' }
    ]
  };
  return colorSchemes[lowerCat] || colorSchemes['b'];
};

/**
 * Get rotation classes for vehicle cards
 */
export const getVehicleRotations = (): string[] => {
  return ['transform -rotate-1', 'transform rotate-1', 'transform'];
};
