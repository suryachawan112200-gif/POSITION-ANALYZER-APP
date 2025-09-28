export const calculatePositionMetrics = (positions) => {
    // Example function to calculate average position
    const total = positions.reduce((acc, pos) => acc + pos.value, 0);
    return total / positions.length;
};

export const filterPositionsByCriteria = (positions, criteria) => {
    // Example function to filter positions based on a given criteria
    return positions.filter(pos => pos.type === criteria);
};