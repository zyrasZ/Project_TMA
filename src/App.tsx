import React, { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { useCreateUser } from './hooks/useCreateUser';
import { useDeleteUser } from './hooks/useDeleteUser';
import { useUpdateUser } from './hooks/useUpdateUser';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const { data: users, isLoading, isError, error } = useUsers({ search });
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();

  const handleCreate = () => {
    createUser.mutate({
      name: 'Thanh Nguyen',
      email: 'thanh@gmail.com',
      age: 26,
      role: 'user',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=10'
    });
  };

  const handleDelete = (id: number) => {
    deleteUser.mutate(id);
  };

  const handleUpdate = (id: number) => {
    updateUser.mutate({
      id,
      data: {
        name: 'Nguyen Van An Updated',
        age: 26
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Users Management</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button onClick={handleCreate} disabled={createUser.isPending} style={{ padding: '8px 12px', cursor: 'pointer' }}>
          {createUser.isPending ? 'Creating...' : 'Create Fake User'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {users?.map((user) => (
          <div key={user.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <img src={user.avatar} alt={user.name} width={50} height={50} style={{ borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{user.name}</h3>
              <div style={{ fontSize: '14px', color: '#666' }}>{user.email} - Role: {user.role} - Status: {user.status}</div>
            </div>
            <div>
              <button 
                onClick={() => handleUpdate(user.id)} 
                disabled={updateUser.isPending}
                style={{ padding: '6px 10px', marginRight: '10px', cursor: 'pointer' }}
              >
                Update
              </button>
              <button 
                onClick={() => handleDelete(user.id)} 
                disabled={deleteUser.isPending}
                style={{ padding: '6px 10px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {users?.length === 0 && <div>No users found.</div>}
      </div>
    </div>
  );
};

export default App;
