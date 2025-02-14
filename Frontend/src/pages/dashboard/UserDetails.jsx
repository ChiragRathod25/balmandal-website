import React, { useEffect } from 'react'
import { UserDetails as UserDetailsComponent} from '../';

const UserDetails = ({userId}) => {
  return (
    <div>
      <UserDetailsComponent userId={userId} />
    </div>
  );
};

export default UserDetails;
