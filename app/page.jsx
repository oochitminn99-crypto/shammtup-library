"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  //Get User
  const fetchUser = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data.data);
  }

  //Load Data
  useEffect(() => {
    fetchUser();
  }, [])

  //Create User or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Update User
    if (editId) {
      await fetch(`/api/users/${editId}`, {
        method: "PUT",
        headers: {
          "Context-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      })
      alert("User Updated");
      setEditId(null);

      setName("");
      setEmail("");

      fetchUser();
    } else {
      //Add user
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Context-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();
      console.log(data)
      alert("User Created");

      setName("");
      setEmail("");

      fetchUser();
    }
  }

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user._id);
  }

  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE"
    });
    alert("User Deleted");

    fetchUser();
  }
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl text-red-600 text-center">
          {editId ? "Updated User" : "Create User"}
        </h1>
        <form onSubmit={handleSubmit} className="pt-6 ">
          <input type="text" placeholder="Enter Name" value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-300" required />
          <br /><br />
          <input type="text" placeholder="Enter Email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-300" required />
          <br /><br />
          <button type="submit" className="px-2 py-1 bg-red-200 rounded-lg">
            {editId ? "Update User" : "Create User"}
          </button>
        </form>
      </div>

      <br />
      <hr />

      <div>
        <h1 className="font-bold text-center text-2xl">Users List</h1>

        <div className="row mt-3 mb-4 ms-32">
          <div>
            <table className="border-separate  ms-2 border-spacing-2 border-[3px] border-fuchsia-700 rounded-xl w-[1000px]">
              <thead>
                <tr>
                  <th className="border-[2px] border-fuchsia-950 w-1/5">User Name</th>
                  <th className="border-[2px] border-fuchsia-950 w-2/5">Email</th>
                  <th className="border-[2px] border-fuchsia-950 w-1/5">Edit</th>
                  <th className="border-[2px] border-fuchsia-950">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user) => (

                    <tr key={user._id} className="text-[13px] text-blue-700 font-semibold leading-7 p-2">
                      <td className="border-[1px] rounded-md border-fuchsia-950 text-center">{user.name}</td>
                      <td className="border-[1px] rounded-md border-fuchsia-950 text-center">{user.email}</td>

                      <td>
                        <button onClick={() => handleEdit(user)} className="border-fuchsia-600 border-2 rounded-md px-[66px] py-[0px] text-fuchsia-600">
                          Edit User
                        </button>
                      </td>

                      <td>
                        <button onClick={() => handleDelete(user._id)} className="border-red-500 border-2 rounded-md px-[58px] py-[0px] text-red-500">
                          Delete User
                        </button>
                      </td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

  )
}