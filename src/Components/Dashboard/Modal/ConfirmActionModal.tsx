import React from "react";

interface ConfirmActionModalProps {
  user: { email: string; fullName: string };
  action: "approve" | "cancel";
  onConfirm: (confirmed: boolean) => void;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  user,
  action,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Confirm {action === "approve" ? "Approval" : "Denial"}
        </h2>
        <p className="mb-4">
          Are you sure you want to {action === "approve" ? "approve" : "deny"}{" "}
          the request for {user.fullName} ({user.email})?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            onClick={() => onConfirm(false)}
          >
            Cancel
          </button>
          <button
            className={`${
              action === "approve" ? "bg-green-500" : "bg-red-500"
            } text-white px-4 py-2 rounded-lg hover:${
              action === "approve" ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={() => onConfirm(true)}
          >
            {action === "approve" ? "Approve" : "Deny"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
