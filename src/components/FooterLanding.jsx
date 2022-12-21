


export const FooterLanding = () => {
    return (
        <div className="container-fluid p-0 m-0">
            <footer className="text-center text-white" style={{ backgroundColor: "#212e46" }}>
                <div className="container pt-2">
                    <a href="/auth/landing">
                        <h1 style={{'color':'white'}}>Send<span className="colorRojo">iit</span></h1>
                    </a>
                    <div className="text-center text-white ">
                     <p>Esta página es una obra intelectual protegida por la ley federal de derecho de autor, puede ser reproducida con fines no lucrativos siempre y cuando no se cite la fuente compleja y su dirección electrónica.</p>
                    <h5 className="contacto"> Contacto</h5>
                </div>
                    <section className="mb-2 row">
                        <div className='footerItem col-4'>
                            <a
                                className="btn btn-link btn-floating btn-lg text-white "
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="fa-brands fa-square-facebook"></i> <span>SendiitOficial</span> 
                            </a>
                        </div>
                        <div className='footerItem col-4'>
                            <a
                                className="btn btn-link btn-floating btn-lg text-white "
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="dark"
                            ><i className="fa-brands fa-instagram"></i> <span>Sendiit_Oficial</span>
                            </a>
                        </div>
                        <div className='footerItem col-4'>
                            <a
                                className="btn btn-link btn-floating btn-lg text-white "
                                href="#!"
                                role="button"
                                data-mdb-ripple-color="white"
                            >
                            <i className="fa-solid fa-phone"></i>
                            <span>55454202433</span>
                            </a>
                        </div>
                       

                    </section>
                </div>

                
            </footer>
        </div>
    )
}