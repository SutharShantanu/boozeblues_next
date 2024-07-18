import React from "react";
import Avvvatars from "avvvatars-react";

const Profile = ({ email, style }) => {
  return (
    <React.Fragment>
      <div>
        <Avvvatars value={email} style={style} />
      </div>
    </React.Fragment>
  );
};

export default Profile;
