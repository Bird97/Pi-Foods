export function validate(input) {
  let errors = {};
  const numberExpresion = /^-?\d*(\.\d+)?$/;
  //   El método search() ejecuta una búsqueda que encaje entre una expresión regular y el objeto desde el que se llama.

  //Name:
  if (!input.name) {
    errors.name = "You must enter a name for the Recipe";
  } else if (input.name.search(/^[a-zA-Zñáéíóúü]*$/)) {
    errors.name = "The name cannot contain numbers or special characters";
  }
  if (input.name.length > 25) {
    errors.name = "Name cannot exceed 25 characters";
  }

  //Summary:
  if (!input.summary) {
    errors.summary = "You must enter a name for the Recipe";
  } 
  if (input.summary.length > 1000) {
    errors.summary = "Summary cannot exceed 1000 characters";
  }

  //Steps:
  if (!input.steps) {
    errors.steps = "You must enter a steps for the Recipe";
  } 
  if (input.steps.length > 1000) {
    errors.steps = "Steps cannot exceed 1000 characters";
  }

  //Score
  if (input.score < 1 || input.score > 100) {
    errors.score = "Health Score cannot be less than 1 or greater than 100";
  } else if (input.score.search(numberExpresion)) {

    errors.score = "The entered value must be only a number. Try again!";
  }

  //Types
  if(!input.diets) {
    errors.diets = "You must select at least one diet.";
  }
   
return errors;
}
