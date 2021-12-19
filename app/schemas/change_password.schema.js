import  yup from 'yup';

// Just like before, without the id field
const changePasswordSchema = yup.object({
  password: yup.string().required(),
  confirm_password: yup.string().required().oneOf([yup.ref('password'), null], 'Password not matched'),
});

export default changePasswordSchema;