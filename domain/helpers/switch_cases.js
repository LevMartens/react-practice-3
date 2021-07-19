export async function getNumberMarkerImage(number) {
  switch (number) {
    case 1:
      return require("../../assets/lineMarker.png");
    case 2:
      return require("../../assets/2h.png");
    case 3:
      return require("../../assets/3.png");
    case 4:
      return require("../../assets/4.png");
    case 5:
      return require("../../assets/5.png");
    case 6:
      return require("../../assets/6.png");
    case 7:
      return require("../../assets/7.png");
    case 8:
      return require("../../assets/8.png");
    case 9:
      return require("../../assets/9.png");
    case 10:
      return require("../../assets/10.png");

    default:
      return require("../../assets/10plus.png");
  }
}
