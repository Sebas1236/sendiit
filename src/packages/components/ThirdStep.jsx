import { useState } from 'react';
import '../../css/FirstStepPage.css'

export const ThirdStep = () => {
    const [locationState, setLocationState] = useState("");
    return (
        <div className='container-fluid'>
            <div className='formulario'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <p className='fW-700 fZ'>Selecciona la ubicación de destino de tu paquete</p>
                    </div>
                    <div className='col-lg-6'>

                        <select className="form-select ubicacion" name='Ubicacion' onChange={(e) => {
                            const selectedLocation = e.target.value;
                            setLocationState(selectedLocation);
                            if (selectedLocation == 'SantaFe') {
                                /*  document.getElementById('SantaFe').style.visibility = 'visible';
                                 document.getElementById('SantaFe').classList.add('rojo'); */
                                document.getElementById('santaFe').classList.add('rojo');

                                /*    document.getElementById('Coyoacan').style.visibility = 'hidden';
                                   document.getElementById('Satelite').style.visibility = 'hidden';
                                   document.getElementById('ColValle').style.visibility = 'hidden'; */

                                document.getElementById('coyoacan').classList.remove('rojo');
                                document.getElementById('satelite').classList.remove('rojo');
                                document.getElementById('colValle').classList.remove('rojo');

                            } else if (selectedLocation == 'Coyoacan') {
                                /* document.getElementById('Coyoacan').style.visibility = 'visible';
                                document.getElementById('Coyoacan').classList.add('rojo'); */
                                document.getElementById('coyoacan').classList.add('rojo');

                                /*   document.getElementById('SantaFe').style.visibility = 'hidden';
                                  document.getElementById('Satelite').style.visibility = 'hidden';
                                  document.getElementById('ColValle').style.visibility = 'hidden'; */

                                document.getElementById('santaFe').classList.remove('rojo');
                                document.getElementById('satelite').classList.remove('rojo');
                                document.getElementById('colValle').classList.remove('rojo');

                            } else if (selectedLocation == 'Satelite') {
                                /*    document.getElementById('Satelite').style.visibility = 'visible';
                                   document.getElementById('Satelite').classList.add('rojo'); */
                                document.getElementById('satelite').classList.add('rojo');

                                /*  document.getElementById('SantaFe').style.visibility = 'hidden';
                                 document.getElementById('Coyoacan').style.visibility = 'hidden';
                                 document.getElementById('ColValle').style.visibility = 'hidden'; */

                                document.getElementById('santaFe').classList.remove('rojo');
                                document.getElementById('coyoacan').classList.remove('rojo');
                                document.getElementById('colValle').classList.remove('rojo');

                            } else if (selectedLocation == 'ColValle') {
                                /*  document.getElementById('ColValle').style.visibility = 'visible';
                                 document.getElementById('ColValle').classList.add('rojo'); */
                                document.getElementById('colValle').classList.add('rojo');

                                /*  document.getElementById('SantaFe').style.visibility = 'hidden';
                                 document.getElementById('Coyoacan').style.visibility = 'hidden';
                                 document.getElementById('Satelite').style.visibility = 'hidden'; */

                                document.getElementById('santaFe').classList.remove('rojo');
                                document.getElementById('coyoacan').classList.remove('rojo');
                                document.getElementById('satelite').classList.remove('rojo');


                            } else {
                                /*    document.getElementById('SantaFe').style.visibility = 'visible';
                                   document.getElementById('ColValle').style.visibility = 'visible';
                                   document.getElementById('Coyoacan').style.visibility = 'visible';
                                   document.getElementById('Satelite').style.visibility = 'visible';

                                   document.getElementById('ColValle').classList.remove('rojo');
                                   document.getElementById('SantaFe').classList.remove('rojo');
                                   document.getElementById('Coyoacan').classList.remove('rojo');
                                   document.getElementById('Satelite').classList.remove('rojo');
*/
                                document.getElementById('santaFe').classList.remove('rojo');
                                document.getElementById('satelite').classList.remove('rojo');
                                document.getElementById('colValle').classList.remove('rojo');
                                document.getElementById('coyoacan').classList.remove('rojo');

                            }


                        }
                        }>
                            <option selected>Buscar Ubicación</option>
                            <option value={"SantaFe"}>Santa Fe</option>
                            <option value={"Coyoacan"}>Coyoacán</option>
                            <option value={"Satelite"}>Satélite</option>
                            <option value={"ColValle"}>Col. del Valle</option>
                        </select>


                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-6'>
                        <img className='mapa-img' src='/img/Mapa.png'></img>
                        {/*   <i className="fa-solid fa-location-dot satelite" id='Satelite'></i>
                            <i className="fa-solid fa-location-dot santa-fe" id='SantaFe'></i>
                            <i className="fa-solid fa-location-dot colValle" id='ColValle'></i>
                            <i className="fa-solid fa-location-dot coyoacan" id='Coyoacan'></i> */}
                        <button type="button" className="btn btn-sig1" id='regresar-btn'>Regresar</button>
                    </div>
                    <div className='col-lg-6 center'>
                        <div className='row borde'>
                            <div className='col-lg-3'></div>
                            <div className='col-lg-3'>
                                <p className='fW-700 '>Ubicación</p>
                            </div>
                            <div className='col-lg-3 '>
                                <p className='fW-700'>Disponibles</p>
                            </div>
                            <div className='col-lg-3'></div>
                        </div>

                        <div className='row'>
                            <div className='col-lg-3'>
                                <i className="fa-solid fa-building" id='santaFe'></i>
                            </div>

                            <div className='col-lg-3'>
                                Santa fe
                            </div>

                            <div className='col-lg-3'>
                                10
                            </div>

                            <div className='col-lg-3'>
                                <button type="button" className="btn btn-sig1">Siguiente</button>
                            </div>
                            <hr className='tabla' />
                        </div>


                        <div className='row'>
                            <div className='col-lg-3'>
                                <i className="fa-solid fa-building" id='satelite'></i>
                            </div>

                            <div className='col-lg-3'>
                                Satélite
                            </div>

                            <div className='col-lg-3'>
                                10
                            </div>

                            <div className='col-lg-3'>
                                <button type="button" className="btn btn-sig1">Siguiente</button>
                            </div>
                            <hr className='tabla' />
                        </div>


                        <div className='row'>
                            <div className='col-lg-3'>
                                <i className="fa-solid fa-building" id='coyoacan'></i>
                            </div>

                            <div className='col-lg-3'>
                                Coyoacán
                            </div>

                            <div className='col-lg-3'>
                                10
                            </div>

                            <div className='col-lg-3'>
                                <button type="button" className="btn btn-sig1">Siguiente</button>
                            </div>
                            <hr className='tabla' />
                        </div>


                        <div className='row'>
                            <div className='col-lg-3'>
                                <i className="fa-solid fa-building" id='colValle'></i>
                            </div>

                            <div className='col-lg-3'>
                                Col. del Valle
                            </div>

                            <div className='col-lg-3'>
                                10
                            </div>

                            <div className='col-lg-3'>
                                <button type="button" className="btn btn-sig1">Siguiente</button>
                            </div>
                            <hr className='tabla' />
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )


}

