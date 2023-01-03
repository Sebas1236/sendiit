
export const getLockersGeoJSON = () => {
    const lockersgeojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -99.162953, 19.374037 //Del Valle
                    ]
                },
                "properties": {
                    "phoneFormatted": "Garden Del Valle, 767 Avenida Universidad, Ciudad de México, 03104, México",
                    "phone": "2022347336",
                    "image": "delvalle.jpg",
                    "address": "Sendiit Del Valle",
                    "city": "Ciudad de México CDMX",
                    "country": "United States",
                    "crossStreet": "at 15th St NW",
                    "postalCode": "20005",
                    "state": "D.C."
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -99.234005, 19.510558 //Satélite
                    ]
                },
                "properties": {
                    "phoneFormatted": "Plaza Satélite, Circuito Centro Comercial 2251, Naucalpan de Juárez, Estado de México 53100, México",
                    "phone": "2025078357",
                    "address": "Sendiit Satélite",
                    "image": "satelite.jfif",
                    "city": "Ciudad de México CDMX",
                    "country": "United States",
                    "crossStreet": "at 22nd St NW",
                    "postalCode": "20037",
                    "state": "D.C."
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-99.179423, 19.345436] //Coyoacán
                },
                "properties": {
                    "phoneFormatted": "Oasis Coyoacán, Miguel Ángel de Quevedo 217, Ciudad de México, 04310, México",
                    "phone": "2023879338",
                    "address": "Sendiit Coyoacán",
                    "city": "Ciudad de México CDMX",
                    "image": "coyoacan.jpg",
                    "country": "United States",
                    "crossStreet": "at Dupont Circle",
                    "postalCode": "20036",
                    "state": "D.C."
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-99.264389, 19.365604], //Santa Fe
                },
                "properties": {
                    "phoneFormatted": "Garden Santa Fe, Guillermo González Camarena 1205, Ciudad de México, 01376, México",
                    "phone": "2023379338",
                    "address": "Sendiit Santa Fe",
                    "image": "garden-santafe.jpg",
                    "city": "Ciudad de México CDMX",
                    "country": "United States",
                    "crossStreet": "at 34th St NW",
                    "postalCode": "20007",
                    "state": "D.C."
                }
            },
        ]
    };
    return {
        lockersgeojson,
    }
}
