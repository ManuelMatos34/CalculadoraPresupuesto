import React, { useEffect, useState } from "react";
import IngresoAhorros from "./IngresoAhorros";

const FormAhorros = () => {
    const [FormAhorros, setFormAhorros] = useState([]);
    const [consolidatedDataAhorros, setConsolidatedDataAhorros] = useState({});

    useEffect(() => {
        setConsolidatedDataAhorros({
            FormAhorros,
        });
    }, [FormAhorros]);

    console.log(consolidatedDataAhorros);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="dropdown drop-size">
                        <button
                            className="btn btn-secondary dropdown-toggle button-style text-start"
                            type="button"
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseAhorro" 
                            aria-expanded="false" 
                            aria-controls="collapseAhorro"
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "teal",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                }}
                            ></span>
                            Ahorros
                        </button>
                        <ul className="collapse container" id="collapseAhorro" style={{ backgroundColor: "#d3d3d3" }}>
                            <IngresoAhorros setFormAhorros={setFormAhorros} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAhorros;
