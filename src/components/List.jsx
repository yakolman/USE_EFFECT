import { useEffect, useState } from 'react';
import { fetchJson } from '../api.js';

export default function List({ selectedId, onSelect }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const data = await fetchJson('users.json', controller.signal);
        if (!controller.signal.aborted) {
          setUsers(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(`Unable to load the users: ${err.message}`);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <p className="status" role="status">Loading users...</p>;
  if (error) return <p className="status error" role="alert">{error}</p>;

  return (
    <ul className="user-list" aria-label="Users">
      {users.map((user) => (
        <li key={user.id}>
          <button
            type="button"
            className={user.id === selectedId ? 'user-button active' : 'user-button'}
            aria-pressed={user.id === selectedId}
            onClick={() => onSelect(user)}
          >
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
