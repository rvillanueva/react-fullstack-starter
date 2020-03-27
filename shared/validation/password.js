export default function validate(password) {
  if(typeof password !== 'string') {
    throw new Error('Validated password must be a string.');
  }
  const res = {
    isValid: true,
    message: ''
  };
  if(password.length < 8) {
    res.isValid = false;
    res.message = 'Password is less than 8 characters';
  }
  return res;
}
