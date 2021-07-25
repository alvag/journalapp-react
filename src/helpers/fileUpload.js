export const fileUpload = async ( file ) => {
    try {
        const cloudUrl = process.env.REACT_APP_CLOUDINARY_URL;
        const upload_preset = process.env.REACT_APP_CLOUDINARY_PRESET;

        const formData = new FormData();
        formData.append( 'upload_preset', upload_preset );
        formData.append( 'file', file );

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } );

        if ( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }

    } catch ( e ) {
        throw e;
    }

};
