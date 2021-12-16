import  yup from 'yup';

// Just like before, without the id field
const signupSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirm_password: yup.string().required().oneOf([yup.ref('password'), null], 'Password not matched'),
});

export default signupSchema;