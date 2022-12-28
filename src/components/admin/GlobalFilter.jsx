
export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        // <span>
        //     <div className="form-outline mb-4">
        //         <input type="search" placeholder="Buscar" className="form-control" id="datatable-search-input" value={filter || ''}
        //             onChange={e => setFilter(e.target.value)} />
        //         {/* <label className="form-label" for="datatable-search-input">Search</label> */}
        //     </div>
        //     <div id="datatable">
        //     </div>
        // </span>
        <div
            // className="search-container"
        >
            <input type="text"
                className="form-control"
                placeholder="Buscar"
                value={filter || ''}
                onChange={e => setFilter(e.target.value)}   
            />
        </div>

    )
}
