import { Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

import { createLog } from '@helpers/log';
import { CreateUser } from '@components/user/CreateUser';
import { UsersList } from '@components/user/UsersList';
import { Flash } from '@components/Flash';
import { User } from '@types';
const log = createLog('Home');

interface Fact {
  key: string;
  value: string;
}

interface Props {
  place: string;
  facts: Fact[];
  users: User[];
}

export default function Home({ place, facts, users }: Props) {
  const loadFacts = () => {
    router.reload({ only: ['facts'] });
  };

  useEffect(() => {
    log.debug('router', router);

    // Only fetch users on initial mount
    // router.visit('Home', {
    //   preserveState: true,
    //   preserveScroll: true,
    //   only: ['users'],
    // });
    setTimeout(() => {
      router.reload({ only: ['users'] });
    }, 1);
  }, []); // Empty dependency array means this runs once on mount

  log.debug({ place, facts, users });

  return (
    <>
      <Flash />
      <div className="px-4 sm:px-0">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Hello, {place}!
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              To learn more about the world, click the <em>load facts</em>{' '}
              button.
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0 ">
            <button
              type="button"
              onClick={loadFacts}
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Load Facts
            </button>
          </div>
        </div>
      </div>

      {facts && (
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {facts.map((fact) => (
              <div
                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                key={fact.key}>
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {fact.key}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <CreateUser />
      <UsersList users={users} />
    </>
  );
}
