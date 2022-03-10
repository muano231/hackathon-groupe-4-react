import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './AdminVerifyUsers.scss';
import { Button,Table } from "react-bootstrap";
import {FaCheck} from 'react-icons/fa'

function AdminVerifyUsers() {
  const [users, setUsers] = useState([])
  const token = JSON.parse(sessionStorage.getItem("user")).access_token;

  useEffect(() => {
    fetch(
      process.env.REACT_APP_API + "api/users",
      {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.json())
    .then(
      (result) => {
        setUsers(result)
        // this.setState({
        //   isLoaded: true,
        // });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  },[]);

  const verifyUser = (id) => {
    console.log(id);
  }


  return (
    <div className='verify-users-list'>
          <h3 className='verify-users-title'>Users to verify</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th className='verify-cell text-center'>Verify</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(users).map((user) => (
                <tr key={user.id} className='user-display'>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className='text-center'>
                  <Button className='verify-user-button' onClick={verifyUser(user.id)}>
                    Accept <FaCheck />
                  </Button>
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
        </div>
  )
}

// class AdminVerifyUsers extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//       isLoaded: false,
//       items: [],
//     };
//   }

//   componentDidMount() {
//     const token = JSON.parse(sessionStorage.getItem("user")).access_token;
//     fetch(
//       process.env.REACT_APP_API + "api/users",
//       {
//         method: "get",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             isLoaded: true,
//             users: result,
//           });
//         },
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error,
//           });
//         }
//       );
//   }

  // verifyUser(id) {
  //   console.log(id);
  // }

//   render() {
//     const { error, isLoaded, users } = this.state;
//     if (error) {
//       return <div>Erreur : {error.message}</div>;
//     } else if (!isLoaded) {
//       return (
//         <div className="spinner">
//           <div class="spinner-grow" role="status">
//             <span class="sr-only"></span>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className='verify-users-list'>
//           <h3 className='verify-users-title'>Users to verify</h3>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th className='verify-cell text-center'>Verify</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.values(users).map((user) => (
//                 <tr key={user.id} className='user-display'>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td className='text-center'>
//                   <Button className='verify-user-button' onClick={this.verifyUser(user.id)}>
//                     Accept <FaCheck />
//                   </Button>
//                 </td>
//               </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       );
//     }
//   }
// }

export default AdminVerifyUsers;
