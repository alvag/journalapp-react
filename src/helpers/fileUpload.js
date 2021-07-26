export const fileUpload = async ( file ) => {
    try {
        const cloudUrl = 'https://api.cloudinary.com/v1_1/dxwkusacu/upload';
        const upload_preset = 'react-journal';

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
        } else {
            return null;
        }

    } catch ( e ) {
        throw e;
    }

};
