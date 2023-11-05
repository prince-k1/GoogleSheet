// we manage options
let activeCell = null;
const activeCellElement = document.getElementById("activeCell");
const textAlignElements = document.getElementsByClassName("text-align");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlineButton = document.getElementById("underline");
const fontSize = document.getElementById('font-size');
const fontFamily = document.getElementById('font-family');
// const defaultOptionsState ={
//     fontFamily: '',
//     isBoldSelected: false,
//     isItalicSelected: false,
//     isUnderLineSelected: false,
//     textAlign: 'left',
//     textColor: '#000',
//     backgroundColor: '#fff',
//     fontSize: 14,
// }

let activeOptionState;

function toggleButtonStyle(button, isSelected){
    if(isSelected){
        button.classList.add('active-option');
    }
    else{
        button.classList.remove('active-option');
    }
}

function highlightOptionButton() {
  // check if the cell is in the bold state in or not
//   if (activeOptionState.isBoldSelected) {
//     // currently selected cell in the bold state
//     boldButton.classList.add("active-option");
//   } else {
//     boldButton.classList.remove("active-option");
//   }
    toggleButtonStyle(boldButton, activeOptionState.isBoldSelected);


  // check if the cell is italic or not
//   if (activeOptionState.isItalicSelected) {
//     // current text in italic
//     italicButton.classList.add("active-option");
//   } else {
//     italicButton.classList.remove("active-option");
//   }
    toggleButtonStyle(italicButton, activeOptionState.isItalicSelected);


//   if (activeOptionState.isUnderLineSelected) {
//     // the cell is underlined
//     underlineButton.classList.add("active-option");
//   } else {
//     underlineButton.classList.remove("active-option");
//   }
    toggleButtonStyle(underlineButton, activeOptionState.isUnderLineSelected);


  highlightTextAlignButtons(activeOptionState.textAlign);
  fontSize.value = activeOptionState.fontSize;
  

}

function onCellFocus(e) {
  if (activeCell && activeCell.id == e.target.id) {
    return;
  }
  activeCell = e.target;
  activeCellElement.innerText = e.target.id;
  // initialize the state of the cell
  const computedStyle = getComputedStyle(activeCell);
  activeOptionState = {
    fontFamily: computedStyle.fontFamily,
    isBoldSelected: computedStyle.fontWeight === "600",
    isItalicSelected: computedStyle.fontStyle === "italic",
    isUnderLineSelected: computedStyle.textDecoration.includes("underline"),
    textAlign: computedStyle.textAlign,
    textColor: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize,
    fontFamily: computedStyle.fontFamily,
  };
  console.log(activeOptionState.fontFamily);
  highlightOptionButton();
}

function onClickBold(boldButton) {
  // This function will be triggered when user click on bold button
  /*
       1. toggle 'active-option'
       2. get the selected cell
    */
  boldButton.classList.toggle("active-option");
  if (activeCell) {
    activeOptionState;
    if (activeOptionState.isBoldSelected === false) {
      //make the text to bold
      activeCell.style.fontWeight = "600";
    } else {
      // make the text normal
      activeCell.style.fontWeight = "400";
    }
    activeOptionState.isBoldSelected = !activeOptionState.isBoldSelected;
  }
}

function onClickItalic(italicButton) {
  /**
   * 1. toggle class name
   * 2.
   */
  italicButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionState.isItalicSelected) {
      // the text already italic
      activeCell.style.fontStyle = "normal";
    } else {
      activeCell.style.fontStyle = "italic";
    }
    activeOptionState.isItalicSelected = !activeOptionState.isItalicSelected;
  }
}

function onClickUnderline(underlinedButton) {
  underlinedButton.classList.toggle("active-option");
  if (activeCell) {
    if (activeOptionState.isUnderLineSelected) {
      //it is underlined already
      activeCell.style.textDecoration = "none";
    } else {
      activeCell.style.textDecoration = "underline";
    }
    activeOptionState.isUnderLineSelected =
      !activeOptionState.isUnderLineSelected;
  }
}

function highlightTextAlignButtons(textAlignValues) {
  // take the text align value and decides which buttn needs to be highlighted
  for (let i = 0; i < textAlignElements.length; i++) {
    if (textAlignElements[i].getAttribute("data-value") === textAlignValues) {
      textAlignElements[i].classList.add("active-option");
    } else {
      textAlignElements[i].classList.remove("active-option");
    }
  }
}

function onClickTextAlign(textAlignButton) {
  let selectedValue = textAlignButton.getAttribute("data-value");
  highlightTextAlignButtons(selectedValue);
  // we have to change the text align
  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeOptionState.textAlign = selectedValue;
  }
}

function onChangeTextColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.color = selectedColor;
    activeOptionState.color = selectedColor;
  }
}

function onChangeBackgroundColor(textColorInput) {
  let selectedColor = textColorInput.value;
  if (activeCell) {
    activeCell.style.backgroundColor = selectedColor;
    activeOptionState.backgroundColor = selectedColor;
  }
}

function changeFontSize(fontElement){
  let fontValue = fontElement.value;
  if(activeCell){
    activeCell.style.fontSize = fontValue;
    activeOptionState.fontSize = fontValue;
  }
}

function changeFontFamily(family){
      let fontFamily = family.value;
      if(activeCell){
        activeCell.style.fontFamily = fontFamily;
        activeOptionState.fontFamily = fontFamily;
      }
}
