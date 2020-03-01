import React from 'react';

const UserCardTemporary = ({ user }) => {
    const { _id, type, name, email, avatar, adress, phone, date } = user;
    return (
        <div style={{display:'flex', flexDirection:'column', width:'300px'}}>
            <img src={avatar} alt="avatar"/>
            <h5>{`nom: ${name}`}</h5>
            <h5>{`_id: ${_id}`}</h5>
            <h5>{`email: ${email}`}</h5>
            <h5>{`phone: ${phone}`}</h5>
            <h5>{`type: ${type}`}</h5>
            <h5>{`adress: ${adress}`}</h5>
            <h5>{`last logged in time: ${date.split('T')[0]}`}</h5>
        </div>
    )
}
export default UserCardTemporary;