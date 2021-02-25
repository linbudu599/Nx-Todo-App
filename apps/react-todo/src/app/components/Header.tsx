import React from 'react';
import { Button } from 'antd';

const Header: React.FC = () => {
  return (
    <>
      <Button type="primary">Mock Add</Button>
      Nx Todo-List (React)
      <Button type="primary">Real Add</Button>
    </>
  );
};

export default Header;
