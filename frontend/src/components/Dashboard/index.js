import React from 'react';

import { checkAuth, getUser } from '../../utils/auth';

import UserDashboard from './user'
import AdminDashboard from './admin'
import { Layout } from '../Layout';

const Dashboard = () => {
  const user = getUser();

  if(user && user.attributes.admin){
    return <AdminDashboard />
  }else{
    return <UserDashboard />
  }
}

export default Layout(Dashboard);