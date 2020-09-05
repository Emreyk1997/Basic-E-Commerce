const filterJSON = {
  filter: [
    {
      filterName: { key: 'gender', name: 'Cinsiyet' },
      filters: [
        { key: 'male', name: 'Erkek' },
        { key: 'female', name: 'Kadın' },
      ],
    },
    {
      filterName: { key: 'size', name: 'Beden' },
      filters: [
        { key: 's', name: 'S' },
        { key: 'm', name: 'M' },
        { key: 'l', name: 'L' },
      ],
    },
    {
      filterName: { key: 'color', name: 'Renk' },
      filters: [
        { key: 'red', name: 'Kırmızı' },
        { key: 'black', name: 'Siyah' },
        { key: 'yellow', name: 'Sarı' },
        { key: 'white', name: 'Beyaz' },
        { key: 'blue', name: 'Mavi' },
      ],
    },
    {
      filterName: { key: 'price', name: 'Fiyat' },
      filters: [
        { key: '{"min": 0, "max": 100}', name: '0 - 100 TL' },
        { key: '{"min": 100, "max":200}', name: '100 - 200 TL' },
        { key: '{"min": 200, "max":500}', name: '200 - 500TL' },
      ],
    },
  ],
};
export default filterJSON;
