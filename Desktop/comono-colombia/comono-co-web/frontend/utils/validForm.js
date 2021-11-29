const validForm = (values) => {

    const errors = {};
    for (var key of Object.keys(values)) {

      if (values[key]) {
        let reGex = /\w+@\w+\.+[a-z]/;
        
        if (key === 'emailUser' || key === 'email') {
          if (!reGex.test(values[key])) {
            errors[key] = 'Invalid email. "@" and "." are required symbols';
          }
        }
  
        if(key === 'numberPhoneUser' || key === 'emergencyContactUser'){
          if( !Number(values[key])  ){
            errors[key] = 'Must be numbers, No text';
      
          } else {
            if(values[key].toString().length < 8){
              errors[key] = 'Must be at least 8 digits';
           }
           else if(values[key].toString().length > 8){
            errors[key] = 'Must be 8 digits';
           }
            
          }
         
        }
  
      } else {
        errors[key] = 'required';
      }
    }
  
    return errors;
  };
  
  export default validForm;