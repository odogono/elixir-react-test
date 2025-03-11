import { Link, router } from '@inertiajs/react';
import React, { useState } from 'react';

import { createLog } from '@helpers/log';
import { FormDataConvertible } from '@inertiajs/core';

const log = createLog('CreateUser');

interface UserFormData {
  name: string;
  email: string;
}

export const CreateUser = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    log.debug('[handleSubmit]', formData);

    router.post(
      '/api/users',
      { ...formData } as Record<string, FormDataConvertible>,
      {
        preserveScroll: true,
        preserveState: true,

        // this stops the redirect to the request url
        preserveUrl: true,
        onFinish: (...params) => {
          log.debug('[onFinish]', params);
        },
        onSuccess: (...params) => {
          log.debug('[onSuccess]', params);
          setFormData({ name: '', email: '' });
        },
        onError: (errors) => {
          log.debug('[onError]', errors);
          setErrors(errors as Partial<UserFormData>);
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900">Create New User</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Create User
        </button>
      </form>
    </div>
  );
};
