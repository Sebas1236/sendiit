export const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
        //watch se usa si la persona se está moviendo de lugar
        navigator.geolocation.getCurrentPosition(
            //Si todo sale bien
            ({ coords }) => {
                resolve([ coords.longitude, coords.latitude ]);
            },
            ( err ) => {
                alert('No se pudo obtener la geolocalización');
                console.log(err);
                reject();
            }
        );
    });
}
