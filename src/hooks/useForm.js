import { useState } from 'react';
// https://www.npmjs.com/package/validator

export const useForm = ( initialValues = {}, validations = {}, onSubmit = () => {} ) => {
    let valid = true;
    let formErrors = {};

    let [data, setData] = useState( initialValues );
    let [errors, setErrors] = useState( {} );

    const handleChange = ( { target } ) => {
        data = {
            ...data,
            [ target.name ]: target.value
        };
        setData( data );
    };

    const reset = ( newState = initialValues ) => {
        setData( newState );
    };

    const validate = ( validator, key, value, message = '', params = {} ) => {
        const { name } = validator;
        const result = validator( value, params );

        if ( ['isEmail', 'isLength'].includes( name ) ) {
            if ( !result ) {
                valid = false;
                formErrors = {
                    ...formErrors,
                    [ key ]: { message }
                };
            }
        } else if ( result ) {
            valid = false;
            formErrors = {
                ...formErrors,
                [ key ]: { message }
            };
        }
    };

    const handleSubmit = ( e ) => {
        try {
            e.preventDefault();

            if ( validations ) {
                valid = true;
                formErrors = {};

                for ( const key in data ) {
                    const value = data[ key ];
                    const fieldValidations = validations[ key ];

                    if ( fieldValidations ) {

                        if ( typeof fieldValidations === 'function' ) {

                            validate( fieldValidations, key, value );

                        } else if ( fieldValidations instanceof Array ) {
                            fieldValidations.forEach( v => {
                                let params = {};
                                let validator = v;
                                let message = '';

                                if ( typeof v === 'object' && v !== null ) {
                                    validator = v.validator;
                                    params = v.params;
                                    message = v.message;
                                }

                                validate( validator, key, value, message, params );
                            } );
                        }

                    }
                }

                if ( !valid ) {
                    setErrors( formErrors );
                    return;
                }
            }

            setErrors( {} );

            if ( onSubmit ) {
                onSubmit();
            }

        } catch ( e ) {
            console.log( e );
        }

    };

    return {
        data,
        handleChange,
        handleSubmit,
        errors,
        reset
    };
};
