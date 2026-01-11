// src/components/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 

const Login = () => {
    // La lógica de manejo de estado

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <h3 className="text-success">Maquiladora San José</h3> {}
                    <p className="text-secondary">Sistema de Control y Administración</p>
                </div>
                
                <h5 className="text-center mb-4">Iniciar Sesión</h5>
                
                <form>
                    <div className="mb-3">
                        <label htmlFor="usuario" className="form-label">Usuario o Correo</label>
                        <input type="text" className="form-control" id="usuario" placeholder="Ej: ricardo.gomez" required />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" required />
                    </div>
                    
                    {/* Usamos Link para simular la navegación al Dashboard */}
                    <Link to="/dashboard" className="btn btn-success w-100">Ingresar al Sistema</Link> 
                    
                    <div className="text-center mt-3">
                        <Link to="#" className="text-decoration-none text-success">¿Olvidó su contraseña?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;