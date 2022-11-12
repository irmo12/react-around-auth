class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._btnElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
  }

  resetValidation() {
    this._toggleBtnState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._toggleBtnState();
    this.resetValidation();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._hideOrShowError(inputElement);
        this._toggleBtnState();
      });
    });
  }

  _hideOrShowError = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  };

  _showInputError = (inputElement, errorMsg) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.getAttribute("name")}`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMsg;
    errorElement.classList.remove(this._settings.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.getAttribute("name")}`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleBtnState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._btnElement.setAttribute("disabled", true);
    } else {
      this._btnElement.removeAttribute("disabled");
    }
  }
}
export default FormValidator;
