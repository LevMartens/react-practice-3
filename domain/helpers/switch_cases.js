export async function getNumberMarkerImage(number) {
  switch (number) {
    case 2:
      return require("../../assets/2.png");
    case 3:
      //! return require("../../assets/3b.png");
      return require("../../assets/2.png");
    case 4:
      //! return require("../../assets/4b.png");
      return require("../../assets/2b.png");
    case 5:
      //! return require("../../assets/5b.png");
      return require("../../assets/2b.png");
    case 6:
      //! return require("../../assets/6b.png");
      return require("../../assets/2b.png");
    case 7:
      //! return require("../../assets/7b.png");
      return require("../../assets/2b.png");
    case 8:
      //! return require("../../assets/8b.png");
      return require("../../assets/2b.png");
    case 9:
      //! return require("../../assets/7b.png");
      return require("../../assets/2b.png");
    case 10:
      //! return require("../../assets/8b.png");
      return require("../../assets/2b.png");

    default:
      //! return require("../../assets/10+b.png");
      return require("../../assets/2b.png");
  }
}
