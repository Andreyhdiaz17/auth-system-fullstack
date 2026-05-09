import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/users/me');
        setProfile(response.data);
      } catch {
        setError('Error al cargar el perfil');
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.navTitle}>🔐 Auth System</h1>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
      <div style={styles.content}>
        <div style={styles.welcomeCard}>
          <h2 style={styles.welcome}>¡Bienvenido, {user.name}! 👋</h2>
          <p style={styles.subtitle}>Has iniciado sesión correctamente</p>
        </div>
        {error && <p style={styles.error}>{error}</p>}
        {profile && (
          <div style={styles.profileCard}>
            <h3 style={styles.cardTitle}>Tu Perfil</h3>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>📧 Email:</span>
              <span style={styles.infoValue}>{profile.email}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>🛡️ Rol:</span>
              <span style={styles.roleBadge}>
                {profile.roles?.[0]?.authority || 'ROLE_USER'}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>🎫 Token:</span>
              <span style={styles.tokenText}>
                {localStorage.getItem('token')?.substring(0, 30)}...
              </span>
            </div>
          </div>
        )}
        <div style={styles.infoCard}>
          <h3 style={styles.cardTitle}>¿Cómo funciona?</h3>
          <p style={styles.infoText}>✅ Tu token JWT se envía automáticamente en cada petición</p>
          <p style={styles.infoText}>✅ Spring Security valida el token en el backend</p>
          <p style={styles.infoText}>✅ Sin token válido, el acceso es denegado (403)</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f2f5' },
  navbar: { backgroundColor: '#4f46e5', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  navTitle: { color: 'white', margin: 0, fontSize: '20px' },
  logoutBtn: { backgroundColor: 'white', color: '#4f46e5', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },
  content: { maxWidth: '700px', margin: '40px auto', padding: '0 20px' },
  welcomeCard: { backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '24px', textAlign: 'center' },
  welcome: { color: '#1a1a2e', margin: '0 0 8px 0', fontSize: '28px' },
  subtitle: { color: '#666', margin: 0 },
  profileCard: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '24px' },
  cardTitle: { color: '#1a1a2e', marginBottom: '16px', fontSize: '18px' },
  infoRow: { display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' },
  infoLabel: { fontWeight: '600', color: '#555', width: '100px', fontSize: '14px' },
  infoValue: { color: '#333', fontSize: '14px' },
  roleBadge: { backgroundColor: '#ede9fe', color: '#4f46e5', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  tokenText: { color: '#888', fontSize: '12px', fontFamily: 'monospace' },
  infoCard: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  infoText: { color: '#555', fontSize: '14px', margin: '8px 0' },
  error: { color: '#e74c3c', backgroundColor: '#fdecea', padding: '10px', borderRadius: '8px', marginBottom: '16px' }
};

export default Dashboard;