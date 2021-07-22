import { useState } from 'react';


export const useForm = ( initialState = {} ) => {
    const formValidators = {};
    let formErrors = {};
    let isValid = false;

    const getValues = () => {
        const formValues = {};
        Object.entries( initialState ).forEach( e => {
            const k = e[ 0 ];
            let value = e[ 1 ];

            if ( value instanceof Array ) {
                const validator = value[ 1 ];
                if ( validator instanceof Array ) {
                    formValidators[ k ] = validator;
                } else {
                    formValidators[ k ] = [validator];
                }

                value = value[ 0 ];
            }


            formValues[ k ] = value;
        } );

        return formValues;
    };

    const getErrors = () => {
        formErrors = {};

        Object.entries( formValues ).forEach( x => {
            const [field, value] = x;

            ( formValidators[ field ] || [] ).forEach( v => {
                let params = {};
                let validator = v;
                if ( v instanceof Array ) {
                    validator = v[ 0 ];
                    params = v[ 1 ] || {};
                }
                const { name } = validator;
                const result = validator( value, params );
                if ( ['isEmail', 'isLength'].includes( name ) ) {
                    if ( !result ) {
                        formErrors[ field ] = true;
                    }
                } else if ( result ) {
                    formErrors[ field ] = true;
                }

            } );
        } );

        isValid = !Object.entries( formErrors ).length;
    };

    const values = getValues();

    let [formValues, setValues] = useState( values );

    getErrors();

    const resetForm = () => {
        setValues( initialState );
    };


    const formChange = ( { target } ) => {
        formValues = {
            ...formValues,
            [ target.name ]: target.value
        };
        setValues( formValues );

        getErrors();

    };

    return {
        values: formValues,
        handleChange: formChange,
        resetForm,
        isValid
    };
};
