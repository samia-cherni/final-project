const validator = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
})=>{
     const err = {};

     if (!firstName) {
       err.firstName = "Please add your first name.";
     } else if (firstName.length > 25) {
       err.firstName = "First name is up to 25 characters long.";
     }
     if (!lastName) {
       err.lastName = "Please add your last name.";
     } else if (lastName.length > 25) {
       err.lastName = "Last name is up to 25 characters long.";
     }

     if (!email) {
       err.email = "Please add your email.";
     } else if (!validateEmail(email)) {
       err.email = "Email format is incorrect.";
     }

     if (!password) {
       err.password = "Please add your password.";
     } else if (!validatePassword(password)) {
       err.password =
         "Password must be at least 6 characters, at least one Upper case, at least one lower case, and at least one digit";
     }

     if (password !== confirmPassword) {
       err.confirmPassword = "Confirm password did not match.";
     }

     return {
       errMsg: err,
       errLength: Object.keys(err).length,
     };
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; /* eslint-disable-line */
  return re.test(email);
}
function validatePassword(password) {
  const reg = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/; /* eslint-disable-line */
  return reg.test(password);
}
export default validator;