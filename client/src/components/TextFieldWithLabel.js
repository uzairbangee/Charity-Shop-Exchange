import React, {useEffect, useRef} from 'react';
import '@vaadin/vaadin-text-field';

export default function TextFieldWithLabel(props) {

  const {
    label,
    placeholder,
    onChange,
    name,
    className,
    value,
    max
  } = props;

  const textField = useRef(null);

  useEffect(() => {
    // Handle changes to the combo box
    function handleChange(e) {
      const value = e.target.value;
      onChange({ name, value });
      ;
    }

    function handleOnBlue(e){
      const value = e.target.value;
      props.onblur(e)
    }

    textField.current.addEventListener('change', handleChange);
    if(props.onblur){
      textField.current.addEventListener('blur', handleOnBlue);
    }
  }, []);

  return (
    <div className="payment-text-field">
      {/* <vaadin-text-field value={label}></vaadin-text-field> */}
      <vaadin-text-field 
        ref={textField}
        name={name} 
        class={`custom-style ${className ? className : 'w-full'}`} 
        placeholder={placeholder} 
        label={label} 
        value={value || ''}
        maxLength={max || ''}
      >

      </vaadin-text-field>
    </div>
  );  
}