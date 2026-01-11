// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

// Componente Sidebar 
const Sidebar = () => (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
        <div className="position-sticky pt-3 sidebar-sticky">
            {/* ... (Contenido del menú lateral, usando Link para navegar) ... */}
            <ul className="nav flex-column">
                <li className="nav-item"><Link className="nav-link active text-white" aria-current="page" to="/dashboard"><i className="bi bi-house-door-fill me-2"></i> Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="/recepcion"><i className="bi bi-box-seam me-2"></i> Recepción de Lotes</Link></li>
                <li className="nav-item"><Link className="nav-link text-white" to="#"><i className="bi bi-boxes me-2"></i> Inventario (En Construcción)</Link></li>
            </ul>
        </div>
    </nav>
);

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                {/* Contenido principal del Dashboard */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {/* ... (Contenido de KPIs y tablas de actividad, migrado del dashboard.html) ... */}
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Panel de Control <small className="text-muted fs-6">Bienvenido, Ricardo G.</small></h1>
                    </div>
                     <div className="row row-cols-1 row-cols-md-3 g-4">
                         {/* Tarjetas de Métricas Estáticas */}
                         <div className="col">
                            <div className="card text-white bg-success mb-3">
                                <div className="card-header">Lotes Recibidos Hoy</div>
                                <div className="card-body"><h4 className="card-title display-4">08</h4></div>
                            </div>
                        </div>
                        {/* Más tarjetas... */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;