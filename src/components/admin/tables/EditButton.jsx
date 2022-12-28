import { forwardRef, useRef, useEffect } from "react"
import { useUserStore } from "../../../hooks";

export const EditButton = forwardRef(({ indeterminate, ...rest }, ref) => {
    const { activeUser } = useUserStore();
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    const onEditUser = () => {
        console.log(activeUser);
    };

    return (
        <button
            className="btn btn-link btn-rounded btn-sm fw-bold"
            data-mdb-ripple-color="dark"
            ref={resolvedRef}
            {...rest}
            onClick={onEditUser}
        >
            EDITAR
        </button>
        // <input type="checkbox" ref={resolvedRef} {...rest} />
    )
})




