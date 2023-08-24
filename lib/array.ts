export function areArraysEqual<T>(
  arr1: T[],
  arr2: T[],
  conditionFn: (item1: T, item2: T) => boolean
  ): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!conditionFn(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
}