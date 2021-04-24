export default function validateInfo(values) {
    let errors = {};
  
    if (!values.fullName || !values.fullName.trim()) {
      errors.fullName = 'Full name required';
    }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if(!values.age) {
        errors.age = 'Age required';
    } else if(values.age > new Date()) {
      errors.age = 'Wow, are you from the future? I do not believe('
    } else if(values.age > new Date() - 5.676e+11) {
        errors.age = 'You are too young to be an alcoholic'
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
    return errors;
  }