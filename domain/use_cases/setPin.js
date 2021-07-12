export default function setPin() {
  var firstPinIsSet = false;

  if (firstPinIsSet == false) {
    firstPinIsSet = true;
    //save coordinates firstpin
    return "Set Second Pin";
  } else {
    return "Done!";
  }
}
