import React from 'react';
import PropTypes from 'prop-types';

const AdminUserCard = ({name, role, email}) => (
  <div>
    {name}
    {role}
    {email}
  </div>
);

AdminUserCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string.isRequired,
  email: PropTypes.string
};

export default AdminUserCard;
