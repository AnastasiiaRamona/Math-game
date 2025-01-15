import * as Yup from 'yup';

class Model {
  currentMultiplier = 1;
  currentIndex = 1;
  isAnswerCorrect = false;

  constructor() {
    this.validationSchema = Yup.number().min(1, '').max(9, '').required('');
  }

  clearSavedData() {
    this.currentIndex = 1;
    this.isAnswerCorrect = false;
  }
}

export default Model;
