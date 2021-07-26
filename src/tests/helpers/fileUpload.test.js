import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config( {
    cloud_name: process.env.REACT_APP_FIREBASE_CLOUD_NAME,
    api_key: process.env.REACT_APP_FIREBASE_CLOUD_API_KEY,
    api_secret: process.env.REACT_APP_FIREBASE_CLOUD_SECRET_KEY
} );

xdescribe( 'Pruebas en fileUpload', () => {

    jest.setTimeout( 30000 );

    test( 'debe de cargar un archivo y retornar la URL', async () => {
        const image = 'https://res.cloudinary.com/dxwkusacu/image/upload/v1627229706/v3b2qrv9xiswebrmbeck.jpg';
        const resp = await fetch( image );
        const blob = await resp.blob();

        const file = new File( [blob], 'foto.png' );

        const url = await fileUpload( file );
        expect( typeof url ).toBe( 'string' );


        // borrar imagen
        const segments = url.split( '/' );
        const imageId = segments.slice( -1 ).pop().replace( '.jpg', '' );

        await cloudinary.v2.api.delete_resources( [imageId], {}, () => {} );
    } );

    test( 'debe de retornar un error', async () => {
        const file = new File( [], 'foto.png' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    } );
} );
