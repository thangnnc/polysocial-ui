export default function useValidator() {
  const validateRequired = (name, value, error) => {
    if (!value || value === 0) {
      return false;
    }
    return true;
  };

  const validateEmail = (name, value, error) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(value)) {
      return false;
    }
    return true;
  };

  const validate = (name, value) => {
    const firstChar = name.substring(0, 1).toUpperCase();
    if (!validateRequired(name, value)) {
      return firstChar + name.substring(1) + " phải bắt buộc nhập!";
    }
    switch (name) {
      case "email":
        if (!validateEmail(name, value)) {
          return "Email không hợp lệ!";
        }
        break;
      default:
    }
  };

  return {
    validate,
  };
}
