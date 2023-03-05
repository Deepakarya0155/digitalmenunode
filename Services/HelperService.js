export const searchMenuItem = (searchText, vegNonVegFlag, response) => {
  let tempList = [];
  if (response !== undefined && response.menuItems !== undefined) {
    tempList = [];
    for (let i = 0; i < response.menuItems.length; i++) {
      let r = response.menuItems[i].items.filter(
        (it) =>
          it.title.toLowerCase().indexOf(searchText.trim().toLowerCase()) > -1
      );

      if (
        vegNonVegFlag !== undefined &&
        (vegNonVegFlag === "V" || vegNonVegFlag === "N")
      ) {
        r = r.filter((it) => it.veg === (vegNonVegFlag === "V"));
      }
      if (r.length > 0) {
        tempList.push({
          catName: response.menuItems[i].catName,
          items: [...r],
        });
      }
    }
  }
  return tempList;
};
