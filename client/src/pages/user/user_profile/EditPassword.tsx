import React from "react";

export default function EditPassword() {
  return (
    <div className="flex flex-col">
      <h1>Change Password</h1>
      <h3>Use the form below to change the password for your Sstore account</h3>
      <form className="flex flex-col">
        <span>
          <label htmlFor="edit_curr_password">Current password:</label>
          <input
            type="password"
            name="currentPassword"
            id="edit_curr_password"
          />
        </span>
        <span>
          <label htmlFor="edit_new_password">New password:</label>
          <input
            type="password"
            name="currentPassword"
            id="edit_new_password"
          />
        </span>
        <span>
          <label htmlFor="edit_confirm_new_password">
            Confirm new password:
          </label>
          <input
            type="password"
            name="currentPassword"
            id="edit_confirm_new_password"
          />
        </span>
        <button>Save Changes</button>
      </form>
    </div>
  );
}
