// src/components/RecepcionForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const RecepcionForm = () => {
    return (
        <div className="container-fluid py-4">
            {/* ... (Estructura de la navegación y el encabezado) ... */}
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <h1 className="h2 mb-4 text-success">Registro de Lote de Limón Entrante</h1>
                    <div className="card shadow-sm mb-5">
                        <div className="card-body p-4">
                            <form>
                                <div className="row g-4">
                                    {/* Sección I: Origen */}
                                    <h5 className="border-bottom pb-2 mb-4 text-secondary"><i className="bi bi-geo-alt-fill me-2"></i> Origen y Clasificación</h5>

                                    <div className="col-md-6">
                                        <label htmlFor="proveedor" className="form-label fw-bold">Proveedor / Origen</label>
                                        {/* ... (Input Select estático) ... */}
                                    </div>
                                    
                                    {/* Sección II: Pesaje */}
                                    <h5 className="border-bottom pb-2 mb-4 mt-5 text-secondary"><i className="bi bi-speedometer me-2"></i> Datos de Pesaje</h5>

                                    <div className="col-md-4">
                                        <label htmlFor="pesoBruto" className="form-label fw-bold">Peso Bruto Total (Kg)</label>
                                        <input type="number" className="form-control" id="pesoBruto" placeholder="Ej: 1550" required />
                                    </div>
                                    
                                    {}

                                </div>
                                
                                <hr className="my-5" />
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-lg btn-success me-3">
                                        <i className="bi bi-save-fill me-2"></i> Registrar Lote
                                    </button>
                                    <Link to="/dashboard" className="btn btn-lg btn-secondary">
                                        Cancelar
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecepcionForm;