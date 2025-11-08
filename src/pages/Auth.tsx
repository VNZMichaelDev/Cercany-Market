import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { loginUser, registerUser, saveUser, getUser } from '../utils/localStorage';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Si ya está logueado, redirigir al home
  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo: Acepta cualquier dato
    if (isLogin) {
      // Login - acepta cualquier email/password
      if (!formData.email || !formData.password) {
        setError('Por favor completa email y contraseña');
        return;
      }
      
      // Buscar usuario existente o crear uno demo
      let user = loginUser(formData.email, formData.password);
      if (!user) {
        // Crear usuario demo automáticamente
        user = registerUser({
          name: formData.email.split('@')[0],
          email: formData.email,
          phone: '+58 424 0000000',
          role: 'client',
        });
      }
      saveUser(user);
      navigate('/');
    } else {
      // Register - solo requiere email
      if (!formData.email) {
        setError('Por favor ingresa un email');
        return;
      }
      const newUser = registerUser({
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        phone: formData.phone || '+58 424 0000000',
        role: 'client',
      });
      saveUser(newUser);
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo">
          <ShoppingCart size={40} strokeWidth={2.5} />
          <h1>Cercany Market</h1>
        </div>
      </div>

      <div className="auth-card">
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                placeholder="+58 424 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          )}

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}
