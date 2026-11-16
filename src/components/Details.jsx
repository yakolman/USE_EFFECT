import { useEffect, useState } from 'react';
import { fetchJson } from '../api.js';

export default function Details({ info }) {
  const { id } = info;
  const [result, setResult] = useState({ id: null, data: null, error: '' });

  useEffect(() => {
    const controller = new AbortController();
    setResult({ id, data: null, error: '' });

    async function loadDetails() {
      try {
        const data = await fetchJson(`${id}.json`, controller.signal);
        if (!controller.signal.aborted) {
          setResult({ id, data, error: '' });
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setResult({ id, data: null, error: `Unable to load user details: ${err.message}` });
        }
      }
    }

    loadDetails();
    return () => controller.abort();
  }, [id]);

  if (result.id !== id || (!result.data && !result.error)) {
    return <p className="status" role="status">Loading details...</p>;
  }
  if (result.error) {
    return <p className="status error" role="alert">{result.error}</p>;
  }

  const user = result.data;

  return (
    <article className="user-card">
      <img
        className="user-avatar"
        src={`https://randomuser.me/api/portraits/${[1, 2, 3].includes(user.id) ? 'women' : 'men'}/${user.id}.jpg`}
        alt={user.name}
      />
      <h2 className="user-name">{user.name}</h2>
      <ul className="user-details">
        <li>City: {user.details.city}</li>
        <li>Company: {user.details.company}</li>
        <li>Position: {user.details.position}</li>
      </ul>
    </article>
  );
}
