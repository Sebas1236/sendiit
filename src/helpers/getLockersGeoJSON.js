
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

    const clearances = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-84.47426, 38.06673]
                },
                'properties': {
                    'clearance': "13' 2"
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-84.47208, 38.06694]
                },
                'properties': {
                    'clearance': "13' 7"
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-84.47184, 38.06694]
                },
                'properties': {
                    'clearance': "13' 7"
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-84.60485, 38.12184]
                },
                'properties': {
                    'clearance': "13' 7"
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-84.61905, 37.87504]
                },
                'properties': {
                    'clearance': "12' 0"
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-84.55946, 38.30213]
                },
                'properties': {
                    'clearance': "13' 6"
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-84.27235, 38.04954]
                },
                'properties': {
                    'clearance': "13' 6"
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-84.27264, 37.82917]
                },
                'properties': {
                    'clearance': "11' 6"
                }
            }
        ]
    };
    return {
        lockersgeojson,
        clearances,
    }
}
