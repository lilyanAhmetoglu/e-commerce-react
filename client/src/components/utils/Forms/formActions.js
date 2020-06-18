export const validate = (element, formdata = []) => {
  // if we don't have formdata the formdata will be empty
  let error = [true, ""]; // secind value it is gonna be the error message

  if (element.validation.email) {
    const valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      element.value
    );
    const message = `${!valid ? "Must be a valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.required) {
    const valid = element.value.trim() !== ""; // if not empty we will return true
    const message = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const update = (element, formdata, formname) => {
  const newFormdata = {
    ...formdata,
  }; // i don't want to change the original argument
  const newElement = {
    ...newFormdata[element.id],
  };
  newElement.value = element.event.target.value;
  if (element.blur) {
    // if blur is true means the user entered something and went outside or click on it and went outside
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }
  newElement.touched = element.blur;
  newFormdata[element.id] = newElement;
  return newFormdata;
};

export const generateData = (formdata, formname) => {
  let dataToSubmit = {};

  for (let key in formdata) {
    dataToSubmit[key] = formdata[key].value;
  }

  return dataToSubmit;
};

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for(let key in formdata){
        formIsValid = formdata[key].valid && formIsValid
    }
    return formIsValid;

}
