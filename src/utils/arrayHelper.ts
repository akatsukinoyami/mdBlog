export default {
  deleteElement<T>(array: T[], index: number): T[] {
    // Guard clause to ensure index is within bounds
    if (index < 0 || index >= array.length) {
        throw new Error("Index out of bounds");
    }

    // Create a copy of the array to avoid mutating the original array
    const newArray = [...array];
    
    // Remove the element at the specified index
    newArray.splice(index, 1);

    return newArray;
  },

  moveElement<T>(array: T[], index: number, direction: -1 | 1): T[] {
    // Guard clauses to ensure index is within bounds
    if (index < 0 || index >= array.length) {
      throw new Error("Index out of bounds");
    }

    // Determine the target index based on the direction
    let targetIndex = index + direction;

    // Ensure target index is within bounds
    if (targetIndex < 0 || targetIndex >= array.length) {
      return array; // Return original array if movement is out of bounds
    }

    // Swap the elements at index and targetIndex
    [array[index], array[targetIndex]] = [array[targetIndex], array[index]];

    return array;
  }
}