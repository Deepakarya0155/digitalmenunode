const response = {
  restaurentName: "PB15",
  homeLink: "/menu/1/layout1",
  menuItems: [
    {
      catName: "Veg Non",
      items: [
        {
          title: "chicken",
          discription: "allo1",
          full: 1001,
          half: 50,
          veg: false,
        },
      ],
    },
    {
      catName: "Veg",
      items: [
        {
          title: "veg",
          discription: "allo2",
          full: 100,
          half: 501,
          veg: true,
        },
        {
          title: "veg",
          discription: "allo2",
          full: 100,
          half: 501,
          veg: true,
        },
      ],
    },
  ],
};

export default function handler(req, res) {
  console.log("api called");
  res.status(200).json(response);
}
