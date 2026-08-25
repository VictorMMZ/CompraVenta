import { useState, useEffect } from 'react';
import '../assets/css/Users.css';
import { getUsers, createUser, updateUser, deleteUser } from '../services/usersApi';
import { Button } from '../components/Button.jsx';
import { userRegex, validateByRegex } from '../utils/regexp.js';

export function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editShowModal, setEditShowModal] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [createShowModal, setCreateShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [createFormData, setCreateFormData] = useState({
    name: '',
    email: '',
    role: 'trabajador',
    password: '',
    password_confirmation: '',
  });
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: '',
  });

  const validateUserForm = (data, isEdit = false) => {
    if (!validateByRegex(userRegex.nombre, data.name)) {
      return 'El nombre no es valido.';
    }

    if (!validateByRegex(userRegex.email, data.email)) {
      return 'El correo electronico no es valido.';
    }

    if (!validateByRegex(userRegex.rol, data.role)) {
      return 'El rol no es valido.';
    }

    if (!isEdit && !data.password) {
      return 'La contrasena es obligatoria al crear un usuario.';
    }

    if (data.password) {
      if (!validateByRegex(userRegex.password, data.password)) {
        return 'La contrasena debe  tener minimo 8 caracteres, mayuscula, minuscula, numero y simbolo.';
      }

      if (data.password !== data.password_confirmation) {
        return 'La confirmacion de contrasena no coincide.';
      }
    }

    return null;
  };

  const reloadUsers = () => {
    getUsers().then(setUsers);
  };

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="users">
      <div className="users-header">
        <h1>Usuarios</h1>
      </div>

      <div className="users-content">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="users-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button
          style="users-add-button"
          onClick={() => setCreateShowModal(true)}
        >
          Agregar usuario
        </Button>

        {createShowModal && (
          <div className="popup-overlay">
            <div className="popup-modal popup-modal-create">
              <div className="popup-header">
                <h3>Agregar Usuario</h3>
                <Button
                  style="popup-close"
                  onClick={() => setCreateShowModal(false)}
                >
                  ×
                </Button>
              </div>

              <div className="popup-body">
                <form>
                  <div className="field">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={createFormData.name}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={createFormData.email}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Rol</label>
                    <select
                      name="role"
                      value={createFormData.role}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="trabajador">Trabajador</option>
                      <option value="administrador">Administrador</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Contrasena</label>
                    <input
                      type="password"
                      name="password"
                      value={createFormData.password}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Confirmar contrasena</label>
                    <input
                      type="password"
                      name="password_confirmation"
                      value={createFormData.password_confirmation}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          password_confirmation: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
                <div id="modal-error" className="modal-error"></div>
              </div>

              <div className="popup-footer">
                <Button
                  style="close"
                  onClick={() => setCreateShowModal(false)}
                >
                  Cerrar
                </Button>
                <Button
                  style="save"
                  onClick={() => {
                    const validationError = validateUserForm(createFormData, false);
                    if (validationError) {
                      document.getElementById("modal-error").innerHTML = validationError;
                      return;
                    }

                    createUser(createFormData).then(() => {
                      setCreateShowModal(false);
                      setCreateFormData({
                        name: '',
                        email: '',
                        role: 'trabajador',
                        password: '',
                        password_confirmation: '',
                      });
                      reloadUsers();
                    });
                  }}
                >
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        )}

        {deleteShowModal && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <div className="popup-header">
                <h3>{selectedUser?.name}</h3>

                <Button
                  style="popup-close"
                  onClick={() => setDeleteShowModal(false)}
                >
                  x
                </Button>
              </div>

              <div className="popup-body">
                <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                <Button
                  style="delete"
                  onClick={() =>
                    deleteUser(selectedUser.id).then(() => {
                      setDeleteShowModal(false);
                      reloadUsers();
                    })
                    .catch((error) => {
                      alert(error.message || 'No se pudo eliminar el usuario');
                    })
                  }
                >
                  Si
                </Button>
                <Button style="close" onClick={() => setDeleteShowModal(false)}>No</Button>
              </div>
            </div>
          </div>
        )}

        {editShowModal && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <div className="popup-header">
                <h3>{selectedUser?.name}</h3>
                <Button
                  style="popup-close"
                  onClick={() => setEditShowModal(false)}
                >
                  ×
                </Button>
              </div>

              <div className="popup-body">
                <form>
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    placeholder={selectedUser?.name}
                    value={updateFormData.name}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        name: e.target.value,
                      })
                    }
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder={selectedUser?.email}
                    value={updateFormData.email}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        email: e.target.value,
                      })
                    }
                  />

                  <label htmlFor="role">Rol</label>
                  <select
                    value={updateFormData.role}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="trabajador">Trabajador</option>
                    <option value="administrador">Administrador</option>
                  </select>

                  <label htmlFor="password">Nueva contrasena</label>
                  <input
                    type="password"
                    value={updateFormData.password}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        password: e.target.value,
                      })
                    }
                  />

                  <label htmlFor="password_confirmation">Confirmar contrasena</label>
                  <input
                    type="password"
                    value={updateFormData.password_confirmation}
                    onChange={(e) =>
                      setUpdateFormData({
                        ...updateFormData,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
                </form>
                <div id="modal-error" className="modal-error"></div>
              </div>

              <div className="popup-footer">
                <Button
                  style="delete"
                  onClick={() => {
                    setDeleteShowModal(true);
                    setEditShowModal(false);
                  }}
                >
                  Eliminar
                </Button>
                <Button
                  style="close"
                  onClick={() => setEditShowModal(false)}
                >
                  Cerrar
                </Button>
                <Button
                  style="save"
                  onClick={() => {
                    const payload = {
                      name: updateFormData.name || selectedUser.name,
                      email: updateFormData.email || selectedUser.email,
                      role: updateFormData.role || selectedUser.role,
                    };

                    if (updateFormData.password) {
                      payload.password = updateFormData.password;
                      payload.password_confirmation = updateFormData.password_confirmation;
                    }

                    const validationError = validateUserForm(payload, true);
                    if (validationError) {
                      document.getElementById("modal-error").innerHTML = validationError;
                      return;
                    }

                    updateUser(selectedUser.id, payload).then(() => {
                      setEditShowModal(false);
                      setUpdateFormData({
                        name: '',
                        email: '',
                        role: '',
                        password: '',
                        password_confirmation: '',
                      });
                      reloadUsers();
                    });
                  }}
                >
                  Guardar cambios
                </Button>
              </div>
            </div>
          </div>
        )}

        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>ID</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      style="users-edit-button"
                      onClick={() => {
                        setSelectedUser(user);
                        setEditShowModal(true);
                        setUpdateFormData({
                          name: user.name,
                          email: user.email,
                          role: user.role,
                          password: '',
                          password_confirmation: '',
                        });
                      }}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
