// jumps = amount of squares next to the center square.
// Every pair of symbols is one level, so in RQJ67X 7X is level 3, J6 is level 2 and RQ is level 1.
export async function pluscodeGeneratorLevel3(pluscode, jumps) {
  var level3a = pluscode.charAt(5);
  var level3b = pluscode.charAt(4);
  var level2a = pluscode.charAt(3);
  var level2b = pluscode.charAt(2);
  var level1a = pluscode.charAt(1);
  var level1b = pluscode.charAt(0);

  var newLevel2a = level2a;
  var newLevel2b = level2b;
  var newLevel1a = level1a;
  var newLevel1b = level1b;

  var t = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "C",
    "F",
    "G",
    "H",
    "J",
    "M",
    "P",
    "Q",
    "R",
    "V",
    "W",
    "X",
  ];

  // Always add +10 when using the neverOutOfRangeArray.
  var neverOutOfRangeArray = [
    "G",
    "H",
    "J",
    "M",
    "P",
    "Q",
    "R",
    "V",
    "W",
    "X",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "C",
    "F",
    "G",
    "H",
    "J",
    "M",
    "P",
    "Q",
    "R",
    "V",
    "W",
    "X",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  // Level 1a has only 18 regions horizontally and level 1b 7 (3-9) vertically, (a levels = horizontal, b levels = vertical).
  var tForLevel1a = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "C",
    "F",
    "G",
    "H",
    "J",
    "M",
    "P",
    "Q",
    "R",
    "V",
  ];
  // Always add +10 when using the neverOutOfRangeArray.
  var neverOutOfRangeArrayForLevel1a = [
    "G",
    "H",
    "J",
    "M",
    "P",
    "Q",
    "R",
    "V",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "C",
    "F",
    "G",
    "H",
    "J",
    "M",
    "P",
    "Q",
    "R",
    "V",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  var tForLevel1b = ["3", "4", "5", "6", "7", "8", "9"];
  // Always add +10 when using the neverOutOfRangeArray.
  var neverOutOfRangeArrayForLevel1b = [
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  // ALL THE A LEVELS:

  // To prevent an index out of range error
  var useArrayTForLevel3a =
    t.indexOf(level3a) < jumps || t.indexOf(level3a) > 19 - jumps
      ? false
      : true;
  var increaseLevel2a = t.indexOf(level3a) > 19 - jumps ? true : false;

  // When useArrayT... == false, the previous level increases or decreases by 1, this means we are looking at vertical a border.
  // We only use 1 jump for the lower levels because we are measuring with 6 digits (3 levels).
  if (useArrayTForLevel3a == false) {
    var useArrayTForLevel2a =
      t.indexOf(level2a) < 1 || t.indexOf(level2a) > 18 ? false : true;

    // Checking if we need to increase or decrease level 1 as wel.
    var increaseLevel1a = t.indexOf(level2a) > 18 ? true : false;

    if (increaseLevel2a == true) {
      // Increase level2a by 1.
      var level2aIndex = t.indexOf(level2a) + 10 + 1;

      newLevel2a = neverOutOfRangeArray[level2aIndex];
    } else {
      // Decrease level2a by 1.
      var level2aIndex = t.indexOf(level2a) + 10 - 1;

      newLevel2a = neverOutOfRangeArray[level2aIndex];
    }

    // Changing level 1a
    if (useArrayTForLevel2a == false) {
      if (increaseLevel1a == true) {
        // Increase level1a by 1
        var level1aIndex = tForLevel1a.indexOf(level1a) + 8 + 1;

        newLevel1a = neverOutOfRangeArrayForLevel1a[level1aIndex];
      } else {
        // Decrease level1a by 1
        var level1aIndex = tForLevel1a.indexOf(level1a) + 8 - 1;

        newLevel1a = neverOutOfRangeArrayForLevel1a[level1aIndex];
      }
    }
  }

  // ALL THE B LEVELS:

  // To prevent an index out of range error
  var useArrayTForLevel3b =
    t.indexOf(level3b) < jumps || t.indexOf(level3b) > 19 - jumps
      ? false
      : true;
  var increaseLevel2b = t.indexOf(level3b) > 19 - jumps ? true : false;

  // When useArrayT... == false, the previous level increases or decreases by 1, this means we are looking at horizontal a border.
  // We only use 1 jump for the lower levels because we are measuring on level 3 basis, the levelbasis is based on zoom.
  if (useArrayTForLevel3b == false) {
    var useArrayTForLevel2b =
      t.indexOf(level2b) < 1 || t.indexOf(level2b) > 18 ? false : true;

    // Checking if we need to increase or decrease level 1 as wel.
    var increaseLevel1b = t.indexOf(level2b) > 18 ? true : false;

    if (increaseLevel2b == true) {
      // Increase level2b by 1.
      var level2bIndex = t.indexOf(level2b) + 10 + 1;

      newLevel2b = neverOutOfRangeArray[level2bIndex];
    } else {
      // Decrease level2b by 1.
      var level2bIndex = t.indexOf(level2b) + 10 - 1;

      newLevel2b = neverOutOfRangeArray[level2bIndex];
    }

    // Changing level 1b
    if (useArrayTForLevel2b == false) {
      if (increaseLevel1b == true) {
        // Increase level1b by 1
        var level1bIndex = tForLevel1b.indexOf(level1b) + 7 + 1;

        newLevel1b = neverOutOfRangeArrayForLevel1b[level1bIndex];
      } else {
        // Decrease level1b by 1
        var level1bIndex = tForLevel1b.indexOf(level1b) + 7 - 1;

        newLevel1b = neverOutOfRangeArrayForLevel1b[level1bIndex];
      }
    }
  }

  var pluscodesArray = [];
  var indexOfA = t.indexOf(level3a) + 10;
  var indexOfB = t.indexOf(level3b) + 10;
  var newPlusCodeBase = `${level1b}${level1a}${level2b}${level2a}`;
  var outOfRangePlusCodeBaseOnlyA = `${level1b}${newLevel1a}${level2b}${newLevel2a}`;
  var outOfRangePlusCodeBaseOnlyB = `${newLevel1b}${level1a}${newLevel2b}${level2a}`;
  var outOfRangePlusCodeBaseAandB = `${newLevel1b}${newLevel1a}${newLevel2b}${newLevel2a}`;

  for (let i = 1; i < 1 + jumps; i++) {
    var outOfRangeToTheRight = t.indexOf(level3a) > 19 - i ? true : false;
    var outOfRangeToTheLeft = t.indexOf(level3a) < i ? true : false;
    var outOfRangeUp = t.indexOf(level3b) > 19 - i ? true : false;
    var outOfRangeDown = t.indexOf(level3b) < i ? true : false;

    var left = neverOutOfRangeArray[indexOfA - i];
    var right = neverOutOfRangeArray[indexOfA + i];

    var down = neverOutOfRangeArray[indexOfB - i];
    var up = neverOutOfRangeArray[indexOfB + i];

    var newPlusCode1 =
      outOfRangeToTheLeft == true
        ? outOfRangePlusCodeBaseOnlyA.concat(`${level3b}${left}`)
        : newPlusCodeBase.concat(`${level3b}${left}`);
    var newPlusCode2 =
      outOfRangeToTheRight == true
        ? outOfRangePlusCodeBaseOnlyA.concat(`${level3b}${right}`)
        : newPlusCodeBase.concat(`${level3b}${right}`);
    var newPlusCode3 =
      outOfRangeDown == true
        ? outOfRangePlusCodeBaseOnlyB.concat(`${down}${level3a}`)
        : newPlusCodeBase.concat(`${down}${level3a}`);
    var newPlusCode4 =
      outOfRangeUp == true
        ? outOfRangePlusCodeBaseOnlyB.concat(`${up}${level3a}`)
        : newPlusCodeBase.concat(`${up}${level3a}`);

    var newPlusCode5 = newPlusCodeBase.concat(`${down}${left}`);
    var newPlusCode6 = newPlusCodeBase.concat(`${up}${right}`);
    var newPlusCode7 = newPlusCodeBase.concat(`${down}${right}`);
    var newPlusCode8 = newPlusCodeBase.concat(`${up}${left}`);

    // When a is out of range.
    if (outOfRangeToTheLeft == true) {
      newPlusCode5 = outOfRangePlusCodeBaseOnlyA.concat(`${down}${left}`);
      newPlusCode8 = outOfRangePlusCodeBaseOnlyA.concat(`${up}${left}`);
    }
    if (outOfRangeToTheRight == true) {
      newPlusCode7 = outOfRangePlusCodeBaseOnlyA.concat(`${down}${right}`);
      newPlusCode6 = outOfRangePlusCodeBaseOnlyA.concat(`${up}${right}`);
    }

    // When b is out of range.
    if (outOfRangeUp == true) {
      newPlusCode6 = outOfRangePlusCodeBaseOnlyB.concat(`${up}${right}`);
      newPlusCode8 = outOfRangePlusCodeBaseOnlyB.concat(`${up}${left}`);
    }
    if (outOfRangeDown == true) {
      newPlusCode5 = outOfRangePlusCodeBaseOnlyB.concat(`${down}${left}`);
      newPlusCode7 = outOfRangePlusCodeBaseOnlyB.concat(`${down}${right}`);
    }

    // When a and b are out of range.
    if (outOfRangeToTheLeft == true && outOfRangeDown == true) {
      newPlusCode5 = outOfRangePlusCodeBaseAandB.concat(`${down}${left}`);
    }
    if (outOfRangeToTheRight == true && outOfRangeDown == true) {
      newPlusCode7 = outOfRangePlusCodeBaseAandB.concat(`${down}${right}`);
    }
    if (outOfRangeUp == true && outOfRangeToTheRight == true) {
      newPlusCode6 = outOfRangePlusCodeBaseAandB.concat(`${up}${right}`);
    }
    if (outOfRangeToTheLeft == true && outOfRangeUp == true) {
      newPlusCode8 = outOfRangePlusCodeBaseAandB.concat(`${up}${left}`);
    }

    pluscodesArray.push(
      newPlusCode1,
      newPlusCode2,
      newPlusCode3,
      newPlusCode4,
      newPlusCode5,
      newPlusCode6,
      newPlusCode7,
      newPlusCode8
    );

    if (i > 1) {
      for (let z = 1; z < i; z++) {
        //var x = i - 1;
        var zoutOfRangeToTheRight = t.indexOf(level3a) > 19 - i ? true : false;
        var zoutOfRangeToTheLeft = t.indexOf(level3a) < i ? true : false;
        var zoutOfRangeUp = t.indexOf(level3b) > 19 - i ? true : false;
        var zoutOfRangeDown = t.indexOf(level3b) < i ? true : false;

        var zDown = neverOutOfRangeArray[indexOfB - z];
        var zUp = neverOutOfRangeArray[indexOfB + z];
        var zLeft = neverOutOfRangeArray[indexOfA - z];
        var zRight = neverOutOfRangeArray[indexOfA + z];

        var newPlusCode9 = newPlusCodeBase.concat(`${zDown}${left}`);
        var newPlusCode10 = newPlusCodeBase.concat(`${zUp}${left}`);
        var newPlusCode11 = newPlusCodeBase.concat(`${zDown}${right}`);
        var newPlusCode12 = newPlusCodeBase.concat(`${zUp}${right}`);

        var newPlusCode13 = newPlusCodeBase.concat(`${down}${zLeft}`);
        var newPlusCode14 = newPlusCodeBase.concat(`${up}${zLeft}`);
        var newPlusCode15 = newPlusCodeBase.concat(`${down}${zRight}`);
        var newPlusCode16 = newPlusCodeBase.concat(`${up}${zRight}`);

        // When a is out of range.
        if (outOfRangeToTheLeft == true) {
          newPlusCode9 = outOfRangePlusCodeBaseOnlyA.concat(`${zDown}${left}`);
          newPlusCode10 = outOfRangePlusCodeBaseOnlyA.concat(`${zUp}${left}`);
        }
        if (zoutOfRangeToTheLeft == true) {
          newPlusCode13 = outOfRangePlusCodeBaseOnlyA.concat(`${down}${zLeft}`);
          newPlusCode14 = outOfRangePlusCodeBaseOnlyA.concat(`${up}${zLeft}`);
        }
        if (outOfRangeToTheRight == true) {
          newPlusCode11 = outOfRangePlusCodeBaseOnlyA.concat(
            `${zDown}${right}`
          );
          newPlusCode12 = outOfRangePlusCodeBaseOnlyA.concat(`${zUp}${right}`);
        }
        if (zoutOfRangeToTheRight == true) {
          newPlusCode15 = outOfRangePlusCodeBaseOnlyA.concat(
            `${down}${zRight}`
          );
          newPlusCode16 = outOfRangePlusCodeBaseOnlyA.concat(`${up}${zRight}`);
        }

        // When b is out of range.
        if (outOfRangeDown == true) {
          newPlusCode13 = outOfRangePlusCodeBaseOnlyB.concat(`${down}${zLeft}`);
          newPlusCode15 = outOfRangePlusCodeBaseOnlyB.concat(
            `${down}${zRight}`
          );
        }
        if (zoutOfRangeDown == true) {
          newPlusCode9 = outOfRangePlusCodeBaseOnlyB.concat(`${zDown}${left}`);
          newPlusCode11 = outOfRangePlusCodeBaseOnlyB.concat(
            `${zDown}${right}`
          );
        }
        if (outOfRangeUp == true) {
          newPlusCode14 = outOfRangePlusCodeBaseOnlyB.concat(`${up}${zLeft}`);
          newPlusCode16 = outOfRangePlusCodeBaseOnlyB.concat(`${up}${zRight}`);
        }
        if (zoutOfRangeUp == true) {
          newPlusCode12 = outOfRangePlusCodeBaseOnlyB.concat(`${zUp}${right}`);
          newPlusCode10 = outOfRangePlusCodeBaseOnlyB.concat(`${zUp}${left}`);
        }

        // When a and b are out of range.
        if (outOfRangeToTheLeft == true && zoutOfRangeDown == true) {
          newPlusCode9 = outOfRangePlusCodeBaseAandB.concat(`${zDown}${left}`);
        }
        if (zoutOfRangeToTheLeft == true && outOfRangeDown == true) {
          newPlusCode13 = outOfRangePlusCodeBaseAandB.concat(`${down}${zLeft}`);
        }
        if (outOfRangeToTheLeft == true && zoutOfRangeUp == true) {
          newPlusCode10 = outOfRangePlusCodeBaseAandB.concat(`${zUp}${left}`);
        }
        if (zoutOfRangeToTheLeft == true && outOfRangeUp == true) {
          newPlusCode14 = outOfRangePlusCodeBaseAandB.concat(`${up}${zLeft}`);
        }

        if (outOfRangeToTheRight == true && zoutOfRangeDown == true) {
          newPlusCode11 = outOfRangePlusCodeBaseAandB.concat(
            `${zDown}${right}`
          );
        }
        if (zoutOfRangeToTheRight == true && outOfRangeDown == true) {
          newPlusCode15 = outOfRangePlusCodeBaseAandB.concat(
            `${down}${zRight}`
          );
        }
        if (outOfRangeToTheRight == true && zoutOfRangeUp == true) {
          newPlusCode12 = outOfRangePlusCodeBaseAandB.concat(`${zUp}${right}`);
        }
        if (zoutOfRangeToTheRight == true && outOfRangeUp == true) {
          newPlusCode16 = outOfRangePlusCodeBaseAandB.concat(`${up}${zRight}`);
        }

        pluscodesArray.push(
          newPlusCode9,
          newPlusCode10,
          newPlusCode11,
          newPlusCode12,
          newPlusCode13,
          newPlusCode14,
          newPlusCode15,
          newPlusCode16
        );
      }
    }
  }
  pluscodesArray.push(pluscode);

  console.log("PLUS CODES LVL 3 ARRAY LENGTH " + pluscodesArray.length);
  return pluscodesArray;
}
