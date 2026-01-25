
// src/components/RecepcionForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

const RecepcionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [proveedores, setProveedores] = useState([]);

  const [form, setForm] = useState({
    id_proveedor: '',
    fecha_recepcion: new Date().toISOString().slice(0, 10),
    peso: '',
    unidad_medida: 'KG',
    usuario_responsable: ''
  });

  useEffect(() => {
    const loadProveedores = async () => {
      try {
        const res = await fetch(`${API_URL}/api/proveedores`);
        if (!res.ok) {
          setErrorMsg('No se pudieron cargar proveedores');
          return;
        }
        const data = await res.json();
        setProveedores(Array.isArray(data) ? data : []);
      } catch (e) {
        setErrorMsg('Error de red al cargar proveedores');
      }
    };

    loadProveedores();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.id_proveedor) return 'Selecciona un proveedor';
    if (!form.fecha_recepcion) return 'La fecha de recepción es requerida';
    if (!form.peso || Number(form.peso) <= 0) return 'El peso debe ser mayor a 0';
    if (!form.unidad_medida) return 'Selecciona unidad de medida';
    if (!form.usuario_responsable.trim()) return 'El usuario responsable es requerido';
    return '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        id_proveedor: Number(form.id_proveedor),
        fecha_recepcion: form.fecha_recepcion,
        peso: Number(form.peso),
        unidad_medida: form.unidad_medida,
        usuario_responsable: form.usuario_responsable.trim()
      };

      const res = await fetch(`${API_URL}/api/lotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body?.error || 'Error al registrar el lote');
      }

      // OJO: valida qué propiedad regresa tu backend
      const id = body?.id_lote ?? body?.id ?? body?.data?.id_lote;

      if (!id) {
        // Si no viene id, te quedas en la pantalla pero mostrando éxito
        setErrorMsg('Lote creado, pero no se recibió id_lote en la respuesta.');
        return;
      }

      navigate(`/lotes/${id}`, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4" style={{ maxWidth: 900 }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Recepción de Lote</h2>
        <Link className="btn btn-outline-secondary" to="/">Volver</Link>
      </div>

      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

      <form onSubmit={onSubmit} className="card p-3 shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Proveedor</label>
            <select
              className="form-select"
              name="id_proveedor"
              value={form.id_proveedor}
              onChange={onChange}
            >
              <option value="">-- Selecciona --</option>
              {proveedores.map((p) => (
                <option key={p.id_proveedor ?? p.id} value={p.id_proveedor ?? p.id}>
                  {p.nombre ?? p.razon_social ?? `Proveedor ${p.id_proveedor ?? p.id}`}
                </option>
              ))}
            </select>
            <small className="text-muted">
              Proveedores cargados: {proveedores.length}
            </small>
          </div>

          <div className="col-md-6">
            <label className="form-label">Fecha de recepción</label>
            <input
              type="date"
              className="form-control"
              name="fecha_recepcion"
              value={form.fecha_recepcion}
              onChange={onChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Peso</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="peso"
              value={form.peso}
              onChange={onChange}
              placeholder="Ej: 125.5"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Unidad de medida</label>
            <select
              className="form-select"
              name="unidad_medida"
              value={form.unidad_medida}
              onChange={onChange}
            >
              <option value="KG">KG</option>
              <option value="LB">LB</option>
              <option value="TON">TON</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Usuario responsable</label>
            <input
              type="text"
              className="form-control"
              name="usuario_responsable"
              value={form.usuario_responsable}
              onChange={onChange}
              placeholder="Ej: alejandro"
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Registrar lote'}
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            disabled={loading}
            onClick={() => setForm(prev => ({
              ...prev,
              id_proveedor: '',
              peso: '',
              usuario_responsable: ''
            }))}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecepcionForm;
