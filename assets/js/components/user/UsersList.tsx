import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { createLog } from '@helpers/log';

const log = createLog('UsersList');

interface User {
  id: number;
  name: string;
  email: string;
  status: 'inactive' | 'pending' | 'active' | 'logically_deleted';
}

interface UsersResponse {
  data: User[];
}

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UsersResponse>('/api/users');
        log.debug('[fetchUsers] success', response);
        setUsers(response.data.data);
        setError('');
      } catch (err) {
        log.error('[fetchUsers] error', err);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Users List</h2>
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                ID
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                  {user.id}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : user.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : user.status === 'inactive'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
            {users.length === 0 && !error && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-4 text-sm text-gray-500 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
