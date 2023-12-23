import React, { useState } from 'react';

export const usePasswordVisibility = () => {
  const [isPaswordSecured, setIsPasswordSecured] = useState(true);

  const handlPasswordSecured = () => {
    setIsPasswordSecured((current) => !current);
  };

  return { isPaswordSecured, handlPasswordSecured };
};
