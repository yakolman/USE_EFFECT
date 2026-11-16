import { useState } from 'react';
import List from './components/List.jsx';
import Details from './components/Details.jsx';

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  function handleSelect(user) {
    setSelectedUser((previous) => previous?.id === user.id ? previous : user);
  }

  return (
    <main className="users-layout">
      <List selectedId={selectedUser?.id} onSelect={handleSelect} />
      {selectedUser && <Details info={selectedUser} />}
    </main>
  );
}
