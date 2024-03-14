export const convertData = (data, type) => {
  const convertedData = data[type].map((i) => {
    return {
      date: new Date(i[0]).toLocaleDateString("en", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }),
      [type]: i[1].toFixed(2),
    };
  });
  return convertedData;
};
