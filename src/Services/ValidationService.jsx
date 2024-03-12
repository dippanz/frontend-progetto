import { rules } from "./config/validation-service-config";

const banners = {
  invalidPasswordRegexMatch: (
    <div>La password non rispetta il formato richiesto</div>
  ),
  invalidPasswordMatching: <div>Le password non corrispondono</div>,
  invalidLoginInformations: <div>Errore durante il login, riprovare</div>
};

export const regexMatch = (validity) => {
  if (validity == false) {
    return banners.invalidPasswordRegexMatch;
  } else {
    return <></>
  }
};

export const CheckPasswordMatch = (password, confirm) => {
  if (password == confirm) {
    return true;
  } else {
    return false;
  }
};

export const areValuesMatching = (areValuesMatching) => {
  if (areValuesMatching == false) {
    return banners.invalidPasswordMatching;
  } else {
    return <></>;
  }
};

export const ValidatePassword = (passwordToValidate) => {
  return rules.regex.password.test(passwordToValidate);
};

