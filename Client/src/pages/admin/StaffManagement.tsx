import React, { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";
import type { StaffRow } from "../../types";
import { motion } from "framer-motion";

const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(true);

  // form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deptId, setDeptId] = useState("");

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await adminApi.listStaff();
      setStaff(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminApi.createStaff({
      name,
      email,
      phone,
      dept_id: deptId || null
    });
    setName("");
    setEmail("");
    setPhone("");
    setDeptId("");
    refresh();
  };

  const onAssign = async (staffId: string) => {
    const wardStr = prompt("Enter ward UUIDs (comma separated):");
    if (!wardStr) return;
    const list = wardStr.split(",").map((s) => s.trim()).filter(Boolean);
    await adminApi.assignWards(staffId, list);
    refresh();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card"
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Create Staff
        </h2>
        <form onSubmit={onCreate} className="grid grid-cols-2 gap-3">
          <input
            className="border rounded-xl p-2 bg-white dark:bg-gray-800 dark:text-gray-100"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border rounded-xl p-2 bg-white dark:bg-gray-800 dark:text-gray-100"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded-xl p-2 bg-white dark:bg-gray-800 dark:text-gray-100"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="border rounded-xl p-2 bg-white dark:bg-gray-800 dark:text-gray-100"
            placeholder="Dept UUID (optional)"
            value={deptId}
            onChange={(e) => setDeptId(e.target.value)}
          />
          <button className="col-span-2 py-2 rounded-xl bg-gray-900 text-white">
            Create
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Staff List
          </h2>
          <button onClick={refresh} className="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="mt-4 text-gray-600 dark:text-gray-300">Loading…</div>
        ) : (
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Wards</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.staff_id} className="border-t border-gray-200 dark:border-gray-800">
                    <td className="py-2">{s.name}</td>
                    <td>{s.email}</td>
                    <td className="text-xs">
                      {s.wards?.length
                        ? s.wards.map((w) => `#${w.ward_no} ${w.name}`).join(", ")
                        : <span className="text-gray-500">None</span>}
                    </td>
                    <td>
                      <button
                        onClick={() => onAssign(s.staff_id)}
                        className="px-3 py-1 rounded-xl bg-blue-600 text-white"
                      >
                        Assign Wards
                      </button>
                    </td>
                  </tr>
                ))}
                {!staff.length && (
                  <tr>
                    <td colSpan={4} className="py-4 text-gray-500">
                      No staff yet. Create one on the left.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default StaffManagement;
